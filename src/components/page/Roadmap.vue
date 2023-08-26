<template>
    <v-row>
        <v-col>
            <v-btn @click="informRedirect">Volver</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <div class="text-h2">
                Ruta Recomendada
            </div>
            <div>
                Para definir el plan de mejora del proceso de pruebas en tu organización a continuación te sugerimos la hoja de ruta que puedes seguir con las actividades y recomendaciones basadas en los criterios de evaluación que fueron calificados negativamente. Antes de trabajar en la hoja de ruta puedes seguir las siguientes recomendaciones:
            </div>
            <v-divider class="mt-3 mb-5"></v-divider>
        </v-col>
        <v-col cols="12" class="d-flex aling-start">
            <v-timeline side="end">
                <v-timeline-item size="small" width="80%" dot-color="indigo">
                    <v-card>
                        <v-card-title class="bg-indigo">
                            Define un equipo para la gestión del proceso de mejora
                        </v-card-title>
                        <v-card-text>
                            <p>
                                La responsabilidad de promover el proyecto 
                                y eliminar los obstáculos que se presenten en el desarrollo del mismo.
                                El equipo puede estar conformado por un líder que a 
                                su vez determine que otros profesionales
                                se requieren dentro del mismo. Es importante establecer 
                                claramente las responsabilidades y habilidades requeridas de 
                                cada miembro de este equipo para que sea posible cumplir
                                los objetivos trazados por el proceso de mejora.
                            </p>
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
                <v-timeline-item size="small" width="80%" dot-color="indigo">
                    <v-card>
                        <v-card-title class="bg-indigo">
                            Identifica cuáles son los objetivos del proceso de mejora
                        </v-card-title>
                        <v-card-text>
                            <p>
                                Algunos ejemplos de estos objetivos son:
                                <ol class="pa-5">
                                    <li>Identificar prácticas que ayuden a que el proceso de 
                                        pruebas esté alineado con las buenas prácticas de la industria.</li>
                                    <li>Fomentar la comunicación y colaboración entre equipos de desarrollo, 
                                        pruebas y gestión para mejorar la integración de pruebas 
                                        en el ciclo de desarrollo.
                                    </li>
                                    <li>Apuntar a la detección temprana de defectos y a la reducción de 
                                        problemas en las pruebas
                                    </li>
                                    <li>Identificar cómo los objetivos del proceso de mejora que ha establecido 
                                        la organización se alinean con los objetivos de negocio de la organización.
                                    </li>
                                </ol>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
                <v-timeline-item size="small" width="80%" dot-color="indigo">
                    <v-card>
                        <v-card-title class="bg-indigo">
                            Establece prioridades
                        </v-card-title>
                        <v-card-text>
                            Al establecer las prioridades, determina qué  área(s) de proceso y qué partes de ellas
                            implementarán primero. Para establecer las prioridades se pueden considerar los siguientes
                            criterios:
                            <ol class="pa-5">
                                <li>
                                    Duración de la mejora: Se debe lograr un equilibrio entre las mejoras a corto plazo y a largo plazo. Las mejoras a corto plazo tienen la ventaja de mostrar rápidamente el retorno de la inversión. Las mejoras a largo plazo pueden abordar algunas de las mejoras fundamentales en el proceso
                                    de pruebas, incluidos los aspectos culturales y organizacionales.
                                </li>
                                <li>
                                    Riesgo de implementación: Muchas mejoras requieren un cambio en las prácticas de prueba existentes. Ten en cuenta que existe un riesgo de fracaso asociado con cada una de esas mejoras:
                                    <ol class="pa-5" type="a">
                                        <li>
                                            Capacidad para volver a un estado anterior: la capacidad de revertir a un estado anterior en caso de que la mejora implementada deba ser abandonada. Es necesario evaluar el impacto que esto tendría en el proyecto y definir una estrategia para regresar al estado previo a la implementación de la mejora.
                                        </li>
                                        <li>
                                            Capacidad para implementar la mejora: antes de iniciar la implementación de las mejoras, es importante asegurar los recursos necesarios para llevar a cabo la implementación.
                                        </li>
                                        <li>
                                            Costo/beneficio de la mejora propuesta: identificar el retorno de la inversión realizada para el proceso de mejora, incluyendo aspectos financieros y de optimización de procesos.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    Vínculo con los objetivos. Determina si es posible establecer una asociación clara entre la mejora propuesta y los objetivos del negocio.
                                </li>
                                <li>
                                    Impacto. Determina el impacto de esta mejora (por ejemplo, alto, medio, bajo)
                                </li>
                            </ol> 
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
                <v-timeline-item  size="small" width="80%" dot-color="indigo">
                    <v-card>
                        <v-card-title class="bg-indigo">
                            Define un plan de acción considerando las siguientes características
                        </v-card-title>
                        <v-card-text>
                            <p>
                                <ol class="pa-5">
                                    <li>Establece un período de tiempo corto, típicamente de un año o menos.</li>
                                    <li>Actividades a realizar (Están definidas en la hoja de ruta)</li>
                                    <li>Determina los responsables</li>
                                    <li>Definan indicadores de progreso de la actividad</li>
                                    <li>Determinen el tiempo estimado para realizar la actividad</li>
                                    <li>Definan los recursos necesarios para desarrollar la actividad.</li>
                                </ol>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <div class="text-h2">
                Tu Ruta
            </div>
            <v-divider class="mt-3 mb-5"></v-divider>
        </v-col>

        <v-col cols="12" class="d-flex aling-start">
            <v-timeline side="end">
                <v-timeline-item v-for="(item, i) in roadmap"
                                size="small"
                                fill-dot
                                width="80%"
                                v-bind="setIconTimeline(item)"
                                :key="i">
                <v-card>
                    <v-card-title v-bind="setTitleCardColor(item)">
                        {{ item.area_processes_name }}
                    </v-card-title>
                    <v-card-text v-show="item.activities.length > 0">
                        <v-expansion-panels>
                            <v-expansion-panel dense v-for="(item2, j) in item.activities">
                                <v-expansion-panel-title>
                                    {{ 'Actividad ' + (j + 1) }}
                                </v-expansion-panel-title>
                                <v-expansion-panel-text>
                                    <p v-html="item2.activity"></p>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-col>
    </v-row>
</template>

<script>
export default {
        name: 'Roadmap',
        props: ['token_user'],
        data: function() {
            return {
                roadmap: []
            }
        },
        created: async function() {
            this.roadmap = await this.getRoadmap()
        },
        methods: {
            getRoadmap: function () {
                return this.$backendRequest.get_roadmap(this.$route.params.token_user)
                .then((res) => {return res.data},
                (error) => {})
            },
            setIconTimeline: function (item) {
                if (item.activities.length == 0)
                    return {icon: 'mdi-check-decagram-outline', 'dot-color': 'green'}
                return {icon: 'mdi-alert-circle-outline', 'dot-color': 'red'}
            },
            setTitleCardColor: function (item) {
                if (item.activities.length == 0)
                    return {'class': 'bg-green'}
                return {'class': 'bg-red'}
            },
            informRedirect: function () {
                this.$router.push({
                    name: 'inform',
                    params: {token_user: this.$route.params.token_user}
                })
            }
        }
    }
</script>
