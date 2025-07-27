import {test} from '../fixtures/fixtures';
import {expect} from '@playwright/test';


test.describe('Valid Login Test @smoke', () => {

    test('Fill username and password', async ({loginPage, page}) => {
        loginPage.fillCompleteLoginFormAndSubmit('Admin', 'admin123')
        await page.locator('//h6[text()="Dashboard"]').waitFor();
    })
    
});

test.describe('Invalid Login Test', () => {

    test('Fill incorrect username', async ({loginPage, page}) => {
        await loginPage.fillUsername('incorrectmail.com');
        await loginPage.fillPassword('admin123');
        await loginPage.clickLoginButton();
        await page.locator('//p[text()="Invalid credentials"]').waitFor({state: 'visible'});
    })

    test('Fill incorrect password', async ({loginPage, page}) => {
        await loginPage.fillUsername('Admin');
        await loginPage.fillPassword('incorrectpassword');
        await loginPage.clickLoginButton();
        await page.locator('//p[text()="Invalid credentials"]').waitFor({state: 'visible'});
    })

    test('Keep username empty', async ({loginPage, page}) => {
        await loginPage.fillPassword('admin123');
        await loginPage.clickLoginButton();
        await page.locator('//span[text()="Required"]').waitFor({state: 'visible'});
    })

    test('Keep password empty', async ({loginPage, page}) => {
        await loginPage.fillUsername('Admin');
        await loginPage.clickLoginButton();
        await page.locator('//span[text()="Required"]').waitFor({state: 'visible'});
    })

    test('Keep both fields empty', async ({loginPage, page}) => {
        await loginPage.clickLoginButton();
        const errorText = await page.locator('//span[text()="Required"]').allTextContents();

        for (const text of errorText){
            expect(text).toBe('Required');
        }
    })
})
