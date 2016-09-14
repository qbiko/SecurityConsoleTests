var webdriver = require('selenium-webdriver');

function utcPage(driver) {
    this.driver = driver;
    this.url = 'http://10.0.100.171:8082';
    //1strona
    this.loginInput = webdriver.By.id('username');
    this.passwordInput = webdriver.By.id('password');
    this.logInButton = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/div/section/div[3]/form/div[4]/button');
    this.informatorSelect = webdriver.By.xpath('//*[@id="options-panel"]/div[1]/button');
    this.languageSelect = webdriver.By.xpath('//*[@id="options-panel"]/div[2]/button');
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
    this.logoutButton = webdriver.By.xpath('//*[@id="app"]/section/div/div/nav/div/ul/li/ul/li[4]');
    this.userManagement = webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/section/ul/li[1]');
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
};

utcPage.prototype.visit = function() {
    this.driver.get(this.url);
    return webdriver.promise.fulfilled(true);
};

utcPage.prototype.logout = function() {
    this.clickIn(this.userDrop);
    this.clickIn(this.logoutButton);
}

utcPage.prototype.titlePage = function() {
    var d = webdriver.promise.defer();
    this.driver.getTitle().then(function(title) {
        d.fulfill(title);
    });
    return d.promise;
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
    this.clickIn(webdriver.By.xpath('//*[@id="domain"]/li[' + IDInformator + ']'));
};

utcPage.prototype.chooseLanguage = function(IDLanguage) {
    this.clickIn(this.languageSelect);
    this.clickIn(webdriver.By.xpath('//*[@id="locale"]/li[' + IDLanguage + ']'));
}

utcPage.prototype.fillForm = function(login, password, IDInformator, IDJezyk) {
    this.setText(this.loginInput, login);
    this.setText(this.passwordInput, password);
    this.chooseInformator(IDInformator); //UX USERS TEST 12, PLATFORM 11
    this.chooseLanguage(IDJezyk); //PL 16 ENG 2
}

utcPage.prototype.logIn = function(login, password, IDInformator, IDJezyk) {
    this.fillForm(login, password, IDInformator, IDJezyk);
    this.clickIn(this.logInButton);
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

utcPage.prototype.checkLocalStorage = function(key) {
    var d = webdriver.promise.defer();
    var temp = String("return window.localStorage.getItem('" + key + "');");
    this.driver.executeScript(temp).then(function(return_value) {
      d.fulfill(return_value);
    });
    return d.promise;
};

utcPage.prototype.cleanUsername = function() {
  this.clickIn(this.loginInput);
  this.clickIn(this.spanUsername);
}

utcPage.prototype.cleanPassword = function() {
  this.clickIn(this.passwordInput);
  this.clickIn(this.spanPassword);
}
utcPage.prototype.cleanTextPlace = function(place, clearIcon) {
  this.clickIn(place);
  this.clickIn(clearIcon);
}
utcPage.prototype.chooseColumn = function() {
  return this.driver.findElement(webdriver.By.xpath('//*[@id="app"]/section/div/div/div/section/div/section/section/table/tbody/tr[1]/td/div/table/tbody/tr[1]/td[1]/div'));
}

module.exports = utcPage;
