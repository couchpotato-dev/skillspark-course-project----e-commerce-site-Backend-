import { verifyToken }		from '../utils/jwt.js'
import User			from '../model/User.js'

export const protect	= async (req, res, next) => {
	try {
		let token

		if (req.headers.authorization?.startsWith('Bearer')) {
			token	= req.headers.authorization.split(' ')[1]
		} else if (req.cookies?.token) {
			token	= req.cookies.token
		}

		if (!token) {
			res.status(401)
			throw new Error('Not authorized, no token')
		}

		const decoded	= verifyToken(token)
		req.user	= await User.findById(decoded._id).select('-password')

		if (!req.user) {
			res.status(401)
			throw new Error('Not authorized, user not found')
		}

		next()
	} catch(err) {
		next(err)
	}
}

export const adminOnly	= (req, res, next) => {
	if (req.user.role === 'admin') {
		next()
	} else {
		res.status(401)
		next(new Error('Not authorized, admins only'))
	}
}
