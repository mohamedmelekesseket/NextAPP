/** Join class names, skipping falsy values (simple `clsx`-style helper). */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
