Feature: Movies Ticket Reservation
  Scenario: Reservation of standart seats
    Given user is on the start page
    When user select the third tab with date
    And user select the first available time
    And user select the first not reserved standart seat
    And user click on the booking button
    Then user is on the reservation full information page

  Scenario: Reservation of VIP seats
    Given user is on the start page
    When user select the second tab with date
    And user select the second available time
    And user select the first not reserved VIP seat 
    And user click on the booking button
    Then user is on the reservation full information page

  Scenario: Reservation isn't available
    Given user is on the start page
    When user select the third tab with date
    And user select the first available time
    And user select the first taken chair
    Then booking button is disabled