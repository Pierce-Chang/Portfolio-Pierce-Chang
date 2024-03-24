import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

/**
 * Scrolls the browser window to the top of the document smoothly.
 * This method uses the window.scrollTo method with a smooth scrolling behavior,
 * providing a user-friendly way to return to the top of the page.
 */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
