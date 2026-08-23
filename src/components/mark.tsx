/**
 * AB Digital Consultancy mark: two solid asymmetric pillars with an upward
 * arrow hidden in the negative space between them.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 192 94"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <path d="M16 29.4 87.2 18.2 43.4 84.2H16V29.4Z" />
      <path d="M95.4 18.2 176 7.8v76.4h-37.6L95.4 18.2Z" />
    </svg>
  );
}
