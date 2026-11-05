import { expect, test } from '../../fixtures/fixtures'
import { user } from '../../test-data/users';


test.describe('Login tests', () => {
    test.use({
        storageState: {
            cookies: [],
            origins: []
        }
    });

    test('Logging in as performance glitch user', async ({ page, loginPage }) => {
        test.slow(); //performance_glitch_user has a deliberate ~5 s login delay
        await loginPage.login(
            user.performanceGlitchUser.username,
            user.performanceGlitchUser.password
        );

        await expect(page).toHaveURL(/inventory\.html/);
    });

});

test.describe('Inventory assertions', ()=> {
    test('Product prices(soft)', async({inventoryPage})=>{
        test.fail();
        await inventoryPage.open();
        const backpackPrice = inventoryPage.items
                                           .filter({hasText: 'Sauce Labs Backpack'})
                                           .locator(`[data-test='inventory-item-price']`);
        const bikeLightPrice = inventoryPage.items
                                           .filter({hasText: 'Sauce Labs Bike Light'})
                                           .locator(`[data-test='inventory-item-price']`);
        
        const onesiePrice = inventoryPage.items
                                           .filter({hasText: 'Sauce Labs Onesie'})
                                           .locator(`[data-test='inventory-item-price']`);                                   
        await expect.soft(backpackPrice).toHaveText('$29.99');
        await expect.soft(bikeLightPrice).toHaveText('$9.99');
        await expect.soft(onesiePrice).toHaveText('$8.99');
        await expect(inventoryPage.title).toHaveText('Products');
    });

    test('Cart is stored in localStorage', async({page, inventoryPage})=>{
        await inventoryPage.open();
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect.poll(async()=>{
            return page.evaluate(()=> localStorage.getItem('cart-contents'));
        },{message: 'cart-contents should hold Bike Light (0) then Backpack (4)',
        }).toBe('[0,4]')
    });

    test('Cart badge disappears after removing item', async({inventoryPage})=>{
        await inventoryPage.open();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await expect(inventoryPage.header.cartBadge).toHaveText("1");
        await inventoryPage.removeFromCart('Sauce Labs Backpack');
        await expect(inventoryPage.header.cartBadge).not.toBeVisible();
        await expect(inventoryPage.header.cartBadge).toHaveCount(0);
    })
});