import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu-board',
  templateUrl: './menu-board.component.html',
  styleUrls: ['./menu-board.component.scss']
})
export class MenuBoardComponent implements OnInit {

    // Variables for display or hide the menu
    @Input() displayMenu: boolean;
    @Output() updateDisplayMenu = new EventEmitter();
    
    // Get key of object of submenu
    public arrayOfKeys;

    boards: Object = [];

    constructor(private route: ActivatedRoute, private api: ApiService) {}

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

        /*
         * Management menu
        */
        

        /*
         * Management submenu
        */
        /*
        let elements = document.querySelectorAll('.board-list');

        for (var i = 0; i < elements.length; ++i) {
           
           elements[i].addEventListener('click', function () {

               let moreOption = this.children[1];
               
               // Create toggle for display or not the more options
               if (moreOption.style.display != "block") {
                   
                   this.children[1].style.display = 'block';
               
               } else {
                   
                   this.children[1].style.display = 'none';
               }


           }, false);

        }
        */
    }

    displaySubmenu(key) {
        this.boards[key].moreOption = !this.boards[key].moreOption;
    }

    hideMenu() {
        this.displayMenu = false;
        this.updateDisplayMenu.emit(false);
    }

}
