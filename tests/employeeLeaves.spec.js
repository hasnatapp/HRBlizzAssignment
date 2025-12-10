import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage.js';
import { LeaveRequest } from '../pages/leaveRequest.js';

test.describe.configure({ mode: 'serial' });   // <-- Forces sequential execution



test('TC-01 - Employee request one day leave', async ({ page }) => {

    const username = process.env.EMPLOYEE_USERNAME;
    const password = process.env.EMPLOYEE_PASSWORD;

    const login = new loginPage(page);
    const leave = new LeaveRequest(page);
    
    await login.goToLoginPage();
    await login.emploginEmployee(username, password);
    await leave.requestNewLeave();
    await login.logout();

});


test('TC-02 - Employee request Date Range Leave', async ({ page }) => {

    const username = process.env.EMPLOYEE_USERNAME;
    const password = process.env.EMPLOYEE_PASSWORD;

    const login = new loginPage(page);
    const leave = new LeaveRequest(page);
    
    await login.goToLoginPage();
    await login.emploginEmployee(username, password);
    await leave.rangeRequestleave(9, 12);
    await login.logout();

});