import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import ConsultationForm from "@/components/ConsultationForm";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import NoBreakText from "@/components/NoBreakText";
import PageHero from "@/components/PageHero";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return {
    title: getDictionary(params.locale).consultationPage.heading,
    alternates: localeAlternates(params.locale, "/consultation"),
  };
}

export default function ConsultationPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const fullDict = getDictionary(locale);
  const dict = fullDict.consultationPage;
  const faqItems = fullDict.faqPage.items;

  return (
    <div className="section" style={{ position: "relative", overflow: "hidden" }}>
      <AmbientBackdrop
        blobs={[
          { color: "rgba(228,220,201,0.22)", size: 340, top: "-100px", left: "8%" },
          { color: "rgba(201,169,122,0.15)", size: 300, top: "-60px", right: "6%" },
        ]}
      />
      <div className="container" style={{ position: "relative", maxWidth: "640px" }}>
        <PageHero eyebrow={dict.eyebrow} heading={dict.heading} lead={dict.lead} />
        <div className="glass-panel glass-panel--solid" style={{ padding: "var(--space-4)", marginTop: "var(--space-4)" }}>
          <ConsultationForm dict={dict} locale={locale} />
        </div>

        <div id="faq" style={{ marginTop: "var(--space-6)" }}>
          <h2 className="section-heading">{dict.faqHeading}</h2>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>
                  <span>
                    <NoBreakText text={item.question} />
                  </span>
                </summary>
                <p>
                  <NoBreakText text={item.answer} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
