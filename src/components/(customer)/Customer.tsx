'use client';
import { Customer as CustomerModel } from '@prisma/client';
import { Row, createColumnHelper } from '@tanstack/react-table'
import Image from 'next/image';
import Table, { HTMLTableElementClasses, defaultTableClasses } from '../(shared)/Table';

const columnHelper = createColumnHelper<CustomerModel>();


const RowActions = ({ row, classes = { rowClass: 'text-right' } }: { row: Row<CustomerModel>, classes?: { rowClass: string } }) => {
  return (
    <div className={classes.rowClass}>
      <button >View</button>
      <button >Edit</button>
      <button >Delete</button>
    </div>
  )
}



const defaultColumns: any = [
  columnHelper.display({
    id: 'customer',
    header: () => <span >Customer</span>,
    cell: props => <div ><Image src={props.row.original.image} width={50} height={50} alt={`Image of ${props.row.original.fullName}`} />{props.row.original.fullName}</div>,
  }),
  columnHelper.accessor('email', {
    cell: info => info.getValue(),
    header: () => <span >Email</span>
  }),
  columnHelper.accessor('accountName', {
    id: 'accountName',
    cell: info => info.getValue().split(' ').filter(word => word !== 'Account').join(' '),
    header: () => <span >Account Type</span>
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span className='flex justify-end'>Actions</span>,
    cell(props) {
      return <RowActions row={props.row} />
    },
  })
]

export default function CustomerTable({ customers, classes }: { customers: CustomerModel[], classes?: HTMLTableElementClasses }) {
  return <Table columns={defaultColumns} data={customers} classes={classes} />
};


