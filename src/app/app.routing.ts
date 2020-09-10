import {MainScreenComponent} from './main-screen/main-screen.component';
import {MediaComponent} from './media/media.component';
import {ElectedOfficialComponent} from './elected-official/elected-official.component';
import {CccplusComponent} from './cccplus/cccplus.component';
import{ReportProblemComponent} from './report-problem/report-problem.component';
import{Medallion4Component } from './medallion4/medallion4.component';
import { GeneralComponent} from './general/general.component';
import {ProcurementComponent} from './procurement/procurement.component';
import {GridComponent} from './grid/grid.component';
import {RouterModule, Routes} from '@angular/router';
import { Component } from '@angular/core';
import { FoiaComponent } from './foia/foia.component';
import { StatusComponent } from './status/status.component';
import { ResultComponent } from './result/result.component';


const appRoutes:Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: MainScreenComponent},
    { path: 'result', component: ResultComponent},
    { path: 'media', component: MediaComponent},
    { path: 'electedofficial', component: ElectedOfficialComponent},
    { path: 'cccplus' , component: CccplusComponent},
    { path: 'reportproblem', component: ReportProblemComponent},
    { path: 'medallion4', component: Medallion4Component},
    { path: 'general',component: GeneralComponent},
    { path: 'procurement', component: ProcurementComponent},
    { path: 'grid', component: GridComponent},
    { path: 'foia', component: FoiaComponent},
    {path:'status' ,component:StatusComponent}
];
export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes, {useHash: true});