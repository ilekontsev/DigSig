import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class DigitalSignatureService {
  constructor() {}

  sign(input: any) {
    console.log(1231321)
    const chunkSize = 1000 * 1000 * 2;
    console.log(input)
    console.log()

    if (input?.length === 0) {
      return;
    }

    console.time();
    const sha256 = CryptoJS.algo.SHA256.create();
    const file = input;
  
    const fileSize = file.size;
    let partsAmount = Math.ceil(fileSize / chunkSize);
    // если размер файла равен нулю
    if (partsAmount === 0) {
      partsAmount = 1;
    }

    let i = 0;

    function readPart() {
      console.log('Шаг ' + i);
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const ab = e.target.result;
        const wa = CryptoJS.lib.WordArray.create(ab);
        sha256.update(wa);
        i++;
        if (i === partsAmount) {
          const hash = sha256.finalize().toString();
          console.log(hash); // выводим хэш большого файла
          console.timeEnd();
          return;
        } else {
          readPart();
        }
      };
      reader.readAsArrayBuffer(file.slice(i * chunkSize, (i + 1) * chunkSize));
    }

    readPart();
  }

}
