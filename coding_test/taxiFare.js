// 時間をミリ秒に変換する関数
function parseTime(timeStr) {
  const [hh, mm, ssStr] = timeStr.split(':');
  const [ss, fff] = ssStr.split('.').map(Number);
  return (parseInt(hh) * 3600 + parseInt(mm) * 60 + ss) * 1000 + fff;
}

// 時間帯に応じた割増料金を適用する関数
function applyRate(fare, timeStr) {
  const [hh] = timeStr.split(':').map(Number);
  const hhInt = parseInt(hh);
  if (hhInt >= 24 || hhInt < 6) {
    return fare * 1.5; // 深夜割増料金
  } else if ((hhInt >= 6 && hhInt < 9.5) || (hhInt >= 20 && hhInt < 24)) {
    return fare * 1.3; // ピークタイム割増料金
  } else {
    return fare; // 通常料金
  }
}

function main(lines) {
  const initialFare = 400;
  const shortDistanceRate = 40;
  const longDistanceRate = 40;
  const shortDistanceInterval = 400;
  const longDistanceInterval = 350;
  const lowSpeedRate = 40;
  const lowSpeedInterval = 45;

  let totalFare = initialFare; // 初乗り運賃
  let totalDistance = 0;
  let lowSpeedTime = 0;
  let lastTime = null;

  for (let i = 0; i < lines.length; i++) {
    const [timeStr, distanceStr] = lines[i].split(' ');
    if (!timeStr || !distanceStr) continue; // 無効な行をスキップ
    const currentTime = parseTime(timeStr);
    const currentDistance = parseFloat(distanceStr);

    if (lastTime !== null) {
      const elapsedTime = (currentTime - lastTime) / 1000; // 経過時間（秒）
      const elapsedDistance = currentDistance; // 経過距離

      if (elapsedDistance > 0) {
        totalDistance += elapsedDistance;

        if (totalDistance <= 1000) {
          // 初乗り距離区間：運賃追加無し
        } else if (totalDistance <= 10000) {
          // 短距離区間
          const shortDistanceFare = Math.floor((totalDistance - 1000) / shortDistanceInterval) * shortDistanceRate;
          totalFare += applyRate(shortDistanceFare, timeStr);
        } else {
          // 長距離区間
          const shortDistanceFare = Math.floor((10000 - 1000) / shortDistanceInterval) * shortDistanceRate;
          const longDistanceFare = Math.floor((totalDistance - 10000) / longDistanceInterval) * longDistanceRate;
          totalFare += applyRate(shortDistanceFare + longDistanceFare, timeStr);
        }
      }

      const speed = (elapsedDistance / elapsedTime) * 3600 / 1000; // 平均速度 (km/h)

      if (speed <= 10) { // 平均速度が10km/h以下の場合
        lowSpeedTime += elapsedTime; // 低速時間を加算
      }

      if (lowSpeedTime >= lowSpeedInterval) { // 低速時間区間を超えた場合
        const lowSpeedFare = Math.floor(lowSpeedTime / lowSpeedInterval) * lowSpeedRate;
        totalFare += applyRate(lowSpeedFare, timeStr); // 低速時間に対する運賃を加算
        lowSpeedTime %= lowSpeedInterval; // 残りの低速時間
      }
    }

    lastTime = currentTime;
  }
  console.log(Math.round(totalFare)); // 最終的な運賃を出力
}

function runWithStdin() {
  let input = "";
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", v => {
    input += v;
  });
  process.stdin.on("end", () => {
    main(input.split("\n").filter(line => line.trim() !== "")); // 入力データの空行をフィルタリング
  });
}

runWithStdin();