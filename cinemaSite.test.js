const { expect } = require("chai");
const { getText, clickElement, choseElement } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Movies Ticket Reservation tests", () => {
  test("Successful reservation of standart seats + check date navigation", async () => {
    // выбираем и получаем дату
    await choseElement(page, "nav > a", 2);
    const expectedDate = await getText(page, ".page-nav__day.page-nav__day_chosen .page-nav__day-number");
    // выбираем фильм
    await choseElement(page, "ul > .movie-seances__time-block", 0);
    // выбираем места standart
    const expectedMovie = await getText(page, "h2.buying__info-title");
    const expectedTime = (await getText(page, "p.buying__info-start")).slice(-5);
    await clickElement(page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_taken)");
    await clickElement(page, ".acceptin-button");
    
    // проверки на странице брони
    const actualMovie = await getText(page, ".ticket__title");
    const actualDate = (await getText(page, "div > p:nth-child(4) > span")).slice(0, 2);
    const actualTime = await getText(page, ".ticket__start");
    expect(page.url()).to.equal("https://qamid.tmweb.ru/client/payment.php");
    expect(actualDate).to.equal(expectedDate);
    expect(actualMovie).to.equal(expectedMovie);
    expect(actualTime).to.equal(expectedTime);
  });

  test("Successful reservation of VIP seats + check date navigation", async () => {
    // выбираем и получаем дату
    await choseElement(page, "nav > a", 1);
    const expectedDate = await getText(page, ".page-nav__day.page-nav__day_chosen .page-nav__day-number");
    // выбираем фильм
    await choseElement(page, "ul > .movie-seances__time-block", 1);
    // выбираем места VIP
    await clickElement(page, ".buying-scheme__wrapper span:not(.buying-scheme__chair_standart)");
    const expectedMovie = await getText(page, "h2.buying__info-title");
    const expectedTime = (await getText(page, "p.buying__info-start")).slice(-5)
    const expectedPrice = await getText(page, "p:nth-child(2) > span.buying-scheme__legend-value");
    await clickElement(page, ".acceptin-button");

    // проверки на странице брони
    const actualMovie = await getText(page, ".ticket__title");
    const actualDate = (await getText(page, "div > p:nth-child(4) > span")).slice(0, 2);
    const actualTime = await getText(page, ".ticket__start");
    const actualPrice = await getText(page, ".ticket__cost");
    expect(page.url()).to.equal("https://qamid.tmweb.ru/client/payment.php");
    expect(actualDate).to.equal(expectedDate);
    expect(actualMovie).to.equal(expectedMovie);
    expect(actualTime).to.equal(expectedTime);
    expect(actualPrice).to.equal(expectedPrice);
  });

  test("Should not do reservation when seat reserved", async () => {
    // выбираем дату
    await choseElement(page, "nav > a", 2);
    // выбираем фильм
    await choseElement(page, "ul > .movie-seances__time-block", 0);
    // выбираем места
    await clickElement(page, ".buying-scheme__chair_taken");
    await clickElement(page, ".acceptin-button");
    const expectButton = await page.$eval(".acceptin-button", link => link.disabled);

    // проверяем на странице брони
    expect(page.url()).to.equal("https://qamid.tmweb.ru/client/hall.php");
    expect(expectButton).equal(true);
  });
});