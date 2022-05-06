import {store} from "./store.js";
import {subject, topics, controls, content} from "./components.js";

store.subscribe(topics);
store.subscribe(content);

subject();
topics();
controls();
content();

