import { BrowserModule } from '@angular/platform-browser';
import{Angular2FontawesomeModule} from 'angular2-fontawesome/angular2-fontawesome';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { AppComponent } from './app.component';
import { MediaComponent } from './media/media.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { OnlyNumber} from './OnlyNumber';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { ElectedOfficialComponent } from './elected-official/elected-official.component';
import { CccplusComponent } from './cccplus/cccplus.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { Medallion4Component } from './medallion4/medallion4.component';
import{MyDatePickerModule} from 'mydatepicker';
import { GeneralComponent } from './general/general.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { GridComponent } from './grid/grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
import{CoreModule} from './core/core.module';
import { FoiaComponent } from './foia/foia.component';
import { FooterComponent } from './footer/footer.component';
import { FilterPipeDate } from './convertData.pipe';
import { DatePipe } from '@angular/common';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { OnlyChar } from './OnlyChar';
import {RequiredIfDirective} from './RequiredIf.directive';
import { StatusComponent } from './status/status.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { CompareValidatorDirective } from './compare-validator.directive';
import { AutoTabDirective } from './autotap.directive';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaComponent,
    MainScreenComponent,
    HeaderComponent,
   OnlyNumber,
 
   FilterPipeDate,
    ElectedOfficialComponent,
    CccplusComponent,
    ReportProblemComponent,
    Medallion4Component,
    GeneralComponent,
    ProcurementComponent,
    ResultComponent,
    GridComponent,
    FoiaComponent,
    FooterComponent,
    DisclaimerComponent,
    OnlyChar,
    RequiredIfDirective,
    CompareValidatorDirective,
    AutoTabDirective,
    StatusComponent
      ],
  imports: [
    BrowserModule,
    TextMaskModule,
    HttpModule,
    Angular2FontawesomeModule,
    FormsModule,   
    NgxSummernoteModule,                   
    ReactiveFormsModule,
    NgbModule.forRoot(),
    ScrollToModule.forRoot(),
    MyDatePickerModule,
    CoreModule,
    routing,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
