import Link from "next/link";

export default async function PlayersPage() {
  // Popular players with their IDs (for free API plan)
  const featuredPlayers = [
    { id: 154, name: "Lionel Messi", team: "Inter Miami", position: "Attacker" },
    { id: 1100, name: "Erling Haaland", team: "Manchester City", position: "Attacker" },
    { id: 648, name: "Kylian Mbappé", team: "Real Madrid", position: "Attacker" },
    { id: 31, name: "Kevin De Bruyne", team: "Manchester City", position: "Midfielder" },
    { id: 278, name: "Mohamed Salah", team: "Liverpool", position: "Attacker" },
    { id: 889, name: "Robert Lewandowski", team: "Barcelona", position: "Attacker" },
    { id: 874, name: "Cristiano Ronaldo", team: "Al Nassr", position: "Attacker" },
    { id: 1325, name: "Vinícius Júnior", team: "Real Madrid", position: "Attacker" },
    { id: 190, name: "Luka Modrić", team: "Real Madrid", position: "Midfielder" },
    { id: 306, name: "Karim Benzema", team: "Al Ittihad", position: "Attacker" },
    { id: 985, name: "Harry Kane", team: "Bayern Munich", position: "Attacker" },
    { id: 184, name: "Neymar Jr", team: "Al Hilal", position: "Attacker" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-green-400 hover:text-green-300 inline-block">
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
            ⚽ Featured Players
          </h1>
          <p className="text-gray-400">
            Browse player profiles and statistics for seasons 2023-2024
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredPlayers.map((player) => (
            <Link
              key={player.id}
              href={`/players/${player.id}`}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{player.name}</h3>
                <p className="text-sm text-gray-400">{player.team}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs font-semibold">
                  {player.position}
                </span>
                <span className="text-green-400 text-sm font-semibold">
                  View Profile →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-bold text-green-400 mb-2">💡 How to Use</h2>
          <p className="text-gray-400 text-sm">
            Click on any player to view their detailed profile and statistics. 
            You can also access any player directly by navigating to <code className="px-2 py-1 bg-slate-700 rounded text-green-400">/players/[player-id]</code>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Statistics are available for seasons 2023 and 2024 (free API plan).
          </p>
        </div>
      </div>
    </main>
  );
}
