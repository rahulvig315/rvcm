"use client";
import React from 'react';
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { signIn, signOut } from 'next-auth/react';

export type ProviderButtonProps = {
    className?: string;
    size?: number;
    src: string | StaticImport,
    provider: string;
}

export function ProviderButton({ className, size = 30, src, provider }: ProviderButtonProps) {
  return (
    <button className={className} type='button' onClick={() => signIn(provider)}>
            <Image src={src} width={size} height={size} alt={provider} />
        </button>
    )
  }
  
  export function GithubButton({ className, size}: Partial<ProviderButtonProps>) {
  return (
    <ProviderButton className={className} src='/github.svg' provider="github" />
  )
}

export function GoogleButton({ className, size }: Partial<ProviderButtonProps>) {
  return (
    <ProviderButton className={className} src='/google.svg' provider="google" />
  )
} 

export function SignOut({ className, size }: Partial<ProviderButtonProps>) {
  return (
    <button onClick={() => signOut()}>Sign Out</button>
  )
}