/**
 * useUnreadProfileNotifications hook. Query to retrieve profile notifications.
 */

import { omit } from 'lodash';
import { gql, useQuery } from '@apollo/client';
import { JobPost, ProfileNotification } from '@lib/classes';
import { JobPostParams, ProfileNotificationParams } from '@lib/types';

// TODO update Job class props to match the query

export const QUERY_UNREAD_PROFILE_NOTIFICATIONS = gql`
	query UnreadProfNotificationsQuery($authorId: Int = 10) {
		unreadProfileNotifications(authorId: $authorId) {
			id
			notificationType
			value
		}
	}
`;

const useUnreadProfileNotifications = (authorId: number): [ProfileNotification[], any] => {
	const result = useQuery(QUERY_UNREAD_PROFILE_NOTIFICATIONS, {
		variables: {
			authorId,
		},
		fetchPolicy: 'cache-and-network',
	});

	if (!result?.data?.unreadProfileNotifications) {
		return [[], null];
	}

	const profileNotifications: ProfileNotification[] =
		result?.data?.unreadProfileNotifications?.map((node: ProfileNotificationParams) => {
			const { id, notificationType, value } = node;

			const profileNotification = new ProfileNotification({
				id,
				notificationType,
				value,
			});

			return profileNotification;
		}) ?? [];

	return [profileNotifications, omit(result, ['data'])];
};

export default useUnreadProfileNotifications;
