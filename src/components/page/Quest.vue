<template>
    <v-row class="h-100">
        <v-col sm="12" offset-sm="0" md="6" offset-md="3">
            <v-carousel v-model="carouselSheet"
                        :continuous="false"
                        :show-arrows="false"
                        class="pt-5 h-100"
                        hide-delimiters
                        progress="#ab00f7ff">

                <v-carousel-item class="mt-5">
                    <v-sheet>
                            <div class="d-flex flex-column w-100">
                                <div class="text-h2">Instrucciones</div>

                                <v-divider class="mt-3 mb-5"></v-divider>

                                <div class="text-h5">
                                    Para conocer el estado actual del proceso de pruebas en tu organización solo debes seguir estos sencillos pasos: 
                                </div>

                                <div class="mt-4 mb-4 d-flex flex-row">
                                    <ol>
                                        <li>Para cada uno de los criterios que estarás evaluando tienes
                                            la posibilidad de conocer de qué se trata haciendo clic en el ícono de información.</li>
                                        <li>Una vez completada la sección de evaluación de los criterios,
                                            puedes ver tus resultados inmediatamente o consultarlos posteriormente
                                            a través de la opción Consultar Evaluación en la página de inicio.</li>
                                        <li>En algunos casos, los criterios podrán aparecer deshabilitados, esto debido a que
                                            selecionaste  <strong>No</strong> en criterios anteriores.</li>
                                    </ol>
                                </div>

                                <div class="mt-auto mb-0 ml-auto mr-0">
                                    <v-btn class="color-btn-purple" @click="nextSheet()">
                                        Siguiente
                                    </v-btn>
                                </div>
                            </div>
                    </v-sheet>
                </v-carousel-item>

                <v-carousel-item class="mt-5"
                                 v-for="(item, i) in quests"
                                 :key="i">
                    <v-sheet>
                        <div class="d-flex flex-column h-100 w-100">
                            <div class="text-h2">
                                <span>{{ item.area_process.name }}</span>
                            </div>

                            <v-divider class="mt-3 mb-5"></v-divider>

                            <v-form @submit.prevent="nextSheetForm">

                                <div class="d-flex flex-column">
                                    <div class="d-flex flex-row mb-4"
                                         v-for="item_2 in item.criteria">

                                        <div class="mmw-75 align-self-start pt-1">
                                            <span>{{ item_2.question }}</span>
                                        </div>

                                        <div class="mmw-5">
                                            <v-btn
                                                icon="mdi-information-outline"
                                                density="comfortable"
                                                @click="showDialog(item_2.question, item_2.description)">
                                            </v-btn>
                                        </div>

                                        <div class="ml-auto mr-0 mmw-20">
                                            <v-radio-group inline
                                                           :disabled="answers[item_2.id].disabled"
                                                           :rules="answerRules"
                                                           v-model="answers[item_2.id].value"
                                                           @click="sendAnswer($event, item_2.id)">
                                                <v-radio label="Si" value="true"></v-radio>
                                                <v-radio label="No" value="false"></v-radio>
                                            </v-radio-group>
                                        </div>
                                    </div>

                                    <div class="d-flex w-100 mt-auto mb-0 ml-auto mr-0">
                                        <v-btn @click="backSheet"
                                               class="color-btn-purple ml-auto mr-5">
                                            Atrás
                                        </v-btn>
                                        <v-btn type="submit"
                                               class="color-btn-purple mr-5">
                                            Siguiente
                                        </v-btn>
                                    </div>
                                </div>
                            </v-form>
                        </div>
                    </v-sheet>
                </v-carousel-item>

                <v-carousel-item class="mt-5">
                    <v-sheet>
                            <div class="d-flex flex-column w-100">
                                <div class="text-h1 text-center">
                                    Gracias por completar la encuesta
                                </div>
                                <div class="mt-5 mx-auto">
                                    <v-btn class="color-btn-purple"
                                           @click="informRedirect">
                                        Ver Resultados
                                    </v-btn>
                                </div>
                            </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>

            <v-dialog transition="dialog-top-transition"
                      width="auto"
                      v-model="dialog">
                <v-card max-width="100%" class="mx-auto">
                    <div class="d-flex flex-column pa-5">
                        <div class="d-flex flex-row align-center">
                            <div class="d-flex justify-start text-h4">
                                <p>{{ this.titleDialog }}</p>
                            </div>

                            <v-btn class="ml-auto mr-0 align-self-start"
                                icon="mdi-window-close"
                                size="x-small"
                                @click="dialog = false">
                            </v-btn>
                        </div>

                        <v-divider class="mt-3 mb-5"></v-divider>

                        <div v-html="msgDialog"></div>
                    </div>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Quest',
        props: ['token_user'],
        data: function() {
            return {
                quests: [],
                answers: {},
                answerRules: [
                    v => {
                        if (v) return true
                        return 'Se debe responder a la pregunta'
                    }
                ],
                carouselSheet: 0,
                dialog: false,
                msgDialog: ''
            }
        },
        created: function() {
            this.initQuest().then((data) => {
                this.quests = data.quests
                this.answers = data.answers
            })
        },
        methods: {
            initQuest: async function () {
                let areaProcesses = await this.$backendRequest.get_area_processes().then((res) => res.data)
                let criteria = await this.$backendRequest.get_criteria().then((res) => res.data)
                let quests = []

                areaProcesses.forEach(item_1 => {
                    quests.push({
                        area_process: {
                            id: item_1.id,
                            name: item_1.name
                        },
                        criteria: criteria.filter((item_2) => item_2.area_process == item_1.id)
                    })
                })

                let answers = await this.$backendRequest.get_answers(this.$route.params.token_user).then((res) => res.data)
                let tmpAnswers = {}

                criteria.forEach((item) => {tmpAnswers[item.id] = {
                    value: 'false',
                    disabled: false,
                    criteria_children: item.criteria_children
                }})

                answers.forEach((item) => {
                    let id = item.criteria

                    tmpAnswers[id].value = `${item.answer}`
                    tmpAnswers[id].criteria_children.forEach((item2) => {
                        if (tmpAnswers[id].value == 'true') {
                            tmpAnswers[item2].disabled = false
                            this.$backendRequest.insert_answer_user(this.$route.params.token_user,
                                                                    item2,
                                                                    tmpAnswers[item2].value)
                        }
                        else {
                            tmpAnswers[item2].disabled = true
                            this.$backendRequest.insert_answer_user(this.$route.params.token_user,
                            item2,
                            tmpAnswers[item2].value)
                        }
                    })
                })

                return {quests: quests, answers: tmpAnswers}
            },
            showDialog: function (title, msg) {
                this.dialog = true
                this.titleDialog = title
                this.msgDialog = msg
            },
            nextSheet: function() {
                this.carouselSheet = Math.min(this.carouselSheet + 1 , this.quests.length + 2)
            },
            backSheet: function() {
                this.carouselSheet = Math.max(this.carouselSheet - 1 , 0)
            },
            nextSheetForm: function() {
                this.nextSheet()
            },
            sendAnswer: function (event, criteria) {
                this.answers[criteria].value = event.target.value

                let filter_criteria_children = this.answers[criteria].criteria_children

                if (filter_criteria_children.length > 0) {
                    let values = []

                    filter_criteria_children.forEach((item) => {
                        Object.keys(this.answers).forEach((answer_id) => {

                            if (this.answers[answer_id].criteria_children.includes(item)) {
                                values.push(''+this.answers[answer_id].value == 'true')
                            }
                        })
                    })

                    let check_disable = values.every(element => element == true)

                    filter_criteria_children.forEach((item) => {
                        if (check_disable) {
                            this.answers[item].disabled = false
                        }
                        else {
                            this.answers[item].disabled = true
                            this.answers[item].value = 'false'
                            this.$backendRequest.insert_answer_user(this.$route.params.token_user, item, false)
                        }
                    })
                }

                this.$backendRequest.insert_answer_user(this.$route.params.token_user, criteria, this.answers[criteria].value == 'true')
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
