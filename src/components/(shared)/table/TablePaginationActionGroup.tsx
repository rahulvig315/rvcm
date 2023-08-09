import { type Table } from '@tanstack/react-table';
import { useState } from 'react';

export type TablePaginationActionElements = 'first' | 'last' | 'next' | 'prev' | 'jump' | 'size';
export type EnabledActionsOptions = 'all' | TablePaginationActionElements[];
export type TablePaginationActionGroupProps<T> = {
	classes?: {
		wrapper?: string;
		buttons?: {
			wrapper?: string;
			firstPage?: string;
			nextPage?: string;
			prevPage?: string;
			lastPage?: string;
			jump?: string;
		};
		inputs?: {
			wrapper?: string;
			jump?: string;
			rowsPerPageDropdown?: string;
		};
		labels?: {
			pageNum?: string;
			jump?: string;
			rowsPerPageDropdown?: string;
		};
	};
	enabledActions?: EnabledActionsOptions;
	show?: boolean;
	table?: Table<T>;
};

const defaultClasses: TablePaginationActionGroupProps<unknown>['classes'] = {
	wrapper: 'text-xs flex  justify-center items-center gap-2 p-3',
	buttons: {
		wrapper: ' flex gap-3 p-1',
		firstPage: 'bg-[#132] px-3 py-1 rounded-sm',
		nextPage: 'bg-[#132] px-3 py-1  rounded-sm',
		prevPage: 'bg-[#132] px-3 py-1 rounded-sm',
		lastPage: 'bg-[#132] px-3 py-1 rounded-sm',
		jump: 'uppercase bg-[#132] px-3 py-1 rounded-sm',
	},
	inputs: {
		wrapper: 'flex gap-3 p-2 items-center',
		jump: 'max-w-[50px] bg-[#333] rounded p-1',
		rowsPerPageDropdown: 'max-w-[50px] bg-[#333] rounded p-1',
	},
	labels: {
		pageNum: 'p-2',
		rowsPerPageDropdown: '',
	},
};

const TableActionGroup: React.FC<TablePaginationActionGroupProps<any>> = ({classes = defaultClasses, enabledActions = 'all', show = false, table}: TablePaginationActionGroupProps<any>) => {
	const [pageNum, setPageNum] = useState<number>((table?.options.state.pagination?.pageIndex ?? 0) + 1);
	if (!show || !table) {
		return <></>;
	}

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.inputs?.wrapper}>
					<>
						<label className={classes.labels?.rowsPerPageDropdown}>
							Rows to Display:{' '}
						</label>
						<select name='rowsPerPageDropdown' className={classes.inputs?.rowsPerPageDropdown} onChange={e => {
							table.setPageSize(Number(e.target.value));
						}} value={table.getState().pagination.pageSize}>
							{[5, 10, 25, 50, 75, 100].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>))}
						</select>
					</>
					<>
						<input type='number' max={table.getPageCount()} min={1} className={classes.inputs?.jump} />
						<button className={classes.buttons?.jump}>Go</button>
					</>
				</div>
				<div className={classes.buttons?.wrapper}>
					<button className={classes.buttons?.firstPage} type='button' name='first'>First</button>
					<button className={classes.buttons?.prevPage} type='button' name='prev'>Prev</button>
					<button className={classes.buttons?.nextPage} type='button' name='next'>Next</button>
					<button className={classes.buttons?.lastPage} type='button' name='last'>Last</button>
				</div>
				<label className={classes.labels?.pageNum}>
					Page {pageNum} of {table.getPageCount()}
				</label>
			</div>
		</>
	);
};

export default TableActionGroup;
