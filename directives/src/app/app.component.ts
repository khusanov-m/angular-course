import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loadedFeature = 'recipe';
  title = 'the-basics';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
