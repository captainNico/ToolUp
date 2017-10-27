import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    // Init my variables of from
    username: string = "";
    mail: string = "";
    password: string = "";

    constructor(private router: Router, private account: AccountService) { }

    ngOnInit() {

    }

    onSubmit() {

        let self = this;

        this.account.create_account(this.username, this.mail, this.password, function (ifCreated) {

            if (ifCreated) {
                self.account.create_session(self.username, self.mail, self.password, null);
                self.router.navigate(['/dashboard']);
            }
        });
    }
}
