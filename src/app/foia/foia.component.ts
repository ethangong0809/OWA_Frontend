import { Component, OnInit, HostListener } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { ScrollToService } from 'ng2-scroll-to-el';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-foia',
  templateUrl: './foia.component.html',
  styleUrls: ['./foia.component.css']
})
export class FoiaComponent implements OnInit {
  public showTwo: boolean = false;
  public showThree: boolean = false;
  public showInitial: boolean = false;
  public hideOrgan: boolean = false;
  public noHide: boolean = false;
  public showButton: boolean = false;
  public showMailing: boolean = false;
  public showOptions: boolean = false;
  public showArea: boolean = false;
  public popupUrlRedirect: string;
  public showArea1: boolean = false;
  public err: any;
  phoneNumber: any;
  mask: any[] = ['+', '1', '(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  myDatePickerOptions: IMyDpOptions = {
    disableSince: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }

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
  constructor(private scrollService: ScrollToService, private modalService: NgbModal) { }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.showDOB();
  }

  omit_special_char(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || (k >= 48 && k <= 57));

  }

  getNumber(value) {
    if (value.length === 16) {
      let data = value.slice(3, 6);
      let d2 = value.slice(8, 11);
      let d3 = value.slice(12, 16);
      let phm = data + d2 + d3;
      //  this.requestor.fax=phm;
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

  showHide() {
    this.hideOrgan = true;
    this.noHide = true;
    this.showMailing = false;
    this.showOptions = false;
    this.showArea1 = false;

  }
  noOrgan() {//Medicaid
    this.hideOrgan = false;
    this.noHide = false;
    this.showMailing = true;//mail
    this.showOptions = true;
    this.showOptions = false;
    this.showArea1 = false;

  }

  noOrgan1() {
    this.showOptions = true;
    this.noHide = false;
    this.showArea = true;
    this.showArea1 = true;
  }

  showYes(value) {
    this.showMailing = false;
    this.noHide = true;
  }

  showNo(value) {
    this.noHide = false;
    this.showMailing = true;
  }
  showTab2() {
    this.showTwo = true;
    this.showThree = true;
    this.showInitial = true;

  }
  showTab1() {
    this.showTwo = true;
    this.showThree = false;
    this.showInitial = true;
  }

  showRequest() {
    this.showTwo = false;
    this.showInitial = false;
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

  @HostListener('window:scroll', ['$event'])
  keyEvent1(event: KeyboardEvent) {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }



  moveUp() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    this.scrollTo("start");


  }

  scrollTo(element) {
    this.showButton = false;
    this.scrollService.scrollTo(element);

  }

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
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
