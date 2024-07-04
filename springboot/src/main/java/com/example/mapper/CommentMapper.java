package com.example.mapper;

import com.example.entity.Comment;

import java.util.List;

public interface CommentMapper {

    int insert(Comment comment);

    List<Comment> selectAll(Comment comment);
}
