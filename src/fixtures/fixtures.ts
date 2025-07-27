import {Page, test as baseTest} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {ForgotPasswordPage} from '../pages/ForgotPasswordPage';
import {RegistrationPage} from '../pages/RegistrationPage';
import { Admin } from '../pages/Admin';

type FixtureTypes = {
    loginPage: LoginPage;
    forgotPasswordPage: ForgotPasswordPage;
    regitrationPage: RegistrationPage;
    adminPage: Admin;
}

export const test = baseTest.extend<FixtureTypes>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await use(loginPage);
    },
    forgotPasswordPage: async ({page}, use) => {
        const forgotPasswordPage = new ForgotPasswordPage(page);
        await use(forgotPasswordPage);
    },
    regitrationPage: async ({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
    adminPage: async ({page}, use) => {
        const adminPage = new Admin(page);
        await use(adminPage);
    }
});