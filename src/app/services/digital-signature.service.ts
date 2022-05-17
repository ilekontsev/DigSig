import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';
import { SECRET_PHRASE } from '../shared/constants/secretPhrase';

@Injectable({
  providedIn: 'root',
})
export class DigitalSignatureService {
  private _hash = 'dwa';

  constructor() {}

  getHash(input: any) {
    const chunkSize = 1000 * 1000 * 2;

    if (input?.length === 0) {
      return;
    }

    console.time();
    const sha256 = CryptoJS.algo.SHA256.create();
    const file = input;

    const fileSize = file.size;
    let partsAmount = Math.ceil(fileSize / chunkSize);
    if (partsAmount === 0) {
      partsAmount = 1;
    }

    let i = 0;
    const readPart = () => {
      console.log('Шаг ' + i);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const ab = e.target.result;
        const wa = CryptoJS.lib.WordArray.create(ab);
        sha256.update(wa);
        i++;
        if (i === partsAmount) {
          const hash = sha256.finalize().toString();
          console.log(hash);
          this._hash = hash;
          console.timeEnd();
          return;
        } else {
          readPart();
        }
      };
      reader.readAsArrayBuffer(file.slice(i * chunkSize, (i + 1) * chunkSize));
    };

    readPart();
    console.log(this._hash);
  }

  async generateKey() {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-V1_5',
        modulusLength: 4096,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {
          name: 'SHA-512',
        },
      },
      true,
      ['sign', 'verify']
    );

    const privateKeyE = await window.crypto.subtle.exportKey(
      'jwk',
      key.privateKey
    );
    const publicKeyE = await window.crypto.subtle.exportKey(
      'jwk',
      key.publicKey
    );

    console.log(privateKeyE);

    return {
      privateKey: this.encrypt(JSON.stringify(privateKeyE)),
      publicKey: this.encrypt(JSON.stringify(publicKeyE)),
    };
  }

  encrypt(key) {
    return window.btoa(key);
  }

  decrypt(key) {
    return JSON.parse(window.atob(key));
  }

  async sign(key: any) {
    const secretKey = this.decrypt(key);
    console.log('sign');
    console.log(this._hash);
    const privateKey = await window.crypto.subtle.importKey(
      'jwk',
      secretKey,
      {
        name: 'RSASSA-PKCS1-V1_5',
        hash: { name: 'SHA-512' },
      },
      false,
      ['sign']
    );
    const data = new TextEncoder().encode(this._hash);
    const signature = await window.crypto.subtle.sign(
      {
        name: 'RSASSA-PKCS1-V1_5',
      },
      privateKey,
      data
    );
    return new Uint8Array(signature).join(':');
  }

  async verify(key: any, signatureStr: any) {
    const publicKeyJwk = this.decrypt(key);

    const signatureArr = signatureStr.split(':').map((x: any) => +x);
    const signature = new Uint8Array(signatureArr).buffer;
    const publicKey = await window.crypto.subtle.importKey(
      'jwk',
      publicKeyJwk,
      {
        name: 'RSASSA-PKCS1-V1_5',
        hash: { name: 'SHA-512' },
      },
      false,
      ['verify']
    );
    const data = new TextEncoder().encode(this._hash);

    const ok = await window.crypto.subtle.verify(
      {
        name: 'RSASSA-PKCS1-V1_5',
      },
      publicKey,
      signature,
      data
    );
    return ok;
  }
}
