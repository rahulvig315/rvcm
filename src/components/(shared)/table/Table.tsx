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
	wrapper: 'text-xs w-[85vw] max-h-[80vh] overflow-auto flex flex-col',
	table: 'table-auto w-full m-auto text-left',
	thead: 'w-screen sticky top-0',
	trHead: 'bg-[#000] w-full uppercase shadow-2xl drop-shadow-2xl',
	th: 'p-5 font-light tracking-widest',
	tbody: 'divide-y divide-[#132] flex-1',
	trBody: 'even:bg-[#222] w-full',
	td: 'p-3 font-extralight break-all',
	tfoot: '',
	trFoot: '',
	thFoot: '',
};

export type TableProps<T extends Record<string, unknown>> = {
	columns: Array<Column<T>>;
	data: T[];
	classes?: HtmlTableElementClasses;
};

function Table<T extends Record<string, unknown>>({
	columns,
	data,
	classes = defaultTableClasses,
}: TableProps<T>) {
	const [filtering, setFiltering] = useState();
	const table = useReactTable<T>({
		columns,
		data,
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 5,
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className={classes.wrapper}>
			<input type='text' value={} />
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
	);
}

export default Table;
