import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly title: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;
    readonly cart: Locator;

    constructor(page: Page) {
        this.page = page;

        // All product cards
        this.inventoryItems = page.locator('.inventory_item');
        this.title = page.locator('.title');
        this.price = page.locator('.inventory_item_price');
        this.addToCartButton = page.getByRole('button', {
                name: 'Add to cart'
            });
            this.cart = page.locator('.shopping_cart_link');
    }

    // Get the page title
    async getPageTitle() {
        return await this.title.innerText();
    }

    // Get the highest priced item from the inventory item list
    async getHighestPricedItem() {
        const itemCount = await this.inventoryItems.count();

        let highestPrice = 0;
        let highestItemIndex = 0;

        for (let i = 0; i < itemCount; i++) {

            const priceText = await this.inventoryItems
                .nth(i)
                .locator(this.price)                
                .innerText();

            const price = parseFloat(priceText.replace('$', ''));

            if (price > highestPrice) {
                highestPrice = price;
                highestItemIndex = i;
            }
        }

        return {
            price: highestPrice,
            index: highestItemIndex
        };
    }

    async clickHighestPricedItem() {

        const highestItem = await this.getHighestPricedItem();

        // Get the highest priced product
        const highestPricedProduct =
            this.inventoryItems.nth(highestItem.index);
            

        // Find Add to cart for the highest priced product and click it
        const addToCartButton =
            highestPricedProduct.locator(this.addToCartButton);

        await addToCartButton.click();

        return highestItem.price;
    }

    async goToCart() {
        return await this.cart.click();
    }
}