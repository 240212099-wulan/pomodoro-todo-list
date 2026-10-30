"use client";

export default function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="card w-full max-w-xl rounded-[2.5rem] p-8 text-center sm:p-12">
        {/* Gambar Pengganti Ikon */}
        <div className="sway flex justify-center">
          <img 
            src="/1144406955338816791.png" 
            alt="Snoopy Mascot" 
            className="h-28 w-28 object-contain sm:h-32 sm:w-32" 
          />
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold sm:text-5xl">
          welcome to your to do list
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Helping u for checking ur task and set the timer
        </p>
        <button onClick={onStart} className="btn mt-8 px-8 py-3 text-lg">
          start
        </button>
      </div>
    </main>
  );
}