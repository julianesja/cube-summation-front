import Vue from 'vue';
export default {
    messageType: {
        success: "success",
        error: "error",
        info: "info"
    },
    simpleMessage(message, type, title = "", callBack = () => {}) {
        Vue.swal({
            text: message,
            type: type,
            title: title,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar"
        }).then(result => callBack())
    },
    askMessage(message, type, title = "", confirmResponse = () => {}, cancelResponse = () => {}) {
        Vue.swal({
            text: message,
            type: type,
            title: title,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
            cancelButtonColor: "#e91e63",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                confirmResponse();
            } else {
                cancelResponse();
            }
        });
    }

}