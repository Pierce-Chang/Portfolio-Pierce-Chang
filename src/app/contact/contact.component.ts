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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.valid) {
      console.log(this.messageForm.value);
      //TODO: set submission logic
  
      this.messageForm.reset();
    }
  }

  get name() {
    return this.messageForm.get('name');
  }

  get email() {
    return this.messageForm.get('email');
  }
  
  get text() {
    return this.messageForm.get('text');
  }
}