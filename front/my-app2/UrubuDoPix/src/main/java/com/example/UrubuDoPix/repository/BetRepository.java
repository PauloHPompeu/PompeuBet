package com.example.UrubuDoPix.repository;


import com.example.UrubuDoPix.entity.Bet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BetRepository extends PagingAndSortingRepository<Bet, Long>, JpaRepository<Bet, Long>, JpaSpecificationExecutor<Bet> {
    List<Bet> findAllBetByUsuarioId(Long id);
}
