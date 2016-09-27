var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');

var utcPage = require('../lib/utcPage.js');
import { expect } from 'chai';
var driver;
var page;

const TAB = '\ue004';
const CTRL = '\ue009';
const UP = '\ue013';
const DOWN = '\ue015';
const ENTER = '\ue007';
var Timeout = 30000;

test.before(function(){
    this.timeout(Timeout);
    var args = process.argv.slice(2);
    var browser = args[0].substring(2);
    if(browser=='edge') browser = 'MicrosoftEdge';
    if(browser=='ie') browser = 'internet explorer';
    driver = new webdriver.Builder()
    .forBrowser(browser)
    .usingServer('http://10.0.100.79:4444/wd/hub/')
    .build();
    driver.sleep(1000);
    page = new utcPage(driver);
    driver.sleep(1000);
    page.visit();
    driver.sleep(1000);
    page.waitToElement(webdriver.By.id('app'));
    driver.sleep(1000);
    driver.getCurrentUrl().then(function(url) {
    if(url != page.urlToCheck) {
        page.logout();
      }
    });
    page.waitToElement(webdriver.By.id('app'));
});
test.describe('Find all objects and check attribute', function(){
    var elementHTML = '//a'; //element to find
    var attribute = 'title'; //attribute to find
    var username = 'marcin';
    var password = 'changeme';

        //find all links in login page and verify the title attribute
        test.it('in log-in page', function(){
            this.timeout(Timeout)
            page.findAllElementsAndCheck(elementHTML, attribute);
        });

        //Blok after login. Check all links in console
        test.describe('After login', function(){
            this.timeout(Timeout)
            //login
            test.before(function(){
                page.waitToElement(page.loginInput);
                page.logIn(username, password , 11, 16);
                page.waitToElement(page.userManagement);
            });

            //console page
            test.it('in console page', function(){
                this.timeout(Timeout);
                page.findAllElementsAndCheck(elementHTML, attribute);
            });

            //go to UMM bookmark
           test.before(function(){
                page.clickIn(page.userManagement);
                page.waitToElement(page.navbarHeader);

            });

            //UMM(search in navbar, first view of users list, accordion)
            test.it('in UMM page, Users bookmark, with first view of users list(not all list from database) and accordion', function(){
                this.timeout(Timeout);

                //open accordion
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
                page.waitToElement(page.container);
                //wait to dropdown elements
                page.waitToElement(page.actionDropdown);
                page.clickIn(page.actionDropdown);

                page.findAllElementsAndCheck(elementHTML, attribute);

            });

            test.it('in UMM page, in accordions Directory Accounts after click assign button', function(){
                this.timeout(Timeout);
                page.refresh();
                //open accordion and open assign popup
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
                page.waitToElement(page.userLastName);
                page.clickIn(page.userLastName);
                driver.sleep(500);
                var elem;
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, UP);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(ENTER);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(ENTER);

                //page.waitToElement(page.panelExpanded2); //wait to expanded
                page.waitToElement(page.accordionDirectoryAccountsBtn); //wait to assign button
                page.clickIn(page.accordionDirectoryAccountsBtn); // click assign button
                page.waitToElement(page.assignmentPanelContent); //wait to panel content;
                //page.clickAssignInAccordionBookmark(page.admin, p[age.accordionDirectoryAccounts, page.panelExpanded2, page.accordionDirectoryAccountsBtn, page.assignmentPanelContent)
                page.findAllElementsAndCheck(elementHTML, attribute);

            });

            test.it('in UMM page, in accordions Assign Groups after click assign button', function(){
                this.timeout(Timeout);
                page.refresh();

                //open accordion and open assign popup
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
                page.waitToElement(page.userLastName);
                page.clickIn(page.userLastName);
                driver.sleep(500);
                var elem;
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, UP);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(ENTER);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(ENTER);

                //page.waitToElement(page.panelExpanded2); //wait to expanded
                page.waitToElement(page.accordionUserGroupsAssignBtn); //wait to assign button
                page.clickIn(page.accordionUserGroupsAssignBtn); // click assign button
                page.waitToElement(page.assignmentPanelContent); //wait to panel content;
                //page.clickAssignInAccordionBookmark(page.admin, accordionUserGroups, page.panelExpanded2, page.accordionUserGroupsAssignBtn, page.assignmentPanelContent)
                page.findAllElementsAndCheck(elementHTML, attribute);

            });

        })

});

test.after(function() {
    driver.quit();
});
