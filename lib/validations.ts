import { z } from "zod";

// Dependency-free E.164 check (e.g. +14155552671). This file is imported by
// the /api/register route, and pulling react-phone-number-input's
// isValidPhoneNumber in here drags libphonenumber-js into the server bundle,
// which Turbopack currently fails to bundle ("Super expression must either
// be null or a function"). The international phone picker on the client
// already guarantees well-formed E.164 output and does its own stricter,
// per-country validation there — see RegistrationForm.tsx.
const E164_PHONE = /^\+[1-9]\d{6,14}$/;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(E164_PHONE, "Enter a valid phone number"),
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
