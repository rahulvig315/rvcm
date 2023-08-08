import CustomerTable from '@/components/(customer)/Customer';
import Header from '@/components/(shared)/Header';
import {type Customer as CustomerModel} from '@prisma/client';

async function getCustomers() {
	return (await fetch(`${process.env.NEXTAUTH_URL}/api/customers`)).json();
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
