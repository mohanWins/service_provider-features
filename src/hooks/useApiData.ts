// useApiData.ts

import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T;
  error: Error | null;
}

const useApiData = <T>(apiUrl: string): ApiResponse<T> => {
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(apiUrl, {
    //       method: "GET",
    //     });
    //     const responseData = await response.json();
    //     console.log({ responseData });
    //     setData(responseData);
    //   } catch (error: any) {
    //     console.log({ error });
    //     setError(error);
    //   }
    // };
  }, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useApiData;
