package com.silithus.anqiraj.mapper;

import com.silithus.anqiraj.model.RarityEnum;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RarityEnumMapper {
    RarityEnum toRarityEnum(String string);
}
