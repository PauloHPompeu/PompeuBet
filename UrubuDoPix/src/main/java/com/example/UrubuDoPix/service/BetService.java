package com.example.UrubuDoPix.service;

import com.example.UrubuDoPix.dto.BetDTO;
import com.example.UrubuDoPix.dto.ListagemDTO;
import com.example.UrubuDoPix.entity.Bet;
import com.example.UrubuDoPix.entity.Evento;
import com.example.UrubuDoPix.entity.Usuario;
import com.example.UrubuDoPix.repository.BetRepository;
import com.example.UrubuDoPix.repository.EventoRepository;
import com.example.UrubuDoPix.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BetService {

    private final BetRepository betRepository;
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    public ResponseEntity<HttpStatus> cadastraBet(BetDTO betDTO) {
        Bet bet = new Bet();

        Usuario usuario = usuarioRepository.findById(betDTO.getUsuarioId()).get();
        bet.setUsuario(usuario);

        Double saldo = usuario.getSaldo();
        if (betDTO.getValor() > saldo) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        usuario.setSaldo(saldo - betDTO.getValor());

        usuarioRepository.save(usuario);

        bet.setValor(betDTO.getValor());
        bet.setNome(betDTO.getNome());
        bet.setTipoBet(betDTO.getTipoBet());

        Evento evento = eventoRepository.findById(betDTO.getEventoId()).get();
        bet.setEvento(evento);

        betRepository.save(bet);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<ListagemDTO> findAll() {
        List<Bet> listaBets = betRepository.findAll();

        List<ListagemDTO> listagemDTO = new ArrayList<>();

        for (Bet bet : listaBets) {
            ListagemDTO dto = new ListagemDTO();

            dto.setValor(bet.getValor());
            dto.setNome(bet.getNome());
            dto.setTipoBet(bet.getTipoBet());
            dto.setNomeUsuario(bet.getUsuario().getNome());
            dto.setNomeEvento(bet.getEvento().getNome());
            dto.setCategoriaEvento(bet.getEvento().getCategoria());
            dto.setIdBet(bet.getId());

            listagemDTO.add(dto);
        }

        return listagemDTO;
    }

    public ResponseEntity<HttpStatus> deletarBet(Long id) {
        Optional<Bet> bet = betRepository.findById(id);

        if (bet.isPresent()) {
            betRepository.delete(bet.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<HttpStatus> confirmarAposta(Long id) {
        Optional<Bet> bet = betRepository.findById(id);

        if (bet.isPresent()) {
            Usuario usuario = bet.get().getUsuario();
            Double valor = bet.get().getValor();
            valor = valor * 2;

            usuario.setSaldo(usuario.getSaldo() + valor);
            usuarioRepository.save(usuario);

            betRepository.delete(bet.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public List<Bet> findAllBetByUsuarioId(Integer id) {
        return betRepository.findAllBetByUsuarioId(id.longValue());
    }

    public Bet findBetById(Integer id) {
        return betRepository.findById(id.longValue()).get();
    }
}
