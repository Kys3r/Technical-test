export const generateRandomUsernameAndEmail = () => {
	const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const emailProviders: Array<string> = ['gmail.com', 'yahoo.com', 'hotmail.com']

	const username = Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join('')
	const emailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)]
	const email = `${username}@${emailProvider}`

	return { username, email }
}
