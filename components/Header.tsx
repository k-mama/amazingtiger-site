import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import AuthNavLink from "./AuthNavLink";
import CartWidget from "./CartWidget";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import WordmarkLogo from "./WordmarkLogo";

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
          <WordmarkLogo />
        </Link>
        <div className="site-nav">
          <ul className="site-nav__links">
            <li><Link href={basePath}>{dict.nav.home}</Link></li>
            <li><Link href={anchor("house")}>{dict.nav.house}</Link></li>
            <li><Link href={`${navBase}/atelier`}>{dict.nav.atelier}</Link></li>
            <li><Link href={`${navBase}/shop`}>{dict.nav.shop}</Link></li>
            <li><Link href={anchor("membership")}>{dict.nav.membership}</Link></li>
            <li><Link href={`${navBase}/consultation`}>{dict.nav.consultation}</Link></li>
          </ul>
          <AuthNavLink
            navBase={navBase}
            loginLabel={dict.nav.login}
            dashboardLabel={dict.nav.dashboard}
            className="site-nav__login"
          />
          <CartWidget locale={locale} dict={dict.cart} navBase={navBase} />
          <LanguageSwitcher locale={locale} />
          <MobileMenu locale={locale} dict={dict} basePath={basePath} />
        </div>
      </div>
    </header>
  );
}
