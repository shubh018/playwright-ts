import {Page, expect} from '@playwright/test';
import { Admin } from './Admin';

export class Dashboard {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToAdminPage(): Promise<Admin> {
        await this.page.click("//span[text()='Admin']");
        return new Admin(this.page);
    }
}
