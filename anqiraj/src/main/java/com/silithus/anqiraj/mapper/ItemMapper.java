package com.silithus.anqiraj.mapper;

import com.silithus.anqiraj.model.Item;
import com.silithus.anqiraj.request.ItemPostRequestBody;
import com.silithus.anqiraj.request.ItemPutRequestBody;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ItemMapper {

     ItemMapper INSTANCE = Mappers.getMapper(ItemMapper.class);

    Item toItem(ItemPutRequestBody itemPutRequestBody);

    Item toItem(ItemPostRequestBody itemPostRequestBody);
}
