import axios from 'axios'
import md5 from 'md5'

const baseURL = 'http://gateway.marvel.com/v1/public/'
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY as string
const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY as string
const ts = Number(new Date())
const hash = md5(ts + privateKey + publicKey)

const api = axios.create({
  baseURL,
  params: {
    ts,
    apikey: publicKey,
    hash,
    limit: 10,
  },
})

export default api
