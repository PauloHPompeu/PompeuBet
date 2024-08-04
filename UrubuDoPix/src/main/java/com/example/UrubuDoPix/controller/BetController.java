package com.example.UrubuDoPix.controller;

import com.example.UrubuDoPix.dto.BetDTO;
import com.example.UrubuDoPix.dto.ListagemDTO;
import com.example.UrubuDoPix.entity.Bet;
import com.example.UrubuDoPix.entity.Evento;
import com.example.UrubuDoPix.service.BetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/bet")
@RequiredArgsConstructor
@Slf4j
public class BetController {

    private final BetService betService;

    @PostMapping("/cadastro")
    public ResponseEntity<HttpStatus> cadastroEvento(@RequestBody BetDTO betDTO) {
        return betService.cadastraBet(betDTO);
    }

    @PostMapping("/deletar/{id}")
    public ResponseEntity<HttpStatus> deletarEvento(@PathVariable Long id) {
        return betService.deletarBet(id);
    }

    @PostMapping("/confirmarAposta/{id}")
    public ResponseEntity<HttpStatus> confirmarAposta(@PathVariable Long id) {
        return betService.confirmarAposta(id);
    }

    @GetMapping("/findBetById/{id}")
    public ResponseEntity<Bet> findBetById (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(betService.findBetById(id));
    }

    @GetMapping("/findAllBetByUsuarioId/{id}")
    public ResponseEntity<List<Bet>> findAllBetByUsuarioId (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(betService.findAllBetByUsuarioId(id));
    }

    @GetMapping("/findAll")
    public List<ListagemDTO> findAll () {
        return betService.findAll();
    }
}
