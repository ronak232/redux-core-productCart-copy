import { useState, useEffect } from "react";

// infere the type automatically based on the type passed as a value...
export const useDebounce = <T>(value: T, delay: 5000) => {
  const [debounceSearch, setDebounceSearch] = useState<T>(value);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      setDebounceSearch(value);
    }, delay);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [value, delay]);

  return debounceSearch;
};
