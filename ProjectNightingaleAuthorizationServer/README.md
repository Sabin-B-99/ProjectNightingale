# ProjectNightingaleAuthorizationServer

Authorization server for the project. This server is responsible for:
* Configuring authentication and authorization filter chains:
  * Basically, configures AuthenticationProvider with custom UserDetails service and Password Encoder (BCrypt).
    * **NOTE:** The user details (username, password, and authorities are persisted in the database)
  * OAuth2 Server and CORS are configured with default settings.
    * **NOTE:** The OAuth2 client details are persisted in the database. Security context uses the RegisteredClient to
      get the client details.


### Technical Details

Language and Framework: Java (open-jdk 21), Spring Boot 3.1.5
Database: MySQL
Tools: Docker, Maven 
