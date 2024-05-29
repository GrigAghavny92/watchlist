import {async, BehaviorSubject, from, interval, map, Observable, of, Subject, switchMap} from "rxjs";
import {Injectable} from "@angular/core";

import {WatchListService} from "./api/watchlist.service";
import {StockModel} from "../model/stock-model";
import {generateStockData, STOCK_OPTIONS,} from "../dummy/stock-data.generator";
import {replacer, reviver} from "../shared/utils/converters";

@Injectable()
export class DemoWatchlistService implements WatchListService {

  private readonly LIST_STORAGE_KEY = 'watch_list';
  private readonly OPTIONS_STORAGE_KEY = 'stock_options';

  private readonly defaultWatchList: number[] = [3, 7, 5, 8, 6, 1];

  private readonly watchList$: BehaviorSubject<StockModel[]>;

  constructor() {
    this.watchList$ = new BehaviorSubject<StockModel[]>(this.produceNewWatchList());
    this.scheduleWatchListProducer();
  }

  getWatchList(): Observable<StockModel[]> {
    return this.watchList$
  }

  removeStock(id: number) {
    const watchList: number[] = JSON.parse(localStorage.getItem(this.LIST_STORAGE_KEY) ||'[]');
    this.saveWatchlist(watchList.filter(stockId => +stockId != id));
  }

  addStock(stockId: number): Observable<StockModel> {
    const watchList = JSON.parse(localStorage.getItem(this.LIST_STORAGE_KEY) || '[]')
    watchList.push(stockId);
    this.saveWatchlist(watchList);

    return of(generateStockData([stockId])[0])
  }

  getStockOptions(): Observable<any> {
    if(!localStorage.getItem(this.OPTIONS_STORAGE_KEY)) {
      localStorage.setItem(this.OPTIONS_STORAGE_KEY, JSON.stringify(STOCK_OPTIONS, replacer));
    }
    return of(JSON.parse(localStorage.getItem(this.OPTIONS_STORAGE_KEY) || '{}', reviver));
  }

  private scheduleWatchListProducer() {
    interval(3000).pipe(
      map(() => {
        return this.watchList$.next(this.produceNewWatchList())
      })
    ).subscribe()
  }

  private produceNewWatchList() {
    if (!localStorage.getItem(this.LIST_STORAGE_KEY)) {
      localStorage.setItem(this.LIST_STORAGE_KEY, JSON.stringify(this.defaultWatchList));
    }
    return generateStockData(JSON.parse(localStorage.getItem(this.LIST_STORAGE_KEY) || '[]'));
  }

  private saveWatchlist(data: any): void {
    localStorage.setItem(this.LIST_STORAGE_KEY, JSON.stringify(data));
  }
}
