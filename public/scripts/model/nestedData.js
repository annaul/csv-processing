(function(module) {
  var nestedData = {};

  function getNestedData() {
    var values = [];
    for (var i = 0; i < 5; i++) {
      var currentSum = module.fileInput.sortedBySum[i][module.fileInput.sortedBySum[i].length - 1]['sum'] * -1;
      var currentName = module.fileInput.sortedBySum[i][0]['name']
      var currentObject = { 'a': i, 'b': currentName, 'c': currentSum };
      values.push(currentObject);
    }
    console.log(values);
    return {
      "$schema": "https://vega.github.io/schema/vega/v3.0.json",
      "width": 300,
      "padding": 5,
      "autosize": "pad",

      "signals": [
        {
          "name": "rangeStep", "value": 20
        },
        {
          "name": "innerPadding", "value": 0.1
        },
        {
          "name": "outerPadding", "value": 0.2
        },
        {
          "name": "height",
          "update": "trellisExtent[1]"
        }
      ],

      "data": [
        {
          "name": "tuples",
          "values": values,
          "transform": [
            {
              "type": "aggregate",
              "groupby": ["a", "b"],
              "fields": ["c"],
              "ops": ["average"],
              "as": ["c"]
            }
          ]
        },
        {
          "name": "trellis",
          "source": "tuples",
          "transform": [
            {
              "type": "aggregate",
              "groupby": ["a"]
            },
            {
              "type": "formula", "as": "span",
              "expr": "rangeStep * bandspace(datum.count, innerPadding, outerPadding)"
            },
            {
              "type": "stack",
              "field": "span"
            },
            {
              "type": "extent",
              "field": "y1",
              "signal": "trellisExtent"
            }
          ]
        }
      ],

      "scales": [
        {
          "name": "xscale",
          "domain": {"data": "tuples", "field": "c"},
          "nice": true,
          "zero": true,
          "round": true,
          "range": "width"
        },
        {
          "name": "color",
          "type": "ordinal",
          "range": "category",
          "domain": {"data": "trellis", "field": "a"}
        }
      ],

      "axes": [
        { "orient": "bottom", "scale": "xscale", "domain": true }
      ],

      "marks": [
        {
          "type": "group",

          "from": {
            "data": "trellis",
            "facet": {
              "name": "faceted_tuples",
              "data": "tuples",
              "groupby": "a"
            }
          },

          "encode": {
            "enter": {
              "x": {"value": 0},
              "width": {"signal": "width"}
            },
            "update": {
              "y": {"field": "y0"},
              "y2": {"field": "y1"}
            }
          },

          "scales": [
            {
              "name": "yscale",
              "type": "band",
              "paddingInner": {"signal": "innerPadding"},
              "paddingOuter": {"signal": "outerPadding"},
              "round": true,
              "domain": {"data": "faceted_tuples", "field": "b"},
              "range": {"step": {"signal": "rangeStep"}}
            }
          ],

          "axes": [
            { "orient": "left", "scale": "yscale",
            "ticks": false, "domain": false, "labelPadding": 4 }
          ],

          "marks": [
            {
              "type": "rect",
              "from": {"data": "faceted_tuples"},
              "encode": {
                "enter": {
                  "x": {"value": 0},
                  "x2": {"scale": "xscale", "field": "c"},
                  "fill": {"scale": "color", "field": "a"},
                  "strokeWidth": {"value": 2}
                },
                "update": {
                  "y": {"scale": "yscale", "field": "b"},
                  "height": {"scale": "yscale", "band": 1},
                  "stroke": {"value": null},
                  "zindex": {"value": 0}
                },
                "hover": {
                  "stroke": {"value": "firebrick"},
                  "zindex": {"value": 1}
                }
              }
            }
          ]
        }
      ]
    }
  }


  module.nestedData = nestedData;
  nestedData.getNestedData = getNestedData;
}(window));
