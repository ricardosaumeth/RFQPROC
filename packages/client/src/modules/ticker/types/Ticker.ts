export interface Ticker {
  id?: number;
  currency?: string;
  timestamp?: number;
  bid?: number;
  ask?: number;
  lastBid?: number;
  lastAsk?: number;
  volume?: number;
}
