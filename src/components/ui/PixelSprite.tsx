import { useMemo } from 'react';

type Props = {
  rows: readonly string[];
  palette: Record<string, string>;
  className?: string;
  title?: string;
};

/** 文字列のグリッドから、横方向にまとめた矩形でSVGドット絵を描画する */
export function PixelSprite({ rows, palette, className, title }: Props) {
  const width = Math.max(...rows.map((r) => r.length));
  const height = rows.length;

  const rects = useMemo(() => {
    const out: { x: number; y: number; w: number; fill: string }[] = [];
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const key = row[x];
        const fill = palette[key];
        if (!fill) {
          x++;
          continue;
        }
        let run = 1;
        while (row[x + run] === key) run++;
        out.push({ x, y, w: run, fill });
        x += run;
      }
    });
    return out;
  }, [rows, palette]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
