import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ApiService } from './api.service';

@Injectable()
export class AccountService {

    // Init variables of user
    private username: string = "";
    private password: string = "";


    constructor(private router: Router, private api: ApiService) { }

    /*
     * @Brief  : Check if this user is a account
     * @Param  : username & password = input
     * @Return : username & password = user info, callback is function
    */
    public check_login_user(username: string, password: string, tokenID: string, callback: (userExist) => any) {

        // Subscribe to observer for receive info
        let test = this.api.check_login_user(username, password, tokenID).subscribe(
            data => {

                // If true then is account
                if (data.error) {
                    
                    callback(false);
                
                } else {

                    callback(data[0]);
                }
            },
            err => {callback(false)}
        );
    }

    /*
     * @Brief  : Create the session of user with localStorage
     * @Param  : username & password = user info
     * @Return : boolean
    */
    public create_session(username: string, mail: string, password: string, tokenID: string): boolean {

        // Create the variables in local
        localStorage.setItem('username', username);
        localStorage.setItem('mail', mail);
        localStorage.setItem('password', password);
        localStorage.setItem('tokenID', tokenID);

        return true;
    }

    /*
     * @Brief  : Delete all variables in localStorage of user
     * @Param  : 
     * @Return : boolean
    */
    public delete_session(): boolean {

        localStorage.clear();

        return true;
    }
    /*
     * @Brief  : Check that the user is not already connected that he is redirecting
     * @Param  : 
     * @Return : boolean
    */
    public check_not_already_logged(): boolean {

        if (localStorage.getItem('username') == null || localStorage.getItem('password') == null) {
            return false;
        }

        this.router.navigate(['dashboard']);

        return true;
    }

    public create_account (username: string, mail: string, password: string, callback: (ifCreated) => void) {

        this.api.create_account(username, mail, password).subscribe(
            data => {

                if (data.error) {

                    callback(false);

                } else if (data.created) {

                    callback(true);
                
                } else {

                    callback(false);
                }                
            },
            err => err
        );

    }
}
