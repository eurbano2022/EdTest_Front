<template>
  <v-row class="h-100">
    <v-col class="pa-5 d-flex flex-column align-center">
        <div class="d-flex mt-auto pa-5">
            <v-img :width="500" cover src="../../../public/logo.png"></v-img>
        </div>
        <div class="text-h3 mb-auto">
            <p>
                ¿Quieres saber cómo mejorar el
                proceso de <strong>pruebas de software</strong>
                en tu organización?
            </p>
        </div>
    </v-col>
    <v-col class="pa-5 d-flex flex-column align-center">
        <div class="my-auto">
            <div>
                <p class="text-h5">
                    Conoce el estado actual de tu proceso y descubre cómo iniciar un proceso
                    de mejora utilizando prácticas probadas en la industria.
                </p>
                <div class="mt-5 text-center">
                    <v-btn class="color-btn-purple" to="/register">Iniciar Evaluación</v-btn>
                </div>
            </div>
            <div class="mt-30">
                <p class="text-h5">
                    Si ya realizaste tu evaluación, la puedes consultar aquí:
                </p>
                <div class="mt-5 text-center">
                    <v-btn class="color-btn-purple mt-5 mx-auto" to="/review_assessment">Consultar Evaluación</v-btn>
                </div>
            </div>
        </div>
    </v-col>
  </v-row>
</template>

<script></script>
