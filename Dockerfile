FROM pandoc/latex:2.18-ubuntu
RUN apt-get update \
    && apt-get install -y fonts-cardo \
        make
COPY . .
ENTRYPOINT "bash"
CMD "bash"
