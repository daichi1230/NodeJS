function main(lines) {
  const input = lines[0].trim()
  const parts = input.split(' ')
  //正規表現でa:sの形式をチェック
  const pairPattern = /^\d+:[^:]+$/
  let pairs =[]
  let n
  let seen = new Set()

  //入力が正常かどうかチェック
  if (parts.length < 2 || parts.length > 6) {
    console.log("invalid input")
    return
  }

  for (let i=0; i < parts.length; i++) {
    if (i === parts.length -1) {
      //最後の部分は自然数ｎ
      if(!/^\d+$/.test(parts[i]) || /^0\d+/.test(parts[i])) {
        console.log("invalid input")
        return
      }
      n = parseInt(parts[i], 10)
      if (n > 10000000 || n === 'undefined') {
        console.log("invalid input")
        return
      }
    } else {
      //数字と文字列のペア
      if (!pairPattern.test(parts[i])){
        console.log("invalid input")
        return
      }
      const [a, s] = parts[i].split(':')
      const aInt = parseInt(a, 10)
      if (aInt === 0 || aInt > 100 || s.length> 50 || seen.has(aInt) || /^0\d+/.test(a)) {
        console.log("invalid input")
        return
      }
      seen.add(aInt)
      pairs.push([aInt, s])
    }
  }

  //ペアが存在しない時
  if (pairs.length === 0) {
    console.log("invalid input")
    return
  }

  //割り切れる最大のaを見つける
  let result = n
  let maxA = -1
  pairs.forEach(([a,s])=> {
    if (n % a === 0 && a > maxA) {
      maxA = a
      result = s
    }
  })
  
  console.log(result)
}

function runWithStdin() {
  let input = "";
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", v => {
    input += v;
  });
  process.stdin.on("end", () => {
    main(input.split("\n"));
  });
}
runWithStdin();