import NextAuth from 'next-auth';
import {authOptions} from './options';

const handler: typeof NextAuth = NextAuth(authOptions) as typeof NextAuth;

export {handler as GET, handler as POST};

