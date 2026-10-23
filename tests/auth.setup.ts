import { expect, test as setup } from '../fixtures/fixtures'
import { user } from '../test-data/users'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async({page, loginPage})=>{
    await loginPage.login(user.standard.username,user.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await page.context().storageState({path:authFile});
});