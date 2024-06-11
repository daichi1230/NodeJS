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


//以下はインプットの形式が異なる場合のコード

//main.js
const getSchoolCredit = require('./app.js');

(async () => {
  const [n, scores] = await readInputs();
  const result = getSchoolCredit(n, scores);
  print_result(result);
})();

async function readInputs() {
  return new Promise((resolve, _) => {
    const _lines = [];
    const reader = require("readline").createInterface({
      input: process.stdin,
    });
    reader.on("line", (line) => {
      _lines.push(line);
    });
    reader.on("close", () => {
      let index = 0;
      const n = parseInt(_lines[index++]);
      const n_scores = parseInt(_lines[index++]);
      const scores = Array.from({ length: n_scores }).map(_ => {
        let n_scores_2nd = parseInt(_lines[index++]);
        const ret = _lines.slice(index, index + n_scores_2nd).map(v => parseInt(v));
        index += n_scores_2nd;
        return ret;
      });
      resolve([n, scores]);
    });
  });
}

function print_result(result) {
  if (Array.isArray(result)) {
    console.log(result.length);
    result.forEach(r => print_result(r));
  } else {
    console.log(result);
  }
}

//app.js
function getSchoolCredit(n, scores) {
  const results = []
  for (let i = 0; i < n; i++) {
    const [midterm, final] = scores[i];
    
    if (final <= 60 && (midterm + final) <= 100) {
      results.push('fail');
    } else if (final <= 60 || (midterm + final) <= 100) {
      results.push('reexamination');
    } else {
      results.push('pass');
    }
  }

  // 結果の出力
  return results
}

module.exports = getSchoolCredit;