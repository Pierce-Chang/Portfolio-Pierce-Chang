import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit{
  title = 'Pierce-Chang_Portfolio';
  isLoading: boolean = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
