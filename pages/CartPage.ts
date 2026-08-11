import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItemPrice: Locator;
    readonly cartPageTitle: Locator;

constructor(page: Page) {
    this.page = page;
    this.cartPageTitle = page.locator('.title');
    this.cartItemPrice = page.locator('.inventory_item_price');
}
// Get the cart page title
async getCartPageTitle() {
    return await this.cartPageTitle.innerText();
    }

    // Verify the highest priced item in the cart
    async getHighestPricedItemInCart() {
        const itemPrice = await this.cartItemPrice.innerText();
        const price = parseFloat(itemPrice.replace('$', ''));      
        return price;   
    }
}
