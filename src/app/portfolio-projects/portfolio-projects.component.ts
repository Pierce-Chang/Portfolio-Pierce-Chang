import { Component, Input, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-portfolio-projects',
  templateUrl: './portfolio-projects.component.html',
  styleUrls: ['./portfolio-projects.component.scss']
})
export class PortfolioProjectsComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() languages!: string;
  @Input() description!: string;
  @Input() isReversed: boolean = false;
  @Input() liveTestLink?: string;
  @Input() gitHubLink?: string;
  @ViewChild('laptopImage', { static: false }) laptopImage!: ElementRef;

/**
 * Handles the window scroll event to apply an animation class to the laptop image.
 * Checks if the laptop image is fully visible in the viewport and adds a class to trigger an animation.
 */
@HostListener('window:scroll', ['$event'])
onWindowScroll() {
  const position = this.laptopImage.nativeElement.getBoundingClientRect();
  
  // Checks if the element is within the visible viewport
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    this.laptopImage.nativeElement.classList.add('laptop-animation');
  }
}

}
