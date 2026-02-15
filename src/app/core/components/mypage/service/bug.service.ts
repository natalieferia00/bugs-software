import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BugService {
  // ⚠️ ESTE ES EL CAMBIO VITAL:
  private apiUrl = 'https://backend-bugs.onrender.com/api/bugs'; 

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