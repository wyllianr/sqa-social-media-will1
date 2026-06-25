import { isPasswordValid } from "@/utils/password";

describe("isPasswordValid", () => {

  it("FE-01: deve retornar true para senha válida com 10 caracteres", () => {
    expect(isPasswordValid("Abcde1@abc")).toBe(true);
  });

  it("FE-02 [BUG]: deve retornar true para senha com exatamente 8 caracteres válidos", () => {

    expect(isPasswordValid("Abcde1@a")).toBe(true);
  });

  it("deve retornar false para string vazia", () => {
    expect(isPasswordValid("")).toBe(false);
  });

  it("deve retornar false para senha sem letra maiúscula", () => {
    expect(isPasswordValid("abcde1@abc")).toBe(false);
  });

  it("deve retornar false para senha sem caractere especial", () => {
    expect(isPasswordValid("Abcde12345")).toBe(false);
  });
});