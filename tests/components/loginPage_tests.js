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
    var page = new utcPage(driver);
    this.timeout(TimeOut);
    driver.sleep(3000);
    page.visit();
    driver.sleep(1000);
    driver.getCurrentUrl().then(function(url) {
      if(url != 'http://10.0.100.171:8082/#/') {
        driver.sleep(1000);
        driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li')).click();
        driver.sleep(1000);
        driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[4]')).click();
        driver.sleep(1000);
      }
    });
});

test.describe('Strona logowania', function() {
    this.timeout(TimeOut);

    test.it('czy po wpisaniu blednego hasla pojawia sie "Password failed"', function() {
      this.timeout(TimeOut);
			var page = new utcPage(driver);
	    page.visit();
      driver.sleep(3000);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[2]'));
      driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[2]')).isEnabled(); //obczaic pozniej
    });

    test.it('zbadaj czy w local storage sa odpowiednie wartosci jezyka i informatora', function() {
			var page = new utcPage(driver);
	    page.visit();
      driver.sleep(1000);
      page.fillForm('Jakub', 'Chodorowski', 12, 16);

      page.checkLocalStorage('locale').then(function(value) {
        assert.equal(value, 'pl-PL', 'Bledna wartosc locale w localStorage');
      });

      page.checkLocalStorage('domain').then(function(value) {
        assert.equal(value, 'UX.USERS.TEST', 'Bledna wartosc domain w localStorage');
      });

    });

		test.it('zbadaj czy mozna wyczyscic formularz oraz czy pojawia sie komunikat o obowiazku wypelnienia pol', function() {
      var page = new utcPage(driver);
	    page.visit();
      page.fillForm('Jakub', 'Chodorowski', 12, 16);

      page.cleanUsername();
      page.cleanPassword();

      page.getTxt(page.loginInput).then(function(text) {
        assert.equal(text, '', 'Nie wyczyszczono pola login');
      });

      page.getTxt(page.passwordInput).then(function(text) {
        assert.equal(text, '', 'Nie wyczyszczono pola haslo');
      });

      page.getTxt(page.spanValidationLogin).then(function(text) {
        assert.equal(text, 'This field is required', 'Nie pojawia sie komunikat przy loginie');
      });

      page.getTxt(page.spanValidationPassword).then(function(text) {
        assert.equal(text, 'This field is required', 'Nie pojawia sie komunikat przy hasle');
      });

		});
    test.it('zbadaj czy w input przesuwa sie do gory i ma kolor czerwony', function() {
      var page = new utcPage(driver);
      page.visit();

      page.fillForm('Jakub', 'Chodorowski', 12, 16);

      page.cleanUsername();

      page.driver.findElement(page.loginDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.correctClass)
      });

      page.driver.findElement(page.loginDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.classInvalid)
      });

      page.cleanPassword();

      page.driver.findElement(page.passwordDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.classInvalid)
      });

      page.driver.findElement(page.passwordDiv)
      .getAttribute('class').then(function(text){
        expect(text).to.have.string(page.correctClass)
      });
    });

  test.it('czy w przypadku pustego pola username i password, dostajemy informacje ze pole jest wymagane ?', function() {
    var page = new utcPage(driver);
    page.visit();
    driver.sleep(1000);
    page.clickIn(page.logInButton);
    driver.sleep(1000);
    page.getUserData('//div[contains(@class,"is-invalid")]/span[contains(@class, "validation-message")]').then(function(text){
      assert.equal(text, 'This field is required')
    });
  });

  test.it('czy po uzupelnieniu username , password nadal jest wymagany ?', function(){
   var page = new utcPage(driver);
   driver.sleep(1000);
   page.setText(page.loginInput, 'Sebastian');
   driver.sleep(1000);
   page.getUserData('//section/div[3]/form/div[2]/span[contains(@class, "validation-message")]').then(function(text){
     assert.equal(text, 'This field is required')//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[2]/span[3]
   });
 });
 test.it('czy po uzupelnieniu username i password, znika informacja ze pola sa wymagane ?', function(){

  var page = new utcPage(driver);
  page.setText(page.passwordInput, 'password');
  page.getUserData('//section/div[3]/form/div[1]/span[contains(@class, "validation-message")]').then(function(text){
    assert.equal(text, '')
   });
 });
 test.it('czy panel z Directory i Language jest widoczny bez zadnej poczatkowej interakcji', function(){
   var page = new utcPage(driver);
   page.getElement(page.optionsPanel).getAttribute('aria-hidden').then(function(text){
     assert.equal(text, 'false')
   });
 });
 test.it('czy panel z Directory i Language zostaje ukryty po jego kliknieciu', function(){
   var page = new utcPage(driver);
   page.clickIn(page.moreOptions);
   driver.sleep(1000);
   page.getElement(page.optionsPanel).getAttribute('aria-hidden').then(function(text){
     assert.equal(text, 'true')
   })
   driver.sleep(1000)
   page.clickIn(page.moreOptions);
 });
 test.it('klikniecie zmiany jezyka i sprawdzenie czy placeholdery zmienily jezyk w formularzu', function(){
   var page = new utcPage(driver);

   var usernameLabelOld = page.getElement(page.usernameLabel);
   var passwordLabelOld = page.getElement(page.passwordLabel);

   var usernameLabelNew = page.getTxt(page.usernameLabel);

   page.getTxt(page.usernameLabel).then(function(text) {
     usernameLabelOld = text;
   });

   page.getTxt(page.passwordLabel).then(function(text) {
     passwordLabelOld = text;
   });

   page.chooseLanguage(2); //wybieram English

   driver.sleep(1000);

   page.getTxt(page.usernameLabel).then(function(text) {
     assert.notEqual(text, usernameLabelOld)
   });

   page.getTxt(page.passwordLabel).then(function(text) {
     assert.notEqual(text, passwordLabelOld)
   });

   page.chooseLanguage(16); //wybieram Polski

  });
});

test.afterEach(function() {
    driver.manage().deleteAllCookies();
});

test.after(function() {
    driver.quit();
});
