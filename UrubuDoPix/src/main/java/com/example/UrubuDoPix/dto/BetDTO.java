package com.example.UrubuDoPix.dto;

import com.example.UrubuDoPix.enums.TipoBet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BetDTO {
    private Double valor;
    private TipoBet tipoBet;
    private Long usuarioId;
    private Long eventoId;
    private Integer id;
}
