package com.silithus.anqiraj.repository.impl;

import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.repository.ItemRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Component
public class ItemRepositoryImpl implements ItemRepository {

    private static List<Item> database;
    static {
        database = new ArrayList<>( List.of(new Item(1L,"item1"), new Item(2L, "item2")));
    }
    @Override
    public Item findById(Long id) {
        return database.stream()
                .filter(it -> it.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item not found"));
    }

    @Override
    public List<Item> list() {
        return database;
    }


}
