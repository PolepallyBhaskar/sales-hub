// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';  // Your API endpoint

  constructor(private http: HttpClient) { }

  getCrossSellProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
