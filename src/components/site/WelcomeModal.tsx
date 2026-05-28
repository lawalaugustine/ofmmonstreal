import { useEffect, useState } from "react";
import { CalendarClock, Flame, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "ofm-montreal-welcome-seen";

const ORDER_OF_SERVICE = [
  {
    title: "Sunday Intercessors Service",
    time: "9:30 AM – 10:00 AM",
    icon: Sparkles,
  },
  {
    title: "Sunday Service",
    time: "10AM - 12PM",
    icon: CalendarClock,
  },
  {
    title: "Wednesday Word Encounter",
    time: "7PM - 8PM",
    icon: CalendarClock,
  },
  {
    title: "Friday Solution Service",
    time: "7PM - 8PM",
    icon: CalendarClock,
  },
  {
    title: "Fire Night",
    time: "10:00 PM",
    note: "Every second Friday of the month",
    icon: Flame,
  },
  {
    title: "Anointing Service / Communion Service",
    time: "Monthly",
    note: "Every 1st Sunday of the month with Papa Live",
    icon: Flame,
  },
] as const;

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private browsing */
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
        else setOpen(next);
      }}
    >
      <DialogContent
        className="flex max-h-[min(90vh,40rem)] max-w-[min(100vw-2rem,32rem)] flex-col gap-0 overflow-hidden border-gold/40 p-0 shadow-2xl sm:max-w-xl [&>button.absolute]:hidden"
        aria-describedby="welcome-modal-description"
      >
        <div className="relative shrink-0 overflow-hidden bg-gradient-royal px-6 pb-8 pt-10 text-center text-primary-foreground">
          <DialogClose
            type="button"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gold/70 bg-charcoal/30 text-gold shadow-md transition-colors hover:border-gold hover:bg-charcoal/50 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Close welcome message"
          >
            <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </DialogClose>
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-gold/15 blur-2xl"
            aria-hidden
          />
          <img
            src="/logo.png"
            alt=""
            className="relative mx-auto h-16 w-16 rounded-full border-2 border-gold/60 bg-primary-foreground/10 object-contain p-1 shadow-gold"
          />
          <DialogTitle className="font-display relative mt-4 text-balance text-lg font-semibold uppercase tracking-wider text-primary-foreground sm:text-xl">
            Omega Fire Ministries Montreal
          </DialogTitle>
          <DialogDescription
            id="welcome-modal-description"
            className="relative mt-2 text-sm leading-relaxed text-primary-foreground/90"
          >
            This is OMEGA FIRE MINISTRIES MONTREAL. Our order of service goes thus:
          </DialogDescription>
        </div>

        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-5 sm:px-6">
          {ORDER_OF_SERVICE.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex gap-3 rounded-lg border border-border/80 bg-muted/40 px-3 py-3 transition-colors hover:border-gold/30 hover:bg-muted/70"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-gold-foreground shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0 text-left">
                  <p className="text-sm font-semibold leading-snug text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-sm font-medium text-primary">{item.time}</p>
                  {"note" in item && item.note ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <DialogFooter className="relative z-10 shrink-0 border-t border-border/60 bg-background px-5 py-4 sm:flex sm:justify-center sm:px-6">
          <Button
            type="button"
            className="w-full bg-gradient-gold font-semibold text-gold-foreground shadow-gold hover:opacity-90 sm:min-w-[14rem]"
            onClick={dismiss}
          >
            Got it, thanks!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
