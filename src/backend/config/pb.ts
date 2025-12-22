import PocketBase from "pocketbase"

// Production: Cloudflare Tunnel (HTTPS)
// Development: Local PocketBase
const baseUrl = import.meta.env.MODE === 'production' 
  ? "https://cole-refurbished-shaw-solo.trycloudflare.com" 
  : "http://127.0.0.1:8090"

export const pb = new PocketBase(baseUrl)

console.log('PocketBase conectado a:', baseUrl)
console.log('Modo:', import.meta.env.MODE)

