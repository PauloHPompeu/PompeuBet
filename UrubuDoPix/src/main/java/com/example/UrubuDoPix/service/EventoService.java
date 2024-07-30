package com.example.UrubuDoPix.service;

import com.example.UrubuDoPix.dto.EventoDTO;
import com.example.UrubuDoPix.entity.Evento;
import com.example.UrubuDoPix.repository.EventoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    // public List<Evento> findAllBetByEventoId (Integer id) {
    //     //return eventoRepository.findAllBetByEventoId(Long.valueOf(id));
    // }

    public Evento findEventoById(Integer id) {
        return eventoRepository.findById(id.longValue()).get();
    }
}
