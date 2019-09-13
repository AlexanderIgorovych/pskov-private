package testpackage.steps;

import org.assertj.core.api.Assertions;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import testpackage.pages.LoginPage;

public class LoginPageSteps {

    LoginPage page;

    @Given("LoginPage is opened")
    public void open_login_page(){
        page.open();
    }

    @When("User clicks to code field")
        public void clickToCodeField(){
            page.clickToInput();
    }

    @When("User clicks to Enter button")
        public void clickToEnter(){
            page.clickToEnterButton();
    }

    @When("User clicks to header")
    public void clickToHeader(){
        page.clickToHeaderTest();
    }

    @Then("User see error \"$error\"")
    public void errorText (String error) {
        Assertions.assertThat(page.getErrorText().equals(error));
    }

    @Then("User see thah Enter button is inactive")
    public void buttonActivity(){
        Assertions.assertThat(page.buttonIsInactive());
    }

    @When("User setting code \"$code\"")
    public void settingCode(String code){
        page.setCode(code);
    }

    @When("User see placeholder \"$placeholder\"")
    public void paceholderVisibility(String placeholder){
        page.getPlaceholder(placeholder);
    }

    @Then("User dont see placeholder \"$placeholder\"")
    public void paceholderInisibility(String placeholder){
        Assertions.assertThat(page.buttonIsActive());
    }

    @Then("User dont see any errors")
    public void errorIsInv() {
        page.errorIsInvisible();
    }

   @When("User choose filial \"$affiliate\"")
    public void filialChoosing(String affiliate){
      page.clickToDropDown();
      page.setDropDownElement(affiliate);
   }


   @Then("User goes to the Current Weighings page")
    public CurrentWeighingsSteps currentWeighingsSteps(){
      page.clickToEnterButton();
      return new CurrentWeighingsSteps();
   }


}
