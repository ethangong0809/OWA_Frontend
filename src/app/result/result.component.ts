import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public err:any;
  phoneNumber:any;
  public ticketId:any;

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
  constructor(private router: Router) { 
this.ticketId = localStorage.getItem("ticketId");
history.pushState(null, null, location.href);
window.onpopstate = function() {
  history.go(1);
};
  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

goToHome() {
  this.router.navigate(['/home']);
}

   confirmEmail() {
     var emailini = (<HTMLInputElement>document.getElementById("emailini")).value
    var confemail = (<HTMLInputElement>document.getElementById("confemail")).value
   if(emailini != confemail) {
     this.err="Email Not Matching";
      
   }
   else{
     this.err="";
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
  if (value.length === 10) {
    let data = value.slice(0, 3);
    let pn = data + '-';
    let d2 = value.slice(3, 6);
    let pn2 = d2 + '-';
    let d3 = value.slice(6, 10);
    let phm = pn + pn2 + d3;
    this.phoneNumber = phm;
  }
  else {
    this.phoneNumber = value;
  }
}




}
