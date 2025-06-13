import { z } from 'zod';


const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Please fill this field" }),

  password: z
    .string()
    .min(6, { message: "Please enter a minimum of six characters for the password" })
    .nonempty({ message: "Please fill this field" }),
});


const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email" })
      .nonempty({ message: "Please fill this field" }),

    password: z
      .string()
      .min(6, { message: "Please enter a minimum of six characters for the password" })
      .nonempty({ message: "Please fill this field" }),

    cnfPassword: z
      .string()
      .nonempty({ message: "Please fill this field" }),
  })
  .refine((data) => data.password === data.cnfPassword, {
    message: "Password does not match",
    path: ["cnfPassword"],
  });

export { loginSchema, registerSchema };
