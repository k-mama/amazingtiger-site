import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
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

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href={basePath} className="wordmark">
          <WordmarkLogo />
        </Link>
        <div className="site-nav">
          <CartWidget locale={locale} dict={dict.cart} navBase={navBase} />
          <LanguageSwitcher locale={locale} />
          <MobileMenu locale={locale} dict={dict} basePath={basePath} />
        </div>
      </div>
    </header>
  );
}
