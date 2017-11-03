import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-popup-new-task',
  templateUrl: './popup-new-task.component.html',
  styleUrls: ['./popup-new-task.component.scss']
})
export class PopupNewTaskComponent implements OnInit {

    @Input() tokenID_column: any;
    titleNewTask: string;

    constructor(private routeActive: ActivatedRoute, private api: ApiService) {

    }

    ngOnInit() {}

    submitNewTask() {

        let self = this;

        let titleTask = 'test title',
            textTask = 'Test text',
            imgTask = '';


        // Get the tokenID of the board in URL
        this.routeActive.params.subscribe(
            data => {
                self.api.new_task(titleTask, textTask, imgTask, self.tokenID_column, data['tokenID'], localStorage.getItem('tokenID')).subscribe(
                    data => {
                        console.log(data);
                    },
                    err => err
                );

            },
            err => err
        );

        let popupNewTask = <HTMLElement>document.querySelector('#popup-new-task');
        popupNewTask.style.display = "none";

        let overlayNewTask = <HTMLElement>document.querySelector('#overlay-popup-new-task');
        overlayNewTask.style.display = "none";

        window.location.reload();

    }
}
