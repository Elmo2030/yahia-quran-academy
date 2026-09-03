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
  {
    stationId: 5,
    titleAr: "الإسراء والمعراج",
    titleEn: "The Night Journey and the Ascension",
    cover: "/stories/seerah/station-5.jpg",
    descriptionAr:
      "خمس عشرة قصة من رحلة ليلة واحدة: من المسجد الحرام إلى المسجد الأقصى، ثم عروجٌ في السماوات السبع ولقاءُ الأنبياء فيها، فسدرة المنتهى، ففرض الصلاة، ثم العودة وصباح اليقين.",
    descriptionEn:
      "Fifteen stories from a single night: from the Sacred Mosque to al-Aqsa, then an ascent through the seven heavens and the prophets met in each, to Sidrat al-Muntaha, the gift of the prayer, and the return — and the morning that followed.",
  },
  {
    stationId: 6,
    titleAr: "الهجرة إلى المدينة",
    titleEn: "The Migration to Madinah",
    descriptionAr:
      "الليلة التي خرج فيها النبي ﷺ من مكة ومن وقف معه: مؤامرة دار الندوة، وعليّ في الفراش، ودموع أبي بكر، ونِطاق أسماء، وغنم عامر التي محت الأثر.",
    descriptionEn:
      "The night the Prophet (pbuh) left Mecca, and those who stood with him: the plot at Dar an-Nadwa, Ali in the bed, Abu Bakr's tears, Asma's belt, and Amir's flock that erased the tracks.",
  },
  {
    stationId: 7,
    titleAr: "الدفاع عن الوطن",
    titleEn: "Defending the Homeland",
    descriptionAr:
      "خمس عشرة قصة من سنوات الدفاع عن المدينة: الإذن بعد ثلاث عشرة سنة من الصبر، وبدر والشورى والملائكة، وأسرى صاروا معلّمين، ودرس أُحد، وخندق سلمان، وريح الأحزاب، وصلح الحديبية، والرسائل إلى الملوك، وخيبر، ثم فتح مكة يوم المرحمة والعفو العام.",
    descriptionEn:
      "Fifteen stories from the years of defending Madinah: the permission after thirteen years of patience, Badr with its counsel and its angels, captives who became teachers, the lesson of Uhud, Salman's trench, the wind that scattered the Confederates, the treaty of Hudaybiyyah, the letters to kings, Khaybar, and finally the conquest of Mecca — the day of mercy and the general pardon.",
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
            "In the 'Year of the Elephant', an evil king named Abraha tried to destroy the Kaaba with a massive army and a giant elephant. But Allah sent birds in flock after flock — that is what ababil means — pelting them with small stones of sijjil, which destroyed the army and protected Mecca. In that exact same year, Mecca was blessed with the birth of Prophet Muhammad (peace be upon him). He was born an orphan because his father, Abdullah, died before his birth. His grandfather, Abdul Muttalib, was overjoyed, took him inside the Kaaba, and named him Muhammad, which means 'The highly praised one'.",
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
        artifact: { name: "A Stone of Sijjil", description: "A keepsake to remind you that true power belongs to Allah." },
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
          "في عام سُمي بـ«عام الفيل»، حاول ملك شرير اسمه أبرهة هدم الكعبة بجيش عظيم يتقدمه فيل ضخم. لكن الله أرسل عليهم طيراً أبابيل — أي جماعاتٍ يتبع بعضها بعضاً — ترميهم بحجارة صغيرة من سِجّيل، فدمّرت الجيش وحمت مكة. وفي نفس هذا العام، أشرقت مكة بولادة النبي محمد ﷺ. كان يتيماً لأن والده «عبد الله» مات قبل ولادته. فرح جده «عبد المطلب» به جداً، ودخل به الكعبة وسماه محمداً، ليكون محموداً في الأرض والسماء.",
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
      artifact: { name: "حجر من سِجّيل", description: "حجر تذكاري يذكّرك بأن القوة الحقيقية بيد الله." },
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
  {
    storyId: "st-5-01",
    stationId: 5,
    slug: "chest-washing-zamzam",
    en: {
      title: "Preparing the Leader: The Opening of the Chest",
      content: {
        tier_1_age_6_8: {
          narrative:
            "While the Prophet (pbuh) slept near the Kaaba, heavy with sadness after the journey to Taif, Jibril came down to him with another angel. They opened his chest gently and without pain, washed his noble heart with Zamzam water in a golden basin, filled it with faith and wisdom, and put it back as it was. And so the greatest night in history began.",
          shortLesson: "A clean heart is the first thing any great work needs.",
        },
        tier_2_age_9_11: {
          narrative:
            "While the Prophet (pbuh) was sleeping at night near the Kaaba, weighed down by sadness after the journey to Taif, the angel Jibril came down to him with another angel. They opened his noble chest very gently and without pain, took out his heart and washed it with pure Zamzam water in a golden basin, then filled it with faith and wisdom and strength, so that he would be ready for the great signs he was about to be shown that night. Then they returned his heart as it was, and the greatest journey in human history began.",
          details:
            "Allah says: ﴿أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ﴾ — “Did We not expand for you your breast?”",
        },
      },
      interactive: {
        discover: "The Prophet's chest was opened more than once in his life; the first time was as a child in the desert of Bani Sa'd.",
        value: { name: "Purity of heart", icon: "💛" },
        thinkQuestion: "What will you do today to keep your own heart clear of grudges and envy?",
        challenge: {
          type: "multiple_choice",
          question: "What water was the Prophet's heart washed with that night?",
          options: ["Rain water", "Zamzam water", "Sea water", "River water"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Golden Basin", description: "A keepsake: Allah looks at your heart before anything else." },
        badge: "Badge: A Heart Made Ready",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The opening of the chest on the night of the Isra is established in both Sahih collections.",
      },
    },
    title: "استعداد القائد: شقّ الصدر وماء زمزم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بينما كان النبي ﷺ نائماً قرب الكعبة، وهو حزين بعد رحلة الطائف، نزل إليه جبريل عليه السلام ومعه مَلَك آخر. فشقّا صدره في رفق وبلا ألم، وغسلا قلبه الشريف بماء زمزم في طست من ذهب، ثم ملآه إيماناً وحكمة، وأعاداه كما كان. وبهذا بدأت أعظم ليلة في التاريخ.",
        shortLesson: "القلب النظيف هو أول ما نحتاجه لأي عمل عظيم.",
      },
      tier_2_age_9_11: {
        narrative:
          "بينما كان النبي ﷺ نائماً ليلاً قرب الكعبة، بعد أن أثقله الحزن من رحلة الطائف، نزل عليه المَلَك جبريل عليه السلام ومعه مَلَك آخر. فشقّا صدره الشريف في رفق شديد ومن غير ألم، وأخرجا قلبه فغسلاه بماء زمزم الطاهر في طست من ذهب، ثم ملآه إيماناً وحكمة وقوة، ليكون مستعداً لما سيرى في تلك الليلة من آيات الله الكبرى. ثم أعادا قلبه كما كان، وبدأت أعظم رحلة في تاريخ البشرية.",
        details:
          "قال تعالى ممتنّاً على نبيه: ﴿أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۝ وَوَضَعْنَا عَنكَ وِزْرَكَ﴾.",
      },
    },
    interactive: {
      discover: "شُقّ صدر النبي ﷺ أكثر من مرة في حياته، أولها وهو صغير في بادية بني سعد.",
      value: { name: "طهارة القلب", icon: "💛" },
      thinkQuestion:
        "ما العمل الذي تفعله اليوم ليبقى قلبك نظيفاً من الغلّ والحسد؟",
      challenge: {
        type: "multiple_choice",
        question: "بأي ماء غُسل قلب النبي ﷺ في تلك الليلة؟",
        options: ["ماء المطر", "ماء زمزم", "ماء البحر", "ماء النهر"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "طست من ذهب", description: "تذكار يذكّرك أن الله ينظر إلى قلبك قبل كل شيء." },
      badge: "وسام: قلب مستعد",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "حديث شقّ الصدر ليلة الإسراء ثابت في الصحيحين.",
    },
  },
  {
    storyId: "st-5-02",
    stationId: 5,
    slug: "the-amazing-buraq",
    en: {
      title: "Al-Buraq: Swifter Than Sight",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Jibril brought a white creature from Paradise called al-Buraq, larger than a donkey and smaller than a mule, which placed its hoof as far as its sight could reach. When the Prophet (pbuh) came to ride it, it stirred, and Jibril said: is it Muhammad you do this to? No one more honoured before Allah has ever ridden you. So it settled and stood still, and they set off into the night sky.",
          shortLesson: "Allah's power is wider than anything we can picture.",
        },
        tier_2_age_9_11: {
          narrative:
            "Jibril brought a creature from Paradise called al-Buraq, brilliant white, larger than a donkey and smaller than a mule. The wonder of al-Buraq was its speed: it would place its hoof at the farthest point its sight could reach. When the Prophet (pbuh) drew near to ride, al-Buraq shied and stirred, and Jibril said to it: “Is it Muhammad you do this to? By Allah, no one has ever ridden you who is more honoured before Allah than he is.” Al-Buraq grew shy and broke into a sweat, then settled and stood still until the Messenger of Allah (pbuh) mounted, and away they went into the night sky.",
          details:
            "After naming the animals we know, Allah says: ﴿وَيَخْلُقُ مَا لَا تَعْلَمُونَ﴾ — “And He creates what you do not know.”",
        },
      },
      interactive: {
        discover: "The name “Buraq” comes from barq — lightning — for its speed.",
        value: { name: "The reach of Allah's power", icon: "⚡" },
        thinkQuestion: "What is the fastest thing you know? How would you picture something faster than sight itself?",
        challenge: {
          type: "multiple_choice",
          question: "What made al-Buraq remarkable?",
          options: ["It was red", "It stepped as far as its sight could reach", "It flew with two great wings", "It never grew tired"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A White Feather", description: "A keepsake for a mount unlike anything we know." },
        badge: "Badge: Rider of al-Buraq",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim",
        note: "The description of al-Buraq is established in Sahih Muslim in the Isra hadith.",
      },
    },
    title: "البُراق: دابّة أسرع من البصر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "أحضر جبريل عليه السلام دابّة بيضاء من الجنة تُسمّى البُراق، أكبر من الحمار وأصغر من البغل، تضع حافرها عند آخر ما يبلغه بصرها. ولما اقترب النبي ﷺ ليركبها تحرّكت، فقال لها جبريل: أبمحمد تفعلين هذا؟ فما ركبك أحد أكرم على الله منه. فسكنت ووقفت له، وانطلقا في سماء الليل.",
        shortLesson: "قدرة الله أوسع من كل ما نتخيّل.",
      },
      tier_2_age_9_11: {
        narrative:
          "أحضر جبريل عليه السلام دابّة من الجنة تُسمّى البُراق، بيضاء ناصعة، أكبر من الحمار وأصغر من البغل. والعجيب في البُراق سرعته: يضع حافره عند أبعد نقطة يبلغها بصره. فلما دنا النبي ﷺ ليركبه شمس البُراق وتحرّك، فقال له جبريل عليه السلام: «أبمحمد تفعل هذا؟ فوالله ما ركبك أحد قط أكرم على الله منه». فاستحى البُراق وتصبّب عرقاً، ثم سكن ووقف حتى ركبه رسول الله ﷺ، فانطلقا في سماء الليل.",
        details:
          "قال تعالى بعد أن ذكر ما نعرفه من الدوابّ: ﴿وَيَخْلُقُ مَا لَا تَعْلَمُونَ﴾.",
      },
    },
    interactive: {
      discover: "كلمة «البُراق» من البَرق، لسرعته.",
      value: { name: "سعة قدرة الله", icon: "⚡" },
      thinkQuestion:
        "ما أسرع شيء تعرفه؟ وكيف تتخيّل شيئاً أسرع من البصر نفسه؟",
      challenge: {
        type: "multiple_choice",
        question: "ما الذي يميّز البُراق؟",
        options: ["لونه الأحمر", "أنه يضع حافره عند منتهى بصره", "أنه يطير بجناحين كبيرين", "أنه لا يتعب أبداً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ريشة بيضاء", description: "تذكار لمركبةٍ من خلق الله لا تشبه شيئاً نعرفه." },
      badge: "وسام: راكب البُراق",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم",
      note: "وصف البُراق ثابت في صحيح مسلم من حديث الإسراء.",
    },
  },
  {
    storyId: "st-5-03",
    stationId: 5,
    slug: "road-to-jerusalem",
    en: {
      title: "The Road to Jerusalem",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On the road to Jerusalem, Jibril asked the Prophet (pbuh) to come down and pray at blessed places — among them where Allah spoke to Musa, and where Isa was born. On the way he was shown strange scenes of people receiving what their deeds had earned.",
          shortLesson: "We honour the places of all the prophets: their faith is one.",
        },
        tier_2_age_9_11: {
          narrative:
            "During the swift journey towards Jerusalem, Jibril asked the Prophet (pbuh) to come down and pray two rak'ahs at blessed places: among them Mount Tur, where Allah spoke to Musa, and Bethlehem, where Isa was born. Along the way the Prophet (pbuh) was shown strange scenes of people being repaid for what they had done, and from them he learned the reward of good deeds and the consequence of bad ones.",
          details:
            "Allah swears by these blessed places: ﴿وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ﴾.",
        },
      },
      interactive: {
        discover: "Jerusalem was the first qiblah of the Muslims, before it was turned to the Kaaba.",
        value: { name: "Honouring the prophets", icon: "🕌" },
        thinkQuestion: "Why do Muslims honour Musa and Isa as they honour Muhammad (pbuh)?",
        challenge: {
          type: "multiple_choice",
          question: "Which prophet did Allah speak to at Mount Tur?",
          options: ["Ibrahim", "Musa", "Isa", "Nuh"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An Olive Branch from Tur", description: "A branch to remind you that the prophets are brothers in one faith." },
        badge: "Badge: Visitor of Blessed Places",
      },
      source: {
        reliability: "🟡",
        reference: "Sunan an-Nasa'i, and the Seerah literature",
        note: "The Isra itself is established in the Quran and both Sahih collections; the stops to pray at Tur and Bethlehem come in a narration in an-Nasa'i whose chain some scholars have questioned.",
      },
    },
    title: "الطريق إلى بيت المقدس",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في الطريق إلى بيت المقدس طلب جبريل عليه السلام من النبي ﷺ أن ينزل فيصلّي في مواضع مباركة، منها الموضع الذي كلّم الله فيه موسى عليه السلام، والموضع الذي وُلد فيه عيسى عليه السلام. ورأى النبي ﷺ في طريقه مشاهد عجيبة تُريه جزاء الأعمال.",
        shortLesson: "نحترم أماكن الأنبياء جميعاً، فدينهم واحد.",
      },
      tier_2_age_9_11: {
        narrative:
          "أثناء رحلته السريعة نحو بيت المقدس، طلب جبريل عليه السلام من النبي ﷺ أن ينزل فيصلّي ركعتين في مواضع مباركة: منها طُور سيناء حيث كلّم الله موسى عليه السلام، وبيت لحم حيث وُلد عيسى عليه السلام. ورأى النبي ﷺ في طريقه مشاهد عجيبة لأقوام يُجزون بأعمالهم، فعلم من ذلك جزاء الصالح والسيّئ من العمل.",
        details:
          "قال تعالى مقسماً بهذه البقاع المباركة: ﴿وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَٰذَا الْبَلَدِ الْأَمِينِ﴾.",
      },
    },
    interactive: {
      discover: "بيت المقدس كان القبلة الأولى للمسلمين قبل أن تُحوَّل إلى الكعبة.",
      value: { name: "توقير الأنبياء", icon: "🕌" },
      thinkQuestion:
        "لماذا يوقّر المسلمون موسى وعيسى عليهما السلام كما يوقّرون محمداً ﷺ؟",
      challenge: {
        type: "multiple_choice",
        question: "أي نبي كلّمه الله عند الطُّور؟",
        options: ["إبراهيم عليه السلام", "موسى عليه السلام", "عيسى عليه السلام", "نوح عليه السلام"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "غصن زيتون من الطُّور", description: "غصن يذكّرك أن الأنبياء إخوة ودينهم واحد." },
      badge: "وسام: زائر البقاع المباركة",
    },
    source: {
      reliability: "🟡",
      reference: "سنن النسائي، وكتب السيرة",
      note: "أصل الإسراء ثابت في القرآن والصحيحين، أما نزوله ﷺ للصلاة في الطور وبيت لحم فجاء في رواية عند النسائي تكلّم في إسنادها بعض أهل العلم.",
    },
  },
  {
    storyId: "st-5-04",
    stationId: 5,
    slug: "leader-of-prophets",
    en: {
      title: "Leading the Prophets at al-Aqsa",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet (pbuh) reached al-Aqsa Mosque and tied al-Buraq at the door. When he entered, he found all the prophets from Adam to Isa waiting for him. The prayer was called, and Jibril brought him forward to lead them.",
          shortLesson: "Our Prophet (pbuh) is the last of the prophets, and their imam.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) reached al-Aqsa Mosque and tied al-Buraq to the ring the prophets used for their mounts. When he entered the mosque, there was the surprise: the prophets and messengers from Adam to Isa, gathered by Allah, waiting for him. The prayer was called, and Jibril took the hand of our Prophet Muhammad (pbuh) and brought him forward as imam, and he led all the prophets in prayer. That scene was an announcement that he is the seal of the prophets and their imam, and that his message is for all people.",
          details:
            "Allah records the journey: ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى﴾.",
        },
      },
      interactive: {
        discover: "Surah Al-Isra is named after this journey and opens with it.",
        value: { name: "The standing of al-Aqsa", icon: "🕋" },
        thinkQuestion: "What does it mean that all the prophets prayed behind one imam?",
        challenge: {
          type: "multiple_choice",
          question: "Where did the Prophet (pbuh) lead the prophets in prayer?",
          options: ["The Sacred Mosque", "The Prophet's Mosque", "Al-Aqsa Mosque", "Quba Mosque"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "The Door Ring", description: "The ring al-Buraq was tied to at the door of al-Aqsa." },
        badge: "Badge: Within al-Aqsa",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim, and Surah Al-Isra",
        note: "The Prophet leading the prophets in prayer at Jerusalem is established in Sahih Muslim.",
      },
    },
    title: "إمام الأنبياء في المسجد الأقصى",
    content: {
      tier_1_age_6_8: {
        narrative:
          "وصل النبي ﷺ إلى المسجد الأقصى وربط البُراق عند الباب. ولما دخل وجد الأنبياء جميعاً من آدم إلى عيسى عليهم السلام في انتظاره. فأقيمت الصلاة، وقدّمه جبريل عليه السلام ليصلّي بهم إماماً.",
        shortLesson: "نبينا ﷺ خاتم الأنبياء وإمامهم.",
      },
      tier_2_age_9_11: {
        narrative:
          "وصل النبي ﷺ إلى المسجد الأقصى، فربط البُراق في الحلقة التي كانت تربط بها الأنبياء دوابّهم. ولما دخل المسجد كانت المفاجأة: الأنبياء والرسل من آدم إلى عيسى عليهم السلام قد جمعهم الله في انتظاره. فأقيمت الصلاة، وأخذ جبريل عليه السلام بيد نبينا محمد ﷺ فقدّمه إماماً، فصلّى بالأنبياء جميعاً. وكان هذا المشهد إعلاناً بأنه خاتم النبيين وإمامهم، وأن رسالته للناس كافّة.",
        details:
          "قال تعالى يوثّق الرحلة: ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ﴾.",
      },
    },
    interactive: {
      discover: "سورة الإسراء سُمّيت بهذه الرحلة، وتبدأ بذكرها.",
      value: { name: "مكانة الأقصى", icon: "🕋" },
      thinkQuestion:
        "ماذا يعني أن يصلّي الأنبياء كلهم خلف إمام واحد؟",
      challenge: {
        type: "multiple_choice",
        question: "أين صلّى النبي ﷺ إماماً بالأنبياء؟",
        options: ["المسجد الحرام", "المسجد النبوي", "المسجد الأقصى", "مسجد قباء"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "حلقة الباب", description: "حلقة رُبط بها البُراق عند باب المسجد الأقصى." },
      badge: "وسام: في رحاب الأقصى",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم، وسورة الإسراء",
      note: "إمامة النبي ﷺ بالأنبياء في بيت المقدس ثابتة في صحيح مسلم.",
    },
  },
  {
    storyId: "st-5-05",
    stationId: 5,
    slug: "the-first-heaven-adam",
    en: {
      title: "The First Heaven: Meeting Adam",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet (pbuh) ascended with Jibril to the first heaven. Jibril asked to be let in. “Who is it?” “Jibril.” “And who is with you?” “Muhammad.” The gate opened, and there was Adam, the father of humanity, who welcomed him: “Welcome, righteous son and righteous prophet.”",
          shortLesson: "We ask permission before entering — even at the gates of heaven.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) ascended with Jibril in the Mi'raj until they reached the gate of the first heaven. Jibril asked for it to be opened. “Who is this?” “Jibril.” “And who is with you?” “Muhammad.” “Has he been sent for?” “Yes.” The gate opened, and there was Adam, the father of humanity, who welcomed him and said: “Welcome, righteous son and righteous prophet.” Adam would look to his right and laugh, and to his left and weep — for on his right were the souls of the happy among his children, and on his left the souls of the wretched.",
          details:
            "Allah says of the heavens: ﴿الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا﴾ — “who created seven heavens in layers.”",
        },
      },
      interactive: {
        discover: "Every prophet he met in the heavens welcomed him and prayed for good for him.",
        value: { name: "The manners of asking permission", icon: "🚪" },
        thinkQuestion: "Your good deeds gladden Adam — what deed would you like him to see from you today?",
        challenge: {
          type: "multiple_choice",
          question: "Whom did the Prophet (pbuh) meet in the first heaven?",
          options: ["Ibrahim", "Adam", "Musa", "Yusuf"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "Key of the First Heaven", description: "A key: the door opens for the one who asks." },
        badge: "Badge: Guest of the First Heaven",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The Mi'raj and meeting the prophets in the heavens are established in both Sahih collections.",
      },
    },
    title: "السماء الأولى: لقاء آدم عليه السلام",
    content: {
      tier_1_age_6_8: {
        narrative:
          "صعد النبي ﷺ مع جبريل عليه السلام إلى السماء الأولى. فاستأذن جبريل، فقيل: من؟ قال: جبريل. قيل: ومن معك؟ قال: محمد. ففُتح لهما، فإذا آدم عليه السلام أبو البشر، فرحّب به وقال: مرحباً بالابن الصالح والنبي الصالح.",
        shortLesson: "نستأذن قبل أن ندخل، حتى في السماء.",
      },
      tier_2_age_9_11: {
        narrative:
          "صعد النبي ﷺ مع جبريل عليه السلام في المعراج حتى بلغا باب السماء الأولى. فاستفتح جبريل، فقيل: من هذا؟ قال: جبريل. قيل: ومن معك؟ قال: محمد. قيل: وقد أُرسل إليه؟ قال: نعم. ففُتح لهما، فإذا هو بآدم عليه السلام أبي البشر، فرحّب به وقال: «مرحباً بالابن الصالح والنبي الصالح». وكان آدم عليه السلام ينظر عن يمينه فيضحك، وينظر عن شماله فيبكي، لأن عن يمينه أرواح أهل السعادة من ذريّته، وعن شماله أرواح أهل الشقاء.",
        details:
          "قال تعالى في عظمة خلق السماوات: ﴿الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ﴾.",
      },
    },
    interactive: {
      discover: "كل نبي لقيه في السماوات رحّب به ودعا له بخير.",
      value: { name: "أدب الاستئذان", icon: "🚪" },
      thinkQuestion:
        "عملك الصالح يُفرح آدم عليه السلام — فما العمل الذي تحب أن يراه منك اليوم؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن لقي النبي ﷺ في السماء الأولى؟",
        options: ["إبراهيم عليه السلام", "آدم عليه السلام", "موسى عليه السلام", "يوسف عليه السلام"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "مفتاح السماء الأولى", description: "مفتاح يذكّرك أن الباب يُفتح لمن استأذن." },
      badge: "وسام: ضيف السماء الأولى",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "حديث المعراج ولقاء الأنبياء في السماوات ثابت في الصحيحين.",
    },
  },
  {
    storyId: "st-5-06",
    stationId: 5,
    slug: "second-heaven-isa-yahya",
    en: {
      title: "The Second Heaven: The Cousins",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet (pbuh) and Jibril rose to the second heaven and asked to enter. The gate opened, and there were two noble young men: Isa the son of Maryam and Yahya the son of Zakariya, who were cousins. They welcomed him and said: “Welcome, righteous brother and righteous prophet.”",
          shortLesson: "A kind word and a bright face are the best way to receive people.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) rose with Jibril to the second heaven and asked for the gate to be opened. It opened, and there were two noble young men: Isa the son of Maryam and Yahya the son of Zakariya, who were cousins. They were glad to see him, welcomed him and said: “Welcome, righteous brother and righteous prophet,” and prayed for good for him. That is how the prophets receive one another — with love and prayer, not rivalry.",
          details:
            "Allah says of these prophets: ﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ الصَّالِحِينَ﴾ — “all of them among the righteous.”",
        },
      },
      interactive: {
        discover: "The mothers of Yahya and Isa were sisters, which makes them cousins.",
        value: { name: "Welcoming well", icon: "🤝" },
        thinkQuestion: "How do you greet a guest who comes to your home? What words do you like to hear when you arrive?",
        challenge: {
          type: "multiple_choice",
          question: "Whom did the Prophet (pbuh) meet in the second heaven?",
          options: ["Adam and Idris", "Isa and Yahya", "Musa and Harun", "Ibrahim and Yusuf"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "Two Branches Side by Side", description: "Two branches for two who were kin in blood and in calling." },
        badge: "Badge: Guest of the Second Heaven",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "Meeting the prophets in the heavens is established in the Mi'raj hadith in both Sahih collections.",
      },
    },
    title: "السماء الثانية: ابنا الخالة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "صعد النبي ﷺ وجبريل عليه السلام إلى السماء الثانية واستأذنا، ففُتح لهما، فإذا شابّان كريمان: عيسى ابن مريم ويحيى بن زكريا عليهما السلام، وهما ابنا خالة. فرحّبا به وقالا: مرحباً بالأخ الصالح والنبي الصالح.",
        shortLesson: "الكلمة الطيبة والبِشر أجمل ما نستقبل به الناس.",
      },
      tier_2_age_9_11: {
        narrative:
          "صعد النبي ﷺ مع جبريل عليه السلام إلى السماء الثانية فاستفتحا، ففُتح لهما، فإذا هو بشابّين كريمين: عيسى ابن مريم ويحيى بن زكريا عليهما السلام، وهما ابنا خالة. ففرحا برؤيته ورحّبا به وقالا: «مرحباً بالأخ الصالح والنبي الصالح»، ودعوا له بالخير. وهكذا يستقبل الأنبياء بعضهم بعضاً: بالمحبة والدعاء لا بالمنافسة.",
        details:
          "قال تعالى في هؤلاء الأنبياء: ﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ الصَّالِحِينَ﴾.",
      },
    },
    interactive: {
      discover: "أمّ يحيى وأمّ عيسى عليهما السلام كانتا أختين، فهما ابنا خالة.",
      value: { name: "حسن الاستقبال", icon: "🤝" },
      thinkQuestion:
        "كيف تستقبل ضيفاً يدخل بيتكم؟ وما الكلمة التي تحب أن تُقال لك حين تدخل؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن لقي النبي ﷺ في السماء الثانية؟",
        options: ["آدم وإدريس", "عيسى ويحيى", "موسى وهارون", "إبراهيم ويوسف"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "غصنان متجاوران", description: "غصنان يذكّرانك بأخوين في النسب والدعوة." },
      badge: "وسام: ضيف السماء الثانية",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "لقاء الأنبياء في السماوات ثابت في حديث المعراج في الصحيحين.",
    },
  },
  {
    storyId: "st-5-07",
    stationId: 5,
    slug: "third-heaven-yusuf",
    en: {
      title: "The Third Heaven: Half of All Beauty",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the third heaven the Prophet (pbuh) met Yusuf, of whom he said: “He has been given half of all beauty.” This is the prophet who bore his brothers' betrayal and prison with patience, until Allah gave him standing in the land. He welcomed his brother Muhammad (pbuh) and prayed for him.",
          shortLesson: "Beauty of face is not complete without beauty of heart and patience.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) and Jibril reached the third heaven, and the gate was opened, and there was a man given beauty as no one else had been given. It was Yusuf, who as a boy faced his brothers' betrayal, then the well, then the prison — and bore it patiently until Allah placed him over the storehouses of Egypt. Our Prophet (pbuh) said of him: “He had been given half of all beauty.” Yusuf welcomed his brother Muhammad (pbuh) and prayed for good for him.",
          details:
            "Allah says of his story: ﴿لَّقَدْ كَانَ فِي يُوسُفَ وَإِخْوَتِهِ آيَاتٌ لِّلسَّائِلِينَ﴾ — “in Yusuf and his brothers were signs for those who ask.”",
        },
      },
      interactive: {
        discover: "Surah Yusuf is the only surah that tells one prophet's story whole, from beginning to end.",
        value: { name: "Patience and fine character", icon: "⭐" },
        thinkQuestion: "What made Yusuf great — his beauty, or his patience? Why?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet (pbuh) say about Yusuf's beauty?",
          options: ["He was given half of all beauty", "He was the tallest of people", "He was the strongest", "He was the swiftest"],
          correctAnswer: 0,
        },
      },
      gamification: {
        artifact: { name: "Yusuf's Shirt", description: "A shirt to remind you that patience brings joy back to a home." },
        badge: "Badge: Beautiful Patience",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim",
        note: "The Prophet's words about Yusuf being given half of beauty are in Sahih Muslim.",
      },
    },
    title: "السماء الثالثة: شطر الحُسن",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السماء الثالثة لقي النبي ﷺ يوسف عليه السلام، وقال عنه: «قد أُعطي شطر الحُسن». وهو النبي الذي صبر على غدر إخوته وعلى السجن، حتى مكّنه الله في الأرض. فرحّب بأخيه محمد ﷺ ودعا له.",
        shortLesson: "جمال الوجه لا يتمّ إلا بجمال القلب والصبر.",
      },
      tier_2_age_9_11: {
        narrative:
          "وصل النبي ﷺ وجبريل عليه السلام إلى السماء الثالثة، ففُتح لهما، فإذا برجل قد أُعطي من الجمال ما لم يُعطَ أحد. إنه يوسف عليه السلام، الذي واجه في صغره غدر إخوته ثم البئر ثم السجن، فصبر واحتسب حتى جعله الله على خزائن مصر. قال عنه نبينا ﷺ: «فإذا هو قد أُعطي شطر الحُسن». فرحّب يوسف بأخيه محمد ﷺ ودعا له بالخير.",
        details:
          "قال تعالى في قصته: ﴿لَّقَدْ كَانَ فِي يُوسُفَ وَإِخْوَتِهِ آيَاتٌ لِّلسَّائِلِينَ﴾.",
      },
    },
    interactive: {
      discover: "سورة يوسف هي السورة الوحيدة التي قصّت قصة نبي كاملة من أولها إلى آخرها.",
      value: { name: "الصبر وجمال الأخلاق", icon: "⭐" },
      thinkQuestion:
        "ما الذي جعل يوسف عليه السلام عظيماً: جماله أم صبره؟ ولماذا؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ عن جمال يوسف عليه السلام؟",
        options: ["أُعطي شطر الحُسن", "كان أطول الناس", "كان أقوى الناس", "كان أسرع الناس"],
        correctAnswer: 0,
      },
    },
    gamification: {
      artifact: { name: "قميص يوسف", description: "قميص يذكّرك أن الصبر يعيد الفرح إلى البيوت." },
      badge: "وسام: صابر جميل",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم",
      note: "قول النبي ﷺ في يوسف «أُعطي شطر الحُسن» ثابت في صحيح مسلم.",
    },
  },
  {
    storyId: "st-5-08",
    stationId: 5,
    slug: "fourth-heaven-idris",
    en: {
      title: "The Fourth Heaven: A High Place",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the fourth heaven the Prophet (pbuh) met Idris, whom Allah raised to a high place. He welcomed him with the words every prophet said: “Welcome, righteous brother and righteous prophet.”",
          shortLesson: "Useful knowledge and careful work raise the one who has them.",
        },
        tier_2_age_9_11: {
          narrative:
            "In the fourth heaven, after Jibril asked and the gate was opened, the Prophet (pbuh) met Idris. He is a noble prophet whom Allah praised as truthful and a prophet, and whom He raised to a high place. Idris welcomed the Prophet (pbuh) with the words every prophet he met had said: “Welcome, righteous brother and righteous prophet.”",
          details:
            "Allah says: ﴿وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾ — “And We raised him to a high place.”",
        },
      },
      interactive: {
        discover: "Idris is named only twice in the Quran: in Surah Maryam and Surah Al-Anbiya.",
        value: { name: "Knowledge and craftsmanship", icon: "📐" },
        thinkQuestion: "What work do you do carefully, and would like to become the best at?",
        challenge: {
          type: "multiple_choice",
          question: "How does Allah describe Idris?",
          options: ["A great king", "Truthful, a prophet, raised to a high place", "The first messenger", "The longest-lived prophet"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Pen and Tablet", description: "A keepsake for those raised by what they know and do well." },
        badge: "Badge: Seeker of Knowledge",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim, and Surah Maryam",
        note: "Meeting Idris during the Mi'raj is established in both Sahih collections.",
      },
    },
    title: "السماء الرابعة: المكان العليّ",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السماء الرابعة لقي النبي ﷺ إدريس عليه السلام، الذي رفعه الله مكاناً علياً. فرحّب به وقال ما يقوله الأنبياء: مرحباً بالأخ الصالح والنبي الصالح.",
        shortLesson: "العلم النافع والعمل المتقن يرفعان صاحبهما.",
      },
      tier_2_age_9_11: {
        narrative:
          "في السماء الرابعة، وبعد أن استأذن جبريل عليه السلام وفُتح لهما، لقي النبي ﷺ إدريس عليه السلام. وهو نبي كريم أثنى الله عليه بالصدق والنبوة، ورفعه مكاناً علياً. فرحّب إدريس بالنبي ﷺ وقال الكلمة التي قالها كل نبي لقيه: «مرحباً بالأخ الصالح والنبي الصالح».",
        details:
          "قال تعالى: ﴿وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا ۝ وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾.",
      },
    },
    interactive: {
      discover: "ذُكر إدريس عليه السلام في القرآن مرتين فقط: في سورة مريم وسورة الأنبياء.",
      value: { name: "العلم والإتقان", icon: "📐" },
      thinkQuestion:
        "ما العمل الذي تتقنه وتحب أن تصير فيه الأفضل؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا وصف الله إدريس عليه السلام؟",
        options: ["كان ملكاً عظيماً", "كان صدّيقاً نبياً ورُفع مكاناً علياً", "كان أول الرسل", "كان أطول الأنبياء عمراً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قلم ولوح", description: "تذكار لمن يرفعه علمه وعمله." },
      badge: "وسام: طالب علم",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم، وسورة مريم",
      note: "لقاء إدريس عليه السلام في المعراج ثابت في الصحيحين.",
    },
  },
  {
    storyId: "st-5-09",
    stationId: 5,
    slug: "fifth-heaven-harun",
    en: {
      title: "The Fifth Heaven: The Beloved Prophet",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the fifth heaven the Prophet (pbuh) met a dignified elder and asked Jibril: who is this? He said: this is the one beloved by his people, Harun ibn Imran, the brother of Musa. He was known for his gentleness, and his people loved him.",
          shortLesson: "Gentleness with people opens hearts.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) rose to the fifth heaven and met there a dignified elder with white hair and beard. He asked Jibril: “Who is this?” He said: “This is the one beloved by his people, Harun ibn Imran.” He is the brother of Musa, known for his gentleness and kindness, and his people loved him and were at ease with him. Harun welcomed Prophet Muhammad (pbuh) and prayed for him.",
          details:
            "Allah says of His gift to Musa: ﴿وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا﴾ — “We gave him his brother Harun, a prophet.”",
        },
      },
      interactive: {
        discover: "Musa asked his Lord to make his brother Harun a helper to him, and Allah answered him.",
        value: { name: "Gentleness", icon: "🕊️" },
        thinkQuestion: "Who is the person you love most for being gentle with you? How can you be that for someone else?",
        challenge: {
          type: "multiple_choice",
          question: "How was Harun described in the fifth heaven?",
          options: ["The strongest of prophets", "The one beloved by his people", "The most learned", "The wealthiest"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A White Feather", description: "A feather to remind you that gentleness wins hearts." },
        badge: "Badge: Gentle of Heart",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "Harun being described as beloved by his people comes in the Mi'raj hadith.",
      },
    },
    title: "السماء الخامسة: النبي المحبَّب",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السماء الخامسة لقي النبي ﷺ شيخاً وقوراً، فسأل جبريل: من هذا؟ قال: هذا المحبَّب في قومه، هارون بن عمران، أخو موسى عليهما السلام. وكان معروفاً بلينه ولطفه، فأحبّه قومه.",
        shortLesson: "اللين مع الناس يفتح القلوب.",
      },
      tier_2_age_9_11: {
        narrative:
          "صعد النبي ﷺ إلى السماء الخامسة، فلقي فيها شيخاً وقوراً أبيض الرأس واللحية. فسأل جبريل عليه السلام: «من هذا؟» فقال: «هذا المحبَّب في قومه، هارون بن عمران». وهو أخو موسى عليهما السلام، وكان معروفاً بلينه ورفقه، فأحبّه قومه وأنِسوا به. فرحّب هارون بالنبي محمد ﷺ ودعا له.",
        details:
          "قال تعالى في هبته لموسى: ﴿وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا﴾.",
      },
    },
    interactive: {
      discover: "طلب موسى عليه السلام من ربه أن يجعل أخاه هارون وزيراً له، فاستجاب الله له.",
      value: { name: "اللين والرفق", icon: "🕊️" },
      thinkQuestion:
        "مَن أكثر شخص تحبّه لأنه لطيف معك؟ وكيف تكون أنت كذلك مع غيرك؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ وُصف هارون عليه السلام في السماء الخامسة؟",
        options: ["أشدّ الأنبياء", "المحبَّب في قومه", "أعلمهم", "أغناهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ريشة بيضاء", description: "ريشة تذكّرك أن الرفق يكسب القلوب." },
      badge: "وسام: رفيق القلب",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "وصف هارون عليه السلام بالمحبَّب في قومه جاء في حديث المعراج.",
    },
  },
  {
    storyId: "st-5-10",
    stationId: 5,
    slug: "sixth-heaven-musa",
    en: {
      title: "The Sixth Heaven: The Tear of Musa",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the sixth heaven the Prophet (pbuh) met Musa, who welcomed him. When the Prophet passed him to continue his ascent, Musa wept. He was asked: what makes you weep? He said: I weep because a young man was sent after me, and more of his nation will enter Paradise than of mine.",
          shortLesson: "The prophets are glad for us and want us saved.",
        },
        tier_2_age_9_11: {
          narrative:
            "In the sixth heaven the Prophet (pbuh) met Musa, to whom Allah spoke, and Musa welcomed him gladly. When the Prophet (pbuh) passed him to continue his ascent, Musa wept. He was asked: “What makes you weep?” He said: “I weep because a young man was sent after me, and more of his nation will enter Paradise than of mine.” It was never envy — the prophets are far above that — but concern for his own people, sorrow for those of them who turned away, and gladness at how many of Muhammad's nation would be saved.",
          details:
            "Allah says of Musa: ﴿إِنَّهُ كَانَ مُخْلَصًا وَكَانَ رَسُولًا نَّبِيًّا﴾ — “he was chosen, and he was a messenger and a prophet.”",
        },
      },
      interactive: {
        discover: "Musa is called Kalimullah — the one Allah spoke to directly.",
        value: { name: "Caring for others", icon: "💧" },
        thinkQuestion: "Have you ever been sad for someone else rather than for yourself? Tell us about it.",
        challenge: {
          type: "multiple_choice",
          question: "Why did Musa weep as the Prophet (pbuh) passed him?",
          options: ["He was tired", "More of Muhammad's nation would enter Paradise than his own", "He missed his people", "He was saying goodbye"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Drop of Dew", description: "A drop for a prophet who wept out of care for his people." },
        badge: "Badge: Of Muhammad's Nation",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim",
        note: "Musa weeping during the Mi'raj is established in Sahih Muslim.",
      },
    },
    title: "السماء السادسة: دمعة الكليم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السماء السادسة لقي النبي ﷺ موسى عليه السلام كليم الله، فرحّب به. فلما جاوزه ليصعد بكى موسى، فقيل له: ما يبكيك؟ قال: أبكي لأن غلاماً بُعث بعدي يدخل الجنة من أمته أكثر ممن يدخلها من أمتي.",
        shortLesson: "الأنبياء يفرحون لنا ويحرصون على نجاتنا.",
      },
      tier_2_age_9_11: {
        narrative:
          "في السماء السادسة لقي النبي ﷺ موسى عليه السلام كليم الله، فرحّب به وفرح بلقائه. فلما جاوزه النبي ﷺ ليكمل صعوده بكى موسى عليه السلام، فقيل له: ما يبكيك؟ قال: «أبكي لأن غلاماً بُعث بعدي يدخل الجنة من أمته أكثر ممن يدخل من أمتي». ولم يكن ذلك حسداً — والأنبياء أطهر من ذلك — وإنما حرصٌ على أمته وحزنٌ على من خالفه منهم، وفرحٌ بكثرة الناجين من أمة محمد ﷺ.",
        details:
          "قال تعالى في موسى عليه السلام: ﴿وَاذْكُرْ فِي الْكِتَابِ مُوسَىٰ ۚ إِنَّهُ كَانَ مُخْلَصًا وَكَانَ رَسُولًا نَّبِيًّا﴾.",
      },
    },
    interactive: {
      discover: "سُمّي موسى عليه السلام «كليم الله» لأن الله كلّمه تكليماً.",
      value: { name: "الحرص على الناس", icon: "💧" },
      thinkQuestion:
        "هل حزنت مرة من أجل غيرك لا من أجل نفسك؟ حدّثنا عنها.",
      challenge: {
        type: "multiple_choice",
        question: "لماذا بكى موسى عليه السلام حين جاوزه النبي ﷺ؟",
        options: ["لأنه تعب", "لأن أمة محمد ﷺ يدخل الجنة منها أكثر من أمته", "لأنه اشتاق لقومه", "لأنه ودّعه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قطرة ندى", description: "قطرة تذكّرك بنبيّ بكى شفقةً على قومه." },
      badge: "وسام: من أمة محمد",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم",
      note: "بكاء موسى عليه السلام في المعراج ثابت في صحيح مسلم.",
    },
  },
  {
    storyId: "st-5-11",
    stationId: 5,
    slug: "seventh-heaven-ibrahim",
    en: {
      title: "The Seventh Heaven: Ibrahim's Greeting to Us",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the seventh heaven the Prophet (pbuh) saw a man who resembled him, resting his back against al-Bayt al-Ma'mur — a House in the heavens circled each day by seventy thousand angels who never return to it. It was Ibrahim, who welcomed him and sent a greeting to his nation.",
          shortLesson: "Remembrance of Allah plants trees for us in Paradise.",
        },
        tier_2_age_9_11: {
          narrative:
            "The gate of the seventh heaven opened, and the Prophet (pbuh) saw a dignified man who resembled him more than anyone, resting his back against al-Bayt al-Ma'mur — a House in the heavens which seventy thousand angels enter and circle every day, and never return to again, so many are they. It was Ibrahim, the friend of the Most Merciful. He welcomed the Prophet (pbuh) and gave him a message for his nation: “Give my greeting to your nation, and tell them that Paradise has sweet soil and fresh water, that it is a level plain, and that its planting is: Subhan Allah, al-hamdu lillah, la ilaha illa Allah, Allahu akbar.”",
          details:
            "He is the one who raised the foundations of the Kaaba on earth: ﴿وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ﴾.",
        },
      },
      interactive: {
        discover: "Al-Bayt al-Ma'mur in the heavens corresponds to the Kaaba on earth.",
        value: { name: "The lasting good deeds", icon: "🌳" },
        thinkQuestion: "If every word of praise were a tree in Paradise, how many did you plant today?",
        challenge: {
          type: "multiple_choice",
          question: "What message did Ibrahim give the Prophet (pbuh) for his nation?",
          options: ["To build a mosque", "His greeting, and that remembrance is the planting of Paradise", "To fast", "To migrate"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Seed of Light", description: "A seed: each word of remembrance is a tree planted for you." },
        badge: "Badge: A Planter in Paradise",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, and Sunan at-Tirmidhi",
        note: "Meeting Ibrahim at al-Bayt al-Ma'mur is in Bukhari; the hadith of the planting of Paradise is in Tirmidhi, who graded it good.",
      },
    },
    title: "السماء السابعة: سلام إبراهيم إلينا",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السماء السابعة رأى النبي ﷺ رجلاً يشبهه، مسنداً ظهره إلى البيت المعمور، وهو بيت في السماء يطوف به كل يوم سبعون ألف ملَك لا يعودون إليه. إنه إبراهيم عليه السلام، فرحّب به وأرسل معه سلاماً إلى أمته.",
        shortLesson: "ذكر الله يزرع لنا في الجنة غراساً.",
      },
      tier_2_age_9_11: {
        narrative:
          "فُتح باب السماء السابعة، فرأى النبي ﷺ رجلاً مهيباً كان أشبه الناس به، مسنداً ظهره إلى البيت المعمور، وهو بيت في السماء يدخله كل يوم سبعون ألف ملَك يطوفون به ثم لا يعودون إليه أبداً من كثرتهم. إنه إبراهيم عليه السلام خليل الرحمن. فرحّب بالنبي ﷺ وحمّله رسالة إلى أمته: «أَقرِئ أمتك مني السلام، وأخبرهم أن الجنة طيبة التربة عذبة الماء، وأنها قِيعان، وأن غراسها: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر».",
        details:
          "وهو الذي رفع قواعد الكعبة في الأرض: ﴿وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا﴾.",
      },
    },
    interactive: {
      discover: "البيت المعمور في السماء يقابل الكعبة في الأرض.",
      value: { name: "الباقيات الصالحات", icon: "🌳" },
      thinkQuestion:
        "لو كانت كل تسبيحة شجرة في الجنة، كم شجرة زرعت اليوم؟",
      challenge: {
        type: "multiple_choice",
        question: "ما الرسالة التي حمّلها إبراهيم عليه السلام للنبي ﷺ إلى أمته؟",
        options: ["أن يبنوا مسجداً", "السلام، وأن غراس الجنة الذكر", "أن يصوموا", "أن يهاجروا"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بذرة نور", description: "بذرة تذكّرك أن كلمة الذكر شجرة تُغرس لك." },
      badge: "وسام: غارس في الجنة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، وسنن الترمذي",
      note: "لقاء إبراهيم عليه السلام عند البيت المعمور في البخاري، وحديث غراس الجنة عند الترمذي وحسّنه.",
    },
  },
  {
    storyId: "st-5-12",
    stationId: 5,
    slug: "sidrat-al-muntaha",
    en: {
      title: "Sidrat al-Muntaha: Where Everything Stops",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet (pbuh) rose until he reached a great tree called Sidrat al-Muntaha, where everything that ascends comes to an end and no creature passes beyond. There Jibril stopped and said: if I came a fingertip nearer I would burn. And the Prophet (pbuh) went on alone.",
          shortLesson: "Every creature has a limit — and our Prophet's standing is great.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) and Jibril rose until they reached a great and beautiful tree called Sidrat al-Muntaha, at which the knowledge of every ascending one ends and beyond which no creature passes. Its leaves are like the ears of elephants, its fruits are large, and it is covered by a light of Allah that no one can describe. There Jibril stopped and told the Prophet (pbuh), in meaning: this is my station, which I do not pass; were I to come a fingertip closer I would burn. And the Prophet (pbuh) went on alone, to where no creature had reached.",
          details:
            "Allah says: ﴿عِندَ سِدْرَةِ الْمُنتَهَىٰ ۝ عِندَهَا جَنَّةُ الْمَأْوَىٰ﴾ — “at the Lote Tree of the Utmost Boundary, near it is the Garden of Refuge.”",
        },
      },
      interactive: {
        discover: "It is called al-Muntaha — the end — because everything rising from the earth stops there.",
        value: { name: "Knowing your measure", icon: "🌌" },
        thinkQuestion: "Jibril knew his limit and stopped at it — when is stopping at a limit courage rather than weakness?",
        challenge: {
          type: "multiple_choice",
          question: "What did Jibril do at Sidrat al-Muntaha?",
          options: ["He went ahead of the Prophet", "He stopped and did not pass it", "He returned to earth", "He circled it"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Lote Leaf", description: "A leaf from the tree where every ascending one stops." },
        badge: "Badge: Reached the Boundary",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim, and Surah An-Najm",
        note: "Sidrat al-Muntaha is named in Surah An-Najm and described in both Sahih collections.",
      },
    },
    title: "سدرة المنتهى: حيث يقف كل شيء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "صعد النبي ﷺ حتى بلغ شجرة عظيمة تُسمّى سدرة المنتهى، إليها ينتهي كل صاعد ولا يتجاوزها مخلوق. وعندها وقف جبريل عليه السلام وقال: لو دنوتُ أنملة لاحترقت. ومضى النبي ﷺ وحده.",
        shortLesson: "لكل مخلوق حدّ يقف عنده، ومقام نبينا ﷺ عظيم.",
      },
      tier_2_age_9_11: {
        narrative:
          "صعد النبي ﷺ وجبريل عليه السلام حتى بلغا شجرة عظيمة جميلة تُسمّى سدرة المنتهى، إليها ينتهي علم كل صاعد ولا يجاوزها مخلوق. ورقها كآذان الفِيَلة، وثمرها كِبار، ويغشاها من نور الله ما لا يستطيع أحد أن يصفه. وعندها وقف جبريل عليه السلام فقال للنبي ﷺ ما معناه: هذا مقامي الذي لا أتجاوزه، ولو دنوتُ أنملة لاحترقت. ومضى النبي ﷺ وحده إلى حيث لم يبلغ مخلوق.",
        details:
          "قال تعالى: ﴿عِندَ سِدْرَةِ الْمُنتَهَىٰ ۝ عِندَهَا جَنَّةُ الْمَأْوَىٰ ۝ إِذْ يَغْشَى السِّدْرَةَ مَا يَغْشَىٰ﴾.",
      },
    },
    interactive: {
      discover: "سُمّيت «المنتهى» لأن كل ما يصعد من الأرض ينتهي عندها.",
      value: { name: "معرفة القدر", icon: "🌌" },
      thinkQuestion:
        "جبريل عليه السلام عرف حدّه ووقف عنده — متى يكون الوقوف عند الحدّ شجاعة لا ضعفاً؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل جبريل عليه السلام عند سدرة المنتهى؟",
        options: ["تقدّم أمام النبي ﷺ", "وقف ولم يتجاوزها", "رجع إلى الأرض", "طاف حولها"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ورقة من سدر", description: "ورقة من شجرة يقف عندها كل صاعد." },
      badge: "وسام: بلغ المنتهى",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم، وسورة النجم",
      note: "سدرة المنتهى مذكورة في سورة النجم، ووصفها في الصحيحين.",
    },
  },
  {
    storyId: "st-5-13",
    stationId: 5,
    slug: "the-great-gift-prayer",
    en: {
      title: "The Great Gift: The Prayer",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet (pbuh) reached a place where he heard the scratching of the pens, and there Allah spoke to him and made the prayer obligatory on his nation: fifty prayers a day and night. The prayer is the only act of worship made obligatory in the heavens rather than on earth.",
          shortLesson: "The prayer is a gift from the sky, and your link to your Lord.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet (pbuh) went on until he reached a level where he could hear the scratching of the pens — the pens of the angels as they write. There Allah revealed to His servant what He revealed, and made the prayer obligatory upon his nation: fifty prayers a day and night. The prayer is the only act of worship made obligatory in the heavens and not on earth, which shows how great a matter it is.",
          details:
            "Allah says of that station: ﴿فَأَوْحَىٰ إِلَىٰ عَبْدِهِ مَا أَوْحَىٰ ۝ مَا كَذَبَ الْفُؤَادُ مَا رَأَىٰ﴾.",
        },
      },
      interactive: {
        discover: "The prayer is the first thing a servant will be asked about on the Day of Judgement.",
        value: { name: "The weight of the prayer", icon: "🕌" },
        thinkQuestion: "If the prayer is a gift brought from above seven heavens, how will you receive it each day?",
        challenge: {
          type: "multiple_choice",
          question: "How many prayers were made obligatory at first?",
          options: ["Five", "Seventeen", "Fifty", "A hundred"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A Small Prayer Mat", description: "A mat for the most precious gift ever brought down from the sky." },
        badge: "Badge: Keeper of the Prayer",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The prayer being made obligatory on the night of the Mi'raj is established in both Sahih collections.",
      },
    },
    title: "الهدية الكبرى: الصلاة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بلغ النبي ﷺ مكاناً سمع فيه صريف الأقلام، وهناك كلّمه الله وفرض على أمته الصلاة: خمسين صلاة في اليوم والليلة. والصلاة هي العبادة الوحيدة التي فُرضت في السماء لا في الأرض.",
        shortLesson: "الصلاة هديّة من السماء، وصلتك بربك.",
      },
      tier_2_age_9_11: {
        narrative:
          "مضى النبي ﷺ حتى بلغ مستوى سمع فيه صريف الأقلام — أقلام الملائكة وهي تكتب. وهناك أوحى الله إلى عبده ما أوحى، وفرض على أمته الصلاة خمسين صلاة في اليوم والليلة. والصلاة هي العبادة الوحيدة التي فُرضت في السماء ولم تُفرض في الأرض، وفي ذلك دليل على عِظم شأنها.",
        details:
          "قال تعالى في ذلك المقام: ﴿فَأَوْحَىٰ إِلَىٰ عَبْدِهِ مَا أَوْحَىٰ ۝ مَا كَذَبَ الْفُؤَادُ مَا رَأَىٰ﴾.",
      },
    },
    interactive: {
      discover: "الصلاة أول ما يُحاسب عليه العبد يوم القيامة.",
      value: { name: "عِظم الصلاة", icon: "🕌" },
      thinkQuestion:
        "لو كانت الصلاة هدية جاءت من فوق سبع سماوات، فكيف تستقبلها كل يوم؟",
      challenge: {
        type: "multiple_choice",
        question: "كم صلاة فُرضت أول الأمر؟",
        options: ["خمس", "سبع عشرة", "خمسون", "مئة"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "سجادة صغيرة", description: "سجادة تذكّرك بأغلى هدية نزلت من السماء." },
      badge: "وسام: حافظ الصلاة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "فرض الصلاة ليلة المعراج ثابت في الصحيحين.",
    },
  },
  {
    storyId: "st-5-14",
    stationId: 5,
    slug: "musa-advice-reduction",
    en: {
      title: "Musa's Advice: Five in Deed, Fifty in Reward",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On the way back, Musa asked the Prophet (pbuh): what were you commanded? He said: fifty prayers. Musa said: your nation cannot bear that — go back to your Lord and ask Him to lighten it. The Prophet kept returning until they became five, and Allah said: they are five, and they are fifty; My word does not change.",
          shortLesson: "Allah's mercy on us is wider than we think.",
        },
        tier_2_age_9_11: {
          narrative:
            "On the way back the Prophet (pbuh) passed Musa, who asked him: “What were you commanded?” He said: “Fifty prayers every day.” Musa said, out of his long experience with his own people: “Your nation cannot manage that. Go back to your Lord and ask Him to lighten it for them.” The Prophet went back, and Allah lightened it; and he returned to Musa, who sent him back again, time after time, until they became five prayers. Then Allah said: “They are five, and they are fifty. My word does not change” — five in deed, fifty in reward.",
          details:
            "Allah says of His mercy: ﴿يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ﴾ — “Allah wishes to lighten your burden.”",
        },
      },
      interactive: {
        discover: "A good deed is counted tenfold, so five prayers carry the reward of fifty.",
        value: { name: "Advice and mercy", icon: "🤍" },
        thinkQuestion: "Who gave you advice that helped you? Did you thank them for it?",
        challenge: {
          type: "multiple_choice",
          question: "How many prayers were they after the lightening?",
          options: ["Three", "Five", "Ten", "Seventeen"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Small Scale", description: "A scale to remind you that the reward is wider than the deed." },
        badge: "Badge: Grateful for the Gift",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The Prophet returning to his Lord on Musa's advice is established in both Sahih collections.",
      },
    },
    title: "نصيحة موسى: خمسٌ في العمل وخمسون في الأجر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في طريق العودة سأل موسى عليه السلام النبي ﷺ: بم أُمرت؟ قال: بخمسين صلاة. فقال: إن أمتك لا تطيق ذلك، ارجع إلى ربك فاسأله التخفيف. فلم يزل النبي ﷺ يرجع حتى صارت خمساً، وقال الله: هي خمس وهي خمسون، لا يُبدَّل القول لديّ.",
        shortLesson: "رحمة الله بنا أوسع مما نظن.",
      },
      tier_2_age_9_11: {
        narrative:
          "في طريق العودة مرّ النبي ﷺ على موسى عليه السلام فسأله: «بم أُمرت؟» قال: «أُمرت بخمسين صلاة كل يوم». فقال موسى بخبرته الطويلة مع قومه: «إن أمتك لا تستطيع ذلك، فارجع إلى ربك فاسأله التخفيف لأمتك». فرجع النبي ﷺ فخفّف الله عنه، ثم عاد إلى موسى فأمره بالرجوع مرة بعد مرة، حتى صارت خمس صلوات. فقال الله تعالى: «هي خمسٌ وهي خمسون، لا يُبدَّل القول لديّ» — خمسٌ في العمل وخمسون في الأجر.",
        details:
          "قال تعالى في رحمته بنا: ﴿يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ ۚ وَخُلِقَ الْإِنسَانُ ضَعِيفًا﴾.",
      },
    },
    interactive: {
      discover: "الحسنة بعشر أمثالها، فخمس صلوات بأجر خمسين.",
      value: { name: "النصيحة والرحمة", icon: "🤍" },
      thinkQuestion:
        "مَن نصحك نصيحة نفعتك؟ وهل شكرته عليها؟",
      challenge: {
        type: "multiple_choice",
        question: "كم صارت الصلوات بعد التخفيف؟",
        options: ["ثلاث", "خمس", "عشر", "سبع عشرة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ميزان صغير", description: "ميزان يذكّرك أن الأجر أوسع من العمل." },
      badge: "وسام: شاكر النعمة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "مراجعة النبي ﷺ ربه بنصيحة موسى عليه السلام ثابتة في الصحيحين.",
    },
  },
  {
    storyId: "st-5-15",
    stationId: 5,
    slug: "morning-of-certainty",
    en: {
      title: "The Morning of Certainty, and the Name as-Siddiq",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the morning the Prophet (pbuh) told Quraysh of his journey, and they mocked him: we travel to Jerusalem in a month, and you go and return in one night? They asked him to describe the mosque, and Allah showed it to him, and he described it exactly. They went to Abu Bakr to shake him, and he said: if he said it, he has told the truth. And so he was named as-Siddiq.",
          shortLesson: "A true friend stands with you when others doubt.",
        },
        tier_2_age_9_11: {
          narrative:
            "When morning came, the Prophet (pbuh) sat telling Quraysh what had happened in his night, and the idol-worshippers mocked him: “We travel to Jerusalem in a month, and you go and come back in a single night?” They wanted to test him, so they asked him to describe al-Aqsa Mosque. Allah brought it before his sight, and he began describing it to them door by door, until they could not answer him a word — and still they refused. Then they went to Abu Bakr to shake his trust in his friend, and he said: “If he said it, he has told the truth. I believe him about what is further than that: I believe him about news from the heavens.” From that day he was called as-Siddiq — the one who affirms the truth.",
          details:
            "Allah says of the truthful: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ﴾.",
        },
      },
      interactive: {
        discover: "Surah Al-Isra is named after this journey.",
        value: { name: "Truthfulness and friendship", icon: "🌅" },
        thinkQuestion: "Who is the friend you trust to believe you when no one else does? Are you that friend to someone?",
        challenge: {
          type: "multiple_choice",
          question: "What was Abu Bakr called after that night?",
          options: ["Al-Farooq", "As-Siddiq", "Al-Amin", "Dhun-Nurayn"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Small Dawn", description: "A keepsake for the morning that separated those who believed from those who would not." },
        badge: "Badge: A Friend of Truth",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah, and Sahih al-Bukhari",
        note: "The Prophet describing al-Aqsa is in Bukhari; Abu Bakr being named as-Siddiq is in the Seerah literature.",
      },
    },
    title: "صباح اليقين ولقب الصدّيق",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في الصباح أخبر النبي ﷺ قريشاً برحلته، فسخروا وقالوا: نسير إلى بيت المقدس شهراً وتذهب وترجع في ليلة؟ فسألوه أن يصف لهم المسجد، فجلّاه الله له فوصفه لهم وصفاً دقيقاً. وذهبوا إلى أبي بكر يشكّكونه، فقال: إن كان قال ذلك فقد صدق. فسُمّي الصدّيق.",
        shortLesson: "الصديق الحق يقف معك حين يشكّ الناس.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما أصبح الصباح جلس النبي ﷺ يخبر قريشاً بما كان في ليلته، فسخر منه المشركون وقالوا: «نحن نضرب إلى بيت المقدس شهراً، وأنت تذهب وترجع في ليلة؟». وأرادوا أن يمتحنوه فسألوه أن يصف لهم المسجد الأقصى، فجلّاه الله لبصره فجعل يصفه لهم باباً باباً، فما استطاعوا أن يردّوا عليه شيئاً، ومع ذلك عاندوا. ثم انطلقوا إلى أبي بكر رضي الله عنه يشكّكونه في صاحبه، فقال كلمته: «إن كان قال ذلك فقد صدق، إني لأصدّقه فيما هو أبعد من ذلك: أصدّقه في خبر السماء». فسُمّي من يومئذ الصدّيق.",
        details:
          "قال تعالى في أهل الصدق: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ﴾.",
      },
    },
    interactive: {
      discover: "سورة الإسراء نزلت في هذه الرحلة، وبها سُمّيت.",
      value: { name: "الصدق والصحبة", icon: "🌅" },
      thinkQuestion:
        "مَن الصديق الذي تثق أنه سيصدّقك حين لا يصدّقك أحد؟ وهل أنت له مثل ذلك؟",
      challenge: {
        type: "multiple_choice",
        question: "بم لُقّب أبو بكر رضي الله عنه بعد هذه الليلة؟",
        options: ["الفاروق", "الصدّيق", "الأمين", "ذو النورين"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "فجر صغير", description: "تذكار لصباحٍ فرّق بين من صدّق ومن عاند." },
      badge: "وسام: صاحب صدق",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام، وصحيح البخاري",
      note: "وصف النبي ﷺ للمسجد الأقصى في البخاري، وخبر تلقيب أبي بكر بالصدّيق في كتب السيرة.",
    },
  },
  {
    storyId: "st-6-01",
    stationId: 6,
    slug: "dar-al-nadwa-dust",
    en: {
      title: "The Plot at Dar an-Nadwa and a Handful of Dust",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The chiefs of Quraysh met at Dar an-Nadwa to plan how to be rid of the Prophet (pbuh), and agreed to take a young man from every tribe to strike him together. They surrounded his house at night, waiting for him to come out. But Allah told His Prophet what they had planned and gave him leave to go, and he walked out from among them, and not one of them saw him.",
          shortLesson: "Allah's protection is stronger than any plan.",
        },
        tier_2_age_9_11: {
          narrative:
            "When Quraysh saw Islam spreading, their chiefs met at Dar an-Nadwa and debated: should they imprison him, drive him out, or kill him? They settled on what Abu Jahl proposed: take one young man from every tribe, so that they would strike him as one man and his blood would be spread among all the clans. They surrounded the Prophet's house at night, waiting. But Allah showed His Prophet their scheming and gave him leave to migrate. He walked out from among them reciting Surah Ya-Sin, and took a handful of dust and scattered it — and not one of them saw him until he had gone.",
          details:
            "Among what he recited: ﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾.",
        },
      },
      interactive: {
        discover: "A verse came down about this very plot: “And when those who disbelieved plotted against you” — Surah Al-Anfal.",
        value: { name: "Allah's protection", icon: "🛡️" },
        thinkQuestion: "When have you felt Allah protected you from something you could not see?",
        challenge: {
          type: "multiple_choice",
          question: "Where did the chiefs of Quraysh meet to make their plan?",
          options: ["At the Kaaba", "At Dar an-Nadwa", "At the market", "At Taif"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Handful of Dust", description: "Dust: the weakest means is enough when Allah wills it." },
        badge: "Badge: Under Allah's Protection",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, and Surah Al-Anfal",
        note: "The plot itself is established in the Quran in Surah Al-Anfal; the handful of dust and the recitation of Ya-Sin come from Ibn Ishaq without a full chain.",
      },
    },
    title: "مؤامرة دار الندوة وحفنة التراب",
    content: {
      tier_1_age_6_8: {
        narrative:
          "اجتمع زعماء قريش في دار الندوة يدبّرون كيف يتخلّصون من النبي ﷺ، فاتفقوا أن يأخذوا من كل قبيلة شاباً ليضربوه معاً. وأحاطوا ببيته ليلاً ينتظرون خروجه. لكن الله أطلع نبيه على ما دبّروا وأمره بالخروج، فخرج من بينهم ولم يبصره أحد منهم.",
        shortLesson: "حماية الله أقوى من كل خطة.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما رأت قريش الإسلام ينتشر اجتمع زعماؤها في دار الندوة يتشاورون: أيحبسونه أم يخرجونه أم يقتلونه؟ فاستقرّ رأيهم على ما أشار به أبو جهل: أن يأخذوا من كل قبيلة فتى شاباً، فيضربوه ضربة رجل واحد، حتى يتفرّق دمه في القبائل. فأحاطوا ببيت النبي ﷺ ليلاً ينتظرون خروجه. لكن الله أطلع نبيه على مكرهم وأذن له بالهجرة، فخرج من بينهم وهو يتلو من سورة يس، وأخذ حفنة من تراب فنثرها، فما أبصره أحد منهم حتى مضى.",
        details:
          "وممّا تلاه عليهم قوله تعالى: ﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾.",
      },
    },
    interactive: {
      discover: "نزلت في هذه المؤامرة آية: ﴿وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا﴾ في سورة الأنفال.",
      value: { name: "حفظ الله", icon: "🛡️" },
      thinkQuestion:
        "متى شعرت أن الله حماك من شيء لم تكن تراه؟",
      challenge: {
        type: "multiple_choice",
        question: "أين اجتمع زعماء قريش ليدبّروا أمرهم؟",
        options: ["في الكعبة", "في دار الندوة", "في السوق", "في الطائف"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حفنة تراب", description: "تراب يذكّرك أن أضعف الأسباب تكفي إذا أراد الله." },
      badge: "وسام: في حفظ الله",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، وسورة الأنفال",
      note: "أصل المؤامرة ثابت بالقرآن في سورة الأنفال؛ وتفصيل حفنة التراب وتلاوة يس جاء عند ابن إسحاق مرسلاً.",
    },
  },
  {
    storyId: "st-6-02",
    stationId: 6,
    slug: "hero-in-the-bed",
    en: {
      title: "The Hero in the Bed",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Before the Prophet (pbuh) left, he asked his young cousin Ali ibn Abi Talib to sleep in his bed and cover himself with his cloak, so that anyone looking in would think the Prophet was asleep. Ali did not hesitate. And the Prophet asked him to stay behind for a few days to return the deposits people had left with him — the very people plotting against him.",
          shortLesson: "A trust is returned even to someone who wrongs you.",
        },
        tier_2_age_9_11: {
          narrative:
            "Before the Prophet (pbuh) left his house, he asked his young cousin Ali ibn Abi Talib to sleep in his bed and cover himself with his green cloak, so that those watching at the door would think the Prophet was still asleep. Ali did not hesitate for a moment, knowing the danger. And that was not his only task: the Prophet asked him to remain in Mecca for some days to return the deposits to their owners — for the people of Mecca left their wealth with him because he was the truthful and trustworthy one, while at the same time plotting to kill him. When they broke into the house in the morning and found Ali, they were furious.",
          details:
            "Allah says of the one who gives himself: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ﴾.",
        },
      },
      interactive: {
        discover: "Ali was about twenty-three years old that night.",
        value: { name: "Trustworthiness and sacrifice", icon: "🌙" },
        thinkQuestion: "If someone you disagree with left something in your keeping, would you return it in full?",
        challenge: {
          type: "multiple_choice",
          question: "Why did Ali stay behind in Mecca after the Prophet (pbuh) left?",
          options: ["To fight Quraysh", "To return the deposits to their owners", "To sell the house", "To wait for Hajj"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Green Cloak", description: "A cloak: sometimes courage is lying down in someone else's place." },
        badge: "Badge: Keeper of Trusts",
      },
      source: {
        reliability: "🟢",
        reference: "Ibn Hisham's Seerah",
        note: "Ali sleeping in the bed and returning the deposits are well known in the Seerah literature.",
      },
    },
    title: "البطل النائم في الفراش",
    content: {
      tier_1_age_6_8: {
        narrative:
          "قبل أن يخرج النبي ﷺ طلب من ابن عمه الشاب علي بن أبي طالب أن ينام في فراشه ويتغطّى ببردته، حتى يظنّ من ينظر أن النبي نائم. فما تردّد علي رضي الله عنه. وطلب منه النبي ﷺ أن يبقى بعده أياماً ليردّ الأمانات إلى أصحابها — وهم أعداؤه الذين كانوا يأتمنونه.",
        shortLesson: "الأمانة تُردّ حتى لمن يؤذيك.",
      },
      tier_2_age_9_11: {
        narrative:
          "قبل أن يخرج النبي ﷺ من بيته طلب من ابن عمه الشاب علي بن أبي طالب رضي الله عنه أن ينام في فراشه ويتغطّى ببردته الخضراء، حتى يظنّ المتربّصون من الباب أن النبي ما زال نائماً. فلم يتردّد علي لحظة مع علمه بالخطر. ولم تكن هذه هي المهمة الوحيدة: طلب منه النبي ﷺ أن يبقى في مكة بعده أياماً ليردّ الودائع إلى أصحابها، فقد كان أهل مكة يودعون أموالهم عنده لأنه الصادق الأمين — وهم في الوقت نفسه يدبّرون لقتله. فلما اقتحموا البيت في الصباح وجدوا علياً فاغتاظوا.",
        details:
          "قال تعالى فيمن يبذل نفسه: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ ۗ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ﴾.",
      },
    },
    interactive: {
      discover: "كان عمر علي رضي الله عنه يومئذ نحو ثلاث وعشرين سنة.",
      value: { name: "الأمانة والتضحية", icon: "🌙" },
      thinkQuestion:
        "لو ائتمنك شخص تختلف معه على شيء، هل تردّه إليه كاملاً؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا بقي علي رضي الله عنه في مكة بعد خروج النبي ﷺ؟",
        options: ["ليقاتل قريشاً", "ليردّ الأمانات إلى أصحابها", "ليبيع البيت", "لينتظر الحج"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بُردة خضراء", description: "بُردة يذكّرك أن الشجاعة أحياناً أن تنام مكان غيرك." },
      badge: "وسام: أمين الودائع",
    },
    source: {
      reliability: "🟢",
      reference: "سيرة ابن هشام",
      note: "مبيت علي رضي الله عنه في الفراش وردّ الودائع مشهوران في كتب السيرة.",
    },
  },
  {
    storyId: "st-6-03",
    stationId: 6,
    slug: "tears-of-joy-companion",
    en: {
      title: "Tears of Joy: “May I Accompany You?”",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the fierce heat of midday the Prophet (pbuh) came to Abu Bakr's house and told him Allah had given him leave to migrate. Abu Bakr said: “May I accompany you, Messenger of Allah?” He said: “Yes.” And Abu Bakr wept for joy. Aisha said: I never thought anyone could weep from joy until I saw my father weep that day.",
          shortLesson: "A true friend is glad to share your hardship.",
        },
        tier_2_age_9_11: {
          narrative:
            "At midday, the hour when no one goes out for the heat, the Prophet (pbuh) came quietly to Abu Bakr's house and told him that Allah had given him leave to depart. Abu Bakr, his eagerness ahead of his words, asked: “May I accompany you, Messenger of Allah?” He said: “Yes.” And Abu Bakr wept for sheer joy. His daughter Aisha said: “By Allah, I never thought anyone could weep from joy until I saw Abu Bakr weep that day.” He had already prepared two mounts and been feeding them for months, ready for this day.",
          details:
            "Allah says of this companionship: ﴿ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾.",
        },
      },
      interactive: {
        discover: "Abu Bakr is the only companion described in the Quran as “his companion”.",
        value: { name: "True companionship", icon: "😢" },
        thinkQuestion: "Who is the friend you would be glad to work hard alongside? Have you told them?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet (pbuh) answer when Abu Bakr asked to come with him?",
          options: ["Wait a while", "Yes — companionship", "Stay in Mecca", "Take the mount"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A Camel's Rein", description: "A rein for the man who fed his mounts for months, waiting for one day." },
        badge: "Badge: Companion of the Cave",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The hijrah hadith and Abu Bakr weeping for joy are established in Sahih al-Bukhari, from Aisha.",
      },
    },
    title: "دموع الفرح: الصُّحبة يا رسول الله",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في شدة حرّ الظهيرة جاء النبي ﷺ إلى بيت أبي بكر رضي الله عنه فأخبره أن الله أذن له بالهجرة. فقال أبو بكر: «الصُّحبة يا رسول الله؟» قال: «الصُّحبة». فبكى أبو بكر من الفرح. تقول عائشة رضي الله عنها: ما كنت أظن أن أحداً يبكي من الفرح حتى رأيت أبي يبكي يومئذ.",
        shortLesson: "الصديق الحق يفرح أن يشقى معك.",
      },
      tier_2_age_9_11: {
        narrative:
          "في وقت الظهيرة، وهي ساعة لا يخرج فيها أحد من شدة الحرّ، جاء النبي ﷺ متخفّياً إلى بيت أبي بكر رضي الله عنه فأخبره أن الله قد أذن له في الخروج. فقال أبو بكر ولهفته تسبق كلامه: «الصُّحبة يا رسول الله؟» قال: «الصُّحبة». فبكى أبو بكر رضي الله عنه من شدة الفرح. تقول ابنته عائشة رضي الله عنها: «والله ما كنت أظن أن أحداً يبكي من الفرح حتى رأيت أبا بكر يبكي يومئذ». وكان قد أعدّ راحلتين وعلفهما أشهراً استعداداً لهذا اليوم.",
        details:
          "قال تعالى في هذه الصحبة: ﴿ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾.",
      },
    },
    interactive: {
      discover: "أبو بكر رضي الله عنه هو الصحابي الوحيد الذي ذُكر في القرآن بوصف «صاحبه».",
      value: { name: "الصحبة الصادقة", icon: "😢" },
      thinkQuestion:
        "مَن الصديق الذي تفرح أن تتعب معه؟ وهل قلت له ذلك؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ أجاب النبي ﷺ أبا بكر حين سأله الصحبة؟",
        options: ["انتظر قليلاً", "الصُّحبة", "ابقَ في مكة", "خذ الراحلة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "زمام راحلة", description: "زمام يذكّرك بمن جهّز راحلته أشهراً انتظاراً ليوم واحد." },
      badge: "وسام: صاحب الغار",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "حديث الهجرة وبكاء أبي بكر من الفرح ثابت في صحيح البخاري عن عائشة رضي الله عنها.",
    },
  },
  {
    storyId: "st-6-04",
    stationId: 6,
    slug: "asma-that-al-nitaqayn",
    en: {
      title: "Asma, She of the Two Belts",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When they packed the provisions they had nothing to tie them with, so Asma bint Abi Bakr took her belt, tore it in two, tied the food with one half and her clothes with the other. The Prophet (pbuh) prayed that Allah give her two belts in Paradise, and she was called “She of the Two Belts”.",
          shortLesson: "Sometimes the clever answer is already in your hands.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet (pbuh) and Abu Bakr had packed their provisions, they had nothing to tie the food bag and the waterskin with. So Asma bint Abi Bakr untied her nitaq — the belt she fastened her clothes with — and tore it in two: with one half she tied the provisions, and with the other she fastened her clothes. The Prophet (pbuh) prayed for her: may Allah give you two belts in their place in Paradise. From that day she was called “She of the Two Belts”. And when Abu Jahl came asking about her father, she held firm and told him nothing.",
          details:
            "Allah says: ﴿وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ﴾ — “the believing men and women are allies of one another.”",
        },
      },
      interactive: {
        discover: "Asma was the sister of Aisha, and the daughter of Abu Bakr as-Siddiq.",
        value: { name: "Quick thinking", icon: "🎀" },
        thinkQuestion: "Think of a small problem you met today: what answer was in your hands and you did not notice?",
        challenge: {
          type: "multiple_choice",
          question: "Why was Asma called “She of the Two Belts”?",
          options: ["She wore two dresses", "She tore her belt in two, and the Prophet prayed for two in Paradise", "She lived between two mountains", "She migrated twice"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "Half a Belt", description: "Half a belt that solved a problem on a journey that changed history." },
        badge: "Badge: She of the Two Belts",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "Asma's belt is established in Sahih al-Bukhari; Abu Jahl striking her is in the Seerah literature.",
      },
    },
    title: "أسماء ذات النِّطاقين",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لما جهّزوا الزاد لم يجدوا ما يربطونه به، فقامت أسماء بنت أبي بكر رضي الله عنهما فشقّت نطاقها — أي حزامها — نصفين: ربطت بنصفه الزاد، وشدّت بالآخر ثيابها. فدعا لها النبي ﷺ بنطاقين في الجنة، فسُمّيت ذات النِّطاقين.",
        shortLesson: "الحل الذكي أحياناً في يدك أنت.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما جهّز النبي ﷺ وأبو بكر زادهما للسفر لم يجدا ما يربطان به السُّفرة وسقاء الماء. فقامت أسماء بنت أبي بكر رضي الله عنهما ففكّت نطاقها — وهو حزام تشدّ به ثيابها — وشقّته نصفين: ربطت بنصفٍ الزاد، وشدّت بالنصف الآخر ثيابها. فقال لها النبي ﷺ داعياً: أبدلك الله بهما نطاقين في الجنة، فسُمّيت من يومها «ذات النِّطاقين». ولما جاء أبو جهل يسأل عن أبيها ثبتت ولم تدلّه على شيء.",
        details:
          "قال تعالى: ﴿وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ﴾.",
      },
    },
    interactive: {
      discover: "أسماء رضي الله عنها هي أخت عائشة أم المؤمنين، وابنة أبي بكر الصديق.",
      value: { name: "سرعة البديهة", icon: "🎀" },
      thinkQuestion:
        "مشكلة صغيرة واجهتك اليوم: ما الحل الذي كان بين يديك ولم تنتبه له؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا سُمّيت أسماء رضي الله عنها «ذات النِّطاقين»؟",
        options: ["لأنها لبست ثوبين", "لأنها شقّت نطاقها نصفين فدعا لها النبي ﷺ بنطاقين في الجنة", "لأنها سكنت بين جبلين", "لأنها هاجرت مرتين"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "نصف نِطاق", description: "نصف حزام حلّ مشكلة رحلة غيّرت التاريخ." },
      badge: "وسام: ذات النطاقين",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "خبر نطاق أسماء رضي الله عنها ثابت في صحيح البخاري؛ وخبر لطمة أبي جهل في كتب السيرة.",
    },
  },
  {
    storyId: "st-6-05",
    stationId: 6,
    slug: "smart-shepherd-footprints",
    en: {
      title: "The Shepherd Who Erased the Tracks",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The people of Mecca were skilled at reading tracks in the sand. So Abu Bakr arranged for his shepherd, Amir ibn Fuhayra, to drive the flock behind them, so the sheep walked over their footprints and wiped them away. The trail vanished, and no one could find their road.",
          shortLesson: "Trusting Allah does not mean neglecting the means.",
        },
        tier_2_age_9_11: {
          narrative:
            "Among Quraysh were men who could read footprints in the sand with real precision, so the trail was a genuine danger. Abu Bakr arranged something careful: he told his shepherd Amir ibn Fuhayra to drive the flock along behind them, so that the sheep walked over their footprints as they grazed and blotted them out. Amir also brought them the sheep's milk at the cave. By this arrangement the trail was lost in the desert, and no one found them.",
          details:
            "Allah says of preparing means: ﴿وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ﴾ — “prepare for them whatever you are able.”",
        },
      },
      interactive: {
        discover: "Amir ibn Fuhayra was Abu Bakr's freed servant, and among the earliest to accept Islam.",
        value: { name: "Planning alongside trust", icon: "🐑" },
        thinkQuestion: "Before something hard: what practical step could you take instead of waiting?",
        challenge: {
          type: "multiple_choice",
          question: "How were the footprints of the Prophet (pbuh) and his companion erased?",
          options: ["By rain", "By wind", "By Amir ibn Fuhayra's sheep walking behind them", "By a leather cover"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A Sheep's Bell", description: "A small bell: a clever plan is itself an act of worship." },
        badge: "Badge: Careful Planning",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, and Ibn Hisham's Seerah",
        note: "Amir ibn Fuhayra bringing the sheep to the cave is in Sahih al-Bukhari; the detail of the flock covering the tracks is in the Seerah literature.",
      },
    },
    title: "الراعي الذي محا الآثار",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان أهل مكة بارعين في تتبّع الآثار على الرمل. فدبّر أبو بكر رضي الله عنه أن يسير راعيه عامر بن فُهَيرة بالغنم خلفهما، فتمشي الغنم على آثار أقدامهما فتمحوها. فضاع الأثر ولم يعرف أحد طريقهما.",
        shortLesson: "التوكّل لا يعني ترك الأخذ بالأسباب.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان في قريش من يعرف قراءة آثار الأقدام على الرمل معرفة دقيقة، فكان الأثر خطراً حقيقياً. فدبّر أبو بكر رضي الله عنه أمراً محكماً: أمر راعيه عامر بن فُهَيرة رضي الله عنه أن يسوق الغنم في إثرهما، فتمشي الغنم على مواضع أقدامهما وترعى، فتطمس الأثر طمساً. وكان عامر يأتيهما بلبن الغنم في الغار. وبهذا التدبير ضاع الأثر في الصحراء فلم يهتدِ إليهما أحد.",
        details:
          "قال تعالى في الأخذ بالأسباب: ﴿وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ﴾.",
      },
    },
    interactive: {
      discover: "عامر بن فُهَيرة رضي الله عنه كان مولى لأبي بكر، وهو من السابقين إلى الإسلام.",
      value: { name: "التخطيط مع التوكل", icon: "🐑" },
      thinkQuestion:
        "قبل أي شيء صعب: ما الخطوة العملية التي تستطيع أن تعملها بدل الانتظار؟",
      challenge: {
        type: "multiple_choice",
        question: "كيف مُحيت آثار أقدام النبي ﷺ وصاحبه؟",
        options: ["بالمطر", "بالريح", "بغنم عامر بن فهيرة تمشي خلفهما", "بغطاء من جلد"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "جرس غنم", description: "جرس صغير يذكّرك أن الخطة الذكية عبادة." },
      badge: "وسام: حسن التدبير",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، وسيرة ابن هشام",
      note: "مجيء عامر بن فهيرة بالغنم إلى الغار في صحيح البخاري، وتفصيل تعمية الأثر بالغنم في كتب السيرة.",
    },
  },
  {
    storyId: "st-7-01",
    stationId: 7,
    slug: "permission-to-defend",
    en: {
      title: "Why Did the Muslims Defend Themselves?",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Muslims bore thirteen years of harm in Mecca without striking back, because the Prophet ﷺ told them to be patient. When they migrated to Madinah and built their homes, Quraysh kept threatening to attack them. Only then did Allah permit them to defend themselves and their families. Islam does not begin an attack — and it does not leave its people wronged with no protection.",
          shortLesson: "Strength is for protecting homes, not for starting an attack.",
        },
        tier_2_age_9_11: {
          narrative:
            "For thirteen years in Mecca the Muslims bore severe harm — torture, and the seizing of their homes and wealth — and not one of them raised a sword, because the Prophet ﷺ told them to be patient and to hold back. Then they migrated to Madinah and built a community that was safe, and still Quraysh sent threats and promised to attack them. At that point — and only then — permission came down to defend themselves, their families and their new home. Islam is a religion of peace that does not begin an attack, but it does not leave its own to be wronged without protection.",
          details:
            "Allah says why the permission came: ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا﴾ — “Permission is given to those who are fought, because they were wronged.”",
        },
      },
      interactive: {
        discover: "This was the first verse permitting fighting, after thirteen years of patience.",
        value: { name: "Peace first, defence as the exception", icon: "🕊️" },
        thinkQuestion: "Why do you think the Muslims waited all those years before they were permitted to defend themselves?",
        challenge: {
          type: "multiple_choice",
          question: "When were the Muslims permitted to defend themselves?",
          options: ["At the start of the call in Mecca", "After the migration, when they were wronged and threatened", "Before the prophethood", "They were never permitted"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An olive branch", description: "A branch to remind you that peace comes first." },
        badge: "Guardian of Home",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah Al-Hajj: 39",
        note: "The verse states plainly that the permission came because of the wrong done to them.",
      },
    },
    title: "لماذا دافع المسلمون عن أنفسهم؟",
    content: {
      tier_1_age_6_8: {
        narrative:
          "صبر المسلمون في مكة ثلاث عشرة سنة على الأذى ولم يردّوا، لأن النبي ﷺ كان يأمرهم بالصبر. ولما هاجروا إلى المدينة وبنوا بيوتهم، ظلّت قريش تهدّد بالهجوم عليهم. عند ذلك أذن الله لهم أن يدافعوا عن أنفسهم وأهلهم، فالإسلام لا يبدأ بالاعتداء، ولا يرضى أن يُظلم أهله بلا حماية.",
        shortLesson: "القوة تُحمى بها البيوت، ولا يُبدأ بها اعتداء.",
      },
      tier_2_age_9_11: {
        narrative:
          "صبر المسلمون في مكة ثلاث عشرة سنة على أذى شديد: التعذيب، ومصادرة البيوت والأموال، ولم يرفع أحد منهم سيفاً، لأن النبي ﷺ كان يأمرهم بالصبر والكفّ. فلما هاجروا إلى المدينة وأقاموا مجتمعهم الآمن، ظلّت قريش ترسل التهديد وتتوعّد بالهجوم عليهم. عند ذلك — وعند ذلك فقط — نزل الإذن بالدفاع عن النفس والأهل والوطن. فالإسلام دين سلام لا يبدأ بالعدوان، لكنه لا يترك أهله يُظلمون بلا حماية.",
        details:
          "قال تعالى مبيّناً سبب الإذن: ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ﴾.",
      },
    },
    interactive: {
      discover: "هذه أول آية نزلت في الإذن بالقتال، بعد ثلاث عشرة سنة من الصبر.",
      value: { name: "السلام أصل والدفاع استثناء", icon: "🕊️" },
      thinkQuestion:
        "لماذا في رأيكم صبر المسلمون كل هذه السنين قبل أن يُؤذن لهم بالدفاع؟",
      challenge: {
        type: "multiple_choice",
        question: "متى أُذن للمسلمين بالدفاع عن أنفسهم؟",
        options: ["في أول الدعوة بمكة", "بعد الهجرة، حين ظُلموا وهُدِّدوا", "قبل البعثة", "لم يُؤذن لهم أبداً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "غصن زيتون", description: "غصن يذكّرك أن السلام هو الأصل." },
      badge: "حامي الديار",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة الحج: ٣٩",
      note: "الآية نصّ في أن الإذن جاء بسبب الظلم الواقع عليهم.",
    },
  },
  {
    storyId: "st-7-02",
    stationId: 7,
    slug: "badr-shura-counsel",
    en: {
      title: "The Well of Badr and the Strength of Counsel",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Muslims set out three hundred and thirteen men, and found before them an army of nearly a thousand. The Prophet ﷺ gathered his companions and asked their view, forcing no one. When they camped at the wells of Badr, al-Hubab ibn al-Mundhir asked him: is this a place Allah told you to take, or is it judgement and strategy? He said: it is judgement. So al-Hubab advised camping at the well nearest the enemy — and the Prophet ﷺ took his advice.",
          shortLesson: "A strong leader accepts the right idea from someone younger than him.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Muslims set out three hundred and thirteen men, and Quraysh had readied an army of nearly a thousand. The Prophet ﷺ gathered his companions and forced no one, but said: “Advise me, people.” The Muhajirun and the Ansar stood and declared they were with him. When the army camped at the wells of Badr, al-Hubab ibn al-Mundhir asked: “Is this a position Allah placed you in, which we may not go beyond, or is it judgement, war and strategy?” He said: “It is judgement, war and strategy.” So al-Hubab advised moving to the water nearest the enemy and keeping the water behind them — and the Prophet ﷺ accepted his view and acted on it.",
          details:
            "Allah describes the believers: ﴿وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ﴾ — “and their affair is by consultation among them.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ separated what came by revelation from what was his own judgement, and took counsel on the second.",
        value: { name: "Consultation", icon: "🤝" },
        thinkQuestion: "When did you last change your mind because someone had a better idea?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ do with al-Hubab's advice?",
          options: ["Refused it", "Took it and acted on it", "Delayed it", "Was angry at it"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A water pail", description: "A pail to remind you that a right idea is taken from whoever brings it." },
        badge: "One Who Counsels",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah",
        note: "Al-Hubab's counsel is well known in the Seerah, reported by Ibn Ishaq without a full chain; consultation itself is established in the Quran.",
      },
    },
    title: "بئر بدر وقوة الشورى",
    content: {
      tier_1_age_6_8: {
        narrative:
          "خرج المسلمون ثلاثمائة وثلاثة عشر رجلاً، فوجدوا أمامهم جيشاً يقارب الألف. فجمع النبي ﷺ أصحابه واستشارهم ولم يجبر أحداً. ولما نزلوا عند آبار بدر، قال له الحُباب بن المنذر: أهذا منزل أنزلكه الله أم هو الرأي والحرب؟ فقال: بل هو الرأي. فأشار عليه أن ينزلوا عند أقرب بئر إلى العدو، فأخذ النبي ﷺ برأيه.",
        shortLesson: "القائد القويّ يسمع الرأي الصواب ممن هو أصغر منه.",
      },
      tier_2_age_9_11: {
        narrative:
          "خرج المسلمون في ثلاثمائة وثلاثة عشر رجلاً، فإذا قريش قد جهّزت جيشاً يقارب الألف مقاتل. فجمع النبي ﷺ أصحابه ولم يُجبر أحداً، بل قال: «أشيروا عليّ أيها الناس». فقام المهاجرون والأنصار يعلنون وقوفهم معه. ولما نزل الجيش عند آبار بدر، سأله الحُباب بن المنذر رضي الله عنه: أهذا منزلٌ أنزلكه الله فليس لنا أن نتقدّمه، أم هو الرأي والحرب والمكيدة؟ قال: «بل هو الرأي والحرب والمكيدة». فأشار عليه أن ينزلوا عند أقرب ماء إلى العدو ويجعلوا الماء خلفهم. فقبل النبي ﷺ رأيه ونفّذه.",
        details:
          "قال تعالى في وصف المؤمنين: ﴿وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ﴾.",
      },
    },
    interactive: {
      discover: "النبي ﷺ فرّق بين ما جاء به الوحي وما هو رأي واجتهاد، فقبل المشورة في الثاني.",
      value: { name: "الشورى", icon: "🤝" },
      thinkQuestion:
        "متى كانت آخر مرة غيّرت رأيك لأن أحداً أتى برأي أفضل؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل النبي ﷺ برأي الحُباب بن المنذر؟",
        options: ["رفضه", "أخذ به ونفّذه", "أجّله", "غضب منه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "دلو ماء", description: "دلو يذكّرك أن الرأي الصواب يُقبل ممن جاء به." },
      badge: "صاحب مشورة",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام",
      note: "مشورة الحُباب بن المنذر مشهورة في كتب السيرة، ورواها ابن إسحاق مرسلاً؛ أما أصل الشورى فثابت بالقرآن.",
    },
  },
  {
    storyId: "st-7-03",
    stationId: 7,
    slug: "angels-in-badr",
    en: {
      title: "Badr and the Soldiers of the Sky",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On the seventeenth of Ramadan the two armies met at Badr. The Prophet ﷺ stood praying to his Lord with his hands raised until his cloak fell from his shoulders, asking victory for this small group. Allah answered him and sent the angels to support them, and the Muslims won despite their small number. That day was called the Day of the Criterion.",
          shortLesson: "Numbers are not everything; sincerity with Allah comes first.",
        },
        tier_2_age_9_11: {
          narrative:
            "The two armies met on the seventeenth of Ramadan in the second year after the migration. The Prophet ﷺ stood in his shelter with his hands raised, pressing his Lord in prayer until his cloak slipped from his shoulders, asking Allah to give victory to this small band. Allah answered him and supported the Muslims with angels, steadying their feet and settling their hearts. They won despite how few they were and how little they had, and the day was called the Day of the Criterion, because on it Allah separated truth from falsehood.",
          details:
            "Allah says: ﴿وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ﴾ — “Allah gave you victory at Badr while you were few.”",
        },
      },
      interactive: {
        discover: "Badr was named after the well that stood there, and became the name of a great day in history.",
        value: { name: "Trust, alongside the means", icon: "⭐" },
        thinkQuestion: "They prepared and they prayed. Why are both needed?",
        challenge: {
          type: "multiple_choice",
          question: "What was the day of Badr called in the Quran?",
          options: ["The Day of the Conquest", "The Day of the Criterion", "The Day of Hunayn", "The Day of the Elephant"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A dawn star", description: "A star for the night a prophet prayed until his cloak fell." },
        badge: "Of the People of Badr",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah Aal-Imran: 123, and Sahih Muslim",
        note: "The victory at Badr and the support of angels are in the Quran; the Prophet praying until his cloak fell is in Sahih Muslim.",
      },
    },
    title: "بدر وجنود السماء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السابع عشر من رمضان التقى الجيشان ببدر. وقف النبي ﷺ يدعو ربه ويرفع يديه حتى سقط رداؤه، يسأله النصر لهذه القلّة. فاستجاب الله وأمدّهم بالملائكة، وانتصر المسلمون على قلّتهم، وسُمّي ذلك اليوم يوم الفرقان.",
        shortLesson: "العدد ليس كل شيء؛ الصدق مع الله أوّل الأسباب.",
      },
      tier_2_age_9_11: {
        narrative:
          "التقى الجيشان في السابع عشر من رمضان في السنة الثانية للهجرة. ووقف النبي ﷺ في العريش يرفع يديه إلى ربه ويلحّ في الدعاء حتى سقط رداؤه عن منكبيه، يسأل الله أن ينصر هذه العصابة من أهل الإسلام. فاستجاب الله لدعائه وأمدّ المسلمين بالملائكة تثبّت أقدامهم وتربط على قلوبهم. فانتصر المسلمون على قلّة عددهم وعتادهم، وسُمّي ذلك اليوم «يوم الفرقان» لأن الله فرّق فيه بين الحق والباطل.",
        details:
          "قال تعالى: ﴿وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ﴾.",
      },
    },
    interactive: {
      discover: "سُمّيت بدر باسم البئر التي كانت هناك، وصارت اسماً ليوم عظيم في التاريخ.",
      value: { name: "التوكل مع الأخذ بالأسباب", icon: "⭐" },
      thinkQuestion:
        "أخذوا بالأسباب ودعوا الله معاً — لماذا الاثنان مطلوبان؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ سُمّي يوم بدر في القرآن؟",
        options: ["يوم الفتح", "يوم الفرقان", "يوم الحنين", "يوم الفيل"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "نجمة فجر", description: "نجمة تذكّرك بليلة دعا فيها نبيّ حتى سقط رداؤه." },
      badge: "من أهل بدر",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة آل عمران: ١٢٣، وصحيح مسلم",
      note: "النصر ببدر وإمداد الملائكة ثابت في القرآن، ودعاء النبي ﷺ حتى سقط رداؤه في صحيح مسلم.",
    },
  },
  {
    storyId: "st-7-04",
    stationId: 7,
    slug: "mercy-to-captives",
    en: {
      title: "The Captives of Badr, Who Taught the Children",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After Badr the captives came to Madinah, and the Prophet ﷺ told his companions to treat them well — so the companions gave them the bread and ate dates themselves. When the time came to free them, the Prophet ﷺ set the ransom of a captive who could read and write, but had no money, at teaching ten Muslim children to read and write.",
          shortLesson: "Knowledge can free a captive, and mercy comes before revenge.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the battle ended, the captives were brought into Madinah, and the Prophet ﷺ instructed his companions: “Treat the captives well.” So the companions would give them the bread and eat dates themselves, out of honour for them. When the time came to release them, those with money paid a ransom; and a captive who could read and write but had no money was ransomed by teaching ten Muslim children to read and write — and then he went free. The point was never revenge: captivity itself became a door to spreading learning.",
          details:
            "Allah praises kindness to a captive: ﴿وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾.",
        },
      },
      interactive: {
        discover: "Few in Mecca could write, which is why teaching writing was worth as much as a ransom in money.",
        value: { name: "Mercy, and the worth of learning", icon: "✍️" },
        thinkQuestion: "Why do you think teaching was made a ransom equal to money?",
        challenge: {
          type: "multiple_choice",
          question: "How was a captive who could write, but had no money, ransomed?",
          options: ["By farming work", "By teaching ten children to read and write", "By staying a captive", "By leaving the peninsula"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A tablet and pen", description: "A tablet for a captive who won his freedom by teaching." },
        badge: "Spreader of Learning",
      },
      source: {
        reliability: "🟡",
        reference: "Musnad Ahmad, and Ibn Hisham's Seerah",
        note: "The ransom-by-teaching is reported in Musnad Ahmad and Ibn Sa'd, and scholars have discussed its chain; kindness to captives is established in the Quran.",
      },
    },
    title: "أسرى بدر ومعلّمو الصبيان",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد بدر جاء الأسرى إلى المدينة، فأوصى النبي ﷺ أصحابه بهم خيراً، فكان الصحابة يطعمونهم الخبز ويأكلون هم التمر. ولما جاء وقت الإطلاق، جعل النبي ﷺ فداء من يعرف القراءة والكتابة ولا مال له أن يعلّم عشرة من صبيان المسلمين.",
        shortLesson: "العلم يفكّ الأسير، والرحمة تسبق الانتقام.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد انتهاء المعركة دخل الأسرى المدينة، فأوصى النبي ﷺ أصحابه: «استوصوا بالأسرى خيراً». فكان الصحابة يقدّمون لهم الخبز ويأكلون هم التمر إكراماً لهم. ولما جاء وقت إطلاق سراحهم، جعل النبي ﷺ على من يملك المال فداءً يدفعه، وأما من كان يحسن القراءة والكتابة ولا مال عنده، فكان فداؤه أن يعلّم عشرة من صبيان المسلمين القراءة والكتابة، فإذا فعل صار حرّاً. لم يكن المقصود انتقاماً، بل صار الأسر نفسه باباً لنشر العلم.",
        details:
          "قال تعالى في الإحسان إلى الأسير: ﴿وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾.",
      },
    },
    interactive: {
      discover: "كان في مكة قليل ممن يكتب، فصار تعليم الكتابة فداءً يعادل المال.",
      value: { name: "الرحمة وقيمة العلم", icon: "✍️" },
      thinkQuestion:
        "لماذا في رأيكم جُعل التعليم فداءً يعدل المال؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ كان يُفتدى الأسير الذي يحسن الكتابة ولا مال له؟",
        options: ["بالعمل في الزراعة", "بتعليم عشرة من الصبيان القراءة والكتابة", "بالبقاء أسيراً", "بالخروج من الجزيرة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "لوح وقلم", description: "لوح يذكّرك بأسير نال حريته بأن علّم غيره." },
      badge: "ناشر العلم",
    },
    source: {
      reliability: "🟡",
      reference: "مسند أحمد، وسيرة ابن هشام",
      note: "خبر الفداء بالتعليم مرويّ في مسند أحمد وطبقات ابن سعد، وتكلّم أهل العلم في إسناده؛ والإحسان إلى الأسرى ثابت بالقرآن.",
    },
  },
  {
    storyId: "st-7-05",
    stationId: 7,
    slug: "mount-of-archers-uhud",
    en: {
      title: "The Archers' Hill and the Order",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh came to Uhud with three thousand fighters. The Prophet ﷺ placed fifty archers on a hill to guard the army's back, and told them: do not leave your place, whether you see us winning or losing. At the start of the battle the Muslims advanced and the idolaters fell back, and victory was close.",
          shortLesson: "An order is carried out to the end, not to the first success.",
        },
        tier_2_age_9_11: {
          narrative:
            "Quraysh gathered three thousand fighters and came to Madinah seeking revenge for Badr. The Muslims went out to meet them at Mount Uhud, and the Prophet ﷺ set a plan to guard the army's back: fifty skilled archers on a hill, under Abdullah ibn Jubayr, and he pressed the order on them: “If you see us being snatched away by birds, do not leave this place until I send for you; and if you see us defeating them and trampling them, do not leave until I send for you.” At the start of the battle the Muslims advanced and the idolaters broke, and victory was close.",
          details:
            "Allah says: ﴿أَطِيعُوا اللَّهَ وَرَسُولَهُ وَلَا تَوَلَّوْا عَنْهُ وَأَنتُمْ تَسْمَعُونَ﴾ — “Obey Allah and His Messenger, and do not turn away while you hear.”",
        },
      },
      interactive: {
        discover: "Abdullah ibn Jubayr, who led the archers, held his place with the few who stayed.",
        value: { name: "Discipline", icon: "🏹" },
        thinkQuestion: "Which task do you tend to leave before it is finished? What happens because of it?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ order the archers?",
          options: ["To come down at victory", "Not to leave their place until he sent for them", "To collect the spoils", "To join the army"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An arrow from Uhud", description: "An arrow to remind you to finish what you were given." },
        badge: "Holding the Position",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The Prophet's order to the archers at Uhud is established in Sahih al-Bukhari.",
      },
    },
    title: "جبل الرماة والوصية",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاءت قريش بثلاثة آلاف مقاتل إلى أُحد. فوضع النبي ﷺ خمسين رامياً على تلّة تحمي ظهر الجيش، وقال لهم: لا تبرحوا مكانكم، إن رأيتمونا ننتصر أو نُهزم. وفي أول المعركة تقدّم المسلمون وتراجع المشركون، وكان النصر قريباً.",
        shortLesson: "الأمر يُنفَّذ إلى آخره، لا إلى أول نجاح.",
      },
      tier_2_age_9_11: {
        narrative:
          "جمعت قريش ثلاثة آلاف مقاتل وجاءت إلى المدينة تطلب الثأر بعد بدر. فخرج المسلمون إليهم عند جبل أُحد، ووضع النبي ﷺ خطة تحمي ظهر الجيش: خمسون رامياً ماهراً على تلّة، أمّر عليهم عبد الله بن جبير، وشدّد عليهم فقال: «إن رأيتمونا تخطفنا الطير فلا تبرحوا مكانكم هذا حتى أرسل إليكم، وإن رأيتمونا هزمنا القوم ووطئناهم فلا تبرحوا حتى أرسل إليكم». وفي أول المعركة تقدّم المسلمون وانكشف المشركون، وكان النصر قريباً.",
        details:
          "قال تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَرَسُولَهُ وَلَا تَوَلَّوْا عَنْهُ وَأَنتُمْ تَسْمَعُونَ﴾.",
      },
    },
    interactive: {
      discover: "أمير الرماة عبد الله بن جبير ثبت في مكانه ومعه قليل، ولم يتركوا الموقع.",
      value: { name: "الانضباط", icon: "🏹" },
      thinkQuestion:
        "ما المهمة التي تتركها عادةً قبل أن تكتمل؟ وماذا يحدث بسبب ذلك؟",
      challenge: {
        type: "multiple_choice",
        question: "بماذا أمر النبي ﷺ الرماة؟",
        options: ["أن ينزلوا عند النصر", "ألا يبرحوا مكانهم حتى يُرسل إليهم", "أن يجمعوا الغنائم", "أن يلحقوا بالجيش"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "سهم من أُحد", description: "سهم يذكّرك أن المهمة تُتمّ إلى آخرها." },
      badge: "ثابت في موقعه",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "وصية النبي ﷺ للرماة يوم أُحد ثابتة في صحيح البخاري.",
    },
  },
  {
    storyId: "st-7-06",
    stationId: 7,
    slug: "tough-lesson-and-heroine",
    en: {
      title: "The Lesson of Uhud, and Nusaybah",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Most of the archers thought the battle was over, and came down from the hill before the Prophet ﷺ gave them leave. The horsemen of Quraysh came round behind them and the battle turned. The Prophet ﷺ held firm with a few, and Nusaybah bint Ka'b took up a sword and a shield to defend him until she was wounded.",
          shortLesson: "One person's mistake in shared work is paid for by everyone.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the archers saw the idolaters breaking, they thought the battle was decided, and most came down from the hill for the spoils before the Prophet ﷺ gave them leave; their commander Abdullah ibn Jubayr stayed with a few. The horsemen of Quraysh used the gap, came round behind the hill and struck the Muslims from behind, and the ranks were thrown into confusion. The Prophet ﷺ held firm with a small group, and Nusaybah bint Ka'b — Umm Ammarah — put down the waterskin she was carrying, took a sword and a shield, and fought in front of the Messenger of Allah ﷺ until she carried many wounds. Uhud was a lesson: breaking the plan costs dearly, and standing firm in hardship makes heroes.",
          details:
            "Allah says after Uhud: ﴿وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ﴾ — “Do not weaken and do not grieve; you will be uppermost.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ said of that day: “I did not turn right or left without seeing her fighting in front of me.”",
        value: { name: "Standing firm", icon: "🛡️" },
        thinkQuestion: "In shared work, why does one person's mistake reach everyone?",
        challenge: {
          type: "multiple_choice",
          question: "Who defended the Prophet ﷺ at Uhud until she was wounded?",
          options: ["Khadijah", "Nusaybah bint Ka'b", "Fatimah", "Asma"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small shield", description: "A shield for a woman who stood where others fell back." },
        badge: "Firm in Hardship",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari, and Ibn Sa'd's Tabaqat",
        note: "The archers leaving and the battle turning are in Sahih al-Bukhari; the account of Nusaybah is in Musnad Ahmad and Ibn Sa'd.",
      },
    },
    title: "درس أُحد وبطولة نُسيبة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "ظنّ أكثر الرماة أن المعركة انتهت، فنزلوا من التلّة قبل أن يأذن النبي ﷺ. فالتفّت خيل قريش من ورائهم وانقلبت المعركة. وثبت النبي ﷺ ومعه قليل، وبرزت نُسيبة بنت كعب رضي الله عنها فأخذت سيفاً وترساً تدافع عنه حتى أصابتها جراح.",
        shortLesson: "خطأ واحد في العمل الجماعي يدفع ثمنه الجميع.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما رأى الرماة المشركين ينكشفون ظنّوا أن المعركة قد حُسمت، فنزل أكثرهم من التلّة لجمع الغنائم قبل أن يأذن لهم النبي ﷺ، وبقي أميرهم عبد الله بن جبير ومعه قليل. فاستغلّ فرسان قريش الثغرة والتفّوا من خلف الجبل، فباغتوا المسلمين واختلطت الصفوف. وثبت النبي ﷺ ومعه نفر قليل، وبرزت البطلة نُسيبة بنت كعب — أم عمارة رضي الله عنها — فتركت سقاء الماء وأخذت سيفاً وترساً، وجعلت تذبّ عن رسول الله ﷺ حتى أصابتها جراح كثيرة. كان يوم أُحد درساً: مخالفة الخطة ثمنها باهظ، والثبات في الشدة يصنع الأبطال.",
        details:
          "قال تعالى بعد أُحد: ﴿وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ﴾.",
      },
    },
    interactive: {
      discover: "قال النبي ﷺ يومئذ: «ما التفتّ يميناً ولا شمالاً إلا وأراها تقاتل دوني».",
      value: { name: "الثبات", icon: "🛡️" },
      thinkQuestion:
        "في العمل الجماعي، لماذا يؤثّر خطأ فرد واحد في الجميع؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن دافعت عن النبي ﷺ يوم أُحد حتى جُرحت؟",
        options: ["خديجة رضي الله عنها", "نُسيبة بنت كعب رضي الله عنها", "فاطمة رضي الله عنها", "أسماء رضي الله عنها"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ترس صغير", description: "ترس يذكّرك بامرأة وقفت حيث تراجع غيرها." },
      badge: "ثابت عند الشدّة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري، وطبقات ابن سعد",
      note: "نزول الرماة وانقلاب المعركة في صحيح البخاري؛ وخبر نُسيبة رضي الله عنها في مسند أحمد وطبقات ابن سعد.",
    },
  },
  {
    storyId: "st-7-07",
    stationId: 7,
    slug: "trench-salman-idea",
    en: {
      title: "Ten Thousand, and the Idea of a Trench",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The tribes gathered into an army called the Confederates — ten thousand fighters — and marched on Madinah. The Prophet ﷺ asked his companions for their view, and Salman al-Farisi said: Messenger of Allah, in Persia, when we were besieged, we dug a trench around ourselves. The Prophet ﷺ liked the idea and ordered the digging.",
          shortLesson: "A useful idea is taken from whatever country it comes from.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Arab tribes and their allies gathered into an army called the Confederates, some ten thousand fighters, and marched on Madinah. The Prophet ﷺ gathered his companions to consult on a plan that would protect the women and children. Salman al-Farisi stepped forward and said: “Messenger of Allah, in Persia, when we were besieged, we dug a trench around ourselves.” Digging a wide, deep trench across the open side of the city was new to the Arabs — they had not used it before. The Prophet ﷺ liked it and ordered the digging, and the city was shielded by a barrier no horse could cross.",
          details:
            "Allah describes that siege: ﴿إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ﴾ — “when they came at you from above you and from below you.”",
        },
      },
      interactive: {
        discover: "Salman came from Persia, and brought his country's experience with him to Madinah.",
        value: { name: "Learning from others' experience", icon: "⛏️" },
        thinkQuestion: "What useful thing have you learned from someone who came from another country?",
        challenge: {
          type: "multiple_choice",
          question: "Who suggested digging the trench?",
          options: ["Abu Bakr", "Salman al-Farisi", "Umar", "Al-Hubab ibn al-Mundhir"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small pickaxe", description: "A pickaxe to remind you that a good idea has no homeland." },
        badge: "One With an Idea",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah",
        note: "Salman's suggestion of the trench is well known in the Seerah, reported by Ibn Ishaq; the battle itself is established in the Quran and both Sahih collections.",
      },
    },
    title: "عشرة آلاف وفكرة الخندق",
    content: {
      tier_1_age_6_8: {
        narrative:
          "تجمّعت القبائل في جيش سُمّي الأحزاب، عشرة آلاف مقاتل، وزحفوا إلى المدينة. فاستشار النبي ﷺ أصحابه، فقال سلمان الفارسي رضي الله عنه: يا رسول الله، إنا كنا بفارس إذا حوصرنا خندقنا حولنا. فأعجبت النبي ﷺ الفكرة وأمر بالحفر.",
        shortLesson: "الفكرة النافعة تُؤخذ من أي بلد جاءت.",
      },
      tier_2_age_9_11: {
        narrative:
          "تجمّعت قبائل العرب ومن حالفهم في جيش سُمّي «الأحزاب» قوامه نحو عشرة آلاف مقاتل، وزحفوا إلى المدينة. فجمع النبي ﷺ أصحابه يستشيرهم في خطة تحمي النساء والصبيان. فتقدّم سلمان الفارسي رضي الله عنه وقال: «يا رسول الله، إنا كنا بفارس إذا حوصرنا خندقنا حولنا». وكانت فكرة حفر خندق عريض عميق في الجهة المكشوفة من المدينة جديدة على العرب لم يعرفوها من قبل. فأعجبت النبيَّ ﷺ وأمر بالحفر، فصارت المدينة محميّة بحاجز يمنع الخيل من العبور.",
        details:
          "قال تعالى واصفاً شدّة ذلك الحصار: ﴿إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ وَإِذْ زَاغَتِ الْأَبْصَارُ وَبَلَغَتِ الْقُلُوبُ الْحَنَاجِرَ﴾.",
      },
    },
    interactive: {
      discover: "سلمان رضي الله عنه جاء من فارس، فحمل معه خبرة بلده إلى المدينة.",
      value: { name: "الإفادة من خبرة الآخرين", icon: "⛏️" },
      thinkQuestion:
        "ما الشيء النافع الذي تعلّمته من شخص جاء من بلد آخر؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن أشار بحفر الخندق؟",
        options: ["أبو بكر رضي الله عنه", "سلمان الفارسي رضي الله عنه", "عمر رضي الله عنه", "الحُباب بن المنذر رضي الله عنه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "فأس صغيرة", description: "فأس تذكّرك أن الفكرة الجيدة لا وطن لها." },
      badge: "صاحب فكرة",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام",
      note: "مشورة سلمان رضي الله عنه بحفر الخندق مشهورة في كتب السيرة، ورواها ابن إسحاق؛ وأصل غزوة الخندق ثابت بالقرآن والصحيحين.",
    },
  },
  {
    storyId: "st-7-08",
    stationId: 7,
    slug: "prophet-work-and-food-miracle",
    en: {
      title: "The Leader's Pickaxe, and Food That Did Not Run Out",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ came down and dug with his companions, a stone tied over his stomach from hunger. Jabir ibn Abdullah saw it, went home and slaughtered a small animal while his wife ground a measure of barley, and invited him with a few others. The Prophet ﷺ called all the people of the trench — and they ate until they were full, and food was left over.",
          shortLesson: "A leader tires alongside his team, not ahead of them or apart from them.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ did not sit and watch: he went down into the trench, digging and carrying earth with his companions, a stone tied over his stomach from hunger, chanting with them to lift their spirits. Jabir ibn Abdullah saw how hungry he was, went home and slaughtered a small animal, and his wife ground a measure of barley; then he came quietly to invite the Prophet ﷺ and a few with him. When the Prophet ﷺ knew of it, he called out at the top of his voice: “People of the trench, Jabir has made food — come!” Everyone came. He prayed over the pot and the dough, and the whole company ate until they were full, and the food was still there.",
          details:
            "Allah says of his care for them: ﴿عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيصٌ عَلَيْكُم﴾ — “Your hardship is grievous to him, and he is concerned for you.”",
        },
      },
      interactive: {
        discover: "The food was enough for a handful of people, and the whole of the trench — a thousand men — ate from it.",
        value: { name: "Leading by working", icon: "🍲" },
        thinkQuestion: "If you led a team, which job would you do yourself before asking anyone else to?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ do when he heard about Jabir's food?",
          options: ["Ate alone", "Called all the people of the trench", "Sent the food back", "Put it off until the next day"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small cooking pot", description: "A pot to remind you that food grows when it is shared." },
        badge: "Leading by Example",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "Jabir's account of the food at the trench is established in both Sahih collections, including the Prophet digging with them and the stone tied over his stomach.",
      },
    },
    title: "فأس القائد وبركة الطعام",
    content: {
      tier_1_age_6_8: {
        narrative:
          "نزل النبي ﷺ يحفر مع أصحابه، وقد ربط على بطنه حجراً من الجوع. فرآه جابر بن عبد الله رضي الله عنه فذهب وذبح شاة صغيرة وطحنت زوجته صاعاً من شعير، ودعاه في نفر قليل. فنادى النبي ﷺ أهل الخندق كلهم، فأكلوا حتى شبعوا وبقي الطعام.",
        shortLesson: "القائد يتعب مع فريقه، لا قبلهم ولا بعيداً عنهم.",
      },
      tier_2_age_9_11: {
        narrative:
          "لم يجلس النبي ﷺ يتفرّج، بل نزل إلى الخندق يحفر مع أصحابه ويحمل التراب، وقد ربط على بطنه حجراً من شدّة الجوع، وكان يرتجز معهم ليشدّ عزائمهم. فرأى جابر بن عبد الله رضي الله عنه ما به من الجوع، فانطلق إلى بيته وذبح بهيمة صغيرة، وطحنت امرأته صاعاً من شعير، ثم جاء يدعو النبي ﷺ ونفراً معه سرّاً. فلما علم النبي ﷺ نادى بأعلى صوته: «يا أهل الخندق، إن جابراً قد صنع سُوراً فحيّهلاً بكم». فجاء الناس جميعاً، فدعا النبي ﷺ في البُرمة والعجين، فأكل القوم كلهم حتى شبعوا، وبقي الطعام كما هو.",
        details:
          "قال تعالى في رأفته ﷺ بأصحابه: ﴿لَقَدْ جَاءَكُمْ رَسُولٌ مِّنْ أَنفُسِكُمْ عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيصٌ عَلَيْكُم بِالْمُؤْمِنِينَ رَءُوفٌ رَّحِيمٌ﴾.",
      },
    },
    interactive: {
      discover: "كان الطعام يكفي نفراً قليلاً، فأكل منه أهل الخندق وهم ألف.",
      value: { name: "القدوة بالعمل", icon: "🍲" },
      thinkQuestion:
        "لو كنت قائد فريق، أي عمل تشارك فيه بنفسك قبل أن تطلبه من غيرك؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل النبي ﷺ حين علم بطعام جابر رضي الله عنه؟",
        options: ["أكل وحده", "نادى أهل الخندق جميعاً", "ردّ الطعام", "أجّله إلى الغد"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بُرمة صغيرة", description: "قِدر تذكّرك أن الطعام يزيد حين يُشارَك." },
      badge: "قدوة بالعمل",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "حديث جابر رضي الله عنه في طعام الخندق ثابت في الصحيحين، وفيه حفر النبي ﷺ معهم وشدّ الحجر على بطنه.",
    },
  },
  {
    storyId: "st-7-09",
    stationId: 7,
    slug: "cold-wind-victory-without-swords",
    en: {
      title: "The Wind of Victory, and the End of the Confederates",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The idolaters stood helpless at the trench for a month, and the cold and the fear grew hard. The Prophet ﷺ prayed to his Lord, and Allah sent a bitterly cold wind that tore up their tents, put out their fires and overturned their pots — and they left in the night. The Muslims woke to find the plain empty.",
          shortLesson: "Allah can turn the hardest situation without a sword being raised.",
        },
        tier_2_age_9_11: {
          narrative:
            "The army of the Confederates stood before the trench, unable to cross it with their horses, and the siege dragged on for close to a month, with cold and hunger and fear pressing on those inside the city. The Prophet ﷺ stood praying to his Lord to give the Muslims victory and spare them. Allah sent upon the camp of the Confederates a bitterly cold wind on a dark night: it tore up their tents, put out their fires, overturned their cooking pots and filled their hearts with dread. Their commander ordered them to leave that same night. The Muslims woke to an empty plain — victory without a battle — and that alliance broke apart and never gathered again.",
          details:
            "Allah says: ﴿فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا﴾ — “We sent against them a wind, and armies you did not see.”",
        },
      },
      interactive: {
        discover: "Afterwards the Prophet ﷺ said: “Now we go to them, and they do not come to us” — the years of being besieged were over.",
        value: { name: "Patience until relief", icon: "🌬️" },
        thinkQuestion: "When waiting through something hard drags on, what helps you stay patient?",
        challenge: {
          type: "multiple_choice",
          question: "How did the siege of the Confederates end?",
          options: ["With a great battle", "With a fierce wind Allah sent, and they left", "With a written treaty", "With gifts sent to them"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A feather in the wind", description: "A feather: the slightest means is enough when Allah wills it." },
        badge: "Patient Until Dawn",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah Al-Ahzab: 9, and Sahih Muslim",
        note: "The wind and the unseen armies are stated in the Quran; the departure of the Confederates is in Sahih Muslim.",
      },
    },
    title: "ريح النصر ونهاية الأحزاب",
    content: {
      tier_1_age_6_8: {
        narrative:
          "وقف المشركون عاجزين أمام الخندق شهراً، واشتدّ البرد والخوف. فدعا النبي ﷺ ربه، فأرسل الله عليهم ريحاً شديدة البرد قلعت خيامهم وأطفأت نيرانهم وكفأت قدورهم، فرحلوا في الليل. وأصبح المسلمون فلم يجدوا أحداً.",
        shortLesson: "الله يغيّر أصعب المواقف من غير أن يُرفع سيف.",
      },
      tier_2_age_9_11: {
        narrative:
          "وقف جيش الأحزاب أمام الخندق لا يستطيعون عبوره بخيلهم، وطال الحصار قرابة شهر، واشتدّ البرد والجوع والخوف على من في المدينة. فقام النبي ﷺ يدعو ربه أن ينصر المسلمين ويكفيهم شرّهم. فأرسل الله على معسكر الأحزاب ريحاً شديدة البرد في ليلة مظلمة، فقلعت خيامهم، وأطفأت نيرانهم، وكفأت قدورهم، وألقت في قلوبهم الرعب. فأمر قائدهم بالرحيل من ليلته. وأصبح المسلمون فإذا الأرض خالية، ونصرهم الله بغير قتال، وانفضّ ذلك الحلف فلم يجتمع بعدها.",
        details:
          "قال تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا﴾.",
      },
    },
    interactive: {
      discover: "قال النبي ﷺ بعدها: «الآن نغزوهم ولا يغزوننا» — انتهى زمن الحصار.",
      value: { name: "الصبر حتى الفرج", icon: "🌬️" },
      thinkQuestion:
        "حين يطول الانتظار في أمر صعب، ما الذي يعينك على الصبر؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ انتهى حصار الأحزاب؟",
        options: ["بمعركة كبيرة", "بريح شديدة أرسلها الله فرحلوا", "باتفاق مكتوب", "بهدايا لهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ريشة في الريح", description: "ريشة تذكّرك أن أضعف الأسباب تكفي إذا أراد الله." },
      badge: "صابر حتى الفجر",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة الأحزاب: ٩، وصحيح مسلم",
      note: "إرسال الريح والجنود ثابت بنص القرآن، وخبر رحيل الأحزاب في صحيح مسلم.",
    },
  },
  {
    storyId: "st-7-10",
    stationId: 7,
    slug: "hudaybiyyah-peace-treaty",
    en: {
      title: "Hudaybiyyah: Peace in the Clothes of Pilgrimage",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ set out with one thousand four hundred companions in the white clothes of pilgrimage, carrying no weapons of war, intending the lesser pilgrimage. Quraysh turned them back. He chose a treaty over a battle, and accepted terms that looked hard, to keep blood from being spilt. Umm Salamah advised him to shave his head and offer his sacrifice in front of the people — he did, and they followed him.",
          shortLesson: "Sometimes the bravest decision is to choose peace.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ set out with one thousand four hundred of his companions in the white clothes of pilgrimage, carrying nothing but a traveller's sword in its sheath, meaning to perform the lesser pilgrimage after years of longing for the House. Quraysh blocked them and kept them from the Sacred Mosque. The Prophet ﷺ refused to begin a fight and looked for every road that would spare blood. The two sides sat at Hudaybiyyah and negotiated, and he accepted terms that seemed hard: that they return this year without the pilgrimage, and that war be set aside for ten years. It weighed on the companions. Umm Salamah advised him to go out, shave his head and offer his sacrifice in front of them without speaking to anyone. He did — and they rose and did the same.",
          details:
            "Allah called this treaty a conquest: ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾ — “Indeed, We have given you a clear conquest.”",
        },
      },
      interactive: {
        discover: "In the two years after Hudaybiyyah, more people entered Islam than in all the years before it.",
        value: { name: "Choosing peace", icon: "🕊️" },
        thinkQuestion: "When is giving up something you want today a gain tomorrow?",
        challenge: {
          type: "multiple_choice",
          question: "What did Umm Salamah advise the Prophet ﷺ to do?",
          options: ["To return to fighting", "To shave and sacrifice before the people, without speaking", "To wait a year", "To enter Mecca by force"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A white pilgrim's cloth", description: "White cloth for an army that set out without weapons of war." },
        badge: "Peacemaker",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "Hudaybiyyah and Umm Salamah's counsel are established in Sahih al-Bukhari; the treaty is called a conquest in Surah Al-Fath.",
      },
    },
    title: "الحديبية: سلامٌ في ثياب الإحرام",
    content: {
      tier_1_age_6_8: {
        narrative:
          "خرج النبي ﷺ ومعه ألف وأربعمائة في ثياب الإحرام البيضاء يريدون العمرة، لا يحملون سلاح حرب. فمنعتهم قريش، فاختار النبي ﷺ الصلح على القتال، وقبل شروطاً بدت قاسية ليمنع الدماء. وأشارت عليه أم سلمة رضي الله عنها بأن يحلق ويذبح أمام الناس، ففعل، ففعلوا مثله.",
        shortLesson: "أشجع القرارات أحياناً هو اختيار السلام.",
      },
      tier_2_age_9_11: {
        narrative:
          "خرج النبي ﷺ ومعه ألف وأربعمائة من أصحابه في ثياب الإحرام البيضاء، لا يحملون إلا سلاح المسافر في غمده، يريدون العمرة والطواف بالبيت بعد سنوات من الشوق. فمنعتهم قريش وحبستهم عن المسجد الحرام. فرفض النبي ﷺ أن يبدأهم بقتال، وطلب كل سبيل يحقن الدم. فجلس الطرفان في «الحديبية» يتفاوضان، وقبل النبي ﷺ شروطاً ظاهرها قاسٍ: أن يرجعوا عامهم هذا بغير عمرة، وأن توضع الحرب عشر سنين. وشقّ ذلك على الصحابة. فأشارت عليه أم سلمة رضي الله عنها أن يخرج فيحلق رأسه وينحر هديه أمامهم دون أن يكلّم أحداً، ففعل، فقاموا يفعلون مثله.",
        details:
          "وسمّى الله هذا الصلح فتحاً: ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾.",
      },
    },
    interactive: {
      discover: "دخل في الإسلام في السنتين بعد الحديبية أكثر ممن دخل فيه قبلها.",
      value: { name: "اختيار السلام", icon: "🕊️" },
      thinkQuestion:
        "متى يكون التنازل عن شيء تحبّه اليوم كسباً في الغد؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ أشارت أم سلمة رضي الله عنها على النبي ﷺ؟",
        options: ["أن يرجع للقتال", "أن يحلق وينحر أمام الناس دون كلام", "أن ينتظر سنة", "أن يدخل مكة بالقوة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ثوب إحرام أبيض", description: "ثوب أبيض يذكّرك بجيش خرج بلا سلاح حرب." },
      badge: "صانع سلام",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "خبر الحديبية ومشورة أم سلمة رضي الله عنها ثابتان في صحيح البخاري، وتسمية الصلح فتحاً في سورة الفتح.",
    },
  },
  {
    storyId: "st-7-11",
    stationId: 7,
    slug: "letters-to-world-leaders",
    en: {
      title: "Letters to the Kings of the Earth",
      content: {
        tier_1_age_6_8: {
          narrative:
            "When the fighting was set aside after Hudaybiyyah, the Prophet ﷺ did not sit and wait. He had a ring made, engraved “Muhammad, the Messenger of Allah”, and wrote letters to the kings of his time: Caesar of Rome, Khosrau of Persia, al-Muqawqis in Alexandria and the Negus in Abyssinia — calling them with words, not with a sword.",
          shortLesson: "A good word reaches where an army cannot.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the treaty of Hudaybiyyah set the fighting aside for ten years, the Prophet ﷺ spent that safety on calling people, not on war. He had a silver ring made, engraved in three lines — “Muhammad, the Messenger of Allah” — because kings would not read an unsealed letter. He chose companions who could carry a message well, and sent letters to the great rulers of his day: Heraclius the Caesar of Rome, Khosrau the king of Persia, al-Muqawqis the ruler of the Copts in Egypt, the Negus of Abyssinia and others. One short letter, calling to the worship of Allah alone, and to justice and peace. Some honoured the messenger and answered with gifts; one tore the letter up. Not one of them was forced to anything.",
          details:
            "Allah says of the message's reach: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا كَافَّةً لِّلنَّاسِ بَشِيرًا وَنَذِيرًا﴾ — “We have sent you to all people, as a bringer of good news and a warner.”",
        },
      },
      interactive: {
        discover: "The engraving on the ring was cut in reverse, so the seal came out the right way round in the wax.",
        value: { name: "Dialogue and calling", icon: "✉️" },
        thinkQuestion: "Why does a word sometimes reach a heart that nothing else can?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the Prophet ﷺ have an engraved ring made?",
          options: ["As jewellery", "To seal letters — kings would not read an unsealed one", "To trade with", "To give away"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A sealed ring", description: "A ring for a message that crossed seas without an army." },
        badge: "Messenger of the Word",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The Prophet's letter to Heraclius and his taking a seal-ring are established in Sahih al-Bukhari.",
      },
    },
    title: "رسائل إلى ملوك الأرض",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لما وضعت الحرب أوزارها بعد الحديبية، لم يجلس النبي ﷺ ينتظر، بل اتخذ خاتماً نُقش عليه «محمد رسول الله»، وكتب رسائل إلى ملوك زمانه: قيصر الروم، وكسرى فارس، والمقوقس بالإسكندرية، والنجاشي بالحبشة، يدعوهم بالكلمة لا بالسيف.",
        shortLesson: "الكلمة الطيبة تصل إلى حيث لا يصل الجيش.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما وضعت الحرب أوزارها عشر سنين بصلح الحديبية، استثمر النبي ﷺ هذا الأمان في الدعوة لا في القتال. فاتخذ خاتماً من فضة نُقش عليه ثلاثة أسطر: «محمد رسول الله»، لأن الملوك لا يقرؤون كتاباً غير مختوم. ثم اختار من أصحابه رسلاً يحسنون البلاغ، وبعث بالرسائل إلى كبار ملوك الأرض في زمانه: هرقل قيصر الروم، وكسرى ملك فارس، والمقوقس عظيم القبط بمصر، والنجاشي ملك الحبشة، وغيرهم. رسالة واحدة قصيرة، تدعو إلى عبادة الله وحده وإلى العدل والسلام. فمنهم من أكرم الرسول وردّ بالهدايا، ومنهم من مزّق الكتاب. ولم يُكره أحدٌ منهم على شيء.",
        details:
          "قال تعالى في عموم الرسالة: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا كَافَّةً لِّلنَّاسِ بَشِيرًا وَنَذِيرًا﴾.",
      },
    },
    interactive: {
      discover: "نقش الخاتم كان مقلوباً ليخرج الختم على الشمع صحيحاً.",
      value: { name: "الحوار والبلاغ", icon: "✉️" },
      thinkQuestion:
        "لماذا تصل الكلمة أحياناً إلى قلوب لا يبلغها شيء آخر؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا اتخذ النبي ﷺ خاتماً منقوشاً؟",
        options: ["زينةً", "ليختم به الرسائل، فالملوك لا يقرؤون كتاباً غير مختوم", "ليتّجر به", "ليهديه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "خاتم مختوم", description: "خاتم يذكّرك برسالة عبرت البحار بلا جيش." },
      badge: "رسول الكلمة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "كتاب النبي ﷺ إلى هرقل واتخاذه الخاتم ثابتان في صحيح البخاري.",
    },
  },
  {
    storyId: "st-7-12",
    stationId: 7,
    slug: "battle-of-khaybar-hero-ali",
    en: {
      title: "The Forts of Khaybar and the Bearer of the Banner",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The forts of Khaybar in the north were a base funding those who fought Madinah, so the Prophet ﷺ went out to secure the frontier. When they reached the strongest fort he said: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.” He called Ali ibn Abi Talib, whose eyes were sore, healed them, and handed him the banner.",
          shortLesson: "A hard task is given to the person fit for it.",
        },
        tier_2_age_9_11: {
          narrative:
            "The forts of Khaybar, north of Madinah, were a base gathering money and weapons and stirring the tribes against the Muslims, so the Prophet ﷺ went out to secure the frontier and end the danger. The Muslims took the forts one after another until they reached the strongest of them. The Prophet ﷺ said: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love; Allah will grant victory through him.” The people spent the night wondering which of them it would be. In the morning he asked: “Where is Ali ibn Abi Talib?” They said his eyes were sore. He called for him, treated his eyes, and they were healed as though he had never had any pain — and he handed him the banner, and the fort was opened through him. Afterwards the Prophet ﷺ settled with the people of Khaybar that they stay and farm their land, with a share of its produce.",
          details:
            "Allah says: ﴿فَأَنزَلَ السَّكِينَةَ عَلَيْهِمْ وَأَثَابَهُمْ فَتْحًا قَرِيبًا﴾ — “He sent down tranquillity upon them and rewarded them with a near victory.”",
        },
      },
      interactive: {
        discover: "The people of Khaybar stayed working their own land afterwards; they were not driven out.",
        value: { name: "The right person in the right place", icon: "🏰" },
        thinkQuestion: "How do you choose who takes on the hardest job in your team?",
        challenge: {
          type: "multiple_choice",
          question: "To whom did the Prophet ﷺ give the banner at Khaybar?",
          options: ["Abu Bakr", "Ali ibn Abi Talib", "Salman", "Bilal"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small banner", description: "A banner: a trust is handed to the one who can carry it." },
        badge: "Bearer of the Banner",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The hadith of the banner at Khaybar and the healing of Ali's eyes are established in both Sahih collections.",
      },
    },
    title: "حصون خيبر وحامل الراية",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كانت حصون خيبر في الشمال مركزاً يموّل من يحارب المدينة، فخرج إليها النبي ﷺ ليؤمّن الحدود. ولما بلغوا أمنع الحصون قال: «لأعطينّ الراية غداً رجلاً يحبّ الله ورسوله ويحبّه الله ورسوله». فدعا عليّ بن أبي طالب رضي الله عنه وهو أرمد، فتفل في عينيه فبرأتا، وأعطاه الراية.",
        shortLesson: "المهمة الصعبة تُسنَد إلى أهلها.",
      },
      tier_2_age_9_11: {
        narrative:
          "كانت حصون خيبر في شمال المدينة مركزاً يجمع المال والسلاح ويحرّض القبائل على المسلمين، فخرج إليها النبي ﷺ لتأمين الحدود وإنهاء الخطر. وفتح المسلمون الحصون حصناً بعد حصن حتى بلغوا أمنعها. فقال النبي ﷺ: «لأعطينّ الراية غداً رجلاً يحبّ الله ورسوله ويحبّه الله ورسوله، يفتح الله على يديه». فبات الناس ليلتهم يتساءلون أيهم يُعطاها. فلما أصبح قال: «أين علي بن أبي طالب؟» فقيل: هو يشتكي عينيه. فدعا به، فتفل في عينيه فبرأ حتى كأن لم يكن به وجع، وأعطاه الراية ففُتح على يديه. ثم عامل النبي ﷺ أهل خيبر على أن يبقوا في أرضهم يزرعونها ولهم شطر ما يخرج منها.",
        details:
          "قال تعالى: ﴿فَأَنزَلَ السَّكِينَةَ عَلَيْهِمْ وَأَثَابَهُمْ فَتْحًا قَرِيبًا﴾.",
      },
    },
    interactive: {
      discover: "بقي أهل خيبر يعملون في أرضهم بعد الفتح، ولم يُخرَجوا منها.",
      value: { name: "وضع الرجل المناسب في مكانه", icon: "🏰" },
      thinkQuestion:
        "كيف تختار من يقوم بأصعب مهمة في فريقك؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن أعطاه النبي ﷺ الراية يوم خيبر؟",
        options: ["أبا بكر رضي الله عنه", "علي بن أبي طالب رضي الله عنه", "سلمان رضي الله عنه", "بلالاً رضي الله عنه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "راية صغيرة", description: "راية تذكّرك أن الأمانة تُسلّم لمن يحملها." },
      badge: "حامل الراية",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "حديث الراية يوم خيبر وشفاء عين عليّ رضي الله عنه ثابتان في الصحيحين.",
    },
  },
  {
    storyId: "st-7-13",
    stationId: 7,
    slug: "makkah-march-ten-thousand-fires",
    en: {
      title: "Ten Thousand Fires in One Night",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh broke the treaty of Hudaybiyyah by helping an attack on Khuza'ah, who were the Muslims' allies, so those wronged had to be defended. The Prophet ﷺ prepared ten thousand men and moved in complete secrecy until he camped near Mecca. Then he ordered every man to light a fire — and Quraysh saw the hills burning with ten thousand fires, and knew that fighting was hopeless.",
          shortLesson: "The best victory is the one in which no blood is shed.",
        },
        tier_2_age_9_11: {
          narrative:
            "Quraysh broke the treaty of Hudaybiyyah when they helped their allies against Khuza'ah — who were under the Prophet's covenant — and men of Khuza'ah were killed, so the Muslims were bound to defend the allies who had been wronged. The Prophet ﷺ prepared ten thousand men and moved in strict secrecy so that Quraysh would not gather for a battle, and camped at Marr az-Zahran near Mecca. Then he ordered every man in the army to light a fire, and in one night the hills were covered with ten thousand fires. When Abu Sufyan and the people of Mecca saw it, they were certain that resistance was pointless, and the city gave in without a battle. The aim was never to terrify, but to stop a fight before it started.",
          details:
            "Allah says about defending the wronged: ﴿وَإِنِ اسْتَنصَرُوكُمْ فِي الدِّينِ فَعَلَيْكُمُ النَّصْرُ﴾ — “If they seek your help, then help is your duty.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ entered Mecca with a great army, and almost no fighting took place in it.",
        value: { name: "Sparing blood", icon: "🔥" },
        thinkQuestion: "How do you keep a disagreement from turning into a fight?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the Prophet ﷺ order every man to light a fire?",
          options: ["For cooking", "So Mecca would see the size of the army and give up fighting", "Only for warmth", "To celebrate"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small torch", description: "A torch for the night a battle was prevented." },
        badge: "Preventer of Fighting",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah",
        note: "The lighting of the fires at Marr az-Zahran is well known in the Seerah, from Ibn Ishaq; the conquest itself and the breaking of the treaty are established in both Sahih collections.",
      },
    },
    title: "عشرة آلاف نار في ليلة واحدة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "نقضت قريش عهد الحديبية فأعانت على حلفاء المسلمين من خزاعة، فوجب نصرهم. فتجهّز النبي ﷺ في عشرة آلاف وسار في سرّية تامة حتى نزل قرب مكة. ثم أمر كل رجل أن يوقد ناراً، فرأت قريش الجبال مشتعلة بعشرة آلاف نار، فعلمت أن لا طاقة لها بقتال.",
        shortLesson: "أفضل نصرٍ ما حُقن فيه الدم.",
      },
      tier_2_age_9_11: {
        narrative:
          "نقضت قريش عهد الحديبية حين أعانت حلفاءها على خزاعة — وكانت خزاعة في عهد النبي ﷺ — فقُتل منهم رجال، فوجب على المسلمين نصر من ظُلم من حلفائهم. فتجهّز النبي ﷺ في عشرة آلاف، وسار في كتمان شديد حتى لا تستعدّ قريش لقتال، ونزل بـ«مرّ الظهران» قرب مكة. ثم أمر أن يوقد كل رجل من الجيش ناراً، فامتلأت الجبال بعشرة آلاف نار في ليلة واحدة. فلما رأى أبو سفيان وأهل مكة ذلك المشهد أيقنوا أن المقاومة لا معنى لها، فاستسلمت المدينة بغير معركة. لم يكن المقصود إرهاباً، بل منع القتال قبل أن يبدأ.",
        details:
          "قال تعالى في نصرة المظلوم: ﴿وَإِنِ اسْتَنصَرُوكُمْ فِي الدِّينِ فَعَلَيْكُمُ النَّصْرُ﴾.",
      },
    },
    interactive: {
      discover: "دخل النبي ﷺ مكة بجيش عظيم، ولم تقع فيها معركة تُذكر.",
      value: { name: "حقن الدماء", icon: "🔥" },
      thinkQuestion:
        "كيف تمنع خلافاً من أن يتحوّل إلى شجار؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا أمر النبي ﷺ كل رجل أن يوقد ناراً؟",
        options: ["للطبخ", "ليرى أهل مكة كثرة الجيش فيتركوا القتال", "للتدفئة فقط", "للاحتفال"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "مشعل صغير", description: "مشعل يذكّرك بليلة مُنعت فيها معركة." },
      badge: "مانع القتال",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام",
      note: "خبر إيقاد النيران بمرّ الظهران مشهور في كتب السيرة عند ابن إسحاق؛ وأصل فتح مكة ونقض قريش للعهد ثابت في الصحيحين.",
    },
  },
  {
    storyId: "st-7-14",
    stationId: 7,
    slug: "day-of-mercy-entry",
    en: {
      title: "Today Is a Day of Mercy",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ entered Mecca with his head bowed low over his mount, almost touching the saddle, in humility before Allah. A man called out: “Today is a day of slaughter!” The Prophet ﷺ answered him: “Today is a day of mercy.” Then he went round the House, with three hundred and sixty idols about it, striking them with a stick in his hand until they fell, reciting: “Truth has come and falsehood has vanished.”",
          shortLesson: "Real victory makes you humbler, not prouder.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ entered the city that had driven him out and harmed him — not with his head raised in triumph, but bowed over his mount until it almost touched the saddle, in thanks to Allah and humility before Him. He gave the city safety: “Whoever enters the house of Abu Sufyan is safe, whoever shuts his own door is safe, and whoever enters the Sacred Mosque is safe.” When one of his commanders said, “Today is a day of slaughter!”, the Prophet ﷺ took the banner from him and said: “Today is a day of mercy.” Then he went to the Kaaba, with three hundred and sixty idols standing around it, and struck them one after another with the stick in his hand as they fell, reciting, “Truth has come and falsehood has vanished” — until the House returned to what Ibrahim had built it for: the worship of Allah alone.",
          details:
            "Allah says: ﴿إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾ — “falsehood is bound to vanish.”",
        },
      },
      interactive: {
        discover: "He declared safety for anyone who simply shut his own door; no one was hunted in his house.",
        value: { name: "Humility in victory", icon: "🕋" },
        thinkQuestion: "What is the difference between being glad about success and being proud of it?",
        challenge: {
          type: "multiple_choice",
          question: "How did the Prophet ﷺ answer “Today is a day of slaughter”?",
          options: ["He agreed", "He said: Today is a day of mercy", "He said nothing", "He ordered fighting"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small stick", description: "A stick: falsehood falls, however long it has stood." },
        badge: "Humble in Victory",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "His bowed entry, the declaration of safety, and the breaking of the idols with that verse are all in the two Sahih collections; “Today is a day of mercy” is in al-Bukhari.",
      },
    },
    title: "اليوم يوم المرحمة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "دخل النبي ﷺ مكة مطأطئ الرأس على راحلته حتى كاد يمسّ الرحل، تواضعاً لله. وقال رجل: اليوم يوم الملحمة! فردّ عليه النبي ﷺ: «اليوم يوم المرحمة». ثم طاف بالبيت وحوله ثلاثمائة وستون صنماً، فجعل يطعنها بعود في يده حتى سقطت، وهو يقول: ﴿جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ﴾.",
        shortLesson: "النصر الحقيقي يزيدك تواضعاً لا كِبراً.",
      },
      tier_2_age_9_11: {
        narrative:
          "دخل النبي ﷺ مكة التي أخرجته وآذته، لا رافعاً رأسه بالنصر، بل مطأطئاً على راحلته حتى كاد رأسه يمسّ الرحل، شكراً لله وتواضعاً له. وأمّن الناس فقال: «من دخل دار أبي سفيان فهو آمن، ومن أغلق عليه بابه فهو آمن، ومن دخل المسجد الحرام فهو آمن». فلما قال أحد قادته: اليوم يوم الملحمة! ردّ عليه النبي ﷺ وأخذ الراية منه وقال: «اليوم يوم المرحمة». ثم قصد الكعبة وحولها ثلاثمائة وستون صنماً، فجعل يطعنها بعود كان في يده وهي تتساقط، وهو يتلو: ﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ﴾، حتى عاد البيت إلى ما بناه عليه إبراهيم عليه السلام: عبادة الله وحده.",
        details:
          "قال تعالى: ﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾.",
      },
    },
    interactive: {
      discover: "أعلن النبي ﷺ الأمان لكل من أغلق بابه على نفسه، فلم يُطارد أحد في بيته.",
      value: { name: "التواضع عند النصر", icon: "🕋" },
      thinkQuestion:
        "ما الفرق بين الفرح بالنجاح والتكبّر به؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ ردّ النبي ﷺ على قول «اليوم يوم الملحمة»؟",
        options: ["أقرّه", "قال: اليوم يوم المرحمة", "سكت", "أمر بالقتال"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "عود صغير", description: "عود يذكّرك أن الباطل يسقط ولو طال بقاؤه." },
      badge: "متواضع عند النصر",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "دخول النبي ﷺ مكة مطأطئاً، وإعلان الأمان، وكسر الأصنام مع تلاوة الآية — كلها في الصحيحين. وقول «اليوم يوم المرحمة» عند البخاري في قصة سعد بن عبادة.",
    },
  },
  {
    storyId: "st-7-15",
    stationId: 7,
    slug: "go-you-are-free",
    en: {
      title: "Go — You Are Free",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The people of Mecca gathered at the Kaaba waiting to hear what would be done to them — the same people who had driven him out and tortured his companions for twenty years. He asked them: “What do you think I will do with you?” They said: good; a noble brother and the son of a noble brother. He said: “Go — you are free.”",
          shortLesson: "The greatest strength is to forgive when you are able to punish.",
        },
        tier_2_age_9_11: {
          narrative:
            "The people of Mecca gathered at the door of the Kaaba, waiting for his judgement. They knew he had power over them that day, and they knew what they had done: they had driven him from his city, tortured his companions, fought him for twenty years and killed his uncle. He looked at them with pardon and said: “People of Quraysh, what do you think I will do with you?” They answered: “Good — a noble brother, and the son of a noble brother.” He said: “Go — you are free.” He held no one, took no property, and took revenge on no one. Many of them entered Islam that day, not out of fear but out of love, and the whole enmity ended in a single sentence. With that, the years of defending the homeland reached their purpose: safety and justice, without revenge.",
          details:
            "Allah says of his character: ﴿خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ﴾ — “Take to forgiveness, and enjoin what is good.”",
        },
      },
      interactive: {
        discover: "“At-Tulaqa” — the freed ones — became a name in history for the people of Mecca he pardoned that day.",
        value: { name: "Pardon when you are able", icon: "💛" },
        thinkQuestion: "Who is one person you could forgive today?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ say to the people of Mecca on the day of the conquest?",
          options: ["He held them to account", "Go — you are free", "He drove them out of Mecca", "He took their property"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An open lock", description: "An open lock for the day one who could punish pardoned everyone." },
        badge: "Pardon With Power",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, and al-Bayhaqi's Sunan",
        note: "“Go, you are free” is well known in the Seerah from Ibn Ishaq and al-Bayhaqi; the general pardon of Mecca is widely established.",
      },
    },
    title: "اذهبوا فأنتم الطلقاء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "اجتمع أهل مكة عند الكعبة ينتظرون ما يُفعل بهم، وهم الذين أخرجوه وعذّبوا أصحابه عشرين سنة. فقال لهم: «ما تظنون أني فاعل بكم؟» قالوا: خيراً، أخٌ كريم وابن أخٍ كريم. فقال: «اذهبوا فأنتم الطلقاء».",
        shortLesson: "أعظم القوة أن تعفو وأنت قادر.",
      },
      tier_2_age_9_11: {
        narrative:
          "اجتمع أهل مكة عند باب الكعبة ينتظرون حكمه فيهم، وهم يعلمون أنه قادر عليهم اليوم، وأنهم هم الذين أخرجوه من بلده، وعذّبوا أصحابه، وحاربوه عشرين سنة، وقتلوا عمّه. فنظر إليهم نظرة العفو وقال: «يا معشر قريش، ما تظنون أني فاعل بكم؟» قالوا: خيراً، أخٌ كريم وابن أخٍ كريم. فقال ﷺ: «اذهبوا فأنتم الطلقاء». لم يحبس أحداً، ولم يأخذ مالاً، ولم يقتصّ من أحد. فدخل كثير منهم في الإسلام يومئذ لا خوفاً بل حبّاً، وانتهت العداوة كلها في كلمة واحدة. وبهذا بلغت مرحلة الدفاع عن الوطن غايتها: أمنٌ وعدل بلا انتقام.",
        details:
          "قال تعالى في خُلُقه ﷺ: ﴿خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ وَأَعْرِضْ عَنِ الْجَاهِلِينَ﴾.",
      },
    },
    interactive: {
      discover: "كلمة «الطلقاء» صارت لقباً في التاريخ لأهل مكة الذين عفا عنهم النبي ﷺ يومئذ.",
      value: { name: "العفو عند المقدرة", icon: "💛" },
      thinkQuestion:
        "مَن الشخص الذي تستطيع أن تسامحه اليوم؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ لأهل مكة يوم الفتح؟",
        options: ["حاسبهم على ما فعلوا", "اذهبوا فأنتم الطلقاء", "أخرجهم من مكة", "أخذ أموالهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قفل مفتوح", description: "قفل مفتوح يذكّرك بيوم عفا فيه قادرٌ عن الجميع." },
      badge: "عفوٌ عند المقدرة",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، والسنن الكبرى للبيهقي",
      note: "خبر «اذهبوا فأنتم الطلقاء» مشهور في كتب السيرة عند ابن إسحاق والبيهقي؛ وأصل العفو العام عن أهل مكة معلوم مستفيض.",
    },
  },
];
