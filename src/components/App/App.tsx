import { useState } from 'react';
import './App.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useFetch } from '../utils/useFetch';
import { ICurrency, IExchanger } from '../../types';
import { LoaderProvider } from '../UI/Loader/Loader';

function App() {
    const [exchangers, setExchangers] = useState<IExchanger[] | null>(null);
    const [currencies, setCurrencies] = useState<ICurrency[] | null>(null);

    const [valueFrom, setValueFrom] = useState('');
    const [valueTo, setValueTo] = useState('');
    const [url, setUrl] = useState('');

    const { isLoading: isExchangersLoading, isError: isExchangersError } = useFetch({
        url,
        onLoad: (data) => {
            setExchangers(data);
        },
    });

    const { isLoading: isCurrenciesLoading, isError: isCurrenciesError } = useFetch({
        url: 'https://wttonline.ru/api/valute/no_cash',
        onLoad: (curr) => {
            const currList = Object.keys(curr)
                .map((el) => curr[el])
                .flat();
            return setCurrencies(currList as ICurrency[]);
        },
    });

    return (
        <div className='App'>
            <Header />
            <LoaderProvider isLoading={isCurrenciesLoading} isError={isCurrenciesError}>
                {currencies && (
                    <Main
                        setUrl={setUrl}
                        url={url}
                        valueFrom={valueFrom}
                        valueTo={valueTo}
                        setValueFrom={setValueFrom}
                        setValueTo={setValueTo}
                        currencies={currencies}
                        exchangers={exchangers}
                        isExchangersLoading={isExchangersLoading}
                        isExchangersError={isExchangersError}
                    />
                )}
            </LoaderProvider>
        </div>
    );
}

export default App;
