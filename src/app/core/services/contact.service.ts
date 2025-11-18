// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { IContact } from '../models/contact.model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ContactService {
//   getMessages() {
//     throw new Error('Method not implemented.');
//   }

//   private apiUrl = 'http://localhost:3000/contact';

//   constructor(private http: HttpClient) {}

//   sendMessage(formData: IContact): Observable<any> {
//     return this.http.post(this.apiUrl, formData);
//   }
// }


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

  getMessages(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.apiUrl);
  }

  sendMessage(formData: IContact): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, formData);
  }

  deleteMessage(email: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${email}`);
  }
}
