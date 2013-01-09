home-monitor
============

Internet Enabled Xbee Sensor Communicator application for raspberrypi, sensor sketches, and cloud service app

home monitor is a 3 layered platform that lets you control sensors and gadgets from anywhere.

The layers consist of

Sensors
=======

These are arduino + xbee zigbee sensors that emit and receive packets.
They can control anything you want. I'm currently using mine to control
a theromstat in my home. I'm also working on an LCD screen that can
receive any type of text.

Communicator
============

The communicator application runs on any linux computer that has an Xbee
explorer plugged into it. For my home I'm using a raspberry pi since its
cheap and can be on at all times. The communicator acts as the trunk to
the internet for all of the sensors that are connected to it. All sensor
communication goes through the communicator and up to the cloud
cordinator, or to the local rules engine. The communicator will support
running local rules, an example could be that you have a temperature
sensor on your 3rd floor, but the thermostat is actually on the first
floor of your house. The commnicator rule would be, when the 3rd floor
sensor reaches 70, turn off the first floor sensors heating relay. Note
this type of rule can happen on the Cloud cordinator layer as well.


Cloud Cordinator
================

The cloud cordinator collects sensing data from communicators, and creates the nessasary interfaces for interacting with sensors. All of the communicators attach to it, and listen for actions.
Clients connect to the cloud cordinator to read and interact with thier sensors.
The cloud cordinator exposes 4 different interfaces, Browser website,
mobile website, json api, and a socket.io interface
that communicators, and clients can receive sensor event, and actions
from in real time.

The browser and mobile website is protected using session based login
The json api is OAuth 1.0a and works with passportjs. Users can allow
request access to the api from other applications.

The socket.io interface is protected either with session based login for
clients, or with a special encrypted key that is requested over the JSON
API, then sent in a message over the socket.io connection after initial
set up. This is the primarily way that communicators connect and and
authenticate using socket.io





TODO
====
Documentation + Extra feature descriptions. 
