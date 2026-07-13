import type { ProductAvailability, ProductCategory } from "@/lib/shop/products";

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    house: string;
    founder: string;
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
  homeStatusLabels: {
    published: string;
    forthcoming: string;
    studioConcept: string;
    viewConcept: string;
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
    cta: string;
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
        phone: string;
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
      billingHeading: string;
      shippingHeading: string;
      shippingSameAsBilling: string;
      notesHeading: string;
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
    submitting: string;
    note: string;
    errorNote: string;
    privacyNote: string;
    errors: {
      name: string;
      email: string;
      message: string;
    };
    shopInquiryPrefix: string;
    faqHeading: string;
  };
  shopPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    categories: { id: "all" | ProductCategory; label: string }[];
    sections: {
      featured: { heading: string; lead: string };
      collection: { heading: string; lead: string };
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
    quantityLabel: string;
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
    viewCart: string;
    proceedToCheckout: string;
    consultationFallback: string;
    close: string;
    open: string;
  };
  cartPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    empty: string;
    emptyCta: string;
    quantityLabel: string;
    remove: string;
    lineTotalLabel: string;
    totalsHeading: string;
    subtotalLabel: string;
    subtotalNote: string;
    checkoutNote: string;
    proceedToCheckout: string;
    continueShopping: string;
    discountCodeLabel: string;
    discountCodePlaceholder: string;
    discountApply: string;
    discountRemove: string;
    discountInvalid: string;
    discountAppliedLabel: string;
    discountLabel: string;
    totalLabel: string;
  };
  checkoutPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    emptyNote: string;
    backToCart: string;
    billingHeading: string;
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    countryLabel: string;
    addressLine1Label: string;
    addressLine2Label: string;
    cityLabel: string;
    stateLabel: string;
    postalCodeLabel: string;
    shipToDifferentLabel: string;
    shippingHeading: string;
    orderNotesLabel: string;
    summaryHeading: string;
    subtotalLabel: string;
    discountCodeLabel: string;
    discountCodePlaceholder: string;
    discountApply: string;
    discountRemove: string;
    discountInvalid: string;
    discountAppliedLabel: string;
    discountLabel: string;
    totalLabel: string;
    paymentNote: string;
    submit: string;
    submitting: string;
    errorBannerHeading: string;
    fieldRequired: string;
    emailInvalid: string;
    successHeading: string;
    successMessage: string;
    orderReferenceLabel: string;
    continueLabel: string;
    errorMessage: string;
    errorFallback: string;
  };
  atelierPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    intro: string[];
    servicesHeading: string;
    servicesLead: string;
    services: { title: string; description: string }[];
    process: {
      heading: string;
      lead: string;
      steps: { title: string; description: string }[];
    };
    craft: {
      heading: string;
      lead: string;
      points: { title: string; description: string }[];
    };
    founderBridge: {
      eyebrow: string;
      body: string;
      cta: string;
    };
    forHeading: string;
    forBody: string;
    cta: string;
    note: string;
  };
  founderPage: {
    eyebrow: string;
    heading: string;
    letterHeading: string;
    letter: string[];
    bioHeading: string;
    bioBody: string[];
    worksHeading: string;
    worksLead: string;
    works: { title: string; category: string; detail: string; roles: string }[];
    scopeHeading: string;
    scopeLead: string;
    scopePoints: string[];
    studioHeading: string;
    studioBody: string[];
    webHeading: string;
    webBody: string;
    forHeading: string;
    forBody: string;
    cta: string;
  };
}
