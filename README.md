# webmap
Web based map using HTML5 and Javascript

I like maps so I wanted to create a map page that combines all maps that I like to view in a single place. I also wanted to use my own map page on all devices, like on Windows laptop and Android phone.

This project is based in Google Maps Javascript API and HTML5. Google has excellent examples that really make development a lot easier. I have used them a lot. Basic maps that are shown are Google roadmap and satellite maps. In addition to those it is possible to directly select Finnish topography map and aerial image map. Finnish maps are created by Maanmittauslaitos (http://www.maanmittauslaitos.fi/). They are served in Google Maps format by Kapsi Internet Käyttäjät ry (http://kartat.kapsi.fi/).

By default the page tracks the current position on a map. If you move the map from current location, it is possible to move back by pressing ‘My location' icon button.

One of the motivations for this map page was to visit Soviet rental era bunkers and other remains close to my home town of Espoo, Finland. City of Kirkkonummi orienteering club Lynx has collected an excellent list of remains from that time. Luckily Lynx has put the data in Google My Maps. From Google My Maps it is possible to extract a .kmz file that can be directly used as a layer in Google Maps Javascript API. This Lynx layer can be toggled on and off by choosing ‘Lynx’ in layer control.

I also wanted to include Maanmittauslaitos laser scanning maps that show surface structures and old aerial maps from 1956 from Kirkkonummi (just after Soviet rental period was ended). That information is not publicly available as Tile Map Service (TMS) format. So as a alternative solution there are links that jump to directly to those external services. Button ‘MML Laser’ jumps to external Maanmittauslaitos page and button ‘1956’ jumps to external Kirkkonummi page. By using back button is possible to get to the same view where you started. On both sites there is a marker that shows the center position of map page. In map page the center position is marked by a crosshair.

Both external services use a different coordinate system than Google maps. Kirkkonummi page uses ETRS-GK25 (EPSG:3879) and Maanmittauslaitos uses ETRS-TM35FIN (EPSG:3067). Coordinate conversions are difficult but there is a Proj4js (http://proj4js.org/) service that can do the conversions using Javascript. I have used a proj4.js hosted at CDNJS (https://cdnjs.com/libraries/proj4js). Conversion parameters for proj4js can be found from https://epsg.io/. Converted coordinates are embedded into links that are used to jump to those external map pages.

There are are some other layers than Lynx available for personal interest. Layers are selected by layers button if HTML5 dialog is supported in browser. Chrome supports dialog but not many others do. From dialog it is possible to choose multiple layers. If dialog is not supported then single a layer can be chosen from a pull down menu. 

It is possible to add layers by giving them in the url. Kml layers can be added using syntax "kml=<url>,<name>[,<shortname>]". Fusion layers can be added using syntax "fusion=<column>,<table<>,<name>[,<shortname>]". For example https://test.net/map.html?kml=http://info.net/points.kmz,MyPoints adds a new layer that show points from points.kmz.

The map page keeps track of last 10 old positions. Those are marked as red dots on the map. A new dot is recorded every 10 seconds if it is further than 10 meters from the last dot recorded. I hope that this is useful to see the direction where you are heading when walking in a forest. Position tracking is configurable through url. Syntax for the setting is "path=<max path points>[,<interval in seconds>[,<recording distance in meters>]]", for example https://test.net/map.html?path=1000,60,5 keeps 1000 last points and they are recorded once a minute if locations is changed 5 meters or more. Setting path=0 disables tracking of old positions. 

The current map state is stored into HTML5 session storage while jumping between different pages. As long as the Window remains open it should remember the settings. Saved settings include current map, location, zoom, visible layers and old positions.

Using HTML5 geolocation API on mobile devices like Chrome on Android requires that page is loaded from https source. There are many alternatives to create a web server that support https. I used Caddy and it was very easy to get started.

Example of multiple configuration parameters from url: 
https://test.net/map.html?kml=http://info.net/points.kmz,MyPoints&path=1000&kml=http://info.net/points2.kmz,MyPoints2