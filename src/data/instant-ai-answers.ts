export interface InstantAnswer {
  keywords: RegExp;
  answerUrdu: string;
  answerEnglish: string;
  quickAction?: { label: string; url: string };
}

export const INSTANT_INTENTS: InstantAnswer[] = [
  {
    keywords: /(prayer times?|namaz ke auqat|نماز کے اوقات|اوقات نماز|صلاة|نماز کا وقت)/i,
    answerUrdu: "نماز کے درست اوقات آپ کے موجودہ شہر اور مقام کے مطابق لائیو کیلکولیٹر پر دستیاب ہیں۔",
    answerEnglish: "Accurate daily prayer times calculated for your current GPS/city are available instantly.",
    quickAction: { label: "Open Prayer Times (اوقات نماز)", url: "/daily" }
  },
  {
    keywords: /(qibla|قبلہ|رخ قبلہ|qiblah direction)/i,
    answerUrdu: "کعبہ شریف کی درست سمت جاننے کے لیے ڈیجیٹل قبلہ کمپاس استعمال فرمائیں۔",
    answerEnglish: "Find the exact Qibla direction from your device using the interactive compass.",
    quickAction: { label: "Open Qibla Compass (قبلہ رخ)", url: "/qibla" }
  },
  {
    keywords: /(99 names|asma ul husna|اسماء الحسنیٰ|اللہ کے ۹۹ نام|نام ہائے خدا)/i,
    answerUrdu: "اللہ تعالیٰ کے ۹۹ اسمائے مبارکہ مع معانی اور تفصیلی برکات ہمارے خصوصی پورٹل پر موجود ہیں۔",
    answerEnglish: "Explore the 99 Beautiful Names of Allah (Asma ul Husna) with translations and reflections.",
    quickAction: { label: "View 99 Names (اسماء الحسنیٰ)", url: "/names" }
  },
  {
    keywords: /(tasbih|tasbeeh|تسبیح|ذکر|dhikr counter)/i,
    answerUrdu: "تسبیحات حضرت زہرا (سلام اللہ علیہا) اور روزانہ کے اذکار کے لیے ڈیجیٹل تسبیح کاؤنٹر حاضر ہے۔",
    answerEnglish: "Access the digital Tasbih counter for Tasbih of Lady Fatima (s.a) and daily adhkar.",
    quickAction: { label: "Digital Tasbih (ڈیجیٹل تسبیح)", url: "/tasbih" }
  },
  {
    keywords: /(zakat calculator|زکوٰۃ|زکوۃ کا حساب)/i,
    answerUrdu: "زکوٰۃ کے شرعی احکام اور نصاب کے خودکار حساب کے لیے زکوٰۃ کیلکولیٹر استعمال فرمائیں۔",
    answerEnglish: "Calculate your mandatory Zakat according to authentic fiqh rulings instantly.",
    quickAction: { label: "Zakat Calculator (زکوٰۃ کیلکولیٹر)", url: "/zakat" }
  },
  {
    keywords: /(inheritance calculator|وراثت|تقسیم ترکہ|میراث)/i,
    answerUrdu: "اسلامی قوانینِ میراث اور شرعی حصص کی درست ریاضیاتی تقسیم کے لیے وراثت پورٹل ملاحظہ فرمائیں۔",
    answerEnglish: "Calculate Islamic inheritance shares according to comparative fiqh principles.",
    quickAction: { label: "Inheritance Engine (میراث کیلکولیٹر)", url: "/inheritance" }
  },
  {
    keywords: /(who is imam mahdi|امام مہدی کون ہیں|امام مہدی عج|ظہور مہدی)/i,
    answerUrdu: "حضرت امام مہدی (عجل اللہ تعالیٰ فرجہ الشریف) بارہویں امام اور آخری حجتِ الٰہی ہیں۔ وہ دنیا کو عدل و انصاف سے بھر دیں گے جیسا کہ وہ ظلم و جور سے بھری ہوگی۔ تفصیلی علمی دستاویز پورٹل پر موجود ہے۔",
    answerEnglish: "Imam al-Mahdi (may Allah hasten his return) is the Twelfth Imam and the promised saviour of mankind who will establish universal justice and truth. Read the full academic research.",
    quickAction: { label: "Who is Imam Mahdi? (مکمل تحقیق)", url: "/who-is-imam-mahdi" }
  }
];

export function checkInstantAnswer(query: string, lang: "ur" | "en" = "ur") {
  const clean = query.trim().toLowerCase();
  for (const item of INSTANT_INTENTS) {
    if (item.keywords.test(clean)) {
      return {
        text: lang === "en" ? item.answerEnglish : item.answerUrdu,
        action: item.quickAction,
        isInstant: true
      };
    }
  }
  return null;
}
