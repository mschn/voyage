export function pathToUrl(path: string[]): string {
  return (
    '/' +
    path
      .map((p) => encodeURIComponent(p).replace('(', '%28').replace(')', '%29'))
      .join('/')
  );
}

export function urlToPath(url: string): string[] {
  return url
    .split('/')
    .slice(1)
    .map((p) => decodeURIComponent(p));
}
