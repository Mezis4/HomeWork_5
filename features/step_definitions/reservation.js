const {Given, When, Then, Before, After} = require('cucumber');
const puppeteer = require('puppeteer');
const chai = require("chai");
const expect = chai.expect;
const { clickElement, choseElement } = require("../../lib/commands.js");
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the start page", async function () {
  return await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
    setTimeout: 100000,
  });
});

When("user select the third tab with date", async function () {
  return await choseElement(this.page, "nav > a", 2);
});

When("user select the second tab with date", async function () {
  return await choseElement(this.page, "nav > a", 1);
});

When("user select the first available time", async function () {
  return await choseElement(this.page, "ul > .movie-seances__time-block", 0);
});

When("user select the second available time", async function () {
  return await choseElement(this.page, "ul > .movie-seances__time-block", 1);
});

When("user select the first not reserved standart seat", async function () {
  return await clickElement(this.page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_taken)");
});

When("user select the first not reserved VIP seat", async function () {
  return await clickElement(this.page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_standart)");
});

When("user select the first taken chair", async function () {
  return await clickElement(this.page, ".buying-scheme__chair_taken");
});

When("user click on the booking button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("user is on the reservation full information page", async function () {
  expect(this.page.url()).to.equal("https://qamid.tmweb.ru/client/hall.php");
});

Then("booking button is disabled", async function () {
  const button = await this.page.$eval(".acceptin-button", link => link.disabled);
  expect(button).equal(true);
});