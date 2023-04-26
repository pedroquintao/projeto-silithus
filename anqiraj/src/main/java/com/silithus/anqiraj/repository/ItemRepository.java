package com.silithus.anqiraj.repository;

import com.silithus.anqiraj.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long> {
    List<Item> findByName(String name);

}
