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


//オフサイドを判定するプログラム
//inputは以下の形式で与えられます。
// B 8
// 104 105 108 109 107 106 100 102 103 110 101
// 104 101 102 109 107 106 105 110 103 108 55
reader.on('close', () => {
  const [team, passPlayer] = lines[0].split(' ');
  const passPlayerNumber = parseInt(passPlayer);
  const teamA = lines[1].split(' ').map(Number);
  const teamB = lines[2].split(' ').map(Number);

  let passPlayerPosition;
  if (team === 'A') {
    passPlayerPosition = teamA[passPlayerNumber - 1];
  } else {
    passPlayerPosition = teamB[passPlayerNumber - 1];
  }

  let opponentPositions, thresholdPosition;
  if (team === 'A') {
    opponentPositions = teamB.slice().sort((a, b) => b - a); // 降順にソート
    thresholdPosition = opponentPositions[1]; // Bチームの2番目に大きい値
  } else {
    opponentPositions = teamA.slice().sort((a, b) => a - b); // 昇順にソート
    thresholdPosition = opponentPositions[1]; // Aチームの2番目に小さい値
  }
  
  

  const offsidePlayers = [];
  if (team === 'A') {
    for (let i = 0; i < teamA.length; i++) {
      if (
        teamA[i] > 55 && // 敵陣にいる
        teamA[i] > passPlayerPosition && // パスを出す選手よりゴールに近い
        teamA[i] > thresholdPosition // 敵チームの2番目に大きい選手よりゴールから遠い
      ) {
        offsidePlayers.push(i + 1);
      }
    }
  } else {
    for (let i = 0; i < teamB.length; i++) {
      if (
        teamB[i] < 55 && // 敵陣にいる
        teamB[i] < passPlayerPosition && // パスを出す選手よりゴールに近い
        teamB[i] < thresholdPosition // 敵チームの2番目に小さい選手よりゴールから遠い
      ) {
        offsidePlayers.push(i + 1);
      }
    }
  }

  if (offsidePlayers.length === 0) {
    console.log("None");
  } else {
    offsidePlayers.sort((a, b) => a - b).forEach(player => console.log(player));
  }
});


//以下はファイルを読み込む場合のコード
//二つのファイルを形式を変えずにマージするプログラム
const fs = require('fs');
const readline = require('readline');

function parseCSVLine(line) {
    const [timestamp, player_id, score] = line.split(',');
    return { timestamp, player_id, score: parseInt(score, 10) };
}

function readLogFile(filePath) {
    return new Promise((resolve, reject) => {
        const logs = [];
        const readStream = fs.createReadStream(filePath, 'utf8');
        const reader = readline.createInterface({ input: readStream });

        reader.on('line', (line) => {
            logs.push(parseCSVLine(line));
        });

        reader.on('close', () => {
            resolve(logs);
        });

        reader.on('error', (error) => {
            reject(error);
        });
    });
}

function mergeSortedLogs(logs1, logs2) {
    const merged = [];
    let i = 0, j = 0;

    while (i < logs1.length && j < logs2.length) {
        if (logs1[i].timestamp < logs2[j].timestamp) {
            merged.push(logs1[i++]);
        } else if (logs1[i].timestamp > logs2[j].timestamp) {
            merged.push(logs2[j++]);
        } else {
            // 同一タイムスタンプの場合は file1 のエントリを先に追加
            merged.push(logs1[i++]);
            while (j < logs2.length && logs2[j].timestamp === logs1[i - 1].timestamp) {
                merged.push(logs2[j++]);
            }
        }
    }

    while (i < logs1.length) {
        merged.push(logs1[i++]);
    }

    while (j < logs2.length) {
        merged.push(logs2[j++]);
    }

    return merged;
}

function outputCSV(logs) {
    logs.forEach(log => {
        console.log(`${log.timestamp},${log.player_id},${log.score}`);
    });
}

async function main(argv) {
    if (argv.length < 2) {
        console.error('Usage: node main.js <file1> <file2>');
        process.exit(1);
    }

    const file1 = argv[0];
    const file2 = argv[1];

    try {
        const [logs1, logs2] = await Promise.all([readLogFile(file1), readLogFile(file2)]);
        const mergedLogs = mergeSortedLogs(logs1, logs2);
        outputCSV(mergedLogs);
    } catch (error) {
        console.error('Error reading log files:', error);
        process.exit(1);
    }
}

// コマンドライン引数からファイル名を取得してmain関数を呼び出します
main(process.argv.slice(2));



//カラオケ料金を計算するプログラム
//時刻を秒数に変換する関数
function parseTime(timeStr) {
  const [hh, mm, ss] = timeStr.split(':').map(Number);
  return hh * 3600 + mm * 60 + ss;
}

//指定された時間がデイタイムかどうか
function isDayTime(time) {
  return time <= parseTime('17:49:59');
}

//ルーム料金を計算する関数
function calculateRoomRate(timeType, drinkCourse, entryTime, exitTime) {
  let rate = 0;
  const entryDayTime = isDayTime(entryTime);
  if (timeType === 'free_time') {
    // フリータイムの料金
    if (drinkCourse === 'one_drink') {
      rate = entryDayTime ? 1000 : 1500;
    } else if (drinkCourse === 'free_refills') {
      rate = entryDayTime ? 1500: 2000;
    } else if (drinkCourse === 'alcohol_free_refills') {
      rate = entryDayTime ? 2500 : 4000;
    }
  } else if (timeType === 'time_based') {
    //30分毎課金料金
    let currentTime = entryTime;
    while (currentTime < exitTime) {
      const nextTime = currentTime + 1800;
      const inDayTime = isDayTime(currentTime);
      if (drinkCourse === 'one_drink') {
        rate += inDayTime ? 100: 400;
      } else if (drinkCourse === 'free_refills') {
        rate += inDayTime ? 200 : 500;
      } else if (drinkCourse=== 'alcohol_free_refills') {
        rate += inDayTime ? 300 : 650;
      }
      currentTime = nextTime;
    }
  }
  return rate;
}

function main(lines) { 
  const header = lines[0].split(' ');
  const timeType = header[2];
  const drinkCourse = header[3];

  let totalRoomRate = 0;
  let totalFoodRate = 0;
  let totalDrinkRate = 0;
  let currentPeople = 0;
  let totalPeople = 0;
  let totalDrinks = 0;
  let checkInTimes = [];

  for (let i = 1; i < lines.length; i++) {
    const record = lines[i].split(' ');
    const time = parseTime(record[0]);
    const type = record[1]

    if (type === 'enter') {
      const count = parseInt(record[2], 10);
      if (count <= 0) {
        console.log(JSON.stringify({ code: 999}));
        return;
      }
      for (let j = 0; j < count; j++) {
        checkInTimes.push(time);
      }
      currentPeople += count;
      totalPeople += count;
      if ( currentPeople >= 1000) {
        console.log(JSON.stringify({ code: 99}));
        return;
      }
    } else if (type === 'leave') {
      const count = parseInt(record[2], 10);
      if (count > currentPeople) {
        console.log(JSON.stringify({ code: 99}));
        return;
      }
      checkInTimes.sort((a, b) => a - b);
      for (let j = 0; j < count; j++) {
        const entryTime = checkInTimes.shift();
        totalRoomRate += calculateRoomRate(timeType, drinkCourse, entryTime, time);
      }
      currentPeople -= count;
    } else if (type === 'drink') {
      const price = parseInt(record[2], 10);
      const count = parseInt(record[3], 10);
      totalDrinks += count;
      if (drinkCourse === 'one_drink') {
        totalDrinkRate += price * count;
      }
    } else if (type === 'food') {
      const price = parseInt(record[2], 10);
      const count = parseInt(record[3], 10);
      totalFoodRate += price * count;
    } else if (type === 'footer') {
        break;
    }
  }

  //ワンドリンク制のチェック
  if (drinkCourse === 'one_drink' && totalDrinks < totalPeople) {
    console.log(JSON.stringify({
      code:1,
      price: totalRoomRate + totalDrinkRate + totalFoodRate,
      drink: totalPeople - totalDrinks
    }));
    return;
  }

  console.log(JSON.stringify({
    code: 0,
    price: totalRoomRate + totalDrinkRate + totalFoodRate
  }));
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
