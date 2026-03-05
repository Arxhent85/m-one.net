import fs from "fs";

// Simple test to grab categories
try {
    let translations = fs.readFileSync("translations.ts", "utf8");
    // we can't easily run TS directly, so I'll create a short Vite / TS Node runner if I have to.
    // Better yet, I will write a simple test in a component.
} catch (e) {
    console.log(e);
}
