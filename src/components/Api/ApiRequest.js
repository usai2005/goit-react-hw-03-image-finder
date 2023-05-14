import PropTypes from 'prop-types';

const PIXABAY_API_KEY = '34698924-79f900cdf3ce6a77ada7891ad';

export const ApiRequest = (searchQuery, page) => {
  return fetch(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then(response => response.json());
};

ApiRequest.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
