import{BehaviorSubject, Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http,HttpModule } from '@angular/http';
import { APP_CONFIG } from './app.config';
import 'rxjs/add/operator/map'
import { HttpService } from './core/http.service';
@Injectable()

@Injectable()
export class ApiserviceService{
    public subject = new BehaviorSubject<any>(false);
    constructor(private _httpService:HttpService, private http: Http){}

    saveGeneralRequest(data){
        console.log(data);
        let url = APP_CONFIG.saveGeneralRequest;
        return this._httpService.post(url, data).map((res:Response) => res.json())
        .catch((error:any) =>Observable.throw(error.json().error || 'Server error'));
    }

    saveMediaRequest(data){
        console.log(data);
        let url = APP_CONFIG.saveMediaRequest;
        return this._httpService.post(url,data).map((res:Response) => res.json())
        .catch((error:any) =>Observable.throw(error.json() || 'Server error'));
        
    }

    saveElectedOfficialRequest(data){
        console.log(data);
        let url = APP_CONFIG.saveElectedOfficialRequest;
        return this._httpService.post(url,data).map((res:Response) =>res.json())
        .catch((error:any) =>Observable.throw(error.json() || 'Server error'));
    }
    saveReportProblemRequest(data){
        console.log(data);
        let url = APP_CONFIG.saveReportProblemRequest;
        return this._httpService.post(url,data).map((res:Response) =>res.json())
        .catch((error:any) =>Observable.throw(error.json() || 'Server error'));
    }
    getStatus(data){
        const url =APP_CONFIG.getStatus;
        return this._httpService.post(url, data).map((res:Response) =>res.json())
        .catch((error:any) =>Observable.throw(error.json() || 'Server error'));
          
    }
    saveReportProblemRequestWithFiles(){
        let url=APP_CONFIG.saveReportProblemRequestWithFiles;
        return this._httpService.post(url).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}