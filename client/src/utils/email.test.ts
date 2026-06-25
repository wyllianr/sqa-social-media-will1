import { isEmailValid } from "@/utils/email";

//testes  `isEmailValid` verifica que um email válido com formato correto é aceito. - verifica que uma string sem "@" é rejeitada como email inválido.
//usa a regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/ para proibir certas ações e formatação

describe("isEmailValid", () => {

  it('deve retornar true para um email válido "usuario@exemplo.com"', () => {
    expect(isEmailValid("usuario@exemplo.com")).toBe(true);
  });

  it('deve retornar false para uma string sem "@" (ex: "nao-e-um-email")', () => {
    expect(isEmailValid("nao-e-um-email")).toBe(false);
  });
});
