// TODO Kill me when this is all over.

import React from "react";

import { useCredits } from "./hooks/queries/useCredits";
import { useAllUsers } from "./hooks/queries/useUsers";

export default function Dev() {
	const { data: creditsData, error: creditsErrors } = useCredits();
	const { data: usersData, error: usersErrors } = useAllUsers();

	return (
		<>
			<div>
				<h3>Users</h3>
				{usersData ? (
					<ul>
						{usersData.users.nodes.map((i, index) => (
							<li key={index}>{i.databaseId}</li>
						))}
					</ul>
				) : (
					"Bork."
				)}
				<hr />
				<h3>Credits</h3>
				{creditsData ? (
					<ul>
						{creditsData.credits.nodes.map((i, index) => (
							<li key={index}>{i.databaseId}</li>
						))}
					</ul>
				) : (
					"No credits"
				)}
				<br />
			</div>
		</>
	);
}
