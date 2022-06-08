const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('https://www.humblebundle.com/login?hmb_source=navbar&goto=%2F');//Navigates to login
    await page.waitForNavigation({waitUntil: 'networkidle0'});//Waits for manual login (email and password)
    //await page.waitForNavigation({waitUntil: 'networkidle0'});//Waits for Google Authenticator
    await page.goto('https://www.humblebundle.com/home/keys?hmb_source=navbar');//Navigates to keys
    //await page.waitForSelector('.game-name');
    await page.waitForTimeout(10000)

    let data = await page.evaluate(() => {
        let results = []
        let items = document.getElementsByTagName('h4')
        Array.from(items).forEach((item) => {
            results.push({
                title: item.getAttribute('title')
            })
        })
        return results
    });

    console.log(data);
    await browser.close()
    //await page.waitForNavigation({waitUntil: 'networkidle0'});

})();

//https://pptr.dev/#?product=Puppeteer&version=v14.3.0&show=api-pagewaitfortimeoutmilliseconds
//https://www.webscrapingapi.com/web-scraping-with-a-headless-browser-using-puppeteer-and-node-js/
