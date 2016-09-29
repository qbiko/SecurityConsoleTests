var webdriver = require('selenium-webdriver');
var assert = require('assert');
var expect = require('chai').expect;

const ENTER = '\ue007';
const TAB = '\ue004';
const ARROW_DOWN = '\ue015';
const SPACE = '\ue00d';

function utcPage(driver) {
    this.driver = driver;
    this.url = 'http://10.0.100.171:8082';
    this.urlToCheck = String(this.url + '/#/');
    this.mainContainer = webdriver.By.id('app');
    //1strona
    this.loginInput = webdriver.By.id('username');
    this.passwordInput = webdriver.By.id('password');
    this.logInButton = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[4]/button');
    this.informatorSelect = webdriver.By.xpath('//*[@id="options-panel"]/div[1]/button');
    this.languageSelect = webdriver.By.xpath('//*[@id="options-panel"]/div[2]/button');
    this.toggle = webdriver.By.xpath('//div[contains(@class, "options-panel-toggle")]');
    this.spanUsername = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[1]/span[1]');
    this.spanPassword = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[2]/span[1]');
    this.spanValidationLogin = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[1]/span[3]');
    this.spanValidationPassword = webdriver.By.
    xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[2]/span[3]');
    this.loginDiv = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[1]');
    this.passwordDiv = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[2]');
    this.classInvalid = 'is-invalid';
    this.correctClass = 'has-focus';
    this.optionsPanel = webdriver.By.xpath('//div[contains(@id, "options-panel")]');
    this.moreOptions = webdriver.By.className('options-panel-toggle');
    this.usernameLabel = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[1]/label')
    this.passwordLabel = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[2]/label');
    //2strona
    this.userDrop = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li');
    this.userDropA = webdriver.By.xpath('//ul/li/a[contains(@class, "dropdown-toggle")]');
    this.logoutButton = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[4]/a');
    this.userManagementI = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li[1]');
    this.userManagement = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li/a[contains(@title, "umm.name")]');
    this.level3 = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li[2]');
    this.desktopApp = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li[3]');
    this.settings = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li[4]');
    this.myAccount = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[1]');
    this.help = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[2]');
    this.about = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[3]');
    this.directory = '//ul[contains(@class, "moduleCards")]/';
    this.iconClose = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div[1]/div/span');
    //3strona
    this.roles = webdriver.By.xpath('//aside[contains(@class, "sidebar")]//a[contains(@title, "Roles")]');
    this.jobFunctions = webdriver.By.xpath('//aside[contains(@class, "sidebar")]//a[contains(@title, "Job Functions")]');
    this.navbarHeader = webdriver.By.xpath('//nav[contains(@class, "topnav")]//div[contains(@class, "navbar-brand")]');
    this.configuration = webdriver.By.xpath('//aside[contains(@class, "sidebar")]//a[contains(@title, "Configuration")]');
    this.collapse = webdriver.By.xpath('//aside[contains(@class, "sidebar")]//a[contains(@title, "Collapse")]');
    this.collapseLi = webdriver.By.xpath('//*[@id="app"]/section/div/aside/nav/ul[2]/li[2]');
    this.appDiv = webdriver.By.xpath('//*[@id="app"]/section/div');
    this.collapseClass = "app";
    this.moduleTitle = webdriver.By.xpath('//table//header[contains(@class, "module-header")]//h2[contains(@class, "module-title")]');
    this.addButton = webdriver.By.xpath('//table//header[contains(@class, "module-header")]//a[contains(@class, "btn")]');
    this.addForm = webdriver.By.xpath('//div[contains(@class, "list-with-panel-panel-container")]//section/form');
    this.closeForm = webdriver.By.
    xpath('//form//div[contains(@class, "side-panel-btns-container")]//a[contains(@class, "icon-close")]');
    this.inputRoleName = webdriver.By.id('role-name');
    this.textareaRoleDescription = webdriver.By.id('role-description');
    this.clearRoleName = webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]/div[2]/div/div/div[1]/div/span[contains(@class, "icon icon-clear")]');
    this.divRoleName = webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]/div[2]/div/div/div[1]/div');
    this.h4Profile = webdriver.By.xpath('//*[@id="role-details-accordion"]/div[1]/div[1]/h4');
    this.h4JobF = webdriver.By.xpath('//*[@id="role-details-accordion"]/div[2]/div[1]/h4');
    this.h4Users = webdriver.By.xpath('//*[@id="role-details-accordion"]/div[3]/div[1]/h4');
    //settings
    this.passwordBtn = webdriver.By.xpath('//a[contains(@title, "Passwords")]');
    this.sessionsBtn = webdriver.By.xpath('//a[contains(@title, "Sessions")]');
    this.contactBtn = webdriver.By.xpath('//a[contains(@title, "Contact")]');
    this.performanceContainer = webdriver.By.xpath('//div[contains(@class, "list-with-panel-panel-container")]');
    this.performanceH3 = webdriver.By.xpath('//*[@id="heading-profile"]/div[1]/h3[contains(@class, "panel-title side-panel-title")]');
    //UMM USERS
    this.userFirstName = webdriver.By.id('user-firstname');
    this.saveButton = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/button[contains(@class, "btn btn-default")]');
    this.actionsButton = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/div/button');
    //*[@id="heading-profile"]/div[3]/div/button
    this.userUserName = webdriver.By.id('user-username');
    this.userPassword = webdriver.By.id('user-password');
    this.userLastName = webdriver.By.id('user-lastname');
    //keyboard
    this.keyboardStart = webdriver.By.className('brand');
    this.stop = false;
    this.elementToClick;
    this.disabledElement = webdriver.By.className('icon icon-disabled-red');
    this.disabledClass = 'icon icon-disabled-red';
    this.successButton = webdriver.By.className('btn btn-success');
    this.jobName = webdriver.By.id('job-name');

    //UMMUsers test
    this.internalAccountDiv = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[2]/div[1]');

    this.container = webdriver.By.xpath('//div[contains(@class, "list-with-panel-panel-container")]');
    this.actionDropdown  = webdriver.By.xpath('//div[contains(@class, "btn-group")]/button');
    this.saveBtn = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/button');
    this.disableBtn = webdriver.By.xpath('//ul[contains(@class, "user-card-actions-dropdown")]/li[2]/a');
    this.enableBtn = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/div/ul/li[2]/a');
    this.deleteBtn = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/div/ul/li[4]/a');
    this.closeBtn = webdriver.By.xpath('//*[@id="heading-profile"]/div[3]/a');

    //popup window
    this.permanentlyDeleteBtn = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/section/div/div[1]/div/div/button[1]');
    //user groups

    this.panelExpanded =  webdriver.By.xpath('//*[@id="user-details-accordion"]/div[5]/div[2]/div');
    this.accordionUserGroupsAssignBtn = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[5]/div[2]/div/div[1]/a');
    this.assignmentPanelContent = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div[3]/div[1]/div[2]');
    this.accordionUserGroups = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[5]');

    this.examplegroup1 = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div[3]/div[1]/div[2]/table/tbody/tr[1]');
    this.exampleAssignedGroup1 = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div[3]/div[2]/div[2]/table/tbody/tr[1]');
    this.saveGroupsBtn = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div[1]/button');
    this.countOfGroups = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[5]/div[2]/div/div[1]/strong');

    //All links
    this.admin = webdriver.By.xpath('//a[contains(@title, "admin")]');
    this.panelExpanded2 =  webdriver.By.xpath('//div[contains(@class, "panel panel-default panel-active panel-expanded")]');
    this.accordionUserGroupsAssignBtn = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[5]/div[2]/div/div[1]/a');
    this.assignmentPanelContent = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/div/div/div/div[1]/div/div[3]/div[1]/div[2]');
    this.container = webdriver.By.xpath('//div[contains(@class, "list-with-panel-panel-container")]');
    this.accordionDirectoryAccounts = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[3]/div[1]');
    this.accordionDirectoryAccountsBtn = webdriver.By.xpath('//*[@id="user-details-accordion"]/div[3]/div[2]/div/div[1]/a');

    //adding new user
    this.addBtn = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/thead/tr[2]/th/header/div/a');
};

utcPage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};

utcPage.prototype.logoutKeyboard = function() {
    this.setText(this.userDropA, ENTER);
    var elem,i;
    i=0;
    while(i<4){
      elem = this.driver.switchTo().activeElement();
      elem.sendKeys(TAB);
      i++;
    }
    elem = this.driver.switchTo().activeElement();
    elem.sendKeys(ENTER);
}

utcPage.prototype.logout = function() {
    this.clickIn(this.userDropA);
    this.clickIn(this.logoutButton);
}

utcPage.prototype.logIn = function(login, password, IDInformator, IDLang) {
    this.setText(this.loginInput, login);
    this.setText(this.passwordInput, password);
    this.chooseInformator(IDInformator); //UX USERS TEST 12, PLATFORM 11
    this.chooseLanguage(IDLang); //PL 16 ENG 2
    this.clickIn(this.logInButton);
}

utcPage.prototype.logInKeyboard = function(login, password, IDInformator, IDLang) {
    var elem;
    this.chooseInformator(2); //UX USERS TEST 12, PLATFORM 11 , a 2
    this.chooseLanguage(2); //PL 16 ENG 2

    this.setText(this.loginInput, login);
    this.setText(this.loginInput, TAB);
    elem = this.driver.switchTo().activeElement(); //password input
    elem.sendKeys(password);
    elem.sendKeys(TAB);
    elem = this.driver.switchTo().activeElement(); // more options
    elem.sendKeys(TAB);
    elem = this.driver.switchTo().activeElement(); // directory
    elem.sendKeys(ENTER);
    this.clickKey(IDInformator, ARROW_DOWN);
    elem.sendKeys(ENTER);
    elem.sendKeys(TAB);
    elem = this.driver.switchTo().activeElement(); // language
    elem.sendKeys(ENTER);
    this.clickKey(IDLang, ARROW_DOWN);
    elem.sendKeys(ENTER);
    elem.sendKeys(TAB);
    elem = this.driver.switchTo().activeElement(); //button LOG IN
    elem.sendKeys(ENTER);
}

utcPage.prototype.goToUserMKeyboard = function() { //funkcja przejscia do User Management zalezna od ulozenia zakladki UserManagement w konsoli
    this.setText(this.keyboardStart, TAB);
    var elem;
    this.clickKey(3, TAB);
    elem = this.driver.switchTo().activeElement(); //User Management
    elem.sendKeys(ENTER);
}

utcPage.prototype.goToJobFuncKeyboard = function() { //funkcja przejscia do JobFunction gdy jestesmy w UserManagement
    this.setText(this.keyboardStart, TAB);
    var elem;
    this.clickKey(3, TAB);
    elem = this.driver.switchTo().activeElement(); //Job Functions
    elem.sendKeys(ENTER);
}

utcPage.prototype.addNewUserKeyboard = function(lastname, username, password) {// funkcja dzieki ktorej za pomoca klawiatury dodajemy nowego uzytkownika
    this.setText(this.keyboardStart, TAB); //wciskanie klawiszy zaczynamy od loga lenel
    var elem;
    this.clickKey(8, TAB); //klikamy 8 razy TAB
    elem = this.driver.switchTo().activeElement(); //jestesmy na button ADD
    elem.sendKeys(ENTER);
    this.clickKey(2, TAB);
    elem = this.driver.switchTo().activeElement(); //input Last
    elem.sendKeys(lastname);
    elem.sendKeys(ENTER);
    elem = this.driver.switchTo().activeElement(); //input username
    elem.sendKeys(username);
    elem.sendKeys(ENTER);
    elem = this.driver.switchTo().activeElement(); //input password
    elem.sendKeys(password);
    elem.sendKeys(ENTER); //zapisujemy uzytkownika
}

utcPage.prototype.checkIfUserExist = function(usernameToCheck) {
  this.stop = false;
  this.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[4]/div')); // czekamy na liste uzytkownikow
  this.driver.sleep(100);
  this.driver.findElements(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[4]/div')) // pobieramy liste uzytkownikow
  .then(function(userList){
    userList.forEach(function(username){
      username.getText().then(function(name){ //sprawdzamy czy w danej liscie uzytkownikow znajduje sie szukany uzytkownik
          if(name===usernameToCheck) {
            this.stop = true; // jesli tak ustawiamy flage stop na true
          }
        }.bind(this))//dobindowujemy obiekt this by byl widoczny w danym bloku
      }.bind(this))
      if(this.stop===false){ // sprawdzamy czy flaga stop rowna sie false, jesli tak przesuwamy sie o jednego uzytkownika w dol i ponownie odpalamy nasza funkcje
        var elem;
        elem = this.driver.switchTo().activeElement();
        this.driver.sleep(100);
        elem.sendKeys(TAB);
        return this.checkIfUserExist(usernameToCheck);
      }
      else {
        console.log('Found user: ' + usernameToCheck); // jesli nie wypisujemy nazwe uzytkownika w konsoli i wychodzimy z funkcji
      }
    }.bind(this))
}

utcPage.prototype.showUserDetails = function(usernameToCheck) { // funkcja analogiczna do checkIfUserExist tylko w momencie gdy uzytkownik zostaje znaleziony klikamy na niego
  this.stop = false;
  this.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[4]/div'));
  this.driver.sleep(100);
  this.driver.findElements(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[4]/div'))
  .then(function(userList){
    userList.forEach(function(username){
      username.getText().then(function(name){
          if(name===usernameToCheck) {
            //username.click();
            this.elementToClick = username; // zapisujemy znaleziony element
            this.stop = true;
          }
        }.bind(this))
      }.bind(this))
      if(this.stop===false){
        var elem;
        elem = this.driver.switchTo().activeElement();
        this.driver.sleep(100);
        elem.sendKeys(TAB);
        return this.showUserDetails(usernameToCheck);
      }
      else {
        var elem;
        elem = this.driver.switchTo().activeElement();
        this.driver.sleep(100);
        elem.sendKeys(TAB);
        this.driver.sleep(500); // przed kliknieciem w element schodzimy o jednego uzytkownika w dol, poniewaz niektore przegladarki nie akceptuja klikania w elementu ktore nie sa widoczne, a wystepuja w strukturze html
        this.elementToClick.click();
        console.log('Found user: ' + usernameToCheck);
      }
    }.bind(this))
}

utcPage.prototype.findAndGoToJobFunc = function(jobNameToFind) { //analogiczna funkcja jak showUserDetails tylko ze dla Job Function, rozni sie identyfikacja elementow
  this.stop = false;
  this.waitToElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[1]/div'));
  this.driver.sleep(100);
  this.driver.findElements(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr/td/div/div/div/a/table/tbody/tr/td[1]/div'))
  .then(function(jobFList){
    jobFList.forEach(function(functionName){
      functionName.getText().then(function(name){
          if(name===jobNameToFind) {
            //username.click();
            this.elementToClick = functionName;
            this.stop = true;
          }
        }.bind(this))
      }.bind(this))
      if(this.stop===false){
        var elem;
        elem = this.driver.switchTo().activeElement();
        this.driver.sleep(100);
        elem.sendKeys(TAB);
        return this.findAndGoToJobFunc(jobNameToFind);
      }
      else {
        var elem;
        elem = this.driver.switchTo().activeElement();
        this.driver.sleep(100);
        elem.sendKeys(TAB);
        this.driver.sleep(500);
        this.elementToClick.click();
        console.log('Found job function: ' + jobNameToFind);
      }
    }.bind(this))
}

utcPage.prototype.chooseJobFunction = function(number){// funkcja ktora za pomoca klawiatury wybiera dane funkcje
    this.clickKey(number, TAB);
    this.clickKey(1, SPACE);
}

utcPage.prototype.clickKey = function(numberOfTimes, key) { // funkcja ktora umozliwia wielokrotne wcisniecie przycisku, za jej pomoca mozemy na przyklad przejsc przez cala strone samym TABem
  var i=0, elem;
    while(i<numberOfTimes){
      elem = this.driver.switchTo().activeElement(); //pobieramy aktualnie sfocusowany element
      elem.sendKeys(key); //wysylamy z tego elemntu klawisz
      i++;
    }
}

utcPage.prototype.checkLocalStorage = function(key) { //funkcja ktora sprawdza zawartosc w localStorage elementu o podanym kluczu
    var d = webdriver.promise.defer();
    var temp = String("return window.localStorage.getItem('" + key + "');"); //wywolujemy skrypt js, by pobral do zmiennej wartosc z localStorage
    this.driver.executeScript(temp).then(function(return_value) {
      d.fulfill(return_value);
    });
    return d.promise;
};

utcPage.prototype.checkFocusElement = function(elemToCheck) { //funkcja sprawdzajaca czy sfocusowany element posiada odpowiedni ID, prosciej mowiac czy jest sfocusowany odpowiedni element na stronie
  var focusID;
  this.driver.findElement(elemToCheck).getAttribute('id').then(function(id){
    focusID = id; // na poczatku pobieramy ID elementu, ktory ma byc sfocusowany
  })
  var d = webdriver.promise.defer();
  this.driver.switchTo().activeElement().getAttribute('id').then(function(element){ //nastepnie pobieramy ID elementu ktory jest sfocusowany
    assert.equal(element, focusID)//sprawdzamy czy wartosci sie zgadzaja
    d.fulfill(element);
  })
  return d.promise;
}

utcPage.prototype.fillForm = function(login, password, IDInformator, IDJezyk) {//funkcja ktora wypelnia strone logowania danymi, ktore podamy, Informator i Jezyk podajemy liczbe
    this.setText(this.loginInput, login);
    this.setText(this.passwordInput, password);
    this.chooseInformator(IDInformator); //UX USERS TEST 12, PLATFORM 11
    this.chooseLanguage(IDJezyk); //PL 16 ENG 2
}

utcPage.prototype.titlePage = function() {
    var d = webdriver.promise.defer();
    this.driver.getTitle().then(function(title) {
        d.fulfill(title);
    });
    return d.promise;
};

utcPage.prototype.listSize = function(elements) {
  var d = webdriver.promise.defer();
  this.driver.findElements(elements).then(function(elems) {
        return webdriver.promise.fulfilled(elems.length);
  });
};

utcPage.prototype.isElement = function(element) {
  this.driver.findElement(element).then(function(webElement) {
    }, function(err) {
        if (err.state && err.state === 'no such element') {
            console.log('Nie znaleziono elementu');
        } else {
            webdriver.promise.rejected(err);
        }
    });
}

utcPage.prototype.getElement = function(path){
    return this.driver.findElement(path);
};

utcPage.prototype.waitToElement = function(path){
    return this.driver.wait(webdriver.until.elementLocated(path), 5000);
}

utcPage.prototype.getTxt = function(input) {
    var d = webdriver.promise.defer();
    this.driver.findElement(input).getText().then(function(text) {
        d.fulfill(text);
    });
    return d.promise;
};

utcPage.prototype.getUrl = function(input) {
    var d = webdriver.promise.defer();
    this.driver.getCurrentUrl().then(function(url) {
      d.fulfill(url);
    });
    return d.promise;
};

utcPage.prototype.clickIn = function(object) {
    this.driver.findElement(object).click();
};

utcPage.prototype.chooseInformator = function(IDInformator) {
    this.clickIn(this.informatorSelect);
    this.clickIn(webdriver.By.xpath('//*[@id="domain"]/li[' + IDInformator + ']/a'));
};

utcPage.prototype.chooseLanguage = function(IDLanguage) {
    this.clickIn(this.languageSelect);
    this.clickIn(webdriver.By.xpath('//*[@id="locale"]/li[' + IDLanguage + ']/a'));
}

utcPage.prototype.setText = function(path, text){
    var name = this.driver.findElement(path);
    name.sendKeys(text);
};

utcPage.prototype.waitTo = function(name){
    this.driver.wait(webdriver.until.titleIs(name), 10000);
};

utcPage.prototype.getUserData = function(path){
    var userdata = this.driver.findElement({xpath: path});
    return userdata.getText();
};

utcPage.prototype.cleanUsername = function() { //funkcja ktora czysci input login na stronie glownej
  this.clickIn(this.loginInput);
  this.clickIn(this.spanUsername);
}

utcPage.prototype.cleanPassword = function() { //funkcja ktora czysci input password na stronie glownej
  this.clickIn(this.passwordInput);
  this.clickIn(this.spanPassword);
}
utcPage.prototype.cleanTextPlace = function(place, clearIcon) { //funkcja ktora czysci podany input, trzeba podac w co musi kliknac zeby wyczyscic input, zmienna clearIcon
  this.clickIn(place);
  this.clickIn(clearIcon);
}
utcPage.prototype.chooseColumn = function() {
  return this.driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td[1]/div'));
}

utcPage.prototype.MoveToActiveAddBtn = function(){
    var lenel = this.driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/a')); //logout dropdown
    lenel.sendKeys(TAB);
    this.driver.sleep(1000);
}

//funtion to verify all visible elements (check if attribute is present in each elements)
utcPage.prototype.findAllElementsAndCheck = function(elementHTML, attribute){
    this.driver.findElements(webdriver.By.xpath(elementHTML)).then(function(elements){
        elements.forEach(function (element) {
            element.getAttribute(attribute).then(function(text){
                //console.log(text) //if empty space in line, this title is empty
                expect(text).to.have.length.above(0); //if texts  attribute length has 0, test faild
            });
        });
    });
}

//function to choose user in users list, and click assign btn in selected bookmark in accordion and wait to panelContent
utcPage.prototype.clickAssignInAccordionBookmark = function(userToClick, whichBookmarkDiv, expand, elementBtn, panelContent){

    this.waitToElement(userToClick);
    this.clickIn(userToClick);
    this.waitToElement(whichBookmarkDiv); //wait to load accordion
    this.clickIn(whichBookmarkDiv); //click div
    this.waitToElement(expand); //wait to expanded
    this.waitToElement(elementBtn); //wait to assign button
    this.clickIn(elementBtn); // click assign button
    this.waitToElement(panelContent); //wait to panel content;
}

utcPage.prototype.refresh = function(){
    this.driver.navigate().refresh();
}

utcPage.prototype.parse = function(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}
module.exports = utcPage;
