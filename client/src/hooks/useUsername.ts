import { getCookie, setCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";

export function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const saved = getCookie("name");
    if (saved) {
      setUsername(decodeURIComponent(saved));
    }
  }, []);

  useEffect(() => {
    if (username) {
      setCookie("name", username);
    }
  }, [username]);

  return [username, setUsername] as const;
}
