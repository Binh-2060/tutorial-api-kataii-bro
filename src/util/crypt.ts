import {randomBytes, createCipheriv, createDecipheriv} from "crypto"
import environment from '../environment';

const ENCRYPTION_KEY = environment.encryption_key
const IV_LENGTH = 16

export const encrypt = (text: string) => {
    let iv = randomBytes(IV_LENGTH)
    let cipher = createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

export const decrypt = (text: string) => {
    let textParts = text.split(':')
    let iv = Buffer.from(textParts.shift(), 'hex')
    let encryptedText = Buffer.from(textParts.join(':'), 'hex')
    let decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])
    return decrypted.toString()
}