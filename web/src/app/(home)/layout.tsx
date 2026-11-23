import PageShell from '@/components/PageShell';
import JsonLd from '@/components/JsonLd';
import { ORG, SITE_URL, SITE_NAME } from '@/lib/site';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell slug="home" extraHead={
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: ORG.name, alternateName: ORG.alternateName, url: `${SITE_URL}/`, logo: SITE_URL + ORG.logo, email: ORG.email, telephone: ORG.telephone, sameAs: ORG.sameAs },
              { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'ko-KR', publisher: { '@id': `${SITE_URL}/#organization` } },
            ],
          }}
        />
      }>
      {children}
    </PageShell>
  );
}
