
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISkill } from '../models/skill.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = 'http://localhost:3000/skill';

  constructor(private _http: HttpClient) {}

  getSkills(): Observable<ISkill[]> {
    return this._http.get<ISkill[]>(this.apiUrl);
  }

  addSkill(skill: ISkill): Observable<ISkill> {
    return this._http.post<ISkill>(this.apiUrl, skill);
  }

 updateSkill(name: string, updatedSkill: ISkill) {
  return this._http.put<ISkill>(`${this.apiUrl}/${name}`, updatedSkill);
}


  deleteSkill(name: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${name}`);
  }
}
