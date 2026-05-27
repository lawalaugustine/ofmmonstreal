import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { contactFormSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/server/contact-mail";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = contactFormSchema.safeParse(body);

          if (!parsed.success) {
            const message = parsed.error.errors[0]?.message ?? "Invalid form data.";
            return Response.json({ ok: false, error: message }, { status: 400 });
          }

          if (parsed.data.website) {
            return Response.json({ ok: true });
          }

          const { website: _honeypot, ...payload } = parsed.data;
          await sendContactEmail({
            ...payload,
            phone: payload.phone || undefined,
          });

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Contact form error:", error);
          const message =
            error instanceof Error && error.message.startsWith("Missing required")
              ? "Email is not configured on the server. Please try again later or call us directly."
              : "We could not send your message. Please try again or call us directly.";
          return Response.json({ ok: false, error: message }, { status: 500 });
        }
      },
    },
  },
});
