'use strict';

(function(module) {
  var graphData = {};
  var dataObj = {};

  var getGraphData = function() {
    var values = [];

    var Values = function(category, amount, id) {
      this.category = category,
      this.amount = amount,
      this.id = id
    }

    for (var i = 3; i < 15; i++) {
      var category = module.fileInput.sortedBySum[i][0]['name'].split(/[^A-Za-z]/)[0].toLowerCase();
      var categoryArr = module.fileInput.names[category];
      var amount = categoryArr[categoryArr.length - 1]['sum'];
      var currentValue = new Values(category, amount, i);
      values.push(currentValue);
    }
    var dataObj = {
      "$schema": "https://vega.github.io/schema/vega/v3.0.json",
      "width": 1000,
      "height": 300,
      "padding": 5,
      "data": [
        {
          "name": "table",
          "values": values
        }
      ],
      "signals": [
        {
          "name": "tooltip",
          "value": {},
          "on": [
            {
              "events": "rect:mouseover",
              "update": "datum"
            },
            {
              "events": "rect:mouseout",
              "update": "{}"
            }
          ]
        }
      ],
      "scales": [
        {
          "name": "xscale",
          "type": "band",
          "domain": {
            "data": "table",
            "field": "category"
          },
          "range": "width"
        },
        {
          "name": "yscale",
          "domain": {
            "data": "table",
            "field": "amount"
          },
          "nice": true,
          "range": "height"
        }
      ],
      "axes": [
        {
          "orient": "bottom",
          "scale": "xscale"
        },
        {
          "orient": "left",
          "scale": "yscale"
        }
      ],
      "marks": [
        {
          "type": "rect",
          "from": {
            "data": "table"
          },
          "encode": {
            "enter": {
              "x": {
                "scale": "xscale",
                "field": "category",
                "offset": 1
              },
              "width": {
                "scale": "xscale",
                "band": 1,
                "offset": -1
              },
              "y": {
                "scale": "yscale",
                "field": "amount"
              },
              "y2": {
                "scale": "yscale",
                "value": 0
              }
            },
            "update": {
              "fill": {
                "value": "steelblue"
              }
            },
            "hover": {
              "fill": {
                "value": "red"
              }
            }
          }
        },
        {
          "type": "text",
          "encode": {
            "enter": {
              "align": {
                "value": "center"
              },
              "baseline": {
                "value": "bottom"
              },
              "fill": {
                "value": "#333"
              }
            },
            "update": {
              "x": {
                "scale": "xscale",
                "signal": "tooltip.category",
                "band": 0.5
              },
              "y": {
                "scale": "yscale",
                "signal": "tooltip.amount",
                "offset": -2
              },
              "text": {
                "signal": "tooltip.amount"
              },
              "fillOpacity": [
                {
                  "test": "datum === tooltip",
                  "value": 0
                },
                {
                  "value": 1
                }
              ]
            }
          }
        }
      ]
    }
    return dataObj;
  }
  module.graphData = graphData;
  graphData.getGraphData = getGraphData;
}(window));
