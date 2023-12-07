import React from 'react';
import './Directions.scss';
import { IExchanger } from '../../types';

interface DirectionsProps {
    exchangers: IExchanger[];
}

// icon_valute_from?: string;
// icon_valute_to?: string;
// id: number;
// in_count?: number;
// max_amount?: string;
// min_amount?: string;
// name: string;
// out_count?: number;
// partner_link?: string;
// valute_from: string;
// valute_to: string;

const Directions = ({ exchangers }: DirectionsProps) => {
    return (
        <div className='exchangers'>
            {exchangers.map((e: IExchanger) => (
                <div className='exchangers-item' key={e.id}>
                    <div className='exchanger-name'>
                        Обменник: <h3>{e.name}</h3>
                    </div>
                    <div className='exchanger-count'>
                        <div>
                            Курс {e.valute_from} к {e.valute_to}: <span>{e.out_count}</span>
                        </div>
                        <div>
                            <div>
                                min: <span>{e.min_amount}</span>
                            </div>
                            <div>
                                max: <span>{e.max_amount}</span>
                            </div>
                        </div>
                    </div>
                    <a className='exchanger-link' href={e.partner_link} rel='noreferrer' target='_blank'>
                        К обменнику
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Directions;
