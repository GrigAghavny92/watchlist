import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WatchlistComponent} from "./watchlist.component";
import {CommonModule} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ModuleDataTableComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchlistComponent],
      imports: [
        CommonModule,
        MatTableModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
      ]
    });

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
