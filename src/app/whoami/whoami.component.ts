import { Component } from '@angular/core';

@Component({
  selector: 'app-whoami',
  templateUrl: './whoami.component.html',
  styleUrl: './whoami.component.scss'
})
export class WhoamiComponent {
  
/**
 * Scrolls to a specified page section smoothly.
 * @param {string} sectionId The ID of the section to scroll to.
 */
scrollToSection(sectionId: string): void {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

}
