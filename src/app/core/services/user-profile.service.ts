import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { IProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private api = 'http://localhost:3000/userProfile';

  private profileState = new BehaviorSubject<IProfile | null>(null);
  profile$ = this.profileState.asObservable();

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<IProfile>(this.api).pipe(
      tap(profile => this.profileState.next(profile)) 
    );
  }


updateProfile(data: IProfile) {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('title', data.title);
  formData.append('headline', data.headline);
  formData.append('about', data.about);
  formData.append('location', data.location);

  formData.append('socialLinks', JSON.stringify(data.socialLinks));

  if (data.profileImg instanceof File) {
    formData.append('profileImg', data.profileImg);
  }

return this.http.put(`${this.api}`, formData);
}

  get currentProfile() {
    return this.profileState.value;
  }
}
