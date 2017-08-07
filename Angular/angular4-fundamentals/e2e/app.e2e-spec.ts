import { Angular4FundamentalsPage } from './app.po';

describe('angular4-fundamentals App', () => {
  let page: Angular4FundamentalsPage;

  beforeEach(() => {
    page = new Angular4FundamentalsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
