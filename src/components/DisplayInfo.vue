<template>
  <div>
    {{ ChildCovidInfo }}
    <p>
      Country: {{ ChildCovidInfo['Country'] }}
    </p>
    <p>

    </p>
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
<style scoped></style>