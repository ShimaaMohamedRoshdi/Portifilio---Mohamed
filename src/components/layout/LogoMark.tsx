type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
};

export function LogoMark({ size = "md" }: LogoMarkProps) {
  const widthSize =
    size === "sm" ? "w-[80px]" : size === "lg" ? "w-[120px]" : "w-[100px]";
  const heightSize =
    size === "sm" ? "h-[80px]" : size === "lg" ? "h-[120px]" : "h-[100px]";

  return (
    <img
      src="/images/Logo2.png"
      alt="شعار بريزماتك"
      className={`${widthSize} ${heightSize} object-contain`}
    />
  );
}
