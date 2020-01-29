#java image from openJDK
FROM gcr.io/google-appengine/openjdk
#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring

ARG BFN_JAR=clients-0.1.jar
ARG BFN_SERVICE_ACCOUNT=bfn.json
ARG BFN_NODES=prod-nodes.json

COPY $BFN_SERVICE_ACCOUNT bfn.json
COPY $BFN_JAR app.jar
COPY $BFN_NODES prod-nodes.json

RUN ls -all

ENV GOOGLE_APPLICATION_CREDENTIALS=bfn.json

ENTRYPOINT [ "java",  "-jar", "/app.jar" ]
