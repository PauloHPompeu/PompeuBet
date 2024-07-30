package com.example.UrubuDoPix.controller;

import com.example.UrubuDoPix.dto.EventoDTO;
import com.example.UrubuDoPix.entity.Evento;
import com.example.UrubuDoPix.service.EventoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/evento")
@RequiredArgsConstructor
@Slf4j
public class EventoController {

    private final EventoService eventoService;

    @PostMapping("/cadastro")
    public ResponseEntity<Void> cadastroEvento(@RequestParam EventoDTO eventoDTO) {
        eventoService.cadastraEvento(eventoDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findEventoById/{id}")
    public ResponseEntity<Evento> findEventoById (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(eventoService.findEventoById(id));
    }

    @GetMapping("/findEventoById/{id}")
    public ResponseEntity<List<Evento>> findAllBetByEventoId (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(eventoService.findAllBetByEventoId(id));
    }
}
