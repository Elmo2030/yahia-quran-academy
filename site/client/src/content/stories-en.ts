// =============================================================================
// stories-en.ts — the English text of the forty-two stories.
//
// This used to sit inside each object in stories.ts, which meant every reader
// downloaded both languages of every story to read one of them in one: 176 KB
// of the 333 KB in that file, and over half of the 143 KB the Stories chunk
// weighed compressed. An Arabic reader — which the site is built for first —
// paid for the whole English translation and was never shown a word of it.
//
// No bundler can split a field out of an object, so the text had to physically
// move. It is loaded on demand now, by storiesEnResource(), and an Arabic
// reader never fetches this file at all.
//
// Keyed "<chapter>/<slug>", the same address the story has on the site. A story
// missing from here has no English yet, and the page falls back to the Arabic
// — which is what it did before, through `story.en` being undefined.
// =============================================================================

import type { StoryText } from "./stories";

export const storiesEn: Record<string, StoryText> = {
  "nations/ashab-al-kahf": {
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
  "nations/luqman": {
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
  "nations/dhul-qarnayn": {
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
  "nations/believer-of-pharaoh": {
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
  "nations/ashab-al-ukhdud": {
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
  "nations/qarun": {
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
  "nations/samiri": {
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
  "nations/talut-and-jalut": {
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
  "nations/ashab-ar-rass": {
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
  "prophets/adam": {
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
  "prophets/idris": {
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
  "prophets/nuh": {
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
  "prophets/hud": {
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
  "prophets/saleh": {
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
  "prophets/shuaib": {
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
  "prophets/ibrahim": {
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
  "prophets/lut": {
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
  "prophets/yusuf": {
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
  "prophets/ayoub": {
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
  "prophets/musa-and-harun": {
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
  "prophets/yusha": {
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
  "prophets/dawud": {
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
  "prophets/sulaiman": {
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
  "prophets/zakariya-and-yahya": {
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
  "prophets/isa": {
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
  "prophets/muhammad": {
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
  "animals/ant-of-solomon": {
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
  "animals/hoopoe-of-solomon": {
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
  "animals/whale-of-yunus": {
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
  "animals/elephant-of-abraha": {
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
  "animals/dog-of-the-cave": {
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
  "animals/cow-of-israel": {
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
  "animals/camel-of-saleh": {
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
  "animals/donkey-of-uzair": {
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
  "women/maryam": {
    title: "Maryam, the Mother of Isa",
    hook:
      "There are many women in the Quran, but you will not find a single one named by her own name — except one. And a whole surah carries her name. Who is she? And what was it about her that her name alone is given among all the women?",
    events:
      "{So her Lord accepted her with good acceptance and caused her to grow in a good manner and put her in the care of Zakariya.} She grew up in the sanctuary, cared for by a prophet of Allah. Whenever Zakariya entered upon her he found provision with her, and would ask: {From where is this to you?} She would say: {It is from Allah. Indeed, Allah provides for whom He wills without account.} A young girl answering an elderly prophet with that — and teaching him.",
    lesson:
      "Do what you can even if it looks too small to be enough; the provision after that is from Allah.",
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
    arc: {
      idea: "A girl vowed to the house of Allah before she was born, who became the only woman named by name in the Quran.",
      setting:
        "Before Maryam was born, her mother, the wife of Imran, vowed what was in her womb to the service of Allah's house: {My Lord, indeed I have pledged to You what is in my womb, consecrated. So accept this from me.} Then she delivered, and it was a girl — and in their custom such a vow was for boys — so she said: {My Lord, I have delivered a female.} Then she said the words that were the first thing Maryam ever received: {And I have named her Maryam, and I seek refuge for her in You and her descendants from Satan, the expelled.}",
      keyMoment:
        "Then came the hardest thing she faced. She carried Isa by Allah's command without a father, knowing exactly what people would say. And when the pains came to her alone under the palm tree she said: {Oh, I wish I had died before this and was in oblivion, forgotten.} She was called: {Do not grieve; your Lord has provided beneath you a stream. And shake toward you the trunk of the palm tree; it will drop upon you ripe, fresh dates.} Notice: she was told to shake the trunk of a palm tree — a woman exhausted by labour, and a palm trunk that grown men cannot shake. Allah wanted her to act, even with an act that could not be enough, and then He would send the provision.",
      resolution:
        "She went back to her people carrying him, and they accused her, and she stayed silent and did not defend herself, and pointed at the child — and he spoke and defended her. And Allah said of her at the end of Surah At-Tahrim: {And Maryam, the daughter of Imran, who guarded her chastity, so We blew into it through Our angel, and she believed in the words of her Lord and His scriptures and was of the devoutly obedient.} She is the only woman named in the Quran, and a whole surah carries her name.",
      word: { term: "The devoutly obedient", meaning: "Those constant in obedience to Allah, quietly and humbly, never breaking from it." },
      lessons: [
        "Provision is from Allah; the means you take are not what provides for you.",
        "Bearing an accusation patiently can be stronger than defending yourself.",
        "Begin your child with a prayer; Maryam's mother sought refuge for her and her descendants before she ever saw her.",
      ],
      think:
        "Maryam was told to shake the palm trunk at her very weakest. Why did the dates not simply fall without her shaking? What does that teach you about work and prayer together?",
      tryToday:
        "If you ask Allah for something today, take one small step towards it afterwards — even knowing that step alone is not enough.",
    },
  },
  "women/asiya": {
    title: "Asiya, the Wife of Pharaoh",
    hook:
      "If you had everything you could want — a palace, servants, gold, and you were married to the most powerful man on earth — what would you ask Allah for? In today's story there was a woman in exactly that position. And she asked Allah for a house.",
    events:
      "When they found the basket in the river with a baby inside, and Pharaoh wanted him killed, it was she who said: {A comfort of the eye for me and for you. Do not kill him; perhaps he may benefit us, or we may adopt him as a son.} Musa survived because of one sentence from her. Then Musa grew up and became a prophet calling Pharaoh to Allah, and she believed in him — inside the house of the man denying him. That is the hardest picture you can imagine: your faith held in a house where it is not welcome.",
    lesson:
      "What matters is not where you live, but what you choose while you are there.",
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
    arc: {
      idea: "A woman who lived in the richest palace on earth, and asked Allah for a house — with Him.",
      setting:
        "Asiya was the wife of Pharaoh, the man who told people: {I am your most exalted lord.} She lived in his palace and saw with her own eyes what he did to people and what was done to their sons. The Quran does not give her name; it names her by her position: {the wife of Pharaoh} — known by the house she was in, the worst house on earth. And then she herself became an example Allah set for all the believers.",
      keyMoment:
        "Then came the day her faith was known. And what did she say? {My Lord, build for me near You a house in Paradise, and save me from Pharaoh and his deeds, and save me from the wrongdoing people.} Notice the order of the request: she said \"near You\" before she said \"a house.\" The neighbour before the home. A woman in a palace beyond description, asking for a house — but with Allah, not on this earth.",
      resolution:
        "So Allah made her an example for all believers, men and women alike: {And Allah presents an example of those who believed: the wife of Pharaoh.} The man who said \"I am your most exalted lord\" was finished and drowned; and the prayer of a woman inside his own house is still recited in the Quran today. No one knows where the palace she lived in stood; and the house she asked for, Allah promised her.",
      word: { term: "A comfort of the eye", meaning: "Something the eye delights in and settles on, so it looks for nothing beyond it." },
      lessons: [
        "The neighbour before the home; she asked \"near You\" before she asked for \"a house.\"",
        "Where you are does not stop you from choosing what is right.",
        "One sentence said at the right moment can save a life.",
      ],
      think:
        "Asiya had everything this world offers, and asked for a house in Paradise. If you had one prayer that would certainly be answered, what would you ask for? And why that?",
      tryToday:
        "Pray Asiya's prayer today: \"My Lord, build for me near You a house in Paradise\" — and think about \"near You\" as you say it.",
    },
  },
  "women/hawwa": {
    title: "Hawwa (Eve), the First Woman",
    hook:
      "If you and your brother both got something wrong, who apologises first? In today's story, the first man and the first woman in existence made a mistake together. And look at how their apology comes in the Quran — it is the most important thing in the story.",
    events:
      "Satan came to them: {But Satan whispered to them} — to them both, not to one without the other. Then he swore to them: {And he swore to them, Indeed, I am to you from among the sincere advisers.} {So he made them fall through deception.} {And they both ate of it.} Notice the form of every verse: to them, swore to them, made them fall, and they both ate. The Quran did not lay the blame on one of them rather than the other; it named them together in every single word.",
    lesson:
      "If you were wrong together, come back together — and neither of you go looking for someone to blame.",
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
    arc: {
      idea: "The first home in existence, the first mistake they fell into together — and the return they made together.",
      setting:
        "Allah created Adam, then created from him his wife so that each might find rest in the other: {And created from it its mate}, {that you may find tranquillity in them; and He placed between you affection and mercy.} He settled them in the Garden and said to them: {And eat from it in ease and abundance from wherever you will, but do not approach this tree.} The Quran does not give Hawwa's name; it says \"his wife.\" The name we know her by today comes from outside the Quran.",
      keyMoment:
        "Then came the moment this story is told for. Adam did not say \"she gave it to me.\" She did not say \"he led me to it.\" They said one sentence in one voice: {Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.} They were wrong together, and they came back together. That was the first home in existence, and the first lesson to come out of it: a home whose people return to Allah together is never lost.",
      resolution:
        "So Allah accepted their repentance and sent them down to the earth, and said: {And when guidance comes to you from Me, whoever follows My guidance will neither go astray nor suffer.} And from those two came all of humanity: {O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women.} Everyone you pass in the street today descends from that home that knew how to come back.",
      word: { term: "Made them fall through deception", meaning: "Brought them down from where they were by trickery and pleasant words dressed up as advice." },
      lessons: [
        "Do not put your mistake on someone else, even if they had a part in it.",
        "Whispering starts with beautiful words; watch out for whoever makes a wrong thing look good.",
        "A home whose people return to Allah is never lost.",
      ],
      think:
        "The Quran named them together at every step: whispered to them, they both ate, they both returned, they both prayed. Why do you think that is? And what does it teach you about blame between brothers and sisters at home?",
      tryToday:
        "If you and your brother or your friend get something wrong today, apologise first yourself, and do not wait for them to start.",
    },
  },
  "women/sarah": {
    title: "Lady Sarah and the Glad Tidings",
    hook:
      "What would you do if a guest came and you brought out the best you had… and they did not reach for it? In today's story that happened in a prophet's house. And what came next changed the life of a woman who had given up on something she had wanted for years.",
    events:
      "Guests he did not know came in to Ibrahim: {And they said, peace. He answered, peace.} Look at what he did — the verses describe every step in a single word each: {Then he went to his family} — he slipped away quickly and quietly so the guest would not feel he was putting him to trouble. {And came with a fat roasted calf} — the best he had, not what was left over. {And placed it near them} — he set it beside them rather than saying \"come to the table.\" Three steps in three words, and every one of them a courtesy of hosting.",
    lesson:
      "Honour your guest with the best you have, and never rule anything out of Allah's mercy.",
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
    arc: {
      idea: "Guests who did not reach for the food, and a woman well past her years — and then the good news.",
      setting:
        "Ibrahim and his wife had grown old and had never been given a child. The Quran does not name her; it says \"his wife.\" The name Sarah reaches us from outside the Quran. Ibrahim was known for his generosity, so much so that Allah named his guests in a whole surah: {Has there reached you the story of the honoured guests of Ibrahim?} The guests were attributed to him, and described as honoured.",
      keyMoment:
        "They did not eat. {But when he saw their hands not reaching for it, he distrusted them and felt from them apprehension.} They said: {Fear not. We have been sent to the people of Lut} — they were angels, who do not eat. Then: {And his wife was standing, and she smiled. Then We gave her good tidings of Ishaq, and after Ishaq, Yaqub.} Notice: they gave her news of a son, and news of a grandson after him. Two generations of provision in one sentence.",
      resolution:
        "She said in astonishment: {Woe to me! Shall I give birth while I am an old woman and this, my husband, is an old man? Indeed, this is an amazing thing.} And the answer came: {Are you amazed at the decree of Allah? May the mercy of Allah and His blessings be upon you, people of the house. Indeed, He is Praiseworthy and Honourable.} Ishaq was born, then Yaqub, and from Yaqub came Yusuf and his brothers. A household whose people thought their line was finished, and a whole nation came out of it.",
      word: { term: "He went to his family", meaning: "He slipped away quickly and quietly, so his guest would not feel he was being any trouble." },
      lessons: [
        "Generosity is giving the best you have, not what is left over.",
        "Never let the person you are helping feel they are wearing you out.",
        "Do not rule anything out for Allah; \"are you amazed at the decree of Allah?\"",
      ],
      think:
        "Ibrahim slipped away quietly to prepare the food instead of asking his guests, \"would you like something to eat?\" Why do you think he did it that way?",
      tryToday:
        "Offer something today to whoever visits you or sits with you — bring it to them, and do not wait to be asked.",
    },
  },
  "women/hajar": {
    title: "Lady Hajar and the Well of Zamzam",
    hook:
      "The Zamzam water that people drink today from all over the world came up in a place where there was nothing: no tree, no well, no person. And it only came after a woman ran seven times between two hills, looking for anyone at all. What was her story?",
    events:
      "Hajar followed him saying: Ibrahim, where are you going, leaving us in this valley where there is no person and nothing at all? She said it again and again and he did not turn around. Then she asked one question that changed everything: did Allah command you to do this? He said: yes. She said: then He will not abandon us. And she went back content. This account is in Sahih al-Bukhari, from Ibn Abbas.",
    lesson:
      "Strive with what you can do, and rely on the One who holds what you cannot.",
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
    arc: {
      idea: "A woman left in a valley with no one in it, who asked one question — and the answer is still water people drink today.",
      setting:
        "Allah commanded Ibrahim to leave Hajar and her nursing son Ismail in a valley in Mecca with nothing growing, no water and no people. {Our Lord, I have settled some of my descendants in an uncultivated valley near Your sacred House.} He left with them a bag of dates and a skin of water, and then turned and walked away without looking back.",
      keyMoment:
        "The water ran out, and the baby grew so thirsty he writhed in front of her. She did not sit and wait. She climbed Safa to see if anyone was there, and saw no one, then went down into the valley and hurried across to Marwah, and came back. Seven times. And she knew perfectly well that running between two hills does not bring water out of the ground — but she could not sit still while her son was thirsty. Then she heard a voice and said: you have made me hear you, if you have any help. And there was the angel at the place of Zamzam, digging with his heel until the water appeared.",
      resolution:
        "She began to bank the water in with her hands so it would not run off, saying: gather, gather. The Prophet said: \"May Allah have mercy on the mother of Ismail; had she left Zamzam alone, it would have been a flowing spring.\" Then people came and settled near her for the water, and the empty valley became a city, and the Sacred House was built. And today people circle it and walk seven times between Safa and Marwah — walking where she walked, and drinking what she drank.",
      word: { term: "Help", meaning: "Rescue and aid in a moment of distress — she called for it while seeing no one at all." },
      lessons: [
        "Ask first: is this Allah's command? If it is, He will not abandon you.",
        "Do not sit and wait; Zamzam came after seven runs that could not produce water.",
        "The trace of one step can become an act of worship people walk thousands of years later.",
      ],
      think:
        "Hajar knew that running between the hills would not bring water. So why did she run? What does that teach you when you are stuck with nothing you can do?",
      tryToday:
        "If you have a problem today you think you cannot solve, take one small step in it, and then say: Allah is enough for me.",
    },
  },
  "women/bilqis": {
    title: "Bilqis, the Queen of Sheba",
    hook:
      "The hardest thing for a person to say is: I was wrong. Harder still is saying it as a ruler, in front of all your people, after years of doing that very thing. In today's story, a queen did exactly that.",
    events:
      "She gathered her people and said: {O eminent ones, indeed, to me has been delivered a noble letter.} Then: {Advise me in my affair. I would not decide a matter until you witness for me.} A queen taking counsel. They said: {We are men of strength and of great military might.} We are strong; we can fight. She did not take their advice, and said something wise: {Indeed, kings, when they enter a city, ruin it.} Then she tested him: {But indeed, I will send to them a gift and see with what the messengers return} — is he a king who wants wealth, or someone calling to something else?",
    lesson:
      "The bravest people are those who let go of their own opinion once the truth is clear.",
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
    arc: {
      idea: "A queen who received a letter, took counsel and did not rush — and then gave up her whole position when she saw the truth.",
      setting:
        "Saba was a wealthy kingdom ruled by a woman. The hoopoe said of her when it returned to Sulaiman: {Indeed, I found a woman ruling them, and she has been given of all things, and she has a great throne.} But it mentioned the problem in the same report: {I found her and her people prostrating to the sun instead of Allah.} So Sulaiman sent her a letter calling her not to be haughty with him and to come to him in submission.",
      keyMoment:
        "Sulaiman refused the gift and would not accept it, so she knew he was not after wealth. She came herself. When she arrived she found her own throne already there ahead of her; then she entered the palace and took the floor for water and uncovered her shins, and was told: {It is a palace whose floor is made smooth with glass.} Glass, not water. And here is the moment: a clear-minded woman understood in a single instant that her own eyes can deceive her, and that what she sees is not always what it is. So she said: {My Lord, indeed I have wronged myself, and I submit with Sulaiman to Allah, Lord of the worlds.}",
      resolution:
        "Look exactly at what she said — there are two lessons in her words. She said \"I have wronged myself\" — not \"my people wronged me,\" and not \"this is how I found my forefathers.\" And she said \"I submit with Sulaiman to Allah\" — with Sulaiman, not to Sulaiman; submitting to Allah alone, with Sulaiman beside her and not above her. A queen who left what she had been on in front of all her people, and saw in it no defeat and nothing to be ashamed of.",
      word: { term: "A palace smoothed with glass", meaning: "A smooth floor made of glass, which anyone looking at it takes for water." },
      lessons: [
        "Take counsel before you decide; \"I would not decide a matter until you witness for me.\"",
        "Do not rush into a fight; she chose to make sure before making war.",
        "Say \"I was wrong\" without hunting for whoever passed the mistake on to you.",
      ],
      think:
        "The queen said \"I have wronged myself,\" and she could have said \"this is how I found my people and my forefathers.\" Why do you think she chose to carry it herself?",
      tryToday:
        "If it becomes clear today that you were wrong about something, even something small, say it out loud: I was wrong.",
    },
  },
  "women/imraat_alaziz": {
    title: "The Wife of al-Aziz",
    hook:
      "What happens if you do something wrong and let someone else be punished in your place? In today's story, an innocent young man spent years in prison because of what one woman said. And then came a day when she stood in front of everyone and told the truth.",
    events:
      "She sought to tempt him, closed the doors, and called him to what would not please Allah. He said one sentence: {I seek the refuge of Allah. Indeed, he is my master, who has made good my residence.} I seek Allah's protection — and this man treated me well, so how could I betray him? And he ran for the door. She accused him in front of her husband, and a witness from her own family testified from his shirt that he was truthful and that she was the one who had sought him. And even so: {Then it appeared to them after they had seen the signs that he should be imprisoned for a time.} They imprisoned him after seeing the proof of his innocence with their own eyes.",
    lesson:
      "Tell the truth even when it is against you, and even if it comes late.",
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
    arc: {
      idea: "A woman whose lie kept an innocent man in prison for years — and who finally told the truth in front of everyone.",
      setting:
        "Yusuf was sold in Egypt, and bought by al-Aziz, one of the leading men, who said to his wife: {Make his residence comfortable. Perhaps he will benefit us, or we will adopt him as a son.} So Yusuf grew up in their house. The Quran does not give this woman's name; it calls her \"the wife of al-Aziz,\" and nothing said about naming her is established.",
      keyMoment:
        "Years passed with him in prison. Then the king wanted him released, and Yusuf refused to come out until his innocence was known: {Return to your master and ask him what is the case of the women who cut their hands.} The women were gathered and questioned, and said: {Perfect is Allah! We know about him no evil.} And here she spoke, in front of them all: {Now the truth has become evident. It was I who sought to seduce him, and indeed, he is of the truthful.} Now the truth has come out; I am the one who was wrong, and he is truthful.",
      resolution:
        "Then she added a sentence showing she had understood what had happened to her: {And I do not acquit myself. Indeed, the soul is a persistent enjoiner of evil, except those upon which my Lord has mercy.} I do not clear myself; the soul pushes its owner towards wrong, except whoever Allah has mercy on. And Yusuf came out of prison with a clean name, so that no one afterwards could say he was released without the matter being settled. The confession came years late — but it came, and that is better than never.",
      word: { term: "The truth has become evident", meaning: "It has come out clearly and settled, after being hidden and mixed with other things." },
      lessons: [
        "If you are invited to something that would displease Allah, say \"I seek Allah's refuge,\" and walk away without arguing.",
        "Never let an innocent person be punished for something you did.",
        "A late confession is better than one that never comes.",
      ],
      think:
        "Yusuf refused to leave prison until his innocence was clear, though he could have walked out that day. Why do you think he chose to wait?",
      tryToday:
        "If someone is being blamed today for something you did, tell the truth before the day ends.",
    },
  },
  "women/nuh_lut": {
    title: "The Wife of Nuh and the Wife of Lut",
    hook:
      "Is it enough to be in a righteous household to be righteous yourself? There is a verse in the Quran that answers this as clearly as it can be answered, and in it Allah gives the example of two women who lived in the two finest homes on earth in their time.",
    events:
      "Notice the word {but they both betrayed them}, because something other than its meaning may come to mind. The scholars said the betrayal here is betrayal in religion: they did not believe, and they stood with the people against the two prophets, passing things to them and taking their side. The wives of prophets are protected from anything beyond that. So Nuh's wife lived with a man who called his people for nine hundred and fifty years and heard him every day; and Lut's wife lived in the house of the only man in the town who told people: this is not right.",
    lesson:
      "No one else's deeds will help you on the Day of Judgement; only your own will.",
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
    arc: {
      idea: "Two women in the houses of two prophets, whom the house did not help — and a woman in Pharaoh's house, whom the house did not harm.",
      setting:
        "At the end of Surah At-Tahrim, Allah gives three examples in a row: two of people whose household did not help them, then two of women whom their surroundings did not harm. First: {Allah presents an example of those who disbelieved: the wife of Nuh and the wife of Lut. They were under two of Our righteous servants, but they both betrayed them.} Two prophets, two households, and complete closeness to what is good.",
      keyMoment:
        "Then the outcome comes in half a verse: {So they did not avail them from Allah at all, and it was said, enter the Fire with those who enter.} Two prophets availed them nothing. That is the clearest thing in this whole chapter: closeness to someone righteous does not make you righteous. They heard the truest words on earth, and then chose otherwise. Nearness to good gives you the chance; it does not give you the outcome. The outcome is made by your own choosing.",
      resolution:
        "When Allah commanded Nuh to take his family aboard the ship, the exception came: {except those against whom the word has already been decreed.} When Lut was told to leave with his family by night, he was told: {except your wife.} Then Allah closed the three examples with the wife of Pharaoh and Maryam, daughter of Imran: one in the worst house on earth who was saved, and one raised in the sanctuary who believed. The house does not decide; the person in it decides.",
      word: { term: "They both betrayed them", meaning: "They betrayed them in religion: they did not believe and stood with the deniers — not a betrayal of honour; the wives of prophets are protected from that." },
      lessons: [
        "Do not lean on your household or your lineage; every soul is held for what it earned.",
        "Nearness to good is an opportunity; the choice remains yours.",
        "Whoever lived beside the truth and did not take it has seen it without benefiting from it.",
      ],
      think:
        "Nuh's wife heard her husband's call for centuries and did not answer. Is there advice you hear at home every day and do not act on? What stops you?",
      tryToday:
        "Pick one piece of advice you hear from your mother or father every day, and act on it fully once today — before they ask you to.",
    },
  },
};
