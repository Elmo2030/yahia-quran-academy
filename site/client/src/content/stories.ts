// Story collections for children.
//
// Two chapters are written. The Quran excerpts in the women's chapter are
// literal substrings of the Tanzil Uthmani corpus the reader uses, extracted
// programmatically and asserted to appear verbatim in their ayah. The animal
// chapter quotes its verses inside its own prose, as it was authored.

export type Chapter = {
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  cover: string | null;
  /** false renders the chapter as coming soon and blocks its route */
  available: boolean;
};

export const chapters: Chapter[] = [
  {
    slug: "animals", titleAr: "حيوانات في القرآن", titleEn: "Animals in the Quran",
    descriptionAr: "ثماني قصص عن حيوانات ذكرها القرآن، وما نتعلمه منها.",
    descriptionEn: "Eight stories about animals the Quran names, and what they teach.",
    cover: "/stories/animals/cover.jpg", available: true,
  },
  {
    slug: "women", titleAr: "نساء في القرآن", titleEn: "Women in the Quran",
    descriptionAr: "نماذج ملهمة من الصبر والإيمان والحكمة في قصص القرآن.",
    descriptionEn: "Inspiring examples of patience, faith, and wisdom from Quranic stories.",
    cover: "/stories/hero.jpg", available: true,
  },
  {
    slug: "prophets", titleAr: "قصص الأنبياء", titleEn: "Stories of the Prophets",
    descriptionAr: "سبع عشرة قصة من آدم إلى محمد ﷺ.",
    descriptionEn: "Seventeen stories from Adam to Muhammad.",
    cover: "/stories/prophets/cover.jpg", available: true,
  },
  {
    slug: "nations", titleAr: "شخصيات وأمم", titleEn: "People and Nations",
    descriptionAr: "تسع قصص عن أقوام وشخصيات ذكرها القرآن، وما جرى لها.",
    descriptionEn: "Nine stories about the nations and figures the Quran names, and what became of them.",
    cover: "/stories/nations/cover.jpg", available: true,
  },
];

/** A story's prose in one language. The Arabic lives on the story itself;
 *  `en` carries the same fields for the English locale, and anything without
 *  it falls back to Arabic — translations can land chapter by chapter. The
 *  `ayah` excerpt is not here: it is Quran, and stays in the Uthmani text. */
export type StoryText = {
  title: string;
  hook: string;
  events: string;
  lesson: string;
  next: string;
  quranProse?: string;
  challenge?: StoryChallenge;
  reward?: StoryReward;
  arc?: StoryArc;
};

/**
 * The rest of the arc, for a story that has been written to the content
 * standard rather than summarised.
 *
 * Readers told us the stories were too short and read like abstracts. The fix
 * is not more words around the same summary: it is the missing middle. A
 * summary jumps from "he left his people" to "and the lesson is"; a story
 * puts the child somewhere (`setting`), lets one thing cause the next
 * (`events`, which stays where it was), stops at the moment the whole story
 * turns on (`keyMoment`), and lands before it teaches (`resolution`). Only
 * then do the three lessons, the open question, and one small thing to do
 * today mean anything.
 *
 * It is optional on purpose. The forty-two move over a chapter at a time, and
 * a story without an arc still renders in the shape it shipped with — so the
 * section is never half-broken, only partly deepened. `stories-arc.test.ts`
 * pins which slugs are still waiting, so that list can only shrink.
 */
export type StoryArc = {
  /** one sentence, for the story card — what this story is about */
  idea: string;
  /** where we are, who is there, how things stand before anything happens */
  setting: string;
  /** the one moment the story turns on */
  keyMoment: string;
  /** how it actually ended, before any lesson is drawn */
  resolution: string;
  /** one hard word, explained — only where the story has one */
  word?: { term: string; meaning: string };
  /** three short lines; the central lesson stays in `lesson` above them */
  lessons: string[];
  /** an open question for the child. There is no right answer to mark. */
  think: string;
  /** one small thing to do today, so the story ends in an action */
  tryToday: string;
};

/**
 * One question at the end of a story, and the medal behind it.
 *
 * The Seerah and the creed have had these from the start; the Quran stories
 * were the one section a child could only read at. The question is always
 * answerable from the story just read — it checks that they were there, it
 * does not test them — and the medal stays hidden until the answer is right,
 * so there is something to earn rather than something to scroll past.
 */
export type StoryChallenge = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export type StoryReward = {
  /** shown in the middle of the drawn medal */
  icon: string;
  badge: string;
  keepsake: string;
  note: string;
};

export type Story = {
  chapter: string;
  slug: string;
  title: string;
  en?: StoryText;
  surahName: string;
  hook: string;
  events: string;
  lesson: string;
  next: string;
  /** absent where the chapter ships a cover rather than per-story art */
  image?: string;
  /** present where the excerpt was taken from the Uthmani corpus */
  ayah?: { ref: string; surah: number; number: number; text: string };
  /** the animal chapter carries its citation inside its own prose */
  quranProse?: string;
  challenge: StoryChallenge;
  reward: StoryReward;
  source: StorySource;
  arc?: StoryArc;
};

/**
 * Where a story comes from, and what in it is Quran and what is not.
 *
 * These stories are told to children as true. Most of them are the Quran's own
 * words retold; but several carry names the Quran never gives — Hawwa, Sarah,
 * Bilqis, Asiyah, Uzair — and a few rest on reports the commentators differ
 * over. A child is not harmed by the distinction; they are harmed by never
 * being shown it, and by a parent later finding a tafsir opinion presented as
 * revelation. So each story says which is which, with one of two marks:
 *
 *   🟢  the substance is in the Quran or in an authentic hadith, and the note
 *       names any detail that comes from elsewhere
 *   🟡  the substance itself rests on reports scholars differ over
 */
export type StorySource = {
  reliability: "🟢" | "🟡";
  reference: { ar: string; en: string };
  note: { ar: string; en: string };
};

export const stories: Story[] = [
  {
    chapter: "nations", slug: "ashab-al-kahf",
    image: "/stories/nations/ashab-al-kahf.jpg",
    en: {
      title: "The People of the Cave",
      hook:
        "If you had to choose between staying home among your family and hiding what you believe, or walking out alone to a place you do not know and cannot tell when you will leave — which would you choose? In today's story, some young men stood at exactly that choice. What they chose changed their lives for three centuries.",
      events:
        "They gathered and said one sentence that settled everything: {Our Lord is the Lord of the heavens and the earth. Never will we invoke besides Him any deity.} Then they said to one another: {And when you have withdrawn from them and that which they worship other than Allah, retreat to the cave.} So they left their homes and their whole city, went into a cave in a mountain, and prayed: {Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair.} Then they slept.",
      lesson:
        "Whoever gives something up for Allah is given something better in return, in a way they never imagined.",
      next:
        "The People of the Cave were smart youth who chose faith. In our next story, we will meet a great man who wasn't a prophet, but was very famous for something called 'Wisdom', and he gave his son golden advice! Who is he? He is Luqman the Wise!",
      quranProse:
        "Allah Almighty says in the Quran about their wondrous sleep: {Therefore We covered up their (sense of) hearing in the cave for a number of years.}",
      challenge: {
        question: "How many lunar years did the People of the Cave sleep?",
        options: ["A hundred", "309", "A thousand"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🕳️",
        badge: "Steadfast on the truth",
        keepsake: "The lamp of the cave",
        note: "A reminder that Allah guards whoever turns to Him, even through three centuries of sleep.",
      },
      arc: {
        idea: "Young men who chose their Lord over their whole city, slept three centuries, and woke to a different world.",
        setting:
          "{Indeed, they were youths who believed in their Lord, and We increased them in guidance} — youths, young men. They lived in a city where something other than Allah was worshipped, and its king forced people to it and accepted nothing else. They had no family strong enough to shield them and no power to defend themselves. And they knew that if their faith became known, they would not be left alone. That is the situation they met in.",
        keyMoment:
          "The sleep is not a small detail in this story; it is the story. {So We cast a cover of sleep over their ears within the cave for a number of years.} They went into the cave thinking they were hiding for a day or a few days, and Allah kept them there three hundred years and nine, the sun leaning away from their cave as it rose and as it set so it would not harm them, while they slept and knew nothing of it. They did what they could — leave, and take shelter — and Allah took care of what they could not.",
        resolution:
          "Then Allah woke them, and they asked each other: how long did we stay? A day, or part of a day. They sent one of them with their coins to buy food, telling him to be careful and let no one notice them — still afraid of a king who had died centuries earlier. So their story became known, and they found that the city they had fled from now believed. The king they feared left not even a name behind, and they remain in the Book of Allah, their story read to this day.",
        word: { term: "Youths", meaning: "Young men, early in life — the Quran chose this word to tell you who it was that took this stand." },
        lessons: [
          "A young person can stand with the truth even when a whole city stands on the other side.",
          "Do what is in your power, and leave what is not in your power to Allah.",
          "Begin every hard thing with a prayer; that is how the youths began before they slept.",
        ],
        think:
          "The youths left their homes without knowing where they were going. What is the hardest thing you have given up because you knew it was not right? How did you feel afterwards?",
        tryToday:
          "Pick one thing today that you know Allah does not love, and leave it — just for today. Then see tomorrow whether you can leave it another day.",
      },
    },
    title: "قصة أصحاب الكهف",
    surahName: "",
    hook:
      "لو خُيِّرتَ بين أن تبقى في بيتك بين أهلك وتخفي ما تؤمن به، وبين أن تخرج وحدك إلى مكان لا تعرفه ولا تعرف متى ترجع منه… ماذا تختار؟ في قصة اليوم فتية صغار وقفوا أمام هذا الاختيار بالضبط، وما اختاروه غيّر حياتهم ثلاثة قرون.",
    events:
      "فاجتمعوا وقالوا كلمة واحدة حسمت كل شيء: ﴿رَبُّنَا رَبُّ السَّمَاوَاتِ وَالْأَرْضِ لَن نَّدْعُوَ مِن دُونِهِ إِلَٰهًا﴾. ثم قال بعضهم لبعض: ﴿وَإِذِ اعْتَزَلْتُمُوهُمْ وَمَا يَعْبُدُونَ إِلَّا اللَّهَ فَأْوُوا إِلَى الْكَهْفِ﴾ — أي ما دمتم قد فارقتموهم فالجأوا إلى الكهف. فخرجوا من بيوتهم ومن مدينتهم كلها، ودخلوا كهفًا في جبل، ودعوا: ﴿رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا﴾. ثم ناموا.",
    quranProse: "يقول الله تعالى في القرآن عن نومهم العجيب: {فَضَرَبْنَا عَلَىٰ آذَانِهِمْ فِي الْكَهْفِ سِنِينَ عَدَدًا}. (أي ألقينا عليهم نوماً عميقاً).",
    lesson:
      "من ترك شيئًا لله عوّضه الله خيرًا منه، بطريقة لا تخطر له على بال.",
    next: "أصحاب الكهف كانوا شباباً أذكياء اختاروا الإيمان. وفي قصتنا القادمة، سنتعرف على رجل عظيم لم يكن نبياً، ولكنه كان مشهوراً جداً بشيء اسمه 'الحكمة'، وأعطى ابنه نصائح ذهبية نكتبها بماء الذهب! من هو؟ إنه لقمان الحكيم!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 9-26", en: "The Quran, Surah Al-Kahf: 9-26" },
      note: { ar: "القصة كلها في سورة الكهف، ومنها عدد سنيّ نومهم وذكر كلبهم. ولم يبيّن القرآن عددهم ولا زمانهم، وما يُروى في ذلك أقوال.", en: "The whole account is in Surah Al-Kahf, including the years of their sleep and the mention of their dog. The Quran does not say how many they were or when they lived; what is told of that is opinion." },
    },
    challenge: {
      question: "كم سنة قمرية نام أصحاب الكهف؟",
      options: ["مئة سنة", "309 سنوات", "ألف سنة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🕳️",
      badge: "ثابت على الحق",
      keepsake: "مصباح الكهف",
      note: "يذكّرك أن الله يحفظ من لجأ إليه، ولو نام الزمن كله.",
    },
    arc: {
      idea: "فتيةٌ اختاروا ربّهم على مدينتهم كلها، فناموا ثلاثة قرون واستيقظوا على دنيا أخرى.",
      setting:
        "﴿إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى﴾ — فتية، أي شباب صغار في السنّ. كانوا يعيشون في مدينة يُعبد فيها غير الله، وملكُها يجبر الناس على ذلك ولا يقبل منهم غيره. ولم يكن لهم أهل يحمونهم، ولا قوة يدفعون بها عن أنفسهم. وكانوا يعرفون أن أمرهم إن ظهر لم يُتركوا. وهذا هو الموقف الذي اجتمعوا فيه.",
      keyMoment:
        "والنوم هنا ليس تفصيلًا صغيرًا في القصة؛ هو القصة. ﴿فَضَرَبْنَا عَلَىٰ آذَانِهِمْ فِي الْكَهْفِ سِنِينَ عَدَدًا﴾. دخلوا الكهف يظنّون أنهم يختبئون يومًا أو أيامًا، فإذا الله يحفظهم ثلاثمائة سنة وتسعًا، والشمس تميل عن كهفهم إذا طلعت وإذا غربت فلا تؤذيهم، وهم نائمون لا يعلمون. فعلوا ما يقدرون عليه — أن يخرجوا ويلجأوا — وتولّى الله ما لا يقدرون عليه.",
      resolution:
        "ثم أيقظهم الله، فتساءلوا بينهم: كم لبثنا؟ يومًا أو بعض يوم. وأرسلوا واحدًا منهم بنقودهم يشتري طعامًا، وأوصوه أن يتلطّف ولا يشعر بهم أحد — وهم ما زالوا يخافون ملكًا مات من مئات السنين. فعُرف أمرهم، ووجدوا المدينة التي هربوا منها قد آمنت كلها. والملك الذي خافوه لم يبقَ منه اسم، وهم باقون في كتاب الله يُقرأ خبرهم إلى اليوم.",
      word: { term: "فِتْيَة", meaning: "شباب صغار في السنّ — والقرآن اختار هذه الكلمة ليخبرك من الذي وقف هذا الموقف." },
      lessons: [
        "الصغير يستطيع أن يقف مع الحقّ ولو كانت المدينة كلها في الجهة الأخرى.",
        "افعل ما تقدر عليه، ودَعْ ما لا تقدر عليه على الله.",
        "ابدأ كل أمر صعب بدعاء؛ فهكذا بدأ الفتية قبل أن يناموا.",
      ],
      think:
        "خرج الفتية من بيوتهم وهم لا يعرفون إلى أين يذهبون. ما أصعب شيء تركتَه لأنك تعرف أنه لا يصحّ؟ وماذا شعرتَ بعد أن تركته؟",
      tryToday:
        "اختر اليوم شيئًا واحدًا تعرف أن الله لا يحبّه، واتركه اليوم فقط. ثم انظر غدًا هل تستطيع أن تتركه يومًا آخر.",
    },
  },
  {
    chapter: "nations", slug: "luqman",
    image: "/stories/nations/luqman.jpg",
    en: {
      title: "Luqman the Wise",
      hook:
        "The Quran is full of counsel from Allah to people. It also holds the counsel of one man to his son — a man who was not a prophet, not a king, and whose wealth is never mentioned. So what did he say to his son, that his words are kept in the Book of Allah thousands of years later?",
      events:
        "Luqman sat with his son {while he was instructing him} — instruction from someone who loves you, not someone who is angry — and said: {O my son, do not associate anything with Allah.} He began with the most important thing of all. Then he charged him with his parents, then said: {O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you.} Then he moved to what you might think small: {And do not turn your cheek in contempt toward people and do not walk through the earth exultantly.} Then: {And be moderate in your pace and lower your voice.} He gathered the whole religion for him — belief, worship, and character, down to how he walks and how loudly he speaks.",
      lesson:
        "The most valuable thing a father gives his child is a true word, and the first word is that the child should know their Lord.",
      next:
        "Luqman used his wisdom in speaking kind words. But in the next story, we will meet a great king who used his power and engineering wisdom to build a massive wall of iron! Why did he build it? And who are Gog and Magog? Let's find out the story of Dhul-Qarnayn!",
      quranProse:
        "Allah says about giving wisdom to Luqman: {And We had certainly given Luqman wisdom [saying], 'Be grateful to Allah.' And whoever is grateful is grateful for [the benefit of] himself.}",
      challenge: {
        question: "What was the first thing Luqman told his son?",
        options: ["Never to associate anything with Allah", "To gather wealth", "To travel far away"],
        correctAnswer: 0,
      },
      reward: {
        icon: "🌳",
        badge: "A little wise one",
        keepsake: "The mat of wisdom",
        note: "A reminder that the most precious thing a father leaves a child is a true word.",
      },
      arc: {
        idea: "A father who was no prophet sat with his son, and what he said is kept in the Quran to this day.",
        setting:
          "Luqman was a righteous man whom Allah gave wisdom. Wisdom is not knowing a great deal; it is knowing what helps, and when to say it, and how. {And We had certainly given Luqman wisdom, [saying], be grateful to Allah} — notice the first thing said to him along with wisdom: be grateful. Most scholars hold that he was not a prophet; that is, he was a man like us, who learned and grew wise, with no revelation coming down to him.",
        keyMoment:
          "Among all that counsel is one sentence that could fill a lifetime by itself. He said: {O my son, indeed if a deed should be the weight of a mustard seed, and it should be within a rock or in the heavens or in the earth, Allah will bring it forth.} A mustard seed is very small. He is telling his son: if your deed were as small as that seed, hidden inside a rock, or in the furthest place in the sky, Allah knows it and will bring it out. Nothing small is ever lost — not of good, and not of bad.",
        resolution:
          "And the counsel ended. Luqman left his son no wealth that is mentioned, no kingdom, no army. He left him words. And the words are what lasted: a whole surah in the Quran carrying his name, read today by children he did not know would be born, in lands he did not know existed. That is what a true word does.",
        word: { term: "The weight of a mustard seed", meaning: "The weight of a very small seed — the proverb for something tiny." },
        lessons: [
          "Begin with what matters most: knowing Allah, before any other advice.",
          "How you treat people is part of your religion, down to your walk and your voice.",
          "Never think a small deed is nothing; Allah brings forth even a mustard seed's weight.",
        ],
        think:
          "Luqman gave his son many pieces of advice in a few verses. If you could give only one to your younger brother or your friend, which would you choose? And why that one?",
        tryToday:
          "Lower your voice once today where you were about to raise it, and remember Luqman's words: {and lower your voice}.",
      },
    },
    title: "قصة لقمان الحكيم",
    surahName: "",
    hook:
      "في القرآن وصايا كثيرة من الله للناس. وفيه أيضًا وصايا رجل واحد لابنه — رجل لم يكن نبيًّا ولا ملكًا ولا غنيًّا ذُكر غناه. فماذا قال لابنه حتى يبقى كلامه محفوظًا في كتاب الله آلاف السنين؟",
    events:
      "جلس لقمان مع ابنه ﴿وَهُوَ يَعِظُهُ﴾ — والوعظ كلام محبّ لا كلام غاضب — فقال: ﴿يَا بُنَيَّ لَا تُشْرِكْ بِاللَّهِ﴾. بدأ بأهمّ شيء قبل كل شيء. ثم أوصاه بوالديه، ثم قال: ﴿يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ﴾. ثم انتقل إلى ما قد تحسبه صغيرًا: ﴿وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا﴾ — لا تُدِر وجهك عن الناس تكبّرًا، ولا تمشِ مختالًا. ثم: ﴿وَاقْصِدْ فِي مَشْيِكَ وَاغْضُضْ مِن صَوْتِكَ﴾. فجمع له الدين كلّه: عقيدةً، وعبادةً، وخُلقًا، حتى في مشيه وصوته.",
    quranProse: "يقول الله تعالى عن إعطائه الحكمة للقمان: {وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ}.",
    lesson:
      "أغلى ما يعطيه الأب لابنه كلمةٌ صادقة، وأوّل الكلام أن يعرف ابنه ربّه.",
    next: "لقمان استخدم حكمته في الكلام الطيب. لكن في القصة القادمة، سنتعرف على ملك عظيم استخدم قوته وحكمته الهندسية ليبني سداً ضخماً جداً من الحديد! لماذا بناه؟ ومن هم يأجوج ومأجوج؟ تعالوا نعرف قصة ذو القرنين!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة لقمان: 12-19", en: "The Quran, Surah Luqman: 12-19" },
      note: { ar: "الوصايا بنص الآيات. ولقمان رجل صالح آتاه الله الحكمة، وجمهور العلماء على أنه لم يكن نبياً.", en: "The counsels are the verses' own words. Luqman was a righteous man given wisdom; most scholars hold that he was not a prophet." },
    },
    challenge: {
      question: "ما أول وصية أوصى بها لقمان ابنه؟",
      options: ["ألا يشرك بالله شيئاً", "أن يجمع المال", "أن يسافر بعيداً"],
      correctAnswer: 0,
    },
    reward: {
      icon: "🌳",
      badge: "حكيم صغير",
      keepsake: "حصيرة الحكمة",
      note: "تذكّرك أن أغلى ما يورّثه الأب لابنه كلمة صادقة.",
    },
    arc: {
      idea: "أبٌ ليس نبيًّا جلس مع ابنه فقال له كلامًا حفظه القرآن إلى اليوم.",
      setting:
        "لقمان رجل صالح آتاه الله الحكمة. والحكمة ليست أن تعرف كثيرًا، بل أن تعرف ما ينفع، ومتى تقوله، وكيف. ﴿وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ﴾ — وانتبه إلى أول ما قيل له مع الحكمة: أن يشكر. وجمهور العلماء على أنه لم يكن نبيًّا؛ أي أنه رجل مثلنا، تعلّم فحكُم، وليس معه وحي يُنزَّل عليه.",
      keyMoment:
        "وبين هذه الوصايا جملة تكفي وحدها عمرًا كاملًا. قال له: ﴿يَا بُنَيَّ إِنَّهَا إِن تَكُ مِثْقَالَ حَبَّةٍ مِّنْ خَرْدَلٍ فَتَكُن فِي صَخْرَةٍ أَوْ فِي السَّمَاوَاتِ أَوْ فِي الْأَرْضِ يَأْتِ بِهَا اللَّهُ﴾. وحبّة الخردل حبّة صغيرة جدًّا. يقول لابنه: لو كان عملك في صغر هذه الحبّة، ومخبّأً داخل صخرة، أو في أبعد موضع في السماء، يعلمه الله ويأتي به. فلا صغير يضيع؛ لا في الخير ولا في الشرّ.",
      resolution:
        "وانتهت الوصايا. ولم يورّث لقمانُ ابنَه مالًا ذُكر، ولا مُلكًا، ولا جيشًا. ورّثه كلامًا. والكلام هو الذي بقي: سورة كاملة في القرآن تحمل اسمه، يقرؤها اليوم أطفال لم يكن يعلم أنهم سيولدون، في بلاد لم يكن يعرف أنها موجودة. وهذا ما تفعله الكلمة الصادقة.",
      word: { term: "مِثْقَال حَبَّةٍ من خَرْدَل", meaning: "وزن حبّة صغيرة جدًّا، يُضرب بها المثل في الصِّغر." },
      lessons: [
        "ابدأ بالأهمّ: معرفة الله قبل كل وصية أخرى.",
        "أخلاقك مع الناس جزء من دينك، حتى في مشيك وصوتك.",
        "لا تحقر عملًا صغيرًا؛ فمثقال حبّة الخردل يأتي الله بها.",
      ],
      think:
        "أوصى لقمان ابنه وصايا كثيرة في آيات قليلة. لو كان عليك أن تقول وصيّة واحدة فقط لأخيك الصغير أو لصاحبك، فماذا تختار؟ ولماذا هذه بالذات؟",
      tryToday:
        "اخفض صوتك اليوم في موضع كنتَ سترفعه فيه، وتذكّر وصية لقمان: ﴿وَاغْضُضْ مِن صَوْتِكَ﴾.",
    },
  },
  {
    chapter: "nations", slug: "dhul-qarnayn",
    image: "/stories/nations/dhul-qarnayn.jpg",
    en: {
      title: "The Story of Dhul-Qarnayn",
      hook:
        "If you could go anywhere on earth and do whatever you wished there, what would you do? In today's story there was a man who truly could. He reached the setting place of the sun and its rising place — and then stood before a people who could barely understand his speech, and did the greatest thing he ever did.",
      events:
        "In the west he found a people, and Allah gave him the choice between punishing and doing good. He said: {As for one who wrongs, we will punish him… But as for one who believes and does righteousness, he will have a reward of the best} — justice built on deeds, not on a ruler's mood. Then he went east and found a people {for whom We had not made against it any shelter}, and left them as they were without wronging them. Then he reached a place between two mountains and found a people {who could hardly understand speech}. They complained to him of corruption in the land from Gog and Magog, and offered to gather him payment to build a barrier between them.",
      lesson:
        "Strength is a blessing its owner is asked about: did he shield the weak with it, or only enlarge himself?",
      next:
        "Dhul-Qarnayn was a king who helped the weak. But what if the king is the evil oppressor? How can one person defend the truth inside the palace of this evil king? This is what we will know in the story of the brave hero: The Believer of Pharaoh's Family!",
      quranProse:
        "Allah says about this strong barrier built by Dhul-Qarnayn: {So they [Gog and Magog] were unable to pass over it, nor were they able [to make] a hole in it.}",
      challenge: {
        question: "What did Dhul-Qarnayn build the barrier from?",
        options: ["Clay and straw", "Blocks of iron and molten copper", "Sand"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🧱",
        badge: "Strong and trustworthy",
        keepsake: "A piece of copper",
        note: "A reminder that strength is a gift, and its finest use is shielding the weak.",
      },
      arc: {
        idea: "A king who reached the earth's east and west, and when he built the greatest thing he built, said: this is not from me.",
        setting:
          "{Indeed, We established him upon the earth, and We gave him to everything a way} — Allah gave him the power, the knowledge and the means to reach whatever he set out for. The Quran does not tell us who he was, or when he lived, or where his kingdom stood; it tells us what he did. He travelled the earth three times: once westward, once eastward, and once until he reached a place between two barriers.",
        keyMoment:
          "Then he said the sentence the whole story turns on: {That in which my Lord has established me is better, so assist me with strength.} That is: what my Lord has given me is better than your money, so I will take nothing from you — but help me with your own hands. A king who owns the earth refuses the payment, and asks a weak people to work beside him rather than watch him. Then he built: blocks of iron between the two mountains, then fire until the iron glowed, then molten copper poured over it. And it became a wall {so they were unable to pass over it, nor were they able to bore through it}.",
        resolution:
          "Then he stood before this great work that no one before him had managed — and what did he say? {This is a mercy from my Lord; but when the promise of my Lord comes, He will make it level.} That is: this is not from me, it is a mercy from my Lord, and a day will come when He levels it with the ground. He did not write his name on it. He did not say, look what I made. Between that sentence and Qarun's — \"I was only given it because of knowledge I have\" — lies the whole difference.",
        word: { term: "Blocks of iron", meaning: "Large pieces of iron, built with the way others build with stone." },
        lessons: [
          "If you are given strength, use it to stand up for those who have none.",
          "Take your reward from Allah, and help people to help themselves.",
          "Give credit where it belongs; of his greatest work he said, a mercy from my Lord.",
        ],
        think:
          "He could have taken their money and built it himself, and he refused and asked them to work with him. Why do you think that was? And what is the difference between giving someone something and working alongside them?",
        tryToday:
          "Help someone today with something they are doing with their own hands — work with them rather than doing it instead of them.",
      },
    },
    title: "قصة ذو القرنين",
    surahName: "",
    hook:
      "لو كان بيدك أن تذهب إلى أيّ مكان في الأرض، وأن تفعل فيه ما تشاء، فماذا كنت ستفعل؟ في قصة اليوم رجلٌ كان يملك ذلك فعلًا: بلغ مغرب الشمس ومشرقها، ثم وقف أمام قوم لا يكادون يفهمون كلامه، فكان أعظم ما فعله معهم.",
    events:
      "في المغرب وجد قومًا، فخيّره الله فيهم بين أن يعذّب وأن يُحسن، فقال: ﴿أَمَّا مَن ظَلَمَ فَسَوْفَ نُعَذِّبُهُ… وَأَمَّا مَنْ آمَنَ وَعَمِلَ صَالِحًا فَلَهُ جَزَاءً الْحُسْنَىٰ﴾ — عدلٌ مبنيّ على العمل، لا على مزاج الحاكم. ثم مضى إلى المشرق فوجد قومًا ﴿لَّمْ نَجْعَل لَّهُم مِّن دُونِهَا سِتْرًا﴾، فتركهم على حالهم ولم يظلمهم. ثم بلغ موضعًا بين جبلين، ووجد قومًا ﴿لَّا يَكَادُونَ يَفْقَهُونَ قَوْلًا﴾، فشكوا إليه فسادًا في الأرض من يأجوج ومأجوج، وعرضوا عليه مالًا يجمعونه له ليبني بينهم وبينهم سدًّا.",
    quranProse: "يقول الله تعالى عن هذا السد القوي الذي بناه ذو القرنين: {فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا}. (أي لم يستطع الأشرار أن يتسلقوه أو يثقبوه).",
    lesson:
      "القوة نعمةٌ يُسأل عنها صاحبها: أحمى بها ضعيفًا، أم زاد بها نفسه؟",
    next: "ذو القرنين كان ملكاً يساعد الضعفاء. ولكن ماذا لو كان الملك هو الشرير الظالم؟ كيف يمكن لشخص واحد أن يدافع عن الحق داخل قصر هذا الملك الشرير؟ هذا ما سنعرفه في قصة البطل الشجاع: مؤمن آل فرعون!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 83-98", en: "The Quran, Surah Al-Kahf: 83-98" },
      note: { ar: "القصة بنص الآيات. ولم يبيّن القرآن من هو ذو القرنين ولا في أي زمان كان، وما يُذكر في تعيينه أقوال لا يثبت منها شيء.", en: "The account is the verses' own words. The Quran does not say who Dhul-Qarnayn was or when he lived, and the attempts to identify him are opinions, none established." },
    },
    challenge: {
      question: "من أي شيء بنى ذو القرنين السدّ؟",
      options: ["من الطين والقش", "من زبر الحديد والنحاس المذاب", "من الرمل"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🧱",
      badge: "قويٌّ أمين",
      keepsake: "قطعة نحاس",
      note: "تذكّرك أن القوة نعمة، وأجمل ما فيها أن تحمي بها الضعيف.",
    },
    arc: {
      idea: "ملكٌ بلغ الأرض شرقًا وغربًا، وحين بنى أعظم ما بنى قال: هذا ليس مني.",
      setting:
        "﴿إِنَّا مَكَّنَّا لَهُ فِي الْأَرْضِ وَآتَيْنَاهُ مِن كُلِّ شَيْءٍ سَبَبًا﴾ — أي آتاه الله القوّة والعلم والأدوات التي يبلغ بها ما يريد. ولم يخبرنا القرآن من هو، ولا في أيّ زمان كان، ولا أين كانت مملكته؛ أخبرنا بما فعل. وقد سار في الأرض ثلاث مرّات: مرّةً نحو المغرب، ومرّةً نحو المشرق، ومرّةً حتى بلغ موضعًا بين سدّين.",
      keyMoment:
        "فقال كلمةً هي قلب القصة كلها: ﴿مَا مَكَّنِّي فِيهِ رَبِّي خَيْرٌ فَأَعِينُونِي بِقُوَّةٍ﴾ — أي: ما أعطاني ربي خيرٌ من مالكم، فلا آخذ منكم شيئًا؛ لكن أعينوني بسواعدكم. ملكٌ يملك الأرض، يردّ الأجر، ويطلب من القوم الضعفاء أن يعملوا معه بأيديهم لا أن يتفرّجوا عليه. ثم بنى: زُبَر الحديد بين الجبلين، ثم النار حتى صار الحديد كالنار، ثم النحاس المذاب يُفرَغ فوقه. فصار جدارًا ﴿فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا﴾.",
      resolution:
        "ثم وقف أمام هذا البناء العظيم الذي عجز عنه الناس قبله، فماذا قال؟ ﴿هَٰذَا رَحْمَةٌ مِّن رَّبِّي فَإِذَا جَاءَ وَعْدُ رَبِّي جَعَلَهُ دَكَّاءَ﴾ — أي: هذا ليس مني، بل رحمة من ربي، وسيأتي يوم يجعله مستويًا بالأرض. لم يكتب اسمه عليه، ولم يقل: انظروا ماذا صنعتُ. وبين هذه الكلمة وكلمة قارون — «إنما أوتيته على علم عندي» — يقع الفرق كلّه.",
      word: { term: "زُبَر الحديد", meaning: "القطع الكبيرة من الحديد، يُبنى بها كما يُبنى بالحجارة." },
      lessons: [
        "إذا ملكتَ قوّة فاستعملها في نصرة من لا قوّة له.",
        "خذ أجرك من الله، وأعِن الناس على أن يعينوا أنفسهم.",
        "انسب الفضل لصاحبه؛ فأعظم ما بناه قال عنه: رحمةٌ من ربي.",
      ],
      think:
        "كان يستطيع أن يأخذ مالهم ويبني لهم وحده، فرفض وطلب منهم أن يعملوا معه. لماذا في رأيك؟ وما الفرق بين أن تعطي أحدًا شيئًا وبين أن تعمل معه؟",
      tryToday:
        "أعِن اليوم أحدًا في شيء يعمله بيده، واعمل معه ولا تفعله بدلًا منه.",
    },
  },
  {
    chapter: "nations", slug: "believer-of-pharaoh",
    image: "/stories/nations/believer-of-pharaoh.jpg",
    en: {
      title: "The Believer of Pharaoh's Family",
      hook:
        "The bravest thing a person does is not to carry a sword. It is to say a true word in a place where it is not said, in front of someone who could kill them for it. In today's story, one man did exactly that — inside Pharaoh's own palace, surrounded by his men.",
      events:
        "Pharaoh said before his court: {Let me kill Musa and let him call upon his Lord.} Here this man could have stayed silent. He had hidden his faith all those years; no one knew, and no one would have blamed him. But he stood up. {And a believing man from the family of Pharaoh who concealed his faith said, Do you kill a man because he says, My Lord is Allah?} He did not say \"I am with him.\" He said to them: do you kill a man for saying my Lord is Allah? And he argued with their own reason: {while he has brought you clear proofs from your Lord}, reminded them what had befallen nations before them, and said: {And if he should be lying, then upon him is his lie} — if he is lying, his lie is on him, not on you; so why kill him?",
      lesson:
        "A true word needs no army; it needs a heart that fears no one but Allah.",
      next:
        "The believer of Pharaoh's family defended the truth bravely. But in the next story, we will learn about an entire group of believers who decided to stand firm and not give up their belief in Allah, even if they were thrown into trenches filled with fire! Who are they? They are the People of the Ditch!",
      quranProse:
        "Allah says, describing the bravery of this man: {And a believing man from the family of Pharaoh who concealed his faith said, 'Do you kill a man [merely] because he says, My Lord is Allah?'}",
      challenge: {
        question: "What did the believer of Pharaoh's house do when Pharaoh moved to kill Musa?",
        options: ["Stayed silent out of fear", "Stood up and argued in his defence", "Fled the palace"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🕯️",
        badge: "A voice in the dark",
        keepsake: "A shaft of light",
        note: "A reminder that a true word needs no army — only a brave heart.",
      },
      arc: {
        idea: "A man who hid his faith for years, then spoke in the one moment when silence would have been easiest.",
        setting:
          "In Egypt, inside Pharaoh's own palace — the man who said {I am your most exalted lord} — lived a man of his household who believed in Allah and kept it hidden. He could not show it; if he had, he would have been killed. Every day he heard what was said about Musa, saw how he was treated, and said nothing. Until a day came when silence was no longer possible: Pharaoh decided to kill Musa.",
        keyMoment:
          "Notice exactly what he did, because it is the most remarkable thing in the story. He did not shout, or curse, or announce his faith and lose everything in an instant. He spoke with reason, and stood as their adviser rather than their enemy: {O my people, sovereignty is yours today, prevailing in the land. But who would protect us from the punishment of Allah if it came to us?} He said \"my people,\" and he said \"protect us\" — placing himself among them while disagreeing with them. That is courage and wisdom together: to say the whole truth, and to say it in a way that can actually be heard.",
        resolution:
          "Then he ended with a sentence after which he feared nothing: {And I entrust my affair to Allah. Indeed, Allah is Seeing of His servants.} And the outcome? {So Allah protected him from the evils they plotted, and the people of Pharaoh were enveloped by the worst of punishment.} Allah shielded him from all their scheming, and the ones he had feared were destroyed. The Quran never gives his name, so he is known by what he did rather than who he was: the believer of Pharaoh's family.",
        word: { term: "I entrust my affair to Allah", meaning: "I hand the whole matter to Him and trust Him with it — what you say once you have done your part and the rest is not yours." },
        lessons: [
          "Say the truth even if you are alone; one person with Allah is more than a full palace.",
          "Say it with reason and calm; a word that gets heard beats a shout that gets dismissed.",
          "When you have done your part, entrust the rest to Allah.",
        ],
        think:
          "The man hid his faith for years, then spoke at the most dangerous moment. When have you spoken up where staying quiet would have been easier? What made you speak?",
        tryToday:
          "If you see someone wronged or mocked today, say one sentence in their defence — even just: that is not right.",
      },
    },
    title: "قصة مؤمن آل فرعون",
    surahName: "",
    hook:
      "أشجع ما يفعله الإنسان ليس أن يحمل سيفًا. أشجع ما يفعله أن يقول كلمة حقّ في مكان لا يُقال فيه، أمام من يملك أن يقتله عليها. في قصة اليوم رجل واحد فعل ذلك — داخل قصر فرعون نفسه، ووسط رجاله.",
    events:
      "وقال فرعون أمام مَلَئه: ﴿ذَرُونِي أَقْتُلْ مُوسَىٰ وَلْيَدْعُ رَبَّهُ﴾. وهنا كان يستطيع هذا الرجل أن يسكت؛ فهو لم يكشف إيمانه طول هذه السنين، ولا أحد يعلم به، ولن يلومه أحد. لكنه قام. ﴿وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ﴾. ولم يقل: أنا معه. قال لهم: أتقتلون رجلًا لأنه قال ربي الله؟ وحاجّهم بعقولهم: ﴿وَقَدْ جَاءَكُم بِالْبَيِّنَاتِ مِن رَّبِّكُمْ﴾، وذكّرهم بما حلّ بالأمم قبلهم، وقال: ﴿وَإِن يَكُ كَاذِبًا فَعَلَيْهِ كَذِبُهُ﴾ — إن كان كاذبًا فكذبه عليه لا عليكم، فلماذا تقتلونه؟",
    quranProse: "يقول الله تعالى واصفاً شجاعة هذا الرجل: {وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ}.",
    lesson:
      "كلمة الحقّ لا تحتاج إلى جيش؛ تحتاج إلى قلب لا يخاف إلا الله.",
    next: "مؤمن آل فرعون دافع عن الحق بشجاعة. ولكن في القصة القادمة، سنتعرف على مجموعة كاملة من المؤمنين، قرروا الصمود وعدم التخلي عن توحيد الله حتى لو ألقوا في خنادق مليئة بالنار! من هم؟ إنهم أصحاب الأخدود!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة غافر: 28-45", en: "The Quran, Surah Ghafir: 28-45" },
      note: { ar: "حجاجه ودفاعه عن موسى بنص الآيات، ولم يسمِّه القرآن.", en: "His argument and his defence of Musa are the verses' own words; the Quran does not name him." },
    },
    challenge: {
      question: "ماذا فعل مؤمن آل فرعون حين همّ فرعون بقتل موسى؟",
      options: ["سكت خوفاً", "وقف يدافع عنه بالحجة", "هرب من القصر"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🕯️",
      badge: "صوتٌ في الظلمة",
      keepsake: "شعاع النور",
      note: "يذكّرك أن كلمة الحق لا تحتاج جيشاً، تحتاج قلباً شجاعاً.",
    },
    arc: {
      idea: "رجلٌ كتم إيمانه سنين، ثم تكلّم في اللحظة التي كان السكوت فيها أسهل شيء.",
      setting:
        "في مصر، وفي قصر فرعون نفسه — الرجل الذي قال: ﴿أَنَا رَبُّكُمُ الْأَعْلَىٰ﴾ — عاش رجل من أهل بيته يؤمن بالله ويكتم إيمانه. لم يكن يستطيع أن يظهره، فلو ظهر لقُتل. وكان يسمع كل يوم ما يُقال عن موسى، ويرى كيف يُعامَل، ويسكت. حتى جاء يوم لم يعد السكوت فيه ممكنًا: قرّر فرعون أن يقتل موسى.",
      keyMoment:
        "وانتبه إلى ما فعله بالضبط، فهو أعجب ما في القصة. لم يصرخ، ولم يشتم، ولم يعلن إيمانه فيخسر كل شيء في لحظة. تكلّم بالعقل، ووقف موقف الناصح لهم لا الخصم: ﴿يَا قَوْمِ لَكُمُ الْمُلْكُ الْيَوْمَ ظَاهِرِينَ فِي الْأَرْضِ فَمَن يَنصُرُنَا مِن بَأْسِ اللَّهِ إِن جَاءَنَا﴾. قال «يا قوم»، وقال «ينصرنا» — جعل نفسه منهم وهو يخالفهم. هذه شجاعة وحكمة معًا: أن تقول الحقّ كاملًا، وأن تقوله بطريقة يمكن أن تُسمَع.",
      resolution:
        "ثم ختم كلامه بكلمة لم يخف بعدها: ﴿وَأُفَوِّضُ أَمْرِي إِلَى اللَّهِ إِنَّ اللَّهَ بَصِيرٌ بِالْعِبَادِ﴾. فماذا كانت النتيجة؟ ﴿فَوَقَاهُ اللَّهُ سَيِّئَاتِ مَا مَكَرُوا وَحَاقَ بِآلِ فِرْعَوْنَ سُوءُ الْعَذَابِ﴾. حماه الله من مكرهم كله، وهلك من كان يخافهم. ولم يذكر القرآن اسمه، فبقي معروفًا بما فعل لا بمن هو: مؤمن آل فرعون.",
      word: { term: "أُفَوِّض أمري إلى الله", meaning: "أُسلِم أمري كله إليه وأثق أنه يتولّاه — تقولها حين تفعل ما عليك ولا تملك ما بعده." },
      lessons: [
        "قل الحقّ ولو كنت وحدك؛ فواحد مع الله أكثر من قصر مملوء.",
        "قل الحقّ بعقل وهدوء؛ الكلمة التي تُسمع خير من صرخة تُردّ.",
        "إذا فعلتَ ما عليك ففوّض الباقي إلى الله.",
      ],
      think:
        "كتم الرجل إيمانه سنين، ثم تكلّم في أخطر لحظة. متى تكلّمتَ أنت في موقف كان السكوت فيه أسهل؟ وماذا جعلك تتكلّم؟",
      tryToday:
        "إن رأيت اليوم أحدًا يُظلم أو يُسخر منه، فقل كلمة واحدة تدافع بها عنه، ولو كانت: هذا لا يصحّ.",
    },
  },
  {
    chapter: "nations", slug: "ashab-al-ukhdud",
    image: "/stories/nations/ashab-al-ukhdud.jpg",
    en: {
      title: "The People of the Ditch",
      hook:
        "Who is stronger: a king who holds the army, the prison and all the people, or a boy who holds nothing at all? In today's story the two met face to face. And it ended with the whole city believing the boy.",
      events:
        "One day a great beast blocked the road so that people could not pass. The boy took a stone and said: O Allah, if the way of the monk is more beloved to You than the way of the sorcerer, then kill this beast so the people can go on. He threw it, the beast died, and the people passed. That day the boy knew which of the two roads was true. Then Allah began to heal the sick and the blind at his hands, and people were amazed. Word reached the king, who seized the boy and tried everything to turn him from his faith and could not, and tried again and again to be rid of him — and each time the boy prayed, O Allah, deal with them however You wish, and each time he was saved.",
      lesson:
        "Whoever loses this world and does not lose their faith has lost nothing.",
      next:
        "We saw how the believers preferred Allah over their lives. But in our next story, we will meet a man who preferred his money and gold over Allah! He claimed with 'scientific arrogance' that his wealth came only from his intelligence! So what happened to his palace and his money? It's the story of Qarun!",
      quranProse:
        "Allah says about them in Surah Al-Buruj: {Cursed were the companions of the trench. [Containing] the fire full of fuel.}",
      challenge: {
        question: "What did the People of the Ditch hold on to?",
        options: ["Their wealth", "Their faith in Allah", "Their positions"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🔥",
        badge: "A heart that will not break",
        keepsake: "A cooled ember",
        note: "A reminder that whoever loses the world for their faith has lost nothing.",
      },
      arc: {
        idea: "A small boy learned that Allah is greater than the king — and because of him a whole city believed.",
        setting:
          "The Prophet told us of a king who had a sorcerer, and when the sorcerer grew old he asked the king for a boy to teach his craft to. The boy would go to him, and on the way he passed a monk — a man devoted to worship — and would sit with him and listen, and liked what he heard. So the boy had two roads he walked between every day: one where he was taught sorcery, and one where he was taught belief in Allah. And he did not yet know which of them was true.",
        keyMoment:
          "The boy went back to the king himself and said something extraordinary: you will not be able to kill me until you do as I tell you. Gather the people in one place, then take an arrow from my quiver and say: in the name of Allah, the Lord of the boy. The king did as he said, and the boy died in front of all the people. But look at what happened in that same moment: all the people said, we believe in the Lord of the boy. The king meant to finish him in front of everyone — and the boy had made his own end into the proof.",
        resolution:
          "The king was enraged, and ordered ditches — long trenches dug in the ground — and fire was lit in them, and the people were given the choice between turning back from their faith and standing firm. They stood firm. There is a surah in the Quran that tells it: {Cursed were the companions of the trench} — cursed are those who dug it. Then Allah said of the oppressors: {Indeed, those who have tortured the believing men and believing women and then have not repented will have the punishment of Hell}, and of the believers: {They will have gardens beneath which rivers flow. That is the great attainment.} So who won in the end?",
        word: { term: "The trench", meaning: "A long channel dug into the ground; the plural is trenches." },
        lessons: [
          "A young person can recognise the truth and hold on to it.",
          "Sit with those who teach you good; it was the monk who showed the boy his Lord.",
          "What counts is with Allah, not what people see; and the great attainment is Paradise.",
        ],
        think:
          "The boy chose to make the last thing he did into a proof that people would believe. What is the thing you would want people to remember about you?",
        tryToday:
          "Learn one thing about your Lord today from your father, your mother or your teacher — and ask about it until you really understand it.",
      },
    },
    title: "قصة أصحاب الأخدود",
    surahName: "",
    hook:
      "من أقوى: مَلِكٌ يملك الجيش والسجن والناس كلهم، أم غلامٌ صغير لا يملك شيئًا؟ في قصة اليوم التقى الاثنان وجهًا لوجه. وانتهى الأمر بأن المدينة كلها صدّقت الغلام.",
    events:
      "وذات يوم اعترضت الناسَ في طريقهم دابّة عظيمة حبستهم فلم يستطيعوا المرور. فأخذ الغلام حجرًا وقال: اللهم إن كان أمر الراهب أحبَّ إليك من أمر الساحر فاقتل هذه الدابّة حتى يمضي الناس. ورمى، فماتت الدابّة، ومضى الناس. فعرف الغلام يومها أيُّ الطريقين هو الحقّ. ثم صار الله يشفي على يديه المريض والأعمى، والناس يتعجّبون. وبلغ الخبر الملك، فأخذ الغلام وحاول أن يردّه عن دينه بكل ما يستطيع فلم يستطع، وحاول أن يتخلّص منه مرّة بعد مرّة، فكان الغلام يدعو: اللهم اكفنيهم بما شئت، فينجو في كل مرّة.",
    quranProse: "يقول الله تعالى عنهم في سورة البروج: {قُتِلَ أَصْحَابُ الْأُخْدُودِ * النَّارِ ذَاتِ الْوَقُودِ}. (أي لُعن الأشرار الذين حفروا الأخدود وأشعلوا فيه النار).",
    lesson:
      "من خسر دنياه ولم يخسر إيمانه، لم يخسر شيئًا.",
    next: "رأينا كيف فضل المؤمنون الله على حياتهم. لكن في قصتنا القادمة، سنتعرف على رجل فضل أمواله وذهبه على الله! وادعى بـ 'الغرور العلمي' أن ثروته جاءت بذكائه فقط! فماذا حدث لقصره ولأمواله؟ إنها قصة قارون!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البروج: 4-9؛ وقصة الغلام في صحيح مسلم (3005)", en: "The Quran, Surah Al-Buruj: 4-9; the account of the boy in Sahih Muslim (3005)" },
      note: { ar: "ذكرهم في البروج، وتفصيل قصة الغلام والساحر والراهب في صحيح مسلم.", en: "They are named in Al-Buruj, and the fuller account of the boy, the sorcerer and the monk is in Sahih Muslim." },
    },
    challenge: {
      question: "علام ثبت أصحاب الأخدود؟",
      options: ["على المال", "على إيمانهم بالله", "على منصبهم"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🔥",
      badge: "قلبٌ لا ينكسر",
      keepsake: "جمرة خامدة",
      note: "تذكّرك أن الذي يخسر الدنيا على إيمانه لم يخسر شيئاً.",
    },
    arc: {
      idea: "غلامٌ صغير عرف أن الله أكبر من الملك، فآمنت بسببه مدينة كاملة.",
      setting:
        "حكى لنا النبي ﷺ خبر مَلِكٍ كان له ساحر، فلمّا كبر الساحر طلب من الملك غلامًا يعلّمه سحره. فكان الغلام يذهب إليه، وفي الطريق يمرّ على راهب — رجل عابد منقطع للعبادة — فيجلس إليه ويسمع كلامه فيعجبه ويحبّه. فصار للغلام طريقان يمشي بينهما كل يوم: طريق يتعلّم فيه السحر، وطريق يتعلّم فيه الإيمان بالله. ولم يكن قد عرف بعد أيّهما الحقّ.",
      keyMoment:
        "فرجع الغلام إلى الملك بنفسه وقال له كلمة عجيبة: إنك لن تستطيع قتلي حتى تفعل ما آمرك به. اجمع الناس في مكان واحد، ثم خذ سهمًا من كنانتي وقل: بسم الله ربِّ الغلام. ففعل الملك ما قال، ومات الغلام أمام الناس جميعًا. لكن انظر ماذا حدث في تلك اللحظة نفسها: قال الناس كلهم: آمنّا بربّ الغلام. أراد الملك أن ينهي أمره أمام الناس، فإذا الغلام قد جعل نهايته هي الدليل.",
      resolution:
        "فغضب الملك، وأمر بالأخاديد — وهي حفر طويلة في الأرض — فأُوقدت فيها النار، وخُيِّر الناس بين أن يرجعوا عن إيمانهم وبين أن يثبتوا، فثبتوا. وفي القرآن سورة تحكي الخبر: ﴿قُتِلَ أَصْحَابُ الْأُخْدُودِ﴾ — أي لُعن الذين حفروها. ثم قال الله عن الظالمين: ﴿إِنَّ الَّذِينَ فَتَنُوا الْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ ثُمَّ لَمْ يَتُوبُوا فَلَهُمْ عَذَابُ جَهَنَّمَ﴾، وقال عن المؤمنين: ﴿لَهُمْ جَنَّاتٌ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ذَٰلِكَ الْفَوْزُ الْكَبِيرُ﴾. فمن الذي فاز في آخر الأمر؟",
      word: { term: "الأُخْدُود", meaning: "الحفرة الطويلة الممتدّة في الأرض، وجمعها أخاديد." },
      lessons: [
        "الصغير يستطيع أن يعرف الحقّ ويثبت عليه.",
        "اجلس إلى من يعلّمك الخير؛ فالراهب هو الذي دلّ الغلام على ربّه.",
        "العبرة بما عند الله لا بما يراه الناس؛ والفوز الكبير هو الجنة.",
      ],
      think:
        "اختار الغلام أن يكون آخر ما يفعله دليلًا يؤمن به الناس. ما الشيء الذي تحبّ أن يتذكّره الناس عنك أنت؟",
      tryToday:
        "تعلّم اليوم شيئًا واحدًا عن ربّك من أبيك أو أمك أو معلّمك، واسأل عنه حتى تفهمه فهمًا حقيقيًّا.",
    },
  },
  {
    chapter: "nations", slug: "qarun",
    image: "/stories/nations/qarun.jpg",
    en: {
      title: "The Story of Qarun",
      hook:
        "Imagine that the keys to your treasure chests alone need a group of strong men to carry them. Not the chests — just the keys. This was a real man the Quran tells us about, the richest of everyone around him. Did that make him the happiest of them too?",
      events:
        "His people came to him with beautiful advice, and it is in the Quran word for word: {Do not exult. Indeed, Allah does not like the exultant. But seek, through that which Allah has given you, the home of the Hereafter; and do not forget your share of the world; and do good as Allah has done good to you.} See how balanced it is: they did not tell him to give up his wealth. They said seek the Hereafter with it, take your share of this world, and do good to people as Allah has done good to you. Advice that deprives him of nothing. And what was his answer?",
      lesson:
        "What is in your hand is on loan from Allah, and whoever forgets it is a loan is close to losing it.",
      next:
        "Qarun loved gold and money and became arrogant. But what if someone used gold to make a statue and deceive people with it? A strange story starring a very deceitful man... It's the Samiri!",
      quranProse:
        "Allah says, describing Qarun's arrogance: {He said, 'I was only given it because of knowledge I have.'}",
      challenge: {
        question: "What did Qarun say when he looked at his treasures?",
        options: ["All praise is for Allah", "“I was given it because of knowledge I have”", "This is from Allah"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🕋",
        badge: "Grateful, not proud",
        keepsake: "A coin of sand",
        note: "A reminder that what is in your hand is on loan, and boasting is the fastest way to lose it.",
      },
      arc: {
        idea: "A man who thought what he held came from himself — and the earth swallowed him with everything he had gathered.",
        setting:
          "Qarun was a man from the people of Musa, {and he tyrannised them} — he grew arrogant over them and wronged them. Allah had given him treasures given to no one around him: {And We gave him of treasures whose keys would burden a band of strong men} — the keys alone were heavy enough to weigh down a group of the strongest. And note from the start: wealth is no fault, and treasure is no sin. This story is not about his money.",
        keyMoment:
          "He answered with a few words that summed up everything wrong with him: {I was only given it because of knowledge I have.} That is: this is mine, from my own cleverness and effort; it is no one's favour to me. There is the whole sickness — not in the wealth, but in forgetting where the wealth came from. Then he went out before the people in his finery, and those who saw him split in two: some wished they were in his place, and some said {Woe to you! The reward of Allah is better for one who believes and does righteousness.}",
        resolution:
          "{And We caused the earth to swallow him and his home.} {And there was for him no company to aid him other than Allah, nor was he of those who could defend themselves.} No one around him was any use, and he could not save himself. As for those who had wished to be in his place the day before, they now said: {Ah, Allah extends provision to whom He wills of His servants and restricts it.} In a single day they saw with their own eyes what a whole lifetime had not taught them.",
        word: { term: "Would burden a band", meaning: "Heavy enough to weigh down a group of strong men and nearly make them stagger." },
        lessons: [
          "Say: this is from the favour of my Lord — not: this is from my own cleverness.",
          "Wealth is used to seek the Hereafter, not abandoned; the advice was \"seek,\" not \"give up.\"",
          "Do good to people the way Allah has done good to you.",
        ],
        think:
          "Those who wished to be in Qarun's place yesterday thanked Allah they were not in it today. Have you ever wanted something someone else had? If Allah gave it to you, what would you do with it?",
        tryToday:
          "Look at something you love among the things you have today and say: this is from the favour of my Lord. Then give a part of it to someone else.",
      },
    },
    title: "قصة قارون",
    surahName: "",
    hook:
      "تخيّل أن مفاتيح خزائنك وحدها تحتاج جماعة من الرجال الأقوياء ليحملوها. ليست الخزائن — المفاتيح فقط. هذا رجل ذكره القرآن فعلًا، وكان أغنى من حوله. فهل جعله ذلك أسعد من حوله أيضًا؟",
    events:
      "جاءه قومه بنصيحة جميلة، وهي في القرآن بنصّها: ﴿لَا تَفْرَحْ إِنَّ اللَّهَ لَا يُحِبُّ الْفَرِحِينَ * وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ﴾. وانظر كم هي معتدلة: لم يقولوا له اترك مالك. قالوا: اطلب به الآخرة، وخذ نصيبك من الدنيا، وأحسِن إلى الناس كما أحسن الله إليك. نصيحة لا تحرمه شيئًا. فماذا كان جوابه؟",
    quranProse: "يقول الله تعالى يصف غرور قارون: {قَالَ إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي}. (أي كان يظن أنه حصل على المال بذكائه فقط وليس من فضل الله).",
    lesson:
      "ما في يدك عاريةٌ من الله، ومن نسي أنها عارية أوشك أن يفقدها.",
    next: "قارون أحب الذهب والمال وتكبر. ولكن ماذا لو استخدم شخص الذهب ليصنع تمثالاً ويخدع به الناس؟ قصة غريبة بطلها رجل مخادع جداً.. إنه السامري!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة القصص: 76-83", en: "The Quran, Surah Al-Qasas: 76-83" },
      note: { ar: "كنوزه وقوله وخسف الأرض به، كله بنص الآيات.", en: "His treasures, his words and the earth swallowing him are all in the verses themselves." },
    },
    challenge: {
      question: "ماذا قال قارون حين رأى كنوزه؟",
      options: ["الحمد لله", "«إنما أوتيته على علم عندي»", "هذا من عند الله"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🕋",
      badge: "شاكرٌ لا متكبّر",
      keepsake: "عملة من رمل",
      note: "تذكّرك أن ما في يدك عارية، والفخر بها أسرع طريق لضياعها.",
    },
    arc: {
      idea: "رجلٌ ظنّ أن ما في يده من عند نفسه، فابتلعته الأرض ومعه كل ما جمع.",
      setting:
        "قارون رجل من قوم موسى، ﴿فَبَغَىٰ عَلَيْهِمْ﴾ — أي تكبّر عليهم وظلمهم. وقد آتاه الله من الكنوز ما لم يؤتِ أحدًا حوله: ﴿وَآتَيْنَاهُ مِنَ الْكُنُوزِ مَا إِنَّ مَفَاتِحَهُ لَتَنُوءُ بِالْعُصْبَةِ أُولِي الْقُوَّةِ﴾ — أي إن حمل المفاتيح وحدها يُثقِل جماعة من الرجال الأشدّاء. وانتبه من الآن: المال ليس عيبًا، والكنوز ليست ذنبًا. القصة ليست عن ماله.",
      keyMoment:
        "أجاب بأربع كلمات لخّصت كل ما فيه: ﴿إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي﴾ — إنما أُعطيته بعلمٍ عندي أنا. أي: هذا مني، بذكائي وبتعبي؛ ليس فضلًا من أحد. وهنا المرض كله: لا في المال، بل في أنه نسي من أين جاء المال. ثم خرج على الناس في زينته، فانقسم من رآه قسمين: قسم تمنّى أن يكون مكانه، وقسم قال: ﴿وَيْلَكُمْ ثَوَابُ اللَّهِ خَيْرٌ لِّمَنْ آمَنَ وَعَمِلَ صَالِحًا﴾.",
      resolution:
        "﴿فَخَسَفْنَا بِهِ وَبِدَارِهِ الْأَرْضَ﴾ — فابتلعته الأرض هو وداره. ﴿فَمَا كَانَ لَهُ مِن فِئَةٍ يَنصُرُونَهُ مِن دُونِ اللَّهِ وَمَا كَانَ مِنَ الْمُنتَصِرِينَ﴾ — لم ينفعه أحد ممّن حوله، ولم يستطع أن ينصر نفسه. وأمّا الذين تمنّوا مكانه بالأمس فأصبحوا يقولون: ﴿وَيْكَأَنَّ اللَّهَ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ﴾. رأوا في يوم واحد بأعينهم ما لم يفهموه في عمر كامل.",
      word: { term: "تَنُوء بالعُصبة", meaning: "تُثقِل الجماعة من الرجال الأقوياء حتى تكاد تميل بهم من ثقلها." },
      lessons: [
        "قل: هذا من فضل ربي، ولا تقل: هذا بذكائي.",
        "المال يُطلب به الآخرة ولا يُترك؛ فالنصيحة كانت «وابتغِ» لا «واترك».",
        "أحسِن إلى الناس كما أحسن الله إليك.",
      ],
      think:
        "الذين تمنّوا مكان قارون بالأمس حمدوا الله اليوم أنهم ليسوا مكانه. هل تمنّيتَ يومًا شيئًا عند غيرك؟ ولو أعطاك الله إيّاه، ماذا كنت ستفعل به؟",
      tryToday:
        "انظر اليوم إلى شيء تحبّه ممّا عندك، وقل: هذا من فضل ربي. ثم أعطِ منه شيئًا لغيرك.",
    },
  },
  {
    chapter: "nations", slug: "samiri",
    image: "/stories/nations/samiri.jpg",
    en: {
      title: "The Story of the Samiri",
      hook:
        "A sound coming out of a statue. That is all it was. It could not speak, it knew nothing, it helped no one — but people heard the sound and believed. How does that happen? And why do people sometimes believe what makes no sense?",
      events:
        "One of them — the Samiri — gathered the people's gold jewellery and made from it {a calf, a body, that had a lowing sound} — a body shaped like a calf that made a noise like cattle. And he said to them: {This is your god and the god of Musa.} Many of them followed him. Harun stood among them warning them: {O my people, you are only being tested by it, and indeed your Lord is the Most Merciful, so follow me and obey my order.} And what did they answer? {We will never cease being devoted to it until Musa returns to us.}",
      lesson:
        "Before you follow something, ask one question: can it actually do anything for me?",
      next:
        "We learned not to follow deceivers. In the next story, we will learn how to choose a true leader! Do we choose him because he is rich? Or because he is strong and smart? Let's find out the story of Talut and Jalut!",
      quranProse:
        "Allah says about what this deceiver did: {And he extracted for them [the statue of] a calf which had a lowing sound, and they said, 'This is your god and the god of Moses, but he forgot.'}",
      challenge: {
        question: "What did Musa do with the calf the Samiri made?",
        options: ["Kept it", "Burned it and scattered it in the sea", "Gave it to the people"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌊",
        badge: "I worship none but Allah",
        keepsake: "A speck of gold",
        note: "A reminder that everything worshipped besides Allah comes to an end, and Allah remains.",
      },
      arc: {
        idea: "A man used his prophet's forty-night absence to make something with a voice, and told people: this is your god.",
        setting:
          "Musa went to his Lord's appointment for thirty nights, which Allah completed with forty, and left his brother Harun among his people, saying: {Take my place among my people, do right, and do not follow the way of the corrupters.} The Children of Israel had only recently left Egypt and everything they had seen there of statues being worshipped. Forty nights, with their prophet away. That was all it took.",
        keyMoment:
          "Musa returned angry and grieved, and asked one question that exposed the whole thing: {Did they not see that it could not return to them any speech and that it possessed for them neither harm nor benefit?} Did they not see that it does not answer a single word, and cannot hurt them or help them? A simple question — and if each of them had asked it on the first day, not one would have followed. A deceiver only survives in the place where people have stopped asking.",
        resolution:
          "Then Musa said of the calf: {We will surely burn it and then scatter it into the sea with a blast.} And so the \"god\" they had made with their own hands was finished, and it defended itself from nothing. As for the Samiri, Musa said to him: {So go. And indeed, it is for you in this life to say, no contact} — to live alone, no one coming near him and him coming near no one, saying to anyone who approached: no contact. He wanted to gather people around him, and ended with no one who would sit with him.",
        word: { term: "A lowing sound", meaning: "The noise cattle make — the Quran called it a sound, and never called it speech." },
        lessons: [
          "Do not follow something because other people followed it; ask about it first.",
          "Hold to the truth when the one who reminds you of it is away.",
          "Deception may win a day, and then the end exposes it.",
        ],
        think:
          "One question was enough to expose it: can it answer me? What is the question you ask before you believe something new?",
        tryToday:
          "If someone invites you to something today, ask before you agree: what good is it? And is it right?",
      },
    },
    title: "قصة السامري",
    surahName: "",
    hook:
      "صوتٌ يخرج من تمثال. هذا كل ما في الأمر. لم يكن يتكلّم، ولا يعرف شيئًا، ولا ينفع أحدًا — لكن الناس سمعوا الصوت فصدّقوا. كيف يحدث هذا؟ ولماذا يصدّق الناس أحيانًا ما لا يُعقل؟",
    events:
      "فجمع رجل منهم — هو السامري — حُليّ القوم من الذهب، ثم صنع منه ﴿عِجْلًا جَسَدًا لَّهُ خُوَارٌ﴾ — أي جسدًا على صورة عجل، له صوت كصوت البقر. وقال لهم: ﴿هَٰذَا إِلَٰهُكُمْ وَإِلَٰهُ مُوسَىٰ﴾. فاتّبعه منهم كثير. وقام هارون عليه السلام يحذّرهم: ﴿يَا قَوْمِ إِنَّمَا فُتِنتُم بِهِ وَإِنَّ رَبَّكُمُ الرَّحْمَٰنُ فَاتَّبِعُونِي وَأَطِيعُوا أَمْرِي﴾. فماذا أجابوه؟ ﴿لَن نَّبْرَحَ عَلَيْهِ عَاكِفِينَ حَتَّىٰ يَرْجِعَ إِلَيْنَا مُوسَىٰ﴾ — لن نتركه حتى يرجع موسى.",
    quranProse: "يقول الله تعالى عن صنيع هذا المخادع: {فَأَخْرَجَ لَهُمْ عِجْلًا جَسَدًا لَّهُ خُوَارٌ فَقَالُوا هَٰذَا إِلَٰهُكُمْ وَإِلَٰهُ مُوسَىٰ فَنَسِيَ}.",
    lesson:
      "قبل أن تتبع شيئًا، اسأل سؤالًا واحدًا: هل يملك أن ينفعني؟",
    next: "تعلمنا ألا نتبع المخادعين. في القصة القادمة، سنتعلم كيف نختار القائد الحقيقي! هل نختاره لأنه غني؟ أم لأنه قوي وذكي؟ تعالوا نعرف قصة طالوت وجالوت!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة طه: 85-97", en: "The Quran, Surah Ta-Ha: 85-97" },
      note: { ar: "صنع العجل ونهايته بنص الآيات.", en: "The making of the calf and its end are the verses' own words." },
    },
    challenge: {
      question: "ماذا فعل موسى بالعجل الذي صنعه السامري؟",
      options: ["احتفظ به", "أحرقه ونسفه في اليمّ", "أعطاه للناس"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌊",
      badge: "لا أعبد إلا الله",
      keepsake: "ذرّة ذهب",
      note: "تذكّرك أن كل ما يُعبد من دون الله ينتهي، ويبقى الله.",
    },
    arc: {
      idea: "رجلٌ استغلّ غياب نبيّه أربعين ليلة، فصنع شيئًا له صوت وقال للناس: هذا إلهكم.",
      setting:
        "ذهب موسى عليه السلام إلى ميقات ربّه ثلاثين ليلة أتمّها الله أربعين، وترك أخاه هارون عليه السلام في قومه وقال له: ﴿اخْلُفْنِي فِي قَوْمِي وَأَصْلِحْ وَلَا تَتَّبِعْ سَبِيلَ الْمُفْسِدِينَ﴾. وكان بنو إسرائيل قريبي عهد بمصر وبما رأوه فيها من عبادة التماثيل. أربعون ليلة فقط، ونبيّهم غائب. هذا كل ما لزم.",
      keyMoment:
        "ورجع موسى غضبانَ أسِفًا، فسأل سؤالًا واحدًا كشف الأمر كله: ﴿أَفَلَا يَرَوْنَ أَلَّا يَرْجِعُ إِلَيْهِمْ قَوْلًا وَلَا يَمْلِكُ لَهُمْ ضَرًّا وَلَا نَفْعًا﴾ — أفلا يرون أنه لا يردّ عليهم كلمة واحدة، ولا يملك أن يضرّهم ولا أن ينفعهم؟ سؤال بسيط، لو سأله كل واحد منهم لنفسه من أوّل يوم ما اتّبعه أحد. والمخادع لا يعيش إلا في المكان الذي يتوقّف فيه الناس عن السؤال.",
      resolution:
        "ثم قال موسى عن العجل: ﴿لَّنُحَرِّقَنَّهُ ثُمَّ لَنَنسِفَنَّهُ فِي الْيَمِّ نَسْفًا﴾ — لنحرقنّه ثم لنذرينّه في البحر ذرًّا. فانتهى «الإله» الذي صنعوه بأيديهم، ولم يدفع عن نفسه شيئًا. وأمّا السامري فقال له موسى: ﴿فَاذْهَبْ فَإِنَّ لَكَ فِي الْحَيَاةِ أَن تَقُولَ لَا مِسَاسَ﴾ — أن يعيش وحده، لا يقترب منه أحد ولا يقترب هو من أحد، يقول لكل من دنا منه: لا مِساس. أراد أن يجمع الناس حوله، فصار لا يجلس معه أحد.",
      word: { term: "خُوار", meaning: "صوت البقر — والقرآن سمّاه صوتًا ولم يسمّه كلامًا." },
      lessons: [
        "لا تتبع شيئًا لأن الناس تبعوه؛ اسأل عنه أولًا.",
        "اثبت على الحقّ في غياب من يذكّرك به.",
        "الخداع قد يكسب يومًا، ثم تفضحه العاقبة.",
      ],
      think:
        "كان يكفي سؤال واحد ليكشف الخدعة: هل يستطيع أن يردّ عليّ؟ ما السؤال الذي تسأله أنت قبل أن تصدّق شيئًا جديدًا؟",
      tryToday:
        "إذا دعاك أحد اليوم إلى شيء، اسأل قبل أن توافق: ما فائدته؟ وهل هو صواب؟",
    },
  },
  {
    chapter: "nations", slug: "talut-and-jalut",
    image: "/stories/nations/talut-and-jalut.jpg",
    en: {
      title: "Talut and Jalut (Saul and Goliath)",
      hook:
        "If you were choosing a captain for your team, what would you choose them for? The richest? The tallest? The most famous? In today's story Allah chose a commander for a whole army, and the people objected to the choice. Then the story ended with a young man nobody had counted on.",
      events:
        "Allah said: {Indeed, Allah has sent to you Talut as a king.} They objected at once: {How can he have kingship over us while we are more worthy of kingship than him and he has not been given any measure of wealth?} — how can he rule us when he is not rich? And the answer came: {Indeed, Allah has chosen him over you and has increased him abundantly in knowledge and stature} — knowledge first, then stature; not wealth. Then Talut set out with the army and tested them on the way at a river: {Whoever drinks from it is not of me, and whoever does not taste it is indeed of me, except for one who takes a sip with his hand.} And they drank, except a few. And so the large army became a small one before the battle had even begun.",
      lesson:
        "A leader is chosen for knowledge, capability and trustworthiness — not for wealth or fame.",
      next:
        "Talut and his soldiers succeeded because they obeyed Allah. But what happens to those who stubbornly oppose the messengers and harm them? In our final story, we will meet evil people who threw their prophet into a well! They are the People of the Well.",
      quranProse:
        "Allah says, teaching us the reason for choosing Talut: {Indeed, Allah has chosen him over you and has increased him abundantly in knowledge and stature.}",
      challenge: {
        question: "With what did Dawud overcome Jalut?",
        options: ["A large army", "A sling and a stone", "A long sword"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🪨",
        badge: "Small, with a large heart",
        keepsake: "A smooth pebble",
        note: "A reminder that Allah gives victory through little, when certainty is with it.",
      },
      arc: {
        idea: "A commander Allah chose whom the people objected to, and a young man who settled the battle with a stone.",
        setting:
          "The Children of Israel asked their prophet to send them a king to fight alongside in the way of Allah. Their enemy was a great army led by a tyrant named Jalut. Their prophet said to them: {Would you perhaps refrain from fighting if fighting was prescribed for you?} — are you actually serious? They said: why would we not fight, when we have been driven from our homes and our children? So Allah chose Talut for them.",
        keyMoment:
          "When the few who were left stood before Jalut's army, some of them said: {There is no power for us today against Jalut and his soldiers.} And here those with certainty said the sentence the story turns on: {How many a small company has overcome a large company by permission of Allah.} Then they prayed: {Our Lord, pour upon us patience and plant firmly our feet.} And out of that small army came a young man who was neither king nor commander — named Dawud — and he killed Jalut. A stone in a young man's hand finished what an army could not.",
        resolution:
          "{So they defeated them by permission of Allah, and Dawud killed Jalut, and Allah gave him the kingship and wisdom and taught him from that which He willed.} The young man nobody had counted on became a prophet and a king. And look how Allah arranged the story: He tested them at the river so their number shrank; their number shrank so it was clear that victory is not about numbers; and once that was clear, everyone knew it was {by permission of Allah}.",
        word: { term: "Abundance in knowledge and stature", meaning: "Extra measure in both: knowledge to know what to do, and strength to be able to do it." },
        lessons: [
          "Choose your friend and your leader for their knowledge and character, not for what they own.",
          "A small test shows who is fit for the large task.",
          "Being few is no excuse; how many a small company has overcome a large one by Allah's permission.",
        ],
        think:
          "Talut tested his soldiers with a drink of water — a very small thing. Why do you think small things reveal what people are really like?",
        tryToday:
          "Test yourself with something small today: hold back once from something you like, and see whether you can.",
      },
    },
    title: "قصة طالوت وجالوت",
    surahName: "",
    hook:
      "لو اخترتَ قائدًا لفريقك، فبمَ تختاره؟ بأغناهم؟ بأطولهم؟ بأشهرهم؟ في قصة اليوم اختار الله قائدًا لجيش كامل، فاعترض الناس على اختياره. ثم انتهت القصة بفتى صغير لم يكن في حساب أحد.",
    events:
      "قال الله: ﴿إِنَّ اللَّهَ قَدْ بَعَثَ لَكُمْ طَالُوتَ مَلِكًا﴾. فاعترضوا فورًا: ﴿أَنَّىٰ يَكُونُ لَهُ الْمُلْكُ عَلَيْنَا وَنَحْنُ أَحَقُّ بِالْمُلْكِ مِنْهُ وَلَمْ يُؤْتَ سَعَةً مِّنَ الْمَالِ﴾ — كيف يكون ملكًا علينا وليس غنيًّا؟ فجاء الجواب: ﴿إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ﴾ — العلم أولًا ثم الجسم؛ لا المال. ثم خرج طالوت بالجيش، وامتحنهم في الطريق بنهر: ﴿فَمَن شَرِبَ مِنْهُ فَلَيْسَ مِنِّي وَمَن لَّمْ يَطْعَمْهُ فَإِنَّهُ مِنِّي إِلَّا مَنِ اغْتَرَفَ غُرْفَةً بِيَدِهِ﴾. فشربوا إلا قليلًا. وهكذا صار الجيش الكبير جيشًا صغيرًا قبل أن تبدأ المعركة.",
    quranProse: "يقول الله تعالى يعلمنا سبب اختيار طالوت: {إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ}.",
    lesson:
      "يُختار القائد بعلمه وقدرته وأمانته، لا بماله ولا بشهرته.",
    next: "نجح طالوت وجنوده لأنهم أطاعوا الله. لكن ماذا يحدث لمن يعاند الرسل ويؤذيهم؟ في قصتنا الأخيرة، سنتعرف على قوم أشرار رموا نبيهم في البئر! إنهم أصحاب الرس.",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 246-251", en: "The Quran, Surah Al-Baqarah: 246-251" },
      note: { ar: "اختيار طالوت وابتلاء النهر وقتل داود لجالوت، كله بنص الآيات.", en: "Talut's selection, the test at the river and Dawud's killing of Jalut are all in the verses." },
    },
    challenge: {
      question: "بأي شيء غلب داود جالوت؟",
      options: ["بجيش كبير", "بمقلاع وحجر", "بسيف طويل"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🪨",
      badge: "صغيرٌ بقلب كبير",
      keepsake: "حصاة ملساء",
      note: "تذكّرك أن الله ينصر بالقليل إذا كان معه اليقين.",
    },
    arc: {
      idea: "قائدٌ اختاره الله فاعترض الناس عليه، وفتى صغير حسم المعركة بحجر.",
      setting:
        "طلب بنو إسرائيل من نبيّهم أن يبعث لهم ملكًا يقاتلون معه في سبيل الله، وكان عدوّهم جيشًا كبيرًا على رأسه رجل جبّار اسمه جالوت. فقال لهم نبيّهم: ﴿هَلْ عَسَيْتُمْ إِن كُتِبَ عَلَيْكُمُ الْقِتَالُ أَلَّا تُقَاتِلُوا﴾ — أي هل أنتم صادقون فعلًا؟ فقالوا: وما لنا ألّا نقاتل وقد أُخرجنا من ديارنا وأبنائنا؟ فاختار الله لهم طالوت.",
      keyMoment:
        "ولمّا صار القليل الباقي أمام جيش جالوت، قال بعضهم: ﴿لَا طَاقَةَ لَنَا الْيَوْمَ بِجَالُوتَ وَجُنُودِهِ﴾. وهنا قال الذين معهم اليقين كلمة هي قلب القصة: ﴿كَم مِّن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ﴾. ثم دعوا: ﴿رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا﴾. وخرج من هذا الجيش الصغير فتى ليس ملكًا ولا قائدًا، اسمه داود، فقتل جالوت. حجرٌ في يد فتى أنهى ما لم ينهه جيش.",
      resolution:
        "﴿فَهَزَمُوهُم بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ﴾. فالفتى الذي لم يكن أحد يحسب له حسابًا صار نبيًّا وملكًا. وانظر كيف رتّب الله القصة: امتحنهم بالنهر فقلّ عددهم، وقلّ عددهم فظهر أن النصر ليس بالعدد، وظهر ذلك فعُلم أنه ﴿بِإِذْنِ اللَّهِ﴾.",
      word: { term: "بَسْطة في العلم والجسم", meaning: "سَعَةٌ وزيادة: علمٌ يعرف به ما يصنع، وقوّةٌ يقدر بها عليه." },
      lessons: [
        "اختر صاحبك وقائدك بعلمه وخلقه، لا بما يملك.",
        "الامتحان الصغير يكشف من يصلح للأمر الكبير.",
        "قلّة العدد ليست عذرًا؛ ﴿كم من فئة قليلة غلبت فئة كثيرة بإذن الله﴾.",
      ],
      think:
        "امتحن طالوت جنوده بشربة ماء، وهي شيء صغير جدًّا. لماذا في رأيك تكشف الأشياء الصغيرة حقيقة الناس؟",
      tryToday:
        "امتحن نفسك اليوم في شيء صغير: امتنع عن شيء تحبّه مرّة واحدة، وانظر هل تقدر.",
    },
  },
  {
    chapter: "nations", slug: "ashab-ar-rass",
    image: "/stories/nations/ashab-ar-rass.jpg",
    en: {
      title: "The People of the Well (Ashab ar-Rass)",
      hook:
        "What do you do when you read a name in the Quran and cannot find its story? That is what happens with the Companions of the Well. Allah names them twice, among peoples whose accounts you know in full — and then tells us nothing about them. So what do we actually know? And what do we not?",
      events:
        "As for who exactly they were, where they lived, in what age, what they worshipped, and what they did to their prophet — all of that comes from reports the commentators disagree over. Some said they were the people of a well into which they cast their prophet; others said otherwise; and there is nothing in the Quran or in an authentic hadith that settles any of it. So we will say it plainly here: this story is reported, not established — and that is why you will see the yellow mark at the bottom of this page.",
      lesson:
        "What Allah has not told you, do not invent; and saying \"I do not know\" is part of being truthful.",
      next:
        "And so, my friends, we have finished our wonderful journey with the characters and peoples of the Holy Quran. We learned from the wise and were warned against the evil. Are you ready for more exciting stories on our website? Wait for us in the other sections!",
      quranProse:
        "Allah says, warning of their fate: {And [We destroyed] 'Aad and Thamud and the companions of the well and many generations between them.}",
      challenge: {
        question: "What does the word “Rass” mean?",
        options: ["A high mountain", "A well with no built wall", "A great tree"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🏜️",
        badge: "I listen to the one who advises me",
        keepsake: "An empty bucket",
        note: "A reminder that nations fall when they close their ears to the truth.",
      },
      arc: {
        idea: "A people the Quran names twice among the destroyed nations without telling their story — and that itself is the lesson.",
        setting:
          "\"Ar-Rass\" in Arabic means a well whose walls were never built up with stone. The Companions of the Well are a people Allah names in exactly two places in the Quran: {And Aad and Thamud and the companions of the well and many generations between them}, and {The people of Nuh denied before them, and the companions of the well and Thamud.} In both places they stand in the same setting: nations that denied their messengers and were destroyed.",
        keyMoment:
          "Now notice the most important thing on this page. Why did Allah name them and not tell their story? Because the point is not their names or their details; the point is that they are on the list. They are placed beside Aad, Thamud and the people of Nuh, as if the verse is saying: and this too is what happens to whoever denies their messengers and persists. The Quran does not tell stories to entertain you; it tells them to warn you. And there is a difference here worth learning while you are young: saying \"I do not know\" about something Allah has not told you is better for you than saying something and attributing it to Him.",
        resolution:
          "So what is left that is certain? That they existed, that they denied their messenger, that Allah destroyed them, and that He named them for us to take heed. Everything past that is a report you cannot build on. And Allah closed the verse in Al-Furqan with: {And for each We presented examples, and each We destroyed with destruction} — every one of those nations was given examples and warned first, and only then came what came. Punishment has never fallen on a people who were not warned.",
        word: { term: "Ar-Rass", meaning: "A well whose walls were never built up with stone — that is what the word means in Arabic, not a report about the people." },
        lessons: [
          "Be careful never to attribute to Allah or His religion something you have not verified.",
          "Allah's punishment never comes without warning; \"for each We presented examples.\"",
          "Listen to whoever advises you, before the time for it passes.",
        ],
        think:
          "Some things in the Quran Allah told us in detail, and some He named without detail. Why do you think that is? And what do you say to a friend who asks you about something you do not know?",
        tryToday:
          "If you are asked about something today that you do not know, say: I do not know, and I will find out. Then actually find out, and ask someone who knows.",
      },
    },
    title: "قصة أصحاب الرس",
    surahName: "",
    hook:
      "ماذا تفعل حين تقرأ اسمًا في القرآن ولا تجد قصته؟ هذا ما يحدث مع أصحاب الرسّ. ذكرهم الله مرّتين، مع أقوام تعرف أخبارهم كلها، ثم لم يخبرنا عنهم شيئًا. فما الذي نعرفه عنهم فعلًا؟ وما الذي لا نعرفه؟",
    events:
      "أمّا من هم بالتحديد، وأين عاشوا، وفي أي زمان، وماذا كانوا يعبدون، وماذا صنعوا بنبيّهم — فهذا كلّه رواياتٌ يختلف فيها المفسّرون. قال بعضهم إنهم أصحاب بئر رسُوا فيها نبيّهم، وقال بعضهم غير ذلك، وليس في القرآن ولا في حديث صحيح ما يقطع بقولٍ منها. ولذلك نقول لك هنا بصراحة: هذه القصة تُروى ولا يُجزم بها، وهذا سبب العلامة الصفراء التي تراها في آخر الصفحة.",
    quranProse: "يقول الله تعالى محذراً من مصيرهم: {وَعَادًا وَثَمُودَ وَأَصْحَابَ الرَّسِّ وَقُرُونًا بَيْنَ ذَلِكَ كَثِيرًا}.",
    lesson:
      "ما لم يخبرك الله به لا تخترعه؛ وقولُ «لا أعلم» جزءٌ من الصدق.",
    next: "وهكذا يا أصدقائي، أنهينا رحلتنا الرائعة مع شخصيات وأقوام القرآن الكريم. تعلمنا من الحكماء، وحذرنا من الأشرار. هل أنتم مستعدون لمزيد من القصص الشيقة في موقعنا؟ انتظرونا في الأقسام الأخرى!",
    source: {
      reliability: "🟡",
      reference: { ar: "القرآن الكريم، الفرقان: 38 وق: 12 — وما عدا ذلك روايات مختلفة", en: "The Quran, Al-Furqan: 38 and Qaf: 12 — beyond that, differing reports" },
      note: { ar: "القرآن ذكرهم في موضعين مع الأمم المهلكة ولم يفصّل خبرهم. وكل ما في القصة بعد ذلك — من هم، وماذا عبدوا، وكيف صنعوا بنبيهم — روايات يختلف فيها المفسرون، ولذلك تبقى القصة بهذه العلامة وتُروى بصيغة الرواية لا بصيغة الجزم.", en: "The Quran names them twice among the destroyed nations and gives no detail. Everything else in the story — who they were, what they worshipped, what they did to their prophet — comes from reports the commentators differ over. That is why the mark stays, and why the story is told as a report rather than as settled fact." },
    },
    challenge: {
      question: "ما معنى كلمة «الرسّ»؟",
      options: ["الجبل العالي", "البئر التي لا جدار لها", "الشجرة الكبيرة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🏜️",
      badge: "أُصغي لمن ينصحني",
      keepsake: "دلو فارغ",
      note: "يذكّرك أن الأمم تُهلك حين تغلق آذانها عن الحق.",
    },
    arc: {
      idea: "أمّةٌ ذكرها القرآن مرّتين مع الأمم الهالكة ولم يفصّل خبرها — وفي هذا نفسه درس.",
      setting:
        "«الرَّسّ» في اللغة هي البئر التي لم تُبنَ جدرانها بالحجارة. وأصحاب الرسّ قومٌ ذكرهم الله في موضعين اثنين من القرآن: ﴿وَعَادًا وَثَمُودَ وَأَصْحَابَ الرَّسِّ وَقُرُونًا بَيْنَ ذَٰلِكَ كَثِيرًا﴾، و﴿كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ وَأَصْحَابُ الرَّسِّ وَثَمُودُ﴾. وفي الموضعين هم في سياق واحد: أممٌ كذّبت رسلها فأهلكها الله.",
      keyMoment:
        "والآن انتبه إلى أهمّ ما في هذه الصفحة. لماذا ذكرهم الله ولم يفصّل خبرهم؟ لأن المقصود ليس أسماءهم ولا تفاصيلهم؛ المقصود أنهم في القائمة. وُضعوا مع عاد وثمود وقوم نوح، وكأن الآية تقول: وهذا أيضًا ما يحدث لمن كذّب رسله وأصرّ. والقرآن لا يحكي ليسلّيك، بل ليحذّرك. وهنا فرقٌ ينبغي أن تعرفه وأنت صغير: أن تقول «لا أعلم» عن شيء لم يخبرك الله به خيرٌ لك من أن تقول كلامًا ثم تنسبه إليه.",
      resolution:
        "فما الذي بقي في أيدينا مؤكّدًا؟ أنهم كانوا، وأنهم كذّبوا رسولهم، وأن الله أهلكهم، وأنه ذكرهم لنا لنتّعظ بهم. وما بعد ذلك رواياتٌ لا يُبنى عليها. وقد ختم الله آية الفرقان بقوله: ﴿وَكُلًّا ضَرَبْنَا لَهُ الْأَمْثَالَ وَكُلًّا تَبَّرْنَا تَتْبِيرًا﴾ — أي إن كل أمّة منهم ضُربت لها الأمثال وأُنذرت أولًا، ثم كان ما كان. فلم ينزل العذاب قطّ بقومٍ لم يُحذَّروا.",
      word: { term: "الرَّسّ", meaning: "البئر التي لم تُبنَ جدرانها بالحجارة — وهذا معنى الكلمة في اللغة، لا خبرًا عن القوم." },
      lessons: [
        "احذر أن تنسب إلى الله أو إلى دينه شيئًا لم تتأكّد منه.",
        "لا يأتي عقاب الله بغير إنذار؛ ﴿وكلًّا ضربنا له الأمثال﴾.",
        "اسمع ممّن ينصحك قبل أن يفوت الوقت.",
      ],
      think:
        "في القرآن أمورٌ أخبرنا الله بها بالتفصيل، وأمورٌ ذكرها ولم يفصّلها. لماذا في رأيك؟ وماذا تقول لصاحبك إذا سألك عن شيء لا تعرف جوابه؟",
      tryToday:
        "إذا سُئلتَ اليوم عن شيء لا تعرفه، فقل: لا أعرف، وسأبحث عنه. ثم ابحث عنه فعلًا واسأل من يعلم.",
    },
  },
  {
    chapter: "prophets", slug: "adam",
    en: {
      title: "Prophet Adam, the First Human",
      hook:
        "What was the first thing the first human being did? Not what you expect. The first human made a mistake — and then did something afterwards that became a road for everyone who came after him. Without it, none of us would know how to come back to Allah after a wrong.",
      events:
        "Allah settled Adam and his wife in the Garden and said: {And eat from it in ease and abundance from wherever you will, but do not approach this tree.} Everything permitted except one tree. Then Iblis came to them, and did not order them to disobey outright — a deceiver never does — he said: {Your Lord did not forbid you this tree except that you become angels or become of the immortal.} Then {he swore to them, Indeed, I am to you from among the sincere advisers.} He swore he was giving them good advice. So they ate from the tree.",
      lesson:
        "The point is not never making a mistake; it is what you do after one.",
      next:
        "Prophet Adam was the first man and prophet. In our next story, we will meet his great-grandson, a prophet who loved to read and write and was raised to a very high place! Who is he? He is Prophet Idris!",
      quranProse:
        "Allah says in the Quran: {And He taught Adam the names - all of them.}",
      challenge: {
        question: "What did Adam do after eating from the tree?",
        options: ["Denied it", "Said sorry to his Lord and asked forgiveness", "Blamed someone else"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌍",
        badge: "Quick to turn back",
        keepsake: "A leaf from the garden",
        note: "A reminder that a mistake is not the end of the road — an apology is its beginning.",
      },
      arc: {
        idea: "The first human, the first mistake, the first repentance — and the road it opened for everyone since.",
        setting:
          "Before there was a human on earth, Allah said to the angels: {Indeed, I will make upon the earth a successive authority.} So Allah created Adam from clay, breathed into him of His spirit, and taught him the names of all things — knowledge was the first honour given to a human being. Then He commanded the angels to prostrate to him, and they all did, except Iblis, who {refused and was arrogant} and said: {I am better than him. You created me from fire and created him from clay.} The first sin ever committed against Allah was pride.",
        keyMoment:
          "Now compare two, because here is the heart of the story. Iblis erred, and Adam erred. Iblis said: {By Your might, I will surely mislead them all}, and persisted and never came back. Adam said: {Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.} He did not say \"Satan tricked me.\" He did not say \"she gave it to me.\" He said: we wronged ourselves. The mistake was the same in both cases; the whole difference is in what came after it.",
        resolution:
          "{Then Adam received from his Lord some words, and He accepted his repentance. Indeed, it is He who is the Accepting of repentance, the Merciful.} Then Allah sent him down to the earth to build it up, and said to him and to all his descendants: {And when guidance comes to you from Me, whoever follows My guidance — there will be no fear concerning them, nor will they grieve.} So you today are the descendant of a man who erred and then repented, and you know the road because he walked it first.",
        word: { term: "Received some words", meaning: "He learned them from his Lord and prayed with them — Allah Himself taught him how to apologise." },
        lessons: [
          "When you are wrong, say \"I was wrong\" instead of looking for someone to blame.",
          "Pride was the first sin ever committed against Allah; beware of it even when you are right.",
          "The door of repentance is always open; Allah named Himself the Accepting of repentance.",
        ],
        think:
          "Iblis erred and Adam erred, and one ended in mercy and the other in exile. What made the difference, in your view? And what do you usually say after you get something wrong?",
        tryToday:
          "If you wrong someone today, tell them: I am sorry, I was wrong — without adding \"but\" afterwards.",
      },
    },
    image: "/stories/prophets/adam.jpg",
    title: "قصة سيدنا آدم (أبو البشر)",
    surahName: "",
    hook:
      "ما أوّل شيء فعله أوّل إنسان في الدنيا؟ ليس ما تتوقّعه. أوّل إنسان أخطأ، ثم فعل بعد خطئه شيئًا صار طريقًا لكل من جاء بعده إلى اليوم — ولولاه ما عرف أحدٌ منّا كيف يرجع إلى الله بعد الذنب.",
    events:
      "أسكن الله آدم وزوجه الجنّة وقال: ﴿وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَٰذِهِ الشَّجَرَةَ﴾. كلّ شيء مباح إلّا شجرة واحدة. وجاءهما إبليس، ولم يأمرهما بالمعصية مباشرة — المخادع لا يفعل ذلك — بل قال: ﴿مَا نَهَاكُمَا رَبُّكُمَا عَنْ هَٰذِهِ الشَّجَرَةِ إِلَّا أَن تَكُونَا مَلَكَيْنِ أَوْ تَكُونَا مِنَ الْخَالِدِينَ﴾، ثم ﴿وَقَاسَمَهُمَا إِنِّي لَكُمَا لَمِنَ النَّاصِحِينَ﴾ — حلف لهما أنه ناصح لهما. فأكلا من الشجرة.",
    quranProse: "يقول الله تعالى في القرآن الكريم يعلمنا كيف اعتذر سيدنا آدم: {قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ}.",
    lesson:
      "ليست العبرة ألّا تخطئ أبدًا، بل بما تفعله بعد الخطأ.",
    next: "نزل سيدنا آدم إلى الأرض وبدأ يعلم أبناءه الخير.. وبعد فترة من الزمن، جاء نبي آخر يحب الصدق كثيراً، ورفعه الله مكاناً عالياً. هل تعرفون من هو؟ إنه نبي الله إدريس!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، البقرة: 30-38 والأعراف: 11-25", en: "The Quran, Al-Baqarah: 30-38 and Al-A'raf: 11-25" },
      note: { ar: "الخلق وتعليم الأسماء وسجود الملائكة والتوبة، كله بنص الآيات.", en: "The creation, the teaching of the names, the angels' prostration and the repentance are all in the verses." },
    },
    challenge: {
      question: "ماذا فعل آدم بعد أن أكل من الشجرة؟",
      options: ["أنكر ذلك", "اعتذر لربه وطلب المغفرة", "ألقى اللوم على غيره"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌍",
      badge: "سريع التوبة",
      keepsake: "ورقة من شجر الجنة",
      note: "تذكّرك أن الخطأ ليس نهاية الطريق، والاعتذار أوّله.",
    },
    arc: {
      idea: "أوّل إنسان، وأوّل خطأ، وأوّل توبة — والطريق الذي فُتح بها لكل من بعده.",
      setting:
        "قبل أن يكون في الأرض إنسان، قال الله للملائكة: ﴿إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً﴾. فخلق الله آدم من طين، ونفخ فيه من روحه، وعلّمه أسماء كل شيء — فكان العلم أوّل ما كُرِّم به الإنسان. ثم أمر الملائكة أن يسجدوا له فسجدوا كلهم، إلا إبليس ﴿أَبَىٰ وَاسْتَكْبَرَ﴾ وقال: ﴿أَنَا خَيْرٌ مِّنْهُ خَلَقْتَنِي مِن نَّارٍ وَخَلَقْتَهُ مِن طِينٍ﴾. فكان أوّل ذنب عُصي الله به كِبرًا.",
      keyMoment:
        "والآن قارن بين اثنين، فهنا قلب القصة. إبليس أخطأ، وآدم أخطأ. فأمّا إبليس فقال: ﴿فَبِعِزَّتِكَ لَأُغْوِيَنَّهُمْ أَجْمَعِينَ﴾، وأصرّ ولم يرجع. وأمّا آدم فقال: ﴿رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ﴾. لم يقل: الشيطان خدعني، ولم يقل: هي التي أعطتني. قال: ظلمنا أنفسنا. الذنب واحد في الحالتين، والفرق كله في ما جاء بعده.",
      resolution:
        "﴿فَتَلَقَّىٰ آدَمُ مِن رَّبِّهِ كَلِمَاتٍ فَتَابَ عَلَيْهِ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ﴾. ثم أنزله الله إلى الأرض ليعمرها، وقال له ولذريّته جميعًا: ﴿فَإِمَّا يَأْتِيَنَّكُم مِّنِّي هُدًى فَمَن تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ﴾. فأنت اليوم من ذريّة رجل أخطأ ثم تاب، وأنت تعرف الطريق لأنه مشى فيه أوّل مرّة.",
      word: { term: "فَتَلَقَّىٰ كلمات", meaning: "تعلَّمها من ربّه ودعا بها — أي أن الله هو الذي علّمه كيف يعتذر إليه." },
      lessons: [
        "إذا أخطأتَ فقل: أنا أخطأتُ، ولا تبحث عمّن تلقي عليه اللوم.",
        "الكِبر أوّل ذنب عُصي الله به؛ فاحذره ولو كنتَ على حقّ.",
        "باب التوبة مفتوح دائمًا؛ فقد سمّى الله نفسه «التوّاب».",
      ],
      think:
        "أخطأ إبليس وأخطأ آدم، فانتهى أحدهما إلى الرحمة والآخر إلى الطرد. ما الذي صنع الفرق في رأيك؟ وماذا تقول أنت عادةً بعد أن تخطئ؟",
      tryToday:
        "إذا أخطأتَ اليوم في حقّ أحد، فقل له: أنا آسف، أنا أخطأت — من غير أن تتبعها بـ«لكن».",
    },
  },
  {
    chapter: "prophets", slug: "idris",
    en: {
      title: "Prophet Idris, the First to Write",
      hook:
        "About some people we know long stories; about others we know only a few words. Idris, peace be upon him, is one of these: two verses in the Quran, no more. So what did those two verses say, that they were enough?",
      events:
        "Three words, then: truthful, a prophet, and among the patient. \"Siddiq\" is an intensive form of truthfulness — someone extremely truthful: true in what he says, true to what he promises, and true with his Lord, showing nothing but what is inside him. It is not a word said of just anyone; very few in the Quran are described with it. As for where Idris lived, in what age, who he was sent to, and what his people did with him — Allah told us none of that, and what the storybooks report about him is opinion, none of it established.",
      lesson:
        "What is with Allah is reached through truthfulness and patience, not through how much people know about you.",
      next:
        "Idris loved learning. But what happens when people forget Allah and do bad things for a very long time? In our next story, a prophet built a massive ship on top of a mountain! It's Prophet Nuh!",
      quranProse:
        "Allah says: {And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.}",
      challenge: {
        question: "How does Allah describe Idris?",
        options: ["As wealthy", "As truthful and patient", "As strong"],
        correctAnswer: 1,
      },
      reward: {
        icon: "✒️",
        badge: "Always truthful",
        keepsake: "A reed pen",
        note: "A reminder that truthfulness raises a person, even when no one is watching.",
      },
      arc: {
        idea: "A prophet the Quran tells us nothing of but his qualities — and the qualities were the account.",
        setting:
          "Allah names Idris in exactly two places in the Quran, and in neither does He tell a story; He mentions qualities. He said: {And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.} And in the other place: {And Ismail and Idris and Dhul-Kifl — all were of the patient.}",
        keyMoment:
          "Look at the order of the words in the verse; that is the most striking thing in it: {Indeed, he was a man of truth and a prophet. And We raised him to a high station.} The raising comes after the truthfulness, not before it. The high station was not given because he wished for it or asked for it, but because he was truthful and patient. That is how Allah raises whom He wills: by what is in the heart, not by what is in the hand, and not by what people say.",
        resolution:
          "So what is left to us of Idris? His name, three qualities, and a high station Allah raised him to. And that is a lesson in itself: what matters is not how much people know about you, but what Allah knows you for. How many people no one on earth has heard of stand in a high station with Allah. And how many famous ones are not mentioned with Him at all.",
        word: { term: "A man of truth", meaning: "Someone extremely truthful: in what he says, in what he promises, and with his Lord." },
        lessons: [
          "Be truthful in small things so that you are known for truth in large ones.",
          "Patience is a quality of prophets, not a quality of the weak.",
          "Do not say about anyone what you do not know; the Quran was silent about Idris, and we have not added to it.",
        ],
        think:
          "If you were described in one line, what quality would you want to be remembered for? And what are you doing today to actually be that?",
        tryToday:
          "Be truthful today in one place where lying would have been easier and lighter for you.",
      },
    },
    image: "/stories/prophets/idris.jpg",
    title: "قصة سيدنا إدريس",
    surahName: "",
    hook:
      "بعض الناس نعرف عنهم قصصًا طويلة، وبعضهم لا نعرف عنهم إلا كلمات. وسيدنا إدريس عليه السلام من هؤلاء: آيتان في القرآن، لا أكثر من ذلك. فماذا قالت الآيتان حتى كفتا؟",
    events:
      "ثلاث كلمات إذًا: صِدِّيق، ونبيّ، ومن الصابرين. و«صِدِّيق» صيغة مبالغة من الصدق، أي الكثير الصدق جدًّا: يصدق في كلامه، ويصدق فيما يَعِد به، ويصدق مع ربّه فلا يُظهر غير ما يُبطن. وليست كلمة تُقال لكل أحد؛ ما وُصف بها في القرآن إلا القليل. أمّا أين عاش إدريس، وفي أيّ زمان، وإلى من أُرسل، وماذا صنع قومه معه — فلم يخبرنا الله بشيء من ذلك، وما يُروى في كتب القصص عنه أقوالٌ لا يثبت منها شيء.",
    quranProse: "يقول الله تعالى في القرآن يمدح سيدنا إدريس: {وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا}.",
    lesson:
      "ما عند الله يُنال بالصدق والصبر، لا بكثرة ما يعرفه الناس عنك.",
    next: "بعد سنوات طويلة، نسي الناس كلام الأنبياء وبدؤوا يعبدون الأصنام الحجرية التي لا تنفع ولا تضر! فأرسل الله إليهم نبياً عاش معهم ألف سنة إلا خمسين عاماً وبنى سفينة ضخمة! من هو؟ إنها قصة سيدنا نوح في المرة القادمة!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، مريم: 56-57 والأنبياء: 85", en: "The Quran, Maryam: 56-57 and Al-Anbiya: 85" },
      note: { ar: "وصفه بالصدق والصبر ورفعه مكاناً علياً بنص الآيتين. ولم يذكر القرآن غير ذلك من خبره.", en: "His truthfulness, his patience and his being raised to a high place are the words of the two verses. The Quran says nothing further of him." },
    },
    challenge: {
      question: "بماذا وصف الله إدريس عليه السلام؟",
      options: ["بالغنى", "بالصدق والصبر", "بالقوة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "✒️",
      badge: "صادق دائماً",
      keepsake: "قلم من قصب",
      note: "يذكّرك أن الصدق يرفع صاحبه، ولو لم يره أحد.",
    },
    arc: {
      idea: "نبيٌّ لم يخبرنا القرآن عنه إلا صفاته — فكانت الصفات هي الخبر.",
      setting:
        "ذكر الله إدريس عليه السلام في موضعين اثنين فقط من القرآن، وفي كليهما لم يذكر لنا قصّة، بل ذكر صفات. قال: ﴿وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾. وقال في الموضع الآخر: ﴿وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ كُلٌّ مِّنَ الصَّابِرِينَ﴾.",
      keyMoment:
        "وانظر إلى ترتيب الكلام في الآية، فهو أعجب ما فيها: ﴿إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾. جاء الرفع بعد الصدق، لا قبله. فالمكان العليّ لم يُعطَه لأنه تمنّاه أو طلبه، بل لأنه كان صادقًا صابرًا. وهكذا يرفع الله من يشاء: بما في قلبه، لا بما في يده، ولا بما يقوله الناس عنه.",
      resolution:
        "فماذا بقي لنا من خبر إدريس؟ اسمه، وثلاث صفات، ومكانٌ عليّ رفعه الله إليه. وهذا في نفسه درس: ليس المهمّ كم يعرف الناس عنك، بل بماذا يعرفك الله. وكم من إنسان لا يعرفه أحد في الأرض، وهو عند الله في مكان عليّ. وكم من مشهور لا يُذكر عند الله بشيء.",
      word: { term: "صِدِّيق", meaning: "كثير الصدق جدًّا: يصدق في قوله، وفي وعده، ومع ربّه." },
      lessons: [
        "اصدُق في الصغير حتى تُعرف بالصدق في الكبير.",
        "الصبر صفة أنبياء، وليس صفة ضعفاء.",
        "لا تقل عن أحد ما لا تعلم؛ فقد سكت القرآن عن خبر إدريس ولم نزد عليه.",
      ],
      think:
        "لو وُصفتَ أنت في سطر واحد، فما الصفة التي تحبّ أن تُذكر بها؟ وما الذي تفعله اليوم لتكون فعلًا كذلك؟",
      tryToday:
        "اصدُق اليوم في موضع واحد كان الكذب فيه أسهل عليك وأخفّ.",
    },
  },
  {
    chapter: "prophets", slug: "nuh",
    en: {
      title: "Prophet Nuh and the Great Ark",
      hook:
        "How many times do you repeat something before you give up? Twice? Ten times? In today's story a man said the same thing for nine hundred and fifty years. And every time, they put their fingers in their ears so they would not hear him.",
      events:
        "Nuh himself told us how he called them, in a surah that carries his name: {My Lord, indeed I invited my people night and day}, {Then I invited them publicly. Then I announced to them and confided to them secretly.} Night and day, openly and quietly — he tried every way he knew. And what did they do? {They put their fingers in their ears, covered themselves with their garments, persisted, and were arrogant with great arrogance.} Then Allah commanded him to build the ark, and he built it while they passed by him every day and mocked him.",
      lesson:
        "Your work is to do your part; the result was never your part.",
      next:
        "Nuh's ark saved the believers. In the next story, we will meet a very strong nation that built giant homes out of rocks, but they became too proud. Let's learn about Prophet Hud!",
      quranProse:
        "Allah describes the great flood: {And it sailed with them through waves like mountains...}",
      challenge: {
        question: "How long did Nuh call his people?",
        options: ["One year", "A very long time", "A month"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🚢",
        badge: "Patient and never weary",
        keepsake: "A nail from the ark",
        note: "A reminder that someone calling to good does not measure success by how many answered.",
      },
      arc: {
        idea: "A thousand years less fifty, and one man who never tired of saying his one sentence.",
        setting:
          "Some time after Adam, people began worshipping other than Allah, so Allah sent Nuh, peace be upon him — the first messenger sent to the people of the earth. {And We certainly sent Nuh to his people, and he remained among them a thousand years minus fifty years.} Nine hundred and fifty years, with no army, no authority and no wealth — only words, and patience with them.",
        keyMoment:
          "Then the flood came. In the middle of the waves, Nuh called out to his son: {O my son, come aboard with us and be not with the disbelievers.} The son said: {I will take refuge on a mountain to protect me from the water.} Nuh said: {There is no protector today from the decree of Allah, except for whom He gives mercy.} {And the waves came between them.} The hardest moment in the whole story is not the flood or the drowning; it is a father calling his son, and the son not answering.",
        resolution:
          "Then Allah said: {And it was said, O earth, swallow your water, and O sky, withhold. And the water subsided, and the matter was accomplished.} Nuh and those with him came down to the earth again and settled it. Nine hundred and fifty years of calling produced only a few — {and none had believed with him, except a few} — and from those few came all of humanity afterwards. Anyone measuring Nuh's success by the count was measuring wrong.",
        word: { term: "The ark", meaning: "The ship; in Arabic the same word serves for one and for many." },
        lessons: [
          "Do not measure your success by how many people responded to you.",
          "Carry on with good even when people mock you; Nuh built the ship while they laughed.",
          "Being related to someone righteous does not save you if you do nothing; Nuh's son was not saved by his lineage.",
        ],
        think:
          "Nuh called people for centuries and only a few answered, and he never stopped. What is something you tried again and again without it working? What made you keep going, or stop?",
        tryToday:
          "Try once more today at something you gave up on because it did not work the first time.",
      },
    },
    image: "/stories/prophets/nuh.jpg",
    title: "قصة سيدنا نوح (شيخ المرسلين)",
    surahName: "",
    hook:
      "كم مرّة تعيد الكلام قبل أن تملّ؟ مرّتين؟ عشرًا؟ في قصة اليوم رجلٌ ظلّ يقول الكلام نفسه تسعمائة وخمسين سنة. وفي كل مرّة كانوا يضعون أصابعهم في آذانهم حتى لا يسمعوه.",
    events:
      "وقد حكى لنا نوح بنفسه كيف دعاهم، في سورة تحمل اسمه: ﴿رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا﴾، ﴿ثُمَّ إِنِّي دَعَوْتُهُمْ جِهَارًا * ثُمَّ إِنِّي أَعْلَنتُ لَهُمْ وَأَسْرَرْتُ لَهُمْ إِسْرَارًا﴾ — ليلًا ونهارًا، وجهرًا وسرًّا؛ جرّب كل طريقة يعرفها. فماذا كانوا يفعلون؟ ﴿جَعَلُوا أَصَابِعَهُمْ فِي آذَانِهِمْ وَاسْتَغْشَوْا ثِيَابَهُمْ وَأَصَرُّوا وَاسْتَكْبَرُوا اسْتِكْبَارًا﴾. ثم أمره الله أن يصنع الفُلك، فصار يصنعها وهم يمرّون عليه كل يوم فيسخرون منه.",
    quranProse: "يقول الله تعالى يصف لنا المدة الطويلة التي قضاها سيدنا نوح مع قومه: {فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا فَأَخَذَهُمُ الطُّوفَانُ وَهُمْ ظَالِمُونَ}.",
    lesson:
      "عملك أن تفعل ما عليك، وأمّا النتيجة فليست عليك.",
    next: "بعد نجاة المؤمنين من الطوفان العظيم، استقرت البشرية وكثر الناس في شبه الجزيرة العربية، وظهرت قبيلة قوية جداً يبنون خياماً وأعمدة ضخمة! فأرسل الله لهم نبياً كريماً، إنه سيدنا هود!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة نوح، وهود: 25-49، والمؤمنون: 23-30", en: "The Quran, Surah Nuh, Hud: 25-49, Al-Mu'minun: 23-30" },
      note: { ar: "الدعوة والسفينة والطوفان وابنه، كله بنص الآيات.", en: "The call, the ark, the flood and his son are all in the verses." },
    },
    challenge: {
      question: "كم لبث نوح يدعو قومه؟",
      options: ["سنة واحدة", "زمناً طويلاً جداً", "شهراً"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🚢",
      badge: "صابرٌ لا يملّ",
      keepsake: "مسمار من السفينة",
      note: "يذكّرك أن الداعي إلى الخير لا يقيس نجاحه بعدد من استجاب.",
    },
    arc: {
      idea: "ألف سنة إلا خمسين، ورجلٌ واحد لم يتعب من أن يقول كلمته.",
      setting:
        "بعد آدم بزمن، بدأ الناس يعبدون غير الله، فأرسل الله نوحًا عليه السلام، وهو أوّل رسول أُرسل إلى أهل الأرض. ﴿وَلَقَدْ أَرْسَلْنَا نُوحًا إِلَىٰ قَوْمِهِ فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا﴾. تسعمائة وخمسون سنة، لم يكن معه فيها جيش ولا سلطان ولا مال — كلامٌ فقط، وصبرٌ عليه.",
      keyMoment:
        "ثم جاء الطوفان. وفي وسط الموج نادى نوحٌ ابنه: ﴿يَا بُنَيَّ ارْكَب مَّعَنَا وَلَا تَكُن مَّعَ الْكَافِرِينَ﴾. فقال الابن: ﴿سَآوِي إِلَىٰ جَبَلٍ يَعْصِمُنِي مِنَ الْمَاءِ﴾ — سألجأ إلى جبل يحميني. فقال نوح: ﴿لَا عَاصِمَ الْيَوْمَ مِنْ أَمْرِ اللَّهِ إِلَّا مَن رَّحِمَ﴾، ﴿وَحَالَ بَيْنَهُمَا الْمَوْجُ﴾. وأصعب لحظة في القصة كلها ليست الطوفان ولا الغرق؛ هي أبٌ ينادي ابنه فلا يجيبه.",
      resolution:
        "ثم قال الله: ﴿وَقِيلَ يَا أَرْضُ ابْلَعِي مَاءَكِ وَيَا سَمَاءُ أَقْلِعِي وَغِيضَ الْمَاءُ وَقُضِيَ الْأَمْرُ﴾. ونزل نوح ومن معه إلى الأرض من جديد فعمروها. تسعمائة وخمسون سنة من الدعوة لم تأتِ إلا بعدد قليل — ﴿وَمَا آمَنَ مَعَهُ إِلَّا قَلِيلٌ﴾ — ومن هذا القليل جاء الناس كلهم بعد ذلك. فمن كان يقيس نجاح نوح بالعدد كان مخطئًا.",
      word: { term: "الفُلْك", meaning: "السفينة؛ وتُقال للواحدة وللكثير بلفظ واحد." },
      lessons: [
        "لا تقِس نجاحك بعدد من استجاب لك.",
        "امضِ في الخير ولو سخر منك الناس؛ كان نوح يصنع السفينة وهم يضحكون.",
        "قرابتك من صالح لا تنفعك إن لم تعمل؛ فابن نوح لم ينجُ بنسبه.",
      ],
      think:
        "ظلّ نوح يدعو قرونًا ولم يستجب له إلا قليل، ولم يتوقّف. ما الشيء الذي حاولتَه مرارًا ولم ينجح؟ وما الذي جعلك تستمرّ فيه أو تتركه؟",
      tryToday:
        "أعِد اليوم محاولةً واحدة كنتَ قد تركتها لأنها لم تنجح من أوّل مرّة.",
    },
  },
  {
    chapter: "prophets", slug: "hud",
    en: {
      title: "Prophet Hud and the Strong Nation",
      hook:
        "What happens to a people Allah gave everything: strength, wealth, building, wide land? In today's story, a people who were the strongest of their age said one sentence that finished them: {Who is greater than us in strength?}",
      events:
        "Hud stood among them saying: {O my people, worship Allah; you have no deity other than Him}, then reminded them of what they had: {And remember when He made you successors after the people of Nuh and increased you in stature extensively.} And he asked them for no payment: {My reward is only from the One who created me.} And what did they answer? {They said, O Hud, you have not brought us clear evidence, and we are not ones to leave our gods on your say-so, nor are we believers in you.} They accused him of foolishness: {Indeed, we see you in foolishness, and indeed, we think you are of the liars.}",
      lesson:
        "Strength does not protect the one who has it from Allah; what protects him is knowing who gave it to him.",
      next:
        "The strong people of 'Aad were destroyed by wind. Our next story features people who carved their homes directly into solid mountains! And their miracle was a giant camel! It's Prophet Salih!",
      quranProse:
        "Allah says: {And to 'Aad [We sent] their brother Hud. He said, 'O my people, worship Allah; you have no deity other than Him.'}",
      challenge: {
        question: "With what did Allah destroy the people of Ad?",
        options: ["Water", "Wind", "An earthquake"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌪️",
        badge: "I will not be arrogant",
        keepsake: "A grain of sand",
        note: "A reminder that the strongest bodies cannot stand before a wind from Allah.",
      },
      arc: {
        idea: "The strongest people of their age asked, who is greater than us in strength? And the answer came from where they never looked.",
        setting:
          "The people of Aad were a tribe who lived in Al-Ahqaf, a land of sand mountains. They had been given strength in their bodies and in their building that no one else had been given, until Allah said of their city: {Iram, who had lofty pillars, the like of whom had never been created in the land.} They would build a monument on every high place to amuse themselves, and take fortresses as if they would live forever. So Allah sent them their brother Hud.",
        keyMoment:
          "And here they said the sentence the story turns on: {As for Aad, they were arrogant upon the earth without right and said, Who is greater than us in strength?} Who is greater than us in strength? And Allah answered them in the same verse, in the shortest possible reply: {Did they not consider that Allah who created them was greater than them in strength?} Their question was a boast, and its answer was on the same line.",
        resolution:
          "Then they saw a cloud coming towards their valleys, and rejoiced: {This is a cloud bringing us rain.} Allah said: {Rather, it is that for which you were impatient: a wind containing a painful punishment.} A {screaming, violent wind} which Allah imposed upon them {for seven nights and eight days in succession}. The people who said \"who is greater than us in strength\" were destroyed by air — the thing no one can see or hold.",
        word: { term: "A screaming wind", meaning: "A bitterly cold wind that makes a loud sound in its violence." },
        lessons: [
          "If Allah gives you strength, remember who gave it, and never say \"I am the greater.\"",
          "Do not be fooled by buildings or wealth; Aad built what had never been built, and they are gone.",
          "What you rejoice at may be a test; they thought the cloud was rain, and it was not.",
        ],
        think:
          "The people of Aad rejoiced at the cloud because they thought it was rain. Have you ever been glad about something that turned out not to be what you thought? What did you learn from it?",
        tryToday:
          "Name three blessings you have today, and with each one say: this is from Allah, not from me.",
      },
    },
    image: "/stories/prophets/hud.jpg",
    title: "قصة سيدنا هود وقوم عاد",
    surahName: "",
    hook:
      "ماذا يحدث لقومٍ أعطاهم الله كل شيء: القوّة، والمال، والبناء، والأرض الواسعة؟ في قصة اليوم قومٌ كانوا أقوى أهل زمانهم، وقالوا كلمة واحدة أنهت أمرهم: ﴿مَنْ أَشَدُّ مِنَّا قُوَّةً﴾.",
    events:
      "وقف فيهم هودٌ عليه السلام يقول: ﴿يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ﴾، ثم ذكّرهم بما هم فيه: ﴿وَاذْكُرُوا إِذْ جَعَلَكُمْ خُلَفَاءَ مِن بَعْدِ قَوْمِ نُوحٍ وَزَادَكُمْ فِي الْخَلْقِ بَسْطَةً﴾. ولم يطلب منهم أجرًا: ﴿إِنْ أَجْرِيَ إِلَّا عَلَى الَّذِي فَطَرَنِي﴾. فماذا أجابوه؟ ﴿قَالُوا يَا هُودُ مَا جِئْتَنَا بِبَيِّنَةٍ وَمَا نَحْنُ بِتَارِكِي آلِهَتِنَا عَن قَوْلِكَ وَمَا نَحْنُ لَكَ بِمُؤْمِنِينَ﴾. واتّهموه بالسفه، وقالوا: ﴿إِنَّا لَنَرَاكَ فِي سَفَاهَةٍ وَإِنَّا لَنَظُنُّكَ مِنَ الْكَاذِبِينَ﴾.",
    quranProse: "يقول الله تعالى: {وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ * سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا}.",
    lesson:
      "القوّة لا تحمي صاحبها من الله؛ إنما يحميه أن يعرف من أعطاه إيّاها.",
    next: "بعد قوم عاد، جاءت قبيلة أخرى عاشوا في بيوت نحتوها داخل صخور الجبال! وطلبوا معجزة غريبة جداً، فخرجت لهم ناقة ضخمة من صخرة! من هم؟ هذا ما سنعرفه في قصة سيدنا صالح القادمة!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعراف: 65-72 وهود: 50-60 والحاقة: 6-8", en: "The Quran, Al-A'raf: 65-72, Hud: 50-60, Al-Haqqah: 6-8" },
      note: { ar: "قوم عاد وإرم وعاقبتهم بالريح، كله بنص الآيات.", en: "Ad, Iram and their end by the wind are all in the verses." },
    },
    challenge: {
      question: "بماذا أهلك الله قوم عاد؟",
      options: ["بالماء", "بالريح", "بالزلزال"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌪️",
      badge: "لا أتكبّر",
      keepsake: "حبة رمل",
      note: "تذكّرك أن أقوى الأجساد لا تقف أمام ريح من الله.",
    },
    arc: {
      idea: "أقوى أهل زمانهم قالوا: من أشدّ منّا قوّة؟ فجاءهم الجواب من حيث لم يحسبوا.",
      setting:
        "قوم عاد قبيلة سكنت الأحقاف، وهي أرض فيها جبال من الرمل. وكانوا قد أُعطوا من القوّة في أجسادهم وفي بنائهم ما لم يُعطَ غيرهم، حتى قال الله عن مدينتهم: ﴿إِرَمَ ذَاتِ الْعِمَادِ * الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ﴾. وكانوا يبنون في كل مكان مرتفع بناءً يلعبون فيه، ويتّخذون المصانع كأنهم يخلدون. فأرسل الله إليهم أخاهم هودًا.",
      keyMoment:
        "وهنا قالوا الكلمة التي تدور عليها القصة: ﴿فَأَمَّا عَادٌ فَاسْتَكْبَرُوا فِي الْأَرْضِ بِغَيْرِ الْحَقِّ وَقَالُوا مَنْ أَشَدُّ مِنَّا قُوَّةً﴾. من أشدّ منّا قوّة؟ فردّ الله عليهم في الآية نفسها بأقصر جواب ممكن: ﴿أَوَلَمْ يَرَوْا أَنَّ اللَّهَ الَّذِي خَلَقَهُمْ هُوَ أَشَدُّ مِنْهُمْ قُوَّةً﴾. سؤالهم كان فخرًا، وجوابه كان في السطر نفسه.",
      resolution:
        "ثم رأوا سحابةً مقبلة نحو أوديتهم، ففرحوا وقالوا: ﴿هَٰذَا عَارِضٌ مُّمْطِرُنَا﴾ — هذا مطر سيأتينا. فقال الله: ﴿بَلْ هُوَ مَا اسْتَعْجَلْتُم بِهِ رِيحٌ فِيهَا عَذَابٌ أَلِيمٌ﴾. ريح ﴿صَرْصَرٍ عَاتِيَةٍ﴾ سخّرها الله عليهم ﴿سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا﴾. القوم الذين قالوا «من أشدّ منّا قوّة» أهلكهم الهواء — وهو الشيء الذي لا يُرى ولا يُمسك.",
      word: { term: "رِيحٌ صَرْصَر", meaning: "ريح شديدة البرد، لها صوت عالٍ في شدّتها." },
      lessons: [
        "إذا أعطاك الله قوّة فاذكر من أعطاك، ولا تقل: أنا أشدّ.",
        "لا تغترّ ببناء ولا بمال؛ فقد بنى قوم عاد ما لم يُبنَ مثله وذهبوا.",
        "ما تفرح به قد يكون اختبارًا؛ ظنّوا السحابة مطرًا فكانت غير ذلك.",
      ],
      think:
        "فرح قوم عاد بالسحابة لأنهم ظنّوها مطرًا. هل فرحتَ يومًا بشيء ثم تبيّن أنه لم يكن كما ظننت؟ ماذا تعلّمتَ منه؟",
      tryToday:
        "اذكر اليوم ثلاث نعم عندك، وقل عند كل واحدة: هذه من الله لا منّي.",
    },
  },
  {
    chapter: "prophets", slug: "saleh",
    en: {
      title: "Prophet Salih and the Giant Camel",
      hook:
        "The hardest people to call are the ones who have known you since you were small. The people of Salih knew him, and had hoped he would become a great man among them — until they said to him one day: you were our hope before you started saying this.",
      events:
        "He said to them: {O my people, worship Allah; you have no deity other than Him}, and reminded them of the blessing they were in: {And you carve out of the mountains, homes, with skill.} They asked him for a sign that he was truthful, and the she-camel came — the commentators say she came out of a rock for them, which is not in the Quran. He said: {This is the she-camel of Allah, a sign for you. So leave her to eat in Allah's earth and do not touch her with harm.} The people split: the weak among them believed, and their chiefs grew arrogant and said to the believers: {Indeed we, in that which you have believed, are disbelievers.}",
      lesson:
        "Whoever advises you cares about you, even when their words sit heavily on your ear.",
      next:
        "We learned about the giant camel of Salih. Next we meet a prophet who taught a whole city of traders to stop cheating with their scales. It's Prophet Shu'ayb!",
      quranProse:
        "Allah says: {And to Thamud [We sent] their brother Salih. He said, 'O my people, worship Allah; you have no deity other than Him.'}",
      challenge: {
        question: "What sign did Allah give the people of Thamud?",
        options: ["A river of milk", "A great she-camel", "A mountain of gold"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐫",
        badge: "Kind to animals",
        keepsake: "The camel's bell",
        note: "A reminder that kindness to animals is part of faith, and cruelty never passes unnoticed.",
      },
      arc: {
        idea: "A prophet from among his own people, who called them and was hurt by them, and then grieved for them once they were gone.",
        setting:
          "Thamud were a people who came after Aad. They lived in a land called Al-Hijr and carved their houses into the mountains. Allah sent them Salih, peace be upon him, one of their own: {And to Thamud, their brother Salih.} Their brother — one of them, whose honesty and trustworthiness they knew. They had even pinned their hopes on him, until they said to him after he called them: {You were among us one in whom hope was placed before this.}",
        keyMoment:
          "Then they hamstrung the camel. And having done it, they came back to Salih to challenge him: {O Salih, bring us what you promise us, if you are of the messengers.} Allah gave them three days. Three days watching the sun rise and set knowing what was waiting for them, and not one of them turned back. Then the earthquake seized them {and they became within their home corpses fallen prone}. The challenge neither hurried Allah's decree nor delayed it.",
        resolution:
          "And here is the most remarkable thing in the whole story. Salih did not rejoice that Allah had avenged him on the people who denied him, hurt him and mocked him. Allah says of him: {And he turned away from them and said, O my people, I had certainly conveyed to you the message of my Lord and advised you, but you do not like advisers.} He said it grieving for them, calling them \"my people\" after they were gone. A prophet does not gloat over whoever opposed him; he grieves for them.",
        word: { term: "One in whom hope was placed", meaning: "Someone people expect good from and pin their hopes on — what they said of Salih before he called them." },
        lessons: [
          "The advice that sits heaviest may be the most useful; do not resent whoever gives it.",
          "Challenging Allah's decree neither hurries it nor delays it.",
          "Do not gloat over whoever went wrong; Salih grieved for his people after they were gone.",
        ],
        think:
          "Salih said: \"but you do not like advisers.\" When did someone last advise you in a way that stung? Did it later turn out they were right?",
        tryToday:
          "Thank someone today who once gave you advice you did not like at the time, and that turned out to be right.",
      },
    },
    image: "/stories/prophets/saleh.jpg",
    title: "قصة سيدنا صالح وقوم ثمود",
    surahName: "",
    hook:
      "أصعب دعوة أن تدعو من يعرفك منذ كنتَ صغيرًا. قوم صالح كانوا يعرفونه، وكانوا يرجون أن يكون منهم رجلًا عظيمًا، حتى قالوا له يومًا: كنتَ رجاءنا قبل أن تقول هذا الكلام.",
    events:
      "قال لهم: ﴿يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ﴾، وذكّرهم بما هم فيه من نعمة: ﴿وَتَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا فَارِهِينَ﴾. فطلبوا منه آية تدلّ على صدقه، فجاءتهم الناقة — ويذكر المفسّرون أنها خرجت لهم من صخرة، وليس ذلك في القرآن. وقال لهم: ﴿هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً فَذَرُوهَا تَأْكُلْ فِي أَرْضِ اللَّهِ وَلَا تَمَسُّوهَا بِسُوءٍ﴾. فانقسم القوم: آمن ضعفاؤهم، واستكبر كبراؤهم وقالوا للمؤمنين: ﴿إِنَّا بِالَّذِي آمَنتُم بِهِ كَافِرُونَ﴾.",
    quranProse: "يقول الله تعالى: {فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ}، أي سقطوا في بيوتهم بلا حراك.",
    lesson:
      "من نصحك فقد أحبّك، وإن كان كلامه ثقيلًا على أذنك.",
    next: "بعد هؤلاء الأنبياء العظماء، سيأتي نبي كريم جداً، لُقب بـ 'أبو الأنبياء'، وهو الذي بنى الكعبة المشرفة وحطم أصنام قومه وهو شاب صغير! هل عرفتموه؟ إنه خليل الرحمن، سيدنا إبراهيم!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعراف: 73-79 وهود: 61-68 والشمس: 11-15", en: "The Quran, Al-A'raf: 73-79, Hud: 61-68, Ash-Shams: 11-15" },
      note: { ar: "الناقة وعقرها وإمهالهم ثلاثًا وعاقبة ثمود، كله بنص الآيات. أما خروجها من صخرة فقول للمفسرين ليس في القرآن، ولذلك نُسب إليهم في نص القصة.", en: "The she-camel, its hamstringing, the three days' respite and the end of Thamud are all in the verses. Her coming out of a rock is a commentators' account, not in the Quran, which is why the story attributes it to them." },
    },
    challenge: {
      question: "ما الآية التي أعطاها الله لقوم ثمود؟",
      options: ["نهر من لبن", "ناقة عظيمة", "جبل من ذهب"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐫",
      badge: "رفيق بالحيوان",
      keepsake: "جرس الناقة",
      note: "يذكّرك أن الرفق بالحيوان من الإيمان، وأن الظلم لا يمرّ.",
    },
    arc: {
      idea: "نبيٌّ من قومه، دعاهم فآذَوه، ثم حزن عليهم بعد أن هلكوا.",
      setting:
        "ثمود قومٌ جاءوا بعد عاد، سكنوا أرضًا تُسمّى الحِجر، وكانوا ينحتون بيوتهم في الجبال نحتًا. فأرسل الله إليهم صالحًا عليه السلام، وهو منهم: ﴿وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَالِحًا﴾. أخاهم — أي واحدًا منهم، يعرفونه ويعرفون صدقه وأمانته. بل كانوا يعلّقون عليه آمالهم، حتى قالوا له بعد أن دعاهم: ﴿قَدْ كُنتَ فِينَا مَرْجُوًّا قَبْلَ هَٰذَا﴾.",
      keyMoment:
        "ثم عقروا الناقة. وبعد أن فعلوا، رجعوا إلى صالح يتحدّونه: ﴿يَا صَالِحُ ائْتِنَا بِمَا تَعِدُنَا إِن كُنتَ مِنَ الْمُرْسَلِينَ﴾. فأمهلهم الله ثلاثة أيام. ثلاثة أيام يرون فيها الشمس تطلع وتغرب وهم يعلمون ما ينتظرهم، ولم يرجع منهم أحد. ثم أخذتهم الرجفة ﴿فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ﴾. والتحدّي لم يقدّم الأمر ولم يؤخّره.",
      resolution:
        "وهنا أعجب ما في القصة كلها. لم يفرح صالح بأن الله انتقم له ممّن كذّبوه وآذَوه وسخروا منه. بل قال الله عنه: ﴿فَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا قَوْمِ لَقَدْ أَبْلَغْتُكُمْ رِسَالَةَ رَبِّي وَنَصَحْتُ لَكُمْ وَلَٰكِن لَّا تُحِبُّونَ النَّاصِحِينَ﴾. قالها وهو حزين عليهم، وناداهم «يا قوم» بعد أن هلكوا. فالنبيّ لا يشمت بمن خالفه؛ إنما يحزن عليه.",
      word: { term: "مَرْجُوًّا", meaning: "من يُرجى منه الخير ويُعلَّق عليه الأمل — قالوها لصالح قبل أن يدعوهم." },
      lessons: [
        "أثقل النصيحة على الأذن قد تكون أنفعها؛ فلا تكره من ينصحك.",
        "التحدّي لا يقدّم أمر الله ولا يؤخّره.",
        "لا تشمت بمن أخطأ؛ فقد حزن صالح على قومه بعد هلاكهم.",
      ],
      think:
        "قال صالح: «ولكن لا تحبّون الناصحين». متى آخر مرّة نصحك أحد فضايقك كلامه؟ وهل تبيّن لك بعد ذلك أنه كان على حقّ؟",
      tryToday:
        "اشكر اليوم شخصًا نصحك يومًا بشيء لم يعجبك وقتها، ثم ظهر لك أنه كان صوابًا.",
    },
  },
  {
    chapter: "prophets", slug: "shuaib",
    en: {
      title: "Prophet Shu'ayb and the Honest Scales",
      hook:
        "Can cheating on a scale be a matter of religion? In today's story, Allah sent a prophet to a people whose first problem was not their prayer… it was their weights and measures. And he tied the two together in a single sentence.",
      events:
        "He said to them: {O my people, worship Allah; you have no deity other than Him. And do not decrease from the measure and the scale.} He joined the two in one breath: worship of Allah, and honesty on the scale. Then: {And O my people, give full measure and weight in justice and do not deprive the people of their due and do not commit abuse on the earth, spreading corruption.} Then a beautiful line: {What remains from Allah is best for you, if you are believers} — the little left to you from what is lawful is better than the much you take without right.",
      lesson:
        "Your honesty in buying and selling is part of your religion, not something outside it.",
      next:
        "Prophet Shu'ayb taught us honesty. In our next story, we will meet a brave young man who stood alone against an entire city of idol worshippers, and even a massive fire couldn't burn him! It's Prophet Ibrahim!",
      quranProse:
        "Allah says: {And to Madyan [We sent] their brother Shu'ayb. He said, 'O my people, worship Allah... and do not decrease from the measure and the scale.'}",
      challenge: {
        question: "What did Shuaib call his people to?",
        options: ["Building palaces", "Honesty in weight and measure", "Leaving farming"],
        correctAnswer: 1,
      },
      reward: {
        icon: "⚖️",
        badge: "Honest in the small things",
        keepsake: "A small balance",
        note: "A reminder that trustworthiness shows in small things before large ones.",
      },
      arc: {
        idea: "A prophet who called his people to honest scales, and they asked him: what does your prayer have to do with our money?",
        setting:
          "Madyan was a town on the trade road; its people were merchants and their wealth came from buying and selling. They worshipped other than Allah, and did something else besides: they shorted the measure and the scale — taking in full and giving back less — and sat on the roads frightening travellers. So Allah sent them Shuaib, peace be upon him, so eloquent and clear in speech that he was called the orator of the prophets.",
        keyMoment:
          "And what did they answer? They said something worth stopping at for a long while: {O Shuaib, does your prayer command you that we should leave what our fathers worship or not do with our wealth what we please?} Does your prayer tell you to interfere with our money? As if to say: you go and pray, and leave our trade to us. And the answer is inside their own question: yes. Prayer instructs the one who prays how to weigh, how to sell, how to take. Religion is not one thing in the mosque and another in the marketplace.",
        resolution:
          "Then they threatened him: {And if not for your family, we would have stoned you, and you are not to us one respected.} He said: {Is my family more respected for power by you than Allah?} They persisted in what they were doing, and what came, came: {So the earthquake seized them, and they became within their home corpses fallen prone.} Allah saved Shuaib and those who believed with him. And those who feared their wealth would shrink if they measured fairly — all of their wealth was gone.",
        word: { term: "Depriving", meaning: "Cutting people short of their due, giving them less than belongs to them." },
        lessons: [
          "Do not take what is not yours, even something small that no one would notice.",
          "Religion walks into the marketplace as surely as it walks into the mosque.",
          "A little that is lawful beats a lot that is not; \"what remains from Allah is best for you.\"",
        ],
        think:
          "They told Shuaib: our money is ours, we do what we like with it. Are there things you think of as \"your business alone\" that religion may have something to say about?",
        tryToday:
          "If you have something today that you borrowed or took that is not yours, give it back whole, exactly as you took it.",
      },
    },
    image: "/stories/prophets/shuaib.jpg",
    title: "قصة سيدنا شعيب (خطيب الأنبياء)",
    surahName: "",
    hook:
      "هل يمكن أن يكون الغشّ في الميزان مسألة دين؟ في قصة اليوم نبيٌّ أرسله الله إلى قوم لم تكن أوّل مشكلتهم في صلاتهم… بل في الكيل والميزان. وقد ربط لهم بين الاثنين في جملة واحدة.",
    events:
      "قال لهم: ﴿يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ وَلَا تَنقُصُوا الْمِكْيَالَ وَالْمِيزَانَ﴾ — فجمع لهم الأمرين في نفس واحد: عبادة الله، والأمانة في الميزان. ثم قال: ﴿وَيَا قَوْمِ أَوْفُوا الْمِكْيَالَ وَالْمِيزَانَ بِالْقِسْطِ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ﴾. ثم قال كلمة جميلة: ﴿بَقِيَّتُ اللَّهِ خَيْرٌ لَّكُمْ إِن كُنتُم مُّؤْمِنِينَ﴾ — أي إن القليل الذي يبقى لكم من حلال خيرٌ من الكثير الذي تأخذونه بغير حقّ.",
    quranProse: "يقول الله تعالى عن عذابهم: {فَكَذَّبُوهُ فَأَخَذَهُمْ عَذَابُ يَوْمِ الظُّلَّةِ ۚ إِنَّهُ كَانَ عَذَابَ يَوْمٍ عَظِيمٍ}.",
    lesson:
      "أمانتك في البيع والشراء جزءٌ من دينك، لا شيءٌ خارجه.",
    next: "بعد أن تعلمنا الأمانة، سنسافر في القصة القادمة لنتعرف على نبي شجاع جداً، كسر الأصنام وهو شاب صغير، ولم تحرقه النار! من هو هذا النبي العظيم الذي نذكره في كل صلاة؟ إنه أبو الأنبياء، سيدنا إبراهيم!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعراف: 85-93 وهود: 84-95 والشعراء: 176-191", en: "The Quran, Al-A'raf: 85-93, Hud: 84-95, Ash-Shu'ara: 176-191" },
      note: { ar: "دعوته أهل مدين إلى العدل في الكيل والميزان بنص الآيات.", en: "His call to the people of Madyan to be honest in weight and measure is in the verses." },
    },
    challenge: {
      question: "إلامَ دعا شعيب قومه؟",
      options: ["إلى بناء القصور", "إلى العدل في الكيل والميزان", "إلى ترك الزراعة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "⚖️",
      badge: "أمينٌ في الصغير",
      keepsake: "ميزان صغير",
      note: "يذكّرك أن الأمانة تظهر في الأشياء الصغيرة قبل الكبيرة.",
    },
    arc: {
      idea: "نبيٌّ دعا قومه إلى الأمانة في الميزان، فسألوه: وما شأن صلاتك بأموالنا؟",
      setting:
        "مَدْيَن بلدٌ على طريق التجارة، أهله تجّار، تأتيهم أموالهم من البيع والشراء. وكانوا يعبدون غير الله، وكانوا مع ذلك يفعلون أمرًا آخر: ينقصون الكيل والميزان — أي يأخذون من الناس تامًّا ويعطونهم ناقصًا — ويقعدون على الطرق يخيفون من يمرّ. فأرسل الله إليهم شعيبًا عليه السلام، وكان فصيح اللسان حسن البيان حتى سُمّي خطيب الأنبياء.",
      keyMoment:
        "فماذا أجابوه؟ قالوا جملة تستحقّ أن تقف عندها طويلًا: ﴿يَا شُعَيْبُ أَصَلَاتُكَ تَأْمُرُكَ أَن نَّتْرُكَ مَا يَعْبُدُ آبَاؤُنَا أَوْ أَن نَّفْعَلَ فِي أَمْوَالِنَا مَا نَشَاءُ﴾ — أصلاتك هي التي تأمرك أن تتدخّل في أموالنا؟ كأنهم يقولون: صلِّ أنت، ودَعْ تجارتنا لنا. والجواب في سؤالهم نفسه: نعم. الصلاة تأمر صاحبها كيف يزن وكيف يبيع وكيف يأخذ. والدين ليس شيئًا في المسجد وشيئًا آخر في السوق.",
      resolution:
        "ثم هدّدوه: ﴿وَلَوْلَا رَهْطُكَ لَرَجَمْنَاكَ وَمَا أَنتَ عَلَيْنَا بِعَزِيزٍ﴾ — لولا عشيرتك لآذيناك. فقال: ﴿أَرَهْطِي أَعَزُّ عَلَيْكُم مِّنَ اللَّهِ﴾. ثم أصرّوا على ما هم فيه، فكان ما كان: ﴿فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ﴾، ونجّى الله شعيبًا والذين آمنوا معه. والذين خافوا أن تنقص أموالهم لو أوفوا الكيل، ذهبت أموالهم كلها.",
      word: { term: "البَخْس", meaning: "أن تنقص الناس حقّهم فتعطيهم أقلّ ممّا لهم." },
      lessons: [
        "لا تأخذ ما ليس لك، ولو كان شيئًا قليلًا لا يُلاحَظ.",
        "الدين يدخل السوق كما يدخل المسجد.",
        "القليل الحلال خير من الكثير الحرام؛ ﴿بقيّت الله خير لكم﴾.",
      ],
      think:
        "قالوا لشعيب: أموالنا لنا نفعل فيها ما نشاء. هل هناك أشياء تظنّها «شأنك وحدك» وقد يكون للدين فيها كلام؟",
      tryToday:
        "إن كان عندك اليوم شيء استعرتَه أو أخذتَه وليس لك، فأرجعه كاملًا كما أخذته.",
    },
  },
  {
    chapter: "prophets", slug: "ibrahim",
    en: {
      title: "Prophet Ibrahim, the Friend of Allah",
      hook:
        "There are three tests in this story, and any one of them would be enough for a whole lifetime: standing before his entire people, then before the fire, then before the hardest thing ever asked of a father. And it was one man. And every time, his answer was the same.",
      events:
        "Then he did something no one expected of him. His people went out to their festival, and Ibrahim went in to their idols {and made them into fragments, except a large one among them}. The people came back and saw, and questioned him, and he said: {Rather, this — the largest of them — did it, so ask them, if they should speak.} They fell silent a moment, then said: {You have already known that these do not speak.} You know they cannot talk. And that was exactly what he wanted: for them to say it with their own tongues.",
      lesson:
        "Whoever hands his affair to Allah does not lose, however hard it looks at the start.",
      next:
        "Ibrahim was saved from the fire. But what about his nephew, who was sent to a beautiful city full of people who did very bad and unnatural things? Next up is Prophet Lut!",
      quranProse:
        "Allah says: {We said, 'O fire, be coolness and safety upon Abraham.'}",
      challenge: {
        question: "What did Allah say to the fire when Ibrahim was thrown into it?",
        options: ["Burn hotter", "Be coolness and peace", "Go out by yourself"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🔥",
        badge: "The friend of the Most Merciful",
        keepsake: "An olive branch",
        note: "A reminder that whoever relies on Allah is not harmed by fire, nor by anything fiercer.",
      },
      arc: {
        idea: "One man who stood before his people with a question, before the fire with a heart, and before the hardest command with his son.",
        setting:
          "Ibrahim grew up among a people who worshipped statues, and his father was one of them. He did not begin by shouting at them; he began by asking: {What are these statues to which you are devoted?} Then he showed them with their own reason: he looked at a star and said this is my lord, and when it set he said {I do not like those that set}; then the moon; then the sun — until he brought them to: {Indeed, I have turned my face toward He who created the heavens and the earth.}",
        keyMoment:
          "They found no answer to his argument but fire: {They said, burn him and support your gods.} They gathered a great fire and threw him into it. And here Allah said two words and no more: {O fire, be coolness and safety upon Ibrahim.} Notice \"and safety\": had it been only \"coolness,\" the cold itself would have harmed him; \"safety\" made it a place with no harm in it at all. Fire did not change its nature for anyone; its command changed for one man who stood alone.",
        resolution:
          "Then came the third test, the heaviest: to sacrifice his son. And he did not do it behind his son's back; he came to him and said: {O my son, indeed I have seen in a dream that I must sacrifice you, so see what you think.} The son said: {O my father, do as you are commanded. You will find me, if Allah wills, of the steadfast.} And when they had both submitted, Allah called to him: {You have fulfilled the vision}, and ransomed him with a great sacrifice. Then Ibrahim and his son Ismail built the Kaaba, raising the foundations and saying: {Our Lord, accept this from us} — they built the House, and then feared it might not be accepted from them.",
        word: { term: "Fragments", meaning: "Broken pieces, small and useless — nothing left to be put back." },
        lessons: [
          "Begin with someone who disagrees with you by asking, not by shouting.",
          "Stand with the truth even alone; Ibrahim was a whole nation by himself.",
          "Do the work well and then fear it may not be accepted; that is what the builders of the Kaaba did.",
        ],
        think:
          "Ibrahim asked his son's view on the hardest thing of all rather than ordering him. Why do you think that was? And how do you want your father to speak to you about hard things?",
        tryToday:
          "When you disagree with someone today, ask them a question instead of raising your voice.",
      },
    },
    image: "/stories/prophets/ibrahim.jpg",
    title: "قصة سيدنا إبراهيم (خليل الرحمن)",
    surahName: "",
    hook:
      "في هذه القصة ثلاثة اختبارات، كلّ واحد منها يكفي رجلًا كاملًا: أن يقف أمام قومه كلهم، ثم أمام النار، ثم أمام أصعب أمر يُطلب من أب. وصاحبها رجل واحد. وفي كل مرّة كان جوابه واحدًا.",
    events:
      "ثم فعل شيئًا لم يكن أحد ينتظره منه. خرج القوم إلى عيدهم، فدخل إبراهيم على أصنامهم ﴿فَجَعَلَهُمْ جُذَاذًا إِلَّا كَبِيرًا لَّهُمْ﴾ — كسّرها كلها إلا الكبير منها. ورجع القوم فرأوا ما رأوا، فسألوه، فقال: ﴿بَلْ فَعَلَهُ كَبِيرُهُمْ هَٰذَا فَاسْأَلُوهُمْ إِن كَانُوا يَنطِقُونَ﴾. فسكتوا قليلًا، ثم قالوا: ﴿لَقَدْ عَلِمْتَ مَا هَٰؤُلَاءِ يَنطِقُونَ﴾ — أنت تعرف أنها لا تتكلّم. وهذا بالضبط ما أراد: أن يقولوها بألسنتهم هم.",
    quranProse: "يقول الله تعالى عن معجزة النار: {قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ}.",
    lesson:
      "من سلّم أمره لله لم يخسر، مهما بدا الأمر صعبًا في أوّله.",
    next: "سيدنا إبراهيم كان له ابن أخ عاش في نفس الزمن وأصبح نبياً أيضاً، وذهب لقرية كان أهلها يفعلون أشياء سيئة جداً لم يفعلها أحد من قبل! من هو هذا النبي؟ إنه سيدنا لوط!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأنبياء: 51-70 والصافات: 83-113 والبقرة: 124-129", en: "The Quran, Al-Anbiya: 51-70, As-Saffat: 83-113, Al-Baqarah: 124-129" },
      note: { ar: "تحطيم الأصنام والنار والذبح وبناء الكعبة، كله بنص الآيات.", en: "Breaking the idols, the fire, the sacrifice and the building of the Ka'bah are all in the verses." },
    },
    challenge: {
      question: "ماذا قال الله للنار حين أُلقي فيها إبراهيم؟",
      options: ["اشتعلي أكثر", "كوني برداً وسلاماً", "انطفئي وحدك"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🔥",
      badge: "خليل الرحمن",
      keepsake: "غصن زيتون",
      note: "يذكّرك أن من توكّل على الله لم تضرّه نار ولا نارٌ أشدّ منها.",
    },
    arc: {
      idea: "رجلٌ واحد وقف أمام قومه بسؤال، ثم أمام النار بقلب، ثم أمام أصعب أمر بابنه.",
      setting:
        "نشأ إبراهيم عليه السلام في قوم يعبدون التماثيل، وأبوه منهم. ولم يبدأ معهم بالصياح، بل بدأ بالسؤال: ﴿مَا هَٰذِهِ التَّمَاثِيلُ الَّتِي أَنتُمْ لَهَا عَاكِفُونَ﴾. ثم أراهم بعقولهم: نظر إلى كوكب فقال هذا ربي، فلمّا غاب قال ﴿لَا أُحِبُّ الْآفِلِينَ﴾، ثم القمر، ثم الشمس — حتى انتهى بهم إلى: ﴿إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ﴾.",
      keyMoment:
        "فلم يجدوا جوابًا على حجّته إلا النار: ﴿قَالُوا حَرِّقُوهُ وَانصُرُوا آلِهَتَكُمْ﴾. وجمعوا نارًا عظيمة وألقوه فيها. وهنا قال الله كلمتين لا ثالث لهما: ﴿يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ﴾. وانتبه إلى «وسلامًا»: لو قيل «بردًا» وحدها لآذاه شدّة البرد، فجاءت «سلامًا» لتكون سلامة لا أذى فيها أصلًا. النار لم تتغيّر طبيعتها لأحد؛ تغيّر أمرها لأجل رجل واحد وقف وحده.",
      resolution:
        "ثم جاء الاختبار الثالث، وهو أثقلها: أن يذبح ابنه. ولم يفعلها من وراء ابنه، بل جاءه وقال: ﴿يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ﴾. فقال الابن: ﴿يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ﴾. فلمّا أسلما ناداه الله: ﴿قَدْ صَدَّقْتَ الرُّؤْيَا﴾، وفداه بذبح عظيم. ثم بنى إبراهيم وابنه إسماعيل الكعبة، وكانا يرفعان القواعد ويقولان: ﴿رَبَّنَا تَقَبَّلْ مِنَّا﴾ — بنيا البيت، ثم خافا ألّا يُقبل منهما.",
      word: { term: "جُذَاذًا", meaning: "قطعًا صغيرة مكسّرة، لا يصلح منها شيء." },
      lessons: [
        "ابدأ مع من يخالفك بالسؤال لا بالصياح.",
        "قف مع الحقّ ولو كنتَ وحدك؛ فقد كان إبراهيم أمّةً وحده.",
        "أحسِن العمل ثم خَف ألّا يُقبل؛ هكذا فعل من بنى الكعبة بيديه.",
      ],
      think:
        "سأل إبراهيمُ ابنَه رأيه في أصعب أمر، ولم يأمره به أمرًا. لماذا في رأيك؟ وكيف تحبّ أن يكلّمك أبوك في الأمر الصعب؟",
      tryToday:
        "حين تختلف اليوم مع أحد، اسأله سؤالًا بدل أن ترفع صوتك عليه.",
    },
  },
  {
    chapter: "prophets", slug: "lut",
    en: {
      title: "Prophet Lut and the Ruined City",
      hook:
        "What do you do when you are the only one in your town who can see that what people are doing is wrong? No one with you, no one listening, and you know you are right. In today's story, a prophet lived that for years, until he said a sentence anyone who has felt alone will understand.",
      events:
        "Lut said to them: {Do you commit such immorality as no one has preceded you with among the worlds?} He reminded them and advised them, and it went on a long time. He said: {Is there not among you a man of reason?} And what was their answer? {And the answer of his people was only that they said, expel them from your city. Indeed, they are people who keep themselves pure.} Look at the charge: expel them because they keep themselves clean. Their purity had become the fault they were driven out for.",
      lesson:
        "When everyone agrees on something wrong, it does not become right — even if you are the only one who says so.",
      next:
        "Prophet Lut stood for what is pure. In our next story, we will meet a handsome young boy whose own brothers threw him into a dark well out of jealousy, but he grew up to become a great minister! It's Prophet Yusuf!",
      quranProse:
        "Allah says: {And [We had sent] Lot when he said to his people, 'Do you commit such immorality as no one has preceded you with from among the worlds?'}",
      challenge: {
        question: "What did Lut ask of his people?",
        options: ["To leave wrongdoing and obey Allah", "To build a new city", "To farm the land"],
        correctAnswer: 0,
      },
      reward: {
        icon: "🌅",
        badge: "I choose the right road",
        keepsake: "A house key",
        note: "A reminder that good company protects you, and safety starts with a decision.",
      },
      arc: {
        idea: "A prophet who was the only one in his town saying \"this is not right\" — until saying it became the reason to drive him out.",
        setting:
          "Lut, peace be upon him, was sent to towns whose people had committed an immorality no one before them in the worlds had committed, and who also cut off the road and did what was wrong openly in their gatherings. And Lut had no one among them supporting him; no clan to protect him and no group behind him. {And to Lut We gave judgement and knowledge, and We saved him from the city that was committing wicked deeds.}",
        keyMoment:
          "Then the angels came to Lut as guests he did not recognise, and his people came rushing to him wanting his guests, and he stood defending them alone. And here he said the line the story turns on: {If only I had against you some power or could take refuge in a strong support.} If only I had strength against you, or a strong back to lean on. A prophet said that. And the angels moved to reassure him: {O Lut, indeed we are messengers of your Lord; they will never reach you.} He thought he had no support, and his support was standing inside his house.",
        resolution:
          "He was told to leave with his family by night and that none of them should look back. He left — except his wife: {except his wife; she was of those who remained behind} — because her heart was with the people, not with him. Then Allah turned those towns upside down and rained on them stones of hard clay. The one who was alone and without strength walked out safe; and of the many, not one remained.",
        word: { term: "A strong support", meaning: "A strong back to lean on and take shelter behind — like a solid wall to stand against." },
        lessons: [
          "The truth is not known by how many people say it.",
          "When things close in on you, know that your strong support is Allah.",
          "Being close to someone righteous does not help if you go against them; Lut's wife lived in a prophet's house.",
        ],
        think:
          "Lut said \"if only I had some power against you\" — and he was a prophet. Has there been a time when you felt completely alone? Who did you turn to?",
        tryToday:
          "If you see something today that you know is wrong and everyone is joining in, do not join in — walking away is enough.",
      },
    },
    image: "/stories/prophets/lut.jpg",
    title: "قصة سيدنا لوط",
    surahName: "",
    hook:
      "ماذا تفعل حين تكون الوحيد في مدينتك الذي يرى أن ما يفعله الناس خطأ؟ لا أحد معك، ولا أحد يسمعك، وأنت تعرف أنك على حقّ. في قصة اليوم نبيٌّ عاش هذا سنين، حتى قال جملة يفهمها كل من شعر بالوحدة.",
    events:
      "قال لهم لوط: ﴿أَتَأْتُونَ الْفَاحِشَةَ مَا سَبَقَكُم بِهَا مِنْ أَحَدٍ مِّنَ الْعَالَمِينَ﴾، وذكّرهم ونصحهم وطال ذلك. وقال لهم: ﴿أَلَيْسَ مِنكُمْ رَجُلٌ رَّشِيدٌ﴾ — أما فيكم رجل واحد رشيد؟ فماذا كان جوابهم؟ ﴿وَمَا كَانَ جَوَابَ قَوْمِهِ إِلَّا أَن قَالُوا أَخْرِجُوهُم مِّن قَرْيَتِكُمْ إِنَّهُمْ أُنَاسٌ يَتَطَهَّرُونَ﴾. انظر إلى التهمة: أخرجوهم لأنهم يتطهّرون! صار نقاؤهم عيبًا يُطردون به.",
    quranProse: "يقول الله تعالى عن عقابهم: {فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِّن سِجِّيلٍ مَّنضُودٍ}.",
    lesson:
      "إذا اجتمع الناس على الخطأ لم يصر الخطأ صوابًا، ولو كنتَ وحدك.",
    next: "نجا سيدنا لوط بفضل الله. والآن، استعدوا لقصة مليئة بالمغامرات العجيبة! قصة فيها بئر، وسجن، وقصر، وحلم جميل يتحقق بعد سنوات طويلة! إنها القصة التي سُميت في القرآن بـ 'أحسن القصص'.. قصة سيدنا يوسف!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، هود: 77-83 والأعراف: 80-84 والحجر: 57-77", en: "The Quran, Hud: 77-83, Al-A'raf: 80-84, Al-Hijr: 57-77" },
      note: { ar: "دعوته وعاقبة قومه وامرأته، كله بنص الآيات.", en: "His call, the fate of his people and of his wife are all in the verses." },
    },
    challenge: {
      question: "ماذا طلب لوط من قومه؟",
      options: ["أن يتركوا الفواحش ويطيعوا الله", "أن يبنوا مدينة جديدة", "أن يزرعوا الأرض"],
      correctAnswer: 0,
    },
    reward: {
      icon: "🌅",
      badge: "أختار الطريق الصحيح",
      keepsake: "مفتاح بيت",
      note: "يذكّرك أن الصحبة الصالحة تحميك، وأن النجاة تبدأ بقرار.",
    },
    arc: {
      idea: "نبيٌّ كان الوحيد في مدينته الذي يقول: هذا لا يصحّ — حتى صار قوله سببًا لطرده.",
      setting:
        "أُرسل لوط عليه السلام إلى قرى تُسمّى المؤتفكات، وكان أهلها قد فعلوا فاحشةً لم يسبقهم إليها أحد من العالمين، وكانوا مع ذلك يقطعون السبيل ويأتون في مجالسهم المنكر. ولم يكن مع لوط أحد من قومه يؤيّده؛ لا عشيرة تحميه ولا جماعة تسنده. ﴿وَلُوطًا آتَيْنَاهُ حُكْمًا وَعِلْمًا وَنَجَّيْنَاهُ مِنَ الْقَرْيَةِ الَّتِي كَانَت تَّعْمَلُ الْخَبَائِثَ﴾.",
      keyMoment:
        "ثم جاءت الملائكة إلى لوط في صورة ضيوف لا يعرفهم، فجاءه قومه يهرعون إليه يريدون ضيوفه، ووقف يدافع عنهم وحده. وهنا قال الجملة التي تدور عليها القصة: ﴿لَوْ أَنَّ لِي بِكُمْ قُوَّةً أَوْ آوِي إِلَىٰ رُكْنٍ شَدِيدٍ﴾ — ليت لي بكم قوّة، أو ظهرًا قويًّا ألجأ إليه. قالها نبيٌّ. فهمّت الملائكة عندها أن تطمئنه: ﴿يَا لُوطُ إِنَّا رُسُلُ رَبِّكَ لَن يَصِلُوا إِلَيْكَ﴾. كان يظنّ أنه بلا سند، والسند كان واقفًا في بيته.",
      resolution:
        "فأُمر أن يخرج بأهله ليلًا ولا يلتفت منهم أحد. وخرج، إلا امرأته: ﴿إِلَّا امْرَأَتَهُ كَانَتْ مِنَ الْغَابِرِينَ﴾ — كانت ممّن بقي، لأن قلبها كان مع القوم لا معه. ثم جعل الله عالي تلك القرى سافلها، وأمطر عليها حجارة من سجّيل. والذي كان بالأمس وحده بلا قوّة، خرج سالمًا؛ والذين كانوا كثرة، لم يبقَ منهم أحد.",
      word: { term: "رُكْن شديد", meaning: "ظهرٌ قويّ يُلجأ إليه ويُحتمى به — كجدار متين تستند إليه." },
      lessons: [
        "الحقّ لا يُعرف بعدد من يقول به.",
        "إذا ضاق بك الأمر فاعلم أن ركنك الشديد هو الله.",
        "القرب من الصالح لا ينفع مع مخالفته؛ فامرأة لوط كانت في بيت نبيّ.",
      ],
      think:
        "قال لوط: «لو أنّ لي بكم قوّة»، وهو نبيّ. هل مرّ بك موقف شعرتَ فيه أنك وحدك تمامًا؟ إلى من لجأت؟",
      tryToday:
        "إذا رأيت اليوم شيئًا تعرف أنه خطأ واشترك فيه الجميع، فلا تشترك فيه أنت — ويكفي أن تنصرف.",
    },
  },
  {
    chapter: "prophets", slug: "yusuf",
    en: {
      title: "Prophet Yusuf and the Beautiful Dream",
      hook:
        "A boy thrown into a well by his brothers. Then sold like goods. Then put in prison though he was innocent. At any one of those moments you would have said: that is the end of him. And yet the story ends with him over the treasuries of Egypt — and then forgiving.",
      events:
        "His brothers took him and threw him into the well, then came to their father at night weeping. A passing caravan picked him up and sold him in Egypt {for a reduced price — a few dirhams}. He grew up in the house of Egypt's minister, and then was called to what is forbidden behind closed doors, and said: {I seek the refuge of Allah}, and ran for the door. He was imprisoned though innocent, and said: {My Lord, prison is more to my liking than that to which they invite me.} And in prison he did not sit and wait: he made himself useful to those with him, interpreted their dreams, and called them to Allah. Then the king had a dream no one could interpret, and Yusuf was remembered, and he came out.",
      lesson:
        "What looks to you like the end of the road may be its beginning; Allah arranges things from where you cannot see.",
      next:
        "Yusuf was patient in the well and in prison. But what if a prophet got very, very sick for many years and lost everything he owned? Let's meet the champion of patience, Prophet Ayyub!",
      quranProse:
        "Allah says: {We relate to you, [O Muhammad], the best of stories in what We have revealed to you of this Qur'an.}",
      challenge: {
        question: "What did Yusuf say to his brothers when he finally met them?",
        options: ["Punished them harshly", "“No blame upon you today”", "Sent them away from Egypt"],
        correctAnswer: 1,
      },
      reward: {
        icon: "👕",
        badge: "I forgive when I could punish",
        keepsake: "Yusuf's shirt",
        note: "A reminder that the finest victory is to forgive when you are able to take revenge.",
      },
      arc: {
        idea: "A whole story in a single surah: from the bottom of a well to the treasuries of Egypt, and from envy to forgiveness.",
        setting:
          "Yusuf, peace be upon him, was the son of Yaqub, and the most beloved of his children to him. As a boy Yusuf had a dream and told his father: {Indeed, I have seen eleven stars and the sun and the moon; I saw them prostrating to me.} His father said: {O my son, do not relate your vision to your brothers, or they will contrive against you a plan} — do not tell your blessing to those who might envy you for it. But the envy was already there before the dream.",
        keyMoment:
          "The moment the story turns on is not his release from prison, nor his being put over the treasuries of Egypt. It is when his brothers stood before him, and he was the minister and they had nothing, and it was entirely in his hands to do to them whatever he wished after everything they had done. They said: {By Allah, certainly has Allah preferred you over us, and indeed, we have been sinners.} And what did he say? {No blame will there be upon you today. Allah will forgive you; and He is the most merciful of the merciful.} One sentence ended long years.",
        resolution:
          "Then he sent his shirt to be cast over his father's face, and his sight returned, and he brought his whole family to Egypt. {And he raised his parents upon the throne, and they bowed to him in prostration. And he said, O my father, this is the explanation of my vision of before; my Lord has made it reality.} The dream he saw as a boy came true after all that long road. Then he prayed — and what did he ask for? {Cause me to die a Muslim and join me with the righteous.} He reached the highest place in Egypt, and asked Allah to let him die a Muslim.",
        word: { term: "No blame", meaning: "No reproach, no scolding, no bringing up what happened — the most beautiful thing to say to someone who wronged you." },
        lessons: [
          "Do not tell every blessing you have to everyone.",
          "Be patient and useful where you are; Yusuf helped the people around him while in prison.",
          "Forgiving when you have the power to punish is harder than revenge, and finer.",
        ],
        think:
          "Yusuf forgave his brothers at the exact moment he had complete power over them. Have you ever forgiven someone when you could have paid them back? How did you feel afterwards?",
        tryToday:
          "Forgive someone today that you are carrying something against — even silently, without telling them.",
      },
    },
    image: "/stories/prophets/yusuf.jpg",
    title: "قصة سيدنا يوسف (أحسن القصص)",
    surahName: "",
    hook:
      "طفلٌ ألقاه إخوته في بئر. ثم بيع كما تُباع البضاعة. ثم دخل السجن وهو بريء. ولو رأيتَه في أيّ لحظة من هذه اللحظات لقلتَ: انتهى أمره. ومع ذلك انتهت القصة بأن صار على خزائن مصر — ثم سامَح.",
    events:
      "أخذه إخوته وألقوه في الجُبّ، ثم جاءوا أباهم عشاءً يبكون. فالتقطته قافلة مارّة فباعته في مصر ﴿بِثَمَنٍ بَخْسٍ دَرَاهِمَ مَعْدُودَةٍ﴾. فنشأ في بيت عزيز مصر، ثم دُعي إلى الحرام وأُغلقت الأبواب، فقال: ﴿مَعَاذَ اللَّهِ﴾، وفرّ إلى الباب. فسُجن وهو بريء، وقال: ﴿رَبِّ السِّجْنُ أَحَبُّ إِلَيَّ مِمَّا يَدْعُونَنِي إِلَيْهِ﴾. وفي السجن لم يجلس ينتظر؛ صار ينفع من معه، ويفسّر رؤاهم، ويدعوهم إلى الله. ثم رأى الملك رؤيا عجز الناس عن تفسيرها، فذُكر يوسف، فخرج.",
    quranProse: "سمى الله هذه القصة بأجمل اسم وقال: {نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ}.",
    lesson:
      "ما يبدو لك نهايةَ الطريق قد يكون أوّله؛ والله يدبّر من حيث لا ترى.",
    next: "صبر سيدنا يوسف كثيراً في السجن. ولكن في القصة القادمة، سنتعرف على نبي يُضرب به المثل الأعلى في الصبر! مرض مرضاً شديداً جداً وفقد كل ألعابه وأمواله، لكنه لم يغضب من الله أبداً! من هو؟ إنه سيدنا أيوب.",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف كاملة", en: "The Quran, the whole of Surah Yusuf" },
      note: { ar: "القصة كاملة في سورة واحدة من أولها إلى آخرها، وهي أتمّ قصة في القرآن.", en: "The account runs whole through a single surah from beginning to end — the most complete narrative in the Quran." },
    },
    challenge: {
      question: "ماذا قال يوسف لإخوته حين التقاهم أخيراً؟",
      options: ["عاقبهم بشدة", "«لا تثريب عليكم اليوم»", "طردهم من مصر"],
      correctAnswer: 1,
    },
    reward: {
      icon: "👕",
      badge: "أعفو عند المقدرة",
      keepsake: "قميص يوسف",
      note: "يذكّرك أن أجمل انتصار أن تسامح وأنت قادر على الانتقام.",
    },
    arc: {
      idea: "قصّةٌ كاملة في سورة واحدة: من قاع البئر إلى خزائن مصر، ومن الحسد إلى العفو.",
      setting:
        "يوسف عليه السلام ابن يعقوب عليه السلام، وكان أحبّ أولاده إليه. ورأى يوسف وهو صغير رؤيا فحكاها لأبيه: ﴿إِنِّي رَأَيْتُ أَحَدَ عَشَرَ كَوْكَبًا وَالشَّمْسَ وَالْقَمَرَ رَأَيْتُهُمْ لِي سَاجِدِينَ﴾. فقال له أبوه: ﴿يَا بُنَيَّ لَا تَقْصُصْ رُؤْيَاكَ عَلَىٰ إِخْوَتِكَ فَيَكِيدُوا لَكَ كَيْدًا﴾ — أي لا تحكِ نعمتك لمن قد يحسدك عليها. لكنّ الحسد كان قد سبق الرؤيا.",
      keyMoment:
        "واللحظة التي تدور عليها القصة ليست خروجه من السجن، ولا أن صار على خزائن مصر. هي حين وقف إخوته أمامه وهو العزيز، وهم لا يملكون شيئًا، وقد صار في يده أن يفعل بهم ما شاء بعد كل ما فعلوه. فقالوا: ﴿تَاللَّهِ لَقَدْ آثَرَكَ اللَّهُ عَلَيْنَا وَإِن كُنَّا لَخَاطِئِينَ﴾. فماذا قال؟ ﴿لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ يَغْفِرُ اللَّهُ لَكُمْ وَهُوَ أَرْحَمُ الرَّاحِمِينَ﴾ — لا لوم عليكم اليوم. كلمةٌ واحدة أنهت سنين طويلة.",
      resolution:
        "ثم أرسل قميصه ليُلقى على وجه أبيه فارتدّ بصيرًا، وجاء بأهله كلهم إلى مصر. ﴿وَرَفَعَ أَبَوَيْهِ عَلَى الْعَرْشِ وَخَرُّوا لَهُ سُجَّدًا وَقَالَ يَا أَبَتِ هَٰذَا تَأْوِيلُ رُؤْيَايَ مِن قَبْلُ قَدْ جَعَلَهَا رَبِّي حَقًّا﴾. الرؤيا التي رآها طفلًا تحقّقت بعد كل هذا الطريق الطويل. ثم دعا ربه فماذا سأل؟ ﴿تَوَفَّنِي مُسْلِمًا وَأَلْحِقْنِي بِالصَّالِحِينَ﴾. بلغ أعلى مكان في مصر، فسأل الله أن يموت مسلمًا.",
      word: { term: "لا تَثْريب", meaning: "لا لوم ولا عتاب ولا تذكير بما مضى — وهي أجمل ما يقال لمن أخطأ في حقّك." },
      lessons: [
        "لا تحكِ كلّ نعمة عندك لكلّ أحد.",
        "اصبر واعمل حيث أنت؛ فقد نفع يوسفُ من كان معه وهو في السجن.",
        "العفو عند المقدرة أصعب من الانتقام، وأجمل منه.",
      ],
      think:
        "سامح يوسفُ إخوته في اللحظة التي كان يقدر فيها عليهم تمامًا. هل سامحتَ أحدًا وأنت قادر على أن تردّ له إساءته؟ بماذا شعرتَ بعدها؟",
      tryToday:
        "سامِح اليوم شخصًا تحمل في قلبك شيئًا عليه، ولو لم تقل له شيئًا ولم يعرف.",
    },
  },
  {
    chapter: "prophets", slug: "ayoub",
    en: {
      title: "Prophet Ayyub, the Champion of Patience",
      hook:
        "If you lost everything — your money, your home, the people you love, your health — what would you say to your Lord? In today's story, all of that happened to one man. Then he prayed in two short sentences, and asked for nothing in them.",
      events:
        "The illness went on so long that people withdrew from him, and no one was left with him but his wife. The Quran does not say that he complained to anyone, or that he asked: why me in particular? As for how long the illness lasted and the details of what he lost, that comes from the commentators, not from the Quran. The Quran gives you what matters in a story and leaves out what will not help you.",
      lesson:
        "Patience is not staying silent about pain; it is staying with Allah while you are in it.",
      next:
        "Prophet Ayyub taught us ultimate patience. Next we witness the sea splitting in half for a prophet and his people. Get ready for the greatest of miracles!",
      quranProse:
        "Allah says: {Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].}",
      challenge: {
        question: "What is Ayyub best known for?",
        options: ["His wealth", "His patience", "His travels"],
        correctAnswer: 1,
      },
      reward: {
        icon: "💧",
        badge: "Patient and grateful",
        keepsake: "A drop from the spring",
        note: "A reminder that patience is not silence under pain, but trust that relief is coming.",
      },
      arc: {
        idea: "A man who lost everything, and prayed in two sentences — asking for nothing in either of them.",
        setting:
          "Ayub, peace be upon him, was a prophet whom Allah had given wealth, children and health. Then Allah tested him: his wealth went, his children went, and an illness took hold of his body and stayed. A trial is not always a punishment; Allah tests those He loves in order to raise them. The Prophet was asked which people are tested most severely, and he said: the prophets, then the next best, then the next.",
        keyMoment:
          "Then he prayed. And look at how he prayed, because this is the most beautiful thing in the story: {And Ayub, when he called to his Lord, Indeed, adversity has touched me, and You are the most merciful of the merciful.} Two sentences, no more. In the first he states his condition: adversity has touched me. In the second he mentions his Lord: and You are the most merciful of the merciful. He did not say \"heal me.\" He did not say \"give me back my wealth and my children.\" He laid his condition before the One who knows, and then went quiet. That is a manner of asking which teaches you that the One who knows your state does not need it spelled out.",
        resolution:
          "And the answer came: {So We responded to him and removed what afflicted him of adversity. And We gave him back his family and the like thereof with them as mercy from Us.} And he was told: {Strike with your foot; this is a cool bath and drink.} He struck the ground and cool water came out; he washed with it and drank and was healed. Then Allah said of him the highest thing that can be said of a man: {Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back to Allah.}",
        word: { term: "Repeatedly turning back", meaning: "Someone who returns to Allah in every state — in hardship and in ease alike." },
        lessons: [
          "Lay your need before Allah with good manners, and do not rush the answer.",
          "A trial can be a raising rather than a punishment.",
          "No one's patience is wasted; Allah gave Ayub back his family and the like of them with them.",
        ],
        think:
          "Ayub mentioned his state, then his Lord's mercy, and asked for nothing. Try writing your own prayer in two lines that way — what would you say?",
        tryToday:
          "Name one thing that hurts you today, and say: my Lord, You are the most merciful of the merciful. Then stop, and add nothing.",
      },
    },
    image: "/stories/prophets/ayoub.jpg",
    title: "قصة سيدنا أيوب",
    surahName: "",
    hook:
      "لو ضاع منك كل شيء: مالك، وبيتك، ومن تحبّ، وصحّتك — ماذا كنت ستقول لربّك؟ في قصة اليوم رجلٌ حدث له هذا كله. ثم دعا بجملتين قصيرتين، ولم يطلب فيهما شيئًا.",
    events:
      "وطال المرض حتى ابتعد عنه الناس، ولم يبقَ معه إلا امرأته. ولم يُذكر في القرآن أنه شكا إلى أحد من الناس، ولا أنه قال: لماذا أنا بالذات؟ وأمّا كم لبث في مرضه، وما تفاصيل ما فقده، فهذا من أقوال المفسّرين لا من القرآن. والقرآن يذكر لك المهمّ في القصة ويترك ما لا ينفعك منها.",
    quranProse: "يقول الله تعالى يعلمنا دعاء سيدنا أيوب الجميل: {وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ}.",
    lesson:
      "الصبر ليس أن تسكت على الألم، بل أن تبقى مع الله وأنت فيه.",
    next: "تعلمنا الصبر من سيدنا أيوب. والآن، استعدوا لقصة نبي ولد في زمن كان الملك فيه يقتل الأطفال! فوضعته أمه في صندوق ورمته في النهر، ليصل إلى قصر ذلك الملك الشرير ويربى فيه! من هو؟ إنه سيدنا موسى كليم الله!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأنبياء: 83-84 وص: 41-44", en: "The Quran, Al-Anbiya: 83-84 and Sad: 41-44" },
      note: { ar: "البلاء والدعاء والشفاء بالماء ورد أهله إليه، كله بنص الآيات. أما مدة مرضه وتفاصيل ما فقده فمن أقوال المفسرين لا من القرآن.", en: "The trial, the supplication, the healing by water and the return of his family are all in the verses. How long he was ill and what exactly he lost come from the commentators, not from the Quran." },
    },
    challenge: {
      question: "بماذا اشتهر أيوب عليه السلام؟",
      options: ["بالغنى", "بالصبر", "بالسفر"],
      correctAnswer: 1,
    },
    reward: {
      icon: "💧",
      badge: "صابرٌ شاكر",
      keepsake: "قطرة من العين",
      note: "تذكّرك أن الصبر ليس سكوتاً على الألم، بل ثقة بأن الفرج قادم.",
    },
    arc: {
      idea: "رجلٌ فقد كل شيء، فدعا بجملتين — ولم يسأل فيهما شيئًا.",
      setting:
        "كان أيوب عليه السلام نبيًّا آتاه الله المال والولد والصحّة. ثم ابتلاه الله: ذهب ماله، وذهب ولده، وأصابه في جسده مرضٌ طال به الزمن. والابتلاء ليس عقوبةً دائمًا؛ فالله يبتلي من يحبّ ليرفع درجته. وقد سُئل النبي ﷺ: أيّ الناس أشدّ بلاءً؟ فقال: الأنبياء، ثم الأمثل فالأمثل.",
      keyMoment:
        "ثم دعا. وانظر كيف دعا، فهذا هو أجمل ما في القصة: ﴿وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ﴾. جملتان لا غير. الأولى يخبر فيها بحاله: مسّني الضرّ. والثانية يذكر فيها ربّه: وأنت أرحم الراحمين. ولم يقل: اشفني، ولم يقل: أعِد إليّ مالي وولدي. عرض حاله على من يعلم، ثم سكت. وهذا أدبٌ يعلّمك أن الذي يعرف حالك لا يحتاج أن تفصّل له.",
      resolution:
        "فجاء الجواب: ﴿فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا﴾. وقيل له: ﴿ارْكُضْ بِرِجْلِكَ هَٰذَا مُغْتَسَلٌ بَارِدٌ وَشَرَابٌ﴾ — اضرب الأرض بقدمك، فخرج ماءٌ بارد اغتسل منه وشرب فشُفي. ثم قال الله عنه كلمة هي أعلى ما يُقال في رجل: ﴿إِنَّا وَجَدْنَاهُ صَابِرًا نِّعْمَ الْعَبْدُ إِنَّهُ أَوَّابٌ﴾.",
      word: { term: "أَوَّاب", meaning: "كثير الرجوع إلى الله في كل حال: في الشدّة وفي الرخاء جميعًا." },
      lessons: [
        "اعرض حاجتك على الله بأدب، ولا تستعجل الجواب.",
        "البلاء قد يكون رفعةً لا عقوبة.",
        "من صبر لم يضع صبره؛ فقد ردّ الله لأيوب أهله ومثلهم معهم.",
      ],
      think:
        "دعا أيوب فذكر حاله ثم ذكر رحمة ربّه، ولم يطلب شيئًا. جرّب أن تصوغ دعاءك أنت في سطرين على هذه الطريقة — ماذا ستقول؟",
      tryToday:
        "اذكر اليوم شيئًا واحدًا يؤلمك، وقل: يا ربّ، أنت أرحم الراحمين. ثم اسكت ولا تزد شيئًا.",
    },
  },
  {
    chapter: "prophets", slug: "musa-and-harun",
    en: {
      title: "Prophet Musa and the Parting of the Sea",
      hook:
        "The most dangerous place in all of Egypt was Pharaoh's palace. And it was there exactly, in the house of the man who was killing the children, that Allah raised the child who would one day stand before him. How does that happen?",
      events:
        "She placed him in the river, and Pharaoh's household picked him up: {And the family of Pharaoh picked him up so that he would become to them an enemy and a source of grief.} The baby refused to nurse from any woman, until his sister pointed them to a woman who could nurse him — his own mother. {So We restored him to his mother that she might be content and not grieve.} She nursed her own son and was paid for it, in the house of the man who was killing children. Then Musa grew up, left Egypt after an incident, lived in Madyan for years, and then returned. And on his way back, in a sacred valley called Tuwa, Allah called to him.",
      lesson:
        "When things close in until you can see no way out, the way out is with Allah, not with you.",
      next:
        "Musa's staff parted the sea. But in the next story, a prophet made the sun itself stop moving in the sky! Who is he? It's Prophet Yusha!",
      quranProse:
        "Allah says: {And We inspired to Moses, 'Strike with your staff the sea,' and it parted, and each portion was like a great towering mountain.}",
      challenge: {
        question: "What did Allah do to the sea when Musa struck it with his staff?",
        options: ["Froze it", "Split it, each part like a great mountain", "Dried it completely"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌊",
        badge: "With Allah I am not afraid",
        keepsake: "A wooden staff",
        note: "A reminder that the way can open at the very moment you think it closed.",
      },
      arc: {
        idea: "A baby his mother placed in the river at Allah's command, raised in his palace by the man who was killing the children.",
        setting:
          "Pharaoh had enslaved the Children of Israel: {Indeed, Pharaoh exalted himself in the land and made its people into factions, oppressing a sector among them, slaughtering their sons.} And it was in exactly that time that Musa was born. So Allah inspired his mother with an astonishing instruction: {Suckle him; but when you fear for him, cast him into the river and do not fear and do not grieve. Indeed, We will return him to you and will make him one of the messengers.} When you fear for him — put him in the water.",
        keyMoment:
          "Allah gave him two signs — the staff and the hand — and then commanded the hardest thing: {Go to Pharaoh. Indeed, he has transgressed.} Musa said: {My Lord, expand for me my breast. And ease for me my task. And untie the knot from my tongue, that they may understand my speech.} And he asked for his brother: {And appoint for me a minister from my family — Harun, my brother.} Allah gave him all of it. Then notice the instruction they set out with towards the most tyrannical man on earth: {And speak to him with gentle speech, that perhaps he may be reminded or fear Allah.} Gentle speech — to Pharaoh.",
        resolution:
          "They went. The magicians were gathered to defeat Musa, and when they saw the truth they prostrated and said: {We have believed in the Lord of the worlds} — the ones brought to beat him were the first to believe in him. Then Musa left with the Children of Israel by night, and Pharaoh followed with his army until they were between the sea ahead and the army behind. His companions said: {Indeed, we are to be overtaken.} He said: {No! Indeed, with me is my Lord; He will guide me.} {And it parted, and each portion was like a great towering mountain.} They crossed — and what Pharaoh had been chasing caught him instead.",
        word: { term: "A towering mountain", meaning: "A great, immovable mountain, firmly fixed in place." },
        lessons: [
          "Do what you are told even when it sounds frightening; Musa's mother put her baby in the water to keep him safe.",
          "Speak gently to those you disagree with; Musa was told to do it with Pharaoh himself.",
          "Ask for help from those around you; Musa asked that his brother be with him.",
        ],
        think:
          "Musa's companions said \"we are to be overtaken,\" and he said \"with me is my Lord; He will guide me.\" Both were looking at the same sea and the same army. What was different?",
        tryToday:
          "If you face something today you think is impossible, say before you start: \"with me is my Lord; He will guide me\" — then start.",
      },
    },
    image: "/stories/prophets/musa-and-harun.jpg",
    title: "قصة سيدنا موسى وأخيه هارون",
    surahName: "",
    hook:
      "أخطر مكان في مصر كلها كان قصر فرعون. وهناك بالضبط، بين يدي الرجل الذي كان يقتل الأطفال، ربّى الله الطفل الذي سيقف في وجهه يومًا. كيف يحدث هذا؟",
    events:
      "فألقته في اليمّ، فالتقطه آل فرعون: ﴿فَالْتَقَطَهُ آلُ فِرْعَوْنَ لِيَكُونَ لَهُمْ عَدُوًّا وَحَزَنًا﴾. ورفض الطفل أن يرضع من أيّ امرأة، حتى دلّتهم أخته على امرأة ترضعه — وهي أمّه. ﴿فَرَدَدْنَاهُ إِلَىٰ أُمِّهِ كَيْ تَقَرَّ عَيْنُهَا وَلَا تَحْزَنَ﴾. فصارت ترضع ابنها وتأخذ على ذلك أجرًا، في بيت الرجل الذي كان يقتل الأطفال. ثم كبر موسى، وخرج من مصر بعد حادثة وقعت له، وعاش في مَدْيَن سنين، ثم رجع. وفي طريق رجوعه، في وادٍ مقدّس اسمه طُوى، ناداه الله.",
    quranProse: "يقول الله تعالى آمراً سيدنا موسى أن يأخذ أخاه معه: {اذْهَبْ أَنتَ وَأَخُوكَ بِآيَاتِي وَلَا تَنِيَا فِي ذِكْرِي}.",
    lesson:
      "إذا اشتدّ بك الأمر حتى لا ترى مخرجًا، فالمخرج عند الله لا عندك.",
    next: "نجا بنو إسرائيل وعبروا البحر.. ولكنهم بعد موسى احتاجوا لقائد شجاع ليدخل بهم مدينة مقدسة. هل تعرفون من هو الشاب الذي قادهم وكان الفتى المرافق لسيدنا موسى في رحلاته؟ إنه سيدنا يوشع بن نون!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة طه، والقصص: 1-46، والشعراء: 10-68", en: "The Quran, Surah Ta-Ha, Al-Qasas: 1-46, Ash-Shu'ara: 10-68" },
      note: { ar: "المولد والتابوت والعصا وفرعون وفلق البحر، كله بنص الآيات.", en: "The birth, the basket, the staff, Pharaoh and the parting of the sea are all in the verses." },
    },
    challenge: {
      question: "ماذا فعل الله بالبحر حين أمر موسى أن يضربه بعصاه؟",
      options: ["جمّده", "فلقه فصار كل فرق كالطود العظيم", "جفّفه تماماً"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌊",
      badge: "لا أخاف مع الله",
      keepsake: "عصا من خشب",
      note: "تذكّرك أن الطريق قد ينفتح في اللحظة التي تظنّ فيها أنه انغلق.",
    },
    arc: {
      idea: "طفلٌ ألقته أمّه في النهر بأمر من الله، فربّاه في قصره الرجلُ الذي كان يقتل الأطفال.",
      setting:
        "كان فرعون قد استعبد بني إسرائيل: ﴿إِنَّ فِرْعَوْنَ عَلَا فِي الْأَرْضِ وَجَعَلَ أَهْلَهَا شِيَعًا يَسْتَضْعِفُ طَائِفَةً مِّنْهُمْ يُذَبِّحُ أَبْنَاءَهُمْ﴾. وفي هذا الزمن بالذات وُلد موسى. فأوحى الله إلى أمّه بأمر عجيب: ﴿أَنْ أَرْضِعِيهِ فَإِذَا خِفْتِ عَلَيْهِ فَأَلْقِيهِ فِي الْيَمِّ وَلَا تَخَافِي وَلَا تَحْزَنِي إِنَّا رَادُّوهُ إِلَيْكِ وَجَاعِلُوهُ مِنَ الْمُرْسَلِينَ﴾ — إن خفتِ عليه فألقيه في الماء.",
      keyMoment:
        "وآتاه الله آيتين — العصا واليد — ثم أمره بأصعب أمر: ﴿اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ﴾. فقال موسى: ﴿رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي * يَفْقَهُوا قَوْلِي﴾، وسأل أن يكون معه أخوه: ﴿وَاجْعَل لِّي وَزِيرًا مِّنْ أَهْلِي هَارُونَ أَخِي﴾. فأعطاه الله ذلك كلّه. ثم انتبه إلى الوصية التي خرجا بها إلى أطغى رجل في الأرض: ﴿فَقُولَا لَهُ قَوْلًا لَّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ﴾. قولًا ليّنًا — لفرعون.",
      resolution:
        "وذهبا. فجُمع السحرة ليغلبوا موسى، فلمّا رأوا الحقّ سجدوا وقالوا: ﴿آمَنَّا بِرَبِّ الْعَالَمِينَ﴾ — الذين جاءوا ليهزموه صاروا أوّل من آمن به. ثم خرج موسى ببني إسرائيل ليلًا، فتبعهم فرعون بجيشه حتى صاروا بين البحر أمامهم والجيش خلفهم. فقال أصحابه: ﴿إِنَّا لَمُدْرَكُونَ﴾. فقال: ﴿كَلَّا إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ﴾. ﴿فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ﴾ — انشقّ البحر حتى صار كل جزء منه كالجبل. فعبروا، وأدرك فرعونَ ما كان يفرّ منه.",
      word: { term: "الطَّوْد", meaning: "الجبل العظيم الراسخ الذي لا يتحرّك." },
      lessons: [
        "افعل ما أُمرت به وإن بدا مخيفًا؛ فقد ألقت أمُّ موسى ابنها في الماء لتحفظه.",
        "كلّم من تخالفه بلين؛ فقد أُمر موسى بذلك مع فرعون نفسه.",
        "اطلب العون ممّن حولك؛ فقد سأل موسى ربّه أن يكون معه أخوه.",
      ],
      think:
        "قال أصحاب موسى: إنّا لمدركون، وقال هو: إنّ معي ربي سيهدين. وكلاهما يرى نفس البحر ونفس الجيش. فما الذي كان مختلفًا بينهما؟",
      tryToday:
        "إذا واجهك اليوم أمرٌ تظنّه مستحيلًا، فقل قبل أن تبدأ: «إنّ معي ربي سيهدين»، ثم ابدأ فيه.",
    },
  },
  {
    chapter: "prophets", slug: "yusha",
    en: {
      title: "Prophet Yusha and the Frozen Sun",
      hook:
        "Has the sun ever stopped? In an authentic hadith reported by Bukhari and Muslim, a prophet went out on an expedition, and the sun was held back for him until his victory was complete. The hadith does not give his name. So who was he? The answer to that is more honest than you expect.",
      events:
        "The Prophet said that this prophet told his people before they set out: let no man follow me who has married a woman and wishes to consummate the marriage but has not yet; nor a man who has built houses and not yet put the roofs on; nor a man who has bought sheep or pregnant camels and is waiting for them to give birth. And why? Because such a man's heart would stay in his house rather than on the task. So he chose those whose whole heart would come with them, not merely their feet.",
      lesson:
        "Whoever wants something to succeed should clear his heart for it before he clears his hands.",
      next:
        "The sun stopped for Yusha. In the next story, we will meet a prophet who could mold hard iron with his bare hands like soft clay! It's Prophet Dawud!",
      quranProse:
        "Allah says about giving them victory: {And Allah restored to them the city...} (As mentioned in the Prophetic Hadith about the sun stopping for him).",
      challenge: {
        question: "What did the leader ask his Lord for on the day of the battle?",
        options: ["For rain", "That the sun hold back from setting", "For wind"],
        correctAnswer: 1,
      },
      reward: {
        icon: "☀️",
        badge: "I trust, then I act",
        keepsake: "A disc of the sun",
        note: "A reminder that supplication is a weapon, but only after you have done your part.",
      },
      arc: {
        idea: "A prophet the sun was held back for until victory was complete — whom the hadith never names, and this page says so plainly.",
        setting:
          "In Bukhari and Muslim, the Prophet said: \"A prophet from among the prophets went on an expedition…\" Notice the opening: a prophet from among the prophets, with no name. Many commentators held that it was Yusha ibn Nun, the young companion of Musa who is mentioned in Surah Al-Kahf — also without a name. And the name \"Yusha\" is not in the Quran at all. So the event is established in the soundest of books, and the naming is a scholarly judgement — which is why you will see the yellow mark at the bottom of this page.",
        keyMoment:
          "He drew near the town in the late afternoon, with the sun close to setting and the matter not yet finished. He turned to the sun and said the words the hadith records: \"You are under command and I am under command. O Allah, hold it back for us.\" And it was held back until Allah granted him the victory. Look at what he said first: you are under command and I am under command. He did not say \"I command you.\" He knew the sun was not his to own, and that he was under command exactly as it was — and then he asked the One who commands them both.",
        resolution:
          "Then they gathered the spoils, and fire came to consume them as happened for the nations before us — and it did not consume them. So he knew someone among them had taken something. He had each tribe pledge to him, and one man's hand stuck to his; he had taken something from the spoils and hidden it. He returned it, and the fire consumed the spoils. Then the Prophet ended the hadith with a mercy for us: \"So spoils were made lawful for us. Allah saw our weakness and our inability, and made them lawful for us.\"",
        word: { term: "Pregnant camels", meaning: "She-camels expecting young, whose owner is waiting each day for them to give birth." },
        lessons: [
          "Do not begin something with your heart attached somewhere else.",
          "Know your limit; he said \"you are under command and I am under command,\" and then prayed to Allah.",
          "Taking what is not yours from what belongs to everyone spoils everyone's work, not just your own.",
        ],
        think:
          "This prophet chose to take with him only those whose hearts were not tied to something else. What occupies your heart while you are studying or praying? How could you set it aside?",
        tryToday:
          "Do one thing today with your whole heart present: put everything that distracts you out of reach, then begin.",
      },
    },
    image: "/stories/prophets/yusha.jpg",
    title: "قصة سيدنا يوشع بن نون",
    surahName: "",
    hook:
      "هل توقّفت الشمس يومًا؟ في حديث صحيح رواه البخاري ومسلم أن نبيًّا من الأنبياء غزا، فحُبست له الشمس حتى تمّ له النصر. ولم يذكر الحديث اسمه. فمن هو؟ الجواب على هذا السؤال أصدق ممّا تتوقّع.",
    events:
      "قال النبي ﷺ إن هذا النبيّ قال لقومه قبل أن يخرجوا: لا يتبعني رجل قد تزوّج امرأة وهو يريد أن يبني بها ولمّا يبنِ بعد، ولا رجل بنى بيوتًا ولم يرفع سقوفها، ولا رجل اشترى غنمًا أو خَلِفات — وهي النوق الحوامل — وهو ينتظر ولادها. ولماذا؟ لأن قلب هذا الرجل سيبقى في بيته لا في مهمّته. فاختار من يذهب قلبه كله معه، لا من تذهب قدماه وحدها.",
    quranProse: "لم يُذكر اسمه صراحة في القرآن، لكن الله ذكره بلقب (الفتى) في سورة الكهف حين كان برفقة موسى: {وَإِذْ قَالَ مُوسَىٰ لِفَتَاهُ لَا أَبْرَحُ حَتَّىٰ أَبْلُغَ مَجْمَعَ الْبَحْرَيْنِ أَوْ أَمْضِيَ حُقُبًا}.",
    lesson:
      "من أراد أن يتمّ له أمر، فليفرّغ له قلبه قبل أن يفرّغ له يده.",
    next: "بعد فترة، ظهر في جيش المؤمنين شاب صغير آخر، واجه أقوى وأضخم جندي في جيش الأعداء، وهزمه بحجر صغير فقط! وأصبح بعدها مَلِكاً ونبياً.. من هو؟ إنه سيدنا داود.",
    source: {
      reliability: "🟡",
      reference: { ar: "لم يُذكر اسمه في القرآن؛ والحديث في صحيح البخاري (3124) ومسلم (1747) بلا تسمية", en: "Not named in the Quran; the hadith is in Sahih al-Bukhari (3124) and Muslim (1747) without naming him" },
      note: { ar: "حبس الشمس ثابت في الصحيحين، لكن الحديث يقول «غزا نبيٌّ من الأنبياء» ولم يسمِّه، وتسميته يوشع بن نون من أقوال المفسرين. واسم يوشع ليس في القرآن أصلاً، ولذلك تبقى القصة بهذه العلامة: الحدث ثابت، والتسمية اجتهاد.", en: "The holding back of the sun is established in both Sahihs, but the hadith says only that a prophet went out to battle and does not name him; identifying him as Yusha ibn Nun comes from the commentators, and the name is not in the Quran at all. That is why the mark stays: the event is established, the name is an inference." },
    },
    challenge: {
      question: "ماذا طلب القائد من ربه يوم المعركة؟",
      options: ["أن ينزل المطر", "أن تتأخر الشمس عن الغروب", "أن تهبّ الريح"],
      correctAnswer: 1,
    },
    reward: {
      icon: "☀️",
      badge: "أتوكّل ثم أعمل",
      keepsake: "قرص الشمس",
      note: "يذكّرك أن الدعاء سلاح، لكن لا يُرفع إلا بعد أن تبذل جهدك.",
    },
    arc: {
      idea: "نبيٌّ حُبست له الشمس حتى يتمّ النصر — ولم يسمِّه الحديث، وهذه الصفحة تقول لك ذلك بصراحة.",
      setting:
        "في الصحيحين عن النبي ﷺ أنه قال: «غزا نبيٌّ من الأنبياء…». وانتبه إلى أوّل الحديث: نبيٌّ من الأنبياء، بغير تسمية. وقد ذهب كثير من المفسّرين إلى أنه يوشع بن نون، فتى موسى الذي ذُكر في سورة الكهف بغير اسم كذلك. واسم «يوشع» ليس في القرآن أصلًا. فالحدث ثابت في أصحّ الكتب، والتسمية اجتهاد — ولهذا تجد العلامة الصفراء في آخر هذه الصفحة.",
      keyMoment:
        "ثم دنا من القرية عند العصر، وقاربت الشمس أن تغرب، والأمر لم يتمّ بعد. فالتفت إلى الشمس وقال كلمة يرويها الحديث: «إنكِ مأمورة وأنا مأمور، اللهمّ احبسها علينا». فحُبست حتى فتح الله عليه. وانظر ماذا قال أوّلًا: إنكِ مأمورة وأنا مأمور. لم يقل: أنا آمركِ. عرف أن الشمس ليست ملكًا له، وأنه هو أيضًا مأمور مثلها، ثم توجّه بالطلب إلى الذي يأمرهما جميعًا.",
      resolution:
        "ثم جمعوا الغنائم، فجاءت النار لتأكلها كما كان يحدث في الأمم قبلنا، فلم تأكلها. فعلم أن فيهم من أخذ شيئًا، فأمر كل قبيلة أن تبايعه، فلصقت يد رجل بيده، فإذا هو قد أخذ من الغنيمة شيئًا فأخفاه. فردّه، فأكلت النار الغنائم. ثم قال النبي ﷺ في آخر الحديث كلمة فيها رحمة بنا: «فأُحلّت لنا الغنائم، رأى الله ضعفنا وعجزنا فأحلّها لنا».",
      word: { term: "الخَلِفات", meaning: "النوق الحوامل التي ينتظر صاحبها ولادها في كل يوم." },
      lessons: [
        "لا تبدأ عملًا وقلبك معلّق بشيء آخر.",
        "اعرف حدّك؛ فقد قال: إنكِ مأمورة وأنا مأمور، ثم دعا الله.",
        "أخذ ما ليس لك من مال الجماعة يفسد عمل الجميع لا عملك وحدك.",
      ],
      think:
        "اختار هذا النبيّ أن يخرج معه من ليس قلبه معلّقًا بشيء آخر. فما الذي يشغل قلبك أنت وأنت تذاكر أو تصلّي؟ وكيف تضعه جانبًا؟",
      tryToday:
        "افعل اليوم شيئًا واحدًا بقلبٍ حاضر: ضع كل ما يشغلك بعيدًا عنك، ثم ابدأ فيه.",
    },
  },
  {
    chapter: "prophets", slug: "dawud",
    en: {
      title: "Prophet Dawud and the Soft Iron",
      hook:
        "What is the strangest sound you have ever heard? In today's story there was a man whose praise of Allah was joined by the mountains, and the birds were gathered to repeat after him. And through all of that he worked with his hands and ate from what his hands made.",
      events:
        "Allah gave him remarkable things. First, his voice: {Indeed, We subjected the mountains to exalt Allah with him in the evening and after sunrise, and the birds, gathered, all with him repeating praises.} Second: {And We made pliable for him iron} — iron softened in his hand the way clay softens in yours — and He told him: {Make full coats of mail and calculate precisely the links.} Third, wisdom and decisive speech: the ability to judge between people and get it right.",
      lesson:
        "The best food you eat is what your own hands made, even if the whole world is in your hands.",
      next:
        "Dawud could mold iron. But his son was given a kingdom like no other; he could talk to animals and control the wind! Let's meet Prophet Sulaiman!",
      quranProse:
        "Allah says: {And We certainly gave David from Us bounty. [We said], 'O mountains, repeat [Our] praises with him, and the birds [as well].' And We made pliable for him iron.}",
      challenge: {
        question: "What did the mountains and birds do with Dawud?",
        options: ["Slept", "Glorified Allah with him", "Disappeared"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🎵",
        badge: "A voice that remembers Allah",
        keepsake: "A ring of iron",
        note: "A reminder that Allah puts blessing in work done for His sake.",
      },
      arc: {
        idea: "A young man who beat a tyrant with a stone and then became a king — and the most famous thing about his reign is that he worked with his hands.",
        setting:
          "Dawud's story began when he was a young man in Talut's army, with nobody expecting anything of him. He killed Jalut, {and Allah gave him the kingship and wisdom and taught him from that which He willed.} He became a prophet and a king at the same time, which few people have ever combined. Allah revealed the Zabur to him, and his voice in reciting it was among the most beautiful of any man's.",
        keyMoment:
          "Now the question the story turns on: a man with a kingdom in his hand, receiving revelation, with iron softening between his fingers — why would he tire himself making coats of mail at all? The answer is in the Prophet's words: \"No one has ever eaten better food than what he eats from the work of his own hands, and the prophet of Allah Dawud used to eat from the work of his hands.\" He ruled the land, and ate from what his own hands made. That is the whole story in one line.",
        resolution:
          "And with all that, he worshipped in the finest way. The Prophet said: \"The most beloved prayer to Allah is the prayer of Dawud, and the most beloved fasting to Allah is the fasting of Dawud. He would sleep half the night, stand a third of it, and sleep a sixth; and he would fast one day and not the next.\" Allah said of him: {And remember Our servant Dawud, a man of strength; indeed, he was one repeatedly turning back to Allah.} A man of strength — and his strength was in his worship and his work together, not in his army.",
        word: { term: "Full coats of mail", meaning: "Long, wide armour that covers and protects the one wearing it." },
        lessons: [
          "Work with your hands, and never look down on useful work however simple.",
          "Real strength is strength in obedience, not in authority.",
          "The deed Allah loves most is the steadiest one, even if it is small; Dawud fasted every other day all his life.",
        ],
        think:
          "Dawud could have taken whatever he wished from the treasury, and chose instead to make things and eat from what he made. Why do you think that was? What is the difference between something you take and something you make?",
        tryToday:
          "Make one thing with your hands today — however small — and then use it yourself or give it to someone.",
      },
    },
    image: "/stories/prophets/dawud.jpg",
    title: "قصة سيدنا داود",
    surahName: "",
    hook:
      "ما أغرب صوت سمعتَه في حياتك؟ في قصة اليوم رجلٌ كان إذا سبّح الله سبّحت الجبال معه، وجُمعت له الطير فردّدت وراءه. وكان مع ذلك كله يعمل بيده ويأكل ممّا تصنعه يداه.",
    events:
      "وآتاه الله أشياء عجيبة. أوّلها صوته: ﴿إِنَّا سَخَّرْنَا الْجِبَالَ مَعَهُ يُسَبِّحْنَ بِالْعَشِيِّ وَالْإِشْرَاقِ * وَالطَّيْرَ مَحْشُورَةً كُلٌّ لَّهُ أَوَّابٌ﴾. وثانيها: ﴿وَأَلَنَّا لَهُ الْحَدِيدَ﴾ — لان الحديد في يده كما يلين الطين في يدك، وقال له: ﴿أَنِ اعْمَلْ سَابِغَاتٍ وَقَدِّرْ فِي السَّرْدِ﴾ — أي اصنع الدروع الواسعة وأحكِم نسجها حلقةً حلقة. وثالثها الحكمة وفصل الخطاب، أي أن يقضي بين الناس فيصيب.",
    quranProse: "يقول الله تعالى يصف معجزاته: {يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ}. (أوِّبي معه يعني سبِّحي معه).",
    lesson:
      "أطيب ما تأكله ما عملته يدك، ولو كانت الدنيا كلها في يدك.",
    next: "سيدنا داود كان ملكاً عظيماً، لكنه ورّث الملك لابن سيطلب من الله مُلكاً لن يحصل عليه أحد من بعده أبداً! ملك يتحكم في الريح، والجن، ويفهم لغة الطيور! إنه سيدنا سليمان.",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، البقرة: 251 وص: 17-26 والأنبياء: 79-80 وسبأ: 10-11", en: "The Quran, Al-Baqarah: 251, Sad: 17-26, Al-Anbiya: 79-80, Saba: 10-11" },
      note: { ar: "الملك والزبور وتسبيح الجبال والطير وإلانة الحديد، كله بنص الآيات.", en: "The kingship, the Zabur, the mountains and birds glorifying with him, and the softening of iron are all in the verses." },
    },
    challenge: {
      question: "ماذا كان يفعل الجبال والطير مع داود؟",
      options: ["تنام", "تسبّح معه", "تختفي"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🎵",
      badge: "صوتٌ يذكر الله",
      keepsake: "حلقة من حديد",
      note: "تذكّرك أن الله يجعل في العمل بركة حين يكون لله.",
    },
    arc: {
      idea: "فتىً هزم جبّارًا بحجر ثم صار ملكًا — وأشهر ما ذُكر عن مُلكه أنه كان يصنع بيده.",
      setting:
        "بدأت قصة داود عليه السلام وهو فتى صغير في جيش طالوت، لا ينتظر منه أحد شيئًا. فقتل جالوت، ﴿وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ﴾. فصار نبيًّا وملكًا في وقت واحد، وهذا لم يجتمع لكثير من الناس. وأنزل الله عليه الزَّبور، وكان من أحسن الناس صوتًا بالقراءة.",
      keyMoment:
        "والآن السؤال الذي تدور عليه القصة: رجلٌ في يده مُلك، ويوحى إليه، والحديد يلين بين أصابعه — فلماذا يتعب نفسه في صناعة الدروع أصلًا؟ الجواب في حديث النبي ﷺ: «ما أكل أحدٌ طعامًا قطّ خيرًا من أن يأكل من عمل يده، وإنّ نبيّ الله داود عليه السلام كان يأكل من عمل يده». ملَك الأرض، وأكل ممّا صنعته يداه. وهذه هي القصة كلها في سطر.",
      resolution:
        "وكان مع ذلك كثير العبادة على أحسن وجه. قال النبي ﷺ: «أحبّ الصلاة إلى الله صلاة داود، وأحبّ الصيام إلى الله صيام داود؛ كان ينام نصف الليل ويقوم ثلثه وينام سدسه، وكان يصوم يومًا ويفطر يومًا». وقال الله عنه: ﴿وَاذْكُرْ عَبْدَنَا دَاوُودَ ذَا الْأَيْدِ إِنَّهُ أَوَّابٌ﴾ — ذا الأيد، أي صاحب القوّة. وكانت قوّته في عبادته وفي عمله جميعًا، لا في جيشه.",
      word: { term: "سَابِغَات", meaning: "الدروع الواسعة الطويلة التي تغطّي لابسها وتقيه." },
      lessons: [
        "اعمل بيدك، ولا تستصغر عملًا نافعًا مهما كان بسيطًا.",
        "القوّة الحقيقية قوّةٌ في الطاعة، لا في السلطان.",
        "أحبّ العمل إلى الله أدومه وإن قلّ؛ صام داود يومًا وأفطر يومًا طول عمره.",
      ],
      think:
        "كان داود يستطيع أن يأخذ ما شاء من بيت المال، فاختار أن يصنع بيده ويأكل من صنعه. لماذا في رأيك؟ وما الفرق بين شيء تأخذه وشيء تصنعه أنت؟",
      tryToday:
        "اصنع اليوم شيئًا بيدك — ولو كان صغيرًا — ثم استعمله أنت أو أعطه لأحد.",
    },
  },
  {
    chapter: "prophets", slug: "sulaiman",
    en: {
      title: "Prophet Sulaiman's Great Kingdom",
      hook:
        "If Allah said to you: ask for whatever you want — what would you ask for? In today's story a man was given exactly that, and asked for something extraordinary: a kingdom that would belong to no one after him, ever. Why ask for that in particular? And what did he do with it once he had it?",
      events:
        "Allah gave him what he asked and more. He made the wind serve him: {its morning course a month's journey and its afternoon course a month's journey.} He made the jinn work before him, making {elevated chambers, statues, bowls like reservoirs, and stationary kettles.} He taught him the speech of birds, so he understood what the birds and the ants said. And an army was gathered for him of jinn, men and birds, {and they were held in order} — the front held back for the rear because of how many they were.",
      lesson:
        "A blessing is a test; the question is not how much you have, but what you do with what you have.",
      next:
        "Sulaiman had the greatest kingdom. But our next prophet didn't ask for a kingdom; he just asked for a child when he was very, very old. Did his prayer come true? Let's meet Prophet Zakariya!",
      quranProse:
        "Allah says: {He said, 'My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower.'}",
      challenge: {
        question: "What did Sulaiman ask his Lord for?",
        options: ["A lot of money", "A kingdom no one after him would have", "A long life"],
        correctAnswer: 1,
      },
      reward: {
        icon: "👑",
        badge: "Thankful for the gift",
        keepsake: "The king's ring",
        note: "A reminder that the greatest kingdom is the one whose owner gives thanks for it.",
      },
      arc: {
        idea: "A king who asked for a kingdom no one after him would have, and then stood thanking Allah because he had understood an ant.",
        setting:
          "Sulaiman inherited prophethood and kingship from his father Dawud. Allah said of him a line that explains everything that follows: {An excellent servant; indeed, he was one repeatedly turning back to Allah.} Among the first things he did in his reign was pray: {My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower.} Notice the order of the prayer: he began with forgiveness before he asked for the kingdom.",
        keyMoment:
          "And with all of that, look at what he did when he heard a small ant warning her people about him and his soldiers. He did not take offence and he was not arrogant. {So he smiled, amused at her speech, and said, My Lord, enable me to be grateful for Your favour.} Elsewhere, when the throne of the queen of Saba was brought to him in the blink of an eye, he said: {This is from the favour of my Lord to test me whether I will be grateful or ungrateful.} This is a test for me. The man who owned what no one else had seen every blessing as an exam, not a prize.",
        resolution:
          "At the end of his life he died leaning on his staff, and the jinn kept working, thinking he was still standing and watching them — until a termite, a small creature that eats wood, ate through his staff and he fell. {And when he fell, it became clear to the jinn that if they had known the unseen, they would not have remained in humiliating punishment.} The greatest kingdom ever given to a human being was finally revealed by a small creature eating a stick.",
        word: { term: "Staff", meaning: "The walking stick a person leans on and steadies himself with." },
        lessons: [
          "Begin your prayer with forgiveness, as Sulaiman did before asking for a kingdom.",
          "With every blessing, say: this is from the favour of my Lord.",
          "Never look down on something small; Sulaiman listened to an ant, and a termite brought down his staff.",
        ],
        think:
          "Sulaiman said of a blessing: \"to test me whether I will be grateful or ungrateful.\" Pick one blessing you have and ask yourself: how do I thank Allah for it in action, not in words?",
        tryToday:
          "Thank someone who helped you today, out loud and to their face: may Allah reward you — that really helped me.",
      },
    },
    image: "/stories/prophets/sulaiman.jpg",
    title: "قصة سيدنا سليمان",
    surahName: "",
    hook:
      "لو قال لك الله: اطلب ما شئت — فماذا تطلب؟ في قصة اليوم رجلٌ حدث له هذا، فطلب شيئًا عجيبًا: أن يؤتيه الله مُلكًا لا يكون لأحد من بعده أبدًا. فلماذا طلب هذا بالذات؟ وماذا فعل به لمّا أُعطيه؟",
    events:
      "فأعطاه الله ما سأل وزاده. سخّر له الريح: ﴿غُدُوُّهَا شَهْرٌ وَرَوَاحُهَا شَهْرٌ﴾ — تسير به في أوّل النهار مسيرة شهر، وفي آخره مسيرة شهر. وسخّر له الجنّ يعملون بين يديه ﴿مَحَارِيبَ وَتَمَاثِيلَ وَجِفَانٍ كَالْجَوَابِ وَقُدُورٍ رَّاسِيَاتٍ﴾. وعلّمه منطق الطير، فكان يفهم ما تقوله الطير والنمل. وجُمع له جندٌ من الجنّ والإنس والطير ﴿فَهُمْ يُوزَعُونَ﴾ — أي يُحبس أوّلهم على آخرهم من كثرتهم حتى ينتظموا.",
    quranProse: "يقول الله تعالى يخبرنا عن دعاء سيدنا سليمان: {قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ}.",
    lesson:
      "النعمة اختبار؛ فالسؤال ليس كم عندك، بل ماذا تصنع بما عندك.",
    next: "سيدنا سليمان كان ملكاً غنياً وقوياً. لكن ماذا عن رجل عجوز جداً، كان فقيراً وليس لديه أبناء، ويدعو الله دائماً في صلاته أن يرزقه بطفل؟ هل سيستجيب الله له بعد أن أصبح شعره أبيض؟ تعالوا نعرف قصة سيدنا زكريا وابنه يحيى.",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النمل: 15-44 وسبأ: 12-14 وص: 30-40", en: "The Quran, Surah An-Naml: 15-44, Saba: 12-14, Sad: 30-40" },
      note: { ar: "الملك وتسخير الريح والجن ومنطق الطير وخبر بلقيس، كله بنص الآيات.", en: "The kingdom, the wind and the jinn made subject to him, the speech of birds and the account of the queen are all in the verses." },
    },
    challenge: {
      question: "ماذا طلب سليمان من ربه؟",
      options: ["مالاً كثيراً", "ملكاً لا ينبغي لأحد من بعده", "عمراً طويلاً"],
      correctAnswer: 1,
    },
    reward: {
      icon: "👑",
      badge: "شكرٌ على النعمة",
      keepsake: "خاتم الملك",
      note: "يذكّرك أن أعظم الملك ما شكر صاحبه عليه.",
    },
    arc: {
      idea: "ملكٌ سأل الله مُلكًا لا يكون لأحد بعده، ثم وقف يشكر لأنه فهم كلام نملة.",
      setting:
        "ورث سليمان عليه السلام النبوّة والمُلك عن أبيه داود. وقال الله عنه كلمةً تفسّر كلّ ما جاء بعدها: ﴿نِعْمَ الْعَبْدُ إِنَّهُ أَوَّابٌ﴾. وكان من أوّل ما فعل في مُلكه أن دعا: ﴿رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّنْ بَعْدِي إِنَّكَ أَنتَ الْوَهَّابُ﴾. وانتبه إلى ترتيب الدعاء: بدأ بالمغفرة قبل أن يطلب المُلك.",
      keyMoment:
        "ومع هذا كله، انظر ماذا فعل حين سمع نملةً صغيرة تحذّر قومها منه ومن جنوده. لم يغضب ولم يتكبّر. ﴿فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ﴾. وفي موضع آخر، لمّا جيء له بعرش ملكة سبأ في طرفة عين قال: ﴿هَٰذَا مِن فَضْلِ رَبِّي لِيَبْلُوَنِي أَأَشْكُرُ أَمْ أَكْفُرُ﴾ — أي: هذا اختبار لي. الرجل الذي ملك ما لم يملكه أحد، كان يرى كل نعمة امتحانًا لا جائزة.",
      resolution:
        "وفي آخر أمره مات وهو متّكئ على عصاه، فبقي الجنّ يعملون وهم يحسبونه قائمًا يراهم، حتى أكلت الأَرَضة — وهي دويبة صغيرة تأكل الخشب — عصاه فسقط. ﴿فَلَمَّا خَرَّ تَبَيَّنَتِ الْجِنُّ أَن لَّوْ كَانُوا يَعْلَمُونَ الْغَيْبَ مَا لَبِثُوا فِي الْعَذَابِ الْمُهِينِ﴾. أعظم مُلك أُعطيه بشر، كُشف أمره في النهاية بدويبة صغيرة تأكل عصا.",
      word: { term: "مِنسَأَة", meaning: "العصا التي يتوكّأ عليها الماشي ويستند إليها." },
      lessons: [
        "ابدأ دعاءك بالمغفرة، كما بدأ سليمان قبل أن يسأل المُلك.",
        "قل عند كل نعمة: هذا من فضل ربي.",
        "لا تحتقر صغيرًا؛ فقد أصغى سليمان لنملة، وسقطت عصاه بدويبة.",
      ],
      think:
        "قال سليمان عن النعمة: «ليبلوني أأشكر أم أكفر». اختر نعمةً واحدة عندك، واسأل نفسك: كيف أشكرها عملًا لا كلامًا؟",
      tryToday:
        "اشكر اليوم من أحسن إليك بكلمة صريحة تقولها له في وجهه: جزاك الله خيرًا، لقد نفعتني فعلًا.",
    },
  },
  {
    chapter: "prophets", slug: "zakariya-and-yahya",
    en: {
      title: "Prophet Zakariya and the Miracle Baby",
      hook:
        "Have you ever prayed for something you quietly believed would never happen? In today's story, a man had grown old until his hair was white, and his wife could not bear children, and then he prayed. And he did not raise his voice — he prayed secretly, between himself and his Lord.",
      events:
        "{There, Zakariya called upon his Lord} — there, at that very moment, as he watched provision arrive from no visible cause. {When he called to his Lord a private call. He said, My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy.} Look at how he described his state: my bones have weakened, my head has filled with white. And then a line of remarkable manners: never have I been unhappy in my supplication to You — I have been asking You for a long time, and You have never once turned me away.",
      lesson:
        "Never think a prayer too small, and never think anything too much for Allah.",
      next:
        "Zakariya had a miracle son in his old age. But the next miracle is even more amazing: a baby born without a father, who spoke from his cradle! It's Prophet Isa!",
      quranProse:
        "Allah says: {He said, 'My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy.'}",
      challenge: {
        question: "What good news did Allah give Zakariyya in his old age?",
        options: ["Much wealth", "A boy named Yahya", "A new home"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🕊️",
        badge: "I call, and never despair",
        keepsake: "A small prayer niche",
        note: "A reminder that a supplication is never wasted, even if the answer takes years.",
      },
      arc: {
        idea: "An old man who asked his Lord privately for a son, and Allah named the boy with a name no one had carried before.",
        setting:
          "Zakariya, peace be upon him, was an elderly prophet, and he was the one who cared for Maryam in the sanctuary. Whenever he entered upon her he found provision with her, and he would ask: {From where is this to you?} She would say: {It is from Allah. Indeed, Allah provides for whom He wills without account.} So every day he saw with his own eyes that Allah gives outside the causes people know. And in that very place, it occurred to him to ask.",
        keyMoment:
          "The answer came faster than anyone would imagine, and it contained something he had not asked for at all: {O Zakariya, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before this name.} He was not told \"you will be given a son.\" He was told: his name is Yahya — Allah named him before he existed, with a name no one had carried before. Zakariya said in astonishment: {My Lord, how will I have a boy when my wife has been barren and I have reached extreme old age?} He was told: {Thus it will be; your Lord says, it is easy for Me.} Easy. One word ended every calculation.",
        resolution:
          "And Yahya was born. And what did Allah say of him? {O Yahya, take the Scripture with determination. And We gave him judgement while yet a boy} — understanding and wisdom while he was still a child. Then: {And affection from Us and purity, and he was fearing of Allah, and dutiful to his parents, and he was not a disobedient tyrant.} Merciful, pure, God-fearing, good to his parents, neither arrogant nor disobedient. The child his father had asked for quietly in the sanctuary became all of that.",
        word: { term: "Extreme old age", meaning: "Reaching an age where the bones have dried and the body has weakened." },
        lessons: [
          "Pray to Allah privately; the supplication He loves most is the quiet one.",
          "What causes cannot manage, your Lord is not unable to do; \"it is easy for Me.\"",
          "Take what you learn with determination; Yahya was told: take the Scripture with determination.",
        ],
        think:
          "Zakariya prayed for something that looked impossible, and was not embarrassed to ask. What is something you wish for and have never prayed for, because you think it is out of reach?",
        tryToday:
          "Make one prayer today in private where no one can hear you, and ask for something big — something you would be shy to say aloud.",
      },
    },
    image: "/stories/prophets/zakariya-and-yahya.jpg",
    title: "قصة سيدنا زكريا وابنه يحيى",
    surahName: "",
    hook:
      "هل دعوتَ يومًا بشيء تظنّ في قلبك أنه لن يحدث أبدًا؟ في قصة اليوم رجلٌ كبر حتى اشتعل رأسه شيبًا، وامرأته لا تلد، ثم دعا. ولم يرفع صوته بالدعاء — دعا سرًّا، بينه وبين ربه.",
    events:
      "﴿هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُ﴾ — هنالك، أي في تلك اللحظة بالذات، وهو يرى الرزق يأتي من حيث لا سبب. ﴿إِذْ نَادَىٰ رَبَّهُ نِدَاءً خَفِيًّا * قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا﴾. انظر كيف وصف حاله: عظمي ضعف، ورأسي اشتعل شيبًا. ثم قال كلمة فيها أدب عجيب: ولم أكن بدعائك ربّ شقيًّا — أي أنا أدعوك من زمن طويل، وما رددتني مرّة واحدة.",
    quranProse: "يقول الله تعالى آمراً سيدنا يحيى وهو طفل: {يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا}.",
    lesson:
      "لا تستصغر دعوة، ولا تستكثر على الله شيئًا.",
    next: "سيدنا يحيى كان طفلاً ذكياً.. ولكن ماذا لو أخبرتكم عن طفل آخر، وُلد من غير أب، وتكلم وهو لا يزال رضيعاً في المهد (السرير الصغير) ليحمي أمه! هذه من أعظم المعجزات! سنتعرف عليها في قصة سيدنا عيسى!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة مريم: 2-15 وآل عمران: 38-41", en: "The Quran, Surah Maryam: 2-15 and Aal-Imran: 38-41" },
      note: { ar: "الدعاء والبشارة بيحيى وصفاته، كله بنص الآيات.", en: "The supplication, the glad tidings of Yahya and his qualities are all in the verses." },
    },
    challenge: {
      question: "بماذا بشّر الله زكريا وهو كبير في السن؟",
      options: ["بمال كثير", "بغلام اسمه يحيى", "ببيت جديد"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🕊️",
      badge: "أدعو ولا أيأس",
      keepsake: "محراب صغير",
      note: "يذكّرك أن الدعاء لا يُردّ، ولو تأخّر الجواب سنين.",
    },
    arc: {
      idea: "شيخٌ كبير دعا ربّه سرًّا أن يرزقه ولدًا، فسمّاه الله باسم لم يُسمَّ به أحد قبله.",
      setting:
        "كان زكريا عليه السلام نبيًّا كبير السنّ، وكان هو الذي يكفل مريم عليها السلام في المحراب. وكان كلّما دخل عليها وجد عندها رزقًا، فيسألها: ﴿أَنَّىٰ لَكِ هَٰذَا﴾؟ فتقول: ﴿هُوَ مِنْ عِندِ اللَّهِ إِنَّ اللَّهَ يَرْزُقُ مَن يَشَاءُ بِغَيْرِ حِسَابٍ﴾. فكان يرى بعينه كل يوم أن الله يعطي من غير الأسباب التي يعرفها الناس. وفي ذلك الموضع بالذات خطر له أن يسأل.",
      keyMoment:
        "فجاء الجواب أسرع ممّا يتخيّل أحد، وفيه شيء لم يطلبه أصلًا: ﴿يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ لَمْ نَجْعَل لَّهُ مِن قَبْلُ سَمِيًّا﴾. لم يقل له: ستُرزق ولدًا. قال: اسمه يحيى — سمّاه الله قبل أن يُخلق، باسم لم يُسمَّ به أحد قبله. فقال زكريا متعجّبًا: ﴿أَنَّىٰ يَكُونُ لِي غُلَامٌ وَكَانَتِ امْرَأَتِي عَاقِرًا وَقَدْ بَلَغْتُ مِنَ الْكِبَرِ عِتِيًّا﴾؟ فقيل له: ﴿كَذَٰلِكَ قَالَ رَبُّكَ هُوَ عَلَيَّ هَيِّنٌ﴾. هيّن. كلمة واحدة أنهت كل الأسباب.",
      resolution:
        "ووُلد يحيى. فماذا قال الله عنه؟ ﴿يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا﴾ — آتاه الفهم والحكمة وهو ما يزال صبيًّا. ثم: ﴿وَحَنَانًا مِّن لَّدُنَّا وَزَكَاةً وَكَانَ تَقِيًّا * وَبَرًّا بِوَالِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا﴾ — رحيمًا، طاهرًا، تقيًّا، بارًّا بوالديه، ليس متكبّرًا ولا عاصيًا. الولد الذي دعا به أبوه سرًّا في المحراب، صار هذا كلّه.",
      word: { term: "عِتِيًّا", meaning: "أن يبلغ الإنسان من الكبر مبلغًا ييبس فيه عظمه ويضعف." },
      lessons: [
        "ادعُ الله سرًّا؛ فأحبّ الدعاء إليه ما كان خفيًّا.",
        "ما عجزت عنه الأسباب لا يعجز عنه ربّك؛ ﴿هو عليّ هيّن﴾.",
        "خذ ما تتعلّمه بقوّة وجدّ؛ فقد قيل ليحيى: ﴿خذ الكتاب بقوّة﴾.",
      ],
      think:
        "دعا زكريا بشيء يبدو مستحيلًا، ولم يستحِ أن يطلبه. فما الشيء الذي تتمنّاه ولم تدعُ الله به لأنك تظنّه بعيدًا عنك؟",
      tryToday:
        "ادعُ اليوم دعوة واحدة سرًّا لا يسمعك فيها أحد، واطلب فيها شيئًا كبيرًا تستحي أن تقوله لأحد.",
    },
  },
  {
    chapter: "prophets", slug: "isa",
    en: {
      title: "Prophet Isa, the Miracle Child",
      hook:
        "The first word he spoke in his life was not \"mother.\" It was a defence of his mother, in front of people who had come to accuse her. He was a few days old, still in the cradle.",
      events:
        "Maryam came back to her people carrying him: {Then she brought him to her people, carrying him. They said, O Maryam, you have certainly done a thing unprecedented.} Allah had already commanded her not to speak: {And say, Indeed, I have vowed to the Most Merciful abstention, so I will not speak today to any man.} So she did not defend herself with a single word, did not explain and did not argue. {So she pointed to him.} She pointed at the baby. And they said in disbelief: {How can we speak to one who is in the cradle a child?}",
      lesson:
        "The noblest thing a human being can be called is a servant of Allah.",
      next:
        "Isa brought great miracles. But who is the final prophet? The one who brought a message for all people until the end of time? It's Prophet Muhammad (pbuh)!",
      quranProse:
        "Allah says: {[Jesus] said, 'Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.'}",
      challenge: {
        question: "What did Isa do while still in the cradle?",
        options: ["Only cried", "Spoke, and defended his mother", "Slept"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🕊️",
        badge: "A sign among Allah's signs",
        keepsake: "A palm frond",
        note: "A reminder that Allah is able to do all things, and the innocent are cleared.",
      },
      arc: {
        idea: "A prophet who spoke in the cradle to defend his mother, and the first thing he said was: I am the servant of Allah.",
        setting:
          "Isa, peace be upon him, was created without a father, by a word from Allah: {Indeed, the example of Isa to Allah is like that of Adam. He created him from dust; then He said to him, Be, and he was.} Maryam carried him — she who had grown up in the sanctuary and was known for her purity. Then the pains came and she gave birth alone beneath a palm tree, and said, knowing exactly what people would say: {Oh, I wish I had died before this and was in oblivion, forgotten.}",
        keyMoment:
          "And the baby spoke. {He said, Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.} Notice the first words of his life: \"I am the servant of Allah.\" Before saying he was a prophet, he said he was a servant. And that is precisely the word that those who went astray after him went astray over — raising him above the station Allah placed him in, while he had begun his life by defining it himself. Then he went on: {And He has made me blessed wherever I am and has enjoined upon me prayer and charity as long as I remain alive. And dutiful to my mother, and He has not made me a wretched tyrant.}",
        resolution:
          "When he grew, Allah supported him with great signs: he would form from clay the shape of a bird and breathe into it and it would become a bird, and he would heal the blind and the leper, and revive the dead — and with every one of them the Quran says {by permission of Allah}, so that no power is attributed to anyone but its owner. Then those who disbelieved plotted against him and sought to kill him, and Allah said: {And they did not kill him, nor did they crucify him; but it was made to appear so to them}, {Rather, Allah raised him to Himself. And ever is Allah Exalted in Might and Wise.} They never reached him.",
        word: { term: "A thing unprecedented", meaning: "Something grave and outrageous, never seen before — the accusation they threw at Maryam." },
        lessons: [
          "Be good to your mother; the first thing Isa mentioned after his Lord was that he was dutiful to her.",
          "Of everything you can do, say: by the permission of Allah.",
          "Do not raise anyone above the station Allah placed them in, not even a prophet.",
        ],
        think:
          "Maryam stayed silent and did not defend herself, and the defence came from where no one expected. Have you ever borne an unfair accusation patiently? What happened afterwards?",
        tryToday:
          "Do one thing today that makes your mother happy — unasked, and without waiting to be thanked.",
      },
    },
    image: "/stories/prophets/isa.jpg",
    title: "قصة سيدنا عيسى ابن مريم",
    surahName: "",
    hook:
      "أوّل كلمة قالها في حياته لم تكن «أمّي». كانت دفاعًا عن أمّه أمام قوم جاءوا يتّهمونها. وكان عمره أيامًا معدودة، وهو في المهد.",
    events:
      "ثم رجعت مريم إلى قومها تحمله: ﴿فَأَتَتْ بِهِ قَوْمَهَا تَحْمِلُهُ قَالُوا يَا مَرْيَمُ لَقَدْ جِئْتِ شَيْئًا فَرِيًّا﴾. وكان الله قد أمرها ألّا تتكلّم: ﴿فَقُولِي إِنِّي نَذَرْتُ لِلرَّحْمَٰنِ صَوْمًا فَلَنْ أُكَلِّمَ الْيَوْمَ إِنسِيًّا﴾. فلم تدافع عن نفسها بكلمة واحدة، ولم تشرح ولم تجادل. ﴿فَأَشَارَتْ إِلَيْهِ﴾ — أشارت إلى الطفل. فقالوا مستنكرين: ﴿كَيْفَ نُكَلِّمُ مَن كَانَ فِي الْمَهْدِ صَبِيًّا﴾؟",
    quranProse: "يقول الله تعالى يصف كلمات سيدنا عيسى وهو رضيع: {قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا}.",
    lesson:
      "أشرف ما يُوصف به الإنسان أنه عبدٌ لله.",
    next: "سيدنا عيسى بَشَّر قومه بأن هناك نبياً عظيماً سيأتي من بعده ليكون آخر الأنبياء للعالمين. فمن هو هذا النبي الخاتم؟ إنه حبيبنا ونبينا محمد صلى الله عليه وسلم!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة مريم: 16-36 وآل عمران: 42-59 والمائدة: 110-118", en: "The Quran, Surah Maryam: 16-36, Aal-Imran: 42-59, Al-Ma'idah: 110-118" },
      note: { ar: "الولادة والكلام في المهد والمعجزات ورفعه، كله بنص الآيات.", en: "The birth, the speaking in the cradle, the miracles and his being raised are all in the verses." },
    },
    challenge: {
      question: "ماذا فعل عيسى وهو في المهد؟",
      options: ["بكى فقط", "تكلّم ودافع عن أمه", "نام"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🕊️",
      badge: "آية من آيات الله",
      keepsake: "سعفة نخل",
      note: "تذكّرك أن الله على كل شيء قدير، وأن براءة الصادق تظهر.",
    },
    arc: {
      idea: "نبيٌّ تكلّم في المهد ليدافع عن أمّه، وأوّل ما قال: إني عبد الله.",
      setting:
        "خُلق عيسى عليه السلام من غير أب، بكلمة من الله: ﴿إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ﴾. وحملت به مريم، وهي التي نشأت في المحراب وعُرفت بالطهر. ثم جاءها المخاض فولدت وحدها تحت نخلة، وقالت من شدّة ما تعلم أن الناس سيقولونه: ﴿يَا لَيْتَنِي مِتُّ قَبْلَ هَٰذَا وَكُنتُ نَسْيًا مَّنسِيًّا﴾.",
      keyMoment:
        "فتكلّم الطفل. ﴿قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا﴾. وانتبه إلى أوّل كلمة نطق بها في حياته: «إني عبد الله». قبل أن يقول إنه نبيّ، قال إنه عبد. وهذه الكلمة بالذات هي التي ضلّ فيها من ضلّ من بعده، فرفعوه فوق منزلته التي وضعه الله فيها، وهو قد بدأ حياته بأن حدّدها بنفسه. ثم تابع: ﴿وَجَعَلَنِي مُبَارَكًا أَيْنَ مَا كُنتُ وَأَوْصَانِي بِالصَّلَاةِ وَالزَّكَاةِ مَا دُمْتُ حَيًّا * وَبَرًّا بِوَالِدَتِي وَلَمْ يَجْعَلْنِي جَبَّارًا شَقِيًّا﴾.",
      resolution:
        "ولمّا كبر أيّده الله بآيات عظيمة: يخلق من الطين كهيئة الطير فينفخ فيه فيكون طيرًا، ويبرئ الأكمه والأبرص، ويحيي الموتى — وفي كل واحدة منها يقول القرآن: ﴿بِإِذْنِ اللَّهِ﴾، فلا تُنسب قدرة إلى غير صاحبها. ثم مكر به الذين كفروا وأرادوا قتله، فقال الله: ﴿وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ﴾، ﴿بَل رَّفَعَهُ اللَّهُ إِلَيْهِ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا﴾. لم يصلوا إليه.",
      word: { term: "فَرِيًّا", meaning: "أمرًا عظيمًا منكَرًا لم يُعهد مثله — وهي التهمة التي رمَوا بها مريم." },
      lessons: [
        "أحسِن إلى أمّك؛ فأوّل ما ذكره عيسى بعد ربّه أنه بارٌّ بوالدته.",
        "قل عن كل ما تقدر عليه: بإذن الله.",
        "لا ترفع أحدًا فوق المنزلة التي وضعه الله فيها، ولو كان نبيًّا.",
      ],
      think:
        "سكتت مريم ولم تدافع عن نفسها، فجاء الدفاع من حيث لا يتوقّعه أحد. هل صبرتَ يومًا على تهمة ظالمة؟ وماذا حدث بعدها؟",
      tryToday:
        "افعل اليوم شيئًا واحدًا يُفرح أمّك، من غير أن تطلب منك ومن غير أن تنتظر شكرًا.",
    },
  },
  {
    chapter: "prophets", slug: "muhammad",
    en: {
      title: "Prophet Muhammad, the Final Messenger",
      hook:
        "Every prophet in this chapter you read about after his story had ended, written down in a surah. But this story had the Quran coming down while it was happening: on the day of a battle, on a day of grief, on the day someone was wronged. What difference does that make?",
      events:
        "Here is what separates his story from those before it. The prophets of this chapter you read about once their accounts were complete. But with the Prophet, the Quran came down alongside the event itself as it happened. Verses came down on the day of Badr; verses after Uhud explaining to people what had happened and why; verses during the Confederates while Madinah was under siege; verses clearing someone wrongly accused; and verses containing a reproach of the Prophet himself: {He frowned and turned away, because the blind man came to him.} And he was the one who conveyed them to people.",
      lesson:
        "The truest proof that a message is genuine is that the one carrying it conveyed what was against him as fully as what was for him.",
      next:
        "And with Prophet Muhammad (pbuh), the golden chain of prophets is complete! We have learned so many lessons from their amazing lives. Are you ready for more adventures? Check out the other sections!",
      quranProse:
        "Allah says: {And We have not sent you, [O Muhammad], except as a mercy to the worlds.}",
      challenge: {
        question: "What was the Prophet Muhammad ﷺ called before prophethood?",
        options: ["The truthful, the trustworthy", "The king", "The poet"],
        correctAnswer: 0,
      },
      reward: {
        icon: "🌙",
        badge: "Trustworthy like my Prophet",
        keepsake: "A stone from the Ka'bah",
        note: "A reminder that people trust your character before they hear your words.",
      },
      arc: {
        idea: "A prophet whose account did not come down in one surah after it ended — it came down with him over twenty-three years.",
        setting:
          "Muhammad was born in Mecca in the Year of the Elephant, an orphan: his father died before he was born, and his mother died while he was small. He grew up among his people until they called him \"the truthful, the trustworthy,\" years before he was sent — and those same people denied him afterwards, not because they thought him a liar, but because what he brought was heavy on them. Then revelation came to him in the cave of Hira when he was forty: {Recite in the name of your Lord who created.}",
        keyMoment:
          "This is the moment to stop at for a long while. A man receives a book from his Lord, and in it is a reproach of himself — and he recites it to people exactly as it is, without cutting a letter. {And if he had made up about Us some sayings, We would have seized him by the right hand.} Had the book been his own, he would have removed what reproached him and added what would comfort and elevate him. Instead he delivered all of it: what was for him and what was against him. That alone is an answer to anyone who ever asked where this Quran came from.",
        resolution:
          "In twenty-three years the religion was completed, and near the end came: {This day I have perfected for you your religion and completed My favour upon you and have approved for you Islam as religion.} Then the Prophet died and left behind no gold, no silver and no palace. He left this Book, which you read today in the very same letters, unchanged; and he left a life whose details you will find in the Seerah section of this site, station by station and story by story, each with its source.",
        word: { term: "The truthful, the trustworthy", meaning: "The name his people knew him by before prophethood: true in what he says, and safe to leave anything with." },
        lessons: [
          "Be truthful until people know you for truth before you even speak.",
          "Do not hide what you are rightly criticised for, even when it is against you.",
          "The Quran in your hands is the same one that came down to him.",
        ],
        think:
          "The Prophet was known as \"the truthful, the trustworthy\" years before he was sent — and by his own people. What do your friends know you for today? And are you happy with it?",
        tryToday:
          "Open the Seerah section of this site today, read one story from it, and then tell it to someone at home.",
      },
    },
    image: "/stories/prophets/muhammad.jpg",
    title: "قصة سيدنا محمد (خاتم الأنبياء)",
    surahName: "",
    hook:
      "كلّ نبيّ في هذا الباب قرأتَ قصّته بعد أن انتهت، مكتوبةً في سورة. أمّا هذه القصة فقد كان القرآن ينزل فيها وهي تحدث: في يوم الحرب، وفي يوم الحزن، وفي اليوم الذي ظُلم فيه إنسان. فما الفرق الذي يصنعه ذلك؟",
    events:
      "وهنا يظهر الفرق بين قصّته وقصص من قبله. أنبياء هذا الباب قرأتَ أخبارهم بعد أن تمّت. أمّا القرآن مع النبي ﷺ فكان ينزل مع الحدث نفسه وهو يقع. نزلت آيات يوم بدر، وآيات بعد أُحُد تشرح للناس ما الذي جرى ولماذا، وآيات يوم الأحزاب والمدينة محاصرة، وآيات تبرّئ مظلومًا من تهمة قِيلت فيه، وآيات فيها عتابٌ للنبي ﷺ نفسه: ﴿عَبَسَ وَتَوَلَّىٰ * أَن جَاءَهُ الْأَعْمَىٰ﴾. وهو الذي كان يبلّغها للناس بنفسه.",
    quranProse: "يقول الله تعالى واصفاً رسالة نبينا الكريم: {وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ}. أي أن رسالته جاءت لتنشر الخير والسلام والرحمة لكل الناس.",
    lesson:
      "أصدق دليل على صدق الرسالة أن صاحبها بلّغ ما عليه كما بلّغ ما له.",
    next: "قصة نبينا محمد صلى الله عليه وسلم مليئة بالمغامرات، والدروس، والمواقف العظيمة التي لا تكفيها قصة واحدة! لذلك، جهزنا لكم يا أصدقائي قسماً جديداً كاااملاً وممتعاً جداً.. سنسافر فيه مع نبينا منذ نشأته وطفولته، ونحضر لحظة النبوة والدعوة، ونهاجر معه في رحلة الهجرة النبوية المثيرة، ونقف بجانبه في الغزوات، حتى وفاته صلى الله عليه وسلم. هل أنتم مستعدون للانطلاق إلى 'قسم السيرة النبوية'؟ هيا بنا!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم في مواضع، وكتب السيرة المعتمدة", en: "The Quran in several places, and the established Seerah literature" },
      note: { ar: "ما في القرآن من خبره — كالإسراء في سورة الإسراء وحادثة الفيل في سورة الفيل — بنص الآيات، وباقي تفاصيل السيرة من كتب السيرة المعتمدة. وقسم السيرة في الموقع يذكر مصدر كل قصة على حدة.", en: "What the Quran tells of him — the night journey in Surah Al-Isra, the elephant in Surah Al-Fil — is in the verses; the rest comes from the established Seerah literature. The Seerah section of this site cites a source for each story separately." },
    },
    challenge: {
      question: "بماذا كان يُلقّب النبي محمد ﷺ قبل البعثة؟",
      options: ["الصادق الأمين", "الملك", "الشاعر"],
      correctAnswer: 0,
    },
    reward: {
      icon: "🌙",
      badge: "أمينٌ مثل نبيّي",
      keepsake: "حجر من الكعبة",
      note: "يذكّرك أن الناس تثق بك قبل أن تسمع كلامك، من أخلاقك.",
    },
    arc: {
      idea: "نبيٌّ لم ينزل خبره في سورة واحدة بعد أن انتهى، بل نزل معه ثلاثًا وعشرين سنة.",
      setting:
        "وُلد محمد ﷺ في مكة عام الفيل، يتيمًا: مات أبوه قبل أن يُولد، وماتت أمّه وهو صغير. ونشأ بين قومه حتى صاروا يسمّونه «الصادق الأمين» قبل أن يُبعث بسنين — وهم أنفسهم الذين كذّبوه بعد ذلك، لا لأنهم يظنّونه كاذبًا، بل لأن ما جاء به كان ثقيلًا عليهم. ثم نزل عليه الوحي في غار حراء وهو ابن أربعين سنة: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾.",
      keyMoment:
        "وهذه هي اللحظة التي ينبغي أن تقف عندها طويلًا. رجلٌ يأتيه كتاب من ربّه، وفيه عتابٌ له هو، فيقرؤه على الناس كما هو ولا يحذف منه حرفًا. ﴿وَلَوْ تَقَوَّلَ عَلَيْنَا بَعْضَ الْأَقَاوِيلِ * لَأَخَذْنَا مِنْهُ بِالْيَمِينِ﴾. ولو كان الكتاب من عنده لحذف منه ما يعاتبه، ولزاد فيه ما يريحه ويرفعه. لكنه بلّغه كلّه: ما له وما عليه. وهذا وحده جوابٌ لمن سأل يومًا: من أين جاء هذا القرآن؟",
      resolution:
        "وفي ثلاث وعشرين سنة تمّ الدين، ونزل في آخرها: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾. ثم مات النبي ﷺ ولم يترك ذهبًا ولا فضّة ولا قصرًا؛ ترك هذا الكتاب الذي تقرؤه أنت اليوم بحروفه نفسها لم تتغيّر، وترك سيرةً تجد تفصيلها في قسم السيرة في هذا الموقع، محطّةً محطّة وقصّةً قصّة، مع مصدر كل واحدة منها.",
      word: { term: "الصادق الأمين", meaning: "اللقب الذي عرفه به قومه قبل النبوّة: الذي يصدق في قوله، ويُؤتمن على ما يُترك عنده." },
      lessons: [
        "اصدُق حتى يعرفك الناس بالصدق قبل أن تتكلّم.",
        "لا تخفِ ما يُعاتَب عليه وإن كان عليك أنت.",
        "القرآن الذي بين يديك هو نفسه الذي نزل عليه ﷺ.",
      ],
      think:
        "عُرف النبي ﷺ بـ«الصادق الأمين» قبل أن يُبعث بسنين، ومن قومه أنفسهم. فبماذا يعرفك أصحابك اليوم؟ وهل يرضيك ما يقولونه عنك؟",
      tryToday:
        "افتح اليوم قسم السيرة في هذا الموقع، واقرأ منه قصّة واحدة، ثم احكِها لأحد في بيتك.",
    },
  },
  {
    chapter: "animals", slug: "ant-of-solomon",
    en: {
      title: "The Caring Ant",
      hook:
        "What is the smallest creature you have ever heard speak? In today's story, an ant speaks. One ant — too small to be seen by anyone walking past, weighing almost nothing. And yet what she said is written in the Quran to this day, read by people thousands of years later. So what did she say?",
      events:
        "A small ant felt the ground shaking beneath her, looked up, and saw what was coming. Now think with me: what can an ant do against an army? She cannot stop it, or speak to it, or carry her home away. So she did the one thing she could: she called out to her people. She said: {O ants, enter your dwellings that you not be crushed by Sulaiman and his soldiers while they perceive not.} Notice her last words — \"while they perceive not.\" She did not accuse them. She did not say they were wicked and meant to harm. She said they cannot see us.",
      lesson:
        "The smallest of us can still help those around them with what they have, and the greatest of us is never too great to listen to the smallest.",
      next:
        "The ant was tiny but very caring. Our next animal is a beautiful bird with a crown of feathers on his head, who worked as a special messenger for the very same king. It's the Hoopoe!",
      quranProse:
        "Allah says: {An ant said, 'O ants, enter your dwellings that you not be crushed by Solomon and his soldiers while they perceive not.'}",
      challenge: {
        question: "What did the ant say to the other ants?",
        options: ["Run from the rain", "Enter your homes so Sulaiman and his soldiers do not crush you", "Build a new home"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐜",
        badge: "I look out for those around me",
        keepsake: "A grain of wheat",
        note: "A reminder that the smallest creature can teach the biggest lesson in caring for others.",
      },
      arc: {
        idea: "One ant saw danger coming and warned her people — and a king unlike any other heard her.",
        setting:
          "Sulaiman, peace be upon him, was both a prophet and a king. Allah gave him a kingdom given to no one after him: an army of people, jinn and birds, a wind that ran at his command, and an understanding of what birds and animals say. One day he set out with that whole army, until they came near a valley where ants lived. Ants live in small houses under the soil, invisible to anyone walking over them. And the army was coming.",
        keyMoment:
          "Here is the moment the whole story turns on. The great king, at the head of his army, heard the voice of an ant. He actually heard it. {So he smiled, amused at her speech.} He did not take offence that she had warned people against him. He did not say, \"and who is she to talk about me?\" He smiled. That smile is the mark of someone truly great: all the power is in his hands, and his heart is still wide enough for the smallest creature that fears him.",
        resolution:
          "Then Sulaiman did something you might not expect: he prayed. {My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents, and to do righteousness of which You approve.} In other words: my Lord, help me to thank You. The blessing he saw in that moment was not the army or the kingdom or the wind. It was that he had understood the words of an ant.",
        word: { term: "Crushed", meaning: "Stepped on and broken — and the ant said it of people who could not even see her." },
        lessons: [
          "If you see danger coming to those around you, warn them, even if you are the smallest there.",
          "Think well of people; the ant said \"they perceive not,\" not \"they mean to hurt us.\"",
          "The more you are given, the more you thank; Sulaiman met the blessing with a prayer, not with pride.",
        ],
        think:
          "The ant knew she could not stop an army, and she spoke anyway. Has there been a moment when you thought, \"I am too small to make any difference\"? What was the smallest thing you could have done then?",
        tryToday:
          "Find one small way to help someone today — a warning, a hand, a kind word. Do not wait until you are older.",
      },
    },
    title: "قصة نملة سليمان",
    surahName: "",
    image: "/stories/animals/ant-of-solomon.jpg",
    hook:
      "ما أصغر مخلوق سمعته يتكلّم؟ في قصة اليوم تتكلّم نملة. نملة واحدة، لا يراها الماشي وهو يمشي، ولا تزن شيئًا. ومع ذلك فإن كلامها مكتوب في القرآن إلى اليوم، يقرؤه الناس بعد آلاف السنين. فماذا قالت حتى يُحفظ كلامها كل هذا الزمن؟",
    events:
      "أحسّت نملة صغيرة بالأرض تهتزّ تحتها، فنظرت فرأت ما رأت. وفكّر معي: ماذا تستطيع نملة أن تفعل أمام جيش؟ لا تستطيع أن توقفه، ولا أن تتكلّم معه، ولا أن تحمل بيتها وتهرب به. ففعلت الشيء الوحيد الذي تقدر عليه: نادت على قومها. قالت: ﴿يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ﴾. وانتبه إلى آخر كلمة قالتها: «وهم لا يشعرون». لم تتّهمهم، ولم تقل إنهم أشرار يريدون أذيّتنا؛ قالت إنهم لا يروننا.",
    quranProse: "يقول الله تعالى في القرآن الكريم عن هذه النملة الذكية: {حَتَّى إِذَا أَتَوْا عَلَى وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ}. وهذا يعني أن النملة حذرت أصدقاءها ليختبئوا في بيوتهم.",
    lesson:
      "أصغرنا يستطيع أن ينفع من حوله بما يقدر عليه، وأعظمنا لا يكبُر عن أن يسمع الصغير.",
    next: "رأينا كيف فهم سيدنا سليمان لغة النملة الصغيرة.. لكن، هل تعرفون طائراً جميلاً كان يعمل كـ 'مستكشف' لسيدنا سليمان، وذهب في رحلة بعيدة ليأتيه بأخبار مملكة تحكمها ملكة؟ من هو هذا الطائر؟ هذا ما سنعرفه في قصتنا القادمة.. قصة هدهد سليمان!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النمل: 18-19", en: "The Quran, Surah An-Naml: 18-19" },
      note: { ar: "قول النملة وتبسّم سليمان بنص الآيتين.", en: "The ant's words and Sulaiman's smile are the words of the two verses." },
    },
    challenge: {
      question: "ماذا قالت النملة لبنات جنسها؟",
      options: ["اهربن من المطر", "ادخلن مساكنكن لا يحطمنّكم سليمان وجنوده", "ابنين بيتاً جديداً"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐜",
      badge: "أنتبه لمن حولي",
      keepsake: "حبة قمح",
      note: "تذكّرك أن أصغر المخلوقات قد تعلّمك أكبر درس في رعاية غيرك.",
    },
    arc: {
      idea: "نملة واحدة رأت الخطر قادمًا فنادت على قومها، فسمعها ملكٌ لم يسمع مثلَه أحد.",
      setting:
        "كان سيدنا سليمان عليه السلام نبيًّا وملكًا، آتاه الله مُلكًا لم يؤتَه أحد بعده: جيشٌ فيه الإنس والجنّ والطير، وريحٌ تجري بأمره، وفهمٌ لكلام الطير والحيوان. وفي يوم من الأيام خرج بجيشه كلّه يسير في الأرض، حتى اقتربوا من وادٍ يعيش فيه النمل. والنمل يسكن بيوتًا صغيرة تحت التراب، لا يراها من يمشي فوقها. والجيش قادم.",
      keyMoment:
        "والآن اللحظة التي تدور عليها القصة كلها: الملك العظيم، وهو على رأس جيشه، سمع صوت نملة. سمعه فعلًا. ﴿فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا﴾. لم يغضب لأنها حذّرت منه، ولم يقل: ومن هذه حتى تتكلّم عنّي؟ تبسّم. وهذا التبسّم علامة العظيم حقًّا: من تكون القوة كلها في يده، ويتّسع قلبه لأصغر مخلوق يخاف منه.",
      resolution:
        "ثم فعل سليمان شيئًا قد لا تتوقّعه: دعا الله. ﴿رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ﴾. أي: يا ربّ، أعنّي على شكرك. فالنعمة التي رآها في تلك اللحظة لم تكن الجيش ولا المُلك ولا الريح؛ كانت أنه فهم كلمة نملة.",
      word: { term: "لا يَحْطِمَنَّكُم", meaning: "لا يدوسكم فيكسركم — والنملة قالتها عن قوم لا يرونها أصلًا." },
      lessons: [
        "إذا رأيت خطرًا على من حولك فنبّههم، ولو كنت أصغرهم.",
        "أحسِن الظنّ بالناس؛ النملة قالت «وهم لا يشعرون» ولم تقل إنهم يريدون أذيّتنا.",
        "كلّما زاد ما عندك زاد شكرك؛ قابل سليمانُ النعمةَ بالدعاء لا بالفخر.",
      ],
      think:
        "كانت النملة تعرف أنها لا تستطيع إيقاف الجيش، وتكلّمت مع ذلك. هل مرّ بك موقف قلت فيه: أنا صغير ولن أفيد بشيء؟ ما أصغر شيء كنت تستطيع فعله وقتها؟",
      tryToday:
        "ابحث اليوم عن شيء صغير تنفع به غيرك: تنبيه، أو مساعدة، أو كلمة طيبة. ولا تنتظر حتى تكبر.",
    },
  },
  {
    chapter: "animals", slug: "hoopoe-of-solomon",
    en: {
      title: "The Hoopoe (Hudhud) of Sulaiman",
      hook:
        "Imagine leaving your place without permission, then coming back to find everyone asking where you were — and standing in front of you is someone with the power to punish you. What do you say in that moment? In today's story, a small bird stood in exactly that position before the greatest king on earth. And what it said is written in the Quran.",
      events:
        "Sulaiman said something severe: {I will surely punish him with a severe punishment or slaughter him, unless he brings me clear authorisation.} In other words: either he has a clear reason, or there will be a penalty. It was not long before the hoopoe arrived. {But he stayed not long} — and said something astonishing: {I have encompassed that which you have not, and I have come to you from Saba with certain news.} A small bird telling the greatest king: I know something you do not. Then it told him what it had seen — a land called Saba, ruled by a woman with a magnificent throne and everything she could need… but her people bow to the sun instead of Allah.",
      lesson:
        "News worth telling is a trust: whoever knows something should pass it on truthfully, and whoever hears it should check it before believing it.",
      next:
        "The Hoopoe crossed the sky with a message. Our next animal lives in the deep, dark ocean — and a prophet spent days inside it! Get ready to dive with the Whale of Prophet Yunus!",
      quranProse:
        "The Hoopoe confidently told the Prophet: {I have encompassed [in knowledge] that which you have not encompassed, and I have come to you from Sheba with certain news.}",
      challenge: {
        question: "What did the hoopoe bring Sulaiman?",
        options: ["Food", "News of the kingdom of Saba", "A feather"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐦",
        badge: "I search and I learn",
        keepsake: "The hoopoe's feather",
        note: "A reminder that whoever goes away to learn something useful comes back with good for everyone.",
      },
      arc: {
        idea: "A small bird went missing from Sulaiman's army for a day, and came back with news that changed a whole kingdom.",
        setting:
          "In Sulaiman's kingdom every creature had work it knew. The hoopoe is a bird with a crown of feathers on its head, and its task was to fly, explore, and find where the water was. One day Sulaiman was inspecting the birds, going along the ranks one by one… and the hoopoe was not there. Gone. And it had told no one before leaving.",
        keyMoment:
          "Now look at what Sulaiman did. He did not say, \"and who are you to speak?\" He did not punish the bird for contradicting him. He said: {We will see whether you were truthful or were of the liars.} That is: we will check. He did not believe the news because he liked it, and he did not dismiss it because the one bringing it was small. He would verify first. That is the difference between someone who passes news on and someone who weighs it.",
        resolution:
          "Sulaiman sent a letter with the hoopoe to the queen of Saba, calling her to worship Allah alone. She read it, consulted her people, and sent him a gift to test him, which he refused. Then she came herself, saw what she saw of Sulaiman's kingdom, and ended the story with one sentence: {My Lord, indeed I have wronged myself, and I submit with Sulaiman to Allah, Lord of the worlds.} And all of it began with a bird that disappeared for a day to go and look.",
        word: { term: "Certain news", meaning: "News confirmed beyond doubt — not something the hoopoe had merely heard from someone else." },
        lessons: [
          "Search, ask, explore; useful knowledge comes to whoever goes looking for it.",
          "Before you believe a piece of news or repeat it, ask yourself: am I sure this is true?",
          "If you were absent or in the wrong, explain honestly; an honest reason beats silence.",
        ],
        think:
          "Sulaiman could have punished the hoopoe straight away, and chose to listen and then check. Has there been a day when you got angry at someone before hearing them out? What did you find out once you listened?",
        tryToday:
          "If you hear something about someone today, do not pass it on until you ask: is this true? And who said it?",
      },
    },
    title: "قصة هدهد سليمان",
    surahName: "",
    image: "/stories/animals/hoopoe-of-solomon.jpg",
    hook:
      "تخيّل أنك غبتَ عن مكانك دون أن تستأذن، ثم رجعتَ فوجدت الجميع يسألون عنك، وأمامك من يملك أن يعاقبك. ماذا تقول في تلك اللحظة؟ في قصة اليوم، طائر صغير وقف هذا الموقف بالضبط أمام أعظم ملك على الأرض — وما قاله صار مكتوبًا في القرآن.",
    events:
      "قال سليمان كلامًا شديدًا: ﴿لَأُعَذِّبَنَّهُ عَذَابًا شَدِيدًا أَوْ لَأَذْبَحَنَّهُ أَوْ لَيَأْتِيَنِّي بِسُلْطَانٍ مُّبِينٍ﴾ — أي: إمّا أن يكون معه عذر واضح، وإلا فالعقاب. ولم يمضِ وقت طويل حتى جاء الهدهد: ﴿فَمَكَثَ غَيْرَ بَعِيدٍ﴾. وقال جملة عجيبة: ﴿أَحَطتُ بِمَا لَمْ تُحِطْ بِهِ وَجِئْتُكَ مِن سَبَإٍ بِنَبَإٍ يَقِينٍ﴾. طائر صغير يقول لأعظم ملك: عندي خبر لا تعرفه أنت. ثم حكى ما رأى: بلدٌ اسمه سبأ، تحكمه امرأة، لها عرش عظيم، وعندها من كل شيء… لكنّ قومها يسجدون للشمس من دون الله.",
    quranProse: "يقول الله تعالى عن الهدهد عندما جاء بالخبر العجيب: {فَمَكَثَ غَيْرَ بَعِيدٍ فَقَالَ أَحَطتُ بِمَا لَمْ تُحِطْ بِهِ وَجِئْتُكَ مِن سَبَإٍ بِنَبَإٍ يَقِينٍ}. يعني أن الهدهد قال لسليمان أنه عرف خبراً مؤكداً من مدينة سبأ.",
    lesson:
      "الخبر النافع أمانة: من عرف شيئًا فلينقله بصدق، ومن سمعه فليتثبّت منه قبل أن يصدّقه.",
    next: "الهدهد طائر صغير طار لمسافات بعيدة.. ولكن في قصتنا القادمة، سنتعرف على حيوان ضخم جداً وكبير، يعيش في البحر الأسود العميق، وقام بابتلاع نبي كامل دون أن يؤذيه! هل حزرتم من هو؟ نعم، إنه حوت يونس! انتظرونا.",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النمل: 20-44", en: "The Quran, Surah An-Naml: 20-44" },
      note: { ar: "غياب الهدهد وخبره عن سبأ وما بعده، كله بنص الآيات.", en: "The hoopoe's absence, its news of Saba and what followed are all in the verses." },
    },
    challenge: {
      question: "بماذا جاء الهدهد سليمان؟",
      options: ["بطعام", "بخبر عن مملكة سبأ", "بريشة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐦",
      badge: "أبحث وأتعلّم",
      keepsake: "ريشة الهدهد",
      note: "تذكّرك أن من غاب ليتعلّم شيئاً نافعاً عاد بما ينفع الجميع.",
    },
    arc: {
      idea: "طائر صغير غاب يومًا عن جيش سليمان، فعاد بخبر غيّر مملكة كاملة.",
      setting:
        "في مملكة سليمان عليه السلام، لكل مخلوق عملٌ يعرفه. والهدهد طائر على رأسه تاج من ريش، ومهمّته أن يطير ويستكشف ويعرف أين الماء. وفي يوم من الأيام وقف سليمان يتفقّد الطير، ينظر في صفوفه صفًّا صفًّا… فلم يجد الهدهد. غائب. ولم يخبر أحدًا قبل أن يذهب.",
      keyMoment:
        "والآن انظر ماذا فعل سليمان. لم يقل: وكيف تتكلّم أنت؟ ولم يعاقبه لأنه خالفه. قال: ﴿سَنَنظُرُ أَصَدَقْتَ أَمْ كُنتَ مِنَ الْكَاذِبِينَ﴾. أي: سنتحقّق. لم يصدّق الخبر لأنه أعجبه، ولم يردّه لأن صاحبه صغير. سيتأكّد أوّلًا. وهذا هو الفرق بين من ينقل الكلام ومن يزنه.",
      resolution:
        "أرسل سليمان مع الهدهد كتابًا إلى ملكة سبأ يدعوها إلى عبادة الله وحده. فقرأته، وشاورت قومها، وأرسلت إليه هديّة ليختبروه فلم يقبلها. ثم جاءت بنفسها، ورأت من مُلك سليمان ما رأت، فختمت القصة بكلمة واحدة: ﴿رَبِّ إِنِّي ظَلَمْتُ نَفْسِي وَأَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ﴾. وكل هذا بدأ بطائر غاب يومًا ليرى.",
      word: { term: "نَبَأ يَقِين", meaning: "خبر مؤكَّد لا شكّ فيه — وليس كلامًا سمعه الهدهد من أحد." },
      lessons: [
        "ابحث واسأل واستكشف؛ العلم النافع يأتي لمن يتحرّك.",
        "قبل أن تصدّق خبرًا أو تنقله، اسأل نفسك: هل أنا متأكّد أنه صحيح؟",
        "إذا غبتَ أو أخطأتَ فاشرح بصدق؛ العذر الصادق خير من الصمت.",
      ],
      think:
        "كان سليمان يستطيع أن يعاقب الهدهد فورًا، فاختار أن يسمع ثم يتحقّق. هل مرّ بك يوم غضبتَ فيه من أحد قبل أن تسمع منه؟ وماذا اكتشفتَ بعد أن سمعت؟",
      tryToday:
        "إذا سمعت اليوم خبرًا عن أحد، لا تنقله حتى تسأل: هل هذا صحيح؟ ومن قاله؟",
    },
  },
  {
    chapter: "animals", slug: "whale-of-yunus",
    en: {
      title: "The Whale of Prophet Yunus",
      hook:
        "Imagine being somewhere you cannot see anything at all. No window, no light, nobody. And you know that no one will find you, and no one will hear you however loudly you shout. What is left to you? In today's story, one of Allah's prophets found himself in exactly that place — at the bottom of the sea, inside a whale.",
      events:
        "The ship set out, then the wind rose and the waves turned rough, and the ship was in danger. So those aboard drew lots to choose one of them to go into the water. Allah says of Yunus: {And he drew lots and was among the losers.} So Yunus went down into the sea. It was night, the waves were over him, and there was no shore in sight. Then Allah commanded a great whale, and it swallowed him. The whale was not the end of the story, as you might think — it was the place where the real story began.",
      lesson:
        "Allah hears you wherever you are, and however tight the place becomes, the door back to Him is never shut.",
      next:
        "The whale obeyed Allah in the depths of the sea. Our next animal is the largest of them all, and it refused to march against the holy Kaaba! It's the Elephant of Abraha!",
      quranProse:
        "Prophet Yunus prayed in the darkness: {There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.}",
      challenge: {
        question: "What did Yunus call out inside the whale?",
        options: ["“There is no god but You, glory be to You, I was among the wrongdoers”", "He asked for food", "He called his people"],
        correctAnswer: 0,
      },
      reward: {
        icon: "🐋",
        badge: "I turn back to Allah",
        keepsake: "A drop from the sea",
        note: "A reminder that Allah's door never closes, even in three layers of darkness.",
      },
      arc: {
        idea: "A prophet left his people in anger, found himself in three layers of darkness, and had nothing left but a prayer.",
        setting:
          "Yunus, peace be upon him, was a prophet Allah sent to the people of a large town, calling them to worship Allah alone. He called them, and kept calling, and they would not answer. Every time he spoke, they turned away. One day he could bear it no longer. He walked out from among them in anger, walked until he reached the sea, found a ship about to sail, and boarded it. And that is where our story begins.",
        keyMoment:
          "Now — what can Yunus actually do? He cannot swim out. He cannot shout and be heard. He does not even know where he is. One thing is still in his power: to call on his Lord. So he called out in the darkness — the dark of the whale, the dark of the sea, the dark of the night — and said: {There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.} Look at what he said. Not \"get me out.\" Not \"I do not deserve this.\" He began with Allah, then admitted his mistake. And Allah heard him from down there.",
        resolution:
          "{So We responded to him and saved him from the distress.} The whale cast him onto bare ground with no tree and no shade, and his body was weak and ill, so Allah grew a gourd plant over him to shade him until he was strong again. Then the most beautiful part of the story happened: Yunus went back to the people he had left. And those who would not listen to him before… believed. {And We sent him to a hundred thousand or more. And they believed, so We gave them enjoyment for a time.}",
        word: { term: "Gourd plant", meaning: "A plant with wide leaves that spreads along the ground and makes shade — the family that pumpkins belong to." },
        lessons: [
          "Call on Allah anywhere; a prayer needs no beautiful place and no special hour.",
          "When you make a mistake, own it instead of running from it — admitting it is the first step.",
          "Do not give up on people too quickly; Yunus's people believed after he had walked away from them.",
        ],
        think:
          "Yunus had no idea how he would get out, and he prayed anyway. Think of a hard moment when you did not know what to do — what did you say then? And what would you have said in his place?",
        tryToday:
          "The first thing that annoys you today, stop for one moment before you speak or get angry, and say to yourself: \"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.\"",
      },
    },
    title: "قصة حوت يونس",
    surahName: "",
    image: "/stories/animals/whale-of-yunus.jpg",
    hook:
      "تخيّل أنك في مكان لا ترى فيه شيئًا. لا نافذة، ولا ضوء، ولا أحد. وأنت تعلم أن أحدًا لن يجدك، وأن أحدًا لن يسمع صوتك مهما رفعته. ماذا يبقى معك؟ في قصة اليوم، نبيٌّ من أنبياء الله وجد نفسه في هذا المكان بالضبط… في قاع البحر، داخل بطن حوت.",
    events:
      "سارت السفينة، ثم اشتدّت الريح واضطرب الموج، وصارت السفينة في خطر. فاقترع من فيها، أي تساهموا ليختاروا واحدًا منهم ينزل إلى الماء. يقول الله عن يونس: ﴿فَسَاهَمَ فَكَانَ مِنَ الْمُدْحَضِينَ﴾، أي شارك في القرعة فوقعت عليه. فنزل يونس إلى البحر. وكان الليل، والموج فوقه، ولا شاطئ قريبًا يراه. ثم أمر الله حوتًا عظيمًا فالتقمه. ولم يكن الحوت نهاية القصة كما قد تظن؛ بل كان المكان الذي بدأت فيه القصة الحقيقية.",
    quranProse: "يصف لنا الله كيف دعا سيدنا يونس في بطن الحوت فيقول: {فَنَادَى فِي الظُّلُمَاتِ أَن لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ}. يعني أنه دعا الله وهو في ظلام بطن الحوت وظلام البحر وظلام الليل.",
    lesson:
      "الله يسمعك من أي مكان كنت فيه، ومهما ضاق بك المكان فإن باب الرجوع إليه لا يُغلق.",
    next: "حوت يونس كان يعيش في البحر.. ولكن في قصتنا القادمة، سنتعرف على حيوان ضخم جداً يعيش على الأرض، حاول بعض الأشرار استخدامه لهدم الكعبة، لكنه رفض التحرك! من هو هذا الحيوان العجيب؟ سنتعرف عليه في قصة فيل أبرهة!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الصافات: 139-148 والأنبياء: 87-88", en: "The Quran, As-Saffat: 139-148 and Al-Anbiya: 87-88" },
      note: { ar: "التقامه ودعاؤه في الظلمات وخروجه وإنبات اليقطين، كله بنص الآيات.", en: "His being swallowed, his call from the darkness, his coming out and the gourd plant are all in the verses." },
    },
    challenge: {
      question: "بماذا دعا يونس وهو في بطن الحوت؟",
      options: ["﴿لا إله إلا أنت سبحانك إني كنت من الظالمين﴾", "طلب طعاماً", "نادى قومه"],
      correctAnswer: 0,
    },
    reward: {
      icon: "🐋",
      badge: "أرجع إلى الله",
      keepsake: "قطرة من البحر",
      note: "تذكّرك أن باب الله لا يُغلق، ولو كنت في ثلاث ظلمات.",
    },
    arc: {
      idea: "نبيٌّ ترك قومه وهو غاضب، فوجد نفسه في ثلاث ظلمات، ولم يبقَ معه إلا الدعاء.",
      setting:
        "كان سيدنا يونس عليه السلام نبيًّا أرسله الله إلى أهل قرية كبيرة، يدعوهم أن يعبدوا الله وحده. ودعاهم، وطال دعاؤه، وهم لا يستجيبون. وكلّما تكلّم أعرضوا عنه. وذات يوم لم يعد يحتمل، فخرج من بينهم وهو غاضب، ومشى حتى بلغ البحر، فوجد سفينة تستعد للسفر، فركب معها. وهنا تبدأ قصتنا.",
      keyMoment:
        "والآن، ما الذي يستطيع يونس أن يفعله؟ لا يستطيع أن يسبح، ولا أن يصرخ فيسمعه أحد، ولا أن يعرف أين هو أصلًا. بقي شيء واحد يقدر عليه: أن ينادي ربه. فنادى في الظلمات — ظلمة بطن الحوت، وظلمة البحر، وظلمة الليل — فقال: ﴿لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ﴾. وانظر ماذا قال: لم يقل «أخرجني»، ولم يقل «أنا لا أستحق هذا». بدأ بالله، ثم اعترف بخطئه. وسمع الله نداءه من هناك.",
      resolution:
        "﴿فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ﴾. ألقاه الحوت على أرض خالية لا شجر فيها ولا ظلّ، وكان جسمه ضعيفًا مريضًا، فأنبت الله عليه شجرة من يقطين تظلّله حتى قوي. ثم حدث أجمل ما في القصة: رجع يونس إلى قومه الذين تركهم. وهؤلاء الذين لم يسمعوا له من قبل… آمنوا. ﴿وَأَرْسَلْنَاهُ إِلَىٰ مِائَةِ أَلْفٍ أَوْ يَزِيدُونَ * فَآمَنُوا فَمَتَّعْنَاهُمْ إِلَىٰ حِينٍ﴾.",
      word: { term: "يَقْطِين", meaning: "نبات ذو ورق عريض كبير، يمتدّ على الأرض ويصنع ظلًّا، ومنه القرع الذي تعرفه." },
      lessons: [
        "ادعُ الله في أي مكان؛ فالدعاء لا يحتاج إلى مكان جميل ولا وقت خاص.",
        "إذا أخطأتَ فاعترف بخطئك ولا تهرب منه؛ الاعتراف هو أول الطريق.",
        "لا تيأس من الناس بسرعة؛ قوم يونس آمنوا بعد أن خرج من بينهم يائسًا منهم.",
      ],
      think:
        "يونس لم يكن يعرف كيف سيخرج، ومع ذلك دعا. تذكّر موقفًا صعبًا مرّ بك ولم تعرف فيه ماذا تفعل — ماذا قلت وقتها؟ وماذا كنت ستقول لو كنت مكان يونس؟",
      tryToday:
        "في أول شيء يضايقك اليوم، توقّف لحظة واحدة قبل أن تتكلّم أو تغضب، وقل في نفسك: «لا إله إلا أنت سبحانك إني كنت من الظالمين».",
    },
  },
  {
    chapter: "animals", slug: "elephant-of-abraha",
    en: {
      title: "The Elephant of Abraha",
      hook:
        "The largest animal that walks the earth, and the smallest bird that flies. In today's story they meet in one place, and the small one wins. So what had the whole army come to destroy? A house of stone, in a valley with no crops and no river… the Kaaba.",
      events:
        "Abrahah assembled a large army, and with it an elephant so huge the people of Mecca had never seen its like. The army marched until it reached the edges of Mecca. The people of Mecca had no army to turn it back, and no strength to stand in its way. Abdul-Muttalib — the Prophet's grandfather — came to ask for his camels, which the army had taken. Abrahah was astonished: you ask me about your camels and say nothing of the house I have come to destroy? And he answered with words still remembered today: I am the owner of the camels, and the House has an Owner who will protect it. The Seerah literature records that when they turned the elephant towards the Kaaba it knelt on the ground and refused to move forward, and whenever they turned it any other way it rose and walked.",
      lesson:
        "Allah protects His house and His religion, and He needs no force resembling the force of tyrants to do it.",
      next:
        "The elephant refused to harm the Kaaba. Our next animal guarded a group of believing youth at the mouth of a cave for hundreds of years — the Dog of the People of the Cave!",
      quranProse:
        "Allah says in Surah Al-Fil: {Have you not considered, [O Muhammad], how your Lord dealt with the companions of the elephant?}",
      challenge: {
        question: "What did the elephant do when it reached Mecca?",
        options: ["Entered and destroyed the Ka'bah", "Knelt and refused to go forward", "Went back with the army"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐘",
        badge: "Allah protects His House",
        keepsake: "A stone of sijjil",
        note: "A reminder that Allah protects what He wills by what He wills, even by small birds.",
      },
      arc: {
        idea: "A whole army came to destroy the Kaaba, and Allah turned it back with small birds.",
        setting:
          "Before the Prophet was born, Mecca was a small valley with no river and nothing growing, but it held a house every Arab knew and came to from everywhere: the Kaaba, the first house set on earth for the worship of Allah alone. In Yemen there was a ruler named Abrahah. He watched people leave everything and head for Mecca, so he built a magnificent church to draw them to it instead — and nothing drew them. So he decided to destroy the Kaaba itself.",
        keyMoment:
          "Then the answer came from where nobody was watching: not from an army, not from a weapon, not from a man. {And He sent against them birds in flocks, striking them with stones of hard clay.} Small birds, flock following flock, carrying small stones and dropping them. And the whole army was finished. {And He made them like eaten straw} — like the leaves of a crop after the animals have eaten them and trampled what was left.",
        resolution:
          "The Kaaba was not touched by a single stone. The event was so great that the Arabs began to date things by it: this happened in the Year of the Elephant. And in that very year the Prophet Muhammad was born. There is a whole surah in the Quran called Al-Fil that tells you this story in five verses — the one you recite in your prayer.",
        word: { term: "In flocks", meaning: "Groups of birds following one after another, not a single bird and not one flock." },
        lessons: [
          "Visible strength is not what decides things; an army with an elephant was turned back by small birds.",
          "When you cannot push back against injustice, know that Allah has a plan you cannot see.",
          "Love the House of Allah and respect it; it is the first house set down for people.",
        ],
        think:
          "Abdul-Muttalib said \"the House has an Owner who will protect it,\" and he had no army and no weapon. Has something bigger than you ever happened that you could do nothing about? What did you do then?",
        tryToday:
          "Recite Surah Al-Fil in your prayer today, and as you recite it remember that Allah protects whoever cannot protect themselves.",
      },
    },
    title: "قصة فيل أبرهة",
    surahName: "",
    image: "/stories/animals/elephant-of-abraha.jpg",
    hook:
      "أكبر حيوان يمشي على الأرض، وأصغر طير يطير في السماء. في قصة اليوم يلتقيان في مكان واحد، وينتصر الصغير. فما الذي جاء الجيش كله من أجل هدمه؟ بيتٌ من حجارة، في وادٍ لا زرع فيه ولا ماء… الكعبة.",
    events:
      "جهّز أبرهة جيشًا كبيرًا، وفيه فيل ضخم لم يرَ أهل مكة مثله من قبل. وسار الجيش حتى بلغ أطراف مكة. ولم يكن لأهل مكة جيش يردّونه به، ولا قوة يقفون بها في وجهه. وجاء عبد المطلب — جدّ النبي ﷺ — يطلب إبله التي أخذها الجيش، فتعجّب أبرهة: أتسألني عن إبلك وتترك بيتًا جئت لأهدمه؟ فقال كلمة بقيت إلى اليوم: أنا ربّ الإبل، وللبيت ربٌّ يحميه. وتذكر كتب السيرة أن الفيل حين وجّهوه إلى الكعبة برك على الأرض ورفض أن يتقدّم، فإذا صرفوه إلى جهة أخرى قام وسار.",
    quranProse: "يقول الله تعالى في القرآن عن هذه القصة: {أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ}. وهي بداية سورة الفيل التي تذكرنا دائماً بكيف حمى الله الكعبة من أبرهة وجيشه.",
    lesson:
      "الله يحمي بيته ودينه، ولا يحتاج في حمايته إلى قوة تشبه قوة الظالمين.",
    next: "رأينا كيف رفض الفيل مساعدة الأشرار.. في قصتنا القادمة، سنتعرف على حيوان آخر، ولكن هذا الحيوان كان وفياً جداً لمجموعة من الأصدقاء الطيبين، ونام معهم لفترة طويييييلة جداً! من هو؟ وما هي قصة كلب أهل الكهف؟ انتظرونا!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الفيل؛ وتفاصيل الحادثة في كتب السيرة", en: "The Quran, Surah Al-Fil; the details of the event in the Seerah literature" },
      note: { ar: "الحادثة وعاقبتها بنص السورة. أما اسم أبرهة، وبروك الفيل، وكلام عبد المطلب، فمن كتب السيرة لا من القرآن، ولذلك نُسبت إليها في نص القصة.", en: "The event and its outcome are the surah's own words. Abrahah's name, the elephant kneeling and Abdul-Muttalib's reply come from the Seerah literature, not the Quran, which is why the story attributes them to it." },
    },
    challenge: {
      question: "ماذا فعل الفيل حين وصل إلى مكة؟",
      options: ["دخل وهدم الكعبة", "برك ورفض أن يتقدّم", "رجع بجيشه"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐘",
      badge: "الله يحمي بيته",
      keepsake: "حصاة من سجّيل",
      note: "تذكّرك أن الله يحمي ما شاء بما شاء، ولو بطير صغير.",
    },
    arc: {
      idea: "جيشٌ كامل جاء ليهدم الكعبة، فردّه الله عنها بطيرٍ صغير.",
      setting:
        "قبل أن يولد النبي ﷺ، كانت مكة واديًا صغيرًا، لا نهر فيه ولا زرع، لكن فيه بيتًا يعرفه العرب كلهم ويأتون إليه من كل مكان: الكعبة، أوّل بيت وُضع في الأرض لعبادة الله وحده. وفي اليمن كان حاكم اسمه أبرهة. رأى الناس يتركون كل شيء ويقصدون مكة، فبنى كنيسة عظيمة ليصرفهم إليها، فلم يصرفهم شيء. فقرّر أن يهدم الكعبة نفسها.",
      keyMoment:
        "ثم جاء الردّ من حيث لا ينتظره أحد: لا من جيش، ولا من سلاح، ولا من رجل. ﴿وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ * تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ﴾. طيرٌ صغير، جماعات يتبع بعضها بعضًا، تحمل حجارة صغيرة فترمي بها. وانتهى الجيش كله. ﴿فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ﴾ — أي صاروا كورق الزرع بعد أن أكلته الدوابّ وداسته.",
      resolution:
        "ولم تُمسّ الكعبة بحجر واحد. وكان الأمر عظيمًا حتى صار العرب يؤرّخون به، فيقولون: كان هذا عام الفيل. وفي ذلك العام نفسه وُلد النبي محمد ﷺ. وفي القرآن سورة كاملة اسمها «الفيل» تحكي لك هذه القصة في خمس آيات، تقرؤها أنت اليوم في صلاتك.",
      word: { term: "أبابيل", meaning: "جماعات من الطير يتبع بعضها بعضًا، لا طائر واحد ولا سِرب واحد." },
      lessons: [
        "القوة الظاهرة ليست هي التي تحسم؛ جيشٌ معه فيل ردّه طيرٌ صغير.",
        "إذا عجزتَ عن دفع الظلم فاعلم أن لله تدبيرًا لا تراه أنت.",
        "أحبَّ بيتَ الله واحترمه؛ فهو أوّل بيت وُضع للناس.",
      ],
      think:
        "قال عبد المطلب: «للبيت ربٌّ يحميه»، وهو لا يملك جيشًا ولا سلاحًا. هل مرّ بك أمر أكبر منك لم تستطع أن تفعل فيه شيئًا؟ ماذا فعلت وقتها؟",
      tryToday:
        "اقرأ سورة الفيل اليوم في صلاتك، وتذكّر وأنت تقرؤها أن الله يحمي من لا يستطيع أن يحمي نفسه.",
    },
  },
  {
    chapter: "animals", slug: "dog-of-the-cave",
    en: {
      title: "The Loyal Dog of the Cave",
      hook:
        "The Quran names prophets, kings and nations. It also names… a dog. One dog, who did nothing great, said nothing, carried no message. All it did was follow its companions and refuse to leave them. So why did Allah mention it in His book?",
      events:
        "As they left, the young men prayed: {Our Lord, grant us mercy from Yourself and prepare for us right guidance in our affair.} They walked until they found a cave in a mountain and went inside. The dog did not go in with them; it settled at the entrance and stretched out its forelegs. And there Allah cast sleep over them. It was no ordinary sleep: {And they remained in their cave for three hundred years and exceeded by nine.}",
      lesson:
        "Company lifts the one who keeps it — so look carefully at who you walk beside.",
      next:
        "The dog was a loyal guard. In our next story, we will read about a bright yellow cow that helped solve a great mystery! It's the Cow of the Children of Israel!",
      quranProse:
        "Allah says: {And their dog stretched his forelegs at the entrance.}",
      challenge: {
        question: "Where was the dog of the People of the Cave?",
        options: ["Asleep inside with them", "Stretching its paws at the entrance", "Outside the mountain"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐕",
        badge: "Good company",
        keepsake: "The dog's collar",
        note: "A reminder that keeping company with the righteous lifts you — even the dog is mentioned in the Quran because it stayed with them.",
      },
      arc: {
        idea: "A dog followed its companions to the cave and would not leave them, and was mentioned in the Quran alongside them.",
        setting:
          "In an old city ruled by a king who forced people to worship idols, a group of young men believed in Allah alone. They were few, and they knew their king would not leave them alone. So they met and made a very hard decision: to leave their homes, their families and their whole city, and go out with their faith. They did not know where they were going, or how long they would be gone, or whether they would return. And when they left, their dog followed them.",
        keyMoment:
          "Here is the sentence this story is told for. Allah did not say \"and they slept, and their dog with them.\" He said: {And their dog stretching out his forelegs at the entrance.} He mentioned the dog — where it was, and how it lay with its forelegs out at the threshold. An animal that carries no duty and faces no reckoning, and yet it entered the Book of Allah, read by people until the last day, because it stayed with the righteous and did not leave them.",
        resolution:
          "Then Allah woke them after three hundred and nine years, and they thought they had stayed a day or part of a day. They sent one of them with their silver coins to buy food — and the coins were ancient, known to no one, and the city had changed entirely, and its people worshipped Allah. So the people learned of them, and knew that Allah's promise is true and the Hour is coming. Then Allah said of them: {So do not argue about them except with an obvious argument} — do not go on disputing their number; the number was never the lesson.",
        word: { term: "The threshold", meaning: "The entrance of the cave, its opening from the outside — exactly where the dog lay." },
        lessons: [
          "Choose your friends for their faith; the dog is in the Quran because of who it was with.",
          "Loyalty is staying with people when the road gets hard, not when it is easy.",
          "Do not spend yourself on details that do not help; Allah forbade arguing over their number.",
        ],
        think:
          "The dog followed its companions to a place it did not know, for a time it could not measure. Who are the friends you would follow into something difficult? And why those ones in particular?",
        tryToday:
          "Think of one friend who brings you closer to what is good, and call them or sit with them today.",
      },
    },
    title: "قصة كلب أهل الكهف",
    surahName: "",
    image: "/stories/animals/dog-of-the-cave.jpg",
    hook:
      "في القرآن أسماء أنبياء وملوك وأقوام. وفيه أيضًا… كلب. كلب واحد، لم يفعل شيئًا عظيمًا، ولم يتكلّم، ولم يحمل رسالة. كل ما فعله أنه تبع أصحابه ولم يتركهم. فلماذا ذكره الله في كتابه؟",
    events:
      "قال الفتية وهم خارجون: ﴿رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا﴾. ومشَوا حتى وجدوا كهفًا في جبل فدخلوه. أما الكلب فلم يدخل معهم إلى الداخل؛ جلس عند الباب ومدّ ذراعيه. وهناك ضرب الله على آذانهم — أي ألقى عليهم النوم — فناموا. ولم يكن نومًا عاديًّا: ﴿فَلَبِثُوا فِي كَهْفِهِمْ ثَلَاثَ مِائَةٍ سِنِينَ وَازْدَادُوا تِسْعًا﴾.",
    quranProse: "يصف القرآن الكريم مشهد الكلب وهو يحرسهم فيقول: {وَكَلْبُهُم بَاسِطٌ ذِرَاعَيْهِ بِالْوَصِيدِ}. الوصيد هو باب الكهف، والآية ترسم صورة جميلة لوفاء هذا الكلب لأصحابه.",
    lesson:
      "الصحبة ترفع صاحبها؛ فانظر جيدًا في من تمشي معه.",
    next: "كان الكلب وفياً ونام طويلاً.. لكن ماذا لو طلب نبي من قومه أن يبحثوا عن بقرة بلون وشكل محدد جداً لحل لغز محير؟ قصة غريبة ومليئة بالأسئلة، وهذا ما سنعرفه في قصة بقرة بني إسرائيل!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة الكهف: 18 و22", en: "The Quran, Surah Al-Kahf: 18 and 22" },
      note: { ar: "وضع الكلب على عتبة الكهف بنص الآية، والآية 22 تنهى عن الخوض في عددهم.", en: "The dog at the threshold is in the verse itself, and verse 22 warns against arguing over their number." },
    },
    challenge: {
      question: "أين كان كلب أهل الكهف؟",
      options: ["داخل الكهف نائماً معهم", "باسط ذراعيه عند مدخل الكهف", "خارج الجبل"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐕",
      badge: "الصحبة الصالحة",
      keepsake: "طوق الكلب",
      note: "تذكّرك أن مجالسة الصالحين ترفع، حتى الكلب ذُكر في القرآن لأنه كان معهم.",
    },
    arc: {
      idea: "كلبٌ تبع أصحابه إلى الكهف ولم يتركهم، فذُكر في القرآن معهم.",
      setting:
        "في مدينة قديمة يحكمها ملك يُجبر الناس على عبادة الأصنام، عاش فتية شباب آمنوا بالله وحده. كانوا قلّة، وكانوا يعرفون أن ملكهم لن يتركهم في حالهم. فاجتمعوا وقرّروا أمرًا صعبًا جدًّا: أن يتركوا بيوتهم وأهلهم ومدينتهم كلها، ويخرجوا بدينهم. لا يعرفون إلى أين يذهبون، ولا كم سيغيبون، ولا هل سيرجعون. وحين خرجوا، تبعهم كلبهم.",
      keyMoment:
        "والآن الكلمة التي من أجلها تُحكى هذه القصة. لم يقل الله: وناموا وكلبهم معهم. قال: ﴿وَكَلْبُهُم بَاسِطٌ ذِرَاعَيْهِ بِالْوَصِيدِ﴾. ذكر الكلب، وذكر أين كان، وكيف كان مادًّا ذراعيه عند الباب. حيوان لا يُؤمر ولا يُحاسَب، ومع ذلك دخل في كتاب الله يقرؤه الناس إلى يوم القيامة — لأنه كان مع الصالحين ولم يفارقهم.",
      resolution:
        "ثم أيقظهم الله بعد ثلاثمائة وتسع سنين، وهم يظنّون أنهم لبثوا يومًا أو بعض يوم. فأرسلوا واحدًا منهم بورقهم — أي بنقودهم — يشتري طعامًا، فإذا النقود قديمة لا يعرفها أحد، وإذا المدينة قد تغيّرت كلها، وإذا أهلها يعبدون الله. فعرف الناس أمرهم، وعلموا أن وعد الله حقّ وأن الساعة آتية. ثم قال الله عنهم: ﴿فَلَا تُمَارِ فِيهِمْ إِلَّا مِرَاءً ظَاهِرًا﴾ — أي لا تُطِل الجدال في عددهم؛ فالعدد ليس هو الدرس.",
      word: { term: "الوَصِيد", meaning: "عتبة الكهف، أي مدخله من الخارج — وهناك بالضبط جلس الكلب." },
      lessons: [
        "اختر أصحابك على دينهم؛ فالكلب ذُكر في القرآن لأنه كان معهم.",
        "الوفاء أن تبقى مع من معك حين يصعب الطريق، لا حين يسهل.",
        "لا تشغل نفسك بتفصيل لا ينفعك؛ فقد نهى الله عن الجدال في عددهم.",
      ],
      think:
        "تبع الكلبُ أصحابه إلى مكان لا يعرفه ولا يعرف كم سيبقى فيه. من هم أصحابك الذين لو ذهبوا إلى أمر صعب ذهبتَ معهم؟ ولماذا هم بالذات؟",
      tryToday:
        "فكّر اليوم في صاحب واحد يقرّبك من الخير، ثم اتّصل به أو اجلس معه.",
    },
  },
  {
    chapter: "animals", slug: "cow-of-israel",
    en: {
      title: "The Yellow Cow of the Children of Israel",
      hook:
        "What happens if your father asks you for something simple, and you start asking: which one? what colour? where from? when? In today's story, a people did exactly that with a command that came from Allah. And at the start, the command was very easy.",
      events:
        "The command came through Musa: {Indeed, Allah commands you to slaughter a cow.} A cow. Any cow. It would have been enough to take the first cow they found, and the matter would have been over. But they began asking: which one? what colour? what work does it do? And with every question the matter narrowed on them. It became a cow neither old nor young, then {a yellow cow, bright in colour, pleasing to the observers}, then a cow never yoked to plough the earth or water the field, sound and without blemish. Until almost no cow on earth would do but one.",
      lesson:
        "When a clear instruction reaches you, start doing it; asking on and on without need turns the easy thing hard.",
      next:
        "The cow solved a mystery for people who asked too many questions. Our next animal was the answer to a question too — a giant camel that walked straight out of a mountain! It's the Camel of Prophet Salih!",
      quranProse:
        "Allah says describing it: {He says, 'It is a yellow cow, bright in color - pleasing to the observers.'}",
      challenge: {
        question: "Why did the matter of the cow become hard for the Children of Israel?",
        options: ["It was expensive", "They kept asking and making it harder", "It was far away"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐄",
        badge: "I hear and I obey",
        keepsake: "The cow's horn",
        note: "A reminder that making obedience harder than Allah made it only weighs you down.",
      },
      arc: {
        idea: "One simple command, and question after question that made it harder and harder.",
        setting:
          "In the time of Musa, peace be upon him, a crime took place among the Children of Israel: a man was found killed and no one knew who had killed him. People began accusing one another, and the trouble was about to grow until it poisoned the whole town. So they went to Musa and asked him to pray to Allah to show them the truth. That is the moment the command reached them.",
        keyMoment:
          "Then Allah said of them one very short sentence, and it is the most important line in the story: {So they slaughtered her, but they could hardly do it.} They did it in the end — and they nearly did not. All that questioning and insisting had not given them more knowledge; it had given them exhaustion and hesitation. The command that first reached them was far wider than what they narrowed it to themselves.",
        resolution:
          "Then Allah commanded them to strike the dead man with part of the cow. They did, and Allah brought him to life for a moment; he named the one who had killed him, and returned as he was. The accusations ended and the truth was known. Then Allah closed the story: {Thus does Allah bring the dead to life, and He shows you His signs that you might reason.} The story was never about a cow. It was about this: the One who brought that man back can bring all of you back.",
        word: { term: "Bright in colour", meaning: "A deep, clear yellow — a colour that gives pleasure to whoever looks at it." },
        lessons: [
          "Do what you understood of the instruction; do not go looking for a difficulty that is not in it.",
          "Ask in order to understand, not in order to delay.",
          "The One who brings a single dead man back can bring all people back.",
        ],
        think:
          "The Children of Israel asked many questions before doing what they were told. Has there been a day when you kept asking about something you already knew was right? What was stopping you from starting?",
        tryToday:
          "Pick one thing your mother or father asked of you today, and do it straight away without a single question.",
      },
    },
    title: "قصة بقرة بني إسرائيل",
    surahName: "",
    image: "/stories/animals/cow-of-israel.jpg",
    hook:
      "ماذا يحدث لو طلب منك أبوك شيئًا بسيطًا، فبدأتَ تسأل: أيّ واحد؟ وما لونه؟ ومن أين آتي به؟ ومتى؟ في قصة اليوم، قومٌ فعلوا هذا مع أمرٍ جاءهم من الله. وكان الأمر في أوّله سهلًا جدًّا.",
    events:
      "جاءهم الأمر على لسان موسى: ﴿إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تَذْبَحُوا بَقَرَةً﴾. بقرة. أيّ بقرة. وكان يكفي أن يأخذوا أوّل بقرة يجدونها وينتهي الأمر. لكنهم بدأوا يسألون: ما هي؟ ما لونها؟ ما عملها؟ وكلّما سألوا ضاق عليهم الأمر. صارت بقرة لا صغيرة ولا كبيرة، ثم ﴿صَفْرَاءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ النَّاظِرِينَ﴾، ثم بقرة لم تُذلَّل في حرث الأرض ولا في سقي الزرع، سالمة لا عيب فيها. حتى لم تكد تصلح لهم إلا بقرة واحدة.",
    quranProse: "يصف القرآن جمال لون هذه البقرة فيقول: {قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ النَّاظِرِينَ}. أي أن لونها جميل جداً ويسعد من ينظر إليها.",
    lesson:
      "إذا جاءك أمر واضح فابدأ بالعمل؛ فكثرة السؤال بغير حاجة تُصعّب السهل.",
    next: "ساعدت البقرة في حل لغز كبير.. ولكن في قصتنا القادمة، سنتعرف على حيوان كان هو نفسه معجزة! حيوان خرج من الصخرة الصلبة! هل تتخيلون ذلك؟ إنها ناقة سيدنا صالح، فانتظرونا!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 67-73", en: "The Quran, Surah Al-Baqarah: 67-73" },
      note: { ar: "أمر الذبح وتشديدهم في السؤال وصفة البقرة، كله بنص الآيات.", en: "The command, their insistent questioning and the cow's description are all in the verses." },
    },
    challenge: {
      question: "لماذا شقّ على بني إسرائيل أمر البقرة؟",
      options: ["لأنها كانت غالية", "لأنهم أكثروا السؤال والتشديد", "لأنها كانت بعيدة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐄",
      badge: "أسمع وأطيع",
      keepsake: "قرن البقرة",
      note: "تذكّرك أن التشديد على النفس في الطاعة يجعلها أثقل مما أرادها الله.",
    },
    arc: {
      idea: "أمرٌ واحد بسيط، وسؤالٌ بعد سؤال جعله أصعب فأصعب.",
      setting:
        "في زمن سيدنا موسى عليه السلام، وقعت في بني إسرائيل جريمة: وُجد رجل مقتول ولم يُعرف من قتله. فبدأ الناس يتّهم بعضهم بعضًا، وكادت المشكلة تكبر حتى تفسد المدينة كلها. فذهبوا إلى موسى يسألونه أن يدعو الله ليكشف لهم الحقيقة. وهذا هو الموقف الذي جاءهم فيه الأمر.",
      keyMoment:
        "ثم قال الله عنهم جملة قصيرة جدًّا هي أهمّ ما في القصة: ﴿فَذَبَحُوهَا وَمَا كَادُوا يَفْعَلُونَ﴾. أي: ذبحوها في آخر الأمر، وكادوا ألّا يفعلوا. كل ذلك السؤال والتشديد لم يزدهم علمًا، بل زادهم تعبًا وتردّدًا. والأمر الذي جاءهم في أوّله كان أوسع بكثير مما انتهوا إليه بأنفسهم.",
      resolution:
        "ثم أمرهم الله أن يضربوا القتيل بجزء من البقرة، ففعلوا، فأحياه الله لحظة فأخبر بمن قتله، ثم عاد كما كان. فانتهت التهم وعُرف الحقّ. ثم ختم الله القصة بقوله: ﴿كَذَٰلِكَ يُحْيِي اللَّهُ الْمَوْتَىٰ وَيُرِيكُمْ آيَاتِهِ لَعَلَّكُمْ تَعْقِلُونَ﴾. فالقصة لم تكن عن بقرة؛ كانت عن أن الذي أحيا هذا القتيل قادر أن يحييكم جميعًا.",
      word: { term: "فاقِع", meaning: "شديد الصفرة صافيها، لونٌ يَسُرّ من ينظر إليه." },
      lessons: [
        "نفّذ ما فهمتَه من الأمر، ولا تبحث عن تعقيد ليس فيه.",
        "اسأل لتفهم، لا لتؤجّل.",
        "الذي يُحيي ميتًا واحدًا قادر أن يُحيي الناس كلهم.",
      ],
      think:
        "سأل بنو إسرائيل أسئلة كثيرة قبل أن يفعلوا ما أُمروا به. هل مرّ بك يوم أطلتَ فيه السؤال عن شيء تعرف أنه الصواب؟ ما الذي كان يمنعك من أن تبدأ؟",
      tryToday:
        "اختر اليوم أمرًا واحدًا طلبه منك أبوك أو أمك، ونفّذه فورًا بغير سؤال واحد.",
    },
  },
  {
    chapter: "animals", slug: "camel-of-saleh",
    en: {
      title: "The Miracle Camel of Prophet Salih",
      hook:
        "If you asked Allah for a sign and then saw it with your own eyes, what would you do next? In today's story, a people asked for a sign and it came. It walked among them and drank from their water. Then they decided to end the matter with their own hands.",
      events:
        "The sign came: a she-camel. {This is the she-camel of Allah, a sign for you.} The commentators say she came out of a rock for them; that is not in the Quran. What was asked of them was not hard: leave her to eat in Allah's earth, and share the water with her — {For her is a drink, and for you is a drink, each on a known day.} One day hers, one day theirs. And Salih warned them: {And do not touch her with harm, lest the punishment of a great day seize you.} A few believed; most stayed as they were. And every day the camel walked among them, reminding them of what they did not want to remember.",
      lesson:
        "Kindness to animals is part of this religion, and injustice is never forgotten by Allah, however small it looks to the one doing it.",
      next:
        "The camel was a sign that its people refused to respect. In our last animal story, a humble donkey becomes proof of something amazing: that Allah can bring the dead back to life!",
      quranProse:
        "Prophet Salih told them: {O my people, this is the she-camel of Allah - [she is] to you a sign. So let her feed upon Allah's earth, and do not touch her with harm.}",
      challenge: {
        question: "What did the people of Thamud do to the she-camel?",
        options: ["Fed it", "Hamstrung it", "Left it to drink"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🐫",
        badge: "I am gentle with the weak",
        keepsake: "The camel's footprint",
        note: "A reminder that harming an animal is not forgotten with Allah.",
      },
      arc: {
        idea: "A she-camel who was a sign from Allah, and a people who chose to kill her.",
        setting:
          "Thamud were a strong people. Allah gave them strength in their bodies and skill in their hands, until they were carving their houses out of mountains: {And you carve out of the mountains, homes, with skill.} So Allah sent them Salih, peace be upon him — one of them, whose honesty they knew — calling them to worship Allah alone and leave the idols. And they asked him for a sign that he was truly a messenger.",
        keyMoment:
          "A group of them agreed on something, and then the worst of them went out and hamstrung the camel. {So they hamstrung her, and became regretful.} Notice the last word: they regretted it. They really did. But the regret came after the act, and the act does not come back. How many things do we do in a moment of anger or defiance, and then spend a long time wishing we had not.",
        resolution:
          "Allah gave them three days: {Enjoy yourselves in your homes for three days. That is a promise not to be denied.} Three whole days to turn back, and they did not. Then the blast seized them and they lay lifeless in their homes, and Allah saved Salih and those who believed with him. Their carved houses stayed in the mountains for people after them to walk past — the strength they built with was no use to them on the day they needed it.",
        word: { term: "Hamstrung", meaning: "Cut her down and killed her — the Quran's word is for something done by hand, not something that happened by accident." },
        lessons: [
          "Do not harm an animal that has not harmed you; Allah destroyed a people over one camel.",
          "Regret after the act does not undo it; stop before you act, not after.",
          "Protect the right of whoever cannot demand their own right.",
        ],
        think:
          "Thamud had three full days to turn back from what they had done. If you had three days to put right something you got wrong, what would you start with?",
        tryToday:
          "If you see an animal today — a cat, a bird, even an ant — do not harm it, and put out water for it if you can.",
      },
    },
    title: "قصة ناقة صالح",
    surahName: "",
    image: "/stories/animals/camel-of-saleh.jpg",
    hook:
      "لو طلبتَ علامة من الله ثم رأيتها بعينيك، فماذا تفعل بعدها؟ في قصة اليوم، قومٌ طلبوا علامة فجاءتهم، فصارت تمشي بينهم وتشرب من مائهم. ثم قرّروا أن ينهوا الأمر بأيديهم.",
    events:
      "فجاءتهم الآية: ناقة. ﴿هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً﴾. ويذكر المفسرون أنها خرجت لهم من صخرة، وهذا ليس في القرآن. ولم يكن المطلوب منهم صعبًا: أن يدَعوها تأكل في أرض الله، وأن يتقاسموا معها الماء: ﴿لَهَا شِرْبٌ وَلَكُمْ شِرْبُ يَوْمٍ مَّعْلُومٍ﴾ — يوم لها ويوم لهم. وحذّرهم صالح: ﴿وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابُ يَوْمٍ عَظِيمٍ﴾. فآمن قليل منهم، وبقي أكثرهم على عناده. والناقة تمشي بينهم كل يوم، تذكّرهم بما لا يريدون أن يتذكّروه.",
    quranProse: "يقول الله تعالى في القرآن عن هذا الأمر: {قَالَ هَذِهِ نَاقَةٌ لَّهَا شِرْبٌ وَلَكُمْ شِرْبُ يَوْمٍ مَّعْلُومٍ * وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابُ يَوْمٍ عَظِيمٍ}. أي أنه حذرهم من إيذائها.",
    lesson:
      "الرفق بالحيوان دين، والظلم لا يُنسى عند الله وإن بدا في عين صاحبه صغيرًا.",
    next: "ناقة خرجت من صخرة.. معجزة عجيبة! وفي قصتنا الأخيرة من هذه المجموعة، سنتعرف على قصة رجل نام لمدة مائة عام، ولما استيقظ، وجد طعامه كما هو، لكن حماره تحول إلى عظام! كيف ذلك؟ هذه هي قصة حمار عزير!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعراف: 73-79 والشمس: 11-15 والقمر: 27-31", en: "The Quran, Al-A'raf: 73-79, Ash-Shams: 11-15, Al-Qamar: 27-31" },
      note: { ar: "الناقة آية، وقسمة الماء، وعقرها، وإمهالهم ثلاثًا، وعاقبة القوم، كله بنص الآيات. أما خروجها من صخرة فقول للمفسرين ليس في القرآن، ولذلك نُسب إليهم في نص القصة.", en: "The she-camel as a sign, the sharing of the water, her hamstringing, the three days' respite and the people's end are all in the verses. Her coming out of a rock is a commentators' account, not in the Quran, which is why the story attributes it to them." },
    },
    challenge: {
      question: "ماذا فعل قوم ثمود بالناقة؟",
      options: ["أطعموها", "عقروها", "تركوها تشرب"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🐫",
      badge: "أرفق بالضعيف",
      keepsake: "خفّ الناقة",
      note: "تذكّرك أن إيذاء حيوان لا يُنسى عند الله.",
    },
    arc: {
      idea: "ناقةٌ كانت علامةً من الله، وقومٌ اختاروا أن يقتلوها.",
      setting:
        "ثمود قوم أقوياء، أعطاهم الله قوّة في أجسادهم وعلمًا في أيديهم، حتى صاروا ينحتون بيوتهم في الجبال نحتًا: ﴿وَتَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا فَارِهِينَ﴾. فأرسل الله إليهم صالحًا عليه السلام، وهو منهم يعرفونه ويعرفون صدقه، يدعوهم أن يعبدوا الله وحده ويتركوا الأصنام. فطلبوا منه علامة تدلّ على أنه رسول.",
      keyMoment:
        "فاتّفق نفر منهم على أمر، ثم خرج أشقاهم فعقر الناقة. ﴿فَعَقَرُوهَا فَأَصْبَحُوا نَادِمِينَ﴾. وانتبه إلى الكلمة الأخيرة: ندموا. ندموا فعلًا. لكنّ الندم جاء بعد أن وقع الفعل، والفعل لا يرجع. وكم من شيء نفعله في لحظة غضب أو تحدٍّ، ثم نقضي وقتًا طويلًا نتمنّى لو أنّا لم نفعله.",
      resolution:
        "وأمهلهم الله ثلاثة أيام: ﴿تَمَتَّعُوا فِي دَارِكُمْ ثَلَاثَةَ أَيَّامٍ ذَٰلِكَ وَعْدٌ غَيْرُ مَكْذُوبٍ﴾. ثلاثة أيام كاملة ليرجعوا فيها، فلم يرجعوا. ثم أخذتهم الصيحة فأصبحوا في ديارهم جاثمين، ونجّى الله صالحًا والذين آمنوا معه. وبقيت بيوتهم المنحوتة في الجبال يمرّ عليها الناس بعدهم؛ فالقوّة التي بنَوا بها لم تنفعهم يومَ احتاجوا إليها.",
      word: { term: "عَقَرُوها", meaning: "نحروها وقتلوها — والكلمة في القرآن تدلّ على فعلٍ بيدٍ، لا على أمرٍ وقع بغير قصد." },
      lessons: [
        "لا تؤذِ حيوانًا لم يؤذك؛ فقد أهلك اللهُ قومًا بسبب ناقة.",
        "الندم بعد الفعل لا يردّه؛ فتوقّف قبل أن تفعل، لا بعده.",
        "احفظ حقّ من لا يستطيع أن يطالب بحقّه.",
      ],
      think:
        "كان أمام ثمود ثلاثة أيام كاملة ليرجعوا عمّا فعلوا. لو كان أمامك ثلاثة أيام لتصلح شيئًا أخطأتَ فيه، فبماذا كنت ستبدأ؟",
      tryToday:
        "إذا رأيت اليوم حيوانًا — قطًّا أو طائرًا أو حتى نملة — فلا تؤذه، وضَع له ماءً إن استطعت.",
    },
  },
  {
    chapter: "animals", slug: "donkey-of-uzair",
    en: {
      title: "The Donkey of Uzair",
      hook:
        "Imagine sleeping, then waking to find your food exactly as you left it, unchanged — but the one who had been standing beside you is now worn bones. So how long did you sleep? A day? In today's story a man lived exactly this, and the answer was: a hundred years.",
      events:
        "He said: {How will Allah bring this to life after its death?} — how will Allah restore this town after it has fallen? And Allah did not answer him with words he could hear. {So Allah caused him to die for a hundred years; then He revived him.} A hundred full years. Then He brought him back and asked: {How long have you remained?} He said: {I have remained a day or part of a day.} He was told: {Rather, you have remained a hundred years.}",
      lesson:
        "The One who brings bones to life after a hundred years is able to do anything.",
      next:
        "And with this amazing miracle, we wrap up our animal stories!",
      quranProse:
        "Allah says: {And look at your donkey - and that We may make you a sign for the people. And look at the bones [of this donkey] - how We raise them and then We cover them with flesh.}",
      challenge: {
        question: "How long was the man dead before Allah brought him back?",
        options: ["One day", "A hundred years", "Ten years"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌿",
        badge: "I believe in Allah's power",
        keepsake: "A fig and a grape",
        note: "A reminder that the One who revives bones after a century is able to do anything.",
      },
      arc: {
        idea: "A man asked how Allah could revive such ruin — and Allah showed him the answer in the nearest thing to him.",
        setting:
          "A righteous man passed by a ruined town, {and it had fallen into ruin upon its roofs} — its roofs had collapsed onto its walls and no one was left in it. With him were his donkey, his food and his drink. He stood looking at all that ruin, and a question came to him. It was not a question of denial; it was the question of someone who has seen with his own eyes something hard to imagine coming back.",
        keyMoment:
          "Then the signs came, one after another. {Look at your food and your drink; it has not changed with time} — food a hundred years old that had not spoiled. {And look at your donkey} — and the donkey was worn bones. Then: {And look at the bones — how We raise them and then We cover them with flesh.} He watched with his own eyes as the bones gathered and were joined together and covered with flesh, until the donkey stood alive in front of him. He had asked about reviving a town, and Allah showed him reviving in the nearest thing to him.",
        resolution:
          "{And when it became clear to him, he said, I know that Allah is over all things competent.} It was no longer something he had heard; it was something he had seen. And Allah had said to him before that: {And that We may make you a sign for the people} — this man himself became a sign, his story told by people after him until today. And you are now one of those people.",
        word: { term: "Has not changed with time", meaning: "Did not spoil or alter, though the years passed over it." },
        lessons: [
          "Ask in order to understand; the man asked, and Allah showed him the answer without blaming him.",
          "What your mind cannot manage, your Lord is not unable to do.",
          "Resurrection after death is true, and a man before us saw it with his own eyes.",
        ],
        think:
          "The man saw the answer with his own eyes, and we have not. What makes you believe in something you have not seen? And what is the biggest thing you believe in without ever having seen it?",
        tryToday:
          "Look at one small living thing today — a plant, a bird — and say to yourself: the One who gave this life is able to give me life after my death.",
      },
    },
    title: "قصة حمار عزير",
    surahName: "",
    image: "/stories/animals/donkey-of-uzair.jpg",
    hook:
      "تخيّل أنك نمتَ ثم استيقظت، فوجدت طعامك كما تركته لم يتغيّر، لكن الذي كان واقفًا بجوارك صار عظامًا بالية. فكم نمتَ إذًا؟ يومًا؟ في قصة اليوم رجلٌ عاش هذا بالضبط، وكان الجواب: مئة عام.",
    events:
      "قال: ﴿أَنَّىٰ يُحْيِي هَٰذِهِ اللَّهُ بَعْدَ مَوْتِهَا﴾ — أي كيف يعيد الله الحياة إلى هذه القرية بعد أن خربت؟ ولم يجبه الله بكلام يسمعه. ﴿فَأَمَاتَهُ اللَّهُ مِائَةَ عَامٍ ثُمَّ بَعَثَهُ﴾. مئة عام كاملة. ثم أحياه وسأله: ﴿كَمْ لَبِثْتَ﴾؟ فقال: ﴿لَبِثْتُ يَوْمًا أَوْ بَعْضَ يَوْمٍ﴾. فقيل له: ﴿بَل لَّبِثْتَ مِائَةَ عَامٍ﴾.",
    quranProse: "يقول الله تعالى في القرآن الكريم: {وَانْظُرْ إِلَى حِمَارِكَ وَلِنَجْعَلَكَ آيَةً لِلنَّاسِ وَانْظُرْ إِلَى الْعِظَامِ كَيْفَ نُنْشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا}. أي انظر كيف نجمع العظام ونغطيها باللحم ليعود الحمار حياً.",
    lesson:
      "الذي يُحيي العظام بعد مئة عام قادرٌ على كل شيء.",
    next: "وهكذا يا أصدقائي، تعرفنا على أجمل قصص الحيوانات في القرآن الكريم. كل حيوان علمنا درساً مهماً. هل أنتم مستعدون لمجموعة جديدة من القصص؟ في المرة القادمة، سنبدأ مغامرة جديدة مع قصص الأنبياء الرائعة!",
    source: {
      reliability: "🟡",
      reference: { ar: "القرآن الكريم، سورة البقرة: 259 — والآية لا تسمّي الرجل", en: "The Quran, Surah Al-Baqarah: 259 — the verse does not name the man" },
      note: { ar: "القصة كلها بنص الآية: الإماتة مائة عام، والطعام الذي لم يتسنّه، والحمار الذي أُعيد. لكن الآية تقول ﴿أَوْ كَالَّذِي مَرَّ عَلَىٰ قَرْيَةٍ﴾ ولم تسمِّه، وتسميته عزيراً قول للمفسرين لا يثبت، ولذلك تبقى القصة بهذه العلامة: الآية ثابتة، والاسم ليس فيها.", en: "The whole account is in the verse: the hundred years, the food that did not spoil, the donkey restored. But the verse says only one who passed by a town and does not name him; calling him Uzair is a commentators' opinion, not established. That is why the mark stays: the verse is certain, the name is not in it." },
    },
    challenge: {
      question: "كم لبث الرجل ميتاً قبل أن يحييه الله؟",
      options: ["يوماً واحداً", "مائة عام", "عشر سنين"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌿",
      badge: "أومن بقدرة الله",
      keepsake: "تينة وعنبة",
      note: "تذكّرك أن الذي يحيي العظام بعد مائة عام قادر على كل شيء.",
    },
    arc: {
      idea: "رجلٌ سأل: كيف يُحيي الله هذا الخراب؟ فأراه الله الجواب في أقرب شيء إليه.",
      setting:
        "مرّ رجل صالح على قرية خَرِبة، ﴿وَهِيَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا﴾ — أي سقطت سقوفها على جدرانها، ولم يبقَ فيها أحد. وكان معه حماره وطعامه وشرابه. ووقف ينظر إلى هذا الخراب كله، فخطر بباله سؤال. ولم يكن سؤال إنكار، بل سؤال من رأى بعينه شيئًا يصعب أن يتخيّل عودته.",
      keyMoment:
        "ثم جاءت العلامات واحدة بعد واحدة. ﴿فَانظُرْ إِلَىٰ طَعَامِكَ وَشَرَابِكَ لَمْ يَتَسَنَّهْ﴾ — طعامٌ مرّت عليه مئة عام ولم يفسد. ﴿وَانظُرْ إِلَىٰ حِمَارِكَ﴾ — والحمار عظام بالية. ثم: ﴿وَانظُرْ إِلَى الْعِظَامِ كَيْفَ نُنشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا﴾ — فرأى بعينيه العظامَ تجتمع ويُركَّب بعضها إلى بعض، ثم يُكسى عليها اللحم، حتى قام الحمار حيًّا أمامه. سأل عن إحياء قرية، فأراه الله الإحياء في أقرب شيء إليه.",
      resolution:
        "﴿فَلَمَّا تَبَيَّنَ لَهُ قَالَ أَعْلَمُ أَنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ﴾. لم يعد الأمر عنده خبرًا سمعه؛ صار شيئًا رآه. وقد قال الله له قبل ذلك: ﴿وَلِنَجْعَلَكَ آيَةً لِّلنَّاسِ﴾ — أي إن هذا الرجل نفسه صار علامة، يحكي الناس قصته من بعده إلى اليوم. وأنت الآن واحد من هؤلاء الناس.",
      word: { term: "لَمْ يَتَسَنَّهْ", meaning: "لم يتغيّر ولم يفسد وإن مرّت عليه السنون." },
      lessons: [
        "اسأل لتفهم؛ فالرجل سأل، فأراه الله الجواب ولم يعاتبه.",
        "ما يعجز عنه عقلك لا يعجز عنه ربّك.",
        "البعث بعد الموت حقّ، وقد رآه رجل بعينيه قبلنا.",
      ],
      think:
        "رأى الرجل الجواب بعينيه، ونحن لم نره. ما الذي يجعلك تصدّق بشيء لم ترَه؟ وما أكبر شيء تؤمن به ولم ترَه قطّ؟",
      tryToday:
        "انظر اليوم إلى شيء حيّ صغير — نبتة أو عصفور — وقل في نفسك: الذي أحيا هذا قادرٌ أن يحييني بعد موتي.",
    },
  },
  {
    chapter: "women",
    slug: "maryam",
    en: {
      title: "Maryam, the Mother of Isa",
      hook:
        "Imagine a girl who lived inside a beautiful mosque, praying day and night, and angels brought her fresh food straight from heaven! Who is this amazing lady?",
      events:
        "Maryam (Mary) was a very pure and righteous girl. Her mother dedicated her to serve the mosque (Al-Aqsa) since she was born. Prophet Zakariya took care of her. Whenever he entered her room, he found fresh fruits that were completely out of season! Allah chose her above all women in the world to be the mother of a great prophet, Isa (Jesus), without a father, as a mighty miracle.",
      lesson:
        "We learn that purity, devotion to prayers, and completely trusting Allah brings miracles into our lives.",
      next:
        "Maryam was a great and pure mother. In our next story, we meet another good and very brave woman, who lived in the palace of the most unjust king on earth — and still chose Paradise. Who is she?",
      challenge: {
        question: "What did Zakariyya find with Maryam whenever he entered her sanctuary?",
        options: ["Books", "Provision from Allah", "Children"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🌴",
        badge: "Pure of heart",
        keepsake: "A date from the palm",
        note: "A reminder that whoever is true with Allah is provided for from where they never expected.",
      },
    },
    image: "/stories/maryam.jpg",
    title: "مريم ابنة عمران",
    surahName: "آل عمران",
    hook: "هل تعرفون قصة طفلة صغيرة عاشت في المسجد، وكان يأتيها طعام لذيذ من السماء؟ كيف حدث ذلك؟ ومن هي هذه الفتاة الطيبة؟",
    events: "مريم كانت فتاة صالحة جدًا، أمها نذرتها لخدمة بيت الله. تكفل بها نبي الله زكريا. كان كلما دخل عليها غرفتها يجد عندها فاكهة وطعامًا غير موجود في ذلك الموسم! وعندما يسألها من أين هذا؟ تقول: «هو من عند الله». ولما كبرت، اختارها الله لتكون أمًا لنبي عظيم هو سيدنا عيسى عليه السلام، دون أن يكون له أب، لتكون معجزة للعالمين.",
    lesson: "الله يرزق من يحبه ويطيعه بأشياء جميلة جدًا. وعلينا أن نكون مثل السيدة مريم في حبها للصلاة والدعاء، فهي مثال عظيم للطهر والاصطفاء.",
    next: "مريم كانت امرأة طيبة جدًا يحبها الله. وفي قصتنا القادمة سنتعرف على امرأة أخرى طيبة وشجاعة جدًا، كانت تعيش في قصر أكبر ملوك الأرض ظلمًا، لكنها اختارت الجنة… من هي؟",
    ayah: { ref: "3:37", surah: 3, number: 37, text: "كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا ٱلْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًۭا ۖ قَالَ يَـٰمَرْيَمُ أَنَّىٰ لَكِ هَـٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ ٱللَّهِ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة مريم: 16-36 وآل عمران: 35-47", en: "The Quran, Surah Maryam: 16-36 and Aal-Imran: 35-47" },
      note: { ar: "نذر أمها، وكفالة زكريا، والرزق في المحراب، والبشارة، كله بنص الآيات. ومريم المرأة الوحيدة التي سُمّيت باسمها في القرآن.", en: "Her mother's vow, Zakariyya's care, the provision in the sanctuary and the glad tidings are all in the verses. Maryam is the only woman named by name in the Quran." },
    },
    challenge: {
      question: "ماذا وجدت مريم عند زكريا كلما دخل عليها المحراب؟",
      options: ["كتباً", "رزقاً من عند الله", "أطفالاً"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🌴",
      badge: "طاهرة القلب",
      keepsake: "رطبة من النخلة",
      note: "تذكّرك أن من صدق مع الله رزقه من حيث لا يحتسب.",
    },
  },
  {
    chapter: "women",
    slug: "asiya",
    en: {
      title: "Asiya, the Wife of Pharaoh",
      hook:
        "If you lived in the biggest palace, with all the gold and toys in the world, but the king was evil, what would you choose? Meet a queen who chose a house in Paradise over everything else!",
      events:
        "Asiya was the wife of the cruel Pharaoh, but she was entirely different from him. She was kind, merciful, and a true believer in Allah. She was the one who convinced Pharaoh not to harm baby Musa and adopted him instead. When Pharaoh found out she believed in Allah, he punished her severely. But Asiya wasn't afraid of him at all. She looked up to the sky and asked Allah to build her a beautiful house in Paradise near Him.",
      lesson:
        "True happiness is not found in money or palaces, but in having a pure heart that loves Allah and stands for the truth.",
      next:
        "Asiya raised a child who was not her own. But do you know who the very first mother in human history was — the first woman Allah created to live on earth with her husband?",
      challenge: {
        question: "What did Pharaoh's wife ask her Lord for?",
        options: ["A palace in this world", "“My Lord, build me a house with You in Paradise”", "A great deal of money"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🏰",
        badge: "I choose Paradise",
        keepsake: "A brick from the house in Paradise",
        note: "A reminder that the richest person is the one who chose the next life while holding this one.",
      },
    },
    image: "/stories/asiya.jpg",
    title: "آسية امرأة فرعون",
    surahName: "التحريم",
    hook: "تخيلوا أن تعيشوا في قصر كبير مليء بالذهب والألعاب، لكن الحاكم هناك شرير جدًا! ماذا ستفعلون؟ هل ستكونون أشرارًا مثله أم تختارون طريق الخير؟",
    events: "آسية كانت زوجة فرعون، الملك الظالم الذي كان يقول للناس «أنا ربكم الأعلى». لكن آسية كانت طيبة ومؤمنة بالله في قلبها. وعندما وجدت النبي موسى وهو طفل رضيع في الصندوق في النهر، أحبته كثيرًا وأقنعت فرعون ألا يقتله وربّته في قصرها. ولما كبر موسى وأصبح نبيًا، آمنت به آسية، وتجردت من كل نعيم الدنيا طلبًا لرضا الله. لم تخف من غضب فرعون وعذابه، بل دعت الله أن يبني لها بيتًا في الجنة لتسكن بجواره.",
    lesson: "الشجاعة الحقيقية هي أن نقول الحق ونفعل الخير، حتى لو كان من حولنا يفعلون الشر. وأن الجنة أجمل بكثير من أي قصر في الدنيا.",
    next: "السيدة آسية ربّت طفلًا ليس ابنها… لكن هل تعرفون من هي أول أم في تاريخ البشرية؟ أول امرأة خلقها الله لتسكن الأرض مع زوجها؟",
    ayah: { ref: "66:11", surah: 66, number: 11, text: "وَضَرَبَ ٱللَّهُ مَثَلًۭا لِّلَّذِينَ ءَامَنُوا۟ ٱمْرَأَتَ فِرْعَوْنَ إِذْ قَالَتْ رَبِّ ٱبْنِ لِى عِندَكَ بَيْتًۭا فِى ٱلْجَنَّةِ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة التحريم: 11 والقصص: 9", en: "The Quran, Surah At-Tahrim: 11 and Al-Qasas: 9" },
      note: { ar: "دعاؤها وضربها مثلاً للمؤمنين بنص الآية، ولم يسمِّها القرآن؛ واسم «آسية» جاء في السنة وكتب التفسير.", en: "Her supplication and her being set as an example for the believers are in the verse; the Quran does not name her, and the name Asiyah comes from the sunnah and the commentaries." },
    },
    challenge: {
      question: "بماذا دعت امرأة فرعون ربها؟",
      options: ["بقصر في الدنيا", "﴿ربِّ ابنِ لي عندك بيتاً في الجنة﴾", "بمال كثير"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🏰",
      badge: "أختار الجنة",
      keepsake: "لبنة من بيت الجنة",
      note: "تذكّرك أن أغنى الناس من اختار الآخرة وهو يملك الدنيا.",
    },
  },
  {
    chapter: "women",
    slug: "hawwa",
    en: {
      title: "Hawwa (Eve), the First Woman",
      hook:
        "Who was the very first mother on Earth? Let's travel back to the beautiful Paradise to meet the woman who started the human family!",
      events:
        "Hawwa (Eve) was the very first woman Allah created. She was created to be a companion and wife to Prophet Adam so they could live happily together. They lived in a beautiful Paradise and could eat from anywhere, except one tree. But the evil Iblis (Satan) whispered to them and tricked them into eating from it. They immediately felt sorry for their mistake and cried, asking Allah for forgiveness. Because Allah is The Most Merciful, He forgave them and sent them to Earth to start human life and spread goodness.",
      lesson:
        "Everyone makes mistakes, but the best thing to do is to quickly admit our mistake and ask Allah for forgiveness, just like our mother Hawwa did.",
      next:
        "Hawwa was the first mother. In our next story, we will meet a very generous lady who received the most amazing news when she was very old! It's Lady Sarah!",
      quranProse:
        "Allah says about their prayer for forgiveness: {They said, 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.'}",
      challenge: {
        question: "What did Adam and his wife do after eating from the tree?",
        options: ["Argued", "Turned back together and asked forgiveness", "Hid what happened"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🍃",
        badge: "We say sorry together",
        keepsake: "A leaf from the tree",
        note: "A reminder that a home whose people turn back to Allah is never lost.",
      },
    },
    image: "/stories/hawwa.jpg",
    title: "السيدة حواء",
    surahName: "البقرة",
    hook: "هل سألتم أنفسكم يومًا من أين جاء كل هؤلاء الناس في العالم؟ من كان أول رجل وأول امرأة على الأرض؟",
    events: "خلق الله سيدنا آدم بيده، ثم خلق زوجته السيدة حواء لكي لا يكون وحيدًا. عاشا معًا في الجنة الجميلة يأكلان من كل الثمار، إلا شجرة واحدة منعهما الله منها. لكن الشيطان الشرير وسوس لهما وخدعهما حتى أكلا من الشجرة. حزنت حواء وآدم جدًا لأنهما لم يسمعا كلام الله، فاعتذرا وبكيا، فسامحهما الله الرحيم، وأنزلهما إلى الأرض لتبدأ قصة البشرية ونكون نحن من أحفادهما!",
    lesson: "إذا أخطأنا ونسينا كلام الله، يجب أن نعتذر فورًا ونطلب منه السماح، والله سيغفر لنا لأنه رحيم يحب التوابين.",
    next: "السيدة حواء هي أم البشر… ولكن هناك امرأة أخرى طيبة جدًا، رزقها الله بطفل جميل وهي كبيرة جدًا في السن! هل تعرفون من هي؟",
    ayah: { ref: "2:35", surah: 2, number: 35, text: "وَقُلْنَا يَـٰٓـَٔادَمُ ٱسْكُنْ أَنتَ وَزَوْجُكَ ٱلْجَنَّةَ وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَـٰذِهِ ٱلشَّجَرَةَ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة البقرة: 35-37 والأعراف: 19-23", en: "The Quran, Surah Al-Baqarah: 35-37 and Al-A'raf: 19-23" },
      note: { ar: "القصة بنص الآيات، والقرآن يسمّيها ﴿زَوْجُهُ﴾ ولم يذكر اسم «حواء»؛ الاسم في السنة وكتب التفسير.", en: "The account is in the verses, where she is called his wife; the name Hawwa is not in the Quran but in the sunnah and the commentaries." },
    },
    challenge: {
      question: "ماذا فعل آدم وزوجه بعد أن أكلا من الشجرة؟",
      options: ["تخاصما", "تابا معاً وطلبا المغفرة", "خبّآ الأمر"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🍃",
      badge: "نعتذر معاً",
      keepsake: "ورقة الشجرة",
      note: "تذكّرك أن البيت الذي يعتذر أهله لله لا يضيع.",
    },
  },
  {
    chapter: "women",
    slug: "sarah",
    en: {
      title: "Lady Sarah and the Glad Tidings",
      hook:
        "Can you imagine getting the best news ever when you are very old and have given up hope? Today we meet a generous lady who received a magical surprise from angels!",
      events:
        "Lady Sarah was the beautiful and righteous wife of Prophet Ibrahim. She was very old and never had any children. One day, three handsome guests visited them. Ibrahim and Sarah were very generous and quickly prepared a delicious meal for them. But the guests didn't eat! They were actually angels sent by Allah. The angels gave Ibrahim and Sarah the glad tidings that they would have a baby boy named Ishaq (Isaac). Sarah was so surprised that she laughed and touched her face, wondering how an old woman could have a baby! But with Allah, nothing is impossible.",
      lesson:
        "We learn to always be generous to our guests. We also learn that Allah's blessings can come at any time, and we should never lose hope in His mercy.",
      next:
        "Sarah welcomed her guests and was given the best of news. Our next story follows another wife of Prophet Ibrahim, left alone in an empty desert with a thirsty baby — and the well that sprang up for her. It's Lady Hajar!",
      quranProse:
        "Allah says: {And his wife was standing, and she smiled. Then We gave her good tidings of Isaac, and after Isaac, Jacob.}",
      challenge: {
        question: "What good news was Ibrahim's wife given in her old age?",
        options: ["Wealth", "Ishaq, and after Ishaq, Yaqub", "A journey"],
        correctAnswer: 1,
      },
      reward: {
        icon: "😊",
        badge: "Nothing is beyond Allah",
        keepsake: "The guests' platter",
        note: "A reminder that nothing is too much for Allah, and generosity to a guest opens doors of good news.",
      },
    },
    image: "/stories/sarah.jpg",
    title: "السيدة سارة",
    surahName: "هود",
    hook: "هل يمكن لشجرة قديمة جدًا أن تثمر فجأة تفاحًا لذيذًا؟ هذا مستحيل! لكن الله قادر على كل شيء.",
    events: "السيدة سارة هي زوجة نبي الله إبراهيم عليه السلام. كانت امرأة طيبة، لكنها كبرت في السن ولم يكن لديها أطفال. في يوم من الأيام، جاء ملائكة على شكل ضيوف لزيارة سيدنا إبراهيم، وبشّروه وبشّروا السيدة سارة بأنها ستلد طفلًا اسمه إسحاق، ومن بعده حفيد اسمه يعقوب! ضحكت السيدة سارة من المفاجأة وتعجبت وقالت: كيف ألد طفلًا وأنا عجوز كبيرة؟ فقال لها الملائكة: هل تتعجبين من قدرة الله؟ فرزقها الله بالنبي إسحاق وفرحت به كثيرًا.",
    lesson: "قدرة الله كبيرة جدًا ولا يوجد شيء مستحيل عليه. إذا أردنا شيئًا بشدة، علينا أن ندعو الله دائمًا ولا نيأس أبدًا.",
    next: "السيدة سارة كانت تعيش مع سيدنا إبراهيم، وكان معهم سيدة طيبة أخرى اضطرت للعيش في صحراء قاحلة وحدها مع طفلها الرضيع، وبحثت عن الماء بين جبلين! هل عرفتموها؟",
    ayah: { ref: "11:72", surah: 11, number: 72, text: "قَالَتْ يَـٰوَيْلَتَىٰٓ ءَأَلِدُ وَأَنَا۠ عَجُوزٌۭ وَهَـٰذَا بَعْلِى شَيْخًا ۖ إِنَّ هَـٰذَا لَشَىْءٌ عَجِيبٌۭ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة هود: 69-73 والذاريات: 24-30", en: "The Quran, Surah Hud: 69-73 and Adh-Dhariyat: 24-30" },
      note: { ar: "البشارة بإسحاق وضحكها بنص الآيات، والقرآن يسمّيها ﴿امْرَأَتُهُ﴾ ولم يذكر اسم «سارة»؛ الاسم من كتب التفسير.", en: "The glad tidings of Ishaq and her laughter are in the verses, where she is called his wife; the name Sarah comes from the commentaries, not the Quran." },
    },
    challenge: {
      question: "بم بُشّرت زوجة إبراهيم وهي كبيرة؟",
      options: ["بمال", "بإسحاق ومن وراء إسحاق يعقوب", "برحلة"],
      correctAnswer: 1,
    },
    reward: {
      icon: "😊",
      badge: "لا شيء على الله بعزيز",
      keepsake: "طبق الضيافة",
      note: "يذكّرك أن الله لا يعجزه شيء، وأن كرم الضيف يفتح أبواب البشرى.",
    },
  },
  {
    chapter: "women",
    slug: "hajar",
    en: {
      title: "Lady Hajar and the Well of Zamzam",
      hook:
        "Imagine being left alone in a hot, empty desert with a crying baby and no water! What would you do? Let's discover the story of the strongest and most patient mother!",
      events:
        "Prophet Ibrahim (Abraham) had to leave his wife Hajar and their baby Ismail in a barren desert in Mecca by Allah's command. Hajar trusted Allah completely. When the baby got thirsty and started crying, she didn't just sit and give up; she ran between two hills (Safa and Marwa) seven times looking for help. Because of her great effort and deep trust, Allah sent an angel who struck the ground, and the blessed, cool water of Zamzam gushed out!",
      lesson:
        "We must always put in the effort and work hard, while fully trusting that Allah will help us and never abandon us.",
      next:
        "Hajar's patience brought water out of the desert. In our last story of this chapter, we meet a queen who ruled a mighty kingdom and used her mind to find the truth. Who is she? The Queen of Sheba!",
      challenge: {
        question: "Between which two hills did Hajar run looking for water?",
        options: ["Uhud and Thawr", "Safa and Marwah", "Arafah and Mina"],
        correctAnswer: 1,
      },
      reward: {
        icon: "💧",
        badge: "I strive, and I trust",
        keepsake: "A waterskin",
        note: "A reminder that Allah provides for the one who strives — and Zamzam still bears witness.",
      },
    },
    image: "/stories/hajar.jpg",
    title: "السيدة هاجر",
    surahName: "إبراهيم",
    hook: "تخيلوا أنفسكم في صحراء حارة جدًا، لا يوجد بها شجر ولا ماء ولا أصدقاء تلعبون معهم. وفجأة، يبكي طفل صغير من العطش! ماذا ستفعل أمه؟",
    events: "السيدة هاجر هي زوجة سيدنا إبراهيم وأم سيدنا إسماعيل. أمر الله سيدنا إبراهيم أن يترك هاجر وطفلها الرضيع في صحراء مكة حيث لا يوجد أحد. سألته هاجر: هل أمرك الله بهذا؟ قال: نعم. فقالت بشجاعة: إذن لن يضيعنا الله! وعندما عطش الطفل وبكى، أخذت تركض بين جبلين (الصفا والمروة) سبع مرات تبحث عن ماء. وفجأة، ضرب الملَك الأرض بجناحه عند قدمي الطفل إسماعيل، فخرجت عين ماء عذبة وجميلة جدًا! إنها بئر زمزم التي نشرب منها حتى اليوم.",
    lesson: "مهما كنا في مشكلة أو مكان صعب، يجب أن نثق في الله ونبذل جهدنا كما ركضت هاجر، والله سيرزقنا ويساعدنا من حيث لا ندري.",
    next: "السيدة هاجر كانت تحب طفلها كثيرًا وتخاف عليه… ولكن في قصتنا القادمة سنتعرف على ملكة ذكية جدًا، كانت تحكم بلدًا كبيرًا، وجاءتها رسالة غريبة من طائر!",
    ayah: { ref: "14:37", surah: 14, number: 37, text: "رَّبَّنَآ إِنِّىٓ أَسْكَنتُ مِن ذُرِّيَّتِى بِوَادٍ غَيْرِ ذِى زَرْعٍ عِندَ بَيْتِكَ ٱلْمُحَرَّمِ" },
    source: {
      reliability: "🟢",
      reference: { ar: "صحيح البخاري (3364)؛ وإسكان الذرية في القرآن، سورة إبراهيم: 37", en: "Sahih al-Bukhari (3364); the settling of the family in the Quran, Surah Ibrahim: 37" },
      note: { ar: "دعاء إبراهيم عند البيت بنص الآية. أما تفصيل قصتها والسعي وزمزم ففي صحيح البخاري، ولم يذكر القرآن اسمها.", en: "Ibrahim's supplication at the House is in the verse. The fuller account — the running and Zamzam — is in Sahih al-Bukhari, and the Quran does not give her name." },
    },
    challenge: {
      question: "بين أي جبلين سعت هاجر تبحث عن الماء؟",
      options: ["أحد وثور", "الصفا والمروة", "عرفة ومنى"],
      correctAnswer: 1,
    },
    reward: {
      icon: "💧",
      badge: "أسعى وأتوكّل",
      keepsake: "قربة ماء",
      note: "تذكّرك أن الله يرزق من سعى، وأن زمزم ما زالت تشهد.",
    },
  },
  {
    chapter: "women",
    slug: "bilqis",
    en: {
      title: "Bilqis, the Queen of Sheba",
      hook:
        "Have you ever received a letter delivered by a bird? Today's story is about a very smart queen who received a special letter from a great King and Prophet!",
      events:
        "Bilqis was a wise queen who ruled the wealthy Kingdom of Sheba. Her people were very strong, but they worshipped the sun instead of Allah. Prophet Sulaiman (Solomon) sent her a letter with a smart bird (the Hoopoe), inviting her to worship Allah. Instead of starting a war, the wise queen decided to visit Sulaiman. When she saw his amazing kingdom and his great miracles, she used her intelligence and immediately chose to submit to Allah, the Lord of the worlds.",
      lesson:
        "A true leader uses their mind to seek the truth and avoid unnecessary fights. Wisdom always leads a person to the right path.",
      next:
        "And with this wise queen we finish the women of the Quran. Are you ready for more? Let's head to the next chapter!",
      challenge: {
        question: "What did the queen of Saba do when she recognised the truth?",
        options: ["Denied it", "Submitted with Sulaiman to Allah, Lord of the worlds", "Ran away"],
        correctAnswer: 1,
      },
      reward: {
        icon: "☀️",
        badge: "I follow the truth once I know it",
        keepsake: "A small throne",
        note: "A reminder that the bravest people are those who let go of their opinion when the truth becomes clear.",
      },
    },
    image: "/stories/bilqis.jpg",
    title: "ملكة سبأ",
    surahName: "النمل",
    hook: "هل تحبون القصص عن الملوك والملكات والقلاع الكبيرة؟ اليوم لدينا قصة عن ملكة ذكية جدًا، وصلتها رسالة من ملك بعيد، لم يحضرها ساعي البريد، بل أحضرها طائر!",
    events: "بلقيس كانت ملكة غنية وقوية تحكم مملكة سبأ، لكنها وقومها كانوا يخطئون ويعبدون الشمس. علم بذلك سيدنا سليمان عن طريق طائره الهدهد، فأرسل لها رسالة يطلب منها أن تعبد الله وحده. جمعت بلقيس وزراءها لتستشيرهم، فقالوا لها نحن أقوياء ويمكننا محاربته، لكنها بذكائها رفضت الحرب، وقررت أن تذهب بنفسها لترى سيدنا سليمان. وعندما وصلت وشاهدت قدرة الله والملك العظيم لسيدنا سليمان، قادها عقلها للإيمان، وعرفت أن عبادة الشمس كانت خطأ، فأسلمت لله رب العالمين.",
    lesson: "الشخص الذكي هو الذي يفكر قبل أن يغضب، ويستمع للحق، ولا يخجل من الاعتراف بخطئه وتصحيحه كما فعلت الملكة بلقيس.",
    next: "الملكة بلقيس كانت ذكية واختارت طريق الإيمان. ولكن هناك نساء كنّ يعشن في بيوت مهمة جدًا، ومع ذلك اخترن طريق الأشرار! من هنّ؟",
    ayah: { ref: "27:44", surah: 27, number: 44, text: "رَبِّ إِنِّى ظَلَمْتُ نَفْسِى وَأَسْلَمْتُ مَعَ سُلَيْمَـٰنَ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة النمل: 22-44", en: "The Quran, Surah An-Naml: 22-44" },
      note: { ar: "خبرها ومشورتها وإسلامها بنص الآيات، والقرآن يسمّيها ﴿امْرَأَةً تَمْلِكُهُمْ﴾ ولم يذكر اسم «بلقيس»؛ الاسم من كتب التاريخ والتفسير.", en: "Her story, her counsel and her submission are in the verses, where she is a woman ruling over them; the name Bilqis comes from the historians and commentators, not the Quran." },
    },
    challenge: {
      question: "ماذا فعلت ملكة سبأ حين عرفت الحق؟",
      options: ["أنكرته", "أسلمت مع سليمان لله رب العالمين", "هربت"],
      correctAnswer: 1,
    },
    reward: {
      icon: "☀️",
      badge: "أتبع الحق إذا عرفته",
      keepsake: "عرش صغير",
      note: "تذكّرك أن أشجع الناس من ترك رأيه حين تبيّن له الصواب.",
    },
  },
  {
    chapter: "women",
    slug: "imraat_alaziz",
    en: {
      title: "The Wife of al-Aziz",
      hook:
        "Has anyone ever accused you of something you did not do? It is a horrible feeling! In our story today, a very good young man was blamed for something that was not his fault at all…",
      events:
        "The Prophet Yusuf lived as a young man in the palace of an important man called al-Aziz. The wife of al-Aziz treated him badly and wanted him to do wrong things that would not please Allah. Because Yusuf was good and refused to do wrong, she became angry with him and lied about him, saying that he was the one at fault — and he was put in prison unfairly for long years! But Allah did not abandon him. Years later the king wanted him released, because he was honest and wise. And here the wife of al-Aziz felt regret, and decided to admit the truth and tell everyone that Yusuf had been truthful all along, and that she was the one who had lied.",
      lesson:
        "Lying is a very bad thing and it hurts other people. And if we do wrong and lie, we must be brave enough to tell the truth in the end, so that what is right goes back to the one it belongs to.",
      next:
        "The wife of al-Aziz admitted her mistake in the end… but in our last story we will meet two women who were married to two great prophets, and who never admitted the truth at all!",
      challenge: {
        question: "What did the governor's wife finally say?",
        options: ["Denied everything", "Admitted that Yusuf was truthful", "Accused him again"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🗝️",
        badge: "I tell the truth even against myself",
        keepsake: "A door key",
        note: "A reminder that admitting the truth is courage, even when it comes late.",
      },
    },
    image: "/stories/imraat_alaziz.jpg",
    title: "امرأة العزيز",
    surahName: "يوسف",
    hook: "هل حدث وأن اتهمكم أحد بشيء لم تفعلوه؟ إنه شعور سيء جدًا! في قصتنا اليوم، هناك شاب طيب جدًا اتُهم ظلمًا…",
    events: "عاش النبي يوسف وهو شاب في قصر رجل مهم يسمى العزيز. وكانت امرأة العزيز تعامله بقسوة وأرادت منه أن يفعل أشياء خاطئة لا ترضي الله. ولأن سيدنا يوسف كان طيبًا ويرفض الخطأ، غضبت منه واتهمته كذبًا بأنه هو من أخطأ، فدخل السجن ظلمًا لسنوات طويلة! لكن الله لم يتركه. وبعد سنوات، أراد الملك أن يخرجه لأنه شخص صادق وحكيم. وهنا، شعرت امرأة العزيز بالندم، وقررت أن تعترف بالحقيقة وتقول للجميع إن يوسف كان صادقًا وهي من كذبت.",
    lesson: "الكذب شيء سيء جدًا ويؤذي الآخرين. وإذا أخطأنا وكذبنا، يجب أن نتحلى بالشجاعة ونقول الحقيقة في النهاية لكي نعيد الحق لأصحابه.",
    next: "امرأة العزيز اعترفت بخطئها في النهاية… ولكن في قصتنا الأخيرة سنتعرف على امرأتين كانتا متزوجتين من نبيين عظيمين، لكنهما لم تعترفا بالحق أبدًا!",
    ayah: { ref: "12:51", surah: 12, number: 51, text: "ٱلْـَٔـٰنَ حَصْحَصَ ٱلْحَقُّ أَنَا۠ رَٰوَدتُّهُۥ عَن نَّفْسِهِۦ وَإِنَّهُۥ لَمِنَ ٱلصَّـٰدِقِينَ" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة يوسف: 23-35 و51", en: "The Quran, Surah Yusuf: 23-35 and 51" },
      note: { ar: "القصة واعترافها بالحق في الآية 51، كله بنص الآيات، ولم يسمِّها القرآن.", en: "The account and her admission of the truth in verse 51 are in the verses; the Quran does not name her." },
    },
    challenge: {
      question: "ماذا قالت امرأة العزيز في النهاية؟",
      options: ["أنكرت كل شيء", "اعترفت بأن يوسف من الصادقين", "اتهمته مرة أخرى"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🗝️",
      badge: "أقول الحق ولو على نفسي",
      keepsake: "مفتاح الباب",
      note: "يذكّرك أن الاعتراف بالحق شجاعة، ولو جاء متأخراً.",
    },
  },
  {
    chapter: "women",
    slug: "nuh_lut",
    en: {
      title: "The Wife of Nuh and the Wife of Lut",
      hook:
        "Imagine your husband is a prophet whom Allah teaches everything, showing people the road to Paradise… could you really not listen to him?",
      events:
        "Nuh and Lut were two great prophets who called people to worship Allah and to leave bad deeds behind. But the sad surprise is that the wife of Nuh and the wife of Lut were not believers! They did not believe their husbands, and they helped the wrongdoers against the believers. And because Allah is just, He holds every person to account for their own deeds, whoever their family may be. So when the punishment came upon the wrongdoers, the wife of Nuh was lost along with those who did not board the ship, and the wife of Lut was lost along with her people, because she chose the path of wrong.",
      lesson:
        "Every person is responsible for what they do. Coming from a good family will not help us if our own deeds are bad. We must always choose our friends and our path carefully.",
      next:
        "And with that we have finished the stories of the women in the Quran. In the collections to come we will begin the stories of the prophets and messengers!",
      challenge: {
        question: "Did being close to a prophet help the wives of Nuh and Lut?",
        options: ["Yes, it did", "No, because they betrayed", "The Quran does not say"],
        correctAnswer: 1,
      },
      reward: {
        icon: "🚪",
        badge: "My own deeds are what help me",
        keepsake: "A closed door",
        note: "A reminder that lineage is no help without deeds — every soul has what it earned.",
      },
    },
    image: "/stories/nuh_lut.jpg",
    title: "امرأة نوح وامرأة لوط",
    surahName: "التحريم",
    hook: "تخيلوا أن يكون زوجكم نبيًا يعلمه الله كل شيء، ويدل الناس على طريق الجنة… هل يعقل ألا تسمعوا كلامه؟",
    events: "سيدنا نوح وسيدنا لوط كانا نبيين عظيمين يدعوان الناس لعبادة الله وترك الأفعال السيئة. لكن المفاجأة الحزينة أن امرأة نوح وامرأة لوط لم تكونا مؤمنتين! كانتا لا تصدقان زوجيهما، وتساعدان الأشرار ضد المؤمنين. ولأن الله عادل، فإنه يحاسب كل شخص على أفعاله، بغض النظر عن عائلته. لذلك، عندما جاء العذاب للأشرار، هلكت امرأة نوح مع الذين لم يركبوا السفينة، وهلكت امرأة لوط مع قومها لأنها اختارت طريق الشر.",
    lesson: "كل إنسان مسؤول عن أفعاله. لن ينفعنا أن نكون من عائلة طيبة إذا كانت أفعالنا نحن سيئة. يجب أن نختار دائمًا أصدقاءنا وطريقنا بشكل صحيح.",
    next: "وهكذا انتهينا من قصص النساء في القرآن. في المجموعات القادمة سنبدأ بقصص الأنبياء والرسل!",
    ayah: { ref: "66:10", surah: 66, number: 10, text: "ضَرَبَ ٱللَّهُ مَثَلًۭا لِّلَّذِينَ كَفَرُوا۟ ٱمْرَأَتَ نُوحٍۢ وَٱمْرَأَتَ لُوطٍۢ ۖ كَانَتَا تَحْتَ عَبْدَيْنِ مِنْ عِبَادِنَا صَـٰلِحَيْنِ فَخَانَتَاهُمَا" },
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، سورة التحريم: 10", en: "The Quran, Surah At-Tahrim: 10" },
      note: { ar: "ضربهما مثلاً للذين كفروا، وأن القرابة لا تنفع مع الخيانة، بنص الآية.", en: "They are set as an example of those who disbelieved, and that closeness does not help where there is betrayal — the verse's own words." },
    },
    challenge: {
      question: "هل نفعت القرابة امرأة نوح وامرأة لوط؟",
      options: ["نعم نفعتهما", "لا، لأنهما خانتا", "لم يذكر القرآن ذلك"],
      correctAnswer: 1,
    },
    reward: {
      icon: "🚪",
      badge: "عملي هو الذي ينفعني",
      keepsake: "باب مغلق",
      note: "يذكّرك أن النسب لا ينفع بلا عمل، وأن لكل نفس ما كسبت.",
    },
  },
];

/** A story's prose in the requested language, falling back to Arabic. */
export const storyTextFor = (story: Story, locale: "ar" | "en"): StoryText =>
  locale === "en" && story.en
    ? story.en
    : {
        title: story.title,
        hook: story.hook,
        events: story.events,
        lesson: story.lesson,
        next: story.next,
        quranProse: story.quranProse,
        challenge: story.challenge,
        reward: story.reward,
        arc: story.arc,
      };

/** The question and the medal in the reader's language, falling back to the
 *  Arabic when a chapter's translation has not landed yet. */
export const storyChallengeFor = (story: Story, locale: "ar" | "en"): StoryChallenge =>
  (locale === "en" ? story.en?.challenge : undefined) ?? story.challenge;

export const storyRewardFor = (story: Story, locale: "ar" | "en"): StoryReward =>
  (locale === "en" ? story.en?.reward : undefined) ?? story.reward;

/** The rest of the arc in the reader's language, or nothing where this story
 *  has not been rewritten to the standard yet. English falls back to the
 *  Arabic arc only when the English prose itself is falling back. */
export const storyArcFor = (story: Story, locale: "ar" | "en"): StoryArc | undefined =>
  locale === "en" && story.en ? story.en.arc : story.arc;

/**
 * Roughly how long this story takes a child to read, in minutes.
 *
 * Authored reading times go stale the moment anyone edits a paragraph, so this
 * counts the words that are actually on the page. 120 words a minute is slow
 * for an adult and about right for a seven-year-old reading aloud, and the
 * number is rounded up so it never promises less than it costs.
 */
export const storyMinutes = (story: Story, locale: "ar" | "en"): number => {
  const text = storyTextFor(story, locale);
  const arc = storyArcFor(story, locale);
  const parts = [
    text.hook, text.events, text.lesson, text.quranProse ?? "",
    arc?.setting ?? "", arc?.keyMoment ?? "", arc?.resolution ?? "",
    ...(arc?.lessons ?? []), arc?.think ?? "", arc?.tryToday ?? "",
  ];
  const words = parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 120));
};
