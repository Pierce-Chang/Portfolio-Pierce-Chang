import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('loadingOverlay') loadingOverlay!: ElementRef;
  title = 'Pierce-Chang_Portfolio';
  isLoading: boolean = true;
  message: string = '';
  private fullMessage: string = 'Willkommen auf meinem Portfolio ...';
  private currentIndex: number = 0;

  ngOnInit(): void {
    this.typeMessage();
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
    }, 1500);
  }
}
