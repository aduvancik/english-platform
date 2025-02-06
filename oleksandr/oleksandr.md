# Database Normalization and Its Levels

Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves breaking down a database into smaller, manageable tables and establishing
relationships between them to ensure that data is stored logically and efficiently. The primary goal of normalization is to minimize data duplication and ensure that the data is consistent and easy to update.

Normalization is performed in stages, called **normal forms**. Each normal form (NF) builds upon the previous one, addressing specific issues in data structure. Here are the main normal forms:

## 1. First Normal Form (1NF):
- **Eliminate duplicate records**: Each column must contain atomic (indivisible) values, meaning no multiple values in a single field.
- **Uniqueness of rows**: Every row must be uniquely identifiable by a primary key.

**Example**:
If you have a table where a student can have multiple courses in a single column:

| Student | Courses        |
|---------|----------------|
| John    | Math, Science  |

In **1NF**, you'd split the courses into separate rows:

| Student | Course   |
|---------|----------|
| John    | Math     |
| John    | Science  |

## 2. Second Normal Form (2NF):
- **1NF compliance**: It must already be in 1NF.
- **Eliminate partial dependencies**: Every non-key attribute must depend on the entire primary key, not just part of it. This applies mostly to composite keys (a primary key consisting of more than one column).

**Example**:
If you have a table where the primary key is a combination of `Student` and `Course`:

| Student | Course   | Instructor |
|---------|----------|------------|
| John    | Math     | Mr. Smith  |
| John    | Science  | Mr. Brown  |

In **2NF**, you'd remove the dependency of `Instructor` on just the `Course` part of the primary key:
- One table for student-course pairs.
- One table for courses with their instructors.

## 3. Third Normal Form (3NF):
- **2NF compliance**: It must already be in 2NF.
- **Eliminate transitive dependencies**: Non-key attributes should not depend on other non-key attributes.

**Example**:
If you have a table like this:

| Student | Course   | Instructor | Instructor_Phone |
|---------|----------|------------|------------------|
| John    | Math     | Mr. Smith  | 123456789        |
| John    | Science  | Mr. Brown  | 987654321        |

The `Instructor_Phone` depends on `Instructor`, not the primary key. To achieve **3NF**, you'd separate the instructor's information into a separate table:
- One table for students and courses.
- One table for instructors with their details.

## 4. Boyce-Codd Normal Form (BCNF):
- **3NF compliance**: It must already be in 3NF.
- **Every determinant is a candidate key**: If a non-prime attribute determines another attribute, the determinant must be a candidate key (a minimal key that uniquely identifies a record).

**BCNF** resolves certain edge cases that **3NF** doesn't cover, often related to tables with more than one candidate key.

## 5. Fourth Normal Form (4NF):
- **BCNF compliance**: It must already be in BCNF.
- **Eliminate multi-valued dependencies**: A record should not contain two or more independent and multivalued data describing the same entity.

**Example**:
A table where a student has multiple phone numbers and email addresses:

| Student | PhoneNumbers   | Emails          |
|---------|----------------|-----------------|
| John    | 123, 456       | john@email.com  |

In **4NF**, you'd split this into separate tables for phone numbers and emails.

## 6. Fifth Normal Form (5NF):
- **4NF compliance**: It must already be in 4NF.
- **Eliminate join dependencies**: A relation is in **5NF** if it cannot be decomposed into smaller relations without losing data.

In practice, **5NF** is rarely needed unless your database design is extremely complex.

## Summary of Normal Forms:
1. **1NF**: Eliminate duplicate records and ensure atomic values.
2. **2NF**: Eliminate partial dependencies (every non-key attribute should depend on the whole primary key).
3. **3NF**: Eliminate transitive dependencies (non-key attributes shouldn't depend on other non-key attributes).
4. **BCNF**: Every determinant must be a candidate key.
5. **4NF**: Eliminate multi-valued dependencies.
6. **5NF**: Eliminate join dependencies and ensure decomposition is lossless.


# Denormalization

Denormalization is the process of intentionally introducing redundancy into a database by merging tables or adding duplicate data. This is the opposite of normalization,
which focuses on minimizing redundancy and organizing data efficiently. Denormalization is typically done to improve query performance by reducing the number of joins or
simplifying complex queries in databases where speed is a higher priority than data integrity.

## Reasons for Denormalization:
1. **Performance Optimization**: By denormalizing, you reduce the need for multiple table joins, which can speed up query performance, especially in read-heavy applications.
2. **Simplified Queries**: Complex queries with many joins can be simplified, making it easier for developers to write queries and reducing the overall query complexity.
3. **Reduced Overhead**: In some cases, denormalization can reduce the overhead of maintaining complex relationships and foreign key constraints.

## How Denormalization Works:
- **Merging Tables**: You may merge related tables into a single table, even if they originally stored separate information. For example, instead of having a `Customers`
    table and an `Orders` table with a foreign key relationship, you might combine them into one table.
- **Adding Redundant Data**: Denormalization can involve adding extra columns with repeated data. For example, you might store a customer's name in every row of an order
    table instead of referencing a separate `Customers` table.

## Example:
In a normalized database, you might have two separate tables:

**Customers Table**:
| CustomerID | Name      | Address         |
|------------|-----------|-----------------|
| 1          | Alice     | 123 Main St     |
| 2          | Bob       | 456 Oak Ave     |

**Orders Table**:
| OrderID | CustomerID | OrderDate | Amount |
|---------|------------|-----------|--------|
| 101     | 1          | 2025-02-01| 200    |
| 102     | 2          | 2025-02-02| 300    |

In this case, if you frequently need the customer's name alongside their order information, you might **denormalize** the data by adding the `Name` column to the `Orders` table.

**Denormalized Orders Table**:
| OrderID | CustomerID | OrderDate | Amount | CustomerName |
|---------|------------|-----------|--------|--------------|
| 101     | 1          | 2025-02-01| 200    | Alice        |
| 102     | 2          | 2025-02-02| 300    | Bob          |

## Drawbacks of Denormalization:
1. **Data Redundancy**: Storing the same data in multiple places increases the risk of inconsistencies if updates are not synchronized properly.
2. **Higher Storage Costs**: Since data is duplicated, the database can consume more storage.
3. **Maintenance Complexity**: When updates or deletes occur, you have to ensure all redundant data is updated consistently, which can be error-prone.

# What is an ORM?

An **ORM (Object-Relational Mapping)** is a programming technique that allows developers to interact with a relational database using object-oriented programming (OOP) concepts. It provides a way to
map the objects in an application to the tables in a relational database, abstracting the complexity of writing SQL queries.

### Key Concepts:
1. **Object-Relational Mapping**: ORM tools map database tables to objects in the programming language, allowing developers to treat rows as instances of classes and columns as properties of those instances.
2. **CRUD Operations**: ORMs provide methods for creating, reading, updating, and deleting data (known as CRUD operations), making it easier to work with the database without having to manually write SQL.
3. **Abstraction of SQL**: With ORM, developers don’t have to write raw SQL queries; instead, they use the programming language's object methods to interact with the database.

### Benefits of Using an ORM:
1. **Increased Productivity**: Developers can focus on business logic rather than database management and writing SQL queries.
2. **Consistency**: ORM tools provide a consistent way to interact with the database, which can reduce human error and improve code readability.
3. **Database Portability**: With ORM, it is easier to switch between different relational databases (e.g., MySQL to PostgreSQL) since the ORM abstracts database-specific SQL syntax.
4. **Maintainability**: Code is easier to maintain because there’s less need to manually manage SQL queries.

### Drawbacks of Using an ORM:
1. **Performance Overhead**: ORMs can sometimes generate less efficient SQL queries, leading to performance issues, especially for complex queries or large datasets.
2. **Learning Curve**: While ORMs simplify database interaction, there is still a learning curve to understanding how to use the ORM effectively and how it translates to SQL.
3. **Limited Control**: ORMs abstract SQL, which can make it harder to perform complex queries or take full advantage of database-specific features and optimizations.

## What is a Transaction?

A **transaction** in a database is a sequence of one or more operations (such as reading, writing, or updating data) executed as a single unit of work. A transaction is atomic, meaning it is treated as an indivisible
unit—either all the operations in the transaction are successfully completed, or none of them are applied to the database.

### Key Properties of Transactions (ACID):
1. **Atomicity**: Ensures that all operations within a transaction are completed successfully. If one part fails, the entire transaction is rolled back, leaving the database in a consistent state.
2. **Consistency**: The database transitions from one valid state to another, ensuring that data integrity rules are not violated.
3. **Isolation**: Transactions are isolated from each other, meaning the operations of one transaction are not visible to others until the transaction is committed.
4. **Durability**: Once a transaction is committed, its changes are permanent, even if the system crashes.

## Isolation Levels of Transactions

The **isolation level** of a transaction defines the degree to which the operations of one transaction are isolated from the operations of other concurrent transactions. Different isolation levels provide different
trade-offs between consistency, concurrency, and performance.

### Common Isolation Levels:
1. **Read Uncommitted**:
   - **Description**: A transaction can read data that has been modified but not yet committed by other transactions.
   - **Concurrency**: Highest concurrency but also the least isolation.
   - **Potential Issues**:
     - **Dirty Reads**: A transaction can read uncommitted data from another transaction, which could later be rolled back.
   - **Use Case**: Used in scenarios where performance is critical, and data consistency is less important.

2. **Read Committed**:
   - **Description**: A transaction can only read data that has been committed by other transactions.
   - **Concurrency**: Moderate concurrency.
   - **Potential Issues**:
     - **Non-repeatable Reads**: A value read by one transaction could be changed by another transaction before the first transaction completes, leading to inconsistencies if the data is read again.
   - **Use Case**: Commonly used in most applications where data consistency is important, but full isolation is not necessary.

3. **Repeatable Read**:
   - **Description**: A transaction can read only committed data, and if it reads a value, that value cannot change throughout the transaction.
   - **Concurrency**: Lower concurrency compared to the previous levels but higher isolation.
   - **Potential Issues**:
     - **Phantom Reads**: New rows could be added to the database by other transactions that match a query’s conditions, causing discrepancies if the transaction repeats the query.
   - **Use Case**: Useful in scenarios where data consistency is critical, and repeatable reads are necessary.

4. **Serializable**:
   - **Description**: The highest isolation level, where transactions are executed in such a way that they appear to be running serially, one after the other. No other transaction can access data that is being modified by a transaction until it is committed.
   - **Concurrency**: Lowest concurrency due to the strict isolation.
   - **Potential Issues**:
     - **Slow Performance**: Can lead to significant performance bottlenecks because transactions are forced to run serially.
   - **Use Case**: Used in highly critical applications where data integrity and consistency are paramount.

## Summary of Isolation Levels:

| Isolation Level      | Dirty Read | Non-repeatable Read  | Phantom Read | Performance (Concurrency) |
|----------------------|------------|----------------------|--------------|---------------------------|
| **Read Uncommitted** | Allowed    | Allowed              | Allowed      | Highest                   |
| **Read Committed**   | Not Allowed| Allowed              | Allowed      | Moderate                  |
| **Repeatable Read**  | Not Allowed| Not Allowed          | Allowed      | Low                       |
| **Serializable**     | Not Allowed| Not Allowed          | Not Allowed  | Lowest                    |

## Choosing the Right Isolation Level:
- **Read Uncommitted**: Use when performance is the priority and data consistency is not a concern.
- **Read Committed**: Suitable for general use when a balance of consistency and performance is needed.
- **Repeatable Read**: Choose this when consistency is more important than concurrency, especially for operations that involve repeated reads.
- **Serializable**: Use this for the highest level of data integrity, where the utmost precision is required, but be aware of its performance impact.

# What is Atomic?

In the context of databases and transactions, **atomic** refers to the principle that a series of operations or actions in a transaction are treated as a single, indivisible unit. The operations within a transaction
are either fully completed or not executed at all. This ensures that the system remains in a consistent state, even in the event of failures or errors during the transaction.

### Key Characteristics of Atomic Transactions:
1. **Indivisibility**: A transaction is atomic, meaning it cannot be divided into smaller operations that are executed separately. It is an all-or-nothing operation.
2. **Rollback on Failure**: If an error occurs during the transaction (e.g., system crash, or constraint violation), all changes made by the transaction are undone, returning the system to its previous state.
3. **Commit on Success**: If all operations in the transaction complete successfully, the changes are committed to the database and become permanent.

# CAP Theorem

The **CAP Theorem** is a concept that describes the trade-offs between three important properties of distributed databases: **Consistency**, **Availability**, and **Partition Tolerance**. It states that in a distributed system,
you can only guarantee two out of the three properties at any given time.

### The Three Properties:
1. **Consistency**:
   - Every read operation returns the most recent write. In other words, all nodes in the system have the same data at any point in time.
   - Example: If you write data to one server, when you read it from any other server, you'll get the exact same data.

2. **Availability**:
   - Every request (read or write) will receive a response, even if some nodes are down or unreachable.
   - Example: Even if a server is offline, you can still perform operations on other servers without interruption.

3. **Partition Tolerance**:
   - The system can continue to operate even if there is a network partition (communication failure) between different parts of the system.
   - Example: If two parts of the system can't communicate, the system still functions normally, just with some nodes being isolated.

### The Trade-off:
The CAP Theorem, proposed by Eric Brewer, says that a distributed system can only guarantee two of these three properties at a time:
- **CP (Consistency + Partition Tolerance)**: Guarantees data consistency and can tolerate network partitions but might sacrifice availability (i.e., some requests may fail if a server is down).
- **AP (Availability + Partition Tolerance)**: Guarantees availability and partition tolerance but might sacrifice consistency (i.e., different servers may return different data temporarily).
- **CA (Consistency + Availability)**: Guarantees consistency and availability but cannot handle network partitions (i.e., the system will fail if there is a network split).

### Why It Matters:
The CAP Theorem is important because it helps database designers and engineers make informed decisions about how to prioritize these properties depending on their system's needs:
- **Consistency** is crucial in scenarios like banking systems, where it's important that all users see the same data.
- **Availability** is important in systems like social media, where it's better to allow users to access the system even if some data may be temporarily inconsistent.
- **Partition Tolerance** is essential in large, geographically distributed systems to ensure they can continue to operate even in the face of network issues.

### In Summary:
- The **CAP Theorem** explains that in a distributed database, you can’t have all three properties at the same time: you must choose between consistency, availability, and partition tolerance based on your system’s requirements.
- Most distributed systems aim for **CP** or **AP** depending on which properties are more critical for their use case.