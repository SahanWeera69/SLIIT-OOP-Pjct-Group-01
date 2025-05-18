package schedule;  // main package

public class DeliverySlot {
    private final String timeRange;
    
    public DeliverySlot(String timeRange) {
        this.timeRange = timeRange;
    }
    
    public String getTimeRange() { 
        return timeRange; 
    }
    
    @Override
    public String toString() {
        return timeRange; // e.g., "Morning (8AM-12PM)"
    }
}
