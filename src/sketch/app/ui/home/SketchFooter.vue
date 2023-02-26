<template>
    <v-footer
      class="text-center d-flex flex-column"
      id="footer"
    >
        <div class="white">
            <div>
                <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4"
                    :icon="icon"
                    variant="text"
                ></v-btn>
            </div>
        
            <div class="pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </div>
        
            <v-divider></v-divider>
        
            <div>
                {{ new Date().getFullYear() }} — <strong>Konect</strong>
            </div>
        </div>
    </v-footer>
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
        }
    }
});

</script>

<style>

#footer {
    margin-top: 5%;
    background-color: rgb(54, 64, 84);
}

</style>
