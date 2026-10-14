const modules = import.meta.glob('../assets/tech/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const files: Record<string, string> = {};
for (const [path, src] of Object.entries(modules)) {
  const id = path.split('/').pop()?.replace('.svg', '');
  if (id) files[id] = src;
}

const aliases: Record<string, string> = {
  php: 'php',
  javascript: 'javascript',
  python: 'python',
  go: 'go',
  java: 'java',
  html: 'html5',
  html5: 'html5',
  css: 'css3',
  css3: 'css3',
  laravel: 'laravel',
  'vue.js': 'vuejs',
  vuejs: 'vuejs',
  'backbone.js': 'backbonejs',
  backbonejs: 'backbonejs',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  dynamodb: 'dynamodb',
  oracle: 'oracle',
  aws: 'aws',
  docker: 'docker',
  linux: 'linux',
  windows: 'windows',
  git: 'git',
  'git (bitbucket)': 'git',
  bitbucket: 'bitbucket',
  'vs code': 'vscode',
  vscode: 'vscode',
  slack: 'slack',
  trello: 'trello',
  eclipse: 'eclipse',
  photoshop: 'photoshop',
  excel: 'excel',
  pytest: 'pytest',
  jasmine: 'jasmine',
  karma: 'karma',
  typescript: 'typescript',
  react: 'react',
  github: 'github',
  ec2: 'ec2',
  ecs: 'ecs',
  lambda: 'lambda',
  s3: 's3',
  'secrets manager': 'secretsmanager',
  cloudwatch: 'cloudwatch',
  'api gateway': 'apigateway',
};

export type TechIconItem = { id: string; src: string };

function fileFor(name: string): string | undefined {
  const key = name.trim().toLowerCase();
  const id = aliases[key];
  return id ? files[id] : files[key];
}

export function resolveTechIcons(name: string, icons?: string[]): TechIconItem[] {
  const keys = icons ?? (name.includes(' / ') ? name.split(/\s*\/\s*/) : [name]);
  const seen = new Set<string>();
  const items: TechIconItem[] = [];
  for (const key of keys) {
    const src = fileFor(key);
    if (!src || seen.has(src)) continue;
    seen.add(src);
    items.push({ id: key, src });
  }
  return items;
}
