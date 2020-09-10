import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Report, RequestorDto, DocumentRequestDto } from '../data_modelReport';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup } from '@angular/forms';
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { IMyDate, IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.css'],
  providers: [ApiserviceService]
})
export class ReportProblemComponent implements OnInit {
  public loading: boolean = false;
  @ViewChild('editPro') editPro: FormGroup;
  mask: any[] = ['+', '1', '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask1: any[] = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public seeFirst: boolean = false;
  public seeSecond: boolean = false;
  public showFirst: boolean = false;
  public showSecond: boolean = false;
  public showThird: boolean = false;
  public showFourth: boolean = false;
  public notshow: boolean = false;
  public popupUrlRedirect: string;
  public noMain: boolean = true;
  public noBack: boolean = false;
  public showBtn: boolean = false;
  public showFour: boolean = false;
  public showArea: boolean = false;
  public HideBtn: boolean = false;
  public showBreif: boolean = false;
  public showMailing: boolean = false;
  public showRequestor: boolean = false;
  public showMedicaid: boolean = true;
  public hideThird: boolean = false;
  public forSecond: boolean = false;
  public showPhn: boolean = false;
  public showPhn1: boolean = false;
  public showOne: boolean = false;
  public showTwo: boolean = false;
  public startDate: any;
  public ifZip: boolean = false;
  public ifAd1: boolean = false;
  public ifAd2: boolean = false;
  public ifCity: boolean = false;
  public ifValid: boolean = false;
  public ifState: boolean = false;
  public showHeading1: boolean = true;
  public showHeading2: boolean = false;
  public attachBox: boolean = false;
  public doc2: boolean = false;
  public doc3: boolean = false;
  public hidePlus: boolean = true;

  selectedFiles: string[] = [];

  public documentDTO: DocumentRequestDto;
  documents: Array<DocumentRequestDto>;

  otherText: any;
  otherTextarea: any;
  selectedFile1: any;
  selectedFile2: any;
  selectedFile3: any;
  documentName1: any;
  documentName2: any;
  documentName3: any;
  count: number = 0;

  report: any;
  requestor: any;
  documentList: any;
  myDatePickerOptions: IMyDpOptions = {
    disableSince: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }
  public err: any;
  public err1: any;
  phoneNumber: any;
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
  constructor(private _apiservice: ApiserviceService, private http: Http, private router: Router, private modalService: NgbModal, private datepipe: DatePipe, private _location: Location) {
    this.report = new Report();
    this.documents = new Array<DocumentRequestDto>();
    this.requestor = new RequestorDto();
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
      this.report.memDOB = null;
    }
    else {
      this.report.memDOB = value.formatted;
      // let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
      // this.report.memDOB = moment(latest_date).format();
      console.log(this.report.memDOB);
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
  saveReportProblemRequest() {
    this.loading = true;
    let url = APP_CONFIG.saveReportProblemRequest;
    this.report.createdBy = "user";
    this.requestor.status = "Open";
    this.requestor.createdBy = "user";
    this.requestor.formID = 7;
    if (this.report.category == 'Provider') {
      this.requestor.requestorType = "Organization";
    }
    if (this.report.category == 'Assisting a Medicaid Member') {
      this.requestor.requestorType = "Individual";

      if (this.report.relationship == 'Power of Attorney Holder') {
        let url1 = APP_CONFIG.saveReportProblemRequestWithFiles;
        let formData = new FormData();
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append("files", this.selectedFiles[i]);
        }
        this.report.documents = this.documents;
        this.report.requestor = this.requestor;
        formData.append("data", new Blob([JSON.stringify(this.report)], {
          type: "application/json"
      }));
        console.log(JSON.stringify(this.report));
        this.http.post(url1, formData)
          .map(res => res.json())
          .subscribe((data: any) => {
            console.log(data);
            let ticketId = data.requestor.ticketID;
            this.loading = false;
            localStorage.setItem("ticketId", ticketId);
            this.router.navigate(['result']);
          }, error => {
            console.log(error);
          });
          return;
      }
    }

    if (this.report.category == 'Medicaid Member') {

      this.requestor.firstName = this.report.memFirstname;
      this.requestor.lastName = this.report.memLastname;
      this.requestor.phone = this.report.memPhone;
      this.requestor.email = this.report.memEmail;
      this.requestor.confirmEmail = this.report.confirmMemEmail;
      this.requestor.requestorType = "Individual";
      this.report.memAddr1 = this.requestor.address1;
      this.report.memAddr2 = this.requestor.address2;
      this.report.memCity = this.requestor.city;
      this.report.memState = this.requestor.state;
      this.report.memZipcode = this.requestor.zipcode;
    }
    //this.report.requestType = localStorage.getItem("requestType");
    this.report.requestor = this.requestor;
    console.log(JSON.stringify(this.report));
    this.http.post(url, this.report)
      .map(res => res.json()).
      subscribe((data: any) => {
        console.log(data);
        let ticketId = data.requestor.ticketID;
        this.loading = false;
        localStorage.setItem("ticketId", ticketId);
        this.router.navigate(['result']);
      }, error => {
        console.log(error);
      });
  }

  showNo(value) {
    this.requestor.requestorType = value;
    this.showMailing = false;
    this.showRequestor = true;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifCity = false;
    this.ifZip = false;
    this.ifState = false;
    this.requestor.address1 = undefined;
    this.requestor.address2 = undefined;
    this.requestor.state = undefined;
    this.requestor.city = undefined;
    this.requestor.zipcode = undefined;
  }

  showYes(value) {
    this.requestor.requestorType = value;
    this.showMailing = true;
    this.showRequestor = false;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifCity = false;
    this.ifZip = false;
    this.ifState = false;
    this.requestor.address1 = undefined;
    this.requestor.address2 = undefined;
    this.requestor.state = undefined;
    this.requestor.city = undefined;
    this.requestor.zipcode = undefined;
  }
  selectFirst(value) {

    this.report.category = value;
    this.noMain = false;
    this.showFirst = false;
    this.showThird = true;
    this.showSecond = false;
    this.showFourth = false;
    this.showBtn = true;
    this.showFour = false;
    this.noBack = true;
    this.showArea = false;
    this.HideBtn = false;
    this.showOne = true;
    this.showTwo = false;
    this.showBreif = false;
    this.showMedicaid = true;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifCity = false;
    this.ifZip = false;
    this.showHeading1 = false;
    this.showHeading2 = true;

  }
  selectSecond(value) {
    this.report.category = value;
    this.showSecond = true;
    this.showFourth = false;
    this.showFirst = false;
    this.noBack = true;
    this.showBtn = true;
    this.noMain = false;
    this.showThird = false;
    this.showArea = false;
    this.HideBtn = false;
    this.hideThird = false;
    this.forSecond = true;
    this.showRequestor = false;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifCity = false;
    this.ifZip = false;
    this.showHeading1 = false;
    this.showHeading2 = true;
  }
  selectThird(value) {
    this.report.category = value;
    this.showFirst = true;
    this.showSecond = false;
    this.showFourth = false;
    this.showThird = true;
    this.noBack = true;
    this.showOne = false;
    this.showTwo = true;
    this.showBtn = true;
    this.showFour = true;
    this.noMain = false;
    this.showArea = false;
    this.HideBtn = false;
    this.showMailing = false;
    this.showMedicaid = false;
    this.ifAd1 = false;
    this.ifAd2 = false;
    this.ifCity = false;
    this.ifZip = false;
    this.showHeading1 = false;
    this.showHeading2 = true;
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

  getEmail(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.memEmail = null;
    }
    else {
      this.requestor.memEmail = value;
    }

  }


  getOrganization(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.organizationName = null;
    }
    else {
      this.requestor.organizationName = value;
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

  getAdd2(value) {
    if (value === "" || value.length === undefined) {
      this.requestor.address2 = null;
    }
    else {
      this.requestor.address2 = value;
    }
  }


  getMedicaidID(value) {
    if (value.length === 12) {
      this.report.memMedID = value;
    }
    else {
      this.report.memMedID = null;
    }
  }




  showRelative() {
    this.notshow = false;
    this.attachBox = false;
  }

  showPwr() {
    this.notshow = false;
    this.attachBox = true;
    this.doc2 = false;
    this.doc3 = false;
    this.documentName1 = null;
    this.count = 0;
  }
  shoeProv() {
    this.notshow = false;
    this.attachBox = false;
  }

  showAssistor() {
    this.notshow = false;
    this.attachBox = false;
  }
  showFriend() {
    this.notshow = false;
    this.attachBox = false;
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


  selectFourth() {
    this.noBack = true;
    this.noMain = false;
    this.showSecond = false;
    this.showFourth = true;
    this.showFirst = false;
    this.showBtn = true;//button
    this.showThird = false;
    this.showBreif = true;
    this.hideThird = false;
    this.forSecond = false;
    this.showHeading1 = false;
    this.showHeading2 = true;
  }


  clickOther(value) {
    this.report.category = value;
    this.showArea = true;
    this.HideBtn = true;
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

  showDescription() {
    this.notshow = true;
    this.attachBox = false;
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

  saveResidency(value) {
    this.requestor.vaResident = value;
  }

  noClick() {
    this.noMain = true;
    this.showFirst = false;
    this.showSecond = false;
    this.showFourth = false;
    this.showRequestor = false;
    this.noBack = false;
    this.notshow = false;
    this.showThird = false;
    this.showBtn = false;
    this.showArea = false;
    this.HideBtn = false;
    this.showBreif = false;
    this.forSecond = false;
    this.showMailing = false;
    this.hideThird = false;
    this.editPro.reset();
    this.report.categoryOther = undefined;
    this.requestor.state = undefined;
    this.showHeading2 = false;
    this.showHeading1 = true;
    this.attachBox = false;
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

  getNumber1(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.report.memPhone = phm;
    }
  }

  getNumber2(value) {
    if (value.length === 11) {
      let data = value.slice(0, 3);
      console.log(data);
      let d2 = value.slice(4, 6);
      let d3 = value.slice(7, 11);
      let phm = data + d2 + d3;
      this.report.memSSN = phm;

    }
    else {
      this.report.memSSN = null;
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

  getNumber(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      this.requestor.phone = phm;
    }
  }


  omit_special_char2(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
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
  selectFile1(event) {
    if (this.documents === null) {
      this.documents = [];
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName1;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
    else {
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName1;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
  }
  selectFile2(event) {
    if (this.documents === null) {
      this.documents = [];
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName2;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
    else {
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName2;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
  }
  selectFile3(event) {
    if (this.documents === null) {
      this.documents = [];
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName3;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
    else {
      this.documentDTO = new DocumentRequestDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName3;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
      console.log(this.documents);
      console.log(this.selectedFiles);
    }
  }
  addDoc() {
    this.count++;
    if (this.count == 0) {
      this.doc2 = false;
      this.doc3 = false;
      // this.hidePlus = true;
    }
    if (this.count == 1) {
      this.doc2 = true;
      this.doc3 = false;
      // this.hidePlus = true;
    }
    if (this.count == 2) {
      this.doc2 = true;
      this.doc3 = true;
      // this.hidePlus = false;
    }
    if (this.count >= 3) {
      this.count = 2;
    }
  }
  hideDoc2() {
    this.count--;
    this.doc2 = false;
    this.documentName2 = null;
  }
  hideDoc3() {
    this.count--;
    this.doc3 = false;
    this.documentName3 = null;
  }




}
