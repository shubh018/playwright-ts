import {Page, expect} from '@playwright/test';

export class BasePage{
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }
    
    async goto(url: string){
        await this.page.goto(url);
    }

    async expectTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }
}