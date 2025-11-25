import { useEffect } from "react";

function useUpdateHighscore(url, ms, points, highscore, status) {
  useEffect(() => {
    // guard clause
    if (status !== "finished") return;
    if (points < highscore) return;

    async function updateHighscore() {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ highscore: points }),
        signal: AbortSignal.timeout(ms), // abort after 5 seconds
      });
    }

    updateHighscore();
  }, [url, ms, points, highscore, status]);
}

export default useUpdateHighscore;
