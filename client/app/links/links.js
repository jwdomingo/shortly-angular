angular.module('shortly.links', [])
.controller('LinksController', function ($scope, Links, D3) {
  $scope.data = {};
  $scope.searchString = $scope.$parent.serachString;
  Links.getAll()
  .then(function (links) {
    $scope.data.links = links;
  })
  .then(function () {
    D3.d3().then(function (d3) {
      var width = 960;
      var height = 500;
      var radius = Math.min(width, height) / 2;

      var color = d3.scale.category20();

      var pie = d3.layout.pie()
        .value(function (d) {
          return d.visits;
        }).sort(null);

      var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);

      var translate = 'translate(' + width / 2 + ',' + height / 2 + ') ';

      var svg = d3.select('svg')
        .attr({
          'id': 'visits',
          'width': width,
          'height': height })
        .call(responsivefy)
        .append("g");

      var path = svg.datum($scope.data.links).selectAll("path")
        .data(pie).enter()
        .append("path")
          .attr({
            'd': arc,
            'fill': function (d, i) {
              return color(i);
            }
          })
        .select('text')
          .data($scope.data.links).enter()
          .append('text')
          .text(function (d) {
            return d.title;
          }).attr('x', 1);

      var rotate = function () {
        var i = d3.interpolate(0, 360);
        return function (t) {
            return translate + 'rotate(' + i(t) + ',0,0)';
        };
      };

      var spin = function () {
        svg.transition().duration(8000).ease('linear')
        .attrTween('transform', rotate)
        .each('end', spin);
      };

      spin();

      function responsivefy(svg) {
        var container = d3.select('#graph');
        var width = parseInt(svg.style('width'));
        var height = parseInt(svg.style('height'));
        var aspect = width / height;

        svg.attr({
          'viewBox': '0 0 ' + width + ' ' + height,
          'perserveAspectRatio': 'xMinYMid'
        }).call(resize);

        d3.select(window).on('resize', resize);

        function resize() {
          var targetWidth = parseInt(container.style('width'));
          svg.attr({
            'width': targetWidth,
            'height': Math.round(targetWidth / aspect)
          });
        }
      }

      d3.selectAll("input")
        .on("change", $scope.change);

        // var timeout = setTimeout(function () {
        //   d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        // }, 2000);

        $scope.change = function () {
          // var value = this.value;
          // clearTimeout(timeout);
          // pie.value(function (d) { return d[value]; }); // change the value function
          path = path.data(pie); // compute the new angles
          path.attr("d", arc); // redraw the arcs
        };
    });
  });
})
.controller('SearchController', function ($scope) {
  $scope.search = {};
});
