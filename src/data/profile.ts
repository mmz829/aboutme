/**
 * サイトに表示するコンテンツはすべてこのファイルで管理しています。
 * 内容はサンプルです。ご自身の情報に書き換えてください。
 */

export type SocialLink = { label: string; href: string; handle: string };

export const profile = {
  name: 'Chihiro',
  role: 'Systems Engineer',
  roleJa: 'システムエンジニア',
  level: 5,
  levelNote: '実務経験 5年',
  location: '愛媛（フルリモート可）',
  email: 'hello@chihiro.dev',
  greeting: ['はじめまして！ Chihiro です。', 'わたしの これまでの冒険、よかったら のぞいていってください！'],
  choices: [
    { href: '#profile', label: 'どんな人か知りたい' },
    { href: '#skills', label: 'スキルを見たい' },
    { href: '#career', label: '経歴を見たい' },
    { href: '#contact', label: '連絡したい' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/', handle: '@chihiro' },
    { label: 'X', href: 'https://x.com/', handle: '@chihiro_dev' },
    { label: 'Zenn', href: 'https://zenn.dev/', handle: 'chihiro' },
  ] satisfies SocialLink[],
};

export const status = {
  className: 'UIクラフター',
  classNote: 'デザイン × 実装の両手使い',
  mbti: 'INFP',
  mbtiNote: 'じっくり考える理想家タイプ',
  element: 'Webシステムの設計・開発',
  equipment: ['Figma', 'VS Code', 'React', 'TypeScript'],
  params: [
    { label: '設計力', value: 88, note: '情報設計・画面遷移の整理' },
    { label: '実装力', value: 82, note: 'React / TypeScript / CSS' },
    { label: 'デザイン力', value: 85, note: 'UI・ビジュアル・タイポグラフィ' },
    { label: '伝える力', value: 78, note: '仕様の言語化・合意形成' },
    { label: '好奇心', value: 95, note: '新しい技術を触るのが好き' },
  ],
  about: [
    'グラフィックデザインからキャリアをスタートし、「つくったデザインが、実際にどう動くのか」まで責任を持ちたくなってフロントエンドの世界へ。現在はデザインと実装のあいだに立ち、チームの共通言語をつくる役割を担うことが多いです。',
    '子どもの頃に遊んだRPGの「説明書を読まなくても遊べるUI」にずっと憧れていて、このサイトもその気持ちから生まれました。',
  ],
  values: [
    { title: '迷わせない', body: '初めての人でも、次に何をすればいいか分かる画面をつくる。' },
    { title: '細部まで気持ちよく', body: 'ホバー、余白、動きの速度。小さな違和感を放置しない。' },
    { title: 'チームで強くなる', body: 'デザインシステムやドキュメントで、仲間が動きやすい土台を整える。' },
  ],
};

export type Skill = { name: string; level: 1 | 2 | 3 | 4 | 5; note: string };
export type SkillCategory = { id: string; title: string; en: string; skills: Skill[] };

export const skillLegend = [
  { level: 1, label: '触ったことがある' },
  { level: 3, label: '実務で自走できる' },
  { level: 5, label: '設計から担える・人に教えられる' },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'design',
    title: 'デザイン',
    en: 'Design',
    skills: [
      { name: 'UI / UXデザイン', level: 5, note: '要件整理からプロトタイプまで' },
      { name: 'Figma', level: 5, note: 'Variables・Auto Layoutでの設計' },
      { name: 'デザインシステム', level: 4, note: 'トークン設計・運用ルール作り' },
      { name: 'グラフィック / バナー', level: 4, note: 'Photoshop・Illustrator' },
      { name: 'ユーザビリティテスト', level: 3, note: '5人テストの設計と分析' },
    ],
  },
  {
    id: 'frontend',
    title: 'フロントエンド',
    en: 'Frontend',
    skills: [
      { name: 'HTML / CSS', level: 5, note: 'セマンティック・レスポンシブ' },
      { name: 'TypeScript', level: 4, note: '型で仕様を表現する' },
      { name: 'React / Next.js', level: 4, note: 'App Router・SSG / SSR' },
      { name: 'アクセシビリティ', level: 4, note: 'WCAG 2.2 AA を基準に実装' },
      { name: 'アニメーション', level: 3, note: 'CSS / Framer Motion / GSAP' },
    ],
  },
  {
    id: 'workflow',
    title: 'ワークフロー',
    en: 'Workflow',
    skills: [
      { name: 'Git / GitHub', level: 4, note: 'PRレビュー・ブランチ運用' },
      { name: 'Storybook', level: 4, note: 'コンポーネントのカタログ化' },
      { name: 'テスト', level: 3, note: 'Vitest・Testing Library・Playwright' },
      { name: 'CMS連携', level: 3, note: 'microCMS・WordPress' },
      { name: 'ディレクション', level: 3, note: '小規模チームの進行管理' },
    ],
  },
];

export const learning = ['WebGL / Three.js', 'Rust（WebAssembly）', 'モーションデザイン'];

export type Chapter = {
  period: string;
  chapter: string;
  title: string;
  org: string;
  body: string;
  items: string[];
};

export const journey: Chapter[] = [
  {
    period: '2025 — 現在',
    chapter: 'Chapter 4',
    title: 'フリーランスとして独立',
    org: 'Freelance',
    body: 'スタートアップを中心に、UIデザインからフロントエンド実装までを一気通貫で支援しています。',
    items: ['予約サービスのUX改善', 'デザインシステム導入支援'],
  },
  {
    period: '2022 — 2025',
    chapter: 'Chapter 3',
    title: 'フロントエンドエンジニアへ転身',
    org: '株式会社サンプルテック',
    body: 'BtoB SaaS の管理画面開発を担当。後半はフロントエンドリードとしてチームの設計方針づくりを担いました。',
    items: ['React / TypeScript による大規模リプレイス', 'Storybook・デザイントークンの導入'],
  },
  {
    period: '2020 — 2022',
    chapter: 'Chapter 2',
    title: 'Webデザイナーとして修行',
    org: '株式会社サンプルデザイン',
    body: 'コーポレートサイトやLPのデザイン・コーディングを担当。「作ったものが動く楽しさ」に目覚めた時期です。',
    items: ['年間20件以上のサイト制作', 'HTML/CSS/JSでの実装まで担当'],
  },
  {
    period: '— 2020',
    chapter: 'Chapter 1',
    title: '旅立ち',
    org: 'デザイン専門学校',
    body: 'グラフィックデザインを専攻。卒業制作で作ったWebサイトが、この道に進むきっかけになりました。',
    items: ['グラフィックデザイン専攻', '学内コンペ 最優秀賞'],
  },
];

export type Treasure = { id: string; item: string; message: string };

export const treasures: Treasure[] = [
  {
    id: 'status',
    item: '付箋の束',
    message: '情報設計は、いつも付箋を並べるところから始めます。',
  },
  {
    id: 'skills',
    item: '深煎りのコーヒー豆',
    message: '集中したいときの相棒。1日3杯までと決めています。',
  },
  {
    id: 'journey',
    item: '手描きのマップ',
    message: '休日は知らない街を散歩して、看板のデザインを眺めています。',
  },
];
