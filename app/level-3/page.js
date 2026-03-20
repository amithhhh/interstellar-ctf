"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Level3_Page() {
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
      const res = await fetch("/api/validate-level3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flag }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Transmission restored... Redirecting...");
        setTimeout(() => router.push("/level-4"), 1200);
      } else {
        setMessage("❌ Incorrect. The signal is still distorted.");
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
        SIGNAL 03 — "The Morse of Time"
      </h1>

      {/* Story */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full leading-relaxed">
        <p>
          Near Gargantua, time itself bends.
        </p>
        <p className="mt-2">
          Signals sent from the Endurance arrive... altered.
        </p>
        <p className="mt-4 italic text-green-300">
          "The distortion is not random. Every character is shifted."
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900 p-4 rounded mb-6 max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Instructions</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Download the intercepted transmission</li>
          <li>Analyze the encoded message</li>
          <li>Identify the transformation applied</li>
          <li>Recover the original signal</li>
        </ul>
      </div>

      {/* Download */}
      <div className="mb-6">
        <a
          href="/signal03.txt"
          download
          className="bg-green-600 text-black px-5 py-2 rounded hover:bg-green-400 transition"
        >
          ⬇ Download Transmission
        </a>
      </div>

      {/* Hint */}
      <div className="bg-gray-900 p-4 rounded border-l-4 border-green-500 mb-6 max-w-3xl w-full">
        <h2 className="text-green-300 mb-2">Hint</h2>
        <p>
          The shift is symmetrical.  
          What moves forward can also move backward.
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