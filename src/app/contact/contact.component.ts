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

  /**
   * Scrolls the window to the top with a smooth behavior.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Changes the scroll up button image to a hover state image on mouse over.
   */
  onMouseOver(): void {
    this.currentScrollUpImage = this.hoverScrollUpImage;
  }

  /**
   * Reverts the scroll up button image to its normal state image on mouse out.
   */
  onMouseOut(): void {
    this.currentScrollUpImage = this.normalScrollUpImage;
  }

  /**
   * Initializes the component by setting up the form validation and subscribing to language change events.
   */
  ngOnInit(): void {
    // Initialize the form with validators.
    this.messageForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      text: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      accept: [this.isChecked, Validators.requiredTrue]
    });

    // Load initial translations and subscribe to language changes.
    this.getTranslations();
    this.subscribeToLangChange();
  }

  /**
   * Loads translations for placeholders from the translation service.
   * @private
   */
  private getTranslations() {
    this.setPlaceholders();
  }

  /**
   * Sets form input placeholders using the translation service.
   * @private
   */
  private setPlaceholders() {
    // Translation keys are used to retrieve and set the placeholders.
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

  /**
   * Subscribes to language changes and updates the form placeholders.
   * @private
   */
  private subscribeToLangChange() {
    this.translate.onLangChange.subscribe(() => {
      this.setPlaceholders();
    });
  }

  /**
   * Validates the form and triggers the mail sending process if valid.
   */
  checkFormAndSubmit() {
    this.submitted = true;
    this.markFormGroupAsDirty(this.messageForm);

    if (this.messageForm.valid) {
      this.sendMail();
    }
  }

  /**
   * Recursively marks all controls in a form group as dirty.
   * @param formGroup The form group to mark as dirty.
   * @private
   */
  private markFormGroupAsDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();

      if (control instanceof FormGroup) {
        this.markFormGroupAsDirty(control);
      }
    });
  }

  /**
   * Asynchronously sends an email with the data entered in the form.
   * This method checks form validity, prepares the data, sends the request, and handles the response.
   * @private
   */
  async sendMail() {
    if (!this.messageForm.valid) {
      return;
    }

    const formData = this.prepareFormData();
    try {
      const response = await this.sendFormData(formData);
      this.handleSuccess(response);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.resetForm();
    }
  }

  /**
   * Prepares the FormData object from the form values.
   * @returns {FormData} The populated FormData object.
   * @private
   */
  private prepareFormData(): FormData {
    const formData: FormData = new FormData();
    formData.append('name', this.messageForm.value.name);
    formData.append('email', this.messageForm.value.email);
    formData.append('message', this.messageForm.value.text);
    return formData;
  }

  /**
   * Sends the FormData object to the server via POST request.
   * @param {FormData} formData The FormData object to send.
   * @returns {Promise<any>} The promise containing the response.
   * @private
   */
  private async sendFormData(formData: FormData): Promise<any> {
    return this.http.post('https://pierce-chang.de/send_mail/send_mail.php', formData, { responseType: 'text' }).toPromise();
  }

  /**
   * Handles successful form submission.
   * @param response The response from the server.
   * @private
   */
  private handleSuccess(response: any) {
    console.log('Success!', response);
    this.showSuccessModal = true;
    this.flyOut = false;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.flyOut = true;
      setTimeout(() => this.showSuccessModal = false, 500);
    }, 1500);
  }

  /**
   * Handles errors during form submission.
   * @param error The error object.
   * @private
   */
  private handleError(error: any) {
    console.error('Error!', error);
    this.sendNotificationEmail(this.messageForm.value.email);
  }

  /**
   * Resets the form and submission status.
   * @private
   */
  private resetForm() {
    this.messageForm.reset();
    this.submitted = false;
  }

  /**
   * Placeholder for sending a notification email in case of error.
   * @param email The email address to notify.
   * @private
   */
  sendNotificationEmail(email: string) {
    // TODO: Implement the logic to send a notification email.
  }

  /**
   * Closes the success modal.
   */
  closeModal() {
    this.showSuccessModal = false;
  }

  /**
   * Getters for easy access to form fields.
   */
  get name() {
    return this.messageForm.get('name');
  }

  /**
   * Getter for the 'email' form control value.
   * 
   * @returns The FormControl for the email field within the form group.
   */
  get email() {
    return this.messageForm.get('email');
  }

  /**
   * Getter for the 'text' form control value.
   * 
   * @returns The FormControl for the text field within the form group.
   */
  get text() {
    return this.messageForm.get('text');
  }

  /**
   * A reference to the 'contactSection' element within the component's template,
   * accessed through Angular's ViewChild decorator.
   * This allows for direct manipulation and access to the element's properties.
   * 
   * @ViewChild Decorator that configures a view query.
   */
  @ViewChild('contactSection') contactSection!: ElementRef;

  /**
   * A property to track whether the 'contactSection' is within the viewport based on scrolling.
   * It is set to 1 when the section is within the defined visibility threshold, and 0 otherwise.
   */
  scrolled = 0;

  /**
   * Listens to the global window scroll event to determine the visibility of the 'contactSection'.
   * 
   * @HostListener Decorator that declares a DOM event to listen for, and a method to execute when that event occurs.
   * @param $event The DOM event object, which is the scroll event in this case.
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Only proceed if 'contactSection' is defined.
    if (this.contactSection) {
      // Calculate the position of the 'contactSection' element relative to the viewport.
      const sectionPos = this.contactSection.nativeElement.getBoundingClientRect();
      const sectionTop = sectionPos.top; // The top position of the section.
      const threshold = 150; // The visibility threshold.

      // Update 'scrolled' based on whether 'contactSection' is within the viewport minus the threshold.
      if (sectionTop < window.innerHeight - threshold) {
        this.scrolled = 1;
      } else {
        this.scrolled = 0;
      }
    }
  }

}