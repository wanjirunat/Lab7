// import data with area
d3.csv('cities_and_population_area.csv')
.then(data => {
  data.map(d => {
    d.x = parseInt(d.x)
    d.y = parseInt(d.y)
    d.area = parseFloat(d.area)
    d.population = parseInt(d.population)
  })

  axis(data)
})

function axis(data) {

  const body = d3.select('body')

// parameters
  const margin = {top: 450, bottom: 490, left: 100, right: 30}
  const width = 700 
  const height = 500

// append svg
  const svg = body.append('svg')
    .attr('width', width)
    .attr('height', height)

//
  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.area)])
    .range([0, width - margin.left - margin.right])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .range([0, height - margin.top - margin.bottom])

  const xAxis = d3.axisTop(xScale)

  const yAxis = d3.axisLeft(yScale)

  chart.append('g')
    .call(xAxis)

  chart.append('g')
    .call(yAxis)

  chart.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'circle')
    .attr('cx', d => xScale(d.area))
    .attr('cy', d => yScale(d.population))
    .attr('r', d => {
        if(d.population > 1000000){
        return 8
        } else {
        return 4
    }
    })

  chart.append('g').selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.area)+10)
    .attr('y', d => yScale(d.population)+6)
    .text(d => d.city)
    .attr('class', 'city-label')

    chart.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', d => xScale(d.area))
      .attr('cy', d => yScale(d.population))
      .attr('r', d => {
        if(d.population > 1000000){
        return 8
      } else {
        return 4
      }
      })
  
}