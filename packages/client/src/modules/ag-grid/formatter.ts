import { formatPrice } from 'modules/reference-data/utils';

export const priceFormatter = (params: { value: number }) => formatPrice(params.value);

export const isValueIncreased = (current: string, previous: string) => {
  const digits = 2;
  return parseFloat(current).toFixed(digits) > parseFloat(previous).toFixed(digits);
};
