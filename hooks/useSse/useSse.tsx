import { useOpenBaas } from "openbaas-sdk-react";
import { useEffect, useState } from "react";

const useSSE = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { accessToken } = useOpenBaas();
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        //@ts-ignore
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        setIsConnected(true);

        while (isMounted) {
          const { value, done } = await reader.read();
          if (done) break;
          const text = decoder.decode(value, { stream: true });
          try {
            const parsedData = JSON.parse(text);
            setData(parsedData);
          } catch (err) {
            //@ts-ignore
            setError("Error parsing event data");
          }
        }
      } catch (err) {
        //@ts-ignore
        setError("Error with SSE connection");
        setIsConnected(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, isConnected };
};

export default useSSE;
