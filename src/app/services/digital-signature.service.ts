import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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

    const sha256 = CryptoJS.algo.SHA256.create();
    const file = input;

    const fileSize = file.size;
    let partsAmount = Math.ceil(fileSize / chunkSize);
    if (partsAmount === 0) {
      partsAmount = 1;
    }

    let i = 0;
    const readPart = () => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const ab = e.target.result;
        const wa = CryptoJS.lib.WordArray.create(ab);
        sha256.update(wa);
        i++;
        if (i === partsAmount) {
          const hash = sha256.finalize().toString();
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
  }

  switchGenerateKeys(select) {
    switch (select) {
      case 'ECDSA':
        return this.ECDSAgenerateKey();

      case 'RSASSA':
        return this.RSASSAgenerateKey();

      default:
        return this.RSASSAgenerateKey();
    }
  }



  private async ECDSAgenerateKey() {
    const key = await window.crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-384',
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

    return {
      privateKey: this.encrypt(privateKeyE, 'ECDSA'),
      publicKey: this.encrypt(publicKeyE, 'ECDSA'),
    };
  }

  private async RSASSAgenerateKey() {
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

    return {
      privateKey: this.encrypt(privateKeyE, 'RSASSA'),
      publicKey: this.encrypt(publicKeyE, 'RSASSA'),
    };
  }

  encrypt(key, method) {
    let tkey = Object.assign({}, key, { mt: method });
    return window.btoa(JSON.stringify(tkey));
  }

  decrypt(key) {
    return JSON.parse(window.atob(key));
  }

  switchSign(key) {
    const data = this.decrypt(key);

    switch (data.mt) {
      case 'ECDSA':
        return this.ECDSAsign(data);

      case 'RSASSA':
        return this.RSASSAsign(data);

      default:
        return this.RSASSAsign(data);
    }
  }

  private async ECDSAsign(secretKey) {
    const privateKey = await window.crypto.subtle.importKey(
      'jwk',
      secretKey,
      {
        name: 'ECDSA',
        namedCurve: 'P-384',
      },
      true,
      ['sign']
    );
    const data = new TextEncoder().encode(this._hash);

    let signature = await window.crypto.subtle.sign(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' },
      },
      privateKey,
      data
    );
    return new Uint8Array(signature).join(':');
  }


  private async RSASSAsign(secretKey: any) {
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

  switchVerify(key, signature) {
    const data = this.decrypt(key);

    switch (data.mt) {
      case 'ECDSA':
        return this.ECDSAverify(data, signature);

      case 'RSASSA':
        return this.RSASSAverify(data, signature);

      default:
        return this.RSASSAverify(data, signature);
    }
  }

  private async ECDSAverify(publicKeyJwk, signatureStr) {
    const signatureArr = signatureStr.split(':').map((x: any) => +x);
    const signature = new Uint8Array(signatureArr).buffer;

    const publicKey = await window.crypto.subtle.importKey(
      'jwk',
      publicKeyJwk,
      {
        name: 'ECDSA',
        namedCurve: 'P-384',
      },
      true,
      ['sign']
    );

    const data = new TextEncoder().encode(this._hash);

    let ok = await window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-384' },
      },
      publicKey,
      signature,
      data
    );
    return ok;
  }

  private async RSASSAverify(publicKeyJwk: any, signatureStr: any) {
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
