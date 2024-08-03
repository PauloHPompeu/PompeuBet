package com.example.UrubuDoPix.service;

import com.example.UrubuDoPix.dto.EventoDTO;
import com.example.UrubuDoPix.entity.Evento;
import com.example.UrubuDoPix.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public void cadastraEvento(EventoDTO eventoDTO) {
        Evento evento = new Evento();

        evento.setNome(eventoDTO.getNome());
        evento.setData(eventoDTO.getData());
        evento.setCategoria(eventoDTO.getCategoria());

        eventoRepository.save(evento);
    }

    public ResponseEntity<HttpStatus> deletarEvento(EventoDTO eventoDTO) {
        Evento evento = eventoRepository.findByNome(eventoDTO.getNome());

        if (evento != null) {
            eventoRepository.delete(evento);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public List<Evento> findAll () {
        return eventoRepository.findAll();
    }

    public Evento findEventoById(Integer id) {
        return eventoRepository.findById(id.longValue()).get();
    }
}
