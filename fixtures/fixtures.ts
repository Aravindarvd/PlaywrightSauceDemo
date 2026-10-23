import { test as base } from '@playwright/test'
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from '../pages/InventoryPage'
import { CartPage } from '../pages/CartPage'
import { CheckoutPageComplete } from '../pages/CheckoutPageComplete'
import { CheckoutPageStepOne } from '../pages/CheckoutPageStepOne'
import { CheckoutPageStepTwo } from '../pages/CheckoutPageStepTwo' 

type PageFixtures = {
    loginPage : LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutPageStepOne;
    checkoutStepTwoPage: CheckoutPageStepTwo;
    checkoutCompletePage: CheckoutPageComplete;
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },
    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkoutStepOnePage: async ({page}, use) => {
        const checkoutStepOnePage = new CheckoutPageStepOne(page);
        await use(checkoutStepOnePage);
    },
    checkoutStepTwoPage: async ({page}, use) => {
        const checkoutStepTwoPage = new CheckoutPageStepTwo(page);
        await use(checkoutStepTwoPage);
    },
    checkoutCompletePage: async ({page}, use) => {
        const checkoutCompletePage = new CheckoutPageComplete(page);
        await use(checkoutCompletePage);
    }
});

export { expect } from '@playwright/test'