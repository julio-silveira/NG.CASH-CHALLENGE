import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
import UserService from '../services/users.service'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'restify-errors'
import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { CustomRequest } from '../interfaces/user.interface'

const secret = process.env.JWT_SECRET || 'JWT'

export default class UserControler {
  constructor(private userService = new UserService()) {}

  public userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password)
      throw new BadRequestError(
        'O nome de usuário/senha não podem estar em vazios'
      )
    const user = await this.userService.getUser(username)

    if (!user) throw new NotFoundError('Usuário não encontrado')
    const comparePassword = await compare(password, user.passwordHash)

    if (!comparePassword) {
      throw new UnauthorizedError('Senha Incorreta')
    }

    const token = jwt.sign(
      { data: { username: user.username, accountId: user.accountId } },
      secret,
      {
        expiresIn: '1d',
        algorithm: 'HS256'
      }
    )

    res.status(statusCodes.OK).json({ token })
  }

  public createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (password === '')
      throw new BadRequestError('O campo de senha não pode estar vazio')
    const passwordHash = await hash(password, 8)
    await this.userService.createUser({ username, passwordHash })
    res
      .status(statusCodes.CREATED)
      .json({ message: 'Usuário cadastrado com sucesso' })
  }

  public getUser = async (req: Request, res: Response) => {
    const { accountId } = (req as CustomRequest).user
    const account = await this.userService.getUserById(accountId)
    res.status(statusCodes.OK).json(account)
  }
}
