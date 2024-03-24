import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  scrolled = 0;

/**
 * This component class member is used to reference the 'aboutMeSection' element in the template.
 * @ViewChild('aboutMeSection') decorates the property, allowing direct access to the element.
 */
@ViewChild('aboutMeSection') aboutMeSection!: ElementRef;

/**
 * Listens to the window scroll event and updates the `scrolled` property based on the scroll position relative to the 'aboutMeSection'.
 * The method calculates the position of the 'aboutMeSection' and compares it to the window's inner height, adjusting the `scrolled` property to indicate whether the section is within the defined visibility threshold.
 * @HostListener Decorator that declares a DOM event to listen for, and provides a handler method to run when that event occurs.
 * @param $event The scroll event object (unused in the method, but required by the decorator syntax).
 */
@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  // Checks if the aboutMeSection ElementRef is defined.
  if (this.aboutMeSection) {
    // Retrieves the position of the aboutMeSection relative to the viewport.
    const sectionPos = this.aboutMeSection.nativeElement.getBoundingClientRect();
    const sectionTop = sectionPos.top;
    const threshold = 150; // Defines a visibility threshold.

    // Updates `scrolled` based on the section's position relative to the viewport and threshold.
    if (sectionTop < window.innerHeight - threshold) {
      this.scrolled = 1;
    } else {
      this.scrolled = 0;
    }
  }
}

}
