import SmoothScroll from '@/components/motion/SmoothScroll';
import CustomCursor from '@/components/motion/CustomCursor';
import PageTransition from '@/components/motion/PageTransition';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  );
}
