import { NotificationBackgroundClasses, NotificationTypes } from '@/constants';
import { AddNotification } from '@/hooks/notification';
import { Dispatch } from 'react';

export type NotificationProps = {
    id?: string;
    content?: string;
    type?: AddNotification['type'];
    dispatch?: Dispatch<{
        type?: string;
        notification?: NotificationProps;
        id?: number;
    }>
}

export const Notification = ({ id, content, type, dispatch }: NotificationProps) => {
    return (
        <div className={`absolute top-16 left-[50%] m-auto p-2 rounded ${NotificationBackgroundClasses[type as NotificationTypes]} text-white`}>
            {content}
        </div >
    );
};
