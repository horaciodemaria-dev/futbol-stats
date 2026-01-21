export const translations = {
  es: {
    todayMatches: "Partidos de hoy",
    dashboard: "Tablero",
    noMatches: "No hay partidos hoy",
    backToFixtures: "Volver a Partidos",
    recentForm: "Forma Reciente",
    fixtures: "Partidos",
    played: "Jugados",
    wins: "Victorias",
    draws: "Empates",
    losses: "Derrotas",
    goals: "Goles",
    scored: "Anotados",
    conceded: "Recibidos",
    averageFor: "Promedio A Favor",
    averageAgainst: "Promedio En Contra",
    defensiveStats: "Estadísticas Defensivas",
    cleanSheets: "Portería Invicta",
    failedToScore: "Sin Anotar",
    biggestWins: "Mayores Victorias",
    biggestLosses: "Mayores Derrotas",
    home: "Local",
    away: "Visitante",
    penalties: "Penales",
    missed: "Fallados",
    cards: "Tarjetas",
    yellowCards: "Tarjetas Amarillas",
    redCards: "Tarjetas Rojas",
    mostUsedFormation: "Formación Más Usada",
    usedTimes: "Usada {{count}} veces",
  },
  en: {
    todayMatches: "Today's Matches",
    dashboard: "Dashboard",
    noMatches: "No matches today",
    backToFixtures: "Back to Fixtures",
    recentForm: "Recent Form",
    fixtures: "Fixtures",
    played: "Played",
    wins: "Wins",
    draws: "Draws",
    losses: "Losses",
    goals: "Goals",
    scored: "Scored",
    conceded: "Conceded",
    averageFor: "Average For",
    averageAgainst: "Average Against",
    defensiveStats: "Defensive Stats",
    cleanSheets: "Clean Sheets",
    failedToScore: "Failed to Score",
    biggestWins: "Biggest Wins",
    biggestLosses: "Biggest Losses",
    home: "Home",
    away: "Away",
    penalties: "Penalties",
    missed: "Missed",
    cards: "Cards",
    yellowCards: "Yellow Cards",
    redCards: "Red Cards",
    mostUsedFormation: "Most Used Formation",
    usedTimes: "Used {{count}} times",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.es;

export function getTranslation(lang: Language, key: TranslationKey, params?: Record<string, string | number>) {
  let text: string = translations[lang][key] || translations.es[key];
  
  if (params) {
    Object.keys(params).forEach(param => {
      text = text.replace(`{{${param}}}`, String(params[param]));
    });
  }
  
  return text;
}
