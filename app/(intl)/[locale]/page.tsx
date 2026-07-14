import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import HomeContent from "@/components/HomeContent";

export default function LocaleHomePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale);

  return <HomeContent locale={locale} dict={dict} basePath={`/${locale}`} />;
}
