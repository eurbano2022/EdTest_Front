<template>
    <v-row>
        <v-col cols="12" md="6" offset-md="3">
            <v-alert v-show="errorLoad"
                     text="Error al tratar de comunicarce con el backend"
                     type="error"></v-alert>
            <v-alert v-show="errorInsert"
                    text="Ocurrio un error al tratar de registrar tu información"
                    type="error"></v-alert>
            <v-form @submit.prevent="insertPerson"
                    v-model="registerForm">
                <div class="d-flex flex-column">
                    <span class="text-h3 text-center mb-5">Registro</span>
                    <v-text-field label="Correo"
                                  placeholder="mi.email@example.com"
                                  type="email"
                                  :rules="emailRules"
                                  v-model="email"></v-text-field>
                    <v-text-field label="Nombre"
                                  :rules="fieldRules"
                                  v-model="name"></v-text-field>
                    <v-text-field label="Apellido"
                                  :rules="fieldRules"
                                  v-model="last_name"></v-text-field>
                    <v-text-field label="Empresa"
                                  placeholder="Mi Empresa"
                                  :rules="fieldRules"
                                  v-model="company"></v-text-field>
                    <v-text-field label="Rol"
                                  placeholder="Desarrollador FullStack"
                                  :rules="fieldRules"
                                  v-model="role"></v-text-field>
                    <v-select label="Industria"
                              :items="optionIndustries"
                              v-model="industry"
                    ></v-select>
                    <v-checkbox v-model="check"
                                label="Acepta la politica de tratamiento de datos personales"
                                :rules="checkRules"
                                type="checkbox">
                    </v-checkbox>
                    <v-btn @click="showDialog" variant="text">Ver Politicas</v-btn>
                    <v-btn type="submit"
                           class="color-btn-purple mt-5 mx-auto">Registrar</v-btn>
                </div>
            </v-form>
        </v-col>
    </v-row>

    <v-dialog transition="dialog-top-transition"
                      width="auto"
                      v-model="dialog">
                <v-card max-width="100%" class="mx-auto">
                    <div class="d-flex flex-column pa-5">
                        <div class="d-flex flex-row align-center">
                            <div class="d-flex justify-start text-h4">
                                <p>Políticas de Uso y Privacidad para Fines Académicos</p>
                            </div>

                            <v-btn class="ml-auto mr-0 align-self-start"
                                icon="mdi-window-close"
                                size="x-small"
                                @click="dialog = false">
                            </v-btn>
                        </div>

                        <v-divider class="mt-3 mb-5"></v-divider>
                       <p class="pa-5">
                            <strong>Políticas de Uso y Privacidad para Fines Académicos</strong>
                            <br><br>
                            <p>Bienvenido a EDTEST, una aplicación desarrollada con fines académicos para la evaluación y 
                                mejora de procesos de pruebas en la industria del software. Antes de continuar, por favor, 
                                lee y acepta nuestras políticas de uso y privacidad a continuación:
                                <br><br>
                                <ol>
                                    <li>
                                        <strong>Propósito Académico:</strong> Esta aplicación es utilizada con el propósito exclusivo 
                                        de fines académicos y de investigación. Al registrarte y utilizar EDTEST, comprendes que los 
                                        datos y resultados generados pueden ser utilizados para análisis y mejora en el contexto de 
                                        la tesis de grado en la que se basa esta aplicación.
                                    </li>
                                    <br><br>
                                    <li><strong>Confidencialidad de Datos:</strong> Los datos recopilados durante tu uso de la aplicación 
                                        serán tratados de manera confidencial y solo se utilizarán con fines de investigación y análisis. 
                                        La información que compartas no será divulgada públicamente ni se utilizará con fines comerciales.
                                    </li>
                                    <br><br>
                                    <li><strong>Consentimiento de Participación:</strong> Al registrarte y utilizar EDTEST, estás dando tu 
                                        consentimiento para participar en el estudio académico y permitir que tus datos sean utilizados con 
                                        fines de investigación y análisis. Tu participación es voluntaria y puedes retirarte en cualquier momento.
                                    </li>
                                    <br><br>
                                    <li><strong>Anonimato y Privacidad:</strong> Los datos recopilados se tratarán de manera anónima y no se 
                                        asociarán directamente con tu identidad. Tu privacidad es una prioridad, y los resultados del estudio 
                                        se presentarán de manera agregada y anónima.
                                    </li>
                                    <br><br>
                                    <li><strong>Derechos del Usuario:</strong> Tienes el derecho de acceder a tus datos, solicitar su eliminación 
                                        y retirar tu consentimiento en cualquier momento. Puedes contactarnos a través de los medios proporcionados 
                                        en la aplicación.
                                    </li>
                                    <br><br>
                                    <li><strong>Contacto:</strong> Si tienes preguntas, inquietudes o deseas más información sobre el uso de la 
                                        aplicación o los datos recopilados, no dudes en contactarnos en la dirección de correo electrónico 
                                        proporcionada en la sección de contacto.
                                    </li>
                                </ol>
                                <br><br>
                                Al aceptar estas políticas, confirmas que has leído y comprendido los términos y condiciones de uso de 
                                EDTEST con fines académicos. Tu colaboración es fundamental para el éxito de nuestra investigación.
                            </p>
                       </p>
                    </div>
                </v-card>
            </v-dialog>
</template>

<script>
    export default {
        name: 'Register',
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
                fieldRules: [
                    v => {
                        if (v) return true
                        return 'El correo es requerido'
                    }
                ],
                checkRules: [
                    v => {
                        if (v) return true
                        return 'Debes aceptar los terminos y condiciones para continuar'
                    }
                ],
                registerForm: false,
                errorLoad: false,
                errorInsert: false,
                email: '',
                name: '',
                last_name: '',
                company: '',
                role: '',
                industry: '',
                tmpIndustry: '',
                check: false,
                optionIndustries: [],
                dialog: false,
            }
        },
        created: function() {
            this.initSelect()
            .then((data) => {
                this.optionIndustries = data
            })
            .then(() => {
                if (this.optionIndustries.length > 0)
                {
                    this.industry = this.optionIndustries[0]
                }
            },
            () => {this.errorLoad=true})
        },
        methods: {
            initSelect: async function () {
                let tmp =  await this.$backendRequest.get_industries()
                .then((res) => {
                    return res.data
                })

                return tmp.map((item) => {return item.name})
            },
            showDialog: function () {
                this.dialog = true
            },
            insertPerson: function () {
                if (this.registerForm){
                    this.$backendRequest.insert_user(this.email, 
                                                    this.name,
                                                    this.last_name,
                                                    this.company,
                                                    this.role,
                                                    this.optionIndustries.indexOf(this.industry) + 1)
                    .then((res) => {
                        this.$router.push({
                            name: 'quest',
                            params: {token_user: res.data.token}
                        })
                    },
                    (error) => {this.errorInsert = true})
                }
            }
        }
    }
</script>
