function week1(elementID)
{
document.getElementById(elementID).innerHTML = "";
var width = 560
var height = 350

var albersProjection=d3.geoAlbers()
                    .scale(40000)
                    .rotate([73.985880,0])
                    .center([0,40.693943])
                    .translate([width/4,height/2])

var path = d3.geoPath()
        .projection(albersProjection)

var svg = d3.select("#body1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
// Global Variables
var inputValue = null;
var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

    //2. Load the data: to create Boston neighborhood map
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
    //
     // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
    // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

    var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
    var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
    //

    var unemployment = d3.map();

    var promises = [
                     d3.json(newyork),
                     d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.Last_Year_March_28)})]

    var x = d3.scaleLinear()
             .domain([0,200,1000,10000,20000,40000])
                         .range([0,50,100,150,200,250]);

                 var color = d3.scaleThreshold()
                  //	.domain(d3.range(30,1861))
                   .domain([0, 2000,10000, 40000,70000])
                   // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                   .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


    var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(110,310)");

    g.selectAll("rect")
        .data(color.range().map(function(d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            console.log(d)
            return d;
        }))
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d,i) { return 50*i; })
        .attr("y", 0)
        .attr("width", function(d) { return 50; })
        .attr("stroke","black")
        .attr("fill", function(d) { return color(d[0]); });


    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y",25)
        .attr("fill", "#fff")
        .attr("text-anchor", "start")
        .attr("font-style", "italic")
        .attr("font-weight","bold")
        .attr("font-family","Georgia, serif")
        .attr("font-size",11)
        .text("Unemployment claims by NYC borough");

        g.call(d3.axisTop(x)
        .scale(x)
        .tickSize(10)
        .ticks()
        .tickFormat(function(x, i) { return i ? x : x ; })
        //.tickArguments([8]))
        .tickValues(x.domain()))
        .select(".domain")
        .remove();

Promise.all(promises).then(ready)

function ready([newyork]) {

// console.log(newyork.features)
svg.append("g")
 .selectAll("path")
 .data(newyork.features)
 // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
 .enter()
 .append("path")
 .attr("fill", function(d) {
  console.log(d.properties.BoroName)
   if (color(unemployment.get(d.properties.BoroName))==undefined)
   return "white"
   else
   return color(unemployment.get(d.properties.BoroName)) })

 .style("stroke","black") //REMOVE THIS LINE
  .attr("d", path)
}
d3.select("#timeslide").on("input", function() {

    update(+this.value);
});

}

function week2(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.March_21)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "	#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week3(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.March_28)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week4(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.April_4)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week5(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.April_11)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week6(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.April_18)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week7(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.April_25)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();
  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}

function week8(elementID)
{
  document.getElementById(elementID).innerHTML = "";
  var width = 560
  var height = 350

  var albersProjection=d3.geoAlbers()
                      .scale(40000)
                      .rotate([73.985880,0])
                      .center([0,40.693943])
                      .translate([width/4,height/2])

  var path = d3.geoPath()
          .projection(albersProjection)

  var svg = d3.select("#body1")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  // Global Variables
  var inputValue = null;
  var week = ["Last_Year_March_28","March_21","March_28","April_4","April_11","April_18","April_25","May_2"];

      //2. Load the data: to create Boston neighborhood map
      // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      var newyork = "https://raw.githubusercontent.com/dwillis/nyc-maps/master/boroughs.geojson"
      //
       // "https://gist.githubusercontent.com/meitalhoffman/66e30998715a8940bae38e7f13497b2a/raw/625de0710e43b5f2974ef2f9a64fbb75dff4b3d9/NYBoroughBoundaries.topojson"
      // "https://raw.githubusercontent.com/bsmithgall/bsmithgall.github.io/master/js/json/nyc-boroughs.topojson"

      var weeklyclaims = 'https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20Updated.csv';
      var date="https://raw.githubusercontent.com/snabahe/nyc-workforce/master/NYC%20Unemployment%20DateMatch.csv";
      //

      var unemployment = d3.map();

      var promises = [
                       d3.json(newyork),
                       d3.csv(weeklyclaims, function(d) { unemployment.set(d.Borough, +d.May_2)})]

      var x = d3.scaleLinear()
               .domain([0,200,1000,10000,20000,40000])
                           .range([0,50,100,150,200,250]);

                   var color = d3.scaleThreshold()
                    //	.domain(d3.range(30,1861))
                     .domain([0, 2000,10000, 40000,70000])
                     // .range(["#AAFAF6","#91D6D2","#79B2AF","#618E8C","#486B69"]);
                     .range(["#00847f","#70fffa","#a4fffc", "#ffa4a6", "#ff7074", "#d70005"]);


      var g = svg.append("g")
      .attr("class", "key")
      .attr("transform", "translate(110,310)");

      g.selectAll("rect")
          .data(color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              console.log(d)
              return d;
          }))
          .enter().append("rect")
          .attr("height", 8)
          .attr("x", function(d,i) { return 50*i; })
          .attr("y", 0)
          .attr("width", function(d) { return 50; })
          .attr("stroke","black")
          .attr("fill", function(d) { return color(d[0]); });


      g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y",25)
          .attr("fill", "#fff")
          .attr("text-anchor", "start")
          .attr("font-style", "italic")
          .attr("font-weight","bold")
          .attr("font-family","Georgia, serif")
          .attr("font-size",11)
          .text("Unemployment claims by NYC borough");

        g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(10)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x ; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

  Promise.all(promises).then(ready)

  function ready([newyork]) {

  // console.log(newyork.features)
  svg.append("g")
   .selectAll("path")
   .data(newyork.features)
   // .data(topojson.feature(newyork, newyork.features.properties).features) //entering our data
   .enter()
   .append("path")
   .attr("fill", function(d) {
    console.log(d.properties.BoroName)
     if (color(unemployment.get(d.properties.BoroName))==undefined)
     return "white"
     else
     return color(unemployment.get(d.properties.BoroName)) })

   .style("stroke","black") //REMOVE THIS LINE
    .attr("d", path)
  }
  d3.select("#timeslide").on("input", function() {

      update(+this.value);
  });

}
