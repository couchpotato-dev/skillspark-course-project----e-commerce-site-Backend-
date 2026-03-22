import express			from 'express'
import cors			from 'cors'
import helmet			from 'helmet'
import morgan			from 'morgan'
import cookieParser		from 'cookie-parser'
import mongoSanitize		from 'express-mongo-sanitize'
import rateLimit		from 'express-rate-limit'
import http			from 'http'
import { WebSocketServer }	from 'ws' 			// for future use if needed

const app	= express()

app
.use(helmet())
.use(mongoSanitize())
.use(rateLimit({
	windowMs	: 15 * 60 * 1000,
	max		: 100,
}))
.use(cors({
	origin		: process.env.CLIENT_URL,
	credentials	: true
}))
.use(express.json({ limit: '10kb' }))
.use(express.urlencoded({ extended: true }))
.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

const server	= http.createServer(app)
const ws	= new WebSocketServer({ server })

export default server
