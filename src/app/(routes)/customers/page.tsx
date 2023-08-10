'use client';
import CustomerTable from '@/components/(customer)/Customer';
import Header from '@/components/(shared)/Header';
import { ApiRoutes } from '@/constants';
import { type Customer } from '@prisma/client';
import { useEffect, useState } from 'react';

async function getCustomers() {
	return fetch(`${ApiRoutes.Customers}`);
}

function Customers() {
	const [customers, setCustomers] = useState<Customer[] | undefined>();

	useEffect(() => {
		void getCustomers().then(async data => data.json()).then(data => {
			setCustomers(data as Customer[]);
		});
	}, []);

	if (!customers) {
		return null;
	}

	return (
		<>
			<Header title='Customers' />
			<CustomerTable customers={customers} setCustomers={setCustomers}/>
		</>
	);
}

export default Customers;
