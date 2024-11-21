import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private apiUrl = 'http://localhost:3000/api/orders'; // Replace with your backend URL

    constructor(private http: HttpClient) { }

    createOrder(orderData: any): Observable<any> {
        return this.http.post(this.apiUrl, orderData); // Make an HTTP POST request to create the order
    }
    getCrossSellProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
