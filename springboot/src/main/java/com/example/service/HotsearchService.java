package com.example.service;

import cn.hutool.core.date.DateUtil;
import com.example.entity.Account;
import com.example.entity.Hotsearch;
import com.example.mapper.HotsearchMapper;
import com.example.utils.TokenUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class HotsearchService {
    @Resource
    private HotsearchMapper hotsearchMapper;

    public void add(Hotsearch hotsearch) {
        hotsearchMapper.insert(hotsearch);
    }

    public List<Hotsearch> selectAll(Hotsearch hotsearch) {
        return hotsearchMapper.selectAll(hotsearch);
    }
}
