import React from 'react';
import './Exchanger.scss';
import Selector from '../UI/Selector/Selector';
import { ICurrency } from '../../types';
import { ExchangeIcon } from '../../assets/icons';

interface ExchangerProps {
    currencies: ICurrency[];
    valueFrom: string;
    setValueFrom(str: string): void;
    valueTo: string;
    setValueTo(str: string): void;
    url: string;
    setUrl(str: string): void;
}

const Exchanger = ({ currencies, valueFrom, setValueFrom, valueTo, setValueTo, url, setUrl }: ExchangerProps) => {
    const getDirections = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const newUrl = `https://wttonline.ru/api/directions?valute_from=${valueFrom}&valute_to=${valueTo}`;
        setUrl(newUrl);
    };

    return (
        <div className='exchanger'>
            <form className='exchanger-form' onSubmit={getDirections}>
                <div className='exchanger-selectors'>
                    <Selector
                        setUrl={setUrl}
                        onChange={(value) => {
                            setValueFrom(value);
                            setValueTo('');
                        }}
                        value={valueFrom}
                        currencies={currencies}
                        label='Выберите что отдаете'
                    />
                    <div className='exchanger-icon'>
                        <img draggable={false} src={ExchangeIcon} alt='exchanger-icon' />
                    </div>
                    <Selector
                        setUrl={setUrl}
                        ignoreId={valueFrom}
                        value={valueTo}
                        onChange={setValueTo}
                        disabled={!valueFrom}
                        disabledString='предыдущее поле'
                        currencies={currencies}
                        label='Выберите что получаете'
                    />
                </div>
                {!!valueTo && !url && (
                    <button className='exchanger-button' type='submit'>
                        ДАЛЕЕ
                    </button>
                )}
            </form>
        </div>
    );
};

export default Exchanger;
