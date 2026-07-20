type LogoMarkProps = {
  size?: "sm" | "md" | "lg";
};

export function LogoMark({ size = "md" }: LogoMarkProps) {
  const pSize =
    size === "sm" ? "text-[2.6rem]" : size === "lg" ? "text-[4rem]" : "text-[3.2rem]";
  const rSize =
    size === "sm" ? "text-[1.85rem]" : size === "lg" ? "text-[2.8rem]" : "text-[2.3rem]";
  const subSize =
    size === "sm" ? "text-[0.72rem]" : size === "lg" ? "text-[1rem]" : "text-[0.85rem]";

  return (
    <span className="inline-flex flex-col leading-none" dir="ltr">

      {/* ── P + rismatic row ── */}
      <span className="flex items-end leading-none">

        {/* Purple gradient P */}
        <span
          className={`${pSize} font-black leading-none tracking-tight`}
          style={{
            background: "linear-gradient(160deg, #9B30D9 0%, #5B0E91 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          P
        </span>

        {/* Gold "rismatic" */}
        <span
          className={`${rSize} font-black leading-none tracking-tight`}
          style={{ color: "#F5B300", marginBottom: "0.06rem" }}
        >
          rismatic
        </span>
      </span>

      {/* ── Arabic subtitle + gradient rule ── */}
      <span className="mt-0.5 flex items-center gap-1.5">
        <span
          className={`${subSize} font-medium tracking-wide`}
          style={{ color: "#7A1CAC" }}
        >
          لخدمات التصميم
        </span>
        <span
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, rgba(155,48,217,0.8), rgba(155,48,217,0.15), transparent)",
          }}
        />
      </span>
    </span>
  );
}
