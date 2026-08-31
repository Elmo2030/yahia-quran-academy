// =============================================================================
// seerah.ts — Seerah (Prophet's Biography) stories for children.
//
// Station 1: البدايات — بذور النور (5 stories, childhood)
// Station 2: الصادق الأمين (5 stories, youth up to the eve of prophethood)
//
// Story URLs stay flat at /seerah/<slug> — slugs are unique across stations,
// so adding a station does not move a page that is already published. The
// index groups the cards under their station heading.
//
// Content authored by the content team as a JSON blueprint; converted here to
// typed TypeScript. Two age tiers per story, an MCQ challenge (zero-indexed
// correctAnswer), a discover fact, a value card, and a trusted-source card.
// Visuals are generated in a separate pass (symbolic prompts, NO humans) and
// dropped into /stories/seerah/<slug>.jpg — the `image` field stays absent
// until then and the page renders fine without it.
// =============================================================================

export type AgeTier = "tier_1_age_6_8" | "tier_2_age_9_11";

export type SeerahChallenge = {
  type: "multiple_choice";
  question: string;
  options: string[];
  /** zero-indexed correct option */
  correctAnswer: number;
};

/** Everything in a story that is language-specific. The Arabic lives on the
 *  story itself; `en` carries the same shape for the English locale. A story
 *  without `en` falls back to Arabic, so translations can land in batches
 *  without a half-translated page ever reaching a reader. */
export type SeerahText = {
  title: string;
  content: {
    tier_1_age_6_8: { narrative: string; shortLesson: string };
    tier_2_age_9_11: { narrative: string; details: string };
  };
  interactive: {
    discover: string;
    value: { name: string; icon: string };
    thinkQuestion: string;
    challenge: SeerahChallenge;
  };
  gamification: {
    artifact: { name: string; description: string };
    badge: string;
  };
  source: { reliability: string; reference: string; note: string };
};

export type SeerahStory = {
  storyId: string;
  stationId: number;
  slug: string;
  title: string;
  image?: string;
  en?: SeerahText;
  content: {
    tier_1_age_6_8: { narrative: string; shortLesson: string };
    tier_2_age_9_11: { narrative: string; details: string };
  };
  interactive: {
    discover: string;
    value: { name: string; icon: string };
    thinkQuestion: string;
    challenge: SeerahChallenge;
  };
  gamification: {
    artifact: { name: string; description: string };
    badge: string;
  };
  source: { reliability: string; reference: string; note: string };
};

export type SeerahStation = {
  stationId: number;
  titleAr: string;
  descriptionAr: string;
  titleEn: string;
  descriptionEn: string;
};

export const seerahStations: SeerahStation[] = [
  {
    stationId: 1,
    titleAr: "البدايات — بذور النور",
    titleEn: "Beginnings — Seeds of Light",
    descriptionAr:
      "خمس قصص من طفولة النبي ﷺ: مولده، ورضاعته في البادية، وحنان جده وعمه، وأول عمل في حياته.",
    descriptionEn:
      "Five stories from the childhood of the Prophet (pbuh): his birth, his years in the desert, the love of his grandfather and uncle, and the first work of his life.",
  },
  {
    stationId: 2,
    titleAr: "الصادق الأمين",
    titleEn: "The Truthful, The Trustworthy",
    descriptionAr:
      "خمس قصص من شبابه ﷺ قبل البعثة: أمانته في التجارة، وبيته مع خديجة، وحكمته في الحجر الأسود، ووقوفه مع المظلوم، وخلوته في غار حراء.",
    descriptionEn:
      "Five stories from his youth before the revelation: his honesty in trade, his home with Khadijah, his wisdom over the Black Stone, his stand with the wronged, and his retreats to the cave of Hira.",
  },
];

/** A story's text in the requested language, falling back to the Arabic for
 *  anything not translated yet. */
export const seerahTextFor = (story: SeerahStory, locale: "ar" | "en"): SeerahText =>
  locale === "en" && story.en
    ? story.en
    : {
        title: story.title,
        content: story.content,
        interactive: story.interactive,
        gamification: story.gamification,
        source: story.source,
      };

/** The station a story belongs to, for headings and link previews. */
export const seerahStationOf = (story: SeerahStory): SeerahStation =>
  seerahStations.find(s => s.stationId === story.stationId) ?? seerahStations[0];

export const seerahStories: SeerahStory[] = [
  {
    storyId: "st-1-01",
    stationId: 1,
    slug: "birth-of-light",
    image: "/stories/seerah/birth-of-light.jpg",
    en: {
      title: "The Day Mecca Shone",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On a beautiful spring day, a wonderful baby named 'Muhammad' was born. Before his birth, a huge army with a giant elephant tried to destroy the Kaaba! But Allah sent brave little birds to chase the bad guys away and protect Mecca. When baby Muhammad (peace be upon him) was born, his grandfather was so happy and carried him to the Kaaba to thank Allah.",
          shortLesson: "Allah is very powerful. He always protects His house and good children.",
        },
        tier_2_age_9_11: {
          narrative:
            "In the 'Year of the Elephant', an evil king named Abraha tried to destroy the Kaaba with a massive army and a giant elephant. But Allah sent flocks of birds (Ababil) carrying small stones that defeated the army and protected Mecca. In that exact same year, Mecca was blessed with the birth of Prophet Muhammad (peace be upon him). He was born an orphan because his father, Abdullah, died before his birth. His grandfather, Abdul Muttalib, was overjoyed, took him inside the Kaaba, and named him Muhammad, which means 'The highly praised one'.",
          details:
            "Did you know that the name 'Muhammad' was very rare in Arabia at that time? Allah inspired his grandfather to give him this beautiful name.",
        },
      },
      interactive: {
        discover: "The Prophet's father was named Abdullah, and his mother was Aminah bint Wahb.",
        value: { name: "Allah's Protection", icon: "🛡️" },
        thinkQuestion: "Why do you think Allah chose for the Prophet to be born in the same year the great miracle of the elephant happened?",
        challenge: {
          type: "multiple_choice",
          question: "What huge animal did the evil army use to try to destroy the Kaaba?",
          options: ["Horse", "Lion", "Elephant", "Camel"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "Ababil Stone", description: "A souvenir to remind you that true power belongs to Allah." },
        badge: "Badge: Child of Mecca",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, Authentic Seerah",
        note: "Events are confirmed by the Quran (Surah Al-Fil) and authentic Seerah.",
      },
    },
    title: "يوم أشرقت مكة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في يوم جميل من فصل الربيع، ولِد طفل صغير وجميل جداً اسمه «محمد». قبل ولادته، حاول جيش كبير معه فيل ضخم أن يهدم الكعبة، لكن الله أرسل طيوراً صغيرة شجاعة طردت الأشرار وحمت مكة! وعندما وُلد محمد ﷺ، فرح جده كثيراً وحمله إلى الكعبة ليحمد الله.",
        shortLesson: "الله قوي جداً، وهو يحمي دائماً بيته ويحمي الأطفال الطيبين.",
      },
      tier_2_age_9_11: {
        narrative:
          "في عام سُمي بـ«عام الفيل»، حاول ملك شرير اسمه أبرهة هدم الكعبة بجيش عظيم يتقدمه فيل ضخم. لكن الله أرسل عليهم طيوراً (أبابيل) تحمل حجارة صغيرة دمرت الجيش وحمت مكة. وفي نفس هذا العام، أشرقت مكة بولادة النبي محمد ﷺ. كان يتيماً لأن والده «عبد الله» مات قبل ولادته. فرح جده «عبد المطلب» به جداً، ودخل به الكعبة وسماه محمداً، ليكون محموداً في الأرض والسماء.",
        details:
          "هل تعلم أن اسم «محمد» لم يكن اسماً منتشراً بين العرب في ذلك الوقت؟ لقد ألهم الله جده بهذا الاسم الجميل.",
      },
    },
    interactive: {
      discover: "اسم والد النبي هو (عبد الله) واسم أمه (آمنة بنت وهب).",
      value: { name: "حماية الله", icon: "🛡️" },
      thinkQuestion:
        "لماذا في رأيك أراد الله أن يولد النبي ﷺ في عام حدثت فيه معجزة كبيرة مثل هزيمة الفيل؟",
      challenge: {
        type: "multiple_choice",
        question: "ما هو الحيوان الضخم الذي استخدمه الجيش الشرير لمحاولة هدم الكعبة؟",
        options: ["الحصان", "الأسد", "الفيل", "الجمل"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "حجر أبابيل", description: "حجر تذكاري يذكرك بأن القوة الحقيقية بيد الله." },
      badge: "وسام: طفل مكة",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، السيرة النبوية الصحيحة",
      note: "الأحداث ثابتة بالقرآن (سورة الفيل) وصحيح السيرة.",
    },
  },
  {
    storyId: "st-1-02",
    stationId: 1,
    slug: "desert-breeze",
    image: "/stories/seerah/desert-breeze.jpg",
    en: {
      title: "The Pure Desert Breeze",
      content: {
        tier_1_age_6_8: {
          narrative:
            "A long time ago, children used to go live in the desert to become brave and strong. Little Muhammad (pbuh) went to live with a kind lady named Halimah. The moment he entered her house, something magical happened! The house filled with joy, there was plenty of milk, and green grass grew for their animals. Halimah loved him so much!",
          shortLesson: "A good and obedient child brings happiness and blessings to their family everywhere they go.",
        },
        tier_2_age_9_11: {
          narrative:
            "It was an Arab custom to send babies to the desert (Badia) to breathe fresh air, grow strong bodies, and learn pure Arabic. A kind lady named Halimah took Prophet Muhammad (pbuh) to nurse him. Even though her family was poor and their animals were weak, the moment the Prophet arrived, amazing 'Barakah' (blessings) filled their lives! Her camel became fast, the sheep gave plenty of milk, and they lived happily the whole time he stayed with them.",
          details:
            "Barakah means an increase in goodness. The Prophet (pbuh) was blessed since childhood, bringing joy to everyone around him.",
        },
      },
      interactive: {
        discover: "The Prophet (pbuh) spent about four years in the desert learning the most beautiful and clear Arabic.",
        value: { name: "Blessing & Contentment", icon: "✨" },
        thinkQuestion: "If you went camping in the desert far away from electronics, what new skill would you like to learn?",
        challenge: {
          type: "multiple_choice",
          question: "What was the name of the kind lady who nursed the Prophet (pbuh) in the desert?",
          options: ["Aminah", "Halimah", "Khadijah", "Fatimah"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "Wooden Milk Bowl", description: "Symbolizes the goodness and blessings that filled Halimah's home." },
        badge: "Badge: Desert Speaker",
      },
      source: {
        reliability: "🟢",
        reference: "The Sealed Nectar, Sahih Muslim",
        note: "Halimah's story and the blessings are well-documented in authentic Seerah books.",
      },
    },
    title: "هواء الصحراء النقي",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في الماضي، كان الأطفال يذهبون للعيش في الصحراء ليتعلموا الشجاعة ويصبحوا أقوياء. ذهب محمد ﷺ للعيش مع سيدة طيبة اسمها «حليمة السعدية». ومنذ أن دخل بيتها، امتلأ البيت بالخير، وكثر الحليب، ونما العشب الأخضر لحيواناتهم. لقد أحبته حليمة جداً!",
        shortLesson: "الطفل الطيب المطيع يجلب السعادة والبركة لعائلته أينما كان.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان من عادة العرب إرسال أطفالهم إلى البادية (الصحراء) ليشموا هواءً نقياً، وتشتد أجسامهم، ويتعلموا اللغة العربية الفصحى. أخذت السيدة «حليمة السعدية» محمداً ﷺ لترضعه. ورغم أن عائلتها كانت فقيرة وحيواناتهم ضعيفة، إلا أنه بمجرد قدوم النبي ﷺ، حلت «البركة» العجيبة! أصبحت ناقتها سريعة، وامتلأت الأغنام بالحليب، وعاشوا في خير وسعادة طوال فترة وجوده معهم.",
        details:
          "البركة تعني زيادة الخير. النبي ﷺ كان مباركاً منذ طفولته، وكان وجوده يسعد كل من حوله.",
      },
    },
    interactive: {
      discover: "قضى النبي ﷺ في بادية بني سعد حوالي أربع سنوات يتعلم فيها الفصاحة.",
      value: { name: "البركة والرضا", icon: "✨" },
      thinkQuestion:
        "لو ذهبت في رحلة تخييم في الصحراء بعيداً عن الأجهزة الإلكترونية، ما هي المهارة التي تحب أن تتعلمها؟",
      challenge: {
        type: "multiple_choice",
        question: "ما اسم السيدة الطيبة التي أرضعت النبي ﷺ في البادية؟",
        options: ["آمنة", "حليمة السعدية", "خديجة", "فاطمة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "وعاء حليب خشبي", description: "يرمز للخير والبركة التي حلت على بيت حليمة." },
      badge: "وسام: فصيح البادية",
    },
    source: {
      reliability: "🟢",
      reference: "الرحيق المختوم، صحيح مسلم (أجزاء من القصة)",
      note: "قصة حليمة والبركة ثابتة ومشهورة في كتب السيرة المعتمدة.",
    },
  },
  {
    storyId: "st-1-03",
    stationId: 1,
    slug: "grandfather-love",
    image: "/stories/seerah/grandfather-love.jpg",
    en: {
      title: "In the Shade of the Kaaba",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When Muhammad (pbuh) was a little boy, his mother returned to Allah (passed away). He was now an orphan with no mom or dad. But his kind grandfather, Abdul Muttalib, hugged him tightly and loved him more than anyone else! His grandpa had a special rug in the shade of the Kaaba, and he only allowed little Muhammad to sit on it with him.",
          shortLesson: "Grandparents love us very much. We must always respect them and sit with them politely.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet (pbuh) was six years old, his mother Aminah passed away in a place called Al-Abwa. His grandfather, Abdul Muttalib, the leader of Quraish, felt deep sorrow for his orphaned grandson and took him under his loving care. Abdul Muttalib had a special rug placed in the shade of the Kaaba. None of his grown sons dared to sit on it out of respect. But whenever little Muhammad (pbuh) came, his grandfather would seat him right next to him, saying: 'This son of mine will have a great future.'",
          details:
            "Being an orphan is not a weakness. It was Allah's way of preparing His Prophet to rely entirely on Him from a very young age.",
        },
      },
      interactive: {
        discover: "Abdul Muttalib passed away when the Prophet (pbuh) was eight years old, after giving him great love and safety.",
        value: { name: "Family Affection", icon: "👴" },
        thinkQuestion: "Who is the person in your family that you feel loves and spoils you just like Abdul Muttalib did?",
        challenge: {
          type: "multiple_choice",
          question: "Where did Abdul Muttalib place his special rug to sit?",
          options: ["In the market", "In the shade of the Kaaba", "On top of a mountain", "Inside a tent"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Leader's Rug", description: "Symbolizes the high status of the Prophet (pbuh) and his grandfather's love." },
        badge: "Badge: Grandson of the Leader",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, Zad al-Ma'ad",
        note: "Abdul Muttalib's care and the rug story are historically authentic.",
      },
    },
    title: "في ظل الكعبة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد أن عادت والدة النبي ﷺ إلى الله (توفيت)، أصبح محمد يتيماً بلا أب ولا أم. لكن جده الطيب «عبد المطلب» ضمه إليه وأحبه حباً كبيراً جداً أكثر من كل أبنائه. كان الجد يفرش سجادة خاصة له بجوار الكعبة، وكان يسمح لمحمد الصغير فقط بالجلوس معه عليها!",
        shortLesson: "الجد والجدة يحبوننا كثيراً، وعلينا أن نحترمهم ونجلس معهم بأدب.",
      },
      tier_2_age_9_11: {
        narrative:
          "عندما بلغ النبي ﷺ السادسة من عمره، توفيت والدته «آمنة» في مكان يسمى (الأبواء). شعر جده «عبد المطلب» زعيم قريش بحزن شديد على حفيده اليتيم، فكفله وأحاطه بحنان بالغ. كان لعبد المطلب فِراش (بساط) يوضع في ظل الكعبة، ولا يجرؤ أحد من أبنائه الكبار على الجلوس عليه احتراماً له، لكن عندما كان يأتي محمد ﷺ الصغير، كان جده يجلسه بجانبه على الفراش ويقول: «إن لابني هذا لشأناً عظيمًا».",
        details:
          "اليتم ليس عيباً أو ضعفاً، بل كان تجهيزاً من الله لنبيه ليعتمد على ربه فقط منذ صغره.",
      },
    },
    interactive: {
      discover: "توفي عبد المطلب والنبي ﷺ في الثامنة من عمره، بعد أن منحه حباً وأماناً كبيراً.",
      value: { name: "حنان العائلة", icon: "👴" },
      thinkQuestion: "من هو الشخص في عائلتك الذي تشعر أنه يحبك ويدللك مثل عبد المطلب؟",
      challenge: {
        type: "multiple_choice",
        question: "أين كان يضع عبد المطلب بساطه (سجادته) ليجلس عليها؟",
        options: ["في السوق", "في ظل الكعبة", "فوق الجبل", "داخل خيمة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بساط الجد الزعيم", description: "يرمز لمكانة النبي ﷺ العالية ومحبة جده له." },
      badge: "وسام: حفيد الزعيم",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، زاد المعاد",
      note: "كفالة عبد المطلب وقصة الفراش ثابتة تاريخياً.",
    },
  },
  {
    storyId: "st-1-04",
    stationId: 1,
    slug: "uncle-home",
    image: "/stories/seerah/uncle-home.jpg",
    en: {
      title: "The Kind Uncle's House",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After his grandfather died, Muhammad (pbuh) moved in with his uncle Abu Talib. His uncle didn't have much money and had many children, but he loved Muhammad deeply. Something magical used to happen! When Muhammad sat to eat with them, the small amount of food was always enough to make everyone full, because Allah put blessings in it.",
          shortLesson: "Sharing our food with family and siblings makes it delicious and enough for everyone.",
        },
        tier_2_age_9_11: {
          narrative:
            "Before he died, Abdul Muttalib asked his son Abu Talib to take care of Muhammad (pbuh). Abu Talib didn't have much wealth but had a large family. Still, he welcomed his nephew and loved him even more than his own kids. Abu Talib noticed something amazing: when his children ate without Muhammad, they wouldn't feel full, but when he ate with them, they all felt satisfied! The Prophet (pbuh) was always content, never complained about food, and learned patience in his uncle's house, who protected him for over 40 years.",
          details:
            "Abu Talib didn't accept Islam, but Allah chose him to protect and defend the Prophet (pbuh) fiercely throughout his life.",
        },
      },
      interactive: {
        discover: "Ali bin Abi Talib (the great companion) is the Prophet's cousin. They grew up together in this very house.",
        value: { name: "Contentment & Sharing", icon: "🍲" },
        thinkQuestion: "If you have a small amount of candy and a lot of friends, how would you act like the Prophet?",
        challenge: {
          type: "multiple_choice",
          question: "Who took care of the Prophet (pbuh) after his grandfather passed away?",
          options: ["His uncle Abu Lahab", "His uncle Abu Talib", "Abu Bakr", "His uncle Al-Abbas"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Blessed Clay Bowl", description: "Symbolizes blessings and contentment in Abu Talib's home." },
        badge: "Badge: The Sharing Soul",
      },
      source: {
        reliability: "🟢",
        reference: "Tabaqat Ibn Sa'd, Prophetic Seerah",
        note: "Abu Talib's guardianship is a central, authentic part of the Seerah.",
      },
    },
    title: "بيت العم الحنون",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد وفاة جده، انتقل محمد ﷺ ليعيش مع عمه «أبو طالب». كان عمه فقيراً ولديه أطفال كثر، لكنه أحب محمداً جداً. وكان هناك شيء عجيب يحدث! عندما كان محمد يجلس ليأكل معهم، كان الطعام القليل يكفيهم جميعاً ويشبعون، لأن الله وضع فيه البركة.",
        shortLesson: "مشاركة الطعام مع الإخوة والعائلة تجعله لذيذاً وتكفي الجميع.",
      },
      tier_2_age_9_11: {
        narrative:
          "أوصى عبد المطلب قبل وفاته أن يكفل «أبو طالب» محمداً ﷺ. كان أبو طالب رجلاً قليل المال وكثير العيال، لكنه ضم ابن أخيه لعياله وقدمه عليهم في المحبة. ولاحظ أبو طالب أمراً عجيباً؛ فعياله كانوا إذا أكلوا دون محمد لم يشبعوا، وإذا أكل معهم شبعوا جميعاً! كان النبي ﷺ قنوعاً، لا يتذمر من قلة الطعام، ويتعلم الصبر والمشاركة في بيت عمه الذي دافع عنه وحماه لأكثر من 40 عاماً.",
        details: "أبو طالب لم يكن مسلماً، لكن الله سخّره ليحمي النبي ﷺ ويدافع عنه طوال حياته بقوة وحب.",
      },
    },
    interactive: {
      discover: "علي بن أبي طالب (الصحابي الجليل) هو ابن عم النبي ﷺ، وقد تربيا معاً في نفس هذا البيت.",
      value: { name: "القناعة والمشاركة", icon: "🍲" },
      thinkQuestion: "عندما يكون لديك القليل من الحلوى وأصدقاؤك كثيرون، كيف تتصرف؟",
      challenge: {
        type: "multiple_choice",
        question: "من الذي تولى رعاية النبي ﷺ بعد وفاة جده؟",
        options: ["عمه أبو لهب", "عمه أبو طالب", "أبو بكر", "عمه العباس"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "طبق الفخار المبارك", description: "يرمز للبركة والقناعة في بيت أبي طالب." },
      badge: "وسام: القنوع المشارك",
    },
    source: {
      reliability: "🟢",
      reference: "الطبقات الكبرى لابن سعد، السيرة النبوية",
      note: "رعاية أبي طالب ثابتة ومحورية في السيرة.",
    },
  },
  {
    storyId: "st-1-05",
    stationId: 1,
    slug: "little-shepherd",
    image: "/stories/seerah/little-shepherd.jpg",
    en: {
      title: "The Little Shepherd",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Did the Prophet (pbuh) play all day when he was little? No! He wanted to help his uncle because his uncle didn't have much money. So, he worked as a 'shepherd'. He took the fluffy sheep to the green mountains to eat and protected them from wolves. This is how he learned to be brave and responsible early on.",
          shortLesson: "Helping our parents with small chores makes us responsible and dependable people.",
        },
        tier_2_age_9_11: {
          narrative:
            "As a young boy, the Prophet (pbuh) didn't want to be a burden on his uncle Abu Talib, who was going through financial hardship. He decided to work and help out! He worked as a shepherd, tending the sheep of the people of Mecca for a small wage. This job wasn't just work; it was a 'school'. In the quiet mountains, he learned patience, mercy for weak animals, deep thinking about Allah's creation, and the courage to protect his flock.",
          details:
            "The Prophet (pbuh) later said: 'Allah did not send any prophet except that he shepherded sheep.' All prophets were shepherds to learn how to lead people with mercy.",
        },
      },
      interactive: {
        discover: "Shepherding teaches a person to pay attention to details. A good shepherd knows every single sheep and cares for the sick ones.",
        value: { name: "Responsibility & Patience", icon: "🐑" },
        thinkQuestion: "What is one small chore you can do at home today to help your family?",
        challenge: {
          type: "multiple_choice",
          question: "What job did the Prophet (pbuh) do when he was young to help his uncle?",
          options: ["Blacksmith", "Shepherd", "Fisherman", "Farmer"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Shepherd's Staff", description: "A symbol of patience, care, and merciful leadership." },
        badge: "Badge: The Responsible Shepherd",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Al-Bukhari (Hadith on Shepherding)",
        note: "His work as a shepherd in Mecca is confirmed by authentic Hadith.",
      },
    },
    title: "الراعي الصغير",
    content: {
      tier_1_age_6_8: {
        narrative:
          "هل كان النبي ﷺ يلعب طوال اليوم وهو صغير؟ لا! لقد أراد أن يساعد عمه لأنه كان فقيراً. فعمل في «رعي الأغنام». كان يأخذ الخراف الصغيرة إلى الجبال الخضراء لتأكل، ويحميها من الذئاب. هكذا تعلم أن يكون مسؤولاً وشجاعاً منذ صغره.",
        shortLesson: "مساعدة الوالدين في بعض المهام تجعلنا أشخاصاً يعتمد عليهم ومسؤولين.",
      },
      tier_2_age_9_11: {
        narrative:
          "لم يقبل النبي ﷺ وهو فتى صغير أن يكون عبئاً على عمه أبي طالب الذي كان يمر بظروف مادية صعبة. فقرر أن يعمل ويساعده! اشتغل النبي ﷺ برعي الأغنام لأهل مكة مقابل أجر قليل. هذه المهنة لم تكن مجرد عمل، بل كانت «مدرسة»؛ ففي الجبال الهادئة تعلم الصبر، والرحمة بالحيوانات الضعيفة، والتأمل في خلق الله، والشجاعة في حماية القطيع.",
        details:
          "قال النبي ﷺ عندما كبر: «ما بعث الله نبياً إلا رعى الغنم». كل الأنبياء عملوا رعاة ليتعلموا قيادة الناس برحمة وصبر.",
      },
    },
    interactive: {
      discover: "الرعي يعلم الإنسان الانتباه للتفاصيل، فالراعي يعرف كل خروف في قطيعه ويهتم بالمريض منها.",
      value: { name: "المسؤولية والصبر", icon: "🐑" },
      thinkQuestion: "ما هي المهمة الصغيرة التي يمكنك القيام بها اليوم في المنزل لمساعدة عائلتك؟",
      challenge: {
        type: "multiple_choice",
        question: "ما هو العمل الذي قام به النبي ﷺ في صغره لمساعدة عمه؟",
        options: ["الحدادة", "رعي الأغنام", "صيد السمك", "الزراعة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "عصا الراعي", description: "رمز للصبر، الرعاية، والقيادة الرحيمة." },
      badge: "وسام: الراعي المسؤول",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري (حديث رعي الغنم)",
      note: "عمله بالرعي في مكة ثابت بنص الحديث الصحيح.",
    },
  },

  // --- Station 2 — الصادق الأمين ---------------------------------------

  {
    storyId: "st-2-01",
    stationId: 2,
    slug: "the-honest-merchant",
    image: "/stories/seerah/the-honest-merchant.jpg",
    en: {
      title: "The Honest Merchant of Mecca",
      content: {
        tier_1_age_6_8: {
          narrative:
            "As Muhammad (pbuh) grew into a young man, he started working in trade (buying and selling). He traveled far away to sell goods. Do you know why everyone loved him? Because he always told the truth and never cheated anyone, even if it meant losing money. That's why the people of Mecca gave him a beautiful nickname: 'Al-Sadiq Al-Amin' (The Truthful and Trustworthy)!",
          shortLesson: "An honest and trustworthy person is loved by Allah and trusted by everyone.",
        },
        tier_2_age_9_11: {
          narrative:
            "In his youth, the Prophet (pbuh) joined his uncle Abu Talib on trading journeys to the Levant (Sham). There, he learned the art of trade. He quickly became famous throughout Mecca for his great character. He never lied, never cheated when weighing items, and always kept people's money safe when they trusted him with it. Because of these rare morals in a society full of deception, the people of Mecca called him 'Al-Sadiq Al-Amin' (The Truthful and Trustworthy), and everyone trusted him completely.",
          details:
            "Honesty is not just about keeping money safe; it is about telling the truth, doing your job perfectly, and never tricking others.",
        },
      },
      interactive: {
        discover: "The Prophet (pbuh) was so famous for his honesty that even his enemies would leave their money with him for safekeeping!",
        value: { name: "Honesty & Trust", icon: "⚖️" },
        thinkQuestion: "If you found a beautiful pen in class and knew it belonged to your friend, what would you do to be 'trustworthy'?",
        challenge: {
          type: "multiple_choice",
          question: "What nickname did the people of Mecca give the Prophet (pbuh) for his honesty?",
          options: ["The Brave", "The Strong", "Al-Sadiq Al-Amin", "The Leader"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "The Golden Scale", description: "Symbolizes fairness and honesty in dealing with people." },
        badge: "Badge: The Honest Merchant",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah",
        note: "The title 'Al-Sadiq Al-Amin' and his work in trade are historically confirmed facts.",
      },
    },
    title: "تاجر مكة الأمين",
    content: {
      tier_1_age_6_8: {
        narrative:
          "عندما كبر محمد ﷺ وأصبح شاباً، بدأ يعمل في التجارة (البيع والشراء). كان يسافر إلى أماكن بعيدة ليبيع البضائع. هل تعلمون لماذا أحبه كل الناس؟ لأنه كان يخبرهم بالحقيقة دائماً ولا يغش أحداً أبداً، حتى لو كان ذلك سيجعله يخسر المال. ولذلك، أطلق عليه أهل مكة لقباً جميلاً جداً: (الصادق الأمين)!",
        shortLesson: "الشخص الصادق والأمين يحبه الله، ويثق به كل الناس.",
      },
      tier_2_age_9_11: {
        narrative:
          "في شبابه، شارك النبي ﷺ عمه أبا طالب في رحلات التجارة إلى بلاد الشام. وهناك تعلم فنون التجارة والبيع والشراء. وسرعان ما اشتهر في مكة كلها بأخلاقه العظيمة؛ فلم يكن يكذب أبداً، ولم يكن يغش في الميزان، وكان يحافظ على أموال الناس التي يتركونها أمانة عنده. بفضل هذه الأخلاق النادرة في مجتمع كان يملؤه الخداع، أطلق عليه أهل مكة لقب (الصادق الأمين)، وأصبح الجميع يثقون به ثقة عمياء.",
        details:
          "الأمانة ليست فقط في حفظ المال، بل في صدق الكلمة وإتقان العمل وعدم خداع الآخرين.",
      },
    },
    interactive: {
      discover: "كان النبي ﷺ مشهوراً بالأمانة لدرجة أن حتى أعداءه كانوا يتركون أموالهم أمانة عنده ليحفظها لهم!",
      value: { name: "الصدق والأمانة", icon: "⚖️" },
      thinkQuestion: "إذا وجدت قلماً جميلاً في الفصل وكنت تعرف أنه لصديقك، ماذا تفعل لتكون (أميناً)؟",
      challenge: {
        type: "multiple_choice",
        question: "ما هو اللقب الذي أطلقه أهل مكة على النبي ﷺ لصدقه؟",
        options: ["الشجاع", "القوي", "الصادق الأمين", "الزعيم"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "ميزان التجارة الذهبي", description: "يرمز للعدل والأمانة في التعامل مع الناس." },
      badge: "وسام: التاجر الأمين",
    },
    source: {
      reliability: "🟢",
      reference: "السيرة النبوية لابن هشام",
      note: "لقب الصادق الأمين وعمله بالتجارة من الثوابت التاريخية المتواترة.",
    },
  },
  {
    storyId: "st-2-02",
    stationId: 2,
    slug: "khadijah",
    image: "/stories/seerah/khadijah.jpg",
    en: {
      title: "The Righteous Wife Khadijah",
      content: {
        tier_1_age_6_8: {
          narrative:
            "There was a very kind and smart lady in Mecca named Khadijah. She was a wealthy businesswoman. When she heard about Muhammad's (pbuh) honesty, she asked him to work for her. When she saw his great manners and success, she wished to marry him. They got married and lived a beautiful life full of love and respect.",
          shortLesson: "Good manners are the most beautiful thing a person can have, and they make people love us.",
        },
        tier_2_age_9_11: {
          narrative:
            "Lady Khadijah bint Khuwaylid was one of the greatest and wealthiest women of Quraish. When she heard of 'Al-Sadiq Al-Amin', she hired the Prophet (pbuh) to trade her goods in Sham and sent her servant Maysarah with him. Maysarah returned amazed by the Prophet's manners and kindness. Khadijah was more impressed by his noble character than the profits he made, so she offered to marry him. The Prophet (pbuh) agreed, and she became his first and most important wife, always supporting him.",
          details:
            "The Prophet (pbuh) had all his children with Lady Khadijah (Al-Qasim, Abdullah, Zainab, Ruqayyah, Umm Kulthum, and Fatimah) except for Ibrahim.",
        },
      },
      interactive: {
        discover: "Lady Khadijah was nicknamed 'The Pure One' (Al-Tahirah) in Mecca for her high morals even before Islam.",
        value: { name: "Respect & Love", icon: "❤️" },
        thinkQuestion: "How can you show respect to your mother at home, just like the Prophet (pbuh) respected his family?",
        challenge: {
          type: "multiple_choice",
          question: "What is the name of the great lady the Prophet (pbuh) married after trading her goods?",
          options: ["Halimah", "Aminah", "Khadijah", "Aishah"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "Khadijah's Lantern", description: "Symbolizes warmth, love, and support in the Prophet's family." },
        badge: "Badge: The Loving Family",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Al-Bukhari, Ibn Hisham's Seerah",
        note: "The Prophet's marriage to Lady Khadijah is unanimously agreed upon in sources.",
      },
    },
    title: "الزوجة الصالحة خديجة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كانت هناك سيدة طيبة وذكية جداً في مكة اسمها «خديجة». كانت خديجة سيدة غنية، وعندما سمعت عن أمانة محمد ﷺ وصدقه، طلبت منه أن يعمل في تجارتها. ولما رأت أخلاقه العظيمة ونجاحه، تمنت أن تتزوجه. وتزوجا بالفعل، وعاشا حياة مليئة بالحب والاحترام.",
        shortLesson: "الأخلاق الطيبة هي أجمل شيء يمتلكه الإنسان، وهي سبب لمحبة الناس لنا.",
      },
      tier_2_age_9_11: {
        narrative:
          "السيدة «خديجة بنت خويلد» كانت من أعظم نساء قريش وأكثرهن مالاً وعقلاً. عندما سمعت بلقب (الصادق الأمين)، أرسلت للنبي ﷺ ليتاجر بمالها في الشام، وأرسلت معه خادمها «ميسرة». عاد ميسرة من الرحلة مبهوراً بأخلاق النبي وحسن تعامله. أُعجبت خديجة بأخلاقه الكريمة أكثر من الأرباح التي حققها، وعرضت عليه الزواج. فوافق النبي ﷺ، وأصبحت السيدة خديجة أول وأهم زوجة في حياته، وكانت تدعمه دائماً.",
        details:
          "أنجب النبي ﷺ من السيدة خديجة كل أبنائه (القاسم، عبد الله، زينب، رقية، أم كلثوم، وفاطمة) ما عدا إبراهيم.",
      },
    },
    interactive: {
      discover: "السيدة خديجة كانت تُلقب في مكة بـ (الطاهرة) لأخلاقها العالية قبل الإسلام.",
      value: { name: "الاحترام والمحبة", icon: "❤️" },
      thinkQuestion: "كيف تظهر الاحترام لأمك في البيت كما كان النبي ﷺ يحترم عائلته؟",
      challenge: {
        type: "multiple_choice",
        question: "ما اسم السيدة العظيمة التي تزوجها النبي ﷺ بعد أن تاجر بمالها؟",
        options: ["حليمة", "آمنة", "خديجة", "عائشة"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "مصباح خديجة المضيء", description: "يرمز للدفء والحب والدعم في أسرة النبي ﷺ." },
      badge: "وسام: العائلة المتحابة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، سيرة ابن هشام",
      note: "زواج النبي ﷺ من السيدة خديجة ثابت بإجماع المصادر.",
    },
  },
  {
    storyId: "st-2-03",
    stationId: 2,
    slug: "the-black-stone",
    image: "/stories/seerah/the-black-stone.jpg",
    en: {
      title: "The Wisdom of the Black Stone",
      content: {
        tier_1_age_6_8: {
          narrative:
            "One day, a part of the Kaaba was damaged, so the people worked together to rebuild it. But they had a big argument: who would get to put the 'Black Stone' back in its place? They almost started a fight! Suddenly, Muhammad (pbuh) walked in. They were happy and said, 'This is the Trustworthy one, we accept his judgment!' Muhammad used his cleverness; he put the stone on a large cloth and asked each group to hold a corner. They lifted it together, and he pushed it into place with his own hands. That's how he stopped a fight!",
          shortLesson: "A smart person is the one who solves problems between friends so they don't fight.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet (pbuh) was 35 years old, Quraish rebuilt the Kaaba after a strong flood damaged it. The tribes worked together peacefully until it was time to place the 'Black Stone'. Every tribe wanted this great honor, and the disagreement grew so fierce that a war almost started. They agreed that the first man to enter the gate would judge between them, and it was the Prophet (pbuh). With his great wisdom, he asked for a cloak, placed the stone in the middle, and asked the leader of each tribe to hold an edge. They lifted it together, and the Prophet placed the stone in its spot, preventing a war and satisfying everyone.",
          details:
            "This great event proves that the Prophet (pbuh) was a leader and a peacemaker even before he received revelation.",
        },
      },
      interactive: {
        discover: "The Black Stone is located in the eastern corner of the Kaaba, and that is where the Tawaf (circumambulation) begins.",
        value: { name: "Wisdom & Peace", icon: "🕊️" },
        thinkQuestion: "If your friends argued over who gets to be the team captain in a game, how would you solve the problem cleverly?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet (pbuh) use to solve the problem of the Black Stone?",
          options: ["A wooden stick", "A cloak (piece of cloth)", "A wooden box", "A sword"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Cloak of Peace", description: "Symbolizes teamwork and solving disagreements wisely." },
        badge: "Badge: The Peacemaker",
      },
      source: {
        reliability: "🟢",
        reference: "Musnad Ahmad, Ibn Hisham's Seerah",
        note: "The story of the Black Stone is authentic and highlights his leadership before Prophethood.",
      },
    },
    title: "حكمة الحجر الأسود",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في يوم من الأيام، تهدم جزء من الكعبة، فتعاون الناس لبنائها. لكنهم اختلفوا بشدة: مَن سيضع «الحجر الأسود» في مكانه؟ كادوا أن يتشاجروا! وفجأة دخل محمد ﷺ، ففرحوا وقالوا: «هذا الأمين، رضينا به حكماً». استخدم محمد ذكاءه؛ فوضع الحجر على قطعة قماش، وجعل كل فريق يمسك بطرف، فرفعوه معاً ووضع هو الحجر بيده. وهكذا منع الشجار!",
        shortLesson: "الذكي هو من يحل المشاكل بين أصدقائه ليجعلهم متحابين ولا يتشاجرون.",
      },
      tier_2_age_9_11: {
        narrative:
          "عندما كان النبي ﷺ في الخامسة والثلاثين من عمره، قامت قريش بتجديد بناء الكعبة بعد أن أصابها سيل قوي. اشتركت القبائل في البناء بسلام، حتى وصلوا إلى مرحلة وضع «الحجر الأسود». هنا طمعت كل قبيلة في نيل هذا الشرف العظيم، واشتد الخلاف بينهم حتى كادت أن تقع حرب كبيرة. اتفقوا أن أول من يدخل عليهم سيحكم بينهم، فكان هو النبي ﷺ. بفضل حكمته البالغة، طلب رداءً (عباءة)، وضع الحجر وسطه، وطلب من زعيم كل قبيلة أن يمسك بطرف الرداء. رفعوه جميعاً، ثم وضع النبي الحجر بيده في مكانه، فحقن الدماء وأرضى الجميع.",
        details:
          "هذا الموقف العظيم يثبت أن النبي ﷺ كان قائداً وداعية للسلام حتى قبل أن يوحى إليه.",
      },
    },
    interactive: {
      discover: "الحجر الأسود يقع في الزاوية الشرقية للكعبة المشرفة، ومن عنده يبدأ الطواف.",
      value: { name: "الحكمة والسلام", icon: "🕊️" },
      thinkQuestion: "لو اختلف أصدقاؤك على من يكون قائد الفريق في اللعبة، كيف تحل المشكلة بذكاء؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا استخدم النبي ﷺ ليحل مشكلة الحجر الأسود؟",
        options: ["عصا خشبية", "رداء (قطعة قماش)", "صندوق خشبي", "سيف"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "رداء السلام", description: "يرمز للتعاون وحل الخلافات بذكاء وحكمة." },
      badge: "وسام: صانع السلام",
    },
    source: {
      reliability: "🟢",
      reference: "مسند أحمد، سيرة ابن هشام",
      note: "قصة الحجر الأسود ثابتة وتعتبر من أهم إرهاصات القيادة قبل النبوة.",
    },
  },
  {
    storyId: "st-2-04",
    stationId: 2,
    slug: "hilf-al-fudul",
    image: "/stories/seerah/hilf-al-fudul.jpg",
    en: {
      title: "Helping the Oppressed",
      content: {
        tier_1_age_6_8: {
          narrative:
            "A stranger came to Mecca to sell his goods, but a bad man took his stuff and didn't pay him. The stranger cried because he was treated unfairly. So, Muhammad (pbuh) met with the good men of Mecca, and they made a great promise called 'Hilf al-Fudul'. They said: 'We must help anyone who is wronged and get their rights back.' And they did get the man's money back!",
          shortLesson: "We must always help the weak and never side with the unfair oppressor.",
        },
        tier_2_age_9_11: {
          narrative:
            "One of the leaders of Mecca wronged a stranger from Yemen by refusing to pay for his goods. The oppressed man stood on a mountain and shouted for help. The noble men of Mecca gathered in the house of a man named Abdullah bin Jud'an and made a great pact called 'Hilf al-Fudul' (The Alliance of Virtues). They agreed that if they found anyone oppressed in Mecca, they would stand with him against the oppressor until his rights were restored. The Prophet (pbuh) was in his twenties and attended this pact. Later, as a Prophet, he said: 'If I were called to it in Islam, I would respond,' because Islam supports justice.",
          details:
            "The Prophet (pbuh) taught us that religion and good morals always agree on helping the oppressed, no matter their background.",
        },
      },
      interactive: {
        discover: "'Hilf al-Fudul' means 'The Alliance of Virtues' because it was based on noble morals and justice.",
        value: { name: "Justice & Helping the Weak", icon: "🤝" },
        thinkQuestion: "If you saw an older kid bullying a younger kid at school, what would you do?",
        challenge: {
          type: "multiple_choice",
          question: "What was the name of the great agreement the Prophet (pbuh) attended to help the oppressed?",
          options: ["Hilf al-Fudul", "The Pact of Mecca", "The Peace Agreement", "The Trade Contract"],
          correctAnswer: 0,
        },
      },
      gamification: {
        artifact: { name: "The Document of Justice", description: "Reminds you to always stand by the weak and oppressed." },
        badge: "Badge: Defender of the Weak",
      },
      source: {
        reliability: "🟢",
        reference: "Sunan Al-Bayhaqi, Prophetic Seerah",
        note: "His attendance at Hilf al-Fudul is authentic and shows his inclination to justice.",
      },
    },
    title: "نصرة المظلوم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء رجل غريب إلى مكة ليبيع بضائعه، لكن رجلاً سيئاً أخذ بضاعته ولم يعطه نقوده. بكى الرجل الغريب لأنه مظلوم. فاجتمع محمد ﷺ مع رجال مكة الطيبين، وتعاهدوا على عهد عظيم اسمه (حلف الفضول). قالوا فيه: «يجب أن نساعد أي شخص مظلوم، ونعيد له حقه». وبالفعل أعادوا للرجل ماله!",
        shortLesson: "يجب علينا دائماً أن نساعد الضعيف، ولا نقف مع الظالم.",
      },
      tier_2_age_9_11: {
        narrative:
          "ظلم أحد سادة مكة رجلاً غريباً قادماً من اليمن، فرفض أن يدفع له ثمن بضاعته. صعد الرجل المظلوم إلى جبل وصرخ طالباً المساعدة. فاجتمع أشراف مكة الطيبون في دار رجل اسمه (عبد الله بن جُدعان)، وتعاهدوا تعاهداً عظيماً سُمي بـ (حلف الفضول). كان نص الاتفاق: ألا يجدوا مظلوماً في مكة إلا وقفوا معه ضد الظالم حتى يعيدوا له حقه. كان النبي ﷺ شاباً في العشرينيات، وحضر هذا الحلف وأعجب به جداً. وبعد أن أصبح نبياً قال: «لو دُعيت به في الإسلام لأجبت»، لأن الإسلام يدعم العدل.",
        details:
          "علمنا النبي ﷺ أن الدين والأخلاق يتفقان دائماً على نصرة المظلوم، مهما كان دينه أو جنسيته.",
      },
    },
    interactive: {
      discover: "سمي «حلف الفضول» بهذا الاسم لأنه يعني (حلف الفضائل والأخلاق الكريمة).",
      value: { name: "العدل ونصرة المظلوم", icon: "🤝" },
      thinkQuestion: "لو رأيت طفلاً كبيراً يضايق طفلاً صغيراً في المدرسة، ماذا تفعل؟",
      challenge: {
        type: "multiple_choice",
        question: "ما اسم الاتفاق العظيم الذي حضره النبي ﷺ لنصرة المظلومين؟",
        options: ["حلف الفضول", "حلف مكة", "اتفاق السلام", "عقد التجارة"],
        correctAnswer: 0,
      },
    },
    gamification: {
      artifact: { name: "وثيقة العدل", description: "تذكرك بأن تقف دائماً بجانب الضعفاء والمظلومين." },
      badge: "وسام: نصير المظلوم",
    },
    source: {
      reliability: "🟢",
      reference: "سنن البيهقي، السيرة النبوية",
      note: "حضور النبي لحلف الفضول ثابت ومهم لتوضيح ميله للعدل قبل البعثة.",
    },
  },
  {
    storyId: "st-2-05",
    stationId: 2,
    slug: "cave-of-hira",
    image: "/stories/seerah/cave-of-hira.jpg",
    en: {
      title: "Solitude and Reflection",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the time of the Prophet (pbuh), people used to worship stone statues (idols). But Muhammad (pbuh) was very smart, and he knew that stones couldn't help or harm anyone. So, he liked to go to a quiet cave on top of a mountain called the 'Cave of Hira' to sit alone and think: Who created this beautiful sky? Who made the mountains? He only worshipped Allah, the Great Creator.",
          shortLesson: "Using our minds and thinking about the sky and nature helps us know the greatness of Allah.",
        },
        tier_2_age_9_11: {
          narrative:
            "As the years passed, the Prophet (pbuh) saw his people bowing down to stone idols. His heart completely rejected these actions, and he never bowed to an idol. He began to prefer solitude and quietness. He would take some water and dates and climb up to a small cave at the top of 'Mount Noor' called the 'Cave of Hira'. He would spend days and nights there looking at the stars and the vast universe, thinking about the Great Creator who made this masterpiece. Through this quiet reflection, Allah was preparing him to receive the greatest message in history.",
          details:
            "Reflecting on Allah's creation (the sky, the stars, the mountains) is an act of worship that increases faith in the heart.",
        },
      },
      interactive: {
        discover: "The mountain where the Cave of Hira is located is called 'Jabal al-Noor' (The Mountain of Light) because it is where the light of revelation began.",
        value: { name: "Reflection & Meditation", icon: "🌌" },
        thinkQuestion: "What is something in nature (like the stars, the sea, or trees) that makes you wonder about Allah's power?",
        challenge: {
          type: "multiple_choice",
          question: "What is the name of the cave where the Prophet (pbuh) used to reflect on Allah's creation?",
          options: ["Cave of Thawr", "Cave of Hira", "Cave of Mecca", "Cave of Noor"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Simple Water Skin", description: "Symbolizes simplicity, calmness, and reflection in the Cave of Hira." },
        badge: "Badge: The Smart Thinker",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Al-Bukhari",
        note: "His worship and reflection in the Cave of Hira are authenticated in the two Sahihs.",
      },
    },
    title: "الخلوة والتفكر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان الناس في زمان النبي ﷺ يعبدون تماثيل من الحجارة (الأصنام). لكن محمداً ﷺ كان ذكياً جداً، وكان يعرف أن الحجارة لا تضر ولا تنفع. لذلك، كان يحب أن يذهب إلى كهف هادئ في قمة جبل اسمه (غار حراء)، ليجلس بمفرده ويفكر: من خلق هذه السماء الجميلة؟ ومن خلق الجبال؟ وكان يعبد الله الخالق العظيم.",
        shortLesson: "استخدام عقلنا والتفكير في السماء والطبيعة يجعلنا نعرف عظمة الله الخالق.",
      },
      tier_2_age_9_11: {
        narrative:
          "مع مرور السنوات، كان النبي ﷺ يرى قومه يسجدون للأصنام الحجرية، وكان قلبه يرفض هذه الأفعال تماماً، فلم يسجد لصنم قط. أصبح يفضل العزلة والهدوء، فكان يأخذ بعض الماء والتمر، ويصعد إلى كهف صغير في أعلى «جبل النور» يسمى (غار حراء). كان يقضي هناك أياماً وليالي يتأمل في النجوم، والكون الواسع، ويفكر في الخالق العظيم الذي صنع هذا الإبداع. كان الله يعدّه بهذا التأمل والهدوء لاستقبال أعظم رسالة في التاريخ.",
        details:
          "التفكر في خلق الله (السماء، النجوم، الجبال) يُسمى «عبادة التفكر»، وهي تزيد الإيمان في القلب.",
      },
    },
    interactive: {
      discover: "يُسمى الجبل الذي يوجد فيه غار حراء بـ (جبل النور)، لأنه المكان الذي بدأ منه نزول نور الوحي على الأرض.",
      value: { name: "التأمل والتفكر", icon: "🌌" },
      thinkQuestion: "ما هو أكثر شيء تراه في الطبيعة (مثل النجوم، البحر، أو الأشجار) يجعلك تتعجب من قدرة الله؟",
      challenge: {
        type: "multiple_choice",
        question: "ما اسم الغار (الكهف) الذي كان النبي ﷺ يتفكر فيه بخلق الله؟",
        options: ["غار ثور", "غار حراء", "غار مكة", "غار النور"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قربة الماء البسيطة", description: "ترمز للبساطة، والهدوء، والتأمل في غار حراء." },
      badge: "وسام: المتفكر الذكي",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري (حديث عائشة عن بدء الوحي)",
      note: "تحنثه (تعبده) في غار حراء ثابت في الصحيحين.",
    },
  },
];
