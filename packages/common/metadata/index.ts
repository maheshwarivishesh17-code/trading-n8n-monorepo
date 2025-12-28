
export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export type Tradingmetadata= {
    type: "LONG" | "SHORT";
    symbol: typeof SUPPORTED_ASSETS[number];
    qty: number;
}
export type TimerNodeMetadata = {
    time:number;
};
export type PriceTriggerMetadata = {
    asset:string,
    price:number,
};