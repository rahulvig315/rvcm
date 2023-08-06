const APP_CONSTANTS = {
  APP_NAME: "RV Customer Manager",
  APP_SHORTNAME: "RVCM",
  APP_DESCRIPTION:
    "Simple Customer Full Stack CRUD Customer Manager. Built with NextJS, Next-Auth, PlanetScale & Prisma.",
};

export const { APP_NAME, APP_SHORTNAME, APP_DESCRIPTION } = APP_CONSTANTS;

export enum NotificationTypes {
  INFO = "info",
  SUCCESS = "success",
  WARN = "warn",
  ERROR = "error",
}

export enum Routes {
  Dashboard = "/dashboard",
  Customers = "/customers",
  Analytics = "/analytics",
  Tasks = "/tasks",
  Leads = "/leads",
  Schedule = "/schedule",
  Logs = "/logs",
  Finances = "/finances",
  Chat = "/chat",
  Registration = "/api/register",
}

export const NotificationBackgroundClasses = {
  info: "bg-info",
  success: "bg-success",
  warn: "bg-warn",
  error: "bg-error",
};

export const REQUEST_HEADERS = {
  CONTENT_TYPE: {
    "Content-Type": "application/json",
  },
};

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  DELETE = "DELETE",
}
