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

/** A story's English text, as seerah-en.ts carries it for each slug. */
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

/** The parts of a story every reader needs, in Arabic. The Arabic narrative
 *  itself is the station text (seerah-pilot-station-N.ts), and `title` and
 *  `hook` are copied from it so cards, links and search results name a story
 *  the way its page does. English is in seerah-en.ts, keyed by slug. */
export type SeerahStory = {
  storyId: string;
  stationId: number;
  slug: string;
  title: string;
  /** The station text's opening question — one line, for cards. */
  hook: string;
  image?: string;
  interactive: SeerahText["interactive"];
  gamification: SeerahText["gamification"];
  source: SeerahText["source"];
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
/** What a card or a challenge shows, in the reader's language. `lead` is
 *  the one line under a title: the station hook in Arabic, the short lesson
 *  in English. Pass the story's English text for an English reader; without
 *  it the Arabic is shown. */
export type SeerahView = Pick<SeerahText, "title" | "interactive" | "gamification" | "source"> & { lead: string };

export const seerahTextFor = (story: SeerahStory, english?: SeerahText): SeerahView =>
  english
    ? { title: english.title, lead: english.content.tier_1_age_6_8.shortLesson, interactive: english.interactive, gamification: english.gamification, source: english.source }
    : { title: story.title, lead: story.hook, interactive: story.interactive, gamification: story.gamification, source: story.source };

/** The station a story belongs to, for headings and link previews. */
export const seerahStationOf = (story: SeerahStory): SeerahStation =>
  seerahStations.find(s => s.stationId === story.stationId) ?? seerahStations[0];

export const seerahStories: SeerahStory[] = [
  {
    "storyId": "st-1-01",
    "stationId": 1,
    "slug": "birth-of-light",
    "title": "عام الفيل ومولد النبي ﷺ",
    "hook": "في مكة كان بيت الله قائمًا، ثم اتجه إليه جيش ومعه فيل. ماذا حدث حين وصل أصحاب الفيل؟",
    "image": "/stories/seerah/birth-of-light.jpg",
    "interactive": {
      "discover": "اسم والد النبي هو (عبد الله) واسم أمه (آمنة بنت وهب).",
      "value": {
        "name": "حماية الله",
        "icon": "🛡️"
      },
      "thinkQuestion": "لماذا في رأيك أراد الله أن يولد النبي ﷺ في عام حدثت فيه معجزة كبيرة مثل هزيمة الفيل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما هو الحيوان الضخم الذي استخدمه الجيش الشرير لمحاولة هدم الكعبة؟",
        "options": [
          "الحصان",
          "الأسد",
          "الفيل",
          "الجمل"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "حجر من سِجّيل",
        "description": "حجر تذكاري يذكّرك بأن القوة الحقيقية بيد الله."
      },
      "badge": "وسام: طفل مكة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، السيرة النبوية الصحيحة",
      "note": "الأحداث ثابتة بالقرآن (سورة الفيل) وصحيح السيرة."
    }
  },
  {
    "storyId": "st-1-02",
    "stationId": 1,
    "slug": "desert-breeze",
    "title": "في بادية بني سعد",
    "hook": "ترك محمد ﷺ مكة وهو طفل صغير ليعيش فترةً في بادية بني سعد. كيف صار المكان الجديد جزءًا من طفولته؟",
    "image": "/stories/seerah/desert-breeze.jpg",
    "interactive": {
      "discover": "قضى النبي ﷺ في بادية بني سعد حوالي أربع سنوات يتعلم فيها الفصاحة.",
      "value": {
        "name": "البركة والرضا",
        "icon": "✨"
      },
      "thinkQuestion": "لو ذهبت في رحلة تخييم في الصحراء بعيداً عن الأجهزة الإلكترونية، ما هي المهارة التي تحب أن تتعلمها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما اسم السيدة الطيبة التي أرضعت النبي ﷺ في البادية؟",
        "options": [
          "آمنة",
          "حليمة السعدية",
          "خديجة",
          "فاطمة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "وعاء حليب خشبي",
        "description": "يرمز للخير والبركة التي حلت على بيت حليمة."
      },
      "badge": "وسام: فصيح البادية"
    },
    "source": {
      "reliability": "🟢",
      "reference": "الرحيق المختوم، صحيح مسلم (أجزاء من القصة)",
      "note": "قصة حليمة والبركة ثابتة ومشهورة في كتب السيرة المعتمدة."
    }
  },
  {
    "storyId": "st-1-03",
    "stationId": 1,
    "slug": "grandfather-love",
    "title": "بعد فقد الأم",
    "hook": "كان محمد ﷺ طفلًا حين فقد أمه. من الذي تولى رعايته بعد ذلك؟",
    "image": "/stories/seerah/grandfather-love.jpg",
    "interactive": {
      "discover": "توفي عبد المطلب والنبي ﷺ في الثامنة من عمره، بعد أن منحه حباً وأماناً كبيراً.",
      "value": {
        "name": "حنان العائلة",
        "icon": "👴"
      },
      "thinkQuestion": "من هو الشخص في عائلتك الذي تشعر أنه يحبك ويدللك مثل عبد المطلب؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أين كان يضع عبد المطلب بساطه (سجادته) ليجلس عليها؟",
        "options": [
          "في السوق",
          "في ظل الكعبة",
          "فوق الجبل",
          "داخل خيمة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بساط الجد الزعيم",
        "description": "يرمز لمكانة النبي ﷺ العالية ومحبة جده له."
      },
      "badge": "وسام: حفيد الزعيم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، زاد المعاد",
      "note": "كفالة عبد المطلب وقصة الفراش ثابتة تاريخياً."
    }
  },
  {
    "storyId": "st-1-04",
    "stationId": 1,
    "slug": "uncle-home",
    "title": "في كفالة أبي طالب",
    "hook": "بعد وفاة الجد الذي كفل محمدًا ﷺ، انتقلت رعايته إلى عمه أبي طالب. كيف استمرت الأسرة في حفظه؟",
    "image": "/stories/seerah/uncle-home.jpg",
    "interactive": {
      "discover": "علي بن أبي طالب (الصحابي الجليل) هو ابن عم النبي ﷺ، وقد تربيا معاً في نفس هذا البيت.",
      "value": {
        "name": "القناعة والمشاركة",
        "icon": "🍲"
      },
      "thinkQuestion": "عندما يكون لديك القليل من الحلوى وأصدقاؤك كثيرون، كيف تتصرف؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "من الذي تولى رعاية النبي ﷺ بعد وفاة جده؟",
        "options": [
          "عمه أبو لهب",
          "عمه أبو طالب",
          "أبو بكر",
          "عمه العباس"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "طبق الفخار المبارك",
        "description": "يرمز للبركة والقناعة في بيت أبي طالب."
      },
      "badge": "وسام: القنوع المشارك"
    },
    "source": {
      "reliability": "🟢",
      "reference": "الطبقات الكبرى لابن سعد، السيرة النبوية",
      "note": "رعاية أبي طالب ثابتة ومحورية في السيرة."
    }
  },
  {
    "storyId": "st-1-05",
    "stationId": 1,
    "slug": "little-shepherd",
    "title": "راعي الغنم",
    "hook": "قبل البعثة، عمل محمد ﷺ في رعي الغنم لأهل مكة. كيف نعرف ذلك؟ من حديث صحيح قاله النبي ﷺ بنفسه.",
    "image": "/stories/seerah/little-shepherd.jpg",
    "interactive": {
      "discover": "ما الفرق بين أن تبدأ مهمة وبين أن تبقى مسؤولًا عنها حتى تنتهي؟",
      "value": {
        "name": "المسؤولية والصبر",
        "icon": "🐑"
      },
      "thinkQuestion": "ما هي المهمة الصغيرة التي يمكنك القيام بها اليوم في المنزل لمساعدة عائلتك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بحسب صحيح البخاري 2262، ما العمل الذي قام به النبي ﷺ لأهل مكة؟",
        "options": [
          "الحدادة",
          "رعي الأغنام",
          "صيد السمك",
          "الزراعة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "عصا الراعي",
        "description": "رمز للصبر، الرعاية، والقيادة الرحيمة."
      },
      "badge": "وسام: الراعي المسؤول"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري 2262، كتاب الإجارة، حديث أبي هريرة رضي الله عنه",
      "note": "يثبت الحديث رعيه لغنم أهل مكة على قراريط، ولا يحدد عمره أو دوافعه الشخصية. ودرس المسؤولية تأمل تربوي."
    }
  },
  {
    "storyId": "st-2-01",
    "stationId": 2,
    "slug": "the-honest-merchant",
    "title": "تاجر مكة الأمين",
    "hook": "كبر محمد ﷺ في مكة، ودخل عالم البيع والشراء. فما الذي جعل الناس يعرفونه بالأمانة؟",
    "image": "/stories/seerah/the-honest-merchant.jpg",
    "interactive": {
      "discover": "كان النبي ﷺ مشهوراً بالأمانة لدرجة أن حتى أعداءه كانوا يتركون أموالهم أمانة عنده ليحفظها لهم!",
      "value": {
        "name": "الصدق والأمانة",
        "icon": "⚖️"
      },
      "thinkQuestion": "إذا وجدت قلماً جميلاً في الفصل وكنت تعرف أنه لصديقك، ماذا تفعل لتكون (أميناً)؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما هو اللقب الذي أطلقه أهل مكة على النبي ﷺ لصدقه؟",
        "options": [
          "الشجاع",
          "القوي",
          "الصادق الأمين",
          "الزعيم"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "ميزان التجارة الذهبي",
        "description": "يرمز للعدل والأمانة في التعامل مع الناس."
      },
      "badge": "وسام: التاجر الأمين"
    },
    "source": {
      "reliability": "🟢",
      "reference": "السيرة النبوية لابن هشام",
      "note": "لقب الصادق الأمين وعمله بالتجارة من الثوابت التاريخية المتواترة."
    }
  },
  {
    "storyId": "st-2-02",
    "stationId": 2,
    "slug": "khadijah",
    "title": "خديجة رضي الله عنها",
    "hook": "كانت خديجة بنت خويلد رضي الله عنها تاجرة ذات مكانة في مكة. كيف التقت قصتها بقصة محمد ﷺ؟",
    "image": "/stories/seerah/khadijah.jpg",
    "interactive": {
      "discover": "السيدة خديجة كانت تُلقب في مكة بـ (الطاهرة) لأخلاقها العالية قبل الإسلام.",
      "value": {
        "name": "الاحترام والمحبة",
        "icon": "❤️"
      },
      "thinkQuestion": "كيف تظهر الاحترام لأمك في البيت كما كان النبي ﷺ يحترم عائلته؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما اسم السيدة العظيمة التي تزوجها النبي ﷺ بعد أن تاجر بمالها؟",
        "options": [
          "حليمة",
          "آمنة",
          "خديجة",
          "عائشة"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "مصباح خديجة المضيء",
        "description": "يرمز للدفء والحب والدعم في أسرة النبي ﷺ."
      },
      "badge": "وسام: العائلة المتحابة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، سيرة ابن هشام",
      "note": "زواج النبي ﷺ من السيدة خديجة ثابت بإجماع المصادر."
    }
  },
  {
    "storyId": "st-2-03",
    "stationId": 2,
    "slug": "the-black-stone",
    "title": "حكمة الحجر الأسود",
    "hook": "تعاونت قبائل قريش في بناء الكعبة، ثم وصلت إلى موضع الحجر الأسود. عندها بدأ خلاف كاد يفرّق ما جمعه البناء.",
    "image": "/stories/seerah/the-black-stone.jpg",
    "interactive": {
      "discover": "الحجر الأسود يقع في الزاوية الشرقية للكعبة المشرفة، ومن عنده يبدأ الطواف.",
      "value": {
        "name": "الحكمة والسلام",
        "icon": "🕊️"
      },
      "thinkQuestion": "لو اختلف أصدقاؤك على من يكون قائد الفريق في اللعبة، كيف تحل المشكلة بذكاء؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا استخدم النبي ﷺ ليحل مشكلة الحجر الأسود؟",
        "options": [
          "عصا خشبية",
          "رداء (قطعة قماش)",
          "صندوق خشبي",
          "سيف"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "رداء السلام",
        "description": "يرمز للتعاون وحل الخلافات بذكاء وحكمة."
      },
      "badge": "وسام: صانع السلام"
    },
    "source": {
      "reliability": "🟢",
      "reference": "مسند أحمد، سيرة ابن هشام",
      "note": "قصة الحجر الأسود ثابتة وتعتبر من أهم إرهاصات القيادة قبل النبوة."
    }
  },
  {
    "storyId": "st-2-04",
    "stationId": 2,
    "slug": "hilf-al-fudul",
    "title": "نصرة المظلوم",
    "hook": "وصل رجل غريب إلى مكة، ثم حُبس حقه عنه. من الذي يقف إلى جانبه حين لا يعرف أهل المكان؟",
    "image": "/stories/seerah/hilf-al-fudul.jpg",
    "interactive": {
      "discover": "سمي «حلف الفضول» بهذا الاسم لأنه يعني (حلف الفضائل والأخلاق الكريمة).",
      "value": {
        "name": "العدل ونصرة المظلوم",
        "icon": "🤝"
      },
      "thinkQuestion": "لو رأيت طفلاً كبيراً يضايق طفلاً صغيراً في المدرسة، ماذا تفعل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما اسم الاتفاق العظيم الذي حضره النبي ﷺ لنصرة المظلومين؟",
        "options": [
          "حلف الفضول",
          "حلف مكة",
          "اتفاق السلام",
          "عقد التجارة"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "وثيقة العدل",
        "description": "تذكرك بأن تقف دائماً بجانب الضعفاء والمظلومين."
      },
      "badge": "وسام: نصير المظلوم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سنن البيهقي، السيرة النبوية",
      "note": "حضور النبي لحلف الفضول ثابت ومهم لتوضيح ميله للعدل قبل البعثة."
    }
  },
  {
    "storyId": "st-2-05",
    "stationId": 2,
    "slug": "cave-of-hira",
    "title": "الخلوة في غار حراء",
    "hook": "في أعلى جبل، كان غار حراء مكانًا يعود إليه محمد ﷺ قبل أن يبدأ نزول الوحي. ماذا كان يفعل هناك؟",
    "image": "/stories/seerah/cave-of-hira.jpg",
    "interactive": {
      "discover": "يُسمى الجبل الذي يوجد فيه غار حراء بـ (جبل النور)، لأنه المكان الذي بدأ منه نزول نور الوحي على الأرض.",
      "value": {
        "name": "التأمل والتفكر",
        "icon": "🌌"
      },
      "thinkQuestion": "ما هو أكثر شيء تراه في الطبيعة (مثل النجوم، البحر، أو الأشجار) يجعلك تتعجب من قدرة الله؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما اسم الغار (الكهف) الذي كان النبي ﷺ يتفكر فيه بخلق الله؟",
        "options": [
          "غار ثور",
          "غار حراء",
          "غار مكة",
          "غار النور"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قربة الماء البسيطة",
        "description": "ترمز للبساطة، والهدوء، والتأمل في غار حراء."
      },
      "badge": "وسام: المتفكر الذكي"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري (حديث عائشة عن بدء الوحي)",
      "note": "تحنثه (تعبده) في غار حراء ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-3-01",
    "stationId": 3,
    "slug": "revelation-iqra",
    "title": "أول الوحي: اقرأ",
    "hook": "في غار حراء، جاء جبريل عليه السلام إلى محمد ﷺ بكلمة ستبدأ بها رحلة القرآن: «اقرأ». ",
    "image": "/stories/seerah/revelation-iqra.jpg",
    "interactive": {
      "discover": "أول ما نزل من القرآن خمس آيات من سورة العلق، أولها ﴿اقْرَأْ﴾.",
      "value": {
        "name": "العلم والقراءة",
        "icon": "📖"
      },
      "thinkQuestion": "لماذا في رأيك كانت أول كلمة يقولها المَلَك للنبي ﷺ هي «اقرأ» وليست كلمة أخرى؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما أول كلمة نزلت من القرآن الكريم على النبي ﷺ؟",
        "options": [
          "اكتب",
          "اقرأ",
          "قُم",
          "اسمع"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قلم من نور",
        "description": "تذكار يذكّرك بأن العلم أول ما أمر الله به."
      },
      "badge": "وسام: أول القُرّاء"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، كتاب بدء الوحي",
      "note": "حديث بدء الوحي في غار حراء ثابت في صحيح البخاري."
    }
  },
  {
    "storyId": "st-3-02",
    "stationId": 3,
    "slug": "revelation-waraqah",
    "title": "ورقة بن نوفل",
    "hook": "بعد العودة من غار حراء، ذهبت خديجة رضي الله عنها بمحمد ﷺ إلى ورقة بن نوفل. ماذا قال حين سمع الخبر؟",
    "image": "/stories/seerah/revelation-waraqah.jpg",
    "interactive": {
      "discover": "ورقة بن نوفل كان ابن عم السيدة خديجة رضي الله عنها.",
      "value": {
        "name": "سؤال أهل العلم",
        "icon": "🧭"
      },
      "thinkQuestion": "لو واجهتك مسألة صعبة لا تفهمها، مَن الشخص الحكيم الذي تسأله في بيتك أو مدرستك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا وصف ورقةُ بن نوفل المَلَكَ الذي جاء النبي ﷺ؟",
        "options": [
          "ملك من ملوك العرب",
          "الناموس الذي نزل على موسى",
          "رجل من أهل مكة",
          "تاجر من الشام"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "لفافة قديمة",
        "description": "لفافة تذكّرك بأن العلم القديم دلّ على الحق."
      },
      "badge": "وسام: طالب الحكمة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، كتاب بدء الوحي",
      "note": "خبر ذهاب خديجة بالنبي ﷺ إلى ورقة ثابت في صحيح البخاري."
    }
  },
  {
    "storyId": "st-3-03",
    "stationId": 3,
    "slug": "revelation-pause",
    "title": "سورة الضحى",
    "hook": "بعد بداية الوحي، مرّت فترة لم ينزل فيها الوحي. ثم جاءت سورة تبدأ بقسم جميل: «والضحى». ",
    "image": "/stories/seerah/revelation-pause.jpg",
    "interactive": {
      "discover": "سورة الضحى نزلت كلها مواساة للنبي ﷺ بعد فترة انقطاع الوحي.",
      "value": {
        "name": "الطمأنينة بعد الحزن",
        "icon": "🌅"
      },
      "thinkQuestion": "حين تحزن، ما الكلام الذي يطمئن قلبك؟ ومن الذي تحب أن تسمعه منه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي سورة نزلت تواسي النبي ﷺ بعد انقطاع الوحي؟",
        "options": [
          "سورة الفيل",
          "سورة الضحى",
          "سورة الكوثر",
          "سورة العصر"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ضوء الضحى",
        "description": "شعاع يذكّرك أن بعد كل عسر يسراً."
      },
      "badge": "وسام: قلب مطمئن"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سورة الضحى، وصحيح البخاري",
      "note": "سبب نزول سورة الضحى بعد فترة فتور الوحي ثابت في صحيح البخاري."
    }
  },
  {
    "storyId": "st-3-04",
    "stationId": 3,
    "slug": "revelation-muddaththir",
    "title": "يا أيها المدثر: قم فأنذر",
    "hook": "عاد النبي ﷺ إلى بيته يقول: «دثروني». ثم نزل نداء يطلب منه أن يقوم. ",
    "image": "/stories/seerah/revelation-muddaththir.jpg",
    "interactive": {
      "discover": "كلمة «المدثّر» معناها المتغطّي بثوبه.",
      "value": {
        "name": "الهمّة والعمل",
        "icon": "🌄"
      },
      "thinkQuestion": "ما العمل المهم الذي تؤجّله وأنت تقدر أن تقوم به اليوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ حين عاد إلى بيته بعد أن رأى جبريل عليه السلام؟",
        "options": [
          "اسقوني",
          "دثّروني",
          "افتحوا الباب",
          "اتركوني"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "رداء المدثّر",
        "description": "رداء يذكّرك أن وقت الراحة ينتهي حين ينادي العمل."
      },
      "badge": "وسام: صاحب الهمّة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، كتاب بدء الوحي",
      "note": "حديث «دثّروني» ونزول أول سورة المدثر ثابت في صحيح البخاري."
    }
  },
  {
    "storyId": "st-3-05",
    "stationId": 3,
    "slug": "revelation-forms",
    "title": "كيف كان ينزل الوحي؟",
    "hook": "الوحي لم يأتِ للنبي ﷺ بطريقة واحدة. وقد سأل الحارث بن هشام رضي الله عنه عن ذلك، فجاء الجواب من النبي ﷺ نفسه.",
    "image": "/stories/seerah/revelation-forms.jpg",
    "interactive": {
      "discover": "نزل القرآن على النبي ﷺ في ثلاث وعشرين سنة، لا مرة واحدة.",
      "value": {
        "name": "تقدير القرآن",
        "icon": "✨"
      },
      "thinkQuestion": "لو عرفت كم تعب النبي ﷺ حتى يصلك القرآن، كيف ستقرأه اليوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي أنواع الوحي كان أشدّها على النبي ﷺ؟",
        "options": [
          "الرؤيا في المنام",
          "مجيء جبريل في صورة رجل",
          "مثل صلصلة الجرس",
          "الإلقاء في القلب"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "جرس من فضة",
        "description": "تذكار يذكّرك بثقل الكلمة التي حُملت من أجلك."
      },
      "badge": "وسام: حافظ الأمانة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، كتاب بدء الوحي",
      "note": "أوجه نزول الوحي وحديث «مثل صلصلة الجرس» ثابتة في صحيح البخاري."
    }
  },
  {
    "storyId": "st-4-01",
    "stationId": 4,
    "slug": "dar-al-arqam",
    "title": "دار الأرقم",
    "hook": "في مكة، بدأت الدعوة إلى الإسلام بهدوء. أين كان المسلمون يلتقون ليتعلموا القرآن؟",
    "image": "/stories/seerah/dar-al-arqam.jpg",
    "interactive": {
      "discover": "دام هذا الطور السرّي من الدعوة نحو ثلاث سنوات.",
      "value": {
        "name": "حسن التخطيط",
        "icon": "🏠"
      },
      "thinkQuestion": "لماذا في رأيك اختار النبي ﷺ بيتاً لشاب صغير مكاناً للاجتماع، لا بيت رجل كبير معروف؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "في بيت مَن كان المسلمون الأوائل يجتمعون سراً؟",
        "options": [
          "بيت أبي بكر",
          "بيت الأرقم بن أبي الأرقم",
          "بيت خديجة",
          "بيت علي"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "مفتاح دار الأرقم",
        "description": "مفتاح يذكّرك أن أعظم البدايات تبدأ في مكان صغير."
      },
      "badge": "وسام: من السابقين"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، الطبقات الكبرى لابن سعد",
      "note": "اجتماع المسلمين الأوائل في دار الأرقم مشهور في كتب السيرة."
    }
  },
  {
    "storyId": "st-4-02",
    "stationId": 4,
    "slug": "mount-safa-call",
    "title": "نداء جبل الصفا",
    "hook": "صعد النبي ﷺ جبل الصفا ونادى قبائل مكة. ماذا أراد أن يبلغهم؟",
    "image": "/stories/seerah/mount-safa-call.jpg",
    "interactive": {
      "discover": "سورة المسد نزلت في أبي لهب، وهو عمّ النبي ﷺ.",
      "value": {
        "name": "الشجاعة في قول الحق",
        "icon": "📣"
      },
      "thinkQuestion": "لماذا بدأ النبي ﷺ بسؤالهم عن صدقه قبل أن يبلّغهم رسالته؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا وصف أهل مكة النبي ﷺ قبل أن يبلّغهم رسالته؟",
        "options": [
          "الشاعر",
          "الصادق الأمين",
          "الفارس",
          "التاجر"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حجر من الصفا",
        "description": "حجر يذكّرك بأول نداء جهر به الحق في مكة."
      },
      "badge": "وسام: صوت الحق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، وسورة المسد",
      "note": "حديث نداء النبي ﷺ على الصفا ثابت في صحيح البخاري."
    }
  },
  {
    "storyId": "st-4-03",
    "stationId": 4,
    "slug": "heroes-of-patience",
    "title": "الثبات على الإيمان",
    "hook": "حين آمن بعض أهل مكة، واجهوا أذى لأنهم اختاروا الإسلام. كيف ثبتوا؟",
    "image": "/stories/seerah/heroes-of-patience.jpg",
    "interactive": {
      "discover": "أبو بكر رضي الله عنه اشترى بلالاً وأعتقه.",
      "value": {
        "name": "الصبر والثبات",
        "icon": "🔥"
      },
      "thinkQuestion": "ما أصعب موقف صبرت فيه؟ وما الذي أعانك على الصبر؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما الكلمة التي كان بلال رضي الله عنه يردّدها تحت التعذيب؟",
        "options": [
          "أحدٌ أحد",
          "الصبر",
          "النجاة",
          "الرحمة"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "حصاة من رمل مكة",
        "description": "حصاة تذكّرك بمن ثبتوا حين كان الثبات أصعب شيء."
      },
      "badge": "وسام: قلب لا يُهزم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، وصحيح البخاري",
      "note": "تعذيب بلال وآل ياسر ثابت في كتب السيرة، وذكر البخاري خبر بلال وشراء أبي بكر له."
    }
  },
  {
    "storyId": "st-4-04",
    "stationId": 4,
    "slug": "migration-to-abyssinia",
    "title": "الهجرة إلى أرض الملك العادل",
    "hook": "اشتد الأذى في مكة، فبحث المسلمون عن مكان آمن. إلى أين ذهبوا؟",
    "image": "/stories/seerah/migration-to-abyssinia.jpg",
    "interactive": {
      "discover": "هجرة الحبشة هي أول هجرة في الإسلام، قبل الهجرة إلى المدينة.",
      "value": {
        "name": "العدل والحوار",
        "icon": "⛵"
      },
      "thinkQuestion": "لماذا أصرّ النجاشي أن يسمع من الطرفين قبل أن يحكم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي سورة قرأها جعفر بن أبي طالب أمام النجاشي؟",
        "options": [
          "سورة يوسف",
          "سورة مريم",
          "سورة الكهف",
          "سورة طه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "شراع صغير",
        "description": "شراع يذكّرك بأول رحلة عبرت البحر من أجل الدين."
      },
      "badge": "وسام: مهاجر أول"
    },
    "source": {
      "reliability": "🟢",
      "reference": "مسند أحمد، وسيرة ابن هشام",
      "note": "خبر هجرة الحبشة وكلام جعفر أمام النجاشي مروي في مسند أحمد وكتب السيرة."
    }
  },
  {
    "storyId": "st-4-05",
    "stationId": 4,
    "slug": "year-of-sorrow",
    "title": "الحصار وعام الحزن",
    "hook": "مرت على النبي ﷺ وأصحابه سنوات صعبة، ثم فقد أشخاصًا كانوا قريبين منه. كيف استمر في دعوته؟",
    "image": "/stories/seerah/year-of-sorrow.jpg",
    "interactive": {
      "discover": "سُمي المكان شِعب أبي طالب، والشِّعب طريق ضيق بين جبلين.",
      "value": {
        "name": "الصمود والترابط",
        "icon": "⛰️"
      },
      "thinkQuestion": "ما الذي يجعل الناس يصمدون معاً في الأزمات؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "كم سنة استمر حصار المسلمين في الشِّعب؟",
        "options": [
          "سنة واحدة",
          "سنتان",
          "ثلاث سنوات",
          "خمس سنوات"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "ورقة شجر",
        "description": "ورقة تذكّرك بمن صبروا حين لم يجدوا ما يأكلون."
      },
      "badge": "وسام: صامد الشِّعب"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام",
      "note": "خبر الصحيفة والحصار في الشِّعب ووفاة خديجة وأبي طالب مشهور في كتب السيرة."
    }
  },
  {
    "storyId": "st-4-06",
    "stationId": 4,
    "slug": "islam-of-heroes",
    "title": "إسلام حمزة وعمر رضي الله عنهما",
    "hook": "دخل حمزة ثم عمر رضي الله عنهما في الإسلام، فكيف أثّر ذلك في المسلمين في مكة؟",
    "image": "/stories/seerah/islam-of-heroes.jpg",
    "interactive": {
      "discover": "لُقّب عمر بن الخطاب رضي الله عنه بالفاروق، لأن الله فرّق به بين الحق والباطل.",
      "value": {
        "name": "هداية القلوب",
        "icon": "🗡️"
      },
      "thinkQuestion": "ما الذي غيّر قلب عمر رضي الله عنه في لحظة واحدة؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي سورة سمعها عمر بن الخطاب فآمن؟",
        "options": [
          "سورة يس",
          "سورة طه",
          "سورة الرحمن",
          "سورة النور"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "سيف مغمود",
        "description": "سيف عاد إلى غمده حين انتصر الحق على الغضب."
      },
      "badge": "وسام: قلب اهتدى"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، الطبقات الكبرى لابن سعد",
      "note": "خبر إسلام حمزة وعمر رضي الله عنهما مشهور في كتب السيرة."
    }
  },
  {
    "storyId": "st-4-07",
    "stationId": 4,
    "slug": "sun-and-moon",
    "title": "الثبات على الدعوة",
    "hook": "عرضت قريش على النبي ﷺ أشياء كثيرة ليترك الدعوة. ماذا اختار؟",
    "image": "/stories/seerah/sun-and-moon.jpg",
    "interactive": {
      "discover": "عرضوا عليه المال والملك والطبّ إن كان به مرض — فرفض الثلاثة.",
      "value": {
        "name": "الثبات على المبدأ",
        "icon": "☀️"
      },
      "thinkQuestion": "ما الشيء الذي لا تبيعه مهما عُرض عليك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا ردّ النبي ﷺ على عرض المال والملك؟",
        "options": [
          "طلب مهلة للتفكير",
          "قبل بشرط",
          "لو وضعوا الشمس في يميني ما تركته",
          "سكت"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "ميزان ذهبي",
        "description": "ميزان يذكّرك أن بعض الأشياء لا ثمن لها."
      },
      "badge": "وسام: ثابت على الحق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام",
      "note": "هذا الخبر مشهور في كتب السيرة، ورواه ابن إسحاق مرسلاً."
    }
  },
  {
    "storyId": "st-4-08",
    "stationId": 4,
    "slug": "splitting-of-the-moon",
    "title": "انشقاق القمر",
    "hook": "طلب بعض أهل مكة آية، فرأوا القمر منشقًا. ماذا يخبرنا القرآن عن هذا الحدث؟",
    "image": "/stories/seerah/splitting-of-the-moon.jpg",
    "interactive": {
      "discover": "سورة القمر سُمّيت بهذه الحادثة، وتبدأ بذكرها.",
      "value": {
        "name": "التواضع لقبول الحق",
        "icon": "🌙"
      },
      "thinkQuestion": "لماذا لم يؤمنوا وقد رأوا المعجزة بأعينهم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي سورة ذكرت انشقاق القمر في أولها؟",
        "options": [
          "سورة النجم",
          "سورة القمر",
          "سورة الشمس",
          "سورة الليل"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "نصف قمر",
        "description": "تذكار لآية رآها الناس ثم أعرضوا عنها."
      },
      "badge": "وسام: شاهد الآية"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن (سورة القمر)، وصحيح البخاري ومسلم",
      "note": "حادثة انشقاق القمر ثابتة في القرآن والصحيحين."
    }
  },
  {
    "storyId": "st-4-09",
    "stationId": 4,
    "slug": "cotton-in-ears",
    "title": "القصيدة التي سمعت الحق",
    "hook": "كان الطفيل بن عمرو شاعرًا، وحذّره قومه من سماع النبي ﷺ. ماذا فعل حين وصل إلى مكة؟",
    "image": "/stories/seerah/cotton-in-ears.jpg",
    "interactive": {
      "discover": "رجع الطفيل إلى قومه دَوس يدعوهم، فأسلموا بعد ذلك.",
      "value": {
        "name": "التثبّت قبل الحكم",
        "icon": "👂"
      },
      "thinkQuestion": "هل صدّقت مرة كلاماً عن أحد ثم عرفت أنه غير صحيح؟ ماذا كان يجب أن تفعل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا وضع الطفيل بن عمرو في أذنيه أول الأمر؟",
        "options": [
          "الشمع",
          "القطن",
          "الطين",
          "القماش"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "خصلة قطن",
        "description": "قطنة تذكّرك أن تسمع بنفسك قبل أن تحكم."
      },
      "badge": "وسام: المستمع الذكي"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام",
      "note": "قصة إسلام الطفيل بن عمرو الدوسي مشهورة في كتب السيرة."
    }
  },
  {
    "storyId": "st-4-10",
    "stationId": 4,
    "slug": "journey-to-taif",
    "title": "رحلة الطائف",
    "hook": "خرج النبي ﷺ إلى الطائف يدعو إلى الله، لكنه لم يجد القبول الذي كان يرجوه. ماذا فعل بعد ذلك؟",
    "image": "/stories/seerah/journey-to-taif.jpg",
    "interactive": {
      "discover": "أهل الطائف أسلموا بعد سنوات، وصار منهم صحابة كرام.",
      "value": {
        "name": "الرحمة عند المقدرة",
        "icon": "🤲"
      },
      "thinkQuestion": "حين يؤذيك أحد وتستطيع أن تردّ، ما الذي يجعلك تختار العفو؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا ردّ النبي ﷺ على ملك الجبال حين استأذنه في إهلاك أهل الطائف؟",
        "options": [
          "وافق",
          "طلب المهلة",
          "رفض ورجا هداية ذريّتهم",
          "سكت"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "غصن زيتون",
        "description": "غصن يذكّرك أن الرحمة أقوى من الانتقام."
      },
      "badge": "وسام: رحمة للعالمين"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "حديث ملك الجبال ورجوع النبي ﷺ من الطائف ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-5-01",
    "stationId": 5,
    "slug": "chest-washing-zamzam",
    "title": "بداية ليلة الإسراء",
    "hook": "في ليلة واحدة أرى الله نبيَّه ﷺ آياتٍ عظيمة. كيف بدأت هذه الرحلة؟",
    "image": "/stories/seerah/chest-washing-zamzam.jpg",
    "interactive": {
      "discover": "شُقّ صدر النبي ﷺ أكثر من مرة في حياته، أولها وهو صغير في بادية بني سعد.",
      "value": {
        "name": "طهارة القلب",
        "icon": "💛"
      },
      "thinkQuestion": "ما العمل الذي تفعله اليوم ليبقى قلبك نظيفاً من الغلّ والحسد؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بأي ماء غُسل قلب النبي ﷺ في تلك الليلة؟",
        "options": [
          "ماء المطر",
          "ماء زمزم",
          "ماء البحر",
          "ماء النهر"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "طست من ذهب",
        "description": "تذكار يذكّرك أن الله ينظر إلى قلبك قبل كل شيء."
      },
      "badge": "وسام: قلب مستعد"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "حديث شقّ الصدر ليلة الإسراء ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-5-02",
    "stationId": 5,
    "slug": "the-amazing-buraq",
    "title": "البراق في طريق الإسراء",
    "hook": "ما الدابة التي ركبها النبي ﷺ في رحلته الليلية؟",
    "image": "/stories/seerah/the-amazing-buraq.jpg",
    "interactive": {
      "discover": "كلمة «البُراق» من البَرق، لسرعته.",
      "value": {
        "name": "سعة قدرة الله",
        "icon": "⚡"
      },
      "thinkQuestion": "ما أسرع شيء تعرفه؟ وكيف تتخيّل شيئاً أسرع من البصر نفسه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما الذي يميّز البُراق؟",
        "options": [
          "لونه الأحمر",
          "أنه يضع حافره عند منتهى بصره",
          "أنه يطير بجناحين كبيرين",
          "أنه لا يتعب أبداً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ريشة بيضاء",
        "description": "تذكار لمركبةٍ من خلق الله لا تشبه شيئاً نعرفه."
      },
      "badge": "وسام: راكب البُراق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم",
      "note": "وصف البُراق ثابت في صحيح مسلم من حديث الإسراء."
    }
  },
  {
    "storyId": "st-5-03",
    "stationId": 5,
    "slug": "road-to-jerusalem",
    "title": "إلى المسجد الأقصى",
    "hook": "من أين بدأت رحلة الإسراء، وإلى أي مسجد وصلت؟",
    "image": "/stories/seerah/road-to-jerusalem.jpg",
    "interactive": {
      "discover": "بيت المقدس كان القبلة الأولى للمسلمين قبل أن تُحوَّل إلى الكعبة.",
      "value": {
        "name": "توقير الأنبياء",
        "icon": "🕌"
      },
      "thinkQuestion": "لماذا يوقّر المسلمون موسى وعيسى عليهما السلام كما يوقّرون محمداً ﷺ؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أي نبي كلّمه الله عند الطُّور؟",
        "options": [
          "إبراهيم عليه السلام",
          "موسى عليه السلام",
          "عيسى عليه السلام",
          "نوح عليه السلام"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "غصن زيتون من الطُّور",
        "description": "غصن يذكّرك أن الأنبياء إخوة ودينهم واحد."
      },
      "badge": "وسام: زائر البقاع المباركة"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سنن النسائي، وكتب السيرة",
      "note": "أصل الإسراء ثابت في القرآن والصحيحين، أما نزوله ﷺ للصلاة في الطور وبيت لحم فجاء في رواية عند النسائي تكلّم في إسنادها بعض أهل العلم."
    }
  },
  {
    "storyId": "st-5-04",
    "stationId": 5,
    "slug": "leader-of-prophets",
    "title": "إمام الأنبياء في المسجد الأقصى",
    "hook": "ماذا حدث للنبي ﷺ عند المسجد الأقصى في ليلة الإسراء؟",
    "image": "/stories/seerah/leader-of-prophets.jpg",
    "interactive": {
      "discover": "سورة الإسراء سُمّيت بهذه الرحلة، وتبدأ بذكرها.",
      "value": {
        "name": "مكانة الأقصى",
        "icon": "🕋"
      },
      "thinkQuestion": "ماذا يعني أن يصلّي الأنبياء كلهم خلف إمام واحد؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أين صلّى النبي ﷺ إماماً بالأنبياء؟",
        "options": [
          "المسجد الحرام",
          "المسجد النبوي",
          "المسجد الأقصى",
          "مسجد قباء"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "حلقة الباب",
        "description": "حلقة رُبط بها البُراق عند باب المسجد الأقصى."
      },
      "badge": "وسام: في رحاب الأقصى"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم، وسورة الإسراء",
      "note": "إمامة النبي ﷺ بالأنبياء في بيت المقدس ثابتة في صحيح مسلم."
    }
  },
  {
    "storyId": "st-5-05",
    "stationId": 5,
    "slug": "the-first-heaven-adam",
    "title": "السماء الأولى: آدم عليه السلام",
    "hook": "من أول نبي لقيه النبي ﷺ في رحلة المعراج؟",
    "image": "/stories/seerah/the-first-heaven-adam.jpg",
    "interactive": {
      "discover": "كل نبي لقيه في السماوات رحّب به ودعا له بخير.",
      "value": {
        "name": "أدب الاستئذان",
        "icon": "🚪"
      },
      "thinkQuestion": "عملك الصالح يُفرح آدم عليه السلام — فما العمل الذي تحب أن يراه منك اليوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن لقي النبي ﷺ في السماء الأولى؟",
        "options": [
          "إبراهيم عليه السلام",
          "آدم عليه السلام",
          "موسى عليه السلام",
          "يوسف عليه السلام"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "مفتاح السماء الأولى",
        "description": "مفتاح يذكّرك أن الباب يُفتح لمن استأذن."
      },
      "badge": "وسام: ضيف السماء الأولى"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "حديث المعراج ولقاء الأنبياء في السماوات ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-5-06",
    "stationId": 5,
    "slug": "second-heaven-isa-yahya",
    "title": "السماء الثانية: عيسى ويحيى عليهما السلام",
    "hook": "من النبيين اللذين لقيهما النبي ﷺ في السماء الثانية؟",
    "image": "/stories/seerah/second-heaven-isa-yahya.jpg",
    "interactive": {
      "discover": "أمّ يحيى وأمّ عيسى عليهما السلام كانتا أختين، فهما ابنا خالة.",
      "value": {
        "name": "حسن الاستقبال",
        "icon": "🤝"
      },
      "thinkQuestion": "كيف تستقبل ضيفاً يدخل بيتكم؟ وما الكلمة التي تحب أن تُقال لك حين تدخل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن لقي النبي ﷺ في السماء الثانية؟",
        "options": [
          "آدم وإدريس",
          "عيسى ويحيى",
          "موسى وهارون",
          "إبراهيم ويوسف"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "غصنان متجاوران",
        "description": "غصنان يذكّرانك بأخوين في النسب والدعوة."
      },
      "badge": "وسام: ضيف السماء الثانية"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "لقاء الأنبياء في السماوات ثابت في حديث المعراج في الصحيحين."
    }
  },
  {
    "storyId": "st-5-07",
    "stationId": 5,
    "slug": "third-heaven-yusuf",
    "title": "السماء الثالثة: يوسف عليه السلام",
    "hook": "من النبي الذي لقيه النبي ﷺ في السماء الثالثة؟",
    "image": "/stories/seerah/third-heaven-yusuf.jpg",
    "interactive": {
      "discover": "سورة يوسف هي السورة الوحيدة التي قصّت قصة نبي كاملة من أولها إلى آخرها.",
      "value": {
        "name": "الصبر وجمال الأخلاق",
        "icon": "⭐"
      },
      "thinkQuestion": "ما الذي جعل يوسف عليه السلام عظيماً: جماله أم صبره؟ ولماذا؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ عن جمال يوسف عليه السلام؟",
        "options": [
          "أُعطي شطر الحُسن",
          "كان أطول الناس",
          "كان أقوى الناس",
          "كان أسرع الناس"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "قميص يوسف",
        "description": "قميص يذكّرك أن الصبر يعيد الفرح إلى البيوت."
      },
      "badge": "وسام: صابر جميل"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم",
      "note": "قول النبي ﷺ في يوسف «أُعطي شطر الحُسن» ثابت في صحيح مسلم."
    }
  },
  {
    "storyId": "st-5-08",
    "stationId": 5,
    "slug": "fourth-heaven-idris",
    "title": "السماء الرابعة: إدريس عليه السلام",
    "hook": "ماذا يخبرنا القرآن عن إدريس عليه السلام؟",
    "image": "/stories/seerah/fourth-heaven-idris.jpg",
    "interactive": {
      "discover": "ذُكر إدريس عليه السلام في القرآن مرتين فقط: في سورة مريم وسورة الأنبياء.",
      "value": {
        "name": "العلم والإتقان",
        "icon": "📐"
      },
      "thinkQuestion": "ما العمل الذي تتقنه وتحب أن تصير فيه الأفضل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا وصف الله إدريس عليه السلام؟",
        "options": [
          "كان ملكاً عظيماً",
          "كان صدّيقاً نبياً ورُفع مكاناً علياً",
          "كان أول الرسل",
          "كان أطول الأنبياء عمراً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قلم ولوح",
        "description": "تذكار لمن يرفعه علمه وعمله."
      },
      "badge": "وسام: طالب علم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم، وسورة مريم",
      "note": "لقاء إدريس عليه السلام في المعراج ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-5-09",
    "stationId": 5,
    "slug": "fifth-heaven-harun",
    "title": "السماء الخامسة: هارون عليه السلام",
    "hook": "من النبي الذي لقيه النبي ﷺ في السماء الخامسة؟",
    "image": "/stories/seerah/fifth-heaven-harun.jpg",
    "interactive": {
      "discover": "طلب موسى عليه السلام من ربه أن يجعل أخاه هارون وزيراً له، فاستجاب الله له.",
      "value": {
        "name": "اللين والرفق",
        "icon": "🕊️"
      },
      "thinkQuestion": "مَن أكثر شخص تحبّه لأنه لطيف معك؟ وكيف تكون أنت كذلك مع غيرك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ وُصف هارون عليه السلام في السماء الخامسة؟",
        "options": [
          "أشدّ الأنبياء",
          "المحبَّب في قومه",
          "أعلمهم",
          "أغناهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ريشة بيضاء",
        "description": "ريشة تذكّرك أن الرفق يكسب القلوب."
      },
      "badge": "وسام: رفيق القلب"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "وصف هارون عليه السلام بالمحبَّب في قومه جاء في حديث المعراج."
    }
  },
  {
    "storyId": "st-5-10",
    "stationId": 5,
    "slug": "sixth-heaven-musa",
    "title": "السماء السادسة: موسى عليه السلام",
    "hook": "ما المهمة المهمة التي ساعد موسى عليه السلام أمة محمد ﷺ في التفكير فيها؟",
    "image": "/stories/seerah/sixth-heaven-musa.jpg",
    "interactive": {
      "discover": "سُمّي موسى عليه السلام «كليم الله» لأن الله كلّمه تكليماً.",
      "value": {
        "name": "الحرص على الناس",
        "icon": "💧"
      },
      "thinkQuestion": "هل حزنت مرة من أجل غيرك لا من أجل نفسك؟ حدّثنا عنها.",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا بكى موسى عليه السلام حين جاوزه النبي ﷺ؟",
        "options": [
          "لأنه تعب",
          "لأن أمة محمد ﷺ يدخل الجنة منها أكثر من أمته",
          "لأنه اشتاق لقومه",
          "لأنه ودّعه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قطرة ندى",
        "description": "قطرة تذكّرك بنبيّ بكى شفقةً على قومه."
      },
      "badge": "وسام: من أمة محمد"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم",
      "note": "بكاء موسى عليه السلام في المعراج ثابت في صحيح مسلم."
    }
  },
  {
    "storyId": "st-5-11",
    "stationId": 5,
    "slug": "seventh-heaven-ibrahim",
    "title": "السماء السابعة: إبراهيم عليه السلام",
    "hook": "من النبي الذي لقيه النبي ﷺ عند البيت المعمور؟",
    "image": "/stories/seerah/seventh-heaven-ibrahim.jpg",
    "interactive": {
      "discover": "البيت المعمور في السماء يقابل الكعبة في الأرض.",
      "value": {
        "name": "الباقيات الصالحات",
        "icon": "🌳"
      },
      "thinkQuestion": "لو كانت كل تسبيحة شجرة في الجنة، كم شجرة زرعت اليوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما الرسالة التي حمّلها إبراهيم عليه السلام للنبي ﷺ إلى أمته؟",
        "options": [
          "أن يبنوا مسجداً",
          "السلام، وأن غراس الجنة الذكر",
          "أن يصوموا",
          "أن يهاجروا"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بذرة نور",
        "description": "بذرة تذكّرك أن كلمة الذكر شجرة تُغرس لك."
      },
      "badge": "وسام: غارس في الجنة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، وسنن الترمذي",
      "note": "لقاء إبراهيم عليه السلام عند البيت المعمور في البخاري، وحديث غراس الجنة عند الترمذي وحسّنه."
    }
  },
  {
    "storyId": "st-5-12",
    "stationId": 5,
    "slug": "sidrat-al-muntaha",
    "title": "سدرة المنتهى",
    "hook": "ما الشجرة التي ذكرها القرآن في مشاهد المعراج؟",
    "image": "/stories/seerah/sidrat-al-muntaha.jpg",
    "interactive": {
      "discover": "سُمّيت «المنتهى» لأن كل ما يصعد من الأرض ينتهي عندها.",
      "value": {
        "name": "معرفة القدر",
        "icon": "🌌"
      },
      "thinkQuestion": "جبريل عليه السلام عرف حدّه ووقف عنده — متى يكون الوقوف عند الحدّ شجاعة لا ضعفاً؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل جبريل عليه السلام عند سدرة المنتهى؟",
        "options": [
          "تقدّم أمام النبي ﷺ",
          "وقف ولم يتجاوزها",
          "رجع إلى الأرض",
          "طاف حولها"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ورقة من سدر",
        "description": "ورقة من شجرة يقف عندها كل صاعد."
      },
      "badge": "وسام: بلغ المنتهى"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم، وسورة النجم",
      "note": "سدرة المنتهى مذكورة في سورة النجم، ووصفها في الصحيحين."
    }
  },
  {
    "storyId": "st-5-13",
    "stationId": 5,
    "slug": "the-great-gift-prayer",
    "title": "الهدية الكبرى: الصلاة",
    "hook": "ما العبادة التي فُرضت في ليلة المعراج؟",
    "image": "/stories/seerah/the-great-gift-prayer.jpg",
    "interactive": {
      "discover": "الصلاة أول ما يُحاسب عليه العبد يوم القيامة.",
      "value": {
        "name": "عِظم الصلاة",
        "icon": "🕌"
      },
      "thinkQuestion": "لو كانت الصلاة هدية جاءت من فوق سبع سماوات، فكيف تستقبلها كل يوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "كم صلاة فُرضت أول الأمر؟",
        "options": [
          "خمس",
          "سبع عشرة",
          "خمسون",
          "مئة"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "سجادة صغيرة",
        "description": "سجادة تذكّرك بأغلى هدية نزلت من السماء."
      },
      "badge": "وسام: حافظ الصلاة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "فرض الصلاة ليلة المعراج ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-5-14",
    "stationId": 5,
    "slug": "musa-advice-reduction",
    "title": "خمس في العمل وخمسون في الأجر",
    "hook": "كيف صارت الصلوات خمسًا مع بقاء أجر خمسين؟",
    "image": "/stories/seerah/musa-advice-reduction.jpg",
    "interactive": {
      "discover": "الحسنة بعشر أمثالها، فخمس صلوات بأجر خمسين.",
      "value": {
        "name": "النصيحة والرحمة",
        "icon": "🤍"
      },
      "thinkQuestion": "مَن نصحك نصيحة نفعتك؟ وهل شكرته عليها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "كم صارت الصلوات بعد التخفيف؟",
        "options": [
          "ثلاث",
          "خمس",
          "عشر",
          "سبع عشرة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ميزان صغير",
        "description": "ميزان يذكّرك أن الأجر أوسع من العمل."
      },
      "badge": "وسام: شاكر النعمة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "مراجعة النبي ﷺ ربه بنصيحة موسى عليه السلام ثابتة في الصحيحين."
    }
  },
  {
    "storyId": "st-5-15",
    "stationId": 5,
    "slug": "morning-of-certainty",
    "title": "صباح اليقين",
    "hook": "ماذا حدث عندما أخبر النبي ﷺ أهل مكة بخبر الإسراء؟",
    "image": "/stories/seerah/morning-of-certainty.jpg",
    "interactive": {
      "discover": "سورة الإسراء نزلت في هذه الرحلة، وبها سُمّيت.",
      "value": {
        "name": "الصدق والصحبة",
        "icon": "🌅"
      },
      "thinkQuestion": "مَن الصديق الذي تثق أنه سيصدّقك حين لا يصدّقك أحد؟ وهل أنت له مثل ذلك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بم لُقّب أبو بكر رضي الله عنه بعد هذه الليلة؟",
        "options": [
          "الفاروق",
          "الصدّيق",
          "الأمين",
          "ذو النورين"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "فجر صغير",
        "description": "تذكار لصباحٍ فرّق بين من صدّق ومن عاند."
      },
      "badge": "وسام: صاحب صدق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام، وصحيح البخاري",
      "note": "وصف النبي ﷺ للمسجد الأقصى في البخاري، وخبر تلقيب أبي بكر بالصدّيق في كتب السيرة."
    }
  },
  {
    "storyId": "st-6-01",
    "stationId": 6,
    "slug": "dar-al-nadwa-dust",
    "title": "قرار الهجرة",
    "hook": "حين اشتد الأذى في مكة، كيف حفظ الله نبيه ﷺ ومهّد له طريق الهجرة؟",
    "image": "/stories/seerah/dar-al-nadwa-dust.jpg",
    "interactive": {
      "discover": "نزلت في هذه المؤامرة آية: ﴿وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا﴾ في سورة الأنفال.",
      "value": {
        "name": "حفظ الله",
        "icon": "🛡️"
      },
      "thinkQuestion": "متى شعرت أن الله حماك من شيء لم تكن تراه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "أين اجتمع زعماء قريش ليدبّروا أمرهم؟",
        "options": [
          "في الكعبة",
          "في دار الندوة",
          "في السوق",
          "في الطائف"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حفنة تراب",
        "description": "تراب يذكّرك أن أضعف الأسباب تكفي إذا أراد الله."
      },
      "badge": "وسام: في حفظ الله"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، وسورة الأنفال",
      "note": "أصل المؤامرة ثابت بالقرآن في سورة الأنفال؛ وتفصيل حفنة التراب وتلاوة يس جاء عند ابن إسحاق مرسلاً."
    }
  },
  {
    "storyId": "st-6-02",
    "stationId": 6,
    "slug": "hero-in-the-bed",
    "title": "الأمانة في ليلة الهجرة",
    "hook": "من بقي في مكة ليعيد أمانات الناس بعد خروج النبي ﷺ؟",
    "image": "/stories/seerah/hero-in-the-bed.jpg",
    "interactive": {
      "discover": "كان عمر علي رضي الله عنه يومئذ نحو ثلاث وعشرين سنة.",
      "value": {
        "name": "الأمانة والتضحية",
        "icon": "🌙"
      },
      "thinkQuestion": "لو ائتمنك شخص تختلف معه على شيء، هل تردّه إليه كاملاً؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا بقي علي رضي الله عنه في مكة بعد خروج النبي ﷺ؟",
        "options": [
          "ليقاتل قريشاً",
          "ليردّ الأمانات إلى أصحابها",
          "ليبيع البيت",
          "لينتظر الحج"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بُردة خضراء",
        "description": "بُردة يذكّرك أن الشجاعة أحياناً أن تنام مكان غيرك."
      },
      "badge": "وسام: أمين الودائع"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سيرة ابن هشام",
      "note": "مبيت علي رضي الله عنه في الفراش وردّ الودائع مشهوران في كتب السيرة."
    }
  },
  {
    "storyId": "st-6-03",
    "stationId": 6,
    "slug": "tears-of-joy-companion",
    "title": "الصُّحبة في طريق الهجرة",
    "hook": "من اختاره النبي ﷺ ليكون رفيقه في الهجرة؟",
    "image": "/stories/seerah/tears-of-joy-companion.jpg",
    "interactive": {
      "discover": "أبو بكر رضي الله عنه هو الصحابي الوحيد الذي ذُكر في القرآن بوصف «صاحبه».",
      "value": {
        "name": "الصحبة الصادقة",
        "icon": "😢"
      },
      "thinkQuestion": "مَن الصديق الذي تفرح أن تتعب معه؟ وهل قلت له ذلك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ أجاب النبي ﷺ أبا بكر حين سأله الصحبة؟",
        "options": [
          "انتظر قليلاً",
          "الصُّحبة",
          "ابقَ في مكة",
          "خذ الراحلة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "زمام راحلة",
        "description": "زمام يذكّرك بمن جهّز راحلته أشهراً انتظاراً ليوم واحد."
      },
      "badge": "وسام: صاحب الغار"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "حديث الهجرة وبكاء أبي بكر من الفرح ثابت في صحيح البخاري عن عائشة رضي الله عنها."
    }
  },
  {
    "storyId": "st-6-04",
    "stationId": 6,
    "slug": "asma-that-al-nitaqayn",
    "title": "أسماء ذات النطاقين",
    "hook": "كيف ساعدت أسماء بنت أبي بكر رضي الله عنها في تجهيز طعام الرحلة؟",
    "image": "/stories/seerah/asma-that-al-nitaqayn.jpg",
    "interactive": {
      "discover": "أسماء رضي الله عنها هي أخت عائشة أم المؤمنين، وابنة أبي بكر الصديق.",
      "value": {
        "name": "سرعة البديهة",
        "icon": "🎀"
      },
      "thinkQuestion": "مشكلة صغيرة واجهتك اليوم: ما الحل الذي كان بين يديك ولم تنتبه له؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا سُمّيت أسماء رضي الله عنها «ذات النِّطاقين»؟",
        "options": [
          "لأنها لبست ثوبين",
          "لأنها شقّت نطاقها نصفين فدعا لها النبي ﷺ بنطاقين في الجنة",
          "لأنها سكنت بين جبلين",
          "لأنها هاجرت مرتين"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "نصف نِطاق",
        "description": "نصف حزام حلّ مشكلة رحلة غيّرت التاريخ."
      },
      "badge": "وسام: ذات النطاقين"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "خبر نطاق أسماء رضي الله عنها ثابت في صحيح البخاري؛ وخبر لطمة أبي جهل في كتب السيرة."
    }
  },
  {
    "storyId": "st-6-05",
    "stationId": 6,
    "slug": "smart-shepherd-footprints",
    "title": "الراعي في الغار",
    "hook": "كيف ساعد عامر بن فهيرة رضي الله عنه في أيام الهجرة؟",
    "image": "/stories/seerah/smart-shepherd-footprints.jpg",
    "interactive": {
      "discover": "عامر بن فُهَيرة رضي الله عنه كان مولى لأبي بكر، وهو من السابقين إلى الإسلام.",
      "value": {
        "name": "التخطيط مع التوكل",
        "icon": "🐑"
      },
      "thinkQuestion": "قبل أي شيء صعب: ما الخطوة العملية التي تستطيع أن تعملها بدل الانتظار؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "كيف مُحيت آثار أقدام النبي ﷺ وصاحبه؟",
        "options": [
          "بالمطر",
          "بالريح",
          "بغنم عامر بن فهيرة تمشي خلفهما",
          "بغطاء من جلد"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "جرس غنم",
        "description": "جرس صغير يذكّرك أن الخطة الذكية عبادة."
      },
      "badge": "وسام: حسن التدبير"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، وسيرة ابن هشام",
      "note": "مجيء عامر بن فهيرة بالغنم إلى الغار في صحيح البخاري، وتفصيل تعمية الأثر بالغنم في كتب السيرة."
    }
  },
  {
    "storyId": "st-7-01",
    "stationId": 7,
    "slug": "permission-to-defend",
    "title": "الإذن بالدفاع",
    "hook": "متى أذن القرآن للمسلمين أن يدافعوا عن أنفسهم؟",
    "image": "/stories/seerah/permission-to-defend.jpg",
    "interactive": {
      "discover": "هذه أول آية نزلت في الإذن بالقتال، بعد ثلاث عشرة سنة من الصبر.",
      "value": {
        "name": "السلام أصل والدفاع استثناء",
        "icon": "🕊️"
      },
      "thinkQuestion": "لماذا في رأيكم صبر المسلمون كل هذه السنين قبل أن يُؤذن لهم بالدفاع؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "متى أُذن للمسلمين بالدفاع عن أنفسهم؟",
        "options": [
          "في أول الدعوة بمكة",
          "بعد الهجرة، حين ظُلموا وهُدِّدوا",
          "قبل البعثة",
          "لم يُؤذن لهم أبداً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "غصن زيتون",
        "description": "غصن يذكّرك أن السلام هو الأصل."
      },
      "badge": "حامي الديار"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة الحج: ٣٩",
      "note": "الآية نصّ في أن الإذن جاء بسبب الظلم الواقع عليهم."
    }
  },
  {
    "storyId": "st-7-02",
    "stationId": 7,
    "slug": "badr-shura-counsel",
    "title": "بئر بدر وقوة الشورى",
    "hook": "لماذا نستمع إلى رأي الخبير في العمل الجماعي؟",
    "image": "/stories/seerah/badr-shura-counsel.jpg",
    "interactive": {
      "discover": "النبي ﷺ فرّق بين ما جاء به الوحي وما هو رأي واجتهاد، فقبل المشورة في الثاني.",
      "value": {
        "name": "الشورى",
        "icon": "🤝"
      },
      "thinkQuestion": "متى كانت آخر مرة غيّرت رأيك لأن أحداً أتى برأي أفضل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل النبي ﷺ برأي الحُباب بن المنذر؟",
        "options": [
          "رفضه",
          "أخذ به ونفّذه",
          "أجّله",
          "غضب منه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "دلو ماء",
        "description": "دلو يذكّرك أن الرأي الصواب يُقبل ممن جاء به."
      },
      "badge": "صاحب مشورة"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام",
      "note": "مشورة الحُباب بن المنذر مشهورة في كتب السيرة، ورواها ابن إسحاق مرسلاً؛ أما أصل الشورى فثابت بالقرآن."
    }
  },
  {
    "storyId": "st-7-03",
    "stationId": 7,
    "slug": "angels-in-badr",
    "title": "بدر ونصر الله",
    "hook": "كيف طلب النبي ﷺ العون من الله في بدر؟",
    "image": "/stories/seerah/angels-in-badr.jpg",
    "interactive": {
      "discover": "سُمّيت بدر باسم البئر التي كانت هناك، وصارت اسماً ليوم عظيم في التاريخ.",
      "value": {
        "name": "التوكل مع الأخذ بالأسباب",
        "icon": "⭐"
      },
      "thinkQuestion": "أخذوا بالأسباب ودعوا الله معاً — لماذا الاثنان مطلوبان؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ سُمّي يوم بدر في القرآن؟",
        "options": [
          "يوم الفتح",
          "يوم الفرقان",
          "يوم الحنين",
          "يوم الفيل"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "نجمة فجر",
        "description": "نجمة تذكّرك بليلة دعا فيها نبيّ حتى سقط رداؤه."
      },
      "badge": "من أهل بدر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة آل عمران: ١٢٣، وصحيح مسلم",
      "note": "النصر ببدر وإمداد الملائكة ثابت في القرآن، ودعاء النبي ﷺ حتى سقط رداؤه في صحيح مسلم."
    }
  },
  {
    "storyId": "st-7-04",
    "stationId": 7,
    "slug": "mercy-to-captives",
    "title": "الرحمة بالأسرى",
    "hook": "كيف يكون العدل حتى بعد انتهاء القتال؟",
    "image": "/stories/seerah/mercy-to-captives.jpg",
    "interactive": {
      "discover": "كان في مكة قليل ممن يكتب، فصار تعليم الكتابة فداءً يعادل المال.",
      "value": {
        "name": "الرحمة وقيمة العلم",
        "icon": "✍️"
      },
      "thinkQuestion": "لماذا في رأيكم جُعل التعليم فداءً يعدل المال؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ كان يُفتدى الأسير الذي يحسن الكتابة ولا مال له؟",
        "options": [
          "بالعمل في الزراعة",
          "بتعليم عشرة من الصبيان القراءة والكتابة",
          "بالبقاء أسيراً",
          "بالخروج من الجزيرة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "لوح وقلم",
        "description": "لوح يذكّرك بأسير نال حريته بأن علّم غيره."
      },
      "badge": "ناشر العلم"
    },
    "source": {
      "reliability": "🟡",
      "reference": "مسند أحمد، وسيرة ابن هشام",
      "note": "خبر الفداء بالتعليم مرويّ في مسند أحمد وطبقات ابن سعد، وتكلّم أهل العلم في إسناده؛ والإحسان إلى الأسرى ثابت بالقرآن."
    }
  },
  {
    "storyId": "st-7-05",
    "stationId": 7,
    "slug": "mount-of-archers-uhud",
    "title": "جبل الرماة والوصية",
    "hook": "لماذا كان الالتزام بالتعليمات مهمًا في أُحد؟",
    "image": "/stories/seerah/mount-of-archers-uhud.jpg",
    "interactive": {
      "discover": "أمير الرماة عبد الله بن جبير ثبت في مكانه ومعه قليل، ولم يتركوا الموقع.",
      "value": {
        "name": "الانضباط",
        "icon": "🏹"
      },
      "thinkQuestion": "ما المهمة التي تتركها عادةً قبل أن تكتمل؟ وماذا يحدث بسبب ذلك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بماذا أمر النبي ﷺ الرماة؟",
        "options": [
          "أن ينزلوا عند النصر",
          "ألا يبرحوا مكانهم حتى يُرسل إليهم",
          "أن يجمعوا الغنائم",
          "أن يلحقوا بالجيش"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "سهم من أُحد",
        "description": "سهم يذكّرك أن المهمة تُتمّ إلى آخرها."
      },
      "badge": "ثابت في موقعه"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "وصية النبي ﷺ للرماة يوم أُحد ثابتة في صحيح البخاري."
    }
  },
  {
    "storyId": "st-7-06",
    "stationId": 7,
    "slug": "tough-lesson-and-heroine",
    "title": "درس أُحد",
    "hook": "ماذا نتعلم عندما لا تسير الأمور كما نريد؟",
    "image": "/stories/seerah/tough-lesson-and-heroine.jpg",
    "interactive": {
      "discover": "قال النبي ﷺ يومئذ: «ما التفتّ يميناً ولا شمالاً إلا وأراها تقاتل دوني».",
      "value": {
        "name": "الثبات",
        "icon": "🛡️"
      },
      "thinkQuestion": "في العمل الجماعي، لماذا يؤثّر خطأ فرد واحد في الجميع؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن دافعت عن النبي ﷺ يوم أُحد حتى جُرحت؟",
        "options": [
          "خديجة رضي الله عنها",
          "نُسيبة بنت كعب رضي الله عنها",
          "فاطمة رضي الله عنها",
          "أسماء رضي الله عنها"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ترس صغير",
        "description": "ترس يذكّرك بامرأة وقفت حيث تراجع غيرها."
      },
      "badge": "ثابت عند الشدّة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري، وطبقات ابن سعد",
      "note": "نزول الرماة وانقلاب المعركة في صحيح البخاري؛ وخبر نُسيبة رضي الله عنها في مسند أحمد وطبقات ابن سعد."
    }
  },
  {
    "storyId": "st-7-07",
    "stationId": 7,
    "slug": "trench-salman-idea",
    "title": "فكرة الخندق",
    "hook": "كيف تحمي فكرة ذكية مجتمعًا كاملًا؟",
    "image": "/stories/seerah/trench-salman-idea.jpg",
    "interactive": {
      "discover": "سلمان رضي الله عنه جاء من فارس، فحمل معه خبرة بلده إلى المدينة.",
      "value": {
        "name": "الإفادة من خبرة الآخرين",
        "icon": "⛏️"
      },
      "thinkQuestion": "ما الشيء النافع الذي تعلّمته من شخص جاء من بلد آخر؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن أشار بحفر الخندق؟",
        "options": [
          "أبو بكر رضي الله عنه",
          "سلمان الفارسي رضي الله عنه",
          "عمر رضي الله عنه",
          "الحُباب بن المنذر رضي الله عنه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "فأس صغيرة",
        "description": "فأس تذكّرك أن الفكرة الجيدة لا وطن لها."
      },
      "badge": "صاحب فكرة"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام",
      "note": "مشورة سلمان رضي الله عنه بحفر الخندق مشهورة في كتب السيرة، ورواها ابن إسحاق؛ وأصل غزوة الخندق ثابت بالقرآن والصحيحين."
    }
  },
  {
    "storyId": "st-7-08",
    "stationId": 7,
    "slug": "prophet-work-and-food-miracle",
    "title": "القائد يعمل مع فريقه",
    "hook": "كيف كان النبي ﷺ يشارك أصحابه في الخندق؟",
    "image": "/stories/seerah/prophet-work-and-food-miracle.jpg",
    "interactive": {
      "discover": "كان الطعام يكفي نفراً قليلاً، فأكل منه أهل الخندق وهم ألف.",
      "value": {
        "name": "القدوة بالعمل",
        "icon": "🍲"
      },
      "thinkQuestion": "لو كنت قائد فريق، أي عمل تشارك فيه بنفسك قبل أن تطلبه من غيرك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل النبي ﷺ حين علم بطعام جابر رضي الله عنه؟",
        "options": [
          "أكل وحده",
          "نادى أهل الخندق جميعاً",
          "ردّ الطعام",
          "أجّله إلى الغد"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بُرمة صغيرة",
        "description": "قِدر تذكّرك أن الطعام يزيد حين يُشارَك."
      },
      "badge": "قدوة بالعمل"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "حديث جابر رضي الله عنه في طعام الخندق ثابت في الصحيحين، وفيه حفر النبي ﷺ معهم وشدّ الحجر على بطنه."
    }
  },
  {
    "storyId": "st-7-09",
    "stationId": 7,
    "slug": "cold-wind-victory-without-swords",
    "title": "ريح النصر",
    "hook": "كيف انتهى حصار الأحزاب؟",
    "image": "/stories/seerah/cold-wind-victory-without-swords.jpg",
    "interactive": {
      "discover": "قال النبي ﷺ بعدها: «الآن نغزوهم ولا يغزوننا» — انتهى زمن الحصار.",
      "value": {
        "name": "الصبر حتى الفرج",
        "icon": "🌬️"
      },
      "thinkQuestion": "حين يطول الانتظار في أمر صعب، ما الذي يعينك على الصبر؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ انتهى حصار الأحزاب؟",
        "options": [
          "بمعركة كبيرة",
          "بريح شديدة أرسلها الله فرحلوا",
          "باتفاق مكتوب",
          "بهدايا لهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ريشة في الريح",
        "description": "ريشة تذكّرك أن أضعف الأسباب تكفي إذا أراد الله."
      },
      "badge": "صابر حتى الفجر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة الأحزاب: ٩، وصحيح مسلم",
      "note": "إرسال الريح والجنود ثابت بنص القرآن، وخبر رحيل الأحزاب في صحيح مسلم."
    }
  },
  {
    "storyId": "st-7-10",
    "stationId": 7,
    "slug": "hudaybiyyah-peace-treaty",
    "title": "صلح الحديبية",
    "hook": "كيف يكون الصلح فتحًا حتى لو بدا صعبًا؟",
    "image": "/stories/seerah/hudaybiyyah-peace-treaty.jpg",
    "interactive": {
      "discover": "دخل في الإسلام في السنتين بعد الحديبية أكثر ممن دخل فيه قبلها.",
      "value": {
        "name": "اختيار السلام",
        "icon": "🕊️"
      },
      "thinkQuestion": "متى يكون التنازل عن شيء تحبّه اليوم كسباً في الغد؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ أشارت أم سلمة رضي الله عنها على النبي ﷺ؟",
        "options": [
          "أن يرجع للقتال",
          "أن يحلق وينحر أمام الناس دون كلام",
          "أن ينتظر سنة",
          "أن يدخل مكة بالقوة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ثوب إحرام أبيض",
        "description": "ثوب أبيض يذكّرك بجيش خرج بلا سلاح حرب."
      },
      "badge": "صانع سلام"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "خبر الحديبية ومشورة أم سلمة رضي الله عنها ثابتان في صحيح البخاري، وتسمية الصلح فتحاً في سورة الفتح."
    }
  },
  {
    "storyId": "st-7-11",
    "stationId": 7,
    "slug": "letters-to-world-leaders",
    "title": "رسائل تدعو إلى الخير",
    "hook": "كيف وصلت دعوة الإسلام إلى خارج المدينة؟",
    "image": "/stories/seerah/letters-to-world-leaders.jpg",
    "interactive": {
      "discover": "نقش الخاتم كان مقلوباً ليخرج الختم على الشمع صحيحاً.",
      "value": {
        "name": "الحوار والبلاغ",
        "icon": "✉️"
      },
      "thinkQuestion": "لماذا تصل الكلمة أحياناً إلى قلوب لا يبلغها شيء آخر؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا اتخذ النبي ﷺ خاتماً منقوشاً؟",
        "options": [
          "زينةً",
          "ليختم به الرسائل، فالملوك لا يقرؤون كتاباً غير مختوم",
          "ليتّجر به",
          "ليهديه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "خاتم مختوم",
        "description": "خاتم يذكّرك برسالة عبرت البحار بلا جيش."
      },
      "badge": "رسول الكلمة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "كتاب النبي ﷺ إلى هرقل واتخاذه الخاتم ثابتان في صحيح البخاري."
    }
  },
  {
    "storyId": "st-7-12",
    "stationId": 7,
    "slug": "battle-of-khaybar-hero-ali",
    "title": "راية خيبر",
    "hook": "لمن أعطى النبي ﷺ الراية في خيبر؟",
    "image": "/stories/seerah/battle-of-khaybar-hero-ali.jpg",
    "interactive": {
      "discover": "بقي أهل خيبر يعملون في أرضهم بعد الفتح، ولم يُخرَجوا منها.",
      "value": {
        "name": "وضع الرجل المناسب في مكانه",
        "icon": "🏰"
      },
      "thinkQuestion": "كيف تختار من يقوم بأصعب مهمة في فريقك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن أعطاه النبي ﷺ الراية يوم خيبر؟",
        "options": [
          "أبا بكر رضي الله عنه",
          "علي بن أبي طالب رضي الله عنه",
          "سلمان رضي الله عنه",
          "بلالاً رضي الله عنه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "راية صغيرة",
        "description": "راية تذكّرك أن الأمانة تُسلّم لمن يحملها."
      },
      "badge": "حامل الراية"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "حديث الراية يوم خيبر وشفاء عين عليّ رضي الله عنه ثابتان في الصحيحين."
    }
  },
  {
    "storyId": "st-7-13",
    "stationId": 7,
    "slug": "makkah-march-ten-thousand-fires",
    "title": "دخول مكة",
    "hook": "كيف اقترب المسلمون من مكة بعد نقض العهد؟",
    "image": "/stories/seerah/makkah-march-ten-thousand-fires.jpg",
    "interactive": {
      "discover": "دخل النبي ﷺ مكة بجيش عظيم، ولم تقع فيها معركة تُذكر.",
      "value": {
        "name": "حقن الدماء",
        "icon": "🔥"
      },
      "thinkQuestion": "كيف تمنع خلافاً من أن يتحوّل إلى شجار؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا أمر النبي ﷺ كل رجل أن يوقد ناراً؟",
        "options": [
          "للطبخ",
          "ليرى أهل مكة كثرة الجيش فيتركوا القتال",
          "للتدفئة فقط",
          "للاحتفال"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "مشعل صغير",
        "description": "مشعل يذكّرك بليلة مُنعت فيها معركة."
      },
      "badge": "مانع القتال"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام",
      "note": "خبر إيقاد النيران بمرّ الظهران مشهور في كتب السيرة عند ابن إسحاق؛ وأصل فتح مكة ونقض قريش للعهد ثابت في الصحيحين."
    }
  },
  {
    "storyId": "st-7-14",
    "stationId": 7,
    "slug": "day-of-mercy-entry",
    "title": "اليوم يوم المرحمة",
    "hook": "كيف دخل النبي ﷺ مكة يوم الفتح؟",
    "image": "/stories/seerah/day-of-mercy-entry.jpg",
    "interactive": {
      "discover": "أعلن النبي ﷺ الأمان لكل من أغلق بابه على نفسه، فلم يُطارد أحد في بيته.",
      "value": {
        "name": "التواضع عند النصر",
        "icon": "🕋"
      },
      "thinkQuestion": "ما الفرق بين الفرح بالنجاح والتكبّر به؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ ردّ النبي ﷺ على قول «اليوم يوم الملحمة»؟",
        "options": [
          "أقرّه",
          "قال: اليوم يوم المرحمة",
          "سكت",
          "أمر بالقتال"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "عود صغير",
        "description": "عود يذكّرك أن الباطل يسقط ولو طال بقاؤه."
      },
      "badge": "متواضع عند النصر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "دخول النبي ﷺ مكة مطأطئاً، وإعلان الأمان، وكسر الأصنام مع تلاوة الآية — كلها في الصحيحين. وقول «اليوم يوم المرحمة» عند البخاري في قصة سعد بن عبادة."
    }
  },
  {
    "storyId": "st-7-15",
    "stationId": 7,
    "slug": "go-you-are-free",
    "title": "عفو يفتح بداية جديدة",
    "hook": "ماذا نتعلم من عفو النبي ﷺ يوم فتح مكة؟",
    "image": "/stories/seerah/go-you-are-free.jpg",
    "interactive": {
      "discover": "كلمة «الطلقاء» صارت لقباً في التاريخ لأهل مكة الذين عفا عنهم النبي ﷺ يومئذ.",
      "value": {
        "name": "العفو عند المقدرة",
        "icon": "💛"
      },
      "thinkQuestion": "مَن الشخص الذي تستطيع أن تسامحه اليوم؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ لأهل مكة يوم الفتح؟",
        "options": [
          "حاسبهم على ما فعلوا",
          "اذهبوا فأنتم الطلقاء",
          "أخرجهم من مكة",
          "أخذ أموالهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قفل مفتوح",
        "description": "قفل مفتوح يذكّرك بيوم عفا فيه قادرٌ عن الجميع."
      },
      "badge": "عفوٌ عند المقدرة"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، والسنن الكبرى للبيهقي",
      "note": "خبر «اذهبوا فأنتم الطلقاء» مشهور في كتب السيرة عند ابن إسحاق والبيهقي؛ وأصل العفو العام عن أهل مكة معلوم مستفيض."
    }
  },
  {
    "storyId": "st-6-06",
    "stationId": 6,
    "slug": "cave-thawr-preparation",
    "title": "غار ثور والاستعداد",
    "hook": "أين مكث النبي ﷺ وأبو بكر رضي الله عنه في بداية الهجرة؟",
    "image": "/stories/seerah/cave-thawr-preparation.jpg",
    "interactive": {
      "discover": "جبل ثور جبل عالٍ صعب المرتقى، اختاره النبي ﷺ لأنه في الجهة المخالفة لطريق المدينة، فلا يُتوقّع أن يسلكه.",
      "value": {
        "name": "الوفاء في الصحبة",
        "icon": "🕯️"
      },
      "thinkQuestion": "ما الشيء الصغير الذي تستطيع أن تتحمّله اليوم لتريح صديقاً أو أخاً لك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا دخل أبو بكر رضي الله عنه الغار قبل النبي ﷺ؟",
        "options": [
          "ليرتاح أولاً",
          "ليتفقّد المكان ويسدّ شقوقه قبل أن يدخل النبي ﷺ",
          "ليأخذ الطعام",
          "لأنه وصل قبله"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قطعة من ثوب",
        "description": "قطعة قماش تذكّرك بمن مزّق ثوبه ليحمي غيره."
      },
      "badge": "صاحبٌ وفيّ"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، والمستدرك للحاكم",
      "note": "أصل مبيت النبي ﷺ وأبي بكر في الغار ثابت بالقرآن وصحيح البخاري؛ وأما تفصيل سدّ الجحور واللدغة فمن أخبار السيرة، وفي إسناده كلام عند أهل العلم."
    }
  },
  {
    "storyId": "st-6-07",
    "stationId": 6,
    "slug": "spider-and-dove",
    "title": "السكينة في الغار",
    "hook": "ماذا قال النبي ﷺ لصاحبه في الغار؟",
    "image": "/stories/seerah/spider-and-dove.jpg",
    "interactive": {
      "discover": "بقي النبي ﷺ وأبو بكر في الغار ثلاث ليال حتى فترت عنهما قريش.",
      "value": {
        "name": "الثقة في حفظ الله",
        "icon": "🕸️"
      },
      "thinkQuestion": "لماذا يحمي الله أحياناً بأضعف الأسباب لا بأقواها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا أخبرنا القرآن عن حماية النبي ﷺ في الغار؟",
        "options": [
          "أن جيشاً حماه",
          "أن الله نصره وأنزل عليه سكينته",
          "أنه خرج من باب آخر",
          "أنه لم يبحث عنه أحد"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "خيط رقيق",
        "description": "خيط واحد يذكّرك أن الحفظ من الله لا من قوة السبب."
      },
      "badge": "واثق بحفظ الله"
    },
    "source": {
      "reliability": "🟡",
      "reference": "القرآن الكريم، سورة التوبة: ٤٠، وصحيح البخاري",
      "note": "حجب الله للنبي ﷺ في الغار وإنزال السكينة ثابت بالقرآن والبخاري. وأما خبر العنكبوت والحمامة فمشهور على الألسنة، ولم يثبت بإسناد قويّ، فذكرناه على أنه من أخبار السيرة لا من الثابت."
    }
  },
  {
    "storyId": "st-6-08",
    "stationId": 6,
    "slug": "do-not-be-sad",
    "title": "دليل خبير",
    "hook": "كيف اختار النبي ﷺ وأبو بكر رضي الله عنهما دليل الطريق؟",
    "image": "/stories/seerah/do-not-be-sad.jpg",
    "interactive": {
      "discover": "هذه الكلمة الواحدة «لا تحزن إن الله معنا» صارت آية يقرؤها المسلمون إلى اليوم.",
      "value": {
        "name": "السكينة واليقين",
        "icon": "🌙"
      },
      "thinkQuestion": "ما الكلمة التي يقولها لك أحدهم فتهدّئ خوفك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ طمأن النبي ﷺ أبا بكر في الغار؟",
        "options": [
          "أخبره أن القوم رحلوا",
          "قال: لا تحزن إن الله معنا",
          "أمره أن يخرج",
          "أعطاه سيفاً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "هلال صغير",
        "description": "هلال يذكّرك بليلة كان الخوف فيها قريباً والسكينة أقرب."
      },
      "badge": "ساكن القلب"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة التوبة: ٤٠، وصحيح البخاري",
      "note": "القصة ثابتة بنصّ القرآن، وحديث «ما ظنّك باثنين الله ثالثهما» في صحيح البخاري."
    }
  },
  {
    "storyId": "st-6-09",
    "stationId": 6,
    "slug": "expert-guide",
    "title": "خيمة أم معبد",
    "hook": "ماذا تخبر كتب السيرة عن لقاء النبي ﷺ بأم معبد في طريق الهجرة؟",
    "image": "/stories/seerah/expert-guide.jpg",
    "interactive": {
      "discover": "سُمّي الطريق الذي سلكوه «طريق الساحل»، وهو أطول من الطريق المعتاد لكنه أخفى.",
      "value": {
        "name": "الأمانة والمهارة",
        "icon": "🧭"
      },
      "thinkQuestion": "إذا احتجت مساعدة في أمر لا تعرفه، فمَن تختار ولماذا؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما صفة الدليل الذي استأجره النبي ﷺ؟",
        "options": [
          "كان من أقرب أصحابه",
          "كان خبيراً بالطرق أميناً يحفظ العهد وإن لم يكن مسلماً",
          "كان أصغر القوم",
          "كان يعرف مكة فقط"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بوصلة قديمة",
        "description": "بوصلة تذكّرك أن العمل يُسنَد إلى من يُحسنه."
      },
      "badge": "حَسَنُ الاختيار"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "استئجار عبد الله بن أُريقط دليلاً، وكونه على دين قريش، ثابت في صحيح البخاري في حديث الهجرة."
    }
  },
  {
    "storyId": "st-6-10",
    "stationId": 6,
    "slug": "umm-mabad-tent",
    "title": "سراقة والطريق الآمن",
    "hook": "ماذا حدث لسراقة بن مالك عندما لحق بالمهاجرين؟",
    "image": "/stories/seerah/umm-mabad-tent.jpg",
    "interactive": {
      "discover": "وصفت أم معبد النبي ﷺ لزوجها وصفاً دقيقاً جميلاً، فصار من أشهر ما وُصف به ﷺ.",
      "value": {
        "name": "الإيثار والبركة",
        "icon": "🥛"
      },
      "thinkQuestion": "متى كانت آخر مرة قدّمت غيرك على نفسك في شيء تحبّه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن سقى النبي ﷺ أولاً في خيمة أم معبد؟",
        "options": [
          "شرب هو أولاً",
          "سقى أم معبد، ثم أصحابه، وشرب هو آخرهم",
          "سقى الدليل وحده",
          "لم يشرب أحد"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قدح لبن",
        "description": "قدح يذكّرك بمن سقى الناس وشرب آخرهم."
      },
      "badge": "مؤثِرٌ كريم"
    },
    "source": {
      "reliability": "🟡",
      "reference": "المستدرك للحاكم، ودلائل النبوة للبيهقي",
      "note": "حديث أم معبد مشهور مرويّ عند الحاكم والبيهقي والطبراني، وحسّنه بعض أهل العلم وتكلّم آخرون في إسناده، فهو من المشهور لا من المتّفق على تصحيحه."
    }
  },
  {
    "storyId": "st-6-11",
    "stationId": 6,
    "slug": "suraqa-and-hundred-camels",
    "title": "بريدة وراية السلام",
    "hook": "ماذا تذكر كتب السيرة عن لقاء بريدة رضي الله عنه بالنبي ﷺ في الطريق؟",
    "image": "/stories/seerah/suraqa-and-hundred-camels.jpg",
    "interactive": {
      "discover": "جاء في كتب السيرة أن النبي ﷺ بشّره بأن يلبس سِوارَي كسرى، فكان ذلك في خلافة عمر رضي الله عنه.",
      "value": {
        "name": "الاعتبار بعاقبة الطمع",
        "icon": "🐎"
      },
      "thinkQuestion": "هل ترك أحدٌ يوماً شيئاً يشتهيه لأنه أدرك أنه على خطأ؟ كيف تفعل ذلك أنت؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا حدث لسُراقة وهو يطارد النبي ﷺ؟",
        "options": [
          "أدركه",
          "ساخت قوائم فرسه في الأرض فسقط، فطلب الأمان",
          "ضلّ الطريق",
          "رجع من أول الطريق"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حافر فرس",
        "description": "حافر يذكّرك بمن سبق ولم يُدرك."
      },
      "badge": "مُعتبِر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "خبر سُراقة وسوخ قوائم فرسه ثابت في صحيح البخاري في حديث الهجرة؛ وأما بشارة سِوارَي كسرى فمن أخبار السيرة والمسند."
    }
  },
  {
    "storyId": "st-6-12",
    "stationId": 6,
    "slug": "buraida-white-banner",
    "title": "قباء وأول مسجد",
    "hook": "أين بنى النبي ﷺ أول مسجد في طريق الهجرة؟",
    "image": "/stories/seerah/buraida-white-banner.jpg",
    "interactive": {
      "discover": "بُرَيدة رضي الله عنه صار بعد ذلك من رواة الحديث، وسكن البصرة ثم خرج إلى خراسان.",
      "value": {
        "name": "لين الكلمة",
        "icon": "🏳️"
      },
      "thinkQuestion": "هل جرّبت أن تجيب من أغضبك بلطف؟ ماذا حدث؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل بُرَيدة رضي الله عنه بعد إسلامه؟",
        "options": [
          "رجع إلى قومه",
          "حلّ عمامته وربطها في رمحه راية بيضاء وسار يحرس النبي ﷺ",
          "أخذ الجائزة",
          "سكت ومضى"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "راية بيضاء",
        "description": "راية بيضاء كانت عمامة رجل غيّر رأيه."
      },
      "badge": "لَيِّن الكلمة"
    },
    "source": {
      "reliability": "🟡",
      "reference": "طبقات ابن سعد، ودلائل النبوة للبيهقي",
      "note": "خبر بُرَيدة رضي الله عنه وسبعين من قومه مرويّ في كتب السيرة والطبقات، وليس في الصحيحين، وإسلامه رضي الله عنه ثابت معروف."
    }
  },
  {
    "storyId": "st-6-13",
    "stationId": 6,
    "slug": "quba-first-mosque",
    "title": "بيت أبي أيوب",
    "hook": "في بيت من نزل النبي ﷺ عندما وصل المدينة؟",
    "image": "/stories/seerah/quba-first-mosque.jpg",
    "interactive": {
      "discover": "قال النبي ﷺ: «من صلّى في مسجد قباء كان كعُمرة».",
      "value": {
        "name": "العمل بالنفس",
        "icon": "🕌"
      },
      "thinkQuestion": "ما أول شيء تبنيه لو أنشأت مكاناً جديداً لأصحابك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما أول ما بناه النبي ﷺ في قُباء؟",
        "options": [
          "سوقاً",
          "مسجداً",
          "سوراً",
          "بيتاً لنفسه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حجر بناء",
        "description": "حجر يذكّرك بيدين شريفتين حملتا مثله."
      },
      "badge": "بانٍ للخير"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة التوبة: ١٠٨، وصحيح البخاري",
      "note": "نزول النبي ﷺ بقباء وبناء مسجدها ثابت في الصحيحين، ووصفه في سورة التوبة."
    }
  },
  {
    "storyId": "st-6-14",
    "stationId": 6,
    "slug": "commanded-camel-qaswa",
    "title": "المدينة تستقبل المهاجر",
    "hook": "كيف استقبل أهل المدينة النبي ﷺ عند وصوله؟",
    "image": "/stories/seerah/commanded-camel-qaswa.jpg",
    "interactive": {
      "discover": "أقام النبي ﷺ في بيت أبي أيوب نحو سبعة أشهر حتى تمّ بناء المسجد وحُجَر أهله.",
      "value": {
        "name": "العدل بين الناس",
        "icon": "🐪"
      },
      "thinkQuestion": "كيف تختار بين اثنين يدعوانك في وقت واحد بغير أن تجرح أحدهما؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "عند بيت مَن بركت ناقة النبي ﷺ في المدينة؟",
        "options": [
          "بيت أغنى الأنصار",
          "بيت أبي أيوب الأنصاري رضي الله عنه",
          "بيت أبي بكر رضي الله عنه",
          "بيت بُريدة رضي الله عنه"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "زمام ناقة",
        "description": "زمام يذكّرك بقائد لم يُفضّل أحداً على أحد."
      },
      "badge": "عادلٌ حكيم"
    },
    "source": {
      "reliability": "🟡",
      "reference": "صحيح البخاري، وسيرة ابن هشام",
      "note": "نزول النبي ﷺ على أبي أيوب الأنصاري رضي الله عنه ثابت في الصحيح؛ وأما لفظ «دعوها فإنها مأمورة» فمن أخبار السيرة عند ابن إسحاق."
    }
  },
  {
    "storyId": "st-6-15",
    "stationId": 6,
    "slug": "talaa-al-badru",
    "title": "يثرب تصير المدينة المنوّرة",
    "hook": "ما البداية الجديدة التي صنعتها الهجرة في المدينة؟",
    "image": "/stories/seerah/talaa-al-badru.jpg",
    "interactive": {
      "discover": "من هذه الهجرة بدأ التاريخ الهجري الذي نعدّ به سنينا إلى اليوم.",
      "value": {
        "name": "الفرح بالخير",
        "icon": "🌕"
      },
      "thinkQuestion": "كيف تستقبل ضيفاً عزيزاً يصل إلى بيتكم بعد سفر طويل؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ صارت تُعرف يثرب بعد دخول النبي ﷺ؟",
        "options": [
          "بقيت يثرب",
          "صارت «المدينة» والمدينة المنوّرة",
          "سُمّيت مكة الثانية",
          "سُمّيت قباء"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "بدرٌ مكتمل",
        "description": "بدر يذكّرك بيوم استقبلت فيه مدينة كاملة ضيفها."
      },
      "badge": "فرحٌ بالخير"
    },
    "source": {
      "reliability": "🟡",
      "reference": "صحيح البخاري، ودلائل النبوة للبيهقي",
      "note": "فرح أهل المدينة وقول أنس رضي الله عنه في الصحيح؛ وأما نشيد «طلع البدر علينا» فمشهور مرويّ في كتب السيرة، وتكلّم أهل العلم في إسناده."
    }
  },
  {
    "storyId": "st-8-01",
    "stationId": 8,
    "slug": "hunayn-pride-in-numbers",
    "title": "حُنين: لا نغتر بالعدد",
    "hook": "هل يكفي العدد الكبير ليضمن النجاح؟",
    "image": "/stories/seerah/hunayn-pride-in-numbers.jpg",
    "interactive": {
      "discover": "حُنين هي المعركة الوحيدة التي ذكر القرآن اسمها مع بدر والأحزاب.",
      "value": {
        "name": "التواضع مع التوكل",
        "icon": "⛰️"
      },
      "thinkQuestion": "متى شعرت بأن النجاح مضمون فتكاسلت في الاستعداد له؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما الذي قاله بعض المسلمين قبل حُنين فكان درساً لهم؟",
        "options": [
          "لن نُغلب اليوم من قلة",
          "نحن قليلون فلننسحب",
          "لا نريد القتال",
          "ننتظر مدداً آخر"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "حصاة من الوادي",
        "description": "حصاة تذكّرك أن الكثرة وحدها لا تكفي."
      },
      "badge": "متواضع في القوة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "القرآن الكريم، سورة التوبة: ٢٥، وصحيح البخاري",
      "note": "ذكر يوم حُنين وإعجابهم بكثرتهم ثابت بنصّ القرآن، وتفصيل المعركة في الصحيحين."
    }
  },
  {
    "storyId": "st-8-02",
    "stationId": 8,
    "slug": "steadfast-leader-hunayn",
    "title": "ثبات القائد",
    "hook": "ماذا فعل النبي ﷺ في لحظة اضطراب في حنين؟",
    "image": "/stories/seerah/steadfast-leader-hunayn.jpg",
    "interactive": {
      "discover": "اختار النبي ﷺ يومئذ بغلة لا فرساً؛ والبغلة لا تُسرع في الفرار، فكان في ركوبها إعلان أنه ثابت لا يبرح.",
      "value": {
        "name": "الثبات والقيادة",
        "icon": "🛡️"
      },
      "thinkQuestion": "إذا ارتبك فريقك كله، ما أول شيء تفعله أنت؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ نادى العباس رضي الله عنه في الناس يوم حُنين؟",
        "options": [
          "يا أهل مكة",
          "يا أصحاب الشجرة",
          "يا أهل المدينة",
          "يا بني هاشم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "لجام بغلة",
        "description": "لجام يذكّرك بمن وقف حين تراجع غيره."
      },
      "badge": "ثابت في الميدان"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "ثبات النبي ﷺ يوم حُنين وقوله «أنا النبي لا كذب» ونداء العباس رضي الله عنه — كلها في الصحيحين."
    }
  },
  {
    "storyId": "st-8-03",
    "stationId": 8,
    "slug": "army-of-hardship-tabuk",
    "title": "جيش العسرة",
    "hook": "كيف تعاون المسلمون في رحلة صعبة إلى تبوك؟",
    "image": "/stories/seerah/army-of-hardship-tabuk.jpg",
    "interactive": {
      "discover": "كانت غزوة تبوك آخر غزوة خرج فيها النبي ﷺ بنفسه.",
      "value": {
        "name": "البذل عند الشدّة",
        "icon": "🐪"
      },
      "thinkQuestion": "ما الشيء الذي تحبّه وتستطيع أن تعطيه لمن يحتاجه أكثر منك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ أجاب أبو بكر رضي الله عنه حين سُئل: ما أبقيتَ لأهلك؟",
        "options": [
          "أبقيت لهم نصف المال",
          "أبقيت لهم الله ورسوله",
          "لم أُبقِ شيئاً ولم أُجب",
          "أبقيت لهم البيت"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "صُرّة صغيرة",
        "description": "صُرّة تذكّرك بمن أعطى كل ما يملك وهو مطمئن."
      },
      "badge": "سبّاق في العطاء"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سنن أبي داود والترمذي، والقرآن الكريم، سورة التوبة: ١١٧",
      "note": "أصل غزوة تبوك وساعة العسرة في القرآن والصحيحين؛ وأما خبر أبي بكر بماله كلّه وتجهيز عثمان فمن رواية السنن، حسّنها بعض أهل العلم وتكلّم آخرون في بعض ألفاظها."
    }
  },
  {
    "storyId": "st-8-04",
    "stationId": 8,
    "slug": "weepers-and-true-repentance",
    "title": "نجاة الصادقين",
    "hook": "ماذا فعل كعب بن مالك رضي الله عنه عندما تأخر عن تبوك؟",
    "image": "/stories/seerah/weepers-and-true-repentance.jpg",
    "interactive": {
      "discover": "حديث كعب بن مالك من أطول الأحاديث في صحيح البخاري، رواه بنفسه عن نفسه.",
      "value": {
        "name": "الصدق",
        "icon": "💧"
      },
      "thinkQuestion": "ما آخر مرة قلت الحقيقة وأنت تعلم أنها ستكلّفك شيئاً؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا نجا كعب بن مالك رضي الله عنه في النهاية؟",
        "options": [
          "لأنه اعتذر بعذر مقبول",
          "لأنه صدق ولم يكذب",
          "لأنه خرج مع الجيش متأخراً",
          "لأنه دفع مالاً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "دمعة من زجاج",
        "description": "تذكار لمن بكى لأنه لم يجد ما يعطيه."
      },
      "badge": "صادق ولو شقّ"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم، والقرآن الكريم، سورة التوبة: ٩٢ و١١٨",
      "note": "البكّاؤون مذكورون في القرآن، وقصة كعب بن مالك رضي الله عنه بطولها في الصحيحين."
    }
  },
  {
    "storyId": "st-8-05",
    "stationId": 8,
    "slug": "tabuk-peace-without-bloodshed",
    "title": "تبوك: قوة بلا قتال",
    "hook": "هل كل رحلة جيش تنتهي بالقتال؟",
    "image": "/stories/seerah/tabuk-peace-without-bloodshed.jpg",
    "interactive": {
      "discover": "كتاب الأمان لأهل أيلة من أقدم ما وصلنا من كتب النبي ﷺ في العهود.",
      "value": {
        "name": "السلام بالقوّة لا بالدم",
        "icon": "🕊️"
      },
      "thinkQuestion": "كيف تنهي خلافاً قبل أن يتحوّل إلى شجار؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "كيف انتهت غزوة تبوك؟",
        "options": [
          "بمعركة كبيرة",
          "بعهود أمان من غير قتال",
          "بانسحاب المسلمين",
          "بحصار طويل"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "صحيفة عهد",
        "description": "صحيفة تذكّرك أن الكلمة المكتوبة قد تُغني عن السيف."
      },
      "badge": "حافظ الحدود"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، والصحيحان في أصل الغزوة",
      "note": "أصل غزوة تبوك وخروج النبي ﷺ إليها ثابت في الصحيحين؛ وتفصيل المصالحات مع أيلة وجَرباء وأَذْرُح وعدد الجيش من كتب السيرة والمغازي."
    }
  },
  {
    "storyId": "st-8-06",
    "stationId": 8,
    "slug": "year-of-delegations-tamim",
    "title": "عام الوفود",
    "hook": "ماذا حدث عندما جاء الناس إلى المدينة ليتعلموا؟",
    "image": "/stories/seerah/year-of-delegations-tamim.jpg",
    "interactive": {
      "discover": "كان لكل وفد ضيافة ومكان ينزل فيه، وبعضهم نزل في المسجد نفسه.",
      "value": {
        "name": "حسن الحوار",
        "icon": "🏛️"
      },
      "thinkQuestion": "لو حدّاك أحد في شيء تجيده، تردّ عليه إزاي من غير ما تجرحه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ قابل النبي ﷺ مفاخرة بني تميم بالشعر والخطابة؟",
        "options": [
          "منعهم من الكلام",
          "قابل الشعر بالشعر والخطبة بالخطبة",
          "أخرجهم من المدينة",
          "سكت عنهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قلم شاعر",
        "description": "قلم يذكّرك أن الكلمة الجميلة حجّة."
      },
      "badge": "حسن الردّ"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، والقرآن الكريم، سورة النصر",
      "note": "دخول الناس في الدين أفواجاً في القرآن؛ وأما تفصيل وفد بني تميم والمفاخرة بالشعر فمن كتب السيرة عند ابن إسحاق."
    }
  },
  {
    "storyId": "st-8-07",
    "stationId": 8,
    "slug": "delegation-of-najran-dialogue",
    "title": "ضيوف نجران",
    "hook": "كيف يكون الحوار مع من يختلف معنا؟",
    "image": "/stories/seerah/delegation-of-najran-dialogue.jpg",
    "interactive": {
      "discover": "سمّى النبي ﷺ أبا عبيدة رضي الله عنه «أمين هذه الأمة»، وهو الذي بعثه معهم.",
      "value": {
        "name": "احترام المخالف",
        "icon": "🤝"
      },
      "thinkQuestion": "كيف تعامل صديقاً يخالفك في رأي تحبّه أنت جداً؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ لما أراد بعض الناس منع وفد نجران من الصلاة في المسجد؟",
        "options": [
          "أخرجوهم",
          "دعوهم",
          "انتظروا حتى نخرج",
          "لا تكلّموهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "عهد مكتوب",
        "description": "عهد يذكّرك أن الضيف يُؤمَّن وإن خالفك."
      },
      "badge": "صاحب حوار"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، وصحيح البخاري في فضل أبي عبيدة",
      "note": "قدوم وفد نجران وعهد الأمان مشهور في كتب السيرة عند ابن إسحاق؛ وتسمية أبي عبيدة رضي الله عنه أمين الأمة في صحيح البخاري."
    }
  },
  {
    "storyId": "st-8-08",
    "stationId": 8,
    "slug": "muadh-ambassador-to-yemen",
    "title": "معاذ إلى اليمن",
    "hook": "ما الوصية التي أعطاها النبي ﷺ لمعاذ رضي الله عنه؟",
    "image": "/stories/seerah/muadh-ambassador-to-yemen.jpg",
    "interactive": {
      "discover": "قال النبي ﷺ لمعاذ رضي الله عنه: «إني أحبّك»، وأوصاه بدعاء يقوله دبر كل صلاة.",
      "value": {
        "name": "التيسير في التعليم",
        "icon": "📗"
      },
      "thinkQuestion": "لو كنت تشرح لأخ أصغر منك، هتبدأ بإيه: الأسهل ولا الأصعب؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ أوصى النبي ﷺ معاذاً وأبا موسى رضي الله عنهما؟",
        "options": [
          "شدّدا ليخافوا",
          "يسّرا ولا تعسّرا وبشّرا ولا تنفّرا",
          "اجمعا المال أولاً",
          "لا تعلّما إلا الكبار"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "عصا مسافر",
        "description": "عصا تذكّرك بمعلّم مشى إليه نبيّه يودّعه."
      },
      "badge": "معلّم ميسّر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "وصية «يسّرا ولا تعسّرا» وتحذير «دعوة المظلوم» ثابتان في الصحيحين في حديث بعث معاذ رضي الله عنه إلى اليمن."
    }
  },
  {
    "storyId": "st-8-09",
    "stationId": 8,
    "slug": "dhimad-and-kab-poetry",
    "title": "قوة الكلمة",
    "hook": "كيف غيّرت كلمات النبي ﷺ فهم ضماد رضي الله عنه؟",
    "image": "/stories/seerah/dhimad-and-kab-poetry.jpg",
    "interactive": {
      "discover": "ضِماد جاء ليعالج، فرجع وقد تغيّر هو نفسه.",
      "value": {
        "name": "التثبّت قبل الحكم",
        "icon": "🗣️"
      },
      "thinkQuestion": "آخر مرة سمعت كلاماً عن شخص ما — تأكّدت بنفسك ولا صدّقت على طول؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا جاء ضِماد إلى النبي ﷺ أول مرة؟",
        "options": [
          "ليتعلّم منه",
          "ليعالجه مما سمع عنه",
          "ليشتري منه",
          "ليسأله عن الطريق"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "عود بخور",
        "description": "تذكار لرجل جاء يعالج فرجع وقد شُفي قلبه."
      },
      "badge": "متثبّت"
    },
    "source": {
      "reliability": "🟡",
      "reference": "صحيح مسلم، وسيرة ابن هشام",
      "note": "قصة ضِماد رضي الله عنه ثابتة في صحيح مسلم بلفظها؛ وأما خبر كعب بن زهير والقصيدة فمشهور في كتب السيرة والأدب لا في الصحيحين."
    }
  },
  {
    "storyId": "st-8-10",
    "stationId": 8,
    "slug": "breaking-idols-building-hearts",
    "title": "قلوب تتحرر من الأصنام",
    "hook": "لماذا لا يملك الصنم نفعًا ولا ضرًا؟",
    "image": "/stories/seerah/breaking-idols-building-hearts.jpg",
    "interactive": {
      "discover": "كان يُبعث لهدم صنم القبيلة رجلٌ منها، لا غريب عنها.",
      "value": {
        "name": "تحرير العقل",
        "icon": "🪨"
      },
      "thinkQuestion": "في فكرة كنت مصدّقها زمان وبانت لك غلط؟ إيه اللي خلّاك تغيّر رأيك؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا كان النبي ﷺ يبعث غالباً رجلاً من القبيلة نفسها؟",
        "options": [
          "لأنه أقوى",
          "لأن الناس أقبل لما يأتيهم من واحد منهم",
          "لأنه أقرب طريقاً",
          "لأنه يعرف الطريق"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قاعدة فارغة",
        "description": "قاعدة خالية تذكّرك أن الوهم يسقط أول."
      },
      "badge": "حرّ العقل"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سيرة ابن هشام، والقرآن الكريم، سورة الأعراف: ١٩٤",
      "note": "عجز الأصنام مقرّر في القرآن؛ وأما تفصيل البعوث إلى الأصنام وأسماء من بُعث فمن كتب السيرة والمغازي."
    }
  },
  {
    "storyId": "st-8-11",
    "stationId": 8,
    "slug": "mercy-to-the-weak-suffah",
    "title": "أهل الصفة",
    "hook": "كيف اهتم النبي ﷺ بمن لا يجدون بيتًا أو مالًا؟",
    "image": "/stories/seerah/mercy-to-the-weak-suffah.jpg",
    "interactive": {
      "discover": "أبو هريرة رضي الله عنه أكثر الصحابة حديثاً، وكان من أهل الصُّفَّة الذين لا يملكون شيئاً.",
      "value": {
        "name": "كرامة الضعيف",
        "icon": "🕌"
      },
      "thinkQuestion": "مين في فصلك أو حيّك محتاج حدّ يقف جنبه؟ تقدر تعمل إيه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "مَن كان ينزل في الصُّفَّة؟",
        "options": [
          "كبار التجار",
          "فقراء المهاجرين ممن لا بيت لهم",
          "الضيوف من الملوك",
          "الجنود فقط"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حصير من سعف",
        "description": "حصير يذكّرك أن المكان الصغير قد يخرّج أعظم الناس."
      },
      "badge": "سند الضعفاء"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "أهل الصُّفَّة وحال أبي هريرة رضي الله عنه معهم في صحيح البخاري، وكذلك قوله ﷺ في أن الناس يُرزقون ويُنصرون بضعفائهم."
    }
  },
  {
    "storyId": "st-8-12",
    "stationId": 8,
    "slug": "kindness-to-animals-nature",
    "title": "الرحمة بالحيوان",
    "hook": "ماذا يعلمنا الإسلام عن الحيوانات؟",
    "image": "/stories/seerah/kindness-to-animals-nature.jpg",
    "interactive": {
      "discover": "«الحُمَّرة» طائر صغير أحمر اللون، وسُمّي الحديث باسمها.",
      "value": {
        "name": "الرفق بالحيوان",
        "icon": "🐦"
      },
      "thinkQuestion": "لو لقيت حيواناً صغيراً تعبان في الشارع، تعمل إيه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ لما رأى الفرخين قد أُخذا؟",
        "options": [
          "اتركوهما معكم",
          "ردّوا ولدها إليها",
          "أطعموهما",
          "لا بأس"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "ريشة صغيرة",
        "description": "ريشة تذكّرك أن الرحمة تشمل أصغر الخلق."
      },
      "badge": "رفيق بالحيوان"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سنن أبي داود، وصحيح البخاري في «كل كبد رطبة»",
      "note": "حديث الحُمَّرة في سنن أبي داود وصحّحه غير واحد من أهل العلم، وليس في الصحيحين؛ وأما الأجر في الإحسان إلى كل ذي كبد رطبة ففي البخاري ومسلم."
    }
  },
  {
    "storyId": "st-8-13",
    "stationId": 8,
    "slug": "honest-merchant-market-ethics",
    "title": "من غش فليس منا",
    "hook": "ماذا وجد النبي ﷺ في طعام البائع؟",
    "image": "/stories/seerah/honest-merchant-market-ethics.jpg",
    "interactive": {
      "discover": "النبي ﷺ كان يمشي في السوق بنفسه ليطمئنّ على معاملات الناس، لا ليشتري فقط.",
      "value": {
        "name": "الأمانة في البيع",
        "icon": "⚖️"
      },
      "thinkQuestion": "لو كنت بتبيع حاجة وفيها عيب صغير، هتقوله للمشتري ولا تسكت؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا عاتب النبي ﷺ صاحب الطعام؟",
        "options": [
          "لأنه رفع السعر",
          "لأنه أخفى المبلول تحت الجافّ",
          "لأنه باع في الصباح",
          "لأنه لم يكِل جيداً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "كفّة ميزان",
        "description": "كفّة تذكّرك أن العيب يُقال ولا يُخفى."
      },
      "badge": "تاجر صدوق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم",
      "note": "حديث «من غشّ فليس منّي» وقصة صُبرة الطعام في صحيح مسلم."
    }
  },
  {
    "storyId": "st-8-14",
    "stationId": 8,
    "slug": "mosque-school-and-knowledge",
    "title": "المسجد مدرسة",
    "hook": "من طلب من النبي ﷺ وقتًا خاصًا للتعلم؟",
    "image": "/stories/seerah/mosque-school-and-knowledge.jpg",
    "interactive": {
      "discover": "النساء هنّ اللواتي طلبن الدرس، فاستجاب لهنّ النبي ﷺ ولم ينتظر منهنّ أن يسكتن.",
      "value": {
        "name": "العلم للجميع",
        "icon": "📚"
      },
      "thinkQuestion": "آخر مرة سألت سؤالاً كنت خايف تسأله؟ إيه اللي حصل لما سألت؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل النبي ﷺ لما طلبت النساء يوماً للتعلّم؟",
        "options": [
          "اعتذر لانشغاله",
          "وعدهنّ يوماً ولقيهنّ فيه فعلّمهنّ",
          "أحالهنّ إلى أزواجهنّ",
          "أجّلهنّ سنة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "لوح تعليم",
        "description": "لوح يذكّرك أن السؤال أول خطوة في العلم."
      },
      "badge": "طالب علم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "طلب النساء يوماً من النبي ﷺ وتخصيصه لهنّ يوماً يعلّمهنّ فيه ثابت في صحيح البخاري ومسلم."
    }
  },
  {
    "storyId": "st-8-15",
    "stationId": 8,
    "slug": "madinah-capital-of-light",
    "title": "المدينة تطمئن",
    "hook": "كيف وصف النبي ﷺ الأمن الذي سيأتي بعد الصبر؟",
    "image": "/stories/seerah/madinah-capital-of-light.jpg",
    "interactive": {
      "discover": "قال النبي ﷺ هذه الكلمات وهو في مكة مستضعف، قبل أن تكون هناك دولة أصلاً.",
      "value": {
        "name": "الأمن ثمرة العدل",
        "icon": "🌇"
      },
      "thinkQuestion": "إيه اللي يخلّي مكاناً «آمناً» في رأيك؟ الأسوار ولا الناس؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ وعد النبي ﷺ خبّاباً رضي الله عنه وهم يُعذَّبون في مكة؟",
        "options": [
          "بأن العذاب سينتهي غداً",
          "بأن الأمن سيعمّ حتى يسير الراكب لا يخاف إلا الله",
          "بأن يخرجوا من مكة",
          "بأن يقاتلوا فوراً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "مصباح على الطريق",
        "description": "مصباح يذكّرك أن الأمن يُبنى ولا يُوهَب."
      },
      "badge": "بانٍ للوطن"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "حديث خبّاب بن الأرتّ رضي الله عنه وقول النبي ﷺ «حتى يسير الراكب من صنعاء إلى حضرموت» في صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-01",
    "stationId": 9,
    "slug": "grand-call-to-hajj",
    "title": "النداء الأكبر: مسيرة إلى مكة",
    "hook": "ما الذي يجعل الناس يقفون سواءً أمام الله؟",
    "image": "/stories/seerah/grand-call-to-hajj.jpg",
    "interactive": {
      "discover": "وصف جابر بن عبد الله رضي الله عنه هذه الحجّة وصفاً دقيقاً يوماً بيوم، وحديثه أطول حديث في صفة الحجّ.",
      "value": {
        "name": "المساواة",
        "icon": "🕋"
      },
      "thinkQuestion": "لو الناس كلها لابسة زيّ واحد، إيه اللي هيفرّق بينهم ساعتها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا لبس الحجيج ثياباً بيضاء متشابهة؟",
        "options": [
          "لأنها أرخص",
          "لأنها تُذهب الفرق بين غنيّ وفقير",
          "لأنها تقي الحرّ فقط",
          "لأنها زيّ الجيش"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "إزار أبيض",
        "description": "ثوب أبيض يذكّرك أن الفروق تُخلع عند الباب."
      },
      "badge": "من ركب النداء"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح مسلم، حديث جابر رضي الله عنه في صفة الحجّ",
      "note": "صفة إحرام النبي ﷺ من ذي الحُليفة والتلبية في صحيح مسلم؛ وأما عدد الحجيج فتقدير من كتب السيرة والتاريخ لا نصّ فيه."
    }
  },
  {
    "storyId": "st-9-02",
    "stationId": 9,
    "slug": "arafat-unity-and-equality",
    "title": "عرفات: بحر من البياض",
    "hook": "لماذا كان الوقوف بعرفة لحظة عظيمة في الحج؟",
    "image": "/stories/seerah/arafat-unity-and-equality.jpg",
    "interactive": {
      "discover": "كان الناس يبلّغون صوت النبي ﷺ إلى من خلفهم، لأنه لم يكن هناك ما يكبّر الصوت.",
      "value": {
        "name": "الوقوف بين يدي الله",
        "icon": "🤍"
      },
      "thinkQuestion": "لو كان عندك دعوة واحدة تدعو بها، تدعو بإيه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا قال النبي ﷺ عن ركن الحجّ الأعظم؟",
        "options": [
          "الحجّ الطواف",
          "الحجّ عرفة",
          "الحجّ منى",
          "الحجّ السعي"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حصاة بيضاء",
        "description": "حصاة تذكّرك بيوم وقف فيه الناس سواء."
      },
      "badge": "واقف بعرفة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "سنن الترمذي وصحيح مسلم في صفة الحجّ",
      "note": "صفة وقوف النبي ﷺ بعرفة في حديث جابر رضي الله عنه في صحيح مسلم؛ وحديث «الحجّ عرفة» في السنن وصحّحه أهل العلم."
    }
  },
  {
    "storyId": "st-9-03",
    "stationId": 9,
    "slug": "farewell-sermon-human-rights",
    "title": "خطبة الوداع: لا فضل لعربي على أعجمي",
    "hook": "كيف يحفظ الإسلام كرامة الناس وحقوقهم؟",
    "image": "/stories/seerah/farewell-sermon-human-rights.jpg",
    "interactive": {
      "discover": "بدأ النبي ﷺ بإبطال ربا عمّه العباس ودم ابن ربيعة من أهله هو، قبل أن يطالب أحداً غيره.",
      "value": {
        "name": "العدل والمساواة",
        "icon": "📜"
      },
      "thinkQuestion": "فيه حدّ اتعامل معاه الناس بشكل أقلّ عشان شكله أو بلده؟ تعمل إيه لو شفت ده؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ يتفاضل الناس في خطبة الوداع؟",
        "options": [
          "بالنسب",
          "باللون",
          "بالتقوى",
          "بالمال"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "لوح ميثاق",
        "description": "لوح يذكّرك أن أول من طُبّق عليه الحكم كان أهل النبي ﷺ."
      },
      "badge": "حامل الميثاق"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم، ومسند أحمد",
      "note": "«إن دماءكم وأموالكم عليكم حرام» في الصحيحين؛ وأما «لا فضل لعربيّ على أعجميّ» فمن خطبة أيام التشريق في مسند أحمد، وحسّنه أهل العلم."
    }
  },
  {
    "storyId": "st-9-04",
    "stationId": 9,
    "slug": "testament-of-women-rights",
    "title": "استوصوا بالنساء خيرًا",
    "hook": "كيف تكون الأسرة مكانًا للرحمة والإنصاف؟",
    "image": "/stories/seerah/testament-of-women-rights.jpg",
    "interactive": {
      "discover": "مقياس النبي ﷺ للرجل الصالح هو بيته، لا مجلسه بين الناس.",
      "value": {
        "name": "حسن العشرة",
        "icon": "🌸"
      },
      "thinkQuestion": "أنت أحسن مع مين أكتر: أصحابك ولا أهل بيتك؟ ليه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ يقاس خير الرجل في قول النبي ﷺ؟",
        "options": [
          "بماله",
          "بمكانته بين الناس",
          "بمعاملته لأهل بيته",
          "بقوّته"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "سوار بسيط",
        "description": "سوار يذكّرك بمن رُفع عنهنّ ظلم قرون بكلمة."
      },
      "badge": "حسن العشرة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "«استوصوا بالنساء خيراً» في الصحيحين ضمن خطبة حجّة الوداع، و«خيركم خيركم لأهله» في السنن وصحّحه أهل العلم."
    }
  },
  {
    "storyId": "st-9-05",
    "stationId": 9,
    "slug": "completion-of-faith-farewell",
    "title": "ألا هل بلّغت؟ وبكاء الصديق",
    "hook": "ماذا يعني أن تصل الرسالة بوضوح وأمانة؟",
    "image": "/stories/seerah/completion-of-faith-farewell.jpg",
    "interactive": {
      "discover": "قال يهوديّ لعمر رضي الله عنه: لو نزلت علينا هذه الآية لاتخذنا يومها عيداً. فقال عمر: قد نزلت في يوم عيدين — يوم جمعة ويوم عرفة.",
      "value": {
        "name": "تمام الأمانة",
        "icon": "🏔️"
      },
      "thinkQuestion": "لما بتخلّص شغل تعبت فيه، بتحسّ بإيه؟ فرح ولا حاجة تانية كمان؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ أجاب الناس حين سألهم النبي ﷺ: ما أنتم قائلون؟",
        "options": [
          "سكتوا",
          "نشهد أنك قد بلّغت وأدّيت ونصحت",
          "نسألك المزيد",
          "سنسأل غداً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "إصبع مرفوعة",
        "description": "تذكار ليوم أشهد فيه نبيّ ربَّه على أمّته."
      },
      "badge": "شاهد على البلاغ"
    },
    "source": {
      "reliability": "🟡",
      "reference": "صحيح مسلم، وصحيح البخاري في نزول الآية",
      "note": "سؤال النبي ﷺ «ألا هل بلّغت» و«اللهم اشهد» في صحيح مسلم؛ ونزول آية إكمال الدين يوم عرفة في صحيح البخاري. وأما بكاء أبي بكر رضي الله عنه ففي كتب التفسير والسيرة."
    }
  },
  {
    "storyId": "st-9-06",
    "stationId": 9,
    "slug": "signs-of-farewell-uhud-cemetery",
    "title": "وداع الشهداء وخطبة المنبر",
    "hook": "كيف نتذكر من ضحوا من أجل الحق؟",
    "image": "/stories/seerah/signs-of-farewell-uhud-cemetery.jpg",
    "interactive": {
      "discover": "مضى على شهداء أُحد سنوات طويلة، ومع ذلك خرج إليهم يودّعهم قبل رحيله.",
      "value": {
        "name": "الوفاء",
        "icon": "🌿"
      },
      "thinkQuestion": "فيه حدّ ساعدك زمان ومكافأتش عنه؟ تقدر تفتكره النهارده إزاي؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما الذي قال النبي ﷺ إنه يخاف على أمّته منه؟",
        "options": [
          "أن يشركوا بعده",
          "أن تُفتح عليهم الدنيا فيتنافسوا فيها",
          "أن يقلّ عددهم",
          "أن يجوعوا"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "غصن من أُحد",
        "description": "غصن يذكّرك بمن لا يُنسون وإن طال الزمن."
      },
      "badge": "وفيّ لأصحابه"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "خروج النبي ﷺ إلى شهداء أُحد وخطبته على المنبر بهذا اللفظ ثابتان في صحيح البخاري ومسلم."
    }
  },
  {
    "storyId": "st-9-07",
    "stationId": 9,
    "slug": "usama-young-army-commander",
    "title": "أسامة: قائد في الثامنة عشرة",
    "hook": "هل يمنع صغر السن من تحمل مسؤولية حقيقية؟",
    "image": "/stories/seerah/usama-young-army-commander.jpg",
    "interactive": {
      "discover": "أبو بكر رضي الله عنه أنفذ جيش أسامة بعد وفاة النبي ﷺ ولم يعزله، رغم أنه أصغر منه بكثير.",
      "value": {
        "name": "الثقة بالشباب",
        "icon": "🎖️"
      },
      "thinkQuestion": "حدّ أكبر منك وثق فيك في حاجة؟ حسّيت بإيه ساعتها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا اعترض بعض الناس على إمارة أسامة رضي الله عنه؟",
        "options": [
          "لأنه لم يكن شجاعاً",
          "لصغر سنّه",
          "لأنه لم يعرف الطريق",
          "لأنه رفض القيادة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "راية صغيرة",
        "description": "راية تذكّرك أن الأهلية لا عمر لها."
      },
      "badge": "أهلٌ للأمانة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "تأمير أسامة بن زيد رضي الله عنهما وخطبة النبي ﷺ في الدفاع عنه ثابتان في الصحيحين."
    }
  },
  {
    "storyId": "st-9-08",
    "stationId": 9,
    "slug": "fever-and-aisha-chamber",
    "title": "بداية المرض: أين أنا غدًا؟",
    "hook": "كيف يظهر العدل حتى في وقت التعب؟",
    "image": "/stories/seerah/fever-and-aisha-chamber.jpg",
    "interactive": {
      "discover": "حجرة عائشة رضي الله عنها كانت ملاصقة للمسجد، فكان يسمع الناس وهم يصلّون.",
      "value": {
        "name": "العدل في الضعف",
        "icon": "🌙"
      },
      "thinkQuestion": "لما بتتعب أو بتزهق، بتفضل عادل مع اللي حواليك ولا بتنسى؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "لماذا كان النبي ﷺ يسأل: أين أنا غداً؟",
        "options": [
          "لينسى المرض",
          "ليعرف يوم عائشة رضي الله عنها فيستأذنهنّ",
          "ليخرج للسفر",
          "ليؤمّ الناس"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "إناء ماء",
        "description": "إناء يذكّرك أن العدل لا يسقط بالمرض."
      },
      "badge": "عادلٌ حتى في مرضه"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "سؤاله ﷺ «أين أنا غداً» وإذن أزواجه له أن يُمرَّض في بيت عائشة رضي الله عنها في صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-09",
    "stationId": 9,
    "slug": "abu-bakr-leads-prayer",
    "title": "مُروا أبا بكر فليصلِّ بالناس",
    "hook": "لماذا يحتاج الناس إلى من يقودهم في الصلاة؟",
    "image": "/stories/seerah/abu-bakr-leads-prayer.jpg",
    "interactive": {
      "discover": "فهم كثير من الصحابة من تقديمه لأبي بكر رضي الله عنه في الصلاة إشارةً إلى من يخلفه بعده.",
      "value": {
        "name": "تعظيم الصلاة",
        "icon": "🕌"
      },
      "thinkQuestion": "فيه حاجة بتعملها كل يوم مهما كنت تعبان؟ إيه هي؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل النبي ﷺ لما عجز عن الخروج إلى الصلاة؟",
        "options": [
          "أخّر الصلاة حتى يشفى",
          "أمر أبا بكر أن يصلّي بالناس",
          "أمرهم أن يصلّوا فرادى",
          "خرج محمولاً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "سجادة صغيرة",
        "description": "سجادة تذكّرك أن الصلاة آخر ما يُترك."
      },
      "badge": "محافظ على الصلاة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري ومسلم",
      "note": "أمر النبي ﷺ لأبي بكر رضي الله عنه أن يصلّي بالناس ومراجعة عائشة رضي الله عنها له ثابتان في الصحيحين."
    }
  },
  {
    "storyId": "st-9-10",
    "stationId": 9,
    "slug": "last-prayer-behind-abu-bakr",
    "title": "آخر صلاة صلّاها بينهم",
    "hook": "ما الذي يجعل الصلاة رابطًا ثابتًا في أصعب الأيام؟",
    "image": "/stories/seerah/last-prayer-behind-abu-bakr.jpg",
    "interactive": {
      "discover": "كان أبو بكر رضي الله عنه يبلّغ التكبير عن النبي ﷺ ليسمعه من في آخر المسجد.",
      "value": {
        "name": "التواضع المتبادل",
        "icon": "🤲"
      },
      "thinkQuestion": "لو حدّ بدأ شغلانة وأنت أقدر منه، هتاخدها منه ولا تكمّل معاه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا أشار النبي ﷺ لأبي بكر رضي الله عنه لما أراد أن يتأخّر؟",
        "options": [
          "أن يخرج",
          "أن مكانك ولا تتأخّر",
          "أن يجلس",
          "أن يعيد الصلاة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "سُبحة خشب",
        "description": "تذكار لآخر صلاة جمعتهم به."
      },
      "badge": "متواضع مع الناس"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "خروج النبي ﷺ في مرضه وصلاته إلى جنب أبي بكر رضي الله عنه في صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-11",
    "stationId": 9,
    "slug": "final-glance-and-smile",
    "title": "الستارة تُرفع.. والابتسامة",
    "hook": "لماذا فرح المسلمون عندما رأوا النبي ﷺ؟",
    "image": "/stories/seerah/final-glance-and-smile.jpg",
    "interactive": {
      "discover": "لم يخرج إليهم ولم يقطع صلاتهم؛ اكتفى بأن يراهم قائمين ثم أرخى الستر.",
      "value": {
        "name": "الفرح بمن تربّى على يدك",
        "icon": "🌅"
      },
      "thinkQuestion": "لو علّمت حدّ حاجة وشفته بيعملها لوحده صح — هتحسّ بإيه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا فعل النبي ﷺ لما رأى الناس صفوفاً في صلاتهم؟",
        "options": [
          "قطع صلاتهم",
          "تبسّم يضحك ثم أرخى الستر",
          "نادى أبا بكر",
          "خرج فصلّى بهم"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "طرف ستارة",
        "description": "تذكار لآخر نظرة، وكانت ابتسامة."
      },
      "badge": "من رآه يبتسم"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "كشف الستارة يوم الاثنين وتبسّمه ﷺ ووصف أنس رضي الله عنه لوجهه في صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-12",
    "stationId": 9,
    "slug": "last-testament-prayer-and-weak",
    "title": "الصلاة الصلاة.. وما ملكت أيمانكم",
    "hook": "ما الوصايا التي تبقى في القلب في آخر العمر؟",
    "image": "/stories/seerah/last-testament-prayer-and-weak.jpg",
    "interactive": {
      "discover": "لم يوصِ النبي ﷺ بمال، ولم يترك ديناراً ولا درهماً حين مات.",
      "value": {
        "name": "حقّ الله وحقّ الضعيف",
        "icon": "🤍"
      },
      "thinkQuestion": "مين الشخص اللي مالوش حدّ يشتكي له منك؟ بتعامله إزاي؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ كانت وصية النبي ﷺ الأخيرة؟",
        "options": [
          "بالمال والميراث",
          "بالصلاة وبمن تحت أيديهم من الضعفاء",
          "بالجهاد فقط",
          "بالسفر"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "رَكوة ماء",
        "description": "إناء يذكّرك بآخر كلمتين قالهما."
      },
      "badge": "حافظ الوصية"
    },
    "source": {
      "reliability": "🟡",
      "reference": "سنن أبي داود ومسند أحمد، وصحيح البخاري في «سكرات الموت»",
      "note": "«الصلاةَ الصلاةَ وما ملكت أيمانكم» في سنن أبي داود ومسند أحمد وصحّحه أهل العلم، وليس في الصحيحين؛ وأما «إن للموت سكرات» ففي صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-13",
    "stationId": 9,
    "slug": "to-the-highest-companion",
    "title": "بل الرفيق الأعلى",
    "hook": "كيف نروي لحظة حزينة باحترام وطمأنينة؟",
    "image": "/stories/seerah/to-the-highest-companion.jpg",
    "interactive": {
      "discover": "آخر عمل عمله ﷺ كان تنظيف فمه بالسواك، وهو سنّة كان يواظب عليها طوال حياته.",
      "value": {
        "name": "حسن الخاتمة",
        "icon": "✨"
      },
      "thinkQuestion": "فيه عادة صغيرة حلوة بتعملها كل يوم وتحبّ تفضل عليها؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ما آخر ما قاله النبي ﷺ؟",
        "options": [
          "أوصيكم بالمال",
          "بل الرفيق الأعلى",
          "احفظوا الطريق",
          "انتظروني"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "سواك",
        "description": "سواك يذكّرك أن العادة الصغيرة تبقى إلى آخر لحظة."
      },
      "badge": "حسن الخاتمة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "حديث السواك وقوله ﷺ «مع الرفيق الأعلى» عند وفاته في صحيح البخاري من حديث عائشة رضي الله عنها."
    }
  },
  {
    "storyId": "st-9-14",
    "stationId": 9,
    "slug": "city-earthquake-abu-bakr-speech",
    "title": "زلزال المدينة وثبات الصدّيق",
    "hook": "ماذا نفعل عندما يصل خبر كبير ومفاجئ؟",
    "image": "/stories/seerah/city-earthquake-abu-bakr-speech.jpg",
    "interactive": {
      "discover": "الآية كانت قد نزلت قبل ذلك بسنين، لكن الناس ما فهموها إلا يومئذ.",
      "value": {
        "name": "الثبات وقت الصدمة",
        "icon": "🗻"
      },
      "thinkQuestion": "لما بيحصل خبر صعب، إنت من النوع اللي بيهدأ ولا اللي بيرتبك؟ إزاي تتدرّب؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "بمَ خاطب أبو بكر رضي الله عنه الناس يوم وفاة النبي ﷺ؟",
        "options": [
          "اصبروا وسيعود",
          "من كان يعبد محمداً فإن محمداً قد مات، ومن كان يعبد الله فإن الله حيّ لا يموت",
          "لا تتكلّموا",
          "اخرجوا من المدينة"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "حجر ثابت",
        "description": "حجر يذكّرك بمن ثبت حين اضطرب الناس."
      },
      "badge": "ثابت وقت الشدّة"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "خطبة أبي بكر رضي الله عنه يوم وفاة النبي ﷺ وقول الناس كأنهم لم يعلموا بالآية حتى تلاها — في صحيح البخاري."
    }
  },
  {
    "storyId": "st-9-15",
    "stationId": 9,
    "slug": "eternal-legacy-living-sunnah",
    "title": "ما بقي بعده: النور لا ينطفئ",
    "hook": "كيف يبقى أثر النبي ﷺ في حياتنا اليوم؟",
    "image": "/stories/seerah/eternal-legacy-living-sunnah.jpg",
    "interactive": {
      "discover": "مات ﷺ ودرعه مرهونة عند يهوديّ في ثلاثين صاعاً من شعير أخذها طعاماً لأهله.",
      "value": {
        "name": "الأثر الباقي",
        "icon": "🌟"
      },
      "thinkQuestion": "لو حدّ وصفك بخلق واحد اتعلّمته من سيرة النبي ﷺ، تحبّ يكون إيه؟",
      "challenge": {
        "type": "multiple_choice",
        "question": "ماذا ترك النبي ﷺ حين مات؟",
        "options": [
          "مالاً كثيراً",
          "لم يترك ديناراً ولا درهماً، وترك كتاب الله وسنّته",
          "قصوراً",
          "جيشاً"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "قنديل صغير",
        "description": "قنديل يذكّرك أن النور يُسلَّم من يد إلى يد."
      },
      "badge": "حامل الأثر"
    },
    "source": {
      "reliability": "🟢",
      "reference": "صحيح البخاري",
      "note": "موضع دفنه ﷺ وأنه لم يترك ديناراً ولا درهماً ورهن درعه عند يهوديّ — كلّها في صحيح البخاري."
    }
  }
];
