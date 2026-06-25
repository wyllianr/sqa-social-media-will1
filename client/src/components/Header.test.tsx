import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/Header";

//teste header usuário deslogado vê "Entrar" e "Criar Conta". esse passa e funciona - usuário logado vê "Posts Curtidos" e "Sair". esse passa e funciona

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockUseAuth = jest.fn();
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("Header", () => {

  it("FE-05: exibe 'Entrar' e 'Criar Conta' quando não autenticado", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByText("Criar Conta")).toBeInTheDocument();
    expect(screen.queryByText("Posts Curtidos")).not.toBeInTheDocument();
    expect(screen.queryByText("Sair")).not.toBeInTheDocument();
  });

  it("FE-06: exibe 'Posts Curtidos' e 'Sair' quando autenticado", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Posts Curtidos")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
    expect(screen.queryByText("Entrar")).not.toBeInTheDocument();
    expect(screen.queryByText("Criar Conta")).not.toBeInTheDocument();
  });

  it("exibe o título 'SQA Social Media' independente do estado de autenticação", () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText("SQA Social Media")).toBeInTheDocument();
  });
});
