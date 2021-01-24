<template>
  <div class='grid-container'>
    <div class="card blue-grey darken-1 middleGrid" style="width:300px; margin:40px auto;">
      <div class="card-content white-text">
        <span class="card-title">{{ ChildCovidInfo['Country'] }}, {{ChildCovidInfo['TwoLetterSymbol'].toUpperCase()}}</span>
        <p>
          Total Cases: {{ChildCovidInfo['TotalCases']}}
        </p>
        <p>
          New Cases: {{ChildCovidInfo['NewCases']}}
        </p>
        <p>
          Total Deaths: {{ChildCovidInfo['TotalDeaths']}}
        </p>
        <p>
          New Deaths: {{ChildCovidInfo['NewDeaths']}}
        </p>
        <p>
          Active Cases: {{ChildCovidInfo['ActiveCases']}}
        </p>
      </div>

    </div>

  </div>
</template>
<script>
// We are going to use this component to display our location's COVID information
export default{
  name: 'DisplayInfo',
  props: {
    covidInfo :{
      type: Object
    }
  },
  data(){
    return{
      ChildCovidInfo: this.covidInfo,
      msg: 'Hello'
    }
  },
  methods:{
    initializeSetup: function(){
      console.log(this.ChildLocationInfo)
    }
  },
  created(){
    this.initializeSetup()
  }
}
</script>
<style scoped>

.grid-container{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.middleGrid{
  grid-column-start: 2;
  grid-row-start: 1;
}
</style>