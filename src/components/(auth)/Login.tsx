'use client';
import {ApiRoutes, NotificationTypes, requestHeaders} from '@/constants';
import {useNotification} from '@/hooks/notification';
import {type User} from '@prisma/client';
import {signIn, useSession, type SignInResponse} from 'next-auth/react';
import Image from 'next/image';
import {redirect} from 'next/navigation';
import {useState, type ChangeEvent, type MouseEvent} from 'react';
export type ProviderButtonProps = {
	className?: string;
	size?: number;
	src: string;
	provider: string;
};

export function ProviderButton({className, size = 30, src, provider}: ProviderButtonProps) {
	return (
		<button className={className} type='button' onClick={async () => signIn(provider)}>
			<Image src={src} width={size} height={size} alt={provider} />
		</button>
	);
}

export function GithubButton({className, size}: Partial<ProviderButtonProps>) {
	return (
		<ProviderButton className={className} src='/github.svg' provider='github' />
	);
}

export function GoogleButton({className, size}: Partial<ProviderButtonProps>) {
	return (
		<ProviderButton className={className} src='/google.svg' provider='google' />
	);
}

const defaultLoginOpts = {
	classes: {
		container: 'md:m-auto flex flex-col justify-center items-center rounded-md gap-3 bg-[#111] shadow-2xl shadow-green-900 p-7 drop-shadow-sm',
		heading: 'text-xl md:text-2xl self-center p-4 font-thin',
		form: 'flex flex-col',
		label: 'font-light text-sm uppercase',
		input: 'w-[300px] md:w-[400px] lg:w-[600px] my-1 rounded-sm bg-[#333] p-1 mb-5',
		btnGroup: 'flex flex-col justify-center items-center gap-2 font-extralight',
		credSubgroup: 'flex gap-2',
		credLoginBtn: 'w-32 bg-[#222] p-1.5 font-extralight rounded-md',
		credRegisterBtn: 'w-32 bg-[#333] p-1.5 font-extralight rounded-md',
		providersText: 'font-thin m-3 text-sm',
		providersSubgroup: 'flex gap-2',
		providerBtns: 'w-16 p-1 bg-neutral-200 text-black font-light flex items-center justify-center rounded-md',
	},
};

export type LoginProps = {
	loginOpts?: typeof defaultLoginOpts;
};

export const nextCredentialsSignIn = async ({email, password}: {email: string; password: string}): Promise<SignInResponse | undefined> => (signIn('credentials', {
	redirect: false,
	email,
	password,
}));

const Routes = {
	Dashboard: '/dashboard',
};

export function Login({loginOpts = defaultLoginOpts}: {loginOpts?: LoginProps['loginOpts']}) {
	const {addNotification} = useNotification();
	const [formInputs, setFormInputs] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const [isSignUp, setIsSignUp] = useState<boolean>(false);
	const {classes} = loginOpts;
	const {status} = useSession();
	const isLoading = status === 'loading';
	const isAuthorized = status === 'authenticated';

	async function onLogin(e: MouseEvent) {
		e.preventDefault();
		const email: string = formInputs.email || '';
		const password: string = formInputs.password || '';
		if (email && password) {
			const res = await nextCredentialsSignIn({email, password});
			const {errorArgs, successArgs} = {errorArgs: ['Invalid User, either email or password is incorrect', NotificationTypes.ERROR], successArgs: ['Login Success!', NotificationTypes.SUCCESS]};
			const args = res?.ok ? successArgs : errorArgs;
			addNotification(...args);
		}
	}

	async function onRegister(e: MouseEvent) {
		e.preventDefault();
		try {
			const name: string = formInputs.name || '';
			const email: string = formInputs.email || '';
			const password: string = formInputs.password || '';
			const passwordConfirm: string = formInputs.passwordConfirm || '';
			if (password === passwordConfirm && Boolean(name) && Boolean(email)) {
				const createUserRes: Awaited<Response> = await fetch(ApiRoutes.Registration, {
					method: 'POST',
					headers: requestHeaders.contentType,
					body: JSON.stringify({
						name,
						email,
						password,
					}),
				});
				const createdUser: Partial<User & {status?: string}> = await createUserRes.json() as unknown as Partial<User>;
				if (createdUser && createdUser?.status !== 'error') {
					await onLogin(e);
				}
			}
		} catch (error) {
			const message = (error as Error)?.message ?? ' Unknown Error';
			console.error(`Error: ${message}\nUser was not registered.`);
		}
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormInputs(prevInputs => ({...prevInputs, [name]: value}));
	};

	if (isAuthorized) {
		redirect(Routes.Dashboard);
	}

	return (
		<div className={classes.container}>
			<h1 className={classes.heading}>{(isSignUp && 'Register') || 'Sign In'}</h1>
			<form className={classes.form}>
				{
					isSignUp && (
						<>
							<label htmlFor='name' className={classes.label}>
								Name
							</label>
							<input className={classes.input} name='name' type='text' value={formInputs.name} onChange={onInputChange} />
						</>
					)
				}
				<label htmlFor='email' className={classes.label}>
					Email
				</label>
				<input className={classes.input} name='email' type='email' onChange={onInputChange} />
				<label htmlFor='password' className={classes.label}>
					Password
				</label>
				<input className={classes.input} name='password' type='password' onChange={onInputChange} />
				{isSignUp
					&& <>
						<label htmlFor='passwordConfirm' className={classes.label}>
							Confirm Password
						</label>
						<input className={classes.input} name='passwordConfirm' type='password' onChange={onInputChange} />
						{formInputs.passwordConfirm !== formInputs.password && <sub >Passwords do not match...</sub>}
					</>}
				<div className={classes.btnGroup}>
					<div className={classes.credSubgroup}>
						{!isSignUp
							&& <>
								<button disabled={isLoading} className={classes.credLoginBtn} onClick={async e => onLogin(e)}>Login</button>
								<button className={classes.credRegisterBtn} onClick={() => {
									setIsSignUp(!isSignUp);
								}}>Sign Up</button>
							</>
						}
						{isSignUp && <>
							<button disabled={isLoading} className={classes.credRegisterBtn} onClick={() => {
								setIsSignUp(!isSignUp);
							}}>Back to Login</button>
							<button disabled={isLoading} className={classes.credRegisterBtn} onClick={async e => onRegister(e)}>Register</button>
						</>}
					</div>
					<h2 className={classes.providersText}>Or Login with </h2>
					<div className={`${isLoading ? 'cursor-not-allowed' : 'cursor-default'} ${classes.providersSubgroup}`}>
						<GoogleButton className={classes.providerBtns} />
						<GithubButton className={classes.providerBtns} />
					</div>
				</div>
			</form>
		</div>
	);
}
