import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private baseUrl = "https://localhost:8443";

  //observable: Observable<String>;

  constructor(private http: HttpClient) {
    this.http.get(`${this.baseUrl}/getKey`, { responseType: 'text' })
      .subscribe(results => this.encryptSecretKey = results);
  }

  encryptSecretKey: string;

  encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }

  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }

  }
}
