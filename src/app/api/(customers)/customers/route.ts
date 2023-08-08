/* eslint-disable @typescript-eslint/naming-convention */
import {prisma} from '@/prisma';
import {NextResponse} from 'next/server';

export const GET = async () => {
	try {
		const customers = await prisma.customer.findMany();
		return NextResponse.json(customers);
	} catch (error) {
		return NextResponse.json({
			error,
			message: `Error ${(error as Error)?.message} could not fetch customers.`,
		});
	}
};
