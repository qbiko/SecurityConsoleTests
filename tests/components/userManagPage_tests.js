var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var utcPage = require('../lib/utcPage.js');
import {expect} from 'chai';
var driver;
const TimeOut = 30000; //ms

test.before(function() {
    this.timeout(TimeOut);
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();
});

test.beforeEach(function() {
  var page = new utcPage(driver);
  this.timeout(TimeOut);
  page.visit();

  driver.sleep(1000);
  driver.getCurrentUrl().then(function(url) {
    if(url == 'http://10.0.100.171:8082/#/console') {
      driver.sleep(1000);
      driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li')).click();
      driver.sleep(1000);
      driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[4]')).click();
      driver.sleep(1000);
    }
  });
});

test.describe('User Management i Roles', function() {
    this.timeout(TimeOut);

    test.it('czy w zakladce User Management sa wszystkie elemnty i czy dzialaja poprawnie', function() {
			var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.fillForm('marcin', 'changeme', 11, 16);
			page.clickIn(page.logInButton);
      driver.sleep(1000);
      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.clickIn(page.userManagement);
      driver.sleep(1000);
      page.isElement(page.userDrop);

      page.clickIn(page.userDrop);
      page.isElement(page.myAccount);
      page.isElement(page.help);
      page.isElement(page.about);
      page.isElement(page.logoutButton);

      page.getTxt(page.navbarHeader).then(function(text) {
        assert.equal(text, 'User Management', 'navbar-brand nie zawiera odpowiedniego tytulu');
      });

      page.isElement(page.roles);
      page.getTxt(page.roles).then(function(text) {
        assert.equal(text, 'Roles', 'link roles zawiera nieodpowiedni tekst');
      });

      page.isElement(page.jobFunctions);
      page.getTxt(page.jobFunctions).then(function(text) {
        assert.equal(text, 'Job Functions', 'link job functions zawiera nieodpowiedni tekst');
      });

      page.isElement(page.configuration);
      page.getTxt(page.configuration).then(function(text) {
        assert.equal(text, 'Configuration', 'link configuration zawiera nieodpowiedni tekst');
      });

      page.isElement(page.collapse);
      page.getTxt(page.collapse).then(function(text) {
        assert.equal(text, 'Collapse', 'link collapse zawiera nieodpowiedni tekst');
      });

      page.clickIn(page.collapseLi);
      driver.sleep(1000);
      page.driver.findElement(page.appDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.collapseClass)
      });
      driver.sleep(1000);
      page.clickIn(page.collapseLi);
    });

    test.it('czy zakladka Roles dziala poprawnie', function() {
      var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.fillForm('marcin', 'changeme', 11, 16);
			page.clickIn(page.logInButton);
      driver.sleep(1000);
      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.clickIn(page.userManagement);
      driver.sleep(1000);

      page.clickIn(page.roles);
      driver.sleep(1000);
      page.getTxt(page.moduleTitle).then(function(text) {
        assert.equal(text, 'Roles', 'h2 module title ma bledny tytul');
      });
      driver.sleep(1000);
      page.getTxt(page.addButton).then(function(text) {
        assert.equal(text, 'Add', 'button ADD ma bledny tytul');
      });

      page.clickIn(page.addButton);
      driver.sleep(1000);
      page.isElement(page.addForm);
      page.clickIn(page.closeForm);
      driver.sleep(1000);
      //tu powinno sie sprawdzic czy zamyka formularz dodawania
    });

		test.it('dodawanie nowych roli', function() {
      var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.fillForm('marcin', 'changeme', 11, 16);
			page.clickIn(page.logInButton);
      driver.sleep(1000);
      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.clickIn(page.userManagement);
      driver.sleep(1000);

      page.clickIn(page.roles);
      driver.sleep(1000);

      page.clickIn(page.addButton);
      driver.sleep(1000);
      page.isElement(page.addForm);
      var rola = 'przykladowa rola';
      var opis = 'opis';
      driver.sleep(1000);
      page.setText(page.inputRoleName, rola);
      driver.sleep(1000);
      page.setText(page.textareaRoleDescription, opis);
      driver.sleep(1000);

      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[1]/td/div/table/tbody/tr/td[1]/div')).
      then(function(text) {
        assert.equal(text, rola, 'nazwa roli jest bledna');
      });
      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[1]/td/div/table/tbody/tr/td[2]/div')).
      then(function(text) {
        assert.equal(text, opis, 'opis roli jest bledny');
      });

      page.cleanTextPlace(page.inputRoleName, page.clearRoleName);
      page.getTxt(page.inputRoleName).
      then(function(text) {
        assert.equal(text, '', 'nie wyczyszczono pola role name');
      });
      page.driver.findElement(page.divRoleName)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.classInvalid)
      });

    });

    test.it('sprawdzenie popupa przy wyjsciu podczas dodawania roli i rozwijane funkcje podczas dodawania roli', function() {
      var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.logIn('marcin', 'changeme', 11, 16);
      driver.sleep(1000);
      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.clickIn(page.userManagement);
      driver.sleep(1000);

      page.clickIn(page.roles);
      driver.sleep(1000);

      page.clickIn(page.addButton);
      driver.sleep(1000);

      var rola = 'przykladowa rola';
      var opis = 'opis';
      driver.sleep(1000);
      page.setText(page.inputRoleName, rola);
      page.setText(page.textareaRoleDescription, opis);

      page.clickIn(page.closeForm);

      driver.sleep(1000);
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/span'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[1]'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[2]'));

      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/p[1]')).then(function(text) {
        assert.notEqual(text, '', 'blok p jest pusty');
      });
      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/p[2]/small')).then(function(text) {
        assert.notEqual(text, '', 'blok small jest pusty');
      });

      page.clickIn(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/span'));
      driver.sleep(1000);
      page.clickIn(page.h4Profile);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active')
      });
      driver.sleep(1000);
      page.clickIn(page.h4Profile);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });

      driver.sleep(1000);
      page.clickIn(page.h4JobF);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[2]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });
      driver.sleep(1000);
      page.clickIn(page.h4JobF);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[2]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active')
      });

      driver.sleep(1000);
      page.clickIn(page.h4Users);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[3]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });
      driver.sleep(1000);
      page.clickIn(page.h4Users);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[3]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active')
      });
    });
});

test.afterEach(function() {
    driver.manage().deleteAllCookies();
});

test.after(function() {
    driver.quit();
});
