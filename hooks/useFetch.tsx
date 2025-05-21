'use client'
import { useState, useEffect } from 'react';

// Definimos una interfaz genérica para el resultado
interface FetchResult<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
}

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData: T = await response.json();
        
        if (!signal.aborted) {
          setData(jsonData);
          setError(null);
        }
      } catch (err) {
        if (!signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setData(null);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { loading, data, error };
};

export default useFetch;