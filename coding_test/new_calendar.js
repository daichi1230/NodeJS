function main(lines) {
  const input = lines[0].trim().split(' ')
  const daysInYear = parseInt(input[0])
  const daysInMonth = parseInt(input[1])
  const daysInWeek = parseInt(input[2])
  const date = input[3]

  if (daysInYear < 1 || daysInYear > 2000 || daysInMonth < 1 || daysInMonth > 200 || daysInWeek < 1 || daysInWeek > 26 || daysInMonth > daysInYear) {
    console.log(-1)
    return
  }

  const monthsInYear = Math.ceil(daysInYear / daysInMonth)
  if (monthsInYear > 99) {
    console.log(-1)
    return
  }

  const [year, month, day] = date.split('-').map(Number)

  if (month < 1 || month > monthsInYear || day < 1 || day > daysInMonth) {
    console.log(-1)
    return
  }

  const leapYearRemainder = daysInYear % daysInMonth
  let totalLeapDays = 0
  let leapMonths = 0

  // 閏月の計算
  for (let y = 1; y < year; y++) {
    totalLeapDays += leapYearRemainder
    if (totalLeapDays >= daysInMonth) {
      leapMonths++
      totalLeapDays -= daysInMonth
    }
  }

  const totalDays = (year - 1) * daysInYear + (month - 1) * daysInMonth + day + leapMonths * daysInMonth

  // 総日数がカレンダーの最大日数を超える場合のチェック
  const maxDays = year * daysInYear + leapMonths * daysInMonth
  if (totalDays > maxDays || totalDays < 1) {
    console.log(-1)
    return
  }

  // 曜日の計算
  const dayOfWeek = String.fromCharCode(65 + ((totalDays - 1) % daysInWeek))

  console.log(dayOfWeek)
}

function runWithStdin() {
  let input = ""
  process.stdin.resume()
  process.stdin.setEncoding("utf8")

  process.stdin.on("data", (v) => {
    input += v
  })
  process.stdin.on("end", () => {
    main(input.split("\n"))
  })
}

runWithStdin()
