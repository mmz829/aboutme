// ここを書き換えるとサイトの内容が更新されます
const SITE_DATA = {
  profile: {
    name: "chihiro",
    job: "System Engineer",
    location: "Ehime🍊",
    likes: ["ライブ", "Notion", "ゲーム", "ドライブ"],
    myboom: "iOS・Webアプリ開発、動画編集",
    song: {
      artist: "Cafuné",
      title: "Tek It",
      src: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ac/25/c6/ac25c644-057b-1421-ff7c-bdd4a0114459/mzaf_9368654034340652874.plus.aac.p.m4a",
      start: 26,
    },
    "next goal": "自作アプリを5個作ること。技術領域を横断してシステム全体を担えるフルスタックエンジニアになること。",
    comment: "TODO: AWS-SAA取得（勉強中）",
  },

  // level: 0〜100
  skills: [
    {
      category: "language",
      items: [
        { name: "Python", level: 75 },
        { name: "PHP", level: 70 },
        { name: "JavaScript", level: 60 },
        { name: "Go", level: 45 },
        { name: "Java", level: 40 },
      ],
    },
    {
      category: "framework / test",
      items: [
        { name: "Laravel", level: 60 },
        { name: "Vue.js", level: 45 },
        { name: "pytest", level: 70 },
        { name: "PHPUnit", level: 55 },
      ],
    },
    {
      category: "database",
      items: [
        { name: "MySQL", level: 70 },
        { name: "PostgreSQL", level: 50 },
        { name: "DynamoDB", level: 45 },
        { name: "Oracle", level: 35 },
      ],
    },
    {
      category: "infra / tools",
      items: [
        { name: "Linux", level: 65 },
        { name: "AWS", level: 55 },
        { name: "Docker", level: 65 },
        { name: "Git", level: 75 },
      ],
    },
    {
      category: "ai",
      items: [
        { name: "Cursor", level: 70 },
        { name: "GitHub Copilot", level: 70 },
        { name: "Gemini", level: 60 },
        { name: "NotebookLM", level: 55 },
      ],
    },
  ],

  // 新しい順
  career: [
    {
      date: "2024.04 - 2026.02",
      title: "広告業界向けWebアプリ",
      details: {
        使用技術など: "Python, Go, MySQL, SQLite, PostgreSQL, DynamoDB, AWS, Docker, Git, VS Code, Slack, Cursor, Gemini, NotebookLM, GitHub Copilot",
        担当業務: "設計, 実装, テスト, リリース, 保守運用",
      },
    },
    {
      date: "2022.04 - 2024.03",
      title: "建設業界向けWebアプリ",
      details: {
        使用技術など: "PHP, JavaScript, Laravel, Vue.js, MySQL, Docker, Git(Bitbucket), VS Code, Trello, Slack",
        担当業務: "設計書修正, 実装, 単体テスト(PHPUnit), 保守運用",
      },
    },
    {
      date: "2020.05 - 2022.03",
      title: "顧客管理系Webアプリ",
      details: {
        使用技術など: "PHP, HTML, CSS, Linux",
        担当業務: "仕様検討, 設計, 実装, 単体テスト, 結合テスト",
      },
    },
    {
      date: "2017.10 - 2018.12",
      title: "ビル設備管理システム",
      details: {
        使用技術など: "JavaScript, Backbone.js, Jasmine, Karma, Eclipse",
        担当業務: "設計書修正, 実装, 自動テスト",
      },
    },
    {
      date: "2016.10 - 2017.09",
      title: "生命保険基幹システム",
      details: {
        使用技術など: "Java, Oracle, Eclipse",
        担当業務: "設計書修正, 実装, 単体テスト仕様書作成",
      },
    },
    {
      date: "2016.04 - 2016.09",
      title: "銀行勘定系システム",
      details: {
        使用技術など: "Excel",
        担当業務: "現行システム調査, 基本設計書の確認・修正",
      },
    },
  ],
};
