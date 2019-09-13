Narrative:
This story covers login

Lifecycle:
Before:
Given LoginPage is opened

Scenario: Login without user_code
Meta:@skip
When User clicks to code field
And User see placeholder "Введите 6 символов"
And User clicks to header
Then User see error "Поле не может быть пустым."
And User see thah Enter button is inactive

Scenario: Login with short user_code
Meta:@skip
When User setting code "123"
And User clicks to header
Then User see error "Номер должен быть длиной в 6 символов. Cейчас 3."
And User see thah Enter button is inactive

Scenario: Login with characters user_code
Meta:@skip
When User setting code "asdqwe"
And User clicks to header
Then User see error "Введите число."
And User see thah Enter button is inactive

Scenario: Login with long user_code
Meta:@skip
When User setting code "1234567"
And User clicks to header
Then User see error "Номер должен быть длиной в 6 символов. Cейчас 7."
And User see thah Enter button is inactive

Scenario: Login with long user_code
Meta:@skip
When User setting code "123456"
And User clicks to header
Then User dont see any errors
And User see thah Enter button is inactive

Scenario: Login with correct credentials
Meta:@skip
When User setting code "135791"
And User choose filial "first_new_affiliate"
And User clicks to Enter button
Then User goes to the Current Weighings page

