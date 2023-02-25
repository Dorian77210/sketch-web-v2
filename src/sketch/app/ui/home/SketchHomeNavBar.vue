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
        </ul>
        <div class="dot"></div>
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
            ]
        }
    }
});

</script>

<style>
#home-logo {
    vertical-align: middle;
    width: 20%;
    margin-left: 10%;
}

#home-logo:hover {
    cursor: pointer;
}

.no-style {
    text-decoration: none; color: inherit;
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

</style>