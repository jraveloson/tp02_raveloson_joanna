import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() formSubmitted = new EventEmitter<any>();

  pollutionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pollutionForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      lieu: ['', Validators.required],
      latitude: [
        null,
        [Validators.required, Validators.min(-90), Validators.max(90)]
      ],
      longitude: [
        null,
        [Validators.required, Validators.min(-180), Validators.max(180)]
      ],
      photo: ['']
    });
  }

  onSubmit() {
    const data = this.pollutionForm.value;

    // Vérif champs vides
    if (
      !data.titre?.trim() ||
      !data.type?.trim() ||
      !data.description?.trim() ||
      !data.date ||
      !data.lieu?.trim()
    ) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Vérif latitude/longitude non vides
    if (data.latitude === null || data.longitude === null || data.latitude === '' || data.longitude === '') {
      alert('Veuillez saisir une latitude et une longitude valides.');
      return;
    }

    // Conversion explicite
    const lat = Number(data.latitude);
    const lon = Number(data.longitude);

    // Vérif bornes géographiques
    if (lat < -90 || lat > 90) {
      alert('La latitude doit être comprise entre -90 et 90.');
      return;
    }

    if (lon < -180 || lon > 180) {
      alert('La longitude doit être comprise entre -180 et 180.');
      return;
    }

    // Vérif date non future
    const selectedDate = new Date(data.date);
    if (selectedDate > new Date()) {
      alert('La date ne peut pas être dans le futur.');
      return;
    }

    // ✅ Tout est bon → on émet les données
    this.formSubmitted.emit(data);
    this.pollutionForm.reset();
  }

}
