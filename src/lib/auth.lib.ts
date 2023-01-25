import { PayloadJwt } from '../typescript/interfaces/jwt.interface'
import { ILoginBody, IRegisterBody } from '../typescript/interfaces/auth.interface'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { Types } from '../database/config/mongoose.config'
import { isValidePassword, isValideUsername } from './global.lib'

export const checkRegisterData = ({ username, email, password, passwordConf }: IRegisterBody): boolean => {
	if (!isValideUsername(username)) return false
	else if (!validator.equals(password, passwordConf)) return false
	else if (!validator.isEmail(email)) return false
	else if (!isValidePassword(password)) return false
	else return true
}

export const checkLoginData = ({ username, password }: ILoginBody): boolean => {
	if (!isValideUsername(username)) return false
	else if (!isValidePassword(password)) return false
	else return true
}

export const sanitizeRegisterBody = (username: string, email: string, password: string, passwordConf: string): IRegisterBody => {
	return {
		username: username.trim().toLowerCase(),
		email: email.trim().toLowerCase(),
		password: password.trim(),
		passwordConf: passwordConf.trim()
	}
}

export const sanitizeLoginBody = (username: string, password: string): ILoginBody => {
	return {
		username: username.trim().toLowerCase(),
		password: password.trim()
	}
}

export const generateJwtToken = (username: string, email: string, permissions: string, id: Types.ObjectId): string => {
	const payload: PayloadJwt = {
		username: username,
		email: email,
		permissions: permissions,
		id: id
	}
	const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '48h' })
	return token
}
