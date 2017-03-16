import { configure } from "@kadira/storybook";
import { setOptions } from "@kadira/storybook-addon-options";
setOptions({ downPanelInRight: true });

function loadStories() {
    require("../src/stories");
}

configure(loadStories, module);
