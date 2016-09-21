var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var utcPage = require('../lib/utcPage.js');
import {expect} from 'chai';
var driver;
var page;

const TimeOut = 30000; //ms
const PAGE_DOWN = '\ue00f';
const TAB = '\ue004';


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

    test.it('dodanie uzytkownika i sprawdzenie czy pojawi sie na liscie', function() {
      this.timeout(100000);
      page.setText(page.userLastName, 'Romek');

      page.waitToElement(page.mainContainer);
      //var dodawany = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[1]/td/div');
      //page.clickIn(page.saveButton);
      //var listaZiomali = driver.findElements(webdriver.By.xpath('div[contains(@class, "infinite-list-item")]/a/table[contains(@class, "table")]/tbody/tr/td[4]/div'));
      //*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[2]/td/div/div/div[5]/a/table/tbody/tr/td[4]/div

      driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[2]/td/div/div/div[3]/a')).sendKeys(TAB);
      //driver.findElement(webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/button/span')).sendKeys(TAB);
//*[@id="heading-profile"]/div[3]/div/button

      var elem;
      var i = 0;
      var gowno = false;
      while(i<2000)
      {
        driver.switchTo().activeElement().then(function (done) {
            //if(err) console.log('jest zajebioza');
            if(done) gowno= true;
        });
        //driver.sleep(100);
        if(gowno){
          break;
        }
        elem = driver.switchTo().activeElement();
        elem.sendKeys(TAB);
        //driver.sleep(100);
        i++;
      }
    });
});
