import {StockModel} from "../model/stock-model";

export function generateStockData(idsList: number[]): StockModel[] {

  return idsList.reduce((acc: Array<StockModel>, id: number) => {
    const stockItem: any = {
      id: id,
      name: STOCK_OPTIONS.get(id),
      last: roundToTwo(Math.random() * 100),
      bid: roundToTwo(Math.random() * 100),
      ask: roundToTwo(Math.random() * 100),
      chgInPercent: `${(Math.random() * 10 - 5).toFixed(2)}%`,
      chgByCurrency: `${(Math.random() * 10 - 5).toFixed(2)}`,
      high: roundToTwo(Math.random() * 100),
      low: roundToTwo(Math.random() * 100),
      vol: Math.floor(Math.random() * 1000) + 1,
    };
    acc.push(stockItem);
    return  acc;
  }, []);
}

function roundToTwo(num: number): number {
  return parseFloat(num.toFixed(2));
}

// Stock OPTIONS
export const STOCK_OPTIONS = new Map([
  [1,'TSLA'],
  [2, 'NVDA.TO'],
  [3, 'NVDA'],
  [4, 'MSFT'],
  [5, 'GOOG'],
  [6, 'AAPL'],
  [7, 'AMZN'],
  [8, 'VFV.TO']
]);
