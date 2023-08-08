export type TablePaginationActionElements = 'first' | 'last' | 'next' | 'prev' | 'jump' | 'size';
export type EnabledActionsOptions = 'all' | TablePaginationActionElements[];
export type TablePaginationActionGroupProps = {
	classes?: {
		buttons?: {
			firstPage: string;
			nextPage: string;
			prevPage: string;
			lastPage: string;
		};
		inputs?: {
			pageSelect: string;
			rowsPerPageDropdown: string;
		};
		labels?: {
			pageNum: string;
			goTo: string;
		};
	};
	enabledActions?: EnabledActionsOptions;
	show?: boolean;
};

const TableActionGroup: React.FC<TablePaginationActionGroupProps> = ({classes, enabledActions = 'all', show = false}: TablePaginationActionGroupProps) => {
	if (!show) {
		return <></>;
	}

	return (
		<>

		</>
	);
};

export default TableActionGroup;
