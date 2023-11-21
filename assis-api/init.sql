-- Create a new database named 'YourNewDatabase'
CREATE DATABASE assis - db;
-- Connect to the newly created database
\ c assis - db;
-- Create the extension for uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Create the Customers table
CREATE TABLE Customers (
    UserID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Name VARCHAR(50),
    Email VARCHAR(50),
    Password VARCHAR(20),
    Address VARCHAR(50),
    Phone VARCHAR(20)
);
-- Create the Category table
CREATE TABLE Category (
    CategoryID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Name VARCHAR(50)
);
-- Create the Vegetables table with ImgUrl column
CREATE TABLE Vegetables (
    VegetableID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    Name VARCHAR(50),
    Price DECIMAL(10, 2),
    Quantity INT,
    CategoryID UUID,
    ImgUrl VARCHAR(255),
    Unit VARCHAR(10)
);
-- Create the Order table
CREATE TABLE "Order" (
    OrderID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    UserID UUID,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES Customers(UserID)
);
-- Create the OrderItem table
CREATE TABLE OrderItem (
    OrderItemID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    OrderID UUID,
    VegetableID UUID,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID),
    FOREIGN KEY (VegetableID) REFERENCES Vegetables(VegetableID)
);
-- Create a function to insert a new customer
CREATE OR REPLACE FUNCTION CreateNewCustomer(
        p_Name VARCHAR(50),
        p_Email VARCHAR(50),
        p_Password VARCHAR(20),
        p_Address VARCHAR(50),
        p_Phone VARCHAR(20)
    ) RETURNS VOID AS $$ BEGIN
INSERT INTO Customers (Name, Email, Password, Address, Phone)
VALUES (p_Name, p_Email, p_Password, p_Address, p_Phone);
END;
$$ LANGUAGE plpgsql;
-- Create the function to insert a new vegetable
CREATE OR REPLACE FUNCTION InsertVegetable(
        p_Name VARCHAR(50),
        p_Price DECIMAL(10, 2),
        p_Quantity INT,
        p_CategoryID UUID,
        p_ImgUrl VARCHAR(255),
        p_Unit VARCHAR(10)
    ) RETURNS VOID AS $$ BEGIN
INSERT INTO Vegetables (Name, Price, Quantity, CategoryID, ImgUrl, Unit)
VALUES (
        p_Name,
        p_Price,
        p_Quantity,
        p_CategoryID,
        p_ImgUrl,
        p_Unit
    );
END;
$$ LANGUAGE plpgsql;
-- Create a function to delete a vegetable
CREATE OR REPLACE FUNCTION DeleteVegetable(p_VegetableID UUID) RETURNS VOID AS $$ BEGIN -- Check if the vegetable exists
    IF EXISTS (
        SELECT 1
        FROM Vegetables
        WHERE VegetableID = p_VegetableID
    ) THEN -- Delete the vegetable
DELETE FROM Vegetables
WHERE VegetableID = p_VegetableID;
RAISE NOTICE 'Vegetable deleted successfully.';
ELSE RAISE NOTICE 'Vegetable not found.';
END IF;
END;
$$ LANGUAGE plpgsql;