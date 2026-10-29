import { getTodayFixtures } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import { getTranslation, Language } from "@/lib/translations";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const fixtures = await getTodayFixtures();
  const params = await searchParams;
  const lang: Language = params.lang === 'en' ? 'en' : 'es';
  const t = (key: any) => getTranslation(lang, key);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            ⚽ {t('todayMatches')}
          </h1>
          <div className="flex gap-4 items-center">
            <Suspense fallback={null}>
              <LanguageSelector />
            </Suspense>
            <Link 
              href={`/dashboard?lang=${lang}`}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500 text-green-400 rounded-lg font-semibold transition-all"
            >
              📊 {t('dashboard')}
            </Link>
          </div>
        </div>

        <section className="mb-8" aria-labelledby="explore-stats-heading">
          <h2 id="explore-stats-heading" className="mb-4 text-xl font-bold text-white">
            {t('exploreStats')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`/dashboard?lang=${lang}`}
              className="group rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/15 to-slate-800/60 p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-green-400 hover:shadow-green-500/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">🏟️</span>
                <span className="text-green-400 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-white">{t('teamStats')}</h3>
              <p className="mb-4 text-sm text-gray-400">{t('teamStatsDescription')}</p>
              <span className="text-sm font-semibold text-green-400">{t('viewStats')} →</span>
            </Link>

            <Link
              href={`/players?lang=${lang}`}
              className="group rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/15 to-slate-800/60 p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-blue-500/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl" aria-hidden="true">⭐</span>
                <span className="text-blue-400 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-white">{t('playerStats')}</h3>
              <p className="mb-4 text-sm text-gray-400">{t('playerStatsDescription')}</p>
              <span className="text-sm font-semibold text-blue-400">{t('viewStats')} →</span>
            </Link>
          </div>
        </section>

        {fixtures.length === 0 && (
          <p className="text-center text-gray-400 text-lg">{t('noMatches')}</p>
        )}

        <ul className="space-y-4">
          {fixtures.map((fixture: any) => (
            <li
              key={fixture.fixture.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-500/50 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                  {fixture.league.name}
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-slate-700/80 text-gray-300">
                  {fixture.fixture.status.short}
                </div>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex-1 text-right">
                  <span className="text-lg font-medium text-white">{fixture.teams.home.name}</span>
                </div>
                
                <div className="px-6 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                  <strong className="text-2xl font-bold text-white">
                    {fixture.goals.home ?? "-"} : {fixture.goals.away ?? "-"}
                  </strong>
                </div>
                
                <div className="flex-1 text-left">
                  <span className="text-lg font-medium text-white">{fixture.teams.away.name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
