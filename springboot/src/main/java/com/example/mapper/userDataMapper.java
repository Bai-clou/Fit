package com.example.mapper;

import com.example.entity.UserData;

import java.util.List;

public interface userDataMapper {
    List<UserData> selectAll(UserData userData);

    int updateById(UserData userData);

    int insert(UserData userData);
}
