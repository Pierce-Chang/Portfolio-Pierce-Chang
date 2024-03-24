import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeLink!: string;
  isMenuOpen = false;
  isAnimating = false;
  showHalfBurger = false;
  showHalfClose = false;
  isOpeningMenu = false;

  constructor(public translate: TranslateService) {
  }

  /**
   * Sets the currently active link and closes the menu.
   * @param {string} link The identifier of the currently active link.
   */
  setActiveLink(link: string): void {
    this.activeLink = link;
    this.isMenuOpen = false;
  }

  /**
   * Scrolls to a specific section of the page smoothly.
   * @param {string} sectionId The ID of the section to scroll to.
   */
  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Scrolls to a specific section of the page with a specified offset smoothly.
   * This is useful for scenarios where fixed headers might obscure the start of the section.
   * @param {string} sectionId The ID of the section to scroll to.
   * @param {number} offset The number of pixels to offset from the section's top. This is useful for adjusting scroll position for fixed headers or other elements that may cover the section.
   */
  scrollToSectionWithOffset(sectionId: string, offset: number): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }

  /**
   * Initiates a sequence of animations for the menu button during toggle.
   * @param {boolean} isOpening Determines the direction of the animation sequence.
   * @private
   */
  private animateMenuButton(isOpening: boolean): void {
    const animationStartState = isOpening ? 'showHalfBurger' : 'showHalfClose';
    const animationEndState = isOpening ? 'showHalfClose' : 'showHalfBurger';

    this[animationStartState] = true;
    setTimeout(() => {
      this[animationStartState] = false;
      this[animationEndState] = true;

      setTimeout(() => {
        this.isMenuOpen = !this.isMenuOpen;
        this[animationEndState] = false;
        this.isAnimating = false;
      }, 35);
    }, 35);
  }

  /**
   * Toggles the state of the menu between open and closed, managing animations for the menu button.
   * Simplifies the process by utilizing a helper method to sequence animations.
   */
  toggleMenu(): void {
    this.isAnimating = true;
    const isOpeningMenu = !this.isMenuOpen;
    this.animateMenuButton(isOpeningMenu);
  }
}
