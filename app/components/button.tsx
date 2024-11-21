import React from "react";
import { Pressable } from "react-native";
import classNames from "classnames";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "disabled";
}

export default function Button({
  onClick,
  children,
  disabled = false,
  className = "",
  variant = "default",
}: ButtonProps) {
  const buttonClass = classNames(
    "px-4 py-1 rounded-full font-medium text-white",
    {
      "": variant === "default" && !disabled,
      "bg-disabled-grey cursor-not-allowed": variant === "disabled" || disabled,
    },
    className,
  );

  return (
    <Pressable className={buttonClass} onPress={onClick} disabled={disabled}>
      {children}
    </Pressable>
  );
}
