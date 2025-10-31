import { NavLink } from "react-router";
export default function Footer() {
  return (
    <footer className=" border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-8">
          <div className="space-y-4">
            <div className="text-3xl font-bold tracking-tighter text-red-700">
              MARVEL
            </div>
            <p className="text-sm text-white/60  text-pretty leading-relaxed">
              The official home of Marvel Comics, Movies, TV Shows, Games, and
              more.
            </p>
            <div className="flex space-x-4">
              {SocialNetworks.map((value, index) => (
                <a
                  key={index}
                  className={`${value.hover} text-xl`}
                  href={value.href}
                  title={value.name}
                >
                  <i className={`${value.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1 text-lg">
            <span className="text-white">Explore</span>
            {explore.map((value, index) => (
              <NavLink key={index} to={value.href} className="text-white/60 hover:text-red-700 transition-colors">
                {value.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 MARVEL. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Your Privacy Choices
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
const SocialNetworks = [
  {
    name: "Facebook",
    icon: "bi bi-facebook",
    href: "",
    hover: "hover:text-blue-900",
  },
  {
    name: "Instagram",
    icon: "bi bi-instagram",
    href: "",
    hover: "hover:text-red-900",
  },
  {
    name: "WhatsApp",
    icon: "bi bi-whatsapp",
    href: "",
    hover: "hover:text-green-900",
  },
  {
    name: "X",
    icon: "bi bi-twitter-x",
    href: "",
    hover: "hover:text-white/10",
  },
];
const explore = [
  { label: "Characters", href: "/characters" },
  { label: "Comics", href: "/comics" },
  { label: "Eventos", href: "/eventos" },
  { label: "Saga", href: "/saga" },
];
