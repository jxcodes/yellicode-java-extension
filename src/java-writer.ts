import * as elements from '@yellicode/elements';
import * as opts from './options';
import { CodeWriter, CodeWriterUtility, TextWriter } from '@yellicode/core';
import { JavaTypeNameProvider } from './java-type-name-provider';
import { JavaCommentWriter } from './comment-writer';
import { XmlDocUtility } from './xml-doc-utility';
import { DefinitionBuilder } from './definition-builder';
import {
  PackageDefinition,
  ClassDefinition,
  AccessModifier,
  InterfaceDefinition,
  EnumDefinition,
  EnumMemberDefinition,
  MethodDefinition,
  ParameterDefinition,
  PropertyDefinition,
  FileDefinition,
  NonAccessModifier,
} from './model';

/**
 * A CodeWriter for writing Java code from code generation templates. This writer can write classes, interfaces, structs and enumerations and also
 * contains functions for writing namespace blocks and using directives. The JavaWriter is compatible with Yellicode models but can also work
 * independently.
 */
export class JavaWriter extends CodeWriter {
  private typeNameProvider: elements.TypeNameProvider;
  private definitionBuilder: DefinitionBuilder;
  private commentWriter: JavaCommentWriter;
  public maxCommentWidth: number;
  /**
   * Constructor. Creates a new JavaWriter instance using the TextWriter and options provided.
   * @param writer The template's current TextWriter.
   * @param options Optional: the global options for this writer.
   */
  constructor(writer: TextWriter, options?: opts.WriterOptions) {
    super(writer);
    if (!options) options = {};

    this.typeNameProvider =
      options.typeNameProvider || new JavaTypeNameProvider();
    this.definitionBuilder = new DefinitionBuilder(this.typeNameProvider);

    this.indentString = '  ';
    this.maxCommentWidth = options.maxCommentWidth || 100;
    this.commentWriter = new JavaCommentWriter(writer, this.maxCommentWidth);
  }

  /**
   * Writes an indented block of code, wrapped in a namespace declaration and opening and closing brackets.
   * @param definition The namespace definition. Not that an XML doc summary is not supported.
   * @param contents A callback function that writes the namespace contents.
   */
  public writeFileContent(
    definition: FileDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  public writeFileContent(
    definition: FileDefinition,
    contents: (writer: JavaWriter) => void
  ): this {
    this.writeLine(`package ${definition.package};`);
    contents(this);
    return this;
  }
  public writeMainMethod(contents?: (writer: JavaWriter) => void): this {
    this.writeLine('public static void main(String[] args) {');
    if (contents) {
      this.increaseIndent();
      contents(this);
      this.decreaseIndent();
    }
    this.writeLine('}');
    return this;
  }
  /**
   * Writes 1 or more using directives, each on a new line.
   * @param values A collection of strings, typically namespace names.
   */
  public writeUsingDirectives(...values: string[]): this {
    values.forEach((v) => {
      this.writeLine(`using ${v};`);
    });
    return this;
  }

  /**
   * Writes an indented block of code, wrapped in opening and closing brackets.
   * @param contents A callback function that writes the contents.
   */
  public writeCodeBlock(contents: (writer: JavaWriter) => void): this {
    this.write(' {');
    this.writeEndOfLine();
    this.increaseIndent();
    if (contents) contents(this);
    this.decreaseIndent();
    this.writeLine('}');
    return this;
  }

  /**
   * Writes an indented block of code, wrapped in a namespace declaration and opening and closing brackets.
   * @param definition The namespace definition. Not that an XML doc summary is not supported.
   * @param contents A callback function that writes the namespace contents.
   */
  public writeNamespaceBlock(
    definition: PackageDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  /**
   * Writes an indented block of code, wrapped in a namespace declaration and opening and closing brackets.
   * @param pack A package or model that represents the namespace.
   * @param contents A callback function that writes the namespace contents.
   * @param options An optional NamespaceOptions object.
   */
  public writeNamespaceBlock(
    pack: elements.Package,
    contents: (writer: JavaWriter) => void,
    options?: opts.NamespaceOptions
  ): this;
  public writeNamespaceBlock(
    data: any,
    contents: (writer: JavaWriter) => void,
    options?: opts.NamespaceOptions
  ): this {
    if (!data) return this;

    const definition: PackageDefinition = elements.isPackage(data)
      ? this.definitionBuilder.buildPackageDefinition(data, options)
      : data;

    this.writeLine(`namespace ${definition.name}`);
    this.writeCodeBlock(contents);
    return this;
  }

  /**
   * Writes a block of code, wrapped in a class declaration and opening and closing brackets.
   * This function does not write class members.
   * @param definition The class definition.
   * @param contents A callback function that writes the class contents.
   */
  public writeClassBlock(
    definition: ClassDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  /**
   * Writes a block of code, wrapped in a class declaration and opening and closing brackets.
   * This function does not write class members.
   * @param cls The class.
   * @param contents A callback function that writes the class contents.
   * @param options An optional ClassOptions object.
   */
  public writeClassBlock(
    cls: elements.Class,
    contents: (writer: JavaWriter) => void,
    options?: opts.ClassOptions
  ): this;
  public writeClassBlock(
    data: any,
    contents: (writer: JavaWriter) => void,
    options?: opts.ClassOptions
  ): this {
    if (!data) return this;

    const definition: ClassDefinition = elements.isType(data)
      ? this.definitionBuilder.buildClassDefinition(data, options)
      : data;

    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    this.writeIndent();
    this.writeAccessModifier(definition);
    if (definition.isStatic) {
      this.write('static ');
    } else if (definition.isAbstract) {
      // note that static classes cannot be abstract, hence the else-statement
      this.write('abstract ');
    }
    if (definition.isPublic) {
      this.write('public ');
    }
    this.write(`class ${definition.name}`);
    if (definition.extends) {
      this.writeExtends([definition.extends]);
    }
    this.writeImplements(definition.implements);
    this.writeCodeBlock(contents);
    return this;
  }

  /**
   * Writes a block of code, wrapped in an interface declaration and opening and closing brackets.
   * This function does not write interface members.
   * @param definition The interface definition.
   * @param contents  A callback function that writes the interface contents.
   */
  public writeInterfaceBlock(
    definition: InterfaceDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  /**
   * Writes a block of code, wrapped in an interface declaration and opening and closing brackets.
   * This function does not write interface members.
   * @param iface The interface.
   * @param contents A callback function that writes the interface contents.
   * @param options An optional InterfaceOptions object.
   */
  public writeInterfaceBlock(
    iface: elements.Interface,
    contents: (writer: JavaWriter) => void,
    options?: opts.InterfaceOptions
  ): this;
  public writeInterfaceBlock(
    data: any,
    contents: (writer: JavaWriter) => void,
    options?: opts.InterfaceOptions
  ): this {
    if (!data) return this;

    const definition: InterfaceDefinition = elements.isType(data)
      ? this.definitionBuilder.buildInterfaceDefinition(data, options)
      : data;

    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    this.writeIndent();
    this.writeAccessModifier(definition);
    if (definition.isPublic) {
      this.write('public ');
    }
    this.write(`interface ${definition.name}`);
    this.writeExtends(definition.extends);
    this.writeCodeBlock(contents);
    return this;
  }

  /**
   * Writes a block of code, wrapped in an enum declaration and opening and closing brackets.
   * This function does not write enumeration members. Use the writeEnumMember function
   * to write each individual member or the writeEnumeration function to write the full enumeration.
   * @param definition The enumeration definition.
   * @param contents A callback function that writes the enumeration contents.
   */
  public writeEnumerationBlock(
    definition: EnumDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  /**
   * Writes a block of code, wrapped in an enum declaration and opening and closing brackets.
   * This function does not write enumeration members. Use the writeEnumMember function
   * to write each individual member or the writeEnumeration function to write the full enumeration.
   * @param element The enumeration.
   * @param contents A callback function that writes the enumeration contents.
   * @param options An optional EnumerationOptions object.
   */
  public writeEnumerationBlock(
    enumeration: elements.Enumeration,
    contents: (writer: JavaWriter) => void,
    options?: opts.EnumOptions
  ): this;
  public writeEnumerationBlock(
    data: any,
    contents: (writer: JavaWriter) => void,
    options?: opts.EnumOptions
  ): this {
    if (!data) return this;

    const definition: EnumDefinition = elements.isType(data)
      ? this.definitionBuilder.buildEnumDefinition(data, options)
      : data;

    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    this.writeIndent();
    this.writeAccessModifier(definition);
    this.write(`enum ${definition.name}`);
    this.writeEndOfLine();
    this.writeCodeBlock(contents);
    return this;
  }

  /**
   *  Writes a full enumeration, including members.
   * @param definition The enumeration definition.
   */
  public writeEnumeration(definition: EnumDefinition): this;
  /**
   * Writes a full enumeration, including members.
   * @param element The enumeration.
   * @param options An optional EnumOptions object.
   */
  public writeEnumeration(
    enumeration: elements.Enumeration,
    options?: opts.EnumOptions
  ): this;
  public writeEnumeration(data: any, options?: opts.EnumOptions): this {
    if (!data) return this;

    const definition: EnumDefinition = elements.isType(data)
      ? this.definitionBuilder.buildEnumDefinition(data, options)
      : data;

    this.writeEnumerationBlock(definition, () => {
      if (definition.members) {
        definition.members.forEach((memberDefinition) => {
          this.writeEnumMember(memberDefinition);
        });
      }
    });
    return this;
  }

  /**
   * Writes an individual enumeration member.
   * @param definition The enumeration member definition.
   */
  public writeEnumMember(definition: EnumMemberDefinition): this;
  /**
   * Writes an individual enumeration member.
   * @param literal The EnumerationLiteral for which to write the member.
   * @param options An optional EnumMemberOptions object.
   * @param isLast Set to true if this is the last member of the enumeration to be written (avoiding
   * a trailing comma).
   */
  public writeEnumMember(
    literal: elements.EnumerationLiteral,
    options?: opts.EnumMemberOptions,
    isLast?: boolean
  ): this;
  public writeEnumMember(
    data: any,
    options?: opts.EnumMemberOptions,
    isLast?: boolean
  ): this {
    if (!data) return this;

    const definition: EnumMemberDefinition = elements.isEnumerationLiteral(data)
      ? this.definitionBuilder.buildEnumMemberDefinition(data, isLast, options)
      : data;

    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    this.writeIndent();
    this.write(definition.name);
    if (definition.value != null) {
      // using '!=' on purpose
      this.write(` = ${definition.value}`);
    }
    if (!definition.isLast) {
      this.write(',');
    }
    this.writeEndOfLine();
    return this;
  }

  /**
   * Writes a method declaration without a body. Use this function to generate interface methods.
   * @param definition The method definition.
   */
  public writeMethodDeclaration(definition: MethodDefinition): this;
  /**
   * Writes a method declaration without a body. Use this function to generate interface methods.
   * @param operation The operation for which to write the method.
   * @param options An optional MethodOptions object.
   */
  public writeMethodDeclaration(
    operation: elements.Operation,
    options?: opts.MethodOptions
  ): this;
  public writeMethodDeclaration(data: any, options?: opts.MethodOptions): this {
    if (!data) return this;

    const definition: MethodDefinition = elements.isOperation(data)
      ? this.definitionBuilder.buildMethodDefinition(data, options)
      : data;

    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    if (definition.parameters) {
      this.writeJavaDocParagraph(
        XmlDocUtility.getXmlDocLinesForInOutParameters(definition.parameters)
      );
    }

    const xmlDocReturns =
      XmlDocUtility.getXmlDocLineForReturnParameter(definition);
    if (xmlDocReturns) {
      this.writeJavaDocParagraph([xmlDocReturns]);
    }

    this.writeIndent();

    if (!definition.isPublic) {
      this.writeAccessModifier(definition); // Partial methods are implicitly private
    }
    if (definition.isPublic) {
      this.write('public ');
    }
    if (definition.isStatic) {
      this.write('static ');
    } else if (definition.isAbstract) {
      this.write('abstract ');
    }

    // partial methods must return void, intentional trailing white space
    else this.write(`${definition.returnTypeName || 'void'} `); // intentional trailing white space

    this.write(`${definition.name}(`);
    if (definition.parameters) {
      this.writeParameters(definition.parameters);
    }
    this.write(')');
    if (definition.throws) {
      this.write(' throws ');
      this.write(definition.throws.join(', '));
    }
    this.write(';');
    this.writeEndOfLine();
    return this;
  }

  /**
   * Writes an indented block of code, wrapped in a method declaration and opening and closing brackets.
   * @param method The operation for which to write the method.
   * @param contents A callback function that writes the operation contents. This callback will not be invoked
   * if the method is abstract.
   */
  public writeMethodBlock(
    method: MethodDefinition,
    contents: (writer: JavaWriter) => void
  ): this;
  /**
   * Writes an indented block of code, wrapped in a method declaration and opening and closing brackets.
   * @param operation The operation for which to write the method.
   * @param contents A callback function that writes the operation contents. This callback will not be invoked
   * if the method is abstract.
   * @param options An optional MethodOptions object.
   */
  public writeMethodBlock(
    operation: elements.Operation,
    contents: (writer: JavaWriter) => void,
    options?: opts.MethodOptions
  ): this;
  public writeMethodBlock(
    data: any,
    contents: (writer: JavaWriter) => void,
    options?: opts.MethodOptions
  ): this {
    if (!data) return this;

    const definition: MethodDefinition = elements.isOperation(data)
      ? this.definitionBuilder.buildMethodDefinition(data, options)
      : data;

    // Write the documentation
    if (definition.docComment) {
      this.writeDocComment(definition.docComment);
    }

    if (definition.parameters) {
      this.writeJavaDocParagraph(
        XmlDocUtility.getXmlDocLinesForInOutParameters(definition.parameters)
      );
    }

    const xmlDocReturns = definition.isConstructor
      ? null
      : XmlDocUtility.getXmlDocLineForReturnParameter(definition);
    if (xmlDocReturns) {
      this.writeJavaDocParagraph([xmlDocReturns]);
    }

    // Start of the actual method
    this.writeIndent();
    // Write the access modifier
    if (definition.isPublic) {
      this.write('public ');
    } else {
      this.writeAccessModifier(definition);
    }
    // Writes the default keyword if it's required
    if (definition.isDefault) {
      this.write('default ');
    }
    // Write the non-access modifier
    this.writeNonAccessModifier(definition.nonAccessModifier);
    // Write the return type
    this.write(`${definition.returnTypeName || 'void'} `); // intentional trailing white space

    this.write(`${definition.name}(`);
    if (definition.parameters) {
      this.writeParameters(definition.parameters);
    }
    this.write(')');
    if (definition.isAbstract) {
      this.writeEndOfLine(';');
    } else {
      this.writeCodeBlock(contents);
    }
    return this;
  }
  /**
   * Writes a setter
   * @param param
   * @param methodName Method name without the set prefix
   */
  public writeSetterMethod(param: ParameterDefinition, methodName?: string) {
    if (!methodName) {
      methodName = param.name.replace(/^.{1}/, (letter) =>
        letter.toLocaleUpperCase()
      );
    }
    this.writeLine(
      `public void set${methodName}(${param.typeName} ${param.name}) {`
    );
    this.increaseIndent();
    this.writeLine(`this.${param.name} = ${param.name};`);
    this.decreaseIndent();
    this.writeLine(`}`);
  }
  /**
   * Writes a setter
   * @param param
   * @param methodName Method name without the set prefix
   */
  public writeGetterMethod(param: ParameterDefinition, methodName?: string) {
    if (!methodName) {
      methodName = param.name.replace(/^.{1}/, (letter) =>
        letter.toLocaleUpperCase()
      );
    }
    this.writeLine(`public ${param.typeName} get${methodName}() {`);
    this.increaseIndent();
    this.writeLine(`return this.${param.name};`);
    this.decreaseIndent();
    this.writeLine(`}`);
  }
  /**
   * Writes the parameters of a method.
   * @param params The parameter definitions.
   */
  public writeParameters(params: ParameterDefinition[]): this;
  /**
   * Writes the parameters (all parameters except the return parameter) of a method.
   * @param params A collection of parameters.
   * @param options An optional MethodOptions object.
   */
  public writeParameters(
    params: elements.Parameter[],
    options?: opts.MethodOptions
  ): this;
  public writeParameters(data: any, options?: opts.MethodOptions): this {
    if (!data || !data.length)
      // without at least 1 element, we cannot determine the type
      return this;

    const definitions: ParameterDefinition[] = elements.isParameter(
      data[0] as any
    )
      ? this.definitionBuilder.buildParameterDefinitions(
          data as elements.Parameter[],
          options
        )
      : data;

    if (!definitions.length) return this;

    let i = 0;
    definitions.forEach((p) => {
      if (i > 0) {
        this.write(', ');
      }
      this.write(p.typeName);
      if (p.isNullable) {
        this.write('?');
      }
      this.write(` ${p.name}`);
      if (p.defaultValue) {
        this.write(` = ${p.defaultValue}`);
      }
      i++;
    });
    return this;
  }
  public writeProperty(definition: PropertyDefinition): this;
  public writeProperty(prop: PropertyDefinition): this {
    if (prop.docComment) {
      this.writeDocComment(prop.docComment);
    }
    // Start a new, indented line
    this.writeIndent();
    // Access modifier
    this.writeAccessModifier(prop);
    // Static
    if (prop.isStatic) this.write('static ');
    // Type
    this.write(`${prop.typeName} `);
    // Name
    this.write(prop.name);
    // Default value
    this.writePropertyValue(prop);
    // End
    this.write(';');
    this.writeEndOfLine();
    return this;
  }
  public writePropertyValue(prop: PropertyDefinition): this {
    const value = prop.defaultValue;
    if (value === undefined) return this;
    if (prop.typeName == 'String') {
      this.write(` = "${value}"`);
    } else {
      this.write(` = ${value}`);
    }
    return this;
  }
  /**
   * Writes the type's access modifier to the output with a trailing whitespace.
   * @param definition The type definition.
   */
  public writeAccessModifier(definition: {
    accessModifier?: AccessModifier;
  }): this;
  /**
   * Writes the visibility to the output with a trailing whitespace. If the visibilty is null or
   * not supported by Java, nothing will be written.
   * @param visibilityKind A VisibilityKind value. This value can be null.
   */
  public writeAccessModifier(
    visibilityKind: elements.VisibilityKind | null
  ): this;
  public writeAccessModifier(visibilityKind: any | null): this {
    if (!visibilityKind) return this;

    const accessModifier: AccessModifier | undefined =
      typeof visibilityKind == 'number'
        ? DefinitionBuilder.getAccessModifierString(
            visibilityKind as elements.VisibilityKind
          ) // VisibilityKind
        : visibilityKind.accessModifier; // TypeDefinition

    if (!accessModifier) return this;

    this.write(accessModifier);
    this.writeWhiteSpace();
    return this;
  }
  /**
   * Writes the non-access modifier the output with a trailing whitespace. If the modifier is null or
   * not supported by Java, nothing will be written.
   * @param nonAccessModifier A NonAccessModifier value. This value can be null.
   */
  public writeNonAccessModifier(
    nonAccessModifier: NonAccessModifier | undefined
  ): this;
  public writeNonAccessModifier(
    nonAccessModifier: NonAccessModifier | undefined
  ): this {
    if (!nonAccessModifier) return this;

    this.write(nonAccessModifier);
    this.writeWhiteSpace();
    return this;
  }
  /**
   * Gets the name of the type. This function uses the current typeNameProvider for resolving
   * the type name.
   * @param type Any element that derives from Type.
   */
  public getTypeName(type: elements.Type | null): string | null;
  /**
   * Gets the type name of the typed element. This function uses the current typeNameProvider for resolving
   * the type name.
   * @param typedElement Any element that has a type, such as a Property or Parameter.
   */
  public getTypeName(typedElement: elements.TypedElement | null): string | null;
  public getTypeName(element: any | null): string | null {
    if (!element) return null;

    return this.typeNameProvider.getTypeName(element);
  }

  // #region deprecated

  /**
   * Writes a method declaration without a body.
   * @deprecated Use the writeMethodDeclaration() function instead.
   */
  public writeInterfaceMethod(
    operation: elements.Operation,
    options?: opts.MethodOptions
  ): this {
    console.warn(
      'writeInterfaceMethod is deprecated. Use the writeMethodDeclaration() function instead. '
    );
    this.writeMethodDeclaration(operation, options);
    return this;
  }

  /**
   * Writes an indented block of code, wrapped in a method declaration and opening and closing brackets.
   * @deprecated Use the writeMethodBlock() function instead.
   */
  public writeClassMethodBlock(
    operation: elements.Operation,
    contents: (writer: JavaWriter) => void,
    options?: opts.MethodOptions
  ): this {
    console.warn(
      'writeClassMethodBlock is deprecated. Use the writeMethodBlock() function instead. '
    );
    this.writeMethodBlock(operation, contents, options);
    return this;
  }
  // #endregion deprecated

  //#region Xml Docs

  /**
   * Writes a <summary> XML doc tag from an array of string comments. Each comment will be written on a new line.
   * The output will be word-wrapped to the current maxCommentWith specified in the writer options
   * (default: 100 characters).
   * @param paragraph A string array of comments.
   */
  public writeDocComment(paragraph: string[]): this;
  /**
   * Writes a <summary> XML doc tag from a string. The output will be word-wrapped to the
   * current maxCommentWith specified in the writer options.
   * @param comments The paragraph to write.
   */
  public writeDocComment(paragraph: string): this;
  /**
   * Writes a <summary> XML doc tag from the element's ownedComments. The output will be word-wrapped to the
   * current maxCommentWith specified in the writer options.
   * (default: 100 characters).
   * @param comments Any Yellicode model element.
   */
  public writeDocComment(element: elements.Element): this;
  public writeDocComment(data: any): this {
    if (elements.isNamedElement(data)) {
      // we have no isElement check, but this will do
      data = DefinitionBuilder.buildXmlDocSummary(data);
    }

    if (!data) return this;

    const array: string[] = [];
    if (typeof data == 'string') {
      // string
      array.push(data);
    } else {
      // string[]
      array.push(...data);
    }

    if (!array.length) return this;

    this.writeLine('/**');
    this.commentWriter.writeCommentLines(array, ' * ');
    this.writeLine(' */');
    return this;
  }

  /**
   * Writes a paragraph of xml doc comments, each line starting with forward slashes '/// '.
   * The output will be word-wrapped to the current maxCommentWith specified in the writer options
   * (default: 100 characters).
   * @param line The paragraph to write.
   */
  public writeJavaDocParagraph(paragraph: string[]): this;
  /**
   * Writes a paragraph of xml doc comments, each line starting with forward slashes '/// '.
   * The output will be word-wrapped to the current maxCommentWith specified in the writer options
   * (default: 100 characters).
   * @param paragraph The paragraph to write.
   */
  public writeJavaDocParagraph(paragraph: string): this;
  public writeJavaDocParagraph(data: any): this {
    if (data == null) return this;
    let lines: string[];

    if (typeof data == 'string') {
      lines = [data];
    } else lines = data;
    this.writeJsDocLines(lines);
    return this;
  }
  public writeJsDocLines(lines: string[]): this {
    if (lines.length === 0) return this;

    this.writeLine('/**');

    // Split here
    lines.forEach((line) => {
      const lineLength = line ? line.length : 0;
      if (this.maxCommentWidth > 0 && lineLength > this.maxCommentWidth) {
        // See if we can split the line
        var split: string[] = CodeWriterUtility.wordWrap(
          line,
          this.maxCommentWidth
        );
        split.forEach((s) => {
          this.writeLine(`* ${s}`);
        });
      } else this.writeLine(`* ${line}`);
    });
    this.writeLine('*/');
    return this;
  }
  /**
   * Writes a paragraph of comments, delimited by a '\/\*' and a '\*\/', each other line starting with a '*'.
   * @param paragraph The paragraph to write.
   */
  public writeDelimitedCommentParagraph(paragraph: string): this;
  public writeDelimitedCommentParagraph(paragraph: string[]): this;
  public writeDelimitedCommentParagraph(data: string | string[]): this {
    if (typeof data == 'string') {
      this.commentWriter.writeDelimitedCommentParagraph(data);
    } else this.commentWriter.writeDelimitedCommentLines(data);

    return this;
  }

  public writeDelimitedCommentLines(paragraph: string[]): this {
    console.warn(
      'writeDelimitedCommentLines is deprecated. Use the writeDelimitedCommentParagraph() function instead.'
    );
    this.commentWriter.writeDelimitedCommentLines(paragraph);
    return this;
  }

  //#endregion Xml Docs

  private joinWrite<TItem>(
    collection: TItem[],
    separator: string,
    getStringFunc: (item: TItem) => string | null
  ) {
    let isFirst: boolean = true;
    collection.forEach((c) => {
      const value = getStringFunc(c);
      if (!value) return;
      if (isFirst) {
        isFirst = false;
      } else this.write(separator);
      this.write(value);
    });
  }

  private writeExtends(ext?: string[]): boolean {
    if (!ext || !ext.length) return false;

    this.write(' extends ');
    this.joinWrite(ext, ', ', (name) => name);
    return true;
  }

  private writeImplements(impl?: string[]): boolean {
    if (!impl || !impl.length) return false;
    this.write(' implements ');
    this.joinWrite(impl, ', ', (name) => name);
    return true;
  }
  /**
   *
   * @param classList The class list to imported
   */
  public writeImports(classList: string[]) {
    classList.forEach((cls) => {
      this.writeLine(cls ? `import ${cls};` : '');
    });
  }
}
