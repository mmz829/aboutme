/**
 * サイトに表示するコンテンツはすべてこのファイルで管理しています。
 * 内容はサンプルです。ご自身の情報に書き換えてください。
 */

export type SocialLink = { label: string; href: string; handle: string };

export const profile = {
  name: 'chihiro',
  role: 'Systems Engineer',
  roleJa: 'システムエンジニア',
  level: 5,
  levelNote: '実務経験 5年',
  location: 'えひめ（フルリモート可）',
  email: 'hello@chihiro.dev',
  greeting: ['はじめまして、 chihiro です。', 'わたしの これまでの冒険、よかったら のぞいていってください！'],
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
  element: 'Webシステム開発・運用保守',
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

export type Skill = { name: string; level: 1 | 2 | 3 | 4 | 5 };
export type SkillCategory = { id: string; title: string; en: string; skills: Skill[] };

export const skillLegend = [
  { level: 1, label: '触ったことがある' },
  { level: 3, label: '実務で自走できる' },
  { level: 5, label: '設計から担える・人に教えられる' },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'バックエンド',
    en: 'Backend',
    skills: [
      { name: 'PHP', level: 4 },
      { name: 'Laravel', level: 4 },
      { name: 'Python', level: 4 },
      { name: 'Go', level: 3 },
      { name: 'Java', level: 2 },
    ],
  },
  {
    id: 'frontend',
    title: 'フロントエンド',
    en: 'Frontend',
    skills: [
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'Vue.js', level: 4 },
      { name: 'Backbone.js', level: 2 },
    ],
  },
  {
    id: 'infra',
    title: 'クラウド・インフラ',
    en: 'Infra',
    skills: [
      { name: 'AWS', level: 3 },
      { name: 'Linux', level: 4 },
      { name: 'Docker', level: 3 },
    ],
  },
  {
    id: 'database',
    title: 'データベース',
    en: 'Database',
    skills: [
      { name: 'MySQL', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'DynamoDB', level: 2 },
    ],
  },
  {
    id: 'tools',
    title: '開発ツール・その他',
    en: 'Tools',
    skills: [{ name: 'Git', level: 4 }],
  },
];

export const learning = ['TypeScript', 'React'];

export type StackRow = { label: string; value: string };

export type Quest = {
  period: string;
  duration?: string;
  title: string;
  industry?: string;
  stack?: StackRow[];
  body: string;
  items: string[];
};

export type Chapter = {
  period: string;
  chapter: string;
  title: string;
  org?: string;
  industry?: string;
  stack?: StackRow[];
  body?: string;
  items?: string[];
  quests?: Quest[];
  current?: boolean;
};

export const journey: Chapter[] = [
  {
    period: '2022.04 — 2026.02',
    chapter: 'Chapter 4',
    title: 'Webアプリケーション開発・保守',
    body: '施工管理アプリの改修・保守から、広告効果測定システムの機能追加・運用まで。設計、実装、テスト、リリース、障害対応を担当しました。',
    quests: [
      {
        period: '2022.04 — 2024.03',
        duration: '2年',
        title: 'Webアプリケーション開発',
        industry: '建築',
        stack: [
          { label: '言語', value: 'PHP, JavaScript' },
          { label: 'FW', value: 'Laravel, Vue.js' },
          { label: 'DB', value: 'MySQL' },
          { label: 'その他', value: 'Docker, VS Code, Git (Bitbucket), Trello, Slack' },
        ],
        body: '施工現場の作業者向けに、工程ごとの確認結果を記録し、施工状況を管理するWebアプリケーションの改修・保守を担当。',
        items: [
          '既存機能改修に伴う設計書修正、実装、テスト',
          'PHPUnitを用いた単体テストコードの作成・実行',
          '障害発生時の原因調査、不具合修正、動作確認',
        ],
      },
      {
        period: '2024.04 — 2026.02',
        duration: '1年11ヶ月',
        title: 'システム開発',
        industry: '広告',
        stack: [
          { label: '言語', value: 'Python, Go' },
          { label: 'DB', value: 'MySQL, SQLite, PostgreSQL, DynamoDB' },
          { label: 'インフラ', value: 'AWS (EC2, ECS, Lambda, S3, Secrets Manager, CloudWatch, API Gateway, WorkSpaces, CodeCommit)' },
          { label: 'OS', value: 'Linux, Windows' },
          { label: 'その他', value: 'Docker, Git, VS Code, Cursor, Instagantt, Slack' },
        ],
        body: '広告効果を計測するシステム、および計測結果を確認するWebアプリケーションの新機能追加と既存機能の改修・保守運用を担当。設計から実装、テスト、リリース、障害対応まで対応。',
        items: [
          '新機能追加における設計書の作成、実装',
          '既存機能改修に伴う設計書修正、追加実装',
          'pytestを用いた単体テスト(UT)コードの実装・実行',
          '手動テスト(IT・ST)のテスト仕様書作成・実施',
          '障害発生時のログ解析・原因調査、不具合修正',
          'GitHub Copilotを活用した開発経験',
        ],
      },
    ],
  },
  {
    period: '2020.05 — 2022.03',
    chapter: 'Chapter 3',
    title: 'Webアプリケーション新規開発',
    stack: [
      { label: '言語', value: 'PHP, HTML, CSS' },
      { label: 'OS', value: 'Linux' },
    ],
    body: '顧客情報を一元化するWebアプリケーションの新規立ち上げに従事。設計から実装、テストまでを担当。',
    items: [
      '顧客要望に基づいた仕様の検討・設計',
      'バックエンド処理およびフロントエンドとの連携機能実装',
      '単体〜結合テスト（手動テスト等）の実施および動作確認',
    ],
  },
  {
    period: '2019.01 — 2020.04',
    chapter: 'Chapter 2',
    title: 'ECサイト運営',
    industry: '繊維',
    org: '服地・布地などの毛織物の販売およびECサイト運営',
    body: '楽天・Yahooショッピングでの商品ページ制作から、撮影・加工、受注、梱包まで、EC運営の現場を担当。',
    items: [
      '楽天、Yahooショッピングの商品ページ制作',
      'Photoshopを使用した商品画像加工',
      '商品の写真撮影',
      '受注処理',
      '商品の裁断、梱包作業',
    ],
  },
  {
    period: '2016.04 — 2018.12',
    chapter: 'Chapter 1',
    title: '基幹・業務システム開発',
    body: '勘定系の現行調査から、生命保険の基幹改修、空調管理システムの機能追加まで。設計書の修正、実装、テストを中心に従事。',
    quests: [
      {
        period: '2016.04 — 2016.09',
        duration: '6ヶ月',
        title: '現行システム調査',
        industry: '金融',
        stack: [{ label: 'その他', value: 'Excel' }],
        body: '既存の勘定系システムを新システムへ更改するプロジェクトにおいて、現行システム調査を担当。',
        items: [
          '帳票をもとに、出力項目の入力元や処理内容を調査',
          '調査結果をもとに基本設計書や関連資料を確認・修正',
        ],
      },
      {
        period: '2016.10 — 2017.09',
        duration: '1年',
        title: '基幹システム開発',
        industry: '金融',
        stack: [
          { label: '言語', value: 'Java' },
          { label: 'DB', value: 'Oracle' },
          { label: 'その他', value: 'Eclipse' },
        ],
        body: '生命保険の新プラン追加に伴う基幹システム改修プロジェクトに従事。',
        items: [
          '新プラン追加に伴う設計書の修正',
          '既存機能の改修',
          '単体テスト仕様書の作成',
        ],
      },
      {
        period: '2017.10 — 2018.12',
        duration: '1年3ヶ月',
        title: 'システム開発',
        industry: '設備',
        stack: [
          { label: '言語', value: 'JavaScript' },
          { label: 'FW', value: 'Backbone.js' },
          { label: 'テスト', value: 'Jasmine, Karma' },
          { label: 'その他', value: 'Eclipse' },
        ],
        body: 'ビルの空調管理システムにおける機能追加・改修プロジェクトに従事。',
        items: [
          '機能追加に伴う設計書の修正',
          '既存機能の改修',
          '自動テストコードの実装、実行',
          'テスト結果の確認、修正',
        ],
      },
    ],
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
