const { expect } = require('@playwright/test');
export class LeaveRequest {

    constructor(page) {
        this.page = page;

        // Buttons & Actions
        this.requestNewLeaveBtn = page.getByRole('button', { name: 'Request new leave' });
        this.selectLeaveTypeDropdown = page.getByText('Select');
        this.submitApproveBtn = page.locator('[data-test="submit-approve"]');
        this.primaryActionBtn = page.locator('[data-test="primary-action-button"]');

        // Alerts
        this.alertMessage = page.getByRole('alert');

        // Leave Links
        this.sickLeaveLink = page.getByRole('link', { name: 'Sick leave' });

        // Status
        this.leaveStatus = page.locator("[id^='request-'][id$='-status']");


        // Navigation / Logout
        this.profileMenu = page.locator('#navigation').getByText('Tony Andrews');
        this.logoutBtn = page.locator('div').filter({ hasText: /^Sign out$/ });
        this.loginWelcomeText = page.locator('#loginpad-webapp');

        ///////////////////////////////////////////////////////////////////////////////////////////////////

        // Tabs & Buttons
        this.approvedLink = page.getByRole('link', { name: 'Approved' });
        this.closeButton = page.locator('[data-test="close-button"]');
        this.modifyLeaveButton = page.locator('[data-test="modify-leave"]');
        this.submitModificationButton = page.locator('[data-test="submit-leave-modification"]');
        this.primaryButton = page.locator('[data-test="primary-action-button"]');
        this.cancelLeaveButton = page.locator('[data-test="cancel-leave"]');

        // Alerts & Table
        this.toastAlert = page.getByRole('alert');
        this.leaveTable = page.locator('#tableBody-mercansTable-32');

        // Static locators you provided (NO dynamic handling)
        this.approvedStatus = page.locator('#request-279540-status');
        this.updatedRow = page.locator('//span[normalize-space()="Approved"]');

        // Calendar dates (static as per your example)
        this.date_02 = page.locator('[id="2025-12-02"]').getByText('2', { exact: true });

        // Logout
        this.logoutButton = page.locator('[data-test="logout"]'); // Adjust if needed

        /////// Oss

        // Locators
        this.requestNewLeaveBtn = page.getByRole('button', { name: 'Request new leave' });
        this.selectDate = page.locator('[id="2025-12-04"]').getByText('4');
        this.submitApproveBtn = page.locator('[data-test="submit-approve"]');
        this.primaryActionBtn = page.locator('[data-test="primary-action-button"]');
        this.alertMessage = page.getByRole('alert');

        this.requestLeaveButton = page.getByRole('button', { name: 'Request new leave' });
        this.submitApproveButton = page.locator('[data-test="submit-approve"]');
        this.primaryActionButton = page.locator('[data-test="primary-action-button"]');

        ////// oss
    }

    async openApprovedTab() {
        // Close modal if visible
        const modal = this.page.locator('#ess-leaveRequest-modal');
        if (await modal.isVisible()) {
            await this.closeButton.click();
            await modal.waitFor({ state: 'hidden' });
        }

        // Close auto-approval alert drawer if present
        const alertDrawer = this.page.locator('#dialog');
        if (await alertDrawer.isVisible()) {
            await this.page.getByRole('button', { name: 'Open request' }).click();
            await alertDrawer.waitFor({ state: 'hidden' });
        }

        // NOW safe to click Approved tab
        await this.approvedLink.click();
    }

    async modifyLeave() {
        await this.modifyLeaveButton.click();
        await this.date_02.click();
        await this.date_02.click();
        await this.submitModificationButton.click();
        await this.primaryButton.click();
    }

    async verifyUpdatedRow() {
        await expect(this.updatedRow).toContainText('Approved');
    }

    async cancelLeave() {
        await this.approvedLink.click();
        await this.cancelLeaveButton.click();
        await this.primaryButton.click();
    }

    async verifyCancellationSuccess() {
        await expect(this.toastAlert).toContainText('Request has been auto approved!');

    }

    async logout() {
        await this.logoutButton.click();
    }
    
    async clickRequestNewLeave() {
        await this.requestNewLeaveBtn.click();
    }

    async selectLeaveType() {
        await this.selectLeaveTypeDropdown.click();
        await this.page.locator('#request-type-657').click(); // Annual leave type
    }

    async selectDate() {
        // Click start and end date (same date twice)
        await this.page.locator('[id="2025-12-01"]').getByText('1', { exact: true }).click();
        await this.page.locator('[id="2025-12-01"]').getByText('1', { exact: true }).click();
    }

    async submitLeave() {
        await this.submitApproveBtn.click();
        await this.primaryActionBtn.click();
    }

    async verifyAutoApprovalMessage() {
        await expect(this.alertMessage).toContainText('Request has been auto approved!');
    }

    async openSickLeavePage() {
        await this.sickLeaveLink.click({ timeout: 10000 });
        await this.page.waitForTimeout(3000);
    }

    async verifyLeaveStatusApproved() {
        await expect(this.leaveStatus).toContainText('Approved');
    }

    async logout() {
        await this.profileMenu.click();
        await this.logoutBtn.click();
        await expect(this.loginWelcomeText).toContainText('Welcome to HR Blizz acceptance');
    }

    // Actions
    async requestNewLeave() {
        await this.requestNewLeaveBtn.click();
        await this.selectDate.dblclick();
        await this.submitApproveBtn.click();
        await this.primaryActionBtn.click()
    }

    async rangeRequestleave(startDay, endDay) {
        await this.requestLeaveButton.click();
        await this.page.getByText(startDay.toString(), { exact: true }).click();
        await this.page.getByText(endDay.toString(), { exact: true }).click();
        await this.submitApproveButton.click();
        await this.primaryActionButton.click();

    }
}