package com.silithus.anqiraj.service;

import com.silithus.anqiraj.exception.BadRequestException;
import com.silithus.anqiraj.exception.NotFoundException;
import com.silithus.anqiraj.mapper.ItemMapper;
import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.repository.ItemRepository;
import com.silithus.anqiraj.request.ItemPostRequestBody;
import com.silithus.anqiraj.request.ItemPutRequestBody;
import jakarta.transaction.Transactional;
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
        log.info("Finding item with id " + id);
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Item not found for id " + id));
    }

    public List<Item> list() {
        log.info("Listing items");
        return repository.findAll();
    }

    @Transactional
    public Item create(ItemPostRequestBody itemRequest) {
        if (!repository.findByName(itemRequest.getName()).isEmpty()) {
            throw new BadRequestException("An item with the given name already exists");
        }
        log.info("Creating item record");
        return repository.save(ItemMapper.INSTANCE.toItem(itemRequest));
    }

    @Transactional
    public Item update(ItemPutRequestBody itemRequest) {

        var duplicated = repository.findByName(itemRequest.getName());

        if (duplicated.stream().anyMatch(it -> !itemRequest.getId().equals(it.getId()))) {
            throw new BadRequestException("An item with the given name already exists");
        }
        return repository.save(ItemMapper.INSTANCE.toItem(itemRequest));
    }

    @Transactional
    public void delete(Long id) {
        repository.findById(id).orElseThrow(() -> new NotFoundException("Item not found for id " + id));
        log.info("Removing item record with id " + id);
        repository.deleteById(id);
    }
}
