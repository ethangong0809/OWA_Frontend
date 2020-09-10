import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APP_CONFIG } from '../app.config';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { DatePipe, Location } from '@angular/common';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Elected, RequestorDto } from '../data_modelElected';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';


@Component({
  selector: 'app-elected-official',
  templateUrl: './elected-official.component.html',
  styleUrls: ['./elected-official.component.css'],
  providers: [ApiserviceService],

})
export class ElectedOfficialComponent implements OnInit {
  public secondSelect: boolean = false;
  @ViewChild('editPro') editPro: FormGroup;

  elected: any;
  mask: any[] = ['+', '1', '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask1: any[] = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  public startDate: any;
  requestorDto: any;
  public showBanner: boolean = false;
  public popupUrlRedirect: string;
  public loading:boolean=false;
  myDatePickerOptions: IMyDpOptions = {
    disableSince: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }
  public err: any;
  public err1: any;
  phoneNumber: any;
  phoneNumber1: any;
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
  constructor(private datepipe: DatePipe, private _apiservice: ApiserviceService, private modalService: NgbModal, private http: Http, private router: Router, private _location: Location) {
    this.elected = new Elected();
    this.requestorDto = new RequestorDto();
    localStorage.removeItem("ticketId");

  }

  ngOnInit() {
    this.showDOB();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

  }

  clickArrow() {
    this._location.back();
  }

  getStartDate(value) {
    if (value.formatted === "") {
      this.elected.constDOB = null;
    }
    else {
      this.elected.constDOB = value.formatted;
      //  let latest_date = this.datepipe.transform(d, 'MM-dd-yyyy');
      //  this.elected.constDOB = moment(latest_date).format();
      console.log(this.elected.constDOB);
    }

  }



  omit_special_char(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || (k >= 48 && k <= 57));

  }


  omit_special_char2(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }


  }

  showPhone(value) {
    this.requestorDto.preferredContact = value;

  }

  showEmail(value) {
    this.requestorDto.preferredContact = value;

  }

  showBoth(value) {
    this.requestorDto.preferredContact = value;
  }

  saveResidency(value) {
    this.requestorDto.vaResident = value;
  }

  saveElectedOfficialRequest() {
    this.loading=true;
    let url = APP_CONFIG.saveElectedOfficialRequest;
    this.requestorDto.requestorType = "Individual";
    this.elected.createdBy = "user";
    this.requestorDto.createdBy = "user";
    this.requestorDto.status = "Open";
    this.requestorDto.formID=6;
    this.elected.requestor = this.requestorDto;
    // console.log(JSON.stringify(this.elected));
    this.http.post(url, this.elected)
    .map(res =>  res.json()).
    subscribe((data: any) => {
      this.loading=false;
      let ticketId=data.requestor.ticketID;
    localStorage.setItem("ticketId",ticketId);
      this.router.navigate(['result']);
    }, error => {
      console.log(error);
    });
    // console.log(this.editPro);
  }

  confirmEmail() {
    var emailini = (<HTMLInputElement>document.getElementById("emailini")).value
    var confemail = (<HTMLInputElement>document.getElementById("confemail")).value
    if (emailini != confemail) {
      this.err = "Email Not Matching";

    }
    else {
      this.err = "";
    }
  }

  confirmEmail1() {
    var emailini1 = (<HTMLInputElement>document.getElementById("emailini1")).value
    var confemail1 = (<HTMLInputElement>document.getElementById("confemail1")).value
    if (emailini1 != confemail1) {
      this.err1 = "Email Not Matching";

    }
    else {
      this.err1 = "";
    }
  }



  getPhoneNumber(e, value) {

    let key = e.charCode || e.keyCode || 0;
    if (key !== 8 && key !== 9) {
      if (value.length === 3) {
        this.phoneNumber = value + '-';
      }
      if (value.length === 7) {
        this.phoneNumber = value + '-';
      }

    }

    return (key == 8 || key == 9 || key == 17 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));

  }





  getNumber(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestorDto.phone = phm;
    }


  }



  getNumber1(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.elected.constPhone = phm;
      console.log(this.elected.constPhone);
    
   }else{
   this.elected.constPhone=null;
   }


  }


  getNumberSSN(value) {
    if (value.length === 11) {
      let data = value.slice(0, 3);
      console.log(data);
      let d2 = value.slice(4, 6);
      let d3 = value.slice(7, 11);
      let phm = data + d2 + d3;
      this.elected.constSSN = phm;
    }
    else {
      this.elected.constSSN = null;
    }


  }

  showSelect() {
    this.secondSelect = true;
    this.showBanner = false;

    this.elected.constLastname = undefined;
    this.elected.constEmail = undefined;
    this.elected.confirmConstEmail = undefined;
    
  }

  showYes() {
    this.showBanner = true;
    this.elected.constMedID = undefined;
  }
  getMedicaidID(value) {
    if (value.length === 12) {
      this.elected.constMedID = value;
    }
    else {
      this.elected.constMedID = null;
    }
  }


  getAdd2(value){
    if(value === "" || value.length === undefined){
      this.requestorDto.address2 = null;
    }
    else{
      this.requestorDto.address2 = value;
    }
  }

  showNo() {
    this.showBanner = false;
    this.elected.constMedID = undefined;
    this.elected.constDOB = undefined;
    this.elected.constSSN=undefined;

  }


  showDOB() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    this.myDatePickerOptions.disableSince.day = day;
    this.myDatePickerOptions.disableSince.month = month;
    this.myDatePickerOptions.disableSince.year = year;

  }

  noSelect() {
    this.secondSelect = false;
    
    if (this.editPro.controls.nameUser2 === undefined) { 
      
    }
    else {
      this.editPro.controls.nameUser2.reset();
      this.editPro.controls.nameUser3.reset();
      this.editPro.controls.emailUser99.reset();
     
      this.elected.constPhone=null;
      this.editPro.controls.email6.reset();
    }
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
