<template>
    <nav>
        <div>
            <router-link to="/">
                <img :src="require('@/assets/images/logo.png')" id="home-logo"/>
            </router-link>
        </div>
        <ul>
            <router-link to="/doc" class="no-style" active-class="link-active">
                <li>Documentation</li>
            </router-link>

            <router-link to="/playground" class="no-style" active-class="link-active">
                <li>Playground</li>
            </router-link>

            <router-link to="/dev-guide" class="no-style" active-class="link-active">
                <li>Dev guide</li>
            </router-link>
            <div class="d-flex align-center w-25">
                    <v-btn
                        color="rgb(4,122,159)"
                        icon="mdi-search-web"
                        size="small"
                        @click="show = !show"
                    ></v-btn>
                    <Transition name="bounce">
                        <v-text-field
                            v-if="show"
                            class="ml-5 mt-2"
                            v-model="search"
                            color="rgb(4,122,159)"
                            style="color: rgb(4,122,159)"
                            label="Search component documentation"
                        ></v-text-field>
                    </Transition>
            </div>
        </ul>
    </nav>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
            search: '',
            show: false
        }
    }
});

</script>

<style scoped>

#home-logo {
    vertical-align: middle;
    width: 20%;
    margin-left: 10%;
}

#home-logo:hover {
    cursor: pointer;
}

nav {
    width: 100%;
    display: flex;
    vertical-align: middle;
}

nav ul {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: right;
}

nav li {
    width: 100%;
    list-style: none;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

nav a:not(.link-active) {
    color: white;
}

nav li:hover {
    color: rgb(4,122,159);
}

nav a {
    width: 15%;
    text-align: center;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

</style>