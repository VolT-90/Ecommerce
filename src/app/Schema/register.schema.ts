import * as z from 'zod'

export const registerSchema = z.object({
    name : z.string().min(3,'min lenght 5').max(20,'max lenght 15').nonempty("'Field can't be empty"),
    email : z.email('you shold enter valid email'),
    password : z.string().min(5,'min lenght 5').max(15,'max lenght 15').nonempty("'Field can't be empty"),
    rePassword : z.string().min(5,'min lenght 5').max(15,'max lenght 15').nonempty("'Field can't be empty"),
    phone : z.string().regex(/^01[0215][0-9]{8}$/) 
}
).refine((object) => object.password === object.rePassword ,
{
    path: ['rePassword'],
    error : "password does'nt match the repassword !!"
})

export type registerSchemaType = z.infer<typeof registerSchema>