import { FlocksPage } from './app.po';

describe('flocks App', () => {
  let page: FlocksPage;

  beforeEach(() => {
    page = new FlocksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
