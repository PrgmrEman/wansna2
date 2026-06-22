import { useState } from "react";
import { Plus, Trash2, Play } from "lucide-react";
import {
  getPlayerSessions,
  savePlayerSession,
} from "../services/playerSessions";

export default function GroupGameSetup({
  title,
  description,

  // أقل عدد لاعبين في الألعاب الجماعية
  minPlayers = 3,

  // أعلى عدد لاعبين في الألعاب الجماعية
  maxPlayers = 12,

  // قيمة البداية لعدد الجولات
  defaultRounds = 2,

  // إذا كانت false نخفي حقل الجولات
  showRounds = true,

  // دالة ترسل الإعدادات للعبة
  onStart,
}) {
  // أسماء اللاعبين
  const [players, setPlayers] = useState(["", "", ""]);

  // الجلسات المحفوظة
  const [sessions, setSessions] = useState(getPlayerSessions);

  // عدد الجولات
  const [rounds, setRounds] = useState(defaultRounds);

  // رسالة خطأ عدد الجولات
  const [roundsError, setRoundsError] = useState("");

  // عدد اللاعبين الذين كتبوا أسماءهم فعليًا
  const currentPlayersCount = players.filter((p) => p.trim()).length;

  // أقصى عدد جولات = عدد اللاعبين - 1
  const maxRounds = Math.max(currentPlayersCount - 1, 1);

  // إضافة لاعب جديد
  function addPlayer() {
    if (players.length >= maxPlayers) return;

    setPlayers([...players, ""]);
  }

  // حذف لاعب
  function removePlayer(index) {
    if (players.length <= minPlayers) return;

    setPlayers(players.filter((_, i) => i !== index));
  }

  // تحديث اسم لاعب
  function updatePlayer(index, value) {
    const updatedPlayers = [...players];

    updatedPlayers[index] = value;

    setPlayers(updatedPlayers);
  }

  // استخدام جلسة محفوظة
  function loadSession(session) {
    setPlayers(session.players);

    document.getElementById("setup-card")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // حذف جلسة محفوظة
  function deleteSession(sessionId) {
    const updatedSessions = sessions.filter(
      (session) => session.id !== sessionId
    );

    setSessions(updatedSessions);

    localStorage.setItem(
      "wansnaPlayerSessions",
      JSON.stringify(updatedSessions)
    );
  }

  // بدء اللعبة
  function handleStart() {
    // تنظيف الأسماء من الفراغات وحذف الخانات الفارغة
    const cleanPlayers = players
      .map((player) => player.trim())
      .filter(Boolean);

    // منع بدء اللعبة إذا كان عدد اللاعبين أقل من الحد الأدنى
    if (cleanPlayers.length < minPlayers) return;

    let finalRounds;

    // إذا كانت اللعبة تحتاج اختيار عدد الجولات
    if (showRounds) {
      // منع البدء إذا كان حقل الجولات فارغًا أو أقل من 1
      if (!rounds || Number(rounds) < 1) {
        setRoundsError("أدخل عدد الجولات أولًا");
        return;
      }

      // الحد الأعلى للجولات = عدد اللاعبين - 1
      const maxAllowedRounds = cleanPlayers.length - 1;

      // منع البدء إذا كان عدد الجولات أكبر من الحد الأعلى
      if (Number(rounds) > maxAllowedRounds) {
        setRoundsError(`الحد الأعلى للجولات هو ${maxAllowedRounds}`);
        return;
      }

      // اعتماد عدد الجولات بعد التحقق
      finalRounds = Number(rounds);

      // حذف رسالة الخطأ
      setRoundsError("");
    } else {
      // إذا كان حقل الجولات مخفيًا، نحسب الجولات تلقائيًا
      finalRounds = cleanPlayers.length - 1;
    }

    // حفظ جلسة اللاعبين بعد الضغط على بدء اللعبة
    const updatedSessions = savePlayerSession(cleanPlayers);
    setSessions(updatedSessions);

    // إرسال الإعدادات للعبة
    onStart({
      //اسماء اللعاب
      players: cleanPlayers,
      //عدد الجولات
      rounds: finalRounds,
    });
  }

  // هل يمكن بدء اللعبة؟
  const canStart =
    players.map((p) => p.trim()).filter(Boolean).length >= minPlayers;

  return (
    <section className="game-setup">
      <h1>{title}</h1>

      {description && <p className="game-setup-desc">{description}</p>}

      <div className="setup-card" id="setup-card">
        <h2>أسماء اللاعبين</h2>

        <div className="players-list">
          {players.map((player, index) => (
            <div className="player-row" key={index}>
              <input
                type="text"
                placeholder={`اللاعب ${index + 1}`}
                value={player}
                onChange={(e) => updatePlayer(index, e.target.value)}
              />

              <button
                type="button"
                onClick={() => removePlayer(index)}
                disabled={players.length <= minPlayers}
                className="icon-btn"
                title="حذف اللاعب"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPlayer}
          disabled={players.length >= maxPlayers}
          className="secondary-btn"
        >
          <Plus size={18} />
          إضافة لاعب
        </button>

        {players.length >= maxPlayers && (
          <p className="setup-hint">الحد الأعلى {maxPlayers} لاعب.</p>
        )}

        {showRounds && (
          <div className="rounds-box">
            <label>عدد الجولات من 1 إلى {maxRounds}</label>

            <input
              type="number"
              min="1"
              max={maxRounds}
              value={rounds}
              placeholder={`من 1 إلى ${maxRounds}`}
              onChange={(e) => setRounds(e.target.value)}
            />

            {roundsError && <p className="error-message">{roundsError}</p>}
          </div>
        )}

        <button
          type="button"
          onClick={handleStart}
          disabled={!canStart}
          className="start-game-btn"
        >
          <Play size={18} />
          ابدأ اللعبة
        </button>

        {!canStart && (
          <p className="setup-hint">
            أدخل أسماء {minPlayers} لاعبين على الأقل للبدء.
          </p>
        )}

        {sessions.length > 0 && (
          <div className="saved-sessions">
            <h3>الجلسات المحفوظة</h3>

            {sessions.map((session) => (
              <div key={session.id} className="session-card">
                <h4>{session.name}</h4>

                <p className="session-players">
                  {session.players.join("، ")}
                </p>

                <div className="session-actions">
                  <button
                    type="button"
                    onClick={() => loadSession(session)}
                    className="use-session-btn"
                  >
                    استخدام
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteSession(session.id)}
                    className="delete-session-btn"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}