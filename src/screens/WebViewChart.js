import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, StartColumnContainer,
} from 'components/common/SComponent'
import { listLiveStreamAction } from 'actions/streamAction'
import { WebView } from 'react-native-webview'
import { styleAuthen } from './styles'


class WebChartDemo extends React.Component {
  render() {
    return (
      <Container style={styleAuthen.container}>
        <StartColumnContainer>
          <WebView
            originWhitelist={['*']}
            source={{ html: `
              <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
              <script src="https://code.highcharts.com/stock/highstock.js"></script>
              <script src="https://code.highcharts.com/modules/data.js"></script>
              <script src="https://code.highcharts.com/modules/exporting.js"></script>
              <script src="https://code.highcharts.com/highcharts.js"></script>
              <script src="https://code.highcharts.com/maps/highmaps.js"></script>
              <script src="https://code.highcharts.com/mapdata/index.js?1"></script>
              <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"></script>
              <script src="https://www.highcharts.com/samples/maps/demo/all-maps/jquery.combobox.js"></script>
              
              <link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet">
              <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
              
              <style>
              #container {
                min-width: 310px;
                max-width: 800px;
              }
              
#demo-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  height: 560px;
  background: white;
}
#mapBox {
  width: 80%;
  float: left;
}
#container {
  height: 500px;
}
#sideBox {
  float: right;
  width: 16%;   
  margin: 100px 1% 0 1%;
  padding-left: 1%;
  border-left: 1px solid silver;
  display: none;
}
#infoBox {
  margin-top: 10px;
}
.or-view-as {
  margin: 0.5em 0;
}
#up {
  line-height: 30px;
  height: 30px;
  max-width: 400px;
  margin: 0 auto;
}
#up a {
  cursor: pointer;
  padding-left: 40px;
}
.selector {
  height: 40px;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}
.selector .prev-next {
  position: absolute;
  padding: 0 10px;
  font-size: 30px;
  line-height: 20px;
  background: white;
  font-weight: bold;
  color: #999;
  top: -2px;
  display: none;
  border: none;
}
.selector .custom-combobox {
  display: block;
  position: absolute;
  left: 40px;
  right: 65px;
}
.selector .custom-combobox .custom-combobox-input {
  position: absolute;
  font-size: 14px;
  color: silver;
  border-radius: 3px 0 0 3px;
  height: 32px;
  display: block;
  background: url(https://www.highcharts.com/samples/graphics/search.png) 5px 8px no-repeat white;
  padding: 1px 5px 1px 30px;
  width: 100%;
}
.selector .custom-combobox .ui-autocomplete-input:focus {
  color: black;
}
.selector .custom-combobox .ui-autocomplete-input.valid {
  color: black;
}
.selector .custom-combobox-toggle {
  position: absolute;
  display: block;
  right: -32px;
  border-radius: 0 3px 3px 0;
  height: 32px;
  width: 32px;
}

.selector #btn-next-map {
  right: -12px;
}
.ui-autocomplete {
  max-height: 500px;
  overflow: auto;
}
.ui-autocomplete .option-header {
  font-style: italic;
  font-weight: bold;
  margin: 5px 0;
  font-size: 1.2em;
  color: gray;
}

.loading {
  margin-top: 10em;
  text-align: center;
  color: gray;
}
.ui-button-icon-only .ui-button-text {
  height: 26px;
  padding: 0 !important;
  background: white;
}
#infoBox .button {
  border: none;
  border-radius: 3px;
  background: #a4edba;
  padding: 5px;
  color: black;
  text-decoration: none;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  margin: 0 3px;
  line-height: 30px;
}

@media (max-width: 768px) {
  #demo-wrapper {
      width: auto;
      height: auto;
  }
  #mapBox {
      width: auto;
      float: none;
  }
  #container {
      height: 310px;
  }
  #sideBox {
      float: none;
      width: auto;
      margin-top: 0;
      border-left: none;
      border-top: 1px solid silver;
  }
}

              </style>

              <div style="overflow: auto">
                <div id="container2" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
                <div id="container3"><div>
                <div id="container4"></div>
              </div>
              
             
<div id="demo-wrapper">
    <div id="mapBox">
        <div id="up"></div>
        <div class="selector">
            <button id="btn-prev-map" class="prev-next"><i class="fa fa-angle-left"></i></button>
            <select id="mapDropdown" class="ui-widget combobox"></select>
            <button id="btn-next-map" class="prev-next"><i class="fa fa-angle-right"></i></button>
        </div>
        <div id="container"></div> 
    </div>
    <div id="sideBox">
        
        <input type="checkbox" id="chkDataLabels" checked='checked' />
        <label for="chkDataLabels" style="display: inline">Data labels</label>
        <div id="infoBox">
            <h4>This map</h4>
            <div id="download"></div>
        </div>
    </div>
</div>

              <script>
                $.getJSON('https://www.highcharts.com/samples/data/aapl-c.json', function (data) {

                // Create the chart
                var chart = Highcharts.stockChart('container', {

                    chart: {
                        height: 400
                    },

                    title: {
                        text: 'Highstock Responsive Chart'
                    },

                    subtitle: {
                        text: 'Click small/large buttons or change window size to test responsiveness'
                    },

                    rangeSelector: {
                        selected: 1
                    },

                    series: [{
                        name: 'AAPL Stock Price',
                        data: data,
                        type: 'area',
                        threshold: null,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                chart: {
                                    height: 300
                                },
                                subtitle: {
                                    text: null
                                },
                                navigator: {
                                    enabled: false
                                }
                            }
                        }]
                    }
                });


                $('#small').click(function () {
                    chart.setSize(400);
                });

                $('#large').click(function () {
                    chart.setSize(800);
                });

                $('#auto').click(function () {
                    chart.setSize(null);
                });
            });

              </script>
              <script>
                Highcharts.chart('container2', {
                  title: {
                      text: 'Combination chart'
                  },
                  xAxis: {
                      categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
                  },
                  labels: {
                      items: [{
                          html: 'Total fruit consumption',
                          style: {
                              left: '50px',
                              top: '18px',
                              color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                          }
                      }]
                  },
                  series: [{
                      type: 'column',
                      name: 'Jane',
                      data: [3, 2, 1, 3, 4]
                  }, {
                      type: 'column',
                      name: 'John',
                      data: [2, 3, 5, 7, 6]
                  }, {
                      type: 'column',
                      name: 'Joe',
                      data: [4, 3, 3, 9, 0]
                  }, {
                      type: 'spline',
                      name: 'Average',
                      data: [3, 2.67, 3, 6.33, 3.33],
                      marker: {
                          lineWidth: 2,
                          lineColor: Highcharts.getOptions().colors[3],
                          fillColor: 'white'
                      }
                  }, {
                      type: 'pie',
                      name: 'Total consumption',
                      data: [{
                          name: 'Jane',
                          y: 13,
                          color: Highcharts.getOptions().colors[0] // Jane's color
                      }, {
                          name: 'John',
                          y: 23,
                          color: Highcharts.getOptions().colors[1] // John's color
                      }, {
                          name: 'Joe',
                          y: 19,
                          color: Highcharts.getOptions().colors[2] // Joe's color
                      }],
                      center: [100, 80],
                      size: 100,
                      showInLegend: false,
                      dataLabels: {
                          enabled: false
                      }
                  }]
              });
            
              Highcharts.chart('container3', {
                chart: {
                    type: 'spline'
                },
            
                accessibility: {
                    description: 'Most commonly used desktop screen readers from January 2009 to July 2015 as reported in the Webaim Survey. JAWS remains the most used screen reader, but is steadily declining. ZoomText and WindowEyes are both displaying large growth from 2014 to 2015.'
                },
            
                legend: {
                    symbolWidth: 40
                },
            
                title: {
                    text: 'Desktop screen readers from 2009 to 2015'
                },
            
                subtitle: {
                    text: 'Click on point to visit official website'
                },
            
                yAxis: {
                    title: {
                        text: 'Percentage usage'
                    }
                },
            
                xAxis: {
                    title: {
                        text: 'Time'
                    },
                    accessibility: {
                        description: 'Time from January 2009 to July 2015'
                    },
                    categories: ['January 2009', 'December 2010', 'May 2012', 'January 2014', 'July 2015']
                },
            
                tooltip: {
                    split: true
                },
            
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function () {
                                    window.location.href = this.series.options.website;
                                }
                            }
                        },
                        cursor: 'pointer'
                    }
                },
            
                series: [
                    {
                        name: 'JAWS',
                        data: [74, 69.6, 63.7, 63.9, 43.7],
                        website: 'https://www.freedomscientific.com/Products/Blindness/JAWS'
                    }, {
                        name: 'NVDA',
                        data: [8, 34.8, 43.0, 51.2, 41.4],
                        website: 'https://www.nvaccess.org',
                        dashStyle: 'Dot'
                    }, {
                        name: 'VoiceOver',
                        data: [6, 20.2, 30.7, 36.8, 30.9],
                        website: 'http://www.apple.com/accessibility/osx/voiceover',
                        dashStyle: 'ShortDot',
                        color: Highcharts.getOptions().colors[7]
                    }, {
                        name: 'Window-Eyes',
                        data: [23, 19.0, 20.7, 13.9, 29.6],
                        website: 'http://www.gwmicro.com/window-eyes',
                        dashStyle: 'Dash',
                        color: Highcharts.getOptions().colors[0]
                    }, {
                        name: 'ZoomText',
                        data: [0, 6.1, 6.8, 5.3, 27.5],
                        website: 'http://www.zoomtext.com/products/zoomtext-magnifierreader',
                        dashStyle: 'ShortDashDot',
                        color: Highcharts.getOptions().colors[8]
                    }, {
                        name: 'System Access To Go',
                        data: [0, 16.2, 22.1, 26.2, 6.9],
                        website: 'https://www.satogo.com',
                        dashStyle: 'ShortDash',
                        color: Highcharts.getOptions().colors[1]
                    }, {
                        name: 'ChromeVox',
                        data: [0, 0, 2.8, 4.8, 2.8],
                        website: 'http://www.chromevox.com',
                        dashStyle: 'DotDash',
                        color: Highcharts.getOptions().colors[4]
                    }, {
                        name: 'Other',
                        data: [0, 7.4, 5.9, 9.3, 6.5],
                        website: 'http://www.disabled-world.com/assistivedevices/computer/screen-readers.php',
                        dashStyle: 'LongDash',
                        color: Highcharts.getOptions().colors[7]
                    }
                ],
            
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                itemWidth: 150
                            }
                        }
                    }]
                }
            });
            
              </script>
<script>

Highcharts.chart('container4', {
  chart: {
      type: 'bar',
      height: 600
  },
  title: {
      text: 'Server Monitoring Demo'
  },
  legend: {
      enabled: false
  },
  subtitle: {
      text: 'Instance Load'
  },
  data: {
      csvURL: 'https://demo-live-data.highcharts.com/vs-load.csv',
      enablePolling: true,
      dataRefreshRate: 1
  },
  plotOptions: {
      bar: {
          colorByPoint: true
      },
      series: {
          zones: [{
              color: '#4CAF50',
              value: 0
          }, {
              color: '#8BC34A',
              value: 10
          }, {
              color: '#CDDC39',
              value: 20
          }, {
              color: '#CDDC39',
              value: 30
          }, {
              color: '#FFEB3B',
              value: 40
          }, {
              color: '#FFEB3B',
              value: 50
          }, {
              color: '#FFC107',
              value: 60
          }, {
              color: '#FF9800',
              value: 70
          }, {
              color: '#FF5722',
              value: 80
          }, {
              color: '#F44336',
              value: 90
          }, {
              color: '#F44336',
              value: Number.MAX_VALUE
          }],
          dataLabels: {
              enabled: true,
              format: '{point.y:.0f}%'
          }
      }
  },
  tooltip: {
      valueDecimals: 1,
      valueSuffix: '%'
  },
  xAxis: {
      type: 'category',
      labels: {
          style: {
              fontSize: '10px'
          }
      }
  },
  yAxis: {
      max: 100,
      title: false,
      plotBands: [{
          from: 0,
          to: 30,
          color: '#E8F5E9'
      }, {
          from: 30,
          to: 70,
          color: '#FFFDE7'
      }, {
          from: 70,
          to: 100,
          color: "#FFEBEE"
      }]
  }
});
</script>
              <script>
              /**
 * This is a complicated demo of Highmaps, not intended to get you up to speed
 * quickly, but to show off some basic maps and features in one single place.
 * For the basic demo, check out https://www.highcharts.com/maps/demo/geojson
 * instead.
 */

// Base path to maps
var baseMapPath = "https://code.highcharts.com/mapdata/",
    showDataLabels = false, // Switch for data labels enabled/disabled
    mapCount = 0,
    searchText,
    mapOptions = '';

// Populate dropdown menus and turn into jQuery UI widgets
$.each(Highcharts.mapDataIndex, function (mapGroup, maps) {
    if (mapGroup !== "version") {
        mapOptions += '<option class="option-header">' + mapGroup + '</option>';
        $.each(maps, function (desc, path) {
            mapOptions += '<option value="' + path + '">' + desc + '</option>';
            mapCount += 1;
        });
    }
});
searchText = 'Search ' + mapCount + ' maps';
mapOptions = '<option value="custom/world.js">' + searchText + '</option>' + mapOptions;
$("#mapDropdown").append(mapOptions).combobox();

// Change map when item selected in dropdown
$("#mapDropdown").change(function () {
    var $selectedItem = $("option:selected", this),
        mapDesc = $selectedItem.text(),
        mapKey = this.value.slice(0, -3),
        svgPath = baseMapPath + mapKey + '.svg',
        geojsonPath = baseMapPath + mapKey + '.geo.json',
        javascriptPath = baseMapPath + this.value,
        isHeader = $selectedItem.hasClass('option-header');

    // Dim or highlight search box
    if (mapDesc === searchText || isHeader) {
        $('.custom-combobox-input').removeClass('valid');
        location.hash = '';
    } else {
        $('.custom-combobox-input').addClass('valid');
        location.hash = mapKey;
    }

    if (isHeader) {
        return false;
    }

    // Show loading
    if (Highcharts.charts[0]) {
        Highcharts.charts[0].showLoading('<i class="fa fa-spinner fa-spin fa-2x"></i>');
    }


    // When the map is loaded or ready from cache...
    function mapReady() {

        var mapGeoJSON = Highcharts.maps[mapKey],
            data = [],
            parent,
            match;

        // Update info box download links
        $("#download").html(
            '<a class="button" target="_blank" href="https://jsfiddle.net/gh/get/jquery/1.11.0/' +
                'highcharts/highcharts/tree/master/samples/mapdata/' + mapKey + '">' +
                'View clean demo</a>' +
                '<div class="or-view-as">... or view as ' +
                '<a target="_blank" href="' + svgPath + '">SVG</a>, ' +
                '<a target="_blank" href="' + geojsonPath + '">GeoJSON</a>, ' +
                '<a target="_blank" href="' + javascriptPath + '">JavaScript</a>.</div>'
        );

        // Generate non-random data for the map
        $.each(mapGeoJSON.features, function (index, feature) {
            data.push({
                key: feature.properties['hc-key'],
                value: index
            });
        });

        // Show arrows the first time a real map is shown
        if (mapDesc !== searchText) {
            $('.selector .prev-next').show();
            $('#sideBox').show();
        }

        // Is there a layer above this?
        match = mapKey.match(/^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/);
        if (/^countries\/[a-z]{2}\/[a-z]{2}-all$/.test(mapKey)) { // country
            parent = {
                desc: 'World',
                key: 'custom/world'
            };
        } else if (match) { // admin1
            parent = {
                desc: $('option[value="' + match[1] + '-all.js"]').text(),
                key: match[1] + '-all'
            };
        }
        $('#up').html('');
        if (parent) {
            $('#up').append(
                $('<a><i class="fa fa-angle-up"></i> ' + parent.desc + '</a>')
                    .attr({
                        title: parent.key
                    })
                    .click(function () {
                        $('#mapDropdown').val(parent.key + '.js').change();
                    })
            );
        }


        // Instantiate chart
        $("#container").highcharts('Map', {

            title: {
                text: null
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 0,
                stops: [
                    [0, '#EFEFFF'],
                    [0.5, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                ]
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },

            series: [{
                data: data,
                mapData: mapGeoJSON,
                joinBy: ['hc-key', 'key'],
                name: 'Random data',
                states: {
                    hover: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                dataLabels: {
                    enabled: showDataLabels,
                    formatter: function () {
                        return mapKey === 'custom/world' || mapKey === 'countries/us/us-all' ?
                            (this.point.properties && this.point.properties['hc-a2']) :
                            this.point.name;
                    }
                },
                point: {
                    events: {
                        // On click, look for a detailed map
                        click: function () {
                            var key = this.key;
                            $('#mapDropdown option').each(function () {
                                if (this.value === 'countries/' + key.substr(0, 2) + '/' + key + '-all.js') {
                                    $('#mapDropdown').val(this.value).change();
                                }
                            });
                        }
                    }
                }
            }, {
                type: 'mapline',
                name: "Separators",
                data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                nullColor: 'gray',
                showInLegend: false,
                enableMouseTracking: false
            }]
        });

        showDataLabels = $("#chkDataLabels").prop('checked');

    }

    // Check whether the map is already loaded, else load it and
    // then show it async
    if (Highcharts.maps[mapKey]) {
        mapReady();
    } else {
        $.getScript(javascriptPath, mapReady);
    }
});

// Toggle data labels - Note: Reloads map with new random data
$("#chkDataLabels").change(function () {
    showDataLabels = $("#chkDataLabels").prop('checked');
    $("#mapDropdown").change();
});

// Switch to previous map on button click
$("#btn-prev-map").click(function () {
    $("#mapDropdown option:selected").prev("option").prop("selected", true).change();
});

// Switch to next map on button click
$("#btn-next-map").click(function () {
    $("#mapDropdown option:selected").next("option").prop("selected", true).change();
});

// Trigger change event to load map on startup
if (location.hash) {
    $('#mapDropdown').val(location.hash.substr(1) + '.js');
} else { // for IE9
    $($('#mapDropdown option')[0]).attr('selected', 'selected');
}
$('#mapDropdown').change();

              </script>
            ` }}
          />
        </StartColumnContainer>

      </Container>
    )
  }
}

const stylesList = StyleSheet.create({
  live: {
    color: 'white',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: 'red',
    borderRadius: 8,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  user: {
    fontSize: 16,
    fontWeight: '300',
  },
})
const mapStateToProps = state => ({
  user: state.user.user,
  list_live: state.stream.list_live,
})

export default connect(mapStateToProps, { listLiveStreamAction })(WebChartDemo)
