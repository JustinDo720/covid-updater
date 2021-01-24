<template>
  <div id='home_page' class='app_grid' v-if='!show_info'>
    <div id='title' class='main_title'>
      <h3>
        {{ project_title }}
      </h3>
    </div>
    <div class='grey lighten-3 middleGrid'>
      <div id='search_field' style='padding: 20px;'>
        <input
            placeholder='Enter your city here!'
            v-model= current_user_city
            @keyup.enter = 'serveLocation'
        >
      </div>
      <div id='show_location' class='indigo lighten-4 individual_location' >
        <a v-for='(country, index) in covid_cases'
           :key=index
           href='#'
           @click='sendInfo(index)'
        >
          <p>
            {{ country['Country'] }}
          </p>
        </a>
      </div>
    </div>
  </div>
  <div id='show_info_mode' v-if='show_info'>
    <display-info parentlocation-info='Hello'></display-info>
  </div>
</template>

<script>
// Import Packages here
import axios from 'axios'
import DisplayInfo from "@/components/DisplayInfo";

export default {
  name: "HomePage",
  components:{
    'display-info': DisplayInfo
  },
  data(){
    return{
      current_user_city: '', // We will use this to update our user_city
      user_city: '',
      project_title: 'COVID CASES',
      covid_cases: [],
      show_info: false,
      selectedInfo: ''

    }
  },
  methods:{
    serveLocation: function(){
      // e.g 'http://api.fightpoverty.online/api/charity?q={%22filters%22:[{%22name%22:%22city%22,%22op%22:%22has%22,%22val%22:{%22name%22:%22name%22,%22op%22:%22like%22,%22val%22:%22%25incol%25%22}}]}'
      this.user_city = this.current_user_city
      const options = {
        method: 'GET',
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/asia',
        headers: {
          'x-rapidapi-key': 'd1fc9f9a9amsh81f491160b1c02ep1bae70jsn83df86721a4a',
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      };

      axios.request(options).then(response => {
        let total_items = []
        for(let item in response.data){
          total_items.push(response.data[item])
        }

        this.covid_cases = total_items
      }).catch(function (error) {
        console.error(error);
      });
    },
    sendInfo: function(curr_selection){
      this.show_info = true
      console.log(this.covid_cases[curr_selection])
      this.selectedInfo = this.covid_cases[curr_selection]
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.app_grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.main_title{
  grid-column-start: 2;
  grid-row-start: 1;
  text-align: center;
}

.middleGrid{
  grid-column-start: 2;
  grid-row-start: 2;
  width: 600px;
}

.individual_location{
  margin: 30px auto;
  text-align:center;
  padding: 10px;
  max-height: 600px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
