const { expect } = require('@playwright/test');
exports.loginPage = class loginPage{

    constructor (page) {

        this.page = page;
        
        this.userNameInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = '[data-test="perform-login"]';
        this.requestButton = page.getByRole('button', { name: 'Request new leave' });

        // OSS

        this.userNameInput = 'input[name="email"]';
        this.passwordInput = 'input[name="password"]';
        this.loginButton = '[data-test="perform-login"]';
        this.profileIcon = this.page.locator('#navigation').getByText('AC', { exact: true });
        this.signOutButton = this.page.locator('div').filter({ hasText: /^Sign out$/ });

    }

    async goToLoginPage(){
        await this.page.goto("https://access.hrblizz.dev/login");
    }

    async loginManager(username, password) {
        
        await this.page.locator(this.userNameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
        

    }

    async leaveRequest(){
        await this.requestButton.click();

    }

    async loginEmployee(username, password) {
        
        await this.page.locator(this.userNameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();

    }

    // OSS methods

    async emploginEmployee(username, password) {
        
        await this.page.locator(this.userNameInput).fill(username);
      
        await this.page.locator(this.passwordInput).fill(password);
      
        await this.page.locator(this.loginButton).click();

    }

    async logout() {

        await this.profileIcon.waitFor({ state: 'visible', timeout: 10000 });
        await this.profileIcon.click();
        await this.signOutButton.waitFor({ state: 'visible', timeout: 10000 });

        
        await Promise.all([
            this.page.waitForURL('**/login', { timeout: 20000 }),
            this.signOutButton.click()
        ]);

        
        await this.page.waitForLoadState('networkidle');
    }


}
