package com.silithus.anqiraj.controller;

import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.request.ItemPostRequestBody;
import com.silithus.anqiraj.request.ItemPutRequestBody;
import com.silithus.anqiraj.service.ItemService;
import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> list() {
        return new ResponseEntity<>(itemService.list(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> findById(@PathVariable Long id) {
        return new ResponseEntity<>(itemService.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Item> create(@RequestBody @Validated ItemPostRequestBody item) {
        return new ResponseEntity<>(itemService.create(item),HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Item> update(@RequestBody @Validated ItemPutRequestBody item) {
        return new ResponseEntity<>(itemService.update(item), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @Nonnull Long id) {
        itemService.delete(id);
    }
}
