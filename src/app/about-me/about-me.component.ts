import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  scrolled = 0;

  @ViewChild('aboutMeSection') aboutMeSection!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.aboutMeSection) {
      const sectionPos = this.aboutMeSection.nativeElement.getBoundingClientRect();
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
