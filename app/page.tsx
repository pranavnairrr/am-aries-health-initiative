import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import HowItWorks from "@/components/HowItWorks";
import RegistrationForm from "@/components/RegistrationForm";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <main>
        <Hero />
        <ValueProp />
        <HowItWorks />
        <RegistrationForm />
        <EventDetails />
        <Footer />
        <StickyMobileCTA />
      </main>
      <WhatsAppButton />
    </>
  );
}
