<template>
    <v-app>
        <div class="app-bg">
            <div id="home">
                <SketchHomeNavBar />
            
                <section id="project-description">
                    <div style="color: white">
                        <div>
                            <h4>It's finally the time to join your ideas !</h4>
                            <p style="color: grey">We have built the application you need ! Are you curious about data science ? 
                                You want to show data and compute some calculations on it without coding on it ?
                                You would like to explore new domains ? Konect is here for you.
                            </p>
                            <router-link to="/dev-guide" class="no-style">
                                <v-btn
                                variant="flat"
                                color="rgb(4,122,159)"
                                style="margin-right: 0.5%; color: white"
                            >
                                Documentation
                            </v-btn>
                            </router-link>
                            
                            <router-link to="/playground" class="no-style">
                                <v-btn
                                color="rgb(245, 130, 42)"
                                style="color: white;"
                                >
                                    Playground
                                </v-btn>
                            </router-link>
                        </div>
                    </div>
                </section>

                <section id="services" class="w-100">
                    <div class="d-flex justify-content-center">
                        <div class="w-50 text-center">
                            <h4 class="white">Our Services</h4>
                                <p style="color: grey">
                                    With this application, we want the best for the lambda
                                    users and developers. For that, we offer :
                                </p>
                        </div>
                    </div>
                </section>
                <section id="services-card" class="d-flex justify-content-center">
                    <div class="w-75 white d-flex justify-content-center text-center justify-content-around pt-10">
                        <div>
                            <font-awesome-icon
                                icon="fa-solid fa-xl fa-book"
                                size="2x"
                            ></font-awesome-icon>
                            <h4>
                                Documentation
                            </h4>
                            <p>
                                You will access all the documentation for all the different components you can use.
                                Every page will give you details of the component, the inputs and the output,
                                a detailed description and some examples to use it. It will also tell you which
                                feedbacks you can using them
                            </p>
                            <router-link to="/doc" class="no-style">
                                <v-btn
                                    variant="flat"
                                    color="rgb(4,122,159)"
                                    style="margin-right: 0.5%; color: white"
                                >
                                    Documentation
                                </v-btn>
                            </router-link>
                        </div>

                        <div>
                            <font-awesome-icon
                                icon="fa-solid fa-xl fa-play"
                                size="2x"
                            ></font-awesome-icon>
                            <h4>
                                Playground
                            </h4>
                            <p>
                                Are you ready for the experiences ? Here, you will be able to create
                                different workflows of components. You can create components, connect them
                                and try to build complex process. You will also be able to
                                save your work, and to take it again when you want !
                            </p>
                            <br>
                            <router-link to="/playground" class="no-style">
                                <v-btn
                                    variant="flat"
                                    color="rgb(4,122,159)"
                                    style="margin-right: 0.5%; color: white"
                                >
                                    Play with the app
                                </v-btn>
                            </router-link>
                        </div>

                        <div>
                            <font-awesome-icon
                                icon="fa-solid fa-xl fa-laptop-code"
                                size="2x"
                            ></font-awesome-icon>
                            <h4>
                                Developer guide
                            </h4>
                            <p>
                                This section is more for the web developers. You will learn how to create your own 
                                components, integrate in the platform and find them in the application. All the 
                                API is described here.
                            </p>
                            <br><br>
                            <router-link to="/dev-guide" class="no-style">
                                <v-btn
                                    variant="flat"
                                    color="rgb(4,122,159)"
                                    style="margin-right: 0.5%; color: white"
                                >
                                    Developer guide
                                </v-btn>
                            </router-link>
                        </div>
                    </div>
                </section>
            </div>
            <SketchFooter />
        </div>
    </v-app>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import SketchHomeNavBar from '@/sketch/app/ui/home/SketchHomeNavBar.vue'
import SketchFooter from '@/sketch/app/ui/home/SketchFooter.vue';

export default defineComponent({
    components: {
        SketchHomeNavBar,
        SketchFooter
    }
});

</script>

<style>



#project-description div:first-child {
    padding-top: 5%;
    width: 100%;
}

#project-description div:first-child div {
    margin-left: 10%;
    width: 40%;
}

.button-container {
    display: flex;
    justify-content: left;
    justify-content: space-around;
    width: 100%;
}

#services div:first-child {
    padding-top: 5%;
}

#services-card > div > div{
    width: 30%;
    background-color: rgb(245, 130, 42);
    padding: 1%;
}

</style>