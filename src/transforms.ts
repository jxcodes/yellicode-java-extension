import { Element, RenamingTransform, RenameTargets } from '@yellicode/elements';
import { isReservedKeyword } from './utils';

/**
 * Prefixes reserved Java keywords with a "@". This applies to:
 * - Class names
 * - Interface names
 * - Enumeration names
 * - Attribute names
 * - Operation names
 * - Operation parameter names
 */
export class JavaReservedKeywordTransform extends RenamingTransform {
  constructor(targets: RenameTargets = RenameTargets.all) {
    super(targets);
  }

  protected rename(name: string, target: Element): string {
    if (!isReservedKeyword(name)) return name;

    return `@${name}`;
  }
}
