import axios from "axios";

async function ping() {
  const BACKEND_URL = "http://localhost:3001";

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "700",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "750",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "800",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "850",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "YES",
      price: "900",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "750",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "800",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "850",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "900",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/trade/sell`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      noOfTokens: 3,
      event: "btc",
      type: "NO",
      price: "950",
    });
  }, 200);

  setTimeout(async () => {
    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: "LDzVTLGAX2Who2OJhUsV36G7XLnnnzU9",
      event: "btc",
      noOfTokens: 20,
    });
  });
}

setInterval(() => {
  ping()
}, 3000)
