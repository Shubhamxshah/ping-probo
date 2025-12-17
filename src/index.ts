import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL || !process.env.USER_ID) {
  throw new Error("Missing BACKEND_URL or USER_ID");
}

let pingInterval: NodeJS.Timeout | null = null;

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

  const tradePromises = trades.map((trade, index) =>
    new Promise<void>((resolve) => {
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
      
      reset();
      resolve();
    })
  );

  await Promise.all(tradePromises);
}

async function performReset() {
  console.log(`🔄 Starting reset at ${new Date().toISOString()}`);
  
  try {
    // Stop ping temporarily
    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
      console.log("⏸️ Temporarily stopped ping");
    }

    // Wait a moment for any pending trades to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Perform reset
    console.log("📡 Calling reset endpoint...");
    await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
    console.log("✅ Reset successful");

    // Mint new tokens
    console.log("💰 Minting tokens...");
    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      noOfTokens: 30000,
      event: "btc",
    });
    console.log("✅ Mint successful");

    // Restart ping
    pingInterval = setInterval(ping, 2000);
    console.log("▶️ Ping restarted");
    
    console.log("🎉 Reset and mint completed successfully");
  } catch (err) {
    console.error("❌ Error in reset:", err);
    // Make sure to restart ping even if reset fails
    if (!pingInterval) {
      pingInterval = setInterval(ping, 2000);
      console.log("▶️ Ping restarted after error");
    }
  }
}

function reset() {
  console.log("🔄 Reset scheduler started - will run every 5 minutes");
  setInterval(performReset, 5 * 60 * 1000);
}

async function main() {
  try {
    await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
    console.log("✅ Initial reset done");

    await axios.post(`${BACKEND_URL}/api/v1/balance/addfree`, {
      userId: process.env.USER_ID,
      amount: 100000,
    });
    
    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      noOfTokens: 300,
      event: "btc",
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("✅ Initial mint: 300 tokens");
  } catch (err) {
    console.error("❌ Error in main():", err);
  }
}

async function init() {
  await main();
  
  // Start ping
  pingInterval = setInterval(ping, 2000);
  console.log("▶️ Ping started (every 2 seconds)");
  
  // Start reset scheduler
  reset();
  
  console.log("🚀 All systems running!");
}

init();
