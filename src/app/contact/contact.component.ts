import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  checkboxImage = ['/assets/img/check_box.png', '/assets/img/check_box_checked.png'];
  isChecked = false;
  submitted = false;
  message = { name: '', email: '', text: '' };
  messageForm!: FormGroup;
  showSuccessModal = false;
  flyOut = false;
  normalScrollUpImage = '/assets/img/go_up_button.png';
  hoverScrollUpImage = '/assets/img/go_up_button_hover.png';
  namePlaceholder!: string;
  emailPlaceholder!: string;
  messagePlaceholder!: string;

  currentScrollUpImage: string;

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService

  ) { this.currentScrollUpImage = this.normalScrollUpImage; }

  onMouseOver(): void {
    this.currentScrollUpImage = this.hoverScrollUpImage;
  }

  onMouseOut(): void {
    this.currentScrollUpImage = this.normalScrollUpImage;
  }

  ngOnInit(): void {
    this.messageForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });

    this.getTranslations();
    this.subscribeToLangChange();
  }

  private getTranslations() {
    this.setPlaceholders();
  }

  private setPlaceholders() {
    this.translate.get('Your name').subscribe((res: string) => {
      this.namePlaceholder = res;
    });
    this.translate.get('Your email').subscribe((res: string) => {
      this.emailPlaceholder = res;
    });
    this.translate.get('Your message').subscribe((res: string) => {
      this.messagePlaceholder = res;
    });
  }

  private subscribeToLangChange() {
    this.translate.onLangChange.subscribe(() => {
      this.setPlaceholders();
    });
  }

  checkFormAndSubmit() {
    this.submitted = true;
    this.markFormGroupAsDirty(this.messageForm);

    if (this.messageForm.valid) {
      this.sendMail();
    }
  }

  private markFormGroupAsDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.markFormGroupAsDirty(control);
      }
    });
  }


  sendMail() {
    if (this.messageForm.valid) {
      const url = 'https://pierce-chang.de/send_mail/send_mail.php';
      const formData: FormData = new FormData();
      formData.append('name', this.messageForm.value.name);
      formData.append('email', this.messageForm.value.email);
      formData.append('message', this.messageForm.value.text);

      this.http.post(url, formData, { responseType: 'text' })
        .subscribe(
          response => {
            console.log('Success!', response);
            this.showSuccessModal = true;
            this.flyOut = false;
            this.cdr.detectChanges();

            setTimeout(() => {
              this.flyOut = true;
              setTimeout(() => this.showSuccessModal = false, 500);
            }, 1500);
          },
          error => {
            console.error('Error!', error);
            this.sendNotificationEmail(this.messageForm.value.email);
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

  @ViewChild('contactSection') contactSection!: ElementRef;
  scrolled = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.contactSection) {
      const sectionPos = this.contactSection.nativeElement.getBoundingClientRect();
      const sectionTop = sectionPos.top;
      const threshold = 150;

      if (sectionTop < window.innerHeight - threshold) {
        this.scrolled = 1;
      } else {
        this.scrolled = 0;
      }
    }
  }
}