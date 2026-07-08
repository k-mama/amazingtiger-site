"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface AuthNavLinkProps {
  navBase: string;
  loginLabel: string;
  dashboardLabel: string;
  className?: string;
  onClick?: () => void;
}

export default function AuthNavLink({ navBase, loginLabel, dashboardLabel, className, onClick }: AuthNavLinkProps) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setSignedIn(Boolean(data.user));
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setSignedIn(Boolean(session?.user));
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <Link href={signedIn ? `${navBase}/dashboard` : `${navBase}/login`} className={className} onClick={onClick}>
      {signedIn ? dashboardLabel : loginLabel}
    </Link>
  );
}
