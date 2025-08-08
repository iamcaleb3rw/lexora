import { Button } from "@/components/ui/button";

export function ThreeDButton({
  text,
  className,
  type,
  onClick,
}: {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: any;
}) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${className} bg-primary border border-muted-foreground text-white shadow-[0_4px_0_0_#1f2937] active:shadow-[0_1px_0_0_#1f2937] active:translate-y-[3px] transition-all duration-150`}
    >
      {text}
    </Button>
  );
}
