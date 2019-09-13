package testpackage.steps;

import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import testpackage.pages.CurrentWeighings;

public class CurrentWeighingsSteps {

  CurrentWeighings currentWeighings;

  @Given("CurrentWeighingsPage is opened")
  public void open_currentWeighings_page(){
    currentWeighings.open();
  }
  @When("User see header with master name \"$name\"")
  public void headerChech(String name){
    currentWeighings.masterName(name);
  }

  @Then("User clicks to tab \"$tab\"")
  public void tabClick(String tab){
    currentWeighings.clickToTab(tab);
  }

  @Then("User see text \"$text\"")
  public void emptyStateText(String text){
    currentWeighings.emptySpaceText(text);
  }

  @When("User clicks to button \"$button\"")
  public void weighingButtonClick(String button){
    currentWeighings.clickToNewWeighingButton(button);
  }

  @Then("User see popup with text \"$text\"")
  public void popupText(String text){

    currentWeighings.popupText(text);
  }






}
