import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService implements OnInit {

  private baseUrl = "https://localhost:8443";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(`${this.baseUrl}/getKey`, { responseType: 'text' })
      .subscribe(results => this.encryptSecretKey = results);
  }

  encryptSecretKey: string;

  //przyklad
  //sessionStorage.setItem('userId', this.encryptionService.encryptData(data['uzytkownik_id']));
  // console.log(sessionStorage.getItem('userId'));

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
