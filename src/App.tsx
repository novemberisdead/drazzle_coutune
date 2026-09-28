import { Toaster } from "@/components/ui/sonner";
import { AnnouncementBar, FloatingWhatsApp, Header } from "@/components/sections/Chrome";
import { Hero, TrustStrip } from "@/components/sections/Hero";
import { Categories, NewArrivals } from "@/components/sections/Collections";
import { About, BookSection, Footer, HowItWorks, InstagramGallery, Newsletter, Testimonials } from "@/components/sections/Studio";
import { BookingModal } from "@/components/booking/BookingModal";
import { OrderSlip } from "@/components/OrderSlip";
import { useReveal } from "@/hooks/useReveal";
import { StoreProvider } from "@/state/store";

function Page() {
  useReveal();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface focus:px-4 focus:py-3 focus:text-ivory">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Categories />
        <NewArrivals />
        <BookSection />
        <HowItWorks />
        <InstagramGallery />
        <Testimonials />
        <About />
        <Newsletter />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OrderSlip />
      <BookingModal />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Page />
    </StoreProvider>
  );
}
