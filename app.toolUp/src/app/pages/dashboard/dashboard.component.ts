import { Component, OnInit } from '@angular/core';

// Services
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    boards: Object;

    // Get key of object of submenu
    public arrayOfKeys;

    constructor(private api: ApiService) {
        
    }

    ngOnInit() {

        let self = this;

        let tokenID = localStorage.getItem('tokenID');

        this.api.get_all_boards(tokenID).subscribe(
            data => {
                self.boards = data;

                this.arrayOfKeys = Object.keys(this.boards);
            },
            err => err
        );
    }
}
