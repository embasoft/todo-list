# TodoList
## Einleitung
Die TodoList-App ist eine einfache Anwendung, die dem Nutzer ermöglichen soll, kurze Notizen in einem übersichtlichen, webbasierten Interface anzulegen und abzurufen.

Neben den Grundfunktionen, dem Anlegen, Anzeigen und Löschen von Aufgaben, wurden auch noch weitere Komfortfunktionen implementiert.

Es ist für den Nutzer möglich, Aufgaben über das Sternsymbol zu favorisieren, wodurch diese immer ganz oben in der Liste angezeigt werden. Außerdem können Aufgaben als erledigt markiert werden, wodurch diese am Ende der Liste angezeigt werden und speziell dargestellt werden.

Die Speicherung der angelegten Notizen erfolgt über den LocalStorage des Browsers.
## Verwendete Technologien
Das Programm setzt auf React als Framework und verschiedene kleinere Bibliotheken.

Neben den Bibliotheken, die bei der Installation von React mitinstalliert werden, wurden folgende Pakete verwendet:
* react-spring
* fontawesome
* prop-types
* tailwindcss
* prettier
* eslint
## Docker
Zur Verwendung der TodoList-App innerhalb eines Docker-Containers muss zuerst ein Image vom Programm gebaut werden. Dafür muss im Root-Verzeichnis des Programmes folgender Befehl ausgeführt werden:
```
docker build -t todolist:latest .
```
Anschließend kann der Docker-Container mit folgendem Befehl gestartet werden:
```
docker run --name todolist -d -p 3000:3000 todolist:latest
```
