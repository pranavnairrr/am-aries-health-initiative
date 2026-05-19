import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(9, "Enter a valid UAE mobile number")
    .max(15, "Phone number is too long")
    .regex(
      /^(\+971|00971|0)?5\d{8}$/,
      "Enter a valid UAE mobile number (e.g. 501234567)"
    ),
  emiratesId: z
    .string()
    .regex(
      /^(784-\d{4}-\d{7}-\d{1})?$/,
      "Format: 784-XXXX-XXXXXXX-X"
    )
    .optional()
    .or(z.literal("")),
  preferredLanguage: z.enum(["en", "ar"]).default("en"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
