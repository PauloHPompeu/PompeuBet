package com.example.UrubuDoPix.repository;


import com.example.UrubuDoPix.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends PagingAndSortingRepository<Evento, Long>, JpaRepository<Evento, Long>, JpaSpecificationExecutor<Evento> {
    public List<Evento> findAllBetByEventoId (Long id);

    public Evento findByNome (String nome);
}
