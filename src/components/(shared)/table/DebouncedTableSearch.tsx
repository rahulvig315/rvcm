import React, { useEffect, useState, type ChangeEvent } from 'react';

type DebouncedTableSearchProps = {
	tableName?: string;
	value: string | number | boolean;
	onChange: (value: DebouncedTableSearchProps['value']) => void;
	debounce?: number;
	classes?: Record<'wrapper' | 'label' | 'input', string>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const DebouncedTableSearch: React.FC<DebouncedTableSearchProps> = ({
	classes = {
		wrapper: 'flex items-center justify-center gap-5 p-3 bg-[#222] m-auto sticky top-0 z-10 text-xs',
		label: 'uppercase',
		input: 'p-2 flex-1 max-w-[400px] rounded-lg bg-black hover:ring hover:ring-blue-500/50',
	},
	tableName = '',
	value: initialValue,
	onChange,
	debounce = 500,
	...htmlInputElementProps
}: DebouncedTableSearchProps) => {
	const [value, setValue] = useState<DebouncedTableSearchProps['value']>(initialValue);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, onChange, debounce]);

	return (
		<div className={classes.wrapper}>
			<label className={classes.label}> Search {tableName}</label>
			<input onChange={handleInputChange} {...htmlInputElementProps} value={value} className={classes.input}/>
		</div>
	);
};

export default DebouncedTableSearch;
