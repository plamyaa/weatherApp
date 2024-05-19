describe('Weather App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display the home screen', async () => {
    await expect(element(by.text('Good morning!'))).toBeVisible();
  });

  it('should search for a city and display its weather', async () => {
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).typeText('Kirov');
    await element(by.id('searchButton')).tap();

    await expect(element(by.text('25°'))).toBeVisible();
  });

  it('should handle city not found error and show error popup', async () => {
    await element(by.id('searchInput')).tap();
    await element(by.id('searchInput')).typeText('Invalid City');
    await element(by.id('searchButton')).tap();

    await expect(element(by.text('City not found'))).toBeVisible();
  });
});
