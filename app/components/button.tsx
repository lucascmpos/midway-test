import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "disabled";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  onClick,
  children,
  className = "px-6 font-medium py-2 h-fit w-fit rounded-full",
}) => {
  const isDisabled = variant === "disabled";

  const buttonClass = classNames(className, {
    "bg-midway-green-600 text-white": variant === "default",
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
