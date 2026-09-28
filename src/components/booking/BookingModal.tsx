import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStore } from "@/state/store";
import { BookingFlow } from "./BookingFlow";

/** One flow, two frames: a vaul bottom sheet under 768 px, a Radix dialog above. */
export function BookingModal() {
  const { bookingOpen, setBookingOpen, bookingService } = useStore();
  const desktop = useMediaQuery("(min-width: 768px)");
  const close = () => setBookingOpen(false);
  // Remount per opening so every visit starts clean.
  const key = `${bookingOpen}-${bookingService}`;

  if (desktop) {
    return (
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <BookingFlow key={key} variant="dialog" initialService={bookingService} onClose={close} Title={DialogTitle} Description={DialogDescription} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={bookingOpen} onOpenChange={setBookingOpen} repositionInputs={false}>
      <DrawerContent className="h-[94dvh]">
        <BookingFlow key={key} variant="sheet" initialService={bookingService} onClose={close} Title={DrawerTitle} Description={DrawerDescription} />
      </DrawerContent>
    </Drawer>
  );
}
