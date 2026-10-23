import { expect, test } from '../fixtures/fixtures'
import { user } from '../test-data/users';
import { loginErrors } from '../test-data/messages';

test.describe('Login',() => {
    test.use({ storageState: { cookies: [], origins: [] } });
    
    test('Valid users can login', {tag: '@smoke'},async ({page, loginPage}) => {
                
        await loginPage.login(user.standard.username,user.standard.password);
        await expect(page).toHaveURL(/inventory\.html/);
    });

    const negativeTestCases = [
        {name: 'Locked out user', user: user.lockedOutUser, error: loginErrors.lockedOut},
        {name: 'Invalid credentials', user: user.invalidPassword, error: loginErrors.invalidCredentials},
        {name: 'Missing username', user: user.missingUsername, error: loginErrors.usernameRequired}
    ];

    for(const{name,user,error} of negativeTestCases){
        test(`${name} sees an error`,{tag: '@regression'}, async ({page, loginPage}) => {
        await loginPage.login(user.username, user.password);
        await expect(loginPage.loginErrorMessage).toBeVisible();
        await expect(loginPage.loginErrorMessage).toHaveText(error);
        await expect(page).not.toHaveURL(/inventory\.html/);
        });
    };

});