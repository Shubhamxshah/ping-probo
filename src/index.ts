import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL || !process.env.USER_ID) {
  throw new Error("Missing BACKEND_URL or USER_ID");
}

async function ping() {
  const trades = [
    { noOfTokens: 5, type: "YES", price: "700" },
    { noOfTokens: 4, type: "YES", price: "750" },
    { noOfTokens: 3, type: "YES", price: "800" },
    { noOfTokens: 2, type: "YES", price: "850" },
    { noOfTokens: 1, type: "YES", price: "900" },
    { noOfTokens: 1, type: "NO", price: "750" },
    { noOfTokens: 2, type: "NO", price: "800" },
    { noOfTokens: 3, type: "NO", price: "850" },
    { noOfTokens: 4, type: "NO", price: "900" },
    { noOfTokens: 5, type: "NO", price: "950" },
  ];

  trades.forEach((trade, index) => {
    setTimeout(async () => {
      try {
        await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
          userId: process.env.USER_ID,
          noOfTokens: trade.noOfTokens,
          event: "btc",
          type: trade.type,
          price: trade.price,
        });
      } catch (err) {
        console.error(`Trade ${index + 1} failed`, err);
      }
    }, index * 200);
  });
}

function reset() {
  setInterval(async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
      await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
        userId: process.env.USER_ID,
        noOfTokens: 30000,
        event: "btc",
      });
      console.log("✅ Reset and mint triggered at 5 min");
    } catch (err) {
      console.error("Error in 5-min reset:", err);
    }
  }, 5 * 60 * 1000);
}

async function main() {
  try {
    await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
    console.log("Reset done");

    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      noOfTokens: 30000,
      event: "btc",
    });
    console.log("Minted 30000 tokens");
  } catch (err) {
    console.error("Error in main():", err);
  }
}

async function init() {
  await main();
  setInterval(ping, 2000);
  reset();
}

init();

