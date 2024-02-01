FROM maven:3.9.6-eclipse-temurin-21-alpine
ENV HOME=/home/usr/app
RUN mkdir -p ${HOME}
WORKDIR ${HOME}
ADD pom.xml ${HOME}
RUN /usr/local/bin/mvn-entrypoint.sh mvn verify clean --fail-never
ADD . ${HOME}
RUN mvn package
EXPOSE 9090
CMD java -jar ./target/ProjectNightingaleAuthorizationServer-0.0.1-SNAPSHOT.jar