FROM debian:bookworm

RUN apt-get update && \
    apt-get install -y default-mysql-client && \
    rm -rf /var/lib/apt/lists/*

COPY init-db.sh /init-db.sh
RUN chmod +x /init-db.sh

CMD ["/init-db.sh"]