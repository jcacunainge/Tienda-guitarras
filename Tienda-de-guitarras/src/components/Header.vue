<script setup>
import { computed } from 'vue';
const props = defineProps({
    carrito: {
        type: Array,
        required: true,
    },
    guitarra: {
        type: Object,
        required: true
    }
})

defineEmits(['decrementar-cantidad', 'incrementar-cantidad', 'agregar-carrito', 'eliminar-producto', 'vaciar-carrito'])

const totalApagar = computed(() => {
    return props.carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0)

})
</script>

<template>

    <header class="py-5 header">
        <div class="container-xl">
            <div class="row justify-content-center justify-content-md-between">
                <div class="col-8 col-md-3">
                    <a href="index.html">
                        <img class="img-fluid" src="../../public/img/logo.svg" alt="imagen logo">
                    </a>
                </div>
                <nav class="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div class="carrito">
                        <div class="relative carrito-icon">
                            <img class="img-fluid" src="../../public/img/carrito.png" alt="imagen carrito" />
                            <span v-if="carrito.length > 0"
                                class="absolute top-0 right-0 bg-red-600 text-white text-sm font-semibold rounded-full px-2 py-0.5">
                                {{ carrito.length }}
                            </span>
                        </div>

                        <div id="carrito" class="bg-white p-3">
                            <p v-if="carrito.length === 0" class="text-center">El carrito está vacío</p>
                            <div v-else>
                                <table class="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="producto in carrito" :key="producto.id">
                                            <td>
                                                <img class="img-fluid" v-bind:src="'/img/' + producto.imagen + '.jpg'"
                                                    v-bind:alt="'imagen guitarra ' + producto.nombre">
                                            </td>
                                            <td>{{ producto.nombre }}</td>
                                            <td class="fw-bold">{{ producto.precio }}</td>
                                            <td class="flex align-items-start gap-4">
                                                <button type="button" class="btn btn-dark"
                                                    @click="$emit('decrementar-cantidad', producto.id)">
                                                    -
                                                </button>
                                                {{ producto.cantidad }}
                                                <button type="button" class="btn btn-dark"
                                                    @click="$emit('incrementar-cantidad', producto.id)">
                                                    +
                                                </button>
                                            </td>
                                            <td>
                                                <button class="btn btn-danger" type="button"
                                                    @click="$emit('eliminar-producto', producto.id)">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p class="text-end">Total pagar: <span class="fw-bold">${{ totalApagar }}</span></p>

                                <button class="btn btn-dark w-100 mt-3 p-2" @click="$emit('vaciar-carrito')">Vaciar
                                    Carrito</button>
                            </div>
                        </div>
                    </div>

                </nav>
            </div><!--.row-->

            <div class="row mt-5">
                <div class="col-md-6 text-center text-md-start pt-5 ">
                    <h1 class="display-2 fw-bold">Modelo {{ guitarra.nombre }}</h1>
                    <p class="mt-5 fs-5 text-white">{{ guitarra.descripcion }}</p>
                    <p class="text-primary fs-1 fw-black">{{ guitarra.precio }}</p>
                    <button type="button" class="btn fs-4 bg-primary text-white py-2 px-5"
                        @click="$emit('agregar-carrito', guitarra)">Agregar al Carrito</button>
                </div>
            </div>
        </div>

        <img class="header-guitarra" src="../../public/img/header_guitarra.png" alt="imagen header">
    </header>
</template>
