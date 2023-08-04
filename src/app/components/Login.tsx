"use client";
import { signIn } from 'next-auth/react'
import { useRef } from 'react';
import { GithubButton, GoogleButton } from './buttons';


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
  }
}

export type LoginProps = {
  loginOpts?: typeof defaultLoginOpts
}

export type FormInputsType = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export const nextCredentialsSignIn = async ({ email, password }: FormInputsType) => {
    return await (await signIn('credentials', {
        redirect: false,
        email: email,
        password: password
    }));
}


export function Login({ loginOpts = defaultLoginOpts }: {loginOpts?: LoginProps['loginOpts']}){
  const emailRef  = useRef(null);
  const passwordRef = useRef(null);
  const { classes } = loginOpts;

  function onLogin() {
    console.log(emailRef.current)
    console.log(passwordRef.current);
  }

  return <div className={classes.container}>
    <h1 className={classes.heading}>Sign In</h1>
    <form className={classes.form}>
      <label htmlFor="email" className={classes.label}>
        Email
      </label>
      <input className={classes.input} name="email" type="email" ref={emailRef}/>
      <label htmlFor="password" className={classes.label}>
        Password
      </label>
      <input className={classes.input} name="password" type="password" ref={passwordRef}/>
      <div className={classes.btnGroup}>
        <div className={classes.credSubgroup}>
          <button className={classes.credLoginBtn}>Login</button>
          <button className={classes.credRegisterBtn}>Sign Up</button>
        </div>
        <h2 className={classes.providersText}>Or Login with </h2>
        <div className={classes.providersSubgroup}>        
            <GoogleButton className={classes.providerBtns}/>
            <GithubButton className={classes.providerBtns} />
        </div>
      </div>
    </form>
  </div>
}
