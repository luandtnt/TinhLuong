import { ReactNode } from "react";
import { Button } from "./Button";

interface ActionButtonProps {
  onClick?: () => void;
  icon: ReactNode;
  label: string;
  variant?: "outline" | "primary";
}

export function ActionButton({ onClick, icon, label, variant = "outline" }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      icon={icon}
      label={label}
      variant={variant === "primary" ? "primary" : "outline"}
      size="md"
    />
  );
}