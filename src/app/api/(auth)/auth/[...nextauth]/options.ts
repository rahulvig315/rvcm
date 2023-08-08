import {PrismaAdapter} from '@auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';
import {compare} from 'bcryptjs';
import {type AuthOptions, type RequestInternal, type User} from 'next-auth';
import {type Adapter} from 'next-auth/adapters';
import {type OAuthUserConfig} from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider, {type GithubProfile} from 'next-auth/providers/github';
import GoogleProvider, {type GoogleProfile} from 'next-auth/providers/google';

const prisma = new PrismaClient();

type Cred = {
	email: string;
	password: string;
} & {
	credentials?: Record<'email' | 'password', string>;
	req: Pick<RequestInternal, 'query' | 'headers' | 'body' | 'method'>;
} & Record<string, unknown>;

export const authOptions: AuthOptions = {
	session: {
		strategy: 'jwt',
	},
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		} as OAuthUserConfig<GithubProfile>),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		} as OAuthUserConfig<GoogleProfile>),
		CredentialsProvider({
			name: 'Login',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@example.com',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(
				credentials: Record<'email' | 'password', string> | undefined,
				req: Pick<RequestInternal, 'query' | 'headers' | 'body' | 'method'>,
			): Promise<User | undefined | any> {
				const {email, password} = (credentials ?? {}) satisfies unknown as Cred;

				if (!email || !password) {
					return;
				}

				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});

				if (!user || !(await compare(password, user?.password ?? ''))) {
					return;
				}

				return user as unknown as User;
			}
			,
		}),
	],
	callbacks: {
		session: ({session, token}) => ({
			...session,
			user: {
				...session.user,
				id: token.id,
			},
		}),
		jwt({token, user}) {
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}

			return token;
		},
	},
};
