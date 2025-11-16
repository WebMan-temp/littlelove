// Customize her name and all messages here.
export const HER_NAME = "Anshika"; // ← Edit her name

export const HERO_MESSAGE =
  "This little website is just to remind you how special you are ✨";

// Messages for the hero icon modals (edit these with your own words)
export const HERO_ICON_MESSAGES: Record<"mail" | "sparkle" | "flower", string> = {
  mail: "A little note just for you — you are cherished more than you know 💌",
  sparkle: "You sprinkle magic on ordinary days. Thank you for being you ✨",
  flower: "Like a soft blossom, you make the world gentler and brighter 🌸"
};

// Titles and small subtexts for hero icon modals
export const HERO_ICON_TITLES: Record<"mail" | "sparkle" | "flower", string> = {
  mail: "A Little Note 💌",
  sparkle: "A Little Sparkle ✨",
  flower: "A Little Bloom 🌸"
};
export const HERO_ICON_SUBTEXT: Record<"mail" | "sparkle" | "flower", string> = {
  mail: "From me to you, saved for a soft moment.",
  sparkle: "Tiny glimmers for your beautiful heart.",
  flower: "Something gentle to make your day softer."
};

// Words used in "Pop the Hearts" mini-game (shown inside balloons)
export const POP_WORDS: string[] = [
  "nanu",
  "amon",
  "anshuka",
  "mar khayega",
  "awww",
  "ooa",
  "ummm",
  "wow",
  "sweet",
  "kkrh",
  "gussa",
  "theek",
  "thak gayi",
  "soungi",
  "baad me"
];

// Flirty This-or-That questions (edit freely)
export type ThisOrThat = {
  question: string;
  a: { label: string; emoji?: string };
  b: { label: string; emoji?: string };
};

export const THIS_OR_THAT: ThisOrThat[] = [
  { question: "Movie or long walk?", a: { label: "Movie", emoji: "🍿" }, b: { label: "Long walk", emoji: "🌙" } },
  { question: "Desi food or street food?", a: { label: "Desi food", emoji: "☕" }, b: { label: "Street food", emoji: "🍰" } },
  { question: "Sunrise or sunset?", a: { label: "Sunrise", emoji: "🌅" }, b: { label: "Sunset", emoji: "🌇" } },
  { question: "Beach day or cozy mountain?", a: { label: "Beach", emoji: "🏖️" }, b: { label: "Cozy Mountain", emoji: "🌧️" } },
  { question: "Texting memes or voice notes?", a: { label: "Memes", emoji: "😂" }, b: { label: "Voice notes", emoji: "🎧" } }
];

// Gallery images and captions (replace photo paths with your real images)
export type Memory = { src: string; caption: string };
export const MEMORIES: Memory[] = [
  { src: "/friend/photo1.jpeg", caption: "sarojini" },
  { src: "/friend/photo2.jpeg", caption: "Shakeee in better beans" },
  { src: "/friend/photo10.jpeg", caption: "movieeeee" },
  { src: "/friend/photo4.jpeg", caption: "our island" },
  { src: "/friend/photo5.jpeg", caption: "pizzzaaaaaaa" },
  { src: "/friend/photo6.jpeg", caption: "jhumkaa giraa ree" },
  { src: "/friend/photo7.jpeg", caption: "chocolate swirl" },
  { src: "/friend/photo8.jpeg", caption: "icecreammmm" },
  { src: "/friend/photo9.jpeg", caption: "kejrival" }
];

// Mood Uplifter messages
export const COMPLIMENTS = [
  "You light up every room you walk into ✨",
  "Your laugh is my favorite sound 💞",
  "You are effortlessly wonderful, inside and out 🌸",
  "Your kindness makes the world softer 💗",
  "You’re the kind of person people feel lucky to know 🌟",
  "Your smile makes everything feel lighter ☀️",
  "You notice the little things—and that’s magic ✨",
  "You make ordinary days feel special 🌈",
  "Your presence is calm and warm, like a soft blanket 🫶",
  "You’re brave in quiet, beautiful ways 🌷",
  "You’re a gentle storm of talent and heart 💖",
  "You care in ways that matter more than you know 💫",
  "You bring out the best version of me 🌟",
  "You make the world feel kinder just by being here 🌼",
  "You turn moments into memories effortlessly 📸"
];

export const VIRTUAL_HUGS = [
  "Wrapped you in a big, warm virtual hug 🤗",
  "Squeezing you gently with love and comfort 💖",
  "Sending a blanket of coziness and peace 🫶",
  "A hug for your heart, always here for you 💝"
];

// Photos to reveal on a random hug (place your images in public/friend/)
export const HUG_PHOTOS: string[] = [
  "/friend/hug1.avif"
];

export const RANDOM_MEMORIES = [
  "Remember that time we couldn't stop laughing at nothing? 😂",
  "You: 'Let’s get snacks.' Also you: '…and dessert.' Same 🫶",
  "That day the sky matched your vibe—soft and perfect ☁️",
  "We made the ordinary feel magical ✨"
];

// Reasons list content
export type Reason = { icon: string; text: string };
export const REASONS: Reason[] = [
  { icon: "🥹", text: "You make hard days feel gentle" },
  { icon: "✨", text: "You bring sparkle to simple moments" },
  { icon: "💖", text: "You’re thoughtful in the tiniest ways" },
  { icon: "🌷", text: "You grow beautifully through everything" },
  { icon: "😂", text: "You always make me laugh" },
  { icon: "🫶", text: "You’re insanely supportive" },
  { icon: "🌙", text: "You’re my calm on messy days" },
  { icon: "⭐", text: "You shine without trying" }
];


