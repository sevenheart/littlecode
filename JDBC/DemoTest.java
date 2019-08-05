package com.train.JDBC;

import java.sql.*;

public class DemoTest {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        //加载驱动
        Class.forName("com.mysql.jdbc.Driver");
        //链接地址：jdbc:mysql://localhost:3306/hw
        //如果想要链接其他人的数据库，只要在一个局域网内吧localhost换未其他人的ip即可,前提是运行外部i链接
        //user：用户名
        //password:密码
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/hw","root","123456");
        //只要部位null就表示可以正常获取数据库链接
        System.out.println(connection);
        //根据connection获取yongyuzhixingsql的语句对象statement
        Statement statement = connection.createStatement();
        String sql = "select * from student";
        //查询后会得到一个结果集对象：resulSet，该对象用完后要关闭
        ResultSet rs = statement.executeQuery(sql);
      //遍历result获取数据
        while (rs.next()){//和迭代器一样有头，头没有查到的数据，每执行一次切换到下一行。
            int id = rs.getInt(1);
            //根据列名去获取
            String name = rs.getString("Sname");
            System.out.println("数据是"+id+"那杀"+name);
        }
        //先打开后关闭
        rs.close();
        statement.close();

        //链接完成后关闭链接，链接是打开了内存和硬盘的通道。数据库在硬盘上。
        connection.close();
    }
}
