import { GridPostList } from '.';
import Loader from './Loader';

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className='text-light-4 text-center w-full mt-10'>No Results Found</p>
    );
  }
};

export default SearchResults;
