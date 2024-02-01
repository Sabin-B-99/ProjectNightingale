# ProjectNightingaleBackend

Resource server for the project. This server is responsible for:
* Configuring the application, multiple data sources, and spring security filters.
* Communicating with the underlying databases to store chord and song information (lyrics, tabs, artists, chords 
 and ratings). 
* Serving the HTTP requests for creating, adding, deleting and updating users' practice routines.
* Handling logics to register new users and send confirmation emails.


### Technical Details

Language and Framework: Java (JDK 17), Spring 5.3.5, Spring Security 5.7.5
Database: MySQL
Tools: Tomcat 9.0.71, Docker, Maven 
