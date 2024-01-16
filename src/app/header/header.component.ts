import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  activeLink!: string;
  isMenuOpen = false;

  setActiveLink(link: string): void {
    this.activeLink = link;
    this.isMenuOpen = false; // Schließt das Menü, nachdem ein Link ausgewählt wurde
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
