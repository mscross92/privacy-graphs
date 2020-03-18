// var graphRec=JSON.parse(JSON.stringify(graph)); //Add this line 

// // constants for the SVG
// var width = 1024,
//     height = 750;

// // graph colour scale
// var color = d3.scale.category20();

// // force layout parameters
// var force = d3.layout.force()
//     .charge(-80)
//     .linkDistance(20)
//     .size([width, height]);

// // append SVG to body of html page
// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("align", "center");

// var link = svg.selectAll(".link")
//     .data(graph.links)
//     .enter().append("line")
//     .attr("class", "link")
//     // .attr("linkDistance", function(d) { return d.strength * 200; })
//     // .attr("strength", function (d) {return (d.strength);})
//     .style("stroke-width", function (d) {return (d.value * 2);});

// var node = svg.selectAll(".node")
//     .data(graph.nodes)
//     .enter().append("g")
//     .attr("class", "node")
//     .call(force.drag);


// //adjust threshold
// function threshold(thresh) {
//     console.log(thresh)

//     graph.links.splice(0, graph.links.length);
// 		for (var i = 0; i < graphRec.links.length; i++) {
// 			if (graphRec.links[i].value > thresh) {graph.links.push(graphRec.links[i]);}
// 		}
//     restart();
// }

// //Restart the visualisation after any node and link changes
// function restart() {
// 	link = link.data(graph.links);
// 	link.exit().remove();
// 	link.enter().insert("line", ".node").attr("class", "link");
// 	node = node.data(graph.nodes);
// 	node.enter().insert("circle", ".cursor").attr("class", "node").attr("r", 5).call(force.drag);
// 	force.start();
// }

// function init() {

// // create graph data structure from json data
// force.nodes(graph.nodes)
//     .links(graph.links)
//     .start();

// node.append("circle")
//     .attr("r", 8)
//     .style("fill", function (d) {return color(d.group);})

// node.append("text")
//       .attr("dx", 10)
//       .attr("dy", ".35em")
//       .attr("color","black")
//       .text(function(d) { return d.name });

// // give SVG elements coordinates
// force.on("tick", function () {
//     link.attr("x1", function (d) {
//         return d.source.x;
//     })
//         .attr("y1", function (d) {
//         return d.source.y;
//     })
//         .attr("x2", function (d) {
//         return d.target.x;
//     })
//         .attr("y2", function (d) {
//         return d.target.y;
//     });

//     // node.attr("cx", function (d) {
//     //     return d.x;
//     // })
//     //     .attr("cy", function (d) {
//     //     return d.y;
//     // });

//     d3.selectAll("circle").attr("cx", function (d) {
//         return d.x;
//     })
//         .attr("cy", function (d) {
//         return d.y;
//     });

//     d3.selectAll("text").attr("x", function (d) {
//         return d.x;
//     })
//         .attr("y", function (d) {
//         return d.y;
//     });
// });

// // threshold(0.5)

// }