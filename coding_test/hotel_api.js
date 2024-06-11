const https = require('https');

function main(argv) {

    if (argv.length < 2) {
        console.error('Usage: node main.js <X-ACCESS-TOKEN> <keyword>');
        process.exit(1);
    }

    const accessToken = argv[0];
    const keyword = encodeURIComponent(argv[1]);

    const options = {
        hostname: 'challenge-server.tracks.run',
        path: `/hotel-reservation/hotels?keyword=${keyword}`,
        method: 'GET',
        headers: {
            'X-ACCESS-TOKEN': accessToken,
        },
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const hotels = JSON.parse(data);
            hotels.forEach((hotel) => {
                console.log(hotel.name);
            });
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}


main(process.argv.slice(2));
