import {BasePage} from '../base/BasePage';
import {Page, expect} from '@playwright/test';
// import {RegistrationPage} from './RegistrationPage';
import {ForgotPasswordPage} from './ForgotPasswordPage';
import { Dashboard } from './Dashboard';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillCompleteLoginFormAndSubmit(username: string, password: string){
        await this.page.fill('//input[@name="username"]', username);
        await this.page.fill('//input[@name="password"]', password);
        await this.page.click('//button[@type="submit"]');
    }

    async fillUsername(username: string) {
        await this.page.fill('//input[@name="username"]', username);
    }

    async fillPassword(password: string) {
        await this.page.fill('//input[@name="password"]', password);
    }

    async clickLoginButton() {
        await this.page.click('//button[@type="submit"]');
    }

    async navigateToForgotPasswordPage(): Promise<ForgotPasswordPage> {
        await this.page.click('//p[text()="Forgot your password? "]');
        return new ForgotPasswordPage(this.page);
    }

}