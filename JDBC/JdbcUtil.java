package com.train.JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JdbcUtil {
    private static  final JdbcUtil JDBC_UTIL = new JdbcUtil();
    //初始化
    public  static JdbcUtil getInstance(){
        return  JDBC_UTIL;
    }

    public Connection getConnection(){
        Connection connection = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
             connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/hw","root","123456");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
    public static void closeResource(AutoCloseable autoCloseable) {
        if (null != autoCloseable) {
            try {
                autoCloseable.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
