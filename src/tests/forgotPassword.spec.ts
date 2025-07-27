import {test} from '../fixtures/fixtures';
import {Page, expect} from '@playwright/test';

test.describe('Forgot Password Valid Username', () => {
    test('Fill valid username and click on Reset Password', async ({loginPage, page}) => {
        const forgotPasswordPage = await loginPage.navigateToForgotPasswordPage();
        await forgotPasswordPage.fillUsername('Admin');
        await forgotPasswordPage.clickResetPassword();
        await page.locator('//h6[text()="Reset Password link sent successfully"]').waitFor({state: 'visible'});
    })
})

test.describe('Navigate Back to Login Page', () => {
    test('Click on Cancel Button and navigate back to Login Page', async ({loginPage, page}) => {
        const forgotPasswordPage = await loginPage.navigateToForgotPasswordPage();
        await forgotPasswordPage.clickCancel();
        await expect(page.locator('//button[@type="submit"]')).toBeVisible();
    })
})