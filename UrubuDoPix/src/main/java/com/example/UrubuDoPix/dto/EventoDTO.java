package com.example.UrubuDoPix.dto;

import com.example.UrubuDoPix.enums.Categoria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EventoDTO {
    private Integer id;
    private String nome;
    private LocalDateTime data = LocalDateTime.now();
    private Categoria categoria;
}
