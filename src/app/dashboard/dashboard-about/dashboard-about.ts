import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../core/services/user-profile.service';
import { IProfile } from '../../core/models/userProfile.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-about.html',
  styleUrl: './dashboard-about.css',
})
export class DashboardAbout implements OnInit {

  aboutForm!: FormGroup;
  loading = false;
  saving = false;

  constructor(private fb: FormBuilder, private service: UserProfileService) {}

  ngOnInit() {
    this.initForm();
    this.loadProfileInfo();
  }

  private initForm() {
    this.aboutForm = this.fb.group({
      title: ['', Validators.required],
      headline: ['', Validators.required],
      about: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  private loadProfileInfo() {
    this.loading = true;

    this.service.getProfile()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (p: IProfile) => {
          if (!p) return;

          this.aboutForm.patchValue({
            title: p.title,
            headline: p.headline,
            about: p.about,
            location: p.location
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error("Failed to load about info", err);
        }
      });
  }

  submit() {
    if (this.aboutForm.invalid) {
      this.aboutForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    const current = this.service.currentProfile;

    if (!current) {
      alert("Profile not loaded");
      this.saving = false;
      return;
    }

    const updated: IProfile = {
      ...current,
      ...this.aboutForm.value
    };

    this.service.updateProfile(updated)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => alert("About info updated successfully"),
        error: (err) => {
          console.error(err);
          alert("Failed to update");
        }
      });
  }
}
