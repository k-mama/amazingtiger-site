import type { ProductAvailability, ProductCategory } from "@/lib/shop/products";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    house: string;
    atelier: string;
    shop: string;
    membership: string;
    faq: string;
    consultation: string;
    login: string;
    dashboard: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  philosophy: {
    eyebrow: string;
    heading: string;
    body: string[];
  };
  works: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { label: string; title: string; description: string }[];
  };
  house: {
    eyebrow: string;
    heading: string;
    body: string[];
    points: string[];
  };
  founder: {
    eyebrow: string;
    heading: string;
    body: string[];
    name: string;
    role: string;
  };
  studioNotes: {
    eyebrow: string;
    heading: string;
    lead: string;
    notes: { date: string; title: string; excerpt: string }[];
  };
  membership: {
    eyebrow: string;
    heading: string;
    body: string;
    perks: string[];
    cta: string;
  };
  shopPreview: {
    eyebrow: string;
    heading: string;
    lead: string;
    cta: string;
  };
  atelierPreview: {
    eyebrow: string;
    heading: string;
    lead: string;
    cta: string;
  };
  consultationInvite: {
    eyebrow: string;
    heading: string;
    body: string;
    cta: string;
  };
  footer: {
    rights: string;
    links: { label: string; href: string }[];
  };
  auth: {
    login: {
      eyebrow: string;
      heading: string;
      lead: string;
      emailLabel: string;
      passwordLabel: string;
      submit: string;
      submitting: string;
      switchPrompt: string;
      switchCta: string;
      switchHref: string;
      note: string;
      confirmedBanner: string;
      errors: {
        emailRequired: string;
        passwordRequired: string;
        invalidCredentials: string;
        emailNotConfirmed: string;
        generic: string;
      };
    };
    signup: {
      eyebrow: string;
      heading: string;
      lead: string;
      nameLabel: string;
      emailLabel: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      submit: string;
      submitting: string;
      switchPrompt: string;
      switchCta: string;
      switchHref: string;
      note: string;
      success: string;
      errors: {
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        passwordTooShort: string;
        passwordMismatch: string;
        alreadyRegistered: string;
        generic: string;
      };
    };
  };
  dashboard: {
    eyebrow: string;
    heading: string;
    lead: string;
    checking: string;
    loggedOut: {
      badge: string;
      heading: string;
      lead: string;
      cta: string;
    };
    loggedIn: {
      signedInAs: string;
      statusLabel: string;
      statusValue: string;
      logout: string;
    };
    cards: { title: string; description: string }[];
    note: string;
  };
  admin: {
    eyebrow: string;
    heading: string;
    lead: string;
    checking: string;
    loggedOut: {
      badge: string;
      heading: string;
      lead: string;
      cta: string;
    };
    notAuthorized: {
      badge: string;
      heading: string;
      lead: string;
      cta: string;
    };
    sections: { title: string; description: string }[];
    note: string;
    consultations: {
      heading: string;
      lead: string;
      filters: { id: "all" | "new" | "in_progress" | "closed"; label: string }[];
      columns: {
        name: string;
        email: string;
        projectType: string;
        locale: string;
        status: string;
        createdAt: string;
        updateStatus: string;
      };
      statusLabels: Record<"new" | "in_progress" | "closed", string>;
      statusUpdate: {
        label: string;
        updating: string;
        success: string;
        error: string;
      };
      loading: string;
      empty: string;
      error: string;
    };
    orders: {
      heading: string;
      lead: string;
      loading: string;
      empty: string;
      error: string;
      columns: {
        createdAt: string;
        customer: string;
        email: string;
        country: string;
        region: string;
        status: string;
        subtotal: string;
        items: string;
      };
      statusLabels: Record<"pending_inquiry" | "pending" | "paid" | "fulfilled" | "cancelled" | "refunded", string>;
      viewDetails: string;
      hideDetails: string;
      itemsHeading: string;
      itemsLoading: string;
      itemsEmpty: string;
      itemsError: string;
    };
  };
  faqPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    items: { question: string; answer: string }[];
    note: string;
  };
  consultationPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    projectTypeLabel: string;
    projectTypeOptions: string[];
    messageLabel: string;
    submit: string;
    note: string;
    errorNote: string;
    shopInquiryPrefix: string;
  };
  shopPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    categories: { id: "all" | ProductCategory; label: string }[];
    sections: {
      featuredBooks: { heading: string; lead: string };
      limitedEditions: { heading: string; lead: string };
      objects: { heading: string; lead: string };
      giftSets: { heading: string; lead: string };
      comingSoon: { heading: string; lead: string; future: string[] };
      privateInquiry: { heading: string; lead: string; cta: string };
    };
    addToPrivateCart: string;
    requestAvailability: string;
    joinReleaseList: string;
    privateInquiryCta: string;
    viewDetail: string;
    availabilityLabels: Record<ProductAvailability, string>;
    cartNote: string;
  };
  shopDetail: {
    backToCatalogue: string;
    categoryLabel: string;
    availabilityLabel: string;
    detailsHeading: string;
    relatedHeading: string;
    inquiryNote: string;
  };
  cart: {
    eyebrow: string;
    title: string;
    empty: string;
    remove: string;
    quantityLabel: string;
    subtotalLabel: string;
    subtotalNote: string;
    checkoutNote: string;
    requestCheckout: string;
    consultationFallback: string;
    close: string;
    open: string;
    orderRequest: {
      heading: string;
      lead: string;
      selectedObjectsHeading: string;
      nameLabel: string;
      emailLabel: string;
      countryLabel: string;
      regionLabel: string;
      messageLabel: string;
      submit: string;
      submitting: string;
      back: string;
      retry: string;
      successHeading: string;
      successMessage: string;
      errorMessage: string;
      errorFallback: string;
      continueLabel: string;
    };
  };
  atelierPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    intro: string[];
    servicesHeading: string;
    servicesLead: string;
    services: { title: string; description: string }[];
    forHeading: string;
    forBody: string;
    cta: string;
    note: string;
  };
}
