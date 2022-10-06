export enum KnownComponents {
    market = "Market",
    trades = "Trades Log",
    book = "Book",
    candle = "Candle"
};

export type KnownComponentsStr = keyof typeof KnownComponents;