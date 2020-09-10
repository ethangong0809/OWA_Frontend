import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APP_CONFIG } from '../app.config';
import { Request, RequestorDto } from '../data_modelGeneralRequest';
import { ApiserviceService } from '../apiservice.service';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';
import { RootContext } from '@angular/core/src/render3/interfaces/view';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-medallion4',
  templateUrl: './medallion4.component.html',
  styleUrls: ['./medallion4.component.css'],
  providers: [ApiserviceService],
})
export class Medallion4Component implements OnInit {
  public showFirst: boolean = false;
  public loading: boolean = false;
  public showSecond: boolean = false;
  public popupUrlRedirect: string;
  request: any;
  requestor: any;
  mask: any[] = ['+', '1', '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  @ViewChild('editPro') editPro: FormGroup;
  public err: any;
  phoneNumber: any;
  ifAd1 = false;
  ifAd2 = false;
  ifZip = false;
  ifState = false;
  ifValid = false;
  ifCity = false
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
  constructor(private _apiservice: ApiserviceService, private modalService: NgbModal, private http: Http, private router: Router, private _location: Location) {
    this.request = new Request();
    this.requestor = new RequestorDto();
    localStorage.removeItem("ticketId");
  }


  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  clickArrow() {
    this._location.back();
  }

  saveGeneralRequest() {
    this.loading = true;
    let url = APP_CONFIG.saveGeneralRequest;
    this.request.createdBy = "user";
    this.requestor.status = "Open";
    this.requestor.createdBy = "user";
    this.requestor.formID = 3;
    this.request.requestType = localStorage.getItem("requestType");
    this.request.requestor = this.requestor;
    // console.log(JSON.stringify(this.request));
    this.http.post(url, this.request).
      map(res => res.json()).
      subscribe((data: any) => {
        let ticketId = data.requestor.ticketID;
        this.loading = false;
        localStorage.setItem("ticketId", ticketId);
        this.router.navigate(['result']);
      }, error => {
        console.log(error);
      });
    // console.log(this.editPro);
  }

  showYes(value) {
    this.requestor.requestorType = value;
    this.showFirst = false;
    this.showSecond = true;
    this.requestor.address1 = undefined;
    this.requestor.address2 = undefined;
    this.requestor.state = undefined;
    this.requestor.city = undefined;
    this.requestor.zipcode = undefined;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifZip = false;
    this.ifState = false;
    this.ifValid = false;
    this.ifCity = false;
    // this.request.description=undefined;
    // this.editPro.reset();
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

  saveResidency(value) {
    this.requestor.vaResident = value;
  }

  showNo(value) {
    this.requestor.requestorType = value;
    this.showSecond = false;
    this.showFirst = true;
    this.requestor.address1 = undefined;
    this.requestor.address2 = undefined;
    this.requestor.state = undefined;
    this.requestor.city = undefined;
    this.requestor.zipcode = undefined;
    this.requestor.organizationName = undefined;
    this.requestor.fax = undefined;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifZip = false;
    this.ifState = false;
    this.ifValid = false;
    this.ifCity = false;
  }



  getAdd1(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.address1 = null;
    }
    else {
      this.requestor.address1 = value;
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

  showPhone(value) {
    this.requestor.preferredContact = value;

  }

  showEmail(value) {
    this.requestor.preferredContact = value;

  }

  showBoth(value) {
    this.requestor.preferredContact = value;
  }


  getNumber(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestor.phone = phm;
    }
  }

  getNumber4(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestor.fax = phm;
    }
  }


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