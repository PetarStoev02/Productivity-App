import { PublicRoute } from '@/components/auth/PublicRoute';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicRoute>{children}</PublicRoute>;
} 