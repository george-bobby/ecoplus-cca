const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const scrapeAmazon = async () => {
  console.log("Launching browser for Amazon...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const searchUrl = "https://www.amazon.in/s?k=sustainable+products";
  console.log(`Navigating to ${searchUrl}...`);
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 60000 });

  console.log("Scraping product data from Amazon...");
  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(
      ".s-main-slot .s-result-item"
    );
    const scrapedData = [];

    productElements.forEach((item) => {
      if (scrapedData.length < 50) {
        // Limit to 20 products
        const price = item.querySelector(".a-price-whole")?.innerText || "N/A";
        const rating =
          item.querySelector(".a-icon-alt")?.innerText.split(" ")[0] || "N/A";
        const imageUrl = item.querySelector(".s-image")?.src || "";
        const productUrl =
          item.querySelector(".a-link-normal")?.href &&
          "https://www.amazon.in" +
            item.querySelector(".a-link-normal").getAttribute("href");

        if (imageUrl && productUrl) {
          scrapedData.push({ price, rating, imageUrl, productUrl });
        }
      }
    });

    return scrapedData;
  });

  console.log(`Scraped ${products.length} products from Amazon.`);

  // Create a "data" folder if it doesn't exist
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const filePath = path.join(dataDir, "products.json");
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to amazon-products.json.`);

  await browser.close();
};

// Run the scraper immediately
scrapeAmazon().catch((error) => {
  console.error("An error occurred while scraping Amazon:", error);
});
