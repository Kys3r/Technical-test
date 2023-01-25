import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authenticate =
	(permissions: string[] = []) =>
	(req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization

		if (!authHeader) return res.status(401).json({ message: 'Unauthorized' })

		const token: string = authHeader.split(' ')[1]
		try {
			const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY)

			if (permissions.includes(user.permissions)) {
				req.body.user = user
				return next()
			}

			return res.status(401).json({ message: 'Unauthorized' })
		} catch (error) {
			return res.status(403).json({ message: 'Forbidden' })
		}
	}
