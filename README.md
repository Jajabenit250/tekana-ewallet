# rebuilding the back-end solution for the Tekana-eWallet

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

This Changes are only for demostration of what will happens while rebuilding the backend.
I considered only APIs that handle Customer, Wallet, and Transactions Operations

1. business requirements
2. Tech Stack
3. System architecture
![My First Board (2)](https://user-images.githubusercontent.com/51251401/210184909-df8b6f82-4f0f-489f-a95d-3b9deed40d8c.jpg)

    - Load balancers: To handle the high volume of requests and traffic, the system should use load balancers to distribute requests across multiple servers. This can help ensure that the system remains responsive and can scale horizontally as needed.

    - Application servers: The application servers should be responsible for handling requests from the load balancers, processing them, and returning responses. The application servers should be horizontally scalable and fault-tolerant, and should use a microservices architecture to break up the functionality into smaller, independent services.

    - Database: The database should be able to handle the large volume of data and requests from the application servers. Depending on the specific needs of the system, this could be a traditional relational database, a NoSQL database, or a distributed database.

    - Cache: To improve performance, the system may use a cache to store frequently-accessed data. This could be a distributed cache, such as Memcached or Redis, or a cache that is integrated with the database.

    - Monitoring and logging: To ensure that the system is running smoothly and to facilitate debugging and maintenance, the system should have robust monitoring and logging capabilities. This could include tools such as log aggregators, error tracking systems, and monitoring dashboards.

    - Security: To protect sensitive user data and prevent attacks, the system should have robust security measures in place. This could include measures such as encryption, authentication, and secure coding practices.

    - Deployment and infrastructure: To ensure that the system is highly available and can scale as needed, the system should be deployed in the cloud using infrastructure-as-code practices. This could include tools such as Terraform and Kubernetes.
4. back-end solution
5. Integrate with the front-end and other components

## Source Codes
