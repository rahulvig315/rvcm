'use client';
import {ApiRoutes, requestHeaders} from '@/constants';
import {type Customer as CustomerModel} from '@prisma/client';
import {createColumnHelper, type Column, type Row} from '@tanstack/react-table';
import {type StaticImport} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import {useState, type ChangeEvent} from 'react';
import {Modal} from '../(shared)/modal/Modal';
import Table, {
	type HtmlTableElementClasses,
} from '../(shared)/table/Table';

const columnHelper = createColumnHelper<CustomerModel>();

type ShowTableActionModals = {
	view: boolean;
	edit: boolean;
};

export const ViewCustomerModal = ({show, setShow, row, onDelete}: {show: boolean; row: Row<CustomerModel>; setShow: (show: boolean) => void; onDelete: (id: string) => void}) => {
	const {original: customer} = row;

	return (
		<Modal show={show} setShow={setShow}>
			<Modal.Header>
				<Image
					src={customer.image}
					className='rounded-full'
					width={50}
					height={50}
					alt={`Image of ${customer.fullName ?? 'unknown'}`}
				/>
				<h1>{customer.fullName}</h1>
			</Modal.Header>
			<Modal.Body>
				<div className='flex flex-col gap-2 p-5 justify-center normal-case font-bold'>
					<div>ID: {customer.id}</div>
					<div>Email: {customer.email}</div>
					<div>Address: {customer.address}</div>
					<div>About: {customer.bio}</div>
					<div>Phone: {customer.phone}</div>
					<div>Type: {customer.accountName}</div>
					<div>Customer Since: {new Date(customer.accountCreated as unknown as CustomerModel['accountCreated']).toDateString() as unknown as string}</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button onClick={async () => {
					onDelete(customer.id);
					setShow(false);
				}} className='bg-error/50 rounded px-2 py-1 uppercase'>Delete</button>
				<button className='bg-black/50 rounded px-2 py-1 uppercase' onClick={() => {
					setShow(false);
				}}>Close</button>
			</Modal.Footer>
		</Modal>
	);
};

export const EditCustomerModal = ({show, setShow, row, onUpdate}: {show: boolean; row: Row<CustomerModel>; setShow: (show: boolean) => void; onUpdate: (customer: CustomerModel) => void}) => {
	const {original: customer} = row;
	const [updatedCustomer, setUpdatedCustomer] = useState({
		...customer,
	});

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setUpdatedCustomer(prevInputs => ({...prevInputs, [name]: value}));
	};

	return (
		<Modal show={show} setShow={setShow}>
			<Modal.Header>
				<Image
					src={customer.image}
					className='rounded-full'
					width={50}
					height={50}
					alt={`Image of ${customer.fullName ?? 'unknown'}`}
				/>
				<h1>{customer.fullName}</h1>
			</Modal.Header>
			<Modal.Body>
				<div className='flex flex-col gap-2 p-5 justify-center normal-case font-bold items-stretch w-full'>
					<div>Email: <input type='email' name='email' onChange={onInputChange} value={updatedCustomer.email} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Address: <input type='text' name='address' onChange={onInputChange} value={updatedCustomer.address} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>About: <input type='text' name='bio' onChange={onInputChange} value={updatedCustomer.bio} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Phone:  <input type='text' name='phone' onChange={onInputChange} value={updatedCustomer.phone} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
					<div>Type: <input type='text' name='accountName' onChange={onInputChange} value={updatedCustomer.accountName} className='bg-[#333] min-w-[300px] m-2 p-2 rounded'/></div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button onClick={() => {
					onUpdate(updatedCustomer);
					setShow(false);
				}} className='bg-warn/50 rounded px-2 py-1 uppercase'>Update</button>
				<button onClick={() => {
					setShow(false);
				}} className='bg-black/50 rounded px-2 py-1 uppercase'>Close</button>
			</Modal.Footer>
		</Modal>);
};

const RowActions = ({
	row,
	classes = {
		rowClass: 'flex flex-col md:flex-row gap-3 uppercase whitespace-nowrap',
		viewBtnClass: 'px-3 py-2 uppercase bg-info/50 rounded',
		editBtnClass: 'px-3 py-2 uppercase bg-warn/50 rounded',
		deleteBtnClass: 'px-3 py-2 uppercase bg-error/50 rounded',
	},
	setData,
}: {
	row: Row<CustomerModel>;
	classes?: {
		rowClass: string;
		viewBtnClass: string;
		editBtnClass: string;
		deleteBtnClass: string;
	};
	setData?: (customers: CustomerModel[]) => void;
}) => {
	const {rowClass, viewBtnClass, editBtnClass, deleteBtnClass} = classes;
	const [showModals, setShowModals] = useState<ShowTableActionModals>({
		view: false,
		edit: false,
	});

	const updateShowModals = (modal: 'view' | 'edit', show: boolean) => {
		const defaultModalStates: ShowTableActionModals = {
			edit: false,
			view: false,
		};
		setShowModals(() => ({
			...defaultModalStates,
			[modal]: show,
		}));
	};

	const setViewModal = (show: boolean) => {
		updateShowModals('view', show);
	};

	const setEditModal = (show: boolean) => {
		updateShowModals('edit', show);
	};

	const onDelete = async (customerId: CustomerModel['id']) => {
		await fetch(`${ApiRoutes.Customers}/${customerId}`, {
			method: 'DELETE',
		});
		const {data} = row.getAllCells()[0].getContext().table.options;
		const filteredData = data.filter(cust => cust.id !== customerId);
		setData!(filteredData);
	};

	const onUpdate = async (customer: CustomerModel) => {
		const {id: customerId} = customer;
		console.log(customer);

		await fetch(`${ApiRoutes.Customers}/${customerId}`, {
			method: 'PATCH',
			headers: {
				...requestHeaders.contentType,
			},
			body: JSON.stringify(customer),
		});
		const {data} = row.getAllCells()[0].getContext().table.options;
		const updatedData = data.map(cust => {
			if (cust.id === customerId) {
				return customer;
			}

			return cust;
		});
		setData!(updatedData);
	};

	return (
		<div className={rowClass}>
			<button onClick={() => {
				setViewModal(!showModals?.view);
			}} className={viewBtnClass}>View</button>
			{showModals.view && <ViewCustomerModal show={showModals.view} onDelete={onDelete} row={row} setShow={setViewModal}/>}
			<button onClick={() => {
				setEditModal(!showModals?.edit);
			}} className={editBtnClass}>Edit</button>
			{showModals.edit && <EditCustomerModal show={showModals.edit} onUpdate={onUpdate} row={row} setShow={setEditModal}/>}
			<button onClick={async () => onDelete(row.original.id)} className={deleteBtnClass}>Delete</button>
		</div>
	);
};

const defaultColumns = (setCustomers: (customers: CustomerModel) => void) => [
	columnHelper.accessor('fullName', {
		id: 'fullName',
		header: () => <span>Customer</span>,
		cell: (props: {row: {original: {image: string | StaticImport; fullName: string}}}) => (
			<div className='flex items-center gap-3'>
				<Image
					src={props.row.original.image}
					className='rounded-full'
					width={50}
					height={50}
					alt={`Image of ${props.row.original.fullName ?? 'unknown'}`}
				/>
				{props.row.original.fullName}
			</div>
		),
	}),
	columnHelper.accessor('email', {
		cell: info => <span className='hidden md:block'>{info.getValue()} </span>,
		header: () => <span className='hidden md:block'>Email</span>,
	}),
	columnHelper.accessor('accountName', {
		id: 'accountName',
		cell: info => (
			<span className='hidden md:block'>
				{info
					.getValue()
					.split(' ')
					.filter(word => word !== 'Account')
					.join(' ')}
			</span>
		),
		header: () => <span className='hidden md:block'>Account Type</span>,
	}),
	columnHelper.display({
		id: 'actions',
		header: () => <span className=''>Actions</span>,
		cell(props) {
			return <RowActions setData={setCustomers as () => void} row={props.row} />;
		},
	}),
];
export default function CustomerTable({
	customers,
	classes,
	setCustomers,
}: {
	customers: CustomerModel[];
	classes?: HtmlTableElementClasses;
	setCustomers: (customers: CustomerModel[]) => void;
}) {
	return <Table columns={defaultColumns(setCustomers as () => void) as Array<Column<CustomerModel>>} data={customers} classes={classes} setData={setCustomers}/>;
}
