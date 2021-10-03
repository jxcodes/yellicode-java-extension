"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../out/Mammut.java' }, (output) => {
    const classDefinition = {
        name: 'Mammut',
        extends: 'Animal',
        accessModifier: 'public',
        docComment: ['The Mammut class extends from Animal'],
    };
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        java.writeLine('// Code goes here.');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MtZXh0ZW5kcy50ZW1wbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzLWV4dGVuZHMudGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzREFBa0Q7QUFDbEQseUNBQTZEO0FBRTdELHNCQUFTLENBQUMsUUFBUSxDQUNoQixFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxFQUNwQyxDQUFDLE1BQWtCLEVBQUUsRUFBRTtJQUNyQixNQUFNLGVBQWUsR0FBb0I7UUFDdkMsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsUUFBUTtRQUNqQixjQUFjLEVBQUUsUUFBUTtRQUN4QixVQUFVLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztLQUNyRCxDQUFDO0lBR0YsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQyJ9