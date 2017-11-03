import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ApiService } from '../../services/api.service';

/*
 * @Brief  : Interface for stock the positions of columns
 * @Param  : 
 * @Return : 
*/
interface intPositionContainerColumns {
    left: number,
    top: number,
    right: number,
    bottom: number,
    width: number,
    height: number
}

interface intPositionOriginTasks {
    top: number,
    left: number,
    selected: boolean
}

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    board_token: string = "";
    board_name: string = "";
    board_color : string = "";
    board_visibility: string = "";

    columns: Object;
    arrayOfKeysColumns;

    tasks: Object;
    arrayOfKeysTasks;

    // Stock the positions of container column
    positionContainerColumn: intPositionContainerColumns;

    // Stock the positions of columns
    positionsColumns = new Array();

    // Stock the origin position of tasks
    positionsOriginTasks = {} as intPositionOriginTasks;

    taskSelected: HTMLElement;

    statusTask: boolean = false;

    displayPopupNewColumn: boolean = false;

    displayPopupNewTask: boolean = false;
    tokenID_column: string = "";

    constructor(private router: Router, private routeActive: ActivatedRoute, private api: ApiService) { }

    ngOnInit() {

        let self = this;

        function get_tokenID_url (callback: (data) => void) {

            // Get the tokenID of the board in URL
            self.routeActive.params.subscribe(
                data => {
                    // self.board_token = data;
                    callback(data['tokenID']);
                },
                err => err
            );
        }

        get_tokenID_url(function (tokenID_board) {

            let tasks: any = "";

            self.api.get_board(tokenID_board, localStorage.getItem('tokenID')).subscribe(
                data => {
                    self.board_name = data[0].name;
                    self.board_color = data[0].color;
                    self.board_visibility = data[0].visibility;
                },
                err => err
            );

            self.api.get_columns(tokenID_board, localStorage.getItem('tokenID')).subscribe(
                data => {
                    self.columns = data;
                    self.arrayOfKeysColumns = Object.keys(self.columns);
                },
                err => err
            );

            self.api.get_all_tasks(tokenID_board, localStorage.getItem('tokenID')).subscribe(
                data => {
                    self.tasks = data;
                    self.arrayOfKeysTasks = Object.keys(self.tasks);
                },
                err => err
            );
        });

        // Get positions of columns
        this.positionContainerColumn = document.querySelector('#container-columns').getBoundingClientRect();
    }


    private getPositionsColumns(): void {

        let columns = document.querySelectorAll('.columns');

        for (var i = 0; i < columns.length; ++i) {

            this.positionsColumns.push(columns[i].getBoundingClientRect());

            this.positionsColumns[i].selected = false;
            this.positionsColumns[i].numColumnStart = i;           
        }
    }

    private getPositionsOriginTasks(): void {

        if (Object.keys(this.positionsOriginTasks).length > 0) {
            
            this.positionsOriginTasks.top = this.taskSelected.offsetTop;
            this.positionsOriginTasks.left = this.taskSelected.offsetLeft;
        }
    }
    
    onMouseDown(event) {

        this.taskSelected = event.target.parentNode;

        let self = this;

        // Get width and height of task
        let elementClientY = event.offsetY,
            elementClientX = event.offsetX;

        // Init the positions of columns
        this.getPositionsColumns();

        this.getPositionsOriginTasks();

        function moveTask(e) {

            let mouseMoveY = e.clientY,
                mouseMoveX = e.clientX;

            let yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
                xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);


            mouseMoveY += yOffset;
            mouseMoveX += xOffset;


            // Check if the task exit the container column
            if (
                mouseMoveY <= self.positionContainerColumn.top || mouseMoveY >= self.positionContainerColumn.top + self.positionContainerColumn.height || 
                mouseMoveX <= self.positionContainerColumn.left || mouseMoveX >= self.positionContainerColumn.left + self.positionContainerColumn.width
                ) {
                
                self.statusTask = false;
            
            } else {
                
                self.statusTask = true;
            }         

            for (var i = 0; i < self.positionsColumns.length; ++i) {

                // positionsColumns[i].top += window.scrollY;
                // positionsColumns[i].left += window.scrollX;

                let elementPositionTop = self.positionsColumns[i].top + window.scrollY,
                    elementPositionLeft = self.positionsColumns[i].left + window.scrollX;

                if (mouseMoveX <= elementPositionLeft || mouseMoveX >= elementPositionLeft + self.positionsColumns[i].width ||
                    mouseMoveY <= elementPositionTop || mouseMoveY >= elementPositionTop + self.positionsColumns[i].height
                    ) {

                    self.statusTask = false;
                    self.positionsColumns[i].selected = false;

                } else {

                    self.statusTask = true;
                    // positionsColumns[i][0] = true;
                    self.positionsColumns[i].selected = true;
                    break;
                }

                // console.log(mouseMoveX <= positionsColumns[i].left + positionsColumns[i].width);
            }           

            self.taskSelected.style.position = "absolute";
            self.taskSelected.style.top = mouseMoveY - (elementClientY) + 'px';
            self.taskSelected.style.left = mouseMoveX - (elementClientX) + 'px';
            self.taskSelected.style.opacity = '0.7';
        }


        if (self.taskSelected.className == 'task') {

            document.addEventListener('mousemove', moveTask, false);
        }



        event.target.addEventListener('mouseup', function (e) {

            // Remove the event move elements
            document.removeEventListener('mousemove', moveTask, false);

            // If the element selected is not task
            if (e.target.parentNode.className != 'task') {
                self.statusTask = false;
                return;
            }

            if (self.positionsColumns.length == 0) {
                self.statusTask = false;
                return;
            }

            // If the element is out, replace the element in its original position
            if (!self.statusTask) {

                self.positionsColumns = [];
                this.positionOriginTask = null;

                self.taskSelected.style.position = 'relative';
                self.taskSelected.style.top = 'auto';
                self.taskSelected.style.left = 'auto';
                self.taskSelected.style.opacity = '1';
                return;

                // console.log(positionOriginTask.top);
            }

            let task = self.taskSelected;
            let tokenID_task = e.target.getAttribute('data-task-tokenID');

            // console.log(self.positionsColumns.length);

            for (var i = 0; i < self.positionsColumns.length; ++i) {

                let columnSelected = document.querySelectorAll('.columns')[self.positionsColumns[i].numColumnStart];

                // console.log(self.positionsColumns[i]);
                
                if (self.positionsColumns[i].selected) {

                    // console.log(self.positionsColumns[i].numColumnStart, i);

                    let tokenID_columnSelected = columnSelected.lastElementChild.previousElementSibling.getAttribute('data-column-tokenID');

                    if (tokenID_columnSelected != null) {

                        self.api.change_task_column(tokenID_columnSelected, tokenID_task).subscribe(
                            data => {
                                console.log(data);
                            },
                            err => console.log(err)
                        );
                    }

                    columnSelected.insertBefore(task.parentNode, columnSelected.lastElementChild);

                    task.style.position = 'relative';
                    task.style.top = 'auto';
                    task.style.left = 'auto';
                    task.style.opacity = '1';
                }
            }

            self.positionsColumns = [];
            this.positionOriginTask = null;

            this.isDown = false;

        }, false);
    }

    newPopupColumn() {
        this.displayPopupNewColumn = true;
    }

    popupNewTask (tokenID_column: string) {

        this.displayPopupNewTask = true;

        this.tokenID_column = tokenID_column;
    }
}
