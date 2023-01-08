# Back-end solution for the Tekana-eWallet

Your mission is to rebuild from scratch a back-end solution for a legacy platform that serves 1 million customers around the world.

## Project Scope

The scope of this project includes the design and development of a new back-end solution that will replace the existing one.

This will involve the following activities:

- Research and analysis of current technology stack and requirements
- Selection of new technology stack
- Design of new architecture and solution
- Development of new back-end solution
- Integration of new back-end solution with existing front-end and other systems
- Testing and deployment of new back-end solution

## Strategy

1. Understand the business requirements and current system:
   - Meet with the business team and product owner to understand the requirements for the new system and the pain points of the current system.
   - Review the current system architecture and codebase to understand the limitations and challenges of the current solution.
2. Determine the tech stack:
    - Based on the business requirements and the desired scalability, availability, and performance of the new system, determine the appropriate tech stack for the new back-end solution. This may include languages, frameworks, database systems, and cloud infrastructure.
3. Design the system architecture:
    - Design the overall system architecture, including the relationships between the various components and how they will communicate with each other.
    - Consider factors such as scalability, security, and maintainability in the design.

4. Implement the back-end solution:
    - Using the chosen tech stack, implement the back-end solution based on the designed system architecture.
    - Follow engineering best practices, such as writing clean, well-documented code and performing thorough testing.
5. Integrate with the front-end and other components:
    - Work with the front-end and other teams to integrate the back-end solution with the rest of the system.
    - Ensure that the back-end solution is properly secured and that any sensitive data is properly encrypted.
6. Deploy and test the pilot system:
    - Deploy the pilot system to a staging environment and perform thorough testing to ensure that it is stable and meets the business requirements.
    - Address any issues that are discovered during testing.
7. Launch the pilot system:
    - Once the pilot system has been thoroughly tested and any issues have been resolved, launch the pilot system to a small group of users for further testing.
    - Monitor the system closely and address any issues that arise.
8. Roll out the new system to all users:
    - Once the pilot system has been successfully tested and any issues have been addressed, roll out the new system to all users.
    - Continue to monitor the system and address any issues as they arise.

## Proposed Changes

This Changes are for demostration of what will happens while rebuilding the backend.
I considered APIs that handle Customer, Wallet, and Transactions Operations

### Business Requirements

Code source: Write the back-end solution with a minimum feature that showcases how you would design from the code source.

1. These are the required features to be built:

    - Create, Read customers (Registration)

    - Create and read wallets of customers

    - Create and read transactions.

### Tech Stack

1. API Layer

    [NestJS + Express](https://nestjs.com/) acts as the API Layer for the architecture. It takes care of listening for client requests and calling the appropriate back-end microservice to fulfill them.

2. Microservice Layer

    [gRPC](https://grpc.io/) was chosen as the framework to do the microservices. [Protocol buffers](https://developers.google.com/protocol-buffers/) was used as the data interchange format between the client (REST API) and the server (gRPC microservices). NestJS is still the framework used to create the gRPC Microservices.

3. Persistence Layer

    PostgreSQL is used as the database and TypeORM is used as the Object-Relational Mapper (ORM).

4. Deployment

    Deployment is done with containers in mind. A Docker Compose file along with Dockerfiles for each project are given to run the whole thing on any machine. For production, it's always recommended to use [Kubernetes](https://kubernetes.io/) for these kinds of microservices architecture to deploy in production.

### System architecture

sample architecture considering the changes

![My First Board (3)](https://user-images.githubusercontent.com/51251401/210193514-c62bda1e-053b-49dc-9642-5f7d50755875.jpg)

1. Details of approach and why it was considered

    - Load balancers: To handle the high volume of requests and traffic, the system should use load balancers to distribute requests across multiple servers. This can help ensure that the system remains responsive and can scale horizontally as needed.

    - Application servers: The application servers should be responsible for handling requests from the load balancers, processing them, and returning responses. The application servers should be horizontally scalable and fault-tolerant, and should use a microservices architecture to break up the functionality into smaller, independent services.

    - Database: The database should be able to handle the large volume of data and requests from the application servers. Depending on the specific needs of the system, this could be a traditional relational database, a NoSQL database, or a distributed database.

    - Cache: To improve performance, the system may use a cache to store frequently-accessed data. This could be a distributed cache, such as Memcached or Redis, or a cache that is integrated with the database.

    - Monitoring and logging: To ensure that the system is running smoothly and to facilitate debugging and maintenance, the system should have robust monitoring and logging capabilities. This could include tools such as log aggregators, error tracking systems, and monitoring dashboards.

    - Security: To protect sensitive user data and prevent attacks, the system should have robust security measures in place. This could include measures such as encryption, authentication, and secure coding practices.

    - Deployment and infrastructure: To ensure that the system is highly available and can scale as needed, the system should be deployed in the cloud using infrastructure-as-code practices. This could include tools such as Kubernetes.

### Back-end Solution

1. This architecture implements the following Microservice Design Patterns:

    1. [Microservice Architecture](https://microservices.io/patterns/microservices.html)
    2. [Subdomain Decomposition](https://microservices.io/patterns/decomposition/decompose-by-subdomain.html)
    3. [Externalized Configuration](https://microservices.io/patterns/externalized-configuration.html)
    4. [Remote Procedure Invocation](https://microservices.io/patterns/communication-style/rpi.html)
    5. [API Gateway](https://microservices.io/patterns/apigateway.html)
    6. [Database per Service](https://microservices.io/patterns/data/database-per-service.html)

2. Database Design

![new design](https://user-images.githubusercontent.com/51251401/210474335-56ade410-2bc4-405c-8d88-d64f53d2ed75.png)

3. API EndPoints

| method             | resource         | description                                                                                    |
|:-------------------|:-----------------|:-----------------------------------------------------------------------------------------------|
| `POST`             | `/customer/register`         | creates a new customer in the DB (object customer to be included in request's body)                                     |
| `PUT`              | `/customer/login`     | authenticate customer (object customer to be included in request's body) returns the specified token of the user                   |
| `GET` (auth)       | `/customer`         | return lists of customers who are registered in the system      (token must be provided in request header)                |
| `GET` (auth)       | `/customer/:id`     | return customer details (token must be provided in request header)                   |
| `POST` (auth)      | `/wallet`         | creates a wallet for the customer in the DB (object wallet to be included in request's body) and (token must be provided in request header)           |
| `GET` (auth)       | `/wallet`     | return lists of wallet that belong to the customer (token must be provided in request header)        |
| `POST` (auth)      | `/wallet/deposit`         | Deposit money to customer wallet for testing case only (object walletDeposit to be included in request's body) and (token must be provided in request header)                     |
| `GET` (auth)       | `/wallet/:accNumber`     | return customer wallet information accNumber must be provided in header params and (token must be provided in request header)      |
| `GET` (auth)       | `/transaction`         | creates a new user transaction (object transaction to be includued in request's body)  and (token must be provided in request header)            |
| `GET` (auth)       | `/transaction/:accNumber`     | return all wallet transactions, accNumber must be provided in header params and (token must be provided in request header)    |

### Integrate with the front-end and other components

- For Sake Of Demo Postman or Swagger UI is used to test and run APIs

## Source Codes

### Project Organization

1. `tekana-protos` - This directory consists of all the gRPC Service Definitions/Protocol Buffers.

2. `tekana-api-gateway` - This directory consists of the API Gateway project. All code relating to the API Gateway resides here.

3. `docs` - This directory consists of all files relating to documentation. Swagger file with API docs.

4. `microservices` - This directory consists of all microservice projects.

5. `microservices/tekana-customer-svc` - This directory consists of all files/code relating to the Customer Microservice project.

6. `microservices/tekana-wallet-svc` - This directory consists of all files/code relating to the Wallet Microservice project.

7. `microservices/tekana-transaction-svc` - This directory consists of all files/code relating to the Transaction Microservice project.

8. `scripts` - This directory consists of shell scripts that automates building and running the whole project.

### How to Run

1. System Requirements - must be Linux/Mac

- [Node.js](https://nodejs.org/en/) - v14 Recommended
- [Docker](https://docs.docker.com/install/) - latest
- [Docker Compose](https://docs.docker.com/compose/install/) - latest

2. On the Terminal, The start script will install all npm dependencies for all projects, lint the code, compile the code, build the artifacts (Docker images) and run them via `docker-compose`.

- Clone the repository

```
git clone https://github.com/Jajabenit250/tekana-ewallet.git
```

- Install dependencies

```
cd tekana-ewallet
npm start
```

- Run unit tests

```
npm run test
```

- Run unit tests with coverage

```
npm run test:coverage
```

3. Once the start script is done, the API Gateway will listening on [http://localhost:3000](http://localhost:3000)

4. To Run the API with online Postman collection use [https://documenter.getpostman.com/view/14144150/2s8Z75S9jn](https://documenter.getpostman.com/view/14144150/2s8Z75S9jn) or in postman import ``` ./Tekana.postman_collection.json ``` in your postman collection

5. To test the API using Swagger UI, open [http://localhost:8080/docs](http://localhost:8080/docs)

## Roadmap

### General

- [ ] Add Integration Tests
- [ ] Add CI/CD Pipeline
- [ ] Add Kubernetes Manifests
- [x] Pre-populate DBs
- [ ] Configure NGinx Load Balancer
- [ ] Distributed Tracing

### API Gateway

- [ ] Add event sourcing with Kafka
- [ ] Add request/input data validation
- [ ] Add Logs Monitoring

### Microservices

- [ ] Add unit tests
- [ ] Add caching with Redis
