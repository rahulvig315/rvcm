'use client';
import {type Customer as CustomerModel} from '@prisma/client';
import {createColumnHelper, type Column, type Row} from '@tanstack/react-table';
import Image from 'next/image';
import Table, {
	type HtmlTableElementClasses,
} from '../(shared)/Table';

const columnHelper = createColumnHelper<CustomerModel>();

const RowActions = ({
	row,
	classes = {
		rowClass: 'flex flex-col md:flex-row gap-3 uppercase whitespace-nowrap',
		viewBtnClass: 'px-3 py-2 uppercase bg-info/50 rounded',
		editBtnClass: 'px-3 py-2 uppercase bg-warn/50 rounded',
		deleteBtnClass: 'px-3 py-2 uppercase bg-error/50 rounded',
	},
}: {
	row: Row<CustomerModel>;
	classes?: {
		rowClass: string;
		viewBtnClass: string;
		editBtnClass: string;
		deleteBtnClass: string;
	};
}) => {
	const {rowClass, viewBtnClass, editBtnClass, deleteBtnClass} = classes;

	return (
		<div className={rowClass}>
			<button className={viewBtnClass}>View</button>
			<button className={editBtnClass}>Edit</button>
			<button className={deleteBtnClass}>Delete</button>
		</div>
	);
};

const defaultColumns = [
	columnHelper.display({
		id: 'customer',
		header: () => <span>Customer</span>,
		cell: props => (
			<div className='flex items-center gap-3'>
				<Image
					src={props.row.original.image}
					className='rounded-full'
					width={50}
					height={50}
					alt={`Image of ${props.row.original.fullName}`}
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
			return <RowActions row={props.row} />;
		},
	}),
];

export default function CustomerTable({
	customers,
	classes,
}: {
	customers: CustomerModel[];
	classes?: HtmlTableElementClasses;
}) {
	return <Table columns={defaultColumns as Array<Column<CustomerModel>>} data={customers} classes={classes} />;
}
