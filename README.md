# aboutme

RPGのUIを取り入れた、システムエンジニアのポートフォリオサイトです。

「一見すると洗練されたポートフォリオ。触っていくと遊び心が見つかる」をコンセプトに、
プロフィール・スキル・経歴・連絡先を、ステータス画面や冒険の記録のような見せ方でまとめています。

## 技術スタック

- Vite + React 18 + TypeScript
- CSS（CSS変数によるデザイントークン、UIライブラリ不使用）
- フォント: DotGothic16（見出し・ラベル）/ Noto Sans JP（本文）

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 型チェック + 本番ビルド（dist/）
npm run preview  # ビルド結果の確認
```

## コンテンツの編集

表示する文章・スキル・性格（MBTI）・経歴はすべて `src/data/profile.ts` にあります。
現在の内容はサンプルなので、ご自身の情報に書き換えてください。

- MBTIは `status.mbti` / `status.mbtiNote` で編集できます
- 宝箱（隠し要素）の中身も `treasures` で編集できます

## 構成

```
src/
  data/          コンテンツ（profile.ts）とナビゲーション定義
  styles/        デザイントークン（tokens.css）と共通スタイル（base.css）
  hooks/         スクロール連動・タイプライター・表示アニメーションなど
  context/       通知（トースト）と宝箱の状態管理
  components/
    layout/      Header（ナビ + EXPバー）/ Footer
    sections/    Hero / Profile / Skills / Career / Contact
    ui/          Window（RPG風フレーム）/ PixelSprite（SVGドット絵）など
```

## デザインとアクセシビリティの方針

- ゲーム感は見出しの英字ラベルやウィンドウ枠、ドット絵にとどめ、情報はふつうのWebの言葉で表記
- ナビゲーションは「プロフィール / スキル / 経歴 / お問い合わせ」の一般的な名称
- ドット絵・アイコンはすべてオリジナル。効果音・BGMは使用していません
- スキップリンク、キーボード操作、`<dialog>` によるモーダル、`aria-live` による通知
- `prefers-reduced-motion` 設定時はアニメーションとタイプライター演出を無効化
