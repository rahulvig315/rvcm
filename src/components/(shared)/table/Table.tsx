'use client';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type Column,
} from '@tanstack/react-table';
import {useState} from 'react';
import DebouncedTableSearch from './DebouncedTableSearch';
import TablePaginationActionGroup from './TablePaginationActionGroup';

export type HtmlTableElementClasses = {
	wrapper?: string;
	table?: string;
	thead?: string;
	trHead?: string;
	th?: string;
	tbody?: string;
	trBody?: string;
	td?: string;
	tfoot?: string;
	trFoot?: string;
	thFoot?: string;
};

export const defaultTableClasses = {
	wrapper: 'text-xs w-[85vw] max-h-[80vh] overflow-auto flex flex-col z-10 pb-32',
	table: 'table-auto w-full m-auto text-left',
	thead: 'w-screen sticky top-0',
	trHead: 'bg-[#000] w-full uppercase shadow-2xl drop-shadow-2xl',
	th: 'p-5 font-light tracking-widest',
	tbody: 'divide-y divide-[#132] flex-1',
	trBody: 'even:bg-[#222] w-full',
	td: 'p-5 font-extralight break-all',
	tfoot: '',
	trFoot: '',
	thFoot: '',
};

export type TableProps<T extends Record<string, unknown>> = {
	columns: Array<Column<T>>;
	data: T[];
	classes?: HtmlTableElementClasses;
	setData: (data: TableProps<T>['data']) => void;
};

function Table<T extends Record<string, unknown>>({
	columns,
	data,
	classes = defaultTableClasses,
	setData,
}: TableProps<T>) {
	const [globalFilterVal, setGlobalFilterVal] = useState('');
	const table = useReactTable<T>({
		columns,
		data,
		state: {
			globalFilter: globalFilterVal,
		},
		meta: {
			setData,
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onGlobalFilterChange: setGlobalFilterVal,
	});

	if (!table) {
		return null;
	}

	return (
		<>
			<div className='flex justify-evenly'>
				<DebouncedTableSearch value={globalFilterVal ?? ''} onChange={value => {
					setGlobalFilterVal(String(value));
				}}/>
				<TablePaginationActionGroup enabledActions={'all'} show={true} table={table}/>
			</div>
			<div className={classes.wrapper}>
				<table className={classes.table}>
					<thead className={classes.thead}>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id} className={classes.trHead}>
								{headerGroup.headers.map(header => (
									<th key={header.id} className={classes.th}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className={classes.tbody}>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className={classes.trBody}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className={classes.td}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
					<tfoot className={classes.tfoot}>
						{table.getFooterGroups().map(footerGroup => (
							<tr key={footerGroup.id} className={classes.trFoot}>
								{footerGroup.headers.map(header => (
									<th key={header.id} className={classes.thFoot}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.footer,
												header.getContext(),
											)}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				</table>
			</div>
		</>

	);
}

export default Table;
