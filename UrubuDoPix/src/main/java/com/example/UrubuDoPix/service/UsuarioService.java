package com.example.UrubuDoPix.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.UrubuDoPix.dto.UsuarioDTO;
import com.example.UrubuDoPix.entity.Usuario;
import com.example.UrubuDoPix.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<HttpStatus> cadastraUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = new Usuario();

        Usuario verificaNome = usuarioRepository.findByNome(usuarioDto.getNome());

        if (verificaNome != null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        usuario.setNome(usuarioDto.getNome());
        usuario.setSenha(passwordEncoder.encode(usuarioDto.getSenha()));
        usuario.setSaldo(usuarioDto.getSaldo());

        usuarioRepository.save(usuario);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> deletarUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = usuarioRepository.findByNome(usuarioDto.getNome());

        if (usuario == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (passwordEncoder.matches(usuarioDto.getSenha(), usuario.getSenha())) {
            usuarioRepository.delete(usuario);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<HttpStatus> autenticarUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = usuarioRepository.findByNome(usuarioDto.getNome());

        if (usuario == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (passwordEncoder.matches(usuarioDto.getSenha(), usuario.getSenha())) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public Usuario  findUsuarioById(Integer id) {
        return usuarioRepository.findById(id.longValue()).get();
    }
}
