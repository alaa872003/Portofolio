import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})

export class ContactUs {

  contactForm: FormGroup;
  isLoading = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService
  ) {
    this.contactForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  sendMessage() {
    this.successMsg = '';
    this.errorMsg = '';

    if (this.contactForm.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }

    this.isLoading = true;

    this._contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMsg = 'Your message has been sent successfully!';
        this.contactForm.reset();
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg = 'Something went wrong. Please try again.';
      }
    });
  }

}
