package schedule;  // Same package

public class ScheduledDelivery {
    private final String customerName;
    private final String packageDetails;
    private final DeliverySlot slot;  // composition
    
    public ScheduledDelivery(String customerName, String packageDetails, DeliverySlot slot) {
        this.customerName = customerName;
        this.packageDetails = packageDetails;
        this.slot = slot;  // DeliverySlot as a property
    }
    
    // Getters for integration
    public DeliverySlot getSlot() { 
        return slot; 
    }
    
    @Override
    public String toString() {
        return String.format(
            "Customer: %s\nPackage: %s\nSlot: %s",
            customerName, packageDetails, slot
        );
    }
}