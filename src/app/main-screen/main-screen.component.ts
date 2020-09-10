import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Meta } from '@angular/platform-browser';

import { Router } from '@angular/router';
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
public showForm:boolean=false;
public popupUrlRedirect: string;
public secondSection:boolean=false;
public clientHeight: number;

  constructor(private modalService: NgbModal, private router: Router) {
    localStorage.removeItem('vaResident');
   }
   

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

selectYes(){
  this.secondSection=true;
}

open1(content) {
  this.modalService.open(content);
}

open(content1, url) {
  this.popupUrlRedirect = url;
  this.modalService.open(content1, { backdrop: 'static' }).result.then((result) => {
    // this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

open2(content5){
  this.modalService.open(content5);
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


// goGrid(value){
//    localStorage.setItem('vaResident',value);
//   this.router.navigate(['/grid']);
// }

}
