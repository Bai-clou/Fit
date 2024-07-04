package com.example.entity;

public class Sport {
    private Integer id;
    private Integer type;
    private Integer userid;
    private String alltime;
    private String disnum;
    private Integer stepnum;
    private String typenum;
    private Integer consumption;
    private Double latitude;
    private Double longitude;
    private String markers;
    private String polyline;
    private Integer stepfre;
    private String date;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getStepfre() {
        return stepfre;
    }

    public void setStepfre(Integer stepfre) {
        this.stepfre = stepfre;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getAlltime() {
        return alltime;
    }

    public void setAlltime(String alltime) {
        this.alltime = alltime;
    }

    public String getDisnum() {
        return disnum;
    }

    public void setDisnum(String disnum) {
        this.disnum = disnum;
    }

    public Integer getStepnum() {
        return stepnum;
    }

    public void setStepnum(Integer stepnum) {
        this.stepnum = stepnum;
    }

    public String getTypenum() {
        return typenum;
    }

    public void setTypenum(String typenum) {
        this.typenum = typenum;
    }

    public Integer getConsumption() {
        return consumption;
    }

    public void setConsumption(Integer consumption) {
        this.consumption = consumption;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getMarkers() {
        return markers;
    }

    public void setMarkers(String markers) {
        this.markers = markers;
    }

    public String getPolyline() {
        return polyline;
    }

    public void setPolyline(String polyline) {
        this.polyline = polyline;
    }
}
