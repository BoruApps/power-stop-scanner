import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse, HttpParams} from '@angular/common/http';
import { AppConfig } from '../../app-config';
import {Observable} from 'rxjs';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ApiRequestService {

    public ENDPOINT_LOGIN = 'postLogin.php';
    public ENDPOINT_CHECK_BARCODE= 'getRMAInfo.php';
    public ENDPOINT_SAVE_CHECKLIST= 'saveCheckList.php';

    constructor(
        private httpClient: HttpClient,
        public appConfig: AppConfig,
        public storage: Storage,
        private router: Router
    ) {
    }

    public post(endPoint: string, params: any): Observable<HttpResponse<any>>{
        const url = this.appConfig.apiurl + endPoint;
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.httpClient.post(url, params, {headers, observe: 'response'});
    }

    public get(endPoint: string, params: any = {}): Observable<HttpResponse<any>> {
        const url = this.appConfig.apiurl + endPoint;
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        const httpParam = new HttpParams();
        if (params){
            for (const key of Object.keys(params)) {
                const value = params[key];
                httpParam.append(key, value);
            }
        }
        return this.httpClient.get(url, {headers, observe: 'response', params: httpParam});
    }

    logout() {
        console.log('logout clicked');
        this.storage.set("userdata", null);
        this.router.navigateByUrl('/login');
    }
    isLogged() {
        var log_status = this.storage.get('userdata').then((userdata) => {
            if (userdata && userdata.length !== 0) {
                return userdata;
            } else {
                return false;
            }
        })
        return log_status;
    }
}
