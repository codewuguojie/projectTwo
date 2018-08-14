<template>
    <div>
        <v-upload></v-upload>
    </div>
</template>
<script>
    import upload from '../base/upload/upload-img'
    export default {
        data() {
            return {}
        },
        components: {
            "v-upload":upload
        }
    }
</script>
