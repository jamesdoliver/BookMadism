export default function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm uppercase tracking-[0.2em] text-[#999999] pb-3 border-b border-[#222222]">
        {children}
      </h2>
    </div>
  );
}
