'use client';
import {type Context, type Dispatch, createContext} from 'react';
import {type NotificationProps} from '@/components/(shared)/Notification';

export type NotificationDispatch = Dispatch<{type?: string; notification?: Partial<NotificationProps>; id?: string}>;

export type NotificationContextType = Context<{
	dispatch: NotificationDispatch;
	notifications: NotificationProps[];
}>;

export const NotificationContext: NotificationContextType = createContext({
	dispatch: {} satisfies unknown as NotificationDispatch,
	notifications: [] as NotificationProps[],
});
