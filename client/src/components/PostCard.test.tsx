import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostCard from "@/components/PostCard";

// usuário deslogado que tenta curtir vê alerta esse passa e funciona -  post já curtido exibe "Curtido" no botão esse passa e funciona


const postBase = {
  id: 1,
  title: "Título do Post",
  body: "Corpo do post para teste.",
  liked: false,
};

describe("PostCard", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  //usuário deslogado tenta curtir
  it("FE-07: exibe alerta quando usuário não autenticado clica em curtir", () => {
    render(
      <PostCard
        post={{ ...postBase, liked: false }}
        isAuthenticated={false}
        onLike={jest.fn()}
      />
    );

    const botaoCurtir = screen.getByRole("button");
    fireEvent.click(botaoCurtir);

    expect(window.alert).toHaveBeenCalledWith(
      "Você precisa estar autenticado para curtir posts!"
    );
  });

  //já curtido exibe "Curtido"
  it("FE-08: exibe 'Curtido' no botão quando post.liked é true", () => {
    render(
      <PostCard
        post={{ ...postBase, liked: true }}
        isAuthenticated={true}
        onLike={jest.fn()}
      />
    );

    expect(screen.getByText("Curtido")).toBeInTheDocument();
  });

  it("exibe o título e o corpo do post", () => {
    render(
      <PostCard
        post={postBase}
        isAuthenticated={false}
        onLike={jest.fn()}
      />
    );

    expect(screen.getByText("Título do Post")).toBeInTheDocument();
    expect(screen.getByText("Corpo do post para teste.")).toBeInTheDocument();
  });

  it("exibe 'Curtir' no botão quando post.liked é false", () => {
    render(
      <PostCard
        post={{ ...postBase, liked: false }}
        isAuthenticated={true}
        onLike={jest.fn()}
      />
    );

    expect(screen.getByText("Curtir")).toBeInTheDocument();
  });
});
