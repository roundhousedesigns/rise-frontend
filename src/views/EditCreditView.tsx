import { ChangeEvent, FormEvent, useContext, useEffect, useReducer, useState } from 'react';
import { Divider, Flex, Heading, Text, Spinner, Stack, StackItem } from '@chakra-ui/react';
import { Credit, WPItem } from '../lib/classes';
import { EditProfileContext } from '../context/EditProfileContext';
import usePositions from '../hooks/queries/usePositions';
import useRelatedSkills from '../hooks/queries/useRelatedSkills';
import useLazyPositions from '../hooks/queries/useLazyPositions';
import useLazyRelatedSkills from '../hooks/queries/useLazyRelatedSkills';
import useUpdateCredit from '../hooks/mutations/useUpdateCredit';
import ProfileCheckboxGroup from '../components/common/ProfileCheckboxGroup';
import TextInput from '../components/common/inputs/TextInput';
import ProfileRadioGroup from '../components/common/ProfileRadioGroup';
import EditCreditButtons from '../components/EditCreditButtons';
import { sortWPItemsByName } from '../lib/utils';

// TODO type this reducer
function editCreditReducer(state: Credit, action: { type: string; payload: any }) {
	console.log("editCreditReducer called with state = ", state, "action = ", action);

  switch (action.type) {
		case 'UPDATE_INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};

		case 'UPDATE_DEPARTMENT':
			return {
				...state,
				positions: {
					...state.positions,
					department: action.payload.value.map((item: number) => item),
				},
			};

		case 'UPDATE_JOBS':
			return {
				...state,
				positions: {
					...state.positions,
					jobs: action.payload.value.map((item: number) => item),
				},
			};

    case 'UPDATE_JOBS_AND_SKILLS':
        return {
          ...state,
          skills: action.payload.value.skills.map((item: number) => item),
          positions: {
            ...state.positions,
            jobs: action.payload.value.jobs.map((item: number) => item),
          },
        };

		case 'UPDATE_SKILLS':
			return {
				...state,
				skills: action.payload.value.map((item: number) => item),
			};

		case 'INIT':
		case 'RESET':
			return action.payload;

		default:
			return state;
	}
}

interface Props {
	creditId: string;
	onClose: () => void;
}

export default function EditCreditView({ creditId, onClose: closeModal }: Props) {
	const { editProfile, editProfileDispatch } = useContext(EditProfileContext);
	const credit = editProfile.credits?.find((credit) => credit.id === creditId);
	const [editCredit, editCreditDispatch] = useReducer(editCreditReducer, credit);
  console.log("editCreditView component loaded with editCredit = ", editCredit);

	const {
		updateCreditMutation,
		results: { loading: updateCreditLoading },
	} = useUpdateCredit();

	const {
		title,
		jobTitle,
		jobLocation,
		venue,
		workStart,
		workEnd,
		workCurrent,
		positions: { department: selectedDepartmentIds = [], jobs: selectedJobIds = [] },
		skills: selectedSkills,
	} = editCredit;

	const [allDepartments] = usePositions();
	const [getJobs, { data: allJobs, loading: jobsLoading }] = useLazyPositions();
	const [jobs, setJobs] = useState<WPItem[]>([]);
  const [getRelatedSkills, { data: allRelatedSkills, loading: relatedSkillsLoading}] = useLazyRelatedSkills();
  const [skills, setSkills] = useState<WPItem[]>([]);

  console.log("EditCreditView rendered with jobs = ", jobs, " skills = ", skills)

  // AD TODO: Troubleshoot skills loading on first render
  // AD TODO: Fix when last department unselected, does not clear selectedSkills

  // TODO: have useEffect to set visible jobs and skills

  // refetch Jobs: fetches and returns visible jobs given selected Departments Ids
  // refetch Skills: fetches and returns visible skills given selected Job Ids

  // useEffect: fetches and sets visible jobs and skills on mount

  // handle X: fetches, sets, and then filters selectedX on corrosponding credit states

  // Refetch jobs & skills lists when department changes
  useEffect(() => {
    refetchJobsAndSkills(selectedDepartmentIds);
  }, [selectedDepartmentIds]);


  // Refetch skills list when jobs change
  useEffect(() => {
    refetchSkills(selectedJobIds);
  }, [selectedJobIds]);

  const refetchJobsAndSkills = async (departmentIds: string[]) => {
    console.log("refetchJobsAndSkills called with departmentIds = ", departmentIds);

    if (departmentIds.length === 0) {
      // return () => {
      setJobs([]);
      setSkills([]);
      editCreditDispatch({
        type: 'UPDATE_JOBS_AND_SKILLS',
        payload: {
          value: {jobs: [], skills: []},
        },
      });
      return;
      // }
    }

    const result = await getJobs({ variables: { departments: departmentIds }, fetchPolicy: 'network-only' });

    console.log("result in refetchJobs = ", result);
    const jobsByDept = result?.data?.jobsByDepartments
    if (jobsByDept) {
      setJobs(jobsByDept.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

      const allJobIds = jobsByDept.map((j: WPItem)=> j.id);
      const alignedSelectedJobIds = selectedJobIds.filter((jobId: number) => {
        let jobShowing = allJobIds.includes(jobId.toString())
        console.log(jobId, "is included in allJobIds = ", jobShowing);
        console.log("jobId type is ", typeof jobId);
        return jobShowing;
      })
      console.log("allJobIds = ", allJobIds, "selectedJobIds = ", selectedJobIds);

      const skillsResult = await getRelatedSkills({ variables: { jobs: alignedSelectedJobIds }, fetchPolicy: 'network-only' });

      console.log("skillsResult = ", skillsResult);
      const jobSkills = skillsResult?.data?.jobSkills
      console.log("jobSkills = ", jobSkills)
      if (jobSkills) {
        setSkills(jobSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

        // filter & update selectedSkills to align with jobs
        const allRelatedSkillIds = jobSkills.map((s: WPItem)=> s.id);
        const alignedSelectedSkillIds = selectedSkills.filter((skillId: string) => {
           let isShowing = allRelatedSkillIds.includes(+skillId);
           console.log(skillId, "is included in allRelatedSkillIds = ", isShowing);
           return isShowing;
        });
        console.log("allRelatedSkillIds = ", allRelatedSkillIds, "selectedSkills = ", selectedSkills, "alignedSelectedSkillIds = ", alignedSelectedSkillIds);
        editCreditDispatch({
          type: 'UPDATE_JOBS_AND_SKILLS',
          payload: {
            value: {jobs: alignedSelectedJobIds, skills: alignedSelectedSkillIds},
          },
        });

    } else {
      // return () => {
        setJobs([]);
        setSkills([]);
        // }
      return;
      }
    }
  }


const refetchSkills = async (jobIds: number[]) => {
  console.log("refetchSkills called with jobIds = ", jobIds);

  if (jobIds.length === 0) {
    setSkills([]);
    return [];
  }

  const result = await getRelatedSkills({ variables: { jobs: jobIds }, fetchPolicy: 'network-only' });

  console.log("result in refetchSkills = ", result);
  const jobSkills = result?.data?.jobSkills
  if (jobSkills) {
    setSkills(jobSkills.map((item: WPItem) => new WPItem(item)).sort(sortWPItemsByName));

    // filter & update selectedSkills to align with jobs
    const allRelatedSkillIds = jobSkills.map((s: WPItem)=> s.id);
    console.log("allRelatedSkillId first item type = ", typeof allRelatedSkillIds[0])
    const alignedSelectedSkillIds = selectedSkills.filter((skillId: string) => {
      console.log("type of skilId in selectedSkills = ", typeof skillId);
      let isShowing = allRelatedSkillIds.includes(+skillId);
      console.log(skillId, "is included in allRelatedSkillIds = ", isShowing);
      return isShowing;
   });
   console.log("allRelatedSkillIds = ", allRelatedSkillIds, "selectedSkills = ", selectedSkills, "alignedSelectedSkillIds = ", alignedSelectedSkillIds);
   editCreditDispatch({
      type: 'UPDATE_SKILLS',
      payload: {
        value: alignedSelectedSkillIds,
      },
    });
  } else {
    // return () => {
      setSkills([]);
    // }
  }
}

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value,
			},
		});
	};

	const dispatchCheckboxTermChange = (name: string, terms: string[]) => {
		editCreditDispatch({
			type: `UPDATE_${name.toUpperCase()}`,
			payload: {
				value: terms,
			},
		});
	};

  const handleDepartmentsChange = (name: string) => (terms: string[]) => {
    console.log("handleDepartmentsChange called with name = ", name, "terms = ", terms)
    dispatchCheckboxTermChange(name, terms);
    refetchJobsAndSkills(terms);
  }

  const handleJobsChange = (name: string) => (terms: string[]) => {
    console.log("handleJobsChange called with name = ", name, "terms = ", terms)
    // update jobs
    dispatchCheckboxTermChange(name, terms);
    // update skills
  }

  const handleSkillsChange = (name: string) => (terms: string[]) => {
    console.log("handleSkillsChange called with name = ", name, "terms = ", terms)
    // update skills
    dispatchCheckboxTermChange(name, terms);
  }

	const handleRadioInputChange = (name: string) => (value: string) => {
		editCreditDispatch({
			type: 'UPDATE_INPUT',
			payload: {
				name,
				value: value === 'true' ? true : false,
			},
		});
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const creditToUpdate = new Credit(editCredit).prepareCreditForGraphQL();

		updateCreditMutation(creditToUpdate, editCredit.id)
			.then((results) => {
				editProfileDispatch({
					type: 'UPDATE_CREDIT',
					payload: {
						credit: results.data.updateOrCreateCredit.updatedCredit,
						newCreditTempId: editCredit.isNew ? editCredit.id : null,
					},
				});

				closeModal();
			})
			.catch((err: any) => {
				console.error(err);
			});
	};

	const handleCancel = () => {
		closeModal();
		editCreditDispatch({
			type: 'RESET',
			payload: credit,
		});
	};

	return (
		<form id='edit-credit' onSubmit={handleSubmit}>
			<Flex flex='1' justifyContent='space-between' py={2}>
				<Heading as='h3' size='lg' lineHeight='base'>
					Edit Credit
				</Heading>
				<EditCreditButtons handleCancel={handleCancel} isLoading={updateCreditLoading} />
			</Flex>

			<TextInput
				name='title'
				label='Production/Show/Company Title'
				value={title}
				isRequired
				onChange={handleInputChange}
				flex='1'
			/>

			<TextInput
				name='jobTitle'
				label='Job/Position Title'
				isRequired
				value={jobTitle}
				onChange={handleInputChange}
			/>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='workStart'
					label='Start year'
					isRequired
					value={workStart}
					onChange={handleInputChange}
					flex='1'
				/>

				<TextInput
					name='workEnd'
					label='End year'
					value={!workCurrent ? workEnd : ''}
					isDisabled={workCurrent}
					onChange={handleInputChange}
					flex='1'
				/>

				<ProfileRadioGroup
					defaultValue={workCurrent ? 'true' : 'false'}
					name='workCurrent'
					label='Currently working here'
					flex={{ base: '0 0 100%', md: '0 0 50%' }}
					items={[
						{ label: 'Yes', value: 'true' },
						{ label: 'No', value: 'false' },
					]}
					handleChange={handleRadioInputChange}
				/>
			</Flex>

			<Flex justifyContent='space-between' w='full' gap={4} flexWrap='wrap'>
				<TextInput
					name='venue'
					label='Venue'
					value={venue}
					onChange={handleInputChange}
					isRequired
					flex='1'
				/>

				<TextInput
					name='jobLocation'
					label='Job Location'
					value={jobLocation}
					isRequired
					onChange={handleInputChange}
					flex='1'
				/>
			</Flex>

			<Divider />

			<Stack direction='column' spacing={6} fontSize='md'>
				{/* TODO Make this required */}
				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Department
					</Heading>
					<Text>Select all department(s) you worked under.</Text>
					<ProfileCheckboxGroup
						name='department'
						items={allDepartments}
						checked={
							selectedDepartmentIds
								? selectedDepartmentIds.map((item: number) => item.toString())
								: []
						}
						handleChange={handleDepartmentsChange}
					/>
				</StackItem>
				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Position
					</Heading>
					{selectedDepartmentIds.length && !jobsLoading ? (
						<>
							<Text>Select all jobs you held on this project.</Text>
							<ProfileCheckboxGroup
								name='jobs'
								items={jobs}
								checked={selectedJobIds?.map((item: number) => item.toString())}
								handleChange={handleJobsChange}
							/>
						</>
					) : jobsLoading ? (
						<Spinner />
					) : null}
				</StackItem>

				<StackItem>
					<Heading as='h4' variant='contentTitle'>
						Skills
					</Heading>
					{selectedJobIds.length && !relatedSkillsLoading ? (
						<>
							<Text>Select any skills used on this job.</Text>
							<ProfileCheckboxGroup
								name='skills'
								items={skills}
								checked={selectedSkills?.map((item: number) => item.toString())}
								handleChange={handleSkillsChange}
							/>
						</>
					) : relatedSkillsLoading ? (
						<Spinner />
					) : null}
				</StackItem>
			</Stack>

			<Flex justifyContent='flex-end' mt={4} mb={0}>
				<EditCreditButtons handleCancel={handleCancel} isLoading={updateCreditLoading} />
			</Flex>
		</form>
	);
}
