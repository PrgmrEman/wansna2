const STORAGE_KEY = "wansnaPlayerSessions";

export function getPlayerSessions() {
  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : [];
}

export function savePlayerSession(players) {
  const sessions = getPlayerSessions();

  const now = new Date();

  const dateLabel = now.toLocaleDateString("ar-SA", {
    dateStyle: "medium",
  });

  const timeLabel = now.toLocaleTimeString("ar-SA", {
    timeStyle: "short",
  });

  const newSession = {
    id: Date.now(),
    name: `جلسة ${dateLabel}`,
    time: timeLabel,
    createdAt: now.toISOString(),
    players,
  };

  const updatedSessions = [newSession, ...sessions];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedSessions)
  );

  return updatedSessions;
}