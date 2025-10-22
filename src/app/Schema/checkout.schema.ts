import * as z from 'zod'

export const checkoutSchema = z.object({
    details : z.string().nonempty('details can not be empty'),
    phone : z.string().nonempty("phone can't be empty").regex(/^01[0125][0-9]{8}$/,"not valid phone number"), 
    city : z.string().nonempty('details can not be empty'),
}
)

export type checkoutSchemaType = z.infer<typeof checkoutSchema>