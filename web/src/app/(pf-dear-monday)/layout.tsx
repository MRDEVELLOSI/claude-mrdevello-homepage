import PageShell from '@/components/PageShell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell slug="portfolio-dear-monday">
      {children}
    </PageShell>
  );
}
