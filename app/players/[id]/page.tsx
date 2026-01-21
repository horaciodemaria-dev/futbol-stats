import { getPlayerProfile, getPlayerStatistics } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PlayerPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}

export default async function PlayerPage({ params, searchParams }: PlayerPageProps) {
  const { id } = await params;
  const { season: seasonParam } = await searchParams;
  
  const playerId = parseInt(id);
  
  if (isNaN(playerId)) {
    notFound();
  }

  // Only allow seasons 2023 or 2024
  const requestedSeason = parseInt(seasonParam || "2024");
  const season = requestedSeason === 2023 || requestedSeason === 2024 ? requestedSeason : 2024;

  // Fetch player data
  const [profile, statistics] = await Promise.all([
    getPlayerProfile(playerId),
    getPlayerStatistics(playerId, season),
  ]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-green-400 hover:text-green-300 mb-4 inline-block">
            ← Back to Home
          </Link>
          <p className="text-center text-gray-400 text-lg">Player not found</p>
        </div>
      </main>
    );
  }

  const player = profile.player;
  const playerStats = statistics?.statistics || [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-green-400 hover:text-green-300 mb-6 inline-block">
          ← Back to Home
        </Link>

        {/* Player Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-6 shadow-lg">
          <div className="flex items-start gap-6">
            {player.photo && (
              <img 
                src={player.photo} 
                alt={player.name} 
                className="w-32 h-32 rounded-full border-4 border-green-500/50 shadow-xl"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{player.name}</h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                {player.age && (
                  <div>
                    <span className="text-gray-400">Age:</span>
                    <span className="ml-2 text-white font-semibold">{player.age}</span>
                  </div>
                )}
                {player.nationality && (
                  <div>
                    <span className="text-gray-400">Nationality:</span>
                    <span className="ml-2 text-white font-semibold">{player.nationality}</span>
                  </div>
                )}
                {player.height && (
                  <div>
                    <span className="text-gray-400">Height:</span>
                    <span className="ml-2 text-white font-semibold">{player.height}</span>
                  </div>
                )}
                {player.weight && (
                  <div>
                    <span className="text-gray-400">Weight:</span>
                    <span className="ml-2 text-white font-semibold">{player.weight}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Season Selector */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-green-400">Season Statistics</h2>
            <div className="flex gap-2">
              <Link
                href={`/players/${playerId}?season=2023`}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  season === 2023
                    ? "bg-green-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                2023
              </Link>
              <Link
                href={`/players/${playerId}?season=2024`}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  season === 2024
                    ? "bg-green-500 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                2024
              </Link>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Statistics are shown based on free API data coverage for seasons 2023–2024.
          </p>
        </div>

        {playerStats.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-lg">No statistics available for season {season}</p>
          </div>
        ) : (
          <>
            {/* Season Summary Cards */}
            {playerStats.map((stat: any, index: number) => (
              <div key={index} className="mb-6">
                {/* Team & League Info */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-lg">
                  <div className="flex items-center gap-4 flex-wrap">
                    {stat.team?.logo && (
                      <img src={stat.team.logo} alt={stat.team.name} className="w-16 h-16" />
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">{stat.team?.name || "Unknown Team"}</h3>
                      <p className="text-gray-400">
                        {stat.league?.name || "Unknown League"} • {stat.league?.country || ""} • Season {season}
                      </p>
                    </div>
                    {stat.games?.position && (
                      <div className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
                        <span className="text-green-400 font-bold">{stat.games.position}</span>
                      </div>
                    )}
                    {stat.games?.number && (
                      <div className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-lg">
                        <span className="text-blue-400 font-bold">#{stat.games.number}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <StatCard 
                    label="Appearances" 
                    value={stat.games?.appearences} 
                    icon="🎽"
                  />
                  <StatCard 
                    label="Minutes" 
                    value={stat.games?.minutes} 
                    icon="⏱️"
                  />
                  <StatCard 
                    label="Goals" 
                    value={stat.goals?.total} 
                    icon="⚽"
                    highlight
                  />
                  <StatCard 
                    label="Assists" 
                    value={stat.goals?.assists} 
                    icon="🎯"
                    highlight
                  />
                  <StatCard 
                    label="Rating" 
                    value={stat.games?.rating ? parseFloat(stat.games.rating).toFixed(2) : null} 
                    icon="⭐"
                  />
                </div>

                {/* Detailed Stats Tabs */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
                  <div className="space-y-6">
                    {/* Attacking Stats */}
                    <StatSection title="⚔️ Attacking Stats">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem label="Total Shots" value={stat.shots?.total} />
                        <StatItem label="Shots on Target" value={stat.shots?.on} />
                        <StatItem label="Dribbles Attempted" value={stat.dribbles?.attempts} />
                        <StatItem label="Successful Dribbles" value={stat.dribbles?.success} />
                        <StatItem label="Penalties Scored" value={stat.penalty?.scored} />
                        <StatItem label="Penalties Missed" value={stat.penalty?.missed} />
                      </div>
                    </StatSection>

                    {/* Passing Stats */}
                    <StatSection title="🎯 Passing Stats">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem label="Total Passes" value={stat.passes?.total} />
                        <StatItem label="Key Passes" value={stat.passes?.key} />
                        <StatItem label="Pass Accuracy" value={stat.passes?.accuracy ? `${stat.passes.accuracy}%` : null} />
                      </div>
                    </StatSection>

                    {/* Discipline Stats */}
                    <StatSection title="🟨 Discipline">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatItem label="Yellow Cards" value={stat.cards?.yellow} />
                        <StatItem label="Red Cards" value={stat.cards?.red} />
                        <StatItem label="Fouls Committed" value={stat.fouls?.committed} />
                        <StatItem label="Fouls Drawn" value={stat.fouls?.drawn} />
                      </div>
                    </StatSection>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

// Component for stat cards
function StatCard({ 
  label, 
  value, 
  icon, 
  highlight = false 
}: { 
  label: string; 
  value: any; 
  icon: string; 
  highlight?: boolean;
}) {
  const displayValue = value !== null && value !== undefined ? value : "-";
  
  return (
    <div className={`bg-slate-700/50 backdrop-blur-sm border rounded-xl p-4 ${
      highlight ? "border-green-500/50" : "border-slate-600"
    }`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className={`text-3xl font-bold mb-1 ${highlight ? "text-green-400" : "text-white"}`}>
        {displayValue}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

// Component for stat sections
function StatSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-green-400 mb-4">{title}</h3>
      {children}
    </div>
  );
}

// Component for individual stat items
function StatItem({ label, value }: { label: string; value: any }) {
  const displayValue = value !== null && value !== undefined ? value : "-";
  
  return (
    <div className="bg-slate-800/50 rounded-lg p-3">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{displayValue}</div>
    </div>
  );
}
