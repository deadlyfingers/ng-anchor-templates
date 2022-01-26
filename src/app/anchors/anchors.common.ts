import { IValueSet, INamedValueSetDict } from "./anchors.types";

export class Anchors {

  static readonly REGEX_NAMED = /\{([a-z0-9\s]+)\}[^,\]]/mig ;

  static readonly REGEX_UNNAMED = /\[([a-z0-9\s,\{\}]+[^\]])\]/mig ;

  static getNamedValueSet = (key: string, namedValueSetDict: INamedValueSetDict): IValueSet => {
    if (!namedValueSetDict[key]) {
      console.warn('named value set not found for key:', key);
      return [];
    }
    return namedValueSetDict[key];
  }

  static findNamedValueSets = (anchor: string, namedValueSetDict: INamedValueSetDict, regex = Anchors.REGEX_NAMED ): IValueSet[] => {
    if (!anchor || !regex) return [];
    const str = `${anchor} `; // add space for js regex pattern
    const matches = str.match(regex);
    if (!matches) return [];
    return matches.map(m => m.trim().slice(1, -1)).map(key => Anchors.getNamedValueSet(key, namedValueSetDict));
  }

  static getNestedNamedValueSet = (keyWithBraces: string, namedValueSetDict: INamedValueSetDict): IValueSet => {
    const key = keyWithBraces.slice(1, -1); // chop { and }
    return Anchors.getNamedValueSet(key, namedValueSetDict);
  }

  static findValueSets = (anchor: string, namedValueSetDict: INamedValueSetDict, regex = Anchors.REGEX_UNNAMED ): IValueSet[] => {
    if (!anchor || !regex) return [];
    const str = `${anchor} `; // add space for js regex pattern
    const matches = str.match(regex);
    if (!matches) return [];
    return matches.map(m => m.substring(1).split(',').map(x => {const v = x.trim().replace(/]$/, ''); return v.indexOf('{') === 0 ? Anchors.getNestedNamedValueSet(v, namedValueSetDict) : v.trim() }).flat());
  }

  // => The quick @$ jumped over the $ towards $ at @
  static generateAnchorMasterTemplate = (anchor: string, namedTemplateSlotChar: string, unnamedTemplateSlotChar: string): string => {
    let template = `${anchor} `; // add space for regex pattern
    template = template.replace(Anchors.REGEX_UNNAMED, unnamedTemplateSlotChar);
    template = template.replace(Anchors.REGEX_NAMED, namedTemplateSlotChar);
    return template;
  }

  // takes an array of anchor templates, array of value sets, template slot character
  // loop templates
  // find index of first templateSlot
  // replace template slot with slot filler(s) (first value set remaining)
  // recall function to iterate next
  static generateAnchors = (anchorTemplates: string[], valueSets: IValueSet[], templateSlotChar: string): string[] => {
    const anchors: string[] = [];
    const valueSet = valueSets.splice(0, 1)[0];

    let slotIndex: number;
    let filledAnchorTemplate: string;
    for (const anchorTemplate of anchorTemplates) {
      slotIndex = anchorTemplate.indexOf(templateSlotChar);
      if (slotIndex !== -1) {
        for (const value of valueSet) {
          filledAnchorTemplate = `${anchorTemplate.substring(0, slotIndex)} ${value} ${anchorTemplate.substring(slotIndex + 1)}`;
          anchors.push(filledAnchorTemplate);
        }
      } else {
        anchors.push(`${anchorTemplate}`); // plain text anchor
      }
    }

    if (anchors[0] && anchors[0].indexOf(templateSlotChar) !== -1) {
      return Anchors.generateAnchors(anchors, valueSets, templateSlotChar);
    }

    return anchors;
  }

  // remove double spacing as result of templating
  static fixSpacing = (anchor: string): string => {
    return anchor.replace(/\s+/g, ' ').trim();
  }

  // take a template anchor and generate expanded anchor set preview using value sets
  static previewAnchors = (anchor: string, namedValueSetDict: INamedValueSetDict, namedTemplateSlotChar = '@', unnamedTemplateSlotChar = '$'): string[] => {
    const namedValueSets = Anchors.findNamedValueSets(anchor, namedValueSetDict);
    const valueSets = Anchors.findValueSets(anchor, namedValueSetDict);

    const template = Anchors.generateAnchorMasterTemplate(anchor, namedTemplateSlotChar, unnamedTemplateSlotChar);

    const anchorTemplates = Anchors.generateAnchors([template], valueSets, unnamedTemplateSlotChar);
    const anchors = Anchors.generateAnchors(anchorTemplates, namedValueSets, namedTemplateSlotChar);

    return anchors.map(a => Anchors.fixSpacing(a));
  }

}
