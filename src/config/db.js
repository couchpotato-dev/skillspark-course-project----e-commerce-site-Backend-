import mongoose		from 'mongoose'

export default async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('[+] Connected To MongoDB Successfully')
	} catch(e) {
		console.log('[!] Error Connecting To MongoDB:', e)
		process.exit(1)
	}
}
