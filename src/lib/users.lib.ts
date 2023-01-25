import { isValideUsername } from './global.lib'
import validator from 'validator'
import { UpdateUserBody } from './../typescript/interfaces/users.interface'

export const sanitizeUpdateBody = (id: string, username: string, email: string): UpdateUserBody => {
	return {
		id: id.trim(),
		username: username.trim().toLowerCase(),
		email: email.trim()
	}
}

export const checkUpdateUserData = ({ username, email }: UpdateUserBody): boolean => {
	if (!isValideUsername(username)) return false
	else if (!validator.isEmail(email)) return false
	else return true
}
