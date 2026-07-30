import photoTie from "@/assets/IMG-20260730-WA0032.jpg";
import photoStreet from "@/assets/IMG-20260730-WA0039.jpg";
import photoHoodie from "@/assets/IMG-20260730-WA0041.jpg";
import clipOne from "@/assets/VID-20260730-WA0037.mp4";
import clipTwo from "@/assets/VID-20260730-WA0035-2.mp4";
import song from "@/assets/5ive_-_Me_And_My_Brother_mp3.pm.mp3";
export const media = {
  hero: photoStreet,
portrait: photoHoodie,
llb: photoTie,
song: song,
};

export type GalleryItem = {
  src: string;
  type: "image" | "video";
  caption: string;
  span: "tall" | "short";
};

export const gallery: GalleryItem[] = [
  {
    src: photoStreet,
    type: "image",
    caption: "Standing exactly the way you always stand, calm and sure of yourself",
    span: "tall",
  },
  {
    src: photoTie,
    type: "image",
    caption: "LLB days, back when the world was still learning your name",
    span: "short",
  },
  {
    src: clipOne,
    type: "video",
    caption: "A little moving piece of you, the kind of thing I keep going back to",
    span: "tall",
  },
  {
    src: photoHoodie,
    type: "image",
    caption: "Somewhere in the middle of an ordinary day, which is where most of my favourite memories live",
    span: "short",
  },
  {
    src: clipTwo,
    type: "video",
    caption: "Proof that you love enjoyment, and that you let the rest of us enjoy it with you",
    span: "tall",
  },
];

export const content = {
  recipient: "Jaygram",
  nicknames: ["China", "J.S.C"],
  heroKicker: "A HerPage for",
  tagline: "More than a gift, a memory",
  heroIntro:
    "Since the twentieth of June, the day I arrived and found you already waiting, you have been my brother in every way that counts. This is a small place I built to say the things I carry quietly, and to let you see yourself the way I have always seen you.",
  cta: "Begin the Journey",

  welcome: {
    title: "Someone created something beautiful just for you",
    sub: "Take a moment, this experience was made with love",
    button: "Open My HerPage",
  },

  letterOpening: {
    salutation: "My dear brother,",
    body: [
      "I have never been very good at saying this out loud, so I am writing it down instead, where you can come back to it whenever you need to be reminded.",
      "You have been in my life since the very first day of it. I did not have to earn you or find you, you were simply there, and you have stayed there through everything since. There is a certain kind of safety in that which I do not think you know you give me.",
      "You show up. For me, for everyone, sometimes even when it costs you more than it should. I notice it, China. I always notice it.",
    ],
    signOff: "With all my love, always",
    signature: "The absolute love of your life",
  },

  appreciation: {
    title: "Why You're So Special",
    intro:
      "There is no neat way to quantify a person like you, so I picked the things I would say first if someone asked me to describe my brother.",
    cards: [
      {
        title: "You are always there",
        body: "In every sense of the word. Not the kind of presence that has to be requested, the kind that simply exists and holds steady no matter what is going on.",
      },
      {
        title: "You show up for everyone",
        body: "Even when it is detrimental to you. That is a rare and costly way to love people and you do it without making anyone feel like they owe you.",
      },
      {
        title: "You are intentional",
        body: "Nothing about you feels accidental. The way you speak, the way you choose, the way you treat people, all of it is deliberate and it shows.",
      },
      {
        title: "You know your worth",
        body: "And you refuse to let anyone talk you out of it, which is one of the most quietly powerful things about you.",
      },
      {
        title: "You taught me to know mine",
        body: "Watching you stand firm taught me how to stand too. So much of what I know about my own value, I learned by having you as a brother.",
      },
      {
        title: "You are caring and supportive",
        body: "You listen properly, you follow up, and you carry a bit of whatever I am carrying without ever being asked to.",
      },
      {
        title: "You love enjoyment",
        body: "Truly, gloriously, unapologetically. And because of that you always let me have my fun whenever I can, which I love you for.",
      },
      {
        title: "You are my J.S.C",
        body: "Justice of the Supreme Court, obviously. Only in this house, only between us, and it will never stop being funny to me.",
      },
    ],
  },

  memory: {
    title: "Our Favourite Memory",
    lead: "It is really difficult to pick a favourite memory, because every time shared with you is special.",
    body: [
      "I sat with the question for a while and I could not do it. Not because there is nothing to choose from but because there is too much, and none of it wants to be ranked.",
      "That is what happens when someone has been there since birth. The memories stop being separate events and start being a whole life instead, so I remember you in the ordinary hours as much as the big ones, in the drives and the laughing and the long stretches of nothing much happening at all.",
      "So instead of choosing one, I will say this. Every single one of them counts, and I would not give back a single day of them.",
    ],
  },

  littleThings: {
    title: "Little Things That Remind Me Of You",
    items: [
      "The name China, which nobody outside this family will ever understand",
      "Justice of the Supreme Court, said with a completely straight face",
      "Black and blue, everywhere, always yours",
      "The twentieth of June, the day I came and found you already here",
      "Anyone who shows up for other people without being asked",
      "That look you give when you have decided something and there is no talking you out of it",
      "Every plan that turns into enjoyment because you were part of it",
      "Being told I deserve better, in your voice, in my head",
    ],
  },

  quote: {
    text: "In the end, it'll get better. And if it doesn't get better, it's not the end.",
    attribution: "Your words, and now mine too",
  },

  finalLetter: {
    title: "One Last Thing",
    body: [
      "If you remember nothing else from this page, remember this.",
      "I love you and I cherish you. I appreciate you far more than I actually show, and I hope you can see it now and keep seeing it, today and every day after this one.",
      "I would not trade you for the world, China. Not for anything in it.",
    ],
    signOff: "Happy everything, forever",
    signature: "Your sister",
  },

  footer: {
    line: "Created with love by HerPage",
    tagline: "More than a gift, a memory",
  },
};
