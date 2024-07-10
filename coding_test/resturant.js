// ステップ1: 客席からの注文情報を処理
function step1(lines) {
  const M = parseInt(lines[1], 10); // メニューの種類数を取得
  const menu = {};

  // メニュー情報を取得
  for (let i = 0; i < M; i++) {
    const [D, S, P] = lines[2 + i].split(' ').map(Number);
    menu[D] = { stock: S, price: P };
  }

  // 注文情報を処理
  for (let i = 2 + M; i < lines.length; i++) {
    const [_, T, D, N] = lines[i].split(' ');
    const seatNumber = parseInt(T, 10);
    const dishNumber = parseInt(D, 10);
    const quantity = parseInt(N, 10);

    if (menu[dishNumber].stock >= quantity) {
      menu[dishNumber].stock -= quantity;
      for (let j = 0; j < quantity; j++) {
        console.log(`received order ${seatNumber} ${dishNumber}`);
      }
    } else {
      console.log(`sold out ${seatNumber}`);
    }
  }
}

// ステップ2: 調理指示と電子レンジの管理
function step2(lines) {
  const [M, K] = lines[1].split(' ').map(Number); // メニューの種類数と電子レンジの数を取得
  const menu = {};
  let microwaveQueue = []; // 調理待ち注文キュー
  let activeMicrowaves = 0; // 使用中の電子レンジ数

  // メニュー情報を取得
  for (let i = 0; i < M; i++) {
    const [D, S, P] = lines[2 + i].split(' ').map(Number);
    menu[D] = { stock: S, price: P };
  }

  // 注文受理情報と料理の完成情報を処理
  for (let i = 2 + M; i < lines.length; i++) {
    const parts = lines[i].split(' ');

    if (parts[0] === 'received') {
      const [_, __, T, D] = parts;
      const seatNumber = parseInt(T, 10);
      const dishNumber = parseInt(D, 10);

      if (activeMicrowaves < K) {
        activeMicrowaves++;
        console.log(dishNumber);
      } else {
        microwaveQueue.push(dishNumber);
        console.log('wait');
      }
    } else if (parts[0] === 'complete') {
      const dishNumber = parseInt(parts[1], 10);

      if (activeMicrowaves > 0) {
        activeMicrowaves--;
        if (microwaveQueue.length > 0) {
          const nextDish = microwaveQueue.shift();
          activeMicrowaves++;
          console.log(`ok ${nextDish}`);
        } else {
          console.log('ok');
        }
      } else {
        console.log('unexpected input');
      }
    }
  }
}

// ステップ3: 完成した料理の提供指示
function step3(lines) {
  const M = parseInt(lines[1], 10); // メニューの種類数を取得
  const menu = {};
  const seatOrders = {}; // 座席ごとの注文管理
  const cookingOrders = {}; // 調理中の注文管理

  // メニュー情報を取得
  for (let i = 0; i < M; i++) {
    const [D, S, P] = lines[2 + i].split(' ').map(Number);
    menu[D] = { stock: S, price: P };
  }

  // 注文受理情報と料理の完成情報を処理
  for (let i = 2 + M; i < lines.length; i++) {
    const parts = lines[i].split(' ');

    if (parts[0] === 'received') {
      const [_, __, T, D] = parts;
      const seatNumber = parseInt(T, 10);
      const dishNumber = parseInt(D, 10);

      if (!seatOrders[seatNumber]) {
        seatOrders[seatNumber] = [];
      }
      seatOrders[seatNumber].push(dishNumber);

      if (!cookingOrders[dishNumber]) {
        cookingOrders[dishNumber] = [];
      }
      cookingOrders[dishNumber].push(seatNumber);
    } else if (parts[0] === 'complete') {
      const dishNumber = parseInt(parts[1], 10);

      if (cookingOrders[dishNumber] && cookingOrders[dishNumber].length > 0) {
        const seatNumber = cookingOrders[dishNumber].shift();
        console.log(`ready ${seatNumber} ${dishNumber}`);
      }
    }
  }
}

// ステップ4: 会計処理
function step4(lines) {
  const M = parseInt(lines[1], 10); // メニューの種類数を取得
  const menu = {};
  const seatCompletedOrders = {}; // 完了した注文管理
  const seatOrders = {}; // 座席ごとの注文管理
  const seatTotals = {}; // 座席ごとの合計金額管理

  // メニュー情報を取得
  for (let i = 0; i < M; i++) {
    const [D, S, P] = lines[2 + i].split(' ').map(Number);
    menu[D] = { stock: S, price: P };
  }

  // 注文受理情報、注文提供情報、会計申請情報を処理
  for (let i = 2 + M; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const input = lines[i].split(' ');

    if (input[0] === 'received') { // 受理された注文を処理
      const [_, __, T, D] = input;
      const seatNumber = parseInt(T, 10);
      const dishNumber = parseInt(D, 10);

      if (!seatOrders[seatNumber]) {
        seatOrders[seatNumber] = [];
      }
      seatOrders[seatNumber].push(dishNumber);

      if (!seatTotals[seatNumber]) {
        seatTotals[seatNumber] = 0;
      }
      seatTotals[seatNumber] += menu[dishNumber].price;
    } else if (input[0] === 'ready') { // 提供された料理を処理
      const [_, T, D] = input;
      const seatNumber = parseInt(T, 10);
      const dishNumber = parseInt(D, 10);

      if (!seatCompletedOrders[seatNumber]) {
        seatCompletedOrders[seatNumber] = [];
      }
      seatCompletedOrders[seatNumber].push(dishNumber);
    } else if (input[0] === 'check') { // 会計申請を処理
      const seatNumber = parseInt(input[1], 10);
      const orderedDishes = seatOrders[seatNumber] || [];
      const completedDishes = seatCompletedOrders[seatNumber] || [];
      const allDishesCompleted = orderedDishes.length === completedDishes.length && orderedDishes.every(dish => completedDishes.includes(dish));

      if (allDishesCompleted) {
        const totalAmount = seatTotals[seatNumber] || 0;
        console.log(totalAmount);
        delete seatOrders[seatNumber];
        delete seatCompletedOrders[seatNumber];
        delete seatTotals[seatNumber];
      } else {
        console.log('please wait');
      }
    }
  }
}

// メイン処理
function main(lines) {
  const step = parseInt(lines[0], 10);
  switch (step) {
    case 1:
      step1(lines); // ステップ1を処理
      break;
    case 2:
      step2(lines); // ステップ2を処理
      break;
    case 3:
      step3(lines); // ステップ3を処理
      break;
    case 4:
      step4(lines); // ステップ4を処理
      break;
    default:
      console.log('Invalid step');
  }
}
