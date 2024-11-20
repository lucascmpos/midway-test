import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "disabled";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  onClick,
  children,
  className = "px-4 py-2 w-fit rounded-full",
}) => {
  const isDisabled = variant === "disabled";

  const buttonClass = classNames(className, {
    "bg-main-700m text-white": variant === "default",
    "bg-disabled-grey text-white cursor-not-allowed": isDisabled,
  });

  return (
    <button
      className={buttonClass}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
