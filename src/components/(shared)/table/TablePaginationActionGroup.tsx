import {type Table} from '@tanstack/react-table';
import {useState} from 'react';

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
		prevPage: 'bg-[#132] px-3 py-1 rounded-sm disabled:bg-[#333]',
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

function TablePaginationActionGroup<T extends Record<string, unknown>>({classes = defaultClasses, enabledActions = 'all', show = false, table}: TablePaginationActionGroupProps<T>) {
	const [pageNum, setPageNum] = useState<number>((table?.getState().pagination?.pageIndex ?? 0) + 1);
	if (!show || !table) {
		return <></>;
	}

	return (
		<>
			<div className={classes?.wrapper}>
				<div className={classes?.inputs?.wrapper}>
					<>
						<label className={classes?.labels?.rowsPerPageDropdown}>
							Rows to Display:{' '}
						</label>
						<select name='rowsPerPageDropdown' className={classes?.inputs?.rowsPerPageDropdown} onChange={e => {
							table.setPageSize(Number(e.target.value));
						}} value={table.getState().pagination.pageSize}>
							{[5, 10, 25, 50, 75, 100].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>))}
						</select>
					</>
					<>
						<input type='number' value={pageNum} max={table.getPageCount()} min={1} className={classes?.inputs?.jump} onChange={e => {
							setPageNum(() => Number(e.target.value));
						}}/>
						<button className={classes?.buttons?.jump} onClick={() => {
							table.setPageIndex(pageNum <= 0 ? pageNum : pageNum > table?.getPageCount() ? table.getPageCount() - 1 : pageNum - 1);
						}}>Go</button>
					</>
				</div>
				<div className={classes?.buttons?.wrapper}>
					<button className={classes?.buttons?.firstPage} onClick={() => {
						setPageNum(1);
						table?.setPageIndex(0);
					}} type='button' name='first'>First</button>
					<button disabled={!table?.getCanPreviousPage()} onClick={() => {
						table.previousPage();
					}} className={classes?.buttons?.prevPage} type='button' name='prev'>Prev.</button>
					<button disabled={!table?.getCanNextPage()} onClick={() => {
						table.nextPage();
					}} className={classes?.buttons?.nextPage} type='button' name='next'>Next</button>
					<button className={classes?.buttons?.lastPage} onClick={() => {
						setPageNum(table.getPageCount() - 1);
						table.setPageIndex(Number((table?.getPageCount() || 2) - 1));
					}}type='button' name='last'>Last</button>
				</div>
				<label className={classes?.labels?.pageNum}>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</label>
			</div>
		</>
	);
}

export default TablePaginationActionGroup;
