export const notFound 		= (req, res, next) => {
	const error		= new Error(`Routes not found: ${req.orginalUrl}`)
	res.status(400)
	next(error)
}

export const errorHandler	= (err, req, res, next) => {
	const statusCode	= res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode).json({
		success		: !1,
		message		: err.message,
		stack		: process.env.NODE_ENV === 'development' ? err.stack : undefined
	})
}


