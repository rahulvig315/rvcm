import {NotificationContext} from '@/context/NotificationContext';
import {useContext} from 'react';
import {type NotificationProps} from '@/components/(shared)/Notification';
import {NotificationTypes} from '@/constants';

export type AddNotification = {
	content?: string;
	type: NotificationTypes;
};

export const useNotification = () => {
	const {dispatch, notifications} = useContext(NotificationContext);

	return {
		addNotification(
			content: AddNotification['content'] = '',
			type: AddNotification['type'] = NotificationTypes.INFO,
		) {
			const id = Math.random().toString(36).substring(2);
			dispatch({
				type: 'ADD_NOTIFICATION',
				notification: {id, content, type} satisfies Partial<NotificationProps>,
			});

			setTimeout(() => {
				dispatch({type: 'REMOVE_NOTIFICATION', id});
			}, 2000);
		},
		notifications,
	};
};
