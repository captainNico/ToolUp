import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-popup-new-column',
  templateUrl: './popup-new-column.component.html',
  styleUrls: ['./popup-new-column.component.scss']
})
export class PopupNewColumnComponent implements OnInit {

    titleNewColumn: string;

    constructor(private routeActive: ActivatedRoute, private api: ApiService) { }

    ngOnInit() {
    }

    submitNewColumn() {

      let self = this;

      // Get the tokenID of the board in URL
        this.routeActive.params.subscribe(
            data => {
                self.api.new_column(self.titleNewColumn, data['tokenID'], localStorage.getItem('tokenID')).subscribe(
                    data => {
                        console.log(data);
                    },
                    err => err
                );

            },
            err => err
        );

        let popupNewColumn = <HTMLElement>document.querySelector('#popup-new-column');
        popupNewColumn.style.display = "none";

        let overlayNewColumn = <HTMLElement>document.querySelector('#overlay-popup-new-column');
        overlayNewColumn.style.display = "none";

        window.location.reload();
  }
}
