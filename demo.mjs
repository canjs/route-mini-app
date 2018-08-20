import { Component, route, value } from "//unpkg.com/can@5/core.mjs";
import { PageHome, PageLogin, TaskEditor } from "./components.mjs";

Component.extend({
    tag: "my-app",
    view: `
        {{componentToShow}}
    `,
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
                            logout: this.logout.bind(this)
                        }
                    });
                    break;
                case "tasks":
                    return new TaskEditor({
                        viewModel: {
                            id: value.from(this, "taskId"),
                            logout: this.logout.bind(this)
                        }
                    });
                    break;
                default:
                    var page404 = document.createElement("h2");
                    page404.innerHTML = "Page Missing";
                    return page404;
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
