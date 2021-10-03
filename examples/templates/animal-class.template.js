"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templating_1 = require("@yellicode/templating");
const java_1 = require("../../src/java");
templating_1.Generator.generate({ outputFile: '../out/Animal.java' }, (output) => {
    const classDefinition = {
        name: 'Animal',
        accessModifier: 'public',
        docComment: ['The Animal class'],
        properties: [
            {
                name: 'name',
                typeName: 'String',
                accessModifier: 'private',
                docComment: ['The animal name'],
            },
        ],
    };
    const java = new java_1.JavaWriter(output);
    java.writeClassBlock(classDefinition, () => {
        (classDefinition.properties || []).forEach((p) => {
            java.writeProperty(p);
            java.writeLine();
        });
        java.writeMethodBlock({
            name: 'getName',
            returnTypeName: 'String',
            accessModifier: 'public',
        }, () => {
            java.writeLine('// Code goes here.');
            java.writeLine('return name;');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWFsLWNsYXNzLnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5pbWFsLWNsYXNzLnRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0RBQWtEO0FBQ2xELHlDQUE2RDtBQUU3RCxzQkFBUyxDQUFDLFFBQVEsQ0FDaEIsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsRUFDcEMsQ0FBQyxNQUFrQixFQUFFLEVBQUU7SUFDckIsTUFBTSxlQUFlLEdBQW9CO1FBQ3ZDLElBQUksRUFBRSxRQUFRO1FBQ2QsY0FBYyxFQUFFLFFBQVE7UUFDeEIsVUFBVSxFQUFFLENBQUMsa0JBQWtCLENBQUM7UUFDaEMsVUFBVSxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLE1BQU07Z0JBQ1osUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLGNBQWMsRUFBRSxTQUFTO2dCQUN6QixVQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzthQUNoQztTQUNGO0tBQ0YsQ0FBQztJQUdGLE1BQU0sSUFBSSxHQUFHLElBQUksaUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7UUFFekMsQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUNuQjtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsY0FBYyxFQUFFLFFBQVE7WUFDeEIsY0FBYyxFQUFFLFFBQVE7U0FDekIsRUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUNGLENBQUMifQ==