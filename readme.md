# mastodon-elona-aliasbot
有名になると、名前とは別の通り名で呼ばれることがあるらしい。

# Usage
node v10.7.0

Clone or download

> npm i

Mastodonの設定>開発から新規アプリを作成してAccess Tokenを作成  
ex. https://mastodon.social/settings/applications

/src内に以下の内容を記述したconf.tsを配置
```
export const ACCESS_TOKEN = '***';
```

トランスパイル&起動
> npx tsc

> npm start

# Alias Generator
```
import { ElonaNickName } from './aliasgen';

const n = new ElonaNickName();
// 原作準拠
console.log(n.reroll());
```

```
[ '融合のミート',
  'つまらなくないヒットマン',
  '陽光のフィッシュ',
  '兄のボイス',
  '巨人殺しのメテオ',
  '月のアルケミスト',
  'ドリーム偽善者',
  '堕ちしセイビア',
  'ペイシェントモーニング',
  '汚らわしきエネミー',
  '白に染まったダイヤモンド',
  '謀反のプロフェシー',
  '金に染まるキャット',
  '夕昏のエスケープ',
  'セージ・オブ・ホィール',
  'ロード未来' ]
```