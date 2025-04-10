import { parse } from "csv-parse/sync";
import { useCallback, useState } from "react";

interface TimeEntry {
  itemDescription: string;
  amount: number;
  qty: number;
}

const STORAGE_KEY = "items";

export const useCsvData = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseTimesheet = useCallback(async (publicFilePath: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch the file from the public directory
      const response = await fetch(publicFilePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileContent = await response.text();
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      });

      const results: TimeEntry[] = records.map((data: any) => {
        const workItems = data["Work done"]
          .split("\n")
          .map((item: string) => item.trim())
          .filter((item: string) => item)
          .map((item: string) => item.replace(/^\d+\.\s*/, "")); // Remove numbered list format

        return {
          itemDescription: `${data.Date}\n${workItems.join("\n")}`,
          amount: 60,
          qty: parseFloat(data["Time spent (hours)"]),
        };
      });

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to parse CSV file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    error,
    isLoading,
    parseTimesheet,
  };
};
