package inf;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class DatabaseHandler {

    public static Map<String, Object> generateMonthlyReport(int year, String month) {
        Map<String, Object> reportData = new HashMap<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();
            String query = "SELECT SUM(quantity) as totalQty, " +
                    "SUM(price*quantity) as revenue, " +
                    "SUM(cost*quantity) as expenses, " +
                    "status, COUNT(*) as statusCount " +
                    "FROM oop WHERE year = ? AND month = ? " +
                    "GROUP BY status";

            pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, year);
            pstmt.setString(2, month);
            rs = pstmt.executeQuery();

            // Initialize values
            int totalDeliveries = 0;
            int totalQuantity = 0;
            double totalRevenue = 0;
            double totalExpenses = 0;
            Map<String, Integer> statusBreakdown = new HashMap<>();

            while (rs.next()) {
                totalQuantity += rs.getInt("totalQty");
                totalRevenue += rs.getDouble("revenue");
                totalExpenses += rs.getDouble("expenses");
                String status = rs.getString("status");
                statusBreakdown.put(status, rs.getInt("statusCount"));
                totalDeliveries += rs.getInt("statusCount");
            }

            // Store results in Map
            reportData.put("totalDeliveries", totalDeliveries);
            reportData.put("totalQuantity", totalQuantity);
            reportData.put("totalRevenue", totalRevenue);
            reportData.put("totalExpenses", totalExpenses);
            reportData.put("statusBreakdown", statusBreakdown);

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // Close resources...
        }
        return reportData;
    }
}