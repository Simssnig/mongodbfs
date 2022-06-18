# mongodbfs
Schulprojekt MongoDB (Datenbank in Betrieb nehmen - M141)


Wie installieren:

git clone https://github.com/Simssnig/mongodbfs.git

sicherstellen das Docker installiert ist.

Danach: 

docker-compose up [-d (Daemon - Docker läuft im Hintergrund] 

Beim ersten mal ohne den Daemon laufen lassen und sicherstellen das vom node Container die Nachricht: *Server startet on Port 5000." kommt.
Danach mot Control+C beenden.

Beim erneuten starten sollte neben der Nachricht: *Server startet on Port 5000." noch die Nachricht: "Gridstore: undefined" stehen. Das heisst alles läuft und man kann im Browser: "localhost:5000" eingeben.


Alternative installation RasparryPi:

git clone https://github.com/Simssnig/mongodbfs.git

