package com.example.entity;

import java.util.List;

public class UserData{
    private Integer userid;
    private Double weight;
    private Integer allconsum;
    private long lastRecord;
    private String weekconsum;
    private String wantcourse;
    private String alreadycourse;
    private String sportdate;
    private Double height;
    private Double bmi;
    private Double rate;
    private String shares;

    public String getShares() {
        return shares;
    }

    public void setShares(String shares) {
        this.shares = shares;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getSportdate() {
        return sportdate;
    }

    public void setSportdate(String sportdate) {
        this.sportdate = sportdate;
    }

    public long getLastRecord() {
        return lastRecord;
    }

    public void setLastRecord(long lastRecord) {
        this.lastRecord = lastRecord;
    }

    public String getWantcourse() {
        return wantcourse;
    }

    public void setWantcourse(String wantcourse) {
        this.wantcourse = wantcourse;
    }

    public String getAlreadycourse() {
        return alreadycourse;
    }

    public void setAlreadycourse(String alreadycourse) {
        this.alreadycourse = alreadycourse;
    }

    public String getWeekconsum() {
        return weekconsum;
    }

    public void setWeekconsum(String weekconsum) {
        this.weekconsum = weekconsum;
    }

    public Integer getAllconsum() {
        return allconsum;
    }

    public void setAllconsum(Integer allconsum) {
        this.allconsum = allconsum;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

}
