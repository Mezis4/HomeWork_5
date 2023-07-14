module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
        throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  choseElement: async function (page, selector, number) {
    try {
      await page.waitForSelector(selector);
      const elements = await page.$$(selector);
      await elements[number].click();
    } catch (error) {
        throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  }
};