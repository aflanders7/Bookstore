SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Merchandise (
    merchID INT(10) NOT NULL AUTO_INCREMENT,
    merchName VARCHAR(45) NOT NULL,
    merchPrice DECIMAL(6,2) NOT NULL,
    merchQuantity INT(10) NOT NULL,
    PRIMARY KEY (merchID)
);

INSERT INTO Merchandise (merchName, merchPrice, merchQuantity)
VALUES ('Floral Bookmark', 1.99, 14),
('Bumblebee Spiral Notebook', 9.99, 8),
('Red Reading Light', 12.30, 10);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;