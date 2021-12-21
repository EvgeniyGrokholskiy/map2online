import {expect} from 'chai';
import {RichText} from '../../../src/richtext';
import '../../../src/extensions/array+serializeRichText';

describe('Test richtext', () => {
  it('type', () => {
    const t: RichText = [
      {
        type: 'paragraph',
        children: [{text: 'aaa'}],
      }
    ];
    const serialized = t.serializeRichText();
    expect(serialized).to.be.eq('[{"type":"paragraph","children":[{"text":"aaa"}]}]');
  });
});

