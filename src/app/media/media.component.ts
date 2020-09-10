import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../apiservice.service';
import { Media, RequestorDto } from '../data_modelMedia';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { APP_CONFIG } from '../app.config';
import { DatePipe, Location } from '@angular/common';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers: [ApiserviceService]
})
export class MediaComponent implements OnInit, AfterViewInit {
  public loading: boolean = false;
  public startDate: any;
  deadline: any;
  public popupUrlRedirect: string;
  public showButton: boolean = false;
  media: any;
  mask: any[] = ['+', '1', '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('editPro') editPro: FormGroup;
  @ViewChild('time') time: ElementRef;
  //@ViewChild('time') time:ElementRef;
  requestor: any;
  public err: any;
  public deadlinedate: any;
  phoneNumber: any;
  showForm: boolean = false;
  ifAd1 = false;
  ifAd2 = false;
  ifZip = false;
  ifState = false;
  ifValid = false;
  ifCity = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    width: '100%',
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],

  };
  myDatePickerOptions: IMyDpOptions = {
    disableUntil: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }


  constructor(private modalService: NgbModal, private http: Http, private datepipe: DatePipe, private router: Router, private _location: Location, private scrollService: ScrollToService) {
    this.media = new Media();
    this.requestor = new RequestorDto();
    localStorage.removeItem("ticketId");
  }

  ngOnInit() {
    this.showDOB();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.deadline = "Please select one option";
  }

  clickArrow() {
    this._location.back();
  }

  saveResidency(value) {
    this.requestor.vaResident = value;
  }

  ngAfterViewInit() {

  }

  scrollTo(element) {
    this.showButton = false;
    this.scrollService.scrollTo(element);
  }

  @HostListener('window:scroll', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }


  getAdd1(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.address1 = null;
    }
    else {
      this.requestor.address1 = value;
    }
  }


  check_mailing1(value) {
    if (value.length != 0) {
      this.ifAd1 = true;
    }
    if (value.length === 0) {
      this.ifAd1 = false;
    }
  }
  check_mailing2(value) {
    if (value.length != 0) {
      this.ifAd2 = true;
    }
    if (value.length === 0) {
      this.ifAd2 = false;
    }
  }
  check_city(value) {
    if (value.length != 0) {
      this.ifCity = true;
    }
    if (value.length === 0) {
      this.ifCity = false;
    }
  }
  check_zip(value) {
    if (value.length != 0) {
      this.ifZip = true;
    }
    if (value.length === 0) {
      this.ifZip = false;
    }
    if (value.length < 5 && value.length > 0) {
      this.ifValid = true;
    }
    if (value.length === 0 || value.length === 5) {
      this.ifValid = false;
    }
  }
  check_state(value) {

    if (value === "AL" || value === "AK" || value === "AZ" || value === "CA" || value === "CO" || value === "CT" ||
      value === "DE" || value === "DC" || value === "FL" || value === "GA" || value === "HI" || value === "ID" ||
      value === "IL" || value === "IN" || value === "IA" || value === "KS" || value === "KY" || value === "LA" ||
      value === "ME" || value === "MD" || value === "MA" || value === "MI" || value === "MN" || value === "MS" ||
      value === "MO" || value === "MT" || value === "NE" || value === "NV" || value === "NH" || value === "NJ" ||
      value === "NM" || value === "NY" || value === "NC" || value === "ND" || value === "OH" || value === "OK" ||
      value === "OR" || value === "PA" || value === "RI" || value === "SC" || value === "SD" || value === "TN" ||
      value === "TX" || value === "UT" || value === "VT" || value === "VA" || value === "WA" || value === "WV" ||
      value === "WI" || value === "WY" || value === "AR") {
      this.ifState = true;
    }
    else {
      this.ifState = false;
    }
  }


  getAdd2(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.address2 = null;
    }
    else {
      this.requestor.address2 = value;
    }
  }


  getCity(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.city = null;
    }
    else {
      this.requestor.city = value;
    }
  }

  getZip(value) {
    if (value.length === 5) {
      this.requestor.zipcode = value;
    }
    else {
      this.requestor.zipcode = null;
    }
  }
  showYes1(value) {
    this.media.lessThan24 = value;

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
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || (k >= 48 && k <= 57));

  }


  getStartDate(value) {
    if (value.formatted === "" || value.formatted === undefined) {
      this.media.deadline = null;
    }
    else {
      this.startDate = value.formatted;
      let d = this.startDate + " " + "5:00 PM";
      this.media.deadline = d;
      //this.deadline="5:00 PM";

    }

  }

  omit_special_char2(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }


  }

  getDeadline(value) {
    this.media.deadline = null;
    if (value === 'Please select one option') {
      let d = this.startDate + " " + "5:00 PM";
      this.media.deadline = d;
      console.log(this.media.deadline);
    }
    else {
      let d = this.startDate + " " + value;
      this.media.deadline = d;
      console.log(this.media.deadline);
    }
  }

  // stateClick(value){
  //   if(value === "Choose..."){
  //     this.requestor.state=undefined;
  //   }
  // }


  getNumber(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestor.phone = phm;
    }


  }


  getNumber1(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestor.fax = phm;
    }
    else {
      this.requestor.fax = null;
    }

  }

  getValue(value) {
    if (value) {
      if (this.showForm = true) {
        this.media.deadline = null;
      }
      // this.time.nativeElement.value="Please select one option";
      this.deadlinedate = null;

    }
    else {
      this.showForm = false;



    }
  }



  saveMediaRequest() {
    this.loading = true;
    let url = APP_CONFIG.saveMediaRequest;
    this.media.createdBy = "user";
    this.requestor.requestorType = "Organization";
    this.requestor.status = "Open";
    this.requestor.createdBy = "user";
    this.requestor.formID = 5;
    this.media.requestor = this.requestor;
    console.log(JSON.stringify(this.media));
    this.http.post(url, this.media)
      .map(res => res.json())
      .subscribe((data: any) => {
        this.loading = false;
        let ticketId = data.requestor.ticketID;
        localStorage.setItem("ticketId", ticketId);
        this.router.navigate(['result']);
      }, error => {
        console.log(error);
      });
    //  console.log(this.editPro);
  }


  showPhone(value) {
    this.requestor.preferredContact = value;

  }

  showEmail(value) {
    this.requestor.preferredContact = value;

  }

  showBoth(value) {
    this.requestor.preferredContact = value;
  }


  confirmEmail() {
    var emailini = (<HTMLInputElement>document.getElementById("emailini")).value
    var confemail = (<HTMLInputElement>document.getElementById("confemail")).value
    if (emailini != confemail) {
      this.err = "Email does not match";

    }
    else {
      this.err = "";
    }
  }



  showDOB() {

    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    this.myDatePickerOptions.disableUntil.day = day;
    this.myDatePickerOptions.disableUntil.month = month;
    this.myDatePickerOptions.disableUntil.year = year;


  }
  // selectPhone(){
  //   this.showPhone=true;
  //   this.showEmail=false;

  // }
  // selectEmail(){
  //   this.showEmail=true;
  //   this.showPhone=false;

  // }

  open(content1, url) {
    this.popupUrlRedirect = url;
    this.modalService.open(content1, { backdrop: 'static' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  redirect() {
    window.open(this.popupUrlRedirect);
  }
}
