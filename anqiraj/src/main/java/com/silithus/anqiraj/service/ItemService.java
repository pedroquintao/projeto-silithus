package com.silithus.anqiraj.service;

import com.silithus.anqiraj.exception.BadRequestException;
import com.silithus.anqiraj.exception.NotFoundException;
import com.silithus.anqiraj.mapper.ItemMapper;
import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.repository.ItemRepository;
import com.silithus.anqiraj.request.ItemPostRequestBody;
import com.silithus.anqiraj.request.ItemPutRequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

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
                .orElseThrow(() -> new NotFoundException("Item not found for id " + id));
    }

    public List<Item> list() {
        log.info("Listing items");
        return repository.findAll();
    }

    public Item create(ItemPostRequestBody itemRequest) {
        if (!repository.findByName(itemRequest.getName()).isEmpty()) {
            throw new BadRequestException("An item with the given name already exists");
        }
        log.info("Creating item record");
        return repository.save(ItemMapper.INSTANCE.toItem(itemRequest));
    }

    public Item update(Long id, ItemPutRequestBody itemRequest) {
        if (!Objects.equals(id, itemRequest.getId())) {
            throw new BadRequestException("The item identifier is not equal to the given id");
        }

        var duplicated = repository.findByName(itemRequest.getName());

        if (duplicated.stream().anyMatch(it -> !id.equals(it.getId()))) {
            throw new BadRequestException("An item with the given name already exists");
        }
        return repository.save(ItemMapper.INSTANCE.toItem(itemRequest));
    }

    public void delete(Long id) {
        repository.findById(id).orElseThrow(() -> new NotFoundException("Item not found for id " + id));
        log.info("Removing item record");
        repository.deleteById(id);
    }
}
