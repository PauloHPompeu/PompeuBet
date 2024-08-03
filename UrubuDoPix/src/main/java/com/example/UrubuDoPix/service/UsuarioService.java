package com.example.UrubuDoPix.service;

import com.example.UrubuDoPix.dto.TransacaoDTO;
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
        usuario.setSaldo(0.0);

        usuarioRepository.save(usuario);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> editarUsuario(UsuarioDTO usuarioDto) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(usuarioDto.getId())).get();

        if (usuario.getNome() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        usuario.setNome(usuarioDto.getNome());
        usuario.setSenha(passwordEncoder.encode(usuarioDto.getSenha()));
        usuario.setSaldo(usuario.getSaldo());
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

    public Long findUsuarioByNome(String nome) {
        Usuario usuario = usuarioRepository.findByNome(nome);
        return usuario.getId();
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

    public ResponseEntity<HttpStatus> tratarTransacao(TransacaoDTO transacaoDto) {
        Usuario usuario = usuarioRepository.findById(Long.valueOf(transacaoDto.getUsuarioId())).get();

        if (transacaoDto.getIsDeposito()) {
            usuario.setSaldo(usuario.getSaldo() + transacaoDto.getValor());
            usuarioRepository.save(usuario);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            Double saldo = usuario.getSaldo();
            if (transacaoDto.getValor() > saldo) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            } else {
                usuario.setSaldo(usuario.getSaldo() - transacaoDto.getValor());
                usuarioRepository.save(usuario);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
    }

    public Usuario findUsuarioById(Integer id) {
        return usuarioRepository.findById(id.longValue()).get();
    }
}
