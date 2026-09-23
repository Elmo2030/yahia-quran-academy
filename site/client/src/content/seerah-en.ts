// =============================================================================
// seerah-en.ts — the English Seerah, fetched only by an English reader.
//
// It rode inside seerah.ts, so every Arabic reader of one Seerah story
// downloaded all hundred English stories with it (226 of seerah.ts's 470 KB).
// seerahEnglishText() in seerah-english.ts imports this file on demand.
// Keyed by slug; prerender.mjs and build-seo.mjs read it too.
// =============================================================================

import type { SeerahText } from "./seerah";

export const seerahEnglish: Record<string, SeerahText> = {
  "birth-of-light": {
    "title": "The Day Mecca Shone",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On a beautiful spring day, a wonderful baby named 'Muhammad' was born. Before his birth, a huge army with a giant elephant tried to destroy the Kaaba! But Allah sent brave little birds to chase the bad guys away and protect Mecca. When baby Muhammad (peace be upon him) was born, his grandfather was so happy and carried him to the Kaaba to thank Allah.",
        "shortLesson": "Allah is very powerful. He always protects His house and good children."
      },
      "tier_2_age_9_11": {
        "narrative": "In the 'Year of the Elephant', an evil king named Abraha tried to destroy the Kaaba with a massive army and a giant elephant. But Allah sent birds in flock after flock — that is what ababil means — pelting them with small stones of sijjil, which destroyed the army and protected Mecca. In that exact same year, Mecca was blessed with the birth of Prophet Muhammad (peace be upon him). He was born an orphan because his father, Abdullah, died before his birth. His grandfather, Abdul Muttalib, was overjoyed, took him inside the Kaaba, and named him Muhammad, which means 'The highly praised one'.",
        "details": "Did you know that the name 'Muhammad' was very rare in Arabia at that time? Allah inspired his grandfather to give him this beautiful name."
      }
    },
    "interactive": {
      "discover": "The Prophet's father was named Abdullah, and his mother was Aminah bint Wahb.",
      "value": {
        "name": "Allah's Protection",
        "icon": "🛡️"
      },
      "thinkQuestion": "Why do you think Allah chose for the Prophet to be born in the same year the great miracle of the elephant happened?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What huge animal did the evil army use to try to destroy the Kaaba?",
        "options": [
          "Horse",
          "Lion",
          "Elephant",
          "Camel"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Stone of Sijjil",
        "description": "A keepsake to remind you that true power belongs to Allah."
      },
      "badge": "Badge: Child of Mecca"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, Authentic Seerah",
      "note": "Events are confirmed by the Quran (Surah Al-Fil) and authentic Seerah."
    }
  },
  "desert-breeze": {
    "title": "The Pure Desert Breeze",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "A long time ago, children used to go live in the desert to become brave and strong. Little Muhammad (pbuh) went to live with a kind lady named Halimah. The moment he entered her house, something magical happened! The house filled with joy, there was plenty of milk, and green grass grew for their animals. Halimah loved him so much!",
        "shortLesson": "A good and obedient child brings happiness and blessings to their family everywhere they go."
      },
      "tier_2_age_9_11": {
        "narrative": "It was an Arab custom to send babies to the desert (Badia) to breathe fresh air, grow strong bodies, and learn pure Arabic. A kind lady named Halimah took Prophet Muhammad (pbuh) to nurse him. Even though her family was poor and their animals were weak, the moment the Prophet arrived, amazing 'Barakah' (blessings) filled their lives! Her camel became fast, the sheep gave plenty of milk, and they lived happily the whole time he stayed with them.",
        "details": "Barakah means an increase in goodness. The Prophet (pbuh) was blessed since childhood, bringing joy to everyone around him."
      }
    },
    "interactive": {
      "discover": "The Prophet (pbuh) spent about four years in the desert learning the most beautiful and clear Arabic.",
      "value": {
        "name": "Blessing & Contentment",
        "icon": "✨"
      },
      "thinkQuestion": "If you went camping in the desert far away from electronics, what new skill would you like to learn?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the name of the kind lady who nursed the Prophet (pbuh) in the desert?",
        "options": [
          "Aminah",
          "Halimah",
          "Khadijah",
          "Fatimah"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "Wooden Milk Bowl",
        "description": "Symbolizes the goodness and blessings that filled Halimah's home."
      },
      "badge": "Badge: Desert Speaker"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Sealed Nectar, Sahih Muslim",
      "note": "Halimah's story and the blessings are well-documented in authentic Seerah books."
    }
  },
  "grandfather-love": {
    "title": "In the Shade of the Kaaba",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When Muhammad (pbuh) was a little boy, his mother returned to Allah (passed away). He was now an orphan with no mom or dad. But his kind grandfather, Abdul Muttalib, hugged him tightly and loved him more than anyone else! His grandpa had a special rug in the shade of the Kaaba, and he only allowed little Muhammad to sit on it with him.",
        "shortLesson": "Grandparents love us very much. We must always respect them and sit with them politely."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet (pbuh) was six years old, his mother Aminah passed away in a place called Al-Abwa. His grandfather, Abdul Muttalib, the leader of Quraish, felt deep sorrow for his orphaned grandson and took him under his loving care. Abdul Muttalib had a special rug placed in the shade of the Kaaba. None of his grown sons dared to sit on it out of respect. But whenever little Muhammad (pbuh) came, his grandfather would seat him right next to him, saying: 'This son of mine will have a great future.'",
        "details": "Being an orphan is not a weakness. It was Allah's way of preparing His Prophet to rely entirely on Him from a very young age."
      }
    },
    "interactive": {
      "discover": "Abdul Muttalib passed away when the Prophet (pbuh) was eight years old, after giving him great love and safety.",
      "value": {
        "name": "Family Affection",
        "icon": "👴"
      },
      "thinkQuestion": "Who is the person in your family that you feel loves and spoils you just like Abdul Muttalib did?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Where did Abdul Muttalib place his special rug to sit?",
        "options": [
          "In the market",
          "In the shade of the Kaaba",
          "On top of a mountain",
          "Inside a tent"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Leader's Rug",
        "description": "Symbolizes the high status of the Prophet (pbuh) and his grandfather's love."
      },
      "badge": "Badge: Grandson of the Leader"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, Zad al-Ma'ad",
      "note": "Abdul Muttalib's care and the rug story are historically authentic."
    }
  },
  "uncle-home": {
    "title": "The Kind Uncle's House",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After his grandfather died, Muhammad (pbuh) moved in with his uncle Abu Talib. His uncle didn't have much money and had many children, but he loved Muhammad deeply. Something magical used to happen! When Muhammad sat to eat with them, the small amount of food was always enough to make everyone full, because Allah put blessings in it.",
        "shortLesson": "Sharing our food with family and siblings makes it delicious and enough for everyone."
      },
      "tier_2_age_9_11": {
        "narrative": "Before he died, Abdul Muttalib asked his son Abu Talib to take care of Muhammad (pbuh). Abu Talib didn't have much wealth but had a large family. Still, he welcomed his nephew and loved him even more than his own kids. Abu Talib noticed something amazing: when his children ate without Muhammad, they wouldn't feel full, but when he ate with them, they all felt satisfied! The Prophet (pbuh) was always content, never complained about food, and learned patience in his uncle's house, who protected him for over 40 years.",
        "details": "Abu Talib didn't accept Islam, but Allah chose him to protect and defend the Prophet (pbuh) fiercely throughout his life."
      }
    },
    "interactive": {
      "discover": "Ali bin Abi Talib (the great companion) is the Prophet's cousin. They grew up together in this very house.",
      "value": {
        "name": "Contentment & Sharing",
        "icon": "🍲"
      },
      "thinkQuestion": "If you have a small amount of candy and a lot of friends, how would you act like the Prophet?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Who took care of the Prophet (pbuh) after his grandfather passed away?",
        "options": [
          "His uncle Abu Lahab",
          "His uncle Abu Talib",
          "Abu Bakr",
          "His uncle Al-Abbas"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Blessed Clay Bowl",
        "description": "Symbolizes blessings and contentment in Abu Talib's home."
      },
      "badge": "Badge: The Sharing Soul"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Tabaqat Ibn Sa'd, Prophetic Seerah",
      "note": "Abu Talib's guardianship is a central, authentic part of the Seerah."
    }
  },
  "little-shepherd": {
    "title": "The Shepherd",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In Mecca, Muhammad (pbuh) tended sheep for its people for payment. How do we know? He later told his companions about this work. When they asked whether he too had been a shepherd, he said that he had tended sheep for the people of Mecca. This account is recorded in Sahih al-Bukhari 2262.",
        "shortLesson": "We grow in responsibility by patiently caring for what is entrusted to us."
      },
      "tier_2_age_9_11": {
        "narrative": "In Mecca, Muhammad (pbuh) tended sheep for its people for payment. Later, he told his companions that every prophet had tended sheep. They asked whether he had done so too. He answered that he had tended sheep for the people of Mecca for qirats. This brief account gives us a glimpse of work he did before prophethood. Caring for animals involves attention and responsibility. You may not care for sheep, but you can practise responsibility by looking after something you have borrowed, caring for a plant, or finishing a task you have begun.",
        "details": "Sahih al-Bukhari 2262 records this account from Abu Huraira. It does not specify the Prophet's age when he tended sheep or his personal reasons for taking the work. The reflection on responsibility is a learning activity, not an additional historical report."
      }
    },
    "interactive": {
      "discover": "What is the difference between starting a task and remaining responsible for it until it is finished?",
      "value": {
        "name": "Responsibility & Patience",
        "icon": "🐑"
      },
      "thinkQuestion": "What is one small chore you can do at home today to help your family?",
      "challenge": {
        "type": "multiple_choice",
        "question": "According to Sahih al-Bukhari 2262, what work did the Prophet (pbuh) do for the people of Mecca?",
        "options": [
          "Blacksmith",
          "Shepherd",
          "Fisherman",
          "Farmer"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Shepherd's Staff",
        "description": "A symbol of patience, care, and merciful leadership."
      },
      "badge": "Badge: The Responsible Shepherd"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari 2262, Book of Hiring, narrated by Abu Huraira",
      "note": "The hadith establishes shepherding for the people of Mecca for payment. It does not specify his age or personal motivations. The lesson on responsibility is an educational reflection."
    }
  },
  "the-honest-merchant": {
    "title": "The Honest Merchant of Mecca",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "As Muhammad (pbuh) grew into a young man, he started working in trade (buying and selling). He traveled far away to sell goods. Do you know why everyone loved him? Because he always told the truth and never cheated anyone, even if it meant losing money. That's why the people of Mecca gave him a beautiful nickname: 'Al-Sadiq Al-Amin' (The Truthful and Trustworthy)!",
        "shortLesson": "An honest and trustworthy person is loved by Allah and trusted by everyone."
      },
      "tier_2_age_9_11": {
        "narrative": "In his youth, the Prophet (pbuh) joined his uncle Abu Talib on trading journeys to the Levant (Sham). There, he learned the art of trade. He quickly became famous throughout Mecca for his great character. He never lied, never cheated when weighing items, and always kept people's money safe when they trusted him with it. Because of these rare morals in a society full of deception, the people of Mecca called him 'Al-Sadiq Al-Amin' (The Truthful and Trustworthy), and everyone trusted him completely.",
        "details": "Honesty is not just about keeping money safe; it is about telling the truth, doing your job perfectly, and never tricking others."
      }
    },
    "interactive": {
      "discover": "The Prophet (pbuh) was so famous for his honesty that even his enemies would leave their money with him for safekeeping!",
      "value": {
        "name": "Honesty & Trust",
        "icon": "⚖️"
      },
      "thinkQuestion": "If you found a beautiful pen in class and knew it belonged to your friend, what would you do to be 'trustworthy'?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What nickname did the people of Mecca give the Prophet (pbuh) for his honesty?",
        "options": [
          "The Brave",
          "The Strong",
          "Al-Sadiq Al-Amin",
          "The Leader"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Golden Scale",
        "description": "Symbolizes fairness and honesty in dealing with people."
      },
      "badge": "Badge: The Honest Merchant"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah",
      "note": "The title 'Al-Sadiq Al-Amin' and his work in trade are historically confirmed facts."
    }
  },
  "khadijah": {
    "title": "The Righteous Wife Khadijah",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "There was a very kind and smart lady in Mecca named Khadijah. She was a wealthy businesswoman. When she heard about Muhammad's (pbuh) honesty, she asked him to work for her. When she saw his great manners and success, she wished to marry him. They got married and lived a beautiful life full of love and respect.",
        "shortLesson": "Good manners are the most beautiful thing a person can have, and they make people love us."
      },
      "tier_2_age_9_11": {
        "narrative": "Lady Khadijah bint Khuwaylid was one of the greatest and wealthiest women of Quraish. When she heard of 'Al-Sadiq Al-Amin', she hired the Prophet (pbuh) to trade her goods in Sham and sent her servant Maysarah with him. Maysarah returned amazed by the Prophet's manners and kindness. Khadijah was more impressed by his noble character than the profits he made, so she offered to marry him. The Prophet (pbuh) agreed, and she became his first and most important wife, always supporting him.",
        "details": "The Prophet (pbuh) had all his children with Lady Khadijah (Al-Qasim, Abdullah, Zainab, Ruqayyah, Umm Kulthum, and Fatimah) except for Ibrahim."
      }
    },
    "interactive": {
      "discover": "Lady Khadijah was nicknamed 'The Pure One' (Al-Tahirah) in Mecca for her high morals even before Islam.",
      "value": {
        "name": "Respect & Love",
        "icon": "❤️"
      },
      "thinkQuestion": "How can you show respect to your mother at home, just like the Prophet (pbuh) respected his family?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What is the name of the great lady the Prophet (pbuh) married after trading her goods?",
        "options": [
          "Halimah",
          "Aminah",
          "Khadijah",
          "Aishah"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "Khadijah's Lantern",
        "description": "Symbolizes warmth, love, and support in the Prophet's family."
      },
      "badge": "Badge: The Loving Family"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Al-Bukhari, Ibn Hisham's Seerah",
      "note": "The Prophet's marriage to Lady Khadijah is unanimously agreed upon in sources."
    }
  },
  "the-black-stone": {
    "title": "The Wisdom of the Black Stone",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "One day, a part of the Kaaba was damaged, so the people worked together to rebuild it. But they had a big argument: who would get to put the 'Black Stone' back in its place? They almost started a fight! Suddenly, Muhammad (pbuh) walked in. They were happy and said, 'This is the Trustworthy one, we accept his judgment!' Muhammad used his cleverness; he put the stone on a large cloth and asked each group to hold a corner. They lifted it together, and he pushed it into place with his own hands. That's how he stopped a fight!",
        "shortLesson": "A smart person is the one who solves problems between friends so they don't fight."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet (pbuh) was 35 years old, Quraish rebuilt the Kaaba after a strong flood damaged it. The tribes worked together peacefully until it was time to place the 'Black Stone'. Every tribe wanted this great honor, and the disagreement grew so fierce that a war almost started. They agreed that the first man to enter the gate would judge between them, and it was the Prophet (pbuh). With his great wisdom, he asked for a cloak, placed the stone in the middle, and asked the leader of each tribe to hold an edge. They lifted it together, and the Prophet placed the stone in its spot, preventing a war and satisfying everyone.",
        "details": "This great event proves that the Prophet (pbuh) was a leader and a peacemaker even before he received revelation."
      }
    },
    "interactive": {
      "discover": "The Black Stone is located in the eastern corner of the Kaaba, and that is where the Tawaf (circumambulation) begins.",
      "value": {
        "name": "Wisdom & Peace",
        "icon": "🕊️"
      },
      "thinkQuestion": "If your friends argued over who gets to be the team captain in a game, how would you solve the problem cleverly?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet (pbuh) use to solve the problem of the Black Stone?",
        "options": [
          "A wooden stick",
          "A cloak (piece of cloth)",
          "A wooden box",
          "A sword"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Cloak of Peace",
        "description": "Symbolizes teamwork and solving disagreements wisely."
      },
      "badge": "Badge: The Peacemaker"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Musnad Ahmad, Ibn Hisham's Seerah",
      "note": "The story of the Black Stone is authentic and highlights his leadership before Prophethood."
    }
  },
  "hilf-al-fudul": {
    "title": "Helping the Oppressed",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "A stranger came to Mecca to sell his goods, but a bad man took his stuff and didn't pay him. The stranger cried because he was treated unfairly. So, Muhammad (pbuh) met with the good men of Mecca, and they made a great promise called 'Hilf al-Fudul'. They said: 'We must help anyone who is wronged and get their rights back.' And they did get the man's money back!",
        "shortLesson": "We must always help the weak and never side with the unfair oppressor."
      },
      "tier_2_age_9_11": {
        "narrative": "One of the leaders of Mecca wronged a stranger from Yemen by refusing to pay for his goods. The oppressed man stood on a mountain and shouted for help. The noble men of Mecca gathered in the house of a man named Abdullah bin Jud'an and made a great pact called 'Hilf al-Fudul' (The Alliance of Virtues). They agreed that if they found anyone oppressed in Mecca, they would stand with him against the oppressor until his rights were restored. The Prophet (pbuh) was in his twenties and attended this pact. Later, as a Prophet, he said: 'If I were called to it in Islam, I would respond,' because Islam supports justice.",
        "details": "The Prophet (pbuh) taught us that religion and good morals always agree on helping the oppressed, no matter their background."
      }
    },
    "interactive": {
      "discover": "'Hilf al-Fudul' means 'The Alliance of Virtues' because it was based on noble morals and justice.",
      "value": {
        "name": "Justice & Helping the Weak",
        "icon": "🤝"
      },
      "thinkQuestion": "If you saw an older kid bullying a younger kid at school, what would you do?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the name of the great agreement the Prophet (pbuh) attended to help the oppressed?",
        "options": [
          "Hilf al-Fudul",
          "The Pact of Mecca",
          "The Peace Agreement",
          "The Trade Contract"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Document of Justice",
        "description": "Reminds you to always stand by the weak and oppressed."
      },
      "badge": "Badge: Defender of the Weak"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sunan Al-Bayhaqi, Prophetic Seerah",
      "note": "His attendance at Hilf al-Fudul is authentic and shows his inclination to justice."
    }
  },
  "cave-of-hira": {
    "title": "Solitude and Reflection",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the time of the Prophet (pbuh), people used to worship stone statues (idols). But Muhammad (pbuh) was very smart, and he knew that stones couldn't help or harm anyone. So, he liked to go to a quiet cave on top of a mountain called the 'Cave of Hira' to sit alone and think: Who created this beautiful sky? Who made the mountains? He only worshipped Allah, the Great Creator.",
        "shortLesson": "Using our minds and thinking about the sky and nature helps us know the greatness of Allah."
      },
      "tier_2_age_9_11": {
        "narrative": "As the years passed, the Prophet (pbuh) saw his people bowing down to stone idols. His heart completely rejected these actions, and he never bowed to an idol. He began to prefer solitude and quietness. He would take some water and dates and climb up to a small cave at the top of 'Mount Noor' called the 'Cave of Hira'. He would spend days and nights there looking at the stars and the vast universe, thinking about the Great Creator who made this masterpiece. Through this quiet reflection, Allah was preparing him to receive the greatest message in history.",
        "details": "Reflecting on Allah's creation (the sky, the stars, the mountains) is an act of worship that increases faith in the heart."
      }
    },
    "interactive": {
      "discover": "The mountain where the Cave of Hira is located is called 'Jabal al-Noor' (The Mountain of Light) because it is where the light of revelation began.",
      "value": {
        "name": "Reflection & Meditation",
        "icon": "🌌"
      },
      "thinkQuestion": "What is something in nature (like the stars, the sea, or trees) that makes you wonder about Allah's power?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What is the name of the cave where the Prophet (pbuh) used to reflect on Allah's creation?",
        "options": [
          "Cave of Thawr",
          "Cave of Hira",
          "Cave of Mecca",
          "Cave of Noor"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Simple Water Skin",
        "description": "Symbolizes simplicity, calmness, and reflection in the Cave of Hira."
      },
      "badge": "Badge: The Smart Thinker"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Al-Bukhari",
      "note": "His worship and reflection in the Cave of Hira are authenticated in the two Sahihs."
    }
  },
  "revelation-iqra": {
    "title": "The First Light: Cave Hira and the Word Iqra",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Prophet Muhammad (pbuh) loved to sit alone in a quiet cave on a mountain called Cave Hira, thinking about the sky and the earth and who made them. One night in Ramadan, when he was forty years old, the angel Jibril came to him suddenly and said: “Read!” The Prophet (pbuh) answered, frightened: “I cannot read.” Then Jibril recited to him the first verses of the Quran. He went home trembling, and his wife Khadijah welcomed him and comforted him: “By Allah, Allah will never disgrace you.”",
        "shortLesson": "The very first word of the Quran is “Read” — knowledge is where the road begins."
      },
      "tier_2_age_9_11": {
        "narrative": "Prophet Muhammad (pbuh) loved to spend time alone. He would go to a cave at the top of a mountain called Cave Hira, sitting there for days thinking about the creation of the heavens and the earth. When he reached forty years of age, during the month of Ramadan, the angel Jibril suddenly came down to him. Jibril held him tightly and said: “Read.” The Prophet (pbuh), frightened and amazed, replied: “I cannot read.” This happened three times, and then Jibril recited the very first verses of the Quran. The Prophet (pbuh) returned home trembling from the intensity of it, and his wife Lady Khadijah welcomed him and comforted him, saying: “By Allah, Allah will never disgrace you. You keep good relations with your family, you speak the truth, and you help the weak.”",
        "details": "The first verses ever revealed: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ﴾ — “Read, in the name of your Lord who created.”"
      }
    },
    "interactive": {
      "discover": "The first revelation was five verses of Surah Al-Alaq, beginning with “Read”.",
      "value": {
        "name": "Knowledge and reading",
        "icon": "📖"
      },
      "thinkQuestion": "Why do you think the first word the angel said to the Prophet (pbuh) was “Read”, and not something else?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the first word of the Quran revealed to the Prophet (pbuh)?",
        "options": [
          "Write",
          "Read",
          "Stand",
          "Listen"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Pen of Light",
        "description": "A keepsake to remind you that knowledge is the first thing Allah commanded."
      },
      "badge": "Badge: First of the Readers"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, the Book of the Beginning of Revelation",
      "note": "The account of the first revelation at Cave Hira is established in Sahih al-Bukhari."
    }
  },
  "revelation-waraqah": {
    "title": "Waraqah ibn Nawfal: The Great Secret",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Lady Khadijah took the Prophet (pbuh) to her cousin Waraqah ibn Nawfal, a wise old man who read the ancient holy books. When Waraqah heard what had happened in the cave, he was delighted and said: this is the same angel who came to Musa! He told the Prophet (pbuh) that he was the prophet of this nation, that his people would harm him, and he wished he were young and strong enough to stand with him.",
        "shortLesson": "When something is hard to understand, we ask people of knowledge and wisdom."
      },
      "tier_2_age_9_11": {
        "narrative": "Lady Khadijah took the Prophet (pbuh) to her cousin Waraqah ibn Nawfal. He was a wise man and a scholar of the ancient holy books, the Torah and the Gospel. When Waraqah heard what had happened to the Prophet (pbuh) in the cave, he was overjoyed and told him: this is the Namus — the angel Jibril — whom Allah sent down to Musa. He told him that he was the prophet of this nation, and warned him that his people would fight him and drive him out of Mecca. Waraqah wished he were a strong young man so that he could support the Prophet (pbuh) on the day people turned against him. With those words, the Prophet's heart settled and he was certain of his message.",
        "details": "Allah says of the People of the Book: ﴿الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمْ﴾ — they know him as they know their own sons."
      }
    },
    "interactive": {
      "discover": "Waraqah ibn Nawfal was Lady Khadijah's cousin.",
      "value": {
        "name": "Asking those who know",
        "icon": "🧭"
      },
      "thinkQuestion": "If you met a hard question you could not answer, who is the wise person at home or at school you would ask?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Waraqah call the angel who came to the Prophet (pbuh)?",
        "options": [
          "A king of the Arabs",
          "The Namus who came to Musa",
          "A man of Mecca",
          "A merchant from Sham"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An Ancient Scroll",
        "description": "A scroll to remind you that old knowledge pointed to the truth."
      },
      "badge": "Badge: Seeker of Wisdom"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, the Book of the Beginning of Revelation",
      "note": "Khadijah taking the Prophet (pbuh) to Waraqah is established in Sahih al-Bukhari."
    }
  },
  "revelation-pause": {
    "title": "The Pause of Revelation and Surah Ad-Duha",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After that first meeting, Jibril was delayed and did not come to the Prophet (pbuh) for a while. He grew sad and missed hearing the words of Allah, and some of the idol-worshippers began to mock him, saying: his Lord has left him! Then Jibril came down with a whole surah to reassure him that Allah had not left him and was not angry with him, and that what was coming was better.",
        "shortLesson": "Allah never forgets His servants, and after hardship comes ease."
      },
      "tier_2_age_9_11": {
        "narrative": "After the first meeting in the cave, the angel Jibril was delayed and did not come down to the Prophet (pbuh) for a period known as the pause of revelation. The Prophet (pbuh) became very sad and longed to hear the words of Allah. Some of the idol-worshippers began to mock him, saying: Muhammad's Lord has abandoned him and is angry with him. That made his sadness heavier — until the light returned. Jibril came down with an entire surah full of love, reassurance and comfort, telling the Prophet (pbuh) that Allah had never left him, was never angry with him, and that what lay ahead was better than what had passed.",
        "details": "Allah comforts him in Surah Ad-Duha: ﴿مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ﴾."
      }
    },
    "interactive": {
      "discover": "The whole of Surah Ad-Duha came down to comfort the Prophet (pbuh) after the pause.",
      "value": {
        "name": "Calm after sadness",
        "icon": "🌅"
      },
      "thinkQuestion": "When you feel sad, what words settle your heart? And who do you like to hear them from?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which surah came down to comfort the Prophet (pbuh) after the pause of revelation?",
        "options": [
          "Surah Al-Fil",
          "Surah Ad-Duha",
          "Surah Al-Kawthar",
          "Surah Al-Asr"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Light of Morning",
        "description": "A ray to remind you that ease follows every hardship."
      },
      "badge": "Badge: A Settled Heart"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Surah Ad-Duha, and Sahih al-Bukhari",
      "note": "The occasion of Surah Ad-Duha following the pause is established in Sahih al-Bukhari."
    }
  },
  "revelation-muddaththir": {
    "title": "O You Wrapped in Garments: Arise and Warn",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "One day as the Prophet (pbuh) was walking, he heard a voice from the sky. He looked up and saw Jibril between the sky and the earth. He hurried home saying: “Cover me, cover me!” And while he lay covered, Jibril came down with verses commanding him to rise, to leave his rest, and to call people to worship Allah alone.",
        "shortLesson": "When there is important work to do, we leave our comfort and get up."
      },
      "tier_2_age_9_11": {
        "narrative": "One day as the Prophet (pbuh) was walking, he heard a voice from the sky. He raised his head and saw the angel Jibril seated on a great throne between the sky and the earth. Overwhelmed by the majesty of it, he hurried home trembling and said: “Cover me, cover me,” meaning wrap me in garments. And while he lay covered in his bed, Jibril came down with powerful verses commanding him to leave the blanket and the rest, to rise at once and begin the work: to warn the people and teach them to worship Allah alone and leave the idols. The time for rest was over, and the time to build a nation had begun.",
        "details": "Allah commands him to work: ﴿يَا أَيُّهَا الْمُدَّثِّرُ ۝ قُمْ فَأَنذِرْ ۝ وَرَبَّكَ فَكَبِّرْ﴾ — “O you wrapped in garments, arise and warn.”"
      }
    },
    "interactive": {
      "discover": "“Al-Muddaththir” means the one wrapped up in his cloak.",
      "value": {
        "name": "Resolve and work",
        "icon": "🌄"
      },
      "thinkQuestion": "What important thing are you putting off that you could get up and do today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet (pbuh) say when he came home after seeing Jibril?",
        "options": [
          "Give me water",
          "Cover me",
          "Open the door",
          "Leave me"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Cloak",
        "description": "A cloak to remind you that rest ends when the work calls."
      },
      "badge": "Badge: The Determined"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, the Book of the Beginning of Revelation",
      "note": "The “cover me” account and the first verses of Surah Al-Muddaththir are in Sahih al-Bukhari."
    }
  },
  "revelation-forms": {
    "title": "How Did the Revelation Come?",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The revelation did not come in only one way. At first the Prophet (pbuh) would see a dream in his sleep and it would come true in the morning. After the prophethood, Jibril would sometimes come in the form of a man, and sometimes the revelation came powerfully like the ringing of a bell — and that was the hardest of all for him.",
        "shortLesson": "We appreciate what the Prophet (pbuh) carried so that this Quran would reach us."
      },
      "tier_2_age_9_11": {
        "narrative": "The revelation did not come in only one way. In the beginning it was a true dream the Prophet (pbuh) would see in his sleep, and it would come to pass the next day like the light of morning. After the prophethood, the angel Jibril would sometimes come in the form of a man, teaching the Prophet (pbuh) gently and easily. And sometimes the revelation came powerfully, like the ringing of a bell — the hardest kind for him — so much so that he would be pouring with sweat on a bitterly cold day, from the weight and the power of the words of Allah.",
        "details": "Allah says of the weight of the Quran: ﴿إِنَّا سَنُلْقِي عَلَيْكَ قَوْلًا ثَقِيلًا﴾ — “We are going to send down to you a weighty word.”"
      }
    },
    "interactive": {
      "discover": "The Quran came down to the Prophet (pbuh) over twenty-three years, not all at once.",
      "value": {
        "name": "Valuing the Quran",
        "icon": "✨"
      },
      "thinkQuestion": "Knowing what the Prophet (pbuh) carried so the Quran would reach you, how will you read it today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which kind of revelation was the hardest on the Prophet (pbuh)?",
        "options": [
          "A dream in his sleep",
          "Jibril in the form of a man",
          "Like the ringing of a bell",
          "Cast into his heart"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Silver Bell",
        "description": "A keepsake for the weight of the word that was carried for you."
      },
      "badge": "Badge: Keeper of the Trust"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, the Book of the Beginning of Revelation",
      "note": "The forms of revelation and the “ringing of a bell” hadith are in Sahih al-Bukhari."
    }
  },
  "dar-al-arqam": {
    "title": "The Great Secret and Dar al-Arqam",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When Allah commanded the Prophet (pbuh) to call people, he began quietly with those closest to him. His wife Khadijah believed, and his friend Abu Bakr, his young cousin Ali ibn Abi Talib, and Zaid ibn Harithah. The first Muslims would gather in the house of a brave young man named al-Arqam ibn Abi al-Arqam, learning the Quran and praying away from the harm of Quraysh.",
        "shortLesson": "A small beginning, kept quiet, can raise the greatest generation."
      },
      "tier_2_age_9_11": {
        "narrative": "After Allah commanded His Prophet Muhammad (pbuh) to call people to Islam, he began secretly with those closest to him. His wife Khadijah believed, and his friend Abu Bakr, his young cousin Ali ibn Abi Talib, and Zaid ibn Harithah. Because Quraysh worshipped idols and refused change, the first Muslims had to meet in secret to learn the Quran and pray. So the Prophet (pbuh) chose a house out of sight belonging to a brave young man named al-Arqam ibn Abi al-Arqam. From that quiet house came a generation that changed the course of history.",
        "details": "Allah says of the first forerunners: ﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنصَارِ﴾ — Allah is pleased with them, and they with Him."
      }
    },
    "interactive": {
      "discover": "This quiet stage of the call lasted about three years.",
      "value": {
        "name": "Good planning",
        "icon": "🏠"
      },
      "thinkQuestion": "Why do you think the Prophet (pbuh) chose a young man's house to meet in, rather than a well-known elder's?",
      "challenge": {
        "type": "multiple_choice",
        "question": "In whose house did the first Muslims meet in secret?",
        "options": [
          "Abu Bakr's house",
          "The house of al-Arqam ibn Abi al-Arqam",
          "Khadijah's house",
          "Ali's house"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Key of Dar al-Arqam",
        "description": "A key to remind you that the greatest beginnings start somewhere small."
      },
      "badge": "Badge: One of the Forerunners"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, Ibn Sa'd's Tabaqat",
      "note": "The first Muslims gathering at Dar al-Arqam is well known in the Seerah literature."
    }
  },
  "mount-safa-call": {
    "title": "Mount Safa and the Great Call",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Allah commanded the Prophet (pbuh) to announce his call to everyone, so he climbed Mount Safa and called out at the top of his voice until the tribes of Quraysh gathered. He asked them: if I told you an army behind this mountain was about to attack you, would you believe me? They said: yes — we have never known you to lie. So he called them to worship Allah alone. His uncle Abu Lahab grew angry, and Allah sent down a whole surah in reply.",
        "shortLesson": "An honest person is believed, even by those who disagree."
      },
      "tier_2_age_9_11": {
        "narrative": "Allah commanded His Prophet (pbuh) to announce Islam to everyone. He climbed Mount Safa and called out at the top of his voice, and all the tribes of Quraysh gathered. He asked them: “If I told you that an army behind this mountain was about to attack you, would you believe me?” They all said: “Yes — we have never known you to tell a lie. You are the truthful, the trustworthy.” He said: “Then I am a warner to you before a severe punishment. Worship Allah alone.” His uncle Abu Lahab grew angry and shouted in his face, and Allah sent down an entire surah defending His Prophet and answering that unjust uncle.",
        "details": "Allah commands the open call: ﴿فَاصْدَعْ بِمَا تُؤْمَرُ﴾, and says of Abu Lahab: ﴿تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ﴾."
      }
    },
    "interactive": {
      "discover": "Surah Al-Masad was revealed about Abu Lahab, the Prophet's own uncle.",
      "value": {
        "name": "Courage in speaking the truth",
        "icon": "📣"
      },
      "thinkQuestion": "Why did the Prophet (pbuh) ask them about his honesty before delivering his message?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the people of Mecca call the Prophet (pbuh) before he delivered his message?",
        "options": [
          "The poet",
          "The truthful, the trustworthy",
          "The horseman",
          "The merchant"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Stone from Safa",
        "description": "A stone for the first call made openly in Mecca."
      },
      "badge": "Badge: Voice of Truth"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, and Surah Al-Masad",
      "note": "The Prophet's call from Mount Safa is established in Sahih al-Bukhari."
    }
  },
  "heroes-of-patience": {
    "title": "Heroes Who Never Give Up: Bilal and the Family of Yasir",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When the Prophet (pbuh) announced his call, the idol-worshippers began to harm the weakest Muslims. They took Bilal ibn Rabah, threw him on the burning desert sand and put a rock on his chest to make him leave his faith — and he kept repeating one word: “Ahad… Ahad.” They tortured Ammar ibn Yasir and his father and his mother Sumayyah, and the Prophet (pbuh) would pass by them and say: “Be patient, family of Yasir — your promise is Paradise.”",
        "shortLesson": "Faith gives the heart a strength that cannot be beaten."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet (pbuh) announced his call, the idol-worshippers began to torture the weakest Muslims, those with no clan to protect them. They took Bilal ibn Rabah, who was a slave, threw him onto the burning desert sand and placed a great rock on his chest so that he would abandon Islam. Brave Bilal kept repeating one word that infuriated them: “Ahad… Ahad” — Allah is One. They also tortured Ammar ibn Yasir, his father, and his mother Sumayyah, who became the first martyr in Islam. The Prophet (pbuh) would pass them as they were being tortured and say: “Be patient, family of Yasir — your promise is Paradise.”",
        "details": "Allah promises the patient: ﴿إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ﴾ — their reward without measure."
      }
    },
    "interactive": {
      "discover": "Abu Bakr bought Bilal and set him free.",
      "value": {
        "name": "Patience and firmness",
        "icon": "🔥"
      },
      "thinkQuestion": "What is the hardest thing you have had to be patient about? What helped you?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which word did Bilal keep repeating under torture?",
        "options": [
          "Ahad, Ahad (One, One)",
          "Patience",
          "Rescue",
          "Mercy"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Grain of Meccan Sand",
        "description": "A keepsake for those who held firm when holding firm was hardest."
      },
      "badge": "Badge: An Unbeaten Heart"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, and Sahih al-Bukhari",
      "note": "The torture of Bilal and the family of Yasir is established in the Seerah; Bukhari records Bilal's story and Abu Bakr freeing him."
    }
  },
  "migration-to-abyssinia": {
    "title": "Journey to the Land of the Just King",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When the harm grew heavy, the Prophet (pbuh) told the Muslims: go to the land of Abyssinia, for there is a king there under whom no one is wronged. Some travelled and crossed the sea. Quraysh sent gifts to King an-Najashi to have them sent back, but he refused until he had heard them. Ja'far ibn Abi Talib stepped forward, spoke about Islam and recited verses from Surah Maryam. The king wept, refused to hand them over, and gave them safety.",
        "shortLesson": "Justice protects the stranger before the neighbour."
      },
      "tier_2_age_9_11": {
        "narrative": "When the torture became too heavy, the Prophet (pbuh) told the Muslims: “Go to the land of Abyssinia, for there is a king there under whom no one is wronged.” Some travelled quietly and crossed the sea into Africa. Quraysh heard of it and sent gifts to King an-Najashi so that he would send the Muslims back, but the just king refused until he had heard from them first. Ja'far ibn Abi Talib stepped forward and spoke, bravely and courteously, about Islam and its manners, then recited verses from the opening of Surah Maryam. An-Najashi wept and said: “This and what Jesus brought come from one and the same lamp.” He refused to hand them over and gave them safety in his land.",
        "details": "Ja'far recited the opening of Surah Maryam: ﴿وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ﴾ — “And mention in the Book, Maryam.”"
      }
    },
    "interactive": {
      "discover": "Abyssinia was the first migration in Islam, before the migration to Madinah.",
      "value": {
        "name": "Justice and dialogue",
        "icon": "⛵"
      },
      "thinkQuestion": "Why did the king insist on hearing both sides before deciding?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which surah did Ja'far recite before an-Najashi?",
        "options": [
          "Surah Yusuf",
          "Surah Maryam",
          "Surah Al-Kahf",
          "Surah Taha"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Small Sail",
        "description": "A sail for the first journey made across the sea for the faith."
      },
      "badge": "Badge: First of the Migrants"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Musnad Ahmad, Ibn Hisham's Seerah",
      "note": "The migration to Abyssinia and Ja'far's speech are reported in Musnad Ahmad and the Seerah literature."
    }
  },
  "year-of-sorrow": {
    "title": "The Unjust Siege and the Year of Sorrow",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh agreed to boycott the Prophet (pbuh) and everyone who stood with him, writing an unjust document and hanging it in the Kaaba. The Muslims lived in a narrow valley between the mountains for three years, until they ate the leaves of trees from hunger. Then honourable men tore the document up and the siege ended. Shortly after, Lady Khadijah died, and so did Abu Talib — which is why that year is called the Year of Sorrow.",
        "shortLesson": "However long injustice lasts, it does not last forever."
      },
      "tier_2_age_9_11": {
        "narrative": "The tribes of Quraysh agreed to boycott the Prophet (pbuh) and everyone who supported him. They wrote an unjust document and hung it inside the Kaaba, forbidding marriage or trade with them. The Muslims were forced to live in a narrow valley between the mountains called the Valley of Abu Talib for three years, until they ate the leaves of trees from sheer hunger. Then Allah relieved them: honourable men of Quraysh rose and tore the document up, and the siege ended. But shortly after came something heavier still — the great Lady Khadijah died, and so did Abu Talib, the uncle who had defended him. That year is called the Year of Sorrow.",
        "details": "Allah teaches him patience: ﴿وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ﴾ — “Be patient, and your patience is only through Allah.”"
      }
    },
    "interactive": {
      "discover": "A shi'b is a narrow pass between two mountains — this one belonged to Abu Talib.",
      "value": {
        "name": "Endurance and standing together",
        "icon": "⛰️"
      },
      "thinkQuestion": "What makes people hold together through a hard time?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How long did the siege in the valley last?",
        "options": [
          "One year",
          "Two years",
          "Three years",
          "Five years"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Tree Leaf",
        "description": "A leaf for those who endured when there was nothing to eat."
      },
      "badge": "Badge: Steadfast of the Valley"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah",
      "note": "The document, the siege in the valley, and the deaths of Khadijah and Abu Talib are well known in the Seerah."
    }
  },
  "islam-of-heroes": {
    "title": "The Islam of Heroes: Hamza and Umar",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Muslims prayed in secret, fearing harm from Quraysh — until the day the Prophet's brave uncle Hamza ibn Abd al-Muttalib grew angry and announced his Islam to defend his nephew. Days later Umar ibn al-Khattab, who had set out with his sword to harm the Prophet (pbuh), heard verses of Surah Taha and believed. The Muslims grew strong and prayed openly at the Kaaba for the first time.",
        "shortLesson": "Allah guides hearts, however hard they look."
      },
      "tier_2_age_9_11": {
        "narrative": "The Muslims were praying in secret, afraid of the harm of Quraysh, until the day the Prophet's brave uncle Hamza ibn Abd al-Muttalib grew angry and announced his Islam to defend his nephew. A few days later came the greater surprise: Umar ibn al-Khattab, who had gone out with his sword to harm the Prophet (pbuh), heard verses from Surah Taha, and his heart shook, and he believed there and then. With Hamza and Umar, the Muslims became strong, and for the first time they walked out in two rows saying “Allahu Akbar” through the streets of Mecca until they reached the Kaaba — and Quraysh did not dare to touch them.",
        "details": "Allah says: ﴿يَا أَيُّهَا النَّبِيُّ حَسْبُكَ اللَّهُ وَمَنِ اتَّبَعَكَ مِنَ الْمُؤْمِنِينَ﴾ — “Allah is sufficient for you, and for the believers who follow you.”"
      }
    },
    "interactive": {
      "discover": "Umar was called al-Farooq — the one by whom truth was distinguished from falsehood.",
      "value": {
        "name": "The guiding of hearts",
        "icon": "🗡️"
      },
      "thinkQuestion": "What changed Umar's heart in a single moment?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which surah did Umar ibn al-Khattab hear before he believed?",
        "options": [
          "Surah Ya-Sin",
          "Surah Taha",
          "Surah Ar-Rahman",
          "Surah An-Nur"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Sheathed Sword",
        "description": "A sword returned to its sheath when truth won over anger."
      },
      "badge": "Badge: A Heart Guided"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, Ibn Sa'd's Tabaqat",
      "note": "The Islam of Hamza and Umar is well known in the Seerah literature."
    }
  },
  "sun-and-moon": {
    "title": "The Sun in My Right Hand, the Moon in My Left",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh sent their leaders to the Prophet (pbuh) offering him wealth and kingship on one condition: that he leave his religion. He gave the answer we still remember: by Allah, if they put the sun in my right hand and the moon in my left so that I would leave this, I would not leave it.",
        "shortLesson": "Truth is worth more than anything that can be bought."
      },
      "tier_2_age_9_11": {
        "narrative": "Quraysh sent their leaders to the Prophet (pbuh), saying: “If you want wealth, we will gather it for you until you are the richest of us; if you want kingship, we will make you our king — on one condition: that you leave this religion.” The offer would have tempted anyone, but the Prophet (pbuh) was not seeking money or power. He gave the decisive answer we still remember: “By Allah, if they put the sun in my right hand and the moon in my left so that I would abandon this matter until Allah makes it prevail, or I perish in it, I would not abandon it.”",
        "details": "Allah says: ﴿قُل لَّا أَتَّبِعُ أَهْوَاءَكُمْ﴾ — “Say: I do not follow your desires.”"
      }
    },
    "interactive": {
      "discover": "They offered him wealth, kingship, and a doctor if he were ill — he refused all three.",
      "value": {
        "name": "Standing by a principle",
        "icon": "☀️"
      },
      "thinkQuestion": "What is the one thing you would not trade, whatever you were offered?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the Prophet (pbuh) answer the offer of wealth and kingship?",
        "options": [
          "He asked for time",
          "He accepted with conditions",
          "Not even for the sun and the moon",
          "He said nothing"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Golden Scale",
        "description": "A scale to remind you that some things have no price."
      },
      "badge": "Badge: Firm on the Truth"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah",
      "note": "This account is well known in the Seerah, reported by Ibn Ishaq without a full chain."
    }
  },
  "splitting-of-the-moon": {
    "title": "A Miracle in the Sky: The Splitting of the Moon",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The disbelievers of Quraysh asked the Prophet (pbuh) for a miracle they could see with their own eyes: split the moon for us. He prayed to his Lord, and the moon split in two before the people — half over one mountain and half over another. Even so they said: Muhammad has bewitched us, and they did not believe.",
        "shortLesson": "Signs are no use to a heart full of pride."
      },
      "tier_2_age_9_11": {
        "narrative": "The disbelievers of Quraysh challenged the Prophet (pbuh): “We will not believe you until you bring a miracle we can see. Split this moon for us.” He prayed to his Lord, and suddenly, before everyone's eyes, the moon split in two: half above one mountain and half above another. The people of Mecca saw it, and so did travellers in the desert. Yet for all the clarity of it, the leaders of Quraysh dug in and said: “Muhammad has bewitched us.” What kept them from believing was not weak evidence but proud hearts.",
        "details": "The Quran records it: ﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ﴾ — “The Hour has drawn near, and the moon has split.”"
      }
    },
    "interactive": {
      "discover": "Surah Al-Qamar is named after this event and opens with it.",
      "value": {
        "name": "Humility before the truth",
        "icon": "🌙"
      },
      "thinkQuestion": "Why did they not believe, even having seen the miracle themselves?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which surah opens by mentioning the splitting of the moon?",
        "options": [
          "Surah An-Najm",
          "Surah Al-Qamar",
          "Surah Ash-Shams",
          "Surah Al-Layl"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Half Moon",
        "description": "A keepsake for a sign people saw, and turned away from."
      },
      "badge": "Badge: Witness to the Sign"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran (Surah Al-Qamar), Sahih al-Bukhari and Muslim",
      "note": "The splitting of the moon is established in the Quran and both Sahih collections."
    }
  },
  "cotton-in-ears": {
    "title": "Cotton in the Ears: The Clever Poet",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "A wise poet named at-Tufayl ibn Amr ad-Dawsi came to Mecca. Quraysh warned him not to hear a word from the Prophet (pbuh), so he put cotton in his ears. Then he thought again: I am a man who understands words — why should I not listen? He took the cotton out, heard the Quran, and became Muslim, saying: by Allah, I have never heard anything better.",
        "shortLesson": "Do not judge a thing before you have heard it yourself."
      },
      "tier_2_age_9_11": {
        "narrative": "A wise poet named at-Tufayl ibn Amr ad-Dawsi came to Mecca. The leaders of Quraysh warned him: “Do not hear a single word from Muhammad — his speech is like magic that splits a man from his own family.” At-Tufayl was afraid and put cotton in his ears while he circled the Kaaba. Then he thought it over: “I am a poet who knows fine speech from foul. What stops me from listening? If it is good, I will accept it.” He took the cotton out, heard the Quran from the Prophet (pbuh), and became Muslim on the spot, saying: “By Allah, I have never heard anything better than this.”",
        "details": "Allah says of the Quran's effect: ﴿تَرَىٰ أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ مِمَّا عَرَفُوا مِنَ الْحَقِّ﴾ — their eyes overflow at the truth they recognise."
      }
    },
    "interactive": {
      "discover": "At-Tufayl went back to his people, Daws, and called them — and they later became Muslim.",
      "value": {
        "name": "Checking before judging",
        "icon": "👂"
      },
      "thinkQuestion": "Have you ever believed something about someone and then found it untrue? What should you have done?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did at-Tufayl put in his ears at first?",
        "options": [
          "Wax",
          "Cotton",
          "Clay",
          "Cloth"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Tuft of Cotton",
        "description": "Cotton to remind you to listen for yourself before you judge."
      },
      "badge": "Badge: The Clever Listener"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah",
      "note": "The story of at-Tufayl ibn Amr ad-Dawsi is well known in the Seerah literature."
    }
  },
  "journey-to-taif": {
    "title": "The Sad Journey to Taif",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After the deaths of Khadijah and Abu Talib the harm grew worse, so the Prophet (pbuh) walked to Taif to call its people. They turned him away and set boys to throw stones at him until his feet bled. He sat and prayed, and the Angel of the Mountains came asking permission to crush them between the two mountains. He refused, saying: rather, I hope Allah brings from their children people who worship Him alone.",
        "shortLesson": "The greatest strength is to forgive when you could strike."
      },
      "tier_2_age_9_11": {
        "narrative": "After the deaths of Lady Khadijah and his uncle Abu Talib, the harm from Quraysh grew worse, so the Prophet (pbuh) decided to walk on foot to the city of Taif, hoping its people would believe and stand with him. But they were hard: they refused his call and set the boys to throw stones at him until blood ran from his noble feet. He sat down, sad and exhausted, and prayed to his Lord. Then the Angel of the Mountains came down and asked his permission to crush them between the two mountains. The Prophet of Mercy refused, and said: “Rather, I hope that Allah will bring forth from their descendants those who worship Allah alone and associate nothing with Him.”",
        "details": "Allah says of his mercy: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — “We sent you only as a mercy to the worlds.”"
      }
    },
    "interactive": {
      "discover": "The people of Taif became Muslim years later, and companions came from among them.",
      "value": {
        "name": "Mercy when you have the power",
        "icon": "🤲"
      },
      "thinkQuestion": "When someone hurts you and you could hit back, what makes you choose to forgive?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet (pbuh) answer the Angel of the Mountains?",
        "options": [
          "He agreed",
          "He asked for time",
          "He refused, hoping for their children",
          "He said nothing"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "An Olive Branch",
        "description": "A branch to remind you that mercy is stronger than revenge."
      },
      "badge": "Badge: A Mercy to the Worlds"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The Angel of the Mountains and the return from Taif are established in both Sahih collections."
    }
  },
  "chest-washing-zamzam": {
    "title": "Preparing the Leader: The Opening of the Chest",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "While the Prophet (pbuh) slept near the Kaaba, heavy with sadness after the journey to Taif, Jibril came down to him with another angel. They opened his chest gently and without pain, washed his noble heart with Zamzam water in a golden basin, filled it with faith and wisdom, and put it back as it was. And so the greatest night in history began.",
        "shortLesson": "A clean heart is the first thing any great work needs."
      },
      "tier_2_age_9_11": {
        "narrative": "While the Prophet (pbuh) was sleeping at night near the Kaaba, weighed down by sadness after the journey to Taif, the angel Jibril came down to him with another angel. They opened his noble chest very gently and without pain, took out his heart and washed it with pure Zamzam water in a golden basin, then filled it with faith and wisdom and strength, so that he would be ready for the great signs he was about to be shown that night. Then they returned his heart as it was, and the greatest journey in human history began.",
        "details": "Allah says: ﴿أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ﴾ — “Did We not expand for you your breast?”"
      }
    },
    "interactive": {
      "discover": "The Prophet's chest was opened more than once in his life; the first time was as a child in the desert of Bani Sa'd.",
      "value": {
        "name": "Purity of heart",
        "icon": "💛"
      },
      "thinkQuestion": "What will you do today to keep your own heart clear of grudges and envy?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What water was the Prophet's heart washed with that night?",
        "options": [
          "Rain water",
          "Zamzam water",
          "Sea water",
          "River water"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Golden Basin",
        "description": "A keepsake: Allah looks at your heart before anything else."
      },
      "badge": "Badge: A Heart Made Ready"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The opening of the chest on the night of the Isra is established in both Sahih collections."
    }
  },
  "the-amazing-buraq": {
    "title": "Al-Buraq: Swifter Than Sight",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Jibril brought a white creature from Paradise called al-Buraq, larger than a donkey and smaller than a mule, which placed its hoof as far as its sight could reach. When the Prophet (pbuh) came to ride it, it stirred, and Jibril said: is it Muhammad you do this to? No one more honoured before Allah has ever ridden you. So it settled and stood still, and they set off into the night sky.",
        "shortLesson": "Allah's power is wider than anything we can picture."
      },
      "tier_2_age_9_11": {
        "narrative": "Jibril brought a creature from Paradise called al-Buraq, brilliant white, larger than a donkey and smaller than a mule. The wonder of al-Buraq was its speed: it would place its hoof at the farthest point its sight could reach. When the Prophet (pbuh) drew near to ride, al-Buraq shied and stirred, and Jibril said to it: “Is it Muhammad you do this to? By Allah, no one has ever ridden you who is more honoured before Allah than he is.” Al-Buraq grew shy and broke into a sweat, then settled and stood still until the Messenger of Allah (pbuh) mounted, and away they went into the night sky.",
        "details": "After naming the animals we know, Allah says: ﴿وَيَخْلُقُ مَا لَا تَعْلَمُونَ﴾ — “And He creates what you do not know.”"
      }
    },
    "interactive": {
      "discover": "The name “Buraq” comes from barq — lightning — for its speed.",
      "value": {
        "name": "The reach of Allah's power",
        "icon": "⚡"
      },
      "thinkQuestion": "What is the fastest thing you know? How would you picture something faster than sight itself?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What made al-Buraq remarkable?",
        "options": [
          "It was red",
          "It stepped as far as its sight could reach",
          "It flew with two great wings",
          "It never grew tired"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A White Feather",
        "description": "A keepsake for a mount unlike anything we know."
      },
      "badge": "Badge: Rider of al-Buraq"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim",
      "note": "The description of al-Buraq is established in Sahih Muslim in the Isra hadith."
    }
  },
  "road-to-jerusalem": {
    "title": "The Road to Jerusalem",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On the road to Jerusalem, Jibril asked the Prophet (pbuh) to come down and pray at blessed places — among them where Allah spoke to Musa, and where Isa was born. On the way he was shown strange scenes of people receiving what their deeds had earned.",
        "shortLesson": "We honour the places of all the prophets: their faith is one."
      },
      "tier_2_age_9_11": {
        "narrative": "During the swift journey towards Jerusalem, Jibril asked the Prophet (pbuh) to come down and pray two rak'ahs at blessed places: among them Mount Tur, where Allah spoke to Musa, and Bethlehem, where Isa was born. Along the way the Prophet (pbuh) was shown strange scenes of people being repaid for what they had done, and from them he learned the reward of good deeds and the consequence of bad ones.",
        "details": "Allah swears by these blessed places: ﴿وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ﴾."
      }
    },
    "interactive": {
      "discover": "Jerusalem was the first qiblah of the Muslims, before it was turned to the Kaaba.",
      "value": {
        "name": "Honouring the prophets",
        "icon": "🕌"
      },
      "thinkQuestion": "Why do Muslims honour Musa and Isa as they honour Muhammad (pbuh)?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Which prophet did Allah speak to at Mount Tur?",
        "options": [
          "Ibrahim",
          "Musa",
          "Isa",
          "Nuh"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An Olive Branch from Tur",
        "description": "A branch to remind you that the prophets are brothers in one faith."
      },
      "badge": "Badge: Visitor of Blessed Places"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sunan an-Nasa'i, and the Seerah literature",
      "note": "The Isra itself is established in the Quran and both Sahih collections; the stops to pray at Tur and Bethlehem come in a narration in an-Nasa'i whose chain some scholars have questioned."
    }
  },
  "leader-of-prophets": {
    "title": "Leading the Prophets at al-Aqsa",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet (pbuh) reached al-Aqsa Mosque and tied al-Buraq at the door. When he entered, he found all the prophets from Adam to Isa waiting for him. The prayer was called, and Jibril brought him forward to lead them.",
        "shortLesson": "Our Prophet (pbuh) is the last of the prophets, and their imam."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) reached al-Aqsa Mosque and tied al-Buraq to the ring the prophets used for their mounts. When he entered the mosque, there was the surprise: the prophets and messengers from Adam to Isa, gathered by Allah, waiting for him. The prayer was called, and Jibril took the hand of our Prophet Muhammad (pbuh) and brought him forward as imam, and he led all the prophets in prayer. That scene was an announcement that he is the seal of the prophets and their imam, and that his message is for all people.",
        "details": "Allah records the journey: ﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى﴾."
      }
    },
    "interactive": {
      "discover": "Surah Al-Isra is named after this journey and opens with it.",
      "value": {
        "name": "The standing of al-Aqsa",
        "icon": "🕋"
      },
      "thinkQuestion": "What does it mean that all the prophets prayed behind one imam?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Where did the Prophet (pbuh) lead the prophets in prayer?",
        "options": [
          "The Sacred Mosque",
          "The Prophet's Mosque",
          "Al-Aqsa Mosque",
          "Quba Mosque"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "The Door Ring",
        "description": "The ring al-Buraq was tied to at the door of al-Aqsa."
      },
      "badge": "Badge: Within al-Aqsa"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim, and Surah Al-Isra",
      "note": "The Prophet leading the prophets in prayer at Jerusalem is established in Sahih Muslim."
    }
  },
  "the-first-heaven-adam": {
    "title": "The First Heaven: Meeting Adam",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet (pbuh) ascended with Jibril to the first heaven. Jibril asked to be let in. “Who is it?” “Jibril.” “And who is with you?” “Muhammad.” The gate opened, and there was Adam, the father of humanity, who welcomed him: “Welcome, righteous son and righteous prophet.”",
        "shortLesson": "We ask permission before entering — even at the gates of heaven."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) ascended with Jibril in the Mi'raj until they reached the gate of the first heaven. Jibril asked for it to be opened. “Who is this?” “Jibril.” “And who is with you?” “Muhammad.” “Has he been sent for?” “Yes.” The gate opened, and there was Adam, the father of humanity, who welcomed him and said: “Welcome, righteous son and righteous prophet.” Adam would look to his right and laugh, and to his left and weep — for on his right were the souls of the happy among his children, and on his left the souls of the wretched.",
        "details": "Allah says of the heavens: ﴿الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا﴾ — “who created seven heavens in layers.”"
      }
    },
    "interactive": {
      "discover": "Every prophet he met in the heavens welcomed him and prayed for good for him.",
      "value": {
        "name": "The manners of asking permission",
        "icon": "🚪"
      },
      "thinkQuestion": "Your good deeds gladden Adam — what deed would you like him to see from you today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Whom did the Prophet (pbuh) meet in the first heaven?",
        "options": [
          "Ibrahim",
          "Adam",
          "Musa",
          "Yusuf"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "Key of the First Heaven",
        "description": "A key: the door opens for the one who asks."
      },
      "badge": "Badge: Guest of the First Heaven"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The Mi'raj and meeting the prophets in the heavens are established in both Sahih collections."
    }
  },
  "second-heaven-isa-yahya": {
    "title": "The Second Heaven: The Cousins",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet (pbuh) and Jibril rose to the second heaven and asked to enter. The gate opened, and there were two noble young men: Isa the son of Maryam and Yahya the son of Zakariya, who were cousins. They welcomed him and said: “Welcome, righteous brother and righteous prophet.”",
        "shortLesson": "A kind word and a bright face are the best way to receive people."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) rose with Jibril to the second heaven and asked for the gate to be opened. It opened, and there were two noble young men: Isa the son of Maryam and Yahya the son of Zakariya, who were cousins. They were glad to see him, welcomed him and said: “Welcome, righteous brother and righteous prophet,” and prayed for good for him. That is how the prophets receive one another — with love and prayer, not rivalry.",
        "details": "Allah says of these prophets: ﴿وَزَكَرِيَّا وَيَحْيَىٰ وَعِيسَىٰ وَإِلْيَاسَ ۖ كُلٌّ مِّنَ الصَّالِحِينَ﴾ — “all of them among the righteous.”"
      }
    },
    "interactive": {
      "discover": "The mothers of Yahya and Isa were sisters, which makes them cousins.",
      "value": {
        "name": "Welcoming well",
        "icon": "🤝"
      },
      "thinkQuestion": "How do you greet a guest who comes to your home? What words do you like to hear when you arrive?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Whom did the Prophet (pbuh) meet in the second heaven?",
        "options": [
          "Adam and Idris",
          "Isa and Yahya",
          "Musa and Harun",
          "Ibrahim and Yusuf"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "Two Branches Side by Side",
        "description": "Two branches for two who were kin in blood and in calling."
      },
      "badge": "Badge: Guest of the Second Heaven"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "Meeting the prophets in the heavens is established in the Mi'raj hadith in both Sahih collections."
    }
  },
  "third-heaven-yusuf": {
    "title": "The Third Heaven: Half of All Beauty",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the third heaven the Prophet (pbuh) met Yusuf, of whom he said: “He has been given half of all beauty.” This is the prophet who bore his brothers' betrayal and prison with patience, until Allah gave him standing in the land. He welcomed his brother Muhammad (pbuh) and prayed for him.",
        "shortLesson": "Beauty of face is not complete without beauty of heart and patience."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) and Jibril reached the third heaven, and the gate was opened, and there was a man given beauty as no one else had been given. It was Yusuf, who as a boy faced his brothers' betrayal, then the well, then the prison — and bore it patiently until Allah placed him over the storehouses of Egypt. Our Prophet (pbuh) said of him: “He had been given half of all beauty.” Yusuf welcomed his brother Muhammad (pbuh) and prayed for good for him.",
        "details": "Allah says of his story: ﴿لَّقَدْ كَانَ فِي يُوسُفَ وَإِخْوَتِهِ آيَاتٌ لِّلسَّائِلِينَ﴾ — “in Yusuf and his brothers were signs for those who ask.”"
      }
    },
    "interactive": {
      "discover": "Surah Yusuf is the only surah that tells one prophet's story whole, from beginning to end.",
      "value": {
        "name": "Patience and fine character",
        "icon": "⭐"
      },
      "thinkQuestion": "What made Yusuf great — his beauty, or his patience? Why?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet (pbuh) say about Yusuf's beauty?",
        "options": [
          "He was given half of all beauty",
          "He was the tallest of people",
          "He was the strongest",
          "He was the swiftest"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "Yusuf's Shirt",
        "description": "A shirt to remind you that patience brings joy back to a home."
      },
      "badge": "Badge: Beautiful Patience"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim",
      "note": "The Prophet's words about Yusuf being given half of beauty are in Sahih Muslim."
    }
  },
  "fourth-heaven-idris": {
    "title": "The Fourth Heaven: A High Place",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the fourth heaven the Prophet (pbuh) met Idris, whom Allah raised to a high place. He welcomed him with the words every prophet said: “Welcome, righteous brother and righteous prophet.”",
        "shortLesson": "Useful knowledge and careful work raise the one who has them."
      },
      "tier_2_age_9_11": {
        "narrative": "In the fourth heaven, after Jibril asked and the gate was opened, the Prophet (pbuh) met Idris. He is a noble prophet whom Allah praised as truthful and a prophet, and whom He raised to a high place. Idris welcomed the Prophet (pbuh) with the words every prophet he met had said: “Welcome, righteous brother and righteous prophet.”",
        "details": "Allah says: ﴿وَرَفَعْنَاهُ مَكَانًا عَلِيًّا﴾ — “And We raised him to a high place.”"
      }
    },
    "interactive": {
      "discover": "Idris is named only twice in the Quran: in Surah Maryam and Surah Al-Anbiya.",
      "value": {
        "name": "Knowledge and craftsmanship",
        "icon": "📐"
      },
      "thinkQuestion": "What work do you do carefully, and would like to become the best at?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How does Allah describe Idris?",
        "options": [
          "A great king",
          "Truthful, a prophet, raised to a high place",
          "The first messenger",
          "The longest-lived prophet"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Pen and Tablet",
        "description": "A keepsake for those raised by what they know and do well."
      },
      "badge": "Badge: Seeker of Knowledge"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim, and Surah Maryam",
      "note": "Meeting Idris during the Mi'raj is established in both Sahih collections."
    }
  },
  "fifth-heaven-harun": {
    "title": "The Fifth Heaven: The Beloved Prophet",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the fifth heaven the Prophet (pbuh) met a dignified elder and asked Jibril: who is this? He said: this is the one beloved by his people, Harun ibn Imran, the brother of Musa. He was known for his gentleness, and his people loved him.",
        "shortLesson": "Gentleness with people opens hearts."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) rose to the fifth heaven and met there a dignified elder with white hair and beard. He asked Jibril: “Who is this?” He said: “This is the one beloved by his people, Harun ibn Imran.” He is the brother of Musa, known for his gentleness and kindness, and his people loved him and were at ease with him. Harun welcomed Prophet Muhammad (pbuh) and prayed for him.",
        "details": "Allah says of His gift to Musa: ﴿وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا﴾ — “We gave him his brother Harun, a prophet.”"
      }
    },
    "interactive": {
      "discover": "Musa asked his Lord to make his brother Harun a helper to him, and Allah answered him.",
      "value": {
        "name": "Gentleness",
        "icon": "🕊️"
      },
      "thinkQuestion": "Who is the person you love most for being gentle with you? How can you be that for someone else?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How was Harun described in the fifth heaven?",
        "options": [
          "The strongest of prophets",
          "The one beloved by his people",
          "The most learned",
          "The wealthiest"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A White Feather",
        "description": "A feather to remind you that gentleness wins hearts."
      },
      "badge": "Badge: Gentle of Heart"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "Harun being described as beloved by his people comes in the Mi'raj hadith."
    }
  },
  "sixth-heaven-musa": {
    "title": "The Sixth Heaven: The Tear of Musa",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the sixth heaven the Prophet (pbuh) met Musa, who welcomed him. When the Prophet passed him to continue his ascent, Musa wept. He was asked: what makes you weep? He said: I weep because a young man was sent after me, and more of his nation will enter Paradise than of mine.",
        "shortLesson": "The prophets are glad for us and want us saved."
      },
      "tier_2_age_9_11": {
        "narrative": "In the sixth heaven the Prophet (pbuh) met Musa, to whom Allah spoke, and Musa welcomed him gladly. When the Prophet (pbuh) passed him to continue his ascent, Musa wept. He was asked: “What makes you weep?” He said: “I weep because a young man was sent after me, and more of his nation will enter Paradise than of mine.” It was never envy — the prophets are far above that — but concern for his own people, sorrow for those of them who turned away, and gladness at how many of Muhammad's nation would be saved.",
        "details": "Allah says of Musa: ﴿إِنَّهُ كَانَ مُخْلَصًا وَكَانَ رَسُولًا نَّبِيًّا﴾ — “he was chosen, and he was a messenger and a prophet.”"
      }
    },
    "interactive": {
      "discover": "Musa is called Kalimullah — the one Allah spoke to directly.",
      "value": {
        "name": "Caring for others",
        "icon": "💧"
      },
      "thinkQuestion": "Have you ever been sad for someone else rather than for yourself? Tell us about it.",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did Musa weep as the Prophet (pbuh) passed him?",
        "options": [
          "He was tired",
          "More of Muhammad's nation would enter Paradise than his own",
          "He missed his people",
          "He was saying goodbye"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Drop of Dew",
        "description": "A drop for a prophet who wept out of care for his people."
      },
      "badge": "Badge: Of Muhammad's Nation"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim",
      "note": "Musa weeping during the Mi'raj is established in Sahih Muslim."
    }
  },
  "seventh-heaven-ibrahim": {
    "title": "The Seventh Heaven: Ibrahim's Greeting to Us",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the seventh heaven the Prophet (pbuh) saw a man who resembled him, resting his back against al-Bayt al-Ma'mur — a House in the heavens circled each day by seventy thousand angels who never return to it. It was Ibrahim, who welcomed him and sent a greeting to his nation.",
        "shortLesson": "Remembrance of Allah plants trees for us in Paradise."
      },
      "tier_2_age_9_11": {
        "narrative": "The gate of the seventh heaven opened, and the Prophet (pbuh) saw a dignified man who resembled him more than anyone, resting his back against al-Bayt al-Ma'mur — a House in the heavens which seventy thousand angels enter and circle every day, and never return to again, so many are they. It was Ibrahim, the friend of the Most Merciful. He welcomed the Prophet (pbuh) and gave him a message for his nation: “Give my greeting to your nation, and tell them that Paradise has sweet soil and fresh water, that it is a level plain, and that its planting is: Subhan Allah, al-hamdu lillah, la ilaha illa Allah, Allahu akbar.”",
        "details": "He is the one who raised the foundations of the Kaaba on earth: ﴿وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ﴾."
      }
    },
    "interactive": {
      "discover": "Al-Bayt al-Ma'mur in the heavens corresponds to the Kaaba on earth.",
      "value": {
        "name": "The lasting good deeds",
        "icon": "🌳"
      },
      "thinkQuestion": "If every word of praise were a tree in Paradise, how many did you plant today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What message did Ibrahim give the Prophet (pbuh) for his nation?",
        "options": [
          "To build a mosque",
          "His greeting, and that remembrance is the planting of Paradise",
          "To fast",
          "To migrate"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Seed of Light",
        "description": "A seed: each word of remembrance is a tree planted for you."
      },
      "badge": "Badge: A Planter in Paradise"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, and Sunan at-Tirmidhi",
      "note": "Meeting Ibrahim at al-Bayt al-Ma'mur is in Bukhari; the hadith of the planting of Paradise is in Tirmidhi, who graded it good."
    }
  },
  "sidrat-al-muntaha": {
    "title": "Sidrat al-Muntaha: Where Everything Stops",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet (pbuh) rose until he reached a great tree called Sidrat al-Muntaha, where everything that ascends comes to an end and no creature passes beyond. There Jibril stopped and said: if I came a fingertip nearer I would burn. And the Prophet (pbuh) went on alone.",
        "shortLesson": "Every creature has a limit — and our Prophet's standing is great."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) and Jibril rose until they reached a great and beautiful tree called Sidrat al-Muntaha, at which the knowledge of every ascending one ends and beyond which no creature passes. Its leaves are like the ears of elephants, its fruits are large, and it is covered by a light of Allah that no one can describe. There Jibril stopped and told the Prophet (pbuh), in meaning: this is my station, which I do not pass; were I to come a fingertip closer I would burn. And the Prophet (pbuh) went on alone, to where no creature had reached.",
        "details": "Allah says: ﴿عِندَ سِدْرَةِ الْمُنتَهَىٰ ۝ عِندَهَا جَنَّةُ الْمَأْوَىٰ﴾ — “at the Lote Tree of the Utmost Boundary, near it is the Garden of Refuge.”"
      }
    },
    "interactive": {
      "discover": "It is called al-Muntaha — the end — because everything rising from the earth stops there.",
      "value": {
        "name": "Knowing your measure",
        "icon": "🌌"
      },
      "thinkQuestion": "Jibril knew his limit and stopped at it — when is stopping at a limit courage rather than weakness?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Jibril do at Sidrat al-Muntaha?",
        "options": [
          "He went ahead of the Prophet",
          "He stopped and did not pass it",
          "He returned to earth",
          "He circled it"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Lote Leaf",
        "description": "A leaf from the tree where every ascending one stops."
      },
      "badge": "Badge: Reached the Boundary"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim, and Surah An-Najm",
      "note": "Sidrat al-Muntaha is named in Surah An-Najm and described in both Sahih collections."
    }
  },
  "the-great-gift-prayer": {
    "title": "The Great Gift: The Prayer",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet (pbuh) reached a place where he heard the scratching of the pens, and there Allah spoke to him and made the prayer obligatory on his nation: fifty prayers a day and night. The prayer is the only act of worship made obligatory in the heavens rather than on earth.",
        "shortLesson": "The prayer is a gift from the sky, and your link to your Lord."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet (pbuh) went on until he reached a level where he could hear the scratching of the pens — the pens of the angels as they write. There Allah revealed to His servant what He revealed, and made the prayer obligatory upon his nation: fifty prayers a day and night. The prayer is the only act of worship made obligatory in the heavens and not on earth, which shows how great a matter it is.",
        "details": "Allah says of that station: ﴿فَأَوْحَىٰ إِلَىٰ عَبْدِهِ مَا أَوْحَىٰ ۝ مَا كَذَبَ الْفُؤَادُ مَا رَأَىٰ﴾."
      }
    },
    "interactive": {
      "discover": "The prayer is the first thing a servant will be asked about on the Day of Judgement.",
      "value": {
        "name": "The weight of the prayer",
        "icon": "🕌"
      },
      "thinkQuestion": "If the prayer is a gift brought from above seven heavens, how will you receive it each day?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How many prayers were made obligatory at first?",
        "options": [
          "Five",
          "Seventeen",
          "Fifty",
          "A hundred"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Small Prayer Mat",
        "description": "A mat for the most precious gift ever brought down from the sky."
      },
      "badge": "Badge: Keeper of the Prayer"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The prayer being made obligatory on the night of the Mi'raj is established in both Sahih collections."
    }
  },
  "musa-advice-reduction": {
    "title": "Musa's Advice: Five in Deed, Fifty in Reward",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On the way back, Musa asked the Prophet (pbuh): what were you commanded? He said: fifty prayers. Musa said: your nation cannot bear that — go back to your Lord and ask Him to lighten it. The Prophet kept returning until they became five, and Allah said: they are five, and they are fifty; My word does not change.",
        "shortLesson": "Allah's mercy on us is wider than we think."
      },
      "tier_2_age_9_11": {
        "narrative": "On the way back the Prophet (pbuh) passed Musa, who asked him: “What were you commanded?” He said: “Fifty prayers every day.” Musa said, out of his long experience with his own people: “Your nation cannot manage that. Go back to your Lord and ask Him to lighten it for them.” The Prophet went back, and Allah lightened it; and he returned to Musa, who sent him back again, time after time, until they became five prayers. Then Allah said: “They are five, and they are fifty. My word does not change” — five in deed, fifty in reward.",
        "details": "Allah says of His mercy: ﴿يُرِيدُ اللَّهُ أَن يُخَفِّفَ عَنكُمْ﴾ — “Allah wishes to lighten your burden.”"
      }
    },
    "interactive": {
      "discover": "A good deed is counted tenfold, so five prayers carry the reward of fifty.",
      "value": {
        "name": "Advice and mercy",
        "icon": "🤍"
      },
      "thinkQuestion": "Who gave you advice that helped you? Did you thank them for it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How many prayers were they after the lightening?",
        "options": [
          "Three",
          "Five",
          "Ten",
          "Seventeen"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Small Scale",
        "description": "A scale to remind you that the reward is wider than the deed."
      },
      "badge": "Badge: Grateful for the Gift"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The Prophet returning to his Lord on Musa's advice is established in both Sahih collections."
    }
  },
  "morning-of-certainty": {
    "title": "The Morning of Certainty, and the Name as-Siddiq",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the morning the Prophet (pbuh) told Quraysh of his journey, and they mocked him: we travel to Jerusalem in a month, and you go and return in one night? They asked him to describe the mosque, and Allah showed it to him, and he described it exactly. They went to Abu Bakr to shake him, and he said: if he said it, he has told the truth. And so he was named as-Siddiq.",
        "shortLesson": "A true friend stands with you when others doubt."
      },
      "tier_2_age_9_11": {
        "narrative": "When morning came, the Prophet (pbuh) sat telling Quraysh what had happened in his night, and the idol-worshippers mocked him: “We travel to Jerusalem in a month, and you go and come back in a single night?” They wanted to test him, so they asked him to describe al-Aqsa Mosque. Allah brought it before his sight, and he began describing it to them door by door, until they could not answer him a word — and still they refused. Then they went to Abu Bakr to shake his trust in his friend, and he said: “If he said it, he has told the truth. I believe him about what is further than that: I believe him about news from the heavens.” From that day he was called as-Siddiq — the one who affirms the truth.",
        "details": "Allah says of the truthful: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ﴾."
      }
    },
    "interactive": {
      "discover": "Surah Al-Isra is named after this journey.",
      "value": {
        "name": "Truthfulness and friendship",
        "icon": "🌅"
      },
      "thinkQuestion": "Who is the friend you trust to believe you when no one else does? Are you that friend to someone?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was Abu Bakr called after that night?",
        "options": [
          "Al-Farooq",
          "As-Siddiq",
          "Al-Amin",
          "Dhun-Nurayn"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Small Dawn",
        "description": "A keepsake for the morning that separated those who believed from those who would not."
      },
      "badge": "Badge: A Friend of Truth"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah, and Sahih al-Bukhari",
      "note": "The Prophet describing al-Aqsa is in Bukhari; Abu Bakr being named as-Siddiq is in the Seerah literature."
    }
  },
  "dar-al-nadwa-dust": {
    "title": "The Plot at Dar an-Nadwa and a Handful of Dust",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The chiefs of Quraysh met at Dar an-Nadwa to plan how to be rid of the Prophet (pbuh), and agreed to take a young man from every tribe to strike him together. They surrounded his house at night, waiting for him to come out. But Allah told His Prophet what they had planned and gave him leave to go, and he walked out from among them, and not one of them saw him.",
        "shortLesson": "Allah's protection is stronger than any plan."
      },
      "tier_2_age_9_11": {
        "narrative": "When Quraysh saw Islam spreading, their chiefs met at Dar an-Nadwa and debated: should they imprison him, drive him out, or kill him? They settled on what Abu Jahl proposed: take one young man from every tribe, so that they would strike him as one man and his blood would be spread among all the clans. They surrounded the Prophet's house at night, waiting. But Allah showed His Prophet their scheming and gave him leave to migrate. He walked out from among them reciting Surah Ya-Sin, and took a handful of dust and scattered it — and not one of them saw him until he had gone.",
        "details": "Among what he recited: ﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا وَمِنْ خَلْفِهِمْ سَدًّا فَأَغْشَيْنَاهُمْ فَهُمْ لَا يُبْصِرُونَ﴾."
      }
    },
    "interactive": {
      "discover": "A verse came down about this very plot: “And when those who disbelieved plotted against you” — Surah Al-Anfal.",
      "value": {
        "name": "Allah's protection",
        "icon": "🛡️"
      },
      "thinkQuestion": "When have you felt Allah protected you from something you could not see?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Where did the chiefs of Quraysh meet to make their plan?",
        "options": [
          "At the Kaaba",
          "At Dar an-Nadwa",
          "At the market",
          "At Taif"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Handful of Dust",
        "description": "Dust: the weakest means is enough when Allah wills it."
      },
      "badge": "Badge: Under Allah's Protection"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, and Surah Al-Anfal",
      "note": "The plot itself is established in the Quran in Surah Al-Anfal; the handful of dust and the recitation of Ya-Sin come from Ibn Ishaq without a full chain."
    }
  },
  "hero-in-the-bed": {
    "title": "The Hero in the Bed",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Before the Prophet (pbuh) left, he asked his young cousin Ali ibn Abi Talib to sleep in his bed and cover himself with his cloak, so that anyone looking in would think the Prophet was asleep. Ali did not hesitate. And the Prophet asked him to stay behind for a few days to return the deposits people had left with him — the very people plotting against him.",
        "shortLesson": "A trust is returned even to someone who wrongs you."
      },
      "tier_2_age_9_11": {
        "narrative": "Before the Prophet (pbuh) left his house, he asked his young cousin Ali ibn Abi Talib to sleep in his bed and cover himself with his green cloak, so that those watching at the door would think the Prophet was still asleep. Ali did not hesitate for a moment, knowing the danger. And that was not his only task: the Prophet asked him to remain in Mecca for some days to return the deposits to their owners — for the people of Mecca left their wealth with him because he was the truthful and trustworthy one, while at the same time plotting to kill him. When they broke into the house in the morning and found Ali, they were furious.",
        "details": "Allah says of the one who gives himself: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ﴾."
      }
    },
    "interactive": {
      "discover": "Ali was about twenty-three years old that night.",
      "value": {
        "name": "Trustworthiness and sacrifice",
        "icon": "🌙"
      },
      "thinkQuestion": "If someone you disagree with left something in your keeping, would you return it in full?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did Ali stay behind in Mecca after the Prophet (pbuh) left?",
        "options": [
          "To fight Quraysh",
          "To return the deposits to their owners",
          "To sell the house",
          "To wait for Hajj"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Green Cloak",
        "description": "A cloak: sometimes courage is lying down in someone else's place."
      },
      "badge": "Badge: Keeper of Trusts"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Ibn Hisham's Seerah",
      "note": "Ali sleeping in the bed and returning the deposits are well known in the Seerah literature."
    }
  },
  "tears-of-joy-companion": {
    "title": "Tears of Joy: “May I Accompany You?”",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the fierce heat of midday the Prophet (pbuh) came to Abu Bakr's house and told him Allah had given him leave to migrate. Abu Bakr said: “May I accompany you, Messenger of Allah?” He said: “Yes.” And Abu Bakr wept for joy. Aisha said: I never thought anyone could weep from joy until I saw my father weep that day.",
        "shortLesson": "A true friend is glad to share your hardship."
      },
      "tier_2_age_9_11": {
        "narrative": "At midday, the hour when no one goes out for the heat, the Prophet (pbuh) came quietly to Abu Bakr's house and told him that Allah had given him leave to depart. Abu Bakr, his eagerness ahead of his words, asked: “May I accompany you, Messenger of Allah?” He said: “Yes.” And Abu Bakr wept for sheer joy. His daughter Aisha said: “By Allah, I never thought anyone could weep from joy until I saw Abu Bakr weep that day.” He had already prepared two mounts and been feeding them for months, ready for this day.",
        "details": "Allah says of this companionship: ﴿ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾."
      }
    },
    "interactive": {
      "discover": "Abu Bakr is the only companion described in the Quran as “his companion”.",
      "value": {
        "name": "True companionship",
        "icon": "😢"
      },
      "thinkQuestion": "Who is the friend you would be glad to work hard alongside? Have you told them?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet (pbuh) answer when Abu Bakr asked to come with him?",
        "options": [
          "Wait a while",
          "Yes — companionship",
          "Stay in Mecca",
          "Take the mount"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Camel's Rein",
        "description": "A rein for the man who fed his mounts for months, waiting for one day."
      },
      "badge": "Badge: Companion of the Cave"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The hijrah hadith and Abu Bakr weeping for joy are established in Sahih al-Bukhari, from Aisha."
    }
  },
  "asma-that-al-nitaqayn": {
    "title": "Asma, She of the Two Belts",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When they packed the provisions they had nothing to tie them with, so Asma bint Abi Bakr took her belt, tore it in two, tied the food with one half and her clothes with the other. The Prophet (pbuh) prayed that Allah give her two belts in Paradise, and she was called “She of the Two Belts”.",
        "shortLesson": "Sometimes the clever answer is already in your hands."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet (pbuh) and Abu Bakr had packed their provisions, they had nothing to tie the food bag and the waterskin with. So Asma bint Abi Bakr untied her nitaq — the belt she fastened her clothes with — and tore it in two: with one half she tied the provisions, and with the other she fastened her clothes. The Prophet (pbuh) prayed for her: may Allah give you two belts in their place in Paradise. From that day she was called “She of the Two Belts”. And when Abu Jahl came asking about her father, she held firm and told him nothing.",
        "details": "Allah says: ﴿وَالْمُؤْمِنُونَ وَالْمُؤْمِنَاتُ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ﴾ — “the believing men and women are allies of one another.”"
      }
    },
    "interactive": {
      "discover": "Asma was the sister of Aisha, and the daughter of Abu Bakr as-Siddiq.",
      "value": {
        "name": "Quick thinking",
        "icon": "🎀"
      },
      "thinkQuestion": "Think of a small problem you met today: what answer was in your hands and you did not notice?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why was Asma called “She of the Two Belts”?",
        "options": [
          "She wore two dresses",
          "She tore her belt in two, and the Prophet prayed for two in Paradise",
          "She lived between two mountains",
          "She migrated twice"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "Half a Belt",
        "description": "Half a belt that solved a problem on a journey that changed history."
      },
      "badge": "Badge: She of the Two Belts"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "Asma's belt is established in Sahih al-Bukhari; Abu Jahl striking her is in the Seerah literature."
    }
  },
  "smart-shepherd-footprints": {
    "title": "The Shepherd Who Erased the Tracks",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The people of Mecca were skilled at reading tracks in the sand. So Abu Bakr arranged for his shepherd, Amir ibn Fuhayra, to drive the flock behind them, so the sheep walked over their footprints and wiped them away. The trail vanished, and no one could find their road.",
        "shortLesson": "Trusting Allah does not mean neglecting the means."
      },
      "tier_2_age_9_11": {
        "narrative": "Among Quraysh were men who could read footprints in the sand with real precision, so the trail was a genuine danger. Abu Bakr arranged something careful: he told his shepherd Amir ibn Fuhayra to drive the flock along behind them, so that the sheep walked over their footprints as they grazed and blotted them out. Amir also brought them the sheep's milk at the cave. By this arrangement the trail was lost in the desert, and no one found them.",
        "details": "Allah says of preparing means: ﴿وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ﴾ — “prepare for them whatever you are able.”"
      }
    },
    "interactive": {
      "discover": "Amir ibn Fuhayra was Abu Bakr's freed servant, and among the earliest to accept Islam.",
      "value": {
        "name": "Planning alongside trust",
        "icon": "🐑"
      },
      "thinkQuestion": "Before something hard: what practical step could you take instead of waiting?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How were the footprints of the Prophet (pbuh) and his companion erased?",
        "options": [
          "By rain",
          "By wind",
          "By Amir ibn Fuhayra's sheep walking behind them",
          "By a leather cover"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A Sheep's Bell",
        "description": "A small bell: a clever plan is itself an act of worship."
      },
      "badge": "Badge: Careful Planning"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, and Ibn Hisham's Seerah",
      "note": "Amir ibn Fuhayra bringing the sheep to the cave is in Sahih al-Bukhari; the detail of the flock covering the tracks is in the Seerah literature."
    }
  },
  "permission-to-defend": {
    "title": "Why Did the Muslims Defend Themselves?",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Muslims bore thirteen years of harm in Mecca without striking back, because the Prophet ﷺ told them to be patient. When they migrated to Madinah and built their homes, Quraysh kept threatening to attack them. Only then did Allah permit them to defend themselves and their families. Islam does not begin an attack — and it does not leave its people wronged with no protection.",
        "shortLesson": "Strength is for protecting homes, not for starting an attack."
      },
      "tier_2_age_9_11": {
        "narrative": "For thirteen years in Mecca the Muslims bore severe harm — torture, and the seizing of their homes and wealth — and not one of them raised a sword, because the Prophet ﷺ told them to be patient and to hold back. Then they migrated to Madinah and built a community that was safe, and still Quraysh sent threats and promised to attack them. At that point — and only then — permission came down to defend themselves, their families and their new home. Islam is a religion of peace that does not begin an attack, but it does not leave its own to be wronged without protection.",
        "details": "Allah says why the permission came: ﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا﴾ — “Permission is given to those who are fought, because they were wronged.”"
      }
    },
    "interactive": {
      "discover": "This was the first verse permitting fighting, after thirteen years of patience.",
      "value": {
        "name": "Peace first, defence as the exception",
        "icon": "🕊️"
      },
      "thinkQuestion": "Why do you think the Muslims waited all those years before they were permitted to defend themselves?",
      "challenge": {
        "type": "multiple_choice",
        "question": "When were the Muslims permitted to defend themselves?",
        "options": [
          "At the start of the call in Mecca",
          "After the migration, when they were wronged and threatened",
          "Before the prophethood",
          "They were never permitted"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An olive branch",
        "description": "A branch to remind you that peace comes first."
      },
      "badge": "Guardian of Home"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah Al-Hajj: 39",
      "note": "The verse states plainly that the permission came because of the wrong done to them."
    }
  },
  "badr-shura-counsel": {
    "title": "The Well of Badr and the Strength of Counsel",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Muslims set out three hundred and thirteen men, and found before them an army of nearly a thousand. The Prophet ﷺ gathered his companions and asked their view, forcing no one. When they camped at the wells of Badr, al-Hubab ibn al-Mundhir asked him: is this a place Allah told you to take, or is it judgement and strategy? He said: it is judgement. So al-Hubab advised camping at the well nearest the enemy — and the Prophet ﷺ took his advice.",
        "shortLesson": "A strong leader accepts the right idea from someone younger than him."
      },
      "tier_2_age_9_11": {
        "narrative": "The Muslims set out three hundred and thirteen men, and Quraysh had readied an army of nearly a thousand. The Prophet ﷺ gathered his companions and forced no one, but said: “Advise me, people.” The Muhajirun and the Ansar stood and declared they were with him. When the army camped at the wells of Badr, al-Hubab ibn al-Mundhir asked: “Is this a position Allah placed you in, which we may not go beyond, or is it judgement, war and strategy?” He said: “It is judgement, war and strategy.” So al-Hubab advised moving to the water nearest the enemy and keeping the water behind them — and the Prophet ﷺ accepted his view and acted on it.",
        "details": "Allah describes the believers: ﴿وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ﴾ — “and their affair is by consultation among them.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ separated what came by revelation from what was his own judgement, and took counsel on the second.",
      "value": {
        "name": "Consultation",
        "icon": "🤝"
      },
      "thinkQuestion": "When did you last change your mind because someone had a better idea?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ do with al-Hubab's advice?",
        "options": [
          "Refused it",
          "Took it and acted on it",
          "Delayed it",
          "Was angry at it"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A water pail",
        "description": "A pail to remind you that a right idea is taken from whoever brings it."
      },
      "badge": "One Who Counsels"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah",
      "note": "Al-Hubab's counsel is well known in the Seerah, reported by Ibn Ishaq without a full chain; consultation itself is established in the Quran."
    }
  },
  "angels-in-badr": {
    "title": "Badr and the Soldiers of the Sky",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On the seventeenth of Ramadan the two armies met at Badr. The Prophet ﷺ stood praying to his Lord with his hands raised until his cloak fell from his shoulders, asking victory for this small group. Allah answered him and sent the angels to support them, and the Muslims won despite their small number. That day was called the Day of the Criterion.",
        "shortLesson": "Numbers are not everything; sincerity with Allah comes first."
      },
      "tier_2_age_9_11": {
        "narrative": "The two armies met on the seventeenth of Ramadan in the second year after the migration. The Prophet ﷺ stood in his shelter with his hands raised, pressing his Lord in prayer until his cloak slipped from his shoulders, asking Allah to give victory to this small band. Allah answered him and supported the Muslims with angels, steadying their feet and settling their hearts. They won despite how few they were and how little they had, and the day was called the Day of the Criterion, because on it Allah separated truth from falsehood.",
        "details": "Allah says: ﴿وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ﴾ — “Allah gave you victory at Badr while you were few.”"
      }
    },
    "interactive": {
      "discover": "Badr was named after the well that stood there, and became the name of a great day in history.",
      "value": {
        "name": "Trust, alongside the means",
        "icon": "⭐"
      },
      "thinkQuestion": "They prepared and they prayed. Why are both needed?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the day of Badr called in the Quran?",
        "options": [
          "The Day of the Conquest",
          "The Day of the Criterion",
          "The Day of Hunayn",
          "The Day of the Elephant"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A dawn star",
        "description": "A star for the night a prophet prayed until his cloak fell."
      },
      "badge": "Of the People of Badr"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah Aal-Imran: 123, and Sahih Muslim",
      "note": "The victory at Badr and the support of angels are in the Quran; the Prophet praying until his cloak fell is in Sahih Muslim."
    }
  },
  "mercy-to-captives": {
    "title": "The Captives of Badr, Who Taught the Children",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After Badr the captives came to Madinah, and the Prophet ﷺ told his companions to treat them well — so the companions gave them the bread and ate dates themselves. When the time came to free them, the Prophet ﷺ set the ransom of a captive who could read and write, but had no money, at teaching ten Muslim children to read and write.",
        "shortLesson": "Knowledge can free a captive, and mercy comes before revenge."
      },
      "tier_2_age_9_11": {
        "narrative": "When the battle ended, the captives were brought into Madinah, and the Prophet ﷺ instructed his companions: “Treat the captives well.” So the companions would give them the bread and eat dates themselves, out of honour for them. When the time came to release them, those with money paid a ransom; and a captive who could read and write but had no money was ransomed by teaching ten Muslim children to read and write — and then he went free. The point was never revenge: captivity itself became a door to spreading learning.",
        "details": "Allah praises kindness to a captive: ﴿وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا﴾."
      }
    },
    "interactive": {
      "discover": "Few in Mecca could write, which is why teaching writing was worth as much as a ransom in money.",
      "value": {
        "name": "Mercy, and the worth of learning",
        "icon": "✍️"
      },
      "thinkQuestion": "Why do you think teaching was made a ransom equal to money?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How was a captive who could write, but had no money, ransomed?",
        "options": [
          "By farming work",
          "By teaching ten children to read and write",
          "By staying a captive",
          "By leaving the peninsula"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A tablet and pen",
        "description": "A tablet for a captive who won his freedom by teaching."
      },
      "badge": "Spreader of Learning"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Musnad Ahmad, and Ibn Hisham's Seerah",
      "note": "The ransom-by-teaching is reported in Musnad Ahmad and Ibn Sa'd, and scholars have discussed its chain; kindness to captives is established in the Quran."
    }
  },
  "mount-of-archers-uhud": {
    "title": "The Archers' Hill and the Order",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh came to Uhud with three thousand fighters. The Prophet ﷺ placed fifty archers on a hill to guard the army's back, and told them: do not leave your place, whether you see us winning or losing. At the start of the battle the Muslims advanced and the idolaters fell back, and victory was close.",
        "shortLesson": "An order is carried out to the end, not to the first success."
      },
      "tier_2_age_9_11": {
        "narrative": "Quraysh gathered three thousand fighters and came to Madinah seeking revenge for Badr. The Muslims went out to meet them at Mount Uhud, and the Prophet ﷺ set a plan to guard the army's back: fifty skilled archers on a hill, under Abdullah ibn Jubayr, and he pressed the order on them: “If you see us being snatched away by birds, do not leave this place until I send for you; and if you see us defeating them and trampling them, do not leave until I send for you.” At the start of the battle the Muslims advanced and the idolaters broke, and victory was close.",
        "details": "Allah says: ﴿أَطِيعُوا اللَّهَ وَرَسُولَهُ وَلَا تَوَلَّوْا عَنْهُ وَأَنتُمْ تَسْمَعُونَ﴾ — “Obey Allah and His Messenger, and do not turn away while you hear.”"
      }
    },
    "interactive": {
      "discover": "Abdullah ibn Jubayr, who led the archers, held his place with the few who stayed.",
      "value": {
        "name": "Discipline",
        "icon": "🏹"
      },
      "thinkQuestion": "Which task do you tend to leave before it is finished? What happens because of it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ order the archers?",
        "options": [
          "To come down at victory",
          "Not to leave their place until he sent for them",
          "To collect the spoils",
          "To join the army"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An arrow from Uhud",
        "description": "An arrow to remind you to finish what you were given."
      },
      "badge": "Holding the Position"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The Prophet's order to the archers at Uhud is established in Sahih al-Bukhari."
    }
  },
  "tough-lesson-and-heroine": {
    "title": "The Lesson of Uhud, and Nusaybah",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Most of the archers thought the battle was over, and came down from the hill before the Prophet ﷺ gave them leave. The horsemen of Quraysh came round behind them and the battle turned. The Prophet ﷺ held firm with a few, and Nusaybah bint Ka'b took up a sword and a shield to defend him until she was wounded.",
        "shortLesson": "One person's mistake in shared work is paid for by everyone."
      },
      "tier_2_age_9_11": {
        "narrative": "When the archers saw the idolaters breaking, they thought the battle was decided, and most came down from the hill for the spoils before the Prophet ﷺ gave them leave; their commander Abdullah ibn Jubayr stayed with a few. The horsemen of Quraysh used the gap, came round behind the hill and struck the Muslims from behind, and the ranks were thrown into confusion. The Prophet ﷺ held firm with a small group, and Nusaybah bint Ka'b — Umm Ammarah — put down the waterskin she was carrying, took a sword and a shield, and fought in front of the Messenger of Allah ﷺ until she carried many wounds. Uhud was a lesson: breaking the plan costs dearly, and standing firm in hardship makes heroes.",
        "details": "Allah says after Uhud: ﴿وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ﴾ — “Do not weaken and do not grieve; you will be uppermost.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ said of that day: “I did not turn right or left without seeing her fighting in front of me.”",
      "value": {
        "name": "Standing firm",
        "icon": "🛡️"
      },
      "thinkQuestion": "In shared work, why does one person's mistake reach everyone?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Who defended the Prophet ﷺ at Uhud until she was wounded?",
        "options": [
          "Khadijah",
          "Nusaybah bint Ka'b",
          "Fatimah",
          "Asma"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small shield",
        "description": "A shield for a woman who stood where others fell back."
      },
      "badge": "Firm in Hardship"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari, and Ibn Sa'd's Tabaqat",
      "note": "The archers leaving and the battle turning are in Sahih al-Bukhari; the account of Nusaybah is in Musnad Ahmad and Ibn Sa'd."
    }
  },
  "trench-salman-idea": {
    "title": "Ten Thousand, and the Idea of a Trench",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The tribes gathered into an army called the Confederates — ten thousand fighters — and marched on Madinah. The Prophet ﷺ asked his companions for their view, and Salman al-Farisi said: Messenger of Allah, in Persia, when we were besieged, we dug a trench around ourselves. The Prophet ﷺ liked the idea and ordered the digging.",
        "shortLesson": "A useful idea is taken from whatever country it comes from."
      },
      "tier_2_age_9_11": {
        "narrative": "The Arab tribes and their allies gathered into an army called the Confederates, some ten thousand fighters, and marched on Madinah. The Prophet ﷺ gathered his companions to consult on a plan that would protect the women and children. Salman al-Farisi stepped forward and said: “Messenger of Allah, in Persia, when we were besieged, we dug a trench around ourselves.” Digging a wide, deep trench across the open side of the city was new to the Arabs — they had not used it before. The Prophet ﷺ liked it and ordered the digging, and the city was shielded by a barrier no horse could cross.",
        "details": "Allah describes that siege: ﴿إِذْ جَاءُوكُم مِّن فَوْقِكُمْ وَمِنْ أَسْفَلَ مِنكُمْ﴾ — “when they came at you from above you and from below you.”"
      }
    },
    "interactive": {
      "discover": "Salman came from Persia, and brought his country's experience with him to Madinah.",
      "value": {
        "name": "Learning from others' experience",
        "icon": "⛏️"
      },
      "thinkQuestion": "What useful thing have you learned from someone who came from another country?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Who suggested digging the trench?",
        "options": [
          "Abu Bakr",
          "Salman al-Farisi",
          "Umar",
          "Al-Hubab ibn al-Mundhir"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small pickaxe",
        "description": "A pickaxe to remind you that a good idea has no homeland."
      },
      "badge": "One With an Idea"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah",
      "note": "Salman's suggestion of the trench is well known in the Seerah, reported by Ibn Ishaq; the battle itself is established in the Quran and both Sahih collections."
    }
  },
  "prophet-work-and-food-miracle": {
    "title": "The Leader's Pickaxe, and Food That Did Not Run Out",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ came down and dug with his companions, a stone tied over his stomach from hunger. Jabir ibn Abdullah saw it, went home and slaughtered a small animal while his wife ground a measure of barley, and invited him with a few others. The Prophet ﷺ called all the people of the trench — and they ate until they were full, and food was left over.",
        "shortLesson": "A leader tires alongside his team, not ahead of them or apart from them."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ did not sit and watch: he went down into the trench, digging and carrying earth with his companions, a stone tied over his stomach from hunger, chanting with them to lift their spirits. Jabir ibn Abdullah saw how hungry he was, went home and slaughtered a small animal, and his wife ground a measure of barley; then he came quietly to invite the Prophet ﷺ and a few with him. When the Prophet ﷺ knew of it, he called out at the top of his voice: “People of the trench, Jabir has made food — come!” Everyone came. He prayed over the pot and the dough, and the whole company ate until they were full, and the food was still there.",
        "details": "Allah says of his care for them: ﴿عَزِيزٌ عَلَيْهِ مَا عَنِتُّمْ حَرِيصٌ عَلَيْكُم﴾ — “Your hardship is grievous to him, and he is concerned for you.”"
      }
    },
    "interactive": {
      "discover": "The food was enough for a handful of people, and the whole of the trench — a thousand men — ate from it.",
      "value": {
        "name": "Leading by working",
        "icon": "🍲"
      },
      "thinkQuestion": "If you led a team, which job would you do yourself before asking anyone else to?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ do when he heard about Jabir's food?",
        "options": [
          "Ate alone",
          "Called all the people of the trench",
          "Sent the food back",
          "Put it off until the next day"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small cooking pot",
        "description": "A pot to remind you that food grows when it is shared."
      },
      "badge": "Leading by Example"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "Jabir's account of the food at the trench is established in both Sahih collections, including the Prophet digging with them and the stone tied over his stomach."
    }
  },
  "cold-wind-victory-without-swords": {
    "title": "The Wind of Victory, and the End of the Confederates",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The idolaters stood helpless at the trench for a month, and the cold and the fear grew hard. The Prophet ﷺ prayed to his Lord, and Allah sent a bitterly cold wind that tore up their tents, put out their fires and overturned their pots — and they left in the night. The Muslims woke to find the plain empty.",
        "shortLesson": "Allah can turn the hardest situation without a sword being raised."
      },
      "tier_2_age_9_11": {
        "narrative": "The army of the Confederates stood before the trench, unable to cross it with their horses, and the siege dragged on for close to a month, with cold and hunger and fear pressing on those inside the city. The Prophet ﷺ stood praying to his Lord to give the Muslims victory and spare them. Allah sent upon the camp of the Confederates a bitterly cold wind on a dark night: it tore up their tents, put out their fires, overturned their cooking pots and filled their hearts with dread. Their commander ordered them to leave that same night. The Muslims woke to an empty plain — victory without a battle — and that alliance broke apart and never gathered again.",
        "details": "Allah says: ﴿فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا﴾ — “We sent against them a wind, and armies you did not see.”"
      }
    },
    "interactive": {
      "discover": "Afterwards the Prophet ﷺ said: “Now we go to them, and they do not come to us” — the years of being besieged were over.",
      "value": {
        "name": "Patience until relief",
        "icon": "🌬️"
      },
      "thinkQuestion": "When waiting through something hard drags on, what helps you stay patient?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the siege of the Confederates end?",
        "options": [
          "With a great battle",
          "With a fierce wind Allah sent, and they left",
          "With a written treaty",
          "With gifts sent to them"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A feather in the wind",
        "description": "A feather: the slightest means is enough when Allah wills it."
      },
      "badge": "Patient Until Dawn"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah Al-Ahzab: 9, and Sahih Muslim",
      "note": "The wind and the unseen armies are stated in the Quran; the departure of the Confederates is in Sahih Muslim."
    }
  },
  "hudaybiyyah-peace-treaty": {
    "title": "Hudaybiyyah: Peace in the Clothes of Pilgrimage",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ set out with one thousand four hundred companions in the white clothes of pilgrimage, carrying no weapons of war, intending the lesser pilgrimage. Quraysh turned them back. He chose a treaty over a battle, and accepted terms that looked hard, to keep blood from being spilt. Umm Salamah advised him to shave his head and offer his sacrifice in front of the people — he did, and they followed him.",
        "shortLesson": "Sometimes the bravest decision is to choose peace."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ set out with one thousand four hundred of his companions in the white clothes of pilgrimage, carrying nothing but a traveller's sword in its sheath, meaning to perform the lesser pilgrimage after years of longing for the House. Quraysh blocked them and kept them from the Sacred Mosque. The Prophet ﷺ refused to begin a fight and looked for every road that would spare blood. The two sides sat at Hudaybiyyah and negotiated, and he accepted terms that seemed hard: that they return this year without the pilgrimage, and that war be set aside for ten years. It weighed on the companions. Umm Salamah advised him to go out, shave his head and offer his sacrifice in front of them without speaking to anyone. He did — and they rose and did the same.",
        "details": "Allah called this treaty a conquest: ﴿إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا﴾ — “Indeed, We have given you a clear conquest.”"
      }
    },
    "interactive": {
      "discover": "In the two years after Hudaybiyyah, more people entered Islam than in all the years before it.",
      "value": {
        "name": "Choosing peace",
        "icon": "🕊️"
      },
      "thinkQuestion": "When is giving up something you want today a gain tomorrow?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Umm Salamah advise the Prophet ﷺ to do?",
        "options": [
          "To return to fighting",
          "To shave and sacrifice before the people, without speaking",
          "To wait a year",
          "To enter Mecca by force"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A white pilgrim's cloth",
        "description": "White cloth for an army that set out without weapons of war."
      },
      "badge": "Peacemaker"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "Hudaybiyyah and Umm Salamah's counsel are established in Sahih al-Bukhari; the treaty is called a conquest in Surah Al-Fath."
    }
  },
  "letters-to-world-leaders": {
    "title": "Letters to the Kings of the Earth",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "When the fighting was set aside after Hudaybiyyah, the Prophet ﷺ did not sit and wait. He had a ring made, engraved “Muhammad, the Messenger of Allah”, and wrote letters to the kings of his time: Caesar of Rome, Khosrau of Persia, al-Muqawqis in Alexandria and the Negus in Abyssinia — calling them with words, not with a sword.",
        "shortLesson": "A good word reaches where an army cannot."
      },
      "tier_2_age_9_11": {
        "narrative": "When the treaty of Hudaybiyyah set the fighting aside for ten years, the Prophet ﷺ spent that safety on calling people, not on war. He had a silver ring made, engraved in three lines — “Muhammad, the Messenger of Allah” — because kings would not read an unsealed letter. He chose companions who could carry a message well, and sent letters to the great rulers of his day: Heraclius the Caesar of Rome, Khosrau the king of Persia, al-Muqawqis the ruler of the Copts in Egypt, the Negus of Abyssinia and others. One short letter, calling to the worship of Allah alone, and to justice and peace. Some honoured the messenger and answered with gifts; one tore the letter up. Not one of them was forced to anything.",
        "details": "Allah says of the message's reach: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا كَافَّةً لِّلنَّاسِ بَشِيرًا وَنَذِيرًا﴾ — “We have sent you to all people, as a bringer of good news and a warner.”"
      }
    },
    "interactive": {
      "discover": "The engraving on the ring was cut in reverse, so the seal came out the right way round in the wax.",
      "value": {
        "name": "Dialogue and calling",
        "icon": "✉️"
      },
      "thinkQuestion": "Why does a word sometimes reach a heart that nothing else can?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the Prophet ﷺ have an engraved ring made?",
        "options": [
          "As jewellery",
          "To seal letters — kings would not read an unsealed one",
          "To trade with",
          "To give away"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A sealed ring",
        "description": "A ring for a message that crossed seas without an army."
      },
      "badge": "Messenger of the Word"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The Prophet's letter to Heraclius and his taking a seal-ring are established in Sahih al-Bukhari."
    }
  },
  "battle-of-khaybar-hero-ali": {
    "title": "The Forts of Khaybar and the Bearer of the Banner",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The forts of Khaybar in the north were a base funding those who fought Madinah, so the Prophet ﷺ went out to secure the frontier. When they reached the strongest fort he said: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love.” He called Ali ibn Abi Talib, whose eyes were sore, healed them, and handed him the banner.",
        "shortLesson": "A hard task is given to the person fit for it."
      },
      "tier_2_age_9_11": {
        "narrative": "The forts of Khaybar, north of Madinah, were a base gathering money and weapons and stirring the tribes against the Muslims, so the Prophet ﷺ went out to secure the frontier and end the danger. The Muslims took the forts one after another until they reached the strongest of them. The Prophet ﷺ said: “Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love; Allah will grant victory through him.” The people spent the night wondering which of them it would be. In the morning he asked: “Where is Ali ibn Abi Talib?” They said his eyes were sore. He called for him, treated his eyes, and they were healed as though he had never had any pain — and he handed him the banner, and the fort was opened through him. Afterwards the Prophet ﷺ settled with the people of Khaybar that they stay and farm their land, with a share of its produce.",
        "details": "Allah says: ﴿فَأَنزَلَ السَّكِينَةَ عَلَيْهِمْ وَأَثَابَهُمْ فَتْحًا قَرِيبًا﴾ — “He sent down tranquillity upon them and rewarded them with a near victory.”"
      }
    },
    "interactive": {
      "discover": "The people of Khaybar stayed working their own land afterwards; they were not driven out.",
      "value": {
        "name": "The right person in the right place",
        "icon": "🏰"
      },
      "thinkQuestion": "How do you choose who takes on the hardest job in your team?",
      "challenge": {
        "type": "multiple_choice",
        "question": "To whom did the Prophet ﷺ give the banner at Khaybar?",
        "options": [
          "Abu Bakr",
          "Ali ibn Abi Talib",
          "Salman",
          "Bilal"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small banner",
        "description": "A banner: a trust is handed to the one who can carry it."
      },
      "badge": "Bearer of the Banner"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The hadith of the banner at Khaybar and the healing of Ali's eyes are established in both Sahih collections."
    }
  },
  "makkah-march-ten-thousand-fires": {
    "title": "Ten Thousand Fires in One Night",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh broke the treaty of Hudaybiyyah by helping an attack on Khuza'ah, who were the Muslims' allies, so those wronged had to be defended. The Prophet ﷺ prepared ten thousand men and moved in complete secrecy until he camped near Mecca. Then he ordered every man to light a fire — and Quraysh saw the hills burning with ten thousand fires, and knew that fighting was hopeless.",
        "shortLesson": "The best victory is the one in which no blood is shed."
      },
      "tier_2_age_9_11": {
        "narrative": "Quraysh broke the treaty of Hudaybiyyah when they helped their allies against Khuza'ah — who were under the Prophet's covenant — and men of Khuza'ah were killed, so the Muslims were bound to defend the allies who had been wronged. The Prophet ﷺ prepared ten thousand men and moved in strict secrecy so that Quraysh would not gather for a battle, and camped at Marr az-Zahran near Mecca. Then he ordered every man in the army to light a fire, and in one night the hills were covered with ten thousand fires. When Abu Sufyan and the people of Mecca saw it, they were certain that resistance was pointless, and the city gave in without a battle. The aim was never to terrify, but to stop a fight before it started.",
        "details": "Allah says about defending the wronged: ﴿وَإِنِ اسْتَنصَرُوكُمْ فِي الدِّينِ فَعَلَيْكُمُ النَّصْرُ﴾ — “If they seek your help, then help is your duty.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ entered Mecca with a great army, and almost no fighting took place in it.",
      "value": {
        "name": "Sparing blood",
        "icon": "🔥"
      },
      "thinkQuestion": "How do you keep a disagreement from turning into a fight?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the Prophet ﷺ order every man to light a fire?",
        "options": [
          "For cooking",
          "So Mecca would see the size of the army and give up fighting",
          "Only for warmth",
          "To celebrate"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small torch",
        "description": "A torch for the night a battle was prevented."
      },
      "badge": "Preventer of Fighting"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah",
      "note": "The lighting of the fires at Marr az-Zahran is well known in the Seerah, from Ibn Ishaq; the conquest itself and the breaking of the treaty are established in both Sahih collections."
    }
  },
  "day-of-mercy-entry": {
    "title": "Today Is a Day of Mercy",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ entered Mecca with his head bowed low over his mount, almost touching the saddle, in humility before Allah. A man called out: “Today is a day of slaughter!” The Prophet ﷺ answered him: “Today is a day of mercy.” Then he went round the House, with three hundred and sixty idols about it, striking them with a stick in his hand until they fell, reciting: “Truth has come and falsehood has vanished.”",
        "shortLesson": "Real victory makes you humbler, not prouder."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ entered the city that had driven him out and harmed him — not with his head raised in triumph, but bowed over his mount until it almost touched the saddle, in thanks to Allah and humility before Him. He gave the city safety: “Whoever enters the house of Abu Sufyan is safe, whoever shuts his own door is safe, and whoever enters the Sacred Mosque is safe.” When one of his commanders said, “Today is a day of slaughter!”, the Prophet ﷺ took the banner from him and said: “Today is a day of mercy.” Then he went to the Kaaba, with three hundred and sixty idols standing around it, and struck them one after another with the stick in his hand as they fell, reciting, “Truth has come and falsehood has vanished” — until the House returned to what Ibrahim had built it for: the worship of Allah alone.",
        "details": "Allah says: ﴿إِنَّ الْبَاطِلَ كَانَ زَهُوقًا﴾ — “falsehood is bound to vanish.”"
      }
    },
    "interactive": {
      "discover": "He declared safety for anyone who simply shut his own door; no one was hunted in his house.",
      "value": {
        "name": "Humility in victory",
        "icon": "🕋"
      },
      "thinkQuestion": "What is the difference between being glad about success and being proud of it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the Prophet ﷺ answer “Today is a day of slaughter”?",
        "options": [
          "He agreed",
          "He said: Today is a day of mercy",
          "He said nothing",
          "He ordered fighting"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small stick",
        "description": "A stick: falsehood falls, however long it has stood."
      },
      "badge": "Humble in Victory"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "His bowed entry, the declaration of safety, and the breaking of the idols with that verse are all in the two Sahih collections; “Today is a day of mercy” is in al-Bukhari."
    }
  },
  "go-you-are-free": {
    "title": "Go — You Are Free",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The people of Mecca gathered at the Kaaba waiting to hear what would be done to them — the same people who had driven him out and tortured his companions for twenty years. He asked them: “What do you think I will do with you?” They said: good; a noble brother and the son of a noble brother. He said: “Go — you are free.”",
        "shortLesson": "The greatest strength is to forgive when you are able to punish."
      },
      "tier_2_age_9_11": {
        "narrative": "The people of Mecca gathered at the door of the Kaaba, waiting for his judgement. They knew he had power over them that day, and they knew what they had done: they had driven him from his city, tortured his companions, fought him for twenty years and killed his uncle. He looked at them with pardon and said: “People of Quraysh, what do you think I will do with you?” They answered: “Good — a noble brother, and the son of a noble brother.” He said: “Go — you are free.” He held no one, took no property, and took revenge on no one. Many of them entered Islam that day, not out of fear but out of love, and the whole enmity ended in a single sentence. With that, the years of defending the homeland reached their purpose: safety and justice, without revenge.",
        "details": "Allah says of his character: ﴿خُذِ الْعَفْوَ وَأْمُرْ بِالْعُرْفِ﴾ — “Take to forgiveness, and enjoin what is good.”"
      }
    },
    "interactive": {
      "discover": "“At-Tulaqa” — the freed ones — became a name in history for the people of Mecca he pardoned that day.",
      "value": {
        "name": "Pardon when you are able",
        "icon": "💛"
      },
      "thinkQuestion": "Who is one person you could forgive today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ say to the people of Mecca on the day of the conquest?",
        "options": [
          "He held them to account",
          "Go — you are free",
          "He drove them out of Mecca",
          "He took their property"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An open lock",
        "description": "An open lock for the day one who could punish pardoned everyone."
      },
      "badge": "Pardon With Power"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, and al-Bayhaqi's Sunan",
      "note": "“Go, you are free” is well known in the Seerah from Ibn Ishaq and al-Bayhaqi; the general pardon of Mecca is widely established."
    }
  },
  "cave-thawr-preparation": {
    "title": "Cave Thawr, and a Friend Who Went In First",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ and Abu Bakr climbed a rugged mountain to a dark cave called Cave Thawr. Abu Bakr asked to go in first to check the place, and began stopping up the cracks with pieces torn from his own clothes. Then the Prophet ﷺ slept with his head in Abu Bakr's lap — and when something stung him, Abu Bakr did not move, so as not to wake him.",
        "shortLesson": "A true friend takes the hurt so his companion does not have to."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ and his companion Abu Bakr climbed a rugged mountain by an untravelled path to a dark cave near its top, called Cave Thawr. Abu Bakr asked to go in ahead of the Prophet ﷺ to make the place safe. He went into the dark and began stopping up every crack and hole he found with pieces torn from his own clothes, until he had nothing left to tear. Then the Prophet ﷺ slept, his blessed head in Abu Bakr's lap, worn out from the journey. Something stung Abu Bakr from one of the openings and hurt him badly — and he did not move a limb or make a sound, so as not to wake the Prophet ﷺ, until a tear fell from the pain. The Prophet ﷺ woke, and prayed for him.",
        "details": "Allah says of the truthful: ﴿وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ﴾ — “the one who brought the truth and believed in it.”"
      }
    },
    "interactive": {
      "discover": "Mount Thawr is high and hard to climb, and it lies in the opposite direction from the road to Madinah — which is exactly why the Prophet ﷺ chose it.",
      "value": {
        "name": "Loyalty in friendship",
        "icon": "🕯️"
      },
      "thinkQuestion": "What small thing could you put up with today to spare a friend or a sibling?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did Abu Bakr go into the cave before the Prophet ﷺ?",
        "options": [
          "To rest first",
          "To check the place and stop up its holes before the Prophet ﷺ entered",
          "To take the food",
          "Because he arrived first"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A scrap of cloth",
        "description": "A scrap of cloth for the man who tore his own clothes to protect someone else."
      },
      "badge": "A Loyal Companion"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, and al-Hakim's Mustadrak",
      "note": "That the Prophet ﷺ and Abu Bakr stayed in the cave is established in the Quran and Sahih al-Bukhari; the details of stopping the holes and the sting come from the Seerah literature, and scholars have questioned their chains."
    }
  },
  "spider-and-dove": {
    "title": "Fragile Threads, and Soldiers You Cannot See",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The horsemen of Quraysh followed the tracks until they stood at the mouth of the cave. The Seerah books mention that a spider had woven over the opening and a dove had nested there, so they said: no one could have gone in past all this — and they turned away. What the Quran itself tells us is that Allah protected him, and sent down His tranquillity upon him.",
        "shortLesson": "Allah's protection needs no army; the frailest means is enough."
      },
      "tier_2_age_9_11": {
        "narrative": "The horsemen of Quraysh followed the tracks to Mount Thawr and searched it until they were at the very mouth of the cave — so close that Abu Bakr said: if one of them looked down at his feet, he would see us. Yet they were kept from them and did not go in, and they went back empty-handed. The Seerah books mention that a spider had woven its threads across the opening and a dove had nested there, so the men said: if anyone had gone in, the web would be torn and the dove would have flown. That account is famous among people, but it has not been established with a strong chain by the scholars of hadith. What is beyond doubt is what the Quran tells us: that Allah gave him victory and sent down His tranquillity upon him, and that He has soldiers no one knows but Him.",
        "details": "Allah says: ﴿وَمَا يَعْلَمُ جُنُودَ رَبِّكَ إِلَّا هُوَ﴾ — “and none knows the soldiers of your Lord except Him.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ and Abu Bakr stayed in the cave three nights, until the search for them slackened.",
      "value": {
        "name": "Trust in Allah's protection",
        "icon": "🕸️"
      },
      "thinkQuestion": "Why does Allah sometimes protect through the weakest means rather than the strongest?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What does the Quran tell us about the Prophet's protection in the cave?",
        "options": [
          "That an army protected him",
          "That Allah gave him victory and sent down His tranquillity upon him",
          "That he left by another entrance",
          "That nobody looked for him"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A single thread",
        "description": "One thread: safety comes from Allah, not from the strength of the means."
      },
      "badge": "Trusting in Allah's Care"
    },
    "source": {
      "reliability": "🟡",
      "reference": "The Quran, Surah At-Tawbah: 40, and Sahih al-Bukhari",
      "note": "Allah screening the Prophet ﷺ in the cave and sending down tranquillity is established in the Quran and al-Bukhari. The spider and the dove are widely repeated but not established with a strong chain, so they are given here as Seerah lore, not as established fact."
    }
  },
  "do-not-be-sad": {
    "title": "Do Not Grieve — Allah Is With Us",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Abu Bakr heard the men above the cave and said: Messenger of Allah, if one of them looked down at his feet he would see us! The Prophet ﷺ answered him calmly: “What do you think of two whose third is Allah?” and “Do not grieve — Allah is with us.” And Abu Bakr's heart settled.",
        "shortLesson": "Certainty in Allah calms the heart at the most dangerous moment."
      },
      "tier_2_age_9_11": {
        "narrative": "Abu Bakr heard the voices and footsteps of the idolaters above the cave, and he was afraid — not for himself, but for the Messenger of Allah ﷺ. He said: Messenger of Allah, if one of them looked down at his feet he would see us! The Prophet ﷺ looked at him calmly and said: “What do you think of two whose third is Allah?” and “Do not grieve — Allah is with us.” He added nothing more, and Abu Bakr's fear left him. Allah preserved this moment in His Book: the cave, the words the Prophet ﷺ said to his companion, and the tranquillity Allah sent down upon him.",
        "details": "Allah says: ﴿إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾ — “when he said to his companion, do not grieve; Allah is with us.”"
      }
    },
    "interactive": {
      "discover": "That single sentence — “do not grieve, Allah is with us” — is a verse Muslims still recite today.",
      "value": {
        "name": "Stillness and certainty",
        "icon": "🌙"
      },
      "thinkQuestion": "What is something someone says to you that takes your fear away?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the Prophet ﷺ reassure Abu Bakr in the cave?",
        "options": [
          "He told him the men had gone",
          "He said: do not grieve, Allah is with us",
          "He told him to leave",
          "He gave him a sword"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small crescent",
        "description": "A crescent for the night when fear was near and calm was nearer."
      },
      "badge": "A Settled Heart"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah At-Tawbah: 40, and Sahih al-Bukhari",
      "note": "The story is established in the text of the Quran, and the words “two whose third is Allah” are in Sahih al-Bukhari."
    }
  },
  "expert-guide": {
    "title": "An Expert Guide Who Was Not a Muslim",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh were watching the usual road to Madinah, so the Prophet ﷺ took the coastal route — rough country that people did not travel. He hired an expert guide named Abdullah ibn Urayqit, who followed his people's religion and was not a Muslim, but who was skilled and kept his word — so the Prophet ﷺ trusted him with the road.",
        "shortLesson": "Choose for a job the person who does it well and keeps a trust."
      },
      "tier_2_age_9_11": {
        "narrative": "Quraysh had put watchers on the usual road to Madinah, so the Prophet ﷺ and Abu Bakr planned to take the coastal route: rough country that people did not normally travel, where no one would look for them. And because the desert cannot be crossed without someone who knows it, they hired a man skilled in its paths, Abdullah ibn Urayqit. He followed his people's religion and was not a Muslim — and still the Prophet ﷺ trusted him with the most dangerous journey of his life, because he was good at his work and known for keeping his word. They handed him the two mounts, and three nights later he met them at the cave and they set off. Skill and trustworthiness are recognised in whoever has them, and work is given to the one who can do it.",
        "details": "Allah says: ﴿وَأَوْفُوا بِالْعَهْدِ إِنَّ الْعَهْدَ كَانَ مَسْئُولًا﴾ — “and fulfil the covenant; the covenant will be asked about.”"
      }
    },
    "interactive": {
      "discover": "The road they took was the coastal route — longer than the usual road, but far better hidden.",
      "value": {
        "name": "Trustworthiness and skill",
        "icon": "🧭"
      },
      "thinkQuestion": "When you need help with something you don't know, who do you pick, and why?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the guide the Prophet ﷺ hired like?",
        "options": [
          "He was one of his closest companions",
          "He knew the roads and kept his word, though he was not a Muslim",
          "He was the youngest of them",
          "He knew only Mecca"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An old compass",
        "description": "A compass: the work goes to whoever can do it well."
      },
      "badge": "Chooser of the Right Hand"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The hiring of Abdullah ibn Urayqit as guide, and that he followed the religion of Quraysh, are established in Sahih al-Bukhari's account of the migration."
    }
  },
  "umm-mabad-tent": {
    "title": "Umm Ma'bad's Tent, and a Sheep With No Milk",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On the way the travellers passed the tent of a generous woman called Umm Ma'bad. They asked to buy food and she had none — it was a dry year. The Prophet ﷺ saw a thin sheep, asked her permission to milk it, mentioned Allah's name and prayed — and it gave milk. He gave everyone to drink, and drank last himself.",
        "shortLesson": "A leader serves everyone else, and drinks last."
      },
      "tier_2_age_9_11": {
        "narrative": "On the way the travellers passed the tent of a generous woman called Umm Ma'bad of Khuza'ah. They asked to buy meat or dates, and she apologised: it was a dry year and she had nothing to sell. The Prophet ﷺ saw a thin sheep at the side of the tent and asked, “What is this sheep, Umm Ma'bad?” She said: hunger has left her behind the flock. He asked, “Does she have milk?” She said: she is too weak for that. He asked her permission to milk her, and she said: if there is milk in her, then milk her. He wiped her udder, mentioned Allah's name and prayed, and she gave milk — enough to fill a vessel for the whole company. He gave Umm Ma'bad to drink first until she had had her fill, then his companions, then drank last himself, and then milked the sheep again and left the milk with her.",
        "details": "Allah says of blessing: ﴿لَفَتَحْنَا عَلَيْهِم بَرَكَاتٍ مِّنَ السَّمَاءِ وَالْأَرْضِ﴾ — “We would have opened to them blessings from the heaven and the earth.”"
      }
    },
    "interactive": {
      "discover": "Umm Ma'bad described the Prophet ﷺ to her husband in such careful detail that it became one of the most famous descriptions of him.",
      "value": {
        "name": "Putting others first",
        "icon": "🥛"
      },
      "thinkQuestion": "When did you last let someone else go before you in something you wanted?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Who did the Prophet ﷺ give to drink first at Umm Ma'bad's tent?",
        "options": [
          "He drank first himself",
          "Umm Ma'bad, then his companions, and he drank last",
          "Only the guide",
          "No one drank"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A bowl of milk",
        "description": "A bowl for the one who served everyone and drank last."
      },
      "badge": "Generous and Selfless"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Al-Hakim's Mustadrak, and al-Bayhaqi's Dala'il",
      "note": "The account of Umm Ma'bad is well known, reported by al-Hakim, al-Bayhaqi and at-Tabarani; some scholars graded it good while others questioned its chain, so it is famous rather than agreed to be authentic."
    }
  },
  "suraqa-and-hundred-camels": {
    "title": "A Hundred Camels, and a Horse That Sank",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Quraysh promised a hundred camels to whoever brought the Prophet ﷺ back. Suraqah ibn Malik wanted them and rode after him — and when he drew near, his horse's legs sank into the ground and threw him. He mounted again, and again it sank. He knew then that this affair was under protection, asked for safety, and went back turning people away from the road.",
        "shortLesson": "Greed brings loss, and what Allah protects cannot be overcome."
      },
      "tier_2_age_9_11": {
        "narrative": "Quraysh promised a hundred camels to whoever brought back the Prophet ﷺ or Abu Bakr, and Suraqah ibn Malik — a skilled horseman — wanted them. He took his weapons and his horse and rode after them. Abu Bakr kept looking back in fear while the Prophet ﷺ recited and did not turn round. When Suraqah came close, his horse's legs sank into the ground up to the knees and threw him off. He got up and mounted again, and as soon as he was settled it sank again. Then Suraqah knew that this affair was under a protection he could not reach, so he called out asking for safety, and they granted it. He asked the Prophet ﷺ for a written guarantee, and it was written for him. Suraqah went back turning people away from that road, saying: this side has been searched. And later he became a Muslim.",
        "details": "Allah says: ﴿وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ وَاللَّهُ خَيْرُ الْمَاكِرِينَ﴾ — “they plan, and Allah plans; and Allah is the best of planners.”"
      }
    },
    "interactive": {
      "discover": "The Seerah books say the Prophet ﷺ told him he would one day wear the bracelets of Khosrau — which happened in the caliphate of Umar.",
      "value": {
        "name": "Learning from where greed leads",
        "icon": "🐎"
      },
      "thinkQuestion": "Have you ever seen someone give up something they wanted once they realised they were in the wrong? How would you do it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What happened to Suraqah as he chased the Prophet ﷺ?",
        "options": [
          "He caught him",
          "His horse's legs sank into the ground and threw him, and he asked for safety",
          "He lost the road",
          "He turned back at the start"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A horse's hoof",
        "description": "A hoofprint for the rider who was fastest and still did not arrive."
      },
      "badge": "One Who Took Heed"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "Suraqah and his horse sinking are established in Sahih al-Bukhari's account of the migration; the promise of Khosrau's bracelets comes from the Seerah literature and the Musnad."
    }
  },
  "buraida-white-banner": {
    "title": "Buraydah, and a Turban That Became a Banner",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Buraydah ibn al-Husayb rode out with seventy of his people after the reward Quraysh had promised. When they met the Prophet ﷺ he asked their names and spoke to them gently about Islam — and they all became Muslims in one sitting. Buraydah untied his turban, fastened it to his spear as a white banner, and they rode on guarding the Prophet ﷺ.",
        "shortLesson": "A gentle word wins people a sword never could."
      },
      "tier_2_age_9_11": {
        "narrative": "Buraydah ibn al-Husayb al-Aslami rode out with seventy of his people looking for the Prophet ﷺ, after the reward Quraysh had promised. When they met him in the desert he did not meet them harshly; he asked, “Who are you?” The man said: Buraydah. The Prophet ﷺ took his name as a good sign, and then spoke to him about Islam gently and easily. The words settled in his heart and in the hearts of his people until they all became Muslims in that one sitting — seventy men after a reward became seventy guards. Then Buraydah wanted the Prophet ﷺ to enter Madinah with honour, so he untied the turban from his head and fastened it to his spear as a white banner, and they rode ahead of him.",
        "details": "Allah says: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾ — “call to the way of your Lord with wisdom and good counsel.”"
      }
    },
    "interactive": {
      "discover": "Buraydah later became one of the narrators of hadith; he settled in Basra and then went out to Khurasan.",
      "value": {
        "name": "Gentleness in speech",
        "icon": "🏳️"
      },
      "thinkQuestion": "Have you ever answered someone who angered you gently? What happened?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Buraydah do after he became a Muslim?",
        "options": [
          "Went back to his people",
          "Untied his turban as a white banner on his spear and rode guarding the Prophet ﷺ",
          "Took the reward",
          "Said nothing and left"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A white banner",
        "description": "A white banner that was once the turban of a man who changed his mind."
      },
      "badge": "Gentle of Speech"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Sa'd's Tabaqat, and al-Bayhaqi's Dala'il",
      "note": "The account of Buraydah and his seventy men is reported in the Seerah and Tabaqat literature rather than the two Sahih collections; that he became a Muslim is well established."
    }
  },
  "quba-first-mosque": {
    "title": "Quba, and the First Mosque Built",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ stopped at Quba on the edge of Madinah and stayed some days. The first thing he did was build a mosque, carrying the stones with his companions himself — the first mosque built in Islam. Allah mentions it in the Quran as a mosque founded on piety from the very first day.",
        "shortLesson": "The first thing a good community builds is a place that gathers people for good."
      },
      "tier_2_age_9_11": {
        "narrative": "After days of travel, exhaustion and pursuit, the Prophet ﷺ stopped at Quba on the edge of Madinah and stayed a few days before entering the city. The first thing he did was not to build a house for himself or a market, but a mosque where people could gather. He carried the stones with his own hands and worked alongside his companions rather than standing and giving orders, and the people worked eagerly with him. So the mosque of Quba became the first mosque built in Islam. Allah mentioned this mosque in His Book and described it as founded on piety from the very first day. Afterwards the Prophet ﷺ used to visit it every Saturday, riding and walking.",
        "details": "Allah says: ﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾ — “a mosque founded on piety from the first day is worthier for you to stand in.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ said that praying in the mosque of Quba is like an Umrah.",
      "value": {
        "name": "Doing the work yourself",
        "icon": "🕌"
      },
      "thinkQuestion": "What is the first thing you would build if you made a new place for your friends?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the first thing the Prophet ﷺ built at Quba?",
        "options": [
          "A market",
          "A mosque",
          "A wall",
          "A house for himself"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A building stone",
        "description": "A stone like the ones carried by blessed hands."
      },
      "badge": "Builder of Good"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah At-Tawbah: 108, and Sahih al-Bukhari",
      "note": "His stay at Quba and the building of its mosque are established in the two Sahih collections, and the mosque is described in Surah At-Tawbah."
    }
  },
  "commanded-camel-qaswa": {
    "title": "Al-Qaswa, and the House of Abu Ayyub",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ entered Madinah on his camel al-Qaswa, and every time he passed a house the Ansar took hold of her halter, saying: stay with us, Messenger of Allah! He would answer: “Leave her, she is under orders.” She walked on until she knelt at the house of Abu Ayyub al-Ansari — who carried the Prophet's saddle into his home in joy.",
        "shortLesson": "Fairness prevents envy; blessing is in hearts, not in the size of houses."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ entered the heart of Madinah riding his camel al-Qaswa, with joyful people all around him. The Ansar loved him deeply, and every time he passed one of their houses its people took hold of the camel's halter and said: Messenger of Allah, stay with us! Every one of them meant it, and every one of them hoped for the honour — so had he chosen one house in particular, others would have felt it. So he answered them gently: “Leave her, she is under orders.” The camel went on until she knelt at the house of Abu Ayyub al-Ansari, who was not among their wealthy — and Abu Ayyub hurried to carry the Prophet's saddle into his house out of sheer joy. The Prophet ﷺ stayed with him until his mosque and his family's rooms were built.",
        "details": "Allah says: ﴿رَّبِّ أَنزِلْنِي مُنزَلًا مُّبَارَكًا وَأَنتَ خَيْرُ الْمُنزِلِينَ﴾ — “My Lord, let me land in a blessed place; You are the best to bring to land.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ stayed in Abu Ayyub's house for about seven months, until the mosque and his family's rooms were finished.",
      "value": {
        "name": "Fairness between people",
        "icon": "🐪"
      },
      "thinkQuestion": "How do you choose between two people inviting you at the same time without hurting either?",
      "challenge": {
        "type": "multiple_choice",
        "question": "At whose house did the Prophet's camel kneel in Madinah?",
        "options": [
          "The richest of the Ansar",
          "Abu Ayyub al-Ansari's house",
          "Abu Bakr's house",
          "Buraydah's house"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A camel's halter",
        "description": "A halter for a leader who would not favour one person over another."
      },
      "badge": "Fair and Wise"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sahih al-Bukhari, and Ibn Hisham's Seerah",
      "note": "That the Prophet ﷺ stayed with Abu Ayyub al-Ansari is established in the Sahih; the wording “leave her, she is under orders” comes from Ibn Ishaq's Seerah."
    }
  },
  "talaa-al-badru": {
    "title": "Yathrib Becomes the City of Light",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The whole city came out to meet him: men, women and children, and the children climbed onto the roofs. It was a day of joy such as they had never seen. The Seerah books mention that the young girls sang: the full moon has risen over us. And from that day Yathrib was called “Madinah” — the City.",
        "shortLesson": "The finest welcome a guest can receive is glad hearts."
      },
      "tier_2_age_9_11": {
        "narrative": "The whole city came out to meet the Messenger of Allah ﷺ: men, women and children, and the children and servants climbed onto the roofs to look, asking one another: which of them is the Messenger of Allah? Anas ibn Malik said: I never saw a day finer or brighter than the day the Messenger of Allah ﷺ came to us. The Seerah books mention that young girls beat the hand-drums and sang: “the full moon has risen over us, from the passes of Wada.” From that day the city was no longer called Yathrib but “Madinah” — the City — and al-Madinah al-Munawwarah, the city of light, because Islam now had a homeland, and the believers had a place where they were safe after thirteen years of fear.",
        "details": "Allah says of those who supported him: ﴿وَاتَّبَعُوا النُّورَ الَّذِي أُنزِلَ مَعَهُ أُولَٰئِكَ هُمُ الْمُفْلِحُونَ﴾ — “and followed the light sent down with him — those are the successful.”"
      }
    },
    "interactive": {
      "discover": "This migration is the start of the Hijri calendar, by which we still count the years today.",
      "value": {
        "name": "Rejoicing in good",
        "icon": "🌕"
      },
      "thinkQuestion": "How do you welcome a dear guest arriving at your home after a long journey?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Yathrib come to be called after the Prophet ﷺ arrived?",
        "options": [
          "It stayed Yathrib",
          "It became “Madinah” — the City of Light",
          "It was called the second Mecca",
          "It was called Quba"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A full moon",
        "description": "A full moon for the day a whole city came out to greet its guest."
      },
      "badge": "Glad for Good"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sahih al-Bukhari, and al-Bayhaqi's Dala'il",
      "note": "The joy of the people of Madinah and Anas's words are in the Sahih; the song “the full moon has risen” is famous in the Seerah literature, and scholars have discussed its chain."
    }
  },
  "hunayn-pride-in-numbers": {
    "title": "The Lesson of Hunayn: Pride in Numbers",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After the conquest of Mecca the Muslims went out twelve thousand strong — the largest army they had ever gathered. Some looked at their own numbers and said: we will not be beaten today for being few! Then they came down into the narrow valley of Hunayn, where archers ambushed them at dawn, and the ranks broke. Numbers alone do not win anything.",
        "shortLesson": "Numbers are no help when humility and trust are missing."
      },
      "tier_2_age_9_11": {
        "narrative": "Days after the conquest of Mecca, Hawazin and Thaqif gathered their forces against the Muslims, and the Prophet ﷺ went out to meet them with twelve thousand men: the ten thousand who had been with him at the conquest, and two thousand of the people of Mecca. It was the largest army the Muslims had ever put in the field. Some of them looked at that number, and it pleased them, and they said: “We will not be beaten today for being few.” There was more in that sentence than they knew. When they came down into the valley of Hunayn — a narrow pass between hills — the archers of Hawazin were waiting in its bends, and they loosed on the front of the army all at once in the half-light of dawn. The front broke, and many turned back. The lesson was too sharp to forget: victory comes from Allah alone, not from the size of a crowd.",
        "details": "Allah says: ﴿وَيَوْمَ حُنَيْنٍ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا﴾ — “and on the day of Hunayn, when your great numbers pleased you but availed you nothing.”"
      }
    },
    "interactive": {
      "discover": "Hunayn is one of only three battles the Quran names, alongside Badr and the Confederates.",
      "value": {
        "name": "Humility alongside trust",
        "icon": "⛰️"
      },
      "thinkQuestion": "When did you last feel so sure of winning that you stopped preparing?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did some of the Muslims say before Hunayn that became their lesson?",
        "options": [
          "We will not be beaten today for being few",
          "We are too few, let us withdraw",
          "We do not want to fight",
          "Let us wait for reinforcements"
        ],
        "correctAnswer": 0
      }
    },
    "gamification": {
      "artifact": {
        "name": "A pebble from the valley",
        "description": "A pebble to remind you that numbers by themselves are not enough."
      },
      "badge": "Humble in Strength"
    },
    "source": {
      "reliability": "🟢",
      "reference": "The Quran, Surah At-Tawbah: 25, and Sahih al-Bukhari",
      "note": "The day of Hunayn and their pleasure at their own numbers are stated in the Quran; the details of the battle are in the two Sahih collections."
    }
  },
  "steadfast-leader-hunayn": {
    "title": "The Leader Who Did Not Move",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "While the men fell back, the Prophet ﷺ held his place at the front on his mule and did not take a step backwards, saying: “I am the Prophet, this is no lie; I am the son of Abd al-Muttalib.” He told his uncle al-Abbas — who had a carrying voice — to call out: People of the Tree! And back they came, answering: here we are, here we are — until the day was steady again.",
        "shortLesson": "You find out who the leader is when everyone else turns back."
      },
      "tier_2_age_9_11": {
        "narrative": "At the moment the front broke and the men turned back, the Prophet ﷺ did not move. He held his place on his white mule at the head of the field, going forward towards the enemy, and raised his voice: “I am the Prophet, this is no lie; I am the son of Abd al-Muttalib.” Then he told his uncle al-Abbas ibn Abd al-Muttalib — a man with a carrying voice — to call to the people: “People of the Tree! People of Surah al-Baqarah!”, reminding them of the pledge they had given beneath the tree. The moment they heard it they turned back, answering “here we are, here we are”, until they had gathered around their Prophet. Then they advanced, and Allah sent down His tranquillity upon them, and a day that had begun in confusion ended in victory.",
        "details": "Allah says: ﴿ثُمَّ أَنزَلَ اللَّهُ سَكِينَتَهُ عَلَىٰ رَسُولِهِ وَعَلَى الْمُؤْمِنِينَ﴾ — “Then Allah sent down His tranquillity upon His Messenger and upon the believers.”"
      }
    },
    "interactive": {
      "discover": "He rode a mule that day rather than a horse — a mule is no animal for fleeing, so riding one said plainly that he was not going anywhere.",
      "value": {
        "name": "Standing firm, and leading",
        "icon": "🛡️"
      },
      "thinkQuestion": "If your whole team panicked, what is the first thing you would do?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did al-Abbas call out to the people at Hunayn?",
        "options": [
          "People of Mecca",
          "People of the Tree",
          "People of Madinah",
          "Children of Hashim"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A mule's bridle",
        "description": "A bridle for the one who stood while others fell back."
      },
      "badge": "Firm in the Field"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The Prophet's steadfastness at Hunayn, his words, and the call of al-Abbas are all in the two Sahih collections."
    }
  },
  "army-of-hardship-tabuk": {
    "title": "The Army of Hardship, and a Race to Give",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Word came that the Byzantines were gathering on the Syrian frontier — in the height of summer, with the fruit ripe on the trees. The Prophet ﷺ called the people out, and supplies were so short that it was called the Army of Hardship. The companions raced to give: Abu Bakr brought everything he owned, Umar half of his, and Uthman equipped a large part of the army.",
        "shortLesson": "Real giving shows in a hard season, not an easy one."
      },
      "tier_2_age_9_11": {
        "narrative": "Word reached the Prophet ﷺ that the Byzantines were massing an army on the Syrian frontier, and he called the Muslims out. The timing could not have been harder: the peak of summer heat, the fruit ripe and everyone wanting to stay with it, a long road ahead, and supplies so short that two men took turns on one camel. That is why it was called the Army of Hardship. When the Prophet ﷺ called for contributions, the companions raced one another as they never had: Abu Bakr brought everything he owned, and when the Prophet ﷺ asked him, “What did you leave for your family?”, he answered: I left them Allah and His Messenger. Umar brought half of his wealth. Uthman equipped a large part of the army with camels and money, and the Prophet ﷺ said something remarkable about him for it. The race was not for spoils. It was for who could give the most.",
        "details": "Allah says: ﴿الَّذِينَ اتَّبَعُوهُ فِي سَاعَةِ الْعُسْرَةِ﴾ — “those who followed him in the hour of hardship.”"
      }
    },
    "interactive": {
      "discover": "Tabuk was the last expedition the Prophet ﷺ went out on himself.",
      "value": {
        "name": "Giving when it is hard",
        "icon": "🐪"
      },
      "thinkQuestion": "What is something you love that you could give to someone who needs it more?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Abu Bakr answer when asked what he had left for his family?",
        "options": [
          "I left them half the money",
          "I left them Allah and His Messenger",
          "He left nothing and said nothing",
          "I left them the house"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small purse",
        "description": "A purse for the man who gave everything and was not afraid."
      },
      "badge": "First to Give"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sunan Abi Dawud and at-Tirmidhi, and the Quran, Surah At-Tawbah: 117",
      "note": "The expedition and the hour of hardship are in the Quran and the Sahih collections; Abu Bakr giving all his wealth and Uthman equipping the army come from the Sunan, graded good by some scholars while others questioned some of the wordings."
    }
  },
  "weepers-and-true-repentance": {
    "title": "Those Who Wept, and the Man Saved by Telling the Truth",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Poor companions came asking for mounts so they could go with the army, and the Prophet ﷺ said: “I have nothing to carry you on.” They turned away with tears pouring down, grieving that they had nothing to give — and the Quran named them. Ka'b ibn Malik and two others stayed behind with no excuse, and when the army returned he told the truth instead of inventing one, and Allah accepted his repentance.",
        "shortLesson": "Telling the truth saves you, even when owning up is hard."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet ﷺ called the people out, some of the poorer companions came asking for mounts, and he said: “I have nothing to carry you on.” They turned away with their eyes overflowing, grieving that they had nothing to spend — and Allah mentioned them in His Book; people called them “the weepers”. They wanted to go and could not, and the reward of those who went was written for them. On the other side, three truthful companions stayed behind with no excuse at all — among them Ka'b ibn Malik — simply putting it off, one day after another. When the army came back, the hypocrites came with invented excuses and were taken at their word, and Ka'b came and told the truth and made nothing up. The Prophet ﷺ told the people not to speak to the three for fifty nights, until the earth closed in on them for all its wideness — and then the Quran came down accepting their repentance. Ka'b said afterwards: Allah has given me no gift after Islam greater than my telling the truth.",
        "details": "Allah says of them: ﴿حَتَّىٰ إِذَا ضَاقَتْ عَلَيْهِمُ الْأَرْضُ بِمَا رَحُبَتْ﴾ — “until the earth closed in on them for all its vastness.”"
      }
    },
    "interactive": {
      "discover": "Ka'b's account is one of the longest hadiths in Sahih al-Bukhari — he tells the whole story about himself.",
      "value": {
        "name": "Truthfulness",
        "icon": "💧"
      },
      "thinkQuestion": "When did you last tell the truth knowing it would cost you something?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why was Ka'b ibn Malik saved in the end?",
        "options": [
          "He gave an acceptable excuse",
          "He told the truth and did not lie",
          "He caught up with the army late",
          "He paid money"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A glass teardrop",
        "description": "A keepsake for those who wept because they had nothing to give."
      },
      "badge": "Truthful Even When It Costs"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim, and the Quran, Surah At-Tawbah: 92 and 118",
      "note": "The weepers are named in the Quran, and Ka'b ibn Malik's account is in both Sahih collections in full."
    }
  },
  "tabuk-peace-without-bloodshed": {
    "title": "The Camp at Tabuk: A Victory With No Blood",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The army reached Tabuk on the Syrian frontier and made camp. When the people there saw an army that had crossed the desert in high summer, no one came out to fight it. The Prophet ﷺ stayed some days, made treaties of safety with the border towns, and the army went home without a drop of blood being spilt.",
        "shortLesson": "The best confrontation is the one that ends before it starts."
      },
      "tier_2_age_9_11": {
        "narrative": "The army marched north until it reached Tabuk on the edge of Syria, and made camp. No one came out against them: they saw an army that had crossed the desert in the worst of the heat and had not turned back, and chose not to begin a fight. The Prophet ﷺ stayed at Tabuk some days, and did not waste them: he made terms of safety with the rulers of the frontier towns — Ayla, Jarba and Adhruh — and wrote them a covenant protecting their land and their caravans, so the trade roads to the north were safe. Then the army returned to Madinah having got everything it went for: secure borders, written agreements, and enough standing to prevent a war — without a drop of blood being spilt.",
        "details": "Allah says: ﴿وَكَفَى اللَّهُ الْمُؤْمِنِينَ الْقِتَالَ﴾ — “And Allah sufficed the believers in fighting.”"
      }
    },
    "interactive": {
      "discover": "The covenant written for the people of Ayla is among the oldest of the Prophet's written agreements to reach us.",
      "value": {
        "name": "Peace through standing, not blood",
        "icon": "🕊️"
      },
      "thinkQuestion": "How do you end a disagreement before it turns into a fight?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the expedition to Tabuk end?",
        "options": [
          "With a great battle",
          "With treaties of safety and no fighting",
          "With the Muslims withdrawing",
          "With a long siege"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A written covenant",
        "description": "A document to remind you that a written word can do what a sword cannot."
      },
      "badge": "Keeper of the Frontier"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, with the expedition itself in the two Sahih collections",
      "note": "The expedition to Tabuk is established in the Sahih collections; the details of the treaties with Ayla, Jarba and Adhruh and the size of the army come from the Seerah and maghazi literature."
    }
  },
  "year-of-delegations-tamim": {
    "title": "The Year of Delegations: Arabia Meets at the Mosque",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the ninth year Madinah was receiving delegations from every tribe in Arabia — it became known as the Year of Delegations. The delegation of Banu Tamim came wanting a contest of poetry and oratory, so the Prophet ﷺ had Thabit ibn Qays speak and Hassan ibn Thabit recite. Both did well, and the Tamimis said: his orator is better than ours, and his poet is better than ours.",
        "shortLesson": "A good word wins hearts better than out-boasting anyone."
      },
      "tier_2_age_9_11": {
        "narrative": "Once the state was settled and the roads were safe, the tribes of Arabia understood that the matter had held, and their delegations began arriving in Madinah from every direction to learn the religion and make agreements — so the ninth year was called the Year of Delegations. Among the best known was the delegation of Banu Tamim, a people proud of their poetry and oratory, who came looking for a contest. The Prophet ﷺ neither turned them away nor silenced them: he met poetry with poetry and speech with speech. He had Thabit ibn Qays give the address, and Hassan ibn Thabit recite the verse. When they finished, the spokesman of Banu Tamim said a line people repeated afterwards: his orator is better than ours, and his poet is better than ours. Then they accepted Islam. The boast was answered by doing it better, not by shutting it down.",
        "details": "Allah says of those years: ﴿وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا﴾ — “and you see people entering the religion of Allah in crowds.”"
      }
    },
    "interactive": {
      "discover": "Every delegation was given hospitality and a place to stay; some of them lodged in the mosque itself.",
      "value": {
        "name": "Answering well",
        "icon": "🏛️"
      },
      "thinkQuestion": "If someone challenged you at something you are good at, how would you answer without wounding them?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How did the Prophet ﷺ meet Banu Tamim's contest of poetry and speech?",
        "options": [
          "He stopped them speaking",
          "He met poetry with poetry and speech with speech",
          "He sent them out of Madinah",
          "He ignored them"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A poet's pen",
        "description": "A pen to remind you that a fine word is an argument."
      },
      "badge": "Well Answered"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, and the Quran, Surah An-Nasr",
      "note": "People entering the religion in crowds is in the Quran; the details of the Banu Tamim delegation and the contest of poetry come from the Seerah of Ibn Ishaq."
    }
  },
  "delegation-of-najran-dialogue": {
    "title": "The Delegation of Najran: Guests in the Mosque",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "A delegation of the Christians of Najran in Yemen came to Madinah, and the Prophet ﷺ lodged them in his mosque and treated them generously. When the time for their prayer came they stood to pray in a corner of the mosque; some people moved to stop them, and the Prophet ﷺ said: let them be. They talked for days, and then went home on their own religion, with a covenant of safety between them.",
        "shortLesson": "Argue with reasons, and honour a guest even when he disagrees with you."
      },
      "tier_2_age_9_11": {
        "narrative": "A delegation of the Christians of Najran — a district of Yemen — came to the Prophet ﷺ, their bishops and notables among them, dressed in their finest. He treated them generously and lodged them in his mosque. When the time for their prayer came, they stood to pray in a corner of the mosque, and some of the people moved to stop them; the Prophet ﷺ said: “Let them be.” Then a long discussion ran between them for days, about the oneness of Allah and about Jesus, peace be upon him — all of it argument and explanation, with no compulsion and no threat in it. When they did not agree, they were not forced: they went home on their own religion, and the Prophet ﷺ wrote them a covenant of safety for themselves, their property and their churches. They asked him for a trustworthy man to judge between them in their affairs, and he sent Abu Ubaydah ibn al-Jarrah with them.",
        "details": "Allah says: ﴿وَلَا تُجَادِلُوا أَهْلَ الْكِتَابِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ﴾ — “Do not argue with the People of the Book except in the best way.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ called Abu Ubaydah “the trustworthy one of this community” — and he is the man he sent with them.",
      "value": {
        "name": "Respecting the one who differs",
        "icon": "🤝"
      },
      "thinkQuestion": "How do you treat a friend who disagrees with you about something you care about?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ say when people moved to stop the Najran delegation praying in the mosque?",
        "options": [
          "Put them out",
          "Let them be",
          "Wait until we leave",
          "Do not speak to them"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A written covenant",
        "description": "A covenant: a guest is kept safe even when he disagrees with you."
      },
      "badge": "One Who Listens"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, with Abu Ubaydah's title in Sahih al-Bukhari",
      "note": "The Najran delegation and the covenant are well known in Ibn Ishaq's Seerah; Abu Ubaydah being named the trustworthy one of the community is in Sahih al-Bukhari."
    }
  },
  "muadh-ambassador-to-yemen": {
    "title": "The Envoy to Yemen: Make It Easy",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ sent Mu'adh ibn Jabal to Yemen as a teacher and a judge, and walked beside him giving him counsel. He said to him and to Abu Musa: “Make things easy and do not make them hard; give good news and do not drive people away; work together and do not differ.” And he warned him against wronging anyone: “Beware the prayer of the wronged — there is no veil between it and Allah.”",
        "shortLesson": "Teaching starts with making things easy, not with being strict."
      },
      "tier_2_age_9_11": {
        "narrative": "As the state grew, the distant regions needed someone to teach them and to judge between them. The Prophet ﷺ chose Mu'adh ibn Jabal — a young man and a scholar — and sent him to Yemen. He walked alongside him as he rode, giving him counsel, and then said to him and to Abu Musa al-Ash'ari words that became a rule for every teacher after them: “Make things easy and do not make them hard; give good news and do not drive people away; work together and do not differ.” He told him to begin with the most important thing first, not to take the best of people's property, and warned him hard against wronging anyone: “Beware the prayer of the wronged — there is no veil between it and Allah.” So Mu'adh went and taught people gently, and they loved him for it.",
        "details": "Allah says: ﴿ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ﴾ — “Call to the way of your Lord with wisdom and good counsel.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ told Mu'adh, “I love you,” and taught him a supplication to say after every prayer.",
      "value": {
        "name": "Making learning easy",
        "icon": "📗"
      },
      "thinkQuestion": "If you were explaining something to a younger sibling, would you start with the easiest part or the hardest?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ tell Mu'adh and Abu Musa?",
        "options": [
          "Be strict so they fear you",
          "Make it easy, give good news, do not drive people away",
          "Collect the money first",
          "Teach only the adults"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A traveller's staff",
        "description": "A staff for a teacher his Prophet walked beside to say goodbye."
      },
      "badge": "A Teacher Who Makes It Easy"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "“Make it easy” and the warning about the prayer of the wronged are both established in the two Sahih collections, in the account of sending Mu'adh to Yemen."
    }
  },
  "dhimad-and-kab-poetry": {
    "title": "Dhimad and Ka'b: The Power of a Word",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "Dhimad al-Azdi came to Mecca and heard people saying Muhammad was touched in the head. He treated such things, so he offered to treat him. The Prophet ﷺ listened to him, then spoke words of praise and of the oneness of Allah — and Dhimad said: say them again! I have heard soothsayers and sorcerers and poets, and I have never heard anything like this. He accepted Islam on the spot.",
        "shortLesson": "Listen for yourself before you believe what people say."
      },
      "tier_2_age_9_11": {
        "narrative": "A man of Azd Shanu'ah called Dhimad came to Mecca. He used to treat people, and he heard the foolish of Mecca saying that Muhammad was mad, so he said: if I could see this man, perhaps Allah would heal him at my hands. He met him and said: Muhammad, I treat this kind of affliction — shall I? The Prophet ﷺ said: “All praise is for Allah; we praise Him and seek His help. Whom Allah guides, none can lead astray; whom He leaves astray, none can guide.” Dhimad said: say those words of yours again! He repeated them three times, and Dhimad said: I have heard the words of soothsayers, and of sorcerers, and of poets, and I have never heard anything like these words of yours. Then he accepted Islam. Years later the poet Ka'b ibn Zuhayr came in repentance after satirising him, recited his famous poem before the Prophet ﷺ, and was pardoned and honoured.",
        "details": "Allah says of this Quran: ﴿لَوْ أَنزَلْنَا هَٰذَا الْقُرْآنَ عَلَىٰ جَبَلٍ لَّرَأَيْتَهُ خَاشِعًا﴾ — “Had We sent down this Quran upon a mountain, you would have seen it humbled.”"
      }
    },
    "interactive": {
      "discover": "Dhimad came to give treatment, and left as the one who had been changed.",
      "value": {
        "name": "Checking before judging",
        "icon": "🗣️"
      },
      "thinkQuestion": "The last time you heard something about someone — did you check, or believe it straight away?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did Dhimad first come to the Prophet ﷺ?",
        "options": [
          "To learn from him",
          "To treat him for what he had heard about him",
          "To buy from him",
          "To ask directions"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A stick of incense",
        "description": "A keepsake for a man who came to heal and left healed himself."
      },
      "badge": "One Who Checks First"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sahih Muslim, and Ibn Hisham's Seerah",
      "note": "The account of Dhimad is established in Sahih Muslim in these words; the story of Ka'b ibn Zuhayr and the poem is well known in the Seerah and literary works rather than the Sahih collections."
    }
  },
  "breaking-idols-building-hearts": {
    "title": "Stones Fall, Minds Are Freed",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The tribes worshipped stone idols, asking them for provision and healing. When they entered Islam, men were sent to those idols to take them down — often men from the same tribe. People stood and saw with their own eyes that a stone cannot ward off a single blow, and the illusion fell before the idol did.",
        "shortLesson": "A false idea falls the moment you see it as it really is."
      },
      "tier_2_age_9_11": {
        "narrative": "Every Arab tribe had an idol it honoured: al-Lat for Thaqif, al-Uzza for Quraysh, Manat, Suwa' and others. They sacrificed to them and asked them for rain, healing and children. When the tribes entered Islam after the Year of Delegations, men were sent to take those idols down — and the Prophet ﷺ usually sent a man from the tribe itself, like Khalid ibn al-Walid or al-Mughirah ibn Shu'bah, because people accept more readily from one of their own. Breaking the stone was never the point in itself: people stood watching, and saw that this thing they had feared and petitioned could not stop a single blow falling on it. The fear left their hearts before the idol left its base, and what they held onto moved from stones to Allah alone, and from rituals to character.",
        "details": "Allah says: ﴿إِنَّ الَّذِينَ تَدْعُونَ مِن دُونِ اللَّهِ عِبَادٌ أَمْثَالُكُمْ﴾ — “Those you call upon besides Allah are servants like you.”"
      }
    },
    "interactive": {
      "discover": "The man sent to take down a tribe's idol was usually from that tribe, not a stranger to it.",
      "value": {
        "name": "Freeing the mind",
        "icon": "🪨"
      },
      "thinkQuestion": "Is there something you used to believe that turned out to be wrong? What changed your mind?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the Prophet ﷺ usually send a man from the tribe itself?",
        "options": [
          "Because he was stronger",
          "Because people accept more readily from one of their own",
          "Because the road was shorter",
          "Because he knew the way"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "An empty pedestal",
        "description": "An empty base to remind you that the illusion falls first."
      },
      "badge": "Free of Mind"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Ibn Hisham's Seerah, and the Quran, Surah Al-A'raf: 194",
      "note": "The helplessness of the idols is stated in the Quran; the details of who was sent and to which idol come from the Seerah and maghazi literature."
    }
  },
  "mercy-to-the-weak-suffah": {
    "title": "The People of the Bench: The Poorest and the Closest",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "At the back of the Prophet's mosque was a shaded place called the Bench, where poor migrants with no home and no money stayed — Abu Hurayrah among them. They were not neglected: they were students, and whenever food was given to the Prophet ﷺ he sent some of it to them.",
        "shortLesson": "A person is worth what they know and how they behave, not what is in their pocket."
      },
      "tier_2_age_9_11": {
        "narrative": "At the back of the Prophet's mosque was a shaded area known as the Suffah — the Bench — which the Prophet ﷺ made a shelter for anyone who came to Madinah with no family, no house and no money. Abu Hurayrah stayed there, and other poor men with him. They were not at the edge of that society; they were at its centre: the people of the mosque, students of knowledge, and the best memorisers of the Prophet's words — which is how Abu Hurayrah came to narrate more hadith than any other companion. When food was brought to the Prophet ﷺ he would ask: is it a gift or charity? If it was charity he sent it to them and did not eat; if it was a gift he sent them some and ate with them. And he set a rule for the community: the weak are not a burden it carries, but the reason it is provided for and helped at all.",
        "details": "Allah says: ﴿وَاصْبِرْ نَفْسَكَ مَعَ الَّذِينَ يَدْعُونَ رَبَّهُم بِالْغَدَاةِ وَالْعَشِيِّ﴾ — “Keep yourself patiently with those who call upon their Lord morning and evening.”"
      }
    },
    "interactive": {
      "discover": "Abu Hurayrah narrated more hadith than any other companion — and he was one of the people of the Bench, who owned nothing.",
      "value": {
        "name": "The dignity of the weak",
        "icon": "🕌"
      },
      "thinkQuestion": "Who in your class or street needs someone to stand with them? What could you do?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Who stayed at the Suffah?",
        "options": [
          "The great merchants",
          "Poor migrants with no homes",
          "Royal guests",
          "Soldiers only"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A palm-leaf mat",
        "description": "A mat: a small corner can raise the greatest of people."
      },
      "badge": "Support of the Weak"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The people of the Suffah and Abu Hurayrah's life among them are in Sahih al-Bukhari, as is the Prophet's saying that people are provided for and helped through their weak."
    }
  },
  "kindness-to-animals-nature": {
    "title": "The Bird Whose Chicks Were Taken",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ was on a journey and stepped away, and some of his companions took the two chicks of a small bird. The mother came and hovered over their heads. When the Prophet ﷺ came back and saw it he said: “Who has grieved this bird by taking its young? Give her young back to her.”",
        "shortLesson": "Mercy does not stop at people."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ was travelling with his companions and stepped away for a while. Some of them saw a small bird — a hummarah — with two chicks, and took the chicks. The mother came and hovered over their heads, not knowing what to do. When the Prophet ﷺ returned and saw it he was angry and said: “Who has grieved this bird by taking its young? Give her young back to her.” This was not a one-off. He forbade loading an animal beyond what it can carry, forbade using any living creature as a target, forbade cutting trees without need, and taught that there is reward in kindness to every living thing. For a Muslim, mercy is not a feeling reserved for people; it is how you treat everything alive.",
        "details": "Allah says: ﴿وَمَا مِن دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُم﴾ — “There is no creature on earth, nor a bird flying on its wings, but they are communities like you.”"
      }
    },
    "interactive": {
      "discover": "The hummarah is a small reddish bird — the hadith is named after her.",
      "value": {
        "name": "Kindness to animals",
        "icon": "🐦"
      },
      "thinkQuestion": "If you found a small animal in trouble in the street, what would you do?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ say when he saw the chicks had been taken?",
        "options": [
          "Keep them with you",
          "Give her young back to her",
          "Feed them",
          "It does not matter"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small feather",
        "description": "A feather: mercy reaches the smallest of creatures."
      },
      "badge": "Gentle With Animals"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sunan Abi Dawud, with “every living thing” in Sahih al-Bukhari",
      "note": "The hadith of the hummarah is in Sunan Abi Dawud and graded authentic by a number of scholars, but is not in the two Sahih collections; the reward for kindness to every living creature is in al-Bukhari and Muslim."
    }
  },
  "honest-merchant-market-ethics": {
    "title": "A Hand in the Grain: Whoever Cheats Is Not of Us",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ passed a heap of grain in the market and put his hand into it — and his fingers found damp underneath the dry surface. He said: “What is this, seller?” The man said: rain got to it, Messenger of Allah. He said: “Then why did you not put it on top, so people could see it? Whoever cheats is not of me.”",
        "shortLesson": "Cheating starts small and ends with people no longer trusting you."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ used to walk through the market of Madinah himself. One day he passed a heap of grain that looked dry and clean on top. He put his hand into it, and his fingers came out damp from inside. He turned to the seller: “What is this, owner of the food?” The man said: the rain got to it, Messenger of Allah. The Prophet ﷺ said: “Then why did you not put it on top of the food, so that people could see it?” And then the sentence that has been a rule for every sale since: “Whoever cheats is not of me.” The man had not told a lie with his tongue — he had hidden a fault, and hiding a fault is cheating. On the other side, the Prophet ﷺ promised the honest, trustworthy trader that he would be with the prophets, the truthful and the martyrs.",
        "details": "Allah says: ﴿وَيْلٌ لِّلْمُطَفِّفِينَ﴾ — “Woe to those who give short measure.”"
      }
    },
    "interactive": {
      "discover": "The Prophet ﷺ walked through the market himself to check how people were dealing with each other, not only to buy.",
      "value": {
        "name": "Honesty in trade",
        "icon": "⚖️"
      },
      "thinkQuestion": "If you were selling something with a small fault, would you tell the buyer or stay quiet?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the Prophet ﷺ correct the grain seller?",
        "options": [
          "He raised the price",
          "He hid the damp grain under the dry",
          "He sold in the morning",
          "He measured carelessly"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A scale pan",
        "description": "A scale pan: a fault is declared, not hidden."
      },
      "badge": "An Honest Trader"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim",
      "note": "“Whoever cheats is not of me” and the account of the heap of grain are in Sahih Muslim."
    }
  },
  "mosque-school-and-knowledge": {
    "title": "The Mosque as a School — and a Day for the Women",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The mosque was not only for prayer: circles were held in it where people learned. Women came to the Prophet ﷺ and said: the men have taken all of you — give us a day of your own time. He promised them a day, and met them on it and taught them.",
        "shortLesson": "Ask for knowledge properly, and you will find someone to teach you."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet's mosque was not only a place of prayer: circles were held there after the prayers, where people learned the Quran, the rulings and good character, and asked questions and were answered. And the teaching was not for men alone. Some women came to the Prophet ﷺ and said: “The men have taken you from us — give us a day of your own.” He promised them a day, met them on it, and taught and advised and instructed them. He did not tell them to learn it from their husbands, and he did not put them off; he gave them time out of his own. Through circles as simple as these, in a mosque of mud and palm branches, a society where most people could not read became one that prized asking and learning.",
        "details": "Allah says: ﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾ — “Allah raises those of you who believe, and those given knowledge, in degrees.”"
      }
    },
    "interactive": {
      "discover": "It was the women who asked for the lesson — and the Prophet ﷺ answered them rather than expecting them to stay quiet.",
      "value": {
        "name": "Learning for everyone",
        "icon": "📚"
      },
      "thinkQuestion": "When did you last ask a question you were nervous to ask? What happened when you did?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ do when the women asked for a day to learn?",
        "options": [
          "He apologised, being busy",
          "He promised them a day, met them and taught them",
          "He sent them to their husbands",
          "He put them off for a year"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A writing tablet",
        "description": "A tablet: asking is the first step in learning."
      },
      "badge": "A Seeker of Knowledge"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The women asking for a day and the Prophet setting one aside to teach them is established in al-Bukhari and Muslim."
    }
  },
  "madinah-capital-of-light": {
    "title": "Madinah at Peace: From Sana'a to Hadramawt",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In Mecca, Khabbab complained to the Prophet ﷺ about how hard the persecution was, and he answered: “By Allah, Allah will complete this matter until a rider goes from Sana'a to Hadramawt fearing nothing but Allah, and the wolf for his sheep.” Years later, people watched it happen.",
        "shortLesson": "A country is safe when the weakest person in it can walk without fear."
      },
      "tier_2_age_9_11": {
        "narrative": "In Mecca, when the torture was at its worst, Khabbab ibn al-Aratt came to the Prophet ﷺ — who was resting on his cloak in the shade of the Kaaba — and said: will you not ask for help for us? Will you not pray for us? After reminding him of those who had come before, the Prophet ﷺ said: “By Allah, Allah will complete this matter until a rider travels from Sana'a to Hadramawt fearing nothing but Allah, and the wolf for his sheep — but you are impatient.” Years later that sentence became something people could see: tribes joining, roads made safe, markets built on honesty, a community learning in its mosque. And when that was built, the Prophet ﷺ announced that he would make the pilgrimage — to meet the whole community in one place, and tell it what he wanted it to keep after him.",
        "details": "Allah says: ﴿أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ﴾ — “those are the ones who have security, and they are rightly guided.”"
      }
    },
    "interactive": {
      "discover": "He said those words while he was in Mecca and powerless — before there was any state at all.",
      "value": {
        "name": "Safety is the fruit of justice",
        "icon": "🌇"
      },
      "thinkQuestion": "What makes a place safe, in your view — its walls, or its people?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ promise Khabbab while they were being tortured in Mecca?",
        "options": [
          "The torture would end tomorrow",
          "Safety would spread until a rider feared nothing but Allah",
          "They would leave Mecca",
          "They would fight at once"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A lamp on the road",
        "description": "A lamp: safety is built, not handed over."
      },
      "badge": "Builder of a Homeland"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The account of Khabbab ibn al-Aratt and the Prophet's words about the rider from Sana'a to Hadramawt are in Sahih al-Bukhari."
    }
  },
  "grand-call-to-hajj": {
    "title": "The Great Call: A March to Mecca",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the tenth year the Prophet ﷺ announced that he would make the pilgrimage, and people came out with him from every direction until they were beyond counting. He entered the state of pilgrimage at Dhu al-Hulayfah in two white cloths, and everyone dressed as he did, so you could no longer tell the rich from the poor. And their voices rose: here I am, O Allah, here I am.",
        "shortLesson": "Before Allah, people stand as equals."
      },
      "tier_2_age_9_11": {
        "narrative": "In Dhu al-Qi'dah of the tenth year after the migration, the Prophet ﷺ announced that he was going for the pilgrimage. As soon as word reached the tribes they came out of every valley wanting to make the pilgrimage with him and to see how he did it, until an enormous crowd had gathered — historians estimate more than a hundred thousand. At Dhu al-Hulayfah the Prophet ﷺ entered ihram: he took off his sewn clothes and put on a plain white lower garment and cloak with no ornament on them, and every person there dressed as he had. You could no longer tell a commander from a shepherd or a rich man from a poor one: two white cloths, and one sentence repeated by a hundred thousand throats — “Here I am, O Allah, here I am; here I am, You have no partner, here I am.” That is how the pilgrimage begins: everyone leaves what divides them at the first stop.",
        "details": "Allah says: ﴿وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا﴾ — “And proclaim the pilgrimage to the people; they will come to you on foot.”"
      }
    },
    "interactive": {
      "discover": "Jabir ibn Abdullah described this pilgrimage day by day, and his account is the longest hadith describing the Hajj.",
      "value": {
        "name": "Equality",
        "icon": "🕋"
      },
      "thinkQuestion": "If everyone wore exactly the same clothes, what would tell them apart?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the pilgrims wear the same white cloths?",
        "options": [
          "They were cheaper",
          "They erase the difference between rich and poor",
          "Only to keep off the heat",
          "They were an army uniform"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A white cloth",
        "description": "A white cloth: differences are left at the door."
      },
      "badge": "One Who Answered the Call"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih Muslim, in Jabir's account of the pilgrimage",
      "note": "The Prophet's ihram at Dhu al-Hulayfah and the talbiyah are in Sahih Muslim; the number of pilgrims is an estimate from the historians, not from a text."
    }
  },
  "arafat-unity-and-equality": {
    "title": "Arafat: A Sea of White",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "On the ninth of Dhu al-Hijjah the pilgrims stood at Arafat — the greatest pillar of the Hajj, so much so that the Prophet ﷺ said: “The Hajj is Arafat.” No crowns, no decorated mounts; everyone in two white cloths with their hands raised. And the Prophet ﷺ stood on his camel al-Qaswa to address them.",
        "shortLesson": "The longest you will ever stand is not before people, but before your Lord."
      },
      "tier_2_age_9_11": {
        "narrative": "On the ninth day of Dhu al-Hijjah the pilgrims gathered on the plain of Arafat. This day is the greatest pillar of the Hajj — the Prophet ﷺ said: “The Hajj is Arafat”, meaning whoever misses the standing at Arafat has missed the pilgrimage altogether. The scene was white as far as the eye could see: no crown, no procession, no mark setting anyone above anyone, only raised hands and tears and prayer. The Prophet ﷺ rode his camel al-Qaswa and stood in the valley of Uranah, the people silent around him and men carrying his voice back, row by row, to those too far to hear. Then he began to say to them what gathered up twenty-three years of calling — as though he knew it was the last time they would all be together with him.",
        "details": "Allah says: ﴿فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ﴾ — “When you depart from Arafat, remember Allah at the sacred site.”"
      }
    },
    "interactive": {
      "discover": "People relayed the Prophet's voice back to those behind them — there was nothing to amplify it.",
      "value": {
        "name": "Standing before Allah",
        "icon": "🤍"
      },
      "thinkQuestion": "If you had one prayer to make, what would you ask for?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ say about the greatest pillar of the Hajj?",
        "options": [
          "The Hajj is the circling",
          "The Hajj is Arafat",
          "The Hajj is Mina",
          "The Hajj is the walking"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A white pebble",
        "description": "A pebble for the day everyone stood as equals."
      },
      "badge": "One Who Stood at Arafat"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sunan at-Tirmidhi, and Sahih Muslim on the pilgrimage",
      "note": "The Prophet's standing at Arafat is described in Jabir's account in Sahih Muslim; “The Hajj is Arafat” is in the Sunan and graded authentic by the scholars."
    }
  },
  "farewell-sermon-human-rights": {
    "title": "The Farewell Sermon: No Arab Is Above a Non-Arab",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ addressed the people: “Your blood, your property and your honour are sacred to one another, like the sanctity of this day of yours, in this month of yours, in this land of yours.” And he said: “Your Lord is one and your father is one; no Arab is above a non-Arab and no non-Arab above an Arab, except by piety.”",
        "shortLesson": "No one is above anyone else by colour or family."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ stood before that great gathering and said what afterwards read like a charter. He began with the sanctity of a human being: “Your blood, your property and your honour are sacred to one another, like the sanctity of this day of yours, in this month of yours, in this land of yours” — a person's life, property and dignity carry the sanctity of the holiest day, in the holiest month, in the holiest place. Then he pulled down the whole idea of rank by lineage on which that age had been built: “Your Lord is one and your father is one; all of you are from Adam, and Adam was from dust. No Arab is above a non-Arab and no non-Arab above an Arab, no light-skinned above dark or dark above light, except by piety.” Then he put the old interest-debts and the old blood-feuds under his feet and cancelled them — beginning with his own family's claims before anyone else's.",
        "details": "Allah says: ﴿إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ﴾ — “The most honoured of you before Allah is the most mindful of Him.”"
      }
    },
    "interactive": {
      "discover": "He cancelled his own uncle's interest and his own relative's blood-claim first, before asking it of anyone else.",
      "value": {
        "name": "Justice and equality",
        "icon": "📜"
      },
      "thinkQuestion": "Has someone been treated as lesser because of how they look or where they are from? What would you do if you saw it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What makes one person better than another, in the Farewell Sermon?",
        "options": [
          "Lineage",
          "Colour",
          "Piety",
          "Wealth"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A charter tablet",
        "description": "A tablet: the first people the ruling was applied to were his own."
      },
      "badge": "Bearer of the Charter"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim, and Musnad Ahmad",
      "note": "“Your blood and property are sacred” is in the two Sahih collections; “no Arab is above a non-Arab” comes from the sermon of the days of Tashriq in Musnad Ahmad, graded good by the scholars."
    }
  },
  "testament-of-women-rights": {
    "title": "Take Good Care of the Women",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "In the middle of the sermon the Prophet ﷺ turned to the women and said: “Take good care of the women,” and he repeated it. In that time there were people who inherited women as they inherited goods, and people who buried their infant daughters alive. This instruction overturned all of it.",
        "shortLesson": "The best of people is the best to his own household."
      },
      "tier_2_age_9_11": {
        "narrative": "In the middle of that sermon, the Prophet ﷺ stopped at the group who had been genuinely the most powerless in that age: women. They were denied inheritance, they were inherited like property, and some men buried their infant daughters alive. The Prophet ﷺ told all the people: “Take good care of the women,” and he said it again and pressed it, reminding them that they were a trust taken under Allah's covenant. This was not one line on one day: elsewhere he said, “The best of you is the best to his family, and I am the best of you to my family” — making the measure of a man how he treats the people in his house, not how he looks in public. With that, whole customs by which women had been wronged for centuries came to an end.",
        "details": "Allah says: ﴿وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ﴾ — “And live with them in kindness.”"
      }
    },
    "interactive": {
      "discover": "The Prophet's measure of a good man was his home, not his standing in a gathering.",
      "value": {
        "name": "Kindness at home",
        "icon": "🌸"
      },
      "thinkQuestion": "Who do you behave better with — your friends, or your family? Why?",
      "challenge": {
        "type": "multiple_choice",
        "question": "How is a man's goodness measured, in the Prophet's words?",
        "options": [
          "By his money",
          "By his standing among people",
          "By how he treats his family",
          "By his strength"
        ],
        "correctAnswer": 2
      }
    },
    "gamification": {
      "artifact": {
        "name": "A simple bracelet",
        "description": "A bracelet for those from whom centuries of wrong were lifted in a sentence."
      },
      "badge": "Kind at Home"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "“Take good care of the women” is in the two Sahih collections within the Farewell Sermon; “the best of you is the best to his family” is in the Sunan and graded authentic."
    }
  },
  "completion-of-faith-farewell": {
    "title": "Have I Delivered It? And the Tears of Abu Bakr",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "At the end of the sermon the Prophet ﷺ asked the gathering: “Have I delivered it?” They said yes. He raised his finger to the sky, then pointed it at them and said: “O Allah, bear witness.” That day the verse came down: “Today I have perfected your religion for you.” The people rejoiced — and Abu Bakr wept, because he understood that completion meant the parting was near.",
        "shortLesson": "Some people hear in a piece of news what nobody else hears."
      },
      "tier_2_age_9_11": {
        "narrative": "When the Prophet ﷺ finished his sermon, he turned to that whole gathering and asked them one question: “You will be asked about me — what will you say?” They said: we bear witness that you have delivered the message, discharged the trust and given counsel. He raised his finger towards the sky, then pointed it at the people, and said three times: “O Allah, bear witness. O Allah, bear witness. O Allah, bear witness.” And on that day — the day of Arafat in the Farewell Pilgrimage — the verse came down: “Today I have perfected your religion for you and completed My favour upon you.” The people were overjoyed: the religion was complete and the favour was full. And it is related that Abu Bakr wept, because he heard in that sentence what no one else heard: when a work is finished, the time of the one who did it is near.",
        "details": "Allah says: ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي﴾ — “Today I have perfected your religion for you and completed My favour upon you.”"
      }
    },
    "interactive": {
      "discover": "A Jewish man told Umar: had this verse come to us, we would have made its day a festival. Umar said: it came down on a day of two festivals — a Friday, and the day of Arafat.",
      "value": {
        "name": "Completing a trust",
        "icon": "🏔️"
      },
      "thinkQuestion": "When you finish something you worked hard on, what do you feel? Joy — or something else as well?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the people answer when the Prophet ﷺ asked what they would say?",
        "options": [
          "They said nothing",
          "We bear witness that you delivered it and gave counsel",
          "We want more",
          "We will answer tomorrow"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A raised finger",
        "description": "A keepsake for the day a prophet called his Lord to witness over his people."
      },
      "badge": "Witness to the Message"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sahih Muslim, with the verse in Sahih al-Bukhari",
      "note": "“Have I delivered it” and “O Allah, bear witness” are in Sahih Muslim; the verse coming down on the day of Arafat is in al-Bukhari. Abu Bakr's weeping comes from the tafsir and Seerah works."
    }
  },
  "signs-of-farewell-uhud-cemetery": {
    "title": "Farewell to the Martyrs, and a Word from the Pulpit",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "After returning from the pilgrimage, the Prophet ﷺ went out to the martyrs of Uhud and prayed over them like someone saying goodbye. Then he came back, climbed the pulpit and said: “I go ahead of you and I am your witness, and by Allah I am looking at my Pool right now. I do not fear that you will worship others after me — I fear the world for you, that you will compete over it.”",
        "shortLesson": "Sometimes the danger to you is plenty, not hardship."
      },
      "tier_2_age_9_11": {
        "narrative": "After the Prophet ﷺ returned from the Farewell Pilgrimage, he went out to the martyrs of Uhud — his companions killed beside him years before — and prayed over them as one prays over the dead, until those who saw it said: like someone taking leave of the living and the dead. Then he came back, climbed the pulpit, looked into the faces of the people and said: “I go ahead of you and I am your witness, and by Allah I am looking at my Pool right now.” Then came the sentence that surprised them: “I do not fear that you will worship others after me — I fear the world for you, that you will compete over it.” A people who had borne hunger and torture for years: now that safety and plenty had come, the danger to them was wealth, not poverty. And from all of this the companions understood that their Prophet was saying goodbye.",
        "details": "Allah says: ﴿مِّنَ الْمُؤْمِنِينَ رِجَالٌ صَدَقُوا مَا عَاهَدُوا اللَّهَ عَلَيْهِ﴾ — “Among the believers are men true to what they pledged to Allah.”"
      }
    },
    "interactive": {
      "discover": "Years had passed since the martyrs of Uhud, and still he went out to take leave of them before his own departure.",
      "value": {
        "name": "Loyalty",
        "icon": "🌿"
      },
      "thinkQuestion": "Is there someone who helped you once and was never thanked? How could you remember them today?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ say he feared for his community?",
        "options": [
          "That they would worship others after him",
          "That the world would open to them and they would compete over it",
          "That they would grow few",
          "That they would go hungry"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A branch from Uhud",
        "description": "A branch for those who are not forgotten however long it has been."
      },
      "badge": "Loyal to His Companions"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "His going out to the martyrs of Uhud and this sermon from the pulpit are established in al-Bukhari and Muslim."
    }
  },
  "usama-young-army-commander": {
    "title": "Usamah: A Commander at Eighteen",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ ordered an army prepared for Syria and put Usamah ibn Zayd in command — a young man, with senior companions in his ranks. Some people talked about how young he was, so the Prophet ﷺ addressed them: “If you criticise his command, you criticised his father's command before him. By Allah, he was fit for command.”",
        "shortLesson": "Being capable is not measured in years."
      },
      "tier_2_age_9_11": {
        "narrative": "In his last days the Prophet ﷺ ordered an army prepared to move to the Syrian frontier, and appointed Usamah ibn Zayd over it — a young man of about eighteen — with senior Muhajirun and Ansar in the ranks. Some people talked about how young he was: is this one put in command over those? Word reached the Prophet ﷺ and he came out angry, climbed the pulpit, and said: “If you criticise his command, you criticised his father's command before him. By Allah, he was fit for command, and he was among the dearest of people to me, and this one is among the dearest of people to me after him.” The people fell silent and accepted it. Usamah was not chosen because he was the son of someone the Prophet loved; he was chosen because he was up to it — and that is what the Prophet ﷺ defended in his final days.",
        "details": "Allah says of choosing the best person: ﴿إِنَّ خَيْرَ مَنِ اسْتَأْجَرْتَ الْقَوِيُّ الْأَمِينُ﴾ — “the best you can hire is the strong and trustworthy.”"
      }
    },
    "interactive": {
      "discover": "Abu Bakr sent Usamah's army out after the Prophet's death and did not replace him, though Usamah was far younger than he was.",
      "value": {
        "name": "Trusting the young",
        "icon": "🎖️"
      },
      "thinkQuestion": "Has an adult ever trusted you with something? How did it feel?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did some people object to Usamah's command?",
        "options": [
          "He was not brave",
          "He was young",
          "He did not know the road",
          "He refused to lead"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small banner",
        "description": "A banner: being up to the job has no age."
      },
      "badge": "Fit for the Trust"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "Usamah's appointment and the Prophet's sermon defending him are established in the two Sahih collections."
    }
  },
  "fever-and-aisha-chamber": {
    "title": "The Illness Begins: Where Am I Tomorrow?",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The fever grew severe on the Prophet ﷺ, and still he kept going round the houses of his wives as he always did, out of fairness. When walking became too hard he began to ask: “Where am I tomorrow? Where am I tomorrow?” They understood that he wanted Aishah's house, and they gave him leave to be wherever he wished.",
        "shortLesson": "Fairness is kept even at your weakest."
      },
      "tier_2_age_9_11": {
        "narrative": "After he returned from the pilgrimage the illness began. The fever became so severe that Aishah said: I never saw anyone in more pain than the Messenger of Allah ﷺ. Even so he did not abandon his habit of fairness between his wives: he went round their houses each day as he always had. When it grew too heavy for him to move, he began asking: “Where am I tomorrow? Where am I tomorrow?” — meaning Aishah's day. They understood what he wanted, and all of them gave him leave to stay wherever he wished, without holding him to the turn. So he moved to Aishah's room, walking between two men, his feet dragging on the ground from weakness. He did not take an exception for himself until he had asked for it — and this at the worst of his illness.",
        "details": "Allah says: ﴿وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾ — “and He placed between you affection and mercy.”"
      }
    },
    "interactive": {
      "discover": "Aishah's room opened directly onto the mosque, so he could hear the people praying.",
      "value": {
        "name": "Fairness when weak",
        "icon": "🌙"
      },
      "thinkQuestion": "When you are tired or fed up, do you stay fair to the people around you — or forget?",
      "challenge": {
        "type": "multiple_choice",
        "question": "Why did the Prophet ﷺ keep asking, “Where am I tomorrow?”",
        "options": [
          "To forget the illness",
          "To learn which day was Aishah's, so he could ask their leave",
          "To set out on a journey",
          "To lead the prayer"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A water vessel",
        "description": "A vessel: fairness does not lapse with illness."
      },
      "badge": "Fair Even When Ill"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "His asking “where am I tomorrow” and his wives giving him leave to be nursed in Aishah's room are in Sahih al-Bukhari."
    }
  },
  "abu-bakr-leads-prayer": {
    "title": "Tell Abu Bakr to Lead the Prayer",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The time for prayer came and the people were waiting in the mosque. The Prophet ﷺ tried to rise and fainted; he came round, tried again, and fainted again. So he said: “Tell Abu Bakr to lead the people in prayer.” Aishah said: Abu Bakr is a tender man — when he recites, weeping overcomes him. He repeated the instruction three times.",
        "shortLesson": "The prayer is not abandoned, and the right person is put in front of it."
      },
      "tier_2_age_9_11": {
        "narrative": "The illness grew until the Prophet ﷺ could not go out. The time for prayer came and the Muslims were waiting for him in the mosque as always. He asked: “Have the people prayed?” They said: no, they are waiting for you, Messenger of Allah. He asked for water and washed to lighten the fever, then went to stand and fainted; he came round, asked the same question, and the same happened — three times. When he knew he could not, he said: “Tell Abu Bakr to lead the people in prayer.” Aishah — afraid people would think ill of her father standing in his place — said: Abu Bakr is a tender man; when he recites the Quran, weeping overcomes him. He gave the instruction again, and she repeated hers, until he said: “Tell her to tell Abu Bakr to lead the prayer.” So Abu Bakr went forward and led the people for days while the Prophet ﷺ was in his room.",
        "details": "Allah says: ﴿حَافِظُوا عَلَى الصَّلَوَاتِ﴾ — “Guard the prayers carefully.”"
      }
    },
    "interactive": {
      "discover": "Many companions read his putting Abu Bakr in front for the prayer as a sign of who would lead after him.",
      "value": {
        "name": "Honouring the prayer",
        "icon": "🕌"
      },
      "thinkQuestion": "Is there something you do every day however tired you are? What is it?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ do when he could not go out to the prayer?",
        "options": [
          "He delayed it until he recovered",
          "He told Abu Bakr to lead the people",
          "He told them to pray alone",
          "He was carried out"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small prayer mat",
        "description": "A mat: the prayer is the last thing to be let go."
      },
      "badge": "Keeper of the Prayer"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari and Muslim",
      "note": "The instruction to Abu Bakr and Aishah's reply are established in the two Sahih collections."
    }
  },
  "last-prayer-behind-abu-bakr": {
    "title": "The Last Prayer He Prayed Among Them",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ felt a little stronger, so he came out between two men to the mosque while Abu Bakr was leading the prayer. When Abu Bakr sensed him he began to step back, and the Prophet ﷺ signalled to him: stay where you are. He sat beside him and prayed, with Abu Bakr following the Prophet's prayer and the people following Abu Bakr's.",
        "shortLesson": "Do not crowd out the one who started; finish what you began."
      },
      "tier_2_age_9_11": {
        "narrative": "One day the Prophet ﷺ felt a little lighter, and came out walking between two men, his feet dragging on the ground from weakness, until he entered the mosque where Abu Bakr was standing leading the people. When Abu Bakr sensed him he began to step back to give him the leader's place, and the Prophet ﷺ signalled with his hand: stay where you are, do not step back. The Prophet ﷺ sat down at his left and prayed, and Abu Bakr followed the Prophet ﷺ and raised his voice with the calls so the people could hear, and the people followed Abu Bakr. The Prophet ﷺ did not move a man out of a prayer he had begun, and Abu Bakr did not crowd his Prophet. This was the last prayer the Prophet ﷺ prayed in his mosque among his companions.",
        "details": "Allah says: ﴿النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ﴾ — “The Prophet is closer to the believers than their own selves.”"
      }
    },
    "interactive": {
      "discover": "Abu Bakr relayed the calls of the prayer aloud so those at the back of the mosque could hear them.",
      "value": {
        "name": "Humility on both sides",
        "icon": "🤲"
      },
      "thinkQuestion": "If someone started a job and you could do it better, would you take it from them or finish it with them?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ signal to Abu Bakr when he tried to step back?",
        "options": [
          "To leave",
          "Stay where you are, do not step back",
          "To sit down",
          "To repeat the prayer"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "Wooden prayer beads",
        "description": "A keepsake for the last prayer that gathered them with him."
      },
      "badge": "Humble With People"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The Prophet coming out during his illness and praying beside Abu Bakr is in Sahih al-Bukhari."
    }
  },
  "final-glance-and-smile": {
    "title": "The Curtain Lifts, and the Smile",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "While the people were praying the dawn prayer behind Abu Bakr, the curtain of Aishah's room was drawn back. The Prophet ﷺ looked at them standing in their rows and smiled. They almost broke their prayer for joy, so he signalled to them to complete it — and then let the curtain fall. It was the last time their eyes saw him.",
        "shortLesson": "The finest thing a teacher can see is his students carrying on without him."
      },
      "tier_2_age_9_11": {
        "narrative": "On a Monday morning, with the people in rows for the dawn prayer behind Abu Bakr, the curtain of Aishah's room was drawn back. The Prophet ﷺ looked out at them: rows in order, a prayer standing, a community going on with what he had taught it without him among them. Anas ibn Malik described his face at that moment: like a page of the Quran. And the Prophet ﷺ smiled — glad at them. The people almost broke their prayer for joy at seeing him, and Abu Bakr began to step back into the row, thinking the Prophet ﷺ was coming out to lead. But he signalled to them to complete their prayer. Then he let the curtain fall. That was the last sight their eyes had of his face.",
        "details": "Allah says of the believers: ﴿سِيمَاهُمْ فِي وُجُوهِهِم مِّنْ أَثَرِ السُّجُودِ﴾ — “their mark is on their faces from the trace of prostration.”"
      }
    },
    "interactive": {
      "discover": "He did not come out and did not interrupt them; it was enough to see them standing, and then he let the curtain fall.",
      "value": {
        "name": "Joy in those you raised",
        "icon": "🌅"
      },
      "thinkQuestion": "If you taught someone something and saw them doing it right on their own — how would you feel?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ do when he saw the people in their rows?",
        "options": [
          "He interrupted their prayer",
          "He smiled, then let the curtain fall",
          "He called Abu Bakr",
          "He came out and led them"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "The edge of a curtain",
        "description": "A keepsake for the last glance — and it was a smile."
      },
      "badge": "One Who Saw Him Smile"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The drawing back of the curtain on the Monday, his smile, and Anas's description of his face are in Sahih al-Bukhari."
    }
  },
  "last-testament-prayer-and-weak": {
    "title": "The Prayer, the Prayer — and Those in Your Care",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The pain grew hard on him. He would put his hand into a vessel of water and wipe his face, saying: “There is no god but Allah; death has its agonies.” And he kept repeating two instructions until his tongue could barely form them: “The prayer, the prayer — and those your right hands possess.”",
        "shortLesson": "What you owe Allah and what you owe people do not come apart."
      },
      "tier_2_age_9_11": {
        "narrative": "The illness grew hard on the Prophet ﷺ in his last days. There was a vessel of water beside him, and he would dip his hand into it and wipe his face, saying: “There is no god but Allah; death has its agonies.” And through all that pain, what he kept repeating to the end were two instructions, said over and over until his tongue grew too heavy to form them: “The prayer, the prayer — and those your right hands possess.” Guard the prayer; and fear Allah regarding the servants, the workers and the weak who are under your hand. The last testament was not about wealth to divide or a kingdom to inherit. It was about two things: your link with your Lord, and how you treat the person who cannot complain about you to anyone. And with Allah those two are one thing, not two.",
        "details": "Allah joins them in one verse: ﴿وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا﴾ — worship, and then the rights of parents, neighbours and those in one's care."
      }
    },
    "interactive": {
      "discover": "He left no instruction about money — he died leaving neither dinar nor dirham.",
      "value": {
        "name": "What is owed to Allah and to the weak",
        "icon": "🤍"
      },
      "thinkQuestion": "Who is the person who cannot complain about you to anyone? How do you treat them?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What was the Prophet's final instruction?",
        "options": [
          "Wealth and inheritance",
          "The prayer, and those in their care",
          "Fighting only",
          "Travel"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A water vessel",
        "description": "A vessel for the last two things he said."
      },
      "badge": "Keeper of the Testament"
    },
    "source": {
      "reliability": "🟡",
      "reference": "Sunan Abi Dawud and Musnad Ahmad, with “the agonies of death” in Sahih al-Bukhari",
      "note": "“The prayer, the prayer, and those your right hands possess” is in Abu Dawud and Ahmad and graded authentic by the scholars, but is not in the two Sahih collections; “death has its agonies” is in al-Bukhari."
    }
  },
  "to-the-highest-companion": {
    "title": "Rather, the Highest Companion",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "His head was on Aishah's chest when her brother came in with a fresh toothstick. The Prophet ﷺ looked at it, and she understood that he wanted it, so she softened it for him and he used it. Then he raised his eyes and began saying: “With the Highest Companion” — and he passed away.",
        "shortLesson": "The last thing left of a person is what they chose."
      },
      "tier_2_age_9_11": {
        "narrative": "On the Monday, the Prophet's head was resting against Aishah. Her brother Abd al-Rahman ibn Abi Bakr came in holding a fresh toothstick, and the Prophet ﷺ looked at it in a way that told her he wanted it. She said: shall I take it for you? He nodded. So she took it, bit it soft and gave it to him, and he cleaned his teeth with it as well as she had ever seen him do. Then he went to hand it back, and his hand dropped. There was a vessel of water before him, and he was dipping his hands in it and wiping his face. Then he raised his eyes towards the ceiling and said: “With those Allah has favoured — the prophets, the truthful, the martyrs and the righteous.” Then: “O Allah, forgive me and have mercy on me and join me with the Highest Companion,” repeating it: “Rather, the Highest Companion.” Then his hand fell, and he passed away.",
        "details": "Allah says: ﴿فَأُولَٰئِكَ مَعَ الَّذِينَ أَنْعَمَ اللَّهُ عَلَيْهِم مِّنَ النَّبِيِّينَ وَالصِّدِّيقِينَ﴾ — “those are with the ones Allah has favoured: the prophets and the truthful.”"
      }
    },
    "interactive": {
      "discover": "The last thing he did was clean his teeth — a small habit he had kept his whole life.",
      "value": {
        "name": "A good ending",
        "icon": "✨"
      },
      "thinkQuestion": "Is there a small good habit you do every day that you would like to keep?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What were the Prophet's last words?",
        "options": [
          "I leave you wealth",
          "Rather, the Highest Companion",
          "Guard the road",
          "Wait for me"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A toothstick",
        "description": "A siwak: a small habit stays to the last moment."
      },
      "badge": "A Good Ending"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "The account of the siwak and his words “with the Highest Companion” at his death are in Sahih al-Bukhari, from Aishah."
    }
  },
  "city-earthquake-abu-bakr-speech": {
    "title": "Madinah Shakes, and Abu Bakr Holds",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The news spread and Madinah was shaken. Umar stood saying: he has not died! Abu Bakr came, uncovered the Prophet's face, kissed it and wept, then went out to the people and said: “Whoever worshipped Muhammad — Muhammad has died. Whoever worships Allah — Allah is Living and does not die.” Then he recited the verse, and it was as if the people had never heard it before that day.",
        "shortLesson": "In a crisis, someone is needed who will say the truth calmly."
      },
      "tier_2_age_9_11": {
        "narrative": "When the news came out, Madinah was thrown into confusion. Umar ibn al-Khattab — stunned by it — stood telling the people that hypocrites were claiming the Messenger of Allah had died, and that by Allah he had not died but had gone to his Lord as Musa did. Abu Bakr rode in from his home at as-Sunh, spoke to no one, and went in to Aishah. He uncovered the Prophet's face, kissed it, wept, and said: you were good in life and in death. Then he went out while Umar was still speaking, and said: gently, Umar. And then: “Whoever among you worshipped Muhammad — Muhammad has died. Whoever worships Allah — Allah is Living and does not die.” Then he recited: “Muhammad is only a messenger; messengers have passed away before him.” The people said afterwards: by Allah, it was as if the people did not know Allah had revealed that verse until Abu Bakr recited it. And Umar sat down on the ground.",
        "details": "Allah says: ﴿وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ﴾ — “Muhammad is only a messenger; messengers have passed away before him.”"
      }
    },
    "interactive": {
      "discover": "The verse had come down years earlier, but people only understood it that day.",
      "value": {
        "name": "Steadiness in shock",
        "icon": "🗻"
      },
      "thinkQuestion": "When hard news comes, are you the one who steadies or the one who panics? How could you practise?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did Abu Bakr say to the people on the day the Prophet ﷺ died?",
        "options": [
          "Be patient, he will return",
          "Whoever worshipped Muhammad — he has died; whoever worships Allah — Allah does not die",
          "Say nothing",
          "Leave Madinah"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A steady stone",
        "description": "A stone for the man who held firm when everyone else was shaken."
      },
      "badge": "Steady in Crisis"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "Abu Bakr's address on the day of the Prophet's death, and the people's words about the verse, are in Sahih al-Bukhari."
    }
  },
  "eternal-legacy-living-sunnah": {
    "title": "What Remained After Him: The Light Did Not Go Out",
    "content": {
      "tier_1_age_6_8": {
        "narrative": "The Prophet ﷺ was buried where he passed away, in Aishah's room. He left neither dinar nor dirham, but he left what lasts longer: the Book of Allah and his way, and a community that had learned truthfulness, mercy and justice. His companions carried it to those after them, until it reached us.",
        "shortLesson": "What you leave in people outlasts you."
      },
      "tier_2_age_9_11": {
        "narrative": "The Prophet ﷺ was buried in the place where he passed away, in Aishah's room beside his mosque. When he died he left no dinar and no dirham, no servant, no sheep and no camel — only his weapons, his white mule, and land he had given away as charity. But he left what does not wear out: the Book of Allah preserved, his way preserved, and a community that had learned that truth saves you, that the weak have rights, that a neighbour is honoured, that an animal is shown mercy, and that learning is for everyone. His companions carried all of it and passed it on, generation after generation, until it reached us — reading his life and learning from it. And loving him is not done with words alone: it is done when people can see something in you that you learned from him.",
        "details": "Allah says: ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — “We sent you only as a mercy to all the worlds.”"
      }
    },
    "interactive": {
      "discover": "He died with his armour pledged to a Jewish man for thirty measures of barley he had taken as food for his family.",
      "value": {
        "name": "What lasts",
        "icon": "🌟"
      },
      "thinkQuestion": "If someone described you by one quality you learned from his life, what would you want it to be?",
      "challenge": {
        "type": "multiple_choice",
        "question": "What did the Prophet ﷺ leave behind when he died?",
        "options": [
          "A great deal of money",
          "No dinar or dirham — the Book of Allah and his way",
          "Palaces",
          "An army"
        ],
        "correctAnswer": 1
      }
    },
    "gamification": {
      "artifact": {
        "name": "A small lamp",
        "description": "A lamp: light is passed from hand to hand."
      },
      "badge": "Carrier of the Legacy"
    },
    "source": {
      "reliability": "🟢",
      "reference": "Sahih al-Bukhari",
      "note": "His burial place, that he left neither dinar nor dirham, and his armour being pledged are all in Sahih al-Bukhari."
    }
  }
};
