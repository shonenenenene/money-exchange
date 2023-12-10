import ErrorScreen from '../../ErrorScreen/ErrorScreen';
import './Loader.scss';

import { PropsWithChildren } from 'react';

interface LoaderProviderProps {
    isLoading?: boolean;
    isError?: boolean;
}

export const LoaderProvider = ({ children, isLoading, isError }: PropsWithChildren<LoaderProviderProps>) => {
    if (isError && !isLoading) {
        return <ErrorScreen />;
    }

    return (
        <>
            {isLoading ? (
                <div className='loader'>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                children
            )}
        </>
    );
};
