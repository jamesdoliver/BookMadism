import SectionLabel from "./SectionLabel";

export default function Contact() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto text-center">
      <SectionLabel>Bookings</SectionLabel>
      <p className="text-[#999999] text-base md:text-lg mb-8">
        For bookings, appearances, and collaborations
      </p>
      {/* TODO: Confirm booking email */}
      <a
        href="mailto:bookings@madism.com"
        className="inline-block bg-white text-black px-10 py-4 text-sm uppercase tracking-wider font-bold hover:bg-[#999999] transition-colors"
      >
        Contact Email
      </a>
    </section>
  );
}
