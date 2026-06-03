export default function Footer() {
  const socials = ["Twitter", "Discord", "Github", "LinkedIn"];

  return (
    <footer
      className="border-t px-6 py-10"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "#0a0a0a" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 sm:flex-row">
        <span className="text-sm font-semibold text-white">Hack on Hills 8.0</span>
        <div className="flex gap-6 text-xs text-white/40">
          {socials.map((link) => (
            <a key={link} href="#" className="hover:text-white transition-colors duration-200">
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1400px] text-xs text-white/20">
        © 2026 Hack on Hills 8.0 · The Age of Autonomous Agents
      </div>
    </footer>
  );
}
