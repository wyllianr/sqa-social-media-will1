package com.demoapp.demo.service;

import com.demoapp.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        userService = new UserService(userRepository);
    }

    // senha válida é aceita

    @Test
    @DisplayName("BE-01: isPasswordValid deve retornar true para senha válida com 8+ caracteres")
    void testIsPasswordValid_senhaValida_retornaTrue() {
        // Senha com maiúscula, minúscula, número e caractere especial, 10 chars
        boolean resultado = userService.isPasswordValid("Abcde1@abc");

        assertTrue(resultado,
            "Senha válida com todos os critérios deve ser aceita");
    }
    // senha sem maiúscula é rejeitada
    @Test
    @DisplayName("BE-02: isPasswordValid deve retornar false para senha sem letra maiúscula")
    void testIsPasswordValid_semMaiuscula_retornaFalse() {
        boolean resultado = userService.isPasswordValid("abcde1@abc");

        assertFalse(resultado,
            "Senha sem letra maiúscula deve ser rejeitada");
    }


    // email sem domínio deveria ser inválido mas é aceito

    @Test
    @DisplayName("BE-03 [BUG]: isEmailValid deve retornar false para 'usuario@' (sem domínio)")
    void testIsEmailValid_semDominio_retornaFalse() {

        boolean resultado = userService.isEmailValid("usuario@");

        assertFalse(resultado,
            "[BUG] Email sem domínio não deveria ser aceito. " +
            "A implementação atual usa email.contains('@') e retorna true.");
    }
}
