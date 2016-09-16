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

  page.waitToElement(webdriver.By.id('app'));
  driver.getCurrentUrl().then(function(url) {
    if(url != page.urlToCheck) {
      page.logout();
    }
  });
  page.waitToElement(page.loginInput);
});

test.describe('User Management i Roles', function() {
    this.timeout(TimeOut);

    test.it('czy w zakladce User Management sa wszystkie elemnty i czy dzialaja poprawnie', function() {
			var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(page.userManagement);
      page.clickIn(page.userManagement);

      page.waitToElement(page.userDrop);
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

      page.waitToElement(page.appDiv);
      page.driver.findElement(page.appDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.collapseClass)
      });
      page.waitToElement(page.appDiv);
      page.clickIn(page.collapseLi);
    });

    test.it('czy zakladka Roles dziala poprawnie', function() {
      var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.waitToElement(page.loginInput);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(page.userManagement);
      page.clickIn(page.userManagement);

      page.waitToElement(page.roles);
      page.clickIn(page.roles);
      page.waitToElement(page.moduleTitle);
      page.getTxt(page.moduleTitle).then(function(text) {
        assert.equal(text, 'Roles', 'h2 module title ma bledny tytul');
      });
      page.waitToElement(page.addButton);
      page.getTxt(page.addButton).then(function(text) {
        assert.equal(text, 'Add', 'button ADD ma bledny tytul');
      });

      page.clickIn(page.addButton);
      page.waitToElement(page.addForm);
      page.isElement(page.addForm);
      page.clickIn(page.closeForm);
      //tu powinno sie sprawdzic czy zamyka formularz dodawania
    });

		test.it('dodawanie nowych roli', function() {
      var page = new utcPage(driver);
      this.timeout(TimeOut);
	    page.visit();
      page.waitToElement(page.loginInput);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.userManagement);
      page.clickIn(page.userManagement);

      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.roles);
      page.clickIn(page.roles);

      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.addButton);
      page.clickIn(page.addButton);

      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.addForm);
      page.isElement(page.addForm);
      var rola = 'przykladowa rola';
      var opis = 'opis';

      page.setText(page.inputRoleName, rola);
      page.setText(page.textareaRoleDescription, opis);


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
      page.waitToElement(page.loginInput);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(page.userManagement);
      page.clickIn(page.userManagement);

      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.roles);
      page.clickIn(page.roles);

      page.waitToElement(webdriver.By.id('app'));
      page.waitToElement(page.addButton);
      page.clickIn(page.addButton);

      var rola = 'przykladowa rola';
      var opis = 'opis';
      page.waitToElement(page.inputRoleName);
      page.setText(page.inputRoleName, rola);
      page.setText(page.textareaRoleDescription, opis);
      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.closeForm);

      page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]'));
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

      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.h4Profile);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active')
      });
      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.h4Profile);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });

      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.h4JobF);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[2]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });
      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.h4JobF);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[2]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active')
      });

      page.waitToElement(webdriver.By.id('app'));
      page.clickIn(page.h4Users);
      page.driver.findElement(webdriver.By.xpath('//*[@id="role-details-accordion"]/div[3]'))
      .getAttribute('class').then(function(text){
        expect(text).to.have.string('panel panel-default panel-active panel-expanded')
      });
      page.waitToElement(webdriver.By.id('app'));
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
