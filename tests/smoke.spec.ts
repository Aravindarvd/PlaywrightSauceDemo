import { expect, test } from '../fixtures/fixtures'

test("Homepage loads with correct title",{ tag: '@smoke' },async ({page, loginPage}) =>{
    await expect(page).toHaveTitle("Swag Labs");
})