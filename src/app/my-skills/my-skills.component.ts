import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  scrolled = 0;

/**
 * Reference to the 'mySkillsSection' element within the component's template.
 * @ViewChild Decorates the property, enabling direct access to the DOM element.
 */
@ViewChild('mySkillsSection') mySkillsSection!: ElementRef;

/**
 * Listens to window scroll events to determine if 'mySkillsSection' is in view.
 * Updates `scrolled` to indicate visibility within a predefined threshold.
 */
@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  if (this.mySkillsSection) {
    const sectionPos = this.mySkillsSection.nativeElement.getBoundingClientRect();
    const sectionTop = sectionPos.top;
    const threshold = 150;

    this.scrolled = sectionTop < window.innerHeight - threshold ? 1 : 0;
  }
}

/**
 * Scrolls to the 'contact' section of the page smoothly.
 */
scrollToContact(): void {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}
}