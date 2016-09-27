var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var utcPage = require('../lib/utcPage.js');
import {expect} from 'chai';
var driver;
const TimeOut = 30000; //ms

test.describe('Test Konsoli Bezpieczenstwa', function(){
        this.timeout(TimeOut);
        var args = process.argv.slice(2);
        var browser = args[0].substring(2);
        if(browser=='edge') browser = 'MicrosoftEdge';
        if(browser=='ie') browser = 'internet explorer';
        driver = new webdriver.Builder()
        .forBrowser(browser)
        .usingServer('http://10.0.100.79:4444/wd/hub/')
        .build();

    test.it('czy po zalogowaniu pojawia sie odpowiednia strona i czy poprawnie wylogowuje', function() {
      this.timeout(TimeOut);
      var page = new utcPage(driver);
      driver.sleep(3000);
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
      var loginUrl = String(page.url + '/#/console');
      driver.getCurrentUrl().then(function(url) {
        assert.equal(loginUrl, url, 'Niepoprawny adres po zalogowaniu');
      });

      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.logout();
      page.waitToElement(page.loginInput);
      driver.getCurrentUrl().then(function(url) {
        assert.equal(page.urlToCheck, url, 'Niepoprawny adres po wylogowaniu');
      });
    });

    test.it('wyswietla sie napis Konsola Bezpieczenstwa w navbarze', function(){
      var page = new utcPage(driver);
      this.timeout(TimeOut);
      page.visit();
      page.waitToElement(page.loginInput);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(page.userManagement);
    	page.getElement(page.navbarHeader).getText().then(function(text){
    		assert.equal(text, 'Konsola Bezpieczeństwa');
    	});
    });

    var page = new utcPage(driver);
    this.timeout(TimeOut);
    page.visit();

    page.waitToElement(page.userManagement);


    test.describe('#User Managment', function(){
		var enabled;

		test.it('-Wyswietla sie',function(){

	    	page.getElement(page.userManagement).getAttribute('class').then(function(text){
	    		enabled = text;
				   expect(text).to.have.string('enabled')
			});

		});

	    it('-jest zablokowany i nie mozna w niego kliknac',function(){

  			if(enabled.indexOf('enabled') !== -1){
  				this.skip();
  			}
  			var appum = webdriver.By.xpath(page.directory+'li[1]'+'/a');
  			page.getElement(appum).getAttribute('title').then(function(text){
  				assert.equal(text, 'This desktop application is unsupported on your operating system or device.');
  			})
  		});
	});

	test.describe('#lvl3 Sample Module', function(){
		var enabled;
		test.it('-Wyswietla sie', function(){

	    	page.getElement(page.level3).getAttribute('class').then(function(text){
	    		 enabled = text;
				   expect(text).to.have.string('enabled')
			  });

		});

	    it('-jest zablokowany i nie mozna w niego kliknac',function(){

  			if(enabled.indexOf('enabled') !== -1){
  				this.skip();
  			}
  			var applvl3 = webdriver.By.xpath(page.directory+'li[2]'+'/a');
  			page.getElement(applvl3).getAttribute('title').then(function(text){
  				assert.equal(text, 'This desktop application is unsupported on your operating system or device.');
  			})
		});
	});

	test.describe('#App Placeholder', function(){
		var enabled;
		test.it('-czy wyswietla sie i czy po kliknieciu w niego pojawia sie popup i czy posiada wszystkie elementy',function(){

	    	page.getElement(page.desktopApp).getAttribute('class').then(function(text){
	    		enabled = text;
				   expect(text).to.have.string('enabled')
			});

      page.clickIn(page.desktopApp);
      page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/span'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/div/button'));
      page.isElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/div/a'));

      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/div/p[1]')).then(function(text) {
        assert.notEqual(text, '', 'blok p jest pusty');
      });
      page.getTxt(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/div/p[2]/small')).then(function(text) {
        assert.notEqual(text, '', 'blok small jest pusty');
      });
      page.clickIn(page.iconClose);
		});

	  it('-jest zablokowany i nie mozna w niego kliknac',function(){

  			if(enabled.indexOf('enabled') !== -1){
  				this.skip();
  			}
  			var appthick  = webdriver.By.xpath(page.directory+'li[3]'+'/a');
  			page.getElement(appthick).getAttribute('title').then(function(text){
  				assert.equal(text, 'This desktop application is unsupported on your operating system or device.');
  			})
		});

	});

	test.describe('#Settings', function(){
		var enabled;
		test.it('-Wyswietla sie',function(){

	    	page.getElement(page.settings).getAttribute('class').then(function(text){
	    		enabled = text;
	    	});

	    	page.getElement(page.settings).getAttribute('class').then(function(text){
	    		enabled = text;
				   expect(text).to.have.string('enabled')
			});

		});

	    it('-jest zablokowany i nie mozna w niego kliknac',function(){

			  if(enabled.indexOf('enabled') !== -1){
				    this.skip();
			  }
			  var appsettings = webdriver.By.xpath(page.directory+'li[4]'+'/a');
			  page.getElement(appsettings).getAttribute('title').then(function(text){
				assert.equal(text, 'This desktop application is unsupported on your operating system or device.');
			})
		});
	});
});

test.after(function() {
    driver.quit();
});
