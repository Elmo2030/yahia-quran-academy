// أسماء الله الحسنى — الترتيب المعروف من رواية الترمذي (رقم ٣٥٠٧)، وهو الترتيب
// الأشهر المتداول؛ توجد اجتهادات أخرى في الصياغة والترتيب عند بعض العلماء.
//
// الأسماء المعلَّمة status:"ready" فيها محتوى كامل مراجَع (قصة/موقف + آية +
// سؤال تفكير + نشاط + مصدر)، تُضاف على دفعات. الباقي status:"coming-soon"
// فيه الاسم والمعنى المختصر فقط، وينتظر كتابة تفصيلية لاحقة قبل اعتماده —
// لا تُخترع لها قصص أو مصادر.

export type NameOfAllahSource = { type: "quran" | "hadith"; reference: string };
export type NameOfAllahSection = { title?: string; paragraphs: string[] };
export type NameOfAllah = {
  slug: string;
  order: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  status: "ready" | "coming-soon";
  sections: NameOfAllahSection[];
  reflectionQuestion: string;
  tryToday: string[];
  sources: NameOfAllahSource[];
};

export const namesOfAllah: NameOfAllah[] = [
  {
    slug: "allah", order: 1, arabic: "الله", transliteration: "Allah",
    meaning: "الاسم الجامع لكل صفات الكمال، خالق كل شيء والمعبود بحق وحده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-rahman", order: 2, arabic: "الرحمن", transliteration: "Ar-Rahman",
    meaning: "واسع الرحمة، يرحم كل الخلق في الدنيا: المؤمن والكافر، الإنسان والحيوان",
    status: "ready",
    sections: [{
      title: "كل صباح رحمة جديدة",
      paragraphs: [
        "افتح عينيك كل صباح، هل فكرت من الذي يرسل لك الشمس تدفئك، والهواء تتنفسه، والطعام يصل إلى بيتك؟",
        "الله هو (الرحمن)، رحمته وسعت كل الخلق: المؤمن وغير المؤمن، الإنسان والطير والحيوان. كل نَفَس تتنفسه هو من رحمته.",
        "قال الله تعالى: ﴿الرَّحْمَٰنُ * عَلَّمَ الْقُرْآنَ﴾ (الرحمن: ١-٢). فحتى تعلّمك القرآن هو من رحمة الرحمن بك.",
      ],
    }],
    reflectionQuestion: "اذكر ثلاث نعم وصلتك اليوم بدون أن تطلبها من أحد، من رحمة من هي؟",
    tryToday: [
      "قل: يا رحمن، وأنت تشكر الله على نعمة صغيرة اليوم، مثل كوب ماء بارد.",
      "ارحم من هو أضعف منك اليوم — أخوك الصغير، أو حيوان في الشارع — تقليدًا لصفة الرحمن.",
    ],
    sources: [{ type: "quran", reference: "سورة الرحمن، الآيتان ١-٢؛ سورة الأعراف، الآية ١٥٦: ﴿وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ﴾" }],
  },
  {
    slug: "ar-raheem", order: 3, arabic: "الرحيم", transliteration: "Ar-Raheem",
    meaning: "شديد الرحمة بالمؤمنين خاصة، يرحمهم في الدنيا ويوم القيامة",
    status: "ready",
    sections: [{
      title: "رحمة خاصة يوم القيامة",
      paragraphs: [
        "إذا كان (الرحمن) رحمته لكل الخلق، فـ(الرحيم) رحمة خاصة أشد بالمؤمنين الذين آمنوا به.",
        "قال الله تعالى: ﴿وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا﴾ (الأحزاب: ٤٣). فكل مرة تتوب فيها إلى الله ويقبل توبتك، هذا من رحمته بك خاصة.",
      ],
    }],
    reflectionQuestion: "هل حدث أن أخطأت ثم سامحك أحد قبل أن تعتذر؟ كيف شعرت؟",
    tryToday: [
      "ادعُ الله بعد الصلاة: يا رحيم، ارحمني.",
      "سامح صديقًا أخطأ في حقك اليوم، كما يحب الرحيم أن نتراحم فيما بيننا.",
    ],
    sources: [{ type: "quran", reference: "سورة الأحزاب، الآية ٤٣؛ سورة البقرة، الآية ١٦٣" }],
  },
  {
    slug: "al-malik", order: 4, arabic: "الملك", transliteration: "Al-Malik",
    meaning: "المالك لكل شيء في الكون، المتصرف فيه وحده، لا شريك له في ملكه",
    status: "ready",
    sections: [{
      title: "صاحب كل شيء",
      paragraphs: [
        "انظر حولك: الأرض، والسماء، والشمس، والقمر، وحتى أنت — كل هذا مُلك لله وحده.",
        "قال الله تعالى: ﴿قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ وَتَنزِعُ الْمُلْكَ مِمَّن تَشَاءُ﴾ (آل عمران: ٢٦). فملوك الأرض يحكمون بإذنه، وملكه هو وحده لا يزول.",
      ],
    }],
    reflectionQuestion: "لو كنت ملكًا ليوم واحد، بماذا كنت ستأمر لتنشر الخير؟",
    tryToday: ["تذكّر أن ألعابك وأغراضك في الحقيقة عطية من (الملك) الحقيقي، وشارك منها مع من يحتاج."],
    sources: [{ type: "quran", reference: "سورة آل عمران، الآية ٢٦؛ سورة الناس، الآية ٢" }],
  },
  {
    slug: "al-quddus", order: 5, arabic: "القدوس", transliteration: "Al-Quddus",
    meaning: "المنزّه عن كل نقص وعيب وشريك، الطاهر الكامل في ذاته وصفاته",
    status: "ready",
    sections: [{
      title: "لا نقص فيه أبدًا",
      paragraphs: [
        "كل إنسان فيه نقص: ينسى، ويتعب، ويخطئ. أما الله (القدوس) فمنزّه عن هذا كله.",
        "قال الله تعالى: ﴿هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ﴾ (الحشر: ٢٣). فهو الكامل الذي لا يشبهه أحد من خلقه.",
      ],
    }],
    reflectionQuestion: "ما الفرق بين كمال الله وكمال أفضل إنسان تعرفه؟",
    tryToday: ["نزّه لسانك اليوم عن الكذب والغيبة، اقتداءً بأن الله يحب الطهارة في القول والفعل."],
    sources: [{ type: "quran", reference: "سورة الحشر، الآية ٢٣؛ سورة الجمعة، الآية ١" }],
  },
  {
    slug: "as-salam", order: 6, arabic: "السلام", transliteration: "As-Salam",
    meaning: "السالم من كل عيب ونقص، ومنه السلام الذي يهبه لأهل الجنة",
    status: "ready",
    sections: [{
      title: "مصدر الأمان",
      paragraphs: [
        "عندما تشعر بالخوف، تذكّر أن الله هو (السلام)، ومنه يأتي كل أمان وطمأنينة.",
        "قال الله تعالى: ﴿لَهُمْ دَارُ السَّلَامِ عِندَ رَبِّهِمْ﴾ (الأنعام: ١٢٧)، وتحية أهل الجنة فيها هي (السلام).",
      ],
    }],
    reflectionQuestion: "ما الذي يجعلك تشعر بالأمان في بيتك؟ وكيف تكون سببًا في أمان غيرك؟",
    tryToday: ["ألقِ السلام على من تقابله اليوم بابتسامة صادقة، فالسلام تحية يحبها الله."],
    sources: [{ type: "quran", reference: "سورة الأنعام، الآية ١٢٧؛ سورة يونس، الآية ١٠" }],
  },
  {
    slug: "al-mumin", order: 7, arabic: "المؤمن", transliteration: "Al-Mu'min",
    meaning: "يصدق وعده، ويؤمّن عباده من الخوف",
    status: "ready",
    sections: [{
      title: "وعد لا يتخلّف",
      paragraphs: [
        "هل وعدك أحد بشيء ثم لم يفِ به؟ هذا لا يحدث مع الله أبدًا.",
        "الله هو (المؤمن): يصدق كل وعوده، ويمنح الأمان لمن آمن به من الخوف والحزن.",
        "قال الله تعالى: ﴿هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ﴾ (الحشر: ٢٣).",
      ],
    }],
    reflectionQuestion: "اذكر وعدًا وعدك الله به في القرآن، مثل الجنة لمن أطاعه. كيف يجعلك ذلك تثق به أكثر؟",
    tryToday: ["فِ بوعد صغير وعدت به أحدًا اليوم، اقتداءً بأن الله لا يخلف وعده."],
    sources: [{ type: "quran", reference: "سورة الحشر، الآية ٢٣" }],
  },
  {
    slug: "al-muhaymin", order: 8, arabic: "المهيمن", transliteration: "Al-Muhaymin",
    meaning: "الرقيب الحافظ لكل شيء، المطّلع عليه",
    status: "ready",
    sections: [{
      title: "لا شيء يغيب عنه",
      paragraphs: [
        "هل تعلم أن الله يعلم ويراقب كل شيء في هذا الكون في اللحظة نفسها، من أصغر نملة إلى أكبر جبل؟",
        "هذا هو معنى (المهيمن): المطّلع على كل شيء، الحافظ له، الشاهد عليه.",
        "قال الله تعالى: ﴿...الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ﴾ (الحشر: ٢٣).",
      ],
    }],
    reflectionQuestion: "إذا كنت تعلم أن الله يراك في كل لحظة، هل يغيّر هذا شيئًا في تصرفاتك عندما تكون وحدك؟",
    tryToday: ["افعل اليوم عملًا صالحًا لا يراك فيه أحد إلا الله، تذكرًا أن (المهيمن) يرى ويعلم."],
    sources: [{ type: "quran", reference: "سورة الحشر، الآية ٢٣" }],
  },
  {
    slug: "al-aziz", order: 9, arabic: "العزيز", transliteration: "Al-Aziz",
    meaning: "الغالب الذي لا يُقهر أبدًا",
    status: "ready",
    sections: [{
      title: "لا أحد يغلبه",
      paragraphs: [
        "الملوك والأقوياء في الأرض يُقهرون يومًا ما، لكن الله وحده (العزيز) الذي لا يغلبه أحد ولا يعجزه شيء.",
        "قال الله تعالى: ﴿وَهُوَ الْعَزِيزُ الْحَكِيمُ﴾ (إبراهيم: ٤)، وتكرر هذا الاسم في مواضع كثيرة من القرآن.",
      ],
    }],
    reflectionQuestion: "لماذا نشعر بالطمأنينة عندما نعلم أننا نتوكل على (العزيز) الذي لا يُغلب؟",
    tryToday: ["إذا شعرت بالضعف أمام موقف صعب اليوم، قل: يا عزيز أعنّي، وتوكل عليه."],
    sources: [{ type: "quran", reference: "سورة إبراهيم، الآية ٤" }],
  },
  {
    slug: "al-jabbar", order: 10, arabic: "الجبار", transliteration: "Al-Jabbar",
    meaning: "الذي يجبر الضعيف ويقهر كل شيء بقوته",
    status: "ready",
    sections: [{
      title: "يجبر القلب المنكسر",
      paragraphs: [
        "(الجبار) اسم له معنيان جميلان: فهو الذي يقهر كل شيء بقوته، وهو أيضًا الذي يجبر القلوب المنكسرة ويصلح حال الضعيف.",
        "فإذا شعرت يومًا بالحزن أو الانكسار، تذكّر أن (الجبار) وحده القادر أن يجبر قلبك ويصلح حالك.",
        "قال الله تعالى: ﴿...الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ﴾ (الحشر: ٢٣).",
      ],
    }],
    reflectionQuestion: "هل مررت بموقف حزين ثم شعرت أن الله أصلح حالك بعده؟",
    tryToday: ["ادعُ الله اليوم أن يجبر قلب شخص تعرفه يشعر بالحزن، وكن سببًا في مواساته."],
    sources: [{ type: "quran", reference: "سورة الحشر، الآية ٢٣" }],
  },
  {
    slug: "al-mutakabbir", order: 11, arabic: "المتكبر", transliteration: "Al-Mutakabbir",
    meaning: "المتفرد بالعظمة، فلا كبرياء لأحد سواه",
    status: "ready",
    sections: [{
      title: "الكبرياء له وحده",
      paragraphs: [
        "الكِبر صفة مذمومة في الإنسان، لكنها لله وحده صفة كمال، لأنه العظيم الذي لا يستحق الكبرياء أحد سواه.",
        "ولذلك يكره الله من يتكبر من عباده، لأن الكبرياء لا تليق إلا بـ(المتكبر) وحده سبحانه.",
        "قال الله تعالى: ﴿...الْجَبَّارُ الْمُتَكَبِّرُ سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ﴾ (الحشر: ٢٣).",
      ],
    }],
    reflectionQuestion: "لماذا يجب أن نكون متواضعين مع الناس بينما الله وحده له الكبرياء؟",
    tryToday: ["تواضع اليوم مع من هو أصغر منك أو أضعف، وابتعد عن التكبر على أحد."],
    sources: [{ type: "quran", reference: "سورة الحشر، الآية ٢٣" }, { type: "hadith", reference: "رواه مسلم: «الكبرياء ردائي، والعظمة إزاري، فمن نازعني واحدًا منهما عذّبته»" }],
  },
  {
    slug: "al-khaliq", order: 12, arabic: "الخالق", transliteration: "Al-Khaliq",
    meaning: "الذي أوجد كل شيء من العدم",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-bari", order: 13, arabic: "البارئ", transliteration: "Al-Bari",
    meaning: "الذي أبدع الخلق بلا مثال سابق",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-musawwir", order: 14, arabic: "المصور", transliteration: "Al-Musawwir",
    meaning: "الذي يعطي كل مخلوق صورته الخاصة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-ghaffar", order: 15, arabic: "الغفار", transliteration: "Al-Ghaffar",
    meaning: "كثير المغفرة للذنوب مهما تكررت",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-qahhar", order: 16, arabic: "القهار", transliteration: "Al-Qahhar",
    meaning: "الغالب لكل شيء، لا يقف أمامه شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wahhab", order: 17, arabic: "الوهاب", transliteration: "Al-Wahhab",
    meaning: "كثير العطاء بلا مقابل",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-razzaq", order: 18, arabic: "الرزاق", transliteration: "Ar-Razzaq",
    meaning: "الذي يرزق كل مخلوق ما يحتاجه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-fattah", order: 19, arabic: "الفتاح", transliteration: "Al-Fattah",
    meaning: "الذي يفتح أبواب الرزق والخير والحكم بين الناس",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-alim", order: 20, arabic: "العليم", transliteration: "Al-Alim",
    meaning: "الذي يعلم كل شيء، ظاهره وباطنه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-qabid", order: 21, arabic: "القابض", transliteration: "Al-Qabid",
    meaning: "الذي يُضيّق الرزق بحكمته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-basit", order: 22, arabic: "الباسط", transliteration: "Al-Basit",
    meaning: "الذي يوسّع الرزق بفضله",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-khafid", order: 23, arabic: "الخافض", transliteration: "Al-Khafid",
    meaning: "الذي يخفض من يشاء بعدله",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-rafi", order: 24, arabic: "الرافع", transliteration: "Ar-Rafi",
    meaning: "الذي يرفع من يشاء بفضله",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muizz", order: 25, arabic: "المعز", transliteration: "Al-Mu'izz",
    meaning: "الذي يهب العزة لمن يشاء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mudhill", order: 26, arabic: "المذل", transliteration: "Al-Mudhill",
    meaning: "الذي يهب الذلة لمن يشاء بحكمته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "as-sami", order: 27, arabic: "السميع", transliteration: "As-Sami",
    meaning: "الذي يسمع كل شيء، خفيّه وجهره",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-basir", order: 28, arabic: "البصير", transliteration: "Al-Basir",
    meaning: "الذي يرى كل شيء مهما دقّ",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hakam", order: 29, arabic: "الحكم", transliteration: "Al-Hakam",
    meaning: "الحاكم الذي يفصل بين الخلق بالعدل",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-adl", order: 30, arabic: "العدل", transliteration: "Al-Adl",
    meaning: "الذي لا يظلم أحدًا أبدًا",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-latif", order: 31, arabic: "اللطيف", transliteration: "Al-Latif",
    meaning: "الرفيق بعباده، يعلم دقائق الأمور",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-khabir", order: 32, arabic: "الخبير", transliteration: "Al-Khabir",
    meaning: "العالم ببواطن الأمور وحقائقها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-halim", order: 33, arabic: "الحليم", transliteration: "Al-Halim",
    meaning: "الذي لا يعجل بالعقوبة مع قدرته عليها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-azim", order: 34, arabic: "العظيم", transliteration: "Al-Azim",
    meaning: "الذي له العظمة كلها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-ghafur", order: 35, arabic: "الغفور", transliteration: "Al-Ghafur",
    meaning: "الذي يستر الذنوب ويغفرها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ash-shakur", order: 36, arabic: "الشكور", transliteration: "Ash-Shakur",
    meaning: "الذي يجازي على القليل من الطاعة بالكثير من الأجر",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-aliyy", order: 37, arabic: "العلي", transliteration: "Al-Aliyy",
    meaning: "الذي علا فوق كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-kabir", order: 38, arabic: "الكبير", transliteration: "Al-Kabir",
    meaning: "الذي هو أكبر من كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hafiz", order: 39, arabic: "الحفيظ", transliteration: "Al-Hafiz",
    meaning: "الذي يحفظ كل شيء من الضياع",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muqit", order: 40, arabic: "المقيت", transliteration: "Al-Muqit",
    meaning: "الذي يعطي كل مخلوق قوته وما يقيته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hasib", order: 41, arabic: "الحسيب", transliteration: "Al-Hasib",
    meaning: "الذي يحاسب عباده على أعمالهم، وكافيهم",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-jalil", order: 42, arabic: "الجليل", transliteration: "Al-Jalil",
    meaning: "صاحب الجلال والعظمة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-karim", order: 43, arabic: "الكريم", transliteration: "Al-Karim",
    meaning: "كثير العطاء والفضل",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-raqib", order: 44, arabic: "الرقيب", transliteration: "Ar-Raqib",
    meaning: "الذي لا يغيب عنه شيء، يراقب كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mujib", order: 45, arabic: "المجيب", transliteration: "Al-Mujib",
    meaning: "الذي يجيب دعاء من دعاه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wasi", order: 46, arabic: "الواسع", transliteration: "Al-Wasi",
    meaning: "الذي وسعت رحمته وعلمه كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hakim", order: 47, arabic: "الحكيم", transliteration: "Al-Hakim",
    meaning: "الذي يضع كل شيء في موضعه بحكمة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wadud", order: 48, arabic: "الودود", transliteration: "Al-Wadud",
    meaning: "الذي يحب عباده الصالحين ويحبونه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-majeed", order: 49, arabic: "المجيد", transliteration: "Al-Majeed",
    meaning: "الكريم العظيم الشأن",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-baith", order: 50, arabic: "الباعث", transliteration: "Al-Ba'ith",
    meaning: "الذي يبعث الخلق يوم القيامة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ash-shahid", order: 51, arabic: "الشهيد", transliteration: "Ash-Shahid",
    meaning: "الذي لا يغيب عنه شيء، حاضر لكل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-haqq", order: 52, arabic: "الحق", transliteration: "Al-Haqq",
    meaning: "الثابت الذي لا يزول، وكل شيء سواه باطل",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wakil", order: 53, arabic: "الوكيل", transliteration: "Al-Wakil",
    meaning: "الذي يتولى أمور من توكل عليه ويكفيه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-qawiyy", order: 54, arabic: "القوي", transliteration: "Al-Qawiyy",
    meaning: "الذي له القوة كلها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-matin", order: 55, arabic: "المتين", transliteration: "Al-Matin",
    meaning: "شديد القوة الذي لا يتعبه شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-waliyy", order: 56, arabic: "الولي", transliteration: "Al-Waliyy",
    meaning: "الناصر والمعين لأوليائه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hamid", order: 57, arabic: "الحميد", transliteration: "Al-Hamid",
    meaning: "المحمود على كل حال بأفعاله وصفاته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muhsi", order: 58, arabic: "المحصي", transliteration: "Al-Muhsi",
    meaning: "الذي أحصى كل شيء عددًا",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mubdi", order: 59, arabic: "المبدئ", transliteration: "Al-Mubdi",
    meaning: "الذي بدأ الخلق من العدم",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muid", order: 60, arabic: "المعيد", transliteration: "Al-Mu'id",
    meaning: "الذي يعيد الخلق بعد الفناء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muhyi", order: 61, arabic: "المحيي", transliteration: "Al-Muhyi",
    meaning: "الذي يهب الحياة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mumit", order: 62, arabic: "المميت", transliteration: "Al-Mumit",
    meaning: "الذي يقدّر الموت على كل حي",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hayy", order: 63, arabic: "الحي", transliteration: "Al-Hayy",
    meaning: "الذي له الحياة الكاملة الدائمة",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-qayyum", order: 64, arabic: "القيوم", transliteration: "Al-Qayyum",
    meaning: "القائم بنفسه، القائم على كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wajid", order: 65, arabic: "الواجد", transliteration: "Al-Wajid",
    meaning: "الغني الذي لا يفتقر لشيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-maajid", order: 66, arabic: "الماجد", transliteration: "Al-Maajid",
    meaning: "العظيم الكريم الواسع الفضل",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-wahid", order: 67, arabic: "الواحد", transliteration: "Al-Wahid",
    meaning: "المتفرد بلا شريك ولا نظير",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "as-samad", order: 68, arabic: "الصمد", transliteration: "As-Samad",
    meaning: "الذي يُقصد في الحوائج، وهو غني عن كل أحد",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-qadir", order: 69, arabic: "القادر", transliteration: "Al-Qadir",
    meaning: "الذي يقدر على كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muqtadir", order: 70, arabic: "المقتدر", transliteration: "Al-Muqtadir",
    meaning: "كامل القدرة، لا يعجزه شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muqaddim", order: 71, arabic: "المقدم", transliteration: "Al-Muqaddim",
    meaning: "الذي يقدّم من يشاء بفضله",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muakhkhir", order: 72, arabic: "المؤخر", transliteration: "Al-Mu'akhkhir",
    meaning: "الذي يؤخر من يشاء بحكمته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-awwal", order: 73, arabic: "الأول", transliteration: "Al-Awwal",
    meaning: "الذي ليس قبله شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-akhir", order: 74, arabic: "الآخر", transliteration: "Al-Akhir",
    meaning: "الذي ليس بعده شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "az-zahir", order: 75, arabic: "الظاهر", transliteration: "Az-Zahir",
    meaning: "الذي ظهر فوق كل شيء بقدرته وعلت آياته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-batin", order: 76, arabic: "الباطن", transliteration: "Al-Batin",
    meaning: "العالم بما بطن وخفي",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-waali", order: 77, arabic: "الوالي", transliteration: "Al-Waali",
    meaning: "المتولي لتدبير خلقه وأمورهم",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mutaali", order: 78, arabic: "المتعالي", transliteration: "Al-Muta'aali",
    meaning: "المنزّه عن كل نقص، العالي فوق خلقه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-barr", order: 79, arabic: "البر", transliteration: "Al-Barr",
    meaning: "كثير الإحسان والخير لعباده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "at-tawwab", order: 80, arabic: "التواب", transliteration: "At-Tawwab",
    meaning: "الذي يقبل توبة عباده مهما أخطأوا",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muntaqim", order: 81, arabic: "المنتقم", transliteration: "Al-Muntaqim",
    meaning: "الذي ينتقم من الظالمين بعدله",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-afuww", order: 82, arabic: "العفو", transliteration: "Al-Afuww",
    meaning: "الذي يعفو عن الذنوب ويمحوها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-raauf", order: 83, arabic: "الرؤوف", transliteration: "Ar-Ra'uf",
    meaning: "شديد الرأفة والرحمة بعباده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "malik-al-mulk", order: 84, arabic: "مالك الملك", transliteration: "Malik-ul-Mulk",
    meaning: "الذي يملك كل الملك ويتصرف فيه كما يشاء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "dhul-jalali-wal-ikram", order: 85, arabic: "ذو الجلال والإكرام", transliteration: "Dhul-Jalali-wal-Ikram",
    meaning: "صاحب العظمة والكرم المطلق",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-muqsit", order: 86, arabic: "المقسط", transliteration: "Al-Muqsit",
    meaning: "العادل في كل حكمه وقضائه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-jami", order: 87, arabic: "الجامع", transliteration: "Al-Jami",
    meaning: "الذي يجمع الخلق يوم لا ريب فيه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-ghani", order: 88, arabic: "الغني", transliteration: "Al-Ghani",
    meaning: "الذي لا يحتاج إلى أحد، وكل أحد محتاج إليه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mughni", order: 89, arabic: "المغني", transliteration: "Al-Mughni",
    meaning: "الذي يغني من يشاء من عباده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-mani", order: 90, arabic: "المانع", transliteration: "Al-Mani",
    meaning: "الذي يمنع الشر عمن يشاء بحكمته",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ad-darr", order: 91, arabic: "الضار", transliteration: "Ad-Darr",
    meaning: "الذي يقدّر الضرّ بحكمته لمصلحة يعلمها",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "an-nafi", order: 92, arabic: "النافع", transliteration: "An-Nafi",
    meaning: "الذي يوصل النفع لمن يشاء من عباده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "an-nur", order: 93, arabic: "النور", transliteration: "An-Nur",
    meaning: "الذي نوّر السماوات والأرض بنوره وهداه",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-hadi", order: 94, arabic: "الهادي", transliteration: "Al-Hadi",
    meaning: "الذي يهدي عباده إلى الحق والصواب",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-badi", order: 95, arabic: "البديع", transliteration: "Al-Badi",
    meaning: "الذي أبدع الخلق على غير مثال سابق",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-baqi", order: 96, arabic: "الباقي", transliteration: "Al-Baqi",
    meaning: "الذي لا يفنى ولا يزول",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "al-warith", order: 97, arabic: "الوارث", transliteration: "Al-Warith",
    meaning: "الباقي بعد فناء كل شيء، له كل شيء",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "ar-rashid", order: 98, arabic: "الرشيد", transliteration: "Ar-Rashid",
    meaning: "الذي يهدي إلى الرشد والصواب",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
  {
    slug: "as-sabur", order: 99, arabic: "الصبور", transliteration: "As-Sabur",
    meaning: "الذي لا يعجل بالعقوبة، ويمهل عباده",
    status: "coming-soon",
    sections: [], reflectionQuestion: "", tryToday: [], sources: [],
  },
];
