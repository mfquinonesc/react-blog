DROP DATABASE IF EXISTS BlogReactDb;

CREATE DATABASE BlogReactDb;

USE BlogReactDb;

CREATE TABLE [rol]
(
    rolId INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
);

CREATE TABLE [user]
(
    userId INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    birthday DATETIME NOT NULL,
    password VARCHAR(255) NOT NULL,
    lastAccess DATETIME NULL,
    attempts INT DEFAULT 0,
    rolId INT DEFAULT 3,
    updatedAt DATETIME NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE [post]
(
    postId INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    updatedAt DATETIME NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    --CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES [user](userId)
);

CREATE TABLE [image]
(
    imageId INT PRIMARY KEY IDENTITY(1,1),
    url VARCHAR(255) NOT NULL,
    postId INT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE [category]
(
    categoryId INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
);

CREATE TABLE [comment]
(
    commentId INT PRIMARY KEY IDENTITY(1,1),
    postId INT NOT NULL,
    userId INT NOT NULL,
    content TEXT NOT NULL,
    updatedAt DATETIME NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE [like]
(
    likeId INT PRIMARY KEY IDENTITY(1,1),
    postId INT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE [postCategory]
(
    postId INT NOT NULL,
    categoryId INT NOT NULL,
    PRIMARY KEY (postId, categoryId)
);

INSERT INTO [rol]
    ([name], [description])
VALUES
    ('Admin', 'Can do anything'),
    ('Editor', 'Can do anything but manage users'),
    ('Author', 'Only can publish posts and comment'),
    ('Subscriber', 'Receive email notifications and only read');

INSERT INTO [user]
    ( email, name , lastname, birthday , password, rolId )
VALUES
    ('admin@mail.com','Jhon','Doe','2000-04-15 14:30:00','password123456789',1)

