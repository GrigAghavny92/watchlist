export interface StockModel {
  id: number;
  name: string;
  last: number;
  bid: number;
  ask: number;
  chgInPercent: string;
  chgByCurrency: string;
  high: number;
  low: number;
  vol: number;
}
