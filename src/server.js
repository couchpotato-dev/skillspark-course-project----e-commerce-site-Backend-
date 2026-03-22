import			'dotenv/config';
import connectDB	from './config/db.js'
import app		from './app.js'
const PORT	= process.env.PORT

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`[+] Server Listening on port:::${PORT}`)
		console.log(`[*] Url: http://localhost:${PORT}`)
		console.log(`[+] WebSocketServer Listening on port:::${PORT}`)
		console.log(`[*] Url: ws://localhost:${PORT}`)
	})
})
