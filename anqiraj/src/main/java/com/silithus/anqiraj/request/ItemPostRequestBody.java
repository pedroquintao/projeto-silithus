package com.silithus.anqiraj.request;

import com.silithus.anqiraj.model.RarityEnum;
import com.silithus.anqiraj.model.SlotEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemPostRequestBody {
    @NotEmpty(message = "Field name is required")
    private String name;
    @NotNull(message = "Field slot is required")
    private SlotEnum slot;
    @NotNull(message = "Field rarity is required")
    private RarityEnum rarity;
}
