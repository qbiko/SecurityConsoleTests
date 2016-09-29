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

test.before(function(){
    this.timeout(TimeOut);
    var args = process.argv.slice(2);
    var browser = args[3].substring(2);
    if(browser=='edge') browser = 'MicrosoftEdge';
    if(browser=='ie') browser = 'internet explorer';
    driver = new webdriver.Builder()
    .forBrowser(browser)
    .usingServer('http://10.0.100.79:4444/wd/hub/')
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
    var lastname = "aaaaaaaa";
    var username = "Sebastian";
    var password = "bardzotajne";
    var user = webdriver.By.xpath('//a[contains(@title, "'+lastname+'")]');
    var userIcon = webdriver.By.xpath('//a[contains(@title, "'+lastname+'")]/table/tbody/tr/td[1]');


  test.it('Cant save and must focus to element if it havent require filed ', function() {
    this.timeout(TimeOut);
    page.refresh();
    driver.sleep(1000);
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

    page.setText(page.userUserName, 'Roman3562');
    page.waitToElement(page.mainContainer);
    driver.sleep(100);
    page.clickIn(page.saveButton);

    page.checkFocusElement(page.userPassword);

    page.setText(page.userPassword, 'fajnehaslo');

    page.waitToElement(page.mainContainer);
    driver.sleep(100);
    page.clickIn(page.saveButton);

    driver.sleep(1000);
    page.checkFocusElement(page.userLastName);
    page.waitToElement(page.closeForm);
    page.clickIn(page.closeForm);
    driver.sleep(1000);
    page.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[1]'));
    page.clickIn(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div/button[1]'));
    driver.sleep(1000);
    page.waitToElement(webdriver.By.id('app'));
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

    test.it('Add new user', function(){
        this.timeout(TimeOut);
        page.refresh();
        driver.sleep(1000);
        page.waitToElement(page.addBtn);
        page.clickIn(page.addBtn);
        page.waitToElement(page.userLastName); //wait to load input to last name
        page.setText(page.userLastName, lastname);
        page.waitToElement(page.internalAccountDiv);
        page.clickIn(page.internalAccountDiv);//open internal accounts
        page.waitToElement(page.userPassword); //wait to load all inputs in internal account
        page.setText(page.userUserName, username);
        page.setText(page.userPassword, password);
        page.waitToElement(page.saveBtn);
        page.clickIn(page.saveBtn);
        page.waitToElement(webdriver.By.className('btn btn-success'));
        driver.sleep(1000);

    });

    test.it('New User in Users List', function(){
        this.timeout(300000);
        page.refresh();
        page.waitToElement(page.addBtn);
        page.MoveToActiveAddBtn();
        //TODO
        page.checkIfUserExist(username); //zmienic zeby byla zmienna
        driver.sleep(8000);
    })

    test.it('Disable the user in action dropdown', function(){
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

    test.it('Disable icon, check result', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);

        page.refresh();
        page.waitToElement(user);
        driver.sleep(2000);
        page.waitToElement(userIcon);
        page.getElement(userIcon).getAttribute('class').then(function(text){
            console.log(text);
            expect(text).to.have.string('icon-disabled-red');
        })
    });

    test.it('Enable the user in action dropdown', function(){
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

    test.it('Enable icon, check result', function(){
        this.timeout(TimeOut);
        driver.sleep(1000);

        page.refresh();
        page.waitToElement(user);
        driver.sleep(2000);
        page.waitToElement(userIcon);
        page.getElement(userIcon).getAttribute('class').then(function(text){
            console.log(text);
            expect(text).to.not.have.string('icon-disabled-red');
        })
    });


    test.it('Add user to some groups and check', function(){
        this.timeout(TimeOut);
        //choose user
        page.waitToElement(user);
        page.clickIn(user);
        page.waitToElement(page.container);

        //operations in user groups
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

        page.waitToElement(page.panelExpanded); //wait to expanded
        page.waitToElement(page.accordionUserGroupsAssignBtn); //wait to assign button
        page.clickIn(page.accordionUserGroupsAssignBtn); // click assign button
        page.waitToElement(page.assignmentPanelContent); //wait to assign groups panel content

        //if we add new element to assigned list, second element in available list will be the first after adding, so..
        //can use the same xpath to add next element to available list
        //operations in assign groups
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
        page.refresh(); //refresh page, to check result performance
        driver.sleep(1000);
        //operations after refresh
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
        //verify results. We check, if is in user group 3 elements
        page.getTxt(page.countOfGroups).then(function(text){
            expect(Number(text)).to.equal(3);
        });

    });

    test.it('Remove one group and check', function(){
        this.timeout(TimeOut);
        //accordion is loaded form previous test

        //click assign button

        driver.sleep(1000);

        page.waitToElement(page.panelExpanded); //wait to expanded
        page.waitToElement(page.accordionUserGroupsAssignBtn); //wait to assign button
        page.clickIn(page.accordionUserGroupsAssignBtn); // click assign button
        page.waitToElement(page.assignmentPanelContent); //wait to assign groups panel content
        //check one form assigned
        driver.sleep(1000);
        page.waitToElement(page.exampleAssignedGroup1);
        page.clickIn(page.exampleAssignedGroup1);

        //save performamce
        page.waitToElement(page.saveGroupsBtn);
        page.clickIn(page.saveGroupsBtn); //save performance
        driver.sleep(1000);
        page.refresh(); //refresh page, to check result performance
        driver.sleep(1000);
        //operations after refresh
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
        //verify results. We check, if is in user group 3 elements
        page.getTxt(page.countOfGroups).then(function(text){
            expect(Number(text)).to.equal(2);
        });
        driver.sleep(1000);
    });

    test.it('Remove user from the list', function(){
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
