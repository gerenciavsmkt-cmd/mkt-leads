import type { Metadata } from "next";
import ClientLayout from "./client-layout";
import { api } from "@/services/api";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await api.getSettings();
    const headerList = await headers();
    const host = headerList.get('host') || 'gerency-leads.vercel.app';
    const protocol = headerList.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    
    const ogImageUrl = `${protocol}://${host}/api/img/og-logo`;
    const faviconUrl = `${protocol}://${host}/api/img/favicon`;

    return {
      title: "Gerency Leads | CRM & E-mail Marketing",
      description: "Gerenciamento inteligente de leads e campanhas",
      icons: {
        icon: faviconUrl,
        apple: faviconUrl,
      },
      openGraph: {
        title: "Gerency Leads | CRM & E-mail Marketing",
        description: "Gerenciamento inteligente de leads e campanhas",
        images: [{ url: ogImageUrl }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        images: [ogImageUrl],
      }
    };
  } catch (e) {
    return {
      title: "Gerency Leads | CRM & E-mail Marketing",
      description: "Gerenciamento inteligente de leads e campanhas",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
