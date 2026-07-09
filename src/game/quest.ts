export type QuestionKind = 'quiz' | 'logic' | 'boss';

export interface QuestOption {
  id: string;
  label: string;
  correct?: boolean;
  effect?: Record<string, unknown>;
  translations?: { en?: string; he?: string };
  isCustom?: true;
}

export interface Question {
  levelSlug: string;
  order: number;
  kind: QuestionKind;
  question: string;
  options: QuestOption[];
  effectKey?: string;
  explain?: string;
  translations?: {
    en?: { question: string; explain?: string };
    he?: { question: string; explain?: string };
  };
}

export interface Level {
  levelNumber: number;
  slug: string;
  title: string;
  intro: string;
  sitePart: string;
  bossName: string;
  bossIntro: string;
  bossImage?: string;
  translations?: {
    en?: { title: string; intro: string; bossName: string; bossIntro: string };
    he?: { title: string; intro: string; bossName: string; bossIntro: string };
  };
}

export const VIXIK_HERO =
  'https://static.wixstatic.com/media/4b150e_575d550751e44f14a843f0504188851f~mv2.png';
export const VIXIK_VICTORY =
  'https://static.wixstatic.com/media/4b150e_c800cfec21534ed89c616079a62a9974~mv2.png';
export const BG_WORLD =
  'https://static.wixstatic.com/media/4b150e_610eafbd1e0543cca3f6681799df3337~mv2.png';

const BOSS_IMG: Record<string, string> = {
  palette: 'https://static.wixstatic.com/media/4b150e_e866c6fd6a824cafacea5349ba9a65c2~mv2.png',
  typography: 'https://static.wixstatic.com/media/4b150e_a4cf9b4162a34c0ca0ca2ced5eb44f73~mv2.png',
  imagery: 'https://static.wixstatic.com/media/4b150e_30dc2ebbf24a4522a47f22ca3e80b11f~mv2.png',
  services: 'https://static.wixstatic.com/media/4b150e_0a6df70f0f2c49e3a06a1a6ed368915a~mv2.png',
  features: 'https://static.wixstatic.com/media/4b150e_81c8bf6d7d7142cfa5b9ed270c0908d5~mv2.png',
};

export const WIX_APPS = [
  { id: 'stores', icon: '🛒' },
  { id: 'bookings', icon: '📅' },
  { id: 'events', icon: '🎟️' },
  { id: 'blog', icon: '📝' },
  { id: 'members', icon: '👥' },
  { id: 'forms', icon: '📋' },
  { id: 'restaurants', icon: '🍽️' },
  { id: 'pricing', icon: '💰' },
] as const;

export type WixAppId = (typeof WIX_APPS)[number]['id'];

const p = (id: string, label: string, extra: Partial<QuestOption> = {}): QuestOption => ({
  id,
  label,
  ...extra,
});

export const PALETTES = {
  sunny: { name: 'Сонячна', bg: '#FFF8E1', surface: '#FFFFFF', text: '#1A1A1A', accent: '#FFC800', accentText: '#1A1A1A' },
  ocean: { name: 'Океанська', bg: '#E8F4F8', surface: '#FFFFFF', text: '#0B2239', accent: '#0E7490', accentText: '#FFFFFF' },
  forest: { name: 'Лісова', bg: '#F0F5EC', surface: '#FFFFFF', text: '#1B2E20', accent: '#2F7D32', accentText: '#FFFFFF' },
  sunset: { name: 'Захід сонця', bg: '#FFF0EB', surface: '#FFFFFF', text: '#2B1B2F', accent: '#E85D4A', accentText: '#FFFFFF' },
} as const;

export const FONTS = {
  serif: { name: 'Елегантний', heading: "'Playfair Display', serif", body: "'Source Serif 4', Georgia, serif" },
  sans: { name: 'Сучасний', heading: "'Manrope', sans-serif", body: "'Inter', sans-serif" },
  rounded: { name: 'Грайливий', heading: "'Baloo 2', system-ui, sans-serif", body: "'Nunito', sans-serif" },
  mono: { name: 'Технічний', heading: "'Space Mono', monospace", body: "'IBM Plex Mono', monospace" },
} as const;

export const BUSINESSES = {
  cafe: {
    type: 'cafe', name: "Кав'ярня", siteName: "Затишна кав'ярня", tagline: 'Кава, за якою повертаються',
    services: [
      { icon: '☕', title: 'Авторська кава', text: 'Фільтр, еспресо та сезонні напої з зерна свіжого обсмаження.' },
      { icon: '🥐', title: 'Сніданки та випічка', text: 'Круасани, сирники й каші — все готуємо зранку на місці.' },
      { icon: '🎉', title: 'Кейтеринг подій', text: 'Кавова станція та десерти на вашому святі чи конференції.' },
      { icon: '🫘', title: 'Зерно з собою', text: 'Свіжообсмажене зерно та дріп-пакети для дому й офісу.' },
    ],
  },
  photo: {
    type: 'photo', name: 'Фотостудія', siteName: 'Студія світла', tagline: 'Ловимо миті, які хочеться переживати знову',
    services: [
      { icon: '📷', title: 'Портретні зйомки', text: 'Індивідуальні та сімейні портрети в студії або на локації.' },
      { icon: '💍', title: 'Весільна фотографія', text: 'Повний день з вами — від ранку нареченої до першого танцю.' },
      { icon: '📦', title: 'Предметна зйомка', text: 'Каталожні та імiджеві фото продуктів для магазинів і брендів.' },
      { icon: '🎬', title: 'Оренда студії', text: 'Три зали з циклорамою, світлом та реквізитом погодинно.' },
    ],
  },
  jewelry: {
    type: 'jewelry', name: 'Крамниця прикрас', siteName: 'Майстерня блиску', tagline: 'Прикраси з характером — вашим',
    services: [
      { icon: '💍', title: 'Каблучки ручної роботи', text: 'Срібло та золото, камені на вибір — кожна каблучка єдина.' },
      { icon: '✒️', title: 'Гравіювання', text: 'Імена, дати й таємні послання на ваших прикрасах.' },
      { icon: '✨', title: 'Індивідуальні замовлення', text: 'Втілимо ваш ескіз або придумаємо дизайн разом з нуля.' },
      { icon: '🔧', title: 'Ремонт прикрас', text: 'Полагодимо застібку, повернемо блиск і замінимо камінь.' },
    ],
  },
  yoga: {
    type: 'yoga', name: 'Йога-студія', siteName: 'Простір рівноваги', tagline: 'Дихай. Рухайся. Будь тут',
    services: [
      { icon: '🌅', title: 'Ранкові класи', text: 'Мʼяка практика о 7:30, щоб день почався з ясної голови.' },
      { icon: '🧘', title: 'Йога для початківців', text: 'Пояснюємо кожну асану — прийти можна без жодного досвіду.' },
      { icon: '🤝', title: 'Індивідуальні сесії', text: 'Персональна програма під вашу спину, ритм і цілі.' },
      { icon: '⛰️', title: 'Ретрити вихідного дня', text: 'Два дні практики, тиші та гір — перезавантаження гарантоване.' },
    ],
  },
} as const;

export const TONES = {
  friendly: { name: 'Дружній', greeting: 'Привіт! Заходь — у нас затишно', about: 'Ми робимо те, що любимо, і хочемо ділитися цим з тобою. Без пафосу, з душею.' },
  formal: { name: 'Поважний', greeting: 'Ласкаво просимо', about: 'Ми цінуємо Вашу довіру та працюємо, щоб кожна деталь відповідала найвищим очікуванням.' },
  brief: { name: 'Лаконічний', greeting: 'Коротко про нас', about: 'Робимо добре. Вчасно. Для вас.' },
} as const;

export const IMAGE_STYLES = {
  photo: { name: 'Живі фото', style: 'photo' },
  illustration: { name: 'Ілюстрації', style: 'illustration' },
  threed: { name: '3D та обʼєм', style: '3d' },
  pattern: { name: 'Мінімалізм і патерни', style: 'pattern' },
} as const;

export const RADII = {
  sharp: { name: 'Гострі кути', radius: '0px' },
  soft: { name: 'Мʼякі заокруглення', radius: '18px' },
  pill: { name: 'Капсули', radius: '34px' },
} as const;

export const CTAS = {
  book: { name: 'Записатись', label: 'Записатись' },
  buy: { name: 'Замовити', label: 'Замовити' },
  write: { name: 'Написати', label: 'Написати нам' },
} as const;

export const FALLBACK_LEVELS: Level[] = [
  {
    levelNumber: 1, slug: 'palette', title: 'Долина Кольорів', sitePart: 'hero', bossImage: BOSS_IMG.palette,
    intro: 'Перший рубіж — Долина Кольорів. Тут народжується настрій твого світу. Обери палітру, яка говоритиме замість тебе.',
    bossName: 'Ахрома, Пожирач Барв', bossIntro: 'Я — Ахрома. Кожен колір, до якого торкаюсь, стає попелом. Твій світ згасне в сірому, як і сотні до нього. Доведи, що бачиш барви, — або впади в морок.',
    translations: {
      en: { title: 'Valley of Colors', intro: 'The first frontier — the Valley of Colors. Here the mood of your world is born. Choose the palette that will speak for you.', bossName: 'Achroma, the Color-Eater', bossIntro: 'I am Achroma. Every color I touch turns to ash. Your world will fade to gray, like a hundred before it. Prove you can see in color — or fall into the dark.' },
      he: { title: 'עמק הצבעים', intro: 'הגבול הראשון — עמק הצבעים. כאן נולד מצב הרוח של עולמך. בחר את הפלטה שתדבר בשמך.', bossName: 'אכרומה, טורף הצבעים', bossIntro: 'אני אכרומה. כל צבע שאני נוגע בו הופך לאפר. עולמך ידעך אל האפור, כמו מאה שקדמו לו. הוכח שאתה רואה בצבע — או שקע אל החושך.' },
    },
  },
  {
    levelNumber: 2, slug: 'typography', title: 'Ліс Літер', sitePart: 'about', bossImage: BOSS_IMG.typography,
    intro: 'Колір обрано. Тепер твій світ має заговорити. У Лісі Літер обери голос шрифтів — характер, що звучатиме в кожному слові.',
    bossName: 'Враксіс, Кернінг-Кракен', bossIntro: 'Я — Враксіс. Я вкручу твої слова у вир, доки жодне не читатиметься. Порядок літер — єдина твоя зброя. Утримай його, якщо зможеш.',
    translations: {
      en: { title: 'Forest of Letters', intro: 'The colors are set. Now your world must find its voice. In the Forest of Letters, choose the character of your type — the tone behind every word.', bossName: 'Vraxis, the Kerning Kraken', bossIntro: 'I am Vraxis. I\'ll drag your words into the deep until not one can be read. Order is your only weapon here. Hold it — if you can.' },
      he: { title: 'יער האותיות', intro: 'הצבעים נקבעו. עכשיו על עולמך למצוא את קולו. ביער האותיות בחר את אופי הגופנים — הנימה שמאחורי כל מילה.', bossName: 'וראקסיס, קראקן הקרנינג', bossIntro: 'אני וראקסיס. אמשוך את מילותיך אל המצולות עד שאף אחת לא תהיה קריאה. הסדר הוא נשקך היחיד כאן. אחוז בו — אם תוכל.' },
    },
  },
  {
    levelNumber: 3, slug: 'imagery', title: 'Галерея Туманів', sitePart: 'gallery', bossImage: BOSS_IMG.imagery,
    intro: 'Твій світ говорить твоїм голосом. Час дати йому очі. У Галереї Туманів обери стиль образів і форму елементів.',
    bossName: 'Мірфог, Піксельний Привид', bossIntro: 'Я — Мірфог. З туману я приходжу, і кожен твій образ тане до жмені пікселів. Що ти покажеш світові, коли не лишиться нічого чіткого?',
    translations: {
      en: { title: 'Gallery of Mists', intro: 'Your world speaks in your voice. Now give it eyes. In the Gallery of Mists, choose the style of your imagery and the shape of its elements.', bossName: 'Mirefog, the Pixel Wraith', bossIntro: 'I am Mirefog. Out of the haze I come, and every image of yours melts to a handful of pixels. What will you show the world when nothing stays sharp?' },
      he: { title: 'גלריית הערפילים', intro: 'עולמך מדבר בקולך. עכשיו תן לו עיניים. בגלריית הערפילים בחר את סגנון הדימויים ואת צורת האלמנטים.', bossName: 'מיירפוג, רוח הפיקסלים', bossIntro: 'אני מיירפוג. מתוך הערפל אני בא, וכל דימוי שלך נמס לחופן פיקסלים. מה תראה לעולם כשדבר לא יישאר חד?' },
    },
  },
  {
    levelNumber: 4, slug: 'services', title: 'Вершина Послуг', sitePart: 'services', bossImage: BOSS_IMG.services,
    intro: 'Вершина Послуг близько. Тут світ дізнається, на що ти здатний і як тебе знайти. Але на самому шпилі чекає щось, що ненавидить усе неповторне...',
    bossName: 'Моноліт, Сірий Шаблон', bossIntro: 'Я — Моноліт. Мільйон сайтів носять моє обличчя, і твій стане ще одним. Навіщо опиратись? Однаковість — це спокій. Здайся — і розчинися серед решти.',
    translations: {
      en: { title: 'Peak of Services', intro: 'The Peak of Services is near. Here the world learns what you can do and how to reach you. But at the very summit waits something that despises all that is unique...', bossName: 'Monolith, the Gray Template', bossIntro: 'I am Monolith. A million sites wear my face, and yours will be one more. Why resist? Sameness is peace. Surrender — and dissolve among the rest.' },
      he: { title: 'פסגת השירותים', intro: 'פסגת השירותים קרובה. כאן ילמד העולם מה ביכולתך ואיך למצוא אותך. אך בראש הפסגה ממתין דבר ששונא כל מה שייחודי...', bossName: 'מונולית, התבנית האפורה', bossIntro: 'אני מונולית. מיליון אתרים נושאים את פניי, ושלך יהיה עוד אחד. למה להתנגד? אחידות היא שלווה. היכנע — והימוג בין כל השאר.' },
    },
  },
  {
    levelNumber: 5, slug: 'features', title: 'Вежа Можливостей', sitePart: 'features', bossImage: BOSS_IMG.features,
    intro: 'Останній рубіж — Вежа Можливостей. Твій світ майже завершено; лишилось озброїти його. Обери сили з арсеналу Wix: магазин, записи, блог — те, що зробить його живим.',
    bossName: 'Обсолекс, Релікт Минулого', bossIntro: 'Я — Обсолекс, останній із древніх. Я бачив, як постають і тліють тисячі сайтів. Твій я скую іржею й тишею, доки він не спиниться назавжди. Хто ти такий, щоб мене здолати?',
    translations: {
      en: { title: 'Tower of Features', intro: 'The final frontier — the Tower of Features. Your world is nearly whole; now arm it. Choose your powers from the Wix arsenal: a store, bookings, a blog — whatever makes it breathe.', bossName: 'Obsolex, Relic of the Past', bossIntro: 'I am Obsolex, last of the ancients. I have watched a thousand sites rise and rot. Yours I\'ll bind in rust and silence until it stops for good. And who are you to end me?' },
      he: { title: 'מגדל האפשרויות', intro: 'הגבול האחרון — מגדל האפשרויות. עולמך כמעט שלם; עכשיו חמש אותו. בחר את כוחותיך מארסנל Wix: חנות, הזמנות, בלוג — מה שיפיח בו חיים.', bossName: 'אובסולקס, שריד העבר', bossIntro: 'אני אובסולקס, האחרון שבקדמונים. ראיתי אלף אתרים קמים ונרקבים. את שלך אכבול בחלודה ובדממה עד שיעצור לתמיד. ומי אתה שתחסל אותי?' },
    },
  },
];

export const FALLBACK_QUESTIONS: Question[] = [
  {
    levelSlug: 'palette', order: 1, kind: 'quiz', effectKey: 'palette', question: 'Обери настрій твого світу. Яка палітра — твоя?',
    options: Object.entries(PALETTES).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'Choose the mood of your world. Which palette is yours?' },
      he: { question: 'בחר את מצב הרוח של העולם שלך. איזו פלטה היא שלך?' },
    },
  },
  {
    levelSlug: 'palette', order: 2, kind: 'logic', question: 'Скільки кольорів у веселці?',
    explain: 'Веселка розкладає світло на сім барв: червону, оранжеву, жовту, зелену, блакитну, синю, фіолетову.',
    options: [p('seven', 'Сім', { correct: true, translations: { en: 'Seven', he: 'שבעה' } }), p('three', 'Три', { translations: { en: 'Three', he: 'שלושה' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשרה' } }), p('one', 'Один', { translations: { en: 'One', he: 'אחד' } })],
    translations: {
      en: { question: 'How many colors are in a rainbow?', explain: 'A rainbow splits light into seven colors: red, orange, yellow, green, cyan, blue and violet.' },
      he: { question: 'כמה צבעים יש בקשת?', explain: 'הקשת מפצלת את האור לשבעה צבעים: אדום, כתום, צהוב, ירוק, תכלת, כחול וסגול.' },
    },
  },
  {
    levelSlug: 'palette', order: 3, kind: 'quiz', effectKey: 'business', question: 'Про що буде твій сайт? Обери свою справу:',
    options: Object.entries(BUSINESSES).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'What will your site be about? Choose your business:' },
      he: { question: 'על מה יהיה האתר שלך? בחר את העסק שלך:' },
    },
  },
  {
    levelSlug: 'palette', order: 10, kind: 'boss', question: 'Якого кольору небо ясного сонячного дня?',
    explain: 'Ясного дня чисте небо блакитне: так розсіюється сонячне світло.',
    options: [p('blue', 'Блакитного', { correct: true, translations: { en: 'Blue', he: 'תכלת' } }), p('green', 'Зеленого', { translations: { en: 'Green', he: 'ירוק' } }), p('pink', 'Рожевого', { translations: { en: 'Pink', he: 'ורוד' } }), p('black', 'Чорного', { translations: { en: 'Black', he: 'שחור' } })],
    translations: {
      en: { question: 'What color is the sky on a clear sunny day?', explain: 'On a clear day the open sky is blue — that\'s how sunlight scatters.' },
      he: { question: 'באיזה צבע השמיים ביום שמשי בהיר?', explain: 'ביום בהיר השמיים הפתוחים תכולים — כך מתפזר אור השמש.' },
    },
  },
  {
    levelSlug: 'palette', order: 11, kind: 'boss', question: 'Що вийде, якщо змішати червону та білу фарби?',
    explain: 'Червоне, розбавлене білим, дає рожеве.',
    options: [p('pink', 'Рожевий', { correct: true, translations: { en: 'Pink', he: 'ורוד' } }), p('black', 'Чорний', { translations: { en: 'Black', he: 'שחור' } }), p('green', 'Зелений', { translations: { en: 'Green', he: 'ירוק' } }), p('blue', 'Синій', { translations: { en: 'Blue', he: 'כחול' } })],
    translations: {
      en: { question: 'What do you get if you mix red and white paint?', explain: 'Red softened with white gives you pink.' },
      he: { question: 'מה מקבלים אם מערבבים צבע אדום ולבן?', explain: 'אדום המדולל בלבן נותן ורוד.' },
    },
  },
  {
    levelSlug: 'palette', order: 12, kind: 'boss', question: 'Якого кольору стиглий банан?',
    explain: 'Стиглий банан — жовтий. Колір самого Wixsus.',
    options: [p('yellow', 'Жовтого', { correct: true, translations: { en: 'Yellow', he: 'צהוב' } }), p('blue', 'Синього', { translations: { en: 'Blue', he: 'כחול' } }), p('green', 'Зеленого', { translations: { en: 'Green', he: 'ירוק' } }), p('red', 'Червоного', { translations: { en: 'Red', he: 'אדום' } })],
    translations: {
      en: { question: 'What color is a ripe banana?', explain: 'A ripe banana is yellow — the very color of Wixsus.' },
      he: { question: 'באיזה צבע בננה בשלה?', explain: 'בננה בשלה היא צהובה — צבעו של Wixsus עצמו.' },
    },
  },

  {
    levelSlug: 'typography', order: 1, kind: 'quiz', effectKey: 'fontPair', question: 'Який характер має твій текст?',
    options: Object.entries(FONTS).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'What personality does your text have?' },
      he: { question: 'איזה אופי יש לטקסט שלך?' },
    },
  },
  {
    levelSlug: 'typography', order: 2, kind: 'logic', question: 'Продовж: понеділок, вівторок, ...',
    explain: 'Дні тижня йдуть по порядку: за вівторком — середа.',
    options: [p('wed', 'Середа', { correct: true, translations: { en: 'Wednesday', he: 'יום רביעי' } }), p('fri', 'Пʼятниця', { translations: { en: 'Friday', he: 'יום שישי' } }), p('sun', 'Неділя', { translations: { en: 'Sunday', he: 'יום ראשון' } }), p('sat', 'Субота', { translations: { en: 'Saturday', he: 'שבת' } })],
    translations: {
      en: { question: 'Continue: Monday, Tuesday, ...', explain: 'The days run in order: Wednesday follows Tuesday.' },
      he: { question: 'המשך: יום שני, יום שלישי, ...', explain: 'ימי השבוע באים לפי הסדר: אחרי יום שלישי בא יום רביעי.' },
    },
  },
  {
    levelSlug: 'typography', order: 3, kind: 'quiz', effectKey: 'tone', question: 'Як твій сайт звертається до гостей?',
    options: Object.entries(TONES).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'How does your site address its visitors?' },
      he: { question: 'איך האתר שלך פונה למבקרים?' },
    },
  },
  {
    levelSlug: 'typography', order: 10, kind: 'boss', question: 'Скільки днів у тижні?',
    explain: 'Тиждень — це сім днів, від понеділка до неділі.',
    options: [p('seven', 'Сім', { correct: true, translations: { en: 'Seven', he: 'שבעה' } }), p('five', 'Пʼять', { translations: { en: 'Five', he: 'חמישה' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשרה' } }), p('twelve', 'Дванадцять', { translations: { en: 'Twelve', he: 'שנים עשר' } })],
    translations: {
      en: { question: 'How many days are in a week?', explain: 'A week is seven days, from Monday to Sunday.' },
      he: { question: 'כמה ימים יש בשבוע?', explain: 'שבוע הוא שבעה ימים, מיום שני עד יום ראשון.' },
    },
  },
  {
    levelSlug: 'typography', order: 11, kind: 'boss', question: 'Яка пора року настає після зими?',
    explain: 'За зимою завжди приходить весна.',
    options: [p('spring', 'Весна', { correct: true, translations: { en: 'Spring', he: 'אביב' } }), p('summer', 'Літо', { translations: { en: 'Summer', he: 'קיץ' } }), p('autumn', 'Осінь', { translations: { en: 'Autumn', he: 'סתיו' } }), p('winter', 'Знову зима', { translations: { en: 'Winter again', he: 'שוב חורף' } })],
    translations: {
      en: { question: 'Which season comes after winter?', explain: 'Winter always gives way to spring.' },
      he: { question: 'איזו עונה מגיעה אחרי החורף?', explain: 'אחרי החורף תמיד מגיע האביב.' },
    },
  },
  {
    levelSlug: 'typography', order: 12, kind: 'boss', question: 'Скільки місяців у році?',
    explain: 'Рік складається з дванадцяти місяців.',
    options: [p('twelve', 'Дванадцять', { correct: true, translations: { en: 'Twelve', he: 'שנים עשר' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשרה' } }), p('seven', 'Сім', { translations: { en: 'Seven', he: 'שבעה' } }), p('twentyfour', 'Двадцять чотири', { translations: { en: 'Twenty-four', he: 'עשרים וארבעה' } })],
    translations: {
      en: { question: 'How many months are in a year?', explain: 'A year is made of twelve months.' },
      he: { question: 'כמה חודשים יש בשנה?', explain: 'השנה מורכבת משנים עשר חודשים.' },
    },
  },

  {
    levelSlug: 'imagery', order: 1, kind: 'quiz', effectKey: 'imageStyle', question: 'Який стиль зображень пасує твоєму світу?',
    options: Object.entries(IMAGE_STYLES).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'Which image style suits your world?' },
      he: { question: 'איזה סגנון תמונות מתאים לעולם שלך?' },
    },
  },
  {
    levelSlug: 'imagery', order: 2, kind: 'logic', question: 'Хто з них уміє літати?',
    explain: 'З цих істот небо підкоряється лише птаху.',
    options: [p('bird', 'Птах', { correct: true, translations: { en: 'A bird', he: 'ציפור' } }), p('fish', 'Риба', { translations: { en: 'A fish', he: 'דג' } }), p('cat', 'Кіт', { translations: { en: 'A cat', he: 'חתול' } }), p('turtle', 'Черепаха', { translations: { en: 'A turtle', he: 'צב' } })],
    translations: {
      en: { question: 'Which of these can fly?', explain: 'Of these creatures, only the bird owns the sky.' },
      he: { question: 'מי מאלה יודע לעוף?', explain: 'מבין היצורים האלה, רק הציפור שולטת בשמיים.' },
    },
  },
  {
    levelSlug: 'imagery', order: 3, kind: 'quiz', effectKey: 'radius', question: 'Обери форму елементів:',
    options: Object.entries(RADII).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'Choose the shape of your elements:' },
      he: { question: 'בחר את צורת האלמנטים שלך:' },
    },
  },
  {
    levelSlug: 'imagery', order: 10, kind: 'boss', question: 'Скільки ніг у павука?',
    explain: 'Павук — не комаха: у нього вісім ніг.',
    options: [p('eight', 'Вісім', { correct: true, translations: { en: 'Eight', he: 'שמונה' } }), p('six', 'Шість', { translations: { en: 'Six', he: 'שש' } }), p('four', 'Чотири', { translations: { en: 'Four', he: 'ארבע' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשר' } })],
    translations: {
      en: { question: 'How many legs does a spider have?', explain: 'A spider is no insect — it has eight legs.' },
      he: { question: 'כמה רגליים יש לעכביש?', explain: 'עכביש אינו חרק — יש לו שמונה רגליים.' },
    },
  },
  {
    levelSlug: 'imagery', order: 11, kind: 'boss', question: 'Яка тварина каже «мяу»?',
    explain: '«Мяу» — голос кота.',
    options: [p('cat', 'Кіт', { correct: true, translations: { en: 'A cat', he: 'חתול' } }), p('dog', 'Пес', { translations: { en: 'A dog', he: 'כלב' } }), p('cow', 'Корова', { translations: { en: 'A cow', he: 'פרה' } }), p('duck', 'Качка', { translations: { en: 'A duck', he: 'ברווז' } })],
    translations: {
      en: { question: 'Which animal says "meow"?', explain: '"Meow" is the cat\'s call.' },
      he: { question: 'איזו חיה אומרת "מיאו"?', explain: '"מיאו" הוא קולו של החתול.' },
    },
  },
  {
    levelSlug: 'imagery', order: 12, kind: 'boss', question: 'Що світить на небі вночі?',
    explain: 'Уночі небо освітлює місяць.',
    options: [p('moon', 'Місяць', { correct: true, translations: { en: 'The moon', he: 'הירח' } }), p('sun', 'Сонце', { translations: { en: 'The sun', he: 'השמש' } }), p('grass', 'Трава', { translations: { en: 'Grass', he: 'דשא' } }), p('book', 'Книга', { translations: { en: 'A book', he: 'ספר' } })],
    translations: {
      en: { question: 'What shines in the sky at night?', explain: 'At night it\'s the moon that lights the sky.' },
      he: { question: 'מה מאיר בשמיים בלילה?', explain: 'בלילה הירח הוא שמאיר את השמיים.' },
    },
  },

  {
    levelSlug: 'services', order: 1, kind: 'quiz', effectKey: 'servicesCount', question: 'Скільки послуг покажемо на сайті?',
    options: [p('three', 'Три головні', { effect: { count: 3, name: 'Три головні' } }), p('four', 'Всі чотири', { effect: { count: 4, name: 'Всі чотири' } }), p('vixik', 'Нехай Wixsus обере', { effect: { count: 4, name: 'На смак Wixsusа' } })],
    translations: {
      en: { question: 'How many services will we show on the site?' },
      he: { question: 'כמה שירותים נציג באתר?' },
    },
  },
  {
    levelSlug: 'services', order: 2, kind: 'logic', question: 'Куди йдуть, щоб підстригтися?',
    explain: 'По стрижку йдуть до перукарні.',
    options: [p('salon', 'До перукарні', { correct: true, translations: { en: 'To a hair salon', he: 'למספרה' } }), p('pharmacy', 'До аптеки', { translations: { en: 'To a pharmacy', he: 'לבית מרקחת' } }), p('bank', 'До банку', { translations: { en: 'To a bank', he: 'לבנק' } }), p('school', 'До школи', { translations: { en: 'To a school', he: 'לבית ספר' } })],
    translations: {
      en: { question: 'Where do you go to get a haircut?', explain: 'For a haircut, you go to a hair salon.' },
      he: { question: 'לאן הולכים כדי להסתפר?', explain: 'לתספורת הולכים למספרה.' },
    },
  },
  {
    levelSlug: 'services', order: 3, kind: 'quiz', effectKey: 'cta', question: 'Що головне має зробити гість твого сайту?',
    options: Object.entries(CTAS).map(([id, v]) => p(id, v.name, { effect: v })),
    translations: {
      en: { question: 'What is the main action a visitor should take on your site?' },
      he: { question: 'מה הפעולה העיקרית שמבקר צריך לבצע באתר שלך?' },
    },
  },
  {
    levelSlug: 'services', order: 10, kind: 'boss', question: 'Скільки годин у добі?',
    explain: 'Доба триває двадцять чотири години.',
    options: [p('tf', 'Двадцять чотири', { correct: true, translations: { en: 'Twenty-four', he: 'עשרים וארבע' } }), p('twelve', 'Дванадцять', { translations: { en: 'Twelve', he: 'שתים עשרה' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשר' } }), p('sixty', 'Шістдесят', { translations: { en: 'Sixty', he: 'שישים' } })],
    translations: {
      en: { question: 'How many hours are in a day?', explain: 'A day runs twenty-four hours.' },
      he: { question: 'כמה שעות יש ביממה?', explain: 'היממה נמשכת עשרים וארבע שעות.' },
    },
  },
  {
    levelSlug: 'services', order: 11, kind: 'boss', question: 'Що робить лікар?',
    explain: 'Робота лікаря — лікувати людей.',
    options: [p('heal', 'Лікує людей', { correct: true, translations: { en: 'Heals people', he: 'מרפא אנשים' } }), p('bake', 'Пече торти', { translations: { en: 'Bakes cakes', he: 'אופה עוגות' } }), p('build', 'Будує будинки', { translations: { en: 'Builds houses', he: 'בונה בתים' } }), p('fly', 'Водить літак', { translations: { en: 'Flies planes', he: 'מטיס מטוסים' } })],
    translations: {
      en: { question: 'What does a doctor do?', explain: 'A doctor\'s work is to heal people.' },
      he: { question: 'מה עושה רופא?', explain: 'עבודתו של רופא היא לרפא אנשים.' },
    },
  },
  {
    levelSlug: 'services', order: 12, kind: 'boss', question: 'Скільки хвилин у одній годині?',
    explain: 'Година ділиться на шістдесят хвилин.',
    options: [p('sixty', 'Шістдесят', { correct: true, translations: { en: 'Sixty', he: 'שישים' } }), p('hundred', 'Сто', { translations: { en: 'One hundred', he: 'מאה' } }), p('thirty', 'Тридцять', { translations: { en: 'Thirty', he: 'שלושים' } }), p('tf', 'Двадцять чотири', { translations: { en: 'Twenty-four', he: 'עשרים וארבע' } })],
    translations: {
      en: { question: 'How many minutes are in one hour?', explain: 'An hour divides into sixty minutes.' },
      he: { question: 'כמה דקות יש בשעה אחת?', explain: 'השעה מתחלקת לשישים דקות.' },
    },
  },
  {
    levelSlug: 'services', order: 13, kind: 'boss', question: 'І останнє. Хто головний герой цієї гри?',
    explain: 'Wixsus. Жовтий, у формі X, нездоланний.',
    options: [p('vixik', 'Wixsus!', { correct: true, translations: { en: 'Wixsus!', he: 'Wixsus!' } }), p('boss', 'Моноліт, Сірий Шаблон', { translations: { en: 'Monolith, the Gray Template', he: 'מונולית, התבנית האפורה' } }), p('cursor', 'Курсор', { translations: { en: 'The Cursor', he: 'הסמן' } }), p('penguin', 'Пінгвін', { translations: { en: 'A Penguin', he: 'פינגווין' } })],
    translations: {
      en: { question: 'And finally. Who is the main hero of this game?', explain: 'Wixsus. Yellow, X-shaped, unbeaten.' },
      he: { question: 'ולבסוף. מי הגיבור הראשי של המשחק הזה?', explain: 'Wixsus. צהוב, בצורת X, בלתי מנוצח.' },
    },
  },

  {
    levelSlug: 'features', order: 1, kind: 'quiz', effectKey: 'wixApps', question: 'Обери суперсили свого сайту! Які сервіси підключимо?',
    options: [
      p('shop-set', '🛒 Магазин + Форми + Тарифи', { effect: { apps: ['stores', 'forms', 'pricing'] } }),
      p('booking-set', '📅 Записи + Учасники + Форми', { effect: { apps: ['bookings', 'members', 'forms'] } }),
      p('content-set', '📝 Блог + Учасники + Заходи', { effect: { apps: ['blog', 'members', 'events'] } }),
      p('resto-set', '🍽️ Ресторан + Заходи + Тарифи', { effect: { apps: ['restaurants', 'events', 'pricing'] } }),
    ],
    translations: {
      en: { question: 'Choose your site\'s superpowers! Which services to activate?' },
      he: { question: 'בחר את הכוחות העל של האתר שלך! אילו שירותים להפעיל?' },
    },
  },
  {
    levelSlug: 'features', order: 2, kind: 'logic', question: 'Скільки пальців на одній руці?',
    explain: 'На одній руці — пʼять пальців.',
    options: [p('five', 'Пʼять', { correct: true, translations: { en: 'Five', he: 'חמש' } }), p('four', 'Чотири', { translations: { en: 'Four', he: 'ארבע' } }), p('six', 'Шість', { translations: { en: 'Six', he: 'שש' } }), p('ten', 'Десять', { translations: { en: 'Ten', he: 'עשר' } })],
    translations: {
      en: { question: 'How many fingers are on one hand?', explain: 'One hand has five fingers.' },
      he: { question: 'כמה אצבעות יש ביד אחת?', explain: 'בכף יד אחת יש חמש אצבעות.' },
    },
  },
  {
    levelSlug: 'features', order: 3, kind: 'quiz', effectKey: 'channel', question: 'Як гості знайдуть твій новий сайт?',
    options: [
      p('seo', '🔍 Через пошуковики (SEO)', { effect: { channel: 'seo', name: 'SEO' } }),
      p('social', '📱 Через соціальні мережі', { effect: { channel: 'social', name: 'Соцмережі' } }),
      p('ads', '💸 Через платну рекламу', { effect: { channel: 'ads', name: 'Реклама' } }),
      p('word', '🗣️ Сарафанне радіо', { effect: { channel: 'word', name: 'Сарафан' } }),
    ],
    translations: {
      en: { question: 'How will visitors find your new site?' },
      he: { question: 'איך מבקרים ימצאו את האתר החדש שלך?' },
    },
  },
  {
    levelSlug: 'features', order: 10, kind: 'boss', question: 'Що потрібно, щоб виросла квітка?',
    explain: 'Щоб рости, квітці потрібні вода й сонячне світло.',
    options: [p('watersun', 'Вода і сонце', { correct: true, translations: { en: 'Water and sun', he: 'מים ושמש' } }), p('snowdark', 'Сніг і темрява', { translations: { en: 'Snow and darkness', he: 'שלג וחושך' } }), p('stones', 'Каміння', { translations: { en: 'Stones', he: 'אבנים' } }), p('music', 'Гучна музика', { translations: { en: 'Loud music', he: 'מוזיקה רועשת' } })],
    translations: {
      en: { question: 'What does a flower need to grow?', explain: 'To grow, a flower needs water and sunlight.' },
      he: { question: 'מה צריך כדי שפרח יגדל?', explain: 'כדי לגדול, פרח זקוק למים ולאור שמש.' },
    },
  },
  {
    levelSlug: 'features', order: 11, kind: 'boss', question: 'На якій планеті ми живемо?',
    explain: 'Наш дім — планета Земля.',
    options: [p('earth', 'Земля', { correct: true, translations: { en: 'Earth', he: 'כדור הארץ' } }), p('mars', 'Марс', { translations: { en: 'Mars', he: 'מאדים' } }), p('moon', 'Місяць', { translations: { en: 'The Moon', he: 'הירח' } }), p('sun', 'Сонце', { translations: { en: 'The Sun', he: 'השמש' } })],
    translations: {
      en: { question: 'Which planet do we live on?', explain: 'Our home is the planet Earth.' },
      he: { question: 'על איזה כוכב לכת אנחנו חיים?', explain: 'ביתנו הוא כדור הארץ.' },
    },
  },
  {
    levelSlug: 'features', order: 12, kind: 'boss', question: 'Скільки буде 2 + 2?',
    explain: '2 + 2 = 4. Це знає навіть Обсолекс.',
    options: [p('four', 'Чотири', { correct: true, translations: { en: 'Four', he: 'ארבע' } }), p('five', 'Пʼять', { translations: { en: 'Five', he: 'חמש' } }), p('three', 'Три', { translations: { en: 'Three', he: 'שלוש' } }), p('twentytwo', 'Двадцять два', { translations: { en: 'Twenty-two', he: 'עשרים ושתיים' } })],
    translations: {
      en: { question: 'What is 2 + 2?', explain: '2 + 2 = 4. Even Obsolex knows that.' },
      he: { question: 'כמה זה 2 + 2?', explain: '2 + 2 = 4. אפילו אובסולקס יודע את זה.' },
    },
  },
];
