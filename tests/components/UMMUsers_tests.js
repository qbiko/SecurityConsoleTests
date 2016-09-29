var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver');
var utcPage = require('../lib/utcPage.js');
var expect = require('chai').expect;
var driver;
var page;

const TAB = '\ue004';
const CTRL = '\ue009';
const UP = '\ue013';
const DOWN = '\ue015';
const ENTER = '\ue007';
const TimeOut = 30000; //ms

//sprawdzenie czy nie pozwala zapisac i ustawia focus jesli nie ma wymaganego pola przy dodwaniu
//dodanie uzytkownika i sprawdzenie czy faktycznie pojawi sie na liscie
//ustawienie na 'disable' i sprawdzenie czy faktycznie ustawilo
//dodanie kilku grup do dodanego usera(domyslnie 3)
//odjecie jednej grupy od usera
//usuniecie danego usera

test.before(function(){
    this.timeout(TimeOut);
    var args = process.argv.slice(2);
    var browser = args[3].substring(2);
    if(browser=='edge') browser = 'MicrosoftEdge';
    if(browser=='ie') browser = 'internet explorer';
    driver = new webdriver.Builder()
    .forBrowser(browser)
    //.usingServer('http://10.0.100.79:4444/wd/hub/')
    .build();
    page = new utcPage(driver);
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

test.describe('User Management > Users Test', function(){
    //dane usera ktorego wprowadzamy
    var lastname = "aaaaaaaa"; 
    var username = "Sebastian"; 
    var password = "bardzotajne";
    var user = webdriver.By.xpath('//a[contains(@title, "'+lastname+'")]');
    var userIcon = webdriver.By.xpath('//a[contains(@title, "'+lastname+'")]/table/tbody/tr/td[1]');


  test.it('sprawdzenie czy nie pozwala zapisac i ustawia focus jesli nie ma wymaganego pola przy dodwaniu ', function() {
    this.timeout(TimeOut);
    page.refresh();
    driver.sleep(1000);
    //wpsiujemy FirstName, klikamy save i sprawdzamy czy jest focus w odpowiednim miejscu
    page.waitToElement(page.mainContainer);
    page.waitToElement(page.mainContainer);
    driver.sleep(1000);
    page.waitToElement(page.addButton);
    page.clickIn(page.addButton);
    driver.sleep(1000);
    page.setText(page.userFirstName, 'Wesoly');
    page.waitToElement(page.mainContainer);
    page.waitToElement(page.mainContainer);
    driver.sleep(100);
    page.clickIn(page.saveButton);
    page.waitToElement(page.userUserName)
    page.checkFocusElement(page.userUserName);

    //ustawiamy UserName, klikamy save i sprawdzamy czy jest focus w odpowiednim miejscu
    page.setText(page.userUserName, 'Roman3562');
    page.waitToElement(page.mainContainer);
    driver.sleep(100);
    page.clickIn(page.saveButton);
    page.checkFocusElement(page.userPassword);

    //ustawiamy Password, klikamy save i sprawdzamy czy jest focus w odpowiednim miejscu
    page.setText(page.userPassword, 'fajnehaslo');
    page.waitToElement(page.mainContainer);
    driver.sleep(100);
    page.clickIn(page.saveButton);
    driver.sleep(1000);
    page.checkFocusElement(page.userLastName);

    //zamykamy accordiona przez klikniecie w 'x', po czym wyskakuje popup
    //w razie zmiany organizacji strony xpath do przycisku w popup moze sie zmienic
    page.waitToElement(page.closeForm);
    page.clickIn(page.closeForm);
    driver.sleep(1000);
    page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[1]'));
    page.clickIn(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[1]'));
    driver.sleep(1000);
    page.waitToElement(webdriver.By.id('app'));

    //logout, potrzebny aby prawidlowo przejsc kolejne testy
    driver.getCurrentUrl().then(function(url) {
      if(url != page.urlToCheck) {
        page.logout();
      }
      driver.sleep(100);
      page.waitToElement(page.loginInput);
      page.logIn('marcin', 'changeme', 11, 16);
      page.waitToElement(page.userManagement);
      driver.sleep(1000);
      page.clickIn(page.userManagement);
    });

    driver.sleep(1000);
    page.waitToElement(page.mainContainer);
    page.waitToElement(page.mainContainer);
  });
    //dodanie nowego usera przez ustawienie wszystkich wymaganych pol
    test.it('dodanie uzytkownika', function(){
        this.timeout(TimeOut);
        page.refresh();
        driver.sleep(1000);
        page.waitToElement(page.addBtn);
        page.clickIn(page.addBtn);
        page.waitToElement(page.userLastName); 
        page.setText(page.userLastName, lastname);
        page.waitToElement(page.internalAccountDiv);
        page.clickIn(page.internalAccountDiv);//otwiera internal accounts
        page.waitToElement(page.userPassword); 
        page.setText(page.userUserName, username);
        page.setText(page.userPassword, password);
        page.waitToElement(page.saveBtn);
        page.clickIn(page.saveBtn);
        page.waitToElement(webdriver.By.className('btn btn-success'));
        driver.sleep(1000);

    });

    test.it('Sprawdzenie, czy nowy uzytkownik jest na liscie', function(){
        this.timeout(300000);
        page.refresh();
        page.waitToElement(page.addBtn);
        page.MoveToActiveAddBtn();
        page.checkIfUserExist(username); 
        driver.sleep(8000);
    })

    test.it('ustawienie na disable w action dropdown, w nowym uzytkowniku', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);
        page.refresh();

        page.waitToElement(user);
        page.clickIn(user);

        page.waitToElement(page.actionDropdown);
        page.clickIn(page.actionDropdown);

        page.waitToElement(page.disableBtn);
        page.clickIn(page.disableBtn);

        page.clickIn(page.closeBtn);
        driver.sleep(1000);
        page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[2]'));
        page.clickIn(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[2]'));
        driver.sleep(1000);
    });

    test.it('sprawdzenie czy faktycznie ustawilo, ze dany uzytkownik ma ustawione disable', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);
        page.refresh();

        //sprawdzenie czy ustawiona jest ikona przy danym uzytkowniku na liscie
        page.waitToElement(user);
        driver.sleep(2000);
        page.waitToElement(userIcon);
        page.getElement(userIcon).getAttribute('class').then(function(text){
            console.log(text);
            expect(text).to.have.string('icon-disabled-red');
        })
    });

    test.it('ustawienie na enable w action dropdown, w nowym uzytkowniku', function(){
        this.timeout(TimeOut);
        driver.sleep(2000);

        page.refresh();

        page.waitToElement(user);
        page.clickIn(user);

        page.waitToElement(page.actionDropdown);
        page.clickIn(page.actionDropdown);

        page.waitToElement(page.enableBtn);
        page.clickIn(page.enableBtn);

        page.clickIn(page.closeBtn);
        driver.sleep(2000);
        page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[2]'));
        page.clickIn(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[2]'));
        driver.sleep(2000);

    });

    test.it('sprawdzenie czy faktycznie ustawilo, ze dany uzytkownik ma ustawione enable', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);
        page.refresh();
        //sprawdzenie czy ustawiona jest ikona przy danym uzytkowniku na liscie
        page.waitToElement(user);
        driver.sleep(2000);
        page.waitToElement(userIcon);
        page.getElement(userIcon).getAttribute('class').then(function(text){
            console.log(text);
            expect(text).to.not.have.string('icon-disabled-red');
        })
    });


    test.it('dodanie kilku grup do dodanego uzytkownika(domyslnie 3)', function(){
        this.timeout(TimeOut);
        //wybierz uzytkownika
        page.waitToElement(user);
        page.clickIn(user);
        page.waitToElement(page.container);

        //operacje w user groups
        driver.sleep(1000);
        page.waitToElement(page.userLastName);
        page.clickIn(page.userLastName);
        driver.sleep(500);
        var elem;
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, UP);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);

        page.waitToElement(page.panelExpanded); //czekanie na expanded
        page.waitToElement(page.accordionUserGroupsAssignBtn); //czekanie na assign button
        page.clickIn(page.accordionUserGroupsAssignBtn); //klik w  assign button
        page.waitToElement(page.assignmentPanelContent); //czekanie na assign groups panel content

        //jezeli dodamy element do listy assigned list, to drugi element z listy przed dodaniem staje sie aktualnie pierwszym
        //mozna wiec uzyc tego samego xpatha do dodania kilku elementow
        //operacje na assign groups
        driver.sleep(100);
        page.waitToElement(page.examplegroup1);
        page.clickIn(page.examplegroup1);
        driver.sleep(100);
        page.waitToElement(page.examplegroup1);
        page.clickIn(page.examplegroup1);
        driver.sleep(100);
        page.waitToElement(page.examplegroup1);
        page.clickIn(page.examplegroup1);
        driver.sleep(100);
        page.waitToElement(page.saveGroupsBtn);
        page.clickIn(page.saveGroupsBtn); //save performance
        driver.sleep(100);
        page.refresh(); //odswiezenie strony
        driver.sleep(1000);

        //operacje po odswiezeniu
        page.waitToElement(page.userLastName);
        page.clickIn(page.userLastName);
        driver.sleep(500);
        var elem;
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, UP);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        /*
        page.waitToElement(accordionUserGroups); //wait to load accordion
        page.clickIn(accordionUserGroups); //click user groups
        page.waitToElement(page.panelExpanded); //wait to expanded
        */
        //sprawdzenie czy, uzytkownik ma 3 grupy
        page.getTxt(page.countOfGroups).then(function(text){
            expect(Number(text)).to.equal(3);
        });

    });

    test.it('odjecie jednej grupy od uzytkownika', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);

        page.waitToElement(page.panelExpanded); //czekanie na expanded
        page.waitToElement(page.accordionUserGroupsAssignBtn); //czekanie na  assign button
        page.clickIn(page.accordionUserGroupsAssignBtn); // klik w  assign button
        page.waitToElement(page.assignmentPanelContent); //czekanie na assign groups panel content
        driver.sleep(1000);
        page.waitToElement(page.exampleAssignedGroup1);
        page.clickIn(page.exampleAssignedGroup1);

        //zapisanie
        page.waitToElement(page.saveGroupsBtn);
        page.clickIn(page.saveGroupsBtn); //save performance
        driver.sleep(1000);
        page.refresh();
        driver.sleep(1000);

        //operacje po odswiezeniu
        page.waitToElement(page.userLastName);
        page.clickIn(page.userLastName);
        driver.sleep(500);
        var elem;
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, UP);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(CTRL, DOWN);
        elem = driver.switchTo().activeElement();
        elem.sendKeys(ENTER);
        //sprawdzenie czy, uzytkownik ma odjeta jedna grupe, czyli w efekcie powinny byc 2
        page.getTxt(page.countOfGroups).then(function(text){
            expect(Number(text)).to.equal(2);
        });
        driver.sleep(1000);
    });

    test.it('Usniecie uzytkownika z listy', function(){
        this.timeout(TimeOut);
        page.refresh();
        page.waitToElement(user);
        page.clickIn(user);
        page.waitToElement(page.actionDropdown);
        page.clickIn(page.actionDropdown);
        page.waitToElement(page.deleteBtn);
        page.clickIn(page.deleteBtn);
        driver.sleep(1000);
        page.waitToElement(page.permanentlyDeleteBtn);
        page.clickIn(page.permanentlyDeleteBtn);
    });

});

test.after(function() {
    driver.quit();

});
