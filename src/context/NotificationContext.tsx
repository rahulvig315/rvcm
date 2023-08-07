'use client';
import { Context, Dispatch, createContext, useReducer } from 'react';
import { Notification, NotificationProps } from '@/components/(shared)/Notification';


export type NotificationDispatch = Dispatch<{ type?: string, notification?: Partial<NotificationProps>, id?: string }>


export type NotificationContextType = Context<{
    dispatch: NotificationDispatch,
    notifications: NotificationProps[]
}>

export const NotificationContext: NotificationContextType = createContext({
    dispatch: {} as NotificationDispatch,
    notifications: [] as NotificationProps[]
});