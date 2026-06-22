import { useState } from "react";
import SEO from "../../components/SEO";
import GroupGameSetup from "../../components/GroupGameSetup";
import { Link } from "react-router-dom";//استيراد مكتبة الرابط

export default function WhoSaidPage() {
  //حالات اللعبة
  const [stage, setStage] = useState("setup"); //اين وصل المستخدم باللعبة
  const [settings, setSettings] = useState(null); // اعدادات اللعبة اللي جات من شاشة اعدادات القروبات
  const [mode, setMode] = useState(""); //اختيار المستخدم كلمة حقيقة موقف
  //حالات اللاعبين
  const [currentPlayer, setCurrentPlayer] = useState(0); //مصفوفة تخزين اللاعبين

  const [answers, setAnswers] = useState([]); //مصفوفة لحفظ محتوى اللعاب

  const [showPassScreen, setShowPassScreen] = useState(false); //هل تظهر شاشة التمرير ام لا

  //حالات التخمين
  const [currentRound, setCurrentRound] = useState(0); // الجولات
  const [currentGuesser, setCurrentGuesser] = useState(0); //اللاعب الذي يخمن حاليا
  const [assignments, setAssignments] = useState([]); //جدول توزيع الجولات
  const [showGuessPassScreen, setShowGuessPassScreen] = useState(true);// هل تظهر شاشة تمرير الجهاز قبل التخمين؟


  //حساب النقاط
  const [scores, setScores] = useState({});

  //بدء اللعبة
  function handleStart(gameSettings) {
    setSettings(gameSettings); //استقبال إعدادات اللعبة القادمة من GroupGameSetup
    setStage("mode"); //يغير مراحل اللعبة
  }

  //دالة تنشئ جدول للمحتوى ومن يراه
  //تستقبل الدالة اللعاب و الجولات
  function createAssignments(players, rounds) {
    // نبعثر اللاعبين حتى لا يعتمد التوزيع على ترتيب الإدخال
    // إنشاء نسخة من مصفوفة اللاعبين ثم بعثرتها عشوائياً
    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

    // مصفوفة فارغة لحفظ جميع الجولات
    const result = [];

    // حلقة إنشاء الجولات
    for (let round = 0; round < rounds; round++) {
      // مصفوفة فارغة للجولة الحالية
      const roundAssignments = [];

      // المرور على جميع اللاعبين المبعثرين
      for (let i = 0; i < shuffledPlayers.length; i++) {
        // إضافة سجل جديد للجولة الحالية
        roundAssignments.push({
          // اللاعب الذي سيخمن
          player: shuffledPlayers[i],

          // صاحب المحتوى الذي سيظهر لهذا اللاعب
          answerOwner:
            shuffledPlayers[(i + round + 1) % shuffledPlayers.length],
        });
      }

      // إضافة الجولة المكتملة إلى جدول الجولات
      result.push(roundAssignments);
    }

    // إرجاع جدول الجولات كاملاً
    // كل جولة تحتوي على اللاعب والمحتوى الذي سيشاهده
    return result;
  }
  //إذا الجولة موجودة خذ العنصر المطلوب،وإذا غير موجودة لا تطلع خطأ
  const currentAssignment = assignments[currentRound]?.[currentGuesser];
  //البحث داخل الانسر الاجابات عن اول عنصر عن طريق اللاعب ويظهر اجابته لان الجدول فيه بس اسماء اللاعب و الذي يشاهده
  const currentAnswerToGuess = answers.find(
    (item) => item.player === currentAssignment?.answerOwner,
  );

// الانتقال للدور التالي
function nextTurn() {
  // إظهار شاشة تمرير الجهاز قبل التخمين التالي
  setShowGuessPassScreen(true);

  // هل يوجد لاعب آخر في نفس الجولة؟
  if (currentGuesser < assignments[currentRound].length - 1) {
    setCurrentGuesser(currentGuesser + 1);
    return;
  }

  // هل توجد جولة أخرى؟
  if (currentRound < settings.rounds - 1) {
    setCurrentRound(currentRound + 1);
    setCurrentGuesser(0);
    return;
  }

  // انتهت اللعبة
  setStage("results");
}

//تنفذ عندما نضغط على احد ازرار الاسم للتخمين
function handleGuess(guessedPlayer) {
  const correctPlayer = currentAssignment?.answerOwner;

  if (!correctPlayer || !currentAssignment?.player) return;

  if (guessedPlayer === correctPlayer) {
    // إذا خمن صح: نقطة للمخمن
    setScores((prev) => ({
      ...prev,
      [currentAssignment.player]:
        (prev[currentAssignment.player] || 0) + 1,
    }));
  } else {
    // إذا خمن خطأ: نقطتين لصاحب المحتوى
    setScores((prev) => ({
      ...prev,
      [correctPlayer]: (prev[correctPlayer] || 0) + 2,
    }));
  }

  nextTurn();
}

//دالة اعادة اللعب
function restartGame() {
  setStage("writing");
  setCurrentPlayer(0);
  setAnswers([]);
  setShowPassScreen(false);

  setCurrentRound(0);
  setCurrentGuesser(0);
  setAssignments([]);
  setScores({});
  setShowGuessPassScreen(true);
}
//ترتيب اللاعبين

//دالة الترتيب للنتائج
const sortedPlayers =
  settings?.players
    ?.map((player) => ({
      name: player,
      score: scores[player] || 0,
    }))
    .sort((a, b) => b.score - a.score) || [];

function getRankIcon(index, player) {
  const topScore = sortedPlayers[0]?.score;

  // جميع المتعادلين بالمركز الأول
  if (player.score === topScore) {
    return "👑";
  }

  // البقية
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";

  return `${index + 1}.`;
}


  return (
    <>
      <SEO
        title="مين قالها"
        description="لعبة جماعية ممتعة تخمنون فيها من صاحب الكلمة أو الحقيقة أو الموقف."
      />

      {/*نختبر المرحلة stage هل هي بالاعدادات او بالنمط او بالكتابة و اذا ما تساوت مع اي حالة فنحن بمرحلة اللعب*/}
      {stage === "setup" ? (
        //اذا مرحلة الاعدادات استدعي المكون اعدادت اللعبة الجماعية و مرر له المعطيات
        <GroupGameSetup
          title="مين قالها"
          description="أدخل أسماء اللاعبين:"
          minPlayers={3}
          maxPlayers={12}
          showRounds={true}
          onStart={handleStart}
        />
      ) : //والا اذا المرحلة النمط اظهر شاشة اختيار انماط اللعب
      stage === "mode" ? (
        <section className="game-setup">
          <h1>اختاروا نمط اللعبة</h1>

          <div className="mode-grid">
            {/*اذا ضغت على هذا الكرت النمط كلمة و المرحلة تنتقل لكتابة المحتوى */}
            <button
              className="mode-card"
              onClick={() => {
                setMode("word");
                setStage("writing");
              }}
            >
              <h2>📝 كلمة</h2>
              <p>اكتب كلمة تعجبك أو تشعر أنها تميزك.</p>
            </button>
            {/*اذا ضغت على هذا الكرت النمط حقيقة و المرحلة تنتقل لكتابة المحتوى */}
            <button
              className="mode-card"
              onClick={() => {
                setMode("fact");
                setStage("writing");
              }}
            >
              <h2>💡 حقيقة</h2>
              <p>اكتب حقيقة عنك مثل: أحب، أكره، أخاف، أغضب.</p>
            </button>
            {/*اذا ضغت على هذا الكرت النمط موقف و المرحلة تنتقل لكتابة المحتوى */}
            <button
              className="mode-card"
              onClick={() => {
                setMode("story");
                setStage("writing");
              }}
            >
              <h2>🎭 موقف</h2>
              <p>اكتب موقفاً شخصياً حدث لك لا يتوقعه الآخرون</p>
            </button>
          </div>
        </section>
      ) : //والا اذا المرحلة كتابة اظهر شاشة ادخال المحتوى
      stage === "writing" ? (
        <section className="game-setup">
          <h1>إدخال المحتوى</h1>

          <div className="setup-card">
            {/*هل قيمته بtrue */}
            {showPassScreen ? (
              <>
                <h2>مرر الجهاز للاعب التالي</h2>
                {/*يعرض اسم اللاعب التالي */}
                <p className="setup-hint">
                  اللاعب التالي: {settings?.players[currentPlayer]}
                </p>
                {/*زر انا جاهز */}
                <button
                  type="button"
                  className="start-game-btn"
                  //عند الضغط على الزر اغير قيمه الشوباس سكرين الى خطا فتختفي شاشة التمرير
                  onClick={() => setShowPassScreen(false)}
                >
                  أنا جاهز
                </button>
              </>
            ) : (
              <>
                {/*اذا قيمة الشو باس سكرين خطا اعرض دور و اللاعب اللحالي مع شاشة للكتابة المحتوى */}
                <h2>دور {settings?.players?.[currentPlayer]}</h2>
                {/*التعليمات تظهر على حسب النمط المختار سابقا */}
                <p className="game-setup-desc">
                  {mode === "word" && "اكتب كلمة تعجبك أو تشعر أنها تميزك."}

                  {mode === "fact" &&
                    "اكتب حقيقة عنك مثل: أحب، أكره، أخاف، أغضب."}

                  {mode === "story" && "اكتب موقفًا حقيقيًا حصل لك."}
                </p>

                <textarea
                  className="answer-input"
                  placeholder="اكتب هنا..."
                  //اذا كان اللاعب كتب سابقا اعرض اجابته او فراغ
                  value={answers[currentPlayer]?.answer || ""}
                  //كل ما كتب المستخدم انشئ نسخة من المصفوفة
                  onChange={(e) => {
                    const updatedAnswers = [...answers];
                    //حفظ محتوى اللاعب
                    //currentPlayer هو الاندكس للاعب
                    updatedAnswers[currentPlayer] = {
                      player: settings.players[currentPlayer], //اسم اللاعب
                      answer: e.target.value, //المحتوى
                    };
                    //يحفظ كل المصفوفة بعد الاضافه كل شوي لاعب و محتواه لاخر لاعب
                    setAnswers(updatedAnswers);
                  }}
                />

                <button
                  type="button"
                  className="start-game-btn"
                  onClick={() => {
                    //خذ اجابة اللاعب الحالي و احذف الفراغات
                    const currentAnswer =
                      answers[currentPlayer]?.answer?.trim();
                    //اذا لا يوجد محتوى لا ترجع شئ لمنع الانتقال اذا لم يكتب شئ
                    if (!currentAnswer) return;

                    //عدداللاعبين هو عدد عناصر المصفوفه بدون صفراي اندكس العنصر الأخير
                    //حتى اختبر فيه باقي لاعب او لا

                    if (currentPlayer < settings.players.length - 1) {
                      setCurrentPlayer(currentPlayer + 1); //حدث العدادللعاب بزيادة واحد يعني انتقل للاعب التالي
                      setShowPassScreen(true); //رجع القيمة لصح عشان تظهر شاشة التمرير
                    } else {
                      const gameAssignments = createAssignments(
                        settings.players,
                        settings.rounds,
                      );
                      //حفظ الجدول
                      setAssignments(gameAssignments);
                      //الانتقال لمرحلة اللعب
                      setStage("playing");
                    }
                  }}
                >
                  التالي
                </button>
              </>
            )}
          </div>
        </section>
      
) : stage === "playing" ? (
  <section className="game-setup">
    <h1>مرحلة اللعب</h1>

    <div className="setup-card">
      {showGuessPassScreen ? (
        <>
          <h2>مرر الجهاز للاعب التالي</h2>

          <p className="setup-hint">
            اللاعب التالي للتخمين: {currentAssignment?.player}
          </p>

          <button
            type="button"
            className="start-game-btn"
            onClick={() => setShowGuessPassScreen(false)}
          >
            أنا جاهز
          </button>
        </>
      ) : (
        <>
          <h2>الجولة {currentRound + 1}</h2>

          <p>دور: {currentAssignment?.player}</p>

          <div className="answer-card">
            <h3>المحتوى</h3>

            <p>{currentAnswerToGuess?.answer}</p>
          </div>

          <h3>مين قالها؟</h3>

          <div className="guess-options">
            {settings.players
              .filter(
                (player) => player !== currentAssignment?.player
              )
              .map((player) => (
                <button
                  key={player}
                  type="button"
                  className="guess-btn"
                  onClick={() => handleGuess(player)}
                >
                  {player}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  </section>
) : (
<section className="game-setup">
  <h1>النتائج النهائية 🏆</h1>

  <div className="setup-card">
    <div className="results-list">
      {sortedPlayers.map((player, index) => (
        <div key={player.name} className="result-row">
          <span>
            {getRankIcon(index, player)} {player.name}
          </span>

          <span>{player.score} نقطة</span>
        </div>
      ))}
    </div>
  </div>

  <div className="result-actions">
    <button
      type="button"
      className="start-game-btn"
      onClick={restartGame}
    >
      🎲 اللعب مرة أخرى
    </button>

    <Link
      to="/games"
      className="secondary-link-btn"
    >
      🎳 جرّب لعبة أخرى
    </Link>
  </div>
</section>
  
)}

    </>
  );
}
