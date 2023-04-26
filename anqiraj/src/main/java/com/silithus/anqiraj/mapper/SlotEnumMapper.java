package com.silithus.anqiraj.mapper;

import com.silithus.anqiraj.model.SlotEnum;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SlotEnumMapper {
    SlotEnum toSlotEnum(String string);
}
