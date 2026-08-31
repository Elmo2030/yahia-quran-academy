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
  {
    slug: "seerah", titleAr: "السيرة النبوية", titleEn: "The Prophet's Biography",
    descriptionAr: "محطات من حياة النبي ﷺ للأطفال، بقصص تفاعلية واختبارات وأوسمة.",
    descriptionEn: "Stations from the Prophet's life for children, with interactive stories, quizzes, and badges.",
    cover: null, available: true,
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
};

export const stories: Story[] = [
  {
    chapter: "nations", slug: "ashab-al-kahf",
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
    },
    title: "قصة أصحاب الكهف",
    surahName: "",
    hook: "هل جربتم يوماً أن تناموا وتستيقظوا لتجدوا أن كل شيء من حولكم قد تغير؟ في قصتنا اليوم، هناك مجموعة من الشباب الطيبين ناموا نومة طويلة جداً.. لم تكن ليوم أو يومين، بل لمئات السنين! كيف حدث ذلك؟",
    events: "في زمان قديم، كان هناك ملك وثني ظالم يجبر الناس على عبادة الأصنام. لكن كان هناك مجموعة من الفتية (الشباب) الأذكياء الذين آمنوا بالله وحده. ولأنهم خافوا على دينهم وأنفسهم من الملك الشرير، هربوا بعيداً واختبأوا في كهف ومعهم كلبهم الوفي. وفي الكهف، ألقى الله عليهم النوم، فناموا بسلام لمدة 309 سنين قمرية! كان الله يحفظ أجسادهم طوال هذه المدة بقلبهم يميناً ويساراً. ولما استيقظوا وشعروا بالجوع، أرسلوا أحدهم ليشتري طعاماً، فاكتشفوا أن الملك الظالم قد مات منذ زمن طويييل، وأن مدينتهم أصبحت كلها تعبد الله!",
    quranProse: "يقول الله تعالى في القرآن عن نومهم العجيب: {فَضَرَبْنَا عَلَىٰ آذَانِهِمْ فِي الْكَهْفِ سِنِينَ عَدَدًا}. (أي ألقينا عليهم نوماً عميقاً).",
    lesson: "قصة أصحاب الكهف هي دليل رائع على قدرة الله على إحياء الموتى والبعث. ونتعلم منها أيضاً أن الله ينقذ ويحمي دائماً الشباب الذين يختارون طريق الإيمان والتوحيد.",
    next: "أصحاب الكهف كانوا شباباً أذكياء اختاروا الإيمان. وفي قصتنا القادمة، سنتعرف على رجل عظيم لم يكن نبياً، ولكنه كان مشهوراً جداً بشيء اسمه 'الحكمة'، وأعطى ابنه نصائح ذهبية نكتبها بماء الذهب! من هو؟ إنه لقمان الحكيم!",
  },
  {
    chapter: "nations", slug: "luqman",
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
    },
    title: "قصة لقمان الحكيم",
    surahName: "",
    hook: "إذا أردتم أن تكونوا ناجحين ومحبوبين، فمن أين تأخذون النصائح؟ من شخص 'حكيم' طبعاً! واليوم سنتعرف على أب حكيم جداً، ذكره الله في القرآن لنتعلم من نصائحه التي قدمها لابنه.",
    events: "لقمان لم يكن نبياً، بل كان رجلاً بشرياً صالحاً جداً. أعطاه الله نعمة كبيرة تُسمى 'الحكمة'، وهي أن يفكر بعقله بشكل صحيح ويقول الكلام المفيد في الوقت المناسب. جلس لقمان يوماً مع ابنه الصغير ليقدم له وصايا عظيمة؛ فقال له: يا بني، لا تشرك بالله أبداً، وحافظ على صلاتك، وكن باراً بوالديك ومطيعاً لهما، ولا تمشِ بين الناس متكبراً أو مغروراً، وتحدث بصوت هادئ ومعتدل.",
    quranProse: "يقول الله تعالى عن إعطائه الحكمة للقمان: {وَلَقَدْ آتَيْنَا لُقْمَانَ الْحِكْمَةَ أَنِ اشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِ}.",
    lesson: "الحكمة الحقيقية تبدأ بالإيمان بالله وشكره على نعمه. ونتعلم من نصائح لقمان أن نحترم والدينا، وأن نكون متواضعين ولا نتكبر على أحد، لأن الله لا يحب المغرورين.",
    next: "لقمان استخدم حكمته في الكلام الطيب. لكن في القصة القادمة، سنتعرف على ملك عظيم استخدم قوته وحكمته الهندسية ليبني سداً ضخماً جداً من الحديد! لماذا بناه؟ ومن هم يأجوج ومأجوج؟ تعالوا نعرف قصة ذو القرنين!",
  },
  {
    chapter: "nations", slug: "dhul-qarnayn",
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
    },
    title: "قصة ذو القرنين",
    surahName: "",
    hook: "هل تحبون قصص الملوك الأقوياء الذين يسافرون لاكتشاف العالم؟ بطلنا اليوم هو مَلِك عادل وقوي جداً، سافر إلى أماكن بعيدة جداً في الشرق والغرب لمساعدة الناس ونشر الخير.",
    events: "ذو القرنين هو حاكم عادل مكنه الله في الأرض وأعطاه من كل شيء سبباً (أي أعطاه القوة والعلم والأدوات). طاف ذو القرنين مشارق الأرض ومغاربها. وفي إحدى رحلاته، وصل إلى قوم ضعفاء يعيشون بين جبلين، واشتكوا له من أشرار اسمهم (يأجوج ومأجوج) يفسدون في الأرض. قرر ذو القرنين أن يستخدم قوته وهندسته لمساعدتهم، وطلب منهم أن يحضروا قطعاً ضخمة من الحديد والنحاس المذاب، وبنى لهم سداً عظيماً جداً وقوياً يمنع الأشرار من الوصول إليهم.",
    quranProse: "يقول الله تعالى عن هذا السد القوي الذي بناه ذو القرنين: {فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا}. (أي لم يستطع الأشرار أن يتسلقوه أو يثقبوه).",
    lesson: "إذا أعطانا الله القوة أو المال أو العلم، يجب أن نستخدمه في نصرة المستضعفين ومساعدة الآخرين، تماماً كما فعل الحاكم العادل ذو القرنين.",
    next: "ذو القرنين كان ملكاً يساعد الضعفاء. ولكن ماذا لو كان الملك هو الشرير الظالم؟ كيف يمكن لشخص واحد أن يدافع عن الحق داخل قصر هذا الملك الشرير؟ هذا ما سنعرفه في قصة البطل الشجاع: مؤمن آل فرعون!",
  },
  {
    chapter: "nations", slug: "believer-of-pharaoh",
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
    },
    title: "قصة مؤمن آل فرعون",
    surahName: "",
    hook: "هل يحتاج الإنسان إلى سيف ليكون شجاعاً؟ أحياناً تكون الكلمة أقوى من السيف! بطلنا اليوم رجل واحد وقف أمام أخطر وأظلم ملك في التاريخ ليقول كلمة حق ويدافع عن نبي الله.",
    events: "في قصر فرعون الظالم الذي كان يدّعي أنه إله، كان هناك رجل طيب يكتم إيمانه ولا يخبر أحداً به. وعندما غضب فرعون وقرر أن يقتل سيدنا موسى عليه السلام، لم يسكت هذا الرجل المؤمن! وقف بشجاعة وسط كل حراس فرعون، واستخدم المنطق والعقل ليدافع عن موسى، وقال لهم: هل تقتلون رجلاً طيباً فقط لأنه يقول (ربي الله)؟ وقد جاءكم بالمعجزات والأدلة الواضحة؟ وذكّرهم بأن الظلم سيؤدي بهم إلى الهلاك. فحماه الله من غضب فرعون ومكره.",
    quranProse: "يقول الله تعالى واصفاً شجاعة هذا الرجل: {وَقَالَ رَجُلٌ مُّؤْمِنٌ مِّنْ آلِ فِرْعَوْنَ يَكْتُمُ إِيمَانَهُ أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ}.",
    lesson: "الشجاعة الحقيقية هي شجاعة الكلمة والدفاع عن المظلومين والأنبياء. ونتعلم أن الله يقف دائماً مع من يدافع عن الحق حتى لو كان وحده أمام جيش كامل.",
    next: "مؤمن آل فرعون دافع عن الحق بشجاعة. ولكن في القصة القادمة، سنتعرف على مجموعة كاملة من المؤمنين، قرروا الصمود وعدم التخلي عن توحيد الله حتى لو ألقوا في خنادق مليئة بالنار! من هم؟ إنهم أصحاب الأخدود!",
  },
  {
    chapter: "nations", slug: "ashab-al-ukhdud",
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
    },
    title: "قصة أصحاب الأخدود",
    surahName: "",
    hook: "ما هو أغلى شيء تملكونه؟ بالنسبة للأبطال في قصتنا اليوم، كان إيمانهم بالله أغلى من حياتهم نفسها! قصة اليوم مليئة بالصمود والتحدي العظيم أمام ملك جبار.",
    events: "كان هناك ملك جبار وشرير يريد من الناس أن يعبدوه هو فقط. لكن المؤمنين الصالحين رفضوا التخلي عن التوحيد والإيمان بالله الحقيقي. غضب الملك غضباً شديداً، وأمر جنوده بحفر خنادق عميقة في الأرض (أخاديد) وأشعل فيها ناراً ضخمة جداً! خيّر الملك المؤمنين: إما أن تتركوا دينكم أو تُرموا في النار. وبشجاعة عظيمة وصمود عقدي مذهل، اختار المؤمنون أن يُلقوا في النار على أن يكفروا بالله. ورغم أن أجسادهم فنيت، إلا أن أرواحهم انتصرت وصعدت إلى الجنة بسعادة.",
    quranProse: "يقول الله تعالى عنهم في سورة البروج: {قُتِلَ أَصْحَابُ الْأُخْدُودِ * النَّارِ ذَاتِ الْوَقُودِ}. (أي لُعن الأشرار الذين حفروا الأخدود وأشعلوا فيه النار).",
    lesson: "نتعلم من هذه القصة قوة الصمود العقدي العظيم؛ فانتصار الروح والعقيدة أهم بكثير من فناء الجسد. ونتعلم أن الله يرى كل ما يفعله الأشرار وسيعاقبهم، وسيكافئ المؤمنين بالجنة.",
    next: "رأينا كيف فضل المؤمنون الله على حياتهم. لكن في قصتنا القادمة، سنتعرف على رجل فضل أمواله وذهبه على الله! وادعى بـ 'الغرور العلمي' أن ثروته جاءت بذكائه فقط! فماذا حدث لقصره ولأمواله؟ إنها قصة قارون!",
  },
  {
    chapter: "nations", slug: "qarun",
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
    },
    title: "قصة قارون",
    surahName: "",
    hook: "تخيلوا شخصاً يملك صناديق من الكنوز والذهب كثيرة جداً، لدرجة أن مفاتيح هذه الصناديق وحدها تحتاج إلى رجال أقوياء جداً لحملها! هل هذا المال الكثير جعله إنساناً طيباً أم شريراً؟ تعالوا نتعرف على قصة قارون.",
    events: "قارون كان رجلاً يعيش في زمن سيدنا موسى، وقد أعطاه الله أموالاً وكنوزاً هائلة. لكن قارون أصيب بفتنة المال والغرور العلمي! بدلاً من أن يشكر الله على هذه النعم ويساعد الفقراء، تكبر عليهم، وادعى أن ثروته الهائلة جاءت بجهده وعلمه الخالص وأنه ذكي جداً. نصحه الناس الطيبون أن يتواضع ولا يغتر، لكنه رفض. فكان عقابه أن خسف الله به وبقصره العظيم الأرض، فابتلعت الأرض كل أمواله وغروره في لحظة واحدة!",
    quranProse: "يقول الله تعالى يصف غرور قارون: {قَالَ إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي}. (أي كان يظن أنه حصل على المال بذكائه فقط وليس من فضل الله).",
    lesson: "المال والذكاء هي هدايا من الله. ونتعلم من قارون بطلان الاعتماد على الأسباب المادية فقط دون شكر الله (المُسبب). يجب أن نكون متواضعين ونساعد الآخرين بما أعطانا الله.",
    next: "قارون أحب الذهب والمال وتكبر. ولكن ماذا لو استخدم شخص الذهب ليصنع تمثالاً ويخدع به الناس؟ قصة غريبة بطلها رجل مخادع جداً.. إنه السامري!",
  },
  {
    chapter: "nations", slug: "samiri",
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
    },
    title: "قصة السامري",
    surahName: "",
    hook: "هل يمكن لتمثال مصنوع من الذهب أن يتحدث أو ينفع أحداً؟ بالطبع لا! لكن في قصتنا اليوم، هناك رجل مخادع استغل غياب النبي ليصنع تمثالاً عجيباً يخدع به الناس.",
    events: "عندما ذهب سيدنا موسى ليتلقى أوامر الله، استغل رجل يُدعى 'السامري' غيابه ليقوم بخداع الناس. جمع السامري حُليّ وذهب بني إسرائيل، وصنع منه تمثالاً على شكل عجل (بقرة صغيرة)، وجعله مجوفاً بطريقة تجعل الهواء يدخل فيه فيصدر صوتاً (عجلاً جسداً له خوار). أوهم السامري الناس كذباً بأن هذا العجل هو إلههم! وعندما عاد سيدنا موسى، غضب غضباً شديداً من هذا الانحراف العقدي والابتداع، فقام بتدمير العجل. أما السامري، فكان عقابه النبذ الاجتماعي المطلق في الحياة الدنيا، حيث أصبح يعيش وحيداً ومطروداً ويقول لكل من يقترب منه 'لا مِساس' (أي لا تلمسني).",
    quranProse: "يقول الله تعالى عن صنيع هذا المخادع: {فَأَخْرَجَ لَهُمْ عِجْلًا جَسَدًا لَّهُ خُوَارٌ فَقَالُوا هَٰذَا إِلَٰهُكُمْ وَإِلَٰهُ مُوسَىٰ فَنَسِيَ}.",
    lesson: "يجب ألا نصدق المخادعين أو نتبع الأفكار الخاطئة (الابتداع). الله سبحانه وتعالى ليس تمثالاً، بل هو الخالق العظيم الذي لا يشبهه شيء. وعاقبة المخادع دائماً هي الوحدة وسوء الخاتمة.",
    next: "تعلمنا ألا نتبع المخادعين. في القصة القادمة، سنتعلم كيف نختار القائد الحقيقي! هل نختاره لأنه غني؟ أم لأنه قوي وذكي؟ تعالوا نعرف قصة طالوت وجالوت!",
  },
  {
    chapter: "nations", slug: "talut-and-jalut",
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
    },
    title: "قصة طالوت وجالوت",
    surahName: "",
    hook: "إذا أردتم اختيار قائد للفريق، من تختارون؟ هل تختارون الشخص الذي يملك ألعاباً كثيرة، أم تختارون الشخص الذكي والقوي؟ قصة اليوم ستعلمنا كيف اختار الله ملكاً ليقود جيش المؤمنين.",
    events: "في زمان قديم، طلب بنو إسرائيل أن يكون لهم ملك ليقودهم في المعركة ضد جيش مشرك وكبير بقيادة رجل جبار اسمه 'جالوت'. فاختار الله لهم رجلاً طيباً اسمه 'طالوت'. تعجب الناس لأن طالوت لم يكن غنياً! لكن الله اختاره لا لماله، بل لأن الله أعطاه بسطة (زيادة) في العلم وقوة في الجسم لتؤسس القصة لمعايير القيادة الحقيقية. واختبر طالوت جنوده بنهر ليميز الخبيث من الطيب، ومنعهم من الشرب منه إلا قليلاً. وفي النهاية، بفضل الله ثم شجاعة طالوت وجنوده، انتصرت الفئة القليلة المؤمنة على الفئة الكثيرة المشركة بقيادة جالوت.",
    quranProse: "يقول الله تعالى يعلمنا سبب اختيار طالوت: {إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ}.",
    lesson: "القيادة والنجاح يحتاجان إلى العلم والمعرفة والقوة البدنية، وليس فقط إلى كثرة المال. كما نتعلم أن الفئة القليلة التي تطيع الله يمكنها أن تهزم الفئة الكبيرة بإذن الله.",
    next: "نجح طالوت وجنوده لأنهم أطاعوا الله. لكن ماذا يحدث لمن يعاند الرسل ويؤذيهم؟ في قصتنا الأخيرة، سنتعرف على قوم أشرار رموا نبيهم في البئر! إنهم أصحاب الرس.",
  },
  {
    chapter: "nations", slug: "ashab-ar-rass",
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
    },
    title: "قصة أصحاب الرس",
    surahName: "",
    hook: "هل تذكرون البئر المظلمة التي أُلقي فيها سيدنا يوسف؟ ماذا لو كان هناك قوم أشرار فعلوا نفس الشيء بنبيهم ورفضوا أن يسمعوا كلامه؟ هذه هي القصة المخيفة لأصحاب الرس!",
    events: "كلمة 'الرّس' في اللغة تعني البئر غير المطوية (التي ليس لها جدار مبني). أصحاب الرس كانوا قوماً أشراراً اقترن ذكرهم في القرآن الكريم بقوم عاد وثمود. كان هؤلاء القوم يعبدون الأصنام والأشجار من دون الله (كما تشير بعض الروايات التاريخية حول هويتهم). وعندما أرسل الله إليهم نبياً طيباً ليعلمهم طريق الخير، لم يكتفوا برفض كلامه، بل كذبوه، وتقول الروايات إنهم رسوا (أي دفنوا) نبيهم حياً في البئر. ولأنهم فعلوا هذا الفعل الشنيع لتكذيبهم لرسلهم، أهلكهم الله بعذاب الاستئصال، وخسف بهم الأرض.",
    quranProse: "يقول الله تعالى محذراً من مصيرهم: {وَعَادًا وَثَمُودَ وَأَصْحَابَ الرَّسِّ وَقُرُونًا بَيْنَ ذَلِكَ كَثِيرًا}.",
    lesson: "إيذاء الناس الطيبين والمعلمين الذين ينصحوننا هو ذنب كبير جداً. السياق القرآني يؤكد أن من يكذب الرسل ويصر على الأذى، فإن الله يعاقبه بشدة ويزيل أثره.",
    next: "وهكذا يا أصدقائي، أنهينا رحلتنا الرائعة مع شخصيات وأقوام القرآن الكريم. تعلمنا من الحكماء، وحذرنا من الأشرار. هل أنتم مستعدون لمزيد من القصص الشيقة في موقعنا؟ انتظرونا في الأقسام الأخرى!",
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
    },
    image: "/stories/prophets/adam.jpg",
    title: "قصة سيدنا آدم (أبو البشر)",
    surahName: "",
    hook: "هل سألتم أنفسكم يوماً كيف بدأ وجود الإنسان على الأرض؟ ومن هو أول إنسان خلقه الله؟ تعالوا نسافر بالزمن إلى البداية تماماً، لنتعرف على قصة أبينا سيدنا آدم، أول إنسان وأول نبي!",
    events: "في البداية، خلق الله سبحانه وتعالى سيدنا آدم بيده من تراب وطين. ولأن الله يحب آدم، علمه أسماء كل شيء، وأمر الملائكة أن تسجد له احتراماً. سجدت كل الملائكة فوراً، لكن كان هناك مخلوق شرير اسمه 'إبليس' تكبر ورفض أن يسجد لأنه مخلوق من نار وظن أنه أفضل من آدم. أسكن الله آدم وزوجته الجنة الجميلة ليأكلا منها ما يشاءان، إلا شجرة واحدة منعهما منها. لكن إبليس الشرير وسوس لهما حتى أكلا من الشجرة. حزن آدم جداً وبكى لأنه لم يسمع كلام الله، واعتذر لربه، فسامحه الله الرحيم، وأنزله إلى الأرض ليعمرها ويبنيها ويكون 'خليفة' فيها.",
    quranProse: "يقول الله تعالى في القرآن الكريم يعلمنا كيف اعتذر سيدنا آدم: {قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ}.",
    lesson: "تعلمنا قصة سيدنا آدم درساً مهماً جداً: كلنا قد نخطئ وننسى، ولكن الإنسان الطيب هو الذي يعترف بخطئه فوراً، ويعتذر لله، والله دائماً يسامح من يعتذر بصدق.",
    next: "نزل سيدنا آدم إلى الأرض وبدأ يعلم أبناءه الخير.. وبعد فترة من الزمن، جاء نبي آخر يحب الصدق كثيراً، ورفعه الله مكاناً عالياً. هل تعرفون من هو؟ إنه نبي الله إدريس!",
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
    },
    image: "/stories/prophets/idris.jpg",
    title: "قصة سيدنا إدريس",
    surahName: "",
    hook: "هل تحبون قول الصدق دائماً؟ نبينا اليوم كان مشهوراً جداً بصدقه، وكان يعلم الناس أشياء مفيدة جداً في حياتهم. فمن هو هذا النبي الطيب؟ تعالوا نتعرف على سيدنا إدريس.",
    events: "جاء سيدنا إدريس عليه السلام بعد سيدنا آدم وسيدنا شيث. كان رجلاً طيباً يحب الله كثيراً، وكان دائماً يقول الصدق للناس ولا يكذب أبداً، لذلك سماه الله 'صِدِّيقاً'. كان سيدنا إدريس يدعو الناس لعبادة الله وحده، ويعلمهم الأخلاق الجميلة. ولأن الله كان يحبه كثيراً لصدقه وعمله الصالح، كافأه مكافأة عظيمة جداً، ورفعه إلى مكانة عالية ومرتفعة في السماء.",
    quranProse: "يقول الله تعالى في القرآن يمدح سيدنا إدريس: {وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا * وَرَفَعْنَاهُ مَكَانًا عَلِيًّا}.",
    lesson: "الصدق صفة يحبها الله جداً. إذا كنا صادقين مع عائلتنا وأصدقائنا، سيرفعنا الله درجات عالية، ويجعل الناس يحبوننا ويثقون بنا دائماً.",
    next: "بعد سنوات طويلة، نسي الناس كلام الأنبياء وبدؤوا يعبدون الأصنام الحجرية التي لا تنفع ولا تضر! فأرسل الله إليهم نبياً عاش معهم ألف سنة إلا خمسين عاماً وبنى سفينة ضخمة! من هو؟ إنها قصة سيدنا نوح في المرة القادمة!",
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
    },
    image: "/stories/prophets/nuh.jpg",
    title: "قصة سيدنا نوح (شيخ المرسلين)",
    surahName: "",
    hook: "تخيلوا معي.. رجل عجوز وطيب جداً، يجمع الأخشاب ويبني سفينة عملاااااقة في وسط الصحراء الرملية! لا يوجد بحر ولا نهر! وكلما مر عليه الناس ضحكوا منه.. فهل كان مخطئاً؟ تعالوا نتعرف على قصة شيخ المرسلين، سيدنا نوح.",
    events: "سيدنا نوح هو أول رسول يُبعث إلى أهل الأرض بعد أن بدأ الناس يعبدون الأصنام. ظل سيدنا نوح ينصح قومه لفترة طويييييلة جداً، ألف سنة إلا خمسين عاماً، يدعوهم في الليل والنهار، والسر والعلن! لكنهم كانوا يضعون أصابعهم في آذانهم ويغطون وجوههم بملابسهم حتى لا يسمعوه. أمر الله نوحاً أن يبني سفينة ضخمة. ولما انتهى منها، أمره الله أن يأخذ معه المؤمنين، وزوجين من كل نوع من الحيوانات. وفجأة، نزل مطر غزير جداً وانفجرت الأرض بالماء (الطوفان العظيم)! غرق كل الأشرار الذين سخروا منه، وحتى ابن نوح غرق لأنه لم يسمع كلام أبيه، ونجا المؤمنون والحيوانات في السفينة بأمان.",
    quranProse: "يقول الله تعالى يصف لنا المدة الطويلة التي قضاها سيدنا نوح مع قومه: {فَلَبِثَ فِيهِمْ أَلْفَ سَنَةٍ إِلَّا خَمْسِينَ عَامًا فَأَخَذَهُمُ الطُّوفَانُ وَهُمْ ظَالِمُونَ}.",
    lesson: "نتعلم من سيدنا نوح 'الصبر' العظيم، فقد صبر مئات السنين ولم ييأس! ونتعلم أيضاً ألا نسخر من أحد، وأن نسمع كلام الله وكلام والدينا دائماً حتى نكون في أمان.",
    next: "بعد نجاة المؤمنين من الطوفان العظيم، استقرت البشرية وكثر الناس في شبه الجزيرة العربية، وظهرت قبيلة قوية جداً يبنون خياماً وأعمدة ضخمة! فأرسل الله لهم نبياً كريماً، إنه سيدنا هود!",
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
    },
    image: "/stories/prophets/hud.jpg",
    title: "قصة سيدنا هود وقوم عاد",
    surahName: "",
    hook: "هل رأيتم أبطالاً خارقين في القصص يمتلكون قوة بدنية هائلة؟ في الماضي، كانت هناك قبيلة حقيقية قوية جداً، طوال القامة ويبنون بيوتاً ضخمة، لكنهم اغتروا بقوتهم وقالوا 'من أشد منا قوة؟'. فماذا حدث لهم؟ تعالوا نسمع قصة سيدنا هود.",
    events: "أرسل الله سيدنا هوداً إلى قبيلة اسمها (عاد)، كانوا يسكنون في منطقة جبال رملية تسمى الأحقاف. أعطاهم الله نعماً كثيرة وقوة بدنية هائلة، فصنعوا حضارة كبيرة. لكنهم بدلاً من أن يشكروا الله، صنعوا أصناماً وعبدوها. كان سيدنا هود ينصحهم بلطف ويقول لهم: اذكروا نعم الله عليكم واعبدوه. لكنهم سخروا منه واتهموه بالجنون والسفاهة. ولأنهم أصروا على العناد وتحدوا الله، أرسل الله عليهم رياحاً قوية جداً ومخيفة (ريحاً صرصراً عاتية) استمرت سبع ليال وثمانية أيام! دمرت الرياح بيوتهم وأهلكت الأشرار، ونجا سيدنا هود والمؤمنون الطيبون.",
    quranProse: "يقول الله تعالى: {وَأَمَّا عَادٌ فَأُهْلِكُوا بِرِيحٍ صَرْصَرٍ عَاتِيَةٍ * سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا}.",
    lesson: "مهما كنا أقوياء أو أذكياء، يجب ألا نتكبر على الآخرين أو ننسى أن الله هو من أعطانا هذه القوة. الشكر المتواصل لله يحفظ لنا النعم.",
    next: "بعد قوم عاد، جاءت قبيلة أخرى عاشوا في بيوت نحتوها داخل صخور الجبال! وطلبوا معجزة غريبة جداً، فخرجت لهم ناقة ضخمة من صخرة! من هم؟ هذا ما سنعرفه في قصة سيدنا صالح القادمة!",
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
    },
    image: "/stories/prophets/saleh.jpg",
    title: "قصة سيدنا صالح وقوم ثمود",
    surahName: "",
    hook: "هل تستطيعون الحفر في صخرة صلبة؟ هناك قوم في الماضي كانوا ينحتون بيوتاً كاملة وجميلة داخل الجبال الصخرية! لكنهم طلبوا من نبيهم أن يخرج لهم حيواناً كبيراً حياً من وسط الصخرة! كيف حدثت هذه المعجزة؟",
    events: "أرسل الله سيدنا صالحاً إلى قبيلة (ثمود)، وكانوا يعيشون في منطقة تسمى الحِجر. كانوا فنانين في نحت الصخور، لكنهم للأسف كانوا يعبدون الأصنام. طلبوا من سيدنا صالح معجزة لكي يصدقوه، فدعا الله، وانشقت صخرة كبيرة أمامهم وخرجت منها 'ناقة' جميلة وضخمة! فرح بعض الناس وآمنوا، وأمرهم سيدنا صالح ألا يؤذوا الناقة أبداً وأن يقتسموا معها ماء البئر. لكن الأشرار خططوا سراً وقاموا بقتل الناقة الطيبة! غضب الله لظلمهم وإيذائهم لمعجزته، فأرسل عليهم صوتاً عالياً ومخيفاً جداً (الصيحة) وزلزالاً (الرجفة)، فأهلك الأشرار جميعاً، ونجا سيدنا صالح ومن آمن معه.",
    quranProse: "يقول الله تعالى: {فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ}، أي سقطوا في بيوتهم بلا حراك.",
    lesson: "يجب أن نكون أوفياء بوعودنا، وأن نرحم الحيوانات ولا نؤذيها. فظلم الآخرين أو التعدي على حقوقهم يغضب الله كثيراً ويؤدي إلى النهاية السيئة.",
    next: "بعد هؤلاء الأنبياء العظماء، سيأتي نبي كريم جداً، لُقب بـ 'أبو الأنبياء'، وهو الذي بنى الكعبة المشرفة وحطم أصنام قومه وهو شاب صغير! هل عرفتموه؟ إنه خليل الرحمن، سيدنا إبراهيم!",
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
    },
    image: "/stories/prophets/shuaib.jpg",
    title: "قصة سيدنا شعيب (خطيب الأنبياء)",
    surahName: "",
    hook: "تخيلوا أن تذهبوا إلى السوق لتشتروا عشر تفاحات، فيقوم البائع بخداعكم ويعطيكم ثماني تفاحات فقط ويأخذ ثمن العشرة! هذا غش وتصرف سيء جداً، أليس كذلك؟ نبينا اليوم جاء ليعلم الناس كيف يكونون صادقين في البيع والشراء.",
    events: "أرسل الله سيدنا شعيباً إلى أهل مَدْيَن وإلى أصحاب الأيكة (والأيكة هي شجر كثير وكثيف كانوا يعبدونه من دون الله). كان سيدنا شعيب فصيحاً جداً ومرتباً في كلامه، ولذلك لُقب بـ 'خطيب الأنبياء'. كانت مشكلة قومه الأساسية هي الفساد الاقتصادي؛ فكانوا يغشون في الميزان، ويسرقون أموال الناس (يبخسون الناس أشياءهم)، ويقطعون الطرق لإخافة المسافرين. نصحهم سيدنا شعيب كثيراً وتحدث معهم بلطف، لكنهم كذبوه وأصروا على الغش وعبادة الشجر. فعاقبهم الله بعذاب اسمه (يوم الظُّلَّة)؛ حيث سلط عليهم حراً شديداً جداً، فخرجوا يبحثون عن ظل تحت سحابة كبيرة، فظنوا أنها ستحميهم، لكنها أمطرت عليهم ناراً فهلكوا جميعاً.",
    quranProse: "يقول الله تعالى عن عذابهم: {فَكَذَّبُوهُ فَأَخَذَهُمْ عَذَابُ يَوْمِ الظُّلَّةِ ۚ إِنَّهُ كَانَ عَذَابَ يَوْمٍ عَظِيمٍ}.",
    lesson: "الغش في البيع والشراء وأخذ أشياء لا نملكها هو أمر يغضب الله كثيراً. المسلم الحقيقي صادق وأمين، ولا يأخذ حق غيره أبداً.",
    next: "بعد أن تعلمنا الأمانة، سنسافر في القصة القادمة لنتعرف على نبي شجاع جداً، كسر الأصنام وهو شاب صغير، ولم تحرقه النار! من هو هذا النبي العظيم الذي نذكره في كل صلاة؟ إنه أبو الأنبياء، سيدنا إبراهيم!",
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
    },
    image: "/stories/prophets/ibrahim.jpg",
    title: "قصة سيدنا إبراهيم (خليل الرحمن)",
    surahName: "",
    hook: "هل أنتم شجعان؟ هل تخافون من النار؟ بطل قصتنا اليوم هو شاب شجاع جداً، واجه ملكاً جباراً، ورُمي في نار ضخمة جداً، ولكن حدثت مفاجأة مذهلة جعلته يخرج منها سليماً يبتسم!",
    events: "سيدنا إبراهيم هو 'أبو الأنبياء'، كان ذكياً جداً واستخدم عقله ليعلم قومه أن الأصنام والكواكب لا تضر ولا تنفع. وفي يوم من الأيام، عندما ذهب قومه للاحتفال، دخل إبراهيم وكسر كل أصنامهم بشجاعة! غضب الملك 'النمرود' وقومه غضباً شديداً، وأشعلوا ناراً ضخمة جداً وألقوا سيدنا إبراهيم فيها. ولكن لأن إبراهيم كان يتوكل على الله، أمر الله النار ألا تحرقه، بل أن تكون برداً وسلاماً عليه، فخرج منها دون أن يُصاب بخدش! وبعد ذلك، هاجر سيدنا إبراهيم وبنى 'الكعبة المشرفة' مع ابنه سيدنا إسماعيل.",
    quranProse: "يقول الله تعالى عن معجزة النار: {قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ}.",
    lesson: "استخدام العقل والتفكير يقودنا دائماً لمعرفة الله. ونتعلم أيضاً أن من يثق بالله ويتوكل عليه، فإن الله سيحميه وينقذه من أي خطر.",
    next: "سيدنا إبراهيم كان له ابن أخ عاش في نفس الزمن وأصبح نبياً أيضاً، وذهب لقرية كان أهلها يفعلون أشياء سيئة جداً لم يفعلها أحد من قبل! من هو هذا النبي؟ إنه سيدنا لوط!",
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
    },
    image: "/stories/prophets/lut.jpg",
    title: "قصة سيدنا لوط",
    surahName: "",
    hook: "إذا رأيتم مجموعة من الناس يفعلون أفعالاً سيئة جداً، هل تقلدونهم أم تبتعدون عنهم وتنصحونهم؟ نبينا اليوم كان يعيش في قرية كل أهلها يفعلون الشر، فكيف تصرف معهم؟",
    events: "عاصر سيدنا لوط عمه سيدنا إبراهيم عليهما السلام، وأرسله الله إلى قرى تُسمى 'سَدُوم'. كان أهل هذه القرى سيئين جداً، وتغمرهم أخلاق سيئة وأفعال لم يسبقهم إليها أحد من العالمين. كان سيدنا لوط ينصحهم دائماً ويحاول إصلاحهم، لكنهم كانوا يسخرون منه ويريدون طرده من القرية. ولأنهم أصروا على الانحطاط الأخلاقي ولم يسمعوا كلام نبيهم، أمر الله سيدنا لوطاً أن يخرج من القرية ليلاً مع أهله الطيبين، ثم عاقب الله الأشرار بأن قَلَب قراهم وجعل عاليها سافلها، وأمطر عليهم حجارة من طين صلب (سجيل).",
    quranProse: "يقول الله تعالى عن عقابهم: {فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِّن سِجِّيلٍ مَّنضُودٍ}.",
    lesson: "يجب أن نبتعد دائماً عن الأفعال السيئة والأخلاق القبيحة، وألا نقلد الأشرار أبداً. الله يحب الأشخاص الذين يحافظون على أخلاقهم الجميلة ونظافتهم.",
    next: "نجا سيدنا لوط بفضل الله. والآن، استعدوا لقصة مليئة بالمغامرات العجيبة! قصة فيها بئر، وسجن، وقصر، وحلم جميل يتحقق بعد سنوات طويلة! إنها القصة التي سُميت في القرآن بـ 'أحسن القصص'.. قصة سيدنا يوسف!",
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
    },
    image: "/stories/prophets/yusuf.jpg",
    title: "قصة سيدنا يوسف (أحسن القصص)",
    surahName: "",
    hook: "هل تحبون قصص المغامرات؟ قصتنا اليوم هي الوحيدة في القرآن الكريم التي ذُكرت كاملة في سورة واحدة، وفيها أحداث مشوقة جداً تبدأ بحلم جميل وتنتهي بأن يصبح البطل وزيراً كبيراً!",
    events: "سيدنا يوسف هو ابن النبي يعقوب (الذي يُعرف أيضاً باسم إسرائيل). كان طفلاً جميلاً وطيباً، رأى في منامه أن الكواكب والشمس والقمر تسجد له. غار إخوته منه كثيراً، فأخذوه وألقوه في بئر عميقة (الجُب)! وجده بعض المسافرين وباعوه في مصر، فعاش في قصر رجل مهم، ثم دَخل السجن ظلماً. لكن يوسف لم ييأس، وكان يفسر الأحلام للناس في السجن. وفي يوم، حلم مَلِك مصر بحلم غريب، ولم يعرف تفسيره إلا سيدنا يوسف، فأنقذ مصر من الجوع. كافأه الملك وجعله مسؤولاً عن خزائن مصر! وفي النهاية، جاء إخوته إليه وهم لا يعرفونه، فسامحهم على ما فعلوه به، وعادوا جميعاً ليعيشوا مع أبيهم يعقوب في سعادة.",
    quranProse: "سمى الله هذه القصة بأجمل اسم وقال: {نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ}.",
    lesson: "نتعلم من سيدنا يوسف قيمة الصبر على المشاكل، وحسن الظن بالله. ونتعلم أهم درس: أن نسامح من أساء إلينا عندما نصبح أقوى منهم.",
    next: "صبر سيدنا يوسف كثيراً في السجن. ولكن في القصة القادمة، سنتعرف على نبي يُضرب به المثل الأعلى في الصبر! مرض مرضاً شديداً جداً وفقد كل ألعابه وأمواله، لكنه لم يغضب من الله أبداً! من هو؟ إنه سيدنا أيوب.",
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
    },
    image: "/stories/prophets/ayoub.jpg",
    title: "قصة سيدنا أيوب",
    surahName: "",
    hook: "عندما نمرض ونتناول الدواء المر، قد نبكي ونغضب. لكن ماذا لو أخبرتكم عن نبي مرض لسنوات طويلة جداً، وفقد أمواله، ومع ذلك كان دائماً يبتسم ويشكر الله؟ تعالوا نتعرف على بطل الصبر، سيدنا أيوب.",
    events: "كان سيدنا أيوب رجلاً غنياً جداً، لديه أموال كثيرة، ومزارع، وأبناء كثيرون، وصحة قوية. أراد الله أن يختبر قوة إيمانه، فابتلاه بأن أخذ منه ماله وولده، وأصابه بمرض شديد في جسده. استمر المرض سنوات طويلة، ورغم ذلك، لم يشتكِ أيوب أبداً، بل صبر واحتسب وظل يذكر الله. وفي يوم من الأيام، دعا ربه بكلمات رقيقة وقال: 'يا رب إني مسني الضر وأنت أرحم الراحمين'. فاستجاب الله دعاءه فوراً، وأمره أن يضرب الأرض بقدمه، فخرج نبع ماء بارد، اغتسل منه فشُفي تماماً، وكشف الله ضره وعوضه عن كل ما فقده بأموال وأبناء أكثر من قبل!",
    quranProse: "يقول الله تعالى يعلمنا دعاء سيدنا أيوب الجميل: {وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ}.",
    lesson: "يُضرب المثل الأعلى بسيدنا أيوب في الصبر. نتعلم منه أننا عندما نمرض أو نفقد شيئاً نحبه، يجب أن نصبر ولا نغضب، وندعو الله دائماً، فالله يعوض الصابرين بأشياء أجمل بكثير.",
    next: "تعلمنا الصبر من سيدنا أيوب. والآن، استعدوا لقصة نبي ولد في زمن كان الملك فيه يقتل الأطفال! فوضعته أمه في صندوق ورمته في النهر، ليصل إلى قصر ذلك الملك الشرير ويربى فيه! من هو؟ إنه سيدنا موسى كليم الله!",
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
    },
    image: "/stories/prophets/musa-and-harun.jpg",
    title: "قصة سيدنا موسى وأخيه هارون",
    surahName: "",
    hook: "تخيلوا طفلاً رضيعاً تضعه أمه في صندوق خشبي، ثم تلقيه في مياه النهر الواسع! هل سيغرق؟ لا، بل سيأخذه النهر مباشرة إلى قصر الملك الشرير الذي يبحث عنه ليقتله.. ولكنه سيعيش هناك كأمير! كيف حدث ذلك؟",
    events: "وُلد سيدنا موسى في زمن كان فيه فرعون الظالم يقتل الأطفال الصغار. خافت أم موسى عليه، فأوحى لها الله أن تضعه في صندوق وتلقيه في النهر (اليم). وصل الصندوق إلى قصر فرعون، وهناك أحبته زوجة فرعون الطيبة وربته كابن لها! ولما كبر موسى، كلّفه الله بالرسالة في الوادي المقدس (طوى)، وأعطاه معجزات مذهلة، مثل العصا التي تتحول إلى ثعبان حقيقي. ذهب موسى ومعه أخوه هارون (الذي كان فصيحاً ومساعداً له) ليطلبا من فرعون أن يعبد الله ويترك الناس أحراراً. وعندما طاردهم فرعون بجيشه، ضرب موسى البحر بعصاه، فانشق البحر نصفين وصار طريقاً يابساً ليعبر منه المؤمنون وينجوا، بينما غرق فرعون وجيشه.",
    quranProse: "يقول الله تعالى آمراً سيدنا موسى أن يأخذ أخاه معه: {اذْهَبْ أَنتَ وَأَخُوكَ بِآيَاتِي وَلَا تَنِيَا فِي ذِكْرِي}.",
    lesson: "الله يحفظ الصغار والضعفاء دائماً. ونتعلم أيضاً أهمية التعاون بين الإخوة؛ فكما ساعد هارون أخاه موسى، يجب علينا أن نساعد إخوتنا ونحبهم وندافع عنهم.",
    next: "نجا بنو إسرائيل وعبروا البحر.. ولكنهم بعد موسى احتاجوا لقائد شجاع ليدخل بهم مدينة مقدسة. هل تعرفون من هو الشاب الذي قادهم وكان الفتى المرافق لسيدنا موسى في رحلاته؟ إنه سيدنا يوشع بن نون!",
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
    },
    image: "/stories/prophets/yusha.jpg",
    title: "قصة سيدنا يوشع بن نون",
    surahName: "",
    hook: "هل حدث وأن كنتم تلعبون مباراة مهمة، واقتربت الشمس من الغروب والوقت كاد ينتهي قبل أن تفوزوا؟ تمنيتم لو تتوقف الشمس قليلاً.. نبينا اليوم حدثت له هذه المعجزة وتوقفت الشمس من أجله!",
    events: "سيدنا يوشع بن نون كان فتى شاباً شجاعاً، ومرافقاً دائماً لسيدنا موسى يتعلم منه الخير. وبعد وفاة موسى، اختاره الله ليكون هو النبي والقائد لبني إسرائيل. قادهم يوشع بن نون بشجاعة لفتح 'بيت المقدس' ليعيدوه مدينة تعبد الله. وفي يوم المعركة، اقترب وقت غروب الشمس، وكان يوشع خائفاً أن يدخل الليل قبل أن يحققوا الانتصار. فدعا الله أن يوقف الشمس قليلاً ولا تغرب حتى يكملوا المعركة.. فاستجاب الله له، وتوقفت الشمس في السماء كمعجزة عظيمة، وانتصر المؤمنون!",
    quranProse: "لم يُذكر اسمه صراحة في القرآن، لكن الله ذكره بلقب (الفتى) في سورة الكهف حين كان برفقة موسى: {وَإِذْ قَالَ مُوسَىٰ لِفَتَاهُ لَا أَبْرَحُ حَتَّىٰ أَبْلُغَ مَجْمَعَ الْبَحْرَيْنِ أَوْ أَمْضِيَ حُقُبًا}.",
    lesson: "نتعلم من يوشع بن نون أن الشاب الصغير يمكن أن يصبح قائداً عظيماً إذا تعلم من معلميه الصالحين وكان شجاعاً. وأن الله ينصر من يدافع عن الحق.",
    next: "بعد فترة، ظهر في جيش المؤمنين شاب صغير آخر، واجه أقوى وأضخم جندي في جيش الأعداء، وهزمه بحجر صغير فقط! وأصبح بعدها مَلِكاً ونبياً.. من هو؟ إنه سيدنا داود.",
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
    },
    image: "/stories/prophets/dawud.jpg",
    title: "قصة سيدنا داود",
    surahName: "",
    hook: "تخيلوا جبلاً ضخماً وطيوراً جميلة تغني وتسبح الله معكم كلما قرأتم القرآن! وتخيلوا أن تمسكوا بقطعة حديد صلبة، فتصبح في أيديكم لينة كالصلصال! هذه كانت حياة نبي وملك عظيم.. سيدنا داود.",
    events: "كان داود شاباً صغيراً في جيش المؤمنين بقيادة طالوت، واستطاع بشجاعته أن يهزم قائداً جباراً اسمه جالوت. بعد ذلك، أعطاه الله الملك والنبوة والحكمة. كان سيدنا داود يملك صوتاً جميلاً جداً؛ وعندما كان يسبح الله ويقرأ كتابه (الزبور)، كانت الجبال والطيور تردد معه بصوت جميل! وأعطاه الله معجزة أخرى مدهشة، فقد ألان له الحديد في يده كأنه عجينة، ليصنع منه دروعاً قوية تحمي الجنود في المعارك.",
    quranProse: "يقول الله تعالى يصف معجزاته: {يَا جِبَالُ أَوِّبِي مَعَهُ وَالطَّيْرَ ۖ وَأَلَنَّا لَهُ الْحَدِيدَ}. (أوِّبي معه يعني سبِّحي معه).",
    lesson: "القوة الحقيقية ليست بحجم الجسم، بل بالشجاعة والإيمان بالله. ومهما أعطانا الله من قوة أو أموال أو مهارات، يجب أن نستخدمها في عمل الخير كما كان يفعل سيدنا داود الذي كان يشكر الله دائماً.",
    next: "سيدنا داود كان ملكاً عظيماً، لكنه ورّث الملك لابن سيطلب من الله مُلكاً لن يحصل عليه أحد من بعده أبداً! ملك يتحكم في الريح، والجن، ويفهم لغة الطيور! إنه سيدنا سليمان.",
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
    },
    image: "/stories/prophets/sulaiman.jpg",
    title: "قصة سيدنا سليمان",
    surahName: "",
    hook: "إذا كان بإمكانكم أن تطلبوا أمنية واحدة فقط، فماذا ستكون؟ سيدنا سليمان طلب من الله مملكة عجيبة لا يستطيع أحد أن يصنع مثلها أبداً! ماذا كان يوجد في هذه المملكة؟",
    events: "ورث سيدنا سليمان الملك عن أبيه داود، وسأل الله أن يعطيه مُلكاً لا ينبغي لأحد من بعده. فاستجاب الله له، وسخّر له أشياء لا يمكن تخيلها! جعل الرياح تحمله وتنقله بسرعة إلى أماكن بعيدة، وجعل الجن يعملون عنده ويبنون له القصور الجميلة، بل وعلمه لغة الطيور والحيوانات! ورغم كل هذه القوة العجيبة، كان سيدنا سليمان متواضعاً جداً، وكان دائماً يسجد لله ويشكره على هذه النعم الكبيرة ولا يتكبر أبداً.",
    quranProse: "يقول الله تعالى يخبرنا عن دعاء سيدنا سليمان: {قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ}.",
    lesson: "مهما أصبحنا أغنياء أو ناجحين، ومهما كانت الألعاب والأشياء التي نملكها كثيرة، يجب ألا نتكبر على أحد، وأن نقول دائماً: 'الحمد لله الذي أعطانا هذا'.",
    next: "سيدنا سليمان كان ملكاً غنياً وقوياً. لكن ماذا عن رجل عجوز جداً، كان فقيراً وليس لديه أبناء، ويدعو الله دائماً في صلاته أن يرزقه بطفل؟ هل سيستجيب الله له بعد أن أصبح شعره أبيض؟ تعالوا نعرف قصة سيدنا زكريا وابنه يحيى.",
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
    },
    image: "/stories/prophets/zakariya-and-yahya.jpg",
    title: "قصة سيدنا زكريا وابنه يحيى",
    surahName: "",
    hook: "هل رأيتم رجلاً عجوزاً جداً شعره أبيض بالكامل يرزق بطفل صغير؟ هذه معجزة! نبينا اليوم كان يحب الأطفال كثيراً وتمنى أن يكون له طفل يعلمه الخير، فهل حقق الله أمنيته؟",
    events: "كان سيدنا زكريا رجلاً طيباً وكبيراً في السن، وكان هو من يتكفل برعاية السيدة مريم العذراء في المسجد. وعندما كان يرى فاكهة الصيف تأتي لمريم في الشتاء بأمر الله، علم أن الله قادر على كل شيء! فدعا ربه سراً وقال: يا رب لقد كبرت وعظمي ضعف، وزوجتي كبيرة، فارزقني بطفل صالح. فاستجاب الله له وبشره بطفل اسمه (يحيى). كان يحيى طفلاً ذكياً ومميزاً، فقد أعطاه الله الحكمة والعلم وهو لا يزال صبياً صغيراً، وكان باراً بوالديه ومحباً لقراءة الكتاب المقدس بجد واجتهاد.",
    quranProse: "يقول الله تعالى آمراً سيدنا يحيى وهو طفل: {يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا}.",
    lesson: "الدعاء مثل السحر الحلال، إذا دعونا الله بصدق، سيحقق لنا ما نتمناه مهما بدا صعباً. ونتعلم من سيدنا يحيى أن نقرأ الكتب المفيدة ونتعلم ونحن صغار لنكون أذكياء وصالحين.",
    next: "سيدنا يحيى كان طفلاً ذكياً.. ولكن ماذا لو أخبرتكم عن طفل آخر، وُلد من غير أب، وتكلم وهو لا يزال رضيعاً في المهد (السرير الصغير) ليحمي أمه! هذه من أعظم المعجزات! سنتعرف عليها في قصة سيدنا عيسى!",
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
    },
    image: "/stories/prophets/isa.jpg",
    title: "قصة سيدنا عيسى ابن مريم",
    surahName: "",
    hook: "هل سمعتم يوماً طفلاً رضيعاً لم يتعلم المشي بعد، يتحدث بطلاقة ويدافع عن أمه؟ هذه معجزة لا يصدقها العقل، لكنها حدثت مع نبي عظيم خلقه الله بطريقة فريدة وعجيبة جداً! تعالوا نتعرف على سيدنا عيسى.",
    events: "سيدنا عيسى عليه السلام هو نبي كريم، وهو الكلمة التي ألقاها الله إلى السيدة مريم العذراء وروح منه. معجزته الأولى أنه خُلق بلا أب، وعندما تعجب الناس من ذلك، تكلم في المهد (سرير الرضيع) صبياً ليبرئ أمه الطيبة ويخبرهم أنه نبي الله. ولما كبر، أيّده الله بمعجزات باهرة جداً ومدهشة؛ فكان يمسح على عيني الأعمى فيبصر، ويعالج المريض بمرض جلدي (الأبرص) فيُشفى، بل وكان يحيي الموتى بإذن الله! حاول بعض الأشرار أن يؤذوه ويصلبوه، لكن الله حماه، وانتهت رسالته في الأرض بأن رفعه الله إلى السماء ونجّاه من مكرهم.",
    quranProse: "يقول الله تعالى يصف كلمات سيدنا عيسى وهو رضيع: {قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا}.",
    lesson: "قدرة الله لا يحدها شيء؛ فهو يخلق ما يشاء ويشفي من يشاء. ونتعلم من سيدنا عيسى أهمية بر الوالدين، فقد كان باراً جداً بأمه ودافع عنها.",
    next: "سيدنا عيسى بَشَّر قومه بأن هناك نبياً عظيماً سيأتي من بعده ليكون آخر الأنبياء للعالمين. فمن هو هذا النبي الخاتم؟ إنه حبيبنا ونبينا محمد صلى الله عليه وسلم!",
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
    },
    image: "/stories/prophets/muhammad.jpg",
    title: "قصة سيدنا محمد (خاتم الأنبياء)",
    surahName: "",
    hook: "بعد أن سافرنا عبر الزمن وتعرفنا على قصص كل الأنبياء، وصلنا الآن إلى مسك الختام. نبيٌ أُرسل رحمة للعالمين جميعاً، ولم يكتفِ القرآن بسرد قصص من قبله، بل كان يسجل بطولاته وبطولات أصحابه لحظة بلحظة ليصنع أعظم أمة!",
    events: "سيدنا محمد صلى الله عليه وسلم هو خاتم الأنبياء والمرسلين. القرآن الكريم لم يكن فقط يحكي قصص الماضي، بل كان سجلاً حياً يوثق الأحداث التي عاصرها النبي، ليوجه المسلمين ويعلمهم. فقد وثّق القرآن أحداث غزوة بدر الكبرى التي انتصر فيها المسلمون، وغزوة أحد التي قدمت دروساً عظيمة في الثبات والطاعة، وغزوة الأحزاب (الخندق) حينما حاصر الأعداء المدينة. كما حذر القرآن الكريم من الأشرار الذين حاولوا إيذاء النبي مثل أبي لهب، ليكون ذلك سلاحاً في كشف الحقائق للجيل الأول من المسلمين.",
    quranProse: "يقول الله تعالى واصفاً رسالة نبينا الكريم: {وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ}. أي أن رسالته جاءت لتنشر الخير والسلام والرحمة لكل الناس.",
    lesson: "نتعلم من نبينا الكريم الثبات في وقت الشدائد، وأن طاعة الله ورسوله هي سبب النجاح في الدنيا والآخرة، وأن نكون دائماً مصدر رحمة وحب لمن حولنا.",
    next: "قصة نبينا محمد صلى الله عليه وسلم مليئة بالمغامرات، والدروس، والمواقف العظيمة التي لا تكفيها قصة واحدة! لذلك، جهزنا لكم يا أصدقائي قسماً جديداً كاااملاً وممتعاً جداً.. سنسافر فيه مع نبينا منذ نشأته وطفولته، ونحضر لحظة النبوة والدعوة، ونهاجر معه في رحلة الهجرة النبوية المثيرة، ونقف بجانبه في الغزوات، حتى وفاته صلى الله عليه وسلم. هل أنتم مستعدون للانطلاق إلى 'قسم السيرة النبوية'؟ هيا بنا!",
  },
  {
    chapter: "animals", slug: "ant-of-solomon",
    en: {
      title: "The Caring Ant",
      hook:
        "If you saw a huge army marching towards you, what would you do? Meet a tiny ant who saved her whole colony with one loud warning!",
      events:
        "Prophet Sulaiman (Solomon) was a great king. Allah gave him a special power: he could understand the language of animals and insects! One day, his massive army of humans, jinn, and birds was marching through a valley. A tiny, smart ant saw them coming. Instead of just saving herself, she shouted to all the other ants: 'Go into your homes so Sulaiman and his army don't crush you without knowing!' Prophet Sulaiman heard her tiny voice, smiled, and thanked Allah for this blessing, making sure his army didn't step on them.",
      lesson:
        "We learn to care for our friends and family, just like the ant. We also learn that strong leaders are merciful and careful not to hurt the weak.",
      next:
        "The ant was tiny but very caring. Our next animal is a beautiful bird with a crown of feathers on his head, who worked as a special messenger for the very same king. It's the Hoopoe!",
      quranProse:
        "Allah says: {An ant said, 'O ants, enter your dwellings that you not be crushed by Solomon and his soldiers while they perceive not.'}",
    },
    title: "قصة نملة سليمان",
    surahName: "",
    image: "/stories/animals/ant-of-solomon.jpg",
    hook: "هل جربتم يوماً أن تستمعوا إلى صوت نملة وهي تتحدث؟ نعم، نملة صغيرة جداً! تخيلوا جيشاً كبيراً جداً يقترب، ونملة شجاعة تقف لتنقذ أصدقاءها.. من سمعها؟ وكيف أنقذت النمل؟ تعالوا نعرف قصة نملة سيدنا سليمان الذكية!",
    events: "كان سيدنا سليمان ملكاً عظيماً ونبياً أعطاه الله قوة عجيبة.. لقد كان يفهم لغة الحيوانات والطيور! في يوم من الأيام، كان سيدنا سليمان يسير مع جيشه الكبير جداً من الناس والجن والطيور. وبينما هم يسيرون، اقتربوا من مكان يعيش فيه الكثير من النمل ويسمى (وادي النمل). أحست نملة صغيرة باقتراب الجيش الكبير، فخافت على أصدقائها النمل أن يدوسهم الجيش دون أن يشعروا. فوقفت النملة الشجاعة وصرخت بصوت عالٍ في عالم النمل: 'يا أيها النمل ادخلوا بيوتكم بسرعة حتى لا يدوسكم سليمان وجنوده وهم لا يشعرون!'. سمع سيدنا سليمان كلامها فتبسم وضحك من قولها، وأوقف جيشه حتى يدخل النمل إلى بيوته بأمان، وشكر الله على نعمة فهم لغة الحيوانات وأن جعله رحيماً بها.",
    quranProse: "يقول الله تعالى في القرآن الكريم عن هذه النملة الذكية: {حَتَّى إِذَا أَتَوْا عَلَى وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ}. وهذا يعني أن النملة حذرت أصدقاءها ليختبئوا في بيوتهم.",
    lesson: "تعلمنا اليوم من النملة الشجاعة أن نهتم بأصدقائنا ونحذرهم إذا كان هناك خطر. وتعلمنا من سيدنا سليمان أن نكون لطفاء مع الحيوانات الصغيرة ولا نؤذيها، وأن نشكر الله دائماً على النعم التي أعطانا إياها.",
    next: "رأينا كيف فهم سيدنا سليمان لغة النملة الصغيرة.. لكن، هل تعرفون طائراً جميلاً كان يعمل كـ 'مستكشف' لسيدنا سليمان، وذهب في رحلة بعيدة ليأتيه بأخبار مملكة تحكمها ملكة؟ من هو هذا الطائر؟ هذا ما سنعرفه في قصتنا القادمة.. قصة هدهد سليمان!",
  },
  {
    chapter: "animals", slug: "hoopoe-of-solomon",
    en: {
      title: "The Hoopoe (Hudhud) of Sulaiman",
      hook:
        "Can a bird be a scout and a messenger for a king? Meet the Hoopoe, a beautiful bird who traveled to a faraway land and discovered a big secret!",
      events:
        "The Hoopoe (Hudhud) was a special bird in the army of Prophet Sulaiman. One day, the Hoopoe flew very far and discovered the Kingdom of Sheba. He saw that the Queen and her people were worshipping the sun instead of Allah! The Hoopoe quickly flew back and told Prophet Sulaiman everything. The Prophet gave the smart bird a letter to deliver to the Queen, inviting her to worship Allah. Thanks to the Hoopoe's discovery, the Queen eventually became a believer!",
      lesson:
        "Even if you are small, you can do great things for the truth. We should always share important and truthful information to help others.",
      next:
        "The Hoopoe crossed the sky with a message. Our next animal lives in the deep, dark ocean — and a prophet spent days inside it! Get ready to dive with the Whale of Prophet Yunus!",
      quranProse:
        "The Hoopoe confidently told the Prophet: {I have encompassed [in knowledge] that which you have not encompassed, and I have come to you from Sheba with certain news.}",
    },
    title: "قصة هدهد سليمان",
    surahName: "",
    image: "/stories/animals/hoopoe-of-solomon.jpg",
    hook: "هل تحبون الاستكشاف ومعرفة الأماكن الجديدة؟ تخيلوا طائراً جميلاً له تاج من الريش على رأسه، يطير لمسافات بعيدة جداً ليجمع الأخبار العجيبة لملك عظيم.. أين ذهب هذا الطائر؟ وماذا رأى؟ تعالوا نكتشف ذلك في قصة هدهد سليمان!",
    events: "بعد أن تعرفنا على جيش سيدنا سليمان، يجب أن تعرفوا أن كل حيوان وطائر كان له وظيفة مهمة. الهدهد كان طائراً ذكياً وظيفته البحث عن الماء واكتشاف الأماكن. في يوم من الأيام، كان سيدنا سليمان يتفقد الطيور، فلم يجد الهدهد! غضب سليمان وسأل عنه. وبعد فترة، جاء الهدهد بسرعة وقال لسيدنا سليمان: 'لقد رأيت شيئاً عجيباً لم تره أنت! لقد ذهبت إلى بلد بعيدة اسمها سبأ، ووجدت هناك ملكة تحكمهم، وعندها أموال كثيرة وعرش عظيم تجلس عليه.. ولكن المشكلة أنهم يعبدون الشمس بدلاً من الله!'. تعجب سيدنا سليمان من كلام الهدهد، وأرسل معه رسالة إلى هذه الملكة يدعوها لتعبد الله. وبفضل ذكاء الهدهد، أسلمت الملكة وقومها.",
    quranProse: "يقول الله تعالى عن الهدهد عندما جاء بالخبر العجيب: {فَمَكَثَ غَيْرَ بَعِيدٍ فَقَالَ أَحَطتُ بِمَا لَمْ تُحِطْ بِهِ وَجِئْتُكَ مِن سَبَإٍ بِنَبَإٍ يَقِينٍ}. يعني أن الهدهد قال لسليمان أنه عرف خبراً مؤكداً من مدينة سبأ.",
    lesson: "نتعلم من الهدهد الذكي أن نكون دائمي البحث عن المعرفة والأشياء المفيدة، وأن نقول الصدق دائماً. ونتعلم أيضاً أهمية نقل الأخبار بصدق وأمانة لنساعد الآخرين على معرفة الحق.",
    next: "الهدهد طائر صغير طار لمسافات بعيدة.. ولكن في قصتنا القادمة، سنتعرف على حيوان ضخم جداً وكبير، يعيش في البحر الأسود العميق، وقام بابتلاع نبي كامل دون أن يؤذيه! هل حزرتم من هو؟ نعم، إنه حوت يونس! انتظرونا.",
  },
  {
    chapter: "animals", slug: "whale-of-yunus",
    en: {
      title: "The Whale of Prophet Yunus",
      hook:
        "Have you ever been in the dark and felt scared? Imagine being in the dark belly of a giant whale at the bottom of the ocean! Who was inside, and how did he get out?",
      events:
        "Prophet Yunus (Jonah) left his town because his people wouldn't listen to him. He got on a ship, but a huge storm hit them. Yunus ended up in the deep ocean, and Allah commanded a giant whale to swallow him without hurting him! Inside the dark belly of the whale, Yunus realized he shouldn't have left his people. He prayed sincerely to Allah, saying he was sorry. Allah heard his prayer from the bottom of the ocean and commanded the whale to safely leave him on the shore.",
      lesson:
        "No matter where you are — even in the darkest place — Allah can always hear your prayers. We must always ask for forgiveness when we make a mistake.",
      next:
        "The whale obeyed Allah in the depths of the sea. Our next animal is the largest of them all, and it refused to march against the holy Kaaba! It's the Elephant of Abraha!",
      quranProse:
        "Prophet Yunus prayed in the darkness: {There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.}",
    },
    title: "قصة حوت يونس",
    surahName: "",
    image: "/stories/animals/whale-of-yunus.jpg",
    hook: "تخيلوا أنفسكم في سفينة في وسط البحر المظلم، وفجأة تهب عاصفة قوية، وهناك حيوان بحري ضخم جداً يفتح فمه الكبير.. ليحمي نبياً من الغرق! كيف حدث ذلك؟ وهل عاش النبي داخل بطن الحوت؟ تعالوا نغوص في قصة حوت سيدنا يونس!",
    events: "كان سيدنا يونس نبياً أرسله الله إلى قومه ليعبدوا الله، لكنهم رفضوا ولم يسمعوا كلامه. غضب سيدنا يونس منهم كثيراً، فتركهم وذهب وركب سفينة في البحر دون أن ينتظر إذن الله. في وسط البحر، هبت عاصفة قوية جداً، وكادت السفينة أن تغرق. علم ركاب السفينة أنه يجب أن يلقوا بأحد الركاب في البحر لتخفيف الوزن. أجروا قرعة، ووقعت القرعة على سيدنا يونس! فرمى نفسه في البحر المظلم العاصف. لكن الله الرحيم لم يتركه، بل أمر حوتاً ضخماً جداً أن يبتلع سيدنا يونس دون أن يؤذيه أو يكسر عظامه! عاش يونس في بطن الحوت المظلم، وأخذ يدعو الله ويستغفره ويقول: 'لا إله إلا أنت سبحانك إني كنت من الظالمين'. فسمع الله دعاءه، وأمر الحوت أن يخرج يونس إلى الشاطئ بسلام.",
    quranProse: "يصف لنا الله كيف دعا سيدنا يونس في بطن الحوت فيقول: {فَنَادَى فِي الظُّلُمَاتِ أَن لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ}. يعني أنه دعا الله وهو في ظلام بطن الحوت وظلام البحر وظلام الليل.",
    lesson: "نتعلم من قصة حوت يونس أن الله يسمع دعاءنا في أي مكان، حتى لو كنا في أعماق البحر أو في مكان مظلم جداً. ونتعلم أيضاً أننا إذا أخطأنا، يجب أن نعتذر فوراً ونستغفر الله، وهو سيسامحنا لأنه رحيم.",
    next: "حوت يونس كان يعيش في البحر.. ولكن في قصتنا القادمة، سنتعرف على حيوان ضخم جداً يعيش على الأرض، حاول بعض الأشرار استخدامه لهدم الكعبة، لكنه رفض التحرك! من هو هذا الحيوان العجيب؟ سنتعرف عليه في قصة فيل أبرهة!",
  },
  {
    chapter: "animals", slug: "elephant-of-abraha",
    en: {
      title: "The Elephant of Abraha",
      hook:
        "Have you ever seen an elephant? They are huge and strong! But what happens when an evil king tries to force an elephant to do something bad? Let's find out!",
      events:
        "A long time ago, an evil king named Abraha wanted to destroy the holy Kaaba in Mecca. He brought a massive army and a huge, strong elephant named 'Mahmoud' to knock down the Kaaba. But when they pointed the elephant towards Mecca, a miracle happened! The elephant sat down and completely refused to move towards the Kaaba. If they turned him away, he would run, but towards the Kaaba, he wouldn't take a single step! Then, Allah sent flocks of birds to defeat the evil army, and the Kaaba was saved.",
      lesson:
        "Animals know and obey Allah. We learn that Allah always protects His holy places, and no matter how big and strong the bad guys are, Allah is always stronger.",
      next:
        "The elephant refused to harm the Kaaba. Our next animal guarded a group of believing youth at the mouth of a cave for hundreds of years — the Dog of the People of the Cave!",
      quranProse:
        "Allah says in Surah Al-Fil: {Have you not considered, [O Muhammad], how your Lord dealt with the companions of the elephant?}",
    },
    title: "قصة فيل أبرهة",
    surahName: "",
    image: "/stories/animals/elephant-of-abraha.jpg",
    hook: "هل رأيتم فيلاً من قبل؟ إنه حيوان ضخم وقوي جداً. تخيلوا أن ملكاً شريراً أراد أن يستخدم هذا الفيل الضخم لهدم مكان مقدس نحبه جميعاً.. الكعبة! ولكن الفيل العجيب فاجأ الجميع وفعل شيئاً لم يتوقعه أحد! ما الذي فعله؟ دعونا نتعرف على قصة فيل أبرهة.",
    events: "في قديم الزمان، كان هناك ملك شرير اسمه أبرهة. كان يغار كثيراً من الكعبة المشرفة في مكة لأن الناس يحبونها ويزورونها. فقرر أن يبني كنيسة كبيرة، لكن الناس لم يذهبوا إليها. غضب أبرهة جداً، وجهز جيشاً كبيراً ومعه فيل ضخم جداً اسمه (محمود) ليهدم الكعبة! وعندما وصل الجيش إلى مكة واقتربوا من الكعبة، أمروا الفيل محمود بالتقدم لهدمها.. ولكن الفيل جلس على الأرض ورفض التحرك! حاولوا ضربه وإجباره، لكنه لم يتحرك خطوة واحدة نحو الكعبة. فجأة، أرسل الله طيوراً صغيرة جداً، تحمل حجارة صغيرة، ورمتها على الجيش الشرير فهلكوا جميعاً، وحمى الله بيته الحرام، ونجا الفيل محمود لأنه لم يرد إيذاء الكعبة.",
    quranProse: "يقول الله تعالى في القرآن عن هذه القصة: {أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ}. وهي بداية سورة الفيل التي تذكرنا دائماً بكيف حمى الله الكعبة من أبرهة وجيشه.",
    lesson: "نتعلم من قصة الفيل محمود أن الله قادر على حماية بيته وأشيائه المقدسة. ونتعلم أيضاً أن الحيوانات أحياناً تعرف الصح من الخطأ وتطيع الله أكثر من الأشرار. يجب علينا دائماً أن نحترم الأماكن المقدسة ونحبها.",
    next: "رأينا كيف رفض الفيل مساعدة الأشرار.. في قصتنا القادمة، سنتعرف على حيوان آخر، ولكن هذا الحيوان كان وفياً جداً لمجموعة من الأصدقاء الطيبين، ونام معهم لفترة طويييييلة جداً! من هو؟ وما هي قصة كلب أهل الكهف؟ انتظرونا!",
  },
  {
    chapter: "animals", slug: "dog-of-the-cave",
    title: "قصة كلب أهل الكهف",
    surahName: "",
    image: "/stories/animals/dog-of-the-cave.jpg",
    hook: "هل لديكم حيوان أليف تحبونه ويحبكم؟ ماذا لو كان لديكم كلب وفي جداً، يذهب معكم في مغامرة للهروب من ملك ظالم، ثم ينام معكم في كهف لمئات السنين وهو يحرسكم! قصة خيالية؟ لا، إنها قصة حقيقية! تعالوا نتعرف على قصة كلب أهل الكهف.",
    events: "كان هناك مجموعة من الفتية الشباب الطيبين، يعيشون في مدينة يحكمها ملك ظالم يجبر الناس على عبادة الأصنام. لكن هؤلاء الشباب كانوا مؤمنين ويعبدون الله وحده. قرر الشباب الهروب بدينهم حتى لا يؤذيهم الملك الشرير. في طريقهم، تبعهم كلبهم الوفي ولم يرضَ أن يتركهم. دخل الشباب إلى كهف مهجور في جبل ليختبئوا فيه، وجلس الكلب عند باب الكهف ليحرسهم. وهناك، حدثت المعجزة! ألقى الله عليهم النوم، فناموا هم وكلبهم نومة طويلة جداً.. ناموا لمدة ثلاثمائة وتسع سنين! طوال هذه المدة، كان الكلب نائماً عند الباب، يبدو وكأنه مستيقظ ومخيف ليمنع أي شخص من الاقتراب من أصدقائه. ولما استيقظوا، كان الملك الظالم قد مات، وأصبحت المدينة كلها تعبد الله.",
    quranProse: "يصف القرآن الكريم مشهد الكلب وهو يحرسهم فيقول: {وَكَلْبُهُم بَاسِطٌ ذِرَاعَيْهِ بِالْوَصِيدِ}. الوصيد هو باب الكهف، والآية ترسم صورة جميلة لوفاء هذا الكلب لأصحابه.",
    lesson: "نتعلم من هذه القصة الرائعة معنى الوفاء والإخلاص للأصدقاء، تماماً كما فعل الكلب. ونتعلم أيضاً أن الله يحمي دائماً من يؤمن به ويتوكل عليه، حتى لو اضطررنا للهروب والاختباء.",
    next: "كان الكلب وفياً ونام طويلاً.. لكن ماذا لو طلب نبي من قومه أن يبحثوا عن بقرة بلون وشكل محدد جداً لحل لغز محير؟ قصة غريبة ومليئة بالأسئلة، وهذا ما سنعرفه في قصة بقرة بني إسرائيل!",
  },
  {
    chapter: "animals", slug: "cow-of-israel",
    title: "قصة بقرة بني إسرائيل",
    surahName: "",
    image: "/stories/animals/cow-of-israel.jpg",
    hook: "هل تحبون حل الألغاز؟ تخيلوا أن هناك جريمة غامضة لا أحد يعرف من قام بها، والحل الوحيد لحل هذا اللغز يكمن في.. بقرة! نعم، بقرة صفراء جميلة جداً. كيف ساعدت هذه البقرة في كشف الحقيقة؟ تعالوا نتعرف على قصة بقرة بني إسرائيل.",
    events: "في زمان سيدنا موسى عليه السلام، وقعت مشكلة كبيرة بين قومه (بني إسرائيل). فقد وُجد رجل مقتول، ولم يعرف أحد من هو القاتل، وبدأ الناس يتهمون بعضهم البعض. ذهبوا إلى سيدنا موسى وطلبوا منه أن يدعو الله ليكشف لهم الحقيقة. أوحى الله لموسى أن يأمرهم بذبح بقرة. استغرب القوم وبدؤوا يطرحون أسئلة كثيرة بدلاً من أن ينفذوا الأمر فوراً! سألوا عن عمرها، ولونها، وعملها. فشدد الله عليهم، وأخبرهم أنها يجب أن تكون بقرة لونها أصفر فاقع وجميل جداً، ولا تعمل في حراثة الأرض. بحثوا طويلاً حتى وجدوا البقرة المطلوبة عند ولد يتيم كان باراً بوالديه. اشتروها بوزنها ذهباً! وبعد ذبحها، أمرهم الله أن يضربوا المقتول بجزء منها، فحدثت المعجزة: أحيا الله الرجل للحظات، وأخبرهم باسم القاتل، ثم مات مرة أخرى.",
    quranProse: "يصف القرآن جمال لون هذه البقرة فيقول: {قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ النَّاظِرِينَ}. أي أن لونها جميل جداً ويسعد من ينظر إليها.",
    lesson: "نتعلم من هذه القصة درساً مهماً: لا يجب علينا أن نكثر الأسئلة والتعقيدات عندما يطلب منا المعلم أو الوالدان شيئاً بسيطاً. ونتعلم أيضاً أن طاعة الوالدين (كما فعل الولد اليتيم) تجلب الخير الكثير، وأن الله قادر على إحياء الموتى.",
    next: "ساعدت البقرة في حل لغز كبير.. ولكن في قصتنا القادمة، سنتعرف على حيوان كان هو نفسه معجزة! حيوان خرج من الصخرة الصلبة! هل تتخيلون ذلك؟ إنها ناقة سيدنا صالح، فانتظرونا!",
  },
  {
    chapter: "animals", slug: "camel-of-saleh",
    en: {
      title: "The Miracle Camel of Prophet Salih",
      hook:
        "Can a giant camel walk right out of a mountain rock? It sounds impossible, but with Allah, everything is possible! Let's discover the story of the miracle camel.",
      events:
        "The people of Prophet Salih (Thamud) were very stubborn. They asked him for an impossible miracle to believe him: they wanted a huge, beautiful pregnant camel to come out of a solid mountain rock! Prophet Salih prayed to Allah, and the rock actually split open, and out walked the amazing camel! The Prophet told them to let her drink from the well and never harm her. But the bad people didn't listen and hurt the camel, so Allah punished them.",
      lesson:
        "We must always respect Allah's miracles and treat animals with great kindness and care, never hurting them.",
      next:
        "The camel was a sign that its people refused to respect. In our last animal story, a humble donkey becomes proof of something amazing: that Allah can bring the dead back to life!",
      quranProse:
        "Prophet Salih told them: {O my people, this is the she-camel of Allah - [she is] to you a sign. So let her feed upon Allah's earth, and do not touch her with harm.}",
    },
    title: "قصة ناقة صالح",
    surahName: "",
    image: "/stories/animals/camel-of-saleh.jpg",
    hook: "هل يمكن لحيوان كبير أن يخرج من صخرة قاسية في الجبل؟ الأشرار طلبوا هذا الطلب المستحيل لتعجيز النبي، لكن الله أخرج لهم معجزة مدهشة، ناقة ضخمة وجميلة خرجت من الحجر! ماذا حدث لهذه الناقة العجيبة؟ هيا نكتشف قصة ناقة سيدنا صالح.",
    events: "كان سيدنا صالح نبياً أرسله الله إلى قوم اسمهم (ثمود)، كانوا أقوياء جداً وينحتون بيوتهم داخل الجبال. لم يصدقوا سيدنا صالحاً وطلبوا منه معجزة غريبة جداً ليؤمنوا به: أرادوا أن تخرج ناقة كبيرة من صخرة معينة في الجبل! دعا سيدنا صالح ربه، فاستجاب الله له، وانشقت الصخرة، وخرجت منها ناقة ضخمة وجميلة. آمن بعض الناس، لكن الأشرار بقوا على عنادهم. طلب سيدنا صالح من قومه أن يتركوا الناقة تأكل وتشرب بأمان، وأن يخصصوا لها يوماً لتشرب الماء وحدها، واليوم الآخر يشربون هم. لكن الأشرار لم يعجبهم ذلك، وقرروا قتل الناقة! عندما قتلوها، غضب الله عليهم غضباً شديداً، وأهلكهم بعذاب أليم بسبب ظلمهم وعنادهم.",
    quranProse: "يقول الله تعالى في القرآن عن هذا الأمر: {قَالَ هَذِهِ نَاقَةٌ لَّهَا شِرْبٌ وَلَكُمْ شِرْبُ يَوْمٍ مَّعْلُومٍ * وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابُ يَوْمٍ عَظِيمٍ}. أي أنه حذرهم من إيذائها.",
    lesson: "نتعلم من قصة ناقة صالح أن الله قوي وقادر على كل شيء، وأن المعجزات هي دليل على قدرته. ونتعلم أيضاً أننا يجب أن نفي بالوعود ونحذر من إيذاء الحيوانات الطيبة التي لم تؤذنا، وأن عاقبة الظلم سيئة جداً.",
    next: "ناقة خرجت من صخرة.. معجزة عجيبة! وفي قصتنا الأخيرة من هذه المجموعة، سنتعرف على قصة رجل نام لمدة مائة عام، ولما استيقظ، وجد طعامه كما هو، لكن حماره تحول إلى عظام! كيف ذلك؟ هذه هي قصة حمار عزير!",
  },
  {
    chapter: "animals", slug: "donkey-of-uzair",
    title: "قصة حمار عزير",
    surahName: "",
    image: "/stories/animals/donkey-of-uzair.jpg",
    hook: "تخيلوا أن تناموا لفترة طويلة جداً، مائة عام كاملة! وعندما تستيقظون، تجدون طعامكم طازجاً كما تركتموه، لكن حماركم الذي كان بجواركم أصبح مجرد عظام! قصة غريبة جداً توضح لنا قدرة الله العجيبة. تعالوا نستمع لقصة حمار عزير.",
    events: "كان هناك رجل صالح اسمه عزير، يركب حماره ويمر بقرية مدمرة تماماً، لا يوجد فيها أحد حي. فكر عزير في نفسه وقال متعجباً: 'كيف يحيي الله هذه القرية بعد موتها؟'. أراد الله أن يري عزيراً قدرته العظيمة، فأماته الله لمدة مائة عام كاملة! ولما أحياه الله بعد المائة عام، سأله: 'كم لبثت؟' (أي كم نمت؟)، ظن عزير أنه نام يوماً أو جزءاً من يوم. فقال له الله: 'بل لبثت مائة عام!'. أمره الله أن ينظر إلى طعامه وشرابه (تين وعنب) فوجده طازجاً لم يفسد أبداً. ثم أمره أن ينظر إلى حماره، فوجده قد تحول إلى عظام قديمة! وأمام عيني عزير، أمر الله العظام أن تتجمع وتتغطى باللحم والجلد، وعاد الحمار حياً يقف أمامه! فعرف عزير قدرة الله.",
    quranProse: "يقول الله تعالى في القرآن الكريم: {وَانْظُرْ إِلَى حِمَارِكَ وَلِنَجْعَلَكَ آيَةً لِلنَّاسِ وَانْظُرْ إِلَى الْعِظَامِ كَيْفَ نُنْشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا}. أي انظر كيف نجمع العظام ونغطيها باللحم ليعود الحمار حياً.",
    lesson: "نتعلم من قصة عزير وحماره أن الله قادر على إحياء الموتى، وأن الموت والبعث حقيقة أكيدة. ونتعلم أن قدرة الله لا حدود لها؛ فهو قادر على حفظ الطعام من الفساد مائة عام، وقادر على إعادة العظام إلى حياة.",
    next: "وهكذا يا أصدقائي، تعرفنا على أجمل قصص الحيوانات في القرآن الكريم. كل حيوان علمنا درساً مهماً. هل أنتم مستعدون لمجموعة جديدة من القصص؟ في المرة القادمة، سنبدأ مغامرة جديدة مع قصص الأنبياء الرائعة!",
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
    },
    image: "/stories/maryam.jpg",
    title: "مريم ابنة عمران",
    surahName: "آل عمران",
    hook: "هل تعرفون قصة طفلة صغيرة عاشت في المسجد، وكان يأتيها طعام لذيذ من السماء؟ كيف حدث ذلك؟ ومن هي هذه الفتاة الطيبة؟",
    events: "مريم كانت فتاة صالحة جدًا، أمها نذرتها لخدمة بيت الله. تكفل بها نبي الله زكريا. كان كلما دخل عليها غرفتها يجد عندها فاكهة وطعامًا غير موجود في ذلك الموسم! وعندما يسألها من أين هذا؟ تقول: «هو من عند الله». ولما كبرت، اختارها الله لتكون أمًا لنبي عظيم هو سيدنا عيسى عليه السلام، دون أن يكون له أب، لتكون معجزة للعالمين.",
    lesson: "الله يرزق من يحبه ويطيعه بأشياء جميلة جدًا. وعلينا أن نكون مثل السيدة مريم في حبها للصلاة والدعاء، فهي مثال عظيم للطهر والاصطفاء.",
    next: "مريم كانت امرأة طيبة جدًا يحبها الله. وفي قصتنا القادمة سنتعرف على امرأة أخرى طيبة وشجاعة جدًا، كانت تعيش في قصر أكبر ملوك الأرض ظلمًا، لكنها اختارت الجنة… من هي؟",
    ayah: { ref: "3:37", surah: 3, number: 37, text: "كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا ٱلْمِحْرَابَ وَجَدَ عِندَهَا رِزْقًۭا ۖ قَالَ يَـٰمَرْيَمُ أَنَّىٰ لَكِ هَـٰذَا ۖ قَالَتْ هُوَ مِنْ عِندِ ٱللَّهِ" },
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
    },
    image: "/stories/asiya.jpg",
    title: "آسية امرأة فرعون",
    surahName: "التحريم",
    hook: "تخيلوا أن تعيشوا في قصر كبير مليء بالذهب والألعاب، لكن الحاكم هناك شرير جدًا! ماذا ستفعلون؟ هل ستكونون أشرارًا مثله أم تختارون طريق الخير؟",
    events: "آسية كانت زوجة فرعون، الملك الظالم الذي كان يقول للناس «أنا ربكم الأعلى». لكن آسية كانت طيبة ومؤمنة بالله في قلبها. وعندما وجدت النبي موسى وهو طفل رضيع في الصندوق في النهر، أحبته كثيرًا وأقنعت فرعون ألا يقتله وربّته في قصرها. ولما كبر موسى وأصبح نبيًا، آمنت به آسية، وتجردت من كل نعيم الدنيا طلبًا لرضا الله. لم تخف من غضب فرعون وعذابه، بل دعت الله أن يبني لها بيتًا في الجنة لتسكن بجواره.",
    lesson: "الشجاعة الحقيقية هي أن نقول الحق ونفعل الخير، حتى لو كان من حولنا يفعلون الشر. وأن الجنة أجمل بكثير من أي قصر في الدنيا.",
    next: "السيدة آسية ربّت طفلًا ليس ابنها… لكن هل تعرفون من هي أول أم في تاريخ البشرية؟ أول امرأة خلقها الله لتسكن الأرض مع زوجها؟",
    ayah: { ref: "66:11", surah: 66, number: 11, text: "وَضَرَبَ ٱللَّهُ مَثَلًۭا لِّلَّذِينَ ءَامَنُوا۟ ٱمْرَأَتَ فِرْعَوْنَ إِذْ قَالَتْ رَبِّ ٱبْنِ لِى عِندَكَ بَيْتًۭا فِى ٱلْجَنَّةِ" },
  },
  {
    chapter: "women",
    slug: "hawwa",
    image: "/stories/hawwa.jpg",
    title: "السيدة حواء",
    surahName: "البقرة",
    hook: "هل سألتم أنفسكم يومًا من أين جاء كل هؤلاء الناس في العالم؟ من كان أول رجل وأول امرأة على الأرض؟",
    events: "خلق الله سيدنا آدم بيده، ثم خلق زوجته السيدة حواء لكي لا يكون وحيدًا. عاشا معًا في الجنة الجميلة يأكلان من كل الثمار، إلا شجرة واحدة منعهما الله منها. لكن الشيطان الشرير وسوس لهما وخدعهما حتى أكلا من الشجرة. حزنت حواء وآدم جدًا لأنهما لم يسمعا كلام الله، فاعتذرا وبكيا، فسامحهما الله الرحيم، وأنزلهما إلى الأرض لتبدأ قصة البشرية ونكون نحن من أحفادهما!",
    lesson: "إذا أخطأنا ونسينا كلام الله، يجب أن نعتذر فورًا ونطلب منه السماح، والله سيغفر لنا لأنه رحيم يحب التوابين.",
    next: "السيدة حواء هي أم البشر… ولكن هناك امرأة أخرى طيبة جدًا، رزقها الله بطفل جميل وهي كبيرة جدًا في السن! هل تعرفون من هي؟",
    ayah: { ref: "2:35", surah: 2, number: 35, text: "وَقُلْنَا يَـٰٓـَٔادَمُ ٱسْكُنْ أَنتَ وَزَوْجُكَ ٱلْجَنَّةَ وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَـٰذِهِ ٱلشَّجَرَةَ" },
  },
  {
    chapter: "women",
    slug: "sarah",
    image: "/stories/sarah.jpg",
    title: "السيدة سارة",
    surahName: "هود",
    hook: "هل يمكن لشجرة قديمة جدًا أن تثمر فجأة تفاحًا لذيذًا؟ هذا مستحيل! لكن الله قادر على كل شيء.",
    events: "السيدة سارة هي زوجة نبي الله إبراهيم عليه السلام. كانت امرأة طيبة، لكنها كبرت في السن ولم يكن لديها أطفال. في يوم من الأيام، جاء ملائكة على شكل ضيوف لزيارة سيدنا إبراهيم، وبشّروه وبشّروا السيدة سارة بأنها ستلد طفلًا اسمه إسحاق، ومن بعده حفيد اسمه يعقوب! ضحكت السيدة سارة من المفاجأة وتعجبت وقالت: كيف ألد طفلًا وأنا عجوز كبيرة؟ فقال لها الملائكة: هل تتعجبين من قدرة الله؟ فرزقها الله بالنبي إسحاق وفرحت به كثيرًا.",
    lesson: "قدرة الله كبيرة جدًا ولا يوجد شيء مستحيل عليه. إذا أردنا شيئًا بشدة، علينا أن ندعو الله دائمًا ولا نيأس أبدًا.",
    next: "السيدة سارة كانت تعيش مع سيدنا إبراهيم، وكان معهم سيدة طيبة أخرى اضطرت للعيش في صحراء قاحلة وحدها مع طفلها الرضيع، وبحثت عن الماء بين جبلين! هل عرفتموها؟",
    ayah: { ref: "11:72", surah: 11, number: 72, text: "قَالَتْ يَـٰوَيْلَتَىٰٓ ءَأَلِدُ وَأَنَا۠ عَجُوزٌۭ وَهَـٰذَا بَعْلِى شَيْخًا ۖ إِنَّ هَـٰذَا لَشَىْءٌ عَجِيبٌۭ" },
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
    },
    image: "/stories/hajar.jpg",
    title: "السيدة هاجر",
    surahName: "إبراهيم",
    hook: "تخيلوا أنفسكم في صحراء حارة جدًا، لا يوجد بها شجر ولا ماء ولا أصدقاء تلعبون معهم. وفجأة، يبكي طفل صغير من العطش! ماذا ستفعل أمه؟",
    events: "السيدة هاجر هي زوجة سيدنا إبراهيم وأم سيدنا إسماعيل. أمر الله سيدنا إبراهيم أن يترك هاجر وطفلها الرضيع في صحراء مكة حيث لا يوجد أحد. سألته هاجر: هل أمرك الله بهذا؟ قال: نعم. فقالت بشجاعة: إذن لن يضيعنا الله! وعندما عطش الطفل وبكى، أخذت تركض بين جبلين (الصفا والمروة) سبع مرات تبحث عن ماء. وفجأة، ضرب الملَك الأرض بجناحه عند قدمي الطفل إسماعيل، فخرجت عين ماء عذبة وجميلة جدًا! إنها بئر زمزم التي نشرب منها حتى اليوم.",
    lesson: "مهما كنا في مشكلة أو مكان صعب، يجب أن نثق في الله ونبذل جهدنا كما ركضت هاجر، والله سيرزقنا ويساعدنا من حيث لا ندري.",
    next: "السيدة هاجر كانت تحب طفلها كثيرًا وتخاف عليه… ولكن في قصتنا القادمة سنتعرف على ملكة ذكية جدًا، كانت تحكم بلدًا كبيرًا، وجاءتها رسالة غريبة من طائر!",
    ayah: { ref: "14:37", surah: 14, number: 37, text: "رَّبَّنَآ إِنِّىٓ أَسْكَنتُ مِن ذُرِّيَّتِى بِوَادٍ غَيْرِ ذِى زَرْعٍ عِندَ بَيْتِكَ ٱلْمُحَرَّمِ" },
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
    },
    image: "/stories/bilqis.jpg",
    title: "ملكة سبأ",
    surahName: "النمل",
    hook: "هل تحبون القصص عن الملوك والملكات والقلاع الكبيرة؟ اليوم لدينا قصة عن ملكة ذكية جدًا، وصلتها رسالة من ملك بعيد، لم يحضرها ساعي البريد، بل أحضرها طائر!",
    events: "بلقيس كانت ملكة غنية وقوية تحكم مملكة سبأ، لكنها وقومها كانوا يخطئون ويعبدون الشمس. علم بذلك سيدنا سليمان عن طريق طائره الهدهد، فأرسل لها رسالة يطلب منها أن تعبد الله وحده. جمعت بلقيس وزراءها لتستشيرهم، فقالوا لها نحن أقوياء ويمكننا محاربته، لكنها بذكائها رفضت الحرب، وقررت أن تذهب بنفسها لترى سيدنا سليمان. وعندما وصلت وشاهدت قدرة الله والملك العظيم لسيدنا سليمان، قادها عقلها للإيمان، وعرفت أن عبادة الشمس كانت خطأ، فأسلمت لله رب العالمين.",
    lesson: "الشخص الذكي هو الذي يفكر قبل أن يغضب، ويستمع للحق، ولا يخجل من الاعتراف بخطئه وتصحيحه كما فعلت الملكة بلقيس.",
    next: "الملكة بلقيس كانت ذكية واختارت طريق الإيمان. ولكن هناك نساء كنّ يعشن في بيوت مهمة جدًا، ومع ذلك اخترن طريق الأشرار! من هنّ؟",
    ayah: { ref: "27:44", surah: 27, number: 44, text: "رَبِّ إِنِّى ظَلَمْتُ نَفْسِى وَأَسْلَمْتُ مَعَ سُلَيْمَـٰنَ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ" },
  },
  {
    chapter: "women",
    slug: "imraat_alaziz",
    image: "/stories/imraat_alaziz.jpg",
    title: "امرأة العزيز",
    surahName: "يوسف",
    hook: "هل حدث وأن اتهمكم أحد بشيء لم تفعلوه؟ إنه شعور سيء جدًا! في قصتنا اليوم، هناك شاب طيب جدًا اتُهم ظلمًا…",
    events: "عاش النبي يوسف وهو شاب في قصر رجل مهم يسمى العزيز. وكانت امرأة العزيز تعامله بقسوة وأرادت منه أن يفعل أشياء خاطئة لا ترضي الله. ولأن سيدنا يوسف كان طيبًا ويرفض الخطأ، غضبت منه واتهمته كذبًا بأنه هو من أخطأ، فدخل السجن ظلمًا لسنوات طويلة! لكن الله لم يتركه. وبعد سنوات، أراد الملك أن يخرجه لأنه شخص صادق وحكيم. وهنا، شعرت امرأة العزيز بالندم، وقررت أن تعترف بالحقيقة وتقول للجميع إن يوسف كان صادقًا وهي من كذبت.",
    lesson: "الكذب شيء سيء جدًا ويؤذي الآخرين. وإذا أخطأنا وكذبنا، يجب أن نتحلى بالشجاعة ونقول الحقيقة في النهاية لكي نعيد الحق لأصحابه.",
    next: "امرأة العزيز اعترفت بخطئها في النهاية… ولكن في قصتنا الأخيرة سنتعرف على امرأتين كانتا متزوجتين من نبيين عظيمين، لكنهما لم تعترفا بالحق أبدًا!",
    ayah: { ref: "12:51", surah: 12, number: 51, text: "ٱلْـَٔـٰنَ حَصْحَصَ ٱلْحَقُّ أَنَا۠ رَٰوَدتُّهُۥ عَن نَّفْسِهِۦ وَإِنَّهُۥ لَمِنَ ٱلصَّـٰدِقِينَ" },
  },
  {
    chapter: "women",
    slug: "nuh_lut",
    image: "/stories/nuh_lut.jpg",
    title: "امرأة نوح وامرأة لوط",
    surahName: "التحريم",
    hook: "تخيلوا أن يكون زوجكم نبيًا يعلمه الله كل شيء، ويدل الناس على طريق الجنة… هل يعقل ألا تسمعوا كلامه؟",
    events: "سيدنا نوح وسيدنا لوط كانا نبيين عظيمين يدعوان الناس لعبادة الله وترك الأفعال السيئة. لكن المفاجأة الحزينة أن امرأة نوح وامرأة لوط لم تكونا مؤمنتين! كانتا لا تصدقان زوجيهما، وتساعدان الأشرار ضد المؤمنين. ولأن الله عادل، فإنه يحاسب كل شخص على أفعاله، بغض النظر عن عائلته. لذلك، عندما جاء العذاب للأشرار، هلكت امرأة نوح مع الذين لم يركبوا السفينة، وهلكت امرأة لوط مع قومها لأنها اختارت طريق الشر.",
    lesson: "كل إنسان مسؤول عن أفعاله. لن ينفعنا أن نكون من عائلة طيبة إذا كانت أفعالنا نحن سيئة. يجب أن نختار دائمًا أصدقاءنا وطريقنا بشكل صحيح.",
    next: "وهكذا انتهينا من قصص النساء في القرآن. في المجموعات القادمة سنبدأ بقصص الأنبياء والرسل!",
    ayah: { ref: "66:10", surah: 66, number: 10, text: "ضَرَبَ ٱللَّهُ مَثَلًۭا لِّلَّذِينَ كَفَرُوا۟ ٱمْرَأَتَ نُوحٍۢ وَٱمْرَأَتَ لُوطٍۢ ۖ كَانَتَا تَحْتَ عَبْدَيْنِ مِنْ عِبَادِنَا صَـٰلِحَيْنِ فَخَانَتَاهُمَا" },
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
      };
