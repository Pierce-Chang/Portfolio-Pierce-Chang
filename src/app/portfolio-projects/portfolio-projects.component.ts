import { Component, Input } from '@angular/core';

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
}
