'use client';
import {type NotificationProps} from '@/components/(shared)/Notification';
import {NotificationContext, type NotificationDispatch} from '@/context/NotificationContext';
import {useReducer} from 'react';
import {Notification} from '@/components/(shared)/Notification';

export const NotificationProvider = (
	{
		children,
	}: {
		children: React.ReactNode;
	}): React.ReactNode => {
	const [state, dispatch] = useReducer((state: Partial<NotificationProps[]>, action: {type?: string; notification?: Partial<NotificationProps>; id?: number}) => {
		switch (action.type) {
			case 'ADD_NOTIFICATION':
				return [...state, action.notification];
			case 'REMOVE_NOTIFICATION':
				return state.filter(notification => (notification?.id as Pick<NotificationProps, 'id'>) !== action?.id);
			default:
				throw new Error(`Unknown action invoked, ${action.type}`);
		}
	}, []);

	return (
		<NotificationContext.Provider value={{dispatch: dispatch as NotificationDispatch, notifications: state as NotificationProps[]}}>
			{children}
			{state.map((notification, notificationIdx) => (
				<Notification key={notificationIdx} dispatch={dispatch} {...notification} />
			))}
		</NotificationContext.Provider>
	);
};
