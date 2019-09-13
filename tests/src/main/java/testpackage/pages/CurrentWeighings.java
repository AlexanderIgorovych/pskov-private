package testpackage.pages;

import net.thucydides.core.annotations.DefaultUrl;
import net.thucydides.core.pages.PageObject;
import org.openqa.selenium.By;

import static org.openqa.selenium.By.xpath;

@DefaultUrl("https://dev-front.pskovvtormet.ru/login")
public class CurrentWeighings extends PageObject {

  private String header = "//div[@class='header-title']/span[text()='%s']";
  private String nonActiveTabName = "//div[@class='mat-tab-label mat-ripple ng-star-inserted']/div[text()='%s']";
  private String emptyStateText = "//mat-card[@class='block-content mat-card']/p[text()='%s']";
  private String newWeighingButton = "//button[@class='header-button mat-flat-button mat-none']/span[text()='%s']";
  private String popupText = "//div[@class='cdk-overlay-pane']/mat-dialog-container[@class='mat-dialog-container ng-tns-c13-6 ng-trigger ng-trigger-slideDialog ng-star-inserted']/app-modal-menu[text()='%s']";

  public String masterName(String name){
    return find(xpath(String.format(header, name))).getText();
  }

  public void clickToTab(String tabName){
    find(xpath(String.format(nonActiveTabName, tabName))).click();
  }

  public String emptySpaceText(String text){
    return find(xpath(String.format(emptyStateText, text))).getText();
  }

  public String popupText(String text){
    return find(xpath(String.format(popupText, text))).getText();
  }

  public void clickToNewWeighingButton(String buttonName){
    find(xpath(String.format(newWeighingButton, buttonName))).click();
  }

}
