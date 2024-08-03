package com.example.UrubuDoPix.service;

import com.example.UrubuDoPix.dto.BetDTO;
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

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BetService {

    private final BetRepository betRepository;
    private final EventoRepository eventoRepository;
    private final UsuarioRepository usuarioRepository;

    public void cadastraBet(BetDTO betDTO) {
        Bet bet = new Bet();
        bet.setValor(betDTO.getValor());
        bet.setNome(betDTO.getNome());
        bet.setTipoBet(betDTO.getTipoBet());

        Evento evento = eventoRepository.findById(betDTO.getEventoId()).get();
        bet.setEvento(evento);

        Usuario usuario = usuarioRepository.findById(betDTO.getUsuarioId()).get();
        bet.setUsuario(usuario);

        betRepository.save(bet);
    }

    public ResponseEntity<HttpStatus> deletarBet(BetDTO betDTO) {
        Optional<Bet> bet = betRepository.findById(betDTO.getId().longValue());
        
        if (bet.isPresent()) {
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
