import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); 

async function ping() {
  const BACKEND_URL = process.env.BACKEND_URL

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "700",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
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
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "850",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "900",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "750",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "800",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "850",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "900",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: process.env.USER_ID,
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "950",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      event: "btc",
      noOfTokens: 20,
    });
  });
}

setInterval(() => {
  ping()
}, 3000)
