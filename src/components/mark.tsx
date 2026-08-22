/**
 * AB Digital Consultancy mark: two solid asymmetric pillars with an upward
 * arrow hidden in the negative space between them.
 */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <path d="M14 100V45L44 21v79H14Z" />
      <path d="M58 100V19l32 26v55H58Z" />
    </svg>
  );
}
