const notifier = require('node-notifier');
const path = require('path');

function sendDesktopAlert(title, message, icon) {
    notifier.notify({
        title,
        message,
        wait: true,
        sound: true,
        icon:  icon || path.join(__dirname, '../assets/bullish.png'),
        contentImage: icon || path.join(__dirname, '../assets/bullish.png'),
        open: 'https://es.tradingview.com/',

    },
    function (err, response) {
        console.log(response);
    }
    );

}

module.exports = sendDesktopAlert;