FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
ENV HOME=/home/usr/app
RUN mkdir -p ${HOME}
WORKDIR ${HOME}
ADD pom.xml ${HOME}
RUN /usr/local/bin/mvn-entrypoint.sh mvn verify clean --fail-never
ADD . ${HOME}
RUN mvn package

FROM tomcat:9.0.85-jdk21-corretto-al2
EXPOSE 8080
COPY --from=builder /home/usr/app/target/ProjectNightingale.war /usr/local/tomcat/webapps