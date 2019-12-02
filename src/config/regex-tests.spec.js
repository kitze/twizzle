import { isNavigatingToTweet, isOnMessagesUrl } from './url-checks';
import urls from 'config/urls';

const status = 'https://mobile.twitter.com/timdang/status/999804466734878720';

const message = 'https://mobile.twitter.com/messages/999804466734878720';
const messages = 'https://mobile.twitter.com/messages';
const messagesWithSlash = 'https://mobile.twitter.com/messages/';

const messageUrls = [message, messages, messagesWithSlash];

describe('tweet urls', () => {
  test('the tweet regex', () => {
    expect(urls.tweetRegex.test(status)).toBe(true);
  });
  test('is navigating to tweet', () => {
    expect(isNavigatingToTweet(status)).toBe(true);
  });
});

describe('message urls', () => {
  messageUrls.forEach(url => {
    it(`should check ${url}`, () => {
      expect(isOnMessagesUrl(url)).toBe(true);
    });
  });
});
