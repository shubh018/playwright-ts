import {Page, expect} from '@playwright/test';
import { error } from 'console';
import { TIMEOUT } from 'dns';

export class Admin{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async fillAllDetails(name: string, username: string, status: string, role: string){
        this.fillEmployeeName(name);
        this.fillEmployeeUsername(username);
        this.fillEmployeeStatus(status);
        this.fillEmployeeRole(role);
        this.checkEmployeeIsVisible({name, username, status, role});
    }

    async fillEmployeeName(name: string){
        await this.page.click("//input[@placeholder='Type for hints...']");
        await this.page.fill("//input[@placeholder='Type for hints...']", name);
        await this.page.click("//span[contains(text(), '" + name + "')]");
    }

    async fillEmployeeUsername(username: string, xpathNum: number = 1){
        await this.page.fill("(//form[@class='oxd-form']//input[@class='oxd-input oxd-input--active'])[" + xpathNum + "]" , username);
    }

    async fillEmployeeStatus(status: string){
        await this.page.selectOption("(//i[contains(@class, 'select-text--arrow')])[2]", status);
    }

    async fillEmployeeRole(role: string){
        await this.page.click("(//div[text()='-- Select --'])[1]");
        await this.page.locator("//div/span[text()='" + role + "']").waitFor({state: 'visible', timeout: 5000});
        await this.page.click("//div/span[text()='" + role + "']");
        await this.page.locator("//div[contains(@class, 'select-text')]//div[text()='" + role + "']").waitFor({state: 'visible'});
    }

    async clickSearch(){
        await this.page.click("//button[text()=' Search ']");
        await this.page.locator('//div[contains(@class, "spinner-container")]').waitFor({ state: 'visible' });
    }

    async checkEmployeeIsVisible({name, username, status, role}: {name?: string, username?: string, status?: string, role?: string}){
        const searchString = name ? name: username ? username : status ? status : role ? role : '';
        await this.page.locator('//div[contains(@class, "spinner-container")]').waitFor({ state: 'detached' });

        if (role || status){
            const uniqueSet = new Set<string>();
            const roleOrStatus = role ? 3: status ? 5: '';
            const userRoleElements = await this.page.locator("(//div[contains(@class, 'table-body')]//div//div[contains(@class, '--with-border')])").count();
            for(let i=1; i<=userRoleElements; i++){
                const rowRole = await this.page.locator("((//div[contains(@class, 'table-body')]//div//div[contains(@class, '--with-border')])[" + i + "]//div[@role='cell'])[" + roleOrStatus + "]//div").textContent();
                uniqueSet.add(rowRole!)
            }

        // Checking if the column values in Role and Status are unique since we have applied a filter
        expect(uniqueSet.size).toBe(1);

        await this.page.locator("//div[contains(text(), '" + searchString + "')]").first().waitFor({timeout: 50000});
        }
    }

    async editEmployee(name: string, username: string, status: string, role: string){
        await this.page.click("//button[@type='button']//i[contains(@class, 'pencil-fill')]");
    }

    async resetResults(){
        await this.page.click("//button[text()=' Reset ']");
    }

    async returnResultRecords(){
        const resultLabelString = await this.page.locator("//span[contains(text(), 'Records Found')]").textContent();
        const match = resultLabelString!.match(/\(([^)]+)\)/);
        const extracted = match ? match[1] : "";
        return extracted;
    }

    async addEmployeeRecord(){
        await this.page.click("//button[text()=' Add ']");
    }

    async saveEmployeeRecord(){
        await this.page.click("//button[text()=' Save ']");
    }

    async cancelSavingEmployeeRecord(){
        await this.page.click("//button[text()=' Cancel ']");
    }

    async clickOnHeaderPages(pageName: string){
        await this.page.click("//span[text()='" + pageName + " ']");
    }

    async navigateToSubpage(pageName: string){
        await this.page.click("//a[text()='" + pageName + "']");
    }

    async validateSubpage(pageName: string){
        await this.page.locator("//h6[contains(text(), '" + pageName + "')]|//h5[contains(text(), '" + pageName + "')]|//p[contains(text(), '" + pageName + "')]")
    }

    async getActiveUsers(xpathNum: number = 2){
        const userElements = await this.page.locator("(//div[contains(@class, 'table-body')]//div//div[contains(@class, '--with-border')])").count();
        const employeeList: string[] = [];

        for (let i = 1; i <=userElements; i++){
            const employeeName = await this.page.locator("((//div[contains(@class, 'table-body')]//div//div[contains(@class, '--with-border')])[" + i + "]//div[@role='cell'])[" + xpathNum + "]//div").textContent();
            if (xpathNum !== 2){
                const firstName = employeeName!.split(" ")[0];
                employeeList.push(firstName!);
            }
            else{
                employeeList.push(employeeName!);
            }
        }

        return employeeList;
    }

}