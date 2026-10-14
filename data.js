// ここを書き換えるとサイトの内容が更新されます
const SITE_DATA = {
  profile: {
    name: "chihiro",
    job: "System Engineer",
    location: "Japan",
    likes: ["コーヒー", "ドット絵", "散歩"],
    comment: "TODO: もっと面白い作品を作る",
  },

  // level: 0〜100
  skills: [
    {
      category: "language",
      items: [
        { name: "Java", level: 80 },
        { name: "SQL", level: 75 },
        { name: "JavaScript", level: 60 },
        { name: "Python", level: 40 },
      ],
    },
    {
      category: "infra / tools",
      items: [
        { name: "Linux", level: 65 },
        { name: "AWS", level: 50 },
        { name: "Git", level: 70 },
      ],
    },
  ],

  // 新しい順
  career: [
    {
      date: "2022.04 - now",
      title: "株式会社サンプル",
      role: "システムエンジニア",
      desc: "業務システムの設計・開発・運用を担当。",
    },
    {
      date: "2019.04 - 2022.03",
      title: "株式会社ダミー",
      role: "プログラマ",
      desc: "Webアプリケーションの開発に従事。",
    },
  ],
};
