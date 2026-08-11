import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('Login and click the highest priced product', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Navigate to application
    await page.goto('https://www.saucedemo.com/');

    // Login fields visibility check
    expect(await loginPage.checkloginFieldsVisibility()).toBe(true);

    // Login
    await loginPage.login();
    
    // Verify that the inventory page is displayed
    expect(await inventoryPage.getPageTitle()).toBe('Products');

    // Find and click highest priced product
    const highestPrice = await inventoryPage.clickHighestPricedItem();

    await inventoryPage.goToCart();
    console.log('Highest priced item on Inventory page: $' + highestPrice);
    console.log('Highest priced item is in the cart: $' + await cartPage.getHighestPricedItemInCart());
    expect(highestPrice).toBe(await cartPage.getHighestPricedItemInCart());

});
