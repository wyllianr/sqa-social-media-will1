import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "@/app/signup/page";

//senha inválida . esse passa e funciona
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

//isolando tela
jest.mock("@/components/Header", () => () => null);

const mockLogin = jest.fn();
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    user: null,
    logout: jest.fn(),
  }),
}));

const mockSignUp = jest.fn();
jest.mock("@/service/auth/auth", () => ({
  authService: {
    signUp: (...args: unknown[]) => mockSignUp(...args),
  },
}));

describe("SignUp — Integração", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //senha inválida não chama a API e exibe mensagem de erro
  it("FE-09: exibe erro de senha e não chama signUp quando a senha é inválida", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "usuario@exemplo.com" },
    });

    //senha inválida
    const camposSenha = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(camposSenha[0], { target: { value: "fraca" } });
    fireEvent.change(camposSenha[1], { target: { value: "fraca" } });

    //envia
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));


    await waitFor(() => {
      const erros = screen.getAllByText(/A senha deve conter/i);
      expect(erros.length).toBeGreaterThanOrEqual(1);
    });

    //caso não seja enviada
    expect(mockSignUp).not.toHaveBeenCalled();
    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("chama signUp e redireciona para '/' quando dados são válidos", async () => {
    mockSignUp.mockResolvedValueOnce({ id: 1, email: "usuario@exemplo.com" });

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("seu@email.com"), {
      target: { value: "usuario@exemplo.com" },
    });

    const camposSenha = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(camposSenha[0], { target: { value: "Abcde1@abc" } });
    fireEvent.change(camposSenha[1], { target: { value: "Abcde1@abc" } });

    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "usuario@exemplo.com",
        password: "Abcde1@abc",
      });
      expect(mockLogin).toHaveBeenCalledWith({ id: 1, email: "usuario@exemplo.com" });
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
