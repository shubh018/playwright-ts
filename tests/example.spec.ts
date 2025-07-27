import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test('Validating input field', async ({page}) => {
    await page.locator('//input[@placeholder="What needs to be done?"]').waitFor({state: 'visible'});
  });

  test('Filling text in input field and waiting for element', async ({page}) => {
    await page.locator('//input[@placeholder="What needs to be done?"]').waitFor({state: 'visible'});
    await page.fill('//input[@placeholder="What needs to be done?"]', 'LinkedIn');
    await page.keyboard.press('Enter');
    await page.locator('//label[@data-testid="todo-title"]').waitFor({state: 'visible'});
  });

  test.afterEach(async ({page}) => {
    await page.reload();

  });

});
