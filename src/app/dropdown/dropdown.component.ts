import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.html',
    styleUrls: ['./dropdown.css']
})
export class DropdownComponent {

    show = false;

    btnTrigger() {
        this.show = !this.show;
    }

}
