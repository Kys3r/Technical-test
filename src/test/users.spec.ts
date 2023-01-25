import request from 'supertest'
import { generateRandomUsernameAndEmail } from './lib'

const apiUrl = 'http://localhost:3000'

let userData: any, data, token: string

beforeEach(async () => {
	const credentials: any = generateRandomUsernameAndEmail()
	userData = {
		username: credentials.username,
		email: credentials.email,
		password: 'Password123',
		passwordConf: 'Password123'
	}
	data = await request(apiUrl).post('/auth/register').send(userData)
	token = data.body.token
})

describe('--- USERS ---', () => {
	describe('Get /users/', () => {
		it('should get all users', async (done) => {
			try {
				const user = await request(apiUrl).get('/users/').set('authorization', `Bearer ${token}`).send(userData).expect(200)
				const lastuser = user.body[user.body.length - 1]

				expect(lastuser).not.toBeNull()
				expect(lastuser._id).toBeTruthy()
				expect(lastuser.username).toBe(userData.username)
				expect(lastuser.email).toBe(userData.email)
				expect(lastuser.projects).toBeTruthy()
				expect(lastuser.permissions).toBe('standard')

				return done()
			} catch (error) {
				return done(error)
			}
		})
	})

	describe('Put /users/', () => {
		it('should get all users', async (done) => {
			try {
				const newUsernameEmail = generateRandomUsernameAndEmail()
				const user = await request(apiUrl).get('/users/').set('authorization', `Bearer ${token}`).send(userData).expect(200)
				const lastuser = user.body[user.body.length - 1]

				expect(lastuser).not.toBeNull()

				const toUpdate = {
					id: lastuser._id,
					...newUsernameEmail
				}

				const userUpdate = await request(apiUrl).put('/users/').set('authorization', `Bearer ${token}`).send(toUpdate).expect(200)

				expect(userUpdate.body).not.toBeNull()
				expect(userUpdate.body.message).toBe('Update successfully')

				return done()
			} catch (error) {
				return done(error)
			}
		})
	})
})
