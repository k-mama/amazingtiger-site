import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";
import { getDictionary } from "@/lib/i18n/getDictionary";

export default function RootPage() {
  const locale = "en" as const;
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} basePath="/" />
      <main>
        <HomeContent locale={locale} dict={dict} basePath="/" />
      </main>
      <Footer locale={locale} dict={dict} basePath="/" />
    </>
  );
}
