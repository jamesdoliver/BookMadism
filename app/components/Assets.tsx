import SectionLabel from "./SectionLabel";

const assets = [
  {
    name: "Press Photos",
    description: "High-resolution press photos (.zip)",
    // TODO: Replace with CDN URL for press photos zip
    href: "#",
  },
  {
    name: "EPK",
    description: "Electronic press kit (.pdf)",
    href: "/downloads/Madism_EPK_V5.pdf",
  },
  {
    name: "Logo Files",
    description: "Logo pack with SVG, PNG formats (.zip)",
    // TODO: Replace with CDN URL for logo files zip
    href: "#",
  },
];

export default function Assets() {
  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24 max-w-6xl mx-auto">
      <SectionLabel>Downloads</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="border border-[#222222] p-6 flex flex-col"
          >
            <h3 className="text-white font-bold text-lg mb-1">{asset.name}</h3>
            <p className="text-[#999999] text-sm mb-6 flex-1">
              {asset.description}
            </p>
            <a
              href={asset.href}
              download={asset.href !== "#"}
              className="border border-white text-white text-center px-6 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
