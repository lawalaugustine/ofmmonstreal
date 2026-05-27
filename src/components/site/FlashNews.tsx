import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { CHURCH_EMAIL, CHURCH_PHONE_DISPLAY } from "@/lib/site";

const ANNOUNCEMENTS = [
  "Please for those willing or interested in joining various departments, kindly meet with our father in the house (Pastor David).",
  "Please visit our library at the bookstand, buy and enrich yourself mightily, also remember to bless someone with it.",
  "Omega Women prayer fellowship holds every last Saturday of the month, from 9:00am - 10:00am.",
  "Men of Zion meeting is held every last Saturday of the month from 8:30pm - 9:30pm.",
  "Our monthly life in the Spirit fasting program holds every 1st - 3rd of the month, from 8:00am - 4:00pm.",
  "OFM Montreal chapter Canada prayer line holds every Monday of the week, from 7:00pm - 8:00pm.",
  `For counseling and personal prayers, kindly call ${CHURCH_PHONE_DISPLAY} or send your prayer request to the church email (${CHURCH_EMAIL}).`,
  `To pay your offerings, vows or tithes online, please use the same email ${CHURCH_EMAIL}.`,
];

const ROTATE_MS = 8000;

export default function FlashNews() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 400);
    }, ROTATE_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-40 mt-20 border-b border-gold/30 bg-gradient-royal text-primary-foreground"
    >
      <div className="container mx-auto flex items-start gap-3 px-4 py-3 lg:px-8 lg:items-center">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold-foreground">
          <Megaphone className="h-3.5 w-3.5" aria-hidden />
          Annoucement
        </span>
        <p
          className={`text-sm leading-relaxed text-primary-foreground/95 transition-opacity duration-300 lg:text-base ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {ANNOUNCEMENTS[index]}
        </p>
      </div>
    </div>
  );
}
