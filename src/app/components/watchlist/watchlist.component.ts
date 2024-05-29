import {AfterViewInit, Component, OnDestroy, OnInit, signal, ViewChild} from "@angular/core";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {combineLatest, Subject, take, takeUntil} from "rxjs";
import {CommonModule} from "@angular/common";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatOption, MatRippleModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

import {StockModel} from "../../model/stock-model";
import {ValueTransformerPipe} from "../../pipes/value-transformer.pipe";
import {WatchListService} from "../../service/api/watchlist.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatIconModule,
    MatIconButton,
    MatCardModule,
    MatRippleModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    ValueTransformerPipe,
    FormsModule
  ],
  standalone: true
})

export class WatchlistComponent implements AfterViewInit, OnInit, OnDestroy {
  ready = signal(false);

  @ViewChild(MatSort) sort!: MatSort;

  public dataSource: MatTableDataSource<StockModel> = new MatTableDataSource<StockModel>();
  public displayColumns = [
    "name", "last", "bid", "ask", "changeInCurrency",
    "changeInPercent", "high", "low", "vol", "delete"
  ];

  public watchList: StockModel[] = [];
  public allStockOptions!: Map<number, string>;
  public availableStockOptions: Map<number, string> = new Map();
  public selectedSymbolId!: number;

  public hoveredIndex: any;
  public openRowDrawer: boolean = false;

  protected readonly Number = Number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private watchListService: WatchListService) {}

  public ngOnInit() {
    combineLatest([this.watchListService.getWatchList(), this.watchListService.getStockOptions()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([watchList, stockOptions]: [StockModel[], Map<number, string>]) => {
        this.watchList = watchList;
        this.allStockOptions = stockOptions;

        this.dataSource.data = this.watchList;
        this.dataSource.sortData = this.sortData();
        this.processAvailableStockOptions();

        this.ready.set(true);
      })
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.disableClear = true;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  public sortData(): any {
    return (items: StockModel[], sort: MatSort): StockModel[] => {
      if (!sort.active || sort.direction === '') {
        return items;
      }
      return items.sort((item1: any, item2: any) => {
        return (item1[sort.active] < item2[sort.active] ? -1 : item1[sort.active] > item2[sort.active] ? 1 : 0) * (sort.direction == 'asc' ? 1 : -1);
      });
    };
  }

  removeRow(id: number): void {
    this.watchList.splice(this.watchList.findIndex(el => el.id === id), 1);
    this.dataSource.data = this.watchList;

    this.watchListService.removeStock(id);
    this.availableStockOptions.set(id, this.allStockOptions.get(id) || '');
  }

  addSymbol() {
    this.watchListService.addStock(this.selectedSymbolId)
      .pipe(take(1))
      .subscribe(stockItem => {
        this.watchList.push(stockItem);
        this.dataSource.data = this.watchList;

        this.availableStockOptions.delete(this.selectedSymbolId);
      })
  }

  private processAvailableStockOptions(): void {
    const stockIdsInWatchList = this.watchList.map(stock => stock.id);
    this.allStockOptions.forEach((name, id) => {
      !stockIdsInWatchList.includes(id) && this.availableStockOptions.set(id, name);
    })
  }
}
