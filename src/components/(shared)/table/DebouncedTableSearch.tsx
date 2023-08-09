import React, {useEffect, useState, type ChangeEvent} from 'react';

type DebouncedTableSearchProps = {
	tableName?: string;
	value: string | number | boolean;
	onChange: (value: DebouncedTableSearchProps['value']) => void;
	debounce?: number;
	classes?: Record<'wrapper' | 'label' | 'input', string>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const DebouncedTableSearch: React.FC<DebouncedTableSearchProps> = ({
	classes = {
		wrapper: 'p-3 text-xs flex-1',
		label: 'uppercase w-1/3 mx-3 font-semibold',
		input: 'p-2 rounded-lg  w-2/3 m-1 hover:ring hover:ring-blue-500/50 bg-[#333]',
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
