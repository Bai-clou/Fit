package com.example.service;

import com.example.entity.Comment;
import com.example.mapper.CommentMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CommentService {
    @Resource
    private CommentMapper commentMapper;

    public void add(Comment comment) {
        commentMapper.insert(comment);
    }

    public List<Comment> selectAll(Comment comment) {
        return commentMapper.selectAll(comment);
    }
}
