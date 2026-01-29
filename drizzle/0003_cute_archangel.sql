ALTER TABLE `bookings` ADD `stripePaymentIntentId` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `stripeCheckoutSessionId` varchar(255);--> statement-breakpoint
ALTER TABLE `bookings` ADD `paymentStatus` enum('unpaid','pending','paid','refunded') DEFAULT 'unpaid' NOT NULL;