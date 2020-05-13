function income_plot(elementID){
document.getElementById(elementID).innerHTML = "";
var width = 560,
    height = 350;
    var albersProjection=d3.geoAlbers()
                        .scale(40000)
                        .rotate([73.985880,0])
                        .center([0,40.693943])
                        .translate([width/4,height/2])
var path = d3.geoPath()
            .projection(albersProjection)

var svg = d3.select("#body1").append("svg")
            .attr("width", width)
            .attr("height", height);
var canvas = d3.select("body")
            .insert("svg")
            .attr('id', 'd3-canvas')
            //Solve the namespace issue (xmlns and xlink)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
            .attr("width", width)
            .attr("height", height);
var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
var proxyUrl=''
var nyczipcode='https://gist.githubusercontent.com/ragini30/919d96e28908d306f961d1456144753f/raw/35e0c51c9a1a8b27af5699726dd816ffbba54559/ny_zip.json'
var nyc_income='https://gist.githubusercontent.com/ragini30/919d96e28908d306f961d1456144753f/raw/3d5f5dbd85c05f0db42f2f7ad0969329d36c440e/income_zip_nyc.csv'
//	var nyc_cases="covid_cases_zip.csv"
var covid = d3.map();
var promises = [
                 d3.json(proxyUrl + nyczipcode),
                 d3.csv(proxyUrl + nyc_income, function(d) { covid.set(d.ZIP_code, +d.Median) })]
var x = d3.scaleLinear()
         .domain([0,57782,250001])
         .range([0,50,100,150,200,250]);

             var color = d3.scaleThreshold()
              //	.domain(d3.range(30,1861))
                  .domain([57782])
              // .domain([30000,50000,70000,90000])
                .range(["#aafaf6", "#51c0bc"])
               //.range(d3.schemeYlGnBu[4]);
var g = svg.append("g")
          .attr("class", "key")
          .attr("transform", "translate(130,310)");
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
              .text("Median Income by Zipcode");


           console.log(color.range())
          g.call(d3.axisTop(x)
          .scale(x)
          .tickSize(5)
          .ticks()
          .tickFormat(function(x, i) { return i ? x : x + "$"; })
          //.tickArguments([8]))
          .tickValues(x.domain()))
          .select(".domain")
          .remove();

Promise.all(promises).then(ready)



       function ready([us]) {
         console.log(color(covid.get(10005)))
         console.log(us)
          svg.append("g")
              .selectAll("path")
              .data(us.features)
              .enter()
              .append("path")
              //.attr("stroke","#333")
              .attr("fill", function(d) { if (color(covid.get(+d.properties.postalCode))==undefined)
                return "black"
                else
                return color(covid.get(d.properties.postalCode)) })
              .style("stroke","black") //REMOVE THIS LINE
               .attr("d", path)
      }
      }
