package com.example.UrubuDoPix.controller;

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
        return usuarioService.cadastraUsuario(usuarioDTO);
    }

    @PostMapping("/deletar")
    public ResponseEntity<HttpStatus> deletarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.deletarUsuario(usuarioDTO);
    }

    @GetMapping("/findUsuarioById/{id}")
    public ResponseEntity<Usuario> findUsuarioById (@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findUsuarioById(id));
    }

    @PostMapping("/autenticar")
    public ResponseEntity<HttpStatus> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        return usuarioService.autenticarUsuario(usuarioDTO);
    }

//    public ResponseEntity<List<UsuarioModel>> getAllUser () {
//        return
//    }
//
//
//    @PutMapping("/user/{id}")
//    public ResponseEntity<Object> updateProduct(@PathVariable Integer id, @RequestBody @Valid AtualizacaoSaldoDto usuarioDto) {
//        Optional<UsuarioModel> usuario = usuarioRepository.findById(id);
//        if(usuario.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
//        }
//        var usuarioModel = usuario.get();
//        BeanUtils.copyProperties(usuarioDto, usuarioModel);
//        return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.save(usuarioModel));
//    }

}
