import {test, expect} from '../../fixtures/fixtures'

test('Get the price of sauce backpack',async({page, inventoryPage})=>{
    await inventoryPage.open();
    const backpackPrice = page.locator('[data-test="inventory-item-description"]')
                              .filter({hasText: 'Sauce Labs Backpack'})
                              .locator('[data-test="inventory-item-price"]');
    await expect(backpackPrice).toHaveText("$29.99")
    console.log(`The price of the backpack is ${await backpackPrice.innerText()}`);

    const backpackCost = page.locator('//div[@data-test="inventory-item-description"][.//div[text()="Sauce Labs Backpack"]]//div[@data-test="inventory-item-price"]')
    await expect(backpackCost).toHaveText("$29.99")
    console.log(`The price of the backpack is ${await backpackCost.innerText()}`);

    const backpackPriceByText = page.locator('[data-test="inventory-item"]')
                                    .filter({ has: page.getByText('Sauce Labs Backpack', { exact: true }) })
                                    .getByText(/^\$\d+\.\d{2}$/);
    await expect(backpackPriceByText).toHaveText('$29.99');
});

test('Sorting the products', async({page, inventoryPage})=>{
    await inventoryPage.open();
    const sortDropDown =  page.getByRole('combobox', {name: 'Sort products'});
    await sortDropDown.selectOption("Price (low to high)");
    const firstProduct = page.locator('[data-test="inventory-item-price"]').first();
    await expect(firstProduct).toHaveText("$7.99")
    console.log(`The price of the backpack is ${await firstProduct.innerText()}`);
});

test('Finding the product using the price', async({page, inventoryPage})=>{
    await inventoryPage.open();
    const product = page.locator('[data-test="inventory-item-description"]')
                              .filter({ has: page.locator('[data-test="inventory-item-price"]')
                                                 .filter({ hasText: '$9.99' })})
                              .locator('[data-test="inventory-item-name"]');
    await expect(product).toHaveText('Sauce Labs Bike Light');
});

test('Finding products with name Sauce lab', async({page, inventoryPage})=>{
    await inventoryPage.open();
    const products = page.locator('[data-test="inventory-item-name"]')
                               .filter({hasText: 'Sauce Labs'});
    await expect(products).toHaveCount(5);
});

test('Testing the Locator for Add to cart', async({page, inventoryPage})=>{
    await inventoryPage.open();
    // const addToCart = await page.getByRole('button', { name: 'Add to cart' });
    const sauceBackPack = page.locator('[data-test="inventory-item"]')
                          .filter({hasText: 'Sauce Labs Backpack'});
    const addToCart = sauceBackPack.getByRole("button", {name: "Add to cart"});
    await addToCart.click();
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    const removeButton =sauceBackPack.getByRole('button', { name: 'Remove' });
    await expect(cartBadge).toHaveText('1');
    await expect(removeButton).toBeVisible();
});