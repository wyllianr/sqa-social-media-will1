import { test, expect } from '@playwright/test';

// endereço da API Spring Boot
const API_URL = 'http://localhost:8080';

// email único para não conflitar entre execuções
const emailNovo = `api_${Date.now()}@email.com`;
const senhaValida = 'Senha@123';

// Teste 1:
test('POST /auth/signup - cadastro com dados válidos retorna 200', async ({ request }) => {
  const response = await request.post(`${API_URL}/auth/signup`, {
    data: {
      email: emailNovo,
      password: senhaValida,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.email).toBe(emailNovo);
});

// Teste 2:
test('POST /auth/signup - email já cadastrado retorna 409', async ({ request }) => {
  const emailDuplicado = `dup_${Date.now()}@email.com`;

  await request.post(`${API_URL}/auth/signup`, {
    data: { email: emailDuplicado, password: senhaValida },
  });

  const response = await request.post(`${API_URL}/auth/signup`, {
    data: { email: emailDuplicado, password: senhaValida },
  });

  expect(response.status()).toBe(409);

  const body = await response.json();
  expect(body.message).toBe('E-mail já está em uso');
});

test('POST /auth/signin - login com credenciais corretas retorna 200', async ({ request }) => {
  const emailLogin = `signin_${Date.now()}@email.com`;

  await request.post(`${API_URL}/auth/signup`, {
    data: { email: emailLogin, password: senhaValida },
  });

  const response = await request.post(`${API_URL}/auth/signin`, {
    data: {
      email: emailLogin,
      password: senhaValida,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.email).toBe(emailLogin);
});

// Teste 4:
test('POST /auth/signin - senha incorreta retorna 401', async ({ request }) => {
  const response = await request.post(`${API_URL}/auth/signin`, {
    data: {
      email: 'naoexiste@email.com',
      password: 'SenhaErrada@1',
    },
  });

  expect(response.status()).toBe(401);

  const body = await response.json();
  expect(body.message).toBe('Credenciais inválidas');
});