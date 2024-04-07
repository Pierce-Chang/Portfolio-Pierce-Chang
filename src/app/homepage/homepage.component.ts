import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadStateService } from '../services/load-state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  @ViewChild('loadingOverlay') loadingOverlay!: ElementRef;
  title = 'Pierce-Chang_Portfolio';
  isLoading: boolean = true;
  message: string = '';
  private fullMessage: string = 'Willkommen auf meinem Portfolio ...';
  private currentIndex: number = 0;

  constructor(private loadStateService: LoadStateService) {}

  ngOnInit(): void {
    this.animateLoginIfImagesLoading();
  }
  
  animateLoginIfImagesLoading() {
    if (!this.loadStateService.getImagesLoaded()) {
      this.typeMessage();
    } else {
      this.isLoading = false;
    }
  }

  typeMessage(): void {
    if (this.currentIndex < this.fullMessage.length) {
      this.message += this.fullMessage.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.typeMessage(), 50);
    } else {
      setTimeout(() => {
        this.fadeOutLoading();
      }, 1500);
    }
  }

  fadeOutLoading(): void {
    this.loadingOverlay.nativeElement.classList.add('fade-out');
    setTimeout(() => {
      this.isLoading = false;
      this.loadStateService.setImagesLoaded(true);
    }, 1500);
  }
}
