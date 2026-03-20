"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Level2_Page() {
  const [flag, setFlag] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!flag.trim()) {
      setMessage("⚠️ Enter a flag first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/validate-level2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flag: flag.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Signal decoded... Redirecting...");
        setTimeout(() => router.push("/level-3"), 1200);
      } else {
        setMessage("❌ Incorrect. The dust still hides the truth.");
      }

    } catch {
      setMessage("⚠️ Network error.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono flex flex-col items-center">

      {/* Title */}
      <h1 className="text-3xl mb-6 border-b border-green-500 pb-2 w-full max-w-3xl">
        SIGNAL 02 — "What the Dust Says"
      </h1>

      {/* Story */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full leading-relaxed">
        <p>
          Inside the tesseract, Cooper watches the dust settle.
        </p>
        <p className="mt-2">
          Not randomly... but in patterns.
        </p>
        <p className="mt-4">
          Murph begins recording everything in her notebook.
        </p>
        <p className="mt-4 italic text-green-300">
          "The signal is recorded... but not all of it is meaningful."
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Instructions</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Download Murph's notebook</li>
          <li>Open it using a Linux command</li>
          <li>Analyze the patterns carefully</li>
          <li>The answer is hidden inside</li>
        </ul>

        <div className="bg-black border border-green-500 p-3 mt-3 rounded">
          <code>cat murph_notebook.txt</code>
        </div>
      </div>

      {/* Download */}
      <div className="mb-6">
        <a
          href="/murph_notebook.txt"
          download
          className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-400 transition"
        >
          ⬇ Download Notebook
        </a>
      </div>

      {/* Hint */}
      <div className="bg-gray-900 p-4 rounded border-l-4 border-green-500 mb-6 max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Hint</h2>
        <p>
          Not every pattern matters.  
          Some repeat for a reason.
        </p>
      </div>

      {/* Flag Submission */}
      <div className="bg-gray-900 p-4 rounded max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Submit Flag</h2>

        <input
          type="text"
          placeholder="FLAG{...}"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 bg-black border border-green-500 mb-3 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-gray-600 text-black"
              : "bg-green-500 text-black hover:bg-green-400"
          }`}
        >
          {loading ? "Checking..." : "Submit"}
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </div>

    </div>
  );
}