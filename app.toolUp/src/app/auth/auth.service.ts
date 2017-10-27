import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Services
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router, private account: AccountService) { }

    /*
     * @Brief  : Guards for protected page user
     * @Param  : 
     * @Return : boolean
    */
    canActivate() {

        // Check if varaibles session exists
        if (
            localStorage.getItem('username') === null 
            || localStorage.getItem('mail') === null
            || localStorage.getItem('password') === null
            || localStorage.getItem('tokenID') === null
        ) {

            this.account.delete_session();
            
            this.router.navigate(['/login']);
            
            return false;
        }

        // Get variables of user
        let username = localStorage.getItem('username'),
            mail = localStorage.getItem('mail'),
            password = localStorage.getItem('password'),
            tokenID = localStorage.getItem('tokenID');

        // Ref of this
        let self = this;

        // Check account
        this.account.check_login_user(username, password, tokenID, function (data) {
           
           // If account does not exist
           if (data.username != username || data.mail != mail || data.password != password || data.tokenID != tokenID) {

               // Delete session
               self.account.delete_session();

               // Redirect the user in the login page
               self.router.navigate(['/login']);

               return false;
           }

        });

        return true;
    }

}
