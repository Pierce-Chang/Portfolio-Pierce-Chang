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
  buttonText = 'Send message :)';
  message = { name: '', email: '', text: '' };
  messageForm!: FormGroup;
  showSuccessModal = false; // Modal-Status

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.messageForm = this.builder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });
  }

  sendMail() {
    if (this.messageForm.valid) {
      this.showSuccessModal = true; // Modal anzeigen
      const url = 'https://pierce-chang.de/send_mail/send_mail.php';
      const formData: FormData = new FormData();
      formData.append('name', this.messageForm.value.name);
      formData.append('email', this.messageForm.value.email); // E-Mail hinzufügen
      formData.append('message', this.messageForm.value.text); // Nachricht

      this.http.post(url, formData,{ responseType: 'text' })
      .subscribe(
        response => {
          console.log('Success!', response);
          this.cdr.detectChanges(); // Änderungen erkennen
          // Weitere Erfolgslogik
        },
        error => {
          console.error('Error!', error);
          this.sendNotificationEmail(this.messageForm.value.email);
          this.showSuccessModal = false; // Im Fehlerfall Modal ausblenden
        }
      );

      this.messageForm.reset();
      this.submitted = false;
    }
  }

  sendNotificationEmail(email: string) {
    // Logik zum Senden einer Benachrichtigungs-E-Mail
  }

  closeModal() {
    this.showSuccessModal = false; // Modal schließen
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