export default {




    async getTasks(context, tabname) {
        const serverIp = "10.100.0.30"

        const response = await fetch("http://" + serverIp + ":3000/files?name=" + tabname, {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
        //  console.log(responseData)
      //  tabname = tabname.toUpperCase()
   
    
        context.commit("setTasksRow", {
            obj: responseData,
        });

        context.commit("setTasks", {
            obj: responseData,
        });
    
    },

    async getAsUsers(context) {
        const serverIp = "10.100.0.30"

        const response = await fetch("http://" + serverIp + ":3000/files/asusers", {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }

    
        context.commit("setAsUsers", {
            obj: responseData,
        });

    
    },



    async addTaskHead(_, payload) {
        const serverIp = "10.100.0.30"
        let url = "http://" + serverIp + ":3000/files/insertHead";
        console.log("From action:")
         console.log(payload);

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                cantina: payload.cantina,
                tipo_op: payload.tipo_op,
                operator: payload.operator,
                status: payload.status,
                date: payload.date
            }),
        });
        // head.cantina, head.tipo_op, head.operator, head.status
        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },

  
    async addTaskRow(_, payload) {
        const serverIp = "10.100.0.30"
        let url = "http://" + serverIp + ":3000/files/insertRow";
        console.log("From action:")
         console.log(payload);

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",

            body: JSON.stringify({
                HEAD_ID: payload.head_id,
                ROW_TYPE: payload.tipoRiga,
                SUBJ_VASE: payload.subVas,
                CODE_VASE: payload.vaso,
                QUANTITY: payload.quantita
            }),
        });
        // head.cantina, head.tipo_op, head.operator, head.status
        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },



    async deleteTaskHead(_, payload) {
        const serverIp = "10.100.0.30"
        let url = "http://" + serverIp + ":3000/files/deleteTaskHead";
        //  console.log(payload)

        const response = await fetch(url, {
            method: "DELETE",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                id: payload.id
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },


    async deleteTaskRow(_, payload){
        const serverIp = "10.100.0.30"
        let url = "http://" + serverIp + ":3000/files/deleteTaskRow";
        //  console.log(payload)

        const response = await fetch(url, {
            method: "DELETE",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                id: payload.id
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    }










};