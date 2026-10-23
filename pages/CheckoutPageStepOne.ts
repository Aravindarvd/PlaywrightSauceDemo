import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutInfo } from '../test-data/checkout';

export class CheckoutPageStepOne extends BasePage{
    constructor( page: Page) {
        super(page);
    }

    get title(): Locator {return this.page.getByText('Checkout: Your Information');}
    get firstName(): Locator {return this.page.getByRole('textbox', { name: 'First Name' });}
    get lastName(): Locator {return this.page.getByRole('textbox', { name: 'Last Name' });}
    get zipCode(): Locator {return this.page.getByRole('textbox', { name: 'Zip/Postal Code' });}
    get continueButton(): Locator {return this.page.getByRole('button', { name: 'Continue' });}
    get errorMessage (): Locator {return this.page.getByRole('alert');}

    async enterCheckoutInfo(info: CheckoutInfo): Promise<void> {
        await this.firstName.fill(info.firstName);
        await this.lastName.fill(info.lastName);
        await this.zipCode.fill(info.zipCode);
        await this.continueButton.click();
    }
}