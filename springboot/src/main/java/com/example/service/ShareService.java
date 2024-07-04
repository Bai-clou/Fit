package com.example.service;

import cn.hutool.core.util.ObjectUtil;
import com.example.common.enums.ResultCodeEnum;
import com.example.entity.Course;
import com.example.entity.Share;
import com.example.entity.UserData;
import com.example.exception.CustomException;
import com.example.mapper.ShareMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ShareService {
    @Resource
    private ShareMapper shareMapper;

    public void add(Share share) {
        shareMapper.insert(share);
    }

    public List<Share> selectAll(Share share) {
        return shareMapper.selectAll(share);
    }


    public void update(Share share) {
        Share share1 = selectByShareId(share.getId());
        if (ObjectUtil.isEmpty(share1)) {
            throw new CustomException(ResultCodeEnum.USER_NOT_EXIST_ERROR);
        }
        shareMapper.updateById(share);
    }

    public List<Share> selectById(Integer userid) {
        Share params = new Share();
        params.setUserid(userid);
        List<Share> list = this.selectAll(params);
        return list.size() == 0 ? null : list;
    }

    public Share selectByShareId(Integer id) {
        Share params = new Share();
        params.setId(id);
        List<Share> list = this.selectAll(params);
        return list.size() == 0 ? null : list.get(0);
    }

    public void deleteById(Integer id) {
        shareMapper.deleteById(id);
    }

    public void deleteBatch(List<Integer> ids) {
        for (Integer id : ids) {
            this.deleteById(id);
        }
    }

    public PageInfo<Share> selectPage(Share share, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Share> list = shareMapper.selectAll(share);
        return PageInfo.of(list);
    }
}
