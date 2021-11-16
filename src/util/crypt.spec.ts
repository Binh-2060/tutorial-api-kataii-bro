import { expect } from "chai";
import { encrypt, decrypt } from "./crypt";
import { describe, it } from "mocha";

describe("Encryption", () => {
  it("return string", () => {
    let text = "hello";
    let encryptedText = encrypt(text);
    expect(typeof encryptedText).to.equal("string");
  });

  it("encrypt hello", () => {
    let text = "hello";
    let encryptedText = encrypt(text);
    // console.log(encryptedText);
    expect(typeof encryptedText).to.equal("string");
  });

  it("give different encrypted texts", () => {
    let text = "hello";
    let encryptedText1 = encrypt(text);
    // console.log(encryptedText1);
    let encryptedText2 = encrypt(text);
    // console.log(encryptedText2);
    expect(encryptedText1).to.not.equal(encryptedText2);
  });

  it("decrypt hello", () => {
    let encryptedText = encrypt('hello');
    let text = decrypt(encryptedText);
    console.log(`decrypting ${encryptedText}`)
    console.log(`decrypted text: ${encryptedText}`)
    expect(text).to.equal("hello");
  });

  it("encrypt 12345678", () => {
    let text = '12345678'
    let encrypted = encrypt(text)
    console.log(encrypted)
    expect(typeof encrypted).to.equal('string')
  })
});
