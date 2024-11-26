import { useState, useEffect } from "react";

type RequestConfig = {
  method: string;
  headers?: Record<string, string>;
  body?: string;
};

type UseFetchReturn<T> = {
  data: T | null;
  isPending: boolean;
  error: string | null;
  postGetData: (payload: any) => void;
};

export const useFetch = <T = any,>(
  url: string,
  method: "GET" | "POST" | "DELETE" = "GET"
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestConfig, setRequestConfig] = useState<RequestConfig | null>(
    null
  );

  const postGetData = (payload: any) => {
    if (method === "POST") {
      setRequestConfig({
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else if (method === "DELETE") {
      setRequestConfig({
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsPending(true);

      // GET uchun tokenni qo'shish
      const headers: Record<string, string> = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const req = await fetch(url, {
          method,
          headers: method === "GET" ? headers : requestConfig?.headers,
          body: requestConfig?.body,
        });
        if (!req.ok) {
          throw new Error(req.statusText);
        }
        const resData = (await req.json()) as T;
        setData(resData);
        setIsPending(false);
        setError(null);
      } catch (err: any) {
        setIsPending(false);
        setError(err.message);
        console.error(err.message);
      }
    };

    if (method === "GET" || requestConfig) {
      getData();
    }
  }, [url, method, requestConfig]);

  return { data, isPending, error, postGetData };
};
