import { useEffect } from "react";

export default function useFetchData(url, ms, dispatch, dispatchType) {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(ms), // abort after 5 seconds
        });

        // guard clause
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        dispatch({ type: dispatchType, payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        if (error.name === "TimeoutError") {
          console.error("API call timed out:", error.message);
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    }

    fetchData(url, ms);
  }, [url, ms, dispatch, dispatchType]);
}
