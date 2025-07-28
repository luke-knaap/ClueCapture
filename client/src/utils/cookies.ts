export function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toISOString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}`;
}

export function getCookie(name: string): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] ?? null
  );
}
