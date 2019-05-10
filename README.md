# webmap
Web based map using HTML5 and Javascript

I like maps so I wanted to create a map page that combines all maps that I like into a single place. I also wanted to use my own map page on all devices, like on Windows laptop and Android phone and tablet.

This project is based in Google Maps Javascript API and HTML5. Google has excellent examples that really make development a lot easier. I have used them a lot. Basic maps that are shown are Google roadmap and satellite maps. In addition to those it is possible to directly select Finnish topography map and aerial image map. Finnish maps are created by Maanmittauslaitos (http://www.maanmittauslaitos.fi/). They are served in Google Maps format by Kapsi Internet Käyttäjät ry (http://kartat.kapsi.fi/). Optionally it is possible to choose MapAnt topographic maps.

By default the page tracks the current position on a map. If you move the map from current location, it is possible to move back by pressing ‘My location' icon button.

One of the motivations for this map page was to visit Soviet rental era bunkers and other remains close to my home town of Espoo, Finland. City of Kirkkonummi orienteering club Lynx has collected an excellent list of remains from that time. Luckily Lynx has put the data in Google My Maps. From Google My Maps it is possible to extract a .kmz file that can be directly used as a layer in Google Maps Javascript API. This Lynx layer can be toggled on and off by choosing ‘Lynx’ in layer control.

I also wanted to include Maanmittauslaitos laser scanning maps that show surface structures and old aerial maps from 1956 from Kirkkonummi (just after Soviet rental period was ended). That information is not publicly available as Tile Map Service (TMS) format. So as a alternative solution there are links that jump to directly to those external services. Button ‘MML Laser’ jumps to external Maanmittauslaitos page and button ‘1956’ jumps to external Kirkkonummi page. By using back button is possible to get to the same view where you started. On both sites there is a marker that shows the center position of map page. In map page the center position is marked by a crosshair.

Both external services use a different coordinate system than Google maps. Kirkkonummi page uses ETRS-GK25 (EPSG:3879) and Maanmittauslaitos uses ETRS-TM35FIN (EPSG:3067). Coordinate conversions are difficult but there is a Proj4js (http://proj4js.org/) service that can do the conversions using Javascript. I have used a proj4.js hosted at CDNJS (https://cdnjs.com/libraries/proj4js). Conversion parameters for proj4js can be found from https://epsg.io/. Converted coordinates are embedded into links that are used to jump to those external map pages.

There are are some other layers than Lynx available for personal interest. Layers are selected by layers button that opens a dialog. From dialog it is possible to choose multiple layers. There is also configration buttons that shows for example current coordinated of the map center. Configuration window has also buttons to show help and atttribution info.

It is possible to add layers by giving them in the url. Kml layers can be added using syntax "kml\=\<url\>,\<name\>". Fusion layers can be added using syntax "fusion\=\<column\>,\<table\>,\<name\>". For example https://test.net/map.html?kml=http://info.net/points.kmz,MyPoints adds a new layer that show points from points.kmz.

The map page keeps track of last 10 old positions. Those are marked as red dots on the map. A new dot is recorded every 10 seconds if it is further than 10 meters from the last dot recorded. I hope that this is useful to see the direction where you are heading when walking in a forest. Position tracking is configurable through url. Syntax for the setting is "path\=\<max path points\>\[,\<interval in seconds\>\[,\<recording distance in meters\>\]\]", for example https://test.net/map.html?path=1000,60,5 keeps 1000 last points and they are recorded once a minute if locations is changed 5 meters or more. Setting path=0 disables tracking of old positions. 

Url can have map center position, markers and visible layers. Position where map is centered at start is given with parameter 'center\=\<latitude\>,\<longitude\>\[,\<label\>\]'. Marker is given with a parameter 'marker\=\<latitude\>,\<longitude\>\[,\<label\>\]'. Multiple markers can be given as separate marker parameters. Visible layers are listed with parameter 'layers\=\<layer name\>\[,\<layer name\>\]. For example: \?center\=60.152363,24.439186&layers\=Lynx,Muinaisjäännökset&marker\=60.152960,24.457036,1&marker\=60.158981,24.45368,2

The current map state is stored into HTML5 session storage while jumping between different pages. As long as the Window remains open it should remember the settings. Saved settings include current map, location, zoom, visible layers and old positions.

Using HTML5 geolocation API on mobile devices like Chrome on Android requires that page is loaded from https source. There are many alternatives to create a web server that support https. I used Caddy and it was very easy to get started.

Short description of available layers:

Lynx parenteesi

- Kirkkonummi orienteering club maintained map of Soviet rental era bunkers and other remains.

Parenteesipisteet

- Locations of Soviet rental era bunkers and other remains found from book: 'Pekka Silvast, 1991. Porkkala 1944–1956 - Neuvostoliiton merisotilaallinen tukikohta. Tutkimusraportti, Sotamuseo 1/1991.'
- Approximate color coding for points in this layer is:
  Blue - not visited 
  Green - visited, some has pictures
  Gray - visited but found nothing
  Black - not possible/difficult to check
- Special markings
  House - a big bunker
  Square around round bullet - border control point

Parenteesikartat

- Map images from Pekka Silvast book as on overlay on top of current map.

Muinaisjäännökset

- Muinaisjäännökset layer data in Google Fusion Tables found from http://fba.evvk.com/geo/kulttuuriymparisto. Actual data in there is from Museovirasto.

Planetskier

- Planetskier data around the globe from http://planetskier.blogspot.fi/

Espoon lähiretkiä

- Interesting locations I have visited around Espoo.
- More details and color coding as a Google My Maps can be found from https://drive.google.com/open?id=1HQg6K5qyvEE7ql1kCAjDxeHWe_Fuz9QV&usp=sharing
