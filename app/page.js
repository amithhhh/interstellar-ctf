import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6">

      {/* Title */}
      <h1 className="text-4xl mb-6 text-center">
        TARS CTF — Beyond the Event Horizon
      </h1>

      {/* Story Box */}
      <div className="max-w-3xl bg-gray-900 p-6 rounded leading-relaxed text-sm md:text-base">
        
        <p>
          You have been pulled into the Tesseract — a five-dimensional construct
          built beyond the event horizon of Gargantua.
        </p>

        <p className="mt-4">
          Here, time is not a river.
          It is a landscape you can walk through.
        </p>

        <p className="mt-4">
          Cooper stands behind the bookshelves of his daughter's room,
          watching moments of her life replay like fragments of a broken timeline.
        </p>

        <p className="mt-4">
          He cannot speak. He cannot touch.
          But he can act — through gravity.
        </p>

        <p className="mt-4">
          The mission is clear:
          transmit quantum data back to Murph. Back to Earth. Back to save humanity.
        </p>

        <p className="mt-4">
          But the signal is unstable. Fragmented. Hidden in noise.
        </p>

        <p className="mt-4 font-semibold text-green-300">
          You must decode 10 transmissions hidden within the tesseract.
        </p>

        <p className="mt-4">
          Each signal brings the message closer to Murph’s watch.
          Each step bends space and time toward survival.
        </p>

        <p className="mt-6 italic text-green-300 text-center">
          "They didn’t choose me… they chose you."
        </p>
      </div>

      {/* Start Button */}
      <Link
        href="/level-1"
        className="mt-8 bg-green-500 text-black px-6 py-3 rounded hover:bg-green-400 transition"
      >
        🚀 Start Transmission
      </Link>

    </div>
  );
}