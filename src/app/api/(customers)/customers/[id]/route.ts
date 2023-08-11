/* eslint-disable @typescript-eslint/naming-convention */
import {prisma} from '@/prisma';
import {NextResponse, type NextRequest} from 'next/server';

export const GET = async (req: NextRequest, res: (NextResponse & {params: {id: string}})) => {
	try {
		const id = res.params?.id;
		const foundUser = await prisma.customer.findUniqueOrThrow({
			where: {id},
		});
		console.log(foundUser);
		return NextResponse.json({
			...foundUser,
		});
	} catch (error) {
		return NextResponse.json({
			status: 404,
			error: 'Customer not found',
			data: null,
		});
	}
};

export const DELETE = async (req: NextRequest, res: (NextResponse & {params: {id: string}})) => {
	try {
		const id = res.params?.id;
		await prisma.$executeRaw`DELETE FROM Customer WHERE id = ${id}`;
		return NextResponse.json({
			msg: `Record with id ${id} was deleted.`,
		});
	} catch (error) {
		console.log('error', error);
		return NextResponse.json({
			status: 404,
			error: 'Customer not found',
			data: null,
		});
	}
};

export const PATCH = async (req: NextRequest, res: (NextResponse & {params: {id: string}})) => {
	try {
		const id = res.params?.id;
		const updatedUser = await prisma.customer.update(
			{
				where: {id},
				data: {
					...req.body,
				},
			},
		);
		console.log('updatedUser', updatedUser);
		return NextResponse.json({
			...updatedUser,
		});
	} catch (error) {
		return NextResponse.json({
			status: 404,
			error: 'Customer not found',
			data: null,
		});
	}
};
