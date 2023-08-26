<template>
    <v-row>
        <v-col cols="12">
            <div class="text-h2">
                Resultado
            </div>
            <v-divider class="mt-3 mb-5"></v-divider>
        </v-col>

        <v-col offset="0" cols="12">
            <div class="text-center">
                <span>
                    El nivel de madurez del proceso de tu empresa es:
                </span>
                <div class="text-h1 text-center">
                    <strong>{{ level.percentage }}%</strong>
                </div>
                <div class="text-h3">
                    <strong>{{ level.name }}</strong>
                </div>
            </div>

            <v-divider class="mt-3 mb-5"></v-divider>
        </v-col>
        <v-col offset="0" md="6" cols="12" v-for="(item, i) in inform"
                                         :key="i">
            <div class="text-h4">
                Nivel {{ item.level_id }}
            </div>

            <div>
                <v-alert density="compact"
                        v-bind="getAchieved(item.area_processes_answer_percentage)">
                </v-alert>
            </div>

            <v-divider class="mt-3 mb-5"></v-divider>

            <div class="d-flex flex-column">
                <div class="text-h3 text-center">
                    {{ item.area_processes_answer_percentage }} %
                </div>
                <div class="d-flex flex-column"
                    v-for="(item2, j) in item.area_processes">
                    
                    <div>
                        {{ item2.area_processes_name }}
                    </div>
                    <div>
                        <v-progress-linear color="#ab00f7ff"
                                :model-value="item2.criteria_answer_percentage"
                                :height="30"
                                striped>
                                <strong>{{ item2.criteria_answer_percentage }}%</strong>
                        </v-progress-linear>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" offset="0" md="8" offset-md="2" >
            <Radar id="radar"
                :options="chartOptions"
                :data="chartData"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="d-flex">
            <v-btn class="color-btn-purple mx-auto"
                    @click="roadmapRedirect">
                    Ver Ruta Recomendada
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default {
        name: 'Inform',
        props: ['token_user'],
        components: { Radar },
        data: function() {
            return {
                inform: [],
                level: {},
                chartData: {
                    labels: [],
                    datasets: []
                },
                chartOptions: {
                    responsive: true,
                }
            }
        },
        created: async function() {
            this.inform = await this.getInform()

            let labels = []
            let data = []

            this.inform.forEach((item) => {
                item.area_processes.forEach((item2) => {
                    labels.push(item2.area_processes_name)
                    data.push(item2.criteria_answer_percentage)
                })
            })

            this.chartData = {
                labels: labels,
                datasets: [ {
                    label: 'Resultado',
                    backgroundColor: 'rgba(171,0,247,0.2)',
                    borderColor: '#DB0BE0',
                    pointBackgroundColor: '#FC0D90',
                    pointBorderColor: '#FC0D90',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: data 
                },
                {
                    label: 'Estimado',
                    backgroundColor: 'rgba(0,0,0,0.0)',
                    borderColor: 'blue',
                    pointBackgroundColor: 'cyan',
                    pointBorderColor: 'cyan',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100] 
                }]
            }

            this.level = this.getLevel(this.inform)
        },
        methods: {
            getInform: function() {
                return this.$backendRequest.get_inform(this.$route.params.token_user)
                .then((res) => {return res.data},
                (error) => {})
            },
            roadmapRedirect: function() {
                this.$router.push({
                    name: 'roadmap',
                    params: {token_user: this.$route.params.token_user}
                })
            },
            getLevel: function(inform) {
                let level_2 = inform[0]
                let level_3 = inform[1]

                if (level_2.area_processes_answer_percentage <= 50.00 )
                    return {percentage: level_2.area_processes_answer_percentage, name:'1 - Inicial'}

                else if (level_2.area_processes_answer_percentage >= 85.00 && 
                         level_3.area_processes_answer_percentage >= 85.00)
                    return {percentage: level_3.area_processes_answer_percentage, name:'3 - Definido'}

                else if (level_2.area_processes_answer_percentage <= 85.00)
                    return {percentage: level_2.area_processes_answer_percentage, name:'2 - Gestionado'}

                return {percentage: level_2.area_processes_answer_percentage, name:'1 - Inicial'}
            },
            getAchieved: function(percentage) {
                if (percentage <= 15.00)
                    return {type:'error', title: 'No Alcanzado'}
                else if (percentage <= 50.00)
                    return {type:'warning', title: 'Parcialmente Alcanzado'}
                else if (percentage <= 85.00)
                    return {type:'info', title: 'Ampliamente Alcanzado'}
                else if (percentage <= 100.00)
                    return {type:'success', title: 'Completamente Alcanzado'}
                }
            }
        }
</script>
