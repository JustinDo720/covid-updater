<template>
  <div>
    Hello
  </div>
</template>
<script>
// We are going to use this component to display our location's COVID information
export default{
  name: 'DisplayInfo',
  props: {
    ParentlocationInfo :{
      type: String
    }
  },
  data(){
    return{
      ChildLocationInfo: this.ParentlocationInfo,
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