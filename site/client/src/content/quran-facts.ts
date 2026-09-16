// =============================================================================
// quran-facts.ts — "في رحاب القرآن": things worth knowing about the Quran,
// written for a child and turned over one card at a time.
//
// The ayah is kept apart from the prose rather than embedded in it, so it can
// stay in the Uthmani script and read right-to-left even when the rest of the
// card is in English. It is Quran; it is not translated here.
// =============================================================================

export type FactAyah = { text: string; ref: string };

/**
 * Where a card's claim comes from, and how settled it is.
 *
 * The section states a hundred things about the Quran as fact, to children.
 * Some are plainly in an ayah; some are counts; a few are reports scholars
 * differ over. Saying which is which is the difference between a teaching site
 * and a page of trivia, so every card carries its source and one of two marks:
 *
 *   🟢  established by an explicit text, an authentic hadith, or a count we
 *       ran ourselves over the Uthmani text this site serves
 *   🟡  awaiting a scholar's ruling — shown with the disagreement named
 *
 * No card is published as 🟢 on the strength of being widely repeated.
 */
export type FactSource = {
  reliability: "🟢" | "🟡";
  reference: { ar: string; en: string };
  note: { ar: string; en: string };
};

export type QuranFact = {
  /** Shown on the face-down card, and stable across reorderings. */
  number: number;
  slug: string;
  /** A lucide icon name; the page maps it to a component. */
  icon: string;
  title: { ar: string; en: string };
  body: { ar: string; en: string };
  ayahs: FactAyah[];
  source: FactSource;
};

export const quranFacts: QuranFact[] = [
  {
    number: 1,
    slug: "bismillah",
    icon: "BookOpen",
    title: { ar: "سورة بلا بسملة، وسورة ببسملتين", en: "One Surah without it, one with two" },
    body: {
      ar: "سورة «التوبة» هي السورة الوحيدة التي لا تبدأ بـ «بسم الله الرحمن الرحيم». أما سورة «النمل» ففيها بسملتان: واحدة في أولها، والثانية داخل قصة النبي سليمان.",
      en: "Surah At-Tawbah is the only surah that does not open with “Bismillah ir-Rahman ir-Rahim”. Surah An-Naml has two: one at its beginning, and one inside the story of Prophet Sulaiman.",
    },
    ayahs: [
      { text: "إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", ref: "النمل: 30" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة التوبة وسورة النمل: 30", en: "The Quran, Surah At-Tawbah and Surah An-Naml: 30" },
      note: { ar: "الأمران يُريان في المصحف نفسه: التوبة وحدها تبدأ بلا بسملة، والنمل فيها بسملة ثانية داخل الآية 30.", en: "Both are visible in the mushaf itself: At-Tawbah alone opens without the basmala, and An-Naml carries a second one inside verse 30." },
    },
  },
  {
    number: 2,
    slug: "egypt",
    icon: "MapPin",
    title: { ar: "مصر في القرآن", en: "Egypt in the Quran" },
    body: {
      ar: "اسم «مصر» ذُكر صراحةً في القرآن الكريم خمس مرات. منها ترحيب الله بنبيه يعقوب وعائلته حين دخلوها.",
      en: "The name “Misr” — Egypt — is named outright in the Quran five times. One of them welcomes Prophet Yaqub and his family as they arrive.",
    },
    ayahs: [
      { text: "وَقَالَ ادْخُلُوا مِصْرَ إِن شَاءَ اللَّهُ آمِنِينَ", ref: "يوسف: 99" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — يونس: 87، يوسف: 21 و99، الزخرف: 51، البقرة: 61", en: "Counted in the Uthmani text — Yunus: 87, Yusuf: 21 and 99, Az-Zukhruf: 51, Al-Baqarah: 61" },
      note: { ar: "عددنا المواضع في النص الذي يعرضه الموقع نفسه فكانت خمسة.", en: "We counted the occurrences in the text this site itself serves: five." },
    },
  },
  {
    number: 3,
    slug: "sajdah",
    icon: "Star",
    title: { ar: "خمسة عشر موضعاً للسجود", en: "Fifteen places to prostrate" },
    body: {
      ar: "في المصحف الذي بين أيدينا خمسة عشر موضعاً معلَّماً، إذا قرأناها سجدنا لله تعالى، وتُسمى سجدات التلاوة. وسورة «الحج» مميزة لأن فيها سجدتين!",
      en: "The mushaf we read marks fifteen places where a reader prostrates — the prostrations of recitation. Surah Al-Hajj stands out: it has two of them.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "مصحف المدينة النبوية — المواضع المعلَّمة فيه", en: "The Madinah mushaf — the places marked in it" },
      note: { ar: "العدد هنا هو ما يعلّمه مصحف المدينة، والبطاقة تقوله على هذا الوجه. وبعض المذاهب تعدّها أربعة عشر ولا تعدّ موضع «ص» سجدة تلاوة بل سجدة شكر.", en: "The number is the one the Madinah mushaf marks, and the card says it on that footing. Some schools count fourteen, treating the place in Surah Sad as a prostration of thanks rather than of recitation." },
    },
  },
  {
    number: 4,
    slug: "times",
    icon: "Clock",
    title: { ar: "سور سُمّيت بأسماء الأوقات", en: "Surahs named after times of day" },
    body: {
      ar: "سمّى الله بعض السور بأسماء الأوقات ليذكّرنا بأهمية الوقت: الفجر، والضحى، والليل، والعصر التي تبدأ بقسم عظيم.",
      en: "Some surahs are named after moments of the day, a reminder of how much time matters: Al-Fajr (dawn), Ad-Duha (morning), Al-Layl (night), and Al-Asr, which opens with a great oath.",
    },
    ayahs: [
      { text: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", ref: "العصر: 1-2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "أسماء السور في المصحف — الفجر، الضحى، الليل، العصر", en: "Surah names in the mushaf — Al-Fajr, Ad-Duha, Al-Layl, Al-Asr" },
      note: { ar: "أسماء السور كما هي مثبتة في المصحف، والقسم في أول العصر بنص السورة.", en: "The surah names as written in the mushaf, and the oath opening Al-Asr is the surah's own words." },
    },
  },
  {
    number: 5,
    slug: "cosmos",
    icon: "Moon",
    title: { ar: "الشمس والقمر والنجم", en: "The sun, the moon and the star" },
    body: {
      ar: "القرآن مليء بأسماء الظواهر الكونية العظيمة، فهناك سور كاملة تحمل أسماء: الشمس، والقمر، والنجم.",
      en: "The Quran is full of the great things in the sky — whole surahs carry their names: The Sun, The Moon, and The Star.",
    },
    ayahs: [
      { text: "وَالشَّمْسِ وَضُحَاهَا ۝ وَالْقَمَرِ إِذَا تَلَاهَا", ref: "الشمس: 1-2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "أسماء السور في المصحف — الشمس، القمر، النجم", en: "Surah names in the mushaf — Ash-Shams, Al-Qamar, An-Najm" },
      note: { ar: "ثلاث سور تحمل هذه الأسماء في المصحف.", en: "Three surahs carry these names in the mushaf." },
    },
  },
  {
    number: 6,
    slug: "birds",
    icon: "Bird",
    title: { ar: "طيور ذكية بمهام عظيمة", en: "Clever birds with real work to do" },
    body: {
      ar: "ذكر القرآن طيوراً قامت بأعمال مهمة: الغراب الذي علّم الإنسان الأول، والهدهد الذي اكتشف مملكة سبأ.",
      en: "The Quran names birds that did important work: the crow that taught the first human, and the hoopoe that discovered the Kingdom of Sheba.",
    },
    ayahs: [
      { text: "وَتَفَقَّدَ الطَّيْرَ فَقَالَ مَا لِيَ لَا أَرَى الْهُدْهُدَ أَمْ كَانَ مِنَ الْغَائِبِينَ", ref: "النمل: 20" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النمل: 20-22 وسورة المائدة: 31", en: "The Quran, Surah An-Naml: 20-22 and Surah Al-Ma'idah: 31" },
      note: { ar: "الهدهد في قصة سليمان، والغراب في قصة ابني آدم، كلاهما بنص الآيات.", en: "The hoopoe in Sulaiman's account and the crow in the account of Adam's two sons, both in the words of the verses." },
    },
  },
  {
    number: 7,
    slug: "minerals",
    icon: "Gem",
    title: { ar: "معادن وأحجار كريمة", en: "Metals and precious stones" },
    body: {
      ar: "ذكر القرآن الكريم معادن وأحجاراً ما زلنا نستخدمها حتى اليوم: الذهب، والفضة، والحديد، واللؤلؤ، والمرجان.",
      en: "The Quran names metals and stones we still use today: gold, silver, iron, pearls and coral.",
    },
    ayahs: [
      { text: "يَخْرُجُ مِنْهُمَا اللُّؤْلُؤُ وَالْمَرْجَانُ", ref: "الرحمن: 22" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الرحمن: 22، الحديد: 25، التوبة: 34", en: "The Quran, Ar-Rahman: 22, Al-Hadid: 25, At-Tawbah: 34" },
      note: { ar: "اللؤلؤ والمرجان في الرحمن، والحديد في سورته، والذهب والفضة في التوبة.", en: "Pearl and coral in Ar-Rahman, iron in the surah named for it, gold and silver in At-Tawbah." },
    },
  },
  {
    number: 8,
    slug: "paradise-clothes",
    icon: "Shirt",
    title: { ar: "ملابس أهل الجنة", en: "What the people of Paradise wear" },
    body: {
      ar: "أخبرنا القرآن أن ملابس أهل الجنة من أفخر أنواع القماش: الحرير، والسندس، والإستبرق.",
      en: "The Quran tells us the people of Paradise wear the finest cloth there is: silk, sundus and istabraq.",
    },
    ayahs: [
      { text: "وَيَلْبَسُونَ ثِيَابًا خُضْرًا مِّن سُندُسٍ وَإِسْتَبْرَقٍ", ref: "الكهف: 31" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 31", en: "The Quran, Surah Al-Kahf: 31" },
      note: { ar: "أسماء الأقمشة الثلاثة مذكورة بنص الآية.", en: "The three fabrics are named in the words of the verse." },
    },
  },
  {
    number: 9,
    slug: "colours",
    icon: "Palette",
    title: { ar: "ألوان في القرآن", en: "Colours in the Quran" },
    body: {
      ar: "ذكر القرآن الكريم كثيراً من الألوان: الأبيض، والأسود، والأحمر، والأخضر، والأزرق، والأصفر — كما في قصة البقرة العجيبة.",
      en: "The Quran names many colours: white, black, red, green, blue and yellow — as in the story of the remarkable cow.",
    },
    ayahs: [
      { text: "إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ النَّاظِرِينَ", ref: "البقرة: 69" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، البقرة: 69، فاطر: 27، الرحمن: 76، طه: 102، آل عمران: 106", en: "The Quran, Al-Baqarah: 69, Fatir: 27, Ar-Rahman: 76, Ta-Ha: 102, Aal-Imran: 106" },
      note: { ar: "كل لون مذكور بنصّه في آية، والصفراء في قصة البقرة.", en: "Each colour is named in a verse, the yellow one inside the account of the cow." },
    },
  },
  {
    number: 10,
    slug: "first-and-last",
    icon: "Sparkles",
    title: { ar: "أول ما نزل، ومن آخر ما نزل", en: "The first revealed, and among the last" },
    body: {
      ar: "أول ما نزل من القرآن أمرَ بالعلم والقراءة. ومن آخر ما نزل آيةٌ تذكّرنا بالعودة إلى الله — وللعلماء أقوال في أيّها آخرها.",
      en: "The first thing revealed of the Quran commanded learning and reading. Among the last to come down is a verse reminding us of the return to Allah — and scholars report more than one answer for which was truly last.",
    },
    ayahs: [
      { text: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", ref: "العلق: 1" },
      { text: "وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ", ref: "البقرة: 281" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (3) وصحيح مسلم (160)؛ والبقرة: 281 عن ابن عباس", en: "Sahih al-Bukhari (3) and Sahih Muslim (160); and Al-Baqarah 281 from Ibn Abbas" },
      note: { ar: "أن أول ما نزل ﴿اقْرَأْ﴾ ثابت في الصحيحين. وأما آخر ما نزل فأقوال، أشهرها البقرة: 281 عن ابن عباس، وقيل آية الدَّين — ولهذا قالت البطاقة «من آخر ما نزل» ولم تجزم.", en: "That the first revelation was Iqra is established in both Sahihs. What came last is reported several ways, the best known being Al-Baqarah 281 from Ibn Abbas, with the verse of debt also named — which is why the card says among the last rather than claiming certainty." },
    },
  },
  {
    number: 11,
    slug: "longest-shortest",
    icon: "Ruler",
    title: { ar: "أطول سورة وأقصر سورة", en: "The longest surah and the shortest" },
    body: {
      ar: "أطول سورة في القرآن هي «البقرة»، وأقصر سورة هي «الكوثر» ولا تتكوّن إلا من ثلاث آيات.",
      en: "The longest surah in the Quran is Al-Baqarah. The shortest is Al-Kawthar — just three verses.",
    },
    ayahs: [
      { text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", ref: "الكوثر: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — البقرة والكوثر", en: "Counted in the mushaf — Al-Baqarah and Al-Kawthar" },
      note: { ar: "البقرة أطول سورة بالاتفاق. والكوثر ثلاث آيات وهي أقلّ السور كلمات وحروفًا، وإن شاركتها العصر والنصر في عدد الآيات.", en: "Al-Baqarah is the longest by agreement. Al-Kawthar's three verses are the fewest in words and letters, though Al-Asr and An-Nasr share its verse count." },
    },
  },
  {
    number: 12,
    slug: "middle-word",
    icon: "AlignCenter",
    title: { ar: "كلمة واحدة اسمها اللطف", en: "One word, and it means gentleness" },
    body: {
      ar: "فتية الكهف لما أرسلوا واحداً منهم يشتري طعاماً، أوصوه بكلمة واحدة: ﴿وَلْيَتَلَطَّفْ﴾ — أي ليكن لطيفاً في كلامه ومشيه وتعامله، حتى لا يؤذيه أحد ولا يؤذي أحداً.",
      en: "When the young men of the cave sent one of them to buy food, they gave him a single instruction: walyatalattaf — let him be gentle. Gentle in what he says, how he walks, how he deals with people, so that no harm comes to him or from him.",
    },
    ayahs: [
      { text: "وَلْيَتَلَطَّفْ", ref: "الكهف: 19" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 19", en: "The Quran, Surah Al-Kahf: 19" },
      note: { ar: "الوصية بنص الآية. وكانت البطاقة تقول إن الكلمة في منتصف القرآن تماماً، وهو قول مذكور في كتب علوم القرآن بلا إسناد ولا يوافقه العدّ، فحُذف وبقي ما في الآية.", en: "The instruction is the verse's own words. The card used to say the word sits exactly at the Quran's midpoint — a claim found in the classical literature without a chain, and one counting does not bear out, so it was removed and what the verse says was kept." },
    },
  },
  {
    number: 13,
    slug: "al-mujadilah",
    icon: "BookOpen",
    title: { ar: "سورة اسم الله في كل آية", en: "The surah that names Allah in every verse" },
    body: {
      ar: "سورة «المجادلة» هي السورة الوحيدة في القرآن التي ذُكر فيها اسم «الله» في كل آية من آياتها.",
      en: "Surah Al-Mujadilah is the only surah in which the name of Allah appears in every single verse.",
    },
    ayahs: [
      { text: "قَدْ سَمِعَ اللَّهُ قَوْلَ الَّتِي تُجَادِلُكَ فِي زَوْجِهَا", ref: "المجادلة: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — سورة المجادلة", en: "Counted in the Uthmani text — Surah Al-Mujadilah" },
      note: { ar: "عددنا آيات السورة الاثنتين والعشرين في النص الذي يعرضه الموقع، فوجدنا لفظ الجلالة في كل آية منها.", en: "We checked all twenty-two verses in the text this site serves and found the name of Allah in every one." },
    },
  },
  {
    number: 14,
    slug: "the-challenge",
    icon: "Shield",
    title: { ar: "التحدي الذي لم يُجَب", en: "A challenge no one could meet" },
    body: {
      ar: "تحدّى الله الإنس والجن أن يأتوا بكتاب مثل القرآن، أو حتى بسورة واحدة مثله، فلم يستطيعوا.",
      en: "Allah challenged humans and jinn together to bring a book like the Quran — or even one surah like it. They never could.",
    },
    ayahs: [
      { text: "قُل لَّئِنِ اجْتَمَعَتِ الْإِنسُ وَالْجِنُّ عَلَىٰ أَن يَأْتُوا بِمِثْلِ هَٰذَا الْقُرْآنِ لَا يَأْتُونَ بِمِثْلِهِ", ref: "الإسراء: 88" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الإسراء: 88", en: "The Quran, Surah Al-Isra: 88" },
      note: { ar: "التحدي بنص الآية، ومثله في البقرة: 23 ويونس: 38.", en: "The challenge is in the words of the verse, and again at Al-Baqarah 23 and Yunus 38." },
    },
  },
  {
    number: 15,
    slug: "cave-years",
    icon: "Hourglass",
    title: { ar: "ثلاثمائة سنة… وتسع", en: "Three hundred years, and nine" },
    body: {
      ar: "ذكر القرآن مدة نوم أصحاب الكهف بدقة عجيبة: ثلاثمائة سنة شمسية، وهي تساوي بالضبط 309 سنوات قمرية.",
      en: "The Quran gives the sleep of the People of the Cave with striking precision: three hundred solar years, which is exactly 309 lunar years.",
    },
    ayahs: [
      { text: "وَلَبِثُوا فِي كَهْفِهِمْ ثَلَاثَ مِائَةٍ سِنِينَ وَازْدَادُوا تِسْعًا", ref: "الكهف: 25" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 25", en: "The Quran, Surah Al-Kahf: 25" },
      note: { ar: "العدد بنص الآية، والفرق بين الشمسي والقمري حساب صحيح: ثلاثمائة سنة شمسية تساوي 309 قمرية، وهو تفسير جمهور المفسرين للزيادة.", en: "The number is in the verse itself, and the solar-to-lunar arithmetic holds: three hundred solar years are 309 lunar ones, which is how most commentators read the addition." },
    },
  },
  {
    number: 16,
    slug: "al-ikhlas",
    icon: "Heart",
    title: { ar: "ثلث القرآن في أربع آيات", en: "A third of the Quran in four verses" },
    body: {
      ar: "قراءة سورة «الإخلاص» على قِصرها تعدل في أجرها ثلث القرآن الكريم، لأنها تتحدث عن صفات الله الواحد.",
      en: "Reciting Surah Al-Ikhlas, short as it is, carries the reward of a third of the Quran — because it is about who Allah is.",
    },
    ayahs: [
      { text: "قُلْ هُوَ اللَّهُ أَحَدٌ", ref: "الإخلاص: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (5013) وصحيح مسلم (811)", en: "Sahih al-Bukhari (5013) and Sahih Muslim (811)" },
      note: { ar: "حديث صحيح متفق عليه: «إنها لتعدل ثلث القرآن».", en: "An authentic hadith agreed upon by both: it equals a third of the Quran." },
    },
  },
  {
    number: 17,
    slug: "al-mulk",
    icon: "ShieldCheck",
    title: { ar: "سورة تشفع لصاحبها", en: "The surah that speaks for its reader" },
    body: {
      ar: "سورة «الملك» ثلاثون آية فقط، وتشفع لصاحبها يوم القيامة وتحميه.",
      en: "Surah Al-Mulk is only thirty verses, and it intercedes for the one who reads it on the Day of Judgement.",
    },
    ayahs: [
      { text: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", ref: "الملك: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "سنن أبي داود (1400) وسنن الترمذي (2891) — حديث حسن", en: "Sunan Abi Dawud (1400) and Sunan at-Tirmidhi (2891) — a hasan hadith" },
      note: { ar: "الحديث حسّنه الترمذي: سورة ثلاثون آية شفعت لرجل حتى غُفر له. درجته حسن لا صحيح، وهذا مذكور هنا كما هو.", en: "Graded hasan by at-Tirmidhi: a surah of thirty verses interceded for a man until he was forgiven. Hasan rather than sahih, and that is stated here as it stands." },
    },
  },
  {
    number: 18,
    slug: "yusuf-complete",
    icon: "ScrollText",
    title: { ar: "القصة الوحيدة الكاملة", en: "The one story told all at once" },
    body: {
      ar: "قصة النبي يوسف عليه السلام هي القصة الوحيدة في القرآن التي ذُكرت كاملة من البداية إلى النهاية في سورة واحدة.",
      en: "The story of Prophet Yusuf is the only one in the Quran told from beginning to end inside a single surah.",
    },
    ayahs: [
      { text: "نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ", ref: "يوسف: 3" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف: 3", en: "The Quran, Surah Yusuf: 3" },
      note: { ar: "وصف يُرى في المصحف نفسه: القصة كاملة في سورة واحدة، والآية تسمّيها «أحسن القصص».", en: "A description anyone can see in the mushaf: the whole account sits in one surah, which the verse calls the best of accounts." },
    },
  },
  {
    number: 19,
    slug: "animals",
    icon: "PawPrint",
    title: { ar: "حيوانات في القرآن", en: "Animals in the Quran" },
    body: {
      ar: "ذكر القرآن حيوانات كثيرة، منها الذئب والكلب والخيل. والذئب ذُكر في قصة يوسف على لسان إخوته.",
      en: "The Quran names many animals — among them the wolf, the dog and horses. The wolf appears in the story of Yusuf, in what his brothers claimed.",
    },
    ayahs: [
      { text: "فَأَكَلَهُ الذِّئْبُ", ref: "يوسف: 17" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف: 17", en: "The Quran, Surah Yusuf: 17" },
      note: { ar: "الذئب بنص الآية على لسان إخوة يوسف، والكلب في الكهف: 18، والخيل في النحل: 8.", en: "The wolf is in the words of the verse, spoken by Yusuf's brothers; the dog is at Al-Kahf 18 and the horses at An-Nahl 8." },
    },
  },
  {
    number: 20,
    slug: "yaqteen",
    icon: "Sprout",
    title: { ar: "النبتة التي أظلّت يونس", en: "The plant that shaded Yunus" },
    body: {
      ar: "ذكر القرآن نبات «اليقطين»، وهو النبات اللطيف الذي أنبته الله ليحمي النبي يونس بعد خروجه من بطن الحوت.",
      en: "The Quran names the yaqteen — the gourd plant Allah grew to shelter Prophet Yunus after he came out of the whale.",
    },
    ayahs: [
      { text: "وَأَنبَتْنَا عَلَيْهِ شَجَرَةً مِّن يَقْطِينٍ", ref: "الصافات: 146" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الصافات: 146", en: "The Quran, Surah As-Saffat: 146" },
      note: { ar: "اسم النبتة بنص الآية.", en: "The plant is named in the verse itself." },
    },
  },
  {
    number: 21,
    slug: "muqattaat",
    icon: "Type",
    title: { ar: "الحروف التي في أول السور", en: "The letters that open a surah" },
    body: {
      ar: "تسع وعشرون سورة تبدأ بحروف تُسمّى «الحروف المقطّعة» مثل (الم) و(حم). وهي تحدٍّ من الله: القرآن مبنيّ من الحروف نفسها التي يتكلّم بها الناس، ومع ذلك لا يستطيعون أن يأتوا بمثله.",
      en: "Twenty-nine surahs open with letters called al-muqatta'at, like Alif-Lam-Mim. They are a challenge: the Quran is built from the very letters people speak with, and still no one can produce its like.",
    },
    ayahs: [
      { text: "الم ۝ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ", ref: "البقرة: 1-2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — 29 سورة", en: "Counted in the mushaf — 29 surahs" },
      note: { ar: "عددنا السور التي تفتتح بالحروف المقطّعة في النص الذي يعرضه الموقع فكانت تسعًا وعشرين.", en: "We counted the surahs opening with the disjointed letters in the text this site serves: twenty-nine." },
    },
  },
  {
    number: 22,
    slug: "alhamdulillah",
    icon: "Heart",
    title: { ar: "خمس سور تبدأ بالحمد", en: "Five surahs that open with praise" },
    body: {
      ar: "خمس سور في القرآن تبدأ بـ «الحمد لله»: الفاتحة، والأنعام، والكهف، وسبأ، وفاطر — لتعلّمنا أن نشكر الله دائماً.",
      en: "Five surahs open with “Alhamdulillah”: Al-Fatihah, Al-An'am, Al-Kahf, Saba' and Fatir — teaching us to thank Allah first.",
    },
    ayahs: [
      { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", ref: "الفاتحة: 2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — الفاتحة والأنعام والكهف وسبأ وفاطر", en: "Counted in the mushaf — Al-Fatihah, Al-An'am, Al-Kahf, Saba and Fatir" },
      note: { ar: "أربع سور تبدأ بها أول آياتها، والفاتحة تبدأ بها بعد البسملة التي هي آيتها الأولى.", en: "Four surahs open their first verse with it; Al-Fatihah opens with it after the basmala, which is its own first verse." },
    },
  },
  {
    number: 23,
    slug: "qul",
    icon: "MessageCircle",
    title: { ar: "خمس سور تبدأ بـ «قل»", en: "Five surahs that begin with “Say”" },
    body: {
      ar: "خمس سور تبدأ بكلمة «قل»: الجن، والكافرون، والإخلاص، والفلق، والناس.",
      en: "Five surahs begin with the word “Qul” — Say: Al-Jinn, Al-Kafirun, Al-Ikhlas, Al-Falaq and An-Nas.",
    },
    ayahs: [
      { text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", ref: "الناس: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — الجن والكافرون والإخلاص والفلق والناس", en: "Counted in the mushaf — Al-Jinn, Al-Kafirun, Al-Ikhlas, Al-Falaq and An-Nas" },
      note: { ar: "عددنا السور التي أول كلمة فيها ﴿قُلْ﴾ فكانت خمسًا.", en: "We counted the surahs whose first word is Qul: five." },
    },
  },
  {
    number: 24,
    slug: "prophet-surahs",
    icon: "Users",
    title: { ar: "ست سور بأسماء أنبياء", en: "Six surahs named after prophets" },
    body: {
      ar: "ست سور في القرآن سُمّيت بأسماء أنبياء: يونس، وهود، ويوسف، وإبراهيم، ومحمد، ونوح.",
      en: "Six surahs carry a prophet's name: Yunus, Hud, Yusuf, Ibrahim, Muhammad and Nuh.",
    },
    ayahs: [
      { text: "إِنَّا أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ", ref: "نوح: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "أسماء السور في المصحف — يونس وهود ويوسف وإبراهيم ومحمد ونوح", en: "Surah names in the mushaf — Yunus, Hud, Yusuf, Ibrahim, Muhammad and Nuh" },
      note: { ar: "ستة أسماء أنبياء تحملها سور في المصحف.", en: "Six surahs in the mushaf carry the names of prophets." },
    },
  },
  {
    number: 25,
    slug: "vegetables",
    icon: "Carrot",
    title: { ar: "خضروات على مائدة القرآن", en: "Vegetables the Quran names" },
    body: {
      ar: "ذكر القرآن خضروات نأكلها حتى اليوم: البصل، والفوم (الثوم)، والعدس، والقِثّاء (الخيار) — في قصة بني إسرائيل.",
      en: "The Quran names vegetables still on our tables: onions, garlic, lentils and cucumbers — in the story of the Children of Israel.",
    },
    ayahs: [
      { text: "يُخْرِجْ لَنَا مِمَّا تُنبِتُ الْأَرْضُ مِن بَقْلِهَا وَقِثَّائِهَا وَفُومِهَا وَعَدَسِهَا وَبَصَلِهَا", ref: "البقرة: 61" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 61", en: "The Quran, Surah Al-Baqarah: 61" },
      note: { ar: "أسماء الخضروات الأربعة بنص الآية.", en: "The four are named in the words of the verse." },
    },
  },
  {
    number: 26,
    slug: "abu-lahab",
    icon: "Flame",
    title: { ar: "الوحيد الذي ذُكر بكنيته", en: "The only one named by his nickname" },
    body: {
      ar: "لم يذكر القرآن أحداً من أعداء النبي ﷺ بكنيته إلا «أبا لهب»، وتوعّده الله بالنار في سورة المسد وهو ما زال حياً.",
      en: "Of all those who opposed the Prophet ﷺ, only Abu Lahab is named in the Quran by his nickname — and Surah Al-Masad foretold his end while he was still alive.",
    },
    ayahs: [
      { text: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", ref: "المسد: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة المسد", en: "The Quran, Surah Al-Masad" },
      note: { ar: "السورة كلها في أبي لهب بكنيته، وليس في القرآن كنية لأحد من أعداء النبي ﷺ غيره.", en: "The whole surah names Abu Lahab by his kunya, and no other opponent of the Prophet ﷺ is named that way in the Quran." },
    },
  },
  {
    number: 27,
    slug: "angels",
    icon: "Feather",
    title: { ar: "ملائكة ذُكرت بأسمائها", en: "Angels named outright" },
    body: {
      ar: "ذكر القرآن أسماء بعض الملائكة صراحةً: جبريل، وميكائيل، ومالك.",
      en: "A few angels are named outright in the Quran: Jibril, Mikail and Malik.",
    },
    ayahs: [
      { text: "مَن كَانَ عَدُوًّا لِّلَّهِ وَمَلَائِكَتِهِ وَرُسُلِهِ وَجِبْرِيلَ وَمِيكَالَ", ref: "البقرة: 98" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، البقرة: 98 والزخرف: 77", en: "The Quran, Al-Baqarah: 98 and Az-Zukhruf: 77" },
      note: { ar: "جبريل وميكال في البقرة، ومالك في الزخرف، كلها بنص الآيات.", en: "Jibril and Mikal in Al-Baqarah, Malik in Az-Zukhruf, all in the words of the verses." },
    },
  },
  {
    number: 28,
    slug: "dunya-akhirah",
    icon: "Scale",
    title: { ar: "توازن عجيب في الأرقام", en: "A balance you can count" },
    body: {
      ar: "في القرآن توازن رقمي لافت: كلمة «الدنيا» تكرّرت 115 مرة، وكلمة «الآخرة» تكرّرت 115 مرة بالضبط.",
      en: "There is a striking balance in the Quran's numbers: the word “dunya” — this world — appears 115 times, and “akhirah” — the hereafter — appears exactly 115 times too.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — 115 و115", en: "Counted in the Uthmani text — 115 and 115" },
      note: { ar: "عددنا الكلمتين بأنفسنا في النص الذي يعرضه الموقع: «الدنيا» 115 مرة، و«الآخرة» بصورها كلها (الآخرة، والآخرة، بالآخرة، للآخرة) 115 مرة. وهو توازن لافت في اللفظ، لا يُبنى عليه حكم.", en: "We counted both words in the text this site serves: ad-dunya 115 times, and al-akhirah in all its forms 115 times. It is a striking balance in wording, and nothing is built on it." },
    },
  },
  {
    number: 29,
    slug: "preserved",
    icon: "Lock",
    title: { ar: "كتاب تعهّد الله بحفظه", en: "A book Allah promised to keep" },
    body: {
      ar: "القرآن هو الكتاب الوحيد الذي تعهّد الله بحفظه من أي تغيير إلى يوم القيامة.",
      en: "The Quran is the one book Allah promised to preserve from any change, until the Day of Judgement.",
    },
    ayahs: [
      { text: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", ref: "الحجر: 9" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الحجر: 9", en: "The Quran, Surah Al-Hijr: 9" },
      note: { ar: "التعهّد بالحفظ بنص الآية.", en: "The promise of preservation is the verse's own words." },
    },
  },
  {
    number: 30,
    slug: "drinks",
    icon: "Droplet",
    title: { ar: "أطيب المشروبات", en: "The best things to drink" },
    body: {
      ar: "ذكر القرآن أطيب المشروبات وأنفعها: الماء، واللبن، والعسل الذي فيه شفاء للناس.",
      en: "The Quran names the best drinks there are: water, milk, and honey — in which there is healing for people.",
    },
    ayahs: [
      { text: "يَخْرُجُ مِن بُطُونِهَا شَرَابٌ مُّخْتَلِفٌ أَلْوَانُهُ فِيهِ شِفَاءٌ لِّلنَّاسِ", ref: "النحل: 69" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النحل: 69", en: "The Quran, Surah An-Nahl: 69" },
      note: { ar: "العسل وشفاؤه بنص الآية، واللبن في النحل: 66، والماء في الأنبياء: 30.", en: "Honey and its healing are in the verse itself; milk at An-Nahl 66 and water at Al-Anbiya 30." },
    },
  },
  {
    number: 31,
    slug: "holy-cities",
    icon: "Landmark",
    title: { ar: "مدن ذكرها القرآن بأسمائها", en: "Cities the Quran names" },
    body: {
      ar: "ذكر القرآن مكة باسم «بكة»، والمدينة المنورة باسمها القديم «يثرب».",
      en: "The Quran calls Mecca “Bakkah”, and names Medina by the name it carried before — “Yathrib”.",
    },
    ayahs: [
      { text: "يَا أَهْلَ يَثْرِبَ لَا مُقَامَ لَكُمْ فَارْجِعُوا", ref: "الأحزاب: 13" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، آل عمران: 96 والأحزاب: 13", en: "The Quran, Aal-Imran: 96 and Al-Ahzab: 13" },
      note: { ar: "«بكة» في آل عمران و«يثرب» في الأحزاب، كلاهما بنص الآية.", en: "Bakkah in Aal-Imran and Yathrib in Al-Ahzab, each in the words of its verse." },
    },
  },
  {
    number: 32,
    slug: "earlier-books",
    icon: "Library",
    title: { ar: "كتب نزلت قبل القرآن", en: "The books that came before" },
    body: {
      ar: "ذكر القرآن الكتب السماوية التي سبقته: التوراة، والإنجيل، والزبور، وصحف إبراهيم وموسى.",
      en: "The Quran names the revelations that came before it: the Torah, the Injeel, the Zabur, and the scriptures of Ibrahim and Musa.",
    },
    ayahs: [
      { text: "صُحُفِ إِبْرَاهِيمَ وَمُوسَىٰ", ref: "الأعلى: 19" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعلى: 19 والنساء: 163 والمائدة: 46", en: "The Quran, Al-A'la: 19, An-Nisa: 163 and Al-Ma'idah: 46" },
      note: { ar: "صحف إبراهيم وموسى في الأعلى، والزبور في النساء، والإنجيل والتوراة في المائدة.", en: "The scriptures of Ibrahim and Musa in Al-A'la, the Zabur in An-Nisa, the Injil and Tawrat in Al-Ma'idah." },
    },
  },
  {
    number: 33,
    slug: "insects",
    icon: "Bug",
    title: { ar: "دروس كبيرة من حشرات صغيرة", en: "Big lessons from small insects" },
    body: {
      ar: "ضرب القرآن أمثالاً بأصغر المخلوقات ليعلّمنا أكبر الدروس، كالذبابة والبعوضة.",
      en: "The Quran draws its lessons from the smallest creatures there are — the fly and the mosquito among them.",
    },
    ayahs: [
      { text: "إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا", ref: "البقرة: 26" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، البقرة: 26 والحج: 73", en: "The Quran, Al-Baqarah: 26 and Al-Hajj: 73" },
      note: { ar: "البعوضة مثلًا في البقرة، والذباب مثلًا في الحج.", en: "The gnat is the example in Al-Baqarah, the fly in Al-Hajj." },
    },
  },
  {
    number: 34,
    slug: "ayat-al-kursi",
    icon: "Crown",
    title: { ar: "أعظم آية في القرآن", en: "The greatest verse in the Quran" },
    body: {
      ar: "أعظم آية في القرآن هي «آية الكرسي» في سورة البقرة، ومن قرأها كانت له حفظاً.",
      en: "The greatest verse in the Quran is Ayat al-Kursi, in Surah Al-Baqarah. Whoever reads it is kept safe by it.",
    },
    ayahs: [
      { text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", ref: "البقرة: 255" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح مسلم (810) وصحيح البخاري (2311)", en: "Sahih Muslim (810) and Sahih al-Bukhari (2311)" },
      note: { ar: "أنها أعظم آية ثابت في مسلم من حديث أُبيّ بن كعب، وأنها حفظ لقارئها ثابت في البخاري.", en: "That it is the greatest verse is in Muslim from Ubayy ibn Ka'b; that it guards its reciter is in al-Bukhari." },
    },
  },
  {
    number: 35,
    slug: "isti-adha",
    icon: "ShieldCheck",
    title: { ar: "ماذا نقول قبل القراءة؟", en: "What to say before you read" },
    body: {
      ar: "أمرنا الله أن نستعيذ به من الشيطان الرجيم قبل أن نبدأ قراءة القرآن.",
      en: "Before opening the Quran we are told to seek refuge in Allah from the outcast Satan.",
    },
    ayahs: [
      { text: "فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", ref: "النحل: 98" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النحل: 98", en: "The Quran, Surah An-Nahl: 98" },
      note: { ar: "الأمر بالاستعاذة بنص الآية.", en: "The command to seek refuge is the verse's own words." },
    },
  },
  {
    number: 36,
    slug: "ancient-nations",
    icon: "Mountain",
    title: { ar: "أمم قديمة جداً", en: "Nations from long ago" },
    body: {
      ar: "ذكر القرآن أسماء أمم وقبائل قديمة: عاد، وثمود، ويأجوج ومأجوج.",
      en: "The Quran names nations from the deep past: 'Aad, Thamud, and Gog and Magog.",
    },
    ayahs: [
      { text: "حَتَّىٰ إِذَا فُتِحَتْ يَأْجُوجُ وَمَأْجُوجُ وَهُم مِّن كُلِّ حَدَبٍ يَنسِلُونَ", ref: "الأنبياء: 96" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الفجر: 6-9 والأنبياء: 96", en: "The Quran, Al-Fajr: 6-9 and Al-Anbiya: 96" },
      note: { ar: "عاد وثمود في الفجر، ويأجوج ومأجوج في الأنبياء.", en: "Ad and Thamud in Al-Fajr, Yajuj and Majuj in Al-Anbiya." },
    },
  },
  {
    number: 37,
    slug: "tyrants",
    icon: "Flame",
    title: { ar: "طغاة حذّرنا منهم القرآن", en: "The tyrants the Quran warns about" },
    body: {
      ar: "حذّرنا القرآن من طغاة تكبّروا في الأرض فعاقبهم الله: فرعون، وهامان، وقارون.",
      en: "The Quran warns of those who grew arrogant on the earth and were brought down: Pharaoh, Haman and Qarun.",
    },
    ayahs: [
      { text: "وَقَارُونَ وَفِرْعَوْنَ وَهَامَانَ", ref: "العنكبوت: 39" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة العنكبوت: 39", en: "The Quran, Surah Al-Ankabut: 39" },
      note: { ar: "الثلاثة مذكورون معًا بنص الآية.", en: "All three are named together in the verse." },
    },
  },
  {
    number: 38,
    slug: "paradise-springs",
    icon: "Droplets",
    title: { ar: "أسماء من أنهار الجنة", en: "Names from the rivers of Paradise" },
    body: {
      ar: "في القرآن أسماء جميلة لعيون الجنة وأنهارها، صارت أسماءً للبنات: تسنيم، وسلسبيل، وكوثر.",
      en: "The Quran names the springs and rivers of Paradise — Tasneem, Salsabil and Kawthar — and they became names for girls.",
    },
    ayahs: [
      { text: "عَيْنًا فِيهَا تُسَمَّىٰ سَلْسَبِيلًا", ref: "الإنسان: 18" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الإنسان: 18 والمطففين: 27 والكوثر: 1", en: "The Quran, Al-Insan: 18, Al-Mutaffifin: 27 and Al-Kawthar: 1" },
      note: { ar: "سلسبيل في الإنسان، وتسنيم في المطففين، والكوثر في سورته.", en: "Salsabil in Al-Insan, Tasnim in Al-Mutaffifin, and Al-Kawthar in the surah named for it." },
    },
  },
  {
    number: 39,
    slug: "parents",
    icon: "Heart",
    title: { ar: "أهم وصية بعد التوحيد", en: "The command that comes right after faith" },
    body: {
      ar: "جمع القرآن أهم الأخلاق والوصايا، وجعل بعد عبادة الله مباشرةً الإحسان إلى الوالدين.",
      en: "Of everything the Quran asks of us, the one placed directly after worshipping Allah alone is kindness to your parents.",
    },
    ayahs: [
      { text: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا", ref: "الإسراء: 23" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الإسراء: 23", en: "The Quran, Surah Al-Isra: 23" },
      note: { ar: "الترتيب بنص الآية: قضى ألا تعبدوا إلا إياه وبالوالدين إحسانًا.", en: "The order is the verse's own: worship none but Him, and be good to parents." },
    },
  },
  {
    number: 40,
    slug: "one-kasrah",
    icon: "Type",
    title: { ar: "كسرة واحدة في سورة كاملة", en: "A single kasrah in a whole surah" },
    body: {
      ar: "سورة «الإخلاص» ليس في كلماتها كسرة إلا في موضع واحد فقط (غير البسملة): تحت اللام في كلمة «يَلِدْ».",
      en: "In all of Surah Al-Ikhlas there is only one kasrah — the vowel written beneath a letter — outside the basmalah: under the lam in “yalid”.",
    },
    ayahs: [
      { text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", ref: "الإخلاص: 3" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — سورة الإخلاص", en: "Counted in the Uthmani text — Surah Al-Ikhlas" },
      note: { ar: "عددنا علامات الكسر في السورة كلها في النص الذي يعرضه الموقع فكانت واحدة، تحت اللام في ﴿يَلِدْ﴾.", en: "We counted every kasra in the surah in the text this site serves: exactly one, under the lam of yalid." },
    },
  },
  {
    number: 41,
    slug: "thirty-parts",
    icon: "LayoutGrid",
    title: { ar: "ثلاثون جزءاً وستون حزباً", en: "Thirty parts, sixty halves" },
    body: {
      ar: "القرآن مقسّم إلى ثلاثين جزءاً ليسهل ختمه في شهر، وكل جزء مقسّم إلى حزبين، فيصير المجموع ستين حزباً.",
      en: "The Quran is divided into thirty parts so it can be finished in a month, and each part into two hizbs — sixty in all.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "تقسيم المصاحف المطبوعة", en: "The division used in printed mushafs" },
      note: { ar: "الأجزاء والأحزاب تقسيم اصطلاحي وُضع لتيسير القراءة، وليس من القرآن نفسه.", en: "Parts and hizbs are a convention added to make reading easier; they are not part of the Quran itself." },
    },
  },
  {
    number: 42,
    slug: "verse-count",
    icon: "Hash",
    title: { ar: "ستة آلاف ومئتان وستٌّ وثلاثون", en: "Six thousand two hundred and thirty-six" },
    body: {
      ar: "عدد آيات القرآن الكريم في العدّ المعتمد في مصاحفنا اليوم هو 6236 آية.",
      en: "By the count used in the copies we read today, the Quran has 6,236 verses.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — العدّ الكوفي", en: "Counted in the Uthmani text — the Kufan numbering" },
      note: { ar: "عددنا آيات المصحف الذي يعرضه الموقع فكانت 6236، وهو العدّ الكوفي المعتمد في مصحف المدينة. ولأهل العدّ أعداد أخرى تختلف في مواضع الفواصل لا في النص.", en: "We counted the verses in the mushaf this site serves: 6,236, the Kufan numbering used in the Madinah mushaf. Other schools of numbering differ over where verses end, never over the text." },
    },
  },
  {
    number: 43,
    slug: "makki-madani",
    icon: "Compass",
    title: { ar: "مكية ومدنية", en: "Makki and Madani" },
    body: {
      ar: "سور القرآن تنقسم إلى مكية ومدنية: المشهور أن 86 سورة نزلت قبل الهجرة، و28 سورة نزلت بعدها — وبعض السور اختلف العلماء في أيّهما هي.",
      en: "The surahs divide into Makki and Madani: the familiar count is 86 revealed before the Hijrah and 28 after it — with a few surahs scholars place on either side.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "كتب علوم القرآن — المكي والمدني", en: "Sciences of the Quran — the Makki and Madani division" },
      note: { ar: "86 و28 هو التقسيم المشهور عند أهل العلم، والبطاقة تقوله بوصفه المشهور لا القاطع، لأن سوراً كالرعد والرحمن مختلف فيها.", en: "86 and 28 is the familiar division among scholars, and the card presents it as the familiar one rather than the settled one, since surahs such as Ar-Ra'd and Ar-Rahman are disputed." },
    },
  },
  {
    number: 44,
    slug: "uff",
    icon: "Heart",
    title: { ar: "أقصر كلمة، وأثقلها ميزاناً", en: "The shortest word, and the heaviest" },
    body: {
      ar: "أقصر كلمة في القرآن تحمل معنى مستقلاً هي ﴿أُفٍّ﴾، واختارها الله ليعلّمنا ألا نُظهر للوالدين حتى أخفّ ضيق.",
      en: "The shortest word in the Quran that stands on its own is ﴿uff﴾ — and it is there to teach us not to show our parents even the smallest impatience.",
    },
    ayahs: [
      { text: "فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا", ref: "الإسراء: 23" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الإسراء: 23", en: "The Quran, Surah Al-Isra: 23" },
      note: { ar: "الكلمة بنصها في الآية.", en: "The word is in the verse itself." },
    },
  },
  {
    number: 45,
    slug: "at-teen",
    icon: "Apple",
    title: { ar: "سورة باسم فاكهة", en: "A surah named after a fruit" },
    body: {
      ar: "سورة «التين» سُمّيت باسم فاكهة، ويبدأ الله سبحانه السورة بالقسم بها وبالزيتون.",
      en: "Surah At-Teen is named after a fruit — the fig — and it opens with an oath by it and by the olive.",
    },
    ayahs: [
      { text: "وَالتِّينِ وَالزَّيْتُونِ", ref: "التين: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة التين: 1", en: "The Quran, Surah At-Tin: 1" },
      note: { ar: "القسم بالتين والزيتون بنص أول السورة.", en: "The oath by the fig and the olive opens the surah." },
    },
  },
  {
    number: 46,
    slug: "science",
    icon: "Baby",
    title: { ar: "خلقٌ من بعد خلق", en: "A making after a making" },
    body: {
      ar: "وصف القرآن خلق الإنسان في بطن أمه مرحلةً بعد مرحلة: نطفة، ثم علقة، ثم مضغة، ثم عظام يُكسى عليها اللحم — بترتيب يذكره القرآن نفسه.",
      en: "The Quran describes the making of a human being in the womb one stage after another: a drop, then a clinging form, then a lump, then bones clothed in flesh — in an order the Quran itself sets out.",
    },
    ayahs: [
      { text: "ثُمَّ خَلَقْنَا النُّطْفَةَ عَلَقَةً فَخَلَقْنَا الْعَلَقَةَ مُضْغَةً", ref: "المؤمنون: 14" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة المؤمنون: 12-14", en: "The Quran, Surah Al-Mu'minun: 12-14" },
      note: { ar: "المراحل وترتيبها بنص الآيات. وكانت البطاقة تقول إن القرآن سبق العلماء بقرون، وهو اجتهاد يختلف فيه أهل العلم ويتغيّر بتغيّر النظريات، فاقتصرت البطاقة على ما تقوله الآية نفسها.", en: "The stages and their order are the verses' own words. The card used to say the Quran anticipated scientists by centuries — an interpretive claim scholars differ over and one that shifts as theories do — so the card now says only what the verse itself says." },
    },
  },
  {
    number: 47,
    slug: "oaths",
    icon: "Sunrise",
    title: { ar: "خمس عشرة سورة تبدأ بقسم", en: "Fifteen surahs that open with an oath" },
    body: {
      ar: "خمس عشرة سورة في القرآن تبدأ بقسم، يقسم الله فيها بمخلوقاته العظيمة ليلفت انتباهنا إليها.",
      en: "Fifteen surahs open with an oath — Allah swearing by things He made, to make us look at them properly.",
    },
    ayahs: [
      { text: "وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ", ref: "الفجر: 1-2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — 15 سورة", en: "Counted in the mushaf — 15 surahs" },
      note: { ar: "عددنا السور التي تفتتح بواو القسم في النص الذي يعرضه الموقع فكانت خمس عشرة، آخرها العصر.", en: "We counted the surahs opening with an oath in the text this site serves: fifteen, the last of them Al-Asr." },
    },
  },
  {
    number: 48,
    slug: "verse-endings",
    icon: "Sparkle",
    title: { ar: "خواتيم الآيات تناسب معناها", en: "Endings that match what came before" },
    body: {
      ar: "كثير من الآيات تُختم باسمين من أسماء الله الحسنى يناسبان موضوعها: «الغفور الرحيم» مع التوبة، و«العزيز الحكيم» مع القوة.",
      en: "Many verses close with two of Allah's names chosen to fit what the verse is about: the Forgiving, the Merciful where it speaks of repentance; the Almighty, the Wise where it speaks of power.",
    },
    ayahs: [
      { text: "وَاللَّهُ عَزِيزٌ حَكِيمٌ", ref: "البقرة: 220" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 220", en: "The Quran, Surah Al-Baqarah: 220" },
      note: { ar: "ملاحظة أسلوبية تُرى في المصحف نفسه، والآية المذكورة مثال عليها.", en: "A feature of style anyone can see in the mushaf; the cited verse is one example of it." },
    },
  },
  {
    number: 49,
    slug: "quran-names",
    icon: "Tag",
    title: { ar: "أسماء أخرى للقرآن", en: "The Quran's other names" },
    body: {
      ar: "للقرآن الكريم أسماء أخرى جميلة: الكتاب، والفرقان، والنور، والشفاء.",
      en: "The Quran carries other names too: the Book, al-Furqan — the Criterion — the Light, and the Healing.",
    },
    ayahs: [
      { text: "تَبَارَكَ الَّذِي نَزَّلَ الْفُرْقَانَ عَلَىٰ عَبْدِهِ لِيَكُونَ لِلْعَالَمِينَ نَذِيرًا", ref: "الفرقان: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الفرقان: 1 والإسراء: 82 والبقرة: 2", en: "The Quran, Al-Furqan: 1, Al-Isra: 82 and Al-Baqarah: 2" },
      note: { ar: "كل اسم من هذه الأسماء وصف به القرآن نفسه في آية.", en: "Each of these names is one the Quran gives itself in a verse." },
    },
  },
  {
    number: 50,
    slug: "first-collection",
    icon: "Archive",
    title: { ar: "أول مرة جُمع في مصحف", en: "The first time it was gathered into one book" },
    body: {
      ar: "جُمع القرآن وكُتب في مصحف واحد لأول مرة في عهد الخليفة أبي بكر الصديق رضي الله عنه، باقتراح من عمر بن الخطاب لحفظه للأجيال.",
      en: "The Quran was first gathered into a single book in the time of Abu Bakr as-Siddiq, on a suggestion from Umar ibn al-Khattab, so that it would be kept for everyone after them.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (4986) — حديث زيد بن ثابت", en: "Sahih al-Bukhari (4986) — the report of Zayd ibn Thabit" },
      note: { ar: "قصة الجمع في عهد أبي بكر باقتراح عمر ثابتة في البخاري بتفصيلها.", en: "The collection in Abu Bakr's time at Umar's suggestion is in al-Bukhari in full detail." },
    },
  },
  {
    number: 51,
    slug: "ya-ayyuha-alladhina-amanu",
    icon: "Megaphone",
    title: { ar: "ثلاث سور تبدأ بنداء المؤمنين", en: "Three surahs that open by calling the believers" },
    body: {
      ar: "ثلاث سور فقط تبدأ بنداء ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا﴾: المائدة، والحجرات، والممتحنة.",
      en: "Only three surahs open with the call ﴿O you who have believed﴾: Al-Ma'idah, Al-Hujurat and Al-Mumtahanah.",
    },
    ayahs: [
      { text: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ", ref: "المائدة: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — المائدة والحجرات والممتحنة", en: "Counted in the mushaf — Al-Ma'idah, Al-Hujurat and Al-Mumtahanah" },
      note: { ar: "عددنا السور التي تبدأ بهذا النداء في النص الذي يعرضه الموقع فكانت ثلاثًا.", en: "We counted the surahs opening with this call in the text this site serves: three." },
    },
  },
  {
    number: 52,
    slug: "ya-ayyuha-an-nabiyy",
    icon: "UserRoundCheck",
    title: { ar: "ثلاث سور تنادي النبي ﷺ", en: "Three surahs that call the Prophet ﷺ" },
    body: {
      ar: "ثلاث سور تبدأ بنداء خاص للنبي محمد ﷺ ﴿يَا أَيُّهَا النَّبِيُّ﴾: الأحزاب، والطلاق، والتحريم.",
      en: "Three surahs open with a call meant for the Prophet ﷺ alone — ﴿O Prophet﴾: Al-Ahzab, At-Talaq and At-Tahrim.",
    },
    ayahs: [
      { text: "يَا أَيُّهَا النَّبِيُّ اتَّقِ اللَّهَ", ref: "الأحزاب: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في المصحف — الأحزاب والطلاق والتحريم", en: "Counted in the mushaf — Al-Ahzab, At-Talaq and At-Tahrim" },
      note: { ar: "عددنا السور التي تبدأ بنداء النبي ﷺ فكانت ثلاثًا.", en: "We counted the surahs opening by addressing the Prophet ﷺ: three." },
    },
  },
  {
    number: 53,
    slug: "idols-of-nuh",
    icon: "Ban",
    title: { ar: "أصنام قوم نوح", en: "The idols of Nuh's people" },
    body: {
      ar: "ذكر القرآن أسماء الأصنام التي عبدها قوم نوح — وَدّ، وسُواع، ويَغُوث، ويَعُوق، ونَسْر — ليعلّمنا أن نبتعد عن هذا كله.",
      en: "The Quran names the idols Nuh's people worshipped — Wadd, Suwa', Yaghuth, Ya'uq and Nasr — so that we would keep well away from all of it.",
    },
    ayahs: [
      { text: "وَلَا تَذَرُنَّ وَدًّا وَلَا سُوَاعًا وَلَا يَغُوثَ وَيَعُوقَ وَنَسْرًا", ref: "نوح: 23" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة نوح: 23", en: "The Quran, Surah Nuh: 23" },
      note: { ar: "الأسماء الخمسة بنص الآية.", en: "The five names are in the words of the verse." },
    },
  },
  {
    number: 54,
    slug: "dots-and-marks",
    icon: "Type",
    title: { ar: "حروف بلا نقاط", en: "Letters with no dots" },
    body: {
      ar: "لم تكن الحروف في المصاحف الأولى منقوطة ولا مشكولة. فوضع أبو الأسود الدؤلي علامات الحركات، ثم جاء نصر بن عاصم ويحيى بن يعمر فنقطا الحروف لتتميّز الباء من التاء — حتى نقرأ القرآن قراءة صحيحة.",
      en: "The earliest copies had no dots on the letters and no vowel marks. Abu al-Aswad ad-Du'ali added the vowel marks; then Nasr ibn Asim and Yahya ibn Ya'mar dotted the letters so a ba could be told from a ta — so that everyone could read it correctly.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "كتب تاريخ المصحف — الشكل والإعجام", en: "Histories of the mushaf — vowelling and the dotting of letters" },
      note: { ar: "التفريق بين الأمرين هو المشهور عند أهل هذا الفن: الشكل لأبي الأسود، والإعجام لنصر بن عاصم ويحيى بن يعمر. وكانت البطاقة تنسبهما إليه وحده فصُحّحت.", en: "Separating the two is the established account in this field: the vowel marks from Abu al-Aswad, the dotting of letters from Nasr ibn Asim and Yahya ibn Ya'mar. The card credited him with both and has been corrected." },
    },
  },
  {
    number: 55,
    slug: "uthman-mushaf",
    icon: "BookCopy",
    title: { ar: "مصاحف عثمان", en: "The copies Uthman sent out" },
    body: {
      ar: "نسخ الخليفة عثمان بن عفان رضي الله عنه المصاحف وأرسلها إلى المدن الإسلامية، حتى يقرأ المسلمون في كل مكان قراءة واحدة.",
      en: "Caliph Uthman ibn Affan had copies made and sent to the Muslim cities, so that Muslims everywhere would read one and the same text.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (4987)", en: "Sahih al-Bukhari (4987)" },
      note: { ar: "نسخ المصاحف في عهد عثمان وإرسالها إلى الأمصار ثابت في البخاري.", en: "The copying of the mushafs in Uthman's time and their dispatch to the regions is in al-Bukhari." },
    },
  },
  {
    number: 56,
    slug: "scribes-of-revelation",
    icon: "PenLine",
    title: { ar: "كُتّاب الوحي", en: "The scribes of the revelation" },
    body: {
      ar: "كان للنبي ﷺ صحابة يكتبون القرآن فور نزوله، يُسمَّون «كُتّاب الوحي»، ومن أشهرهم الصحابي الشاب زيد بن ثابت.",
      en: "The Prophet ﷺ had companions who wrote the Quran down the moment it came — the scribes of the revelation. Among the best known was a young man named Zaid ibn Thabit.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (4990) وكتب السيرة", en: "Sahih al-Bukhari (4990) and the Seerah literature" },
      note: { ar: "كتابة الوحي عند نزوله وذكر زيد بن ثابت فيها ثابت في البخاري.", en: "The writing down of revelation as it came, and Zayd ibn Thabit's part in it, is in al-Bukhari." },
    },
  },
  {
    number: 57,
    slug: "kalla-rule",
    icon: "Search",
    title: { ar: "علامة تدلّك على السورة المكية", en: "A clue that tells you a surah is Makki" },
    body: {
      ar: "كل سورة فيها كلمة «كَلَّا» فهي مكية نزلت قبل الهجرة — قاعدة سهلة تعرف بها موضع السورة.",
      en: "Any surah containing the word kalla is Makki, revealed before the Hijrah — an easy clue that tells you where a surah belongs.",
    },
    ayahs: [
      { text: "كَلَّا سَيَعْلَمُونَ", ref: "النبأ: 4" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — 33 موضعًا في 15 سورة", en: "Counted in the Uthmani text — 33 places in 15 surahs" },
      note: { ar: "عددنا مواضع ﴿كَلَّا﴾ في النص الذي يعرضه الموقع فكانت 33 موضعًا، كلها في النصف الأخير من المصحف وكلها في سور مكية — والقاعدة مذكورة في الإتقان للسيوطي.", en: "We counted kalla in the text this site serves: 33 places, all in the second half of the mushaf and all in Makki surahs — the rule as stated in as-Suyuti's al-Itqan." },
    },
  },
  {
    number: 58,
    slug: "riding-animals",
    icon: "Footprints",
    title: { ar: "حيوانات للركوب وللزينة", en: "Animals to ride, and to enjoy" },
    body: {
      ar: "ذكر القرآن الخيل والبغال والحمير، وجعلها الله لنا للركوب وللزينة معاً.",
      en: "The Quran mentions horses, mules and donkeys — given to us both to ride and to delight in.",
    },
    ayahs: [
      { text: "وَالْخَيْلَ وَالْبِغَالَ وَالْحَمِيرَ لِتَرْكَبُوهَا وَزِينَةً", ref: "النحل: 8" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النحل: 8", en: "The Quran, Surah An-Nahl: 8" },
      note: { ar: "الثلاثة مذكورة بنص الآية مع ذكر الركوب والزينة.", en: "All three are named in the verse, along with riding and adornment." },
    },
  },
  {
    number: 59,
    slug: "locusts-and-frogs",
    icon: "Bug",
    title: { ar: "الجراد والضفادع", en: "Locusts and frogs" },
    body: {
      ar: "من آيات الله على فرعون وقومه كائنات صغيرة: الطوفان والجراد والقُمَّل والضفادع.",
      en: "Among the signs sent upon Pharaoh and his people were small creatures: the flood, the locusts, the lice and the frogs.",
    },
    ayahs: [
      { text: "فَأَرْسَلْنَا عَلَيْهِمُ الطُّوفَانَ وَالْجَرَادَ وَالْقُمَّلَ وَالضَّفَادِعَ", ref: "الأعراف: 133" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الأعراف: 133", en: "The Quran, Surah Al-A'raf: 133" },
      note: { ar: "الآيات الأربع مذكورة بنص الآية.", en: "The four signs are named in the verse." },
    },
  },
  {
    number: 60,
    slug: "surah-an-nur-manners",
    icon: "Home",
    title: { ar: "سورة النور وآداب البيوت", en: "Surah An-Nur and the manners of a home" },
    body: {
      ar: "سورة «النور» تعلّمنا أجمل آداب البيوت، ومنها الاستئذان قبل الدخول على الآخرين.",
      en: "Surah An-Nur teaches us the best manners for a home — among them asking permission before entering upon anyone.",
    },
    ayahs: [
      { text: "لَا تَدْخُلُوا بُيُوتًا غَيْرَ بُيُوتِكُمْ حَتَّىٰ تَسْتَأْنِسُوا", ref: "النور: 27" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النور: 27", en: "The Quran, Surah An-Nur: 27" },
      note: { ar: "أدب الاستئذان بنص الآية.", en: "The etiquette of asking permission is the verse's own words." },
    },
  },
  {
    number: 61,
    slug: "sea-that-split",
    icon: "Waves",
    title: { ar: "البحر الذي انفلق", en: "The sea that split open" },
    body: {
      ar: "من عجائب ما ذكره القرآن عن البحر أن الله فلقه لموسى عليه السلام، فصار كل جزء منه كالجبل العظيم.",
      en: "Among the wonders the Quran tells of the sea: Allah split it for Musa, and each part of it stood like a great mountain.",
    },
    ayahs: [
      { text: "فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ", ref: "الشعراء: 63" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الشعراء: 63", en: "The Quran, Surah Ash-Shu'ara: 63" },
      note: { ar: "التشبيه بالطود العظيم بنص الآية.", en: "The likeness to a great mountain is in the verse itself." },
    },
  },
  {
    number: 62,
    slug: "asking-permission",
    icon: "DoorOpen",
    title: { ar: "لا تدخل حتى يُؤذن لك", en: "Wait until you are welcomed in" },
    body: {
      ar: "علّمنا القرآن أدباً جميلاً: إن لم تجد أحداً في البيت فلا تدخله حتى يُؤذن لك.",
      en: "The Quran teaches a fine manner: if you find no one home, do not go in until you are given permission.",
    },
    ayahs: [
      { text: "فَإِن لَّمْ تَجِدُوا فِيهَا أَحَدًا فَلَا تَدْخُلُوهَا حَتَّىٰ يُؤْذَنَ لَكُمْ", ref: "النور: 28" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النور: 28", en: "The Quran, Surah An-Nur: 28" },
      note: { ar: "الحكم بنص الآية.", en: "The instruction is the verse's own words." },
    },
  },
  {
    number: 63,
    slug: "guard-your-tongue",
    icon: "MessageCircle",
    title: { ar: "احفظ لسانك", en: "Guard your tongue" },
    body: {
      ar: "حذّرنا القرآن من سوء الظن والتجسّس والغيبة، وأمرنا أن نحفظ ألسنتنا إلا عن الخير.",
      en: "The Quran warns us away from suspicion, prying and backbiting, and asks us to keep our tongues for what is good.",
    },
    ayahs: [
      { text: "وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا", ref: "الحجرات: 12" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الحجرات: 12", en: "The Quran, Surah Al-Hujurat: 12" },
      note: { ar: "الثلاثة منهيّ عنها بنص الآية.", en: "All three are forbidden in the words of the verse." },
    },
  },
  {
    number: 64,
    slug: "never-despair",
    icon: "Anchor",
    title: { ar: "لا تيأس أبداً", en: "Never lose hope" },
    body: {
      ar: "مهما اشتدّت الصعوبات، يعلّمنا القرآن ألا نيأس من رحمة الله وفرجه.",
      en: "However hard things become, the Quran teaches us never to lose hope in Allah's mercy and relief.",
    },
    ayahs: [
      { text: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ", ref: "يوسف: 87" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف: 87", en: "The Quran, Surah Yusuf: 87" },
      note: { ar: "النهي عن اليأس من روح الله بنص الآية.", en: "The prohibition of despairing of Allah's relief is the verse's own words." },
    },
  },
  {
    number: 65,
    slug: "healing-for-hearts",
    icon: "HeartPulse",
    title: { ar: "شفاء للقلوب", en: "A healing for hearts" },
    body: {
      ar: "القرآن شفاء حقيقي للقلب من الحزن والهمّ، ورحمة للمؤمنين.",
      en: "The Quran is a true healing for a heart carrying sadness or worry, and a mercy for those who believe.",
    },
    ayahs: [
      { text: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ", ref: "الإسراء: 82" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الإسراء: 82", en: "The Quran, Surah Al-Isra: 82" },
      note: { ar: "الشفاء والرحمة بنص الآية.", en: "Healing and mercy are in the words of the verse." },
    },
  },
  {
    number: 66,
    slug: "a-clear-light",
    icon: "Lightbulb",
    title: { ar: "نور مبين", en: "A light that shows the way" },
    body: {
      ar: "وصف الله القرآن بأنه نور مبين، يهدينا إلى الطريق الصحيح في الظلام.",
      en: "Allah calls the Quran a clear light — it shows us the right way when everything around is dark.",
    },
    ayahs: [
      { text: "وَأَنزَلْنَا إِلَيْكُمْ نُورًا مُّبِينًا", ref: "النساء: 174" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النساء: 174", en: "The Quran, Surah An-Nisa: 174" },
      note: { ar: "وصف النور المبين بنص الآية.", en: "The description as a clear light is in the verse itself." },
    },
  },
  {
    number: 67,
    slug: "give-on-harvest-day",
    icon: "Gift",
    title: { ar: "وآتوا حقه يوم حصاده", en: "Give its due on harvest day" },
    body: {
      ar: "أمرنا القرآن أن نعطي الفقراء والمحتاجين حقهم، فتنتشر المحبة بين الناس.",
      en: "The Quran tells us to give the poor and the needy their share, so that love spreads among people.",
    },
    ayahs: [
      { text: "وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ", ref: "الأنعام: 141" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الأنعام: 141", en: "The Quran, Surah Al-An'am: 141" },
      note: { ar: "الأمر بنص الآية.", en: "The command is the verse's own words." },
    },
  },
  {
    number: 68,
    slug: "rabbi-zidni-ilma",
    icon: "GraduationCap",
    title: { ar: "ربِّ زدني علماً", en: "My Lord, increase me in knowledge" },
    body: {
      ar: "حثّنا القرآن على طلب العلم النافع طوال العمر، وعلّمنا دعاءً نطلب به المزيد.",
      en: "The Quran urges us to keep seeking useful knowledge all our lives, and teaches us a prayer for more of it.",
    },
    ayahs: [
      { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", ref: "طه: 114" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة طه: 114", en: "The Quran, Surah Ta-Ha: 114" },
      note: { ar: "الدعاء بنصه في الآية.", en: "The supplication is in the verse itself." },
    },
  },
  {
    number: 69,
    slug: "owners-of-the-garden",
    icon: "Trees",
    title: { ar: "أصحاب الجنة", en: "The owners of the garden" },
    body: {
      ar: "قصّ علينا القرآن خبر أصحاب بستان بخلوا على المساكين، فذهبت ثمارهم — ليعلّمنا أن البخل يضيّع النعمة وأن الصدقة تبارك فيها.",
      en: "The Quran tells of the owners of an orchard who withheld from the poor and lost their fruit — a lesson that meanness wastes a blessing while giving makes it grow.",
    },
    ayahs: [
      { text: "إِنَّا بَلَوْنَاهُمْ كَمَا بَلَوْنَا أَصْحَابَ الْجَنَّةِ", ref: "القلم: 17" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة القلم: 17", en: "The Quran, Surah Al-Qalam: 17" },
      note: { ar: "القصة بتمامها في سورة القلم: 17-33.", en: "The account runs through Al-Qalam 17-33." },
    },
  },
  {
    number: 70,
    slug: "surah-al-asr",
    icon: "Timer",
    title: { ar: "ثلاث آيات تجمع الفلاح", en: "Three verses that hold the whole secret" },
    body: {
      ar: "سورة «العصر» ثلاث آيات فقط، لكنها تجمع أسرار الفلاح: الإيمان، والعمل الصالح، والتواصي بالحق وبالصبر.",
      en: "Surah Al-Asr is only three verses, yet it holds the whole secret of success: faith, good deeds, and urging one another to truth and to patience.",
    },
    ayahs: [
      { text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", ref: "العصر: 3" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة العصر", en: "The Quran, Surah Al-Asr" },
      note: { ar: "الأربعة مذكورة بنص السورة الثلاث آيات.", en: "All four are named in the surah's three verses." },
    },
  },
  {
    number: 71,
    slug: "straight-path",
    icon: "Milestone",
    title: { ar: "اهدنا الصراط المستقيم", en: "Guide us to the straight path" },
    body: {
      ar: "علّمنا القرآن أن نسأل الله الهداية في كل صلاة، فندعو بها سبع عشرة مرة كل يوم.",
      en: "The Quran taught us to ask for guidance in every prayer — a prayer we say seventeen times a day.",
    },
    ayahs: [
      { text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", ref: "الفاتحة: 6" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الفاتحة: 6", en: "The Quran, Surah Al-Fatihah: 6" },
      note: { ar: "الدعاء بنص الآية، وعدد السبع عشرة هو عدد ركعات الصلوات الخمس المفروضة في اليوم، والفاتحة تُقرأ في كل ركعة.", en: "The supplication is the verse's own words; seventeen is the number of obligatory rak'ahs in a day, and Al-Fatihah is recited in each." },
    },
  },
  {
    number: 72,
    slug: "justice-even-with-those-we-dislike",
    icon: "Scale",
    title: { ar: "اعدل حتى مع من تكره", en: "Be fair even with someone you dislike" },
    body: {
      ar: "أمرنا القرآن بالعدل مع كل الناس، حتى مع من نختلف معهم أو لا نحبهم.",
      en: "The Quran asks us to be fair with everyone — even with people we disagree with, or simply do not like.",
    },
    ayahs: [
      { text: "اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ", ref: "المائدة: 8" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة المائدة: 8", en: "The Quran, Surah Al-Ma'idah: 8" },
      note: { ar: "الأمر بالعدل مع من نكره بنص الآية.", en: "The command to be just even with those we dislike is in the verse itself." },
    },
  },
  {
    number: 73,
    slug: "quran-as-reminder",
    icon: "BellRing",
    title: { ar: "القرآن ذي الذكر", en: "The Quran full of reminding" },
    body: {
      ar: "وصف الله القرآن بأنه «ذكرى»، يذكّر كل من أراد أن يتعلّم الخير ويعمل به.",
      en: "Allah calls the Quran a reminder — it reminds anyone who wants to learn what is good and to live by it.",
    },
    ayahs: [
      { text: "ص ۚ وَالْقُرْآنِ ذِي الذِّكْرِ", ref: "ص: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة ص: 1", en: "The Quran, Surah Sad: 1" },
      note: { ar: "وصف الذكر بنص أول السورة.", en: "The description as a reminder opens the surah." },
    },
  },
  {
    number: 74,
    slug: "paradise-as-wide-as",
    icon: "CloudSun",
    title: { ar: "جنة عرضها السماوات والأرض", en: "A garden as wide as the sky and the earth" },
    body: {
      ar: "أخبرنا القرآن أن الجنة التي أُعدّت للمتقين عرضها كالسماوات والأرض، ودعانا أن نسارع إليها.",
      en: "The Quran tells us the garden prepared for the God-fearing is as wide as the heavens and the earth, and invites us to hurry towards it.",
    },
    ayahs: [
      { text: "وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ", ref: "آل عمران: 133" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة آل عمران: 133", en: "The Quran, Surah Aal-Imran: 133" },
      note: { ar: "السعة والمسارعة بنص الآية.", en: "The breadth and the call to hasten are the verse's own words." },
    },
  },
  {
    number: 75,
    slug: "dhul-qarnayn",
    icon: "Crown",
    title: { ar: "ذو القرنين، الملك العادل", en: "Dhul-Qarnayn, the just king" },
    body: {
      ar: "قصّ علينا القرآن خبر ذي القرنين، ملك طاف الأرض ينشر الخير ويعين الضعفاء.",
      en: "The Quran tells of Dhul-Qarnayn, a king who travelled the earth spreading good and helping those who could not help themselves.",
    },
    ayahs: [
      { text: "وَيَسْأَلُونَكَ عَن ذِي الْقَرْنَيْنِ ۖ قُلْ سَأَتْلُو عَلَيْكُم مِّنْهُ ذِكْرًا", ref: "الكهف: 83" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 83", en: "The Quran, Surah Al-Kahf: 83" },
      note: { ar: "القصة بتمامها في الكهف: 83-98.", en: "The account runs through Al-Kahf 83-98." },
    },
  },
  {
    number: 76,
    slug: "cooperate-in-good",
    icon: "Handshake",
    title: { ar: "تعاونوا على البر", en: "Help one another do good" },
    body: {
      ar: "أمرنا القرآن أن نتعاون على البر والتقوى، وحذّرنا من التعاون على الإثم والعدوان.",
      en: "The Quran tells us to help one another in goodness, and warns us against helping one another in wrongdoing.",
    },
    ayahs: [
      { text: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ", ref: "المائدة: 2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة المائدة: 2", en: "The Quran, Surah Al-Ma'idah: 2" },
      note: { ar: "الأمر والنهي معًا بنص الآية.", en: "Both the command and the prohibition are in the verse." },
    },
  },
  {
    number: 77,
    slug: "luqman-advice",
    icon: "MessageSquareQuote",
    title: { ar: "وصايا لقمان لابنه", en: "Luqman's advice to his son" },
    body: {
      ar: "حفظ لنا القرآن نصائح لقمان الحكيم لابنه، وأولها ألا يشرك بالله شيئاً.",
      en: "The Quran keeps for us the advice of wise Luqman to his son — and the first of it was never to associate anything with Allah.",
    },
    ayahs: [
      { text: "يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ ۖ إِنَّ الشِّرْكَ لَظُلْمٌ عَظِيمٌ", ref: "لقمان: 13" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة لقمان: 13", en: "The Quran, Surah Luqman: 13" },
      note: { ar: "الوصايا في لقمان: 13-19، وأولها النهي عن الشرك.", en: "The counsels run through Luqman 13-19, the first of them against associating partners with Allah." },
    },
  },
  {
    number: 78,
    slug: "change-begins-inside",
    icon: "RefreshCw",
    title: { ar: "التغيير يبدأ من داخلنا", en: "Change starts inside us" },
    body: {
      ar: "أخبرنا القرآن أن الله لا يغيّر حال قوم حتى يغيّروا ما في أنفسهم إلى الأفضل.",
      en: "The Quran tells us that Allah does not change the state of a people until they change what is inside themselves for the better.",
    },
    ayahs: [
      { text: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ", ref: "الرعد: 11" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الرعد: 11", en: "The Quran, Surah Ar-Ra'd: 11" },
      note: { ar: "السنّة الإلهية بنص الآية.", en: "The principle is stated in the verse itself." },
    },
  },
  {
    number: 79,
    slug: "reflect-on-creation",
    icon: "Telescope",
    title: { ar: "تفكّر في خلق السماوات", en: "Think about how the sky was made" },
    body: {
      ar: "دعانا القرآن أن نتفكّر في خلق السماوات والأرض واختلاف الليل والنهار، لنعرف عظمة الخالق.",
      en: "The Quran invites us to think about the making of the heavens and the earth, and the turning of night into day, and to see how great their Maker is.",
    },
    ayahs: [
      { text: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ", ref: "آل عمران: 190" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة آل عمران: 190", en: "The Quran, Surah Aal-Imran: 190" },
      note: { ar: "الدعوة إلى التفكّر بنص الآية.", en: "The call to reflect is the verse's own words." },
    },
  },
  {
    number: 80,
    slug: "ease-after-hardship",
    icon: "Sun",
    title: { ar: "مع العسر يسر", en: "With hardship comes ease" },
    body: {
      ar: "وعدنا الله في القرآن أن كل عسر يأتي بعده يسر، وكرّر الوعد مرتين ليطمئن قلبك.",
      en: "Allah promises in the Quran that ease comes with every hardship — and says it twice, so that your heart would settle.",
    },
    ayahs: [
      { text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح: 5-6" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الشرح: 5-6", en: "The Quran, Surah Ash-Sharh: 5-6" },
      note: { ar: "الوعد مكرّر مرتين بنص الآيتين.", en: "The promise is repeated twice in the two verses." },
    },
  },
  {
    number: 81,
    slug: "ten-recitations",
    icon: "AudioLines",
    title: { ar: "عشر قراءات متواترة", en: "Ten recitations, all trusted" },
    body: {
      ar: "نزل القرآن بأوجه لغوية ميسّرة تُسمّى القراءات المتواترة، وهي عشر قراءات، ليسهل على قبائل العرب كلها أن تقرأه.",
      en: "The Quran came in several easy ways of reading — the ten trusted recitations — so that every Arab tribe could recite it comfortably.",
    },
    ayahs: [
      { text: "وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ", ref: "القمر: 17" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "النشر في القراءات العشر لابن الجزري", en: "An-Nashr fi al-Qira'at al-Ashr by Ibn al-Jazari" },
      note: { ar: "تواتر القراءات العشر هو قول الجمهور، وابن الجزري حرّر ذلك في النشر.", en: "That the ten readings are mutawatir is the position of the majority, set out by Ibn al-Jazari in an-Nashr." },
    },
  },
  {
    number: 82,
    slug: "muhkam-mutashabih",
    icon: "Layers",
    title: { ar: "مُحكَم ومُتَشابِه", en: "Clear verses, and deeper ones" },
    body: {
      ar: "آيات القرآن منها المُحكَم الواضح للجميع كالحلال والحرام، ومنها المُتَشابِه الذي استأثر الله بعلم تأويله الكامل.",
      en: "Some verses are muhkam — plain to everyone, like what is allowed and what is not — and some are mutashabih, whose full meaning Allah kept with Himself.",
    },
    ayahs: [
      { text: "مِنْهُ آيَاتٌ مُّحْكَمَاتٌ هُنَّ أُمُّ الْكِتَابِ وَأُخَرُ مُتَشَابِهَاتٌ", ref: "آل عمران: 7" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة آل عمران: 7", en: "The Quran, Surah Aal-Imran: 7" },
      note: { ar: "التقسيم بنص الآية.", en: "The division is stated in the verse itself." },
    },
  },
  {
    number: 83,
    slug: "names-from-the-quran",
    icon: "Baby",
    title: { ar: "أسماء من كلمات القرآن", en: "Names taken from the Quran" },
    body: {
      ar: "كثير من أسمائنا مأخوذ من كلمات القرآن: دانية، وسجى، وصفوان، ومروة، وهدى.",
      en: "Many of our names come straight from words in the Quran: Daniya, Saja, Safwan, Marwa and Huda.",
    },
    ayahs: [
      { text: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ", ref: "البقرة: 158" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 158", en: "The Quran, Surah Al-Baqarah: 158" },
      note: { ar: "هذه أسماء مأخوذة من كلمات وردت في القرآن — كالصفا والمروة في هذه الآية — لا أسماء أعلام ذُكرت فيه.", en: "These are names taken from words that occur in the Quran — Safa and Marwah in this verse — not names of people the Quran mentions." },
    },
  },
  {
    number: 84,
    slug: "translated-meanings",
    icon: "Languages",
    title: { ar: "تُرجمت معانيه لا ألفاظه", en: "Its meanings are translated, not its words" },
    body: {
      ar: "تُرجمت معاني القرآن إلى عشرات اللغات، لكن النص العربي وحده هو كلام الله المعجز، والترجمة تشرح المعنى لغير العرب.",
      en: "The meanings of the Quran have been translated into dozens of languages, but the Arabic text alone is the miraculous word of Allah; a translation only explains the meaning for those who do not read Arabic.",
    },
    ayahs: [
      { text: "إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ", ref: "يوسف: 2" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف: 2", en: "The Quran, Surah Yusuf: 2" },
      note: { ar: "كون القرآن عربيًّا بنص الآية، وأن المترجم معناه لا لفظه أمرٌ متفق عليه عند أهل العلم.", en: "That the Quran is in Arabic is the verse's own words, and that translation carries the meaning rather than the text is agreed among scholars." },
    },
  },
  {
    number: 85,
    slug: "sajdah-verses",
    icon: "ArrowDownToLine",
    title: { ar: "آيات السجدة", en: "The verses of prostration" },
    body: {
      ar: "في القرآن آيات إذا قرأتها سجدت، وأشهرها خاتمة سورة العلق.",
      en: "Some verses in the Quran are read and then you prostrate — the best known of them closes Surah Al-Alaq.",
    },
    ayahs: [
      { text: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب ۩", ref: "العلق: 19" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة العلق: 19", en: "The Quran, Surah Al-Alaq: 19" },
      note: { ar: "الأمر بالسجود في خاتمة السورة بنصها.", en: "The command to prostrate closes the surah." },
    },
  },
  {
    number: 86,
    slug: "no-contradiction",
    icon: "ShieldCheck",
    title: { ar: "لا اختلاف فيه", en: "Nothing in it disagrees with itself" },
    body: {
      ar: "من دلائل أن القرآن من عند الله أنه لا يناقض بعضه بعضاً، ولو كان من عند غير الله لوجدوا فيه اختلافاً كثيراً.",
      en: "One sign that the Quran is from Allah is that no part of it disagrees with another. Had it come from anyone else, they would have found much in it that clashed.",
    },
    ayahs: [
      { text: "وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا", ref: "النساء: 82" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النساء: 82", en: "The Quran, Surah An-Nisa: 82" },
      note: { ar: "الاستدلال بنص الآية نفسها.", en: "The argument is the verse's own." },
    },
  },
  {
    number: 87,
    slug: "four-caliphs-scribes",
    icon: "Users",
    title: { ar: "الخلفاء الأربعة كانوا كُتّاباً للوحي", en: "All four caliphs wrote the revelation" },
    body: {
      ar: "أبو بكر وعمر وعثمان وعلي رضي الله عنهم كانوا جميعاً من كُتّاب الوحي، يكتبون القرآن بين يدي النبي ﷺ فور نزوله.",
      en: "Abu Bakr, Umar, Uthman and Ali were all scribes of the revelation, writing the Quran down before the Prophet ﷺ as it came.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "الطبقات الكبرى لابن سعد، والإتقان للسيوطي — أسماء كُتّاب الوحي", en: "Ibn Sa'd's Tabaqat and as-Suyuti's al-Itqan — the lists of the scribes of revelation" },
      note: { ar: "الخلفاء الأربعة مذكورون في قوائم كُتّاب الوحي عند أهل السير.", en: "The four caliphs appear in the lists of the scribes of revelation kept by the historians of the Seerah." },
    },
  },
  {
    number: 88,
    slug: "ten-commandments",
    icon: "ListChecks",
    title: { ar: "وصايا جامعة للأخلاق", en: "A gathered list of manners" },
    body: {
      ar: "جمع القرآن وصايا عظيمة للأخلاق في سورتي الأنعام والإسراء، تعلّمنا كيف نكون نافعين لمن حولنا.",
      en: "The Quran gathers great advice on character in Surahs Al-An'am and Al-Isra, teaching us how to be of use to the people around us.",
    },
    ayahs: [
      { text: "قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ", ref: "الأنعام: 151" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأنعام: 151-153 والإسراء: 23-39", en: "The Quran, Al-An'am: 151-153 and Al-Isra: 23-39" },
      note: { ar: "الوصايا في الموضعين بنص الآيات.", en: "The counsels in both places are the verses' own words." },
    },
  },
  {
    number: 89,
    slug: "inheritance-shares",
    icon: "PieChart",
    title: { ar: "حساب دقيق في سورة النساء", en: "Exact arithmetic in Surah An-Nisa" },
    body: {
      ar: "فصّل القرآن أحكام المواريث بحساب دقيق في سورة النساء، فلا يضيع حق أحد من أهل البيت.",
      en: "The Quran sets out the shares of inheritance with exact arithmetic in Surah An-Nisa, so that no one in a family loses what is theirs.",
    },
    ayahs: [
      { text: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ", ref: "النساء: 11" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النساء: 11", en: "The Quran, Surah An-Nisa: 11" },
      note: { ar: "الأنصبة مفصّلة بنص الآيات 11-12 و176.", en: "The shares are set out in the words of verses 11-12 and 176." },
    },
  },
  {
    number: 90,
    slug: "revealed-gradually",
    icon: "CalendarClock",
    title: { ar: "نزل على مُكث", en: "It came down little by little" },
    body: {
      ar: "لم ينزل القرآن مرة واحدة، بل نزل على مهل خلال ثلاث وعشرين سنة، تخفيفاً على الناس وهم يبنون مجتمعهم ويصلحون عاداتهم.",
      en: "The Quran did not arrive all at once. It came slowly, over twenty-three years, to make it easier for people while they built their community and mended their habits.",
    },
    ayahs: [
      { text: "وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ", ref: "الإسراء: 106" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الإسراء: 106", en: "The Quran, Surah Al-Isra: 106" },
      note: { ar: "النزول على مُكث بنص الآية، ومدة الثلاث والعشرين سنة (13 بمكة و10 بالمدينة) معروفة في كتب السيرة.", en: "The gradual revelation is the verse's own words; the span of twenty-three years — thirteen in Mecca, ten in Medina — is standard in the Seerah." },
    },
  },
  {
    number: 91,
    slug: "madani-society",
    icon: "Building2",
    title: { ar: "سور بُنيت بها المدينة", en: "Surahs that built a community" },
    body: {
      ar: "نزلت السور المدنية لتبني المجتمع، فجاءت ببيان العبادات وأحكام الأسرة والمواريث ونظام الحقوق بين الناس.",
      en: "The Madani surahs came to build a community: how to worship, how a family is ordered, how inheritance is shared, and what people owe one another.",
    },
    ayahs: [
      { text: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ", ref: "النساء: 11" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النساء: 11", en: "The Quran, Surah An-Nisa: 11" },
      note: { ar: "موضوعات السور المدنية تُرى في السور نفسها، والمواريث مثال عليها.", en: "The subjects of the Madani surahs are visible in the surahs themselves; inheritance is one example." },
    },
  },
  {
    number: 92,
    slug: "muqattaat-makki",
    icon: "Puzzle",
    title: { ar: "علامة أخرى للسورة المكية", en: "Another clue for a Makki surah" },
    body: {
      ar: "كل سورة تبدأ بالحروف المقطّعة فهي مكية، إلا البقرة وآل عمران فهما مدنيتان، وسورة الرعد اختلف فيها العلماء — قاعدة تعرف بها متى نزلت السورة غالباً.",
      en: "Every surah opening with the separated letters is Makki, except Al-Baqarah and Aal-Imran, which are Madani, and Ar-Ra'd, which scholars dispute — a rule that usually tells you when a surah came down.",
    },
    ayahs: [
      { text: "الم", ref: "البقرة: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "كتب علوم القرآن — المكي والمدني، ومصحف المدينة", en: "Sciences of the Quran — the Makki and Madani division, and the Madinah mushaf" },
      note: { ar: "البقرة وآل عمران مدنيتان بالاتفاق، وسورة الرعد مختلف فيها وتُعدّ مدنية في مصحف المدينة، وكانت البطاقة تُسقطها من الاستثناء فأُضيفت.", en: "Al-Baqarah and Aal-Imran are Madani by agreement, and Ar-Ra'd is disputed and marked Madani in the Madinah mushaf; the card left it out of the exceptions and it has been added." },
    },
  },
  {
    number: 93,
    slug: "hypocrites-exposed",
    icon: "EyeOff",
    title: { ar: "كشف قول المنافقين", en: "Words that did not match hearts" },
    body: {
      ar: "اهتمت السور المدنية بكشف من يقول بلسانه ما ليس في قلبه، لتعلّمنا أن الصدق مع الله أول الطريق.",
      en: "The Madani surahs uncover those whose tongues said what their hearts did not hold — teaching us that being truthful with Allah comes first.",
    },
    ayahs: [
      { text: "وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ", ref: "البقرة: 8" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 8", en: "The Quran, Surah Al-Baqarah: 8" },
      note: { ar: "وصف من يقول ما ليس في قلبه بنص الآية.", en: "The description of those who say what is not in their hearts is the verse's own words." },
    },
  },
  {
    number: 94,
    slug: "anulzimukumuha",
    icon: "Ruler",
    title: { ar: "كلمة من عشرة حروف", en: "A word of ten letters" },
    body: {
      ar: "كلمة ﴿أَنُلْزِمُكُمُوهَا﴾ في سورة هود من أطول كلمات القرآن، وتتكوّن من عشرة حروف.",
      en: "The word ﴿anulzimukumuha﴾ in Surah Hud is among the longest in the Quran — ten letters in one word.",
    },
    ayahs: [
      { text: "أَنُلْزِمُكُمُوهَا وَأَنتُمْ لَهَا كَارِهُونَ", ref: "هود: 28" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — سورة هود: 28", en: "Counted in the Uthmani text — Surah Hud: 28" },
      note: { ar: "عددنا حروف الكلمة فكانت عشرة.", en: "We counted the word's letters: ten." },
    },
  },
  {
    number: 95,
    slug: "ar-rahman-refrain",
    icon: "Repeat2",
    title: { ar: "سؤال يتكرّر إحدى وثلاثين مرة", en: "A question asked thirty-one times" },
    body: {
      ar: "في سورة الرحمن يتكرّر السؤال ﴿فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ﴾ إحدى وثلاثين مرة، بعد كل نعمة يذكرها الله، حتى نتوقّف ونشكر.",
      en: "In Surah Ar-Rahman the question ﴿So which of your Lord's favours would you deny?﴾ returns thirty-one times, after every blessing named — so that we stop each time and give thanks.",
    },
    ayahs: [
      { text: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ", ref: "الرحمن: 13" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — سورة الرحمن", en: "Counted in the Uthmani text — Surah Ar-Rahman" },
      note: { ar: "عددنا مواضع السؤال في السورة في النص الذي يعرضه الموقع فكانت إحدى وثلاثين.", en: "We counted the question in the surah in the text this site serves: thirty-one times." },
    },
  },
  {
    number: 96,
    slug: "two-prostrations-hajj",
    icon: "Repeat",
    title: { ar: "سورة فيها سجدتان", en: "One surah with two prostrations" },
    body: {
      ar: "سورة الحج تتفرّد بأن فيها سجدتين، واحدة في أولها وأخرى في آخرها، عند جمهور الشافعية والحنابلة.",
      en: "Surah Al-Hajj stands alone in having two prostrations — one near its start and one near its end — in the view of most Shafi'i and Hanbali scholars.",
    },
    ayahs: [],
    source: {
      reliability: "🟢",
      reference: { ar: "كتب الفقه — الشافعية والحنابلة", en: "Books of fiqh — the Shafi'i and Hanbali schools" },
      note: { ar: "البطاقة تنسب القول إلى أصحابه، وهذا هو الصواب: السجدة الثانية في الحج يعدّها الشافعية والحنابلة دون غيرهم.", en: "The card attributes the view to those who hold it, which is right: the second prostration in Al-Hajj is counted by the Shafi'is and Hanbalis and not by others." },
    },
  },
  {
    number: 97,
    slug: "morning-that-breathes",
    icon: "Wind",
    title: { ar: "والصبح إذا تنفّس", en: "The morning when it breathes" },
    body: {
      ar: "من جمال القرآن أنه يعطي المعاني صورة حيّة تتحرّك، فيصف الصبح وكأنه يتنفّس.",
      en: "Part of the beauty of the Quran is the living picture it draws: it speaks of the morning as if it takes a breath.",
    },
    ayahs: [
      { text: "وَالصُّبْحِ إِذَا تَنَفَّسَ", ref: "التكوير: 18" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة التكوير: 18", en: "The Quran, Surah At-Takwir: 18" },
      note: { ar: "الصورة بنص الآية.", en: "The image is the verse's own words." },
    },
  },
  {
    number: 98,
    slug: "first-revelation",
    icon: "Feather",
    title: { ar: "أول ما نزل: اقرأ", en: "The first word: Read" },
    body: {
      ar: "أول ما نزل من القرآن على النبي ﷺ في غار حراء خمس آيات من سورة العلق، أولها ﴿اقْرَأْ﴾.",
      en: "The first of the Quran to come to the Prophet ﷺ, in the cave of Hira, was five verses of Surah Al-Alaq, beginning with ﴿Read﴾.",
    },
    ayahs: [
      { text: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", ref: "العلق: 1" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (3) وصحيح مسلم (160) — حديث بدء الوحي", en: "Sahih al-Bukhari (3) and Sahih Muslim (160) — the account of the first revelation" },
      note: { ar: "حديث عائشة في بدء الوحي بغار حراء متفق عليه.", en: "A'ishah's report of the beginning of revelation at the cave of Hira is agreed upon by both." },
    },
  },
  {
    number: 99,
    slug: "longest-word",
    icon: "Maximize2",
    title: { ar: "أطول كلمة في القرآن", en: "The longest word in the Quran" },
    body: {
      ar: "أطول كلمة في القرآن ﴿فَأَسْقَيْنَاكُمُوهُ﴾ في سورة الحجر، وتتكوّن من أحد عشر حرفاً.",
      en: "The longest word in the Quran is ﴿fa-asqaynakumuhu﴾ in Surah Al-Hijr — eleven letters in a single word.",
    },
    ayahs: [
      { text: "فَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً فَأَسْقَيْنَاكُمُوهُ", ref: "الحجر: 22" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "عدٌّ في النص العثماني — سورة الحجر: 22", en: "Counted in the Uthmani text — Surah Al-Hijr: 22" },
      note: { ar: "أحد عشر حرفًا بالرسم الإملائي؛ وفي الرسم العثماني تُكتب بألف محذوفة فتصير عشرة، والعدّ هنا على الإملائي.", en: "Eleven letters in ordinary spelling; the Uthmani script drops one alif, making ten. The count here is the ordinary spelling." },
    },
  },
  {
    number: 100,
    slug: "preserved-forever",
    icon: "ShieldPlus",
    title: { ar: "وإنا له لحافظون", en: "And We will surely guard it" },
    body: {
      ar: "تكفّل الله بحفظ القرآن من أي تحريف، فبقي كما نزل، ويبقى معجزة باقية على مرّ العصور.",
      en: "Allah took upon Himself the guarding of the Quran from any change. It has stayed exactly as it came down, and remains a standing miracle through every age.",
    },
    ayahs: [
      { text: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ", ref: "الحجر: 9" },
    ],
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الحجر: 9", en: "The Quran, Surah Al-Hijr: 9" },
      note: { ar: "التعهّد بالحفظ بنص الآية.", en: "The promise of preservation is the verse's own words." },
    },
  },
];
