import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})
export class LoginComponent implements OnInit {

    // Init the variables
    private username: string = "";
    private password: string = "";

    constructor(private router: Router, private account: AccountService) { }

    ngOnInit() {

        // Redirect user if already connected
        this.account.check_not_already_logged();
    }

    onSubmit() {

        let self = this;

        // Check if the account
        this.account.check_login_user(this.username, this.password, null, function (data) {

           // If account does not exist
           if (!data) {

               // Display the message if account is not good
               alert('Not account for this login');

               return false;
           }

           // Create the variables in local
           // localStorage.setItem('username', self.username);
           // localStorage.setItem('password', self.password);

           self.account.create_session(data.username, data.mail, data.password, data.tokenID);

           // Redirect the user in the dashboard
           self.router.navigate(['/dashboard']);

           return true;
        });
    }

}
