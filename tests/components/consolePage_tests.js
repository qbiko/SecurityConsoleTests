var assert = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var utcPage = require('../lib/utcPage.js');
import {expect} from 'chai';
import React from 'react';
import { mount } from 'enzyme';
var driver;
var url;
const TimeOut = 30000; //ms

test.describe('Test Konsoli Bezpieczenstwa', function(){
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.edge()).
        build();

    test.it('czy po zalogowaniu pojawia sie odpowiednia strona i czy poprawnie wylogowuje', function() {
			var page = new utcPage(driver);
      this.timeout(TimeOut);
      driver.sleep(3000);
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
      driver.sleep(1000);
      page.logIn('marcin', 'changeme', 11, 16);
      driver.sleep(1000);
      driver.getCurrentUrl().then(function(url) {
        assert.equal('http://10.0.100.171:8082/#/console', url, 'Niepoprawny adres po zalogowaniu');
      });

      var currentUrl;
      page.getUrl().then(function(text) {
          currentUrl = text.toString();
        });
      page.url = currentUrl;
      page.logout();
      driver.sleep(1000);
      driver.getCurrentUrl().then(function(url) {
        assert.equal('http://10.0.100.171:8082/#/', url, 'Niepoprawny adres po wylogowaniu');
      });
    });

    test.it('wyswietla sie napis Konsola Bezpieczenstwa w navbarze', function(){
      var page = new utcPage(driver);
      this.timeout(TimeOut);
      page.visit();
      driver.sleep(1000);
      page.logIn('marcin', 'changeme', 11, 16);
      driver.sleep(1000);
    	page.getElement(page.navbarHeader).getText().then(function(text){
    		assert.equal(text, 'Konsola Bezpieczeństwa');
    	});
    });

    var page = new utcPage(driver);
    this.timeout(TimeOut);
    page.visit();

    driver.sleep(1000);


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
      driver.sleep(3000);
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
