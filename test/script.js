// script.js
const ctx = document.getElementById('myChart').getContext('2d');

// Define the boundary of the "IDEAL OPTIMUM BALANCE" region
const minExtraction = 18;
const maxExtraction = 22;
const minConcentration = 1.15;
const maxConcentration = 1.35;

// Function to calculate the nearest point within the "IDEAL OPTIMUM BALANCE" region
function getNearestPoint(x, y) {
    const nearestX = Math.min(Math.max(x, minExtraction), maxExtraction);
    const nearestY = Math.min(Math.max(y, minConcentration), maxConcentration);
    return { x: nearestX, y: nearestY };
}

// Initial example data point outside the "IDEAL OPTIMUM BALANCE" region
let point = { x: 23, y: 1.5 };
let nearestPoint = getNearestPoint(point.x, point.y);

const data = {
    datasets: [{
        label: 'Data Points',
        data: [point, nearestPoint],
        backgroundColor: ['red', 'blue']
    }],
    labels: ['Original Point', 'Nearest Point']
};

const options = {
    type: 'scatter',
    data: data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 14,
                max: 26,
                title: {
                    display: true,
                    text: 'Extraction: Solubles Yield (%)'
                }
            },
            y: {
                min: 0.8,
                max: 1.6,
                title: {
                    display: true,
                    text: 'Strength: Solubles Concentration (%)'
                }
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    box1: {
                        type: 'box',
                        xMin: minExtraction,
                        xMax: maxExtraction,
                        yMin: minConcentration,
                        yMax: maxConcentration,
                        backgroundColor: 'rgba(75, 192, 192, 0.25)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        label: {
                            content: 'IDEAL OPTIMUM BALANCE',
                            enabled: true,
                            position: 'center'
                        }
                    }
                }
            }
        }
    }
};

const myChart = new Chart(ctx, options);

document.getElementById('myChart').addEventListener('click', function(event) {
    // Get the chart's relative coordinates for the click event
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert pixel coordinates to chart scale values
    const xScale = myChart.scales['x'];
    const yScale = myChart.scales['y'];

    const xValue = xScale.getValueForPixel(x);
    const yValue = yScale.getValueForPixel(y);

    // Update the point with the clicked coordinates
    point = { x: xValue, y: yValue };
    nearestPoint = getNearestPoint(point.x, point.y);

    // Update chart data
    myChart.data.datasets[0].data = [point, nearestPoint];
    myChart.update();
});
