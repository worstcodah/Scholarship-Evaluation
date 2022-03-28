import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Intern } from '../interfaces/intern'

@Injectable()
export class ApiService {
  private readonly API_URL: string = 'https://localhost:5001/api'
  constructor(private http: HttpClient) {}

  getInterns(): Observable<Intern[]> {
    return this.http.get<Intern[]>(`${this.API_URL}/Interns`)
  }

  createIntern(intern: Intern) {
    return this.http.post(`${this.API_URL}/Interns`, intern)
  }

  updateIntern(id: string, intern: Intern) {
    return this.http.put(`${this.API_URL}/Interns/${id}`, intern)
  }

  deleteIntern(id: string) {
    return this.http.delete(`${this.API_URL}/Interns/${id}`)
  }
}
