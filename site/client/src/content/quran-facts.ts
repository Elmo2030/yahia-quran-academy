// =============================================================================
// quran-facts.ts — "في رحاب القرآن": things worth knowing about the Quran,
// written for a child and turned over one card at a time.
//
// The ayah is kept apart from the prose rather than embedded in it, so it can
// stay in the Uthmani script and read right-to-left even when the rest of the
// card is in English. It is Quran; it is not translated here.
// =============================================================================

export type FactAyah = { text: string; ref: string };

export type QuranFact = {
  /** Shown on the face-down card, and stable across reorderings. */
  number: number;
  slug: string;
  /** A lucide icon name; the page maps it to a component. */
  icon: string;
  title: { ar: string; en: string };
  body: { ar: string; en: string };
  ayahs: FactAyah[];
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
  },
  {
    number: 3,
    slug: "sajdah",
    icon: "Star",
    title: { ar: "خمسة عشر موضعاً للسجود", en: "Fifteen places to prostrate" },
    body: {
      ar: "في القرآن الكريم خمسة عشر موضعاً إذا قرأناها سجدنا لله تعالى، وتُسمى سجدات التلاوة. وسورة «الحج» مميزة لأن فيها سجدتين!",
      en: "There are fifteen places in the Quran where a reader prostrates — the prostrations of recitation. Surah Al-Hajj stands out: it has two of them.",
    },
    ayahs: [],
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
  },
  {
    number: 10,
    slug: "first-and-last",
    icon: "Sparkles",
    title: { ar: "أول آية وآخر آية", en: "The first verse and the last" },
    body: {
      ar: "أول آية نزلت أمرت بالعلم والقراءة، وآخر آية نزلت تذكّرنا بالعودة إلى الله.",
      en: "The first verse revealed commanded learning and reading; the last one revealed reminds us of the return to Allah.",
    },
    ayahs: [
      { text: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", ref: "العلق: 1" },
      { text: "وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ", ref: "البقرة: 281" },
    ],
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
  },
  {
    number: 12,
    slug: "middle-word",
    icon: "AlignCenter",
    title: { ar: "الكلمة التي في منتصف القرآن", en: "The word at the very middle" },
    body: {
      ar: "كلمة ﴿وَلْيَتَلَطَّفْ﴾ في سورة الكهف تقع في منتصف كلمات القرآن الكريم تماماً، وهي تعلّمنا أن نكون لطفاء في كل تصرفاتنا.",
      en: "The word ﴿wal-yatalattaf﴾ — “and let him be gentle” — in Surah Al-Kahf sits exactly at the middle of the Quran's words. It teaches us to be gentle in everything we do.",
    },
    ayahs: [
      { text: "وَلْيَتَلَطَّفْ", ref: "الكهف: 19" },
    ],
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
  },
  {
    number: 43,
    slug: "makki-madani",
    icon: "Compass",
    title: { ar: "مكية ومدنية", en: "Makki and Madani" },
    body: {
      ar: "سور القرآن تنقسم إلى مكية ومدنية: 87 سورة نزلت قبل الهجرة، و27 سورة نزلت بعدها.",
      en: "The surahs divide into Makki and Madani: 87 came down before the Hijrah, and 27 after it.",
    },
    ayahs: [],
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
  },
  {
    number: 46,
    slug: "science",
    icon: "Microscope",
    title: { ar: "حقائق سبقت العلماء بقرون", en: "Facts that arrived centuries early" },
    body: {
      ar: "ذكر القرآن حقائق دقيقة عن الفضاء والبحار ونمو الجنين قبل أن يكتشفها العلماء بمئات السنين.",
      en: "The Quran describes the sky, the seas and the growing of a child in the womb with a precision people would not reach for hundreds of years.",
    },
    ayahs: [],
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
  },
];
