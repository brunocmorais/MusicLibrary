import CLI from "./Components/CLI.js";

const promise = new Promise((resolve, reject) => {
    CLI.startProcess();
});

promise.then();