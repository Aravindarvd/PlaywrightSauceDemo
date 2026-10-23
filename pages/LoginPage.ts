import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
    
    get username() : Locator { return this.page.getByRole('textbox', { name: 'Username' }); }
    get password() : Locator { return this.page.getByRole('textbox', { name: 'Password' }); }
    get loginButton() : Locator { return this.page.getByRole('button', {name: 'Login'}); }
    get loginErrorMessage() : Locator { return this.page.getByRole('alert').filter({hasText: 'Epic sadface'}); }

    async open(): Promise<void> {
        await this.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    
}