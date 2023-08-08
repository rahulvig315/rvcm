import React, {useEffect, useState, type ChangeEvent} from 'react';

type DebouncedTableSearchProps = {
	value: string | number | boolean;
	onChange: (value: DebouncedTableSearchProps['value']) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const DebouncedTableSearch: React.FC<DebouncedTableSearchProps> = ({
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

	return <input onChange={handleInputChange} {...htmlInputElementProps} value={value}/>;
};

export default DebouncedTableSearch;
