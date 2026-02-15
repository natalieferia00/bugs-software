import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  // Cuando despliegues en Render, cambia esto por la URL que te dé Render
  private apiUrl = 'http://localhost:3000/api/bugs'; 

  constructor(private http: HttpClient) {}

  getBugs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createBug(bug: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bug);
  }

  deleteBug(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}