import request from 'supertest'
import { generateRandomUsernameAndEmail } from './lib'

const apiUrl = 'http://localhost:3000'

describe('--- AUTH ---', () => {
	describe('POST /auth/register', () => {
		const credentials: any = generateRandomUsernameAndEmail()

		const userData = {
			username: credentials.username,
			email: credentials.email,
			password: 'Password123',
			passwordConf: 'Password123'
		}
		it('should register a user', async (done) => {
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(201)
				expect(user.body).not.toBeNull()
				expect(user.body.token).toBeTruthy()
				expect(user.body.message).toBe('Registered successfully')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user with an existing username', async (done) => {
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(409)
				expect(user.body.error).toBe('username already exist')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user with an existing email', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.username = 'newUsername'
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(409)
				expect(user.body.error).toBe('email already exist')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user with an incorrect username format', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.username = 'Username with whitespace'
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(400)
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user with an incorrect email format', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.email = 'emailwithoutarobas.com'
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(400)
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user with an incorrect password format', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.password = 'badpasswordformat'
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(400)
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not register a user if the password and password confirmation do not match.', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.password = 'badpasswordformat'
			try {
				const user = await request(apiUrl).post('/auth/register').send(userData).expect(400)
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})
	})

	describe('POST /auth/login', () => {
		const credentials = generateRandomUsernameAndEmail()

		const userData = {
			username: credentials.username,
			email: credentials.email,
			password: 'Password123',
			passwordConf: 'Password123'
		}

		it('should log in a user with username and password', async (done) => {
			try {
				await request(apiUrl).post('/auth/register').send(userData).expect(201)
				const user = await request(apiUrl).post('/auth/login').send(userData).expect(200)
				expect(user.body).not.toBeNull()
				expect(user.body.token).toBeTruthy()
				expect(user.body.id).toBeTruthy()
				expect(user.body.message).toBe('Login successfully')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not log in a non existing user', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.username = 'badusername'
			try {
				const user = await request(apiUrl).post('/auth/login').send(userData).expect(401)
				expect(user.body).not.toBeNull()
				expect(user.body.error).toBe('Unauthorized')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not log in a user with a incorrect password', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.password = 'Badpassword123'
			try {
				const user = await request(apiUrl).post('/auth/login').send(userData).expect(401)
				expect(user.body).not.toBeNull()
				expect(user.body.error).toBe('Unauthorized')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not log in a user with a incorrect username format', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.username = 'Username with whitespace'
			try {
				const user = await request(apiUrl).post('/auth/login').send(userData).expect(400)
				expect(user.body).not.toBeNull()
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})

		it('should not log in a user with a incorrect password format', async (done) => {
			const userWithNewUsername = userData
			userWithNewUsername.password = 'badpasswordformat'
			try {
				const user = await request(apiUrl).post('/auth/login').send(userData).expect(400)
				expect(user.body).not.toBeNull()
				expect(user.body.error).toBe('Bad Request')
				return done()
			} catch (error) {
				return done(error)
			}
		})
	})
})
