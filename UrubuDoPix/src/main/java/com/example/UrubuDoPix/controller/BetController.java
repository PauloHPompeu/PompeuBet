package com.example.UrubuDoPix.controller;

import com.example.UrubuDoPix.dto.BetDTO;
import com.example.UrubuDoPix.entity.Bet;
import com.example.UrubuDoPix.service.BetService;
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
@RequestMapping("/bet")
@RequiredArgsConstructor
@Slf4j
public class BetController {

    private final BetService betService;

    @PostMapping("/cadastro")
    public ResponseEntity<Void> cadastroEvento(@RequestParam BetDTO betDTO) {
        betService.cadastraBet(betDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/findBetById/{id}")
    public ResponseEntity<Bet> findBetById (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(betService.findBetById(id));
    }

    @GetMapping("/findAllBetByUsuarioId/{id}")
    public ResponseEntity<List<Bet>> findAllBetByUsuarioId (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(betService.findAllBetByUsuarioId(id));
    }
}
