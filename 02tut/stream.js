const fs = require('fs');

const rs = fs.createReadStream('./files/lorem.txt', { encoding: 'utf8' })

const ws = fs.createWriteStream('./files/new-lorem.txt')

// rs.on('data', (datachunk) => {
//     ws.write(datachunk); 
// )

rs.pipe(ws);// this is the same as the above commented out code
//大きなデータを扱う場合はpipeを使うことが推奨される
//pipeはデータを読み込み、書き込みを自動で行うため、メモリを効率的に使うことができる