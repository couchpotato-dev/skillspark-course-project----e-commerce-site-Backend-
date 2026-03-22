import jwt		from 'jsonwebtoken'

const SECRET		= process.env.JWT_SECRET
const EXPIRES		= '7d'

export const generateToken	= (userId) => {
	return jwt.sign(
		{ id: userId },
		SECRET,
		{ expiresIn: EXPIRES }
	)
}

export const verifyToken	= (token) => {
	return jwt.verify(token, SECRET)
}
