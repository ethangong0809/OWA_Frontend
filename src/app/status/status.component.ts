import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Status, StatusRequest } from '../status';
import { Http } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [ApiserviceService],
})
export class StatusComponent implements OnInit {
  mask: any[] = ['E', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/];
  constructor(private _apiservice: ApiserviceService, private http: Http, private _location: Location) {
    this.status = new Status();
    this.statusRequest = new StatusRequest();

  }
  appTicket: any;
  status: Status;
  statusRequest: StatusRequest;
  public ticketID: any;
  public email: any;
  public memEmail: any;
  showResult: boolean = false;
  showBtn: boolean = true;
  public showArrow: boolean = false;
  public showError: boolean = false;
  public reqEmail: boolean = false;
  public memberEmail: boolean = false;
  @ViewChild('editPro') editPro: FormGroup;
  
  ngOnInit() {
  }


  omit_special_char(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || (k >= 48 && k <= 57));
  }

  omit_special_char1(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
  }


  getStatusByTicketID() {
    let url = APP_CONFIG.getStatus;
    this.http.post(url, this.statusRequest)
      .map(res => res.json())
      .subscribe((data: any) => {
        this.status = data;
        this.showResult = true;
        this.showBtn = false;
        this.showError = false;
        this.showArrow = true;
      }, error => {
        this.showBtn = true;
        this.showResult = false;
        this.showError = true;
        console.log('error')
      });
  }

  searchAnother() {
    this.showResult = false;
    this.showBtn = true;
    this.showArrow = false;
    this.ticketID = undefined;
    this.status.firstName = undefined;
    this.status.lastName = undefined;
    this.status.email = undefined;
    this.status.status = undefined;
    this.editPro.reset();
  }

  clickArrow() {
    this._location.back();
  }

}
