import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(
    private builder: FormBuilder,
    private http: HttpClient // Injizieren Sie HttpClient
  ) {}

  ngOnInit(): void {
    this.messageForm = this.builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });
  }

  sendMail() {
    this.submitted = true;
    if (this.messageForm.valid) {
      const url = 'https://pierce-chang.de/send_mail/send_mail.php'; // Vollständige URL
      const formData: FormData = new FormData();
      formData.append('name', this.messageForm.value.name);
      formData.append('message', this.messageForm.value.text); // Achten Sie auf das richtige Feld für die Nachricht
  
      this.http.post(url, formData).subscribe(
        response => {
          console.log('Success!', response);
          // Fügen Sie hier Code ein, um auf erfolgreichen Versand zu reagieren
        },
        error => {
          console.error('Error!', error);
          // Fügen Sie hier Code ein, um auf Fehler zu reagieren
        }
      );
  
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