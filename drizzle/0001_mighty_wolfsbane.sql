CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`vehicleId` int NOT NULL,
	`customerName` varchar(200) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(20) NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`totalPrice` decimal(10,2) NOT NULL,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `franchiseApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`territoryId` int,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`city` varchar(100),
	`state` varchar(50),
	`investmentCapital` decimal(12,2),
	`businessExperience` text,
	`whyInterested` text,
	`status` enum('new','contacted','qualified','approved','rejected') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `franchiseApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `territories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(50) NOT NULL,
	`zipCodes` text,
	`population` int,
	`status` enum('available','pending','sold') NOT NULL DEFAULT 'available',
	`investmentMin` decimal(12,2),
	`investmentMax` decimal(12,2),
	`projectedRevenue` decimal(12,2),
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `territories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`model` varchar(100) NOT NULL,
	`year` int NOT NULL,
	`color` varchar(50),
	`range` int,
	`acceleration` varchar(20),
	`topSpeed` int,
	`dailyRate` decimal(10,2) NOT NULL,
	`weeklyRate` decimal(10,2),
	`imageUrl` text,
	`description` text,
	`features` text,
	`available` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_vehicleId_vehicles_id_fk` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `franchiseApplications` ADD CONSTRAINT `franchiseApplications_territoryId_territories_id_fk` FOREIGN KEY (`territoryId`) REFERENCES `territories`(`id`) ON DELETE no action ON UPDATE no action;