import PageShell from '@/components/PageShell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell slug="mr-booster">
      {children}
    </PageShell>
  );
}
