import SectionLabel from "./SectionLabel";

const stats = [
  { value: "1B+", label: "Streams" },
  { value: "Multi Platinum", label: "Certified Producer" },
  { value: "15,000+", label: "Festival Crowds" },
  { value: "Worldwide", label: "Bookings" },
];

export default function Highlights() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-6xl mx-auto">
      <SectionLabel>Highlights</SectionLabel>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {stat.value}
            </p>
            <p className="text-sm text-[#999999] uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
