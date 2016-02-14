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

      var svg = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var path = svg.datum($scope.data.links).selectAll("path")
            .data(pie)
          .enter().append("path")
            .attr("fill", function (d, i) {
              return color(i);
            })
            .attr("d", arc)
            .select('text')
            .data($scope.data.links).enter().append('text')
            .text(function (d) {
              return d.title;
            }).attr('x', d);

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
