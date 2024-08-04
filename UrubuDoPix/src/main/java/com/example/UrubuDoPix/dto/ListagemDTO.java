package com.example.UrubuDoPix.dto;

import com.example.UrubuDoPix.enums.Categoria;
import com.example.UrubuDoPix.enums.TipoBet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ListagemDTO {
    private Double valor;
    private String nome;
    private TipoBet tipoBet;
    private String nomeUsuario;
    private String nomeEvento;
    private Categoria categoriaEvento;
    private Long idBet;
}
