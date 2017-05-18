import { AkbangPage } from './app.po';

describe('akbang App', () => {
  let page: AkbangPage;

  beforeEach(() => {
    page = new AkbangPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
