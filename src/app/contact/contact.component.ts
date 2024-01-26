import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  checkboxImage = ['/assets/img/check_box.png', '/assets/img/check_box_checked.png'];
  isChecked = false;
  submitted = false;
  message = { name: '', email: '', text: '' };
  messageForm!: FormGroup;
  showSuccessModal = false;
  normalScrollUpImage = '/assets/img/go_up_button.png';
  hoverScrollUpImage = '/assets/img/go_up_button_hover.png';

  currentScrollUpImage: string;

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef

  ) {this.currentScrollUpImage = this.normalScrollUpImage;}

  onMouseOver(): void {
    this.currentScrollUpImage = this.hoverScrollUpImage;
  }

  onMouseOut(): void {
    this.currentScrollUpImage = this.normalScrollUpImage;
  }

  ngOnInit(): void {
    this.messageForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(4) , Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });
  }

  checkFormAndSubmit() {
    this.submitted = true;
  
    if (this.messageForm.valid) {
      this.sendMail();
    }
  }

  sendMail() {
    if (this.messageForm.valid) {
      this.showSuccessModal = true;
      const url = 'https://pierce-chang.de/send_mail/send_mail.php';
      const formData: FormData = new FormData();
      formData.append('name', this.messageForm.value.name);
      formData.append('email', this.messageForm.value.email);
      formData.append('message', this.messageForm.value.text);
      this.http.post(url, formData, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Success!', response);
            this.cdr.detectChanges();
          },
          error => {
            console.error('Error!', error);
            this.sendNotificationEmail(this.messageForm.value.email);
            this.showSuccessModal = false;
          }
        );

      this.messageForm.reset();
      this.submitted = false;
    }
  }

  sendNotificationEmail(email: string) {
    //TO DO: Logic for couldnt sent email
  }

  closeModal() {
    this.showSuccessModal = false;
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