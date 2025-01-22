import { UserType } from '../types';

export const ITEMS_PER_PAGE: number = 10;
export const INVIEW_ELEMENT_THRESHOLD: number = 0.3;
export const SEARCH_INPUT_DEBOUNCE_TIME: number = 600;
export const SKIP_INVIEW_TIMEOUT: number = 400;
// Get userType from URL query parameter
export const USER_TYPE: UserType =
  (new URLSearchParams(window.location.search).get('userType') as UserType) ||
  'local';
