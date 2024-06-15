function main(lines) { 
  const input = lines[0].trim().split(' ').map(Number)

  //入力の検証
  const n = input[0] //カード枚数
  const m = input [1] //プレイヤーのMP

  if(n < 1 || n > 100 || m < 1 ||m > 10000 || input.length !== 2 + 2 * n) {
    console.log("invalid input")
    return
  }

  const cards = []
  for (let i = 0; i < n; i++) {
    const attack = input[2 + 2 * i]
    const cost = input[2 + 2 * i + 1]
    if (attack < 1 || attack > 1000 || cost < 1 || cost > 10000) {
      console.log("invalid input")
      return
    }
    cards.push({ attack, cost})
  }

  //Dp配列の初期化
  const dp = Array(m + 1).fill(0)

  //カードごとにDP配列を更新
  for (let i = 0; i < n; i++) {
    const { attack, cost } = cards[i]
    //MPが多いほうから少ないほうへループ
    for (let j = m; j >= cost; j--) {
      dp[j] = Math.max(dp[j], dp[j - cost] + attack)
    }
  }
  
  //最終的な攻撃力の合計の最大値を見つける
  // let maxAttack = 0
  // for (let j = 0; j <= m; j++) {
  //   if (dp[j] > maxAttack) {
  //     maxAttack = dp[j]
  //   }
  // }

  console.log(dp[m])
}