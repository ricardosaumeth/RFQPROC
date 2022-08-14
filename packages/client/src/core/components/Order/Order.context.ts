import { createContext, useContext } from 'react';
import { Ticker } from './../../../modules/ticker/types/Ticker';

const OrderContext = createContext<{
  currency?: Ticker;
}>({} as any);

export const { Provider } = OrderContext;
export const useOrderContext = () => useContext(OrderContext);
