import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from './components/HeaderComponent';

export class CartPage extends BasePage{
    readonly header: HeaderComponent;

    constructor(page:Page) {
        super(page);
        this.header = new HeaderComponent(page);
    }
    get title():Locator {return this.page.locator('[data-test="title"]');}
    get cartItem(): Locator {return this.page.locator('.cart_item');}
    get cartItemName(): Locator {return this.page.locator('[data-test="inventory-item-name"]');}
    get checkoutButton(): Locator {return this.page.getByRole('button', { name: 'Checkout' });}

    async open(): Promise<void> {
        await this.goto('/cart.html')
    }

    item(cartItemName: string): Locator {
        const item = this.cartItemName.filter({hasText: cartItemName});
        return item;
    }

    async removeItem(cartItemName: string): Promise<void> {
        const item = this.cartItem.filter({has: this.cartItemName.filter({hasText: cartItemName})});
        await item.getByRole("button", {name: 'Remove'}).click();
    }

    async checkoutItems(): Promise<void> {
        await this.checkoutButton.click();
    }

}