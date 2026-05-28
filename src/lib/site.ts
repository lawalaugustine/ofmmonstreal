/** Display format used across the site */
export const CHURCH_PHONE_DISPLAY = "(514-571-8780)";

/** `tel:` URI (E.164) */
export const CHURCH_PHONE_TEL = "+15145718780";

export const CHURCH_EMAIL = "omegafireministries06@gmail.com";
export const CHURCH_EMAIL_OFFICE = "info@ofmmontreal.com";
export const CONTACT_FORM_RECIPIENTS = [CHURCH_EMAIL, CHURCH_EMAIL_OFFICE] as const;

/** Core weekly service times shown in footer, contact, and related sections */
export const SERVICE_TIMES = [
  { title: "Sunday Service", time: "10AM - 12PM" },
  { title: "Wednesday Word Encounter", time: "7PM - 8PM" },
  { title: "Friday Solution Service", time: "7PM - 8PM" },
] as const;
