<template>
  <nav>
    <div id='title' class='main_title nav-wrapper blue darken-3'>
      <a href='/'
         class='brand-logo center'
         style='font-size:2.0 rem;'
      >
        {{ project_title }}
      </a>
    </div>
  </nav>
  <div id='home_page' class='app_grid' v-if='!show_info'>
    <div class='light-blue darken-4 middleGrid'>
      <div style='padding: 20px;'>
        <label>Select Continent</label>
        <!-- Display was blocked by default by materialize css-->
        <select style='display:block;' v-model='current_user_continent'>
          <option value="" disabled selected>Choose Continent</option>
          <option v-for="(continent, key) in two_continents"
                  :key='key'
                  @click='serveLocation'
          >
            {{continent}}
          </option>
        </select>
      </div>
      <div id='show_location'
           class=' lime lighten-5 individual_location'
           >
        <div id='show_countries' v-if='user_continent'>
          <a v-for='(country, index) in covid_cases'
             :key=index
             href='#'
             @click='sendInfo(index)'
             class='black-text'
          >
            <p class='individual_countries'>
              {{ country['Country'] }}
            </p>
          </a>
        </div>
        <div v-else>
          <h5 style='margin:50px;'>
            Please Select Your Continent Above
          </h5>
        </div>
      </div>
    </div>
  </div>
  <div id='show_info_mode' v-if='show_info'>
    <display-info :covid-info='selectedInfo'></display-info>
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
      current_user_continent: '', // We will use this to update our user_city
      user_continent: '',
      project_title: 'Covid-19: Asia & South America Updater',
      covid_cases: [],
      show_info: false,
      selectedInfo: '',
      two_continents: ['Asia', 'South America']

    }
  },
  methods:{
    async serveLocation(){
      this.user_continent = this.current_user_continent
      const options = {
        method: 'GET',
        // Url for asia
        url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/asia',
        headers: {
          'x-rapidapi-key': process.env.VUE_APP_API_KEY,
          'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
        }
      };

      if(this.user_continent === 'South America'){
        options['url'] = 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/southamerica'
        options['headers']['x-rapidapi-host'] = 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
      }
      await axios.request(options).then(response => {
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
  },

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
  color: #01579b;
}

.middleGrid{
  grid-column-start: 2;
  grid-row-start: 2;
  width: 600px;
  height: 700px;
  border-radius: 5%;
  margin: 20px auto;
}

.individual_location{
  margin: 30px auto;
  text-align:center;
  padding: 10px;
  height: 500px;
  max-height: 500px;
  max-width: 300px;
  overflow: scroll;
  overflow-x: hidden;
}

.individual_countries{
  border: 1px solid black;
  border-radius: 5%;
  padding: 20px;
  box-shadow: 10px 5px 5px rgba(0,0,0, .2)
}
</style>
