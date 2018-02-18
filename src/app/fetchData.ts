let BFX = require("bitfinex-api-node");
import { env } from '../environments/environment';

let bfx = new BFX({
    apiKey: env.API_KEY,
    apiSecret: env.API_SECRET,
    ws: {
        autoReconnect: true,
        seqAudit: true,
        packetWDDelay: 10 * 1000
    }
});

const ws = bfx.ws()

const subscribeMsg = {
    "event": "subscribe",
    "channel": "ticker",
    "symbol": "tBTCUSD"
}

let lastPrice = '';

ws.on('error', (err) => console.log(err))
ws.on('open', () => {
    ws.send(subscribeMsg);
    ws.on('message', (data: any) => {
        if (Array.isArray(data) && typeof data[1] !== 'string' || data[1] !instanceof String) {
            lastPrice = data[1][0];
            console.log(`Last BTC-USD Price => ${lastPrice}`);
        }
    }
    )
})

ws.open()