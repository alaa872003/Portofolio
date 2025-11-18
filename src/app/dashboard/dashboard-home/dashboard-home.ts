import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray
} from '@angular/forms';
import { IProfile } from '../../core/models/userProfile.model';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.css'],
})
export class DashboardHome implements OnInit {

  profileForm!: FormGroup;

  loading = false;
  saving = false;
  imagePreview: string | null = null;
  existingImageFilename: string | null = null;

  constructor(private fb: FormBuilder, private service: UserProfileService) {}

  ngOnInit() {
    this.initializeForm();
    this.loadProfile();
  }

  private initializeForm() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: [''],
      headline: [''],
      about: [''],
      location: [''],

      profileImg: this.fb.control<string | File | null>(null),

      socialLinks: this.fb.array<FormGroup>([])
    });
  }

get socialLinks(): FormArray<FormGroup> {
  return this.profileForm.get('socialLinks') as FormArray<FormGroup>;
}

private createSocialLink(data?: { platform?: string; url?: string }): FormGroup {
    return this.fb.group({
      platform: [data?.platform || '', Validators.required],
      url: [
        data?.url || '',
        [Validators.required, Validators.pattern('https?://.+')]
      ]
    });
  }

  addSocialLink(data?: { platform?: string; url?: string }) {
    this.socialLinks.push(this.createSocialLink(data));
  }

  removeSocialLink(index: number) {
    this.socialLinks.removeAt(index);
  }

  loadProfile() {
    this.loading = true;

    this.service.getProfile()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (p: IProfile) => {
          if (!p) return;

          this.profileForm.patchValue({
            name: p.name,
            title: p.title,
            headline: p.headline,
            about: p.about,
            location: p.location,
            profileImg: p.profileImg
          });

          this.socialLinks.clear();

          if (p.socialLinks?.length) {
            p.socialLinks.forEach(link => this.addSocialLink(link));
          } else {
            this.addSocialLink();
          }

          if (typeof p.profileImg === 'string') {
            this.existingImageFilename = p.profileImg;
            this.imagePreview = `http://localhost:3000/profileFiles/${p.profileImg}`;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to load profile', err);
        }
      });
  }

  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    this.profileForm.patchValue({ profileImg: file });

    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    const val = this.profileForm.value;

    const payload: IProfile = {
      name: val.name!,
      title: val.title!,
      headline: val.headline!,
      about: val.about!,
      location: val.location!,
      socialLinks: val.socialLinks || [],
      profileImg: val.profileImg!
    };

    this.service.updateProfile(payload)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: () => {
          this.loadProfile();
          alert('Profile updated successfully');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          alert('Failed to update profile');
        }
      });
  }
}
