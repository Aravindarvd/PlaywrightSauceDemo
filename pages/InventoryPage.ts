import {Page, Locator} from '@playwright/test'
import { BasePage } from './BasePage'
import { HeaderComponent } from './components/HeaderComponent'

export class InventoryPage extends BasePage {
    readonly header: HeaderComponent;
    
    constructor(page:Page){
        super(page);
        this.header = new HeaderComponent(page);
    }

    get title():Locator {return this.page.locator('[data-test="title"]');}
    get items():Locator {return this.page.locator('[data-test="inventory-item"]');}

    async open(): Promise<void> {
        await this.goto('/inventory.html');
    }

    async addToCart(productName: string): Promise<void> {
        await this.items.filter({hasText: productName})
                        .getByRole("button", {name: "Add to cart"})
                        .click();
    }
}