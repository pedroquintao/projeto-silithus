package com.silithus.anqiraj.service;

import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository repository;

    public Item findById(Long id) {
        log.info("Finding item");
        return repository.findById(id);
    }

    public List<Item> list() {
        log.info("Listing items");
        return repository.list();
    }
}
