import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { IContact } from '../../core/models/contact.model';

@Component({
  selector: 'app-dashboard-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-contact.html',
  styleUrl: './dashboard-contact.css',
})
export class DashboardContact implements OnInit {

  messages: IContact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.contactService.getMessages().subscribe({
      next: (data: IContact[]) => {
        this.messages = data;
      },
      error: (err: unknown) => {
        console.error('Failed to load contact messages', err);
      }
    });
  }

  delete(email: string): void {
    if (!confirm('Are you sure you want to delete this message?')) return;

    this.contactService.deleteMessage(email).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err: unknown) => {
        console.error(`Failed to delete message with email=${email}`, err);
      }
    });
  }
}
