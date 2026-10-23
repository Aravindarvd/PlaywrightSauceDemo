import {test, expect} from '../fixtures/fixtures'
import { checkoutInfo } from '../test-data/checkout';
import { checkoutErrors } from '../test-data/messages';

test.beforeEach(async({inventoryPage, cartPage})=> {
    await inventoryPage.open();
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.header.cartBadge).toHaveText('1');
    await cartPage.open();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItem).toHaveCount(1);
});

test('Place order for any one of the product from inventory',{tag:'@smoke'}, async({cartPage,checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(checkoutStepOnePage.title).toBeVisible();
    await checkoutStepOnePage.enterCheckoutInfo(checkoutInfo);
    await expect(checkoutStepTwoPage.title).toBeVisible();
    await expect(checkoutStepTwoPage.item('Sauce Labs Bike Light')).toBeVisible();
    await checkoutStepTwoPage.finish.click();
    await expect(checkoutCompletePage.title).toBeVisible();
    await expect(checkoutCompletePage.orderSuccess).toBeVisible();
});

test('Empty username throws error message in checkout stepone',{tag:'@regression'}, async({cartPage,checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
    await cartPage.checkoutButton.click();
    await expect(checkoutStepOnePage.title).toBeVisible();
    await checkoutStepOnePage.enterCheckoutInfo({
        ...checkoutInfo,
        firstName: ''
    });
    await expect(checkoutStepOnePage.errorMessage).toHaveText(checkoutErrors.firstNameRequired);

});