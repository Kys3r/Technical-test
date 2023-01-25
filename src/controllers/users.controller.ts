import { checkUpdateUserData, sanitizeUpdateBody } from './../lib/users.lib'
import { UpdateUserBody } from '../typescript/interfaces/users.interface'
import { UserModel } from '../database/models'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await UserModel.find({}).select('_id username email projects permissions')

		res.status(200).send(users)
	} catch (err) {
		res.status(500).send({ error: 'Internal error' })
	}
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id, username, email }: UpdateUserBody = req.body
		const user: UpdateUserBody = sanitizeUpdateBody(id, username, email)

		if (!checkUpdateUserData(user)) {
			res.status(400).send({ error: 'Bad Request' })
			return
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			user.id,
			{
				$set: {
					username: user.username.trim().toLowerCase(),
					email: user.email.trim().toLowerCase()
				}
			},
			{ new: true }
		)

		res.status(200).send({ message: 'Update successfully' })
	} catch (err) {
		res.status(500).send({ error: 'Internal error' })
	}
}
