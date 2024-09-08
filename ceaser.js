function caesarCipherEncrypt(plaintext, shift) {
  let encryptedText = "";
  for (let i = 0; i < plaintext.length; i++) {
    let char = plaintext[i];
    if (/[a-zA-Z]/.test(char)) {
      let base = char === char.toUpperCase() ? 65 : 97; // ASCII 'A' or 'a'
      console.log(base);
      let encryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - base + shift) % 26) + base
      );
      console.log(encryptedChar);
      encryptedText += encryptedChar;
    } else {
      encryptedText += char; // Non-alphabet characters remain unchanged
    }
  }
  return encryptedText;
}

function caesarCipherDecrypt(ciphertext, shift) {
  let decryptedText = "";
  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i];
    if (/[a-zA-Z]/.test(char)) {
      let base = char === char.toUpperCase() ? 65 : 97; // ASCII 'A' or 'a'
      console.log(base);
      let decryptedChar = String.fromCharCode(
        ((char.charCodeAt(0) - base - shift + 26) % 26) + base
      );
      console.log(decryptedChar);
      decryptedText += decryptedChar;
    } else {
      decryptedText += char; // Non-alphabet characters remain unchanged
    }
  }
  return decryptedText;
}

// Example usage
let plaintext = "Bipin";
let shift = 3;
let cipherText = caesarCipherEncrypt(plaintext, shift);
console.log("Encrypted:", cipherText);

let decryptedText = caesarCipherDecrypt(cipherText, shift);
console.log("Decrypted:", decryptedText);
