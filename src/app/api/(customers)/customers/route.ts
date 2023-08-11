/* eslint-disable @typescript-eslint/naming-convention */
import { prisma } from '@/prisma';
import { type Customer } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';

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

export const POST = async (req: NextRequest, res: (NextResponse & {params: {id: string}})) => {
	try {
		const created: Partial<Customer> = await req.json() as Customer;
		const createdUser = await prisma.customer.create(
			{
				data: {
					...created,
					id: randomUUID(),
					accountCreated: new Date(),
				} satisfies unknown as Customer,
			},
		);
		return NextResponse.json({
			...createdUser,
		});
	} catch (error) {
		return NextResponse.json({
			status: 404,
			error: 'Customer not found',
			data: null,
		});
	}
};
