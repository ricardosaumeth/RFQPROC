import numeral from 'numeral';

export const formatPrice = (price: number | string | undefined) => numeral(price).format('0,0.00');

export const formatAmount = (volume: number) => numeral(volume).format('0.00 a');
