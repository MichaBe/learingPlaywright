const { firefox } = require("playwright");



const init = async () => {
    global.browser = await firefox.launch({
        headless: true, // show or dont show browser
        //slowMo: 500,
    });
    
    //create a new context
    global.context = await browser.newContext();
    
    // create page
    global.page = await context.newPage();
};

const shutdown = async () => {
    await global.page.close();
    await global.context.close();
    await global.browser.close();
};

const myTest = async () => {
    //await page.pause();
    await page.goto('https://www.saucedemo.com');
    await page.fill(selectors.userName, "standard_user");
    await page.fill(selectors.password, "secret_sauce");
    const btnLogin = await page.locator(selectors.btnLogin);
    await btnLogin.click();

    const allPricetags = await page.locator(selectors.priceTags)
    .allInnerTexts();
    
    sum = 0;
    for (const tag of allPricetags) {
        sum += parseFloat(tag.toString().replace('$',''));
    }
    console.log("Want one of everything? That'll cost you "+sum);
};

const selectors = {
    userName: '#user-name',
    password: '#password',
    btnLogin: '#login-button',
    priceTags: 'div.inventory_item_price',
}

const runTest = async () => {
    await init();
    await myTest();
    await shutdown();
}

runTest();