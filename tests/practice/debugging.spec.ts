import {test, expect} from '../../fixtures/fixtures'

test('Pause in cart', async({page, inventoryPage})=> {
  await inventoryPage.open();
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.header.openCart();
})