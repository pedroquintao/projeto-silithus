package com.silithus.anqiraj.request;

import com.silithus.anqiraj.model.RarityEnum;
import com.silithus.anqiraj.model.SlotEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemPutRequestBody {
    @NotNull(message = "Field id cannot be null")
    private Long id;
    @NotNull(message = "Field name cannot be null")
    private String name;
    @NotNull(message = "Field slot cannot be null")
    private SlotEnum slot;
    @NotNull(message = "Field rarity cannot be null")
    private RarityEnum rarity;
}
