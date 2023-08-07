import { NotificationTypes } from '@/constants';
import { AddNotification } from '@/hooks/notification';
import { Dispatch } from 'react';
import { twMergeCLSX } from '@/utils/tailwind';

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

const baseClasses = 'absolute top-16 left-[50%] m-auto p-2 rounded text-white';

export const Notification = ({ content, type }: NotificationProps) => {
    const combinedDynamicClasses = twMergeCLSX(baseClasses, {
        'bg-info': type === NotificationTypes.INFO,
        'bg-error': type === NotificationTypes.ERROR,
        'bg-warn': type === NotificationTypes.WARN,
        'bg-success': type === NotificationTypes.SUCCESS
    })
    return (
        <div className={combinedDynamicClasses}>
            {content}
        </div >
    );
};
