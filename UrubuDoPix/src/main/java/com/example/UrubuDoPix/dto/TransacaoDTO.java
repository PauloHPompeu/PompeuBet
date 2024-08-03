package com.example.UrubuDoPix.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransacaoDTO {
    private Integer usuarioId;
    private Double valor;
    private Boolean isDeposito;
}
