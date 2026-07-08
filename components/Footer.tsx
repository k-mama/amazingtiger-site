import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
  basePath: string;
}

export default function Footer({ dict, basePath }: FooterProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <small>&copy; {year} {dict.footer.rights}</small>
        <ul className="footer-links">
          {dict.footer.links.map((link) => (
            <li key={link.href}>
              <Link href={`${navBase}${link.href}`}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
