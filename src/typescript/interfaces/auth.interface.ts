export interface IRegisterBody extends ILoginBody {
	email: string
	passwordConf: string
}

export interface ILoginBody {
	username: string
	password: string
}
