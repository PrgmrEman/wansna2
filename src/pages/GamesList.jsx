import SEO from "../components/SEO";
import GameCard from "../components/GameCard";
import { games } from "../data/games";


export default function GamesList() {
  return (
    <>
      <SEO
        title="الألعاب"
        description="استعرض ألعاب ونسنّا الجماعية واختر لعبتك المفضلة."
      />

      <section className="games-page">
        <h1>صالة الألعاب</h1>
        <p>اختر لعبة و خلّينا نلعب</p>

        <div className="games-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </>
  );
}