import {StockModel} from "../../model/stock-model";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class WatchListService {

  abstract getStockOptions(): Observable<Map<number, string>>;

  abstract addStock(id: number): Observable<StockModel>;

  abstract removeStock(id: number): void;

  abstract getWatchList(): Observable<StockModel[]>;
}
