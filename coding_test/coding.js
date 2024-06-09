//inputは以下の形式で与えられます。
//n
//50 30
//100 100
//0 100

//このアルゴリズムは、生徒の中間試験と期末試験の点数を受け取り、以下の条件に従って合否判定を行います。

function main(lines) {
  // 1行目は生徒の人数
  const n = parseInt(lines[0]);

  // 結果を格納する配列
  const results = [];

  for (let i = 1; i <= n; i++) {
    // 各生徒の中間試験と期末試験の点数を取得
    const [midterm, final] = lines[i].split(' ').map(Number);

    if (final <= 60 && (midterm + final) <= 100) {
      results.push('Fail');
    } else if (final <= 60 || (midterm + final) <= 100) {
      results.push('Reexamination');
    } else {
      results.push('Pass');
    }
  }

  // 結果の出力
  results.forEach(result => console.log(result));
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