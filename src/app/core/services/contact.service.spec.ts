// import { TestBed } from '@angular/core/testing';

// import { ContactService } from './contact.service';

// describe('ContactService', () => {
//   let service: ContactService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ContactService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  sendMessage(formData: IContact): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  /** GET ALL CONTACT MESSAGES */
  getMessages(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  /** DELETE ONE MESSAGE BY EMAIL */
  deleteMessage(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${email}`);
  }

}
