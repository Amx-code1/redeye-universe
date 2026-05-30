export function getReaderLevel(
  chaptersRead: number
) {
  if (chaptersRead >= 100)
    return "🏆 Lore Master";

  if (chaptersRead >= 50)
    return "⚔ Veteran";

  if (chaptersRead >= 20)
    return "📚 Lore Seeker";

  if (chaptersRead >= 5)
    return "🧭 Explorer";

  return "👤 New Reader";
}