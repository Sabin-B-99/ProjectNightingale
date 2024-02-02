# ProjectNightingale

A web application to help you practice guitar.

This application helps you create, view and publish guitar and harmonica tabs. You can create guitar practice routines and timer. Moreover, you can view various guitar chords, and set metronome. All of your data including your practice routines, routine timers and metronome settings, and the tabs and songs you have published are presisted.

## Why?
When I was learning harmonica, I had difficulty in understanding some of the tabs, like [this](https://www.harptabs.com/song.php?ID=18762), where the lyrics and the hole number to draw/blow didn't align correctly. To solve this problem, I wanted to build a website that would provide a cell (matrix) based form to harmonica tabs. Only a single word of the lyrics would be allowed in each cell and a hole number must be entered in the cell right above the word of the lyrics. 



[The matrix form that I had developed](https://github.com/Sabin-B-99/ProjectNightingale/assets/55592534/e7b9db61-b26b-47c4-a7d8-199ff1d8b959)

But, as the project progressed, with the form I had developed, I found it difficult (inefficient) to store and retrieve each cell's data from the database. Moreover, I had hard time rendering those data in their correct position on the screen. I don't really have a good CSS skill (This was my first frontend project). (**Learnt it the hard way: Programming Spreadsheet is really hard!!!**. My next project probably will be writing a toy excel (spreadsheet program))

So, midway through the project I decided to change the project to include guitar tabs, chords, and practice routines as well. The form to enter the harmonica was changed back to the traditional form you can find in every other website ,that publishes harmonica tabs.

## Demo
A short demonstration video of the project in its current state. 

[![ProjectNightingale demo video](http://img.youtube.com/vi/3LIiGFmkoDw/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_3LIiGFmkoDw "ProjectNightingale demonstration video")

## Quick Start

1. Make sure you have docker installed in your system. Follow [this](https://docs.docker.com/engine/install/) guide if you don't have it installed.
    * **NOTE:** If you are using docker desktop, please make sure that you are logged in with your docker username and password. Otherwise, the image may fail to build. 

3. Clone the source into your local directory. Open (cd) the folder in terminal (cmd) from the root of the source folder (The folder that contains docker-compose file) and enter the following command:
    * To build the docker image. May take few minutes depending upon your system.
    ```
        docker compose build
    ```

    * and run the docker container with the following command:
    ```
        docker compose up
    ```

4.  After running the container successfully, you can browse the website via 127.0.0.1:4200 through your web browser.
    * The frontend is hosted on: 127.0.0.1:4200
    * The authorization server is hosted on: localhost:9090
    * The resource server is hosted on: localhost:8080
    * Mailhog, fake SMTP mail server, is hosted on: 0.0.0.0:8025    
      * If you sign up in the website, you can find the confirmation email in 0.0.0.0:8025 address. You use any email for registration. For example: a@b.com, xy@z.com etc.
    * MySQL database is hosted on: 127.0.0.1:3306
      * The ./docker/db folder also contains the MySQL dump file that contains all the data used for development purpose.

5. To close the container once you finish testing run the following command:
   ```
    docker compose stop
   ```  

## Technical Details

* Language and Framework:
  * **_Authorization server_**: Java (open-jdk 21), Spring Boot 3.1.5
  * **_Resource server_**: Java (JDK 17), Spring 5.3.5, Spring Security 5.7.5
  * **_Frontend_**: TypeScript and Angular 15.2.9
* Database: MySQL
* Tools: Docker, Maven, Tomcat 9.0.71, Bootstrap 5.2, Angular Material


## TODOs
* I will not be working actively on this project anymore. But whenever I feel like it I will try to improve the website visually with proper CSS. 






