function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
};

function queryEvents() {
  $.get( "/api/content/be85f2259ba9726f209bee5fa6db700b/stats", function( d ) {
    console.log(d);
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: JSON.parse(d).map( function(item) { return item["time"] }),
        datasets: [{
            data: JSON.parse(d).map( function(item) { return item["score"] }),
            label: "Где смешно",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Где смешно'
        },
        animation: false,
        scales: {
           yAxes: [{
               ticks: {
                   suggestedMin: 0,
                   suggestedMax: 100
               }
           }]
        }
      }
    });
  });
};

$( document ).ready(function() {
    queryEvents();
    setInterval(queryEvents, 3000);
});
