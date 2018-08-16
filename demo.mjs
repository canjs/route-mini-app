import { Component, route } from "//unpkg.com/can@5/core.mjs";

Component.extend({
    tag: "my-app",
    view: `
        {{# switch(componentToShow) }}
            {{# case("home") }}
                <page-home isLoggedIn:from="isLoggedIn" logout:from="logout"/>
            {{/ case }}
            {{# case("tasks") }}
                <task-editor id:from="taskId" logout:from="logout"/>
            {{/ case }}
            {{# case("login") }}
                <page-login isLoggedIn:bind="isLoggedIn" />
            {{/ case }}
            {{# default }}
                <h2>Page Missing</h2>
            {{/ default }}
        {{/ switch }}
    `,
    ViewModel: {
        page: "string",
        taskId: "string",
        get componentToShow(){
            if(!this.isLoggedIn) {
                return "login";
            }
            return this.page;
        },
        isLoggedIn: { default: false, type: "boolean", serialize: false },
        logout() {
            this.isLoggedIn = false;
        }
    }
});

route.data = document.querySelector("my-app");
route.register("{page}", { page: "home" });
route.register("tasks/{taskId}",{ page: "tasks" });
route.start();
