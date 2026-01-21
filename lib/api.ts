const API_URL = "https://v3.football.api-sports.io";

export async function getTodayFixtures() {
  const today = new Date().toISOString().split("T")[0];

  console.log("Fetching fixtures for:", today);

  try {
    const res = await fetch(`${API_URL}/fixtures?date=${today}`, {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      next: {
        revalidate: 300,
      },
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return [];
    }

    const data = await res.json();
    console.log("Total fixtures found:", data.response?.length || 0);

    return data.response || [];
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
}

export async function getTeamStatistics(teamId: number, leagueId: number, season: number) {
  console.log(`Fetching stats for team ${teamId}, league ${leagueId}, season ${season}`);

  try {
    const res = await fetch(
      `${API_URL}/teams/statistics?season=${season}&team=${teamId}&league=${leagueId}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY!,
        },
        next: {
          revalidate: 3600, // 1 hour cache
        },
      }
    );

    if (!res.ok) {
      console.error("API Error:", res.status);
      return null;
    }

    const data = await res.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching team statistics:", error);
    return null;
  }
}

export async function getPlayerProfile(playerId: number) {
  console.log(`Fetching profile for player ${playerId}`);

  try {
    const res = await fetch(`${API_URL}/players/profiles?player=${playerId}`, {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      next: {
        revalidate: 86400, // 24 hour cache
      },
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return null;
    }

    const data = await res.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error("Error fetching player profile:", error);
    return null;
  }
}

export async function getPlayerStatistics(playerId: number, season: number) {
  // Only allow seasons 2023 or 2024 (FREE plan constraint)
  const allowedSeason = season === 2023 || season === 2024 ? season : 2024;

  console.log(`Fetching statistics for player ${playerId}, season ${allowedSeason}`);

  try {
    const res = await fetch(`${API_URL}/players?id=${playerId}&season=${allowedSeason}`, {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY!,
      },
      next: {
        revalidate: 3600, // 1 hour cache
      },
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return null;
    }

    const data = await res.json();
    return data.response?.[0] || null;
  } catch (error) {
    console.error("Error fetching player statistics:", error);
    return null;
  }
}
