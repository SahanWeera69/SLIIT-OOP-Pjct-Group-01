
package schedule;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.List;

public class DeliveryScheduler extends JFrame {
    // Data storage
    private final List<DeliverySlot> availableSlots;
    private final List<ScheduledDelivery> scheduledDeliveries;
    
    // UI Components
    private JComboBox<DeliverySlot> slotComboBox;
    private JTextField customerField;
    private JTextField packageField;
    private JTextArea outputArea;

    public DeliveryScheduler() {
        // Initialize data
        availableSlots = new ArrayList<>();
        scheduledDeliveries = new ArrayList<>();
        initializeSampleSlots();
        
        // Configure window
        setTitle("Delivery Scheduling System");
        setSize(600, 450);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setupUI();
    }

    private void initializeSampleSlots() {
        availableSlots.add(new DeliverySlot("Morning (8AM-12PM)"));
        availableSlots.add(new DeliverySlot("Afternoon (1PM-5PM)"));
        availableSlots.add(new DeliverySlot("Evening (5PM-9PM)"));
    }

    private void setupUI() {
        // Main panel with border
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10));
        mainPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Input form (GridLayout)
        JPanel formPanel = new JPanel(new GridLayout(3, 2, 5, 5));
        
        // Slot selection
        slotComboBox = new JComboBox<>(availableSlots.toArray(new DeliverySlot[0]));
        formPanel.add(new JLabel("Delivery Slot:"));
        formPanel.add(slotComboBox);
        
        // Customer info
        customerField = new JTextField();
        formPanel.add(new JLabel("Customer Name:"));
        formPanel.add(customerField);
        
        // Package info
        packageField = new JTextField();
        formPanel.add(new JLabel("Package Details:"));
        formPanel.add(packageField);

        // Buttons
        JButton scheduleBtn = new JButton("Schedule Delivery");
        scheduleBtn.addActionListener(this::handleSchedule);
        
        JButton viewBtn = new JButton("View All Bookings");
        viewBtn.addActionListener(this::handleViewBookings);
        
        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        buttonPanel.add(scheduleBtn);
        buttonPanel.add(viewBtn);

        // Output console
        outputArea = new JTextArea(10, 40);
        outputArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(outputArea);

        // Assemble UI
        mainPanel.add(formPanel, BorderLayout.NORTH);
        mainPanel.add(buttonPanel, BorderLayout.CENTER);
        mainPanel.add(scrollPane, BorderLayout.SOUTH);
        
        add(mainPanel);
    }

    private void handleSchedule(ActionEvent e) {
        String customer = customerField.getText().trim();
        String pkgDetails = packageField.getText().trim();
        
        if (customer.isEmpty() || pkgDetails.isEmpty()) {
            JOptionPane.showMessageDialog(this, 
                "Please fill in all fields", 
                "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }
        
        DeliverySlot selectedSlot = (DeliverySlot) slotComboBox.getSelectedItem();
        ScheduledDelivery newDelivery = new ScheduledDelivery(customer, pkgDetails, selectedSlot);
        
        scheduledDeliveries.add(newDelivery);
        outputArea.append("✅ Scheduled:\n" + newDelivery + "\n\n");
        
        // Clear inputs
        customerField.setText("");
        packageField.setText("");
    }

    private void handleViewBookings(ActionEvent e) {
        if (scheduledDeliveries.isEmpty()) {
            outputArea.setText("No deliveries scheduled yet.");
            return;
        }
        
        StringBuilder sb = new StringBuilder("📅 CURRENT BOOKINGS:\n\n");
        scheduledDeliveries.forEach(d -> sb.append(d).append("\n―――――\n"));
        outputArea.setText(sb.toString());
    }

    // Key integration method for other modules
    public List<ScheduledDelivery> getAllBookings() {
        return new ArrayList<>(scheduledDeliveries); // Return defensive copy
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            DeliveryScheduler scheduler = new DeliveryScheduler();
            scheduler.setVisible(true);
        });
    }
}