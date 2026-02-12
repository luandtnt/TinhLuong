/**
 * Utility để combine class names
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Utility để tạo inline styles từ object
 */
export function createStyles<T extends Record<string, React.CSSProperties>>(
  styles: T
): T {
  return styles;
}
