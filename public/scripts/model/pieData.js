(function(module) {
  var pieData = {};

  function getPieData() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      var currentSum = module.fileInput.sortedBySum[i][module.fileInput.sortedBySum[i].length - 1]['sum'];
      var currentObject = { 'id': i, 'field': currentSum };
      values.push(currentObject);
    }
    console.log(values);
    return {
      "$schema": "https://vega.github.io/schema/vega/v3.0.json",
      "width": 200,
      "height": 200,
      "autosize": "none",

      "signals": [
        {
          "name": "startAngle", "value": 0
        },
        {
          "name": "endAngle", "value": 6.29
        },
        {
          "name": "padAngle", "value": 0
        },
        {
          "name": "innerRadius", "value": 0
        },
        {
          "name": "cornerRadius", "value": 0
        },
        {
          "name": "sort", "value": false,
        }
      ],
      "data": [
        {
          "name": "table",
          "values": values,
          "transform": [
            {
              "type": "pie",
              "field": "field",
              "startAngle": {"signal": "startAngle"},
              "endAngle": {"signal": "endAngle"},
              "sort": {"signal": "sort"}
            }
          ]
        }
      ],

      "scales": [
        {
          "name": "color",
          "type": "ordinal",
          "range": {"scheme": "category20"}
        }
      ],

      "marks": [
        {
          "type": "arc",
          "from": {"data": "table"},
          "encode": {
            "enter": {
              "fill": {"scale": "color", "field": "id"},
              "x": {"signal": "width / 2"},
              "y": {"signal": "height / 2"},
              "tooltip": {"field": "field"}
            },
            "update": {
              "startAngle": {"field": "startAngle"},
              "endAngle": {"field": "endAngle"},
              "padAngle": {"signal": "padAngle"},
              "innerRadius": {"signal": "50"},
              "outerRadius": {"signal": "width / 2"},
              "cornerRadius": {"signal": "cornerRadius"}
            }
          }
        },
      ]
    }
  }

  module.pieData = pieData;
  pieData.getPieData = getPieData;
}(window));
