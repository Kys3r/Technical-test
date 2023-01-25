import { mongoose } from '../config/mongoose.config'
import { IProjectManagement, IUser, IResource } from './../../typescript/interfaces/schemas.interface'
import { UserSchema, ProjectManagementSchema, ResourceSchema } from './../schemas/'

const UserModel = mongoose.model<IUser>('User', UserSchema)
const ProjectModel = mongoose.model<IProjectManagement>('Project', ProjectManagementSchema)
const ResourceModel = mongoose.model<IResource>('Resource', ResourceSchema)

export { UserModel, ProjectModel, ResourceModel }
