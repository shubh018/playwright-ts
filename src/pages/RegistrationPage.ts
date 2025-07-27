import {BasePage} from '../base/BasePage';
import {Page, expect} from '@playwright/test';

export class RegistrationPage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    async fillCompleteRegistrationFormAndSubmit(firstName: string, lastName: string, address: string, city: string, state: string, zipcode: string, ssn: string, phone: number, username: string, password: string, confirmPassword: string) {
        await this.page.fill('//input[@name="customer.firstName"]', firstName);
        await this.page.fill('//input[@name="customer.lastName"]', lastName);
        await this.page.fill('//input[@name="customer.address.street"]', address);
        await this.page.fill('//input[@name="customer.address.city"]', city);
        await this.page.fill('//input[@name="customer.address.state"]', state);
        await this.page.fill('//input[@name="customer.address.zipCode"]', zipcode);
        await this.page.fill('//input[@name="customer.ssn"]', ssn);
        await this.page.fill('//input[@name="customer.phone"]', phone.toString());
        await this.page.fill('//input[@name="customer.username"]', username);
        await this.page.fill('//input[@name="customer.password"]', password);
        await this.page.fill('//input[@name="repeatedPassword"]', confirmPassword);
        await this.page.click('input[type="submit"]');
    }

    async fillFirstName(firstName: string) {
        await this.page.fill('//input[@name="customer.firstName"]', firstName);
    }

    async fillLastName(lastName: string) {
        await this.page.fill('//input[@name="customer.lastName"]', lastName);
    }

    async fillAddress(address: string) {
        await this.page.fill('//input[@name="customer.address.street"]', address);
    }

    async fillCity(city: string) {
        await this.page.fill('//input[@name="customer.address.city"]', city);
    }

    async fillState(state: string) {
        await this.page.fill('//input[@name="customer.address.state"]', state);
    }

    async fillZipCode(zipcode: string) {
        await this.page.fill('//input[@name="customer.address.zipCode"]', zipcode);
    }

    async fillSSN(ssn: string) {
        await this.page.fill('//input[@name="customer.ssn"]', ssn);
    }

    async fillPhone(phone: number) {
        await this.page.fill('//input[@name="customer.phone"]', phone.toString());
    }

    async fillUsername(username: string) {
        await this.page.fill('//input[@name="customer.username"]', username);
    }

    async fillPassword(password: string) {
        await this.page.fill('//input[@name="customer.password"]', password);
    }

    async fillConfirmPassword(confirmPassword: string) {
        await this.page.fill('//input[@name="repeatedPassword"]', confirmPassword);
    }

    async clickSubmitButton() {
        await this.page.click('input[type="submit"]');
    }

}