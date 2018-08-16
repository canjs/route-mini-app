import { Component, route, value } from "//unpkg.com/can@5/core.mjs";
import { PageHome, PageLogin, TaskEditor } from "./components.mjs";

Component.extend({
    tag: "my-app",
    view: `
        {{componentToShow}}
    `,
//        {{# switch(componentToShow) }}
//            {{# case("home") }}
//                <page-home isLoggedIn:from="isLoggedIn" logout:from="logout"/>
//            {{/ case }}
//            {{# case("tasks") }}
//                <task-editor id:from="taskId" logout:from="logout"/>
//            {{/ case }}
//            {{# case("login") }}
//                <page-login isLoggedIn:bind="isLoggedIn" />
//            {{/ case }}
//            {{# default }}
//                <h2>Page Missing</h2>
//            {{/ default }}
//        {{/ switch }}
    ViewModel: {
        page: "string",
        taskId: "string",
        get componentToShow(){
            if(!this.isLoggedIn) {
                return new PageLogin({
                    viewModel: {
                        isLoggedIn: value.bind(this, "isLoggedIn")
                    }
                });
            }

            switch(this.page) {
                case "home":
                    return new PageHome({
                        viewModel: {
                            isLoggedIn: value.from(this, "isLoggedIn"),
                            logout: value.from(this, "logout"),
                        }
                    });
                    break;
                case "tasks":
                    return new TaskEditor({
                        viewModel: {
                            id: value.from(this, "taskId"),
                            logout: value.from(this, "logout")
                        }
                    });
                    break;
                case "login":
                    return new PageLogin({
                        viewModel: {
                            isLoggedIn: value.bind(this, "isLoggedIn")
                        }
                    });
                    break;
            }
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
