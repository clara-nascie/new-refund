import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100 p-4">
      <div className="flex flex-col items-center max-w-md text-center bg-gray-500 pt-16 pb-8 px-8 rounded-lg border border-gray-300/20 shadow-2xl relative overflow-hidden">
        
        {/* Floating background glowing orb */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>

        {/* Cute Ghost Invoice SVG */}
        <div className="mb-6 animate-bounce" style={{ animationDuration: '3s' }}>
          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_8px_16px_rgba(44,177,120,0.2)]"
          >
            {/* Invoice Body */}
            <path
              d="M15 10C15 4.47715 19.4772 0 25 0H95C100.523 0 105 4.47715 105 10V130L92.5 120L80 130L67.5 120L55 130L42.5 120L30 130L15 118V10Z"
              fill="#cdd5d2"
            />
            {/* Header Line */}
            <rect x="30" y="25" width="60" height="8" rx="4" fill="#4d5c57" />
            
            {/* Ghost Eyes */}
            <circle cx="45" cy="55" r="5" fill="#1f2523" />
            <circle cx="75" cy="55" r="5" fill="#1f2523" />
            
            {/* Ghost Mouth (O shape) */}
            <circle cx="60" cy="68" r="7" fill="#1f2523" />
            
            {/* Blush cheeks */}
            <circle cx="38" cy="62" r="3" fill="#b02d36" opacity="0.6" />
            <circle cx="82" cy="62" r="3" fill="#b02d36" opacity="0.6" />

            {/* Little refund stamp */}
            <rect x="35" y="90" width="50" height="18" rx="4" fill="#2cb178" opacity="0.8" transform="rotate(-5, 60, 99)" />
            <text x="60" y="103" fill="#f9fbfa" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-5, 60, 99)">404</text>
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-green-200 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-100 mb-4">
          Ops! Esta página foi reembolsada para o limbo...
        </h2>
        <p className="text-sm text-gray-300 mb-8 leading-relaxed">
          Parece que o caminho que você tentou acessar não existe ou foi excluído da nossa planilha.
        </p>

        <Link
          to="/"
          className="w-full flex items-center justify-center bg-green-100 text-white font-semibold h-12 rounded-lg cursor-pointer hover:bg-green-200 transition ease-linear shadow-lg hover:shadow-green-100/10 active:scale-95 text-center"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
