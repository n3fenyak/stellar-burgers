import { expect, test } from '@playwright/test';

test.describe('Страница конструктора бургера', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'mock-access-token',
        url: 'http://localhost:4000'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });

    await page.routeFromHAR('./tests/hars/mock-api.har', {
      url: '**/api/**',
      update: false
    });

    await page.goto('/');
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-test-bun');
    const mainCard = page.getByTestId('ingredient-test-main');

    await bunCard.getByRole('button', { name: 'Добавить' }).click();
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    const constructor = page.getByTestId('burger-constructor');

    await expect(constructor).toContainText('Тестовая булка (верх)');
    await expect(constructor).toContainText('Тестовая булка (низ)');
    await expect(constructor).toContainText('Тестовая начинка');
  });

  test('открывает и закрывает модальное окно ингредиента по крестику', async ({
    page
  }) => {
    const bunCard = page.getByTestId('ingredient-test-bun');

    await bunCard.getByText('Тестовая булка').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Детали ингредиента');
    await expect(modal).toContainText('Тестовая булка');

    await page.getByTestId('modal-close').click();

    await expect(modal).not.toBeVisible();
  });

  test('закрывает модальное окно ингредиента по клику на оверлей', async ({
    page
  }) => {
    const bunCard = page.getByTestId('ingredient-test-bun');

    await bunCard.getByText('Тестовая булка').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await page.getByTestId('modal-overlay').click({
      position: {
        x: 10,
        y: 10
      }
    });

    await expect(modal).not.toBeVisible();
  });

  test('создаёт заказ и очищает конструктор', async ({ page }) => {
    const bunCard = page.getByTestId('ingredient-test-bun');
    const mainCard = page.getByTestId('ingredient-test-main');
    const constructor = page.getByTestId('burger-constructor');

    await bunCard.getByRole('button', { name: 'Добавить' }).click();
    await mainCard.getByRole('button', { name: 'Добавить' }).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('12345');
    await expect(modal).toContainText('идентификатор заказа');

    await expect(constructor).toContainText('Выберите булки');
    await expect(constructor).toContainText('Выберите начинку');
    await expect(constructor).not.toContainText('Тестовая начинка');

    await page.getByTestId('modal-close').click();

    await expect(modal).not.toBeVisible();
  });
});
