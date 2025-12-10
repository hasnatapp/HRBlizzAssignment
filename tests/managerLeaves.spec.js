import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { LeaveRequest } from '../pages/leaveRequest';
test.describe.configure({ mode: 'serial' });   // <-- Forces sequential execution


test('TC-01 - Sick leave requested', async ({ page }) => {
  
  // login

  const username = process.env.MANAGER_USERNAME;
  const password = process.env.MANAGER_PASSWORD;

  const login = new loginPage(page);
  const leavePage = new LeaveRequest(page);


  await login.goToLoginPage();
  await login.loginManager(username, password);
  await page.waitForTimeout(10000);
  await expect(page.locator('#leaves-webapp')).toContainText('My leaves');
  await page.waitForTimeout(2000);

  // Leave request flow
  await leavePage.clickRequestNewLeave();
  await leavePage.selectLeaveType();
  await leavePage.selectDate();
  await leavePage.submitLeave();
  await page.waitForTimeout(5000);
  await leavePage.verifyAutoApprovalMessage();
  await leavePage.openSickLeavePage();
  await leavePage.verifyLeaveStatusApproved();
  await leavePage.logout();

});

test('TC-02 - Sick leave Modified', async ({ page }) => {

  // login

    const username = process.env.MANAGER_USERNAME;
    const password = process.env.MANAGER_PASSWORD;

    const login = new loginPage(page);
    const leavePage = new LeaveRequest(page);  
  
    await login.goToLoginPage();
    await login.loginManager(username, password);
    await page.waitForTimeout(3000);
   
    // Open Approved tab
    await page.waitForTimeout(3000);
    await leavePage.openApprovedTab();

    // Modify Leave
    await page.waitForTimeout(3000);
    await leavePage.modifyLeave();

    //Verify modified leave
    await page.waitForTimeout(3000);
    await leavePage.verifyUpdatedRow();

    // Logout 
    await page.waitForTimeout(3000);
    await leavePage.logout();
});

test('TC-03 - Sick leave Cancelled', async ({ page }) => {

  // login

    const username = process.env.MANAGER_USERNAME;
    const password = process.env.MANAGER_PASSWORD;

    const login = new loginPage(page);
    const leavePage = new LeaveRequest(page);  
  
    await login.goToLoginPage();
    await login.loginManager(username, password);
    await page.waitForTimeout(3000);

    // Cancel Leave
    await leavePage.cancelLeave();
    await page.waitForTimeout(3000);

    // Verify cancellation success
    await leavePage.verifyCancellationSuccess();

    // Logout
    await page.waitForTimeout(3000);
    await leavePage.logout();

});