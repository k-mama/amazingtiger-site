import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
  /** "/" for the root English mirror, "/en" or "/ko" for locale-prefixed routes. */
  basePath: string;
}

export default function Header({ locale, dict, basePath }: HeaderProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const anchor = (id: string) => `${basePath === "/" ? "" : basePath}#${id}`;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href={basePath} className="wordmark">
          Amazing Tiger <span>Publishing</span>
        </Link>
        <div className="site-nav">
          <ul className="site-nav__links">
            <li><Link href={basePath}>{dict.nav.home}</Link></li>
            <li><Link href={anchor("house")}>{dict.nav.house}</Link></li>
            <li><Link href={`${navBase}/atelier`}>{dict.nav.atelier}</Link></li>
            <li><Link href={`${navBase}/shop`}>{dict.nav.shop}</Link></li>
            <li><Link href={anchor("membership")}>{dict.nav.membership}</Link></li>
            <li><Link href={`${navBase}/faq`}>{dict.nav.faq}</Link></li>
            <li><Link href={`${navBase}/consultation`}>{dict.nav.consultation}</Link></li>
          </ul>
          <Link href={`${navBase}/login`} className="site-nav__login">
            {dict.nav.login}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
