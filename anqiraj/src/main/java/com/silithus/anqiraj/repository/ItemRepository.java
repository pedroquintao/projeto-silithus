package com.silithus.anqiraj.repository;

import com.silithus.anqiraj.model.Item;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository {
    Item findById(Long id);

    List<Item> list();
}
