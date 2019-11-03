import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

/**
 * models
 */
import {Forecast} from '../../models/forecast.model';
import {Search} from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() dailyForecast: EventEmitter<Forecast> = new EventEmitter<Forecast>();

  @HostListener('window:click', ['$event'])
  closeDropDown(event) {
    if(!event.target.closest('.search-holder')) {
      this.result = [];
    }
  }

  private searchTerm$ = new Subject<string>();
  public result: Array<Search> = [];
  public forecast: Forecast;

  constructor(
    private commonSrv: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  search(term: string): void {
    if(term && term.length > 1) {
      this.spinner.show();
      this.searchTerm$.next(term);
      this.commonSrv.search(this.searchTerm$)
        .subscribe( (response: Array<Search>) => {
          this.result = response;
          this.spinner.hide();
        }, error => {
          this.toastr.error('Some error has occurred');
          this.spinner.hide();
        });
    }
  }

  getDailyForecast(location): void {

    this.commonSrv.dailyForecast(location.Key)
      .subscribe( (response: Forecast) => {
        this.forecast = {...response, ...{id: location.Key, name: location.LocalizedName}};
        this.dailyForecast.emit(this.forecast);
        this.result = [];
      }, error => {
        this.toastr.error('Some error has occurred');
      });
  }

}
