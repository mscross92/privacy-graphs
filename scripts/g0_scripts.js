// var graph = {"nodes":[],"links":[]};

// constants for the SVG
var width = 600,
    height = 600;

// set up the colour scale
var color = d3.scale.category20();

// set up the force layout
var force = d3.layout.force()
    .charge(-100)
    // .linkStrength(function(d) { return  d.value; })
    .linkDistance(function(d) { return  (Math.min((2-d.value*1.8),0.02)*500); })
    .size([width, height]);

// add svg to body of doc
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().on("zoom", function () {svg.attr("transform", d3.event.transform)}))

// store original graph data to redraw if needed
graphRec=JSON.parse(JSON.stringify(graph));

// create graph structure from json data
force.nodes(graph.nodes)
    .links(graph.links)
    .start();

// create edges
var link = svg.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    // .style("stroke-width", function (d) {return (0.5-d.value)*3;})
    // .style("opacity", function (d) {return (d.value-0.45)*2;});

// create nodes
var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .on('dblclick', connectedNodes);
node.append("circle")
    .attr("r", 5)
    .style("fill", function (d) {return color(d.group);})
node.append("text")
    .attr("dx", 5)
    .attr("dy", ".35em")
    .text(function(d) { return d.name })            


// apply force to define node positions
force.on("tick", function () {
    link.attr("x1", function (d) {
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
var toggle = 0;
//Create an array logging what is connected to what
var linkedByIndex = {};
for (i = 0; i < graph.nodes.length; i++) {
    linkedByIndex[i + "," + i] = 1;
};
graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
});
//This function looks up whether a pair are neighbours
function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}
function connectedNodes() {
    if (toggle == 0) {
        // reduce the opacity of all but neighbouring nodes
        d = d3.select(this).node().__data__;
        // console.log(d3.select(this).node().childNodes[0])
        
        link.style("opacity", function (o) {
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
function threshold(thresh) {
    console.log('Datasets thresh: '+thresh)
    graph.links.splice(0, graph.links.length);
        for (var i = 0; i < graphRec.links.length; i++) {
            if (graphRec.links[i].value > thresh) {graph.links.push(graphRec.links[i]);}
        }
    restart();
}

// reset graph visualisation
function restart() {
    link = link.data(graph.links);
    link.exit().remove();
    link.enter().insert("line", ".node").attr("class", "link");
    // link.style("stroke-width", function (d) {return (0.5-d.value)*3;});
    // link.style("opacity", function (d) {return (d.value-0.45)*2;});
    link.style("opacity", 0.8);
    
    node = node.data(graph.nodes);
    node.enter().insert("circle", ".cursor").attr("class", "node").attr("r", 5).call(force.drag);
    force.start();
}

document.getElementById('thersholdSlider').value=0.5;
threshold(0.5);