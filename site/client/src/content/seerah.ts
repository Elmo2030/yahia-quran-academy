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
  /** Station artwork, shown above its stories. Optional: a station without
   *  art simply shows none. */
  cover?: string;
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
  {
    stationId: 3,
    titleAr: "الوحي",
    titleEn: "The Revelation",
    descriptionAr:
      "خمس قصص من بدء الوحي: أول لقاء في غار حراء، وما قاله ورقة بن نوفل، وفترة انقطاع الوحي وسورة الضحى، وأمر القيام في سورة المدثر، وأوجه نزول الوحي.",
    descriptionEn:
      "Five stories from the beginning of the revelation: the first meeting in Cave Hira, what Waraqah ibn Nawfal said, the pause and Surah Ad-Duha, the call to rise in Surah Al-Muddaththir, and the forms the revelation took.",
  },
  {
    stationId: 4,
    titleAr: "الدعوة: سرًّا ثم جهرًا",
    titleEn: "The Call: In Secret, Then Aloud",
    cover: "/stories/seerah/station-4.jpg",
    descriptionAr:
      "عشر قصص من سنوات الدعوة في مكة: دار الأرقم، ونداء الصفا، وصبر بلال وآل ياسر، والهجرة إلى الحبشة، وحصار الشِّعب وعام الحزن، وإسلام حمزة وعمر، وردّه على عرض المال والملك، وانشقاق القمر، وقصة الطفيل، ورحلة الطائف.",
    descriptionEn:
      "Ten stories from the years of the call in Mecca: Dar al-Arqam, the call from Safa, the patience of Bilal and the family of Yasir, the migration to Abyssinia, the siege and the Year of Sorrow, the Islam of Hamza and Umar, his answer to the offer of wealth and kingship, the splitting of the moon, the story of at-Tufayl, and the journey to Taif.",
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
  {
    storyId: "st-3-01",
    stationId: 3,
    slug: "revelation-iqra",
    en: {
      title: "The First Light: Cave Hira and the Word Iqra",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Prophet Muhammad (pbuh) loved to sit alone in a quiet cave on a mountain called Cave Hira, thinking about the sky and the earth and who made them. One night in Ramadan, when he was forty years old, the angel Jibril came to him suddenly and said: “Read!” The Prophet (pbuh) answered, frightened: “I cannot read.” Then Jibril recited to him the first verses of the Quran. He went home trembling, and his wife Khadijah welcomed him and comforted him: “By Allah, Allah will never disgrace you.”",
          shortLesson: "The very first word of the Quran is “Read” — knowledge is where the road begins.",
        },
        tier_2_age_9_11: {
          narrative:
            "Prophet Muhammad (pbuh) loved to spend time alone. He would go to a cave at the top of a mountain called Cave Hira, sitting there for days thinking about the creation of the heavens and the earth. When he reached forty years of age, during the month of Ramadan, the angel Jibril suddenly came down to him. Jibril held him tightly and said: “Read.” The Prophet (pbuh), frightened and amazed, replied: “I cannot read.” This happened three times, and then Jibril recited the very first verses of the Quran. The Prophet (pbuh) returned home trembling from the intensity of it, and his wife Lady Khadijah welcomed him and comforted him, saying: “By Allah, Allah will never disgrace you. You keep good relations with your family, you speak the truth, and you help the weak.”",
          details:
            "The first verses ever revealed: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾ — “Read, in the name of your Lord who created.”",
        },
      },
      interactive: {
        discover: "The first revelation was five verses of Surah Al-Alaq, beginning with “Read”.",
        value: { name: "Knowledge and reading", icon: "📖" },
        thinkQuestion: "Why do you think the first word the angel said to the Prophet (pbuh) was “Read”, and not something else?",
        challenge: {
          type: "multiple_choice",
          question: "What was the first word of the Quran revealed to the Prophet (pbuh)?",
          options: ["Write", "Read", "Stand", "Listen"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Pen of Light", description: "A keepsake to remind you that knowledge is the first thing Allah commanded." },
        badge: "Badge: First of the Readers",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, the Book of the Beginning of Revelation",
        note: "The account of the first revelation at Cave Hira is established in Sahih al-Bukhari.",
      },
    },
    title: "أول النور: غار حراء وكلمة اقرأ",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان النبي محمد ﷺ يحب أن يجلس وحده في غار هادئ فوق الجبل اسمه «غار حراء»، يفكّر في السماء والأرض ومَن خلقهما. وفي ليلة من رمضان، وعمره أربعون سنة، جاءه المَلَك جبريل عليه السلام فجأة وقال له: «اقرأ!». فقال النبي ﷺ وهو خائف: «ما أنا بقارئ». ثم قرأ عليه جبريل أول آيات من القرآن. رجع النبي ﷺ إلى بيته يرتجف، فاستقبلته زوجته خديجة رضي الله عنها وطمأنته وقالت له: «والله لا يخزيك الله أبداً».",
        shortLesson: "أول كلمة في القرآن هي «اقرأ» — فالعلم أول الطريق.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان النبي ﷺ يحب الخلوة، فكان يذهب إلى غار في أعلى جبل يُسمى «غار حراء»، ويجلس فيه أياماً يتأمل في خلق السماوات والأرض. ولما بلغ الأربعين من عمره، وفي شهر رمضان، نزل عليه المَلَك جبريل عليه السلام فجأة. ضمّه جبريل بقوة وقال له: «اقرأ». فرد النبي ﷺ وهو خائف مندهش: «ما أنا بقارئ». تكرر الأمر ثلاث مرات، ثم قرأ عليه جبريل أول آيات من القرآن الكريم. وعاد النبي ﷺ إلى بيته يرتجف من شدة الموقف، فاستقبلته زوجته العظيمة السيدة خديجة رضي الله عنها وطمأنته قائلة: «والله لا يخزيك الله أبداً، إنك لتصل الرحم، وتصدق الحديث، وتساعد الضعيف».",
        details:
          "قال تعالى في أول آيات نزلت من القرآن الكريم: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾.",
      },
    },
    interactive: {
      discover: "أول ما نزل من القرآن خمس آيات من سورة العلق، أولها ﴿اقْرَأْ﴾.",
      value: { name: "العلم والقراءة", icon: "📖" },
      thinkQuestion:
        "لماذا في رأيك كانت أول كلمة يقولها المَلَك للنبي ﷺ هي «اقرأ» وليست كلمة أخرى؟",
      challenge: {
        type: "multiple_choice",
        question: "ما أول كلمة نزلت من القرآن الكريم على النبي ﷺ؟",
        options: ["اكتب", "اقرأ", "قُم", "اسمع"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قلم من نور", description: "تذكار يذكّرك بأن العلم أول ما أمر الله به." },
      badge: "وسام: أول القُرّاء",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، كتاب بدء الوحي",
      note: "حديث بدء الوحي في غار حراء ثابت في صحيح البخاري.",
    },
  },
  {
    storyId: "st-3-02",
    stationId: 3,
    slug: "revelation-waraqah",
    en: {
      title: "Waraqah ibn Nawfal: The Great Secret",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Lady Khadijah took the Prophet (pbuh) to her cousin Waraqah ibn Nawfal, a wise old man who read the ancient holy books. When Waraqah heard what had happened in the cave, he was delighted and said: this is the same angel who came to Musa! He told the Prophet (pbuh) that he was the prophet of this nation, that his people would harm him, and he wished he were young and strong enough to stand with him.",
          shortLesson: "When something is hard to understand, we ask people of knowledge and wisdom.",
        },
        tier_2_age_9_11: {
          narrative:
            "Lady Khadijah took the Prophet (pbuh) to her cousin Waraqah ibn Nawfal. He was a wise man and a scholar of the ancient holy books, the Torah and the Gospel. When Waraqah heard what had happened to the Prophet (pbuh) in the cave, he was overjoyed and told him: this is the Namus — the angel Jibril — whom Allah sent down to Musa. He told him that he was the prophet of this nation, and warned him that his people would fight him and drive him out of Mecca. Waraqah wished he were a strong young man so that he could support the Prophet (pbuh) on the day people turned against him. With those words, the Prophet's heart settled and he was certain of his message.",
          details:
            "Allah says of the People of the Book: ﴿الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمْ﴾ — they know him as they know their own sons.",
        },
      },
      interactive: {
        discover: "Waraqah ibn Nawfal was Lady Khadijah's cousin.",
        value: { name: "Asking those who know", icon: "🧭" },
        thinkQuestion: "If you met a hard question you could not answer, who is the wise person at home or at school you would ask?",
        challenge: {
          type: "multiple_choice",
          question: "What did Waraqah call the angel who came to the Prophet (pbuh)?",
          options: ["A king of the Arabs", "The Namus who came to Musa", "A man of Mecca", "A merchant from Sham"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An Ancient Scroll", description: "A scroll to remind you that old knowledge pointed to the truth." },
        badge: "Badge: Seeker of Wisdom",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, the Book of the Beginning of Revelation",
        note: "Khadijah taking the Prophet (pbuh) to Waraqah is established in Sahih al-Bukhari.",
      },
    },
    title: "ورقة بن نوفل: السرّ العظيم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "أخذت السيدة خديجة رضي الله عنها النبي ﷺ إلى ابن عمها ورقة بن نوفل، وكان رجلاً عجوزاً حكيماً يقرأ الكتب السماوية القديمة. ولما سمع ورقة ما حدث في الغار فرح وقال: هذا هو المَلَك الذي نزل على موسى عليه السلام! وأخبر النبيَّ ﷺ أنه نبي هذه الأمة، وأن قومه سيؤذونه، وتمنّى لو كان شاباً قوياً لينصره.",
        shortLesson: "لما يصعب علينا فهم أمر، نسأل أهل العلم والحكمة.",
      },
      tier_2_age_9_11: {
        narrative:
          "أخذت السيدة خديجة رضي الله عنها النبيَّ ﷺ إلى ابن عمها «ورقة بن نوفل»، وكان رجلاً حكيماً عالماً بالكتب السماوية القديمة كالتوراة والإنجيل. فلما سمع ورقة ما حدث للنبي ﷺ في الغار فرح فرحاً شديداً وقال له: هذا هو الناموس — يعني المَلَك جبريل — الذي أنزله الله على موسى عليه السلام. وأخبره أنه نبي هذه الأمة، وحذّره من أن قومه سيحاربونه ويخرجونه من مكة، وتمنّى ورقة لو كان شاباً قوياً لينصر النبي ﷺ يوم يعاديه الناس. وبهذه الكلمات اطمأن قلب النبي ﷺ وتأكد من رسالته.",
        details:
          "قال تعالى مبيّناً أن أهل الكتاب كانوا يعرفون صفة النبي: ﴿الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمْ﴾.",
      },
    },
    interactive: {
      discover: "ورقة بن نوفل كان ابن عم السيدة خديجة رضي الله عنها.",
      value: { name: "سؤال أهل العلم", icon: "🧭" },
      thinkQuestion:
        "لو واجهتك مسألة صعبة لا تفهمها، مَن الشخص الحكيم الذي تسأله في بيتك أو مدرستك؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا وصف ورقةُ بن نوفل المَلَكَ الذي جاء النبي ﷺ؟",
        options: ["ملك من ملوك العرب", "الناموس الذي نزل على موسى", "رجل من أهل مكة", "تاجر من الشام"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "لفافة قديمة", description: "لفافة تذكّرك بأن العلم القديم دلّ على الحق." },
      badge: "وسام: طالب الحكمة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، كتاب بدء الوحي",
      note: "خبر ذهاب خديجة بالنبي ﷺ إلى ورقة ثابت في صحيح البخاري.",
    },
  },
  {
    storyId: "st-3-03",
    stationId: 3,
    slug: "revelation-pause",
    en: {
      title: "The Pause of Revelation and Surah Ad-Duha",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After that first meeting, Jibril was delayed and did not come to the Prophet (pbuh) for a while. He grew sad and missed hearing the words of Allah, and some of the idol-worshippers began to mock him, saying: his Lord has left him! Then Jibril came down with a whole surah to reassure him that Allah had not left him and was not angry with him, and that what was coming was better.",
          shortLesson: "Allah never forgets His servants, and after hardship comes ease.",
        },
        tier_2_age_9_11: {
          narrative:
            "After the first meeting in the cave, the angel Jibril was delayed and did not come down to the Prophet (pbuh) for a period known as the pause of revelation. The Prophet (pbuh) became very sad and longed to hear the words of Allah. Some of the idol-worshippers began to mock him, saying: Muhammad's Lord has abandoned him and is angry with him. That made his sadness heavier — until the light returned. Jibril came down with an entire surah full of love, reassurance and comfort, telling the Prophet (pbuh) that Allah had never left him, was never angry with him, and that what lay ahead was better than what had passed.",
          details:
            "Allah comforts him in Surah Ad-Duha: ﴿مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ﴾.",
        },
      },
      interactive: {
        discover: "The whole of Surah Ad-Duha came down to comfort the Prophet (pbuh) after the pause.",
        value: { name: "Calm after sadness", icon: "🌅" },
        thinkQuestion: "When you feel sad, what words settle your heart? And who do you like to hear them from?",
        challenge: {
          type: "multiple_choice",
          question: "Which surah came down to comfort the Prophet (pbuh) after the pause of revelation?",
          options: ["Surah Al-Fil", "Surah Ad-Duha", "Surah Al-Kawthar", "Surah Al-Asr"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Light of Morning", description: "A ray to remind you that ease follows every hardship." },
        badge: "Badge: A Settled Heart",
      },
      source: {
        reliability: "🟢",
        reference: "Surah Ad-Duha, and Sahih al-Bukhari",
        note: "The occasion of Surah Ad-Duha following the pause is established in Sahih al-Bukhari.",
      },
    },
    title: "انقطاع الوحي وسورة الضحى",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد اللقاء الأول تأخر جبريل عليه السلام ولم ينزل على النبي ﷺ مدة، فحزن النبي ﷺ واشتاق إلى كلام الله. وبدأ بعض المشركين يسخرون ويقولون: ترك محمداً ربُّه! ثم نزل جبريل بسورة كاملة تطمئنه أن الله ما تركه ولا غضب عليه، وأن ما هو آتٍ أجمل.",
        shortLesson: "الله لا ينسى عباده أبداً، وبعد الضيق فرج.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد اللقاء الأول في الغار، تأخر المَلَك جبريل عليه السلام ولم ينزل على النبي ﷺ فترة سُميت «فترة فتور الوحي». فحزن النبي ﷺ حزناً شديداً واشتاق لسماع كلام الله. وبدأ بعض المشركين يسخرون منه ويقولون: لقد ترك محمداً ربُّه وغضب عليه! فزاد ذلك من حزنه، حتى أشرق النور من جديد: نزل جبريل عليه السلام بسورة كاملة مليئة بالحب والطمأنينة والمواساة، تؤكد للنبي ﷺ أن الله لم يتركه ولم يقلِه، وأن الآخرة خير له من الأولى.",
        details:
          "قال تعالى يواسي نبيه في سورة الضحى: ﴿مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ﴾.",
      },
    },
    interactive: {
      discover: "سورة الضحى نزلت كلها مواساة للنبي ﷺ بعد فترة انقطاع الوحي.",
      value: { name: "الطمأنينة بعد الحزن", icon: "🌅" },
      thinkQuestion:
        "حين تحزن، ما الكلام الذي يطمئن قلبك؟ ومن الذي تحب أن تسمعه منه؟",
      challenge: {
        type: "multiple_choice",
        question: "أي سورة نزلت تواسي النبي ﷺ بعد انقطاع الوحي؟",
        options: ["سورة الفيل", "سورة الضحى", "سورة الكوثر", "سورة العصر"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ضوء الضحى", description: "شعاع يذكّرك أن بعد كل عسر يسراً." },
      badge: "وسام: قلب مطمئن",
    },
    source: {
      reliability: "🟢",
      reference: "سورة الضحى، وصحيح البخاري",
      note: "سبب نزول سورة الضحى بعد فترة فتور الوحي ثابت في صحيح البخاري.",
    },
  },
  {
    storyId: "st-3-04",
    stationId: 3,
    slug: "revelation-muddaththir",
    en: {
      title: "O You Wrapped in Garments: Arise and Warn",
      content: {
        tier_1_age_6_8: {
          narrative:
            "One day as the Prophet (pbuh) was walking, he heard a voice from the sky. He looked up and saw Jibril between the sky and the earth. He hurried home saying: “Cover me, cover me!” And while he lay covered, Jibril came down with verses commanding him to rise, to leave his rest, and to call people to worship Allah alone.",
          shortLesson: "When there is important work to do, we leave our comfort and get up.",
        },
        tier_2_age_9_11: {
          narrative:
            "One day as the Prophet (pbuh) was walking, he heard a voice from the sky. He raised his head and saw the angel Jibril seated on a great throne between the sky and the earth. Overwhelmed by the majesty of it, he hurried home trembling and said: “Cover me, cover me,” meaning wrap me in garments. And while he lay covered in his bed, Jibril came down with powerful verses commanding him to leave the blanket and the rest, to rise at once and begin the work: to warn the people and teach them to worship Allah alone and leave the idols. The time for rest was over, and the time to build a nation had begun.",
          details:
            "Allah commands him to work: ﴿يَا أَيُّهَا الْمُدَّثِّرُ ۝ قُمْ فَأَنذِرْ ۝ وَرَبَّكَ فَكَبِّرْ﴾ — “O you wrapped in garments, arise and warn.”",
        },
      },
      interactive: {
        discover: "“Al-Muddaththir” means the one wrapped up in his cloak.",
        value: { name: "Resolve and work", icon: "🌄" },
        thinkQuestion: "What important thing are you putting off that you could get up and do today?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet (pbuh) say when he came home after seeing Jibril?",
          options: ["Give me water", "Cover me", "Open the door", "Leave me"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Cloak", description: "A cloak to remind you that rest ends when the work calls." },
        badge: "Badge: The Determined",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, the Book of the Beginning of Revelation",
        note: "The “cover me” account and the first verses of Surah Al-Muddaththir are in Sahih al-Bukhari.",
      },
    },
    title: "يا أيها المدثر: قم فأنذر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بينما كان النبي ﷺ يمشي يوماً سمع صوتاً من السماء، فرفع رأسه فرأى جبريل عليه السلام بين السماء والأرض. فرجع إلى بيته مسرعاً وهو يقول: «دثّروني دثّروني» أي غطّوني. وهو في فراشه نزل عليه جبريل بآيات تأمره أن يقوم ويترك الراحة، ويدعو الناس إلى عبادة الله وحده.",
        shortLesson: "حين يكون هناك عمل مهم، نترك الراحة ونقوم.",
      },
      tier_2_age_9_11: {
        narrative:
          "بينما كان النبي ﷺ يمشي يوماً سمع صوتاً من السماء، فرفع رأسه فرأى المَلَك جبريل عليه السلام جالساً على كرسي عظيم بين السماء والأرض. ومن شدة هيبة الموقف عاد النبي ﷺ مسرعاً إلى بيته وهو يرتجف ويقول: «دثّروني دثّروني»، أي غطّوني بالثياب. وبينما هو متغطٍّ في فراشه نزل عليه جبريل بآيات قوية تأمره أن يترك الغطاء والراحة، وأن يقوم فوراً ليبدأ العمل، فينذر الناس ويعلّمهم عبادة الله وحده وترك الأصنام. لقد انتهى وقت الراحة وبدأ وقت بناء الأمة.",
        details:
          "قال تعالى يأمر نبيه بالعمل: ﴿يَا أَيُّهَا الْمُدَّثِّرُ ۝ قُمْ فَأَنذِرْ ۝ وَرَبَّكَ فَكَبِّرْ﴾.",
      },
    },
    interactive: {
      discover: "كلمة «المدثّر» معناها المتغطّي بثوبه.",
      value: { name: "الهمّة والعمل", icon: "🌄" },
      thinkQuestion:
        "ما العمل المهم الذي تؤجّله وأنت تقدر أن تقوم به اليوم؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ حين عاد إلى بيته بعد أن رأى جبريل عليه السلام؟",
        options: ["اسقوني", "دثّروني", "افتحوا الباب", "اتركوني"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "رداء المدثّر", description: "رداء يذكّرك أن وقت الراحة ينتهي حين ينادي العمل." },
      badge: "وسام: صاحب الهمّة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، كتاب بدء الوحي",
      note: "حديث «دثّروني» ونزول أول سورة المدثر ثابت في صحيح البخاري.",
    },
  },
  {
    storyId: "st-3-05",
    stationId: 3,
    slug: "revelation-forms",
    en: {
      title: "How Did the Revelation Come?",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The revelation did not come in only one way. At first the Prophet (pbuh) would see a dream in his sleep and it would come true in the morning. After the prophethood, Jibril would sometimes come in the form of a man, and sometimes the revelation came powerfully like the ringing of a bell — and that was the hardest of all for him.",
          shortLesson: "We appreciate what the Prophet (pbuh) carried so that this Quran would reach us.",
        },
        tier_2_age_9_11: {
          narrative:
            "The revelation did not come in only one way. In the beginning it was a true dream the Prophet (pbuh) would see in his sleep, and it would come to pass the next day like the light of morning. After the prophethood, the angel Jibril would sometimes come in the form of a man, teaching the Prophet (pbuh) gently and easily. And sometimes the revelation came powerfully, like the ringing of a bell — the hardest kind for him — so much so that he would be pouring with sweat on a bitterly cold day, from the weight and the power of the words of Allah.",
          details:
            "Allah says of the weight of the Quran: ﴿إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا﴾ — “We are going to send down to you a weighty word.”",
        },
      },
      interactive: {
        discover: "The Quran came down to the Prophet (pbuh) over twenty-three years, not all at once.",
        value: { name: "Valuing the Quran", icon: "✨" },
        thinkQuestion: "Knowing what the Prophet (pbuh) carried so the Quran would reach you, how will you read it today?",
        challenge: {
          type: "multiple_choice",
          question: "Which kind of revelation was the hardest on the Prophet (pbuh)?",
          options: ["A dream in his sleep", "Jibril in the form of a man", "Like the ringing of a bell", "Cast into his heart"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A Silver Bell", description: "A keepsake for the weight of the word that was carried for you." },
        badge: "Badge: Keeper of the Trust",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, the Book of the Beginning of Revelation",
        note: "The forms of revelation and the “ringing of a bell” hadith are in Sahih al-Bukhari.",
      },
    },
    title: "كيف كان ينزل الوحي؟",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لم يكن الوحي يأتي بطريقة واحدة. في البداية كان النبي ﷺ يرى رؤيا في نومه فتتحقق في الصباح. وبعد النبوة كان جبريل عليه السلام يأتيه أحياناً في صورة رجل، وأحياناً يأتي الوحي قوياً مثل صوت الجرس، وكان هذا أشدّه على النبي ﷺ.",
        shortLesson: "نقدّر تعب النبي ﷺ حتى يصلنا هذا القرآن.",
      },
      tier_2_age_9_11: {
        narrative:
          "لم يكن الوحي يأتي بطريقة واحدة فقط. في البداية كان الوحي رؤيا صالحة يراها النبي ﷺ في منامه فتتحقق في الواقع في اليوم التالي مثل ضوء الصباح. وبعد النبوة كان المَلَك جبريل عليه السلام يأتي أحياناً في صورة رجل ليعلّم النبي ﷺ في راحة وسهولة. وأحياناً كان الوحي يأتي قوياً مثل صلصلة الجرس، وهذا أشدّ أنواع الوحي على النبي ﷺ، حتى إنه كان يتفصّد عرقاً في اليوم شديد البرد من ثقل كلام الله وقوته.",
        details:
          "قال تعالى مبيّناً عظمة القرآن وثقله: ﴿إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا﴾.",
      },
    },
    interactive: {
      discover: "نزل القرآن على النبي ﷺ في ثلاث وعشرين سنة، لا مرة واحدة.",
      value: { name: "تقدير القرآن", icon: "✨" },
      thinkQuestion:
        "لو عرفت كم تعب النبي ﷺ حتى يصلك القرآن، كيف ستقرأه اليوم؟",
      challenge: {
        type: "multiple_choice",
        question: "أي أنواع الوحي كان أشدّها على النبي ﷺ؟",
        options: ["الرؤيا في المنام", "مجيء جبريل في صورة رجل", "مثل صلصلة الجرس", "الإلقاء في القلب"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "جرس من فضة", description: "تذكار يذكّرك بثقل الكلمة التي حُملت من أجلك." },
      badge: "وسام: حافظ الأمانة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، كتاب بدء الوحي",
      note: "أوجه نزول الوحي وحديث «مثل صلصلة الجرس» ثابتة في صحيح البخاري.",
    },
  },
  {
    storyId: "st-4-01",
    stationId: 4,
    slug: "dar-al-arqam",
    en: {
      title: "The Great Secret and Dar al-Arqam",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When Allah commanded the Prophet (pbuh) to call people, he began quietly with those closest to him. His wife Khadijah believed, and his friend Abu Bakr, his young cousin Ali ibn Abi Talib, and Zaid ibn Harithah. The first Muslims would gather in the house of a brave young man named al-Arqam ibn Abi al-Arqam, learning the Quran and praying away from the harm of Quraysh.",
          shortLesson: "A small beginning, kept quiet, can raise the greatest generation.",
        },
        tier_2_age_9_11: {
          narrative:
            "After Allah commanded His Prophet Muhammad (pbuh) to call people to Islam, he began secretly with those closest to him. His wife Khadijah believed, and his friend Abu Bakr, his young cousin Ali ibn Abi Talib, and Zaid ibn Harithah. Because Quraysh worshipped idols and refused change, the first Muslims had to meet in secret to learn the Quran and pray. So the Prophet (pbuh) chose a house out of sight belonging to a brave young man named al-Arqam ibn Abi al-Arqam. From that quiet house came a generation that changed the course of history.",
          details:
            "Allah says of the first forerunners: ﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنصَارِ﴾ — Allah is pleased with them, and they with Him.",
        },
      },
      interactive: {
        discover: "This quiet stage of the call lasted about three years.",
        value: { name: "Good planning", icon: "🏠" },
        thinkQuestion: "Why do you think the Prophet (pbuh) chose a young man's house to meet in, rather than a well-known elder's?",
        challenge: {
          type: "multiple_choice",
          question: "In whose house did the first Muslims meet in secret?",
          options: ["Abu Bakr's house", "The house of al-Arqam ibn Abi al-Arqam", "Khadijah's house", "Ali's house"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The Key of Dar al-Arqam", description: "A key to remind you that the greatest beginnings start somewhere small." },
        badge: "Badge: One of the Forerunners",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, Ibn Sa'd's Tabaqat",
        note: "The first Muslims gathering at Dar al-Arqam is well known in the Seerah literature.",
      },
    },
    title: "السرّ العظيم ودار الأرقم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لما أمر الله نبيه ﷺ أن يدعو الناس، بدأ بأقرب الناس إليه سراً. فآمنت زوجته خديجة رضي الله عنها، وصديقه أبو بكر، وابن عمه الشاب علي بن أبي طالب، وزيد بن حارثة. وكان المسلمون الأوائل يجتمعون في بيت شاب شجاع اسمه الأرقم بن أبي الأرقم، يتعلمون القرآن ويصلّون بعيداً عن أذى قريش.",
        shortLesson: "البداية الصغيرة في السرّ يمكن أن تصنع أعظم جيل.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد أن أمر الله نبيه محمداً ﷺ بالدعوة، بدأ بأقرب الناس إليه سراً، فآمنت زوجته خديجة رضي الله عنها، وصديقه أبو بكر، وابن عمه الشاب علي بن أبي طالب، وخادمه زيد بن حارثة. ولأن قريشاً كانت تعبد الأصنام وترفض التغيير، كان على المسلمين الأوائل أن يجتمعوا سراً ليتعلموا القرآن ويصلّوا. فاختار النبي ﷺ بيتاً بعيداً عن الأنظار لشاب شجاع يُدعى الأرقم بن أبي الأرقم. ومن هذا البيت السري تخرّج جيل غيّر مجرى التاريخ.",
        details:
          "قال تعالى في السابقين الأولين: ﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنصَارِ وَالَّذِينَ اتَّبَعُوهُم بِإِحْسَانٍ رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾.",
      },
    },
    interactive: {
      discover: "دام هذا الطور السرّي من الدعوة نحو ثلاث سنوات.",
      value: { name: "حسن التخطيط", icon: "🏠" },
      thinkQuestion:
        "لماذا في رأيك اختار النبي ﷺ بيتاً لشاب صغير مكاناً للاجتماع، لا بيت رجل كبير معروف؟",
      challenge: {
        type: "multiple_choice",
        question: "في بيت مَن كان المسلمون الأوائل يجتمعون سراً؟",
        options: ["بيت أبي بكر", "بيت الأرقم بن أبي الأرقم", "بيت خديجة", "بيت علي"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "مفتاح دار الأرقم", description: "مفتاح يذكّرك أن أعظم البدايات تبدأ في مكان صغير." },
      badge: "وسام: من السابقين",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، الطبقات الكبرى لابن سعد",
      note: "اجتماع المسلمين الأوائل في دار الأرقم مشهور في كتب السيرة.",
    },
  },
  {
    storyId: "st-4-02",
    stationId: 4,
    slug: "mount-safa-call",
    en: {
      title: "Mount Safa and the Great Call",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Allah commanded the Prophet (pbuh) to announce his call to everyone, so he climbed Mount Safa and called out at the top of his voice until the tribes of Quraysh gathered. He asked them: if I told you an army behind this mountain was about to attack you, would you believe me? They said: yes — we have never known you to lie. So he called them to worship Allah alone. His uncle Abu Lahab grew angry, and Allah sent down a whole surah in reply.",
          shortLesson: "An honest person is believed, even by those who disagree.",
        },
        tier_2_age_9_11: {
          narrative:
            "Allah commanded His Prophet (pbuh) to announce Islam to everyone. He climbed Mount Safa and called out at the top of his voice, and all the tribes of Quraysh gathered. He asked them: “If I told you that an army behind this mountain was about to attack you, would you believe me?” They all said: “Yes — we have never known you to tell a lie. You are the truthful, the trustworthy.” He said: “Then I am a warner to you before a severe punishment. Worship Allah alone.” His uncle Abu Lahab grew angry and shouted in his face, and Allah sent down an entire surah defending His Prophet and answering that unjust uncle.",
          details:
            "Allah commands the open call: ﴿فَاصْدَعْ بِمَا تُؤْمَرُ﴾, and says of Abu Lahab: ﴿تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ﴾.",
        },
      },
      interactive: {
        discover: "Surah Al-Masad was revealed about Abu Lahab, the Prophet's own uncle.",
        value: { name: "Courage in speaking the truth", icon: "📣" },
        thinkQuestion: "Why did the Prophet (pbuh) ask them about his honesty before delivering his message?",
        challenge: {
          type: "multiple_choice",
          question: "What did the people of Mecca call the Prophet (pbuh) before he delivered his message?",
          options: ["The poet", "The truthful, the trustworthy", "The horseman", "The merchant"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Stone from Safa", description: "A stone for the first call made openly in Mecca." },
        badge: "Badge: Voice of Truth",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, and Surah Al-Masad",
        note: "The Prophet's call from Mount Safa is established in Sahih al-Bukhari.",
      },
    },
    title: "جبل الصفا والنداء الكبير",
    content: {
      tier_1_age_6_8: {
        narrative:
          "أمر الله نبيه ﷺ أن يعلن دعوته للجميع، فصعد على جبل الصفا ونادى بأعلى صوته حتى اجتمعت قبائل قريش. سألهم: لو قلت لكم إن جيشاً وراء هذا الجبل يريد أن يهاجمكم، أتصدّقونني؟ قالوا: نعم، ما جرّبنا عليك كذباً قط. فدعاهم إلى عبادة الله وحده. فغضب عمه أبو لهب، فأنزل الله سورة كاملة تردّ عليه.",
        shortLesson: "الصادق يُصدَّق حتى ممن يخالفه.",
      },
      tier_2_age_9_11: {
        narrative:
          "أمر الله نبيه ﷺ أن يعلن الإسلام للجميع، فصعد على جبل الصفا ونادى بأعلى صوته: «يا صباحاه!»، فاجتمعت قبائل قريش كلها. فسألهم: «لو أخبرتكم أن جيشاً خلف هذا الجبل يريد أن يهجم عليكم، أكنتم مصدّقيّ؟» فقالوا جميعاً: «نعم، ما جرّبنا عليك كذباً قط، أنت الصادق الأمين». فقال لهم: «فإني نذير لكم بين يدي عذاب شديد، اعبدوا الله وحده». فغضب عمه أبو لهب وصاح في وجهه، فأنزل الله سورة كاملة تدافع عن نبيه ﷺ وتردّ على عمه الظالم.",
        details:
          "قال تعالى آمراً بالجهر: ﴿فَاصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ﴾، وقال في أبي لهب: ﴿تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ﴾.",
      },
    },
    interactive: {
      discover: "سورة المسد نزلت في أبي لهب، وهو عمّ النبي ﷺ.",
      value: { name: "الشجاعة في قول الحق", icon: "📣" },
      thinkQuestion:
        "لماذا بدأ النبي ﷺ بسؤالهم عن صدقه قبل أن يبلّغهم رسالته؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا وصف أهل مكة النبي ﷺ قبل أن يبلّغهم رسالته؟",
        options: ["الشاعر", "الصادق الأمين", "الفارس", "التاجر"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حجر من الصفا", description: "حجر يذكّرك بأول نداء جهر به الحق في مكة." },
      badge: "وسام: صوت الحق",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، وسورة المسد",
      note: "حديث نداء النبي ﷺ على الصفا ثابت في صحيح البخاري.",
    },
  },
  {
    storyId: "st-4-03",
    stationId: 4,
    slug: "heroes-of-patience",
    en: {
      title: "Heroes Who Never Give Up: Bilal and the Family of Yasir",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When the Prophet (pbuh) announced his call, the idol-worshippers began to harm the weakest Muslims. They took Bilal ibn Rabah, threw him on the burning desert sand and put a rock on his chest to make him leave his faith — and he kept repeating one word: “Ahad… Ahad.” They tortured Ammar ibn Yasir and his father and his mother Sumayyah, and the Prophet (pbuh) would pass by them and say: “Be patient, family of Yasir — your promise is Paradise.”",
          shortLesson: "Faith gives the heart a strength that cannot be beaten.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet (pbuh) announced his call, the idol-worshippers began to torture the weakest Muslims, those with no clan to protect them. They took Bilal ibn Rabah, who was a slave, threw him onto the burning desert sand and placed a great rock on his chest so that he would abandon Islam. Brave Bilal kept repeating one word that infuriated them: “Ahad… Ahad” — Allah is One. They also tortured Ammar ibn Yasir, his father, and his mother Sumayyah, who became the first martyr in Islam. The Prophet (pbuh) would pass them as they were being tortured and say: “Be patient, family of Yasir — your promise is Paradise.”",
          details:
            "Allah promises the patient: ﴿إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ﴾ — their reward without measure.",
        },
      },
      interactive: {
        discover: "Abu Bakr bought Bilal and set him free.",
        value: { name: "Patience and firmness", icon: "🔥" },
        thinkQuestion: "What is the hardest thing you have had to be patient about? What helped you?",
        challenge: {
          type: "multiple_choice",
          question: "Which word did Bilal keep repeating under torture?",
          options: ["Ahad, Ahad (One, One)", "Patience", "Rescue", "Mercy"],
          correctAnswer: 0,
        },
      },
      gamification: {
        artifact: { name: "A Grain of Meccan Sand", description: "A keepsake for those who held firm when holding firm was hardest." },
        badge: "Badge: An Unbeaten Heart",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, and Sahih al-Bukhari",
        note: "The torture of Bilal and the family of Yasir is established in the Seerah; Bukhari records Bilal's story and Abu Bakr freeing him.",
      },
    },
    title: "أبطال لا يستسلمون: بلال وآل ياسر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لما أعلن النبي ﷺ دعوته، بدأ المشركون يؤذون المسلمين الضعفاء. أخذوا بلال بن رباح وألقوه على رمل الصحراء الحار ووضعوا صخرة على صدره ليترك دينه، فكان يردّد كلمة واحدة: «أحدٌ.. أحدٌ». وعذّبوا عمار بن ياسر وأباه وأمه سمية، وكان النبي ﷺ يمرّ عليهم فيقول: «صبراً آل ياسر، فإن موعدكم الجنة».",
        shortLesson: "الإيمان يعطي القلب قوة لا تُهزم.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما أعلن النبي ﷺ دعوته، بدأ المشركون بتعذيب المسلمين الضعفاء الذين لا عشيرة تحميهم. أخذوا بلال بن رباح، وكان عبداً، فألقوه على رمال الصحراء الحارقة ووضعوا صخرة ضخمة على صدره ليترك الإسلام، فكان بلال الشجاع يردّد كلمة واحدة تغيظهم: «أحدٌ.. أحدٌ»، أي أن الله واحد. وعذّبوا كذلك عمار بن ياسر وأباه وأمه سمية رضي الله عنهم، وكانت سمية أول شهيدة في الإسلام. وكان النبي ﷺ يمرّ عليهم وهم يُعذَّبون فيقول لهم: «صبراً آل ياسر، فإن موعدكم الجنة».",
        details:
          "قال تعالى مبشّراً الصابرين: ﴿إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ﴾.",
      },
    },
    interactive: {
      discover: "أبو بكر رضي الله عنه اشترى بلالاً وأعتقه.",
      value: { name: "الصبر والثبات", icon: "🔥" },
      thinkQuestion:
        "ما أصعب موقف صبرت فيه؟ وما الذي أعانك على الصبر؟",
      challenge: {
        type: "multiple_choice",
        question: "ما الكلمة التي كان بلال رضي الله عنه يردّدها تحت التعذيب؟",
        options: ["أحدٌ أحد", "الصبر", "النجاة", "الرحمة"],
        correctAnswer: 0,
      },
    },
    gamification: {
      artifact: { name: "حصاة من رمل مكة", description: "حصاة تذكّرك بمن ثبتوا حين كان الثبات أصعب شيء." },
      badge: "وسام: قلب لا يُهزم",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، وصحيح البخاري",
      note: "تعذيب بلال وآل ياسر ثابت في كتب السيرة، وذكر البخاري خبر بلال وشراء أبي بكر له.",
    },
  },
  {
    storyId: "st-4-04",
    stationId: 4,
    slug: "migration-to-abyssinia",
    en: {
      title: "Journey to the Land of the Just King",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When the harm grew heavy, the Prophet (pbuh) told the Muslims: go to the land of Abyssinia, for there is a king there under whom no one is wronged. Some travelled and crossed the sea. Quraysh sent gifts to King an-Najashi to have them sent back, but he refused until he had heard them. Ja'far ibn Abi Talib stepped forward, spoke about Islam and recited verses from Surah Maryam. The king wept, refused to hand them over, and gave them safety.",
          shortLesson: "Justice protects the stranger before the neighbour.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the torture became too heavy, the Prophet (pbuh) told the Muslims: “Go to the land of Abyssinia, for there is a king there under whom no one is wronged.” Some travelled quietly and crossed the sea into Africa. Quraysh heard of it and sent gifts to King an-Najashi so that he would send the Muslims back, but the just king refused until he had heard from them first. Ja'far ibn Abi Talib stepped forward and spoke, bravely and courteously, about Islam and its manners, then recited verses from the opening of Surah Maryam. An-Najashi wept and said: “This and what Jesus brought come from one and the same lamp.” He refused to hand them over and gave them safety in his land.",
          details:
            "Ja'far recited the opening of Surah Maryam: ﴿وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ﴾ — “And mention in the Book, Maryam.”",
        },
      },
      interactive: {
        discover: "Abyssinia was the first migration in Islam, before the migration to Madinah.",
        value: { name: "Justice and dialogue", icon: "⛵" },
        thinkQuestion: "Why did the king insist on hearing both sides before deciding?",
        challenge: {
          type: "multiple_choice",
          question: "Which surah did Ja'far recite before an-Najashi?",
          options: ["Surah Yusuf", "Surah Maryam", "Surah Al-Kahf", "Surah Taha"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Small Sail", description: "A sail for the first journey made across the sea for the faith." },
        badge: "Badge: First of the Migrants",
      },
      source: {
        reliability: "🟢",
        reference: "Musnad Ahmad, Ibn Hisham's Seerah",
        note: "The migration to Abyssinia and Ja'far's speech are reported in Musnad Ahmad and the Seerah literature.",
      },
    },
    title: "رحلة إلى أرض الملك العادل",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لما اشتدّ الأذى على المسلمين قال لهم النبي ﷺ: اذهبوا إلى أرض الحبشة، فإن بها ملكاً لا يُظلم عنده أحد. فسافر بعضهم وعبروا البحر. أرسلت قريش هدايا إلى الملك النجاشي ليردّهم، فرفض حتى يسمع منهم. فتقدّم جعفر بن أبي طالب وتكلّم عن الإسلام وقرأ آيات من سورة مريم، فبكى الملك ورفض أن يسلّمهم وأعطاهم الأمان.",
        shortLesson: "العدل يحمي الغريب قبل القريب.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما اشتدّ العذاب على المسلمين قال لهم النبي ﷺ: «اذهبوا إلى أرض الحبشة، فإن بها ملكاً لا يُظلم عنده أحد». فسافر بعض المسلمين سراً وعبروا البحر إلى أفريقيا. فعلمت قريش وأرسلت هدايا إلى الملك النجاشي ليردّ إليهم المسلمين، لكن الملك العادل رفض حتى يسمع منهم أولاً. فتقدّم جعفر بن أبي طالب رضي الله عنه وتحدّث بشجاعة وأدب عن الإسلام وأخلاقه، ثم قرأ آيات من أول سورة مريم. فبكى النجاشي وقال: «إن هذا والذي جاء به عيسى ليخرج من مشكاة واحدة»، ورفض أن يسلّمهم، وأعطاهم الأمان في أرضه.",
        details:
          "قرأ جعفر رضي الله عنه أول سورة مريم، ومنها: ﴿وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ إِذِ انتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا﴾.",
      },
    },
    interactive: {
      discover: "هجرة الحبشة هي أول هجرة في الإسلام، قبل الهجرة إلى المدينة.",
      value: { name: "العدل والحوار", icon: "⛵" },
      thinkQuestion:
        "لماذا أصرّ النجاشي أن يسمع من الطرفين قبل أن يحكم؟",
      challenge: {
        type: "multiple_choice",
        question: "أي سورة قرأها جعفر بن أبي طالب أمام النجاشي؟",
        options: ["سورة يوسف", "سورة مريم", "سورة الكهف", "سورة طه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "شراع صغير", description: "شراع يذكّرك بأول رحلة عبرت البحر من أجل الدين." },
      badge: "وسام: مهاجر أول",
    },
    source: {
      reliability: "🟢",
      reference: "مسند أحمد، وسيرة ابن هشام",
      note: "خبر هجرة الحبشة وكلام جعفر أمام النجاشي مروي في مسند أحمد وكتب السيرة.",
    },
  },
  {
    storyId: "st-4-05",
    stationId: 4,
    slug: "year-of-sorrow",
    en: {
      title: "The Unjust Siege and the Year of Sorrow",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh agreed to boycott the Prophet (pbuh) and everyone who stood with him, writing an unjust document and hanging it in the Kaaba. The Muslims lived in a narrow valley between the mountains for three years, until they ate the leaves of trees from hunger. Then honourable men tore the document up and the siege ended. Shortly after, Lady Khadijah died, and so did Abu Talib — which is why that year is called the Year of Sorrow.",
          shortLesson: "However long injustice lasts, it does not last forever.",
        },
        tier_2_age_9_11: {
          narrative:
            "The tribes of Quraysh agreed to boycott the Prophet (pbuh) and everyone who supported him. They wrote an unjust document and hung it inside the Kaaba, forbidding marriage or trade with them. The Muslims were forced to live in a narrow valley between the mountains called the Valley of Abu Talib for three years, until they ate the leaves of trees from sheer hunger. Then Allah relieved them: honourable men of Quraysh rose and tore the document up, and the siege ended. But shortly after came something heavier still — the great Lady Khadijah died, and so did Abu Talib, the uncle who had defended him. That year is called the Year of Sorrow.",
          details:
            "Allah teaches him patience: ﴿وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ﴾ — “Be patient, and your patience is only through Allah.”",
        },
      },
      interactive: {
        discover: "A shi'b is a narrow pass between two mountains — this one belonged to Abu Talib.",
        value: { name: "Endurance and standing together", icon: "⛰️" },
        thinkQuestion: "What makes people hold together through a hard time?",
        challenge: {
          type: "multiple_choice",
          question: "How long did the siege in the valley last?",
          options: ["One year", "Two years", "Three years", "Five years"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A Tree Leaf", description: "A leaf for those who endured when there was nothing to eat." },
        badge: "Badge: Steadfast of the Valley",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah",
        note: "The document, the siege in the valley, and the deaths of Khadijah and Abu Talib are well known in the Seerah.",
      },
    },
    title: "الحصار الظالم وعام الحزن",
    content: {
      tier_1_age_6_8: {
        narrative:
          "اتفقت قريش على مقاطعة النبي ﷺ وكل من يقف معه، وكتبوا صحيفة ظالمة علّقوها في الكعبة. فعاش المسلمون في شِعب بين الجبال ثلاث سنوات حتى أكلوا ورق الشجر من الجوع، ثم مزّق الصحيفةَ رجالٌ شرفاء فانتهى الحصار. وبعده بقليل ماتت السيدة خديجة ومات أبو طالب، فسُمي ذلك العام عام الحزن.",
        shortLesson: "الظلم مهما طال لا يدوم.",
      },
      tier_2_age_9_11: {
        narrative:
          "اتفقت قبائل قريش على مقاطعة النبي ﷺ وكل من يؤيده، وكتبوا صحيفة ظالمة علّقوها داخل الكعبة، تمنع أن يزوّجوهم أو يبيعوهم. فاضطر المسلمون إلى العيش في مكان بين الجبال يُسمى شِعب أبي طالب ثلاث سنوات، حتى أكلوا ورق الشجر من شدة الجوع. ثم منّ الله عليهم، فقام رجال شرفاء من قريش فمزّقوا الصحيفة وانتهى الحصار. لكن بعده بقليل حدث ما هو أشدّ: توفيت السيدة العظيمة خديجة رضي الله عنها، وتوفي أبو طالب عمّ النبي الذي كان يدافع عنه، فسُمي ذلك العام «عام الحزن».",
        details:
          "قال تعالى يعلّم نبيه الصبر: ﴿وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ ۚ وَلَا تَحْزَنْ عَلَيْهِمْ وَلَا تَكُ فِي ضَيْقٍ مِّمَّا يَمْكُرُونَ﴾.",
      },
    },
    interactive: {
      discover: "سُمي المكان شِعب أبي طالب، والشِّعب طريق ضيق بين جبلين.",
      value: { name: "الصمود والترابط", icon: "⛰️" },
      thinkQuestion:
        "ما الذي يجعل الناس يصمدون معاً في الأزمات؟",
      challenge: {
        type: "multiple_choice",
        question: "كم سنة استمر حصار المسلمين في الشِّعب؟",
        options: ["سنة واحدة", "سنتان", "ثلاث سنوات", "خمس سنوات"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "ورقة شجر", description: "ورقة تذكّرك بمن صبروا حين لم يجدوا ما يأكلون." },
      badge: "وسام: صامد الشِّعب",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام",
      note: "خبر الصحيفة والحصار في الشِّعب ووفاة خديجة وأبي طالب مشهور في كتب السيرة.",
    },
  },
  {
    storyId: "st-4-06",
    stationId: 4,
    slug: "islam-of-heroes",
    en: {
      title: "The Islam of Heroes: Hamza and Umar",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Muslims prayed in secret, fearing harm from Quraysh — until the day the Prophet's brave uncle Hamza ibn Abd al-Muttalib grew angry and announced his Islam to defend his nephew. Days later Umar ibn al-Khattab, who had set out with his sword to harm the Prophet (pbuh), heard verses of Surah Taha and believed. The Muslims grew strong and prayed openly at the Kaaba for the first time.",
          shortLesson: "Allah guides hearts, however hard they look.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Muslims were praying in secret, afraid of the harm of Quraysh, until the day the Prophet's brave uncle Hamza ibn Abd al-Muttalib grew angry and announced his Islam to defend his nephew. A few days later came the greater surprise: Umar ibn al-Khattab, who had gone out with his sword to harm the Prophet (pbuh), heard verses from Surah Taha, and his heart shook, and he believed there and then. With Hamza and Umar, the Muslims became strong, and for the first time they walked out in two rows saying “Allahu Akbar” through the streets of Mecca until they reached the Kaaba — and Quraysh did not dare to touch them.",
          details:
            "Allah says: ﴿يَا أَيُّهَا النَّبِيُّ حَسْبُكَ اللَّهُ وَمَنِ اتَّبَعَكَ مِنَ الْمُؤْمِنِينَ﴾ — “Allah is sufficient for you, and for the believers who follow you.”",
        },
      },
      interactive: {
        discover: "Umar was called al-Farooq — the one by whom truth was distinguished from falsehood.",
        value: { name: "The guiding of hearts", icon: "🗡️" },
        thinkQuestion: "What changed Umar's heart in a single moment?",
        challenge: {
          type: "multiple_choice",
          question: "Which surah did Umar ibn al-Khattab hear before he believed?",
          options: ["Surah Ya-Sin", "Surah Taha", "Surah Ar-Rahman", "Surah An-Nur"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Sheathed Sword", description: "A sword returned to its sheath when truth won over anger." },
        badge: "Badge: A Heart Guided",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, Ibn Sa'd's Tabaqat",
        note: "The Islam of Hamza and Umar is well known in the Seerah literature.",
      },
    },
    title: "إسلام الأبطال: حمزة وعمر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان المسلمون يصلّون سراً خوفاً من أذى قريش، حتى غضب حمزة بن عبد المطلب عمّ النبي الشجاع وأعلن إسلامه دفاعاً عن ابن أخيه. وبعده بأيام أسلم عمر بن الخطاب، وكان خارجاً بسيفه ليؤذي النبي ﷺ، فسمع آيات من سورة طه فآمن. فقوي المسلمون وخرجوا لأول مرة يصلّون عند الكعبة.",
        shortLesson: "الله يهدي القلوب مهما بدت قاسية.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان المسلمون يصلّون سراً خائفين من أذى قريش، حتى جاء اليوم الذي غضب فيه حمزة بن عبد المطلب عمّ النبي الشجاع، فأعلن إسلامه ليدافع عن ابن أخيه. وبعده بأيام قليلة حدثت المفاجأة الكبرى: عمر بن الخطاب، الذي خرج بسيفه ليؤذي النبي ﷺ، سمع آيات من سورة طه فارتجّ قلبه وآمن من ساعته. وبإسلام حمزة وعمر رضي الله عنهما قوي المسلمون، وخرجوا لأول مرة في صفّين يكبّرون في شوارع مكة حتى بلغوا الكعبة، فلم تجرؤ قريش على أذاهم.",
        details:
          "قال تعالى: ﴿يَا أَيُّهَا النَّبِيُّ حَسْبُكَ اللَّهُ وَمَنِ اتَّبَعَكَ مِنَ الْمُؤْمِنِينَ﴾.",
      },
    },
    interactive: {
      discover: "لُقّب عمر بن الخطاب رضي الله عنه بالفاروق، لأن الله فرّق به بين الحق والباطل.",
      value: { name: "هداية القلوب", icon: "🗡️" },
      thinkQuestion:
        "ما الذي غيّر قلب عمر رضي الله عنه في لحظة واحدة؟",
      challenge: {
        type: "multiple_choice",
        question: "أي سورة سمعها عمر بن الخطاب فآمن؟",
        options: ["سورة يس", "سورة طه", "سورة الرحمن", "سورة النور"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "سيف مغمود", description: "سيف عاد إلى غمده حين انتصر الحق على الغضب." },
      badge: "وسام: قلب اهتدى",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، الطبقات الكبرى لابن سعد",
      note: "خبر إسلام حمزة وعمر رضي الله عنهما مشهور في كتب السيرة.",
    },
  },
  {
    storyId: "st-4-07",
    stationId: 4,
    slug: "sun-and-moon",
    en: {
      title: "The Sun in My Right Hand, the Moon in My Left",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh sent their leaders to the Prophet (pbuh) offering him wealth and kingship on one condition: that he leave his religion. He gave the answer we still remember: by Allah, if they put the sun in my right hand and the moon in my left so that I would leave this, I would not leave it.",
          shortLesson: "Truth is worth more than anything that can be bought.",
        },
        tier_2_age_9_11: {
          narrative:
            "Quraysh sent their leaders to the Prophet (pbuh), saying: “If you want wealth, we will gather it for you until you are the richest of us; if you want kingship, we will make you our king — on one condition: that you leave this religion.” The offer would have tempted anyone, but the Prophet (pbuh) was not seeking money or power. He gave the decisive answer we still remember: “By Allah, if they put the sun in my right hand and the moon in my left so that I would abandon this matter until Allah makes it prevail, or I perish in it, I would not abandon it.”",
          details:
            "Allah says: ﴿قُل لَّا أَتَّبِعُ أَهْوَاءَكُمْ﴾ — “Say: I do not follow your desires.”",
        },
      },
      interactive: {
        discover: "They offered him wealth, kingship, and a doctor if he were ill — he refused all three.",
        value: { name: "Standing by a principle", icon: "☀️" },
        thinkQuestion: "What is the one thing you would not trade, whatever you were offered?",
        challenge: {
          type: "multiple_choice",
          question: "How did the Prophet (pbuh) answer the offer of wealth and kingship?",
          options: ["He asked for time", "He accepted with conditions", "Not even for the sun and the moon", "He said nothing"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A Golden Scale", description: "A scale to remind you that some things have no price." },
        badge: "Badge: Firm on the Truth",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah",
        note: "This account is well known in the Seerah, reported by Ibn Ishaq without a full chain.",
      },
    },
    title: "الشمس في يميني والقمر في يساري",
    content: {
      tier_1_age_6_8: {
        narrative:
          "أرسلت قريش زعماءها إلى النبي ﷺ يعرضون عليه المال والملك بشرط أن يترك دينه. فردّ عليهم ردّه المشهور: والله لو وضعوا الشمس في يميني والقمر في يساري على أن أترك هذا الأمر ما تركته.",
        shortLesson: "الحق أغلى من كل ما يُشترى.",
      },
      tier_2_age_9_11: {
        narrative:
          "أرسلت قريش زعماءها إلى النبي ﷺ فقالوا له: «إن كنت تريد مالاً جمعنا لك حتى تكون أغنانا، وإن كنت تريد ملكاً ملّكناك علينا، بشرط واحد: أن تترك هذا الدين». كان العرض مغرياً لأي إنسان، لكن النبي ﷺ لم يكن يطلب مالاً ولا سلطاناً، فردّ ردّه الحاسم الذي نذكره إلى اليوم: «والله لو وضعوا الشمس في يميني والقمر في يساري على أن أترك هذا الأمر حتى يظهره الله أو أهلك فيه، ما تركته».",
        details:
          "قال تعالى: ﴿قُلْ إِنِّي نُهِيتُ أَنْ أَعْبُدَ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ ۚ قُل لَّا أَتَّبِعُ أَهْوَاءَكُمْ﴾.",
      },
    },
    interactive: {
      discover: "عرضوا عليه المال والملك والطبّ إن كان به مرض — فرفض الثلاثة.",
      value: { name: "الثبات على المبدأ", icon: "☀️" },
      thinkQuestion:
        "ما الشيء الذي لا تبيعه مهما عُرض عليك؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا ردّ النبي ﷺ على عرض المال والملك؟",
        options: ["طلب مهلة للتفكير", "قبل بشرط", "لو وضعوا الشمس في يميني ما تركته", "سكت"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "ميزان ذهبي", description: "ميزان يذكّرك أن بعض الأشياء لا ثمن لها." },
      badge: "وسام: ثابت على الحق",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام",
      note: "هذا الخبر مشهور في كتب السيرة، ورواه ابن إسحاق مرسلاً.",
    },
  },
  {
    storyId: "st-4-08",
    stationId: 4,
    slug: "splitting-of-the-moon",
    en: {
      title: "A Miracle in the Sky: The Splitting of the Moon",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The disbelievers of Quraysh asked the Prophet (pbuh) for a miracle they could see with their own eyes: split the moon for us. He prayed to his Lord, and the moon split in two before the people — half over one mountain and half over another. Even so they said: Muhammad has bewitched us, and they did not believe.",
          shortLesson: "Signs are no use to a heart full of pride.",
        },
        tier_2_age_9_11: {
          narrative:
            "The disbelievers of Quraysh challenged the Prophet (pbuh): “We will not believe you until you bring a miracle we can see. Split this moon for us.” He prayed to his Lord, and suddenly, before everyone's eyes, the moon split in two: half above one mountain and half above another. The people of Mecca saw it, and so did travellers in the desert. Yet for all the clarity of it, the leaders of Quraysh dug in and said: “Muhammad has bewitched us.” What kept them from believing was not weak evidence but proud hearts.",
          details:
            "The Quran records it: ﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ﴾ — “The Hour has drawn near, and the moon has split.”",
        },
      },
      interactive: {
        discover: "Surah Al-Qamar is named after this event and opens with it.",
        value: { name: "Humility before the truth", icon: "🌙" },
        thinkQuestion: "Why did they not believe, even having seen the miracle themselves?",
        challenge: {
          type: "multiple_choice",
          question: "Which surah opens by mentioning the splitting of the moon?",
          options: ["Surah An-Najm", "Surah Al-Qamar", "Surah Ash-Shams", "Surah Al-Layl"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Half Moon", description: "A keepsake for a sign people saw, and turned away from." },
        badge: "Badge: Witness to the Sign",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran (Surah Al-Qamar), Sahih al-Bukhari and Muslim",
        note: "The splitting of the moon is established in the Quran and both Sahih collections.",
      },
    },
    title: "معجزة في السماء: انشقاق القمر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "طلب كفار قريش من النبي ﷺ معجزة يرونها بأعينهم، فقالوا: اشقق لنا القمر. فدعا النبي ﷺ ربه، فانشقّ القمر نصفين أمام الناس، نصف فوق جبل ونصف فوق جبل آخر. ومع ذلك قالوا: سحرنا محمد، ولم يؤمنوا.",
        shortLesson: "القلب المتكبّر لا تنفع معه الآيات.",
      },
      tier_2_age_9_11: {
        narrative:
          "تحدّى كفار قريش النبي ﷺ فقالوا: «لن نؤمن لك حتى تأتينا بمعجزة نراها، اشقق لنا هذا القمر». فدعا النبي ﷺ ربه، وفجأة وأمام أعين الجميع انشقّ القمر نصفين: نصف فوق جبل ونصف فوق جبل آخر، ورآه أهل مكة والمسافرون في الصحراء. ومع وضوح هذه المعجزة عاند زعماء قريش وقالوا: «سحرنا محمد»، فلم يمنعهم من الإيمان ضعف الدليل، بل كِبر القلوب.",
        details:
          "وثّق القرآن هذه المعجزة: ﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ ۝ وَإِن يَرَوْا آيَةً يُعْرِضُوا وَيَقُولُوا سِحْرٌ مُّسْتَمِرٌّ﴾.",
      },
    },
    interactive: {
      discover: "سورة القمر سُمّيت بهذه الحادثة، وتبدأ بذكرها.",
      value: { name: "التواضع لقبول الحق", icon: "🌙" },
      thinkQuestion:
        "لماذا لم يؤمنوا وقد رأوا المعجزة بأعينهم؟",
      challenge: {
        type: "multiple_choice",
        question: "أي سورة ذكرت انشقاق القمر في أولها؟",
        options: ["سورة النجم", "سورة القمر", "سورة الشمس", "سورة الليل"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "نصف قمر", description: "تذكار لآية رآها الناس ثم أعرضوا عنها." },
      badge: "وسام: شاهد الآية",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن (سورة القمر)، وصحيح البخاري ومسلم",
      note: "حادثة انشقاق القمر ثابتة في القرآن والصحيحين.",
    },
  },
  {
    storyId: "st-4-09",
    stationId: 4,
    slug: "cotton-in-ears",
    en: {
      title: "Cotton in the Ears: The Clever Poet",
      content: {
        tier_1_age_6_8: {
          narrative:
            "A wise poet named at-Tufayl ibn Amr ad-Dawsi came to Mecca. Quraysh warned him not to hear a word from the Prophet (pbuh), so he put cotton in his ears. Then he thought again: I am a man who understands words — why should I not listen? He took the cotton out, heard the Quran, and became Muslim, saying: by Allah, I have never heard anything better.",
          shortLesson: "Do not judge a thing before you have heard it yourself.",
        },
        tier_2_age_9_11: {
          narrative:
            "A wise poet named at-Tufayl ibn Amr ad-Dawsi came to Mecca. The leaders of Quraysh warned him: “Do not hear a single word from Muhammad — his speech is like magic that splits a man from his own family.” At-Tufayl was afraid and put cotton in his ears while he circled the Kaaba. Then he thought it over: “I am a poet who knows fine speech from foul. What stops me from listening? If it is good, I will accept it.” He took the cotton out, heard the Quran from the Prophet (pbuh), and became Muslim on the spot, saying: “By Allah, I have never heard anything better than this.”",
          details:
            "Allah says of the Quran's effect: ﴿تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ مِمَّا عَرَفُوا مِنَ الْحَقِّ﴾ — their eyes overflow at the truth they recognise.",
        },
      },
      interactive: {
        discover: "At-Tufayl went back to his people, Daws, and called them — and they later became Muslim.",
        value: { name: "Checking before judging", icon: "👂" },
        thinkQuestion: "Have you ever believed something about someone and then found it untrue? What should you have done?",
        challenge: {
          type: "multiple_choice",
          question: "What did at-Tufayl put in his ears at first?",
          options: ["Wax", "Cotton", "Clay", "Cloth"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Tuft of Cotton", description: "Cotton to remind you to listen for yourself before you judge." },
        badge: "Badge: The Clever Listener",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah",
        note: "The story of at-Tufayl ibn Amr ad-Dawsi is well known in the Seerah literature.",
      },
    },
    title: "القطن في الأذن وقصة الشاعر الذكي",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء إلى مكة شاعر حكيم اسمه الطُّفيل بن عمرو الدَّوسي، فحذّرته قريش من سماع كلام النبي ﷺ، فوضع القطن في أذنيه. ثم فكّر وقال: أنا رجل أفهم الكلام، فلماذا لا أسمع؟ فنزع القطن وسمع القرآن، فأسلم وقال: والله ما سمعت كلاماً أحسن من هذا قط.",
        shortLesson: "لا تحكم على شيء قبل أن تسمعه بنفسك.",
      },
      tier_2_age_9_11: {
        narrative:
          "قدِم إلى مكة شاعر حكيم يُدعى الطُّفيل بن عمرو الدَّوسي، فحذّره زعماء قريش وقالوا له: «لا تسمع من محمد كلمة واحدة، فإن كلامه كالسحر يفرّق بين الرجل وأهله». فخاف الطفيل ووضع القطن في أذنيه وهو يطوف بالكعبة. ثم راجع نفسه وقال: «أنا رجل شاعر لبيب أعرف الحسن من القبيح، فما يمنعني أن أسمع؟ فإن كان حسناً قبلته». فنزع القطن وسمع القرآن من النبي ﷺ، فأسلم من ساعته وقال: «والله ما سمعت كلاماً أحسن من هذا قط».",
        details:
          "قال تعالى في أثر القرآن على القلوب: ﴿وَإِذَا سُمِعُوا مَا أُنزِلَ إِلَى الرَّسُولِ تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ مِمَّا عَرَفُوا مِنَ الْحَقِّ﴾.",
      },
    },
    interactive: {
      discover: "رجع الطفيل إلى قومه دَوس يدعوهم، فأسلموا بعد ذلك.",
      value: { name: "التثبّت قبل الحكم", icon: "👂" },
      thinkQuestion:
        "هل صدّقت مرة كلاماً عن أحد ثم عرفت أنه غير صحيح؟ ماذا كان يجب أن تفعل؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا وضع الطفيل بن عمرو في أذنيه أول الأمر؟",
        options: ["الشمع", "القطن", "الطين", "القماش"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "خصلة قطن", description: "قطنة تذكّرك أن تسمع بنفسك قبل أن تحكم." },
      badge: "وسام: المستمع الذكي",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام",
      note: "قصة إسلام الطفيل بن عمرو الدوسي مشهورة في كتب السيرة.",
    },
  },
  {
    storyId: "st-4-10",
    stationId: 4,
    slug: "journey-to-taif",
    en: {
      title: "The Sad Journey to Taif",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After the deaths of Khadijah and Abu Talib the harm grew worse, so the Prophet (pbuh) walked to Taif to call its people. They turned him away and set boys to throw stones at him until his feet bled. He sat and prayed, and the Angel of the Mountains came asking permission to crush them between the two mountains. He refused, saying: rather, I hope Allah brings from their children people who worship Him alone.",
          shortLesson: "The greatest strength is to forgive when you could strike.",
        },
        tier_2_age_9_11: {
          narrative:
            "After the deaths of Lady Khadijah and his uncle Abu Talib, the harm from Quraysh grew worse, so the Prophet (pbuh) decided to walk on foot to the city of Taif, hoping its people would believe and stand with him. But they were hard: they refused his call and set the boys to throw stones at him until blood ran from his noble feet. He sat down, sad and exhausted, and prayed to his Lord. Then the Angel of the Mountains came down and asked his permission to crush them between the two mountains. The Prophet of Mercy refused, and said: “Rather, I hope that Allah will bring forth from their descendants those who worship Allah alone and associate nothing with Him.”",
          details:
            "Allah says of his mercy: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — “We sent you only as a mercy to the worlds.”",
        },
      },
      interactive: {
        discover: "The people of Taif became Muslim years later, and companions came from among them.",
        value: { name: "Mercy when you have the power", icon: "🤲" },
        thinkQuestion: "When someone hurts you and you could hit back, what makes you choose to forgive?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet (pbuh) answer the Angel of the Mountains?",
          options: ["He agreed", "He asked for time", "He refused, hoping for their children", "He said nothing"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "An Olive Branch", description: "A branch to remind you that mercy is stronger than revenge." },
        badge: "Badge: A Mercy to the Worlds",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The Angel of the Mountains and the return from Taif are established in both Sahih collections.",
      },
    },
    title: "الرحلة الحزينة إلى الطائف",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد وفاة خديجة وأبي طالب اشتدّ الأذى، فمشى النبي ﷺ إلى الطائف يدعو أهلها، فردّوه وأمروا الصبيان أن يرموه بالحجارة حتى أدميت قدماه. فجلس يدعو ربه، فجاءه ملك الجبال يستأذنه أن يطبق عليهم الجبلين، فرفض وقال: بل أرجو أن يخرج الله من ذريّتهم من يعبد الله وحده.",
        shortLesson: "أعظم القوة أن تعفو وأنت قادر.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد وفاة السيدة خديجة وعمّه أبي طالب اشتدّ أذى قريش، فقرر النبي ﷺ أن يمشي على قدميه إلى مدينة الطائف لعلّ أهلها يؤمنون وينصرونه. لكنهم كانوا قساة، فردّوا دعوته وأمروا الصبيان أن يرموه بالحجارة حتى سال الدم من قدميه الشريفتين. فجلس النبي ﷺ حزيناً متعباً يدعو ربه. فنزل عليه ملك الجبال واستأذنه أن يطبق عليهم الأخشبين — أي الجبلين — فرفض نبي الرحمة وقال: «بل أرجو أن يخرج الله من أصلابهم من يعبد الله وحده لا يشرك به شيئاً».",
        details:
          "قال تعالى في رحمته ﷺ: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾.",
      },
    },
    interactive: {
      discover: "أهل الطائف أسلموا بعد سنوات، وصار منهم صحابة كرام.",
      value: { name: "الرحمة عند المقدرة", icon: "🤲" },
      thinkQuestion:
        "حين يؤذيك أحد وتستطيع أن تردّ، ما الذي يجعلك تختار العفو؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا ردّ النبي ﷺ على ملك الجبال حين استأذنه في إهلاك أهل الطائف؟",
        options: ["وافق", "طلب المهلة", "رفض ورجا هداية ذريّتهم", "سكت"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "غصن زيتون", description: "غصن يذكّرك أن الرحمة أقوى من الانتقام." },
      badge: "وسام: رحمة للعالمين",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "حديث ملك الجبال ورجوع النبي ﷺ من الطائف ثابت في الصحيحين.",
    },
  },
];
