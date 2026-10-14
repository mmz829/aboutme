import { journey, type Chapter, type Quest, type StackRow } from '../../data/profile';
import { resolveTechIcons } from '../../data/techIcons';
import { useReveal } from '../../hooks/useReveal';
import { SectionHeading } from '../ui/SectionHeading';
import { TechLabel } from '../ui/TechIcon';
import { TreasureChest } from '../ui/TreasureChest';
import './Career.css';

type ChipGroup = { group?: string; items: string[] };

function parseStackValue(value: string): ChipGroup {
  const grouped = value.match(/^([^(),]+)\s*\((.+)\)$/);
  if (grouped) {
    return { group: grouped[1].trim(), items: grouped[2].split(/,\s*/) };
  }
  return { items: value.split(/,\s*/) };
}

function stackKind(label: string): string {
  switch (label) {
    case '言語':
      return 'lang';
    case 'FW':
      return 'fw';
    case 'DB':
      return 'db';
    case 'インフラ':
      return 'infra';
    case 'OS':
      return 'os';
    case 'その他':
      return 'env';
    case 'テスト':
      return 'test';
    default:
      return 'other';
  }
}

function ChipList({ items, kind }: { items: string[]; kind: string }) {
  return (
    <ul className={`quest__chips quest__stack-row--${kind}`}>
      {items.map((chip) => (
        <li key={chip} className={resolveTechIcons(chip).length ? 'has-icon' : undefined}>
          <TechLabel name={chip} />
        </li>
      ))}
    </ul>
  );
}

function StackChips({ rows }: { rows: StackRow[] }) {
  const parsedRows = rows.map((row) => ({
    row,
    parsed: parseStackValue(row.value),
    kind: stackKind(row.label),
  }));
  const singles = parsedRows.filter((item) => !item.parsed.group);
  const groups = parsedRows.filter((item) => item.parsed.group);

  return (
    <dd className="quest__stack-tech">
      {singles.map(({ row, parsed, kind }) => (
        <ChipList key={row.label} items={parsed.items} kind={kind} />
      ))}
      {groups.map(({ row, parsed, kind }) => (
        <div key={row.label} className={`quest__cloud quest__stack-row--${kind}`}>
          <ChipList items={[parsed.group ?? '']} kind={kind} />
          <p className="quest__services">{parsed.items.join(' / ')}</p>
        </div>
      ))}
    </dd>
  );
}

function StackBoard({ rows }: { rows: StackRow[] }) {
  const tech = rows.filter((row) => row.label !== 'その他');
  const extras = rows.filter((row) => row.label === 'その他');

  return (
    <dl className="quest__stack">
      {tech.length > 0 && (
        <div className="quest__stack-row">
          <dt>使用技術など</dt>
          <StackChips rows={tech} />
        </div>
      )}
      {extras.length > 0 && (
        <div className="quest__stack-row">
          <dt>その他</dt>
          <StackChips rows={extras} />
        </div>
      )}
    </dl>
  );
}

function DutyList({ items }: { items: string[] }) {
  return (
    <div className="quest__duties">
      <p className="quest__duty-label">担当</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  title,
  heading = 'h4',
  period,
  duration,
  industry,
  org,
  stack,
  body,
  items,
}: {
  title: string;
  heading?: 'h3' | 'h4';
  period?: string;
  duration?: string;
  industry?: string;
  org?: string;
  stack?: StackRow[];
  body?: string;
  items?: string[];
}) {
  const Heading = heading;
  return (
    <article className="quest">
      <header className="quest__head">
        <div className="quest__identity">
          {industry && <p className="quest__industry">{industry}</p>}
          <Heading className="quest__title">{title}</Heading>
        </div>
        {period && (
          <p className="quest__period">
            {period}
            {duration && <span> · {duration}</span>}
          </p>
        )}
      </header>
      {org && <p className="quest__org">{org}</p>}
      {stack && <StackBoard rows={stack} />}
      {body && <p className="quest__text">{body}</p>}
      {items && <DutyList items={items} />}
    </article>
  );
}

function QuestBlock({ quest }: { quest: Quest }) {
  return (
    <ProjectCard
      title={quest.title}
      period={quest.period}
      duration={quest.duration}
      industry={quest.industry}
      stack={quest.stack}
      body={quest.body}
      items={quest.items}
    />
  );
}

function ChapterItem({ chapter }: { chapter: Chapter }) {
  const reveal = useReveal<HTMLLIElement>();
  return (
    <li ref={reveal.ref} className={`chapter ${chapter.current ? 'is-current' : ''} ${reveal.className}`}>
      <p className="chapter__period">{chapter.period}</p>
      <span className="chapter__node" aria-hidden="true" />
      <div className="chapter__body">
        <p className="chapter__label">
          {chapter.chapter}
          {chapter.current && <span className="chapter__now">NOW PLAYING</span>}
        </p>
        {chapter.quests ? (
          <>
            <h3 className="chapter__title">{chapter.title}</h3>
            {chapter.body && <p className="chapter__lead">{chapter.body}</p>}
            <div className="chapter__quests">
              {chapter.quests.map((quest) => (
                <QuestBlock key={quest.period} quest={quest} />
              ))}
            </div>
          </>
        ) : (
          <ProjectCard
            heading="h3"
            title={chapter.title}
            industry={chapter.industry}
            org={chapter.org}
            stack={chapter.stack}
            body={chapter.body}
            items={chapter.items}
          />
        )}
      </div>
    </li>
  );
}

export function Career() {
  return (
    <section id="career" className="section career" aria-labelledby="career-title">
      <div className="container">
        <SectionHeading index="03" eyebrow="JOURNEY" title="経歴" id="career-title">
          設計・実装・テスト・運用まで。担当してきたプロジェクトを新しい順に並べています。
        </SectionHeading>

        <ol className="timeline">
          {journey.map((c) => (
            <ChapterItem key={c.chapter} chapter={c} />
          ))}
        </ol>
        <div className="timeline__end">
          <TreasureChest id="journey" />
        </div>
      </div>
    </section>
  );
}
