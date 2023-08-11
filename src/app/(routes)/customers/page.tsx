'use client';
import CustomerTable from '@/components/(customer)/CustomerTable';
import Header from '@/components/(shared)/Header';
import {Modal} from '@/components/(shared)/modal/Modal';
import {ApiRoutes, requestHeaders} from '@/constants';
import {type Customer} from '@prisma/client';
import {useEffect, useState, type ChangeEvent} from 'react';

async function getCustomers() {
	return fetch(`${ApiRoutes.Customers}`);
}

const CreateCustomerModal = ({onCreate, show, setShow}: {onCreate: (customer: Customer) => void; show: boolean; setShow: (show: boolean) => void}) => {
	const [customer, setCustomer] = useState<Partial<Customer>>({
		email: '',
		accountName: '',
		bio: '',
		address: '',
		fullName: '',
		phone: '',
		image: '',
	});

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setCustomer(prevInputs => ({...prevInputs, [name]: value}));
	};

	return (
		<Modal show={show} setShow={setShow}>
			<Modal.Header>
				<h1>Add Customer</h1>
			</Modal.Header>
			<Modal.Body>
				<div className='flex flex-col gap-2 p-5 justify-center normal-case font-bold items-stretch w-full'>
					<div>Full Name: <input type='text' name='fullName' onChange={onInputChange} value={customer.fullName} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Email: <input type='email' name='email' onChange={onInputChange} value={customer.email} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Image URL: <input type='text' name='image' onChange={onInputChange} value={customer.image} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Address: <input type='text' name='address' onChange={onInputChange} value={customer.address} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>About: <input type='text' name='bio' onChange={onInputChange} value={customer.bio} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Phone:  <input type='tel' name='phone' onChange={onInputChange} value={customer.phone} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Type: <input type='text' name='accountName' onChange={onInputChange} value={customer.accountName} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button onClick={() => {
					onCreate(customer as Customer);
					setShow(false);
				}} className='bg-info/50 rounded px-2 py-1 uppercase text-xs'>Create</button>
				<button onClick={() => {
					setShow(false);
				}} className='bg-black/50 rounded px-2 py-1 uppercase text-xs'>Close</button>
			</Modal.Footer>
		</Modal>);
};

function Customers() {
	const [customers, setCustomers] = useState<Customer[] | undefined>();
	const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
	useEffect(() => {
		void getCustomers().then(async data => data.json()).then(data => {
			setCustomers(data as Customer[]);
		});
	}, []);

	if (!customers) {
		return null;
	}

	const onCreate = async (customer: Customer) => {
		await fetch(`${ApiRoutes.Customers}`, {
			method: 'POST',
			headers: {
				...requestHeaders.contentType,
			},
			body: JSON.stringify(customer),
		});
		setCustomers([customer, ...customers]);
	};

	return (
		<>
			<Header title='Customers' />
			<div className='bg-[#132] flex p-2 justify-end z-50'>
				<button onClick={() => {
					setShowCreateModal(!showCreateModal);
				}} className='bg-[#111] px-3 py-1 rounded-full text-sm font-bold'>Add New Customer</button>
				{showCreateModal && <CreateCustomerModal onCreate={onCreate} show={showCreateModal} setShow={setShowCreateModal} />}
			</div>
			<CustomerTable customers={customers} setCustomers={setCustomers}/>
		</>
	);
}

export default Customers;
