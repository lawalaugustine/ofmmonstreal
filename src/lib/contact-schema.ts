import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Please enter a subject.").max(200),
  message: z.string().trim().min(10, "Please enter a longer message.").max(5000),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
