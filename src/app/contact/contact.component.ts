import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
checkboxImage = ['/assets/img/check_box.png', '/assets/img/check_box_checked.png'];
buttonText = 'Send message :)';

constructor() { 
}
}
