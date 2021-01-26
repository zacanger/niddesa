FROM pandoc/ubuntu-latex:2.11.1
RUN apt-get update \
    && apt-get install -y fonts-cardo \
        make
COPY . .
ENTRYPOINT "bash"
CMD "bash"
