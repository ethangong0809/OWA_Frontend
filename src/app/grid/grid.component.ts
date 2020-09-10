import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls:['./grid.component.css']

})
export class GridComponent implements OnInit {

  public popupUrlRedirect: string;

  constructor(private router: Router, private modalService: NgbModal, private _location: Location) { 
     localStorage.removeItem('requestType');
  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }


  getGeneralRequest(value)
  {
     localStorage.setItem('requestType',value);
    this.router.navigate(['/general']);
  }

  getProcurement(value)
  {
    localStorage.setItem('requestType',value);
    this.router.navigate(['/procurement']);
  }
  getCCCPlus(value)
  {
    localStorage.setItem('requestType',value);
    this.router.navigate(['/cccplus']);
  }
  getMedallion(value){
    localStorage.setItem('requestType',value);
    this.router.navigate(['/medallion4']);
  } 

  open(content) {
    this.modalService.open(content);
  }

  clickArrow() {
    this._location.back();
  }

}
