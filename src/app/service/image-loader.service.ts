import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor(private http: HttpClient) { }
  loadImage(url: string) {
    return this.http.get(url, { responseType: 'blob' });
  }
}
