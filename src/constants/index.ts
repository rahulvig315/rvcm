const appConstants = {
	appName: 'RV Customer Manager',
	appShortName: 'RVCM',
	appDescription:
    'Simple Customer Full Stack CRUD Customer Manager. Built with NextJS, Next-Auth, PlanetScale & Prisma.',
};

export const {appName, appShortName, appDescription} = appConstants;

export enum NotificationTypes {
	INFO = 'info',
	SUCCESS = 'success',
	WARN = 'warn',
	ERROR = 'error',
}

export enum Routes {
	Dashboard = '/dashboard',
	Customers = '/customers',
	Analytics = '/analytics',
	Tasks = '/tasks',
	Leads = '/leads',
	Schedule = '/schedule',
	Logs = '/logs',
	Finances = '/finances',
	Chat = '/chat',
	Registration = '/api/register',
}

export const requestHeaders = {
	contentType: {
		'Content-Type': 'application/json',
	},
};

export enum RequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	OPTIONS = 'OPTIONS',
	DELETE = 'DELETE',
}
