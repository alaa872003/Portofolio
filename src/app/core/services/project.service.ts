
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl);
  }

  addProject(formData: FormData): Observable<IProject> {
    return this.http.post<IProject>(this.apiUrl, formData);
  }

  updateProject(title: string, formData: FormData): Observable<IProject> {
    return this.http.put<IProject>(
      `${this.apiUrl}/${encodeURIComponent(title)}`,
      formData
    );
  }

  deleteProject(title: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${encodeURIComponent(title)}`
    );
  }
}
