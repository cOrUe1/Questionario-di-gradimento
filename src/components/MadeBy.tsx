type MadeByProps = {
  className?: string;
  fixed?: boolean; // se true lo fissa in basso a destra
};

export default function MadeBy({ className = "", fixed = false }: MadeByProps) {
  const year = new Date().getFullYear();
  return (
    <div
      aria-label="Made by Corazzi"
      className={[
        "text-xs md:text-sm text-muted-foreground",
        "bg-background/70 backdrop-blur px-2.5 py-1.5 rounded-full border",
        fixed ? "fixed right-3 bottom-3 shadow-sm" : "",
        className,
      ].join(" ")}
    >
      Made with ❤️ by <span className="font-medium">Corazzi</span> · {year}
    </div>
  );
}
