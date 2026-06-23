import{MessageCircle,Ban,Heart,Trophy,Palette,Zap}from"lucide-react";
export const games = [
  {
    id: "who-said",
    title: "من قالها؟",
    description: `تخّمن ✅ تكسب نقطة
     تخّمن ❌ يكسب اللي قالها `,
    path: "/games/who-said",
    icon: MessageCircle,
  },

  {
    id: "forbidden-word",
    title: "الكلمة الممنوعة",
    description: "استدرج صاحبك ليقول الكلمة الممنوعة",
    path: "/games/forbidden-word",
    icon: Ban,
  },

  {
    id: "who-knows-me",
    title: "من يعرفني أكثر؟",
    description: "اختبر من يعرفك فعلاً.",
    path: "/games/who-knows-me",
    icon: Heart,
  },

  {
    id: "golden-numbers",
    title: "الأرقام الذهبية",
    description: "اكتشف الأرقام الذهبية قبل الجميع",
    path: "/games/golden-numbers",
    icon: Trophy,
  },

  {
    id: "color-code",
    title: "شفرة الألوان",
    description: "فك الشفرة واكتشف ترتيب الألوان الصحيح",
    path: "/games/color-code",
    icon: Palette,
  },

  {
    id: "quick-challenge",
    title: "جيبها بسرعة",
    description: "اللي يجيبها اسرع يفوز",
    path: "/games/quick-challenge",
    icon: Zap,
  },
];