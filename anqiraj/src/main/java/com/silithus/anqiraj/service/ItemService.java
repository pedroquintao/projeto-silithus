package com.silithus.anqiraj.service;

import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@Service
@Log4j2
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository repository;

    public Item findById(Long id) {
        log.info("Finding item");
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
    }

    public List<Item> list() {
        log.info("Listing items");
        return repository.findAll();
    }

    public Item create(Item  item) {
        log.info("Creating item record");
        if(repository.findByName(item.getName()).isPresent()){
        }
        return repository.save(item);
    }

    public Item update(Long id, Item item) {
        log.info("Updating item record");
        if(!Objects.equals(id, item.getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The item identifier is not equal to the given id");
        }

        var savedItem = repository.findByName(item.getName());

        if(savedItem.isPresent() && !id.equals(savedItem.get().getId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"An item with the given name already exists");
        }
        return repository.save(item);
    }
}
