import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, FormGroup,
  FormControl, FormArray, Validators, AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, debounceTime, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// ── Custom Validators ──────────────────────────────────────────────────────

// Sync validator — password strength
function strongPassword(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) return null;
  const hasUpper   = /[A-Z]/.test(value);
  const hasLower   = /[a-z]/.test(value);
  const hasNumber  = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*]/.test(value);
  const isValid = hasUpper && hasLower && hasNumber && hasSpecial;
  return isValid ? null : {
    strongPassword: { hasUpper, hasLower, hasNumber, hasSpecial }
  };
}

// Cross-field validator — passwords must match
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forms-demo.html',
  styleUrl: './forms-demo.scss'
})
export class FormsDemoComponent implements OnInit, OnDestroy {
  private fb      = inject(FormBuilder);
  private http    = inject(HttpClient);
  private destroy$ = new Subject<void>();

  // ── Form 1: Basic Reactive Form ───────────────────────────────
  profileForm!: FormGroup;

  // ── Form 2: Registration with custom validators ────────────────
  registrationForm!: FormGroup;

  // ── Form 3: Dynamic FormArray ──────────────────────────────────
  skillsForm!: FormGroup;

  // ── Submission state ───────────────────────────────────────────
  profileSubmitted  = false;
  registrationSubmitted = false;
  skillsSubmitted   = false;
  submittedData: any = null;

  ngOnInit() {
    this.buildProfileForm();
    this.buildRegistrationForm();
    this.buildSkillsForm();
  }

  // ══════════════════════════════════════════════════════════════
  // FORM 1 — Basic Reactive Form
  // ══════════════════════════════════════════════════════════════
  buildProfileForm() {
    this.profileForm = this.fb.group({
      // [initialValue, syncValidators, asyncValidators]
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName:  ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email],
                  [this.emailExistsValidator.bind(this)]],  // async validator
      age:       [null, [Validators.required, Validators.min(18), Validators.max(100)]],
      role:      ['developer', Validators.required],
    });

    // Listen to value changes — reactive forms are observable!
    this.profileForm.get('email')?.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(val => {
      console.log('Email changed:', val);
    });
  }

  // Async validator — simulates checking if email exists in DB
  emailExistsValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) return of(null);

    // Simulate API call — in real app: this.http.get(...)
    return of(control.value).pipe(
      debounceTime(500),
      map(email => {
        // Simulate: 'taken@test.com' is already registered
        return email === 'taken@test.com' ? { emailTaken: true } : null;
      }),
      catchError(() => of(null))
    );
  }

  submitProfile() {
    this.profileSubmitted = true;
    if (this.profileForm.valid) {
      this.submittedData = this.profileForm.value;
      console.log('Profile submitted:', this.profileForm.value);
    } else {
      // Mark all as touched to show all errors
      this.profileForm.markAllAsTouched();
    }
  }

  // ══════════════════════════════════════════════════════════════
  // FORM 2 — Custom Validators
  // ══════════════════════════════════════════════════════════════
  buildRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        username: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_]+$/)
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          strongPassword          // custom sync validator
        ]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordsMatch }  // cross-field validator on group
    );
  }

  submitRegistration() {
    this.registrationSubmitted = true;
    if (this.registrationForm.valid) {
      console.log('Registration:', this.registrationForm.value);
      alert('Registration successful!');
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  // Password strength helpers
  get passwordStrength() {
    const errors = this.registrationForm.get('password')?.errors?.['strongPassword'];
    if (!errors) return null;
    return errors;
  }

  // ══════════════════════════════════════════════════════════════
  // FORM 3 — Dynamic FormArray
  // ══════════════════════════════════════════════════════════════
  buildSkillsForm() {
    this.skillsForm = this.fb.group({
      developerName: ['', Validators.required],
      skills: this.fb.array([
        this.createSkillGroup(), // start with one skill
      ])
    });
  }

  // Helper to create a skill FormGroup
  createSkillGroup(): FormGroup {
    return this.fb.group({
      name:        ['', Validators.required],
      level:       ['beginner', Validators.required],
      yearsExp:    [1, [Validators.required, Validators.min(0), Validators.max(20)]],
    });
  }

  // Getter for easy template access
  get skillsArray(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  get skillGroups(): FormGroup[] {
    return this.skillsArray.controls as FormGroup[];
  }

  addSkill() {
    this.skillsArray.push(this.createSkillGroup());
  }

  removeSkill(index: number) {
    if (this.skillsArray.length > 1) {
      this.skillsArray.removeAt(index);
    }
  }

  submitSkills() {
    this.skillsSubmitted = true;
    if (this.skillsForm.valid) {
      console.log('Skills:', this.skillsForm.value);
      this.submittedData = this.skillsForm.value;
    } else {
      this.skillsForm.markAllAsTouched();
    }
  }

  // ── Helpers ────────────────────────────────────────────────────
  isInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  getError(form: FormGroup, field: string, error: string): boolean {
    return !!form.get(field)?.hasError(error);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}