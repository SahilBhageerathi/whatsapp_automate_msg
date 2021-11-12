//
//node whatsapp.js --url="https://web.whatsapp.com/" --details="config.json" 

let minimist = require("minimist");
let fs = require("fs");
let puppeteer = require("puppeteer");
let pdf = require("pdf-lib");
let path = require("path")
let args = minimist(process.argv);
let detailsJSON = fs.readFileSync(args.details, "utf-8");


let details = JSON.parse(detailsJSON);
//console.log(details);


automate();

async function automate() {
  let browser = await puppeteer.launch({
    headless: false,
    args: [
      '--start-maximized'
    ],
    defaultViewport: null
  })
  let pages = await browser.pages();
  let page = pages[0];

  await page.goto(args.url);
  await page.waitFor(5000);

for(let i=0;i<details.users.length;i++){

  await page.waitForSelector("div[role='textbox']");
  await page.click("div[role='textbox']");

  await page.waitForSelector("div[role='textbox']");
  await page.type("div[role='textbox']",details.users[i],{delay:50});

  await page.keyboard.press("Enter");


  await page.waitForSelector("div[title='Type a message']");
  await page.click("div[title='Type a message']");

  await page.waitForSelector("div[title='Type a message']");
  await page.type("div[title='Type a message']",details.message,{delay:50});

  await page.keyboard.press("Enter");

}

await browser.close();

}


