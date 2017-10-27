import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    statusMenu: boolean = false;

    constructor() { }

    ngOnInit() {

    }

    toggleMenu() {
        this.statusMenu = !this.statusMenu;
        // console.log(this.statusMenu);
    }

    updateMenu(event) {
        this.statusMenu = event;
    }
}
