package com.example.mapper;

import com.example.entity.Hotsearch;

import java.util.List;

public interface HotsearchMapper {
    int insert(Hotsearch hotsearch);

    List<Hotsearch> selectAll(Hotsearch hotsearch);
}
