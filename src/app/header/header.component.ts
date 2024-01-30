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
    // Additional logic
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isAnimating = true;
    this.isOpeningMenu = !this.isMenuOpen;

    if (this.isOpeningMenu) {
      // Animation beim Öffnen des Menüs
      this.showHalfBurger = true;

      setTimeout(() => {
        this.showHalfBurger = false;
        this.showHalfClose = true;
      }, 35); // Halbzeit der Gesamtanimationsdauer
    } else {
      // Animation beim Schließen des Menüs
      this.showHalfClose = true;

      setTimeout(() => {
        this.showHalfClose = false;
        this.showHalfBurger = true;
      }, 35); // Halbzeit der Gesamtanimationsdauer
    }

    setTimeout(() => {
      this.isMenuOpen = !this.isMenuOpen;
      this.showHalfBurger = false;
      this.showHalfClose = false;
      this.isAnimating = false;
    }, 70); // Gesamtanimationsdauer
  }
}
