import { test, expect } from '@playwright/test';

const senhaTeste = 'Senha@123';

// Teste 1: fluxo de cadastro completo
test('fluxo de cadastro - criar nova conta com sucesso', async ({ page }) => {
  const emailCadastro = `cadastro_${Date.now()}@email.com`;

  await page.goto('/signup');

  await page.fill('input[type="email"]', emailCadastro);

  const camposSenha = page.locator('input[type="password"]');
  await camposSenha.nth(0).fill(senhaTeste);
  await camposSenha.nth(1).fill(senhaTeste);

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/', { timeout: 5000 });
});



// Teste 2:
test('fluxo de login - entrar com conta existente', async ({ page }) => {
  // EMAIL NOVO PRA N DAR CONFLITO
  const emailLogin = `login_${Date.now()}@email.com`;

  await page.goto('/signup');

  await page.fill('input[type="email"]', emailLogin);

  const camposSenhaCadastro = page.locator('input[type="password"]');
  await camposSenhaCadastro.nth(0).fill(senhaTeste);
  await camposSenhaCadastro.nth(1).fill(senhaTeste);

  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:3000/', { timeout: 5000 });

  await page.goto('/signin');

  await page.fill('input[type="email"]', emailLogin);
  await page.fill('input[type="password"]', senhaTeste);
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/', { timeout: 5000 });
});
