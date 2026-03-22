import mongoose		from 'mongoose'
import bcrypt		from 'bcrypt'

const userSchema	= new mongoose.Schema({
	firstName	: { type: String, required: true, trim: true },
	lastName	: { type: String, required: true, trim: true },
	username	: { type: String, required: true, trim: true, unique: true },
	email		: { type: String, required: true, trim: true, unique: true, lowercase: true },
	password	: { type: String, required: true, minlength: 8 },
	role		: { type: String, enum: ['user', 'admin'], default: 'user', lowercase: true },
	category	: { type: String, enum: ['buyer', 'seller', 'none'], default: 'buyer', lowercase: true },
}, {
	timestamps	: true,
	toJSON		: { virtuals: true },
})

userSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('initials').get(function () {
	return this.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
})

userSchema.pre('save', async function () {
	if (this.isModified(this.password)) {
		this.password	= await bcrypt.hash(this.password, process.env.SALT_ROUNDS)
	}
})

const User = mongoose.model('User', userSchema)

export default User
