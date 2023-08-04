import React from 'react';
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type ProviderButtonProps = {
    className?: string;
    size?: number;
    src: string | StaticImport,
    provider: string;
}

export function ProviderButton({ className, size = 30, src, provider }: ProviderButtonProps) {
    return (
        <a className={className} type='button' href={`/api/auth/signin/${provider}`}>
            <Image src={src} width={size} height={size} alt={provider} />
        </a>
    )
}

export function GithubButton({ className, size}: Partial<ProviderButtonProps>) {
  return (
    <ProviderButton className={className} src='/github.svg' provider="github" />
  )
}

export function GoogleButton({ className, size}: Partial<ProviderButtonProps>) {
  return (
    <ProviderButton className={className} src='/google.svg' provider="google" />
  )
}
