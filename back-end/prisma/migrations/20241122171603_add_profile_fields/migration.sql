-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female', 'Other') NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL;
