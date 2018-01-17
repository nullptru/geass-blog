import * as crypto from 'crypto-js';
import jsencrypt from 'jsencrypt';
import { publicKey } from 'config';

const AuthTokenKey = '0123456789abcdef'; // AES密钥
const AuthTokenIv = '0123456789abcdef'; // AES向量

const crypter = new jsencrypt.JSEncrypt();
crypter.setPublicKey(publicKey);

/* AES加密 */
export function encrypt(data) {
  const dataStr = JSON.stringify(data || '');
  const encrypted = crypto.AES.encrypt(dataStr, crypto.enc.Utf8.parse(AuthTokenKey), {
    iv: crypto.enc.Utf8.parse(AuthTokenIv),
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  });
  return encrypted.toString();
}

/* AES解密 */
export function decrypt(data) {
  if (data === undefined) {
    return undefined;
  }
  let data2 = data.replace(/\n/gm, '');
  data2 = data2.replace(/\s/gm, '+');
  const decrypted = crypto.AES.decrypt(data2, crypto.enc.Utf8.parse(AuthTokenKey), {
    iv: crypto.enc.Utf8.parse(AuthTokenIv),
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7,
  });
  return JSON.parse(decrypted.toString(crypto.enc.Utf8));
}

export function RSAEncrypt(data) {
  return crypter.encrypt(data || '');
}
