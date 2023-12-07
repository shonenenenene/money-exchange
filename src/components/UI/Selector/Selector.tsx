import { ChangeEvent } from 'react';
import { ICurrency } from '../../../types';
import './Selector.scss';

interface SelectorProps {
    currencies: ICurrency[];
    label: string;
    onChange(str: string): void;
    setUrl(str: string): void;
    disabled?: boolean;
    disabledString?: string;
    ignoreId?: string;
    value: string;
}

const Selector = ({ currencies, onChange, label, disabled, disabledString, setUrl, ignoreId, value }: SelectorProps) => {
    const onChangeHandler = (ev: ChangeEvent<HTMLSelectElement>) => {
        onChange(ev.target.value);
        setUrl('');
    };

    return (
        <div className='selector'>
            <label htmlFor={label}>{label}</label>
            <select value={value} onChange={onChangeHandler} disabled={disabled} id={label}>
                <option hidden>{disabled && disabledString ? disabledString : 'выберите валюту'}</option>
                {currencies
                    .filter((e) => e.code_name !== ignoreId)
                    .map((e) => {
                        return (
                            <option key={e.code_name} value={e.code_name}>
                                {e.name}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
};

export default Selector;
