	function createGraph() {
            var ctx = document.getElementById('chart').getContext('2d');
            var graphType = document.getElementById('graph').value;

            // Make an AJAX request to CGI script
            fetch('./graphing.cgi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    dataset1: document.getElementById('dataset1').value,
                    dataset2: document.getElementById('dataset2').value,
                    graph: graphType
                })
            })
            .then(response => response.json())
            .then(data => {
                var DATA1 = data.data1;
                var DATA2 = data.data2;

                var graphConfig;

                if (graphType === 'bar') {
                    graphConfig = {
                        type: 'bar',
                        data: {
                            labels: DATA1,
                            datasets: [{
                                label: 'Dataset',
                                data: DATA2,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'X-axis Label'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Y-axis Label'
                                    }
                                }
                            }
                        }
                    };
                } else if (graphType === 'scatter') {
                    graphConfig = {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                label: 'Dataset',
                                data: DATA1.map((value, index) => ({ x: value, y: DATA2[index] })),
                                backgroundColor: 'rgba(75, 192, 192, 0.6)'
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    type: 'linear',
                                    position: 'bottom',
                                    title: {
                                        display: true,
                                        text: 'X-axis Label'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Y-axis Label'
                                    }
                                }
                            }
                        }
                    };
                } else if (graphType === 'line') {
                    graphConfig = {
                        type: 'line',
                        data: {
                            labels: DATA1,
                            datasets: [{
                                label: 'Dataset',
                                data: DATA2,
                                borderColor: 'rgba(75, 192, 192, 0.6)',
                                fill: false
                            }]
                        },
                        options: {
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'X-axis Label'
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Y-axis Label'
                                    }
                                }
                            }
                        }
                    };
                }

                new Chart(ctx, graphConfig);
            })
            .catch(error => console.error('Error fetching data:', error));
        }