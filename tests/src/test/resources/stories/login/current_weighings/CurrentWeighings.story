Narrative:
This story covers current weighings page functionality

Lifecycle:
Before:
Given CurrentWeighingsPage is opened
When User setting code "135791"
And User choose filial "first_new_affiliate"
And User clicks to Enter button
Then User goes to the Current Weighings page

Scenario: Header checking and moving to non-active tab
Meta: @skip
When User see header with master name "NEW_ROBOT_MASTER"
Then User clicks to tab "ОТВЕТСТВЕННОЕ ХРАНЕНИЕ"
And User see text "Здесь будет отображаться таблица грузов на ответственном хранении"

Scenario: Popup checking
When User clicks to button "НОВОЕ ВЗВЕШИВАНИЕ"
Then User see popup with text "modal-menu works!"






