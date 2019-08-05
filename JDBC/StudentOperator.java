package com.train.JDBC;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class StudentOperator implements StudentOperatable {


    @Override
    public List<Student> findAllStudent() {
        Connection connection = JdbcUtil.getInstance().getConnection();
        Statement statement = null;
        String sql = "select * from student";
        ResultSet rs = null;
        List<Student> studentList = new ArrayList<>();
        try {
        if(connection != null){
            statement = connection.createStatement();
            rs = statement.executeQuery(sql);
            Student student;
            while (rs.next()){
                student = new Student();
                student.setId(rs.getInt(1));
                student.setName(rs.getString(3));
                student.setsBirthday(rs.getString(4));
                studentList.add(student);
            }
        }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JdbcUtil.closeResource(rs);
            JdbcUtil.closeResource(statement);
            JdbcUtil.closeResource(connection);
        }
       return  studentList;
    }

    @Override
    public int unpdateStudentById(Student student) {
        Connection connection = JdbcUtil.getInstance().getConnection();
        Statement statement = null;
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("update student set Sname='");
        stringBuffer.append(student.getName()+"' where id='");
        stringBuffer.append(student.getId()+"'");
        int index = 0;
        try {
            index = statement.executeUpdate(stringBuffer.toString());
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JdbcUtil.closeResource(statement);
            JdbcUtil.closeResource(connection);
        }
        return index;
    }

    @Override
    public int insertStudent(Student student)  {
        Connection connection = JdbcUtil.getInstance().getConnection();
        Statement statement =null;
        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("insert into  student values(null,'"+student.getsNo()+"'");
        stringBuffer.append(student.getName()+"','"+student.getsBirthday()+"',Sclass"+student.getClasses()+"')'");
        int index = 0;
        try {
            index = statement.executeUpdate(stringBuffer.toString());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            JdbcUtil.closeResource(statement);
            JdbcUtil.closeResource(connection);
        }
        return index;
    }

    @Override
    public int deleteStudentById(int id) {
        Connection connection = JdbcUtil.getInstance().getConnection();
        Statement statement = null;
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("delete from student where id = '"+ id+ "'");
        int index = 0;
        try {
            index = statement.executeUpdate(stringBuffer.toString());
        } catch (SQLException e) {
            e.printStackTrace();
        }
        finally {
            JdbcUtil.closeResource(statement);
            JdbcUtil.closeResource(connection);
        }
        return index;
    }
}
