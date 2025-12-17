import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL || !process.env.USER_ID) {
  throw new Error("Missing BACKEND_URL or USER_ID");
}

let pingInterval: NodeJS.Timeout | null = null;
let resetInterval: NodeJS.Timeout | null = null;
let consecutiveErrors = 0;
const MAX_CONSECUTIVE_ERRORS = 5;

async function ping() {
  try {
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
            console.error(`Trade ${index + 1} failed:`, err instanceof Error ? err.message : err);
          }
          resolve();
        }, index * 200);
      })
    );

    await Promise.all(tradePromises);
    consecutiveErrors = 0;
    console.log(`✅ Ping cycle completed at ${new Date().toISOString()}`);
  } catch (err) {
    consecutiveErrors++;
    console.error(`❌ Ping cycle failed (${consecutiveErrors}/${MAX_CONSECUTIVE_ERRORS}):`, err instanceof Error ? err.message : err);

    if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
      console.error("⚠️ Too many consecutive errors, attempting recovery...");
      await attemptRecovery();
    }
  }
}

async function performReset() {
  console.log(`🔄 Starting reset at ${new Date().toISOString()}`);

  try {
    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
      console.log("⏸️ Temporarily stopped ping");
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("📡 Calling reset endpoint...");
    await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
    console.log("✅ Reset successful");

    // Add balance: 30000 tokens * 10 * 100 = 30,000,000
    // Note: API multiplies by 100, so send 300,000 to get 30,000,000
    console.log("💵 Adding balance...");
    await axios.post(`${BACKEND_URL}/api/v1/balance/addfree`, {
      userId: process.env.USER_ID,
      amount: 300000,
    });
    console.log("✅ Balance added: 300,000 (becomes 30,000,000 in engine)");

    console.log("💰 Minting tokens...");
    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      noOfTokens: 30000,
      event: "btc",
    });
    console.log("✅ Mint successful: 30,000 tokens");

    const memUsage = process.memoryUsage();
    console.log(`📊 Memory: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB / ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);

    pingInterval = setInterval(ping, 2000);
    console.log("▶️ Ping restarted");

    console.log("🎉 Reset and mint completed successfully");
    consecutiveErrors = 0;
  } catch (err) {
    console.error("❌ Error in reset:", err instanceof Error ? err.message : err);
    if (!pingInterval) {
      pingInterval = setInterval(ping, 2000);
      console.log("▶️ Ping restarted after error");
    }
  }
}

async function attemptRecovery() {
  console.log("🔧 Attempting system recovery...");

  if (pingInterval) {
    clearInterval(pingInterval);
    pingInterval = null;
  }
  if (resetInterval) {
    clearInterval(resetInterval);
    resetInterval = null;
  }

  await new Promise(resolve => setTimeout(resolve, 5000));

  try {
    await performReset();

    resetInterval = setInterval(performReset, 5 * 60 * 1000);
    console.log("🔄 Reset scheduler restarted");

    consecutiveErrors = 0;
    console.log("✅ Recovery successful");
  } catch (err) {
    console.error("❌ Recovery failed:", err instanceof Error ? err.message : err);
    console.log("🔁 Will retry recovery in 10 seconds...");
    setTimeout(attemptRecovery, 10000);
  }
}

async function main() {
  try {
    console.log("🚀 Initializing bot...");

    await axios.post(`${BACKEND_URL}/api/v1/trade/reset`);
    console.log("✅ Initial reset done");

    await axios.post(`${BACKEND_URL}/api/v1/balance/addfree`, {
      userId: process.env.USER_ID,
      amount: 300000,
    });
    console.log("✅ Added initial balance: 300,000 (becomes 30,000,000 in engine)");

    await axios.post(`${BACKEND_URL}/api/v1/balance/mint`, {
      userId: process.env.USER_ID,
      noOfTokens: 30000,
      event: "btc",
    });
    console.log("✅ Initial mint: 30,000 tokens");

    await new Promise(resolve => setTimeout(resolve, 2000));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("❌ Error in main():", err.message);
      console.error("📍 URL:", err.config?.url);
      console.error("📦 Request data:", JSON.stringify(err.config?.data, null, 2));
      console.error("🔴 Response status:", err.response?.status);
      console.error("🔴 Response data:", JSON.stringify(err.response?.data, null, 2));
    } else {
      console.error("❌ Error in main():", err instanceof Error ? err.message : err);
    }
    throw err;
  }
}

async function init() {
  try {
    await main();

    pingInterval = setInterval(ping, 2000);
    console.log("▶️ Ping started (every 2 seconds)");

    resetInterval = setInterval(performReset, 5 * 60 * 1000);
    console.log("🔄 Reset scheduler started (every 5 minutes)");

    console.log("🚀 All systems running!");
    console.log(`📡 Backend: ${BACKEND_URL}`);
    console.log(`👤 User ID: ${process.env.USER_ID}`);
  } catch (err) {
    console.error("❌ Failed to initialize:", err instanceof Error ? err.message : err);
    console.log("🔁 Retrying in 10 seconds...");
    setTimeout(init, 10000);
  }
}

process.on('SIGINT', () => {
  console.log("\n🛑 Shutting down gracefully...");
  if (pingInterval) clearInterval(pingInterval);
  if (resetInterval) clearInterval(resetInterval);
  console.log("👋 Goodbye!");
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error("💥 Uncaught exception:", err);
  attemptRecovery();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("💥 Unhandled rejection at:", promise, "reason:", reason);
  attemptRecovery();
});

init();
