package com.example.UrubuDoPix.controller;

import com.example.UrubuDoPix.dto.TransacaoDTO;
import com.example.UrubuDoPix.dto.UsuarioDTO;
import com.example.UrubuDoPix.entity.Usuario;
import com.example.UrubuDoPix.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
@Slf4j
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<HttpStatus> cadastraUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        ResponseEntity<HttpStatus> response = usuarioService.cadastraUsuario(usuarioDTO);
        return response;
    }

    @PostMapping("/deletar")
    public ResponseEntity<HttpStatus> deletarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.deletarUsuario(usuarioDTO);
    }

    @GetMapping("/findUsuarioById/{id}")
    public ResponseEntity<Usuario> findUsuarioById (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findUsuarioById(id));
    }

    @PostMapping("/edit")
    public ResponseEntity<HttpStatus> editarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.editarUsuario(usuarioDTO);
    }

    @PostMapping("/autenticar")
    public ResponseEntity<HttpStatus> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.autenticarUsuario(usuarioDTO);
    }

    @PostMapping("/transacao")
    public ResponseEntity<HttpStatus> tratarTransacao(@RequestBody TransacaoDTO transacaoDTO) {
        return usuarioService.tratarTransacao(transacaoDTO);
    }

    @GetMapping("/findUsuarioByNome/{nome}")
    public Long findUsuarioByNome(@PathVariable String nome) {
        return usuarioService.findUsuarioByNome(nome);
    }

}
