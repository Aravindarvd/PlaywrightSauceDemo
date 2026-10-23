import { Page, Locator } from '@playwright/test'

export class HeaderComponent {
    constructor(private readonly page: Page) {}

    get cartLink() : Locator {return this.page.locator('[data-test="shopping-cart-link"]');}
    get cartBadge() : Locator {return this.page.locator('[data-test="shopping-cart-badge"]');}

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

}