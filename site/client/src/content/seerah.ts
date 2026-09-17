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
      "خمس عشرة قصة من رحلة الهجرة: مؤامرة دار الندوة، وعليّ في الفراش، ودموع أبي بكر، ونِطاق أسماء، وغنم عامر، ثم غار ثور والسكينة، والدليل الخبير، وخيمة أم معبد، وفرس سُراقة، وراية بُرَيدة، ومسجد قباء، وبيت أبي أيوب، ويوم صارت يثرب المدينة المنوّرة.",
    descriptionEn:
      "Fifteen stories from the migration: the plot at Dar an-Nadwa, Ali in the bed, Abu Bakr’s tears, Asma’s belt and Amir’s flock, then Cave Thawr and the tranquillity, the expert guide, Umm Ma’bad’s tent, Suraqah’s horse, Buraydah’s banner, the mosque of Quba, the house of Abu Ayyub, and the day Yathrib became the city of light.",
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
  {
    stationId: 8,
    titleAr: "عام الوفود ودولة السلام",
    titleEn: "The Year of Delegations, and a State at Peace",
    descriptionAr:
      "خمس عشرة قصة من سنوات الاستقرار: درس حُنين في الغرور بالعدد، وجيش العُسرة ومن بكى لأنه لم يجد ما ينفق، وتبوك التي انتهت بعهود لا بقتال، ثم عام الوفود وحوار نجران ووصية معاذ، ودستور المجتمع: أهل الصُّفَّة، والرفق بالحيوان، وأمانة السوق، والمسجد مدرسةً للجميع.",
    descriptionEn:
      "Fifteen stories from the settled years: the lesson of Hunayn about pride in numbers, the Army of Hardship and those who wept at having nothing to give, Tabuk that ended in treaties rather than battle, then the Year of Delegations, the talks with Najran and the counsel to Mu'adh — and the charter of the community: the people of the Bench, kindness to animals, honesty in the market, and the mosque as a school for everyone.",
  },
  {
    stationId: 9,
    titleAr: "حجّة الوداع وختام الرسالة",
    titleEn: "The Farewell Pilgrimage, and the End of the Message",
    descriptionAr:
      "خمس عشرة قصة من آخر سنة: مسيرة إلى مكة في ثوبين أبيضين، ووقوف بعرفات، وخطبة قالت إن لا فضل لعربيّ على أعجميّ إلا بالتقوى، ثم وداع الشهداء، وقائد في الثامنة عشرة، ومرضٌ حُفظ فيه العدل، وآخر صلاة وآخر نظرة وآخر وصية — وما بقي بعده.",
    descriptionEn:
      "Fifteen stories from the last year: a march to Mecca in two white cloths, the standing at Arafat, and a sermon saying no Arab is above a non-Arab except by piety — then farewell to the martyrs, a commander of eighteen, an illness in which fairness was still kept, the last prayer, the last glance, the last testament, and what remained after him.",
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
    image: "/stories/seerah/revelation-iqra.jpg",
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
    image: "/stories/seerah/revelation-waraqah.jpg",
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
    image: "/stories/seerah/revelation-pause.jpg",
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
    image: "/stories/seerah/revelation-muddaththir.jpg",
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
    image: "/stories/seerah/revelation-forms.jpg",
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
    image: "/stories/seerah/dar-al-arqam.jpg",
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
    image: "/stories/seerah/mount-safa-call.jpg",
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
    image: "/stories/seerah/heroes-of-patience.jpg",
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
    image: "/stories/seerah/migration-to-abyssinia.jpg",
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
    image: "/stories/seerah/year-of-sorrow.jpg",
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
    image: "/stories/seerah/islam-of-heroes.jpg",
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
    image: "/stories/seerah/sun-and-moon.jpg",
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
    image: "/stories/seerah/splitting-of-the-moon.jpg",
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
    image: "/stories/seerah/cotton-in-ears.jpg",
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
    image: "/stories/seerah/journey-to-taif.jpg",
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
    image: "/stories/seerah/chest-washing-zamzam.jpg",
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
    image: "/stories/seerah/the-amazing-buraq.jpg",
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
    image: "/stories/seerah/road-to-jerusalem.jpg",
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
    image: "/stories/seerah/leader-of-prophets.jpg",
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
    image: "/stories/seerah/the-first-heaven-adam.jpg",
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
    image: "/stories/seerah/second-heaven-isa-yahya.jpg",
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
    image: "/stories/seerah/third-heaven-yusuf.jpg",
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
    image: "/stories/seerah/fourth-heaven-idris.jpg",
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
    image: "/stories/seerah/fifth-heaven-harun.jpg",
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
    image: "/stories/seerah/seventh-heaven-ibrahim.jpg",
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
    image: "/stories/seerah/sidrat-al-muntaha.jpg",
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
    image: "/stories/seerah/the-great-gift-prayer.jpg",
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
    image: "/stories/seerah/musa-advice-reduction.jpg",
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
    image: "/stories/seerah/morning-of-certainty.jpg",
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
    image: "/stories/seerah/dar-al-nadwa-dust.jpg",
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
    image: "/stories/seerah/hero-in-the-bed.jpg",
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
    image: "/stories/seerah/tears-of-joy-companion.jpg",
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
    image: "/stories/seerah/asma-that-al-nitaqayn.jpg",
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
    image: "/stories/seerah/smart-shepherd-footprints.jpg",
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
    image: "/stories/seerah/permission-to-defend.jpg",
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
    image: "/stories/seerah/badr-shura-counsel.jpg",
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
    image: "/stories/seerah/angels-in-badr.jpg",
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
    image: "/stories/seerah/mercy-to-captives.jpg",
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
    image: "/stories/seerah/mount-of-archers-uhud.jpg",
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
    image: "/stories/seerah/tough-lesson-and-heroine.jpg",
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
    image: "/stories/seerah/trench-salman-idea.jpg",
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
    image: "/stories/seerah/prophet-work-and-food-miracle.jpg",
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
    image: "/stories/seerah/cold-wind-victory-without-swords.jpg",
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
    image: "/stories/seerah/hudaybiyyah-peace-treaty.jpg",
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
    image: "/stories/seerah/battle-of-khaybar-hero-ali.jpg",
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
    image: "/stories/seerah/makkah-march-ten-thousand-fires.jpg",
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
    image: "/stories/seerah/day-of-mercy-entry.jpg",
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
    image: "/stories/seerah/go-you-are-free.jpg",
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
  {
    storyId: "st-6-06",
    stationId: 6,
    slug: "cave-thawr-preparation",
    image: "/stories/seerah/cave-thawr-preparation.jpg",
    en: {
      title: "Cave Thawr, and a Friend Who Went In First",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ and Abu Bakr climbed a rugged mountain to a dark cave called Cave Thawr. Abu Bakr asked to go in first to check the place, and began stopping up the cracks with pieces torn from his own clothes. Then the Prophet ﷺ slept with his head in Abu Bakr's lap — and when something stung him, Abu Bakr did not move, so as not to wake him.",
          shortLesson: "A true friend takes the hurt so his companion does not have to.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ and his companion Abu Bakr climbed a rugged mountain by an untravelled path to a dark cave near its top, called Cave Thawr. Abu Bakr asked to go in ahead of the Prophet ﷺ to make the place safe. He went into the dark and began stopping up every crack and hole he found with pieces torn from his own clothes, until he had nothing left to tear. Then the Prophet ﷺ slept, his blessed head in Abu Bakr's lap, worn out from the journey. Something stung Abu Bakr from one of the openings and hurt him badly — and he did not move a limb or make a sound, so as not to wake the Prophet ﷺ, until a tear fell from the pain. The Prophet ﷺ woke, and prayed for him.",
          details:
            "Allah says of the truthful: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ﴾ — “the one who brought the truth and believed in it.”",
        },
      },
      interactive: {
        discover: "Mount Thawr is high and hard to climb, and it lies in the opposite direction from the road to Madinah — which is exactly why the Prophet ﷺ chose it.",
        value: { name: "Loyalty in friendship", icon: "🕯️" },
        thinkQuestion: "What small thing could you put up with today to spare a friend or a sibling?",
        challenge: {
          type: "multiple_choice",
          question: "Why did Abu Bakr go into the cave before the Prophet ﷺ?",
          options: ["To rest first", "To check the place and stop up its holes before the Prophet ﷺ entered", "To take the food", "Because he arrived first"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A scrap of cloth", description: "A scrap of cloth for the man who tore his own clothes to protect someone else." },
        badge: "A Loyal Companion",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, and al-Hakim's Mustadrak",
        note: "That the Prophet ﷺ and Abu Bakr stayed in the cave is established in the Quran and Sahih al-Bukhari; the details of stopping the holes and the sting come from the Seerah literature, and scholars have questioned their chains.",
      },
    },
    title: "غار ثور وصاحبٌ دخل أولاً",
    content: {
      tier_1_age_6_8: {
        narrative:
          "صعد النبي ﷺ وأبو بكر جبلاً وعراً حتى بلغا غاراً مظلماً يُسمّى غار ثور. فطلب أبو بكر أن يدخل هو أولاً ليطمئنّ على المكان، وجعل يسدّ الشقوق بقطع من ثوبه، ثم نام النبي ﷺ ورأسه في حجره. فلُدغ أبو بكر ولم يتحرّك حتى لا يوقظه.",
        shortLesson: "الصديق الحق يتحمّل الأذى عن صاحبه.",
      },
      tier_2_age_9_11: {
        narrative:
          "صعد النبي ﷺ وصاحبه أبو بكر رضي الله عنه جبلاً وعراً في طريق غير مسلوك حتى بلغا غاراً مظلماً في أعلاه يُسمّى غار ثور. فطلب أبو بكر أن يدخل هو أولاً قبل النبي ﷺ ليطمئنّ على المكان، فدخل في الظلام وجعل يسدّ ما وجده من شقوق وجحور بقطع يمزّقها من ثوبه، حتى نفد ما معه. ثم نام النبي ﷺ ورأسه الشريف في حجره من شدّة التعب. فأصابه من إحدى الفتحات ما آلمه ألماً شديداً، فما حرّك عضواً ولا صاح، حتى لا يوقظ النبي ﷺ من نومه، وسقطت دمعته من الألم. فاستيقظ النبي ﷺ ودعا له.",
        details:
          "قال تعالى في وصف الصادقين: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ أُولَٰئِكَ هُمُ الْمُتَّقُونَ﴾.",
      },
    },
    interactive: {
      discover: "جبل ثور جبل عالٍ صعب المرتقى، اختاره النبي ﷺ لأنه في الجهة المخالفة لطريق المدينة، فلا يُتوقّع أن يسلكه.",
      value: { name: "الوفاء في الصحبة", icon: "🕯️" },
      thinkQuestion:
        "ما الشيء الصغير الذي تستطيع أن تتحمّله اليوم لتريح صديقاً أو أخاً لك؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا دخل أبو بكر رضي الله عنه الغار قبل النبي ﷺ؟",
        options: ["ليرتاح أولاً", "ليتفقّد المكان ويسدّ شقوقه قبل أن يدخل النبي ﷺ", "ليأخذ الطعام", "لأنه وصل قبله"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قطعة من ثوب", description: "قطعة قماش تذكّرك بمن مزّق ثوبه ليحمي غيره." },
      badge: "صاحبٌ وفيّ",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، والمستدرك للحاكم",
      note: "أصل مبيت النبي ﷺ وأبي بكر في الغار ثابت بالقرآن وصحيح البخاري؛ وأما تفصيل سدّ الجحور واللدغة فمن أخبار السيرة، وفي إسناده كلام عند أهل العلم.",
    },
  },
  {
    storyId: "st-6-07",
    stationId: 6,
    slug: "spider-and-dove",
    image: "/stories/seerah/spider-and-dove.jpg",
    en: {
      title: "Fragile Threads, and Soldiers You Cannot See",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The horsemen of Quraysh followed the tracks until they stood at the mouth of the cave. The Seerah books mention that a spider had woven over the opening and a dove had nested there, so they said: no one could have gone in past all this — and they turned away. What the Quran itself tells us is that Allah protected him, and sent down His tranquillity upon him.",
          shortLesson: "Allah's protection needs no army; the frailest means is enough.",
        },
        tier_2_age_9_11: {
          narrative:
            "The horsemen of Quraysh followed the tracks to Mount Thawr and searched it until they were at the very mouth of the cave — so close that Abu Bakr said: if one of them looked down at his feet, he would see us. Yet they were kept from them and did not go in, and they went back empty-handed. The Seerah books mention that a spider had woven its threads across the opening and a dove had nested there, so the men said: if anyone had gone in, the web would be torn and the dove would have flown. That account is famous among people, but it has not been established with a strong chain by the scholars of hadith. What is beyond doubt is what the Quran tells us: that Allah gave him victory and sent down His tranquillity upon him, and that He has soldiers no one knows but Him.",
          details:
            "Allah says: ﴿وَمَا يَعْلَمُ جُنُودَ رَبِّكَ إِلَّا هُوَ﴾ — “and none knows the soldiers of your Lord except Him.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ and Abu Bakr stayed in the cave three nights, until the search for them slackened.",
        value: { name: "Trust in Allah's protection", icon: "🕸️" },
        thinkQuestion: "Why does Allah sometimes protect through the weakest means rather than the strongest?",
        challenge: {
          type: "multiple_choice",
          question: "What does the Quran tell us about the Prophet's protection in the cave?",
          options: ["That an army protected him", "That Allah gave him victory and sent down His tranquillity upon him", "That he left by another entrance", "That nobody looked for him"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A single thread", description: "One thread: safety comes from Allah, not from the strength of the means." },
        badge: "Trusting in Allah's Care",
      },
      source: {
        reliability: "🟡",
        reference: "The Quran, Surah At-Tawbah: 40, and Sahih al-Bukhari",
        note: "Allah screening the Prophet ﷺ in the cave and sending down tranquillity is established in the Quran and al-Bukhari. The spider and the dove are widely repeated but not established with a strong chain, so they are given here as Seerah lore, not as established fact.",
      },
    },
    title: "خيوطٌ واهية وجنود لا تُرى",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء فرسان قريش يتبعون الأثر حتى وقفوا عند باب الغار. ويُذكر في كتب السيرة أن عنكبوتاً نسج على الباب وأن حمامة عشّشت أمامه، فقالوا: لو دخل أحد هنا ما بقي هذا كله. فانصرفوا. والذي في القرآن أن الله هو الذي حماه، وأنزل عليه سكينته.",
        shortLesson: "حماية الله لا تحتاج جيشاً؛ يكفيها أضعف الأسباب.",
      },
      tier_2_age_9_11: {
        narrative:
          "تتبّع فرسان قريش الأثر حتى بلغوا جبل ثور، وبحثوا فيه حتى صاروا عند باب الغار نفسه، حتى قال أبو بكر: لو أن أحدهم نظر تحت قدميه لرآنا. فحُجبوا عنهما ولم يدخلوا، ورجعوا خائبين. ويُذكر في كتب السيرة أن عنكبوتاً نسج خيوطه على فتحة الغار، وأن حمامة عشّشت هناك، فقال القوم: لو دخل أحد هنا لتمزّق النسج وطارت الحمامة — وهذا خبر مشهور بين الناس، لكنه لم يثبت بإسناد قويّ عند أهل الحديث. أما الذي لا شكّ فيه فهو ما أخبر به القرآن: أن الله نصره وأنزل عليه سكينته، وأن له جنوداً لا يعلمها إلا هو.",
        details:
          "قال تعالى: ﴿وَمَا يَعْلَمُ جُنُودَ رَبِّكَ إِلَّا هُوَ﴾.",
      },
    },
    interactive: {
      discover: "بقي النبي ﷺ وأبو بكر في الغار ثلاث ليال حتى فترت عنهما قريش.",
      value: { name: "الثقة في حفظ الله", icon: "🕸️" },
      thinkQuestion:
        "لماذا يحمي الله أحياناً بأضعف الأسباب لا بأقواها؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا أخبرنا القرآن عن حماية النبي ﷺ في الغار؟",
        options: ["أن جيشاً حماه", "أن الله نصره وأنزل عليه سكينته", "أنه خرج من باب آخر", "أنه لم يبحث عنه أحد"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "خيط رقيق", description: "خيط واحد يذكّرك أن الحفظ من الله لا من قوة السبب." },
      badge: "واثق بحفظ الله",
    },
    source: {
      reliability: "🟡",
      reference: "القرآن الكريم، سورة التوبة: ٤٠، وصحيح البخاري",
      note: "حجب الله للنبي ﷺ في الغار وإنزال السكينة ثابت بالقرآن والبخاري. وأما خبر العنكبوت والحمامة فمشهور على الألسنة، ولم يثبت بإسناد قويّ، فذكرناه على أنه من أخبار السيرة لا من الثابت.",
    },
  },
  {
    storyId: "st-6-08",
    stationId: 6,
    slug: "do-not-be-sad",
    image: "/stories/seerah/do-not-be-sad.jpg",
    en: {
      title: "Do Not Grieve — Allah Is With Us",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Abu Bakr heard the men above the cave and said: Messenger of Allah, if one of them looked down at his feet he would see us! The Prophet ﷺ answered him calmly: “What do you think of two whose third is Allah?” and “Do not grieve — Allah is with us.” And Abu Bakr's heart settled.",
          shortLesson: "Certainty in Allah calms the heart at the most dangerous moment.",
        },
        tier_2_age_9_11: {
          narrative:
            "Abu Bakr heard the voices and footsteps of the idolaters above the cave, and he was afraid — not for himself, but for the Messenger of Allah ﷺ. He said: Messenger of Allah, if one of them looked down at his feet he would see us! The Prophet ﷺ looked at him calmly and said: “What do you think of two whose third is Allah?” and “Do not grieve — Allah is with us.” He added nothing more, and Abu Bakr's fear left him. Allah preserved this moment in His Book: the cave, the words the Prophet ﷺ said to his companion, and the tranquillity Allah sent down upon him.",
          details:
            "Allah says: ﴿إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾ — “when he said to his companion, do not grieve; Allah is with us.”",
        },
      },
      interactive: {
        discover: "That single sentence — “do not grieve, Allah is with us” — is a verse Muslims still recite today.",
        value: { name: "Stillness and certainty", icon: "🌙" },
        thinkQuestion: "What is something someone says to you that takes your fear away?",
        challenge: {
          type: "multiple_choice",
          question: "How did the Prophet ﷺ reassure Abu Bakr in the cave?",
          options: ["He told him the men had gone", "He said: do not grieve, Allah is with us", "He told him to leave", "He gave him a sword"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small crescent", description: "A crescent for the night when fear was near and calm was nearer." },
        badge: "A Settled Heart",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah At-Tawbah: 40, and Sahih al-Bukhari",
        note: "The story is established in the text of the Quran, and the words “two whose third is Allah” are in Sahih al-Bukhari.",
      },
    },
    title: "لا تحزن إن الله معنا",
    content: {
      tier_1_age_6_8: {
        narrative:
          "سمع أبو بكر أصوات القوم فوق الغار، فقال: يا رسول الله، لو أن أحدهم نظر تحت قدميه لرآنا! فقال له النبي ﷺ وهو هادئ: «ما ظنّك باثنين الله ثالثهما؟» و«لا تحزن إن الله معنا». فسكن قلب أبي بكر.",
        shortLesson: "اليقين بالله يهدّئ القلب في أخطر لحظة.",
      },
      tier_2_age_9_11: {
        narrative:
          "سمع أبو بكر رضي الله عنه أصوات المشركين وأقدامهم فوق الغار، فخاف — لا على نفسه، بل على رسول الله ﷺ — فقال: يا رسول الله، لو أن أحدهم نظر تحت قدميه لأبصرنا! فنظر إليه النبي ﷺ هادئاً وقال: «ما ظنّك باثنين الله ثالثهما؟»، وقال له: «لا تحزن إن الله معنا». فما زاد على هذه الكلمات، فسكنت نفس أبي بكر وذهب خوفه. وقد خلّد الله هذا الموقف في كتابه، فذكر الغار، وذكر قول النبي ﷺ لصاحبه، وذكر أنه أنزل عليه سكينته.",
        details:
          "قال تعالى: ﴿ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا فَأَنزَلَ اللَّهُ سَكِينَتَهُ عَلَيْهِ﴾.",
      },
    },
    interactive: {
      discover: "هذه الكلمة الواحدة «لا تحزن إن الله معنا» صارت آية يقرؤها المسلمون إلى اليوم.",
      value: { name: "السكينة واليقين", icon: "🌙" },
      thinkQuestion:
        "ما الكلمة التي يقولها لك أحدهم فتهدّئ خوفك؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ طمأن النبي ﷺ أبا بكر في الغار؟",
        options: ["أخبره أن القوم رحلوا", "قال: لا تحزن إن الله معنا", "أمره أن يخرج", "أعطاه سيفاً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "هلال صغير", description: "هلال يذكّرك بليلة كان الخوف فيها قريباً والسكينة أقرب." },
      badge: "ساكن القلب",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة التوبة: ٤٠، وصحيح البخاري",
      note: "القصة ثابتة بنصّ القرآن، وحديث «ما ظنّك باثنين الله ثالثهما» في صحيح البخاري.",
    },
  },
  {
    storyId: "st-6-09",
    stationId: 6,
    slug: "expert-guide",
    image: "/stories/seerah/expert-guide.jpg",
    en: {
      title: "An Expert Guide Who Was Not a Muslim",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh were watching the usual road to Madinah, so the Prophet ﷺ took the coastal route — rough country that people did not travel. He hired an expert guide named Abdullah ibn Urayqit, who followed his people's religion and was not a Muslim, but who was skilled and kept his word — so the Prophet ﷺ trusted him with the road.",
          shortLesson: "Choose for a job the person who does it well and keeps a trust.",
        },
        tier_2_age_9_11: {
          narrative:
            "Quraysh had put watchers on the usual road to Madinah, so the Prophet ﷺ and Abu Bakr planned to take the coastal route: rough country that people did not normally travel, where no one would look for them. And because the desert cannot be crossed without someone who knows it, they hired a man skilled in its paths, Abdullah ibn Urayqit. He followed his people's religion and was not a Muslim — and still the Prophet ﷺ trusted him with the most dangerous journey of his life, because he was good at his work and known for keeping his word. They handed him the two mounts, and three nights later he met them at the cave and they set off. Skill and trustworthiness are recognised in whoever has them, and work is given to the one who can do it.",
          details:
            "Allah says: ﴿وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا﴾ — “and fulfil the covenant; the covenant will be asked about.”",
        },
      },
      interactive: {
        discover: "The road they took was the coastal route — longer than the usual road, but far better hidden.",
        value: { name: "Trustworthiness and skill", icon: "🧭" },
        thinkQuestion: "When you need help with something you don't know, who do you pick, and why?",
        challenge: {
          type: "multiple_choice",
          question: "What was the guide the Prophet ﷺ hired like?",
          options: ["He was one of his closest companions", "He knew the roads and kept his word, though he was not a Muslim", "He was the youngest of them", "He knew only Mecca"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An old compass", description: "A compass: the work goes to whoever can do it well." },
        badge: "Chooser of the Right Hand",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The hiring of Abdullah ibn Urayqit as guide, and that he followed the religion of Quraysh, are established in Sahih al-Bukhari's account of the migration.",
      },
    },
    title: "دليلٌ خبير من غير أهل الإسلام",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كانت قريش ترقب الطريق المعتاد إلى المدينة، فاختار النبي ﷺ طريق الساحل، وهو طريق وعر لا يسلكه الناس. واستأجر دليلاً خبيراً بالطرق اسمه عبد الله بن أُريقط، وكان على دين قومه لا مسلماً، لكنه كان ماهراً أميناً يحفظ العهد، فأمّنه النبي ﷺ على الطريق.",
        shortLesson: "اختر لعملك من يُحسنه ويحفظ الأمانة.",
      },
      tier_2_age_9_11: {
        narrative:
          "كانت قريش قد وضعت الرقباء على الطريق المعتاد إلى المدينة، فخطّط النبي ﷺ وأبو بكر أن يسلكا طريق الساحل، وهو طريق وعر لا يسلكه الناس عادة، حتى لا يُهتدى إليهما. ولأن الصحراء لا تُقطع بغير خبير، استأجرا رجلاً ماهراً بالطرق يُقال له عبد الله بن أُريقط. وكان هذا الرجل على دين قومه لم يكن مسلماً، ومع ذلك أمّنه النبي ﷺ على أخطر رحلة في حياته، لأنه كان بارعاً في عمله معروفاً بالوفاء بالعهد. فسلّما إليه الراحلتين، ثم لقيهما بعد ثلاث ليالٍ عند الغار، وانطلقوا. الأمانة والمهارة يُقدَّران في أهلهما، والعمل يُسنَد إلى من يُحسنه.",
        details:
          "قال تعالى: ﴿وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا﴾.",
      },
    },
    interactive: {
      discover: "سُمّي الطريق الذي سلكوه «طريق الساحل»، وهو أطول من الطريق المعتاد لكنه أخفى.",
      value: { name: "الأمانة والمهارة", icon: "🧭" },
      thinkQuestion:
        "إذا احتجت مساعدة في أمر لا تعرفه، فمَن تختار ولماذا؟",
      challenge: {
        type: "multiple_choice",
        question: "ما صفة الدليل الذي استأجره النبي ﷺ؟",
        options: ["كان من أقرب أصحابه", "كان خبيراً بالطرق أميناً يحفظ العهد وإن لم يكن مسلماً", "كان أصغر القوم", "كان يعرف مكة فقط"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بوصلة قديمة", description: "بوصلة تذكّرك أن العمل يُسنَد إلى من يُحسنه." },
      badge: "حَسَنُ الاختيار",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "استئجار عبد الله بن أُريقط دليلاً، وكونه على دين قريش، ثابت في صحيح البخاري في حديث الهجرة.",
    },
  },
  {
    storyId: "st-6-10",
    stationId: 6,
    slug: "umm-mabad-tent",
    image: "/stories/seerah/umm-mabad-tent.jpg",
    en: {
      title: "Umm Ma'bad's Tent, and a Sheep With No Milk",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On the way the travellers passed the tent of a generous woman called Umm Ma'bad. They asked to buy food and she had none — it was a dry year. The Prophet ﷺ saw a thin sheep, asked her permission to milk it, mentioned Allah's name and prayed — and it gave milk. He gave everyone to drink, and drank last himself.",
          shortLesson: "A leader serves everyone else, and drinks last.",
        },
        tier_2_age_9_11: {
          narrative:
            "On the way the travellers passed the tent of a generous woman called Umm Ma'bad of Khuza'ah. They asked to buy meat or dates, and she apologised: it was a dry year and she had nothing to sell. The Prophet ﷺ saw a thin sheep at the side of the tent and asked, “What is this sheep, Umm Ma'bad?” She said: hunger has left her behind the flock. He asked, “Does she have milk?” She said: she is too weak for that. He asked her permission to milk her, and she said: if there is milk in her, then milk her. He wiped her udder, mentioned Allah's name and prayed, and she gave milk — enough to fill a vessel for the whole company. He gave Umm Ma'bad to drink first until she had had her fill, then his companions, then drank last himself, and then milked the sheep again and left the milk with her.",
          details:
            "Allah says of blessing: ﴿لَفَتَحْنَا عَلَيْهِم بَرَكَاتٍ مِّنَ السَّمَاءِ وَالْأَرْضِ﴾ — “We would have opened to them blessings from the heaven and the earth.”",
        },
      },
      interactive: {
        discover: "Umm Ma'bad described the Prophet ﷺ to her husband in such careful detail that it became one of the most famous descriptions of him.",
        value: { name: "Putting others first", icon: "🥛" },
        thinkQuestion: "When did you last let someone else go before you in something you wanted?",
        challenge: {
          type: "multiple_choice",
          question: "Who did the Prophet ﷺ give to drink first at Umm Ma'bad's tent?",
          options: ["He drank first himself", "Umm Ma'bad, then his companions, and he drank last", "Only the guide", "No one drank"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A bowl of milk", description: "A bowl for the one who served everyone and drank last." },
        badge: "Generous and Selfless",
      },
      source: {
        reliability: "🟡",
        reference: "Al-Hakim's Mustadrak, and al-Bayhaqi's Dala'il",
        note: "The account of Umm Ma'bad is well known, reported by al-Hakim, al-Bayhaqi and at-Tabarani; some scholars graded it good while others questioned its chain, so it is famous rather than agreed to be authentic.",
      },
    },
    title: "خيمة أم مَعبَد وشاةٌ لا لبن فيها",
    content: {
      tier_1_age_6_8: {
        narrative:
          "مرّ الركب في الصحراء بخيمة امرأة كريمة تُسمّى أم مَعبَد، فطلبوا طعاماً فما وجدت عندها شيئاً، فالسنة جدبة. ورأى النبي ﷺ شاة هزيلة، فاستأذنها في حلبها، فسمّى الله ودعا، فدرّت باللبن. فسقى القوم وشرب هو آخرهم.",
        shortLesson: "القائد يسقي الناس ويشرب آخرهم.",
      },
      tier_2_age_9_11: {
        narrative:
          "مرّ الركب في طريقه بخيمة امرأة كريمة تُسمّى أم مَعبَد الخزاعية، فسألوها لحماً أو تمراً يشترونه، فاعتذرت أن السنة جدبة وليس عندها ما تبيع. ورأى النبي ﷺ شاة هزيلة في ناحية الخيمة فقال: «ما هذه الشاة يا أم معبد؟» قالت: شاة خلّفها الجهد عن الغنم. فقال: «أبها من لبن؟» قالت: هي أجهد من ذلك. فاستأذنها في حلبها، فقالت: إن كان بها لبن فاحلبها. فمسح ضرعها وسمّى الله ودعا، فدرّت باللبن، فحلب في إناء يكفي القوم. فسقى أم معبد أولاً حتى رويت، ثم سقى أصحابه، ثم شرب هو آخرهم، ثم حلب لها مرة أخرى وتركه عندها.",
        details:
          "قال تعالى في نزول البركة: ﴿وَلَوْ أَنَّ أَهْلَ الْقُرَىٰ آمَنُوا وَاتَّقَوْا لَفَتَحْنَا عَلَيْهِم بَرَكَاتٍ مِّنَ السَّمَاءِ وَالْأَرْضِ﴾.",
      },
    },
    interactive: {
      discover: "وصفت أم معبد النبي ﷺ لزوجها وصفاً دقيقاً جميلاً، فصار من أشهر ما وُصف به ﷺ.",
      value: { name: "الإيثار والبركة", icon: "🥛" },
      thinkQuestion:
        "متى كانت آخر مرة قدّمت غيرك على نفسك في شيء تحبّه؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن سقى النبي ﷺ أولاً في خيمة أم معبد؟",
        options: ["شرب هو أولاً", "سقى أم معبد، ثم أصحابه، وشرب هو آخرهم", "سقى الدليل وحده", "لم يشرب أحد"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قدح لبن", description: "قدح يذكّرك بمن سقى الناس وشرب آخرهم." },
      badge: "مؤثِرٌ كريم",
    },
    source: {
      reliability: "🟡",
      reference: "المستدرك للحاكم، ودلائل النبوة للبيهقي",
      note: "حديث أم معبد مشهور مرويّ عند الحاكم والبيهقي والطبراني، وحسّنه بعض أهل العلم وتكلّم آخرون في إسناده، فهو من المشهور لا من المتّفق على تصحيحه.",
    },
  },
  {
    storyId: "st-6-11",
    stationId: 6,
    slug: "suraqa-and-hundred-camels",
    image: "/stories/seerah/suraqa-and-hundred-camels.jpg",
    en: {
      title: "A Hundred Camels, and a Horse That Sank",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Quraysh promised a hundred camels to whoever brought the Prophet ﷺ back. Suraqah ibn Malik wanted them and rode after him — and when he drew near, his horse's legs sank into the ground and threw him. He mounted again, and again it sank. He knew then that this affair was under protection, asked for safety, and went back turning people away from the road.",
          shortLesson: "Greed brings loss, and what Allah protects cannot be overcome.",
        },
        tier_2_age_9_11: {
          narrative:
            "Quraysh promised a hundred camels to whoever brought back the Prophet ﷺ or Abu Bakr, and Suraqah ibn Malik — a skilled horseman — wanted them. He took his weapons and his horse and rode after them. Abu Bakr kept looking back in fear while the Prophet ﷺ recited and did not turn round. When Suraqah came close, his horse's legs sank into the ground up to the knees and threw him off. He got up and mounted again, and as soon as he was settled it sank again. Then Suraqah knew that this affair was under a protection he could not reach, so he called out asking for safety, and they granted it. He asked the Prophet ﷺ for a written guarantee, and it was written for him. Suraqah went back turning people away from that road, saying: this side has been searched. And later he became a Muslim.",
          details:
            "Allah says: ﴿وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ وَاللَّهُ خَيْرُ الْمَاكِرِينَ﴾ — “they plan, and Allah plans; and Allah is the best of planners.”",
        },
      },
      interactive: {
        discover: "The Seerah books say the Prophet ﷺ told him he would one day wear the bracelets of Khosrau — which happened in the caliphate of Umar.",
        value: { name: "Learning from where greed leads", icon: "🐎" },
        thinkQuestion: "Have you ever seen someone give up something they wanted once they realised they were in the wrong? How would you do it?",
        challenge: {
          type: "multiple_choice",
          question: "What happened to Suraqah as he chased the Prophet ﷺ?",
          options: ["He caught him", "His horse's legs sank into the ground and threw him, and he asked for safety", "He lost the road", "He turned back at the start"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A horse's hoof", description: "A hoofprint for the rider who was fastest and still did not arrive." },
        badge: "One Who Took Heed",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "Suraqah and his horse sinking are established in Sahih al-Bukhari's account of the migration; the promise of Khosrau's bracelets comes from the Seerah literature and the Musnad.",
      },
    },
    title: "مئة ناقة وفرسٌ ساخت قوائمه",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جعلت قريش مئة ناقة لمن يردّ النبي ﷺ. فطمع سُراقة بن مالك فتبعه على فرسه، فلما قرب ساخت قوائم فرسه في الأرض فسقط، فعاد وحاول فسقط ثانية. فأيقن أن أمر النبي ﷺ محفوظ، فطلب الأمان، وعاد يصرف الناس عن الطريق.",
        shortLesson: "الطمع يورث الخسارة، وحفظ الله لا يُغلَب.",
      },
      tier_2_age_9_11: {
        narrative:
          "جعلت قريش لمن يردّ النبي ﷺ أو أبا بكر مئة ناقة، فطمع فيها سُراقة بن مالك — وكان فارساً ماهراً — فلبس سلاحه وأخذ فرسه ولحق بهما. وكان أبو بكر يلتفت خائفاً، والنبي ﷺ يقرأ لا يلتفت. فلما دنا منهم ساخت قوائم فرسه في الأرض حتى بلغت الرُكب، فوقع عنه. فقام وردّها، فلما استوى عليها ساخت مرة أخرى. فعلم سُراقة أن هذا الأمر محفوظ لا يُنال، فنادى القوم يطلب الأمان، فأمّنوه. وسأل النبي ﷺ أن يكتب له كتاب أمن فكتب له. فرجع سُراقة يصرف الناس عن الطريق ويقول: قد كُفيتم هذه الناحية. وأسلم بعد ذلك.",
        details:
          "قال تعالى: ﴿وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ وَاللَّهُ خَيْرُ الْمَاكِرِينَ﴾.",
      },
    },
    interactive: {
      discover: "جاء في كتب السيرة أن النبي ﷺ بشّره بأن يلبس سِوارَي كسرى، فكان ذلك في خلافة عمر رضي الله عنه.",
      value: { name: "الاعتبار بعاقبة الطمع", icon: "🐎" },
      thinkQuestion:
        "هل ترك أحدٌ يوماً شيئاً يشتهيه لأنه أدرك أنه على خطأ؟ كيف تفعل ذلك أنت؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا حدث لسُراقة وهو يطارد النبي ﷺ؟",
        options: ["أدركه", "ساخت قوائم فرسه في الأرض فسقط، فطلب الأمان", "ضلّ الطريق", "رجع من أول الطريق"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حافر فرس", description: "حافر يذكّرك بمن سبق ولم يُدرك." },
      badge: "مُعتبِر",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "خبر سُراقة وسوخ قوائم فرسه ثابت في صحيح البخاري في حديث الهجرة؛ وأما بشارة سِوارَي كسرى فمن أخبار السيرة والمسند.",
    },
  },
  {
    storyId: "st-6-12",
    stationId: 6,
    slug: "buraida-white-banner",
    image: "/stories/seerah/buraida-white-banner.jpg",
    en: {
      title: "Buraydah, and a Turban That Became a Banner",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Buraydah ibn al-Husayb rode out with seventy of his people after the reward Quraysh had promised. When they met the Prophet ﷺ he asked their names and spoke to them gently about Islam — and they all became Muslims in one sitting. Buraydah untied his turban, fastened it to his spear as a white banner, and they rode on guarding the Prophet ﷺ.",
          shortLesson: "A gentle word wins people a sword never could.",
        },
        tier_2_age_9_11: {
          narrative:
            "Buraydah ibn al-Husayb al-Aslami rode out with seventy of his people looking for the Prophet ﷺ, after the reward Quraysh had promised. When they met him in the desert he did not meet them harshly; he asked, “Who are you?” The man said: Buraydah. The Prophet ﷺ took his name as a good sign, and then spoke to him about Islam gently and easily. The words settled in his heart and in the hearts of his people until they all became Muslims in that one sitting — seventy men after a reward became seventy guards. Then Buraydah wanted the Prophet ﷺ to enter Madinah with honour, so he untied the turban from his head and fastened it to his spear as a white banner, and they rode ahead of him.",
          details:
            "Allah says: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾ — “call to the way of your Lord with wisdom and good counsel.”",
        },
      },
      interactive: {
        discover: "Buraydah later became one of the narrators of hadith; he settled in Basra and then went out to Khurasan.",
        value: { name: "Gentleness in speech", icon: "🏳️" },
        thinkQuestion: "Have you ever answered someone who angered you gently? What happened?",
        challenge: {
          type: "multiple_choice",
          question: "What did Buraydah do after he became a Muslim?",
          options: ["Went back to his people", "Untied his turban as a white banner on his spear and rode guarding the Prophet ﷺ", "Took the reward", "Said nothing and left"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A white banner", description: "A white banner that was once the turban of a man who changed his mind." },
        badge: "Gentle of Speech",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Sa'd's Tabaqat, and al-Bayhaqi's Dala'il",
        note: "The account of Buraydah and his seventy men is reported in the Seerah and Tabaqat literature rather than the two Sahih collections; that he became a Muslim is well established.",
      },
    },
    title: "بُرَيدة وعمامةٌ صارت راية",
    content: {
      tier_1_age_6_8: {
        narrative:
          "خرج بُرَيدة بن الحُصَيب في سبعين رجلاً من قومه يطلبون جائزة قريش. فلما لقوا النبي ﷺ سألهم عن أسمائهم وكلّمهم بلطف عن الإسلام، فأسلموا جميعاً في مجلس واحد. فحلّ بُرَيدة عمامته وربطها في رمحه راية بيضاء، وسار القوم يحرسون النبي ﷺ.",
        shortLesson: "الكلمة اللطيفة تكسب من لا يكسبه السيف.",
      },
      tier_2_age_9_11: {
        narrative:
          "خرج بُرَيدة بن الحُصَيب الأسلمي في سبعين رجلاً من قومه يطلبون النبي ﷺ طمعاً في جائزة قريش. فلما لقوه في الصحراء لم يعاملهم بغلظة، بل سأله: مَن أنت؟ فقال: بُرَيدة. فتفاءل النبي ﷺ باسمه، ثم أخذ يكلّمه في الإسلام كلاماً هيّناً لطيفاً. فوقعت الكلمات في قلبه وقلوب قومه حتى أسلموا جميعاً في مجلس واحد، فصار سبعون طالباً للجائزة سبعين حارساً. ثم أراد بُرَيدة أن يدخل النبي ﷺ المدينة بعزّ، فحلّ عمامته من رأسه وربطها في رمحه فصارت راية بيضاء، وسار القوم بين يديه.",
        details:
          "قال تعالى: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾.",
      },
    },
    interactive: {
      discover: "بُرَيدة رضي الله عنه صار بعد ذلك من رواة الحديث، وسكن البصرة ثم خرج إلى خراسان.",
      value: { name: "لين الكلمة", icon: "🏳️" },
      thinkQuestion:
        "هل جرّبت أن تجيب من أغضبك بلطف؟ ماذا حدث؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل بُرَيدة رضي الله عنه بعد إسلامه؟",
        options: ["رجع إلى قومه", "حلّ عمامته وربطها في رمحه راية بيضاء وسار يحرس النبي ﷺ", "أخذ الجائزة", "سكت ومضى"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "راية بيضاء", description: "راية بيضاء كانت عمامة رجل غيّر رأيه." },
      badge: "لَيِّن الكلمة",
    },
    source: {
      reliability: "🟡",
      reference: "طبقات ابن سعد، ودلائل النبوة للبيهقي",
      note: "خبر بُرَيدة رضي الله عنه وسبعين من قومه مرويّ في كتب السيرة والطبقات، وليس في الصحيحين، وإسلامه رضي الله عنه ثابت معروف.",
    },
  },
  {
    storyId: "st-6-13",
    stationId: 6,
    slug: "quba-first-mosque",
    image: "/stories/seerah/quba-first-mosque.jpg",
    en: {
      title: "Quba, and the First Mosque Built",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ stopped at Quba on the edge of Madinah and stayed some days. The first thing he did was build a mosque, carrying the stones with his companions himself — the first mosque built in Islam. Allah mentions it in the Quran as a mosque founded on piety from the very first day.",
          shortLesson: "The first thing a good community builds is a place that gathers people for good.",
        },
        tier_2_age_9_11: {
          narrative:
            "After days of travel, exhaustion and pursuit, the Prophet ﷺ stopped at Quba on the edge of Madinah and stayed a few days before entering the city. The first thing he did was not to build a house for himself or a market, but a mosque where people could gather. He carried the stones with his own hands and worked alongside his companions rather than standing and giving orders, and the people worked eagerly with him. So the mosque of Quba became the first mosque built in Islam. Allah mentioned this mosque in His Book and described it as founded on piety from the very first day. Afterwards the Prophet ﷺ used to visit it every Saturday, riding and walking.",
          details:
            "Allah says: ﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾ — “a mosque founded on piety from the first day is worthier for you to stand in.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ said that praying in the mosque of Quba is like an Umrah.",
        value: { name: "Doing the work yourself", icon: "🕌" },
        thinkQuestion: "What is the first thing you would build if you made a new place for your friends?",
        challenge: {
          type: "multiple_choice",
          question: "What was the first thing the Prophet ﷺ built at Quba?",
          options: ["A market", "A mosque", "A wall", "A house for himself"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A building stone", description: "A stone like the ones carried by blessed hands." },
        badge: "Builder of Good",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah At-Tawbah: 108, and Sahih al-Bukhari",
        note: "His stay at Quba and the building of its mosque are established in the two Sahih collections, and the mosque is described in Surah At-Tawbah.",
      },
    },
    title: "قُباء وأول مسجد بُني",
    content: {
      tier_1_age_6_8: {
        narrative:
          "نزل النبي ﷺ في قُباء على مشارف المدينة، وأقام فيها أياماً. وأول ما عمل أن بنى مسجداً، فكان يحمل الحجارة مع أصحابه بنفسه، فهو أول مسجد بُني في الإسلام. وذكره الله في القرآن بأنه مسجد أُسّس على التقوى من أول يوم.",
        shortLesson: "أول ما يُبنى في مجتمع صالح بيتٌ يجمع الناس على الخير.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد أيام من السفر والتعب والمطاردة، نزل النبي ﷺ في قُباء على مشارف المدينة، وأقام فيها بضعة أيام قبل أن يدخلها. ولم يكن أول عمله أن يبني بيتاً لنفسه أو سوقاً، بل مسجداً يجتمع فيه الناس. وكان ﷺ ينقل الحجارة مع أصحابه بيديه ويعمل معهم، لا يقف يأمر فقط، فنشط القوم للعمل. فكان مسجد قُباء أول مسجد بُني في الإسلام. وذكر الله هذا المسجد في كتابه ووصفه بأنه أُسّس على التقوى من أول يوم. وكان النبي ﷺ بعد ذلك يزوره كل سبت راكباً وماشياً.",
        details:
          "قال تعالى: ﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾.",
      },
    },
    interactive: {
      discover: "قال النبي ﷺ: «من صلّى في مسجد قباء كان كعُمرة».",
      value: { name: "العمل بالنفس", icon: "🕌" },
      thinkQuestion:
        "ما أول شيء تبنيه لو أنشأت مكاناً جديداً لأصحابك؟",
      challenge: {
        type: "multiple_choice",
        question: "ما أول ما بناه النبي ﷺ في قُباء؟",
        options: ["سوقاً", "مسجداً", "سوراً", "بيتاً لنفسه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حجر بناء", description: "حجر يذكّرك بيدين شريفتين حملتا مثله." },
      badge: "بانٍ للخير",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة التوبة: ١٠٨، وصحيح البخاري",
      note: "نزول النبي ﷺ بقباء وبناء مسجدها ثابت في الصحيحين، ووصفه في سورة التوبة.",
    },
  },
  {
    storyId: "st-6-14",
    stationId: 6,
    slug: "commanded-camel-qaswa",
    image: "/stories/seerah/commanded-camel-qaswa.jpg",
    en: {
      title: "Al-Qaswa, and the House of Abu Ayyub",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ entered Madinah on his camel al-Qaswa, and every time he passed a house the Ansar took hold of her halter, saying: stay with us, Messenger of Allah! He would answer: “Leave her, she is under orders.” She walked on until she knelt at the house of Abu Ayyub al-Ansari — who carried the Prophet's saddle into his home in joy.",
          shortLesson: "Fairness prevents envy; blessing is in hearts, not in the size of houses.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ entered the heart of Madinah riding his camel al-Qaswa, with joyful people all around him. The Ansar loved him deeply, and every time he passed one of their houses its people took hold of the camel's halter and said: Messenger of Allah, stay with us! Every one of them meant it, and every one of them hoped for the honour — so had he chosen one house in particular, others would have felt it. So he answered them gently: “Leave her, she is under orders.” The camel went on until she knelt at the house of Abu Ayyub al-Ansari, who was not among their wealthy — and Abu Ayyub hurried to carry the Prophet's saddle into his house out of sheer joy. The Prophet ﷺ stayed with him until his mosque and his family's rooms were built.",
          details:
            "Allah says: ﴿رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ﴾ — “My Lord, let me land in a blessed place; You are the best to bring to land.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ stayed in Abu Ayyub's house for about seven months, until the mosque and his family's rooms were finished.",
        value: { name: "Fairness between people", icon: "🐪" },
        thinkQuestion: "How do you choose between two people inviting you at the same time without hurting either?",
        challenge: {
          type: "multiple_choice",
          question: "At whose house did the Prophet's camel kneel in Madinah?",
          options: ["The richest of the Ansar", "Abu Ayyub al-Ansari's house", "Abu Bakr's house", "Buraydah's house"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A camel's halter", description: "A halter for a leader who would not favour one person over another." },
        badge: "Fair and Wise",
      },
      source: {
        reliability: "🟡",
        reference: "Sahih al-Bukhari, and Ibn Hisham's Seerah",
        note: "That the Prophet ﷺ stayed with Abu Ayyub al-Ansari is established in the Sahih; the wording “leave her, she is under orders” comes from Ibn Ishaq's Seerah.",
      },
    },
    title: "القصواء وبيتُ أبي أيوب",
    content: {
      tier_1_age_6_8: {
        narrative:
          "دخل النبي ﷺ المدينة على ناقته القصواء، فكان الأنصار كلما مرّ ببيتٍ أخذوا بزمامها يقولون: انزل عندنا يا رسول الله! فكان يقول: «دعوها فإنها مأمورة». فمشت حتى بركت عند بيت أبي أيوب الأنصاري رضي الله عنه، فحمل رحله إلى بيته فرحاً.",
        shortLesson: "العدل يمنع الحسد، والبركة في القلوب لا في سعة البيوت.",
      },
      tier_2_age_9_11: {
        narrative:
          "دخل النبي ﷺ قلب المدينة راكباً ناقته القصواء، والناس حوله فرحون. وكان الأنصار يحبّونه حبّاً شديداً، فكلما مرّ ببيتٍ من بيوتهم أخذ أهله بزمام الناقة يقولون: يا رسول الله، انزل عندنا! وكلهم صادق، وكلهم يرجو الشرف. فلو اختار بيتاً بعينه لوجد غيره في نفسه شيئاً. فكان يقول لهم في لطف: «دعوها فإنها مأمورة». فمضت الناقة حتى بركت عند بيت أبي أيوب الأنصاري رضي الله عنه، وكان من غير أغنيائهم، فبادر أبو أيوب فحمل رحل النبي ﷺ إلى بيته من الفرح. فأقام النبي ﷺ عنده حتى بُني مسجده وبيوته.",
        details:
          "قال تعالى: ﴿وَقُل رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ﴾.",
      },
    },
    interactive: {
      discover: "أقام النبي ﷺ في بيت أبي أيوب نحو سبعة أشهر حتى تمّ بناء المسجد وحُجَر أهله.",
      value: { name: "العدل بين الناس", icon: "🐪" },
      thinkQuestion:
        "كيف تختار بين اثنين يدعوانك في وقت واحد بغير أن تجرح أحدهما؟",
      challenge: {
        type: "multiple_choice",
        question: "عند بيت مَن بركت ناقة النبي ﷺ في المدينة؟",
        options: ["بيت أغنى الأنصار", "بيت أبي أيوب الأنصاري رضي الله عنه", "بيت أبي بكر رضي الله عنه", "بيت بُريدة رضي الله عنه"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "زمام ناقة", description: "زمام يذكّرك بقائد لم يُفضّل أحداً على أحد." },
      badge: "عادلٌ حكيم",
    },
    source: {
      reliability: "🟡",
      reference: "صحيح البخاري، وسيرة ابن هشام",
      note: "نزول النبي ﷺ على أبي أيوب الأنصاري رضي الله عنه ثابت في الصحيح؛ وأما لفظ «دعوها فإنها مأمورة» فمن أخبار السيرة عند ابن إسحاق.",
    },
  },
  {
    storyId: "st-6-15",
    stationId: 6,
    slug: "talaa-al-badru",
    image: "/stories/seerah/talaa-al-badru.jpg",
    en: {
      title: "Yathrib Becomes the City of Light",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The whole city came out to meet him: men, women and children, and the children climbed onto the roofs. It was a day of joy such as they had never seen. The Seerah books mention that the young girls sang: the full moon has risen over us. And from that day Yathrib was called “Madinah” — the City.",
          shortLesson: "The finest welcome a guest can receive is glad hearts.",
        },
        tier_2_age_9_11: {
          narrative:
            "The whole city came out to meet the Messenger of Allah ﷺ: men, women and children, and the children and servants climbed onto the roofs to look, asking one another: which of them is the Messenger of Allah? Anas ibn Malik said: I never saw a day finer or brighter than the day the Messenger of Allah ﷺ came to us. The Seerah books mention that young girls beat the hand-drums and sang: “the full moon has risen over us, from the passes of Wada.” From that day the city was no longer called Yathrib but “Madinah” — the City — and al-Madinah al-Munawwarah, the city of light, because Islam now had a homeland, and the believers had a place where they were safe after thirteen years of fear.",
          details:
            "Allah says of those who supported him: ﴿وَاتَّبَعُوا النُّورَ الَّذِي أُنزِلَ مَعَهُ أُولَٰئِكَ هُمُ الْمُفْلِحُونَ﴾ — “and followed the light sent down with him — those are the successful.”",
        },
      },
      interactive: {
        discover: "This migration is the start of the Hijri calendar, by which we still count the years today.",
        value: { name: "Rejoicing in good", icon: "🌕" },
        thinkQuestion: "How do you welcome a dear guest arriving at your home after a long journey?",
        challenge: {
          type: "multiple_choice",
          question: "What did Yathrib come to be called after the Prophet ﷺ arrived?",
          options: ["It stayed Yathrib", "It became “Madinah” — the City of Light", "It was called the second Mecca", "It was called Quba"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A full moon", description: "A full moon for the day a whole city came out to greet its guest." },
        badge: "Glad for Good",
      },
      source: {
        reliability: "🟡",
        reference: "Sahih al-Bukhari, and al-Bayhaqi's Dala'il",
        note: "The joy of the people of Madinah and Anas's words are in the Sahih; the song “the full moon has risen” is famous in the Seerah literature, and scholars have discussed its chain.",
      },
    },
    title: "يثرب تصير المدينة المنوّرة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "خرج أهل المدينة كلهم يستقبلونه: الرجال والنساء والصبيان، حتى صعد الصبيان على البيوت. وكان يوماً ما رأوا مثله فرحاً. وتذكر كتب السيرة أن الجواري كنّ ينشدن: طلع البدر علينا. ومن ذلك اليوم صارت يثرب تُسمّى «المدينة».",
        shortLesson: "أجمل ما يُستقبل به الضيف قلوب فرحة.",
      },
      tier_2_age_9_11: {
        narrative:
          "خرج أهل المدينة كلهم يستقبلون رسول الله ﷺ: الرجال والنساء والصبيان، حتى صعد الصبيان والخدم على ظهور البيوت ينظرون، ويتساءلون: أيّهم رسول الله؟ قال أنس بن مالك رضي الله عنه: ما رأيت يوماً كان أحسن ولا أضوأ من يوم دخل علينا رسول الله ﷺ. وتذكر كتب السيرة أن الجواري كنّ يضربن بالدفوف وينشدن: «طلع البدر علينا من ثنيّات الوداع». ومن ذلك اليوم لم تعد المدينة تُسمّى يثرب، بل صارت «المدينة» و«المدينة المنوّرة»، لأن الإسلام صار لها وطناً، وصار لأهل الإيمان بلد يأمنون فيه بعد ثلاث عشرة سنة من الخوف.",
        details:
          "قال تعالى في وصف من نصروه: ﴿فَالَّذِينَ آمَنُوا بِهِ وَعَزَّرُوهُ وَنَصَرُوهُ وَاتَّبَعُوا النُّورَ الَّذِي أُنزِلَ مَعَهُ أُولَٰئِكَ هُمُ الْمُفْلِحُونَ﴾.",
      },
    },
    interactive: {
      discover: "من هذه الهجرة بدأ التاريخ الهجري الذي نعدّ به سنينا إلى اليوم.",
      value: { name: "الفرح بالخير", icon: "🌕" },
      thinkQuestion:
        "كيف تستقبل ضيفاً عزيزاً يصل إلى بيتكم بعد سفر طويل؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ صارت تُعرف يثرب بعد دخول النبي ﷺ؟",
        options: ["بقيت يثرب", "صارت «المدينة» والمدينة المنوّرة", "سُمّيت مكة الثانية", "سُمّيت قباء"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "بدرٌ مكتمل", description: "بدر يذكّرك بيوم استقبلت فيه مدينة كاملة ضيفها." },
      badge: "فرحٌ بالخير",
    },
    source: {
      reliability: "🟡",
      reference: "صحيح البخاري، ودلائل النبوة للبيهقي",
      note: "فرح أهل المدينة وقول أنس رضي الله عنه في الصحيح؛ وأما نشيد «طلع البدر علينا» فمشهور مرويّ في كتب السيرة، وتكلّم أهل العلم في إسناده.",
    },
  },
  {
    storyId: "st-8-01",
    stationId: 8,
    slug: "hunayn-pride-in-numbers",
    image: "/stories/seerah/hunayn-pride-in-numbers.jpg",
    en: {
      title: "The Lesson of Hunayn: Pride in Numbers",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After the conquest of Mecca the Muslims went out twelve thousand strong — the largest army they had ever gathered. Some looked at their own numbers and said: we will not be beaten today for being few! Then they came down into the narrow valley of Hunayn, where archers ambushed them at dawn, and the ranks broke. Numbers alone do not win anything.",
          shortLesson: "Numbers are no help when humility and trust are missing.",
        },
        tier_2_age_9_11: {
          narrative:
            "Days after the conquest of Mecca, Hawazin and Thaqif gathered their forces against the Muslims, and the Prophet ﷺ went out to meet them with twelve thousand men: the ten thousand who had been with him at the conquest, and two thousand of the people of Mecca. It was the largest army the Muslims had ever put in the field. Some of them looked at that number, and it pleased them, and they said: “We will not be beaten today for being few.” There was more in that sentence than they knew. When they came down into the valley of Hunayn — a narrow pass between hills — the archers of Hawazin were waiting in its bends, and they loosed on the front of the army all at once in the half-light of dawn. The front broke, and many turned back. The lesson was too sharp to forget: victory comes from Allah alone, not from the size of a crowd.",
          details:
            "Allah says: ﴿وَيَوْمَ حُنَيْنٍ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا﴾ — “and on the day of Hunayn, when your great numbers pleased you but availed you nothing.”",
        },
      },
      interactive: {
        discover: "Hunayn is one of only three battles the Quran names, alongside Badr and the Confederates.",
        value: { name: "Humility alongside trust", icon: "⛰️" },
        thinkQuestion: "When did you last feel so sure of winning that you stopped preparing?",
        challenge: {
          type: "multiple_choice",
          question: "What did some of the Muslims say before Hunayn that became their lesson?",
          options: ["We will not be beaten today for being few", "We are too few, let us withdraw", "We do not want to fight", "Let us wait for reinforcements"],
          correctAnswer: 0,
        },
      },
      gamification: {
        artifact: { name: "A pebble from the valley", description: "A pebble to remind you that numbers by themselves are not enough." },
        badge: "Humble in Strength",
      },
      source: {
        reliability: "🟢",
        reference: "The Quran, Surah At-Tawbah: 25, and Sahih al-Bukhari",
        note: "The day of Hunayn and their pleasure at their own numbers are stated in the Quran; the details of the battle are in the two Sahih collections.",
      },
    },
    title: "درس حُنين والغرور بالعدد",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد فتح مكة خرج المسلمون في اثني عشر ألفاً، وهو أكبر جيش خرجوا فيه. فنظر بعضهم إلى كثرتهم وقال: لن نُغلب اليوم من قلة! فلما دخلوا وادي حُنين الضيق، باغتهم الرماة من مضايق الجبل عند الفجر، فاضطربت الصفوف. الكثرة وحدها لا تصنع نصراً.",
        shortLesson: "العدد لا ينفع إذا غاب التواضع والتوكل.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد فتح مكة بأيام، جمعت هوازن وثقيف قواتها لقتال المسلمين، فخرج إليهم النبي ﷺ في اثني عشر ألف مقاتل: عشرة آلاف كانوا معه في الفتح، وألفان من أهل مكة. وكان هذا أكبر جيش خرج فيه المسلمون حتى ذلك اليوم. فنظر بعضهم إلى هذه الكثرة فأعجبته وقال: «لن نُغلب اليوم من قلة». وكان في هذه الكلمة ما فيها. فلما انحدروا في وادي حُنين — وهو وادٍ ضيّق بين جبال — كان رماة هوازن قد كمنوا في مضايقه، فرشقوا مقدّمة الجيش بالسهام في عتمة الفجر رشقاً واحداً، فانكشفت المقدّمة وارتدّ كثير من الناس. فكان الدرس أبلغ من أن يُنسى: النصر من عند الله وحده، لا من كثرة العدد.",
        details:
          "قال تعالى: ﴿وَيَوْمَ حُنَيْنٍ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا﴾.",
      },
    },
    interactive: {
      discover: "حُنين هي المعركة الوحيدة التي ذكر القرآن اسمها مع بدر والأحزاب.",
      value: { name: "التواضع مع التوكل", icon: "⛰️" },
      thinkQuestion:
        "متى شعرت بأن النجاح مضمون فتكاسلت في الاستعداد له؟",
      challenge: {
        type: "multiple_choice",
        question: "ما الذي قاله بعض المسلمين قبل حُنين فكان درساً لهم؟",
        options: ["لن نُغلب اليوم من قلة", "نحن قليلون فلننسحب", "لا نريد القتال", "ننتظر مدداً آخر"],
        correctAnswer: 0,
      },
    },
    gamification: {
      artifact: { name: "حصاة من الوادي", description: "حصاة تذكّرك أن الكثرة وحدها لا تكفي." },
      badge: "متواضع في القوة",
    },
    source: {
      reliability: "🟢",
      reference: "القرآن الكريم، سورة التوبة: ٢٥، وصحيح البخاري",
      note: "ذكر يوم حُنين وإعجابهم بكثرتهم ثابت بنصّ القرآن، وتفصيل المعركة في الصحيحين.",
    },
  },
  {
    storyId: "st-8-02",
    stationId: 8,
    slug: "steadfast-leader-hunayn",
    en: {
      title: "The Leader Who Did Not Move",
      content: {
        tier_1_age_6_8: {
          narrative:
            "While the men fell back, the Prophet ﷺ held his place at the front on his mule and did not take a step backwards, saying: “I am the Prophet, this is no lie; I am the son of Abd al-Muttalib.” He told his uncle al-Abbas — who had a carrying voice — to call out: People of the Tree! And back they came, answering: here we are, here we are — until the day was steady again.",
          shortLesson: "You find out who the leader is when everyone else turns back.",
        },
        tier_2_age_9_11: {
          narrative:
            "At the moment the front broke and the men turned back, the Prophet ﷺ did not move. He held his place on his white mule at the head of the field, going forward towards the enemy, and raised his voice: “I am the Prophet, this is no lie; I am the son of Abd al-Muttalib.” Then he told his uncle al-Abbas ibn Abd al-Muttalib — a man with a carrying voice — to call to the people: “People of the Tree! People of Surah al-Baqarah!”, reminding them of the pledge they had given beneath the tree. The moment they heard it they turned back, answering “here we are, here we are”, until they had gathered around their Prophet. Then they advanced, and Allah sent down His tranquillity upon them, and a day that had begun in confusion ended in victory.",
          details:
            "Allah says: ﴿ثُمَّ أَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ﴾ — “Then Allah sent down His tranquillity upon His Messenger and upon the believers.”",
        },
      },
      interactive: {
        discover: "He rode a mule that day rather than a horse — a mule is no animal for fleeing, so riding one said plainly that he was not going anywhere.",
        value: { name: "Standing firm, and leading", icon: "🛡️" },
        thinkQuestion: "If your whole team panicked, what is the first thing you would do?",
        challenge: {
          type: "multiple_choice",
          question: "What did al-Abbas call out to the people at Hunayn?",
          options: ["People of Mecca", "People of the Tree", "People of Madinah", "Children of Hashim"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A mule's bridle", description: "A bridle for the one who stood while others fell back." },
        badge: "Firm in the Field",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The Prophet's steadfastness at Hunayn, his words, and the call of al-Abbas are all in the two Sahih collections.",
      },
    },
    title: "ثبات القائد في قلب الميدان",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بينما تراجع الناس، ثبت النبي ﷺ على بغلته في المقدّمة ولم يرجع خطوة، وهو يقول: «أنا النبي لا كذب، أنا ابن عبد المطلب». وأمر عمّه العباس — وكان جهير الصوت — أن ينادي: يا أصحاب الشجرة! فرجعوا يقولون: لبيك لبيك، حتى استقام الأمر.",
        shortLesson: "القائد يُعرف حين يتراجع الجميع.",
      },
      tier_2_age_9_11: {
        narrative:
          "في اللحظة التي انكشفت فيها المقدّمة وارتدّ الناس، لم يتحرّك النبي ﷺ من مكانه. ثبت على بغلته البيضاء في مقدّمة الميدان يتقدّم نحو القوم، وهو يرفع صوته: «أنا النبي لا كذب، أنا ابن عبد المطلب». ثم أمر عمّه العباس بن عبد المطلب — وكان رجلاً جهير الصوت — أن ينادي في الناس: «يا أصحاب الشجرة! يا أصحاب سورة البقرة!»، يذكّرهم بالبيعة التي بايعوها تحت الشجرة. فما إن سمعوا النداء حتى انعطفوا راجعين يقولون: «لبيك لبيك»، حتى اجتمعوا حول نبيّهم. ثم تقدّموا فأنزل الله سكينته عليهم، وانتهى اليوم بالنصر بعدما بدأ بالاضطراب.",
        details:
          "قال تعالى: ﴿ثُمَّ أَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ وَأَنزَلَ جُنُودًا لَّمْ تَرَوْهَا﴾.",
      },
    },
    interactive: {
      discover: "اختار النبي ﷺ يومئذ بغلة لا فرساً؛ والبغلة لا تُسرع في الفرار، فكان في ركوبها إعلان أنه ثابت لا يبرح.",
      value: { name: "الثبات والقيادة", icon: "🛡️" },
      thinkQuestion:
        "إذا ارتبك فريقك كله، ما أول شيء تفعله أنت؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ نادى العباس رضي الله عنه في الناس يوم حُنين؟",
        options: ["يا أهل مكة", "يا أصحاب الشجرة", "يا أهل المدينة", "يا بني هاشم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "لجام بغلة", description: "لجام يذكّرك بمن وقف حين تراجع غيره." },
      badge: "ثابت في الميدان",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "ثبات النبي ﷺ يوم حُنين وقوله «أنا النبي لا كذب» ونداء العباس رضي الله عنه — كلها في الصحيحين.",
    },
  },
  {
    storyId: "st-8-03",
    stationId: 8,
    slug: "army-of-hardship-tabuk",
    image: "/stories/seerah/army-of-hardship-tabuk.jpg",
    en: {
      title: "The Army of Hardship, and a Race to Give",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Word came that the Byzantines were gathering on the Syrian frontier — in the height of summer, with the fruit ripe on the trees. The Prophet ﷺ called the people out, and supplies were so short that it was called the Army of Hardship. The companions raced to give: Abu Bakr brought everything he owned, Umar half of his, and Uthman equipped a large part of the army.",
          shortLesson: "Real giving shows in a hard season, not an easy one.",
        },
        tier_2_age_9_11: {
          narrative:
            "Word reached the Prophet ﷺ that the Byzantines were massing an army on the Syrian frontier, and he called the Muslims out. The timing could not have been harder: the peak of summer heat, the fruit ripe and everyone wanting to stay with it, a long road ahead, and supplies so short that two men took turns on one camel. That is why it was called the Army of Hardship. When the Prophet ﷺ called for contributions, the companions raced one another as they never had: Abu Bakr brought everything he owned, and when the Prophet ﷺ asked him, “What did you leave for your family?”, he answered: I left them Allah and His Messenger. Umar brought half of his wealth. Uthman equipped a large part of the army with camels and money, and the Prophet ﷺ said something remarkable about him for it. The race was not for spoils. It was for who could give the most.",
          details:
            "Allah says: ﴿الَّذِينَ اتَّبَعُوهُ فِي سَاعَةِ الْعُسْرَةِ﴾ — “those who followed him in the hour of hardship.”",
        },
      },
      interactive: {
        discover: "Tabuk was the last expedition the Prophet ﷺ went out on himself.",
        value: { name: "Giving when it is hard", icon: "🐪" },
        thinkQuestion: "What is something you love that you could give to someone who needs it more?",
        challenge: {
          type: "multiple_choice",
          question: "What did Abu Bakr answer when asked what he had left for his family?",
          options: ["I left them half the money", "I left them Allah and His Messenger", "He left nothing and said nothing", "I left them the house"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small purse", description: "A purse for the man who gave everything and was not afraid." },
        badge: "First to Give",
      },
      source: {
        reliability: "🟡",
        reference: "Sunan Abi Dawud and at-Tirmidhi, and the Quran, Surah At-Tawbah: 117",
        note: "The expedition and the hour of hardship are in the Quran and the Sahih collections; Abu Bakr giving all his wealth and Uthman equipping the army come from the Sunan, graded good by some scholars while others questioned some of the wordings.",
      },
    },
    title: "جيش العُسرة وتنافس الكرماء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء الخبر أن الروم يحشدون على حدود الشام، والوقت صيف شديد الحر والثمار قد نضجت. فدعا النبي ﷺ الناس إلى الخروج، وكان الزاد قليلاً حتى سُمّي «جيش العُسرة». فتسابق الصحابة في البذل: جاء أبو بكر بكل ماله، وعمر بنصف ماله، وجهّز عثمان جزءاً كبيراً من الجيش.",
        shortLesson: "العطاء الحقيقي يظهر وقت الضيق لا وقت السَّعة.",
      },
      tier_2_age_9_11: {
        narrative:
          "بلغ النبي ﷺ أن الروم يجمعون جيشاً على حدود الشام، فدعا المسلمين إلى الخروج. وكان الوقت أصعب ما يكون: قيظ الصيف، والثمار قد أينعت والناس يحبّون أن يقيموا عندها، والمسافة بعيدة، والزاد قليل حتى كان الرجلان يتعاقبان على بعير واحد. ولذلك سُمّي «جيش العُسرة». فلما دعا النبي ﷺ إلى النفقة، تسابق الصحابة تسابقاً لم يُر مثله: جاء أبو بكر رضي الله عنه بماله كلّه، فسأله النبي ﷺ: «ما أبقيتَ لأهلك؟» قال: أبقيتُ لهم الله ورسوله. وجاء عمر رضي الله عنه بنصف ماله. وجهّز عثمان رضي الله عنه جزءاً كبيراً من الجيش بالإبل والمال، حتى قال فيه النبي ﷺ كلمة عظيمة. لم يكن السباق على الغنيمة، بل على العطاء.",
        details:
          "قال تعالى: ﴿لَقَد تَّابَ اللَّهُ عَلَى النَّبِيِّ وَالْمُهَاجِرِينَ وَالْأَنصَارِ الَّذِينَ اتَّبَعُوهُ فِي سَاعَةِ الْعُسْرَةِ﴾.",
      },
    },
    interactive: {
      discover: "كانت غزوة تبوك آخر غزوة خرج فيها النبي ﷺ بنفسه.",
      value: { name: "البذل عند الشدّة", icon: "🐪" },
      thinkQuestion:
        "ما الشيء الذي تحبّه وتستطيع أن تعطيه لمن يحتاجه أكثر منك؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ أجاب أبو بكر رضي الله عنه حين سُئل: ما أبقيتَ لأهلك؟",
        options: ["أبقيت لهم نصف المال", "أبقيت لهم الله ورسوله", "لم أُبقِ شيئاً ولم أُجب", "أبقيت لهم البيت"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "صُرّة صغيرة", description: "صُرّة تذكّرك بمن أعطى كل ما يملك وهو مطمئن." },
      badge: "سبّاق في العطاء",
    },
    source: {
      reliability: "🟡",
      reference: "سنن أبي داود والترمذي، والقرآن الكريم، سورة التوبة: ١١٧",
      note: "أصل غزوة تبوك وساعة العسرة في القرآن والصحيحين؛ وأما خبر أبي بكر بماله كلّه وتجهيز عثمان فمن رواية السنن، حسّنها بعض أهل العلم وتكلّم آخرون في بعض ألفاظها.",
    },
  },
  {
    storyId: "st-8-04",
    stationId: 8,
    slug: "weepers-and-true-repentance",
    image: "/stories/seerah/weepers-and-true-repentance.jpg",
    en: {
      title: "Those Who Wept, and the Man Saved by Telling the Truth",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Poor companions came asking for mounts so they could go with the army, and the Prophet ﷺ said: “I have nothing to carry you on.” They turned away with tears pouring down, grieving that they had nothing to give — and the Quran named them. Ka'b ibn Malik and two others stayed behind with no excuse, and when the army returned he told the truth instead of inventing one, and Allah accepted his repentance.",
          shortLesson: "Telling the truth saves you, even when owning up is hard.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet ﷺ called the people out, some of the poorer companions came asking for mounts, and he said: “I have nothing to carry you on.” They turned away with their eyes overflowing, grieving that they had nothing to spend — and Allah mentioned them in His Book; people called them “the weepers”. They wanted to go and could not, and the reward of those who went was written for them. On the other side, three truthful companions stayed behind with no excuse at all — among them Ka'b ibn Malik — simply putting it off, one day after another. When the army came back, the hypocrites came with invented excuses and were taken at their word, and Ka'b came and told the truth and made nothing up. The Prophet ﷺ told the people not to speak to the three for fifty nights, until the earth closed in on them for all its wideness — and then the Quran came down accepting their repentance. Ka'b said afterwards: Allah has given me no gift after Islam greater than my telling the truth.",
          details:
            "Allah says of them: ﴿حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ﴾ — “until the earth closed in on them for all its vastness.”",
        },
      },
      interactive: {
        discover: "Ka'b's account is one of the longest hadiths in Sahih al-Bukhari — he tells the whole story about himself.",
        value: { name: "Truthfulness", icon: "💧" },
        thinkQuestion: "When did you last tell the truth knowing it would cost you something?",
        challenge: {
          type: "multiple_choice",
          question: "Why was Ka'b ibn Malik saved in the end?",
          options: ["He gave an acceptable excuse", "He told the truth and did not lie", "He caught up with the army late", "He paid money"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A glass teardrop", description: "A keepsake for those who wept because they had nothing to give." },
        badge: "Truthful Even When It Costs",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim, and the Quran, Surah At-Tawbah: 92 and 118",
        note: "The weepers are named in the Quran, and Ka'b ibn Malik's account is in both Sahih collections in full.",
      },
    },
    title: "البكّاؤون ونجاة الصادقين",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء فقراء الصحابة يطلبون ما يركبونه ليخرجوا مع الجيش، فقال النبي ﷺ: «لا أجد ما أحملكم عليه»، فرجعوا وأعينهم تفيض من الدمع حزناً ألا يجدوا ما ينفقون، فسمّاهم القرآن. وتخلّف كعب بن مالك وصاحباه من غير عذر، فلما رجع الجيش صدق ولم يعتذر بالكذب، فتاب الله عليه.",
        shortLesson: "الصدق ينجّي ولو كان الاعتراف صعباً.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما دعا النبي ﷺ إلى الخروج، جاءه نفر من فقراء الصحابة يسألونه ما يركبونه، فقال: «لا أجد ما أحملكم عليه». فتولّوا وأعينهم تفيض من الدمع حزناً ألا يجدوا ما ينفقون، فذكرهم الله في كتابه وسمّاهم الناس «البكّائين»: أرادوا ولم يقدروا، فكُتب لهم أجر من خرج. وفي المقابل تخلّف ثلاثة من الصحابة الصادقين — منهم كعب بن مالك رضي الله عنه — من غير عذر، إنما التسويف يوماً بعد يوم. فلما رجع الجيش جاء المنافقون يعتذرون بالكذب فقُبل ظاهرهم، وجاء كعب فقال الحقّ ولم يختلق عذراً. فأمر النبي ﷺ الناس ألا يكلّموهم خمسين ليلة، حتى ضاقت عليهم الأرض بما رحبت، ثم نزل القرآن بتوبتهم. قال كعب بعدها: ما أنعم الله عليّ نعمة بعد الإسلام أعظم من صدقي.",
        details:
          "قال تعالى: ﴿وَعَلَى الثَّلَاثَةِ الَّذِينَ خُلِّفُوا حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ﴾.",
      },
    },
    interactive: {
      discover: "حديث كعب بن مالك من أطول الأحاديث في صحيح البخاري، رواه بنفسه عن نفسه.",
      value: { name: "الصدق", icon: "💧" },
      thinkQuestion:
        "ما آخر مرة قلت الحقيقة وأنت تعلم أنها ستكلّفك شيئاً؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا نجا كعب بن مالك رضي الله عنه في النهاية؟",
        options: ["لأنه اعتذر بعذر مقبول", "لأنه صدق ولم يكذب", "لأنه خرج مع الجيش متأخراً", "لأنه دفع مالاً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "دمعة من زجاج", description: "تذكار لمن بكى لأنه لم يجد ما يعطيه." },
      badge: "صادق ولو شقّ",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم، والقرآن الكريم، سورة التوبة: ٩٢ و١١٨",
      note: "البكّاؤون مذكورون في القرآن، وقصة كعب بن مالك رضي الله عنه بطولها في الصحيحين.",
    },
  },
  {
    storyId: "st-8-05",
    stationId: 8,
    slug: "tabuk-peace-without-bloodshed",
    image: "/stories/seerah/tabuk-peace-without-bloodshed.jpg",
    en: {
      title: "The Camp at Tabuk: A Victory With No Blood",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The army reached Tabuk on the Syrian frontier and made camp. When the people there saw an army that had crossed the desert in high summer, no one came out to fight it. The Prophet ﷺ stayed some days, made treaties of safety with the border towns, and the army went home without a drop of blood being spilt.",
          shortLesson: "The best confrontation is the one that ends before it starts.",
        },
        tier_2_age_9_11: {
          narrative:
            "The army marched north until it reached Tabuk on the edge of Syria, and made camp. No one came out against them: they saw an army that had crossed the desert in the worst of the heat and had not turned back, and chose not to begin a fight. The Prophet ﷺ stayed at Tabuk some days, and did not waste them: he made terms of safety with the rulers of the frontier towns — Ayla, Jarba and Adhruh — and wrote them a covenant protecting their land and their caravans, so the trade roads to the north were safe. Then the army returned to Madinah having got everything it went for: secure borders, written agreements, and enough standing to prevent a war — without a drop of blood being spilt.",
          details:
            "Allah says: ﴿وَكَفَى اللَّهُ الْمُؤْمِنِينَ الْقِتَالَ﴾ — “And Allah sufficed the believers in fighting.”",
        },
      },
      interactive: {
        discover: "The covenant written for the people of Ayla is among the oldest of the Prophet's written agreements to reach us.",
        value: { name: "Peace through standing, not blood", icon: "🕊️" },
        thinkQuestion: "How do you end a disagreement before it turns into a fight?",
        challenge: {
          type: "multiple_choice",
          question: "How did the expedition to Tabuk end?",
          options: ["With a great battle", "With treaties of safety and no fighting", "With the Muslims withdrawing", "With a long siege"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A written covenant", description: "A document to remind you that a written word can do what a sword cannot." },
        badge: "Keeper of the Frontier",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, with the expedition itself in the two Sahih collections",
        note: "The expedition to Tabuk is established in the Sahih collections; the details of the treaties with Ayla, Jarba and Adhruh and the size of the army come from the Seerah and maghazi literature.",
      },
    },
    title: "معسكر تبوك: نصرٌ بلا دماء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "وصل الجيش إلى تبوك على حدود الشام وعسكر هناك. فلما رأى القوم هذا الجيش الذي قطع الصحراء في عزّ الصيف، لم يخرجوا لقتاله. فأقام النبي ﷺ أياماً، وصالح أهل المناطق الحدودية على الأمان، ثم رجع الجيش ولم تُرَق قطرة دم.",
        shortLesson: "أنجح المواجهات ما انتهت قبل أن تبدأ.",
      },
      tier_2_age_9_11: {
        narrative:
          "سار الجيش شمالاً حتى بلغ تبوك على أطراف الشام، فعسكر هناك. ولم يخرج إليهم أحد يقاتلهم: رأى القوم جيشاً قطع الصحراء في عزّ القيظ ولم يتراجع، فآثروا ألا يبدأوا قتالاً. فأقام النبي ﷺ بتبوك أياماً، ولم يجعلها وقتاً ضائعاً: صالح حكّام المناطق الحدودية — أيلة وجَرباء وأَذْرُح — على الأمان والجزية، وكتب لهم كتاب أمان يحمي أرضهم وقوافلهم، فأمنت الطرق التجارية شمالاً. ثم رجع الجيش إلى المدينة وقد بلغ غايته: حدود آمنة، وعهود مكتوبة، وهيبة تكفي أن تمنع الحرب — من غير أن تُراق قطرة دم واحدة.",
        details:
          "قال تعالى: ﴿وَكَفَى اللَّهُ الْمُؤْمِنِينَ الْقِتَالَ وَكَانَ اللَّهُ قَوِيًّا عَزِيزًا﴾.",
      },
    },
    interactive: {
      discover: "كتاب الأمان لأهل أيلة من أقدم ما وصلنا من كتب النبي ﷺ في العهود.",
      value: { name: "السلام بالقوّة لا بالدم", icon: "🕊️" },
      thinkQuestion:
        "كيف تنهي خلافاً قبل أن يتحوّل إلى شجار؟",
      challenge: {
        type: "multiple_choice",
        question: "كيف انتهت غزوة تبوك؟",
        options: ["بمعركة كبيرة", "بعهود أمان من غير قتال", "بانسحاب المسلمين", "بحصار طويل"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "صحيفة عهد", description: "صحيفة تذكّرك أن الكلمة المكتوبة قد تُغني عن السيف." },
      badge: "حافظ الحدود",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، والصحيحان في أصل الغزوة",
      note: "أصل غزوة تبوك وخروج النبي ﷺ إليها ثابت في الصحيحين؛ وتفصيل المصالحات مع أيلة وجَرباء وأَذْرُح وعدد الجيش من كتب السيرة والمغازي.",
    },
  },
  {
    storyId: "st-8-06",
    stationId: 8,
    slug: "year-of-delegations-tamim",
    image: "/stories/seerah/year-of-delegations-tamim.jpg",
    en: {
      title: "The Year of Delegations: Arabia Meets at the Mosque",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the ninth year Madinah was receiving delegations from every tribe in Arabia — it became known as the Year of Delegations. The delegation of Banu Tamim came wanting a contest of poetry and oratory, so the Prophet ﷺ had Thabit ibn Qays speak and Hassan ibn Thabit recite. Both did well, and the Tamimis said: his orator is better than ours, and his poet is better than ours.",
          shortLesson: "A good word wins hearts better than out-boasting anyone.",
        },
        tier_2_age_9_11: {
          narrative:
            "Once the state was settled and the roads were safe, the tribes of Arabia understood that the matter had held, and their delegations began arriving in Madinah from every direction to learn the religion and make agreements — so the ninth year was called the Year of Delegations. Among the best known was the delegation of Banu Tamim, a people proud of their poetry and oratory, who came looking for a contest. The Prophet ﷺ neither turned them away nor silenced them: he met poetry with poetry and speech with speech. He had Thabit ibn Qays give the address, and Hassan ibn Thabit recite the verse. When they finished, the spokesman of Banu Tamim said a line people repeated afterwards: his orator is better than ours, and his poet is better than ours. Then they accepted Islam. The boast was answered by doing it better, not by shutting it down.",
          details:
            "Allah says of those years: ﴿وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا﴾ — “and you see people entering the religion of Allah in crowds.”",
        },
      },
      interactive: {
        discover: "Every delegation was given hospitality and a place to stay; some of them lodged in the mosque itself.",
        value: { name: "Answering well", icon: "🏛️" },
        thinkQuestion: "If someone challenged you at something you are good at, how would you answer without wounding them?",
        challenge: {
          type: "multiple_choice",
          question: "How did the Prophet ﷺ meet Banu Tamim's contest of poetry and speech?",
          options: ["He stopped them speaking", "He met poetry with poetry and speech with speech", "He sent them out of Madinah", "He ignored them"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A poet's pen", description: "A pen to remind you that a fine word is an argument." },
        badge: "Well Answered",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, and the Quran, Surah An-Nasr",
        note: "People entering the religion in crowds is in the Quran; the details of the Banu Tamim delegation and the contest of poetry come from the Seerah of Ibn Ishaq.",
      },
    },
    title: "عام الوفود: الجزيرة تلتقي في المسجد",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السنة التاسعة صارت المدينة تستقبل وفوداً من كل قبائل الجزيرة، حتى سُمّي «عام الوفود». جاء وفد بني تميم يريدون المفاخرة بالشعر والخطابة، فأمر النبي ﷺ ثابت بن قيس أن يخطب وحسّان بن ثابت أن ينشد، فأحسنا، فقال التميميون: خطيبه أخطب من خطيبنا، وشاعره أشعر من شاعرنا.",
        shortLesson: "الكلمة الطيبة تكسب القلوب أكثر من المفاخرة.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما استقرّت الدولة وأمنت الطرق، أدركت قبائل الجزيرة أن الأمر قد ثبت، فبدأت وفودها تتوافد على المدينة من كل ناحية تتعلّم الدين وتعقد العهود، حتى سُمّيت السنة التاسعة «عام الوفود». وكان من أشهرها وفد بني تميم، وكانوا قوماً يفخرون بالشعر والخطابة، فجاءوا يريدون المفاخرة. فلم يردّهم النبي ﷺ ولم يزجرهم، بل قابل الشعر بالشعر والخطبة بالخطبة: أمر ثابت بن قيس رضي الله عنه فخطب، وأمر حسّان بن ثابت رضي الله عنه فأنشد. فلما فرغا قال خطيب بني تميم كلمة صار يُتناقلها الناس: خطيبه أخطب من خطيبنا، وشاعره أشعر من شاعرنا. ثم أسلموا. رُدّت المفاخرة بالإحسان، لا بالإسكات.",
        details:
          "قال تعالى في تلك السنين: ﴿وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا﴾.",
      },
    },
    interactive: {
      discover: "كان لكل وفد ضيافة ومكان ينزل فيه، وبعضهم نزل في المسجد نفسه.",
      value: { name: "حسن الحوار", icon: "🏛️" },
      thinkQuestion:
        "لو حدّاك أحد في شيء تجيده، تردّ عليه إزاي من غير ما تجرحه؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ قابل النبي ﷺ مفاخرة بني تميم بالشعر والخطابة؟",
        options: ["منعهم من الكلام", "قابل الشعر بالشعر والخطبة بالخطبة", "أخرجهم من المدينة", "سكت عنهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قلم شاعر", description: "قلم يذكّرك أن الكلمة الجميلة حجّة." },
      badge: "حسن الردّ",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، والقرآن الكريم، سورة النصر",
      note: "دخول الناس في الدين أفواجاً في القرآن؛ وأما تفصيل وفد بني تميم والمفاخرة بالشعر فمن كتب السيرة عند ابن إسحاق.",
    },
  },
  {
    storyId: "st-8-07",
    stationId: 8,
    slug: "delegation-of-najran-dialogue",
    image: "/stories/seerah/delegation-of-najran-dialogue.jpg",
    en: {
      title: "The Delegation of Najran: Guests in the Mosque",
      content: {
        tier_1_age_6_8: {
          narrative:
            "A delegation of the Christians of Najran in Yemen came to Madinah, and the Prophet ﷺ lodged them in his mosque and treated them generously. When the time for their prayer came they stood to pray in a corner of the mosque; some people moved to stop them, and the Prophet ﷺ said: let them be. They talked for days, and then went home on their own religion, with a covenant of safety between them.",
          shortLesson: "Argue with reasons, and honour a guest even when he disagrees with you.",
        },
        tier_2_age_9_11: {
          narrative:
            "A delegation of the Christians of Najran — a district of Yemen — came to the Prophet ﷺ, their bishops and notables among them, dressed in their finest. He treated them generously and lodged them in his mosque. When the time for their prayer came, they stood to pray in a corner of the mosque, and some of the people moved to stop them; the Prophet ﷺ said: “Let them be.” Then a long discussion ran between them for days, about the oneness of Allah and about Jesus, peace be upon him — all of it argument and explanation, with no compulsion and no threat in it. When they did not agree, they were not forced: they went home on their own religion, and the Prophet ﷺ wrote them a covenant of safety for themselves, their property and their churches. They asked him for a trustworthy man to judge between them in their affairs, and he sent Abu Ubaydah ibn al-Jarrah with them.",
          details:
            "Allah says: ﴿وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ﴾ — “Do not argue with the People of the Book except in the best way.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ called Abu Ubaydah “the trustworthy one of this community” — and he is the man he sent with them.",
        value: { name: "Respecting the one who differs", icon: "🤝" },
        thinkQuestion: "How do you treat a friend who disagrees with you about something you care about?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ say when people moved to stop the Najran delegation praying in the mosque?",
          options: ["Put them out", "Let them be", "Wait until we leave", "Do not speak to them"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A written covenant", description: "A covenant: a guest is kept safe even when he disagrees with you." },
        badge: "One Who Listens",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, with Abu Ubaydah's title in Sahih al-Bukhari",
        note: "The Najran delegation and the covenant are well known in Ibn Ishaq's Seerah; Abu Ubaydah being named the trustworthy one of the community is in Sahih al-Bukhari.",
      },
    },
    title: "وفد نجران: ضيوف في المسجد",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء وفد من نصارى نجران باليمن إلى المدينة، فأنزلهم النبي ﷺ في مسجده وأكرمهم. ولما حانت صلاتهم قاموا يصلّون في ناحية المسجد، فأراد بعض الناس منعهم، فقال النبي ﷺ: دعوهم. وتحاوروا أياماً بالحجّة، ثم رجعوا على دينهم وبينهم وبين المسلمين عهد أمان.",
        shortLesson: "الحوار يكون بالحجّة، والضيف يُكرَم وإن خالفك.",
      },
      tier_2_age_9_11: {
        narrative:
          "قدم على النبي ﷺ وفد من نصارى نجران — وهي بلد في اليمن — وفيهم أساقفتهم ووجوههم، وقد لبسوا أحسن ثيابهم. فأكرمهم النبي ﷺ وأنزلهم في مسجده. فلما حضر وقت صلاتهم قاموا يصلّون في ناحية من المسجد، فهمّ بعض الناس بمنعهم، فقال النبي ﷺ: «دعوهم». ثم جرى بينه وبينهم حوار طويل أياماً في التوحيد وفي عيسى عليه السلام، كلّه بالحجّة والبيان، لا إكراه فيه ولا تهديد. فلما لم يتفقوا، لم يُجبَروا: رجعوا على دينهم، وكتب لهم النبي ﷺ عهد أمان على أنفسهم وأموالهم وكنائسهم، وطلبوا منه رجلاً أميناً يقضي بينهم في أمورهم، فبعث معهم أبا عبيدة بن الجرّاح رضي الله عنه.",
        details:
          "قال تعالى: ﴿وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ﴾.",
      },
    },
    interactive: {
      discover: "سمّى النبي ﷺ أبا عبيدة رضي الله عنه «أمين هذه الأمة»، وهو الذي بعثه معهم.",
      value: { name: "احترام المخالف", icon: "🤝" },
      thinkQuestion:
        "كيف تعامل صديقاً يخالفك في رأي تحبّه أنت جداً؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ لما أراد بعض الناس منع وفد نجران من الصلاة في المسجد؟",
        options: ["أخرجوهم", "دعوهم", "انتظروا حتى نخرج", "لا تكلّموهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "عهد مكتوب", description: "عهد يذكّرك أن الضيف يُؤمَّن وإن خالفك." },
      badge: "صاحب حوار",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، وصحيح البخاري في فضل أبي عبيدة",
      note: "قدوم وفد نجران وعهد الأمان مشهور في كتب السيرة عند ابن إسحاق؛ وتسمية أبي عبيدة رضي الله عنه أمين الأمة في صحيح البخاري.",
    },
  },
  {
    storyId: "st-8-08",
    stationId: 8,
    slug: "muadh-ambassador-to-yemen",
    image: "/stories/seerah/muadh-ambassador-to-yemen.jpg",
    en: {
      title: "The Envoy to Yemen: Make It Easy",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ sent Mu'adh ibn Jabal to Yemen as a teacher and a judge, and walked beside him giving him counsel. He said to him and to Abu Musa: “Make things easy and do not make them hard; give good news and do not drive people away; work together and do not differ.” And he warned him against wronging anyone: “Beware the prayer of the wronged — there is no veil between it and Allah.”",
          shortLesson: "Teaching starts with making things easy, not with being strict.",
        },
        tier_2_age_9_11: {
          narrative:
            "As the state grew, the distant regions needed someone to teach them and to judge between them. The Prophet ﷺ chose Mu'adh ibn Jabal — a young man and a scholar — and sent him to Yemen. He walked alongside him as he rode, giving him counsel, and then said to him and to Abu Musa al-Ash'ari words that became a rule for every teacher after them: “Make things easy and do not make them hard; give good news and do not drive people away; work together and do not differ.” He told him to begin with the most important thing first, not to take the best of people's property, and warned him hard against wronging anyone: “Beware the prayer of the wronged — there is no veil between it and Allah.” So Mu'adh went and taught people gently, and they loved him for it.",
          details:
            "Allah says: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾ — “Call to the way of your Lord with wisdom and good counsel.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ told Mu'adh, “I love you,” and taught him a supplication to say after every prayer.",
        value: { name: "Making learning easy", icon: "📗" },
        thinkQuestion: "If you were explaining something to a younger sibling, would you start with the easiest part or the hardest?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ tell Mu'adh and Abu Musa?",
          options: ["Be strict so they fear you", "Make it easy, give good news, do not drive people away", "Collect the money first", "Teach only the adults"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A traveller's staff", description: "A staff for a teacher his Prophet walked beside to say goodbye." },
        badge: "A Teacher Who Makes It Easy",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "“Make it easy” and the warning about the prayer of the wronged are both established in the two Sahih collections, in the account of sending Mu'adh to Yemen.",
      },
    },
    title: "سفير اليمن: يسّرا ولا تعسّرا",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعث النبي ﷺ معاذ بن جبل رضي الله عنه إلى اليمن معلّماً وقاضياً، ومشى معه يوصيه. وقال له ولأبي موسى: «يسّرا ولا تعسّرا، وبشّرا ولا تنفّرا، وتطاوعا ولا تختلفا». وحذّره من الظلم فقال: «واتّقِ دعوة المظلوم، فإنه ليس بينها وبين الله حجاب».",
        shortLesson: "التعليم يبدأ بالتيسير، لا بالتشديد.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما اتّسعت رقعة الدولة، احتاجت البلاد البعيدة إلى من يعلّمها ويقضي بين أهلها. فاختار النبي ﷺ معاذ بن جبل رضي الله عنه — وكان شاباً عالماً — وبعثه إلى اليمن. ومشى معه النبي ﷺ يوصيه وهو راكب، ثم قال له ولأبي موسى الأشعري رضي الله عنه كلمات صارت قاعدة لكل معلّم بعدهم: «يسّرا ولا تعسّرا، وبشّرا ولا تنفّرا، وتطاوعا ولا تختلفا». وأوصاه أن يبدأ بالأهمّ فالأهمّ، وألا يأخذ من أموال الناس خيارها، وحذّره تحذيراً شديداً من أن يظلم أحداً فقال: «واتّقِ دعوة المظلوم، فإنه ليس بينها وبين الله حجاب». فذهب معاذ يعلّم الناس بالرفق، فأحبّوه.",
        details:
          "قال تعالى: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾.",
      },
    },
    interactive: {
      discover: "قال النبي ﷺ لمعاذ رضي الله عنه: «إني أحبّك»، وأوصاه بدعاء يقوله دبر كل صلاة.",
      value: { name: "التيسير في التعليم", icon: "📗" },
      thinkQuestion:
        "لو كنت تشرح لأخ أصغر منك، هتبدأ بإيه: الأسهل ولا الأصعب؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ أوصى النبي ﷺ معاذاً وأبا موسى رضي الله عنهما؟",
        options: ["شدّدا ليخافوا", "يسّرا ولا تعسّرا وبشّرا ولا تنفّرا", "اجمعا المال أولاً", "لا تعلّما إلا الكبار"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "عصا مسافر", description: "عصا تذكّرك بمعلّم مشى إليه نبيّه يودّعه." },
      badge: "معلّم ميسّر",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "وصية «يسّرا ولا تعسّرا» وتحذير «دعوة المظلوم» ثابتان في الصحيحين في حديث بعث معاذ رضي الله عنه إلى اليمن.",
    },
  },
  {
    storyId: "st-8-09",
    stationId: 8,
    slug: "dhimad-and-kab-poetry",
    image: "/stories/seerah/dhimad-and-kab-poetry.jpg",
    en: {
      title: "Dhimad and Ka'b: The Power of a Word",
      content: {
        tier_1_age_6_8: {
          narrative:
            "Dhimad al-Azdi came to Mecca and heard people saying Muhammad was touched in the head. He treated such things, so he offered to treat him. The Prophet ﷺ listened to him, then spoke words of praise and of the oneness of Allah — and Dhimad said: say them again! I have heard soothsayers and sorcerers and poets, and I have never heard anything like this. He accepted Islam on the spot.",
          shortLesson: "Listen for yourself before you believe what people say.",
        },
        tier_2_age_9_11: {
          narrative:
            "A man of Azd Shanu'ah called Dhimad came to Mecca. He used to treat people, and he heard the foolish of Mecca saying that Muhammad was mad, so he said: if I could see this man, perhaps Allah would heal him at my hands. He met him and said: Muhammad, I treat this kind of affliction — shall I? The Prophet ﷺ said: “All praise is for Allah; we praise Him and seek His help. Whom Allah guides, none can lead astray; whom He leaves astray, none can guide.” Dhimad said: say those words of yours again! He repeated them three times, and Dhimad said: I have heard the words of soothsayers, and of sorcerers, and of poets, and I have never heard anything like these words of yours. Then he accepted Islam. Years later the poet Ka'b ibn Zuhayr came in repentance after satirising him, recited his famous poem before the Prophet ﷺ, and was pardoned and honoured.",
          details:
            "Allah says of this Quran: ﴿لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا﴾ — “Had We sent down this Quran upon a mountain, you would have seen it humbled.”",
        },
      },
      interactive: {
        discover: "Dhimad came to give treatment, and left as the one who had been changed.",
        value: { name: "Checking before judging", icon: "🗣️" },
        thinkQuestion: "The last time you heard something about someone — did you check, or believe it straight away?",
        challenge: {
          type: "multiple_choice",
          question: "Why did Dhimad first come to the Prophet ﷺ?",
          options: ["To learn from him", "To treat him for what he had heard about him", "To buy from him", "To ask directions"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A stick of incense", description: "A keepsake for a man who came to heal and left healed himself." },
        badge: "One Who Checks First",
      },
      source: {
        reliability: "🟡",
        reference: "Sahih Muslim, and Ibn Hisham's Seerah",
        note: "The account of Dhimad is established in Sahih Muslim in these words; the story of Ka'b ibn Zuhayr and the poem is well known in the Seerah and literary works rather than the Sahih collections.",
      },
    },
    title: "ضِماد وكعب: قوة الكلمة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "جاء ضِماد الأزدي إلى مكة وسمع الناس يقولون إن محمداً به مسّ، وكان يعالج، فعرض أن يعالجه. فسمع منه النبي ﷺ ثم قال كلمات الحمد والتوحيد، فقال ضِماد: أعد عليّ! سمعت الكهنة والسحرة والشعراء، فما سمعت مثل هذا. وأسلم مكانه.",
        shortLesson: "اسمع بنفسك قبل أن تصدّق ما يقوله الناس.",
      },
      tier_2_age_9_11: {
        narrative:
          "قدم مكة رجل من أزد شنوءة يُقال له ضِماد، وكان يرقي من الريح، فسمع سفهاء مكة يقولون إن محمداً مجنون، فقال: لو أني رأيت هذا الرجل لعل الله يشفيه على يدي. فلقيه وقال: يا محمد، إني أرقي من هذه الريح، فهل لك؟ فقال النبي ﷺ: «إن الحمد لله، نحمده ونستعينه، من يهده الله فلا مضلّ له، ومن يُضلل فلا هادي له». فقال ضِماد: أعد عليّ كلماتك هؤلاء! فأعادها ثلاثاً، فقال: لقد سمعت قول الكهنة وقول السحرة وقول الشعراء، فما سمعت مثل كلماتك هؤلاء. ثم أسلم. وبعد سنوات جاء الشاعر كعب بن زهير تائباً بعد هجاء، فأنشد بين يدي النبي ﷺ قصيدته المشهورة، فعفا عنه وأكرمه.",
        details:
          "قال تعالى في عظمة هذا القرآن: ﴿لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا مُّتَصَدِّعًا مِّنْ خَشْيَةِ اللَّهِ﴾.",
      },
    },
    interactive: {
      discover: "ضِماد جاء ليعالج، فرجع وقد تغيّر هو نفسه.",
      value: { name: "التثبّت قبل الحكم", icon: "🗣️" },
      thinkQuestion:
        "آخر مرة سمعت كلاماً عن شخص ما — تأكّدت بنفسك ولا صدّقت على طول؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا جاء ضِماد إلى النبي ﷺ أول مرة؟",
        options: ["ليتعلّم منه", "ليعالجه مما سمع عنه", "ليشتري منه", "ليسأله عن الطريق"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "عود بخور", description: "تذكار لرجل جاء يعالج فرجع وقد شُفي قلبه." },
      badge: "متثبّت",
    },
    source: {
      reliability: "🟡",
      reference: "صحيح مسلم، وسيرة ابن هشام",
      note: "قصة ضِماد رضي الله عنه ثابتة في صحيح مسلم بلفظها؛ وأما خبر كعب بن زهير والقصيدة فمشهور في كتب السيرة والأدب لا في الصحيحين.",
    },
  },
  {
    storyId: "st-8-10",
    stationId: 8,
    slug: "breaking-idols-building-hearts",
    image: "/stories/seerah/breaking-idols-building-hearts.jpg",
    en: {
      title: "Stones Fall, Minds Are Freed",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The tribes worshipped stone idols, asking them for provision and healing. When they entered Islam, men were sent to those idols to take them down — often men from the same tribe. People stood and saw with their own eyes that a stone cannot ward off a single blow, and the illusion fell before the idol did.",
          shortLesson: "A false idea falls the moment you see it as it really is.",
        },
        tier_2_age_9_11: {
          narrative:
            "Every Arab tribe had an idol it honoured: al-Lat for Thaqif, al-Uzza for Quraysh, Manat, Suwa' and others. They sacrificed to them and asked them for rain, healing and children. When the tribes entered Islam after the Year of Delegations, men were sent to take those idols down — and the Prophet ﷺ usually sent a man from the tribe itself, like Khalid ibn al-Walid or al-Mughirah ibn Shu'bah, because people accept more readily from one of their own. Breaking the stone was never the point in itself: people stood watching, and saw that this thing they had feared and petitioned could not stop a single blow falling on it. The fear left their hearts before the idol left its base, and what they held onto moved from stones to Allah alone, and from rituals to character.",
          details:
            "Allah says: ﴿إِنَّ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ عِبَادٌ أَمْثَالُكُمْ﴾ — “Those you call upon besides Allah are servants like you.”",
        },
      },
      interactive: {
        discover: "The man sent to take down a tribe's idol was usually from that tribe, not a stranger to it.",
        value: { name: "Freeing the mind", icon: "🪨" },
        thinkQuestion: "Is there something you used to believe that turned out to be wrong? What changed your mind?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the Prophet ﷺ usually send a man from the tribe itself?",
          options: ["Because he was stronger", "Because people accept more readily from one of their own", "Because the road was shorter", "Because he knew the way"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "An empty pedestal", description: "An empty base to remind you that the illusion falls first." },
        badge: "Free of Mind",
      },
      source: {
        reliability: "🟡",
        reference: "Ibn Hisham's Seerah, and the Quran, Surah Al-A'raf: 194",
        note: "The helplessness of the idols is stated in the Quran; the details of who was sent and to which idol come from the Seerah and maghazi literature.",
      },
    },
    title: "حجارة تسقط وعقول تتحرّر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كانت القبائل تعبد أصناماً من حجر تطلب منها الرزق والشفاء. فلما دخلوا في الإسلام، بُعث إلى تلك الأصنام من يهدمها — وكثيراً ما كانوا من القبيلة نفسها. فرأى الناس بأعينهم أن الحجر لا يدفع عن نفسه شيئاً، فسقط الوهم قبل أن يسقط الصنم.",
        shortLesson: "الفكرة الباطلة تسقط حين تراها على حقيقتها.",
      },
      tier_2_age_9_11: {
        narrative:
          "كانت لكل قبيلة من العرب صنم تعظّمه: اللات لثقيف، والعُزّى لقريش، ومناة وسُواع وغيرها. يذبحون لها ويطلبون منها المطر والشفاء والولد. فلما دخلت القبائل في الإسلام بعد عام الوفود، بُعث إلى تلك الأصنام من يزيلها، وكان النبي ﷺ يبعث في الغالب رجلاً من القبيلة نفسها — كخالد بن الوليد والمغيرة بن شعبة رضي الله عنهما — لأن الناس أقبل لما يأتيهم من واحد منهم. ولم يكن المقصود كسر الحجر في ذاته: كان الناس يقفون ينظرون فيرون أن هذا الذي كانوا يخافونه ويسألونه لا يستطيع أن يمنع عن نفسه ضربة واحدة. فيسقط الخوف من قلوبهم قبل أن يسقط الصنم عن قاعدته، ويتحوّل التعلّق من الحجارة إلى الله وحده، ومن الطقوس إلى الأخلاق.",
        details:
          "قال تعالى: ﴿إِنَّ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ عِبَادٌ أَمْثَالُكُمْ فَادْعُوهُمْ فَلْيَسْتَجِيبُوا لَكُمْ إِن كُنتُمْ صَادِقِينَ﴾.",
      },
    },
    interactive: {
      discover: "كان يُبعث لهدم صنم القبيلة رجلٌ منها، لا غريب عنها.",
      value: { name: "تحرير العقل", icon: "🪨" },
      thinkQuestion:
        "في فكرة كنت مصدّقها زمان وبانت لك غلط؟ إيه اللي خلّاك تغيّر رأيك؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا كان النبي ﷺ يبعث غالباً رجلاً من القبيلة نفسها؟",
        options: ["لأنه أقوى", "لأن الناس أقبل لما يأتيهم من واحد منهم", "لأنه أقرب طريقاً", "لأنه يعرف الطريق"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قاعدة فارغة", description: "قاعدة خالية تذكّرك أن الوهم يسقط أول." },
      badge: "حرّ العقل",
    },
    source: {
      reliability: "🟡",
      reference: "سيرة ابن هشام، والقرآن الكريم، سورة الأعراف: ١٩٤",
      note: "عجز الأصنام مقرّر في القرآن؛ وأما تفصيل البعوث إلى الأصنام وأسماء من بُعث فمن كتب السيرة والمغازي.",
    },
  },
  {
    storyId: "st-8-11",
    stationId: 8,
    slug: "mercy-to-the-weak-suffah",
    image: "/stories/seerah/mercy-to-the-weak-suffah.jpg",
    en: {
      title: "The People of the Bench: The Poorest and the Closest",
      content: {
        tier_1_age_6_8: {
          narrative:
            "At the back of the Prophet's mosque was a shaded place called the Bench, where poor migrants with no home and no money stayed — Abu Hurayrah among them. They were not neglected: they were students, and whenever food was given to the Prophet ﷺ he sent some of it to them.",
          shortLesson: "A person is worth what they know and how they behave, not what is in their pocket.",
        },
        tier_2_age_9_11: {
          narrative:
            "At the back of the Prophet's mosque was a shaded area known as the Suffah — the Bench — which the Prophet ﷺ made a shelter for anyone who came to Madinah with no family, no house and no money. Abu Hurayrah stayed there, and other poor men with him. They were not at the edge of that society; they were at its centre: the people of the mosque, students of knowledge, and the best memorisers of the Prophet's words — which is how Abu Hurayrah came to narrate more hadith than any other companion. When food was brought to the Prophet ﷺ he would ask: is it a gift or charity? If it was charity he sent it to them and did not eat; if it was a gift he sent them some and ate with them. And he set a rule for the community: the weak are not a burden it carries, but the reason it is provided for and helped at all.",
          details:
            "Allah says: ﴿وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ﴾ — “Keep yourself patiently with those who call upon their Lord morning and evening.”",
        },
      },
      interactive: {
        discover: "Abu Hurayrah narrated more hadith than any other companion — and he was one of the people of the Bench, who owned nothing.",
        value: { name: "The dignity of the weak", icon: "🕌" },
        thinkQuestion: "Who in your class or street needs someone to stand with them? What could you do?",
        challenge: {
          type: "multiple_choice",
          question: "Who stayed at the Suffah?",
          options: ["The great merchants", "Poor migrants with no homes", "Royal guests", "Soldiers only"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A palm-leaf mat", description: "A mat: a small corner can raise the greatest of people." },
        badge: "Support of the Weak",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The people of the Suffah and Abu Hurayrah's life among them are in Sahih al-Bukhari, as is the Prophet's saying that people are provided for and helped through their weak.",
      },
    },
    title: "أهل الصُّفَّة: أفقر الناس وأقربهم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في مؤخّرة المسجد النبوي كان مكان مظلّل يُسمّى «الصُّفَّة»، ينزل فيه فقراء المهاجرين ممن لا بيت لهم ولا مال، ومنهم أبو هريرة رضي الله عنه. لم يكونوا مهملين: كانوا طلاب علم، وكان النبي ﷺ إذا أُهدي له طعام أرسل إليهم منه.",
        shortLesson: "قيمة الإنسان بما عنده من علم وخلق، لا بما في جيبه.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان في مؤخّرة المسجد النبوي مكان مظلّل يُعرف بـ«الصُّفَّة»، جعله النبي ﷺ مأوى لمن قدم المدينة ولا أهل له ولا بيت ولا مال. نزل فيه أبو هريرة رضي الله عنه وغيره من الفقراء. ولم يكن هؤلاء على هامش المجتمع، بل كانوا في قلبه: جلساء المسجد، وطلاب العلم، وأحفظ الناس لحديث النبي ﷺ — ومن هنا صار أبو هريرة أكثر الصحابة رواية. وكان النبي ﷺ إذا أُهدي إليه طعام سأل: أهديّة أم صدقة؟ فإن كانت صدقة أرسل بها إليهم ولم يأكل، وإن كانت هديّة أرسل إليهم منها وأكل معهم. وجعل في المجتمع قاعدة: أن الضعيف ليس عبئاً يُحتمل، بل سببٌ يُرزق به الناس ويُنصرون.",
        details:
          "قال تعالى: ﴿وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ﴾.",
      },
    },
    interactive: {
      discover: "أبو هريرة رضي الله عنه أكثر الصحابة حديثاً، وكان من أهل الصُّفَّة الذين لا يملكون شيئاً.",
      value: { name: "كرامة الضعيف", icon: "🕌" },
      thinkQuestion:
        "مين في فصلك أو حيّك محتاج حدّ يقف جنبه؟ تقدر تعمل إيه؟",
      challenge: {
        type: "multiple_choice",
        question: "مَن كان ينزل في الصُّفَّة؟",
        options: ["كبار التجار", "فقراء المهاجرين ممن لا بيت لهم", "الضيوف من الملوك", "الجنود فقط"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حصير من سعف", description: "حصير يذكّرك أن المكان الصغير قد يخرّج أعظم الناس." },
      badge: "سند الضعفاء",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "أهل الصُّفَّة وحال أبي هريرة رضي الله عنه معهم في صحيح البخاري، وكذلك قوله ﷺ في أن الناس يُرزقون ويُنصرون بضعفائهم.",
    },
  },
  {
    storyId: "st-8-12",
    stationId: 8,
    slug: "kindness-to-animals-nature",
    image: "/stories/seerah/kindness-to-animals-nature.jpg",
    en: {
      title: "The Bird Whose Chicks Were Taken",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ was on a journey and stepped away, and some of his companions took the two chicks of a small bird. The mother came and hovered over their heads. When the Prophet ﷺ came back and saw it he said: “Who has grieved this bird by taking its young? Give her young back to her.”",
          shortLesson: "Mercy does not stop at people.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ was travelling with his companions and stepped away for a while. Some of them saw a small bird — a hummarah — with two chicks, and took the chicks. The mother came and hovered over their heads, not knowing what to do. When the Prophet ﷺ returned and saw it he was angry and said: “Who has grieved this bird by taking its young? Give her young back to her.” This was not a one-off. He forbade loading an animal beyond what it can carry, forbade using any living creature as a target, forbade cutting trees without need, and taught that there is reward in kindness to every living thing. For a Muslim, mercy is not a feeling reserved for people; it is how you treat everything alive.",
          details:
            "Allah says: ﴿وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم﴾ — “There is no creature on earth, nor a bird flying on its wings, but they are communities like you.”",
        },
      },
      interactive: {
        discover: "The hummarah is a small reddish bird — the hadith is named after her.",
        value: { name: "Kindness to animals", icon: "🐦" },
        thinkQuestion: "If you found a small animal in trouble in the street, what would you do?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ say when he saw the chicks had been taken?",
          options: ["Keep them with you", "Give her young back to her", "Feed them", "It does not matter"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small feather", description: "A feather: mercy reaches the smallest of creatures." },
        badge: "Gentle With Animals",
      },
      source: {
        reliability: "🟡",
        reference: "Sunan Abi Dawud, with “every living thing” in Sahih al-Bukhari",
        note: "The hadith of the hummarah is in Sunan Abi Dawud and graded authentic by a number of scholars, but is not in the two Sahih collections; the reward for kindness to every living creature is in al-Bukhari and Muslim.",
      },
    },
    title: "العصفورة التي فُجعت بولدها",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان النبي ﷺ في سفر فذهب لحاجته، فأخذ بعض أصحابه فرخي طائر صغير، فجاءت أمّهما ترفرف فوق رؤوسهم. فلما رجع النبي ﷺ ورأى ما صنعوا قال: «من فجع هذه بولدها؟ ردّوا ولدها إليها».",
        shortLesson: "الرحمة لا تقف عند البشر.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان النبي ﷺ في سفر مع أصحابه، فانطلق لحاجته، فرأى بعضهم طائراً صغيراً يُقال له «الحُمَّرة» معه فرخان، فأخذوا الفرخين. فجاءت الأم فجعلت ترفرف فوق رؤوسهم لا تدري ماذا تصنع. فلما رجع النبي ﷺ ورأى المشهد غضب وقال: «مَن فجع هذه بولدها؟ ردّوا ولدها إليها». ولم تكن هذه حادثة عابرة: نهى النبي ﷺ عن تحميل الدابة فوق طاقتها، وعن اتخاذ ذوات الروح هدفاً للرمي، وعن قطع الشجر لغير حاجة، وأخبر أن في كل كبد رطبة أجراً — أي أن الإحسان إلى كل ذي روح فيه ثواب. الرحمة عند المسلم ليست شعوراً يخصّ الناس فقط، بل طريقة يعامل بها كل حيّ.",
        details:
          "قال تعالى: ﴿وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم﴾.",
      },
    },
    interactive: {
      discover: "«الحُمَّرة» طائر صغير أحمر اللون، وسُمّي الحديث باسمها.",
      value: { name: "الرفق بالحيوان", icon: "🐦" },
      thinkQuestion:
        "لو لقيت حيواناً صغيراً تعبان في الشارع، تعمل إيه؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ لما رأى الفرخين قد أُخذا؟",
        options: ["اتركوهما معكم", "ردّوا ولدها إليها", "أطعموهما", "لا بأس"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "ريشة صغيرة", description: "ريشة تذكّرك أن الرحمة تشمل أصغر الخلق." },
      badge: "رفيق بالحيوان",
    },
    source: {
      reliability: "🟡",
      reference: "سنن أبي داود، وصحيح البخاري في «كل كبد رطبة»",
      note: "حديث الحُمَّرة في سنن أبي داود وصحّحه غير واحد من أهل العلم، وليس في الصحيحين؛ وأما الأجر في الإحسان إلى كل ذي كبد رطبة ففي البخاري ومسلم.",
    },
  },
  {
    storyId: "st-8-13",
    stationId: 8,
    slug: "honest-merchant-market-ethics",
    image: "/stories/seerah/honest-merchant-market-ethics.jpg",
    en: {
      title: "A Hand in the Grain: Whoever Cheats Is Not of Us",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ passed a heap of grain in the market and put his hand into it — and his fingers found damp underneath the dry surface. He said: “What is this, seller?” The man said: rain got to it, Messenger of Allah. He said: “Then why did you not put it on top, so people could see it? Whoever cheats is not of me.”",
          shortLesson: "Cheating starts small and ends with people no longer trusting you.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ used to walk through the market of Madinah himself. One day he passed a heap of grain that looked dry and clean on top. He put his hand into it, and his fingers came out damp from inside. He turned to the seller: “What is this, owner of the food?” The man said: the rain got to it, Messenger of Allah. The Prophet ﷺ said: “Then why did you not put it on top of the food, so that people could see it?” And then the sentence that has been a rule for every sale since: “Whoever cheats is not of me.” The man had not told a lie with his tongue — he had hidden a fault, and hiding a fault is cheating. On the other side, the Prophet ﷺ promised the honest, trustworthy trader that he would be with the prophets, the truthful and the martyrs.",
          details:
            "Allah says: ﴿وَيْلٌ لِّلْمُطَفِّفِينَ﴾ — “Woe to those who give short measure.”",
        },
      },
      interactive: {
        discover: "The Prophet ﷺ walked through the market himself to check how people were dealing with each other, not only to buy.",
        value: { name: "Honesty in trade", icon: "⚖️" },
        thinkQuestion: "If you were selling something with a small fault, would you tell the buyer or stay quiet?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the Prophet ﷺ correct the grain seller?",
          options: ["He raised the price", "He hid the damp grain under the dry", "He sold in the morning", "He measured carelessly"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A scale pan", description: "A scale pan: a fault is declared, not hidden." },
        badge: "An Honest Trader",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim",
        note: "“Whoever cheats is not of me” and the account of the heap of grain are in Sahih Muslim.",
      },
    },
    title: "يد في الطعام: من غشّ فليس منّا",
    content: {
      tier_1_age_6_8: {
        narrative:
          "مرّ النبي ﷺ على صُبرة طعام في السوق، فأدخل يده فيها فأصابت أصابعه بللاً تحت السطح الجافّ. فقال: «ما هذا يا صاحب الطعام؟» قال: أصابته السماء يا رسول الله. قال: «أفلا جعلته فوق الطعام كي يراه الناس؟ من غشّ فليس منّي».",
        shortLesson: "الغشّ يبدأ صغيراً وينتهي بأن يفقدك الناس ثقتهم.",
      },
      tier_2_age_9_11: {
        narrative:
          "كان النبي ﷺ يتفقّد سوق المدينة بنفسه، فمرّ ذات يوم على صُبرة طعام — كومة قمح — ظاهرها جافّ نظيف. فأدخل يده فيها، فأصابت أصابعه بللاً في داخلها. فالتفت إلى البائع وقال: «ما هذا يا صاحب الطعام؟» قال: أصابته السماء يا رسول الله — أي نزل عليه المطر. فقال النبي ﷺ: «أفلا جعلته فوق الطعام كي يراه الناس؟» ثم قال كلمته التي صارت قاعدة في كل بيع وشراء إلى اليوم: «من غشّ فليس منّي». لم يكن الرجل يكذب بلسانه، لكنه أخفى العيب — وإخفاء العيب غشّ. وفي المقابل بشّر النبي ﷺ التاجر الصدوق الأمين بأنه مع النبيّين والصدّيقين والشهداء.",
        details:
          "قال تعالى: ﴿وَيْلٌ لِّلْمُطَفِّفِينَ الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ﴾.",
      },
    },
    interactive: {
      discover: "النبي ﷺ كان يمشي في السوق بنفسه ليطمئنّ على معاملات الناس، لا ليشتري فقط.",
      value: { name: "الأمانة في البيع", icon: "⚖️" },
      thinkQuestion:
        "لو كنت بتبيع حاجة وفيها عيب صغير، هتقوله للمشتري ولا تسكت؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا عاتب النبي ﷺ صاحب الطعام؟",
        options: ["لأنه رفع السعر", "لأنه أخفى المبلول تحت الجافّ", "لأنه باع في الصباح", "لأنه لم يكِل جيداً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "كفّة ميزان", description: "كفّة تذكّرك أن العيب يُقال ولا يُخفى." },
      badge: "تاجر صدوق",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم",
      note: "حديث «من غشّ فليس منّي» وقصة صُبرة الطعام في صحيح مسلم.",
    },
  },
  {
    storyId: "st-8-14",
    stationId: 8,
    slug: "mosque-school-and-knowledge",
    en: {
      title: "The Mosque as a School — and a Day for the Women",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The mosque was not only for prayer: circles were held in it where people learned. Women came to the Prophet ﷺ and said: the men have taken all of you — give us a day of your own time. He promised them a day, and met them on it and taught them.",
          shortLesson: "Ask for knowledge properly, and you will find someone to teach you.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet's mosque was not only a place of prayer: circles were held there after the prayers, where people learned the Quran, the rulings and good character, and asked questions and were answered. And the teaching was not for men alone. Some women came to the Prophet ﷺ and said: “The men have taken you from us — give us a day of your own.” He promised them a day, met them on it, and taught and advised and instructed them. He did not tell them to learn it from their husbands, and he did not put them off; he gave them time out of his own. Through circles as simple as these, in a mosque of mud and palm branches, a society where most people could not read became one that prized asking and learning.",
          details:
            "Allah says: ﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾ — “Allah raises those of you who believe, and those given knowledge, in degrees.”",
        },
      },
      interactive: {
        discover: "It was the women who asked for the lesson — and the Prophet ﷺ answered them rather than expecting them to stay quiet.",
        value: { name: "Learning for everyone", icon: "📚" },
        thinkQuestion: "When did you last ask a question you were nervous to ask? What happened when you did?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ do when the women asked for a day to learn?",
          options: ["He apologised, being busy", "He promised them a day, met them and taught them", "He sent them to their husbands", "He put them off for a year"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A writing tablet", description: "A tablet: asking is the first step in learning." },
        badge: "A Seeker of Knowledge",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The women asking for a day and the Prophet setting one aside to teach them is established in al-Bukhari and Muslim.",
      },
    },
    title: "المسجد مدرسة: ويوم للنساء",
    content: {
      tier_1_age_6_8: {
        narrative:
          "لم يكن المسجد للصلاة وحدها: كانت تُعقد فيه حلقات يتعلّم فيها الناس. وجاءت النساء إلى النبي ﷺ فقلن: غلبنا عليك الرجال، فاجعل لنا يوماً من نفسك. فوعدهنّ يوماً، فلقيهنّ فيه وعلّمهنّ.",
        shortLesson: "من طلب العلم بأدب، وجد من يعلّمه.",
      },
      tier_2_age_9_11: {
        narrative:
          "لم يكن مسجد النبي ﷺ مكاناً للصلاة فقط: كانت تُعقد فيه الحلقات بعد الصلوات، يتعلّم الناس فيها القرآن والأحكام والأخلاق ويسألون فيُجابون. ولم يكن التعليم للرجال وحدهم. جاء نساء إلى النبي ﷺ فقلن له: «غلبنا عليك الرجال، فاجعل لنا من نفسك يوماً»، فوعدهنّ يوماً يلقاهنّ فيه، فلقيهنّ فيه فوعظهنّ وعلّمهنّ وأمرهنّ. لم يقل لهنّ: تعلّمن من أزواجكنّ، ولم يؤجّلهنّ؛ خصّص لهنّ وقتاً من وقته. وبهذه الحلقات البسيطة في مسجد من طين وسعف، تحوّل مجتمع كان أكثره لا يقرأ ولا يكتب إلى مجتمع يقدّس السؤال والتعلّم.",
        details:
          "قال تعالى: ﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾.",
      },
    },
    interactive: {
      discover: "النساء هنّ اللواتي طلبن الدرس، فاستجاب لهنّ النبي ﷺ ولم ينتظر منهنّ أن يسكتن.",
      value: { name: "العلم للجميع", icon: "📚" },
      thinkQuestion:
        "آخر مرة سألت سؤالاً كنت خايف تسأله؟ إيه اللي حصل لما سألت؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل النبي ﷺ لما طلبت النساء يوماً للتعلّم؟",
        options: ["اعتذر لانشغاله", "وعدهنّ يوماً ولقيهنّ فيه فعلّمهنّ", "أحالهنّ إلى أزواجهنّ", "أجّلهنّ سنة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "لوح تعليم", description: "لوح يذكّرك أن السؤال أول خطوة في العلم." },
      badge: "طالب علم",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "طلب النساء يوماً من النبي ﷺ وتخصيصه لهنّ يوماً يعلّمهنّ فيه ثابت في صحيح البخاري ومسلم.",
    },
  },
  {
    storyId: "st-8-15",
    stationId: 8,
    slug: "madinah-capital-of-light",
    image: "/stories/seerah/madinah-capital-of-light.jpg",
    en: {
      title: "Madinah at Peace: From Sana'a to Hadramawt",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In Mecca, Khabbab complained to the Prophet ﷺ about how hard the persecution was, and he answered: “By Allah, Allah will complete this matter until a rider goes from Sana'a to Hadramawt fearing nothing but Allah, and the wolf for his sheep.” Years later, people watched it happen.",
          shortLesson: "A country is safe when the weakest person in it can walk without fear.",
        },
        tier_2_age_9_11: {
          narrative:
            "In Mecca, when the torture was at its worst, Khabbab ibn al-Aratt came to the Prophet ﷺ — who was resting on his cloak in the shade of the Kaaba — and said: will you not ask for help for us? Will you not pray for us? After reminding him of those who had come before, the Prophet ﷺ said: “By Allah, Allah will complete this matter until a rider travels from Sana'a to Hadramawt fearing nothing but Allah, and the wolf for his sheep — but you are impatient.” Years later that sentence became something people could see: tribes joining, roads made safe, markets built on honesty, a community learning in its mosque. And when that was built, the Prophet ﷺ announced that he would make the pilgrimage — to meet the whole community in one place, and tell it what he wanted it to keep after him.",
          details:
            "Allah says: ﴿أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ﴾ — “those are the ones who have security, and they are rightly guided.”",
        },
      },
      interactive: {
        discover: "He said those words while he was in Mecca and powerless — before there was any state at all.",
        value: { name: "Safety is the fruit of justice", icon: "🌇" },
        thinkQuestion: "What makes a place safe, in your view — its walls, or its people?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ promise Khabbab while they were being tortured in Mecca?",
          options: ["The torture would end tomorrow", "Safety would spread until a rider feared nothing but Allah", "They would leave Mecca", "They would fight at once"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A lamp on the road", description: "A lamp: safety is built, not handed over." },
        badge: "Builder of a Homeland",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The account of Khabbab ibn al-Aratt and the Prophet's words about the rider from Sana'a to Hadramawt are in Sahih al-Bukhari.",
      },
    },
    title: "المدينة تطمئنّ: من صنعاء إلى حضرموت",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان خبّاب رضي الله عنه يشكو إلى النبي ﷺ شدّة ما يلقون في مكة، فقال له: «والله ليُتمّنّ الله هذا الأمر حتى يسير الراكب من صنعاء إلى حضرموت لا يخاف إلا الله والذئب على غنمه». وبعد سنوات صار ذلك واقعاً يراه الناس.",
        shortLesson: "الوطن الآمن هو الذي يمشي فيه الضعيف مطمئنّاً.",
      },
      tier_2_age_9_11: {
        narrative:
          "في مكة، حين كان التعذيب على أشدّه، جاء خبّاب بن الأرتّ رضي الله عنه إلى النبي ﷺ وهو متوسّد بردته في ظلّ الكعبة يشكو ويقول: ألا تستنصر لنا؟ ألا تدعو لنا؟ فقال له النبي ﷺ بعد أن ذكّره بمن كان قبلهم: «والله ليُتمّنّ الله هذا الأمر حتى يسير الراكب من صنعاء إلى حضرموت لا يخاف إلا الله والذئب على غنمه، ولكنكم تستعجلون». وبعد سنوات صار هذا الكلام أمراً يراه الناس بأعينهم: قبائل تدخل في الأمر، وطرق تُؤمَن، وأسواق تقوم على الأمانة، ومجتمع يتعلّم في مسجده. ولمّا اكتمل هذا البناء، أعلن النبي ﷺ عزمه على الحجّ، ليلقى الأمة كلها في مكان واحد ويقول لها ما يريد أن تحفظه بعده.",
        details:
          "قال تعالى: ﴿الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُم بِظُلْمٍ أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ﴾.",
      },
    },
    interactive: {
      discover: "قال النبي ﷺ هذه الكلمات وهو في مكة مستضعف، قبل أن تكون هناك دولة أصلاً.",
      value: { name: "الأمن ثمرة العدل", icon: "🌇" },
      thinkQuestion:
        "إيه اللي يخلّي مكاناً «آمناً» في رأيك؟ الأسوار ولا الناس؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ وعد النبي ﷺ خبّاباً رضي الله عنه وهم يُعذَّبون في مكة؟",
        options: ["بأن العذاب سينتهي غداً", "بأن الأمن سيعمّ حتى يسير الراكب لا يخاف إلا الله", "بأن يخرجوا من مكة", "بأن يقاتلوا فوراً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "مصباح على الطريق", description: "مصباح يذكّرك أن الأمن يُبنى ولا يُوهَب." },
      badge: "بانٍ للوطن",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "حديث خبّاب بن الأرتّ رضي الله عنه وقول النبي ﷺ «حتى يسير الراكب من صنعاء إلى حضرموت» في صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-01",
    stationId: 9,
    slug: "grand-call-to-hajj",
    en: {
      title: "The Great Call: A March to Mecca",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the tenth year the Prophet ﷺ announced that he would make the pilgrimage, and people came out with him from every direction until they were beyond counting. He entered the state of pilgrimage at Dhu al-Hulayfah in two white cloths, and everyone dressed as he did, so you could no longer tell the rich from the poor. And their voices rose: here I am, O Allah, here I am.",
          shortLesson: "Before Allah, people stand as equals.",
        },
        tier_2_age_9_11: {
          narrative:
            "In Dhu al-Qi'dah of the tenth year after the migration, the Prophet ﷺ announced that he was going for the pilgrimage. As soon as word reached the tribes they came out of every valley wanting to make the pilgrimage with him and to see how he did it, until an enormous crowd had gathered — historians estimate more than a hundred thousand. At Dhu al-Hulayfah the Prophet ﷺ entered ihram: he took off his sewn clothes and put on a plain white lower garment and cloak with no ornament on them, and every person there dressed as he had. You could no longer tell a commander from a shepherd or a rich man from a poor one: two white cloths, and one sentence repeated by a hundred thousand throats — “Here I am, O Allah, here I am; here I am, You have no partner, here I am.” That is how the pilgrimage begins: everyone leaves what divides them at the first stop.",
          details:
            "Allah says: ﴿وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا﴾ — “And proclaim the pilgrimage to the people; they will come to you on foot.”",
        },
      },
      interactive: {
        discover: "Jabir ibn Abdullah described this pilgrimage day by day, and his account is the longest hadith describing the Hajj.",
        value: { name: "Equality", icon: "🕋" },
        thinkQuestion: "If everyone wore exactly the same clothes, what would tell them apart?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the pilgrims wear the same white cloths?",
          options: ["They were cheaper", "They erase the difference between rich and poor", "Only to keep off the heat", "They were an army uniform"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A white cloth", description: "A white cloth: differences are left at the door." },
        badge: "One Who Answered the Call",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih Muslim, in Jabir's account of the pilgrimage",
        note: "The Prophet's ihram at Dhu al-Hulayfah and the talbiyah are in Sahih Muslim; the number of pilgrims is an estimate from the historians, not from a text.",
      },
    },
    title: "النداء الأكبر: مسيرة إلى مكة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في السنة العاشرة أعلن النبي ﷺ أنه حاجّ، فخرج الناس معه من كل ناحية حتى صاروا جموعاً لا تُحصى. أحرم من ذي الحُليفة في ثوبين أبيضين، ولبس الناس مثله، فما عاد يُعرف الغنيّ من الفقير. وارتفعت أصواتهم: لبّيك اللهم لبّيك.",
        shortLesson: "أمام الله يقف الناس سواء.",
      },
      tier_2_age_9_11: {
        narrative:
          "في ذي القعدة من السنة العاشرة للهجرة، أعلن النبي ﷺ أنه خارج إلى الحجّ. فما إن بلغ الخبر القبائل حتى خرجوا من كل وادٍ يريدون أن يحجّوا معه ويروا كيف يحجّ، فاجتمع معه في المدينة وفي الطريق جموع عظيمة يقدّرها المؤرّخون بأكثر من مئة ألف. ولمّا بلغوا ذي الحُليفة أحرم النبي ﷺ: خلع ثيابه المخيطة ولبس إزاراً ورداءً أبيضين لا زينة فيهما، ولبس الناس كلّهم مثل لبسه. فلم يعد يُعرف الأمير من الراعي ولا الغنيّ من الفقير: ثوبان أبيضان وكلمة واحدة يردّدها مئة ألف حَلْق: «لبّيك اللهم لبّيك، لبّيك لا شريك لك لبّيك». هكذا يبدأ الحجّ: بأن يترك الناس كل ما يفرّقهم عند أول محطة.",
        details:
          "قال تعالى: ﴿وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ﴾.",
      },
    },
    interactive: {
      discover: "وصف جابر بن عبد الله رضي الله عنه هذه الحجّة وصفاً دقيقاً يوماً بيوم، وحديثه أطول حديث في صفة الحجّ.",
      value: { name: "المساواة", icon: "🕋" },
      thinkQuestion:
        "لو الناس كلها لابسة زيّ واحد، إيه اللي هيفرّق بينهم ساعتها؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا لبس الحجيج ثياباً بيضاء متشابهة؟",
        options: ["لأنها أرخص", "لأنها تُذهب الفرق بين غنيّ وفقير", "لأنها تقي الحرّ فقط", "لأنها زيّ الجيش"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "إزار أبيض", description: "ثوب أبيض يذكّرك أن الفروق تُخلع عند الباب." },
      badge: "من ركب النداء",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح مسلم، حديث جابر رضي الله عنه في صفة الحجّ",
      note: "صفة إحرام النبي ﷺ من ذي الحُليفة والتلبية في صحيح مسلم؛ وأما عدد الحجيج فتقدير من كتب السيرة والتاريخ لا نصّ فيه.",
    },
  },
  {
    storyId: "st-9-02",
    stationId: 9,
    slug: "arafat-unity-and-equality",
    image: "/stories/seerah/arafat-unity-and-equality.jpg",
    en: {
      title: "Arafat: A Sea of White",
      content: {
        tier_1_age_6_8: {
          narrative:
            "On the ninth of Dhu al-Hijjah the pilgrims stood at Arafat — the greatest pillar of the Hajj, so much so that the Prophet ﷺ said: “The Hajj is Arafat.” No crowns, no decorated mounts; everyone in two white cloths with their hands raised. And the Prophet ﷺ stood on his camel al-Qaswa to address them.",
          shortLesson: "The longest you will ever stand is not before people, but before your Lord.",
        },
        tier_2_age_9_11: {
          narrative:
            "On the ninth day of Dhu al-Hijjah the pilgrims gathered on the plain of Arafat. This day is the greatest pillar of the Hajj — the Prophet ﷺ said: “The Hajj is Arafat”, meaning whoever misses the standing at Arafat has missed the pilgrimage altogether. The scene was white as far as the eye could see: no crown, no procession, no mark setting anyone above anyone, only raised hands and tears and prayer. The Prophet ﷺ rode his camel al-Qaswa and stood in the valley of Uranah, the people silent around him and men carrying his voice back, row by row, to those too far to hear. Then he began to say to them what gathered up twenty-three years of calling — as though he knew it was the last time they would all be together with him.",
          details:
            "Allah says: ﴿فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ﴾ — “When you depart from Arafat, remember Allah at the sacred site.”",
        },
      },
      interactive: {
        discover: "People relayed the Prophet's voice back to those behind them — there was nothing to amplify it.",
        value: { name: "Standing before Allah", icon: "🤍" },
        thinkQuestion: "If you had one prayer to make, what would you ask for?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ say about the greatest pillar of the Hajj?",
          options: ["The Hajj is the circling", "The Hajj is Arafat", "The Hajj is Mina", "The Hajj is the walking"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A white pebble", description: "A pebble for the day everyone stood as equals." },
        badge: "One Who Stood at Arafat",
      },
      source: {
        reliability: "🟢",
        reference: "Sunan at-Tirmidhi, and Sahih Muslim on the pilgrimage",
        note: "The Prophet's standing at Arafat is described in Jabir's account in Sahih Muslim; “The Hajj is Arafat” is in the Sunan and graded authentic by the scholars.",
      },
    },
    title: "عرفات: بحر من البياض",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في التاسع من ذي الحجة وقف الحجيج على عرفات، وهو أعظم أركان الحجّ حتى قال النبي ﷺ: «الحجّ عرفة». لا تيجان ولا مراكب مزيّنة، الكلّ في ثوبين أبيضين يرفعون أيديهم بالدعاء. ووقف النبي ﷺ على ناقته القصواء ليخطب فيهم.",
        shortLesson: "أطول ما تقف فيه ليس أمام الناس، بل أمام ربّك.",
      },
      tier_2_age_9_11: {
        narrative:
          "في اليوم التاسع من ذي الحجة اجتمع الحجيج على صعيد عرفات. وهذا اليوم هو ركن الحجّ الأعظم، حتى قال النبي ﷺ: «الحجّ عرفة» — أي من فاته الوقوف بعرفة فاته الحجّ كله. كان المشهد بياضاً ممتدّاً إلى حيث ينتهي البصر: لا تاج ولا موكب ولا علامة تميّز أحداً عن أحد، إنما أيدٍ مرفوعة ودموع ودعاء. وركب النبي ﷺ ناقته القصواء ووقف في بطن وادي عُرَنة، والناس حوله صامتون، ورجالٌ يبلّغون صوته إلى من بَعُد صفّاً بعد صفّ. ثم بدأ يقول لهم ما جمع فيه ثلاثاً وعشرين سنة من الدعوة، وكأنه يعلم أنها آخر مرة يجتمعون فيها معه.",
        details:
          "قال تعالى: ﴿فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ﴾.",
      },
    },
    interactive: {
      discover: "كان الناس يبلّغون صوت النبي ﷺ إلى من خلفهم، لأنه لم يكن هناك ما يكبّر الصوت.",
      value: { name: "الوقوف بين يدي الله", icon: "🤍" },
      thinkQuestion:
        "لو كان عندك دعوة واحدة تدعو بها، تدعو بإيه؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا قال النبي ﷺ عن ركن الحجّ الأعظم؟",
        options: ["الحجّ الطواف", "الحجّ عرفة", "الحجّ منى", "الحجّ السعي"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حصاة بيضاء", description: "حصاة تذكّرك بيوم وقف فيه الناس سواء." },
      badge: "واقف بعرفة",
    },
    source: {
      reliability: "🟢",
      reference: "سنن الترمذي وصحيح مسلم في صفة الحجّ",
      note: "صفة وقوف النبي ﷺ بعرفة في حديث جابر رضي الله عنه في صحيح مسلم؛ وحديث «الحجّ عرفة» في السنن وصحّحه أهل العلم.",
    },
  },
  {
    storyId: "st-9-03",
    stationId: 9,
    slug: "farewell-sermon-human-rights",
    image: "/stories/seerah/farewell-sermon-human-rights.jpg",
    en: {
      title: "The Farewell Sermon: No Arab Is Above a Non-Arab",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ addressed the people: “Your blood, your property and your honour are sacred to one another, like the sanctity of this day of yours, in this month of yours, in this land of yours.” And he said: “Your Lord is one and your father is one; no Arab is above a non-Arab and no non-Arab above an Arab, except by piety.”",
          shortLesson: "No one is above anyone else by colour or family.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ stood before that great gathering and said what afterwards read like a charter. He began with the sanctity of a human being: “Your blood, your property and your honour are sacred to one another, like the sanctity of this day of yours, in this month of yours, in this land of yours” — a person's life, property and dignity carry the sanctity of the holiest day, in the holiest month, in the holiest place. Then he pulled down the whole idea of rank by lineage on which that age had been built: “Your Lord is one and your father is one; all of you are from Adam, and Adam was from dust. No Arab is above a non-Arab and no non-Arab above an Arab, no light-skinned above dark or dark above light, except by piety.” Then he put the old interest-debts and the old blood-feuds under his feet and cancelled them — beginning with his own family's claims before anyone else's.",
          details:
            "Allah says: ﴿إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ﴾ — “The most honoured of you before Allah is the most mindful of Him.”",
        },
      },
      interactive: {
        discover: "He cancelled his own uncle's interest and his own relative's blood-claim first, before asking it of anyone else.",
        value: { name: "Justice and equality", icon: "📜" },
        thinkQuestion: "Has someone been treated as lesser because of how they look or where they are from? What would you do if you saw it?",
        challenge: {
          type: "multiple_choice",
          question: "What makes one person better than another, in the Farewell Sermon?",
          options: ["Lineage", "Colour", "Piety", "Wealth"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A charter tablet", description: "A tablet: the first people the ruling was applied to were his own." },
        badge: "Bearer of the Charter",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim, and Musnad Ahmad",
        note: "“Your blood and property are sacred” is in the two Sahih collections; “no Arab is above a non-Arab” comes from the sermon of the days of Tashriq in Musnad Ahmad, graded good by the scholars.",
      },
    },
    title: "خطبة الوداع: لا فضل لعربيّ على أعجميّ",
    content: {
      tier_1_age_6_8: {
        narrative:
          "خطب النبي ﷺ في الناس فقال: «إن دماءكم وأموالكم وأعراضكم عليكم حرام كحرمة يومكم هذا في شهركم هذا في بلدكم هذا». وقال: «إن ربّكم واحد وإن أباكم واحد، لا فضل لعربيّ على أعجميّ ولا لأعجميّ على عربيّ إلا بالتقوى».",
        shortLesson: "لا أحد أفضل من أحد بلونه أو نسبه.",
      },
      tier_2_age_9_11: {
        narrative:
          "وقف النبي ﷺ في ذلك الجمع العظيم وقال كلاماً صار بعد ذلك أشبه بميثاق. بدأ بحرمة الإنسان: «إن دماءكم وأموالكم وأعراضكم عليكم حرام كحرمة يومكم هذا في شهركم هذا في بلدكم هذا» — أي أن دم الإنسان وماله وعِرضه لها من الحرمة ما لِأقدس يوم في أقدس شهر في أقدس بلد. ثم هدم أساس التفاضل بالأنساب الذي قامت عليه الجاهلية كلها: «إن ربّكم واحد وإن أباكم واحد، كلّكم لآدم وآدم من تراب، لا فضل لعربيّ على أعجميّ ولا لأعجميّ على عربيّ، ولا لأحمر على أسود ولا لأسود على أحمر إلا بالتقوى». ثم وضع الرِّبا والثأر القديم تحت قدميه وأبطلهما، وبدأ بأهله هو فأبطل ربا عمّه ودم ابن عمّه أولاً.",
        details:
          "قال تعالى: ﴿يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ﴾.",
      },
    },
    interactive: {
      discover: "بدأ النبي ﷺ بإبطال ربا عمّه العباس ودم ابن ربيعة من أهله هو، قبل أن يطالب أحداً غيره.",
      value: { name: "العدل والمساواة", icon: "📜" },
      thinkQuestion:
        "فيه حدّ اتعامل معاه الناس بشكل أقلّ عشان شكله أو بلده؟ تعمل إيه لو شفت ده؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ يتفاضل الناس في خطبة الوداع؟",
        options: ["بالنسب", "باللون", "بالتقوى", "بالمال"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "لوح ميثاق", description: "لوح يذكّرك أن أول من طُبّق عليه الحكم كان أهل النبي ﷺ." },
      badge: "حامل الميثاق",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم، ومسند أحمد",
      note: "«إن دماءكم وأموالكم عليكم حرام» في الصحيحين؛ وأما «لا فضل لعربيّ على أعجميّ» فمن خطبة أيام التشريق في مسند أحمد، وحسّنه أهل العلم.",
    },
  },
  {
    storyId: "st-9-04",
    stationId: 9,
    slug: "testament-of-women-rights",
    image: "/stories/seerah/testament-of-women-rights.jpg",
    en: {
      title: "Take Good Care of the Women",
      content: {
        tier_1_age_6_8: {
          narrative:
            "In the middle of the sermon the Prophet ﷺ turned to the women and said: “Take good care of the women,” and he repeated it. In that time there were people who inherited women as they inherited goods, and people who buried their infant daughters alive. This instruction overturned all of it.",
          shortLesson: "The best of people is the best to his own household.",
        },
        tier_2_age_9_11: {
          narrative:
            "In the middle of that sermon, the Prophet ﷺ stopped at the group who had been genuinely the most powerless in that age: women. They were denied inheritance, they were inherited like property, and some men buried their infant daughters alive. The Prophet ﷺ told all the people: “Take good care of the women,” and he said it again and pressed it, reminding them that they were a trust taken under Allah's covenant. This was not one line on one day: elsewhere he said, “The best of you is the best to his family, and I am the best of you to my family” — making the measure of a man how he treats the people in his house, not how he looks in public. With that, whole customs by which women had been wronged for centuries came to an end.",
          details:
            "Allah says: ﴿وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ﴾ — “And live with them in kindness.”",
        },
      },
      interactive: {
        discover: "The Prophet's measure of a good man was his home, not his standing in a gathering.",
        value: { name: "Kindness at home", icon: "🌸" },
        thinkQuestion: "Who do you behave better with — your friends, or your family? Why?",
        challenge: {
          type: "multiple_choice",
          question: "How is a man's goodness measured, in the Prophet's words?",
          options: ["By his money", "By his standing among people", "By how he treats his family", "By his strength"],
          correctAnswer: 2,
        },
      },
      gamification: {
        artifact: { name: "A simple bracelet", description: "A bracelet for those from whom centuries of wrong were lifted in a sentence." },
        badge: "Kind at Home",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "“Take good care of the women” is in the two Sahih collections within the Farewell Sermon; “the best of you is the best to his family” is in the Sunan and graded authentic.",
      },
    },
    title: "استوصوا بالنساء خيراً",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في وسط الخطبة خصّ النبي ﷺ النساء بوصية فقال: «استوصوا بالنساء خيراً»، وكرّرها. وكان في ذلك الزمان من يرث النساء كما يرث المتاع، ومن يئد ابنته وهي حيّة. فجاءت الوصية تقلب هذا كلّه.",
        shortLesson: "أحسن الناس أحسنهم لأهل بيته.",
      },
      tier_2_age_9_11: {
        narrative:
          "في وسط تلك الخطبة الجامعة، وقف النبي ﷺ عند فئة كانت أضعف الناس حقّاً في الجاهلية: النساء. كنّ يُحرمن الميراث، ويُورَثن كما يُورَث المتاع، وكان منهم من يدفن ابنته حيّة. فقال النبي ﷺ للناس كلّهم: «استوصوا بالنساء خيراً»، وأعادها وأكّدها، وذكّرهم أنهنّ أمانة أخذوها بعهد الله. ولم تكن هذه كلمة عابرة في يوم: كان يقول في غير هذا الموضع: «خيركم خيركم لأهله، وأنا خيركم لأهلي» — فجعل مقياس الخير في الرجل هو كيف يعامل من في بيته، لا كيف يبدو أمام الناس. وبهذا انتهت عادات كاملة كانت تُظلَم بها النساء قروناً.",
        details:
          "قال تعالى: ﴿وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ﴾.",
      },
    },
    interactive: {
      discover: "مقياس النبي ﷺ للرجل الصالح هو بيته، لا مجلسه بين الناس.",
      value: { name: "حسن العشرة", icon: "🌸" },
      thinkQuestion:
        "أنت أحسن مع مين أكتر: أصحابك ولا أهل بيتك؟ ليه؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ يقاس خير الرجل في قول النبي ﷺ؟",
        options: ["بماله", "بمكانته بين الناس", "بمعاملته لأهل بيته", "بقوّته"],
        correctAnswer: 2,
      },
    },
    gamification: {
      artifact: { name: "سوار بسيط", description: "سوار يذكّرك بمن رُفع عنهنّ ظلم قرون بكلمة." },
      badge: "حسن العشرة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "«استوصوا بالنساء خيراً» في الصحيحين ضمن خطبة حجّة الوداع، و«خيركم خيركم لأهله» في السنن وصحّحه أهل العلم.",
    },
  },
  {
    storyId: "st-9-05",
    stationId: 9,
    slug: "completion-of-faith-farewell",
    image: "/stories/seerah/completion-of-faith-farewell.jpg",
    en: {
      title: "Have I Delivered It? And the Tears of Abu Bakr",
      content: {
        tier_1_age_6_8: {
          narrative:
            "At the end of the sermon the Prophet ﷺ asked the gathering: “Have I delivered it?” They said yes. He raised his finger to the sky, then pointed it at them and said: “O Allah, bear witness.” That day the verse came down: “Today I have perfected your religion for you.” The people rejoiced — and Abu Bakr wept, because he understood that completion meant the parting was near.",
          shortLesson: "Some people hear in a piece of news what nobody else hears.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the Prophet ﷺ finished his sermon, he turned to that whole gathering and asked them one question: “You will be asked about me — what will you say?” They said: we bear witness that you have delivered the message, discharged the trust and given counsel. He raised his finger towards the sky, then pointed it at the people, and said three times: “O Allah, bear witness. O Allah, bear witness. O Allah, bear witness.” And on that day — the day of Arafat in the Farewell Pilgrimage — the verse came down: “Today I have perfected your religion for you and completed My favour upon you.” The people were overjoyed: the religion was complete and the favour was full. And it is related that Abu Bakr wept, because he heard in that sentence what no one else heard: when a work is finished, the time of the one who did it is near.",
          details:
            "Allah says: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي﴾ — “Today I have perfected your religion for you and completed My favour upon you.”",
        },
      },
      interactive: {
        discover: "A Jewish man told Umar: had this verse come to us, we would have made its day a festival. Umar said: it came down on a day of two festivals — a Friday, and the day of Arafat.",
        value: { name: "Completing a trust", icon: "🏔️" },
        thinkQuestion: "When you finish something you worked hard on, what do you feel? Joy — or something else as well?",
        challenge: {
          type: "multiple_choice",
          question: "What did the people answer when the Prophet ﷺ asked what they would say?",
          options: ["They said nothing", "We bear witness that you delivered it and gave counsel", "We want more", "We will answer tomorrow"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A raised finger", description: "A keepsake for the day a prophet called his Lord to witness over his people." },
        badge: "Witness to the Message",
      },
      source: {
        reliability: "🟡",
        reference: "Sahih Muslim, with the verse in Sahih al-Bukhari",
        note: "“Have I delivered it” and “O Allah, bear witness” are in Sahih Muslim; the verse coming down on the day of Arafat is in al-Bukhari. Abu Bakr's weeping comes from the tafsir and Seerah works.",
      },
    },
    title: "ألا هل بلّغت؟ وبكاء الصدّيق",
    content: {
      tier_1_age_6_8: {
        narrative:
          "في آخر الخطبة سأل النبي ﷺ الجمع: «ألا هل بلّغت؟» فقالوا: نعم. فرفع إصبعه إلى السماء ثم نكتها إليهم وقال: «اللهم اشهد». ونزل يومئذ: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ﴾. ففرح الناس، وبكى أبو بكر رضي الله عنه؛ لأنه فهم أن الاكتمال يعني قرب الوداع.",
        shortLesson: "بعض الناس يفهم من الخبر ما لا يفهمه غيره.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما أتمّ النبي ﷺ خطبته، التفت إلى ذلك الجمع كلّه وسألهم سؤالاً واحداً: «وأنتم تُسألون عنّي، فما أنتم قائلون؟» قالوا: نشهد أنك قد بلّغت وأدّيت ونصحت. فرفع إصبعه إلى السماء ثم نكتها إلى الناس وقال ثلاثاً: «اللهم اشهد، اللهم اشهد، اللهم اشهد». وفي ذلك اليوم — يوم عرفة من حجّة الوداع — نزل قول الله تعالى: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي﴾. ففرح الناس بها فرحاً شديداً: اكتمل الدين وتمّت النعمة. ويُذكر أن أبا بكر الصدّيق رضي الله عنه بكى؛ لأنه سمع في الكلمة ما لم يسمعه غيره: أن العمل إذا تمّ، فقد اقترب وقت صاحبه أن يمضي.",
        details:
          "قال تعالى: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾.",
      },
    },
    interactive: {
      discover: "قال يهوديّ لعمر رضي الله عنه: لو نزلت علينا هذه الآية لاتخذنا يومها عيداً. فقال عمر: قد نزلت في يوم عيدين — يوم جمعة ويوم عرفة.",
      value: { name: "تمام الأمانة", icon: "🏔️" },
      thinkQuestion:
        "لما بتخلّص شغل تعبت فيه، بتحسّ بإيه؟ فرح ولا حاجة تانية كمان؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ أجاب الناس حين سألهم النبي ﷺ: ما أنتم قائلون؟",
        options: ["سكتوا", "نشهد أنك قد بلّغت وأدّيت ونصحت", "نسألك المزيد", "سنسأل غداً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "إصبع مرفوعة", description: "تذكار ليوم أشهد فيه نبيّ ربَّه على أمّته." },
      badge: "شاهد على البلاغ",
    },
    source: {
      reliability: "🟡",
      reference: "صحيح مسلم، وصحيح البخاري في نزول الآية",
      note: "سؤال النبي ﷺ «ألا هل بلّغت» و«اللهم اشهد» في صحيح مسلم؛ ونزول آية إكمال الدين يوم عرفة في صحيح البخاري. وأما بكاء أبي بكر رضي الله عنه ففي كتب التفسير والسيرة.",
    },
  },
  {
    storyId: "st-9-06",
    stationId: 9,
    slug: "signs-of-farewell-uhud-cemetery",
    image: "/stories/seerah/signs-of-farewell-uhud-cemetery.jpg",
    en: {
      title: "Farewell to the Martyrs, and a Word from the Pulpit",
      content: {
        tier_1_age_6_8: {
          narrative:
            "After returning from the pilgrimage, the Prophet ﷺ went out to the martyrs of Uhud and prayed over them like someone saying goodbye. Then he came back, climbed the pulpit and said: “I go ahead of you and I am your witness, and by Allah I am looking at my Pool right now. I do not fear that you will worship others after me — I fear the world for you, that you will compete over it.”",
          shortLesson: "Sometimes the danger to you is plenty, not hardship.",
        },
        tier_2_age_9_11: {
          narrative:
            "After the Prophet ﷺ returned from the Farewell Pilgrimage, he went out to the martyrs of Uhud — his companions killed beside him years before — and prayed over them as one prays over the dead, until those who saw it said: like someone taking leave of the living and the dead. Then he came back, climbed the pulpit, looked into the faces of the people and said: “I go ahead of you and I am your witness, and by Allah I am looking at my Pool right now.” Then came the sentence that surprised them: “I do not fear that you will worship others after me — I fear the world for you, that you will compete over it.” A people who had borne hunger and torture for years: now that safety and plenty had come, the danger to them was wealth, not poverty. And from all of this the companions understood that their Prophet was saying goodbye.",
          details:
            "Allah says: ﴿مِّنَ الْمُؤْمِنِينَ رِجَالٌ صَدَقُوا مَا عَاهَدُوا اللَّهَ عَلَيْهِ﴾ — “Among the believers are men true to what they pledged to Allah.”",
        },
      },
      interactive: {
        discover: "Years had passed since the martyrs of Uhud, and still he went out to take leave of them before his own departure.",
        value: { name: "Loyalty", icon: "🌿" },
        thinkQuestion: "Is there someone who helped you once and was never thanked? How could you remember them today?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ say he feared for his community?",
          options: ["That they would worship others after him", "That the world would open to them and they would compete over it", "That they would grow few", "That they would go hungry"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A branch from Uhud", description: "A branch for those who are not forgotten however long it has been." },
        badge: "Loyal to His Companions",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "His going out to the martyrs of Uhud and this sermon from the pulpit are established in al-Bukhari and Muslim.",
      },
    },
    title: "وداع الشهداء وخُطبة المنبر",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بعد رجوعه من الحجّ، خرج النبي ﷺ إلى شهداء أُحد فصلّى عليهم كالمودّع، ثم رجع فصعد المنبر وقال: «إني فَرَطُكم وأنا شهيد عليكم، وإني والله لأنظر إلى حوضي الآن. وما أخاف عليكم أن تُشركوا بعدي، ولكن أخاف عليكم الدنيا أن تنافسوا فيها».",
        shortLesson: "أحياناً يكون الخوف عليك من السَّعة لا من الضيق.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد أن رجع النبي ﷺ من حجّة الوداع، خرج إلى شهداء أُحد — أصحابه الذين قُتلوا معه قبل سنين — فصلّى عليهم صلاته على الميت، حتى قال من رآه: كالمودّع للأحياء والأموات. ثم رجع فصعد المنبر ونظر في وجوه الناس وقال: «إني فَرَطُكم — أي سابقكم إلى الحوض — وأنا شهيد عليكم، وإني والله لأنظر إلى حوضي الآن». ثم قال الكلمة التي أدهشتهم: «وما أخاف عليكم أن تُشركوا بعدي، ولكن أخاف عليكم الدنيا أن تنافسوا فيها». قوم صبروا على الجوع والتعذيب سنين، فلما جاءهم الأمن والسَّعة، كان الخوف عليهم من الغنى لا من الفقر. وفهم الصحابة من هذا كلّه أن نبيّهم يودّعهم.",
        details:
          "قال تعالى: ﴿مِّنَ الْمُؤْمِنِينَ رِجَالٌ صَدَقُوا مَا عَاهَدُوا اللَّهَ عَلَيْهِ فَمِنْهُم مَّن قَضَىٰ نَحْبَهُ وَمِنْهُم مَّن يَنتَظِرُ﴾.",
      },
    },
    interactive: {
      discover: "مضى على شهداء أُحد سنوات طويلة، ومع ذلك خرج إليهم يودّعهم قبل رحيله.",
      value: { name: "الوفاء", icon: "🌿" },
      thinkQuestion:
        "فيه حدّ ساعدك زمان ومكافأتش عنه؟ تقدر تفتكره النهارده إزاي؟",
      challenge: {
        type: "multiple_choice",
        question: "ما الذي قال النبي ﷺ إنه يخاف على أمّته منه؟",
        options: ["أن يشركوا بعده", "أن تُفتح عليهم الدنيا فيتنافسوا فيها", "أن يقلّ عددهم", "أن يجوعوا"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "غصن من أُحد", description: "غصن يذكّرك بمن لا يُنسون وإن طال الزمن." },
      badge: "وفيّ لأصحابه",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "خروج النبي ﷺ إلى شهداء أُحد وخطبته على المنبر بهذا اللفظ ثابتان في صحيح البخاري ومسلم.",
    },
  },
  {
    storyId: "st-9-07",
    stationId: 9,
    slug: "usama-young-army-commander",
    image: "/stories/seerah/usama-young-army-commander.jpg",
    en: {
      title: "Usamah: A Commander at Eighteen",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ ordered an army prepared for Syria and put Usamah ibn Zayd in command — a young man, with senior companions in his ranks. Some people talked about how young he was, so the Prophet ﷺ addressed them: “If you criticise his command, you criticised his father's command before him. By Allah, he was fit for command.”",
          shortLesson: "Being capable is not measured in years.",
        },
        tier_2_age_9_11: {
          narrative:
            "In his last days the Prophet ﷺ ordered an army prepared to move to the Syrian frontier, and appointed Usamah ibn Zayd over it — a young man of about eighteen — with senior Muhajirun and Ansar in the ranks. Some people talked about how young he was: is this one put in command over those? Word reached the Prophet ﷺ and he came out angry, climbed the pulpit, and said: “If you criticise his command, you criticised his father's command before him. By Allah, he was fit for command, and he was among the dearest of people to me, and this one is among the dearest of people to me after him.” The people fell silent and accepted it. Usamah was not chosen because he was the son of someone the Prophet loved; he was chosen because he was up to it — and that is what the Prophet ﷺ defended in his final days.",
          details:
            "Allah says of choosing the best person: ﴿إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ﴾ — “the best you can hire is the strong and trustworthy.”",
        },
      },
      interactive: {
        discover: "Abu Bakr sent Usamah's army out after the Prophet's death and did not replace him, though Usamah was far younger than he was.",
        value: { name: "Trusting the young", icon: "🎖️" },
        thinkQuestion: "Has an adult ever trusted you with something? How did it feel?",
        challenge: {
          type: "multiple_choice",
          question: "Why did some people object to Usamah's command?",
          options: ["He was not brave", "He was young", "He did not know the road", "He refused to lead"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small banner", description: "A banner: being up to the job has no age." },
        badge: "Fit for the Trust",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "Usamah's appointment and the Prophet's sermon defending him are established in the two Sahih collections.",
      },
    },
    title: "أسامة: قائد في الثامنة عشرة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "أمر النبي ﷺ بتجهيز جيش إلى الشام، وأمّر عليه أسامة بن زيد وهو شابّ صغير، وفي الجيش كبار الصحابة. فتكلّم بعض الناس في صغر سنّه، فخطب النبي ﷺ وقال: «إن تطعنوا في إمارته فقد كنتم تطعنون في إمارة أبيه من قبل، وايم الله إن كان لخليقاً للإمارة».",
        shortLesson: "الكفاءة لا تُقاس بعدد السنين.",
      },
      tier_2_age_9_11: {
        narrative:
          "في أواخر أيامه ﷺ، أمر بتجهيز جيش يتوجّه إلى حدود الشام، وأمّر عليه أسامة بن زيد رضي الله عنهما — وكان شابّاً في نحو الثامنة عشرة — وفي ذلك الجيش من كبار المهاجرين والأنصار. فتكلّم بعض الناس في صغر سنّه وقالوا: يؤمّر هذا على هؤلاء؟ فبلغ ذلك النبي ﷺ فخرج مغضباً وصعد المنبر فقال: «إن تطعنوا في إمارته فقد كنتم تطعنون في إمارة أبيه من قبل، وايم الله إن كان لخليقاً للإمارة، وإن كان لمن أحبّ الناس إليّ، وإن هذا لمن أحبّ الناس إليّ بعده». فسكت الناس ورضوا. لم يُختر أسامة لأنه ابن حِبّ النبي ﷺ فقط، بل لأنه كان أهلاً — وهذا ما دافع عنه النبي ﷺ في آخر أيامه.",
        details:
          "قال تعالى في اختيار الأكفأ: ﴿إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ﴾.",
      },
    },
    interactive: {
      discover: "أبو بكر رضي الله عنه أنفذ جيش أسامة بعد وفاة النبي ﷺ ولم يعزله، رغم أنه أصغر منه بكثير.",
      value: { name: "الثقة بالشباب", icon: "🎖️" },
      thinkQuestion:
        "حدّ أكبر منك وثق فيك في حاجة؟ حسّيت بإيه ساعتها؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا اعترض بعض الناس على إمارة أسامة رضي الله عنه؟",
        options: ["لأنه لم يكن شجاعاً", "لصغر سنّه", "لأنه لم يعرف الطريق", "لأنه رفض القيادة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "راية صغيرة", description: "راية تذكّرك أن الأهلية لا عمر لها." },
      badge: "أهلٌ للأمانة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "تأمير أسامة بن زيد رضي الله عنهما وخطبة النبي ﷺ في الدفاع عنه ثابتان في الصحيحين.",
    },
  },
  {
    storyId: "st-9-08",
    stationId: 9,
    slug: "fever-and-aisha-chamber",
    image: "/stories/seerah/fever-and-aisha-chamber.jpg",
    en: {
      title: "The Illness Begins: Where Am I Tomorrow?",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The fever grew severe on the Prophet ﷺ, and still he kept going round the houses of his wives as he always did, out of fairness. When walking became too hard he began to ask: “Where am I tomorrow? Where am I tomorrow?” They understood that he wanted Aishah's house, and they gave him leave to be wherever he wished.",
          shortLesson: "Fairness is kept even at your weakest.",
        },
        tier_2_age_9_11: {
          narrative:
            "After he returned from the pilgrimage the illness began. The fever became so severe that Aishah said: I never saw anyone in more pain than the Messenger of Allah ﷺ. Even so he did not abandon his habit of fairness between his wives: he went round their houses each day as he always had. When it grew too heavy for him to move, he began asking: “Where am I tomorrow? Where am I tomorrow?” — meaning Aishah's day. They understood what he wanted, and all of them gave him leave to stay wherever he wished, without holding him to the turn. So he moved to Aishah's room, walking between two men, his feet dragging on the ground from weakness. He did not take an exception for himself until he had asked for it — and this at the worst of his illness.",
          details:
            "Allah says: ﴿وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾ — “and He placed between you affection and mercy.”",
        },
      },
      interactive: {
        discover: "Aishah's room opened directly onto the mosque, so he could hear the people praying.",
        value: { name: "Fairness when weak", icon: "🌙" },
        thinkQuestion: "When you are tired or fed up, do you stay fair to the people around you — or forget?",
        challenge: {
          type: "multiple_choice",
          question: "Why did the Prophet ﷺ keep asking, “Where am I tomorrow?”",
          options: ["To forget the illness", "To learn which day was Aishah's, so he could ask their leave", "To set out on a journey", "To lead the prayer"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A water vessel", description: "A vessel: fairness does not lapse with illness." },
        badge: "Fair Even When Ill",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "His asking “where am I tomorrow” and his wives giving him leave to be nursed in Aishah's room are in Sahih al-Bukhari.",
      },
    },
    title: "بداية المرض: أين أنا غداً؟",
    content: {
      tier_1_age_6_8: {
        narrative:
          "اشتدّت الحمّى على النبي ﷺ حتى كان يُوعك وعكاً شديداً. ومع ذلك ظلّ يطوف على بيوت زوجاته كعادته في العدل. فلما ثقل عليه المشي جعل يسأل: «أين أنا غداً؟ أين أنا غداً؟» ففهمن أنه يريد بيت عائشة رضي الله عنها، فأذنّ له أن يكون حيث شاء.",
        shortLesson: "العدل يُحفظ حتى في أضعف الأوقات.",
      },
      tier_2_age_9_11: {
        narrative:
          "بعد رجوعه من الحجّ بدأ المرض. اشتدّت عليه الحمّى حتى قالت عائشة رضي الله عنها: ما رأيت رجلاً أشدّ عليه الوجع من رسول الله ﷺ. ومع ذلك لم يترك ما كان يفعله من العدل بين زوجاته: كان يطوف على بيوتهنّ كل يوم كعادته. فلما اشتدّ به الأمر وثقل عليه أن ينتقل، جعل يسأل: «أين أنا غداً؟ أين أنا غداً؟» — يريد يوم عائشة. ففهمن مراده، فأذنّ له جميعاً أن يكون حيث شاء من غير أن يُلزم نفسه بالدور. فانتقل إلى حجرة عائشة رضي الله عنها يمشي بين رجلين تخطّ قدماه الأرض من الضعف. لم يطلب لنفسه استثناءً حتى استأذن، وهو في أشدّ ما يكون من المرض.",
        details:
          "قال تعالى: ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾.",
      },
    },
    interactive: {
      discover: "حجرة عائشة رضي الله عنها كانت ملاصقة للمسجد، فكان يسمع الناس وهم يصلّون.",
      value: { name: "العدل في الضعف", icon: "🌙" },
      thinkQuestion:
        "لما بتتعب أو بتزهق، بتفضل عادل مع اللي حواليك ولا بتنسى؟",
      challenge: {
        type: "multiple_choice",
        question: "لماذا كان النبي ﷺ يسأل: أين أنا غداً؟",
        options: ["لينسى المرض", "ليعرف يوم عائشة رضي الله عنها فيستأذنهنّ", "ليخرج للسفر", "ليؤمّ الناس"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "إناء ماء", description: "إناء يذكّرك أن العدل لا يسقط بالمرض." },
      badge: "عادلٌ حتى في مرضه",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "سؤاله ﷺ «أين أنا غداً» وإذن أزواجه له أن يُمرَّض في بيت عائشة رضي الله عنها في صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-09",
    stationId: 9,
    slug: "abu-bakr-leads-prayer",
    en: {
      title: "Tell Abu Bakr to Lead the Prayer",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The time for prayer came and the people were waiting in the mosque. The Prophet ﷺ tried to rise and fainted; he came round, tried again, and fainted again. So he said: “Tell Abu Bakr to lead the people in prayer.” Aishah said: Abu Bakr is a tender man — when he recites, weeping overcomes him. He repeated the instruction three times.",
          shortLesson: "The prayer is not abandoned, and the right person is put in front of it.",
        },
        tier_2_age_9_11: {
          narrative:
            "The illness grew until the Prophet ﷺ could not go out. The time for prayer came and the Muslims were waiting for him in the mosque as always. He asked: “Have the people prayed?” They said: no, they are waiting for you, Messenger of Allah. He asked for water and washed to lighten the fever, then went to stand and fainted; he came round, asked the same question, and the same happened — three times. When he knew he could not, he said: “Tell Abu Bakr to lead the people in prayer.” Aishah — afraid people would think ill of her father standing in his place — said: Abu Bakr is a tender man; when he recites the Quran, weeping overcomes him. He gave the instruction again, and she repeated hers, until he said: “Tell her to tell Abu Bakr to lead the prayer.” So Abu Bakr went forward and led the people for days while the Prophet ﷺ was in his room.",
          details:
            "Allah says: ﴿حَافِظُوا عَلَى الصَّلَوَاتِ﴾ — “Guard the prayers carefully.”",
        },
      },
      interactive: {
        discover: "Many companions read his putting Abu Bakr in front for the prayer as a sign of who would lead after him.",
        value: { name: "Honouring the prayer", icon: "🕌" },
        thinkQuestion: "Is there something you do every day however tired you are? What is it?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ do when he could not go out to the prayer?",
          options: ["He delayed it until he recovered", "He told Abu Bakr to lead the people", "He told them to pray alone", "He was carried out"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small prayer mat", description: "A mat: the prayer is the last thing to be let go." },
        badge: "Keeper of the Prayer",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari and Muslim",
        note: "The instruction to Abu Bakr and Aishah's reply are established in the two Sahih collections.",
      },
    },
    title: "مُروا أبا بكر فليصلِّ بالناس",
    content: {
      tier_1_age_6_8: {
        narrative:
          "حان وقت الصلاة والناس ينتظرون في المسجد. حاول النبي ﷺ أن يقوم فأُغمي عليه، ثم أفاق فحاول فأُغمي عليه. فقال: «مُروا أبا بكر فليصلِّ بالناس». فقالت عائشة رضي الله عنها: إن أبا بكر رجل رقيق إذا قرأ غلبه البكاء. فأعادها ﷺ ثلاثاً.",
        shortLesson: "الصلاة لا تُترك، ويُقدَّم لها أهلها.",
      },
      tier_2_age_9_11: {
        narrative:
          "اشتدّ المرض حتى صار النبي ﷺ لا يقوى على الخروج. وحان وقت الصلاة والمسلمون ينتظرونه في المسجد كعادتهم. فسأل: «أصلّى الناس؟» قالوا: لا، هم ينتظرونك يا رسول الله. فأمر بماء فاغتسل ليخفّ عنه، ثم ذهب ليقوم فأُغمي عليه؛ ثم أفاق فسأل السؤال نفسه ففعل مثل ذلك، ثلاث مرات. فلما علم أنه لا يستطيع قال: «مُروا أبا بكر فليصلِّ بالناس». فقالت عائشة رضي الله عنها — وهي تخشى أن يتشاءم الناس بمقام أبيها مقامه —: إن أبا بكر رجل رقيق، إذا قرأ القرآن غلبه البكاء. فأعاد ﷺ الأمر وأعادت، حتى قال: «مُروها فلتأمر أبا بكر، فليصلِّ بالناس؛ إنكنّ صواحب يوسف». فتقدّم أبو بكر رضي الله عنه فصلّى بالناس أياماً والنبي ﷺ في حجرته.",
        details:
          "قال تعالى: ﴿حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ﴾.",
      },
    },
    interactive: {
      discover: "فهم كثير من الصحابة من تقديمه لأبي بكر رضي الله عنه في الصلاة إشارةً إلى من يخلفه بعده.",
      value: { name: "تعظيم الصلاة", icon: "🕌" },
      thinkQuestion:
        "فيه حاجة بتعملها كل يوم مهما كنت تعبان؟ إيه هي؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل النبي ﷺ لما عجز عن الخروج إلى الصلاة؟",
        options: ["أخّر الصلاة حتى يشفى", "أمر أبا بكر أن يصلّي بالناس", "أمرهم أن يصلّوا فرادى", "خرج محمولاً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "سجادة صغيرة", description: "سجادة تذكّرك أن الصلاة آخر ما يُترك." },
      badge: "محافظ على الصلاة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري ومسلم",
      note: "أمر النبي ﷺ لأبي بكر رضي الله عنه أن يصلّي بالناس ومراجعة عائشة رضي الله عنها له ثابتان في الصحيحين.",
    },
  },
  {
    storyId: "st-9-10",
    stationId: 9,
    slug: "last-prayer-behind-abu-bakr",
    en: {
      title: "The Last Prayer He Prayed Among Them",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ felt a little stronger, so he came out between two men to the mosque while Abu Bakr was leading the prayer. When Abu Bakr sensed him he began to step back, and the Prophet ﷺ signalled to him: stay where you are. He sat beside him and prayed, with Abu Bakr following the Prophet's prayer and the people following Abu Bakr's.",
          shortLesson: "Do not crowd out the one who started; finish what you began.",
        },
        tier_2_age_9_11: {
          narrative:
            "One day the Prophet ﷺ felt a little lighter, and came out walking between two men, his feet dragging on the ground from weakness, until he entered the mosque where Abu Bakr was standing leading the people. When Abu Bakr sensed him he began to step back to give him the leader's place, and the Prophet ﷺ signalled with his hand: stay where you are, do not step back. The Prophet ﷺ sat down at his left and prayed, and Abu Bakr followed the Prophet ﷺ and raised his voice with the calls so the people could hear, and the people followed Abu Bakr. The Prophet ﷺ did not move a man out of a prayer he had begun, and Abu Bakr did not crowd his Prophet. This was the last prayer the Prophet ﷺ prayed in his mosque among his companions.",
          details:
            "Allah says: ﴿النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ﴾ — “The Prophet is closer to the believers than their own selves.”",
        },
      },
      interactive: {
        discover: "Abu Bakr relayed the calls of the prayer aloud so those at the back of the mosque could hear them.",
        value: { name: "Humility on both sides", icon: "🤲" },
        thinkQuestion: "If someone started a job and you could do it better, would you take it from them or finish it with them?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ signal to Abu Bakr when he tried to step back?",
          options: ["To leave", "Stay where you are, do not step back", "To sit down", "To repeat the prayer"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "Wooden prayer beads", description: "A keepsake for the last prayer that gathered them with him." },
        badge: "Humble With People",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The Prophet coming out during his illness and praying beside Abu Bakr is in Sahih al-Bukhari.",
      },
    },
    title: "آخر صلاة صلّاها بينهم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "وجد النبي ﷺ خفّة، فخرج بين رجلين إلى المسجد وأبو بكر يصلّي بالناس. فلما رآه أبو بكر أراد أن يتأخّر، فأشار إليه النبي ﷺ أن مكانك. وجلس إلى جنبه يصلّي، فكان أبو بكر يصلّي بصلاة النبي ﷺ والناس يصلّون بصلاة أبي بكر.",
        shortLesson: "لا تتزاحم على المقدَّم، وأتمّ ما بدأت.",
      },
      tier_2_age_9_11: {
        narrative:
          "في أحد الأيام وجد النبي ﷺ من نفسه خفّة، فخرج يمشي بين رجلين ورجلاه تخطّان في الأرض من الضعف، حتى دخل المسجد وأبو بكر رضي الله عنه قائم يصلّي بالناس. فلما أحسّ به أبو بكر ذهب يتأخّر ليفسح له مكان الإمام، فأشار إليه النبي ﷺ بيده: أن مكانك، لا تتأخّر. وجلس النبي ﷺ عن يساره يصلّي، فكان أبو بكر يقتدي بالنبي ﷺ ويرفع صوته بالتكبير ليُسمع الناس، والناس يقتدون بأبي بكر. لم يزح النبي ﷺ رجلاً بدأ صلاة عن مكانه، وأبو بكر لم يزاحم نبيّه. وكانت هذه آخر صلاة صلّاها النبي ﷺ في مسجده بين أصحابه.",
        details:
          "قال تعالى: ﴿النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ﴾.",
      },
    },
    interactive: {
      discover: "كان أبو بكر رضي الله عنه يبلّغ التكبير عن النبي ﷺ ليسمعه من في آخر المسجد.",
      value: { name: "التواضع المتبادل", icon: "🤲" },
      thinkQuestion:
        "لو حدّ بدأ شغلانة وأنت أقدر منه، هتاخدها منه ولا تكمّل معاه؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا أشار النبي ﷺ لأبي بكر رضي الله عنه لما أراد أن يتأخّر؟",
        options: ["أن يخرج", "أن مكانك ولا تتأخّر", "أن يجلس", "أن يعيد الصلاة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "سُبحة خشب", description: "تذكار لآخر صلاة جمعتهم به." },
      badge: "متواضع مع الناس",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "خروج النبي ﷺ في مرضه وصلاته إلى جنب أبي بكر رضي الله عنه في صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-11",
    stationId: 9,
    slug: "final-glance-and-smile",
    image: "/stories/seerah/final-glance-and-smile.jpg",
    en: {
      title: "The Curtain Lifts, and the Smile",
      content: {
        tier_1_age_6_8: {
          narrative:
            "While the people were praying the dawn prayer behind Abu Bakr, the curtain of Aishah's room was drawn back. The Prophet ﷺ looked at them standing in their rows and smiled. They almost broke their prayer for joy, so he signalled to them to complete it — and then let the curtain fall. It was the last time their eyes saw him.",
          shortLesson: "The finest thing a teacher can see is his students carrying on without him.",
        },
        tier_2_age_9_11: {
          narrative:
            "On a Monday morning, with the people in rows for the dawn prayer behind Abu Bakr, the curtain of Aishah's room was drawn back. The Prophet ﷺ looked out at them: rows in order, a prayer standing, a community going on with what he had taught it without him among them. Anas ibn Malik described his face at that moment: like a page of the Quran. And the Prophet ﷺ smiled — glad at them. The people almost broke their prayer for joy at seeing him, and Abu Bakr began to step back into the row, thinking the Prophet ﷺ was coming out to lead. But he signalled to them to complete their prayer. Then he let the curtain fall. That was the last sight their eyes had of his face.",
          details:
            "Allah says of the believers: ﴿سِيمَاهُمْ فِي وُجُوهِهِم مِّنْ أَثَرِ السُّجُودِ﴾ — “their mark is on their faces from the trace of prostration.”",
        },
      },
      interactive: {
        discover: "He did not come out and did not interrupt them; it was enough to see them standing, and then he let the curtain fall.",
        value: { name: "Joy in those you raised", icon: "🌅" },
        thinkQuestion: "If you taught someone something and saw them doing it right on their own — how would you feel?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ do when he saw the people in their rows?",
          options: ["He interrupted their prayer", "He smiled, then let the curtain fall", "He called Abu Bakr", "He came out and led them"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "The edge of a curtain", description: "A keepsake for the last glance — and it was a smile." },
        badge: "One Who Saw Him Smile",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The drawing back of the curtain on the Monday, his smile, and Anas's description of his face are in Sahih al-Bukhari.",
      },
    },
    title: "الستارة تُرفع.. والابتسامة",
    content: {
      tier_1_age_6_8: {
        narrative:
          "بينما الناس في صلاة الفجر خلف أبي بكر رضي الله عنه، كُشفت ستارة حجرة عائشة رضي الله عنها، فنظر النبي ﷺ إليهم صفوفاً في صلاتهم، فتبسّم يضحك. فكاد الناس يفتنون من الفرح، فأشار إليهم أن أتمّوا صلاتكم، ثم أرخى الستر. وكانت آخر نظرة رأوه فيها.",
        shortLesson: "أجمل ما يراه المعلّم أن تلاميذه يكملون بعده.",
      },
      tier_2_age_9_11: {
        narrative:
          "في صباح يوم الاثنين، والناس صفوف في صلاة الفجر خلف أبي بكر رضي الله عنه، كُشفت ستارة حجرة عائشة رضي الله عنها. نظر النبي ﷺ إليهم: صفوف منتظمة، وصلاة قائمة، وأمّة تمشي على ما علّمها من غير أن يكون فيهم. قال أنس بن مالك رضي الله عنه واصفاً وجهه في تلك اللحظة: كأنه ورقة مصحف. فتبسّم النبي ﷺ يضحك — فرحاً بهم. وكاد الناس أن يفتنوا في صلاتهم من الفرح برؤيته، وهمّ أبو بكر أن ينكص على عقبيه ليصل الصفّ ظنّاً أن النبي ﷺ خارج إلى الصلاة، فأشار إليهم النبي ﷺ أن أتمّوا صلاتكم. ثم أرخى الستر. وكانت تلك آخر نظرة رأت فيها عيونهم وجهه ﷺ.",
        details:
          "قال تعالى في وصف المؤمنين: ﴿سِيمَاهُمْ فِي وُجُوهِهِم مِّنْ أَثَرِ السُّجُودِ﴾.",
      },
    },
    interactive: {
      discover: "لم يخرج إليهم ولم يقطع صلاتهم؛ اكتفى بأن يراهم قائمين ثم أرخى الستر.",
      value: { name: "الفرح بمن تربّى على يدك", icon: "🌅" },
      thinkQuestion:
        "لو علّمت حدّ حاجة وشفته بيعملها لوحده صح — هتحسّ بإيه؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا فعل النبي ﷺ لما رأى الناس صفوفاً في صلاتهم؟",
        options: ["قطع صلاتهم", "تبسّم يضحك ثم أرخى الستر", "نادى أبا بكر", "خرج فصلّى بهم"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "طرف ستارة", description: "تذكار لآخر نظرة، وكانت ابتسامة." },
      badge: "من رآه يبتسم",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "كشف الستارة يوم الاثنين وتبسّمه ﷺ ووصف أنس رضي الله عنه لوجهه في صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-12",
    stationId: 9,
    slug: "last-testament-prayer-and-weak",
    image: "/stories/seerah/last-testament-prayer-and-weak.jpg",
    en: {
      title: "The Prayer, the Prayer — and Those in Your Care",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The pain grew hard on him. He would put his hand into a vessel of water and wipe his face, saying: “There is no god but Allah; death has its agonies.” And he kept repeating two instructions until his tongue could barely form them: “The prayer, the prayer — and those your right hands possess.”",
          shortLesson: "What you owe Allah and what you owe people do not come apart.",
        },
        tier_2_age_9_11: {
          narrative:
            "The illness grew hard on the Prophet ﷺ in his last days. There was a vessel of water beside him, and he would dip his hand into it and wipe his face, saying: “There is no god but Allah; death has its agonies.” And through all that pain, what he kept repeating to the end were two instructions, said over and over until his tongue grew too heavy to form them: “The prayer, the prayer — and those your right hands possess.” Guard the prayer; and fear Allah regarding the servants, the workers and the weak who are under your hand. The last testament was not about wealth to divide or a kingdom to inherit. It was about two things: your link with your Lord, and how you treat the person who cannot complain about you to anyone. And with Allah those two are one thing, not two.",
          details:
            "Allah joins them in one verse: ﴿وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا﴾ — worship, and then the rights of parents, neighbours and those in one's care.",
        },
      },
      interactive: {
        discover: "He left no instruction about money — he died leaving neither dinar nor dirham.",
        value: { name: "What is owed to Allah and to the weak", icon: "🤍" },
        thinkQuestion: "Who is the person who cannot complain about you to anyone? How do you treat them?",
        challenge: {
          type: "multiple_choice",
          question: "What was the Prophet's final instruction?",
          options: ["Wealth and inheritance", "The prayer, and those in their care", "Fighting only", "Travel"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A water vessel", description: "A vessel for the last two things he said." },
        badge: "Keeper of the Testament",
      },
      source: {
        reliability: "🟡",
        reference: "Sunan Abi Dawud and Musnad Ahmad, with “the agonies of death” in Sahih al-Bukhari",
        note: "“The prayer, the prayer, and those your right hands possess” is in Abu Dawud and Ahmad and graded authentic by the scholars, but is not in the two Sahih collections; “death has its agonies” is in al-Bukhari.",
      },
    },
    title: "الصلاةَ الصلاةَ.. وما ملكت أيمانكم",
    content: {
      tier_1_age_6_8: {
        narrative:
          "اشتدّ عليه ﷺ الأمر، وكان يدخل يده في إناء فيه ماء فيمسح وجهه ويقول: «لا إله إلا الله، إن للموت سكرات». وظلّ يوصي بكلمتين حتى ما كاد يُبين بلسانه: «الصلاةَ الصلاةَ، وما ملكت أيمانكم».",
        shortLesson: "حقّ الله وحقّ الناس لا ينفصلان.",
      },
      tier_2_age_9_11: {
        narrative:
          "اشتدّ المرض على النبي ﷺ في آخر أيامه، وكانت عنده رَكوة فيها ماء، فجعل يدخل يده فيها فيمسح بها وجهه ويقول: «لا إله إلا الله، إن للموت سكرات». ومع كل هذا الوجع، كانت آخر ما ظلّ يوصي به وصيّتين اثنتين يكرّرهما حتى ثقل لسانه فما كاد يُبينهما: «الصلاةَ الصلاةَ، وما ملكت أيمانكم» — أي حافظوا على الصلاة، واتّقوا الله فيمن تحت أيديكم من الخدم والعمّال والضعفاء. لم تكن الوصية الأخيرة في مال يُقسم ولا في مُلك يُورَث. كانت في شيئين: صلتك بربّك، ومعاملتك لمن لا يستطيع أن يشتكي منك لأحد. وهما عند الله واحد لا ينفصل.",
        details:
          "قال تعالى: ﴿وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا﴾ ثم عدّد حقّ الجار والمملوك.",
      },
    },
    interactive: {
      discover: "لم يوصِ النبي ﷺ بمال، ولم يترك ديناراً ولا درهماً حين مات.",
      value: { name: "حقّ الله وحقّ الضعيف", icon: "🤍" },
      thinkQuestion:
        "مين الشخص اللي مالوش حدّ يشتكي له منك؟ بتعامله إزاي؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ كانت وصية النبي ﷺ الأخيرة؟",
        options: ["بالمال والميراث", "بالصلاة وبمن تحت أيديهم من الضعفاء", "بالجهاد فقط", "بالسفر"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "رَكوة ماء", description: "إناء يذكّرك بآخر كلمتين قالهما." },
      badge: "حافظ الوصية",
    },
    source: {
      reliability: "🟡",
      reference: "سنن أبي داود ومسند أحمد، وصحيح البخاري في «سكرات الموت»",
      note: "«الصلاةَ الصلاةَ وما ملكت أيمانكم» في سنن أبي داود ومسند أحمد وصحّحه أهل العلم، وليس في الصحيحين؛ وأما «إن للموت سكرات» ففي صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-13",
    stationId: 9,
    slug: "to-the-highest-companion",
    en: {
      title: "Rather, the Highest Companion",
      content: {
        tier_1_age_6_8: {
          narrative:
            "His head was on Aishah's chest when her brother came in with a fresh toothstick. The Prophet ﷺ looked at it, and she understood that he wanted it, so she softened it for him and he used it. Then he raised his eyes and began saying: “With the Highest Companion” — and he passed away.",
          shortLesson: "The last thing left of a person is what they chose.",
        },
        tier_2_age_9_11: {
          narrative:
            "On the Monday, the Prophet's head was resting against Aishah. Her brother Abd al-Rahman ibn Abi Bakr came in holding a fresh toothstick, and the Prophet ﷺ looked at it in a way that told her he wanted it. She said: shall I take it for you? He nodded. So she took it, bit it soft and gave it to him, and he cleaned his teeth with it as well as she had ever seen him do. Then he went to hand it back, and his hand dropped. There was a vessel of water before him, and he was dipping his hands in it and wiping his face. Then he raised his eyes towards the ceiling and said: “With those Allah has favoured — the prophets, the truthful, the martyrs and the righteous.” Then: “O Allah, forgive me and have mercy on me and join me with the Highest Companion,” repeating it: “Rather, the Highest Companion.” Then his hand fell, and he passed away.",
          details:
            "Allah says: ﴿فَأُولَٰئِكَ مَعَ الَّذِينَ أَنْعَمَ اللَّهُ عَلَيْهِم مِّنَ النَّبِيِّينَ وَالصِّدِّيقِينَ﴾ — “those are with the ones Allah has favoured: the prophets and the truthful.”",
        },
      },
      interactive: {
        discover: "The last thing he did was clean his teeth — a small habit he had kept his whole life.",
        value: { name: "A good ending", icon: "✨" },
        thinkQuestion: "Is there a small good habit you do every day that you would like to keep?",
        challenge: {
          type: "multiple_choice",
          question: "What were the Prophet's last words?",
          options: ["I leave you wealth", "Rather, the Highest Companion", "Guard the road", "Wait for me"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A toothstick", description: "A siwak: a small habit stays to the last moment." },
        badge: "A Good Ending",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "The account of the siwak and his words “with the Highest Companion” at his death are in Sahih al-Bukhari, from Aishah.",
      },
    },
    title: "بل الرفيق الأعلى",
    content: {
      tier_1_age_6_8: {
        narrative:
          "كان رأسه ﷺ على صدر عائشة رضي الله عنها، فدخل أخوها ومعه سواك رطب، فنظر إليه النبي ﷺ، فعرفت أنه يريده، فليّنته له فاستنّ به. ثم رفع بصره وجعل يقول: «مع الرفيق الأعلى»، ثم قضى ﷺ.",
        shortLesson: "آخر ما يبقى من الإنسان اختياره.",
      },
      tier_2_age_9_11: {
        narrative:
          "في يوم الاثنين، كان رأس النبي ﷺ بين سَحْر عائشة رضي الله عنها ونَحرها. فدخل أخوها عبد الرحمن بن أبي بكر ومعه سواك رطب، فنظر إليه النبي ﷺ نظرة عرفت منها عائشة أنه يشتهيه، فقالت: آخذه لك؟ فأشار برأسه أن نعم. فأخذته فقضمته وليّنته بأسنانها ثم أعطته إياه، فاستنّ به أحسن ما رأته يستنّ. ثم أراد أن يناولها إياه فسقطت يده. وكان بين يديه رَكوة فيها ماء يدخل يديه فيمسح بهما وجهه. ثم رفع بصره إلى السقف وقال: «مع الذين أنعمت عليهم من النبيّين والصدّيقين والشهداء والصالحين»، ثم قال: «اللهم اغفر لي وارحمني وألحقني بالرفيق الأعلى»، يكرّرها: «بل الرفيق الأعلى». ثم مالت يده وقُبض ﷺ.",
        details:
          "قال تعالى: ﴿وَمَن يُطِعِ اللَّهَ وَالرَّسُولَ فَأُولَٰئِكَ مَعَ الَّذِينَ أَنْعَمَ اللَّهُ عَلَيْهِم مِّنَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ وَالصَّالِحِينَ﴾.",
      },
    },
    interactive: {
      discover: "آخر عمل عمله ﷺ كان تنظيف فمه بالسواك، وهو سنّة كان يواظب عليها طوال حياته.",
      value: { name: "حسن الخاتمة", icon: "✨" },
      thinkQuestion:
        "فيه عادة صغيرة حلوة بتعملها كل يوم وتحبّ تفضل عليها؟",
      challenge: {
        type: "multiple_choice",
        question: "ما آخر ما قاله النبي ﷺ؟",
        options: ["أوصيكم بالمال", "بل الرفيق الأعلى", "احفظوا الطريق", "انتظروني"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "سواك", description: "سواك يذكّرك أن العادة الصغيرة تبقى إلى آخر لحظة." },
      badge: "حسن الخاتمة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "حديث السواك وقوله ﷺ «مع الرفيق الأعلى» عند وفاته في صحيح البخاري من حديث عائشة رضي الله عنها.",
    },
  },
  {
    storyId: "st-9-14",
    stationId: 9,
    slug: "city-earthquake-abu-bakr-speech",
    image: "/stories/seerah/city-earthquake-abu-bakr-speech.jpg",
    en: {
      title: "Madinah Shakes, and Abu Bakr Holds",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The news spread and Madinah was shaken. Umar stood saying: he has not died! Abu Bakr came, uncovered the Prophet's face, kissed it and wept, then went out to the people and said: “Whoever worshipped Muhammad — Muhammad has died. Whoever worships Allah — Allah is Living and does not die.” Then he recited the verse, and it was as if the people had never heard it before that day.",
          shortLesson: "In a crisis, someone is needed who will say the truth calmly.",
        },
        tier_2_age_9_11: {
          narrative:
            "When the news came out, Madinah was thrown into confusion. Umar ibn al-Khattab — stunned by it — stood telling the people that hypocrites were claiming the Messenger of Allah had died, and that by Allah he had not died but had gone to his Lord as Musa did. Abu Bakr rode in from his home at as-Sunh, spoke to no one, and went in to Aishah. He uncovered the Prophet's face, kissed it, wept, and said: you were good in life and in death. Then he went out while Umar was still speaking, and said: gently, Umar. And then: “Whoever among you worshipped Muhammad — Muhammad has died. Whoever worships Allah — Allah is Living and does not die.” Then he recited: “Muhammad is only a messenger; messengers have passed away before him.” The people said afterwards: by Allah, it was as if the people did not know Allah had revealed that verse until Abu Bakr recited it. And Umar sat down on the ground.",
          details:
            "Allah says: ﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ﴾ — “Muhammad is only a messenger; messengers have passed away before him.”",
        },
      },
      interactive: {
        discover: "The verse had come down years earlier, but people only understood it that day.",
        value: { name: "Steadiness in shock", icon: "🗻" },
        thinkQuestion: "When hard news comes, are you the one who steadies or the one who panics? How could you practise?",
        challenge: {
          type: "multiple_choice",
          question: "What did Abu Bakr say to the people on the day the Prophet ﷺ died?",
          options: ["Be patient, he will return", "Whoever worshipped Muhammad — he has died; whoever worships Allah — Allah does not die", "Say nothing", "Leave Madinah"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A steady stone", description: "A stone for the man who held firm when everyone else was shaken." },
        badge: "Steady in Crisis",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "Abu Bakr's address on the day of the Prophet's death, and the people's words about the verse, are in Sahih al-Bukhari.",
      },
    },
    title: "زلزال المدينة وثبات الصدّيق",
    content: {
      tier_1_age_6_8: {
        narrative:
          "انتشر الخبر فاضطربت المدينة، وقام عمر رضي الله عنه يقول: ما مات! فجاء أبو بكر رضي الله عنه فكشف عن وجهه وقبّله وبكى، ثم خرج إلى الناس فقال: «من كان يعبد محمداً فإن محمداً قد مات، ومن كان يعبد الله فإن الله حيّ لا يموت». وتلا الآية، فكأن الناس ما سمعوها قبل ذلك اليوم.",
        shortLesson: "في الأزمة، يُحتاج إلى من يقول الحقيقة بهدوء.",
      },
      tier_2_age_9_11: {
        narrative:
          "لما خرج الخبر اضطربت المدينة اضطراباً شديداً. وقام عمر بن الخطاب رضي الله عنه — وقد أذهله الأمر — يقول للناس: إن رجالاً من المنافقين يزعمون أن رسول الله مات، وإنه والله ما مات ولكنه ذهب إلى ربه كما ذهب موسى. وأقبل أبو بكر رضي الله عنه من مسكنه بالسُّنح، فلم يكلّم أحداً حتى دخل على عائشة رضي الله عنها، فكشف عن وجه النبي ﷺ فقبّله وبكى وقال: طبتَ حيّاً وميّتاً. ثم خرج إلى الناس وعمر يتكلّم، فقال: على رِسلك يا عمر. ثم قال: «أما بعد، فمن كان منكم يعبد محمداً فإن محمداً قد مات، ومن كان يعبد الله فإن الله حيّ لا يموت». ثم تلا: ﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ﴾. قال الناس: فوالله لكأنّ الناس لم يعلموا أن الله أنزل هذه الآية حتى تلاها أبو بكر. وجلس عمر إلى الأرض.",
        details:
          "قال تعالى: ﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ﴾.",
      },
    },
    interactive: {
      discover: "الآية كانت قد نزلت قبل ذلك بسنين، لكن الناس ما فهموها إلا يومئذ.",
      value: { name: "الثبات وقت الصدمة", icon: "🗻" },
      thinkQuestion:
        "لما بيحصل خبر صعب، إنت من النوع اللي بيهدأ ولا اللي بيرتبك؟ إزاي تتدرّب؟",
      challenge: {
        type: "multiple_choice",
        question: "بمَ خاطب أبو بكر رضي الله عنه الناس يوم وفاة النبي ﷺ؟",
        options: ["اصبروا وسيعود", "من كان يعبد محمداً فإن محمداً قد مات، ومن كان يعبد الله فإن الله حيّ لا يموت", "لا تتكلّموا", "اخرجوا من المدينة"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "حجر ثابت", description: "حجر يذكّرك بمن ثبت حين اضطرب الناس." },
      badge: "ثابت وقت الشدّة",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "خطبة أبي بكر رضي الله عنه يوم وفاة النبي ﷺ وقول الناس كأنهم لم يعلموا بالآية حتى تلاها — في صحيح البخاري.",
    },
  },
  {
    storyId: "st-9-15",
    stationId: 9,
    slug: "eternal-legacy-living-sunnah",
    image: "/stories/seerah/eternal-legacy-living-sunnah.jpg",
    en: {
      title: "What Remained After Him: The Light Did Not Go Out",
      content: {
        tier_1_age_6_8: {
          narrative:
            "The Prophet ﷺ was buried where he passed away, in Aishah's room. He left neither dinar nor dirham, but he left what lasts longer: the Book of Allah and his way, and a community that had learned truthfulness, mercy and justice. His companions carried it to those after them, until it reached us.",
          shortLesson: "What you leave in people outlasts you.",
        },
        tier_2_age_9_11: {
          narrative:
            "The Prophet ﷺ was buried in the place where he passed away, in Aishah's room beside his mosque. When he died he left no dinar and no dirham, no servant, no sheep and no camel — only his weapons, his white mule, and land he had given away as charity. But he left what does not wear out: the Book of Allah preserved, his way preserved, and a community that had learned that truth saves you, that the weak have rights, that a neighbour is honoured, that an animal is shown mercy, and that learning is for everyone. His companions carried all of it and passed it on, generation after generation, until it reached us — reading his life and learning from it. And loving him is not done with words alone: it is done when people can see something in you that you learned from him.",
          details:
            "Allah says: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — “We sent you only as a mercy to all the worlds.”",
        },
      },
      interactive: {
        discover: "He died with his armour pledged to a Jewish man for thirty measures of barley he had taken as food for his family.",
        value: { name: "What lasts", icon: "🌟" },
        thinkQuestion: "If someone described you by one quality you learned from his life, what would you want it to be?",
        challenge: {
          type: "multiple_choice",
          question: "What did the Prophet ﷺ leave behind when he died?",
          options: ["A great deal of money", "No dinar or dirham — the Book of Allah and his way", "Palaces", "An army"],
          correctAnswer: 1,
        },
      },
      gamification: {
        artifact: { name: "A small lamp", description: "A lamp: light is passed from hand to hand." },
        badge: "Carrier of the Legacy",
      },
      source: {
        reliability: "🟢",
        reference: "Sahih al-Bukhari",
        note: "His burial place, that he left neither dinar nor dirham, and his armour being pledged are all in Sahih al-Bukhari.",
      },
    },
    title: "ما بقي بعده: النور لا ينطفئ",
    content: {
      tier_1_age_6_8: {
        narrative:
          "دُفن النبي ﷺ في الموضع الذي قُبض فيه في حجرة عائشة رضي الله عنها. ولم يترك ديناراً ولا درهماً، وإنما ترك ما هو أبقى: كتاب الله وسنّته، وأمّة تعلّمت الصدق والرحمة والعدل. وحملها الصحابة إلى من بعدهم، حتى وصلت إلينا.",
        shortLesson: "الأثر يبقى بعد صاحبه إذا كان في الناس.",
      },
      tier_2_age_9_11: {
        narrative:
          "دُفن النبي ﷺ في الموضع الذي قُبض فيه، في حجرة عائشة رضي الله عنها إلى جانب مسجده. ولم يترك حين مات ديناراً ولا درهماً ولا عبداً ولا أمة، ولا شاة ولا بعيراً إلا سلاحه وبغلته البيضاء وأرضاً جعلها صدقة. لكنه ترك ما لا يبلى: كتاب الله محفوظاً، وسنّةً محفوظة، وأمّةً تعلّمت أن الصدق ينجّي، وأن الضعيف له حقّ، وأن الجار يُكرَم، وأن الحيوان يُرحَم، وأن العلم لكل أحد. وحمل الصحابة هذا كلّه ونقلوه، جيلاً بعد جيل، حتى وصل إلينا نحن اليوم — نقرأ سيرته ونتعلّم منها. وحبّه ﷺ لا يكون بالكلام وحده، وإنما بأن يرى الناس فيك شيئاً مما تعلّمته منه.",
        details:
          "قال تعالى: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾.",
      },
    },
    interactive: {
      discover: "مات ﷺ ودرعه مرهونة عند يهوديّ في ثلاثين صاعاً من شعير أخذها طعاماً لأهله.",
      value: { name: "الأثر الباقي", icon: "🌟" },
      thinkQuestion:
        "لو حدّ وصفك بخلق واحد اتعلّمته من سيرة النبي ﷺ، تحبّ يكون إيه؟",
      challenge: {
        type: "multiple_choice",
        question: "ماذا ترك النبي ﷺ حين مات؟",
        options: ["مالاً كثيراً", "لم يترك ديناراً ولا درهماً، وترك كتاب الله وسنّته", "قصوراً", "جيشاً"],
        correctAnswer: 1,
      },
    },
    gamification: {
      artifact: { name: "قنديل صغير", description: "قنديل يذكّرك أن النور يُسلَّم من يد إلى يد." },
      badge: "حامل الأثر",
    },
    source: {
      reliability: "🟢",
      reference: "صحيح البخاري",
      note: "موضع دفنه ﷺ وأنه لم يترك ديناراً ولا درهماً ورهن درعه عند يهوديّ — كلّها في صحيح البخاري.",
    },
  },
];
