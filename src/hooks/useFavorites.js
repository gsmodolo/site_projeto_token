import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "token:prompts-favoritos";

// localStorage pode lançar erro (aba anônima, armazenamento bloqueado): aí os
// favoritos simplesmente não persistem, mas a página continua funcionando.
function readStoredIds() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** Ids favoritos, salvos só neste navegador. */
export default function useFavorites() {
  const [ids, setIds] = useState(readStoredIds);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* sem persistência */
    }
  }, [ids]);

  const toggleFavorite = useCallback(
    (id) =>
      setIds((previous) =>
        previous.includes(id) ? previous.filter((current) => current !== id) : [...previous, id]
      ),
    []
  );

  return { favoriteIds: ids, toggleFavorite };
}
