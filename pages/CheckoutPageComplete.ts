import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage';

export class CheckoutPageComplete extends BasePage{
    constructor( page: Page) {
        super(page);
    }

    get title(): Locator {return this.page.getByText('Checkout: Complete!', { exact: true }).first();}
    get orderSuccess(): Locator {return this.page.getByRole('heading', { name: 'Thank you for your order!' });}

}