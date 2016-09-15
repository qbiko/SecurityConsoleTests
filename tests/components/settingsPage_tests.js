var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');
var utcPage = require('../lib/utcPage.js');
import { mount } from 'enzyme';
import { expect } from 'chai';
var link = 'http://10.0.100.171:8082/#/settings/system';
var driver;

var passwordBtn = webdriver.By.xpath('//a[contains(@title, "Passwords")]');
var sessionsBtn = webdriver.By.xpath('//a[contains(@title, "Sessions")]');
var contactBtn = webdriver.By.xpath('//a[contains(@title, "Contact")]');

var performanceContainer = webdriver.By.xpath('//div[contains(@class, "list-with-panel-panel-container")]');
var performanceH3 = webdriver.By.xpath('//*[@id="heading-profile"]/div[1]/h3[contains(@class, "panel-title side-panel-title")]');
const TimeOut = 30000;

test.before(function() {
    this.timeout(TimeOut);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
    var page = new utcPage(driver);
    this.timeout(TimeOut);
    page.visit();
    page.waitToElement(webdriver.By.id('app'));
    driver.getCurrentUrl().then(function(url) {
      if(url != 'http://10.0.100.171:8082/#/') {
        driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li')).click();
        driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[4]')).click();
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
            page.waitToElement(passwordBtn);
            page.clickIn(passwordBtn);
            driver.findElement(performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });

        test.it('Sessions - czy wyswietla sie lista z opcjami po prawej stronie', function(){
            var page = new utcPage(driver);
            page.visit();
            page.clickIn(page.settings);
            //driver.sleep(1000);
            page.waitToElement(sessionsBtn);
            page.clickIn(sessionsBtn);
            driver.findElement(performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });

        test.it('Contact - czy wyswietla sie lista z opcjami po prawej stronie', function(){
            var page = new utcPage(driver);
            page.visit();
            page.clickIn(page.settings);
            //driver.sleep(1000);
            page.waitToElement(contactBtn);
            page.clickIn(contactBtn);
            page.waitToElement(performanceContainer);
            driver.findElement(performanceContainer).isDisplayed().then(function(text){
                assert.equal(text, true);
            })
        });
});

test.after(function() {
    driver.quit();
});
