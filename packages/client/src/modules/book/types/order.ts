export interface Order {
  id: string;
  InstrumentName: string;
  clientId: string;
  clientPrice: number;
  direction: string;
  notionalAmount: number;
  clientTicketId: string;
  status: string;
  tradeDate: string;
}
