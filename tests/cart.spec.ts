import {test, expect} from '../fixtures/fixtures'

test('Logged-in user lands directly on cart page', async({cartPage})=> {
    await cartPage.open();
    await expect(cartPage.title).toHaveText('Your Cart');
});

test.beforeEach(async({inventoryPage, cartPage})=> {
    await inventoryPage.open();
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.header.cartBadge).toHaveText('1');
    await cartPage.open();
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItem).toHaveCount(1);
});

test('An added product appears in the cart',{tag: '@smoke'}, async({ inventoryPage, cartPage})=>{
    await expect(cartPage.item('Sauce Labs Bike Light')).toBeVisible();
});

test('Remove an item from the cart',{tag:'@regression'}, async({inventoryPage, cartPage})=>{
    await cartPage.removeItem('Sauce Labs Bike Light');
    await expect(cartPage.cartItem).toHaveCount(0);
});

