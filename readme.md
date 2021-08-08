# Java extension for Yellicode

# Advice

This is not an official Yellicode Java Extension, right now this is only a full copy from https://github.com/yellicode/csharp-extension, I'll be making the necesary updates to have a full working Java Extension for Yellicode


# About Java extension for Yellicode

Generate Java code using powerful TypeScript code generation templates! This [Yellicode](https://www.yellicode.com) extension lets you generate Java classes, interfaces, enumerations, structs and their members from different kinds of models, using a fully typed code writer.

License: MIT

## About Yellicode

Yellicode lets you build your own code generation templates with TypeScript. It consists of a Node.js CLI and extensible APIs, making it easy for developers to create, share and re-use code generators for their favorite programming languages and frameworks.

Check out [our website](https://www.yellicode.com) for more.

## Using the Java package

### Prerequisites

In order to run a code generation template, you must have the CLI installed (@yellicode/cli) globally and have a valid _codegenconfig.json_ file in your working directory. Please refer to the [installation instructions](https://www.yellicode.com/docs/installation) and the [quick start](https://www.yellicode.com/docs/quickstart) for more.

### Installation

Open a terminal/command prompt in your working directory and install this package as a dev dependency:

```
npm install yellicode-java-extension --save-dev
```

## Using the JavaWriter

The main class for generating Java code is the `JavaWriter`. The `JavaWriter` can work with 2 different model kinds as input:

- A Java code definition.
- A [Yellicode model](https://www.yellicode.com/docs/yellicode-models).

Most `JavaWriter` functions have 2 overloads which can be used for each different kind of input. For example, the `writeClassBlock` function has the
following overloads:

1. `public writeClassBlock(definition: ClassDefinition, contents: () => void): void;`
2. `public writeClassBlock(cls: elements.Class, contents: () => void, options?: opts.ClassOptions): void;`

The first overload accepts a `ClassDefinition`, which has the following structure (comments left out for brevity):

```ts
export interface ClassDefinition extends TypeDefinition {
  isStatic?: boolean;
  isAbstract?: boolean;
  implements?: string[];
  inherits?: string[];
  properties?: PropertyDefinition[];
  methods?: MethodDefinition[];
}
```

When using this overload, you should build the definition in your code generation template. You can do this manually, but typically you would
configure a JSON file as model (see the [Yellicode quick start](https://www.yellicode.com/docs/quickstart) for a how-to) and transform that JSON structure to a Java definition.

The second overload accepts a [class](https://www.yellicode.com/docs/api/model/class) instance from a Yellicode model and accepts an optional `ClassOptions`
object to control code generation (internally, the Yellicode class is transformed to a `ClassDefinition`).

### Example using a Java code definition

This sample creates a simple Java definition of a _Task_ class, which is then provided to the `JavaWriter`. You would typically create this definition from another
structure (your own JSON model, using the 'model' parameter).

```ts
import { TextWriter } from '@yellicode/core';
import { Generator } from '@yellicode/templating';
import { JavaWriter, ClassDefinition } from '../../src/java';

Generator.generate(
  { outputFile: '../code/HelloWold.java' },
  (output: TextWriter) => {
    const classDefinition: ClassDefinition = {
      name: 'HelloWold',
      accessModifier: 'public',
      docComment: ['A fully generated HelloWorld class'],
      properties: [
        {
          name: 'message',
          typeName: 'String',
          accessModifier: 'private',
          docComment: ['A simple message'],
          isStatic: true,
          defaultValue: 'Hi developer!',
        },
      ],
    };

    // Java code writer
    const java = new JavaWriter(output);

    java.writeClassBlock(classDefinition, () => {
      // Properties
      (classDefinition.properties || []).forEach((p) => {
        java.writeProperty(p);
        java.writeLine();
      });
      // Main method
      java.writeMainMethod(() => {
        java.writeLine('System.out.println(HelloWold.message);');
      });
    });
  }
);

```

The generated Java code will look as follows:

```java
/**
 * A fully generated HelloWorld class
 */
public class HelloWold {
  /**
   * A simple message
   */
  private static String message = "Hi developer!";

  public static void main(String[] args) {
    System.out.println(HelloWold.message);
  }
}

```
