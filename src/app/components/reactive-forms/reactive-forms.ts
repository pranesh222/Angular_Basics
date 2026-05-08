import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.scss',
})
export class ReactiveForms {
name = new FormControl('');
nameForm = new FormGroup({
  name: new FormControl('')
});

updateName() {
  this.nameForm.get('name')?.setValue('Nancy');
}

onSubmit() {
  console.log(this.nameForm.value);
}
}