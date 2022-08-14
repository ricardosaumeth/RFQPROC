import { formatPrice } from 'modules/reference-data/utils';

export const priceFormatter = (params: { value: number }) => formatPrice(params.value);
