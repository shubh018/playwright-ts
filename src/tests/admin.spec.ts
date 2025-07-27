import {test} from '../fixtures/fixtures';
import {Page, expect} from '@playwright/test';  

const JOB_SUBPAGES = [
  'Job Titles',
  'Pay Grades',
  'Employment Status',
  'Job Categories',
  'Work Shifts'
] as const;

const ORG_SUBPAGES = [
  'General Information',
  'Locations',
  'Structure'
] as const;

const QUALIFICATIONS_SUBPAGES = [
  'Skills',
  'Education',
  'Licenses',
  'Languages',
  'Memberships'
] as const;

const CONFIG_SUBPAGES = [
  'Email Configuration',
  'Email Subscriptions',
  'Localization',
  'Language Packages',
  'LDAP Configuration'
] as const;

const VALID_EMPLOYEE_NAME = [
    'FMLName1',
    'Jobinsam@6742',
    'user8331',

]

// let page: Page;

// test.beforeAll(async({loginPage, browser}) => {
//     page = await browser.newPage();
//     loginPage.fillCompleteLoginFormAndSubmit('Admin', 'admin123');
//     await page.locator('//h6[text()="Dashboard"]').waitFor();
// })

test.describe('Search Employee by Employee Details', () => {
    let activeUserUsername: string[];
    let activeUserName: string[];
    
    test.beforeEach(async ({loginPage,adminPage,page}) => {
        loginPage.fillCompleteLoginFormAndSubmit('Admin', 'admin123');
        await page.locator('//h6[text()="Dashboard"]').waitFor();
        await page.click("//span[text()='Admin']");
        activeUserUsername = await adminPage.getActiveUsers();
        activeUserName = await adminPage.getActiveUsers(4);
    })

    test.afterEach('capture screenshot', async({page}, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus){
            await page.screenshot({path: `/Users/shubhamsaxena/Desktop/Plawright-TS/screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`, fullPage: true});
        }
    })

    test('Search Employee by Name', async({adminPage}) => {
        const randomName = activeUserName[Math.floor(Math.random() * activeUserName.length)];
        await adminPage.fillEmployeeName(randomName);
        await adminPage.clickSearch();
        await adminPage.checkEmployeeIsVisible({name: randomName});
    })

    test('Search Employee by Username', async({adminPage}) => {
        const randomName = activeUserUsername[Math.floor(Math.random() * activeUserUsername.length)];
        await adminPage.fillEmployeeUsername(randomName);
        await adminPage.clickSearch();
        await adminPage.checkEmployeeIsVisible({username: randomName});
    })

    test('Search Employee by Role - Admin', async({adminPage}) => {
        await adminPage.fillEmployeeRole('Admin');
        await adminPage.clickSearch();
        await adminPage.checkEmployeeIsVisible({role: 'Admin'});
    })

    test('Search Employee by Role - ESS', async({adminPage}) => {
        await adminPage.fillEmployeeRole('ESS');
        await adminPage.clickSearch();
        await adminPage.checkEmployeeIsVisible({role: 'ESS'});
    })

})