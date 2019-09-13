package testpackage.pages;

import net.thucydides.core.annotations.DefaultUrl;
import net.thucydides.core.pages.PageObject;
import org.openqa.selenium.By;
import static org.openqa.selenium.By.xpath;

@DefaultUrl("https://dev-front.pskovvtormet.ru/login")
public class LoginPage extends PageObject {

    private By mainBlockHeader = xpath("//mat-toolbar[@class='block-main-header auth-header mat-toolbar mat-toolbar-single-row']");
    private By authTitle = xpath("//div[@class='auth-title']");
    private By inputField = xpath("//div[@class='input-main']/input");
    private By errorText = xpath("//div[@class='form-field-errors']/span");
    private By enterButton = xpath("//button[@class='mat-raised-button']");
    private By dropDown = xpath("//div[@class='mat-select-trigger']");
    String dropDownList = "//mat-option[@class='mat-option ng-star-inserted']/span[text()='%s']";
    private By menu = xpath("//mat-option[@class='mat-option ng-star-inserted']/span[text()='first_new_affiliate']");

    public void clickToDropDown(){
      find(dropDown).click();
    }

    public void setDropDownElement(String element){
      find(xpath(String.format(dropDownList, element))).click();
    }


    public void errorIsInvisible(){
        find(errorText).shouldNotBeVisible();
    }

    public void clickToInput(){
        find(inputField).click();
    }

    public boolean getPlaceholder(String text){
       return find(inputField).getAttribute("placeholder").equals(text);
    }

    public void setCode(String code){
        find(inputField).sendKeys(code);
    }

    public String getTitleText() {
        return find(errorText).getText();
    }

    public void clickToHeaderTest(){
        find(mainBlockHeader).click();
    }

    public void clickToEnterButton(){
        find(enterButton).click();
    }

    public boolean buttonIsInactive(){
        return !find(enterButton).isEnabled();
    }

    public boolean buttonIsActive(){
        return find(enterButton).isEnabled();
    }

    public String getErrorText() {
        return find(errorText).getText();
    }

}
