package com.train.JDBC;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        //查询
        StudentOperator studentOperator = new StudentOperator();
        List<Student> studentList = studentOperator.findAllStudent();
        //添加
        Student student = new Student();
        student.setId(33);
        student.setName("下路线");
        student.setsBirthday("1997-10-18");
        studentOperator.insertStudent(student);
        //修改
        student.setName("陆旭");
        studentOperator.unpdateStudentById(student);
        //删除
        studentOperator.deleteStudentById(student.getId());

    }
}
