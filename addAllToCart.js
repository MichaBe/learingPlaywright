const { firefox } = require("playwright");

const init = async () => {
    global.browser = await firefox.launch({
        headless: false, // show or dont show browser
        slowMo: 500,
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
    await page.pause();
    await page.goto('https://www.saucedemo.com');
    await page.fill(selectors.userName, "standard_user");
    await page.fill(selectors.password, "secret_sauce");
    const btnLogin = await page.locator(selectors.btnLogin);
    await btnLogin.click();

    const allTheButtons = page.locator(selectors.addToCartButtons);
    const count = await allTheButtons.count();
    for(let i = 0; i < count; i++) {
        await allTheButtons.nth(i).click();
    }

    await page.goto('https://www.saucedemo.com/cart.html');
};

const selectors = {
    userName: '#user-name',
    password: '#password',
    btnLogin: '#login-button',
    addToCartButtons: 'div.inventory_item_description button',
    xpAddToCartButtons: 'xpath=//',
}

const runTest = async () => {
    await init();
    await myTest();
    await shutdown();
}

runTest();