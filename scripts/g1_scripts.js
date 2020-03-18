// constants for the SVG
var width1 = 600,
    height1 = 600;

// set up the colour scale
var color1 = d3.scale.category20();

// set up the force layout
var force1 = d3.layout.force()
    .charge(-100)
    // .linkStrength(function(d) { return  d.value; })
    .linkDistance(function(d) { return  (Math.min((2-d.value*1.8),0.02)*4000); })
    .size([width1, height1]);

// add svg to body of doc
var svg1 = d3.select("body").append("svg")
    .attr("width", width1)
    .attr("height", height1)
    .call(d3.behavior.zoom().on("zoom", function () {svg.attr("transform", d3.event.transform)}))

// store original graph1 data to redraw if needed
graph1Rec=JSON.parse(JSON.stringify(graph1));

// create graph1 structure from json data
force1.nodes(graph1.nodes)
    .links(graph1.links)
    .start();

// create edges
var link1 = svg1.selectAll(".link")
    .data(graph1.links)
    .enter().append("line")
    .attr("class", "link")
    // .style("stroke-width", function (d) {return (0.5-d.value)*3;})
    // .style("opacity", function (d) {return (d.value-0.45)*2;});

// create nodes
var node1 = svg1.selectAll(".node")
    .data(graph1.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force1.drag)
    .on('dblclick', connectednodes);
node1.append("circle")
    .attr("r", 5)
    .style("fill", function (d) {return color(d.group);})
node1.append("text")
    .attr("dx", 5)
    .attr("dy", ".35em")
    .text(function(d) { return d.name })            


// apply force to define node positions
force1.on("tick", function () {
    link1.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
        return d.source.y;
    })
        .attr("x2", function (d) {
        return d.target.x;
    })
        .attr("y2", function (d) {
        return d.target.y;
    });
    d3.selectAll("circle").attr("cx", function (d) {
        return d.x;
    })
        .attr("cy", function (d) {
        return d.y;
    });
    d3.selectAll("text").attr("x", function (d) {
        return d.x;
    })
        .attr("y", function (d) {
        return d.y;
    });
});


//Toggle stores whether the highlighting is on
var toggle1 = 0;
//Create an array logging what is connected to what
var linkedByIndex1 = {};
for (i = 0; i < graph1.nodes.length; i++) {
    linkedByIndex1[i + "," + i] = 1;
};
graph1.links.forEach(function (d) {
    linkedByIndex1[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex1[a.index + "," + b.index];
}
function connectednodes() {
    if (toggle1 == 0) {
        // reduce the opacity of all but neighbouring nodes
        d = d3.select(this).node().__data__;
        // console.log(d3.select(this).node().childNodes[0])
        
        link1.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0.01;
        });
        toggle = 1;
    } else {
        toggle = 0;
        restart();
        // reset opacity=1
        // node.style("opacity", 1);
        // // link.style("opacity", 1);
        // link.style("opacity", function (d) {return (d.value);});
    }
}

// adjust edge threshold
function threshold1(thresh) {
    console.log('Social thresh: '+thresh)
    graph1.links.splice(0, graph1.links.length);
        for (var i = 0; i < graph1Rec.links.length; i++) {
            if (graph1Rec.links[i].value > thresh) {graph1.links.push(graph1Rec.links[i]);}
        }
    restart1();
}

// reset graph1 visualisation
function restart1() {
    link1 = link1.data(graph1.links);
    link1.exit().remove();
    link1.enter().insert("line", ".node").attr("class", "link");
    // link.style("stroke-width", function (d) {return (0.5-d.value)*3;});
    // link1.style("opacity", function (d) {return (d.value-0.45)*2;});
    link1.style("opacity", 0.8);
    
    node1 = node1.data(graph1.nodes);
    node1.enter().insert("circle", ".cursor").attr("class", "node").attr("r", 5).call(force1.drag);
    force1.start();
}

// document.getElementById('thersholdSlider1').value=0.5;
// threshold1(0.5);