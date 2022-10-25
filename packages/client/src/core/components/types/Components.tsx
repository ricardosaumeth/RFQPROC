export enum KnownComponents {
  market = 'Market',
  trades = 'Trades Log',
  book = 'Book',
  candle = 'Candle',
  depth = 'Depth',
}

export type KnownComponentsStr = keyof typeof KnownComponents;
