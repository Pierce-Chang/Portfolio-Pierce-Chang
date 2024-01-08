import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  checkboxImage = ['/assets/img/check_box.png', '/assets/img/check_box_checked.png'];
  isChecked = false;
  submitted = false;
  buttonText = 'Send message :)';
  message = { name: '', email: '', text: '' };
  messageForm!: FormGroup;

  constructor(private builder: FormBuilder) {}
  
  ngOnInit(): void {
    this.messageForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;
    // Rest of your submit logic
    console.log(this.messageForm.value);
    this.messageForm.reset();
  }
  
  get name() {
    return this.messageForm.get('name');
  }

  get email() {
    return this.messageForm.get('email');
  }
  
  get text() { // Renamed power to text
    return this.messageForm.get('text');
  }
}