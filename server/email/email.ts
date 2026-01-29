/**
 * Email Service Module
 * 
 * Handles sending email notifications for bookings and franchise applications.
 * Uses the Manus built-in notification API for owner notifications.
 */

import { notifyOwner } from "../_core/notification";

interface BookingEmailData {
  bookingId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
}

interface FranchiseApplicationEmailData {
  applicationId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  investmentCapital?: string;
  businessExperience?: string;
  whyInterested?: string;
}

/**
 * Send booking confirmation notification to owner
 */
export async function sendBookingNotificationToOwner(data: BookingEmailData): Promise<boolean> {
  try {
    const result = await notifyOwner({
      title: `New Booking Request #${data.bookingId}`,
      content: `
A new Tesla rental booking has been submitted!

📋 BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking ID: #${data.bookingId}
Vehicle: ${data.vehicleModel}
Dates: ${data.startDate} to ${data.endDate}
Total: $${data.totalPrice}

👤 CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

⏰ ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please review and confirm this booking in the admin dashboard.
      `.trim(),
    });
    
    console.log(`[Email] Owner notification sent for booking #${data.bookingId}`);
    return result;
  } catch (error) {
    console.error(`[Email] Failed to send owner notification for booking #${data.bookingId}:`, error);
    return false;
  }
}

/**
 * Send booking confirmation notification to owner after payment
 */
export async function sendPaymentConfirmationToOwner(data: BookingEmailData): Promise<boolean> {
  try {
    const result = await notifyOwner({
      title: `💳 Payment Confirmed - Booking #${data.bookingId}`,
      content: `
Payment has been received and the booking is now CONFIRMED!

📋 BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking ID: #${data.bookingId}
Vehicle: ${data.vehicleModel}
Dates: ${data.startDate} to ${data.endDate}
Total Paid: $${data.totalPrice}

👤 CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}

✅ STATUS: CONFIRMED & PAID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The vehicle should be prepared for pickup on ${data.startDate}.
      `.trim(),
    });
    
    console.log(`[Email] Payment confirmation sent for booking #${data.bookingId}`);
    return result;
  } catch (error) {
    console.error(`[Email] Failed to send payment confirmation for booking #${data.bookingId}:`, error);
    return false;
  }
}

/**
 * Send franchise application notification to owner
 */
export async function sendFranchiseApplicationNotification(data: FranchiseApplicationEmailData): Promise<boolean> {
  try {
    const result = await notifyOwner({
      title: `🚀 New Franchise Application #${data.applicationId}`,
      content: `
A new franchise application has been submitted!

👤 APPLICANT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.city || 'N/A'}, ${data.state || 'N/A'}

💰 INVESTMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Capital Available: ${data.investmentCapital || 'Not specified'}

📝 BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Experience:
${data.businessExperience || 'Not provided'}

Why Interested:
${data.whyInterested || 'Not provided'}

⏰ ACTION REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please follow up with this applicant within 48 hours.
Application ID: #${data.applicationId}
      `.trim(),
    });
    
    console.log(`[Email] Franchise application notification sent for #${data.applicationId}`);
    return result;
  } catch (error) {
    console.error(`[Email] Failed to send franchise notification for #${data.applicationId}:`, error);
    return false;
  }
}

export { BookingEmailData, FranchiseApplicationEmailData };
