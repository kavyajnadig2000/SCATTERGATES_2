import React from "react";
import { BRAND } from "../config/branding";

interface LogoProps {
  layout?: "horizontal" | "vertical";
  variant?: "header" | "footer" | "preloader" | "console";
  className?: string;
  id?: string;
}

export const Logo: React.FC<LogoProps> = ({
  layout = "horizontal",
  variant,
  className = "",
  id,
}) => {
  let fullmarkHeightClass = "h-[40px] md:h-[48px] lg:h-[56px]";

  if (variant === "preloader") {
    fullmarkHeightClass = "h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]";
  } else if (variant === "console") {
    fullmarkHeightClass = "max-h-full max-w-full";
  } else if (variant === "footer") {
    fullmarkHeightClass = "h-[44px] md:h-[52px] lg:h-[64px]";
  } else if (variant === "header") {
    fullmarkHeightClass = "h-[50px] md:h-[58px] lg:h-[70px]";
  }

  return (
    <div
      id={id}
      className={`flex items-center justify-center w-full h-full select-none ${className}`}
    >
      <img
        src={BRAND.fullmark}
        alt={`${BRAND.name} Logo`}
        className={`${fullmarkHeightClass} max-w-full w-auto object-contain`}
        style={{ objectFit: "contain" }}
        loading="eager"
        decoding="sync"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Logo;
