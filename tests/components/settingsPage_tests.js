var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');
var utcPage = require('../lib/utcPage.js');
import { expect } from 'chai';
var driver;
const TimeOut = 30000;

test.before(function() {
    this.timeout(TimeOut);
    /*
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub/')
    .build();
    */
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
    var page = new utcPage(driver);
    this.timeout(TimeOut);
    page.visit();
    page.waitToElement(webdriver.By.id('app'));
    driver.getCurrentUrl().then(function(url) {
      if(url != page.urlToCheck) {
        page.logout();
      }
    });
    page.waitToElement(page.loginInput);
    page.logIn('marcin', 'changeme', 11, 16);
    page.waitToElement(page.userManagement);
});

test.describe('Test zakladki Settings', function(){

        test.it('Passwords - czy wyswietla sie lista z opcjami po prawej stronie', function(){
            var page = new utcPage(driver);
            page.visit();
            page.clickIn(page.settings);
            page.waitToElement(page.passwordBtn);
            page.clickIn(page.passwordBtn);
            driver.findElement(page.performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });

        test.it('Sessions - czy wyswietla sie lista z opcjami po prawej stronie', function(){
            var page = new utcPage(driver);
            page.visit();
            page.clickIn(page.settings);
            page.waitToElement(page.sessionsBtn);
            page.clickIn(page.sessionsBtn);
            driver.findElement(page.performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });

        test.it('Contact - czy wyswietla sie lista z opcjami po prawej stronie', function(){
            var page = new utcPage(driver);
            page.visit();
            page.clickIn(page.settings);
            page.waitToElement(page.contactBtn);
            page.clickIn(page.contactBtn);
            page.waitToElement(page.performanceContainer);
            driver.findElement(page.performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });
});

test.after(function() {
    driver.quit();
});
