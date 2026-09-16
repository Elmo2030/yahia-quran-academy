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
        "Have you ever tried sleeping and waking up to find everything around you has changed? In our story today, a group of good young men slept for a very long time... not for a day or two, but for hundreds of years! How did that happen?",
      events:
        "In ancient times, there was a cruel, pagan king who forced people to worship statues. But there was a group of smart young men who believed in Allah alone. Fearing for their faith and their lives from the evil king, they ran away and hid in a cave with their loyal dog. Inside the cave, Allah cast a deep sleep over them, and they slept peacefully for 309 lunar years! Allah protected their bodies all this time by turning them to the right and left. When they woke up and felt hungry, they sent one of them to buy food, only to discover that the evil king had died a long, long time ago, and their entire city now worshipped Allah!",
      lesson:
        "The story of the People of the Cave is a wonderful proof of Allah's power to bring the dead back to life. We also learn from it that Allah always rescues and protects the youth who choose the path of faith and monotheism.",
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
    },
    title: "قصة أصحاب الكهف",
    surahName: "",
    hook: "هل جربتم يوماً أن تناموا وتستيقظوا لتجدوا أن كل شيء من حولكم قد تغير؟ في قصتنا اليوم، هناك مجموعة من الشباب الطيبين ناموا نومة طويلة جداً.. لم تكن ليوم أو يومين، بل لمئات السنين! كيف حدث ذلك؟",
    events: "في زمان قديم، كان هناك ملك وثني ظالم يجبر الناس على عبادة الأصنام. لكن كان هناك مجموعة من الفتية (الشباب) الأذكياء الذين آمنوا بالله وحده. ولأنهم خافوا على دينهم وأنفسهم من الملك الشرير، هربوا بعيداً واختبأوا في كهف ومعهم كلبهم الوفي. وفي الكهف، ألقى الله عليهم النوم، فناموا بسلام لمدة 309 سنين قمرية! كان الله يحفظ أجسادهم طوال هذه المدة بقلبهم يميناً ويساراً. ولما استيقظوا وشعروا بالجوع، أرسلوا أحدهم ليشتري طعاماً، فاكتشفوا أن الملك الظالم قد مات منذ زمن طويييل، وأن مدينتهم أصبحت كلها تعبد الله!",
    quranProse: "يقول الله تعالى في القرآن عن نومهم العجيب: {فَضَرَبْنَا عَلَىٰ آذَانِهِمْ فِي الْكَهْفِ سِنِينَ عَدَدًا}. (أي ألقينا عليهم نوماً عميقاً).",
    lesson: "قصة أصحاب الكهف هي دليل رائع على قدرة الله على إحياء الموتى والبعث. ونتعلم منها أيضاً أن الله ينقذ ويحمي دائماً الشباب الذين يختارون طريق الإيمان والتوحيد.",
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
  },
  {
    chapter: "nations", slug: "luqman",
    image: "/stories/nations/luqman.jpg",
    en: {
      title: "Luqman the Wise",
      hook:
        "If you want to be successful and loved, where do you get advice from? From a 'wise' person, of course! Today we will learn about a very wise father, mentioned by Allah in the Quran so we can learn from the advice he gave his son.",
      events:
        "Luqman was not a prophet, but a very righteous human being. Allah gave him a great blessing called 'Wisdom', which is to think correctly and say useful words at the right time. Luqman sat with his young son one day to give him great advice; he told him: O my son, never associate partners with Allah, keep up your prayers, be dutiful and obedient to your parents, do not walk among people with arrogance or pride, and speak with a calm and moderate voice.",
      lesson:
        "True wisdom begins with believing in Allah and thanking Him for His blessings. We learn from Luqman's advice to respect our parents, to be humble and not act arrogantly towards anyone, because Allah does not like the arrogant.",
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
    },
    title: "قصة لقمان الحكيم",
    surahName: "",
    hook: "إذا أردتم أن تكونوا ناجحين ومحبوبين، فمن أين تأخذون النصائح؟ من شخص 'حكيم' طبعاً! واليوم سنتعرف على أب حكيم جداً، ذكره الله في القرآن لنتعلم من نصائحه التي قدمها لابنه.",
    events: "لقمان لم يكن نبياً، بل كان رجلاً بشرياً صالحاً جداً. أعطاه الله نعمة كبيرة تُسمى 'الحكمة'، وهي أن يفكر بعقله بشكل صحيح ويقول الكلام المفيد في الوقت المناسب. جلس لقمان يوماً مع ابنه الصغير ليقدم له وصايا عظيمة؛ فقال له: يا بني، لا تشرك بالله أبداً، وحافظ على صلاتك، وكن باراً بوالديك ومطيعاً لهما، ولا تمشِ بين الناس متكبراً أو مغروراً، وتحدث بصوت هادئ ومعتدل.",
    quranProse: "يقول الله تعالى عن إعطائه الحكمة للقمان: {وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ}.",
    lesson: "الحكمة الحقيقية تبدأ بالإيمان بالله وشكره على نعمه. ونتعلم من نصائح لقمان أن نحترم والدينا، وأن نكون متواضعين ولا نتكبر على أحد، لأن الله لا يحب المغرورين.",
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
  },
  {
    chapter: "nations", slug: "dhul-qarnayn",
    image: "/stories/nations/dhul-qarnayn.jpg",
    en: {
      title: "The Story of Dhul-Qarnayn",
      hook:
        "Do you love stories of powerful kings who travel to discover the world? Our hero today is a very strong and just king who traveled to very far places in the East and West to help people and spread goodness.",
      events:
        "Dhul-Qarnayn was a just ruler whom Allah established on earth and gave him the means (power, knowledge, and tools) to everything. Dhul-Qarnayn traveled across the eastern and western parts of the earth. On one of his journeys, he reached a weak group of people living between two mountains. They complained to him about evil people named (Gog and Magog) who were spreading corruption in the land. Dhul-Qarnayn decided to use his power and engineering to help them. He asked them to bring huge pieces of iron and molten copper, and he built for them a very massive and strong barrier that prevented the evil ones from reaching them.",
      lesson:
        "If Allah gives us power, money, or knowledge, we must use it to support the weak and help others, just exactly as the just ruler Dhul-Qarnayn did.",
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
    },
    title: "قصة ذو القرنين",
    surahName: "",
    hook: "هل تحبون قصص الملوك الأقوياء الذين يسافرون لاكتشاف العالم؟ بطلنا اليوم هو مَلِك عادل وقوي جداً، سافر إلى أماكن بعيدة جداً في الشرق والغرب لمساعدة الناس ونشر الخير.",
    events: "ذو القرنين هو حاكم عادل مكنه الله في الأرض وأعطاه من كل شيء سبباً (أي أعطاه القوة والعلم والأدوات). طاف ذو القرنين مشارق الأرض ومغاربها. وفي إحدى رحلاته، وصل إلى قوم ضعفاء يعيشون بين جبلين، واشتكوا له من أشرار اسمهم (يأجوج ومأجوج) يفسدون في الأرض. قرر ذو القرنين أن يستخدم قوته وهندسته لمساعدتهم، وطلب منهم أن يحضروا قطعاً ضخمة من الحديد والنحاس المذاب، وبنى لهم سداً عظيماً جداً وقوياً يمنع الأشرار من الوصول إليهم.",
    quranProse: "يقول الله تعالى عن هذا السد القوي الذي بناه ذو القرنين: {فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا}. (أي لم يستطع الأشرار أن يتسلقوه أو يثقبوه).",
    lesson: "إذا أعطانا الله القوة أو المال أو العلم، يجب أن نستخدمه في نصرة المستضعفين ومساعدة الآخرين، تماماً كما فعل الحاكم العادل ذو القرنين.",
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
  },
  {
    chapter: "nations", slug: "believer-of-pharaoh",
    image: "/stories/nations/believer-of-pharaoh.jpg",
    en: {
      title: "The Believer of Pharaoh's Family",
      hook:
        "Does a person need a sword to be brave? Sometimes a word is stronger than a sword! Our hero today is a single man who stood before the most dangerous and unjust king in history to speak the truth and defend the Prophet of Allah.",
      events:
        "In the palace of the unjust Pharaoh, who claimed to be a god, there was a good man who hid his faith and didn't tell anyone about it. When Pharaoh got angry and decided to kill Prophet Musa (Moses), this believing man did not stay silent! He stood bravely among all of Pharaoh's guards and used logic and reason to defend Musa. He told them: 'Would you kill a good man just because he says (My Lord is Allah)? And he has come to you with miracles and clear proofs?' He reminded them that injustice would lead to their destruction. So, Allah protected him from Pharaoh's anger and evil plot.",
      lesson:
        "True bravery is the courage to speak up and defend the oppressed and the prophets. We learn that Allah always stands with those who defend the truth, even if they are alone against an entire army.",
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
    },
    title: "قصة مؤمن آل فرعون",
    surahName: "",
    hook: "هل يحتاج الإنسان إلى سيف ليكون شجاعاً؟ أحياناً تكون الكلمة أقوى من السيف! بطلنا اليوم رجل واحد وقف أمام أخطر وأظلم ملك في التاريخ ليقول كلمة حق ويدافع عن نبي الله.",
    events: "في قصر فرعون الظالم الذي كان يدّعي أنه إله، كان هناك رجل طيب يكتم إيمانه ولا يخبر أحداً به. وعندما غضب فرعون وقرر أن يقتل سيدنا موسى عليه السلام، لم يسكت هذا الرجل المؤمن! وقف بشجاعة وسط كل حراس فرعون، واستخدم المنطق والعقل ليدافع عن موسى، وقال لهم: هل تقتلون رجلاً طيباً فقط لأنه يقول (ربي الله)؟ وقد جاءكم بالمعجزات والأدلة الواضحة؟ وذكّرهم بأن الظلم سيؤدي بهم إلى الهلاك. فحماه الله من غضب فرعون ومكره.",
    quranProse: "يقول الله تعالى واصفاً شجاعة هذا الرجل: {وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ}.",
    lesson: "الشجاعة الحقيقية هي شجاعة الكلمة والدفاع عن المظلومين والأنبياء. ونتعلم أن الله يقف دائماً مع من يدافع عن الحق حتى لو كان وحده أمام جيش كامل.",
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
  },
  {
    chapter: "nations", slug: "ashab-al-ukhdud",
    image: "/stories/nations/ashab-al-ukhdud.jpg",
    en: {
      title: "The People of the Ditch",
      hook:
        "What is the most precious thing you own? For the heroes in our story today, their faith in Allah was more precious than their own lives! Today's story is full of steadfastness and great challenge against a tyrant king.",
      events:
        "There was a tyrant and evil king who wanted people to worship only him. But the righteous believers refused to give up monotheism and their belief in the true God. The king got very angry and ordered his soldiers to dig deep trenches (ditches) in the ground and light a massive fire in them! The king gave the believers a choice: either leave your religion or be thrown into the fire. With great courage and amazing faith, the believers chose to be thrown into the fire rather than disbelieve in Allah. Even though their bodies perished, their souls triumphed and ascended to Paradise happily.",
      lesson:
        "We learn from this story the power of great faith; the victory of the soul and belief is much more important than the survival of the body. We also learn that Allah sees everything the evil ones do and will punish them, and He will reward the believers with Paradise.",
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
    },
    title: "قصة أصحاب الأخدود",
    surahName: "",
    hook: "ما هو أغلى شيء تملكونه؟ بالنسبة للأبطال في قصتنا اليوم، كان إيمانهم بالله أغلى من حياتهم نفسها! قصة اليوم مليئة بالصمود والتحدي العظيم أمام ملك جبار.",
    events: "كان هناك ملك جبار وشرير يريد من الناس أن يعبدوه هو فقط. لكن المؤمنين الصالحين رفضوا التخلي عن التوحيد والإيمان بالله الحقيقي. غضب الملك غضباً شديداً، وأمر جنوده بحفر خنادق عميقة في الأرض (أخاديد) وأشعل فيها ناراً ضخمة جداً! خيّر الملك المؤمنين: إما أن تتركوا دينكم أو تُرموا في النار. وبشجاعة عظيمة وصمود عقدي مذهل، اختار المؤمنون أن يُلقوا في النار على أن يكفروا بالله. ورغم أن أجسادهم فنيت، إلا أن أرواحهم انتصرت وصعدت إلى الجنة بسعادة.",
    quranProse: "يقول الله تعالى عنهم في سورة البروج: {قُتِلَ أَصْحَابُ الْأُخْدُودِ * النَّارِ ذَاتِ الْوَقُودِ}. (أي لُعن الأشرار الذين حفروا الأخدود وأشعلوا فيه النار).",
    lesson: "نتعلم من هذه القصة قوة الصمود العقدي العظيم؛ فانتصار الروح والعقيدة أهم بكثير من فناء الجسد. ونتعلم أن الله يرى كل ما يفعله الأشرار وسيعاقبهم، وسيكافئ المؤمنين بالجنة.",
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
  },
  {
    chapter: "nations", slug: "qarun",
    image: "/stories/nations/qarun.jpg",
    en: {
      title: "The Story of Qarun",
      hook:
        "Imagine someone owning so many boxes of treasure and gold that just the keys to these boxes needed very strong men to carry them! Did this much money make him a good or bad person? Let's find out in the story of Qarun.",
      events:
        "Qarun was a man who lived during the time of Prophet Musa (Moses). Allah had given him enormous wealth and treasures. But Qarun was afflicted with the temptation of wealth and arrogance! Instead of thanking Allah for these blessings and helping the poor, he acted arrogantly towards them. He claimed that his massive wealth came from his own effort, his pure knowledge, and because he was very smart. Good people advised him to be humble and not to be arrogant, but he refused. So, his punishment was that Allah caused the earth to swallow him and his grand palace. The earth swallowed all his money and arrogance in a single moment!",
      lesson:
        "Wealth and intelligence are gifts from Allah. We learn from Qarun that it is wrong to rely only on material reasons without thanking Allah (The Provider). We must be humble and help others with what Allah has given us.",
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
    },
    title: "قصة قارون",
    surahName: "",
    hook: "تخيلوا شخصاً يملك صناديق من الكنوز والذهب كثيرة جداً، لدرجة أن مفاتيح هذه الصناديق وحدها تحتاج إلى رجال أقوياء جداً لحملها! هل هذا المال الكثير جعله إنساناً طيباً أم شريراً؟ تعالوا نتعرف على قصة قارون.",
    events: "قارون كان رجلاً يعيش في زمن سيدنا موسى، وقد أعطاه الله أموالاً وكنوزاً هائلة. لكن قارون أصيب بفتنة المال والغرور العلمي! بدلاً من أن يشكر الله على هذه النعم ويساعد الفقراء، تكبر عليهم، وادعى أن ثروته الهائلة جاءت بجهده وعلمه الخالص وأنه ذكي جداً. نصحه الناس الطيبون أن يتواضع ولا يغتر، لكنه رفض. فكان عقابه أن خسف الله به وبقصره العظيم الأرض، فابتلعت الأرض كل أمواله وغروره في لحظة واحدة!",
    quranProse: "يقول الله تعالى يصف غرور قارون: {قَالَ إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي}. (أي كان يظن أنه حصل على المال بذكائه فقط وليس من فضل الله).",
    lesson: "المال والذكاء هي هدايا من الله. ونتعلم من قارون بطلان الاعتماد على الأسباب المادية فقط دون شكر الله (المُسبب). يجب أن نكون متواضعين ونساعد الآخرين بما أعطانا الله.",
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
  },
  {
    chapter: "nations", slug: "samiri",
    image: "/stories/nations/samiri.jpg",
    en: {
      title: "The Story of the Samiri",
      hook:
        "Can a statue made of gold speak or benefit anyone? Of course not! But in our story today, there is a deceitful man who took advantage of the Prophet's absence to make a strange statue to trick the people.",
      events:
        "When Prophet Musa went to receive Allah's commands, a man named 'The Samiri' took advantage of his absence to deceive the people. The Samiri gathered the jewelry and gold of the Children of Israel and made a statue in the shape of a calf (a small cow). He made it hollow in a way that let the air enter it and make a sound (a calf's body that lowed). The Samiri falsely made the people believe that this calf was their god! When Prophet Musa returned, he was extremely angry at this deviation and invention, and he destroyed the calf. As for the Samiri, his punishment was absolute social isolation in this worldly life; he lived alone and outcast, saying to anyone who came near him, 'Touch me not'.",
      lesson:
        "We must not believe deceivers or follow wrong ideas (innovations). Allah Almighty is not a statue; He is the Great Creator whom nothing resembles. The consequence of a deceiver is always loneliness and a bad end.",
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
    },
    title: "قصة السامري",
    surahName: "",
    hook: "هل يمكن لتمثال مصنوع من الذهب أن يتحدث أو ينفع أحداً؟ بالطبع لا! لكن في قصتنا اليوم، هناك رجل مخادع استغل غياب النبي ليصنع تمثالاً عجيباً يخدع به الناس.",
    events: "عندما ذهب سيدنا موسى ليتلقى أوامر الله، استغل رجل يُدعى 'السامري' غيابه ليقوم بخداع الناس. جمع السامري حُليّ وذهب بني إسرائيل، وصنع منه تمثالاً على شكل عجل (بقرة صغيرة)، وجعله مجوفاً بطريقة تجعل الهواء يدخل فيه فيصدر صوتاً (عجلاً جسداً له خوار). أوهم السامري الناس كذباً بأن هذا العجل هو إلههم! وعندما عاد سيدنا موسى، غضب غضباً شديداً من هذا الانحراف العقدي والابتداع، فقام بتدمير العجل. أما السامري، فكان عقابه النبذ الاجتماعي المطلق في الحياة الدنيا، حيث أصبح يعيش وحيداً ومطروداً ويقول لكل من يقترب منه 'لا مِساس' (أي لا تلمسني).",
    quranProse: "يقول الله تعالى عن صنيع هذا المخادع: {فَأَخْرَجَ لَهُمْ عِجْلًا جَسَدًا لَّهُ خُوَارٌ فَقَالُوا هَٰذَا إِلَٰهُكُمْ وَإِلَٰهُ مُوسَىٰ فَنَسِيَ}.",
    lesson: "يجب ألا نصدق المخادعين أو نتبع الأفكار الخاطئة (الابتداع). الله سبحانه وتعالى ليس تمثالاً، بل هو الخالق العظيم الذي لا يشبهه شيء. وعاقبة المخادع دائماً هي الوحدة وسوء الخاتمة.",
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
  },
  {
    chapter: "nations", slug: "talut-and-jalut",
    image: "/stories/nations/talut-and-jalut.jpg",
    en: {
      title: "Talut and Jalut (Saul and Goliath)",
      hook:
        "If you wanted to choose a team leader, who would you choose? Would you choose the person who has many toys, or the person who is smart and strong? Today's story will teach us how Allah chose a king to lead the army of believers.",
      events:
        "In ancient times, the Children of Israel asked to have a king to lead them in battle against a large polytheist army led by a giant tyrant named 'Jalut' (Goliath). So, Allah chose for them a good man named 'Talut' (Saul). The people were surprised because Talut was not rich! But Allah chose him not for his money, but because Allah gave him an increase in knowledge and bodily strength, establishing the true standards of leadership. Talut tested his soldiers with a river to separate the bad from the good, forbidding them to drink from it except a little. In the end, by the grace of Allah and then the bravery of Talut and his soldiers, the small believing group defeated the large polytheist army led by Jalut.",
      lesson:
        "Leadership and success require knowledge and physical strength, not just lots of money. We also learn that a small group that obeys Allah can defeat a large group by Allah's permission.",
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
    },
    title: "قصة طالوت وجالوت",
    surahName: "",
    hook: "إذا أردتم اختيار قائد للفريق، من تختارون؟ هل تختارون الشخص الذي يملك ألعاباً كثيرة، أم تختارون الشخص الذكي والقوي؟ قصة اليوم ستعلمنا كيف اختار الله ملكاً ليقود جيش المؤمنين.",
    events: "في زمان قديم، طلب بنو إسرائيل أن يكون لهم ملك ليقودهم في المعركة ضد جيش مشرك وكبير بقيادة رجل جبار اسمه 'جالوت'. فاختار الله لهم رجلاً طيباً اسمه 'طالوت'. تعجب الناس لأن طالوت لم يكن غنياً! لكن الله اختاره لا لماله، بل لأن الله أعطاه بسطة (زيادة) في العلم وقوة في الجسم لتؤسس القصة لمعايير القيادة الحقيقية. واختبر طالوت جنوده بنهر ليميز الخبيث من الطيب، ومنعهم من الشرب منه إلا قليلاً. وفي النهاية، بفضل الله ثم شجاعة طالوت وجنوده، انتصرت الفئة القليلة المؤمنة على الفئة الكثيرة المشركة بقيادة جالوت.",
    quranProse: "يقول الله تعالى يعلمنا سبب اختيار طالوت: {إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ}.",
    lesson: "القيادة والنجاح يحتاجان إلى العلم والمعرفة والقوة البدنية، وليس فقط إلى كثرة المال. كما نتعلم أن الفئة القليلة التي تطيع الله يمكنها أن تهزم الفئة الكبيرة بإذن الله.",
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
  },
  {
    chapter: "nations", slug: "ashab-ar-rass",
    image: "/stories/nations/ashab-ar-rass.jpg",
    en: {
      title: "The People of the Well (Ashab ar-Rass)",
      hook:
        "Do you remember the dark well where Prophet Yusuf was thrown? What if there were evil people who did the same thing to their prophet and refused to listen to his words? This is the scary story of the People of the Well!",
      events:
        "The word 'Ar-Rass' in the Arabic language means an unlined well (one without a built wall). The People of the Well were an evil nation mentioned in the Holy Quran alongside the peoples of 'Aad and Thamud. These people used to worship idols and trees instead of Allah. When Allah sent them a good prophet to teach them the path of goodness, they didn't just refuse his words, but they denied him, and historical accounts say they buried their prophet alive in the well. Because they committed this heinous act of denying and harming their messenger, Allah destroyed them completely, and the earth swallowed them.",
      lesson:
        "Harming good people and teachers who advise us is a very great sin. The Quranic context confirms that whoever denies the messengers and insists on harming them, Allah will punish them severely and remove their trace.",
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
    },
    title: "قصة أصحاب الرس",
    surahName: "",
    hook: "هل تذكرون البئر المظلمة التي أُلقي فيها سيدنا يوسف؟ ماذا لو كان هناك قوم أشرار فعلوا نفس الشيء بنبيهم ورفضوا أن يسمعوا كلامه؟ هذه هي القصة المخيفة لأصحاب الرس!",
    events: "كلمة 'الرّس' في اللغة تعني البئر غير المطوية (التي ليس لها جدار مبني). أصحاب الرس كانوا قوماً أشراراً اقترن ذكرهم في القرآن الكريم بقوم عاد وثمود. كان هؤلاء القوم يعبدون الأصنام والأشجار من دون الله (كما تشير بعض الروايات التاريخية حول هويتهم). وعندما أرسل الله إليهم نبياً طيباً ليعلمهم طريق الخير، لم يكتفوا برفض كلامه، بل كذبوه، وتقول الروايات إنهم رسوا (أي دفنوا) نبيهم حياً في البئر. ولأنهم فعلوا هذا الفعل الشنيع لتكذيبهم لرسلهم، أهلكهم الله بعذاب الاستئصال، وخسف بهم الأرض.",
    quranProse: "يقول الله تعالى محذراً من مصيرهم: {وَعَادًا وَثَمُودَ وَأَصْحَابَ الرَّسِّ وَقُرُونًا بَيْنَ ذَلِكَ كَثِيرًا}.",
    lesson: "إيذاء الناس الطيبين والمعلمين الذين ينصحوننا هو ذنب كبير جداً. السياق القرآني يؤكد أن من يكذب الرسل ويصر على الأذى، فإن الله يعاقبه بشدة ويزيل أثره.",
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
  },
  {
    chapter: "prophets", slug: "adam",
    en: {
      title: "Prophet Adam, the First Human",
      hook:
        "Have you ever wondered who the very first human on Earth was? How did life begin for people? Let's travel back to the very beginning to meet the father of all humanity!",
      events:
        "Allah created Prophet Adam from dust and breathed life into him. Allah taught Adam the names of everything, making him very smart! Allah told the angels to bow down to Adam out of respect. All the angels obeyed, but a jinn named Iblis (Satan) refused because he was arrogant. Allah let Adam and his wife Hawwa (Eve) live in a beautiful Paradise. He told them they could eat anything except from one specific tree. But Iblis tricked them into eating from it. They felt very sorry and asked Allah for forgiveness. Allah is The Most Forgiving; He forgave them and sent them to Earth to start human life and spread goodness.",
      lesson:
        "We learn that if we make a mistake, we should immediately say we are sorry and ask Allah for forgiveness, just like Prophet Adam did.",
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
    },
    image: "/stories/prophets/adam.jpg",
    title: "قصة سيدنا آدم (أبو البشر)",
    surahName: "",
    hook: "هل سألتم أنفسكم يوماً كيف بدأ وجود الإنسان على الأرض؟ ومن هو أول إنسان خلقه الله؟ تعالوا نسافر بالزمن إلى البداية تماماً، لنتعرف على قصة أبينا سيدنا آدم، أول إنسان وأول نبي!",
    events: "في البداية، خلق الله سبحانه وتعالى سيدنا آدم بيده من تراب وطين. ولأن الله يحب آدم، علمه أسماء كل شيء، وأمر الملائكة أن تسجد له احتراماً. سجدت كل الملائكة فوراً، لكن كان هناك مخلوق شرير اسمه 'إبليس' تكبر ورفض أن يسجد لأنه مخلوق من نار وظن أنه أفضل من آدم. أسكن الله آدم وزوجته الجنة الجميلة ليأكلا منها ما يشاءان، إلا شجرة واحدة منعهما منها. لكن إبليس الشرير وسوس لهما حتى أكلا من الشجرة. حزن آدم جداً وبكى لأنه لم يسمع كلام الله، واعتذر لربه، فسامحه الله الرحيم، وأنزله إلى الأرض ليعمرها ويبنيها ويكون 'خليفة' فيها.",
    quranProse: "يقول الله تعالى في القرآن الكريم يعلمنا كيف اعتذر سيدنا آدم: {قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ}.",
    lesson: "تعلمنا قصة سيدنا آدم درساً مهماً جداً: كلنا قد نخطئ وننسى، ولكن الإنسان الطيب هو الذي يعترف بخطئه فوراً، ويعتذر لله، والله دائماً يسامح من يعتذر بصدق.",
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
  },
  {
    chapter: "prophets", slug: "idris",
    en: {
      title: "Prophet Idris, the First to Write",
      hook:
        "Do you like using a pen to write or draw? Did you know there was a prophet who was the very first person in history to write with a pen? Let's discover his amazing story!",
      events:
        "Prophet Idris was a very smart and hardworking prophet. He loved learning and teaching people good things. He was the first person in history to write with a pen, and the first to sew clothes and wear them! Before him, people used to wear animal skins. Because he was so righteous, always remembering Allah, and working hard to spread knowledge, Allah honored him greatly and raised him to a very high place in the heavens.",
      lesson:
        "Allah loves those who learn new things, invent useful tools like clothes and writing, and use their knowledge to help others.",
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
    },
    image: "/stories/prophets/idris.jpg",
    title: "قصة سيدنا إدريس",
    surahName: "",
    hook: "هل تحبون قول الصدق دائماً؟ نبينا اليوم كان مشهوراً جداً بصدقه، وكان يعلم الناس أشياء مفيدة جداً في حياتهم. فمن هو هذا النبي الطيب؟ تعالوا نتعرف على سيدنا إدريس.",
    events: "جاء سيدنا إدريس عليه السلام بعد سيدنا آدم وسيدنا شيث. كان رجلاً طيباً يحب الله كثيراً، وكان دائماً يقول الصدق للناس ولا يكذب أبداً، لذلك سماه الله 'صِدِّيقاً'. كان سيدنا إدريس يدعو الناس لعبادة الله وحده، ويعلمهم الأخلاق الجميلة. ولأن الله كان يحبه كثيراً لصدقه وعمله الصالح، كافأه مكافأة عظيمة جداً، ورفعه إلى مكانة عالية ومرتفعة في السماء.",
    quranProse: "يقول الله تعالى في القرآن يمدح سيدنا إدريس: {وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا}.",
    lesson: "الصدق صفة يحبها الله جداً. إذا كنا صادقين مع عائلتنا وأصدقائنا، سيرفعنا الله درجات عالية، ويجعل الناس يحبوننا ويثقون بنا دائماً.",
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
  },
  {
    chapter: "prophets", slug: "nuh",
    en: {
      title: "Prophet Nuh and the Great Ark",
      hook:
        "Imagine building a giant ship on a mountain where there is no water at all! People would think it's crazy, right? But our prophet today did exactly that because he trusted Allah.",
      events:
        "Prophet Nuh (Noah) patiently advised his people to do good and worship Allah for 950 years! But most of them were stubborn and made fun of him. Allah commanded Nuh to build a huge wooden ship (an Ark). When the time came, water poured down from the sky and gushed from the ground, causing a great flood. Nuh took the believers and a pair of every kind of animal onto the Ark. The believers and the animals were saved, while the bad people who refused to listen were washed away. The ship finally rested safely on a mountain.",
      lesson:
        "We must always be patient, never give up on doing good, and trust Allah's commands even if other people make fun of us.",
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
    },
    image: "/stories/prophets/nuh.jpg",
    title: "قصة سيدنا نوح (شيخ المرسلين)",
    surahName: "",
    hook: "تخيلوا معي.. رجل عجوز وطيب جداً، يجمع الأخشاب ويبني سفينة عملاااااقة في وسط الصحراء الرملية! لا يوجد بحر ولا نهر! وكلما مر عليه الناس ضحكوا منه.. فهل كان مخطئاً؟ تعالوا نتعرف على قصة شيخ المرسلين، سيدنا نوح.",
    events: "سيدنا نوح هو أول رسول يُبعث إلى أهل الأرض بعد أن بدأ الناس يعبدون الأصنام. ظل سيدنا نوح ينصح قومه لفترة طويييييلة جداً، ألف سنة إلا خمسين عاماً، يدعوهم في الليل والنهار، والسر والعلن! لكنهم كانوا يضعون أصابعهم في آذانهم ويغطون وجوههم بملابسهم حتى لا يسمعوه. أمر الله نوحاً أن يبني سفينة ضخمة. ولما انتهى منها، أمره الله أن يأخذ معه المؤمنين، وزوجين من كل نوع من الحيوانات. وفجأة، نزل مطر غزير جداً وانفجرت الأرض بالماء (الطوفان العظيم)! غرق كل الأشرار الذين سخروا منه، وحتى ابن نوح غرق لأنه لم يسمع كلام أبيه، ونجا المؤمنون والحيوانات في السفينة بأمان.",
    quranProse: "يقول الله تعالى يصف لنا المدة الطويلة التي قضاها سيدنا نوح مع قومه: {فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا فَأَخَذَهُمُ الطُّوفَانُ وَهُمْ ظَالِمُونَ}.",
    lesson: "نتعلم من سيدنا نوح 'الصبر' العظيم، فقد صبر مئات السنين ولم ييأس! ونتعلم أيضاً ألا نسخر من أحد، وأن نسمع كلام الله وكلام والدينا دائماً حتى نكون في أمان.",
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
  },
  {
    chapter: "prophets", slug: "hud",
    en: {
      title: "Prophet Hud and the Strong Nation",
      hook:
        "Have you ever seen super tall buildings? Today we'll talk about people who were incredibly tall and strong, and built massive stone towers. But did their strength save them?",
      events:
        "Prophet Hud was sent to a nation called 'Aad. They were giants, very strong, and lived in a place called Iram, full of huge stone pillars. But instead of thanking Allah for their strength, they became arrogant bullies and worshipped statues. Prophet Hud kindly advised them, saying, 'Ask Allah for forgiveness, and He will make you even stronger!' But they laughed at him. So, Allah sent a severe, freezing wind that blew for seven nights and eight days, destroying the arrogant bullies, but saving Prophet Hud and the good believers.",
      lesson:
        "No matter how strong or smart we are, we should never be bullies. We must always be thankful to Allah for our strength and use it for good.",
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
    },
    image: "/stories/prophets/hud.jpg",
    title: "قصة سيدنا هود وقوم عاد",
    surahName: "",
    hook: "هل رأيتم أبطالاً خارقين في القصص يمتلكون قوة بدنية هائلة؟ في الماضي، كانت هناك قبيلة حقيقية قوية جداً، طوال القامة ويبنون بيوتاً ضخمة، لكنهم اغتروا بقوتهم وقالوا 'من أشد منا قوة؟'. فماذا حدث لهم؟ تعالوا نسمع قصة سيدنا هود.",
    events: "أرسل الله سيدنا هوداً إلى قبيلة اسمها (عاد)، كانوا يسكنون في منطقة جبال رملية تسمى الأحقاف. أعطاهم الله نعماً كثيرة وقوة بدنية هائلة، فصنعوا حضارة كبيرة. لكنهم بدلاً من أن يشكروا الله، صنعوا أصناماً وعبدوها. كان سيدنا هود ينصحهم بلطف ويقول لهم: اذكروا نعم الله عليكم واعبدوه. لكنهم سخروا منه واتهموه بالجنون والسفاهة. ولأنهم أصروا على العناد وتحدوا الله، أرسل الله عليهم رياحاً قوية جداً ومخيفة (ريحاً صرصراً عاتية) استمرت سبع ليال وثمانية أيام! دمرت الرياح بيوتهم وأهلكت الأشرار، ونجا سيدنا هود والمؤمنون الطيبون.",
    quranProse: "يقول الله تعالى: {وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ * سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا}.",
    lesson: "مهما كنا أقوياء أو أذكياء، يجب ألا نتكبر على الآخرين أو ننسى أن الله هو من أعطانا هذه القوة. الشكر المتواصل لله يحفظ لنا النعم.",
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
  },
  {
    chapter: "prophets", slug: "saleh",
    en: {
      title: "Prophet Salih and the Giant Camel",
      hook:
        "Can a giant, beautiful camel come out of a solid rock? For Allah, it's easy! Let's hear the amazing story of Prophet Salih and his stubborn people.",
      events:
        "After the people of 'Aad, came a nation called Thamud. They were amazing builders who carved their homes right into the mountains! Prophet Salih told them to worship Allah. They said they would only believe him if he could bring a pregnant, giant camel out of a solid rock. Salih prayed, and a magical camel stepped right out of the mountain! Salih told them to share their water with her and never hurt her. But they broke the promise and harmed the camel. Because of their cruelty, a mighty blast from the sky destroyed the bad people, and Salih and the believers were saved.",
      lesson:
        "We learn that we must keep our promises, be kind to animals, and never challenge Allah's miracles.",
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
    },
    image: "/stories/prophets/saleh.jpg",
    title: "قصة سيدنا صالح وقوم ثمود",
    surahName: "",
    hook: "هل تستطيعون الحفر في صخرة صلبة؟ هناك قوم في الماضي كانوا ينحتون بيوتاً كاملة وجميلة داخل الجبال الصخرية! لكنهم طلبوا من نبيهم أن يخرج لهم حيواناً كبيراً حياً من وسط الصخرة! كيف حدثت هذه المعجزة؟",
    events: "أرسل الله سيدنا صالحاً إلى قبيلة (ثمود)، وكانوا يعيشون في منطقة تسمى الحِجر. كانوا فنانين في نحت الصخور، لكنهم للأسف كانوا يعبدون الأصنام. طلبوا من سيدنا صالح معجزة لكي يصدقوه، فدعا الله، وانشقت صخرة كبيرة أمامهم وخرجت منها 'ناقة' جميلة وضخمة! فرح بعض الناس وآمنوا، وأمرهم سيدنا صالح ألا يؤذوا الناقة أبداً وأن يقتسموا معها ماء البئر. لكن الأشرار خططوا سراً وقاموا بقتل الناقة الطيبة! غضب الله لظلمهم وإيذائهم لمعجزته، فأرسل عليهم صوتاً عالياً ومخيفاً جداً (الصيحة) وزلزالاً (الرجفة)، فأهلك الأشرار جميعاً، ونجا سيدنا صالح ومن آمن معه.",
    quranProse: "يقول الله تعالى: {فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ}، أي سقطوا في بيوتهم بلا حراك.",
    lesson: "يجب أن نكون أوفياء بوعودنا، وأن نرحم الحيوانات ولا نؤذيها. فظلم الآخرين أو التعدي على حقوقهم يغضب الله كثيراً ويؤدي إلى النهاية السيئة.",
    next: "بعد هؤلاء الأنبياء العظماء، سيأتي نبي كريم جداً، لُقب بـ 'أبو الأنبياء'، وهو الذي بنى الكعبة المشرفة وحطم أصنام قومه وهو شاب صغير! هل عرفتموه؟ إنه خليل الرحمن، سيدنا إبراهيم!",
    source: {
      reliability: "🟢",
      reference: { ar: "القرآن الكريم، الأعراف: 73-79 وهود: 61-68 والشمس: 11-15", en: "The Quran, Al-A'raf: 73-79, Hud: 61-68, Ash-Shams: 11-15" },
      note: { ar: "الناقة وعقرها وعاقبة ثمود، كله بنص الآيات.", en: "The she-camel, its hamstringing and the end of Thamud are all in the verses." },
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
  },
  {
    chapter: "prophets", slug: "shuaib",
    en: {
      title: "Prophet Shu'ayb and the Honest Scales",
      hook:
        "Imagine going to a market to buy some delicious apples, but the seller tricks you and gives you less than what you paid for! Our prophet today tried to stop this bad cheating.",
      events:
        "Prophet Shu'ayb was an excellent speaker. He was sent to the people of Madyan, who were rich traders but very greedy. They used to cheat people by tampering with the weighing scales, giving them less and taking more. Prophet Shu'ayb told them to worship Allah and to be honest in their trade. He said, 'Do not cheat people out of their things!' But they laughed at him and threatened to kick him out of the city. Because they refused to be honest, a terrible earthquake and a dark cloud of punishment destroyed the cheaters, while Shu'ayb and the good people were saved.",
      lesson:
        "We must always be honest, especially when trading or sharing things. Cheating people and being greedy is a big sin that Allah dislikes.",
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
    },
    image: "/stories/prophets/shuaib.jpg",
    title: "قصة سيدنا شعيب (خطيب الأنبياء)",
    surahName: "",
    hook: "تخيلوا أن تذهبوا إلى السوق لتشتروا عشر تفاحات، فيقوم البائع بخداعكم ويعطيكم ثماني تفاحات فقط ويأخذ ثمن العشرة! هذا غش وتصرف سيء جداً، أليس كذلك؟ نبينا اليوم جاء ليعلم الناس كيف يكونون صادقين في البيع والشراء.",
    events: "أرسل الله سيدنا شعيباً إلى أهل مَدْيَن وإلى أصحاب الأيكة (والأيكة هي شجر كثير وكثيف كانوا يعبدونه من دون الله). كان سيدنا شعيب فصيحاً جداً ومرتباً في كلامه، ولذلك لُقب بـ 'خطيب الأنبياء'. كانت مشكلة قومه الأساسية هي الفساد الاقتصادي؛ فكانوا يغشون في الميزان، ويسرقون أموال الناس (يبخسون الناس أشياءهم)، ويقطعون الطرق لإخافة المسافرين. نصحهم سيدنا شعيب كثيراً وتحدث معهم بلطف، لكنهم كذبوه وأصروا على الغش وعبادة الشجر. فعاقبهم الله بعذاب اسمه (يوم الظُّلَّة)؛ حيث سلط عليهم حراً شديداً جداً، فخرجوا يبحثون عن ظل تحت سحابة كبيرة، فظنوا أنها ستحميهم، لكنها أمطرت عليهم ناراً فهلكوا جميعاً.",
    quranProse: "يقول الله تعالى عن عذابهم: {فَكَذَّبُوهُ فَأَخَذَهُمْ عَذَابُ يَوْمِ الظُّلَّةِ ۚ إِنَّهُ كَانَ عَذَابَ يَوْمٍ عَظِيمٍ}.",
    lesson: "الغش في البيع والشراء وأخذ أشياء لا نملكها هو أمر يغضب الله كثيراً. المسلم الحقيقي صادق وأمين، ولا يأخذ حق غيره أبداً.",
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
  },
  {
    chapter: "prophets", slug: "ibrahim",
    en: {
      title: "Prophet Ibrahim, the Friend of Allah",
      hook:
        "What would you do if everyone in your town, even your own father, worshipped statues they made with their own hands? Meet the brave young man who used his smart mind to prove them wrong!",
      events:
        "Prophet Ibrahim (Abraham) lived among people who worshipped stone idols and stars. From a young age, Ibrahim knew that statues couldn't hear or help anyone. One day, when the people were away, he smashed all their idols except the biggest one. When they returned and asked him who did it, he smartly pointed to the big idol and said, 'Ask him, if he can speak!' They realized statues couldn't talk or protect themselves. But instead of believing him, the angry king Namrud ordered Ibrahim to be thrown into a massive, roaring fire. But a great miracle happened! Allah commanded the fire to be cool and safe for Ibrahim. He walked out completely unhurt!",
      lesson:
        "Using our minds helps us understand the truth. We also learn that if we rely completely on Allah, He will protect us from any harm, just as He protected Ibrahim from the fire.",
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
    },
    image: "/stories/prophets/ibrahim.jpg",
    title: "قصة سيدنا إبراهيم (خليل الرحمن)",
    surahName: "",
    hook: "هل أنتم شجعان؟ هل تخافون من النار؟ بطل قصتنا اليوم هو شاب شجاع جداً، واجه ملكاً جباراً، ورُمي في نار ضخمة جداً، ولكن حدثت مفاجأة مذهلة جعلته يخرج منها سليماً يبتسم!",
    events: "سيدنا إبراهيم هو 'أبو الأنبياء'، كان ذكياً جداً واستخدم عقله ليعلم قومه أن الأصنام والكواكب لا تضر ولا تنفع. وفي يوم من الأيام، عندما ذهب قومه للاحتفال، دخل إبراهيم وكسر كل أصنامهم بشجاعة! غضب الملك 'النمرود' وقومه غضباً شديداً، وأشعلوا ناراً ضخمة جداً وألقوا سيدنا إبراهيم فيها. ولكن لأن إبراهيم كان يتوكل على الله، أمر الله النار ألا تحرقه، بل أن تكون برداً وسلاماً عليه، فخرج منها دون أن يُصاب بخدش! وبعد ذلك، هاجر سيدنا إبراهيم وبنى 'الكعبة المشرفة' مع ابنه سيدنا إسماعيل.",
    quranProse: "يقول الله تعالى عن معجزة النار: {قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ}.",
    lesson: "استخدام العقل والتفكير يقودنا دائماً لمعرفة الله. ونتعلم أيضاً أن من يثق بالله ويتوكل عليه، فإن الله سيحميه وينقذه من أي خطر.",
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
  },
  {
    chapter: "prophets", slug: "lut",
    en: {
      title: "Prophet Lut and the Ruined City",
      hook:
        "If all your friends started doing something very bad and wrong, would you join them or tell them to stop? Our prophet today stood firm against a whole city doing bad things.",
      events:
        "Prophet Lut (Lot) was the nephew of Prophet Ibrahim. Allah sent him to a beautiful green city called Sodom. However, the people of Sodom used to do very bad and unnatural things that no one in the world had done before. They were also very mean to strangers and travelers. Prophet Lut kindly told them to stop these bad habits and obey Allah, but they wouldn't listen and told him to leave. Finally, Allah sent angels to save Lut and his believing family, telling them to leave the city at night and never look back. In the morning, a terrible shower of stones destroyed the bad city completely.",
      lesson:
        "We should never copy people when they do bad or unnatural things, even if everyone else is doing them. We must always choose to be good and pure.",
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
    },
    image: "/stories/prophets/lut.jpg",
    title: "قصة سيدنا لوط",
    surahName: "",
    hook: "إذا رأيتم مجموعة من الناس يفعلون أفعالاً سيئة جداً، هل تقلدونهم أم تبتعدون عنهم وتنصحونهم؟ نبينا اليوم كان يعيش في قرية كل أهلها يفعلون الشر، فكيف تصرف معهم؟",
    events: "عاصر سيدنا لوط عمه سيدنا إبراهيم عليهما السلام، وأرسله الله إلى قرى تُسمى 'سَدُوم'. كان أهل هذه القرى سيئين جداً، وتغمرهم أخلاق سيئة وأفعال لم يسبقهم إليها أحد من العالمين. كان سيدنا لوط ينصحهم دائماً ويحاول إصلاحهم، لكنهم كانوا يسخرون منه ويريدون طرده من القرية. ولأنهم أصروا على الانحطاط الأخلاقي ولم يسمعوا كلام نبيهم، أمر الله سيدنا لوطاً أن يخرج من القرية ليلاً مع أهله الطيبين، ثم عاقب الله الأشرار بأن قَلَب قراهم وجعل عاليها سافلها، وأمطر عليهم حجارة من طين صلب (سجيل).",
    quranProse: "يقول الله تعالى عن عقابهم: {فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِّن سِجِّيلٍ مَّنضُودٍ}.",
    lesson: "يجب أن نبتعد دائماً عن الأفعال السيئة والأخلاق القبيحة، وألا نقلد الأشرار أبداً. الله يحب الأشخاص الذين يحافظون على أخلاقهم الجميلة ونظافتهم.",
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
  },
  {
    chapter: "prophets", slug: "yusuf",
    en: {
      title: "Prophet Yusuf and the Beautiful Dream",
      hook:
        "Have you ever had a dream that came true? Our hero today had a dream about the sun, the moon, and stars bowing to him! Let's dive into the most beautiful story in the Quran.",
      events:
        "Prophet Yusuf (Joseph) was a very handsome and good boy, deeply loved by his father, Prophet Yaqub. His older brothers became very jealous of him. One day, they took him to play but threw him into a deep, dark well! Some travelers found him and sold him in Egypt. Even though Yusuf faced many hard times — like being away from his father and being put in prison unfairly — he was always patient and never stopped doing good. Allah gave him the special gift of understanding dreams. Because of this, he saved Egypt from a great famine and became a powerful minister. In the end, he forgave his brothers, and his family was reunited in a beautiful happy ending!",
      lesson:
        "Jealousy is a bad feeling that ruins relationships. We learn from Yusuf to be patient during hard times and to forgive those who hurt us when we become strong.",
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
    },
    image: "/stories/prophets/yusuf.jpg",
    title: "قصة سيدنا يوسف (أحسن القصص)",
    surahName: "",
    hook: "هل تحبون قصص المغامرات؟ قصتنا اليوم هي الوحيدة في القرآن الكريم التي ذُكرت كاملة في سورة واحدة، وفيها أحداث مشوقة جداً تبدأ بحلم جميل وتنتهي بأن يصبح البطل وزيراً كبيراً!",
    events: "سيدنا يوسف هو ابن النبي يعقوب (الذي يُعرف أيضاً باسم إسرائيل). كان طفلاً جميلاً وطيباً، رأى في منامه أن الكواكب والشمس والقمر تسجد له. غار إخوته منه كثيراً، فأخذوه وألقوه في بئر عميقة (الجُب)! وجده بعض المسافرين وباعوه في مصر، فعاش في قصر رجل مهم، ثم دَخل السجن ظلماً. لكن يوسف لم ييأس، وكان يفسر الأحلام للناس في السجن. وفي يوم، حلم مَلِك مصر بحلم غريب، ولم يعرف تفسيره إلا سيدنا يوسف، فأنقذ مصر من الجوع. كافأه الملك وجعله مسؤولاً عن خزائن مصر! وفي النهاية، جاء إخوته إليه وهم لا يعرفونه، فسامحهم على ما فعلوه به، وعادوا جميعاً ليعيشوا مع أبيهم يعقوب في سعادة.",
    quranProse: "سمى الله هذه القصة بأجمل اسم وقال: {نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ}.",
    lesson: "نتعلم من سيدنا يوسف قيمة الصبر على المشاكل، وحسن الظن بالله. ونتعلم أهم درس: أن نسامح من أساء إلينا عندما نصبح أقوى منهم.",
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
  },
  {
    chapter: "prophets", slug: "ayoub",
    en: {
      title: "Prophet Ayyub, the Champion of Patience",
      hook:
        "What do you do when you get sick? You might feel a little sad until you get better. But what if someone was very sick for many years? Today we meet a prophet whose patience was stronger than mountains!",
      events:
        "Prophet Ayyub (Job) was a very wealthy man with a big, happy family and lots of farms. But Allah wanted to test his faith. Suddenly, Ayyub lost all his money, his children passed away, and he became very, very sick for many years. Despite all this pain and sadness, he never complained or got angry with Allah. He just kept praying and thanking Allah for everything. Finally, he prayed for Allah's mercy. Allah answered his prayer, telling him to strike the ground with his foot. A cool spring of water gushed out. When he washed with it, he was completely healed! Allah then gave him back his wealth and a beautiful family as a reward for his amazing patience.",
      lesson:
        "When bad things happen or we get sick, we should not complain or be angry. We must be patient, trust Allah, and know that relief will surely come.",
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
    },
    image: "/stories/prophets/ayoub.jpg",
    title: "قصة سيدنا أيوب",
    surahName: "",
    hook: "عندما نمرض ونتناول الدواء المر، قد نبكي ونغضب. لكن ماذا لو أخبرتكم عن نبي مرض لسنوات طويلة جداً، وفقد أمواله، ومع ذلك كان دائماً يبتسم ويشكر الله؟ تعالوا نتعرف على بطل الصبر، سيدنا أيوب.",
    events: "كان سيدنا أيوب رجلاً غنياً جداً، لديه أموال كثيرة، ومزارع، وأبناء كثيرون، وصحة قوية. أراد الله أن يختبر قوة إيمانه، فابتلاه بأن أخذ منه ماله وولده، وأصابه بمرض شديد في جسده. استمر المرض سنوات طويلة، ورغم ذلك، لم يشتكِ أيوب أبداً، بل صبر واحتسب وظل يذكر الله. وفي يوم من الأيام، دعا ربه بكلمات رقيقة وقال: 'يا رب إني مسني الضر وأنت أرحم الراحمين'. فاستجاب الله دعاءه فوراً، وأمره أن يضرب الأرض بقدمه، فخرج نبع ماء بارد، اغتسل منه فشُفي تماماً، وكشف الله ضره وعوضه عن كل ما فقده بأموال وأبناء أكثر من قبل!",
    quranProse: "يقول الله تعالى يعلمنا دعاء سيدنا أيوب الجميل: {وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ}.",
    lesson: "يُضرب المثل الأعلى بسيدنا أيوب في الصبر. نتعلم منه أننا عندما نمرض أو نفقد شيئاً نحبه، يجب أن نصبر ولا نغضب، وندعو الله دائماً، فالله يعوض الصابرين بأشياء أجمل بكثير.",
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
  },
  {
    chapter: "prophets", slug: "musa-and-harun",
    en: {
      title: "Prophet Musa and the Parting of the Sea",
      hook:
        "Imagine standing in front of a huge, deep sea, and an evil army is chasing you! How could you cross without a boat? Let's witness one of the greatest miracles ever!",
      events:
        "Prophet Musa (Moses) and the believers were running away from the evil Pharaoh and his army. They reached the edge of the Red Sea and had nowhere to go. The people were very scared! But Musa had complete trust in Allah. He struck the water with his wooden staff, and a great miracle happened! The massive sea split into two halves, creating a safe, dry sandy path in the middle with giant walls of water on both sides! The believers crossed safely, but when Pharaoh tried to follow them, the water crashed down, and the evil army was destroyed.",
      lesson:
        "Trusting Allah brings miracles. Allah always saves the good believers and defeats the unjust oppressors, no matter how powerful they seem.",
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
    },
    image: "/stories/prophets/musa-and-harun.jpg",
    title: "قصة سيدنا موسى وأخيه هارون",
    surahName: "",
    hook: "تخيلوا طفلاً رضيعاً تضعه أمه في صندوق خشبي، ثم تلقيه في مياه النهر الواسع! هل سيغرق؟ لا، بل سيأخذه النهر مباشرة إلى قصر الملك الشرير الذي يبحث عنه ليقتله.. ولكنه سيعيش هناك كأمير! كيف حدث ذلك؟",
    events: "وُلد سيدنا موسى في زمن كان فيه فرعون الظالم يقتل الأطفال الصغار. خافت أم موسى عليه، فأوحى لها الله أن تضعه في صندوق وتلقيه في النهر (اليم). وصل الصندوق إلى قصر فرعون، وهناك أحبته زوجة فرعون الطيبة وربته كابن لها! ولما كبر موسى، كلّفه الله بالرسالة في الوادي المقدس (طوى)، وأعطاه معجزات مذهلة، مثل العصا التي تتحول إلى ثعبان حقيقي. ذهب موسى ومعه أخوه هارون (الذي كان فصيحاً ومساعداً له) ليطلبا من فرعون أن يعبد الله ويترك الناس أحراراً. وعندما طاردهم فرعون بجيشه، ضرب موسى البحر بعصاه، فانشق البحر نصفين وصار طريقاً يابساً ليعبر منه المؤمنون وينجوا، بينما غرق فرعون وجيشه.",
    quranProse: "يقول الله تعالى آمراً سيدنا موسى أن يأخذ أخاه معه: {اذْهَبْ أَنتَ وَأَخُوكَ بِآيَاتِي وَلَا تَنِيَا فِي ذِكْرِي}.",
    lesson: "الله يحفظ الصغار والضعفاء دائماً. ونتعلم أيضاً أهمية التعاون بين الإخوة؛ فكما ساعد هارون أخاه موسى، يجب علينا أن نساعد إخوتنا ونحبهم وندافع عنهم.",
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
  },
  {
    chapter: "prophets", slug: "yusha",
    en: {
      title: "Prophet Yusha and the Frozen Sun",
      hook:
        "Have you ever wished the day would be just a little longer so you could finish something important? For this brave prophet, the sun actually stopped setting!",
      events:
        "After Musa, Prophet Yusha (Joshua) led the believers. They were trying to enter a holy city to free it from bad people. The battle was long, and the sun was about to set. If it got dark, they couldn't finish their mission, and the next day was a day of rest for them. So, Yusha looked at the sun and said, 'You are commanded by Allah, and I am commanded.' He prayed to Allah to hold the sun for them. Miraculously, the sun stopped moving and didn't set until they won the battle and freed the city!",
      lesson:
        "Time and the universe are completely under Allah's control. When we work hard for a good cause, Allah helps us in ways we cannot even imagine.",
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
    },
    image: "/stories/prophets/yusha.jpg",
    title: "قصة سيدنا يوشع بن نون",
    surahName: "",
    hook: "هل حدث وأن كنتم تلعبون مباراة مهمة، واقتربت الشمس من الغروب والوقت كاد ينتهي قبل أن تفوزوا؟ تمنيتم لو تتوقف الشمس قليلاً.. نبينا اليوم حدثت له هذه المعجزة وتوقفت الشمس من أجله!",
    events: "سيدنا يوشع بن نون كان فتى شاباً شجاعاً، ومرافقاً دائماً لسيدنا موسى يتعلم منه الخير. وبعد وفاة موسى، اختاره الله ليكون هو النبي والقائد لبني إسرائيل. قادهم يوشع بن نون بشجاعة لفتح 'بيت المقدس' ليعيدوه مدينة تعبد الله. وفي يوم المعركة، اقترب وقت غروب الشمس، وكان يوشع خائفاً أن يدخل الليل قبل أن يحققوا الانتصار. فدعا الله أن يوقف الشمس قليلاً ولا تغرب حتى يكملوا المعركة.. فاستجاب الله له، وتوقفت الشمس في السماء كمعجزة عظيمة، وانتصر المؤمنون!",
    quranProse: "لم يُذكر اسمه صراحة في القرآن، لكن الله ذكره بلقب (الفتى) في سورة الكهف حين كان برفقة موسى: {وَإِذْ قَالَ مُوسَىٰ لِفَتَاهُ لَا أَبْرَحُ حَتَّىٰ أَبْلُغَ مَجْمَعَ الْبَحْرَيْنِ أَوْ أَمْضِيَ حُقُبًا}.",
    lesson: "نتعلم من يوشع بن نون أن الشاب الصغير يمكن أن يصبح قائداً عظيماً إذا تعلم من معلميه الصالحين وكان شجاعاً. وأن الله ينصر من يدافع عن الحق.",
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
  },
  {
    chapter: "prophets", slug: "dawud",
    en: {
      title: "Prophet Dawud and the Soft Iron",
      hook:
        "Have you ever played with soft clay? Imagine if someone could play with hard, cold iron just like clay without using any fire!",
      events:
        "Prophet Dawud (David) was a very brave and strong prophet. When he was young, he defeated the giant tyrant Jalut (Goliath) with just a small slingshot! Allah gave Dawud a beautiful voice; when he sang the praises of Allah (reading the Psalms/Zabur), the mountains and birds would join him in praising Allah! Allah also gave him an amazing miracle: hard iron would become soft in his bare hands, just like dough. He used this miracle to make strong shields and armor to protect the good people.",
      lesson:
        "True strength comes from Allah. We should use our talents and strength to protect others and always praise Allah for His blessings.",
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
    },
    image: "/stories/prophets/dawud.jpg",
    title: "قصة سيدنا داود",
    surahName: "",
    hook: "تخيلوا جبلاً ضخماً وطيوراً جميلة تغني وتسبح الله معكم كلما قرأتم القرآن! وتخيلوا أن تمسكوا بقطعة حديد صلبة، فتصبح في أيديكم لينة كالصلصال! هذه كانت حياة نبي وملك عظيم.. سيدنا داود.",
    events: "كان داود شاباً صغيراً في جيش المؤمنين بقيادة طالوت، واستطاع بشجاعته أن يهزم قائداً جباراً اسمه جالوت. بعد ذلك، أعطاه الله الملك والنبوة والحكمة. كان سيدنا داود يملك صوتاً جميلاً جداً؛ وعندما كان يسبح الله ويقرأ كتابه (الزبور)، كانت الجبال والطيور تردد معه بصوت جميل! وأعطاه الله معجزة أخرى مدهشة، فقد ألان له الحديد في يده كأنه عجينة، ليصنع منه دروعاً قوية تحمي الجنود في المعارك.",
    quranProse: "يقول الله تعالى يصف معجزاته: {يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ}. (أوِّبي معه يعني سبِّحي معه).",
    lesson: "القوة الحقيقية ليست بحجم الجسم، بل بالشجاعة والإيمان بالله. ومهما أعطانا الله من قوة أو أموال أو مهارات، يجب أن نستخدمها في عمل الخير كما كان يفعل سيدنا داود الذي كان يشكر الله دائماً.",
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
  },
  {
    chapter: "prophets", slug: "sulaiman",
    en: {
      title: "Prophet Sulaiman's Great Kingdom",
      hook:
        "Imagine being a king who can order the wind to carry you, talk to birds, and have jinn build castles for you! This was the greatest kingdom on earth.",
      events:
        "Prophet Sulaiman (Solomon) asked Allah for a kingdom that no one else would ever have, and Allah granted his prayer! Sulaiman could understand the languages of all animals, birds, and insects. He commanded the wind to transport him quickly across the world. He also controlled the strong Jinn, who built huge palaces, beautiful statues, and deep-sea diving ships for him. Despite all this immense power and wealth, Sulaiman was always humble, constantly praying and thanking Allah, knowing it was all a test.",
      lesson:
        "Power and wealth are a test from Allah. A true believer stays humble, fair, and thankful, no matter how much they own.",
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
    },
    image: "/stories/prophets/sulaiman.jpg",
    title: "قصة سيدنا سليمان",
    surahName: "",
    hook: "إذا كان بإمكانكم أن تطلبوا أمنية واحدة فقط، فماذا ستكون؟ سيدنا سليمان طلب من الله مملكة عجيبة لا يستطيع أحد أن يصنع مثلها أبداً! ماذا كان يوجد في هذه المملكة؟",
    events: "ورث سيدنا سليمان الملك عن أبيه داود، وسأل الله أن يعطيه مُلكاً لا ينبغي لأحد من بعده. فاستجاب الله له، وسخّر له أشياء لا يمكن تخيلها! جعل الرياح تحمله وتنقله بسرعة إلى أماكن بعيدة، وجعل الجن يعملون عنده ويبنون له القصور الجميلة، بل وعلمه لغة الطيور والحيوانات! ورغم كل هذه القوة العجيبة، كان سيدنا سليمان متواضعاً جداً، وكان دائماً يسجد لله ويشكره على هذه النعم الكبيرة ولا يتكبر أبداً.",
    quranProse: "يقول الله تعالى يخبرنا عن دعاء سيدنا سليمان: {قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ}.",
    lesson: "مهما أصبحنا أغنياء أو ناجحين، ومهما كانت الألعاب والأشياء التي نملكها كثيرة، يجب ألا نتكبر على أحد، وأن نقول دائماً: 'الحمد لله الذي أعطانا هذا'.",
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
  },
  {
    chapter: "prophets", slug: "zakariya-and-yahya",
    en: {
      title: "Prophet Zakariya and the Miracle Baby",
      hook:
        "Can an old man whose hair is completely white have a baby? When we ask Allah, we should never lose hope!",
      events:
        "Prophet Zakariya (Zechariah) was a very kind and old man who worked hard in the mosque. He and his wife were very old, and they never had any children. Zakariya wanted a good son to continue teaching people after him. One day, he saw how Allah provided fresh fruits to Maryam (Mary) out of season. This gave him great hope! He prayed secretly and sincerely to Allah for a child. Allah answered his prayer and sent angels to give him the glad tidings of a boy named Yahya (John), who would be a great and pure prophet.",
      lesson:
        "We should never give up hope or stop praying to Allah, because Allah can make the impossible happen.",
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
    },
    image: "/stories/prophets/zakariya-and-yahya.jpg",
    title: "قصة سيدنا زكريا وابنه يحيى",
    surahName: "",
    hook: "هل رأيتم رجلاً عجوزاً جداً شعره أبيض بالكامل يرزق بطفل صغير؟ هذه معجزة! نبينا اليوم كان يحب الأطفال كثيراً وتمنى أن يكون له طفل يعلمه الخير، فهل حقق الله أمنيته؟",
    events: "كان سيدنا زكريا رجلاً طيباً وكبيراً في السن، وكان هو من يتكفل برعاية السيدة مريم العذراء في المسجد. وعندما كان يرى فاكهة الصيف تأتي لمريم في الشتاء بأمر الله، علم أن الله قادر على كل شيء! فدعا ربه سراً وقال: يا رب لقد كبرت وعظمي ضعف، وزوجتي كبيرة، فارزقني بطفل صالح. فاستجاب الله له وبشره بطفل اسمه (يحيى). كان يحيى طفلاً ذكياً ومميزاً، فقد أعطاه الله الحكمة والعلم وهو لا يزال صبياً صغيراً، وكان باراً بوالديه ومحباً لقراءة الكتاب المقدس بجد واجتهاد.",
    quranProse: "يقول الله تعالى آمراً سيدنا يحيى وهو طفل: {يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا}.",
    lesson: "الدعاء مثل السحر الحلال، إذا دعونا الله بصدق، سيحقق لنا ما نتمناه مهما بدا صعباً. ونتعلم من سيدنا يحيى أن نقرأ الكتب المفيدة ونتعلم ونحن صغار لنكون أذكياء وصالحين.",
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
  },
  {
    chapter: "prophets", slug: "isa",
    en: {
      title: "Prophet Isa, the Miracle Child",
      hook:
        "Have you ever heard a newborn baby speak like a grown-up? Our prophet today spoke to defend his mother when he was just a few days old!",
      events:
        "Prophet Isa (Jesus) was born to the pure Virgin Maryam without a father, by the great power of Allah. When Maryam brought the baby to her people, they were shocked and asked her bad questions. Maryam just pointed to her baby. The people said, 'How can we talk to a baby in a cradle?' Suddenly, baby Isa spoke clearly! He said, 'I am a servant of Allah. He has given me the Scripture and made me a prophet.' When he grew up, Allah gave him miracles like healing the sick, curing the blind, and even bringing the dead back to life by Allah's permission.",
      lesson:
        "Allah can create anything He wills. Isa was a great human messenger who brought love, healing, and the truth of worshipping Allah alone.",
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
    },
    image: "/stories/prophets/isa.jpg",
    title: "قصة سيدنا عيسى ابن مريم",
    surahName: "",
    hook: "هل سمعتم يوماً طفلاً رضيعاً لم يتعلم المشي بعد، يتحدث بطلاقة ويدافع عن أمه؟ هذه معجزة لا يصدقها العقل، لكنها حدثت مع نبي عظيم خلقه الله بطريقة فريدة وعجيبة جداً! تعالوا نتعرف على سيدنا عيسى.",
    events: "سيدنا عيسى عليه السلام هو نبي كريم، وهو الكلمة التي ألقاها الله إلى السيدة مريم العذراء وروح منه. معجزته الأولى أنه خُلق بلا أب، وعندما تعجب الناس من ذلك، تكلم في المهد (سرير الرضيع) صبياً ليبرئ أمه الطيبة ويخبرهم أنه نبي الله. ولما كبر، أيّده الله بمعجزات باهرة جداً ومدهشة؛ فكان يمسح على عيني الأعمى فيبصر، ويعالج المريض بمرض جلدي (الأبرص) فيُشفى، بل وكان يحيي الموتى بإذن الله! حاول بعض الأشرار أن يؤذوه ويصلبوه، لكن الله حماه، وانتهت رسالته في الأرض بأن رفعه الله إلى السماء ونجّاه من مكرهم.",
    quranProse: "يقول الله تعالى يصف كلمات سيدنا عيسى وهو رضيع: {قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا}.",
    lesson: "قدرة الله لا يحدها شيء؛ فهو يخلق ما يشاء ويشفي من يشاء. ونتعلم من سيدنا عيسى أهمية بر الوالدين، فقد كان باراً جداً بأمه ودافع عنها.",
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
  },
  {
    chapter: "prophets", slug: "muhammad",
    en: {
      title: "Prophet Muhammad, the Final Messenger",
      hook:
        "Who is the man whose message reached every corner of the world? He brought a book that has never changed, full of light and guidance for everyone!",
      events:
        "Prophet Muhammad (peace be upon him) is the final prophet and messenger of Allah. He was born in Mecca and was known as 'The Honest and Trustworthy'. When he was 40 years old, Allah sent the Angel Jibril (Gabriel) to give him the Holy Quran. Prophet Muhammad faced many hardships, but he was always merciful, even to his enemies. His greatest miracle is the Quran itself, a book of wisdom that teaches us how to live in peace, love, and justice. He taught us to be kind to orphans, animals, and neighbors. His message is a mercy to all the worlds, concluding the beautiful chain of prophets.",
      lesson:
        "Prophet Muhammad is our greatest role model. We learn from him to be honest, merciful to all creatures, and to follow the beautiful teachings of the Quran.",
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
    },
    image: "/stories/prophets/muhammad.jpg",
    title: "قصة سيدنا محمد (خاتم الأنبياء)",
    surahName: "",
    hook: "بعد أن سافرنا عبر الزمن وتعرفنا على قصص كل الأنبياء، وصلنا الآن إلى مسك الختام. نبيٌ أُرسل رحمة للعالمين جميعاً، ولم يكتفِ القرآن بسرد قصص من قبله، بل كان يسجل بطولاته وبطولات أصحابه لحظة بلحظة ليصنع أعظم أمة!",
    events: "سيدنا محمد صلى الله عليه وسلم هو خاتم الأنبياء والمرسلين. القرآن الكريم لم يكن فقط يحكي قصص الماضي، بل كان سجلاً حياً يوثق الأحداث التي عاصرها النبي، ليوجه المسلمين ويعلمهم. فقد وثّق القرآن أحداث غزوة بدر الكبرى التي انتصر فيها المسلمون، وغزوة أحد التي قدمت دروساً عظيمة في الثبات والطاعة، وغزوة الأحزاب (الخندق) حينما حاصر الأعداء المدينة. كما حذر القرآن الكريم من الأشرار الذين حاولوا إيذاء النبي مثل أبي لهب، ليكون ذلك سلاحاً في كشف الحقائق للجيل الأول من المسلمين.",
    quranProse: "يقول الله تعالى واصفاً رسالة نبينا الكريم: {وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ}. أي أن رسالته جاءت لتنشر الخير والسلام والرحمة لكل الناس.",
    lesson: "نتعلم من نبينا الكريم الثبات في وقت الشدائد، وأن طاعة الله ورسوله هي سبب النجاح في الدنيا والآخرة، وأن نكون دائماً مصدر رحمة وحب لمن حولنا.",
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
