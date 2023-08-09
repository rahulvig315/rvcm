import CustomerTable from '@/components/(customer)/Customer';
import Header from '@/components/(shared)/Header';
import {ApiRoutes} from '@/constants';
import {type Customer as CustomerModel} from '@prisma/client';

async function getCustomers() {
	return (await fetch(`${process.env.NEXTAUTH_URL}${ApiRoutes.Customers}`)).json();
}

async function Customers() {
	const customers: CustomerModel[] = await getCustomers() as CustomerModel[];
	return (
		<>
			<Header title='Customers' />
			<CustomerTable customers={customers} />
		</>
	);
}

export default Customers;
