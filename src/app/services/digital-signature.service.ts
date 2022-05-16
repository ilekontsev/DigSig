import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DigitalSignatureService {
  private _hash = '';

  constructor() {}

  getHash(input: any) {
    const chunkSize = 1000 * 1000 * 2;

    if (input?.length === 0) {
      return;
    }

    const sha256 = CryptoJS.algo.SHA256.create();
    const file = input;

    const fileSize = file.size;
    let partsAmount = Math.ceil(fileSize / chunkSize);
    if (partsAmount === 0) {
      partsAmount = 1;
    }

    let i = 0;
    let hash = '';
    function readPart() {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const ab = e.target.result;
        const wa = CryptoJS.lib.WordArray.create(ab);
        sha256.update(wa);
        i++;
        if (i === partsAmount) {
          hash = sha256.finalize().toString();
          return;
        } else {
          readPart();
        }
      };
      reader.readAsArrayBuffer(file.slice(i * chunkSize, (i + 1) * chunkSize));
    }

    readPart();
    console.log(hash);
    this._hash = hash;
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

    return {
      privateKey: await window.crypto.subtle.exportKey('jwk', key.privateKey),
      publicKey: await window.crypto.subtle.exportKey('jwk', key.publicKey),
    };
  }

  async sign(secretKey: any) {
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
    const signature = await 
  }
}
