/*
  Warnings:

  - Made the column `user_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `user_name` VARCHAR(191) NOT NULL,
    MODIFY `user_password` VARCHAR(191) NOT NULL,
    MODIFY `user_type` VARCHAR(191) NOT NULL;
