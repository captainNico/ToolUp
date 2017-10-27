import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

// RXJS
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

    // Define the url of the API
    private apiUrl: string = "http://localhost:8123/api/";

    constructor(private http: Http) { }

    /*
     * @Brief  : Check if user to an account
     * @Param  : this
     * @Return : this
    */
    public check_login_user(username: string, password: string, tokenID): Observable<any> {

        return this.http.get(this.apiUrl + 'check-login-user/' + username + '/' + password + '/' + tokenID)
        // .map(data => data.json());
        .map(data => data.json());
    }

    public create_account(username: string, mail: string, password: string) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.apiUrl + 'create-account', {username: username, mail: mail, password: password}, {headers: headers})
        .map(data => data.json())
        .catch(err => err);
    }

    public get_all_boards(tokenID_user: string) {

        return this.http.get(this.apiUrl + 'get-all-boards/' + tokenID_user).map(data => data.json());
    }

    public get_board(tokenID_board: string, tokenID_user: string) {

        return this.http.get(this.apiUrl + 'get-board/' + tokenID_board + '/' + tokenID_user).map(data => data.json());
    }

    public get_columns(tokenID_board: string, tokenID_user: string) {

        return this.http.get(this.apiUrl + 'get-columns/' + tokenID_board + '/' + tokenID_user).map(data => data.json());
    }

    public get_all_tasks(tokenID_board: string, tokenID_user: string) {

        return this.http.get(this.apiUrl + 'get-all-tasks/' + tokenID_board + '/' + tokenID_user).map(data => data.json());
    }

    public change_task_column(tokenID_column: string, tokenID_task: string) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.apiUrl + 'change-columnTask/', {tokenID_column: tokenID_column, tokenID_task: tokenID_task}, {headers: headers}).map(data => data.json());
    }
}