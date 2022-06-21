# mongodbfs
Schulprojekt MongoDB (Datenbank in Betrieb nehmen - M141)


## Wie installieren:
```
cd && git clone https://github.com/Simssnig/mongodbfs.git
```
  
sicherstellen das Docker installiert ist, danach: 
```
docker-compose up [-d (Daemon - Docker läuft im Hintergrund)]
```

Beim ersten mal ohne den Daemon laufen lassen und sicherstellen das vom node Container die Nachricht: *Server startet on Port 5000." kommt.
Danach mit Control+C beenden.

Beim erneuten starten sollte neben der Nachricht: *Server startet on Port 5000." noch die Nachricht: "Gridstore: undefined" stehen. Das heisst alles läuft und man kann im Browser: "localhost:5000" eingeben.


## Alternative installation RasparryPi:
```
git clone https://github.com/Simssnig/mongodbfs.git
```

RaspAP installieren (https://raspap.com/)
```
curl -sL https://install.raspap.com | bash
```

Docker installieren (https://www.docker.com/):
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

IP-Tables hinzufügen:
```
sudo iptables -I DOCKER-USER -i src_if -o dst_if -j ACCEPT
```
   
Den aktuellen Benutzer in die Gruppe Docker hinzufügen.
```
sudo usermod -aG docker [aktuellen Benutzer]
exit
```

Docker-Compose installieren:
```
sudo apt-get install libffi-dev libssl-dev 
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip
sudo pip3 install docker-compose
```

Um den Container zu starten:
```
cd && cd mongodbfs/
docker-compose up [-d (Daemon - Docker läuft im Hintergrund]
```
### nur beim erstmaligen starten:
      (warten bis die Meldung Server Startet on Port 5000 kommt) danach Control+C 
	      & nochmals ```docker-compose up```
