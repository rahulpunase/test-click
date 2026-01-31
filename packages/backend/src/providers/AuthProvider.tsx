import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import React from "react";
import { TokenStorage } from "@convex-dev/auth/react";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

function setCookie(name: string, value: string, domain?: string) {
  let cookie = `${name}=${value}; path=/; samesite=lax`;

  // Add domain only for non-localhost environments
  if (domain && domain !== "localhost") {
    cookie += `; domain=${domain}`; // Remove the leading dot
  }

  // Add Secure flag for production (HTTPS)
  if (window.location.protocol === "https:") {
    cookie += "; secure";
  }

  document.cookie = cookie;
}

function deleteCookie(name: string, domain?: string) {
  let cookie = `${name}=; path=/; max-age=0`;

  if (domain && domain !== "localhost") {
    cookie += `; domain=${domain}`;
  }

  document.cookie = cookie;
}

export const AuthProvider = ({
  children,
  client,
}: {
  children: ReactNode;
  client: ConvexReactClient;
}) => {
  function getRootDomain(): string {
    const hostname = window.location.hostname;

    // For localhost, return localhost (no subdomain support)
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "localhost";
    }

    const parts = hostname.split(".");

    // For domains like "example.com" or "sub.example.com"
    if (parts.length >= 2) {
      return parts.slice(-2).join("."); // Returns "example.com"
    }

    return hostname;
  }

  const cookieStorage: TokenStorage = {
    getItem: (key) => getCookie(key),
    setItem: (key, value) => {
      const domain = getRootDomain();
      setCookie(key, value, domain);
    },
    removeItem: (key) => {
      const domain = getRootDomain();
      deleteCookie(key, domain);
    },
  };

  return (
    <ConvexAuthProvider client={client} storage={cookieStorage}>
      {children}
    </ConvexAuthProvider>
  );
};
