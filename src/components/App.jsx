import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ApiRequest } from './Api/ApiRequest';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    searchResult: null,
    foundImages: [],
    loading: false,
    page: 1,
    existImagesToShow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      ApiRequest(this.state.searchQuery, this.state.page)
        .then(result => {
          if (result.totalHits === 0) {
            toast.error('There are no results matching your query', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: false,
              theme: 'colored',
            });
          }
          if (prevState.searchQuery !== this.state.searchQuery) {
            this.setState({
              searchResult: result,
              foundImages: result.hits,
              existImagesToShow: false,
            });
            if (result.hits.length < result.totalHits) {
              this.setState({
                existImagesToShow: true,
              });
            }
          } else {
            if (
              this.state.page ===
              Math.ceil(
                this.state.searchResult.totalHits /
                  this.state.searchResult.hits.length
              )
            ) {
              this.setState({ existImagesToShow: false });
            }
            this.setState(prevState => ({
              foundImages: [...prevState.foundImages, ...result.hits],
            }));
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ loading: false });
          setTimeout(
            () =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              }),
            200
          );
        });
    }
  }

  formSubmitHandler = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      foundImages: [],
    });
  };

  onLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { loading, foundImages, existImagesToShow } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.formSubmitHandler} />

        {foundImages.length !== 0 && <ImageGallery foundImages={foundImages} />}

        <Loader loading={loading} />
        {existImagesToShow && <LoadMoreBtn onLoadMoreBtn={this.onLoadMore} />}
        <ToastContainer />
      </div>
    );
  }
}
