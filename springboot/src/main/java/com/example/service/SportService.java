package com.example.service;

import com.example.entity.Course;
import com.example.entity.Sport;
import com.example.mapper.SportMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SportService {
    @Resource
    private SportMapper sportMapper;

    public void add(Sport sport) {
        sportMapper.insert(sport);
    }

    public List<Sport> selectById(Integer userid) {
        Sport params = new Sport();
        params.setUserid(userid);
        List<Sport> list = this.selectAll(params);
        return list.size() == 0 ? null : list;
    }

    public List<Sport> selectAll(Sport sport) {
        return sportMapper.selectAll(sport);
    }
}
