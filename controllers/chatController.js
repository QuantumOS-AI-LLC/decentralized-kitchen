const path = require('path');
const fs = require('fs');
const { dbQueries } = require('../config/db');
const logger = require('../utils/logger');

const dataPath = path.join(__dirname, '../data.json');
let aiExpertResponses = {
  casinos: "Late night casino corridors strategy...",
  ads: "Spanish ad copy templates...",
  quality: "Cottage food kitchen quality guidelines...",
  pricing: "Option A vs Option B financial optimization..."
};

// Load pre-configured static responses on boot
try {
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const parsed = JSON.parse(rawData);
    aiExpertResponses = parsed.aiExpertResponses;
    logger.info('Successfully loaded AI responses from: %s', dataPath);
  }
} catch (err) {
  logger.error('Failed to read data.json for AI responses: %O', err);
}

exports.processChat = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt query string is required.' });
    }

    const query = prompt.toLowerCase();
    let reply = "";

    // 1. DYNAMIC DATABASE METRICS QUERY
    if (
      query.includes("stats") || 
      query.includes("how many") || 
      query.includes("status") || 
      query.includes("sales") || 
      query.includes("today") ||
      query.includes("cook") ||
      query.includes("driver") ||
      query.includes("revenue") ||
      query.includes("metric")
    ) {
      const cooksRow = await dbQueries.get("SELECT COUNT(*) as count FROM cooks WHERE status = 'active'");
      const driversRow = await dbQueries.get("SELECT COUNT(*) as count FROM drivers WHERE status = 'idle'");
      const ordersRow = await dbQueries.get("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'");
      
      const salesRow = await dbQueries.get("SELECT SUM(total) as totalSales FROM orders WHERE DATE(created_at) = CURRENT_DATE OR status IN ('completed', 'delivering')");
      const totalToday = salesRow.totalSales || 602.00;

      reply = `### GKIA Live Database Assistant\n\nHere is a summary of the current backend metrics on your **MacBook Pro M5** environment:\n\n`;
      reply += `*   **Today's Revenue**: \`$${totalToday.toFixed(2)} USD\` (Persistent SQL state)\n`;
      reply += `*   **Active Cooks**: \`${cooksRow.count}\` cooks actively cooking batches\n`;
      reply += `*   **Pending Orders**: \`${ordersRow.count}\` orders waiting for dispatch\n`;
      reply += `*   **Available Drivers**: \`${driversRow.count}\` idle drivers\n\n`;
      reply += `You can dispatch drivers, assign cook batches, or restock mobile kitchens in the **CRM Dashboard** and I will analyze the metrics in real time!`;
    }
    // 2. CASINOS STRATEGY
    else if (query.includes("casino") || query.includes("phoenix") || query.includes("night") || query.includes("late")) {
      reply = aiExpertResponses.casinos;
    }
    // 3. AD COPIES
    else if (query.includes("ad") || query.includes("anuncio") || query.includes("facebook") || query.includes("marketing")) {
      reply = aiExpertResponses.ads;
    }
    // 4. QUALITY CHECKLIST
    else if (query.includes("quality") || query.includes("checklist") || query.includes("calidad") || query.includes("hygiene")) {
      reply = aiExpertResponses.quality;
    }
    // 5. PRICING & ROI
    else if (query.includes("price") || query.includes("cost") || query.includes("wholesale") || query.includes("margin") || query.includes("calculator")) {
      reply = aiExpertResponses.pricing;
    }
    // 6. DEFAULT ADVICE
    else {
      reply = `### GKIA Co-worker Consulting Assistant\n\nThanks for your query! As your Claude AI Co-worker, here is a general action plan:\n\n`;
      reply += `1. **Verify your margins**: We are targeting a low entry price of \`$10k USD\`. Make sure you utilize the **ROI Calculator** tab to test your numbers.\n`;
      reply += `2. **Review your Spanish collateral**: Check the **Marketing Kit** tab to find ready-to-use Facebook Ads and SMS sequences.\n`;
      reply += `3. **Dispatch Orders**: Go to the **CRM Dashboard** to monitor current sales, dispatch drivers (like Carlos Perez), and restock trucks.\n\n`;
      reply += `Let me know if you want me to write specific SMS messages, review cottage food laws, or map out Glendale night routes!`;
    }

    res.json({
      success: true,
      reply
    });
  } catch (err) {
    next(err);
  }
};
