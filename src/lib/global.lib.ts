import validator from 'validator'

export const isValideUsername = (username: string) => {
	if (!validator.isLength(username, { min: 3 })) return false
	if (username.includes(' ')) return false
	return true
}

export const isValidePassword = (password: string): boolean => {
	const hasUpperCase = /[A-Z]/.test(password)
	const hasLowerCase = /[a-z]/.test(password)
	const hasNumbers = /\d/.test(password)
	const hasMinimumLength = password.length >= 8
	return hasUpperCase && hasLowerCase && hasNumbers && hasMinimumLength
}
