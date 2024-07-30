package com.example.UrubuDoPix.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsuarioDTO {
    private String nome;
    private String senha;
    private Double saldo = 0.0;
    private Integer id = null;
}
