type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
};

export function LogoMark({ size = "md" }: LogoMarkProps) {
  const widthSize =
    size === "sm" ? "w-[120px]" : size === "lg" ? "w-[340px]" : "w-[120px]";
  const heightSize =
    size === "sm" ? "h-[120px]" : size === "lg" ? "h-[340px]" : "h-[120px]";

  return (
    <img
      src="/images/Logo2.png"
      alt="شعار بريزماتك"
      className={`${widthSize} ${heightSize} object-contain`}
    />
  );
}
