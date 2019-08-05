package com.train.JDBC;

import java.util.List;

public interface StudentOperatable {
    /**
     * 查询方法，返回一个结果集，将所有数据封装到几何中返回
     */
    List<Student> findAllStudent();

    /**
     * 修改信息
     * 返回执行sql后受影响的行数
     */
    int unpdateStudentById(Student student);

    /**
     * @param student
     * @return 执行sql后返回受影响的行数
     */
    int insertStudent(Student student);

    /**
     * 更具id删除
     *
     * @param id
     * @return 返回行数受影响的
     */
    int deleteStudentById(int id);
}