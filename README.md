home-monitor
============

Internet Enabled Xbee Sensor Coordinator, sensor sketches, and cloud service app

home monitor is a 3 layered platform that lets you control sensors and gadgets from anywhere.

The layers consist of

Sensors
=======

Sensors are currently made using arduino and talk to the communication layer using XBEE or Zigbee. Sensors emit and receive binary packets.
Sensors are typically completly custom jobs, but there are some examples in the sensor folder. Sensors talk to the commuicator layer.

Communicator
============

The communication layer is handled by a raspberrypi + xbee usb explorer or any linux computer. Raspberrypi is a good platform because its small power efficient and internet connected.
The communicator receives binary packets from sensors and converts them into JSON objects. These JSON objects are then sent to the Management layer using REST or Websockets. The communicator layer also acts as an in home gateway for setting up authorization to the management layer.
The communicator uses its websocket connection to the Management layer to listen for actions, and then converts the JSON actions to a binary format to send out to sensing layer.

Cloud Cordinator
================

The cloud cordinator collects sensing data from communicators, and creates the nessasary interfaces for interacting with sensors. All of the communicators attach to it, and listen for actions.
Clients connect to the cloud cordinator to read and interact with thier sensors.

TODO
====
Documentation + Extra feature descriptions. 
