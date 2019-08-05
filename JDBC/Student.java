package com.train.JDBC;

import com.sun.scenario.effect.impl.prism.PrImage;

import java.security.PrivateKey;

/**
 * 与student表映射的实体类。
 */
public class Student {
    private int id;
    private  String name;
    private  String sNo;

    public String getClasses() {
        return Classes;
    }

    public void setClasses(String classes) {
        Classes = classes;
    }

    private  String Classes;

    public String getsNo() {
        return sNo;
    }

    public void setsNo(String sNo) {
        this.sNo = sNo;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getsBirthday() {
        return sBirthday;
    }

    public void setsBirthday(String sBirthday) {
        this.sBirthday = sBirthday;
    }

    private  String sBirthday;


}
