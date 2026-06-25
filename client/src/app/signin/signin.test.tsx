import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./page";


//expõe login como jest.fn() para verificar chamadas
const mockLogin = jest.fn();
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    logout: jest.fn(),
  }),
}));

//captura chamadas ao router.push
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

//isola a tela de Signin

jest.mock("@/components/Header", () => () => null);


//resolve com dados de usuário válidos

jest.mock("@/service/auth/auth", () => ({
  authService: {
    signIn: jest.fn().mockResolvedValue({ id: 1, email: "usuario@exemplo.com" }),
  },
}));

describe("SignIn — tela de login", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
  });

  // verificar que o fluxo completo de login funciona corretamente. esse passa e funciona 
  it("FE-10: credenciais válidas devem chamar login e redirecionar para /", async () => {
    render(<SignIn />);
    const inputEmail = screen.getByPlaceholderText("seu@email.com");
    fireEvent.change(inputEmail, {
      target: { value: "usuario@exemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Abcde1@abc" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        id: 1,
        email: "usuario@exemplo.com",
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});