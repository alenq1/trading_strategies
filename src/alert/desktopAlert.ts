import notifier from 'node-notifier';
import path from 'path';

interface DesktopAlertInput {
    title: string,
    message: string,
    icon?: string
}

export function sendDesktopAlert({title, message, icon}: DesktopAlertInput) {
    notifier.notify({
        title,
        message,
        wait: true,
        sound: true,
        icon:  icon || path.join(__dirname, '../assets/bullish.png'),
        contentImage: icon || path.join(__dirname, '../assets/bullish.png'),
        open: 'https://es.tradingview.com/',

    },
    function (err: any, response: any) {
        console.log(response);
    }
    );

}

