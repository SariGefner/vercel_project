import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().min(9, { message: "Id is too short" })
        .max(10, { message: "id is too long" })
        .regex(/^[0-9]/, { message: "id can only contain numbers" }),
    firstName: z.string().min(2, { message: "Username must be at least 2 characters long" })
        .max(30, { message: "Username cannot be longer then 30 characters" })
        .regex(/^[a-zA-Z_]+$/, {
            message: "Username can only contain letters and underxcores"
        }),
    lestName: z.string().min(2, { message: "UserLestname must be at least 2 characters long" })
        .max(30, { message: "UserLestname cannot be longer then 30 characters" })
        .regex(/^[a-zA-Z_]+$/, {
            message: "UserLestname can only contain letters and underxcores"
        }),
    birthDate: z.date({
        required_error: "Birth date is required",
        invalid_type_error: "Please enter a valid date"
    })
        .min(new Date(1900, 0, 1), { message: "Date must be after 1900 at least" })
        .max(new Date(), { message: "Date cannot be in the future" }),
    email: z.string().email({ message: "Please enter a valid email address" })
        .min(5, { message: "Email is too short" })
        .max(50, { message: "Email is too long" }),
})