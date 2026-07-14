import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { noIndex } from "@/lib/i18n/seo";
import SignupForm from "@/components/SignupForm";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).auth.signup.heading, robots: noIndex };
}

export default function SignupPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container">
      <SignupForm dict={dict.auth.signup} navBase={`/${locale}`} locale={locale} />
    </div>
  );
}
