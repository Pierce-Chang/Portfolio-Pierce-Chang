import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent {
  scrolled = 0;

  @ViewChild('mySkillsSection') mySkillsSection!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.mySkillsSection) {
      const sectionPos = this.mySkillsSection.nativeElement.getBoundingClientRect();
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