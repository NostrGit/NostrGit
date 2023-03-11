import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const enum LoginType { default, hex, npub, nip05, nip07 }

export async function fetchPublicKey(username: string) : Promise<string> {
  const [user, domain] : string[] = username.split("@");

  const url = `https://${domain || ''}/.well-known/nostr.json?name=${user || ''}`;
  const response : Response = await fetch(url) || '';
  const json : { names: { [key:string]: string}} = await response.json();
  //console.log(json);
  const publicKey : string= json.names[user || ''] || '';
  return publicKey;
};

const regexMap: { [key: string]: LoginType } = {

  [/^npub[0-3][qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}$/i.source]: LoginType.npub,
  [/^[a-fA-F0-9]{64}$/i.source]: LoginType.hex,
  [/^[a-z0-9\-\_\.]+@[a-zA-Z_]+?(\.[a-zA-Z]{1,16})+?$/i.source]: LoginType.nip05

}

export function checkType(str: string): LoginType {
  let type = LoginType.default;
  Object.keys(regexMap).forEach((regex) => {
    console.log(regex)
    if (new RegExp(regex).test(str)) { type = regexMap[regex] || LoginType.default; }
  });
  return type;
}