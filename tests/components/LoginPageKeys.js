var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');
var utcPage = require('../lib/utcPage.js');
import { expect } from 'chai';
var driver;
var testowa;
var userList;

const TimeOut = 30000; //ms
const ENTER = '\ue007';
const TAB = '\ue004';
const ARROW_DOWN = '\ue015';
const PAGE_DOWN = '\ue00f';

var userInfo = [String("Kuba" + Math.floor((Math.random() * 100000) + 1)), String("przecinak" + Math.floor((Math.random() * 100000) + 1)), "Haselko"];
//https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.ENTER

test.before(function() {
    this.timeout(TimeOut);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
});

test.beforeEach(function() {
  var page = new utcPage(driver);
  this.timeout(TimeOut);
  page.visit();
  page.waitToElement(webdriver.By.id('app'));
  driver.getCurrentUrl().then(function(url) {
    if(url != page.urlToCheck) {
      page.logoutKeyboard();
    }
  });
  page.waitToElement(page.loginInput);
});

test.describe('Accessibility - only keyboard', function(){
  this.timeout(TimeOut);
    test.it('Log in', function(){
        this.timeout(TimeOut);
        var page = new utcPage(driver);
        page.visit();

        page.waitToElement(page.loginInput);
        page.waitToElement(page.informatorSelect);
        page.waitToElement(page.languageSelect);
        page.logInKeyboard('marcin', 'changeme', 9, 14);

        page.waitToElement(page.userManagement);
        var loginUrl = String(page.url + '/#/console');
        driver.getCurrentUrl().then(function(url) {
          assert.equal(loginUrl, url, 'Niepoprawny adres po zalogowaniu');
        });
    })
    test.it('Add new user', function(){
        this.timeout(TimeOut);
        var page = new utcPage(driver);
        page.visit();

        page.waitToElement(page.loginInput);
        page.waitToElement(page.informatorSelect);
        page.waitToElement(page.languageSelect);
        page.logInKeyboard('marcin', 'changeme', 9, 14);
        page.waitToElement(page.userManagement);
        //page.goToUserMKeyboard();
        page.clickIn(page.userManagement);
        page.waitToElement(page.keyboardStart);
        page.addNewUserKeyboard(userInfo[0], userInfo[1], userInfo[2]);

        page.waitToElement(webdriver.By.className('btn btn-success'));
    })
    test.it('Check if user is on the list', function(){
        this.timeout(300000);
        var page = new utcPage(driver);
        page.visit();

        page.waitToElement(page.loginInput);
        page.waitToElement(page.informatorSelect);
        page.waitToElement(page.languageSelect);
        page.logInKeyboard('marcin', 'changeme', 9, 14);
        page.waitToElement(page.userManagement);
        //page.goToUserMKeyboard();
        page.clickIn(page.userManagement);
        page.waitToElement(page.keyboardStart);
        //page.checkAllUsers();
        page.setText(page.keyboardStart, TAB);
        var elem, stop = false, i = 2;
        page.clickKey(8, TAB);
        elem = driver.switchTo().activeElement(); //button ADD

        page.checkIfAddUser(userInfo[1]);
      });

    test.it('Log out', function(){
        this.timeout(TimeOut);
        var page = new utcPage(driver);
        page.visit();

        page.waitToElement(page.loginInput);
        page.logInKeyboard('marcin', 'changeme', 9, 14);
        page.waitToElement(page.userManagement);
        //page.goToUserMKeyboard();
        page.clickIn(page.userManagement);
        page.waitToElement(page.keyboardStart);

        page.logoutKeyboard();
        page.waitToElement(page.loginInput);
        driver.getCurrentUrl().then(function(url) {
          assert.equal(page.urlToCheck, url, 'Niepoprawny adres po wylogowaniu');
        });

    })

});
test.after(function() {
    //console.log(testowa);
});
