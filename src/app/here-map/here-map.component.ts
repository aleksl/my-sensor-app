import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Sensors } from '../Sensors';
import { SensorDust } from '../SensorDust';
import { SensorUtilsService } from '../sensor-utils.service';

declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  sensors: Sensors[];

  @Input()
  public height: any;

  @Input()
  public details: string;

  public constructor(private sensorUtils: SensorUtilsService) { }

  public ngOnInit() { }

  private addMarkerToGroup(group, sensor) {
    var sensorDust = sensor.sensorDust;
    var colorByDust = this.sensorUtils.getColorForSensorDust(sensorDust);
    var pngIcon = new H.map.Icon("../../assets/images/"+colorByDust["colorName"]+"-dot.png");
    var sensorCord = { lat: sensor.latitude, lng: sensor.longitude };
    var marker = new H.map.Marker(sensorCord,
      { icon: pngIcon });
    // add custom data to the marker
    var html = '<div><a href=\'/detail/' + sensor.id + '\' >' + sensor.name + '</a>' +
      '</div><div >' + sensor.name + '</div>';
    if (this.details != null && this.details === "false") {
      marker.setData(html);
      group.addObject(marker);
    }
    var cricle = new H.map.Circle(
      // The central point of the circle
      sensorCord,
      // The radius of the circle in meters
      150,
      {
        style: {
          strokeColor: colorByDust["color"], // Color of the perimeter
          lineWidth: 1,
          fillColor: colorByDust["color"]  // Color of the circle
        }
      }
    );
    cricle.setData(html);
    group.addObject(cricle);


  }

  private addInfoBubble(map, ui, sensor) {
    var group = new H.map.Group();

    map.addObject(group);

    // add 'tap' event listener, that opens info bubble, to the group
    group.addEventListener('tap', function (evt) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var cor = null;
      if (evt.target.getPosition) {
        cor = evt.target.getPosition();
      } else {
        cor = evt.target.getGeometry().c.o;
      }
      var bubble = new H.ui.InfoBubble(cor, {
        // read custom data
        content: evt.target.getData()
      });
      // show info bubble
      ui.addBubble(bubble);
    }, false);

    this.addMarkerToGroup(group, sensor)
  }

  public ngAfterViewInit() {
    let platform = new H.service.Platform({
      "app_id": environment.hereMaps_appId,
      "app_code": environment.hereMaps_appCode,
      useCIT: true,
      useHTTPS: true
    });
    let defaultLayers = platform.createDefaultLayers();
    if (this.sensors != null) {
      var zoom = 7;
      var center = { lat: 52.068785, lng: 19.480002 };
      if (this.sensors.length == 1) {
        zoom = 15;
        center = { lat: parseFloat(this.sensors[0].latitude), lng: parseFloat(this.sensors[0].longitude) };
      }

      let map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: zoom,
          center: center
        }
      );
      var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      behavior.disable(H.mapevents.Behavior.WHEELZOOM);
      var ui = H.ui.UI.createDefault(map, defaultLayers, 'pl-PL');
      for (var i in this.sensors) {
        var sensor = this.sensors[i];
        this.addInfoBubble(map, ui, sensor);
      }
    }
  }

}