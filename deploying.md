```bash
sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html
```

Generate SSL
$ sudo openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=test.storerestapi.com" -addext "subjectAltName=DNS:test.storerestapi.com" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt;
