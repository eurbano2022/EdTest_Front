<template>
    <v-row>
        <v-col cols="12" md="6" offset-md="3">
            <v-form @submit.prevent="cunsultationPerson"
                    v-model="cunsultationForm">
                <div class="d-flex flex-column">
                    <span class="text-h3 text-center mb-5">Consulta tu resultado</span>
                    <v-text-field label="Correo"
                                  placeholder="mi.email@example.com"
                                  type="email"
                                  :rules="emailRules"
                                  v-model="email"></v-text-field>
                    <v-btn type="submit"
                           class="color-btn-purple mt-5 mx-auto">Consulta</v-btn>
                </div>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Consultation',
        data: function() {
            return {
                emailRules: [
                    v => {
                        if (v) return true
                        return 'El correo es requerido'
                    },
                    v => {
                        if (/.+@.+\..+/.test(v)) return true
                        return 'El correo ingresado no tiene un formato valido'
                    }
                ],
                email: '',
                cunsultationForm: false
            }
        },
        created: function() {
        },
        methods: {
            cunsultationPerson: function () {
                if (this.cunsultationForm) {
                    this.$backendRequest.get_person(this.email)
                    .then((res) => {
                        this.$router.push({
                            name: 'inform',
                            params: {token_user: res.data.token}
                        })
                    },
                    (error) => {
                        this.$router.push({
                            name: 'register'
                        })
                    })
                }
            }
        }
    }
</script>
