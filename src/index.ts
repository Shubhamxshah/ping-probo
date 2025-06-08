import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;
async function ping() {
  await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
    userId: process.env.USER_ID,
    noOfTokens: 5,
    event: "btc",
    type: "YES",
    price: "700",
  });

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 4,
      event: "btc",
      type: "YES",
      price: "750",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "800",
    });
  }, 400);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 2,
      event: "btc",
      type: "YES",
      price: "850",
    });
  }, 600);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 1,
      event: "btc",
      type: "YES",
      price: "900",
    });
  }, 800);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 1,
      event: "btc",
      type: "NO",
      price: "750",
    });
  }, 1000);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 2,
      event: "btc",
      type: "NO",
      price: "800",
    });
  }, 1200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "850",
    });
  }, 1400);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 4,
      event: "btc",
      type: "NO",
      price: "900",
    });
  }, 1600);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 5,
      event: "btc",
      type: "NO",
      price: "950",
    });
  }, 1800);
}

setInterval(() => {
  ping();
}, 2000);

setTimeout(() => {
  (async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
      await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
        userId: process.env.USER_ID,
        noOfTokens: 30000,
        event: "btc",
      });
      console.log("Reset and mint triggered at 5 min");
    } catch (err) {
      console.error("Error in 5-min timeout:", err);
    }
  })();
}, 5 * 60 * 1000);

async function main() {
  await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
  //   await axios.post(`${BACKEND_URL}/api/v1/balance/addfree`, {
  //   userId: process.env.USER_ID,
  //   amount: "100000000"
  // });
  await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
    userId: process.env.USER_ID,
    noOfTokens: 30000,
    event: "btc",
  });
}

main();
