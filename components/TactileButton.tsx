import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type TactileButtonProps = {
  isLocked?: boolean;
  isCompleted?: boolean;
  isCurrent?: boolean;
  Icon?: React.ElementType;
  onClick?: () => void;
};

export function TactileButton({
  isLocked,
  isCompleted,
  isCurrent,
  Icon,
  onClick,
}: TactileButtonProps) {
  const base =
    "relative flex items-center justify-center h-14 w-14 rounded-full transition-all duration-150 active:scale-95 select-none";

  return (
    <button
      disabled={isLocked}
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        base,
        "border border-neutral-200 shadow-[0_4px_8px_rgba(0,0,0,0.1)]",
        "hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]",
        "active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        isCompleted && "bg-green-500 text-white hover:bg-green-600",
        isCurrent &&
          "bg-blue-500 text-white hover:bg-blue-600 animate-[pulse_2s_ease-in-out_infinite]",
        isLocked &&
          "bg-neutral-100 text-neutral-400 border-neutral-300 shadow-inner cursor-not-allowed"
      )}
    >
      {isCompleted && <Check className="h-6 w-6" />}
      {isCurrent && Icon && <Icon className="h-6 w-6" />}
      {isLocked && <Lock className="h-6 w-6" />}

      {/* subtle top light reflection */}
      <span className="absolute inset-0 rounded-full bg-white/30 mix-blend-overlay pointer-events-none" />
    </button>
  );
}
