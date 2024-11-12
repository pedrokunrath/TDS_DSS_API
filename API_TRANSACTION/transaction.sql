
CREATE TABLE transactions.transaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_qvaifazeropix INT NOT NULL,
    id_qvaireceberopix INT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_qvaifazeropix) REFERENCES users(id),
    FOREIGN KEY (id_qvaireceberopix) REFERENCES users(id)
);