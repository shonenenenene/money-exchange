import React from 'react';
import './Main.scss';
import Exchanger from '../Exchanger/Exchanger';
import { ICurrency, IExchanger } from '../../types';
import Directions from '../Directions/Directions';
import { LoaderProvider } from '../UI/Loader/Loader';

interface MainProps {
    currencies: ICurrency[];
    valueFrom: string;
    setValueFrom(str: string): void;
    valueTo: string;
    setValueTo(str: string): void;
    url: string;
    setUrl(str: string): void;
    exchangers: IExchanger[] | null;
    isExchangersLoading: boolean;
    isExchangersError: boolean;
}

const Main = ({
    currencies,
    valueFrom,
    setValueFrom,
    valueTo,
    setValueTo,
    setUrl,
    url,
    exchangers,
    isExchangersLoading,
    isExchangersError,
}: MainProps) => {
    return (
        <main className='main container'>
            <Exchanger
                valueFrom={valueFrom}
                setValueFrom={setValueFrom}
                valueTo={valueTo}
                setValueTo={setValueTo}
                currencies={currencies}
                url={url}
                setUrl={setUrl}
            />
            {url && (
                <LoaderProvider isLoading={isExchangersLoading} isError={isExchangersError}>
                    {exchangers && <Directions exchangers={exchangers} />}
                </LoaderProvider>
            )}
        </main>
    );
};

export default Main;
