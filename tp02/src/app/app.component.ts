import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { RecapComponent } from './recap/recap.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, RecapComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pollutionData: any = null;

  handleFormSubmit(data: any) {
    this.pollutionData = data;
    console.log(data);
  }
  resetRecap() {
    this.pollutionData = null;
  }
}
