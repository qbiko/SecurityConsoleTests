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
const CTRL = '\ue009';
const UP = '\ue013';
const DOWN = '\ue015';

var userInfo = [String("Kuba" + Math.floor((Math.random() * 100000) + 1)), String("przecinak" + Math.floor((Math.random() * 100000) + 1)), "Haselko"];
//https://seleniumhq.github.io/selenium/docs/api/py/webdriver/selenium.webdriver.common.keys.html#selenium.webdriver.common.keys.Keys.ENTER

test.before(function() {
    this.timeout(TimeOut);
    var args = process.argv.slice(2);
    var browser = args[0].substring(2);
    driver = new webdriver.Builder()
    .forBrowser(browser)
    //.usingServer('http://localhost:4444/wd/hub/')
    .build();
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

        page.waitToElement(page.successButton);
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
        page.setText(page.keyboardStart, TAB);
        page.clickKey(8, TAB); //button ADD

        page.checkIfUserExist(userInfo[1]);
      });

      test.it('Show details, change username and close user details', function(){
          this.timeout(300000);
          var page = new utcPage(driver);
          page.visit();
          //var elem;

          page.waitToElement(page.loginInput);
          page.waitToElement(page.informatorSelect);
          page.waitToElement(page.languageSelect);
          page.logInKeyboard('marcin', 'changeme', 9, 14);
          page.waitToElement(page.userManagement);
          //page.goToUserMKeyboard();
          page.clickIn(page.userManagement);
          page.waitToElement(page.keyboardStart);

          page.setText(page.keyboardStart, TAB);
          page.clickKey(8, TAB); //button ADD

          //page.showUserDetails(userInfo[1]);
          var usernameToCheck = 'dds8';
          page.showUserDetails(usernameToCheck);

          page.waitToElement(page.userLastName)
          page.clickIn(page.userLastName);
          //driver.sleep(1000);
          driver.findElement(page.userLastName).sendKeys(CTRL, UP);
          //driver.sleep(1000);
          page.clickKey(1, (CTRL, DOWN));
          page.clickKey(1, ENTER);
          //driver.sleep(1000);
          page.clickKey(1, TAB);
          //driver.sleep(100);
          var elem;
          elem = driver.switchTo().activeElement();
          //elem.sendKeys(userInfo[1] + 'nowy');
          elem.sendKeys(usernameToCheck + 'nowy');
          elem.sendKeys(ENTER);

          page.waitToElement(page.saveButton);
          page.setText(page.actionsButton, TAB);
          elem = driver.switchTo().activeElement();
          elem.sendKeys(ENTER);
          page.waitToElement(page.mainContainer);
          driver.navigate().refresh().then(function(){
            page.waitToElement(page.keyboardStart);
            //driver.sleep(1000);
            page.setText(page.keyboardStart, TAB);
            page.clickKey(8, TAB); //button ADD
            //driver.sleep(1000);
            page.checkIfUserExist(usernameToCheck + 'nowy');
          })


      })

    test.it('Set disabled user', function(){
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

        page.setText(page.keyboardStart, TAB);
        page.clickKey(8, TAB); //button ADD

        //page.showUserDetails(userInfo[1]);
        var usernameToCheck = 'dds16';
        page.showUserDetails(usernameToCheck);

        page.waitToElement(page.userLastName)
        page.setText(page.actionsButton, ENTER);
        page.clickKey(1, ENTER);

        page.clickKey(2, TAB);
        page.clickKey(1, ENTER);

        page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div'));
        page.setText(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div'), TAB);
        page.clickKey(1, TAB);
        page.clickKey(1, ENTER);
        driver.sleep(500);
        page.waitToElement(page.mainContainer);
        driver.sleep(500);
        driver.navigate().refresh().then(function(){
          page.waitToElement(page.keyboardStart);

          page.setText(page.keyboardStart, TAB);
          page.clickKey(8, TAB); //button ADD

          page.showUserDetails(usernameToCheck);

          page.waitToElement(page.disabledElement);
          page.getElement(page.disabledElement).getAttribute('class').then(function(classToCheck){
            assert.equal(classToCheck, page.disabledClass, 'element not contains valid class');
          })
        })


    })
    test.it('Go to Job Functions and add several Permissions to any Job Function', function(){
        this.timeout(300000);
        var page = new utcPage(driver);
        page.visit();

        page.waitToElement(page.loginInput);
        page.waitToElement(page.informatorSelect);
        page.waitToElement(page.languageSelect);
        page.logInKeyboard('marcin', 'changeme', 9, 14);
        page.waitToElement(page.userManagement);

        page.clickIn(page.userManagement);
        page.waitToElement(page.keyboardStart);
        page.goToJobFuncKeyboard();
        page.waitToElement(page.keyboardStart);

        page.setText(page.keyboardStart, TAB);
        page.clickKey(8, TAB); //button ADD

        page.findAndGoToJobFunc('b_11');
        driver.sleep(500);
        page.waitToElement(page.jobName);
        page.clickIn(page.jobName);
        driver.sleep(500);
        var elem;
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, UP);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(TAB);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);

        page.chooseJobFunction(3);

        page.chooseJobFunction(5);

        page.chooseJobFunction(4);

        page.setText(page.actionsButton, TAB);

        page.clickKey(1, TAB);
        page.clickKey(1, ENTER);

        page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/section/form/div[2]/div/div[1]/div'));
        page.setText(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/section/form/div[2]/div/div[1]/div'), TAB);
        page.clickKey(1, TAB);
        page.clickKey(1, ENTER);
        driver.sleep(500);
    })

    test.it('Log out', function(){
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
