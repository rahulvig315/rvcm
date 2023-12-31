import {authOptions} from '../auth/[...nextauth]/options';
import {getServerSession} from 'next-auth';
import {NextResponse} from 'next/server';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET(request: Request) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return new NextResponse(
			JSON.stringify({status: 'fail', message: 'You are not logged in'}),
			{status: 401},
		);
	}

	return NextResponse.json({
		authenticated: Boolean(session),
		session,
	});
}
