import { createClient } from 'redis'

const BASEURI = 'redis://localhost:6379'

const client = createClient({ url: BASEURI })
client.connect()

export default client
