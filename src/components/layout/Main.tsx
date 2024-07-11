import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import LoggedIn from '@components/LoggedIn';
import Dashboard from '@routes/Dashboard';
import Login from '@routes/Login';
import LostPassword from '@routes/LostPassword';
import ResetPassword from '@routes/ResetPassword';
import Register from '@routes/Register';
import Profile from '@routes/Profile';
import EditProfile from '@routes/EditProfile';
import Results from '@routes/Results';
import BookmarkedProfiles from '@routes/BookmarkedProfiles';
import Settings from '@routes/Settings';
import Help from '@routes/Help';
import NotFound from '@routes/NotFound';
import SavedSearches from '@routes/SavedSearches';

export default function Main() {
	return (
		<Box
			id='main'
			w='full'
			h='auto'
			py={2}
			background='none'
			justifyContent='center'
			alignItems='center'
			flex='1 1 auto'
		>
			<Container w='full' maxW='6xl' px={{ base: 4, md: 8 }} pb={4}>
				<Routes>
					<Route
						path='/'
						element={
							<LoggedIn>
								<Dashboard />
							</LoggedIn>
						}
					/>
					<Route path='/reset-password' element={<ResetPassword />} />
					<Route
						path='/profile/:slug'
						element={
							<LoggedIn>
								<Profile />
							</LoggedIn>
						}
					/>
					<Route
						path='/profile/edit'
						element={
							<LoggedIn>
								<EditProfile />
							</LoggedIn>
						}
					/>
					<Route
						path='/results'
						element={
							<LoggedIn>
								<Results />
							</LoggedIn>
						}
					/>
					<Route
						path='/bookmarks'
						element={
							<LoggedIn>
								<BookmarkedProfiles />
							</LoggedIn>
						}
					/>
					<Route
						path='/searches'
						element={
							<LoggedIn>
								<SavedSearches />
							</LoggedIn>
						}
					/>
					<Route
						path='/settings'
						element={
							<LoggedIn>
								<Settings />
							</LoggedIn>
						}
					/>
					<Route
						path='/help'
						element={
							<LoggedIn>
								<Help />
							</LoggedIn>
						}
					/>

					{/* Pages with Google ReCaptcha */}
					<Route path='/login' element={<Login />} />
					<Route path='/lost-password' element={<LostPassword />} />
					<Route path='/register' element={<Register />} />

					{/* 404 */}
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Container>
		</Box>
	);
}
