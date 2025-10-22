import * as z from 'zod'

export const loginSchema = z.object({
    email : z.email('you shold enter valid email'),
    password : z.string().min(5,'min lenght 5').max(15,'max lenght 15').nonempty("'Field can't be empty"),
}
)

export type loginSchemaType = z.infer<typeof loginSchema>