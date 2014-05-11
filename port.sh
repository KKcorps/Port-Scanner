 #!/bin/bash         

cd check
npm install
gnome-terminal -e node port_2.js --tab -e "sh -c 'google-chrome \"localhost:3000\"'"
node port_2.js

