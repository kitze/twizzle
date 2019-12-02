const baseUrl = 'https://mobile.twitter.com';

export let messagesRegex = /https?:\/\/mobile.twitter.com\/messages(\/.*)?\/?/;
export let tweetRegex = /https?:\/\/mobile.twitter.com\/\w*\/status\/*\d*/;

export default {
  baseUrl,
  messagesRegex,
  twitter: 'twitter.com',
  cookiesDomain: baseUrl,
  tweetRegex,
  messages: 'https://mobile.twitter.com/messages',
  login: 'https://mobile.twitter.com/login',
  compose: 'https://mobile.twitter.com/compose/tweet',
  composeMessage: 'https://mobile.twitter.com/messages/compose',
  searchGifs: 'https://mobile.twitter.com/i/foundmedia',
  altText: 'https://mobile.twitter.com/compose/tweet/alt_text',
  tags: 'https://mobile.twitter.com/compose/tweet/tags',
  safety: 'https://mobile.twitter.com/settings/safety',
  displaySettings: 'https://mobile.twitter.com/i/display'
};
