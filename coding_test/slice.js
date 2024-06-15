//#.で囲まれた3x3のマスが何個あるかを数える

reader.on('close', () => {
  const [H, W] = lines[0].split(' ').map(Number)
  const grid = lines.slice(1, H + 1)
  
  let count = 0
  
  for (let i = 0; i <= H - 3; i++) {
      for (let j = 0; j <= W - 3; j++) {
          if (grid[i][j] ==='#' && grid[i][j+1] === '#' && grid[i][j+2] === '#' &&
          grid[i+1][j] === '#' && grid[i+1][j+1] === '.' && grid [i+1][j+2] === '#' &&
          grid[i+2][j] === '#' && grid[i+2][j+1] === '#' && grid[i+2][j+2] === '#') {
              count++
          }
      }
  }
  console.log(count)
});


// トランプのシャッフルをK回行った後のデッキを出力する
function main(lines) {
  const [N, M, K] = lines[0].split(' ').map(Number);
  
  // 初期状態のデッキ
  let deck = Array.from({ length: N }, (_, i) => i + 1);
  
  // シャッフル関数
  const shuffle = (deck) => {
    let result = [];
    let sets = [];
    
    // M枚ごとのセットに分ける
    for (let i = 0; i < deck.length; i += M) {
      sets.push(deck.slice(i, i + M));
    }
    
    // 下から i 番目のセットに並び替える（逆順にしている）
    for (let i = sets.length - 1; i >= 0; i--) {
      result = result.concat(sets[i]);
    }
    
    return result;
  }
  
  // K回シャッフルする
  for (let i = 0; i < K; i++) {
    deck = shuffle(deck);
  }
  
  // 結果を出力
  deck.forEach(card => console.log(card));
}

// 標準入力から読み取る部分
process.stdin.resume();
process.stdin.setEncoding('utf8');
var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  main(lines);
});


//交通可能の道を探す
//入力フォーマット
//N M
// p_{1,1} p_{1,2} ... p_{1,N} 
// p_{2,1} p_{2,2} ... p_{2,N}
// ...
// p_{N,1} p_{N,2} ... p_{N,N}
reader.on('close', () => {
  // 最初の行にNとMが与えられる
  const [N, M] = lines[0].split(' ').map(Number);

  // 地図情報を2次元配列として取得
  const map = [];
  for (let i = 1; i <= N; i++) {
    map.push(lines[i].split(' ').map(Number));
  }

  const validRoutes = [];

  // 各列について通行可能かチェック
  for (let col = 0; col < N; col++) {
    let canPass = true;
    for (let row = 0; row < N; row++) {
      if (map[row][col] >= M) {
        canPass = false;
        break;
      }
    }
    if (canPass) {
      validRoutes.push(col + 1); // 1-indexed
    }
  }

  if (validRoutes.length > 0) {
    console.log(validRoutes.join(' '));
  } else {
    console.log('wait');
  }
});
