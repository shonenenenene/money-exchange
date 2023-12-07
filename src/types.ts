export interface ICurrency {
    code_name: string;
    icon_url?: string;
    name: string;
    type_valute?: string;
}

export interface IExchanger {
    icon_valute_from?: string;
    icon_valute_to?: string;
    id: number;
    in_count?: number;
    max_amount?: string;
    min_amount?: string;
    name: string;
    out_count?: number;
    partner_link?: string;
    valute_from: string;
    valute_to: string;
}
