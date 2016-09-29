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
var Timeout = 30000;

//Sprawdzenie czy na stronie wszystkie obiekty danego typu, zawieraja dany atrybut
//Sprawdzamy tutaj strone logwania, console(tu gdzie sa wszystkie zadladki np: User Managment)
//oraz sprawdzamy takze User Managment, a w nim:
// -navbar
// -Pierwszy zaladowany widok listy uzytkownikow
// -Zakladki w rozwinietym accordionie: Profile oraz Directory Accounts.
//*W celu sprawdzenia kolejnych zakladek z accordiona, wystarczy znalezc xpath, po kliknieciu ktorego rozwinie sie dana zakladka,
// kilknac go i zaczekac na zaladowanie calej zawartosci
// nastepnie, gdy zaladowany kod HTML bedzie widoczny, mozna wywolac funkcje findAllElementsAndCheck

test.before(function(){
    this.timeout(Timeout);
    var args = process.argv.slice(2);
    var browser = args[3].substring(2);
    if(browser=='edge') browser = 'MicrosoftEdge';
    if(browser=='ie') browser = 'internet explorer';
    driver = new webdriver.Builder()
    .forBrowser(browser)
    //.usingServer('http://10.0.100.79:4444/wd/hub/')
    .build();
    driver.sleep(1000);
    page = new utcPage(driver);
    driver.sleep(1000);
    page.visit();
    driver.sleep(1000);
    page.waitToElement(webdriver.By.id('app'));
    driver.sleep(1000);
    driver.getCurrentUrl().then(function(url) {
    if(url != page.urlToCheck) {
        page.logout();
      }
    });
    page.waitToElement(webdriver.By.id('app'));
});

test.describe('Find all objects and check attribute', function(){
    var elementHTML = '//a'; // zawiera dany szukany obiekt
    var attribute = 'title'; //atrybut, ktory sprawdzamy, czy istnieje
    var username = 'marcin'; //nazwa uzytkownika do zalogowania
    var password = 'changeme'; //haslo

        //znajduje wszystkie linki na stronie logowania i sprawdza atr. title
        test.it('in log-in page', function(){
            this.timeout(Timeout)
            page.findAllElementsAndCheck(elementHTML, attribute);
        });

        //Blok, w ktorym sprawdzamy elementy po zalogowaniu
        test.describe('After login', function(){
            this.timeout(Timeout)

            //logowanie
            test.before(function(){
                page.waitToElement(page.loginInput);
                page.logIn(username, password , 11, 16);
                page.waitToElement(page.userManagement);
            });

            //sprawdzamy console page
            test.it('in console page', function(){
                this.timeout(Timeout);
                page.findAllElementsAndCheck(elementHTML, attribute);
            });

            //przejscie do UMM 
           test.before(function(){
                page.clickIn(page.userManagement);
                page.waitToElement(page.navbarHeader);

            });

            //UMM(przeszukuje navbar, pierwszy widok listy uzytkonikow oraz accordiona) 
            test.it('in UMM page, Users bookmark, with first view of users list(not all list from database) and accordion', function(){
                this.timeout(Timeout);

                //otwieram accordion
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
                page.waitToElement(page.container);
                page.waitToElement(page.actionDropdown);
                page.clickIn(page.actionDropdown);

                page.findAllElementsAndCheck(elementHTML, attribute);

            });

            //testy accordiona po zaladowaniu kodu po klikniecu assign button w danej zakladce
            test.it('in UMM page, in accordions Directory Accounts after click assign button', function(){
                this.timeout(Timeout);
                page.refresh();
                //otwieram accordion i assign popup
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
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
                elem.sendKeys(ENTER);

                //page.waitToElement(page.panelExpanded2); //czekanie na expanded
                page.waitToElement(page.accordionDirectoryAccountsBtn); //czekanie na assign button
                page.clickIn(page.accordionDirectoryAccountsBtn); //klik assign button
                page.waitToElement(page.assignmentPanelContent); //czekanie na panel content;
                //page.clickAssignInAccordionBookmark(page.admin, p[age.accordionDirectoryAccounts, page.panelExpanded2, page.accordionDirectoryAccountsBtn, page.assignmentPanelContent)
                page.findAllElementsAndCheck(elementHTML, attribute);

            });
             //testy accordiona po zaladowaniu kodu po klikniecu assign button w danej zakladce
            test.it('in UMM page, in accordions Assign Groups after click assign button', function(){
                this.timeout(Timeout);
                page.refresh();

                //otwieram accordion i assign popup
                page.waitToElement(page.admin);
                page.clickIn(page.admin);
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
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(CTRL, DOWN);
                elem = driver.switchTo().activeElement();
                elem.sendKeys(ENTER);

                //page.waitToElement(page.panelExpanded2); //czekam na expanded
                page.waitToElement(page.accordionUserGroupsAssignBtn); //czekam na assign button
                page.clickIn(page.accordionUserGroupsAssignBtn); // klik w assign button
                page.waitToElement(page.assignmentPanelContent); //czekam na panel content;
                //page.clickAssignInAccordionBookmark(page.admin, accordionUserGroups, page.panelExpanded2, page.accordionUserGroupsAssignBtn, page.assignmentPanelContent)
                page.findAllElementsAndCheck(elementHTML, attribute);

            });

        })

});

test.after(function() {
    driver.quit();
});
