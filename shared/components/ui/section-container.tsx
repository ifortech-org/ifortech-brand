import { cn } from "@/shared/lib/utils";
import { SectionPadding, ColorVariant } from "@/sanity.types";

interface SectionContainerProps {
  color?: ColorVariant | null;
  padding?: SectionPadding | null;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function SectionContainer({
  color = "background",
  padding,
  children,
  className,
  contentClassName,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        `bg-${color} relative`,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
        className
      )}>
      <div className={cn("container", contentClassName)}>{children}</div>
    </div>
  );
}
