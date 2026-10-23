import { test, expect } from '../fixtures/fixtures'

test('Logged-in user lands on inventory directly', async ({ inventoryPage }) => {
  await inventoryPage.open();
  await expect(inventoryPage.title).toHaveText('Products');
});

test('Inventory shows 6 products',{tag:'@regression'}, async ({ inventoryPage})=>{
  await inventoryPage.open();
  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.items).toHaveCount(6);
});

test('Cart badge validation',{tag:'@regression'}, async({ inventoryPage})=> {
  await inventoryPage.open();
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await expect(inventoryPage.header.cartBadge).toHaveText('1');
})
