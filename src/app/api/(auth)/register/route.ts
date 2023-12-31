import {type Prisma} from '@prisma/client';
import {prisma} from '../../../../../lib/prisma';
import {hash} from 'bcryptjs';
import {NextResponse} from 'next/server';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function POST(req: Request) {
	try {
		const {email, password, name} = (await req.json()) as {
			email: string;
			password: string;
			name: string;
		};
		const hashedPassword = await hash(password, 12);

		const user = await prisma.user.create({
			data: {
				name,
				email: email.toLowerCase(),
				password: hashedPassword,
				createdAt: new Date(),
				updatedAt: new Date(),
			} satisfies Prisma.UserCreateArgs['data'],
		});

		return NextResponse.json({
			user: {
				email: user.email,
			},
		});
	} catch (error) {
		return new NextResponse(
			JSON.stringify({
				status: 'error',
				message: (error as {message: string})?.message,
			}),
			{status: 500},
		);
	}
}
