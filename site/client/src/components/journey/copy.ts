export const journeyCopy = {
  ar: {
    title: "رحلتي", intro: "اكتشف • تعلّم • واصل مغامرتك", welcome: "خطوة صغيرة، واكتشاف يبقى معك",
    map: "خريطة عوالم رحلتي", here: "أنت هنا", available: "متاح للاستكشاف", completed: "أكملت هذه المحطة", locked: "غير متاح الآن", comingSoon: "قريبًا",
    mission: "مهمتي الحالية", continue: "تابع الآن", start: "ابدأ المغامرة", jump: "اذهب إلى مهمتي", next: "عالم آخر يمكنك استكشافه", explore: "استكشف العالم", library: "كل محتوى العالم",
    progress: "خطواتي حتى الآن", stories: "قصص أكملتها", facts: "اكتشافات", stars: "نجوم الحفظ", local: "تقدمك محفوظ على هذا الجهاز", guest: "تستطيع الاستكشاف الآن. اختر ملف طفل لحفظ خطواتك باسمه.", profile: "اختيار الطفل",
    achievements: "إنجازاتي", emptyRewards: "كل تعلّم له قيمة. ستظهر هنا مكافآتك التي اكتسبتها.", treasures: "كنوز الإيمان", ongoing: "رحلتنا مستمرة…", symbolic: "كل اكتشاف بداية لتعلّم جديد", upcoming: "عوالم قادمة بانتظارك", upcomingNote: "ليست مفتوحة بعد — ولا تحتاج إلى نجوم لفتحها.",
    medal: (n: number) => `وسام مرحلة الاكتشاف ${n}`, reopen: "شاهد اكتشافاتي", hifzCount: "سور أعلنت حفظها", count: (n: number, total: number) => `${n} من ${total}`, nextHint: "اختره عندما تحب اكتشاف شيء آخر", rewardLink: "كنوزي مع وليّ الأمر",
  },
  en: {
    title: "My journey", intro: "Discover • Learn • Keep exploring", welcome: "A small step. A discovery to remember.",
    map: "My learning worlds map", here: "You are here", available: "Ready to explore", completed: "World completed", locked: "Not available yet", comingSoon: "Coming soon",
    mission: "My current mission", continue: "Continue now", start: "Start exploring", jump: "Go to my mission", next: "Another world to explore", explore: "Explore this world", library: "All content in this world",
    progress: "My steps so far", stories: "Completed stories", facts: "Discoveries", stars: "Memorization stars", local: "Your progress stays on this device", guest: "You can explore now. Choose a child profile to save their own steps.", profile: "Choose a child",
    achievements: "My achievements", emptyRewards: "Every bit of learning matters. Your earned rewards will appear here.", treasures: "Treasures of faith", ongoing: "Our journey continues…", symbolic: "Every discovery is a new beginning", upcoming: "More worlds await", upcomingNote: "Not open yet — no stars are needed to unlock them.",
    medal: (n: number) => `Discovery stage ${n} medal`, reopen: "My discoveries", hifzCount: "Surahs declared memorized", count: (n: number, total: number) => `${n} of ${total}`, nextHint: "Visit when you feel like exploring something else", rewardLink: "My treasures with a parent",
  },
};
