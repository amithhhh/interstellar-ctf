"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Level1_Page() {
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
      const res = await fetch("/api/validate-flag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flag: flag.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Correct! Redirecting to next signal...");
        
        setTimeout(() => {
          router.push("/level-2");
        }, 1200);

      } else {
        setMessage("❌ Incorrect flag. The signal is still incomplete.");
      }

    } catch (err) {
      setMessage("⚠️ Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono flex flex-col items-center">

      {/* Title */}
      <h1 className="text-3xl mb-6 border-b border-green-500 pb-2 w-full max-w-3xl">
        SIGNAL 01 — "The Bookshelf Speaks"
      </h1>

      {/* Story */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full leading-relaxed">
        <p>Inside the tesseract, Cooper watches the bookshelf.</p>
        <p className="mt-2">Books fall… but not randomly.</p>
        <p className="mt-4">TARS says:</p>
        <p className="mt-2 italic text-green-300">
          "The system must verify you. The key is here… but not everything visible is accessible."
        </p>
        <p className="italic text-green-300">
          "Some signals are hidden. Others are locked."
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full">
        <h2 className="text-xl mb-2 text-green-300">Instructions</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Download the challenge archive</li>
          <li>Extract it using:</li>
        </ul>

        <div className="bg-black border border-green-500 p-3 mt-3 rounded">
          <code>tar -xzvf signal01.tar.gz</code>
        </div>

        <ul className="list-disc ml-6 mt-3 space-y-2">
          <li>Analyze all files carefully</li>
          <li>The flag is hidden somewhere inside</li>
        </ul>
      </div>

      {/* Download */}
      <div className="mb-6">
        <a
          href="/signal01.tar.gz"
          download
          className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-400 transition"
        >
          ⬇ Download SIGNAL 01
        </a>
      </div>

      {/* Hint */}
      <div className="bg-gray-900 p-4 rounded border-l-4 border-green-500 mb-6 max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Hint</h2>
        <p>
          Not everything visible is useful…  
          and not everything useful is accessible.
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
          className="w-full p-2 bg-black border border-green-500 text-green-400 mb-3 outline-none"
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

        {message && (
          <p className="mt-3 text-sm">{message}</p>
        )}
      </div>

    </div>
  );
}