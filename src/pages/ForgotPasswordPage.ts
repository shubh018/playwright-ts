import {Page, expect} from '@playwright/test';
import {BasePage} from '../base/BasePage';

export class ForgotPasswordPage extends BasePage {
    constructor(page: Page){
        super(page);
    }

    async fillUsername(username: string){
        await this.page.fill("//input[@name='username']", username);
    }

    async clickResetPassword(){
        await this.page.click("//button[@type='submit']");
    }

    async clickCancel(){
        await this.page.click("//button[@type='button']");
    }
}