import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() formSubmitted = new EventEmitter<any>()

  titre!: string;
  type!: string;
  description!: string;
  date!: string;
  lieu!: string;
  latitude: number | null = null;
  longitude: number | null = null;
  photo: string = '';

  onSubmit() {

    // Vérification date
    const selectedDate = new Date(this.date);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      alert('La date ne peut pas être dans le futur.');
      return;
    }

    const pollutionData = {
      titre: this.titre,
      type: this.type,
      description: this.description,
      date: this.date,
      lieu: this.lieu,
      latitude: this.latitude,
      longitude: this.longitude,
      photo: this.photo
    };

    this.formSubmitted.emit(pollutionData);

    this.resetForm();

  }

  resetForm() {
    this.titre = '';
    this.type = '';
    this.description = '';
    this.date = '';
    this.lieu = '';
    this.latitude = 0;
    this.longitude = 0;
    this.photo = '';
  }
}
