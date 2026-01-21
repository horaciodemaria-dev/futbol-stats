import { getTeamStatistics } from "@/lib/api";
import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import { getTranslation, Language } from "@/lib/translations";

export default async function DashboardPage({ searchParams }: { searchParams: { lang?: string } }) {
  const stats = await getTeamStatistics(33, 39, 2023);
  const lang = (searchParams.lang as Language) || 'es';
  const t = (key: any, params?: any) => getTranslation(lang, key, params);

  if (!stats) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Link href={`/?lang=${lang}`} className="text-green-400 hover:text-green-300 mb-4 inline-block">
            ← {t('backToFixtures')}
          </Link>
          <p className="text-center text-gray-400 text-lg">Failed to load team statistics</p>
        </div>
      </main>
    );
  }

  const { team, league, form, fixtures, goals, biggest, clean_sheet, failed_to_score, penalty, lineups, cards } = stats;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href={`/?lang=${lang}`} className="text-green-400 hover:text-green-300 inline-block">
            ← {t('backToFixtures')}
          </Link>
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <img src={team.logo} alt={team.name} className="w-20 h-20" />
            <div>
              <h1 className="text-4xl font-bold text-white">{team.name}</h1>
              <p className="text-gray-400">{league.name} - {league.season}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="text-2xl font-bold text-green-400 mb-4">{t('recentForm')}</h2>
          <div className="flex gap-2">
            {form.split('').map((result: string, index: number) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
                  result === 'W' ? 'bg-green-500/20 border-green-500 text-green-400' :
                  result === 'D' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' :
                  'bg-red-500/20 border-red-500 text-red-400'
                } border-2`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Fixtures */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('fixtures')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('played')}:</span>
                <span className="text-white font-bold">{fixtures.played.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('wins')}:</span>
                <span className="text-green-400 font-bold">{fixtures.wins.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('draws')}:</span>
                <span className="text-yellow-400 font-bold">{fixtures.draws.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('losses')}:</span>
                <span className="text-red-400 font-bold">{fixtures.loses.total}</span>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('goals')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('scored')}:</span>
                <span className="text-green-400 font-bold">{goals.for.total.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('conceded')}:</span>
                <span className="text-red-400 font-bold">{goals.against.total.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('averageFor')}:</span>
                <span className="text-white font-bold">{goals.for.average.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('averageAgainst')}:</span>
                <span className="text-white font-bold">{goals.against.average.total}</span>
              </div>
            </div>
          </div>

          {/* Clean Sheets & Failed to Score */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg hover:shadow-green-500/20 transition-all">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('defensiveStats')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('cleanSheets')}:</span>
                <span className="text-green-400 font-bold">{clean_sheet.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('failedToScore')}:</span>
                <span className="text-red-400 font-bold">{failed_to_score.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Biggest Wins/Losses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('biggestWins')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('home')}:</span>
                <span className="text-white font-bold">{biggest.wins.home || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('away')}:</span>
                <span className="text-white font-bold">{biggest.wins.away || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-red-400 mb-4">{t('biggestLosses')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('home')}:</span>
                <span className="text-white font-bold">{biggest.loses.home || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('away')}:</span>
                <span className="text-white font-bold">{biggest.loses.away || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Penalties & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('penalties')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('scored')}:</span>
                <span className="text-green-400 font-bold">{penalty.scored.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('missed')}:</span>
                <span className="text-red-400 font-bold">{penalty.missed.total}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">{t('cards')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">{t('yellowCards')}:</span>
                <span className="text-yellow-400 font-bold">{cards.yellow?.['0-15']?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t('redCards')}:</span>
                <span className="text-red-400 font-bold">{cards.red?.['0-15']?.total || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Most Used Lineup */}
        {lineups && lineups.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-green-400 mb-4">{t('mostUsedFormation')}</h3>
            <div className="text-center">
              <p className="text-4xl font-bold text-white mb-2">{lineups[0].formation}</p>
              <p className="text-gray-400">{t('usedTimes', { count: lineups[0].played })}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
