var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var utcPage = require('../lib/utcPage.js');
import {expect} from 'chai';
var driver;
var page;

const TimeOut = 30000; //ms


test.before(function() {
    this.timeout(TimeOut);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
    page = new utcPage(driver);
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
    page.clickIn(page.userManagement);
});

test.describe('User Management > Users Test', function() {
    this.timeout(TimeOut);

    test.it('czy nie pozwala zapisac i ustawia focus jesli nie ma wymaganego pola przy dodawaniu', function() {
      this.timeout(TimeOut);
      page.waitToElement(page.mainContainer);
      page.waitToElement(page.mainContainer);
      page.waitToElement(page.addButton);
      page.clickIn(page.addButton);

      page.setText(page.userFirstName, 'Wesoly');
      page.waitToElement(page.mainContainer);
      page.waitToElement(page.mainContainer);
      page.clickIn(page.saveButton);

      page.checkFocusElement(page.userUserName);

      page.setText(page.userUserName, 'Roman3562');
      page.waitToElement(page.mainContainer);
      page.clickIn(page.saveButton);

      page.checkFocusElement(page.userPassword);

      page.setText(page.userPassword, 'fajnehaslo');

      page.waitToElement(page.mainContainer);
      page.clickIn(page.saveButton);

      driver.sleep(1000);
      page.checkFocusElement(page.userLastName);


    });
});
