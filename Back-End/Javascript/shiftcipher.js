// Write class below
class ShiftCipher {
    static A = 65;
    static Z = 90;

    constructor(shiftBy) {
        this._shiftBy = shiftBy;
    }

    static encode(charCode, shiftBy) {

        const encodedCode = charCode + shiftBy;
        const excess = encodedCode - ShiftCipher.Z;

        console.log(`encode: charCode: ${charCode}, encodedCode: ${encodedCode}, excess: ${excess}`);

        return excess > 0 ? (ShiftCipher.A + excess - 1) : encodedCode; 
    }

    static decode(charCode, shiftBy) {

        const decodedCode = charCode - shiftBy;
        const excess = decodedCode - ShiftCipher.A;

        console.log(`decode: charCode: ${charCode}, decodedCode: ${decodedCode}, excess: ${excess}`);

        return excess < 0 ? ShiftCipher.Z + excess + 1: decodedCode; 
    }

    encrypt(message) {
        let encryptedCharCodes = [];
        let charCode, encryptedCode;
        message = message.toUpperCase();

        console.log(`encrypt: message: ${message}, shiftBy: ${this._shiftBy}`);

        for (let i = 0; i < message.length; i++) {
            charCode = message.charCodeAt(i);
            encryptedCode = ShiftCipher.encode(charCode, this._shiftBy);
            encryptedCharCodes.push(encryptedCode);
            
            console.log(`encrypt.forLoop: charCode: ${charCode}, encryptedCode: ${encryptedCode}, encrypedCharCodes: ${encryptedCharCodes}`);
        }

        return String.fromCharCode.apply(null, encryptedCharCodes);
    }

    decrypt(message) {
        let decryptedCharCodes = [];
        let charCode, decryptedCode;
        message = message.toUpperCase();

        console.log(`decrypt: message: ${message}, shiftBy: ${this._shiftBy}`);

        for (let i = 0; i < message.length; i++) {
            charCode = message.charCodeAt(i);
            decryptedCode = ShiftCipher.decode(charCode, this._shiftBy);
            decryptedCharCodes.push(decryptedCode);
            
            console.log(`decrypt.forLoop: charCode: ${charCode}, decryptedCode: ${decryptedCode}, decrypedCharCodes: ${decryptedCharCodes}`);
        }

        return String.fromCharCode.apply(null, decryptedCharCodes);
    }
}
  
const cipher = new ShiftCipher(3);
const msg = 'xYzAbc';
const encodedMsg = cipher.encrypt(msg);
const decodedMsg = cipher.decrypt(encodedMsg);

console.log(`msg: ${msg}, encodedMsg: ${encodedMsg}, decodedMsg: ${decodedMsg}`);
  
  