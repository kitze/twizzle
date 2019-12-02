import urls from 'config/urls';

const isValidUrl = url => {
  const protocol = require('url').parse(url).protocol;
  return protocol === 'http:' || protocol === 'https:';
};

export const isSearchingGifs = url => url && url.includes(urls.searchGifs);

export const isOnRequestsPage = url => url && url.includes(urls.messages) && url.includes('requests');

const validUrlsFromCompose = [urls.altText, urls.tags, urls.searchGifs];
const validUrlsFromMessages = [urls.safety];

export const canNavigateFromCompose = url => {
  const urlCheck = url === urls.compose || validUrlsFromCompose.some(u => url.includes(u));
  if (url && urlCheck) {
    return true;
  }
};

export const isOnValidUrlForMessages = url => validUrlsFromMessages.some(u => url.includes(u));

export const canGoBackFromCompose = url => url && validUrlsFromCompose.some(u => url.includes(u));

export const isOnMessagesUrl = url => url && url.includes(urls.messages);

export const isOnDisplaySettings = url => url && url.includes(urls.displaySettings);

export const isNavigatingToTweet = url => urls.tweetRegex.test(url);

export const isOnVerificationPage = url => url.includes('login_verification');

export const canNavigateInternal = url => {
  const rules = [
    isOnMessagesUrl,
    isSearchingGifs,
    isOnRequestsPage,
    isOnVerificationPage,
    isOnValidUrlForMessages,
    isOnDisplaySettings
  ];
  return rules.some(rule => rule(url) === true);
};

export const linksToExternal = url => {
  return !url.includes(urls.baseUrl) && isValidUrl(url);
};

export const getComputed = ({ url, isAuthed, isSmall, isLarge }) => {
  const isHome = url === urls.messages || url === null;
  const isComposingMessageOnSmall = url === urls.composeMessage && isSmall;

  const gifsLogic = isSmall ? isSearchingGifs(url) === false : true;

  const showHeader =
    url !== '' && isAuthed === true && gifsLogic && url !== urls.login && !isComposingMessageOnSmall;

  const gifLogic = !isSmall ? isSearchingGifs(url) === false : true;

  const backConditions =
    (isSmall && !isHome) || (isLarge && (!isOnMessagesUrl(url) || isOnRequestsPage(url)));

  const showBackButton = gifLogic && backConditions;
  const showMessages = isHome && isSmall;
  const showNightMode = !showBackButton;

  return {
    showBackButton,
    showMessages,
    showNightMode,
    showHeader,
    isComposingMessageOnSmall
  };
};
