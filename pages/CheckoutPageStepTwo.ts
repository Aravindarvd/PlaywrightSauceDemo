import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class CheckoutPageStepTwo extends BasePage{
    constructor(page: Page){
        super(page);
    }

    get title(): Locator {return this.page.getByText('Checkout: Overview', { exact: true }).first();}
    get cartItem(): Locator {return this.page.locator('.cart_item');}
    get cartItemName(): Locator {return this.page.locator('[data-test="inventory-item-name"]');}
    get finish(): Locator {return this.page.getByRole('button', { name: 'Finish' });}

    item(cartItemName: string) : Locator {
        const item = this.cartItemName.filter({hasText: cartItemName});
        return item;
    }
}